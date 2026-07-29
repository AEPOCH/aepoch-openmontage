"""Provider image bytes don't reliably match the extension a caller
requested (fal.ai's Recraft endpoint returns WebP regardless of what was
asked for; Pixabay can return PNG under a default ".jpg" name). These
tests lock in save_image_correctly's contract: detect the real format from
the bytes, convert to the requested extension where practical, and never
write a file whose signature contradicts its own name."""

import sys
from io import BytesIO
from pathlib import Path

import pytest

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from PIL import Image

from tools.graphics._shared import detect_image_format, save_image_correctly


def _encode(fmt: str, size=(12, 8), mode="RGB", color=(30, 60, 90)):
    image = Image.new(mode, size, color)
    buffer = BytesIO()
    image.save(buffer, format=fmt)
    return buffer.getvalue()


def _actual_signature_format(path: Path) -> str:
    with Image.open(path) as image:
        return (image.format or "").upper()


# ---------------------------------------------------------------------------
# detect_image_format
# ---------------------------------------------------------------------------


def test_detect_image_format_identifies_webp():
    assert detect_image_format(_encode("WEBP", mode="RGBA")) == "WEBP"


def test_detect_image_format_identifies_png():
    assert detect_image_format(_encode("PNG")) == "PNG"


def test_detect_image_format_identifies_jpeg():
    assert detect_image_format(_encode("JPEG")) == "JPEG"


def test_detect_image_format_identifies_svg():
    svg = b"<?xml version='1.0'?><svg xmlns='http://www.w3.org/2000/svg'></svg>"
    assert detect_image_format(svg) == "SVG"


def test_detect_image_format_returns_none_for_garbage():
    assert detect_image_format(b"not an image at all") is None


# ---------------------------------------------------------------------------
# save_image_correctly: WebP response requested as PNG
# ---------------------------------------------------------------------------


def test_webp_bytes_requested_as_png_are_converted(tmp_path):
    data = _encode("WEBP", mode="RGBA", size=(16, 10))
    target = tmp_path / "recraft-test.png"

    result = save_image_correctly(data, target)

    assert result["path"] == str(target)
    assert result["source_format"] == "WEBP"
    assert result["saved_format"] == "PNG"
    assert result["converted"] is True
    assert result["width"] == 16
    assert result["height"] == 10
    # The defect this guards against: bytes silently renamed, not converted.
    assert _actual_signature_format(target) == "PNG"


# ---------------------------------------------------------------------------
# save_image_correctly: PNG response requested as JPEG
# ---------------------------------------------------------------------------


def test_png_bytes_requested_as_jpeg_are_converted(tmp_path):
    data = _encode("PNG", mode="RGBA", size=(20, 14))
    target = tmp_path / "pixabay-test.jpg"

    result = save_image_correctly(data, target)

    assert result["path"] == str(target)
    assert result["source_format"] == "PNG"
    assert result["saved_format"] == "JPEG"
    assert result["converted"] is True
    assert _actual_signature_format(target) == "JPEG"


def test_png_bytes_requested_as_unrecognized_extension_falls_back_to_correct_extension(tmp_path):
    data = _encode("PNG")
    target = tmp_path / "asset.bin"

    result = save_image_correctly(data, target)

    # ".bin" isn't a known image extension — correct it rather than
    # silently writing PNG bytes under a meaningless name.
    assert result["path"] == str(tmp_path / "asset.png")
    assert result["converted"] is False
    assert _actual_signature_format(Path(result["path"])) == "PNG"


# ---------------------------------------------------------------------------
# Matching format: no unnecessary re-encode
# ---------------------------------------------------------------------------


def test_matching_format_is_written_unchanged(tmp_path):
    data = _encode("PNG")
    target = tmp_path / "already-correct.png"

    result = save_image_correctly(data, target)

    assert result["converted"] is False
    assert result["saved_format"] == "PNG"
    assert target.read_bytes() == data


# ---------------------------------------------------------------------------
# SVG: never rasterized, extension corrected instead of mislabeled
# ---------------------------------------------------------------------------


def test_svg_bytes_requested_as_png_get_svg_extension_not_rasterized(tmp_path):
    svg = b"<svg xmlns='http://www.w3.org/2000/svg'><rect width='1' height='1'/></svg>"
    target = tmp_path / "vector.png"

    result = save_image_correctly(svg, target)

    assert result["path"] == str(tmp_path / "vector.svg")
    assert result["saved_format"] == "SVG"
    assert result["converted"] is False
    assert Path(result["path"]).read_bytes() == svg


# ---------------------------------------------------------------------------
# Final file signature always matches the returned filename's extension
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    "source_fmt,source_mode,requested_name",
    [
        ("WEBP", "RGBA", "a.png"),
        ("PNG", "RGBA", "b.jpg"),
        ("JPEG", "RGB", "c.webp"),
        ("PNG", "RGB", "d.png"),
    ],
)
def test_returned_path_extension_always_matches_actual_signature(
    tmp_path, source_fmt, source_mode, requested_name
):
    data = _encode(source_fmt, mode=source_mode)
    target = tmp_path / requested_name

    result = save_image_correctly(data, target)
    final_path = Path(result["path"])
    final_ext = final_path.suffix.lstrip(".").lower()

    actual_format = _actual_signature_format(final_path)
    ext_to_format = {"jpg": "JPEG", "jpeg": "JPEG", "png": "PNG", "webp": "WEBP"}
    assert actual_format == ext_to_format[final_ext]
    assert actual_format == result["saved_format"]


# ---------------------------------------------------------------------------
# Undecodable bytes: written as-is, reported honestly (no format claimed)
# ---------------------------------------------------------------------------


def test_undecodable_bytes_are_written_without_false_format_claim(tmp_path):
    target = tmp_path / "broken.png"
    result = save_image_correctly(b"totally not an image", target)

    assert result["path"] == str(target)
    assert result["source_format"] is None
    assert result["saved_format"] is None
    assert result["converted"] is False
    assert target.read_bytes() == b"totally not an image"
