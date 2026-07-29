"""Shared helpers for provider-specific image tools.

Two concerns live here because every image-generation/stock tool in this
package hits them:

- Color palette inputs (currently just Recraft) need to accept a
  convenient public shape (hex strings) while the actual provider API
  (fal.ai) requires RGB objects. ``normalize_colors`` does that
  conversion once, generically, so no tool hand-rolls its own hex parser.
- Every tool in this package downloads bytes from a provider and writes
  them to a caller-supplied ``output_path``. Providers do not reliably
  return the format implied by the extension the caller asked for
  (Pixabay may return PNG for an illustration hit even though the tool's
  default output name ends in .jpg; fal.ai's Recraft endpoint returns
  WebP regardless of the requested extension). ``save_image_correctly``
  is the single place that reconciles "bytes we got" with "extension the
  caller asked for" so no tool silently mislabels a file.
"""

from __future__ import annotations

import base64
import mimetypes
import re
from io import BytesIO
from pathlib import Path
from typing import Any, Optional

_HEX_RE = re.compile(r"^[0-9A-Fa-f]{6}$")

_EXT_TO_PIL_FORMAT = {
    "jpg": "JPEG",
    "jpeg": "JPEG",
    "png": "PNG",
    "webp": "WEBP",
    "gif": "GIF",
    "bmp": "BMP",
    "tiff": "TIFF",
    "tif": "TIFF",
}

_PIL_FORMAT_TO_EXT = {
    "JPEG": "jpg",
    "PNG": "png",
    "WEBP": "webp",
    "GIF": "gif",
    "BMP": "bmp",
    "TIFF": "tiff",
}


# ---------------------------------------------------------------------------
# Color normalization
# ---------------------------------------------------------------------------


def normalize_color(value: Any) -> dict[str, int]:
    """Normalize a single color to an ``{"r": int, "g": int, "b": int}`` dict.

    Accepts either:
      - a hex string, with or without a leading ``#``, upper or lower case
        (e.g. ``"#B5651D"``, ``"b5651d"``)
      - an RGB object already in the target shape
        (e.g. ``{"r": 181, "g": 101, "b": 29}``)

    Raises ``ValueError`` with a message naming the offending value on
    anything else — including out-of-range or non-integer RGB components,
    wrong hex length, and non-hex characters. Never forwards a malformed
    value to a provider payload.
    """
    if isinstance(value, dict):
        missing = [k for k in ("r", "g", "b") if k not in value]
        if missing:
            raise ValueError(
                f"Color object missing {missing}: expected keys 'r', 'g', 'b', got {value!r}"
            )
        rgb: dict[str, int] = {}
        for key in ("r", "g", "b"):
            component = value[key]
            if isinstance(component, bool) or not isinstance(component, int) or not (0 <= component <= 255):
                raise ValueError(
                    f"Color component {key!r}={component!r} must be an integer 0-255, got: {value!r}"
                )
            rgb[key] = component
        return rgb

    if isinstance(value, str):
        candidate = value.strip().lstrip("#")
        if not _HEX_RE.match(candidate):
            raise ValueError(
                f"Invalid hex color {value!r}. Expected 6 hex digits, e.g. '#FF5733' or 'FF5733'."
            )
        return {
            "r": int(candidate[0:2], 16),
            "g": int(candidate[2:4], 16),
            "b": int(candidate[4:6], 16),
        }

    raise ValueError(
        "Color must be a hex string (e.g. '#FF5733') or an RGB object "
        f"(e.g. {{'r': 255, 'g': 87, 'b': 51}}), got: {value!r}"
    )


def normalize_colors(values: Any) -> list[dict[str, int]]:
    """Normalize a list of colors (mixed hex strings and/or RGB objects).

    Returns ``[]`` for ``None``/empty input. Raises ``ValueError`` on the
    first malformed entry — the caller should treat this as a local
    validation failure and never send the raw list to a provider.
    """
    if not values:
        return []
    if not isinstance(values, (list, tuple)):
        raise ValueError(
            f"colors must be a list of hex strings or RGB objects, got: {values!r}"
        )
    return [normalize_color(v) for v in values]


# ---------------------------------------------------------------------------
# Local file -> data URI (for providers whose reference-image input only
# accepts a URL, not a local path)
# ---------------------------------------------------------------------------


def file_to_data_uri(path_str: "str | Path") -> str:
    """Read a local file and return it as a ``data:<mime>;base64,...`` URI.

    Raises ``FileNotFoundError`` if the path doesn't exist.
    """
    path = Path(path_str)
    if not path.exists():
        raise FileNotFoundError(f"Input file not found: {path}")
    mime_type, _ = mimetypes.guess_type(path.name)
    if not mime_type:
        mime_type = "application/octet-stream"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime_type};base64,{encoded}"


# ---------------------------------------------------------------------------
# Media-format normalization
# ---------------------------------------------------------------------------


def _sniff_svg(data: bytes) -> bool:
    head = data.lstrip()[:256].lower()
    return head.startswith(b"<svg") or (head.startswith(b"<?xml") and b"<svg" in head)


