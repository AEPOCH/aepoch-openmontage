"""Deterministic local two-color palette correction.

Recolors a flat, anti-aliased two-color raster (a solid fill color plus a
solid background color, blended only along anti-aliased edges) by
projecting each pixel onto the line segment between the *measured* old
fill and old background colors, then remapping that same blend position
(`t`) onto new fill/background colors. Because the remap is a pure
per-pixel color function of `t` -- no spatial filtering, resampling, or
inpainting -- silhouette geometry and edge anti-aliasing are preserved
exactly; only color changes.

Intended for narrow, reproducible corrections of generated plates whose
geometry/edges are already accepted but whose color drifted from a target
swatch (e.g. a provider-generated flat icon with the wrong fill hex).

Example:
    python scripts/local_palette_correct.py \\
        --input path/to/source.png \\
        --output path/to/corrected.png \\
        --old-fill E56836 --new-fill C4835A \\
        --old-bg FFFFFF --new-bg FAF8F5
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image


def hex_to_rgb(value: str) -> np.ndarray:
    value = value.lstrip("#")
    return np.array([int(value[i : i + 2], 16) for i in (0, 2, 4)], dtype=np.float64)


def rgb_to_hex(rgb: np.ndarray) -> str:
    r, g, b = (int(round(c)) for c in rgb)
    return f"{r:02x}{g:02x}{b:02x}"


def correct_palette(
    image: Image.Image,
    old_fill: np.ndarray,
    new_fill: np.ndarray,
    old_bg: np.ndarray,
    new_bg: np.ndarray,
) -> Image.Image:
    """Remap pixels by their blend position on the old_bg -> old_fill line."""
    source_mode = image.mode
    rgb_image = image.convert("RGB")
    arr = np.asarray(rgb_image).astype(np.float64)

    delta = old_fill - old_bg
    denom = float(np.dot(delta, delta))
    t = np.tensordot(arr - old_bg, delta, axes=([2], [0])) / denom
    t = np.clip(t, 0.0, 1.0)

    new_delta = new_fill - new_bg
    corrected = new_bg + t[..., None] * new_delta
    corrected = np.clip(np.round(corrected), 0, 255).astype(np.uint8)

    out = Image.fromarray(corrected, mode="RGB")
    if source_mode != "RGB":
        out = out.convert(source_mode)
    return out


def measure(image: Image.Image, old_fill: np.ndarray, old_bg: np.ndarray) -> dict:
    """Report the dominant fill/background colors actually present."""
    arr = np.asarray(image.convert("RGB")).astype(np.float64)
    delta = old_fill - old_bg
    denom = float(np.dot(delta, delta))
    t = np.tensordot(arr - old_bg, delta, axes=([2], [0])) / denom
    fill_mask = t >= 0.9
    bg_mask = t <= 0.1
    fill_mean = arr[fill_mask].mean(axis=0) if fill_mask.any() else None
    bg_mean = arr[bg_mask].mean(axis=0) if bg_mask.any() else None
    return {
        "fill_hex": rgb_to_hex(fill_mean) if fill_mean is not None else None,
        "fill_pixel_count": int(fill_mask.sum()),
        "bg_hex": rgb_to_hex(bg_mean) if bg_mean is not None else None,
        "bg_pixel_count": int(bg_mask.sum()),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--old-fill", required=True)
    parser.add_argument("--new-fill", required=True)
    parser.add_argument("--old-bg", required=True)
    parser.add_argument("--new-bg", required=True)
    args = parser.parse_args()

    old_fill = hex_to_rgb(args.old_fill)
    new_fill = hex_to_rgb(args.new_fill)
    old_bg = hex_to_rgb(args.old_bg)
    new_bg = hex_to_rgb(args.new_bg)

    source = Image.open(args.input)
    print("source:", args.input, source.mode, source.size)
    print("source measured:", measure(source, old_fill, old_bg))

    corrected = correct_palette(source, old_fill, new_fill, old_bg, new_bg)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    save_kwargs = {"dpi": source.info["dpi"]} if "dpi" in source.info else {}
    corrected.save(args.output, **save_kwargs)
    print("output:", args.output, corrected.mode, corrected.size)
    print("output measured:", measure(corrected, new_fill, new_bg))


if __name__ == "__main__":
    main()
