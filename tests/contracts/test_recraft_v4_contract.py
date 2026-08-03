"""Contract tests for the Recraft V4 raster repair (recraft/v4/text-to-image).

The live V4 schema (https://fal.ai/models/fal-ai/recraft/v4/text-to-image/api)
supports prompt, image_size, colors, background_color, and
enable_safety_checker -- it has no `style` field at all. These tests lock in:
payload keys sent to fal.ai, color/background normalization, that `style` is
never sent even when the caller supplies it, WebP-to-PNG normalization via
the shared saver, endpoint selection for v4 vs v4-pro, and that none of this
changes cost estimation. No real network calls; requests.post/get are
monkeypatched per this suite's existing convention.
"""

from __future__ import annotations

import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from tools.graphics.recraft_image import RecraftImage


class FakeResp:
    def __init__(self, payload=None, content: bytes = b""):
        self._payload = payload or {}
        self.content = content

    def raise_for_status(self):
        pass

    def json(self):
        return self._payload


def _webp_bytes() -> bytes:
    from io import BytesIO
    from PIL import Image

    buf = BytesIO()
    Image.new("RGB", (4, 3), (10, 20, 30)).save(buf, format="WEBP")
    return buf.getvalue()


# ---------------------------------------------------------------------------
# _build_payload -- pure, no network
# ---------------------------------------------------------------------------


def test_payload_contains_expected_v4_keys():
    tool = RecraftImage()
    payload = tool._build_payload({
        "prompt": "a scene", "image_size": "landscape_16_9",
        "colors": ["#C4835A"], "background_color": "#0C0B0A",
    })
    assert set(payload.keys()) == {
        "prompt", "image_size", "colors", "background_color", "enable_safety_checker",
    }


def test_style_is_never_sent_even_when_caller_supplies_it():
    """The live V4 schema has no `style` field -- the tool must not send it,
    regardless of what the caller passes."""
    tool = RecraftImage()
    payload = tool._build_payload({
        "prompt": "a scene", "style": "vector_illustration",
    })
    assert "style" not in payload


def test_colors_normalized_to_rgb_objects():
    tool = RecraftImage()
    payload = tool._build_payload({
        "prompt": "a scene", "colors": ["#C4835A", {"r": 139, "g": 175, "b": 212}],
    })
    assert payload["colors"] == [
        {"r": 196, "g": 131, "b": 90},
        {"r": 139, "g": 175, "b": 212},
    ]


def test_background_color_normalized_to_single_rgb_object():
    """Unlike `colors` (an array), `background_color` is one RGB object."""
    tool = RecraftImage()
    payload = tool._build_payload({"prompt": "a scene", "background_color": "#0C0B0A"})
    assert payload["background_color"] == {"r": 12, "g": 11, "b": 10}


def test_background_color_accepts_rgb_object_directly():
    tool = RecraftImage()
    payload = tool._build_payload({
        "prompt": "a scene", "background_color": {"r": 12, "g": 11, "b": 10},
    })
    assert payload["background_color"] == {"r": 12, "g": 11, "b": 10}


def test_enable_safety_checker_sent_explicitly_default_true():
    tool = RecraftImage()
    payload = tool._build_payload({"prompt": "a scene"})
    assert payload["enable_safety_checker"] is True


def test_enable_safety_checker_explicit_false_is_respected():
    tool = RecraftImage()
    payload = tool._build_payload({"prompt": "a scene", "enable_safety_checker": False})
    assert payload["enable_safety_checker"] is False


def test_invalid_color_raises_before_any_network_call():
    import pytest

    tool = RecraftImage()
    with pytest.raises(ValueError):
        tool._build_payload({"prompt": "a scene", "colors": ["not-a-color"]})


# ---------------------------------------------------------------------------
# Endpoint selection
# ---------------------------------------------------------------------------


def test_v4_resolves_to_documented_endpoint():
    assert RecraftImage._resolve_model_path("v4") == "recraft/v4/text-to-image"


def test_v4_pro_resolves_to_pro_endpoint():
    assert RecraftImage._resolve_model_path("v4-pro") == "recraft/v4/pro/text-to-image"


# ---------------------------------------------------------------------------
# execute() -- mocked network, real WebP-to-PNG conversion via save_image_correctly
# ---------------------------------------------------------------------------


def test_execute_converts_webp_response_to_requested_png(monkeypatch, tmp_path):
    monkeypatch.setenv("FAL_KEY", "fake-key")

    api_response = {
        "images": [{"url": "https://x/image.webp", "content_type": "image/webp"}],
    }

    import requests

    posted = {}

    def _fake_post(url, headers=None, json=None, timeout=None):
        posted["url"] = url
        posted["json"] = json
        return FakeResp(api_response)

    monkeypatch.setattr(requests, "post", _fake_post)
    monkeypatch.setattr(requests, "get", lambda url, **kw: FakeResp(content=_webp_bytes()))

    out = tmp_path / "sample.png"
    result = RecraftImage().execute({
        "prompt": "a scene",
        "image_size": "landscape_16_9",
        "colors": ["#C4835A", "#8BAFD4"],
        "background_color": "#0C0B0A",
        "output_path": str(out),
    })

    assert result.success is True
    assert result.data["source_format"] == "WEBP"
    assert result.data["format"] == "PNG"
    assert result.data["format_converted"] is True
    assert out.exists()
    assert posted["url"] == "https://fal.run/fal-ai/recraft/v4/text-to-image"
    assert "style" not in posted["json"]
    assert posted["json"]["background_color"] == {"r": 12, "g": 11, "b": 10}


def test_execute_does_not_alter_cost_estimation():
    tool = RecraftImage()
    assert tool.estimate_cost({"model": "v4"}) == 0.04
    assert tool.estimate_cost({"model": "v4-pro"}) == 0.25
    # Adding background_color/enable_safety_checker inputs must not change cost.
    assert tool.estimate_cost({
        "model": "v4", "background_color": "#0C0B0A", "enable_safety_checker": True,
    }) == 0.04
