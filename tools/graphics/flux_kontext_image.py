"""FLUX.1 Kontext reference-image editing via fal.ai API.

Unlike ``flux_image`` (text-to-image only), this tool edits an existing
image using a text instruction: ``prompt`` + ``image_url``/``image_path``
in, an edited image out. This is OpenMontage's only registered fal.ai
reference-image-editing tool; added because no such tool previously
existed in the registry (``flux_image``/``recraft_image`` are both
text-to-image only).
"""

from __future__ import annotations

import os
import time
from pathlib import Path
from typing import Any

from tools.base_tool import (
    BaseTool,
    Determinism,
    ExecutionMode,
    ResourceProfile,
    RetryPolicy,
    ToolResult,
    ToolRuntime,
    ToolStability,
    ToolStatus,
    ToolTier,
)
from tools.graphics._shared import file_to_data_uri, save_image_correctly

_MODEL_PATHS = {
    "kontext-pro": "flux-pro/kontext",
    "kontext-max": "flux-pro/kontext/max",
}

# Rates as documented for FLUX.1 Kontext in the local bfl-api skill's
# pricing table (pro $0.04, max $0.08 per image). fal.ai's hosted mirror
# does not echo a dollar cost in its response body, so this is a
# documented-rate estimate, not a per-call fal.ai-confirmed figure.
_MODEL_COST = {
    "kontext-pro": 0.04,
    "kontext-max": 0.08,
}


