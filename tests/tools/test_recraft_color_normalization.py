"""Recraft's fal.ai v4 endpoint requires colors as RGB objects
({"r": int, "g": int, "b": int}) and rejects hex strings with a 422.
recraft_image's public input_schema accepts hex strings for caller
convenience — these tests lock in the normalization that bridges the two,
strict rejection of malformed input, and that the tool never reaches the
network with a bad payload."""

import sys
from pathlib import Path

import pytest

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from tools.graphics._shared import normalize_color, normalize_colors


# ---------------------------------------------------------------------------
# normalize_color / normalize_colors
# ---------------------------------------------------------------------------


def test_hex_with_hash_converts_to_rgb_object():
    assert normalize_color("#B5651D") == {"r": 181, "g": 101, "b": 29}


def test_hex_without_hash_converts_to_rgb_object():
    assert normalize_color("B5651D") == {"r": 181, "g": 101, "b": 29}


def test_hex_lowercase_and_uppercase_both_accepted():
    assert normalize_color("b5651d") == {"r": 181, "g": 101, "b": 29}
    assert normalize_color("B5651D") == {"r": 181, "g": 101, "b": 29}
    assert normalize_color("b5651d") == normalize_color("B5651D")


def test_rgb_object_passes_through_unchanged():
    rgb = {"r": 181, "g": 101, "b": 29}
    assert normalize_color(rgb) == rgb


def test_rgb_object_boundary_values_accepted():
    assert normalize_color({"r": 0, "g": 0, "b": 0}) == {"r": 0, "g": 0, "b": 0}
    assert normalize_color({"r": 255, "g": 255, "b": 255}) == {"r": 255, "g": 255, "b": 255}


@pytest.mark.parametrize(
    "bad_value",
    [
        "#ZZZZZZ",  # non-hex characters
        "#FF57",  # too short
        "#FF573312",  # too long
        "not-a-color",
        {"r": 300, "g": 0, "b": 0},  # out of range
        {"r": -1, "g": 0, "b": 0},  # negative
        {"r": 1.5, "g": 0, "b": 0},  # not an int
        {"r": True, "g": 0, "b": 0},  # bool is not an int here
        {"r": 0, "g": 0},  # missing key
        123,  # wrong type entirely
        None,
    ],
)
def test_malformed_color_rejected_locally(bad_value):
    with pytest.raises(ValueError):
        normalize_color(bad_value)


def test_normalize_colors_handles_mixed_hex_and_rgb_list():
    result = normalize_colors(["#B5651D", {"r": 169, "g": 198, "b": 216}, "c7dde8"])
    assert result == [
        {"r": 181, "g": 101, "b": 29},
        {"r": 169, "g": 198, "b": 216},
        {"r": 199, "g": 221, "b": 232},
    ]


def test_normalize_colors_empty_and_none_return_empty_list():
    assert normalize_colors(None) == []
    assert normalize_colors([]) == []


def test_normalize_colors_rejects_non_list_input():
    with pytest.raises(ValueError):
        normalize_colors("#FF5733")


def test_normalize_colors_raises_on_first_bad_entry():
    with pytest.raises(ValueError):
        normalize_colors(["#B5651D", "not-a-color"])


# ---------------------------------------------------------------------------
# recraft_image.execute() integration: normalized payload sent, bad input
# rejected before any network call
# ---------------------------------------------------------------------------


class _FakeImageResponse:
    status_code = 200
    content = b"FAKE_IMAGE_BYTES"

    def raise_for_status(self):
        pass


class _FakeGenerateResponse:
    status_code = 200

    def raise_for_status(self):
        pass

    def json(self):
        return {"images": [{"url": "https://fal.example/out.png"}]}


@pytest.fixture
def recraft_tool(monkeypatch):
    monkeypatch.setenv("FAL_KEY", "test-key")
    from tools.graphics.recraft_image import RecraftImage

    return RecraftImage()


def test_execute_sends_normalized_rgb_payload(monkeypatch, recraft_tool, tmp_path):
    captured = {}

    def fake_post(url, headers=None, json=None, timeout=None):
        captured["url"] = url
        captured["json"] = json
        return _FakeGenerateResponse()

    def fake_get(url, timeout=None):
        return _FakeImageResponse()

    import requests

    monkeypatch.setattr(requests, "post", fake_post)
    monkeypatch.setattr(requests, "get", fake_get)

    result = recraft_tool.execute(
        {
            "prompt": "a calm figure",
            "colors": ["#B5651D", {"r": 169, "g": 198, "b": 216}],
            "output_path": str(tmp_path / "out.png"),
        }
    )

    assert result.success, result.error
    assert captured["json"]["colors"] == [
        {"r": 181, "g": 101, "b": 29},
        {"r": 169, "g": 198, "b": 216},
    ]


def test_execute_rejects_bad_colors_without_calling_network(monkeypatch, recraft_tool, tmp_path):
    calls = {"post": 0, "get": 0}

    def fake_post(*a, **k):
        calls["post"] += 1
        return _FakeGenerateResponse()

    def fake_get(*a, **k):
        calls["get"] += 1
        return _FakeImageResponse()

    import requests

    monkeypatch.setattr(requests, "post", fake_post)
    monkeypatch.setattr(requests, "get", fake_get)

    result = recraft_tool.execute(
        {
            "prompt": "a calm figure",
            "colors": ["not-a-color"],
            "output_path": str(tmp_path / "out.png"),
        }
    )

    assert not result.success
    assert "colors" in result.error.lower()
    assert calls["post"] == 0
    assert calls["get"] == 0