def detect_image_format(data: bytes) -> Optional[str]:
    """Return the actual encoded format of ``data`` (e.g. ``"WEBP"``, ``"PNG"``).

    Detection is based on the file's own signature/header (via Pillow),
    not on any filename or HTTP header the caller may have been given —
    those are exactly the things that can lie. Returns ``None`` if the
    bytes can't be decoded as a raster image (e.g. SVG, or truncated data).
    """
    if _sniff_svg(data):
        return "SVG"
    from PIL import Image, UnidentifiedImageError

    try:
        with Image.open(BytesIO(data)) as image:
            return (image.format or "").upper() or None
    except (UnidentifiedImageError, OSError):
        return None


def save_image_correctly(data: bytes, requested_path: "str | Path") -> dict[str, Any]:
    """Write downloaded image ``data`` to disk so its extension never lies.

    Behavior:
      - Detects the real format from the bytes themselves.
      - If the caller's requested extension maps to a known Pillow format
        and differs from the detected format, re-encodes into the
        requested format (dimensions preserved; JPEG flattens alpha onto
        white at quality=95, PNG saves losslessly with optimize=True).
      - If the bytes are already in the requested format, writes them
        unchanged (no lossy re-encode round-trip).
      - If conversion isn't practical — undecodable bytes (or SVG, which
        this module does not rasterize) or an extension this helper
        doesn't recognize — writes the original bytes under a corrected
        extension rather than silently mislabeling them.

    Returns a dict describing what actually happened on disk:
      ``path`` (str, final path actually written — may differ from
      ``requested_path`` if the extension was corrected),
      ``requested_path`` (str, echoed back for comparison),
      ``source_format`` (str | None, detected format of the downloaded bytes),
      ``saved_format`` (str | None, format actually written to disk),
      ``converted`` (bool, whether re-encoding happened),
      ``width`` / ``height`` (int | None).
    """
    requested_path = Path(requested_path)
    requested_path.parent.mkdir(parents=True, exist_ok=True)
    requested_ext = requested_path.suffix.lstrip(".").lower()
    requested_format = _EXT_TO_PIL_FORMAT.get(requested_ext)

    if _sniff_svg(data):
        final_path = requested_path if requested_ext == "svg" else requested_path.with_suffix(".svg")
        final_path.parent.mkdir(parents=True, exist_ok=True)
        final_path.write_bytes(data)
        return {
            "path": str(final_path),
            "requested_path": str(requested_path),
            "source_format": "SVG",
            "saved_format": "SVG",
            "converted": False,
            "width": None,
            "height": None,
        }

    from PIL import Image, UnidentifiedImageError

    try:
        with Image.open(BytesIO(data)) as probe:
            probe.load()
            source_format = (probe.format or "").upper() or None
            width, height = probe.size
            decoded = probe.copy()
    except (UnidentifiedImageError, OSError):
        source_format = None
        width = height = None
        decoded = None

    if decoded is None:
        # Can't decode at all — write as-is. If we at least recognize the
        # extension is claiming a format we couldn't verify, leave it; we
        # have no real format to correct it to.
        requested_path.write_bytes(data)
        return {
            "path": str(requested_path),
            "requested_path": str(requested_path),
            "source_format": None,
            "saved_format": None,
            "converted": False,
            "width": None,
            "height": None,
        }

    if requested_format is None:
        # No known target format to convert into — correct the extension
        # to match reality instead of leaving a mismatched one in place.
        final_ext = _PIL_FORMAT_TO_EXT.get(source_format, (source_format or "bin").lower())
        final_path = requested_path.with_suffix(f".{final_ext}")
        final_path.parent.mkdir(parents=True, exist_ok=True)
        final_path.write_bytes(data)
        return {
            "path": str(final_path),
            "requested_path": str(requested_path),
            "source_format": source_format,
            "saved_format": source_format,
            "converted": False,
            "width": width,
            "height": height,
        }

    if source_format == requested_format:
        requested_path.write_bytes(data)
        return {
            "path": str(requested_path),
            "requested_path": str(requested_path),
            "source_format": source_format,
            "saved_format": source_format,
            "converted": False,
            "width": width,
            "height": height,
        }

    # Formats genuinely differ — re-encode into what was requested.
    save_kwargs: dict[str, Any] = {}
    save_image = decoded
    if requested_format == "JPEG":
        if save_image.mode in ("RGBA", "LA", "P"):
            rgba = save_image.convert("RGBA")
            background = Image.new("RGB", rgba.size, (255, 255, 255))
            background.paste(rgba, mask=rgba.split()[-1])
            save_image = background
        else:
            save_image = save_image.convert("RGB")
        save_kwargs["quality"] = 95
    elif requested_format == "PNG":
        save_kwargs["optimize"] = True

    buffer = BytesIO()
    save_image.save(buffer, format=requested_format, **save_kwargs)
    requested_path.write_bytes(buffer.getvalue())

    return {
        "path": str(requested_path),
        "requested_path": str(requested_path),
        "source_format": source_format,
        "saved_format": requested_format,
        "converted": True,
        "width": width,
        "height": height,
    }
