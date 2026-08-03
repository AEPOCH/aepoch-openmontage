"""Contract tests for the flux_image output-format/dimension repair.

Covers the bug found in the hook-2b sample: fal.ai's own default
`output_format` is "jpeg", not "png" -- the tool must always send the value
explicitly and must never save bytes under an extension that contradicts
fal.ai's returned content_type. No real network calls; requests.post/get are
monkeypatched per this suite's existing convention (see
test_dashscope_tools.py).
"""

from __future__ import annotations

import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from tools.graphics.flux_image import FluxImage


class FakeResp:
    def __init__(self, payload=None, content: bytes = b""):
        self._payload = payload or {}
        self.content = content

    def raise_for_status(self):
        pass

    def json(self):
        return self._payload


def test_custom_width_height_sent_as_image_size():
    """1. custom width/height are sent as image_size."""
    tool = FluxImage()
    payload = tool._build_payload({"prompt": "a scene", "width": 1920, "height": 1080})
    assert payload["image_size"] == {"width": 1920, "height": 1080}


def test_output_format_png_sent_by_default():
    """2. output_format: png is sent, even when the caller doesn't specify it."""
    tool = FluxImage()
    payload = tool._build_payload({"prompt": "a scene", "width": 1920, "height": 1080})
    assert payload["output_format"] == "png"


def test_output_format_explicit_jpeg_is_respected():
    tool = FluxImage()
    payload = tool._build_payload({"prompt": "a scene", "output_format": "jpeg"})
    assert payload["output_format"] == "jpeg"


def test_returned_content_type_and_dimensions_preserved(monkeypatch, tmp_path):
    """3. returned content type/dimensions are preserved in result metadata,
    and may differ from what was requested -- the tool must report the truth,
    not assume the request was honored."""
    monkeypatch.setenv("FAL_KEY", "fake-key")

    api_response = {
        "seed": 999,
        "images": [
            {
                "url": "https://x/image.png",
                "width": 1440,
                "height": 1056,
                "content_type": "image/png",
            }
        ],
    }

    import requests

    monkeypatch.setattr(requests, "post", lambda *a, **kw: FakeResp(api_response))
    monkeypatch.setattr(requests, "get", lambda url, **kw: FakeResp(content=b"fake-png-bytes"))

    out = tmp_path / "sample.png"
    result = FluxImage().execute({
        "prompt": "a scene", "width": 1920, "height": 1080, "output_path": str(out),
    })

    assert result.success is True
    assert result.data["width"] == 1440
    assert result.data["height"] == 1056
    assert result.data["content_type"] == "image/png"
    assert out.exists()


def test_content_type_extension_mismatch_fails_not_mislabels(monkeypatch, tmp_path):
    """4. a content-type/extension mismatch fails rather than creating a
    mislabeled artifact -- this is exactly what happened with the rejected
    hook-2b sample (a .png filename holding JPEG bytes)."""
    monkeypatch.setenv("FAL_KEY", "fake-key")

    api_response = {
        "seed": 999,
        "images": [
            {
                "url": "https://x/image.jpg",
                "width": 1440,
                "height": 1056,
                "content_type": "image/jpeg",
            }
        ],
    }

    import requests

    monkeypatch.setattr(requests, "post", lambda *a, **kw: FakeResp(api_response))
    get_called = {"count": 0}

    def _fake_get(url, **kw):
        get_called["count"] += 1
        return FakeResp(content=b"fake-jpeg-bytes")

    monkeypatch.setattr(requests, "get", _fake_get)

    out = tmp_path / "sample.png"  # requested png, but fal.ai returned jpeg
    result = FluxImage().execute({
        "prompt": "a scene", "output_format": "png", "output_path": str(out),
    })

    assert result.success is False
    assert "content_type" in result.error
    assert not out.exists()
    # Must fail before even downloading the mislabeled bytes.
    assert get_called["count"] == 0


def test_missing_content_type_defaults_to_jpeg_per_fal_schema(monkeypatch, tmp_path):
    """fal.ai's own Image schema defaults content_type to image/jpeg when
    absent -- the tool must match that assumption, not assume success."""
    monkeypatch.setenv("FAL_KEY", "fake-key")

    api_response = {
        "seed": 1,
        "images": [{"url": "https://x/image.png", "width": 512, "height": 512}],
    }

    import requests

    monkeypatch.setattr(requests, "post", lambda *a, **kw: FakeResp(api_response))
    monkeypatch.setattr(requests, "get", lambda url, **kw: FakeResp(content=b"x"))

    out = tmp_path / "sample.png"
    result = FluxImage().execute({"prompt": "a scene", "output_path": str(out)})

    assert result.success is False
    assert not out.exists()


def test_output_format_change_does_not_alter_provider_or_cost():
    """5. this change does not alter provider selection or cost estimation."""
    tool = FluxImage()
    assert tool.name == "flux_image"
    assert tool.provider == "flux"
    assert tool.capability == "image_generation"
    assert tool.estimate_cost({"model": "flux-pro/v1.1", "output_format": "png"}) == 0.05
    assert tool.estimate_cost({"model": "flux-pro/v1.1", "output_format": "jpeg"}) == 0.05
    assert tool.estimate_cost({"model": "flux/dev", "output_format": "png"}) == 0.03
