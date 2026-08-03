"""FLUX image generation via fal.ai API."""

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


class FluxImage(BaseTool):
    name = "flux_image"
    version = "0.1.0"
    tier = ToolTier.GENERATE
    capability = "image_generation"
    provider = "flux"
    stability = ToolStability.BETA
    execution_mode = ExecutionMode.SYNC
    determinism = Determinism.SEEDED
    runtime = ToolRuntime.API

    dependencies = []  # checked dynamically via env var
    install_instructions = (
        "Set FAL_KEY to your fal.ai API key.\n"
        "  Get one at https://fal.ai/dashboard/keys"
    )
    agent_skills = ["flux-best-practices", "bfl-api"]

    capabilities = ["generate_image", "generate_illustration", "text_to_image"]
    supports = {
        "negative_prompt": True,
        "seed": True,
        "custom_size": True,
    }
    best_for = [
        "photorealistic images",
        "general-purpose image generation",
        "high quality at low cost (~$0.03/image)",
    ]
    not_good_for = ["text rendering in images", "offline generation"]

    # Maps fal.ai's returned content_type to the output_path extensions we'll accept.
    CONTENT_TYPE_EXTENSIONS = {
        "image/png": (".png",),
        "image/jpeg": (".jpg", ".jpeg"),
    }

    input_schema = {
        "type": "object",
        "required": ["prompt"],
        "properties": {
            "prompt": {"type": "string"},
            "negative_prompt": {"type": "string", "default": ""},
            "width": {"type": "integer", "default": 1024},
            "height": {"type": "integer", "default": 1024},
            "model": {
                "type": "string",
                "enum": ["flux-pro/v1.1", "flux/dev", "flux-pro"],
                "default": "flux-pro/v1.1",
            },
            "seed": {"type": "integer"},
            "num_inference_steps": {"type": "integer"},
            "guidance_scale": {"type": "number"},
            "output_path": {"type": "string"},
            "output_format": {
                "type": "string",
                "enum": ["png", "jpeg"],
                "default": "png",
                "description": (
                    "Image encoding to request from fal.ai. Always sent explicitly -- "
                    "fal.ai's own server-side default is 'jpeg', not 'png'."
                ),
            },
        },
    }

    resource_profile = ResourceProfile(
        cpu_cores=1, ram_mb=512, vram_mb=0, disk_mb=100, network_required=True
    )
    retry_policy = RetryPolicy(max_retries=2, retryable_errors=["rate_limit", "timeout"])
    idempotency_key_fields = ["prompt", "width", "height", "seed", "model"]
    side_effects = ["writes image file to output_path", "calls fal.ai API"]
    user_visible_verification = ["Inspect generated image for relevance and quality"]

    def _get_api_key(self) -> str | None:
        return os.environ.get("FAL_KEY") or os.environ.get("FAL_AI_API_KEY")

    def get_status(self) -> ToolStatus:
        if self._get_api_key():
            return ToolStatus.AVAILABLE
        return ToolStatus.UNAVAILABLE

    def estimate_cost(self, inputs: dict[str, Any]) -> float:
        model = inputs.get("model", "flux-pro/v1.1")
        if "pro" in model:
            return 0.05
        return 0.03  # dev tier

    def _build_payload(self, inputs: dict[str, Any]) -> dict[str, Any]:
        """Build the fal.ai request payload. Pure function -- no network calls.

        Kept separate from `execute()` so its contract (custom width/height
        sent as `image_size`, `output_format` always present) can be tested
        without mocking or a real provider call.
        """
        payload: dict[str, Any] = {
            "prompt": inputs["prompt"],
            "image_size": {
                "width": inputs.get("width", 1024),
                "height": inputs.get("height", 1024),
            },
            # Always send explicitly -- fal.ai's own server-side default is
            # "jpeg", not "png" (confirmed against the live schema at
            # https://fal.ai/models/fal-ai/flux-pro/v1.1/api).
            "output_format": inputs.get("output_format", "png"),
        }
        if inputs.get("seed") is not None:
            payload["seed"] = inputs["seed"]
        if inputs.get("num_inference_steps"):
            payload["num_inference_steps"] = inputs["num_inference_steps"]
        if inputs.get("guidance_scale"):
            payload["guidance_scale"] = inputs["guidance_scale"]
        if inputs.get("negative_prompt"):
            payload["negative_prompt"] = inputs["negative_prompt"]
        return payload

    def execute(self, inputs: dict[str, Any]) -> ToolResult:
        api_key = self._get_api_key()
        if not api_key:
            return ToolResult(
                success=False,
                error="No fal.ai API key found. " + self.install_instructions,
            )

        import requests

        start = time.time()
        model = inputs.get("model", "flux-pro/v1.1")
        payload = self._build_payload(inputs)

        try:
            response = requests.post(
                f"https://fal.run/fal-ai/{model}",
                headers={
                    "Authorization": f"Key {api_key}",
                    "Content-Type": "application/json",
                },
                json=payload,
                timeout=120,
            )
            response.raise_for_status()
            data = response.json()

            image = data["images"][0]
            image_url = image["url"]
            returned_width = image.get("width")
            returned_height = image.get("height")
            # fal.ai's own Image schema defaults content_type to "image/jpeg"
            # when the field is absent -- match that instead of assuming success.
            content_type = image.get("content_type") or "image/jpeg"

            output_path = Path(
                inputs.get("output_path", f"generated_image.{inputs.get('output_format', 'png')}")
            )
            expected_exts = self.CONTENT_TYPE_EXTENSIONS.get(content_type)
            if expected_exts is None or output_path.suffix.lower() not in expected_exts:
                return ToolResult(
                    success=False,
                    error=(
                        f"fal.ai returned content_type={content_type!r} "
                        f"({returned_width}x{returned_height}) but output_path "
                        f"{str(output_path)!r} has extension {output_path.suffix!r} -- "
                        f"refusing to save a mislabeled file. Requested output_format="
                        f"{payload['output_format']!r}."
                    ),
                )

            image_response = requests.get(image_url, timeout=60)
            image_response.raise_for_status()

            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_bytes(image_response.content)

        except Exception as e:
            return ToolResult(success=False, error=f"FLUX generation failed: {e}")

        return ToolResult(
            success=True,
            data={
                "provider": "flux",
                "model": model,
                "prompt": payload["prompt"],
                "output": str(output_path),
                "seed": data.get("seed"),
                "width": returned_width,
                "height": returned_height,
                "content_type": content_type,
            },
            artifacts=[str(output_path)],
            cost_usd=self.estimate_cost(inputs),
            duration_seconds=round(time.time() - start, 2),
            seed=data.get("seed"),
            model=f"fal-ai/{model}",
        )