class FluxKontextImage(BaseTool):
    name = "flux_kontext_image"
    version = "0.1.0"
    tier = ToolTier.GENERATE
    capability = "image_generation"
    provider = "flux"
    stability = ToolStability.EXPERIMENTAL
    execution_mode = ExecutionMode.SYNC
    determinism = Determinism.STOCHASTIC
    runtime = ToolRuntime.API

    dependencies = []
    install_instructions = (
        "Set FAL_KEY to your fal.ai API key.\n"
        "  Get one at https://fal.ai/dashboard/keys"
    )
    agent_skills = ["flux-best-practices", "bfl-api"]

    capabilities = ["edit_image", "image_to_image", "reference_image_editing"]
    supports = {
        "image_edit": True,
        "reference_image": True,
        "seed": True,
        "aspect_ratio": True,
    }
    best_for = [
        "targeted edits to an existing image via a text instruction",
        "preserving a source image's composition while correcting specific problems",
        "style-consistent variations of an approved reference image",
    ]
    not_good_for = [
        "generating an image from nothing (use flux_image or recraft_image)",
        "multi-image compositing (this tool takes exactly one source image)",
        "strict seeded reproducibility",
    ]

    input_schema = {
        "type": "object",
        "required": ["prompt"],
        "properties": {
            "prompt": {
                "type": "string",
                "description": "Positive-only edit instruction. This endpoint has no negative-prompt field.",
            },
            "image_url": {"type": "string", "description": "Remote source image URL to edit."},
            "image_path": {
                "type": "string",
                "description": "Local source image path to edit (converted to a base64 data URI).",
            },
            "model": {
                "type": "string",
                "enum": list(_MODEL_PATHS.keys()),
                "default": "kontext-pro",
            },
            "aspect_ratio": {
                "type": "string",
                "description": "e.g. '16:9'. Accepted by the live endpoint; does not guarantee exact pixel dimensions.",
            },
            "guidance_scale": {"type": "number"},
            "num_images": {"type": "integer", "default": 1},
            "output_format": {
                "type": "string",
                "enum": ["png", "jpeg"],
                "default": "png",
            },
            "seed": {"type": "integer"},
            "safety_tolerance": {
                "type": "string",
                "description": "fal.ai safety tolerance level, '1' (strict) to '6' (permissive).",
            },
            "output_path": {"type": "string"},
        },
    }

    resource_profile = ResourceProfile(
        cpu_cores=1, ram_mb=512, vram_mb=0, disk_mb=100, network_required=True
    )
    retry_policy = RetryPolicy(max_retries=2, retryable_errors=["rate_limit", "timeout"])
    idempotency_key_fields = ["prompt", "image_url", "image_path", "model", "seed"]
    side_effects = ["writes image file to output_path", "calls fal.ai API"]
    user_visible_verification = [
        "Inspect edited image for fidelity to the source composition and instruction compliance"
    ]

    def _get_api_key(self) -> str | None:
        return os.environ.get("FAL_KEY") or os.environ.get("FAL_AI_API_KEY")

    def get_status(self) -> ToolStatus:
        if self._get_api_key():
            return ToolStatus.AVAILABLE
        return ToolStatus.UNAVAILABLE

    def estimate_cost(self, inputs: dict[str, Any]) -> float:
        model = inputs.get("model", "kontext-pro")
        num_images = inputs.get("num_images", 1)
        return _MODEL_COST.get(model, 0.04) * num_images

    def execute(self, inputs: dict[str, Any]) -> ToolResult:
        api_key = self._get_api_key()
        if not api_key:
            return ToolResult(
                success=False,
                error="FAL_KEY not set. " + self.install_instructions,
            )

        image_url = inputs.get("image_url")
        image_path = inputs.get("image_path")
        if not image_url and not image_path:
            return ToolResult(
                success=False,
                error="flux_kontext_image requires image_url or image_path (edit mode needs a source image).",
            )

        import requests

        start = time.time()
        model = inputs.get("model", "kontext-pro")
        model_path = _MODEL_PATHS.get(model, _MODEL_PATHS["kontext-pro"])
        prompt = inputs["prompt"]

        try:
            resolved_image_url = image_url or file_to_data_uri(image_path)
        except FileNotFoundError as exc:
            return ToolResult(success=False, error=str(exc))

        payload: dict[str, Any] = {"prompt": prompt, "image_url": resolved_image_url}
        if inputs.get("aspect_ratio"):
            payload["aspect_ratio"] = inputs["aspect_ratio"]
        if inputs.get("guidance_scale") is not None:
            payload["guidance_scale"] = inputs["guidance_scale"]
        if inputs.get("num_images"):
            payload["num_images"] = inputs["num_images"]
        if inputs.get("output_format"):
            payload["output_format"] = inputs["output_format"]
        if inputs.get("seed") is not None:
            payload["seed"] = inputs["seed"]
        if inputs.get("safety_tolerance"):
            payload["safety_tolerance"] = inputs["safety_tolerance"]

        try:
            response = requests.post(
                f"https://fal.run/fal-ai/{model_path}",
                headers={
                    "Authorization": f"Key {api_key}",
                    "Content-Type": "application/json",
                },
                json=payload,
                timeout=180,
            )
            response.raise_for_status()
            data = response.json()

            image_result_url = data["images"][0]["url"]
            image_response = requests.get(image_result_url, timeout=60)
            image_response.raise_for_status()

            requested_path = Path(inputs.get("output_path", "edited_image.png"))
            save_result = save_image_correctly(image_response.content, requested_path)
            output_path = Path(save_result["path"])

        except Exception as e:
            return ToolResult(success=False, error=f"FLUX Kontext edit failed: {e}")

        return ToolResult(
            success=True,
            data={
                "provider": "flux",
                "model": model,
                "prompt": prompt,
                "source_image": image_url or image_path,
                "output": str(output_path),
                "format": save_result["saved_format"],
                "source_format": save_result["source_format"],
                "format_converted": save_result["converted"],
                "width": save_result["width"],
                "height": save_result["height"],
                "seed": data.get("seed"),
            },
            artifacts=[str(output_path)],
            cost_usd=self.estimate_cost(inputs),
            duration_seconds=round(time.time() - start, 2),
            model=f"fal-ai/{model_path}",
            seed=data.get("seed"),
        )
