"""Deterministic local composition of the `landing-1a` plate.

Resolves `landing-1a` (rejected twice for Recraft palette drift) without any
provider call, per the Phase 16 delivery-mode brief: isolate the already
`accepted` `build-2a` attempt-4 silhouette (local recolor, fill exactly
Clay `#C4835A`) as an alpha matte using the same blend-position ("t")
technique as `scripts/local_palette_correct.py`, then arrange five equal
copies with irregular spacing and no hierarchy on a fresh Paper (`#FAF8F5`)
canvas. No geometry is invented -- every copy is the identical accepted
silhouette, scaled/placed only.

Example:
    python scripts/build_landing1a_local.py \\
        --input projects/aepoch-blog-pilot-what-is-aepoch/assets/images/plates/build-2a_silhouette-warm-clay_recraft-v4-attempt4-local-recolor.png \\
        --output projects/aepoch-blog-pilot-what-is-aepoch/assets/images/generated/landing-1a_local-composition.png
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image

CLAY = np.array([196.0, 131.0, 90.0])  # #C4835A -- the accepted figure fill
PAPER = np.array([250.0, 248.0, 245.0])  # measured background of the source plate
NEW_PAPER = np.array([250.0, 248.0, 245.0])  # #FAF8F5 target canvas background

CANVAS_W, CANVAS_H = 1920, 1080

# Five placements: (center_x_frac, center_y_frac, height_frac_of_canvas)
# Irregular spacing (uneven horizontal gaps), near-equal size (small natural
# variance only, no hierarchy), generous negative space above/below/between.
PLACEMENTS = [
    (0.13, 0.60, 0.34),
    (0.31, 0.52, 0.36),
    (0.50, 0.62, 0.33),
    (0.70, 0.50, 0.37),
    (0.87, 0.61, 0.34),
]


def alpha_matte(image: Image.Image) -> Image.Image:
    """Return an RGBA cutout of the figure: RGB=Clay, alpha=blend position `t`."""
    rgb = np.asarray(image.convert("RGB")).astype(np.float64)
    delta = CLAY - PAPER
    denom = float(np.dot(delta, delta))
    t = np.tensordot(rgb - PAPER, delta, axes=([2], [0])) / denom
    t = np.clip(t, 0.0, 1.0)
    alpha = np.clip(np.round(t * 255), 0, 255).astype(np.uint8)
    out = np.zeros((*t.shape, 4), dtype=np.uint8)
    out[..., 0] = int(CLAY[0])
    out[..., 1] = int(CLAY[1])
    out[..., 2] = int(CLAY[2])
    out[..., 3] = alpha
    return Image.fromarray(out, mode="RGBA")


def crop_to_content(cutout: Image.Image, epsilon: int = 6) -> Image.Image:
    arr = np.asarray(cutout)
    mask = arr[..., 3] > epsilon
    rows = np.any(mask, axis=1)
    cols = np.any(mask, axis=0)
    r0, r1 = np.where(rows)[0][[0, -1]]
    c0, c1 = np.where(cols)[0][[0, -1]]
    return cutout.crop((int(c0), int(r0), int(c1) + 1, int(r1) + 1))


def compose(figure: Image.Image, output_path: Path) -> dict:
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (*[int(c) for c in NEW_PAPER], 255))
    fig_w, fig_h = figure.size
    aspect = fig_w / fig_h

    placements_used = []
    for cx_frac, cy_frac, h_frac in PLACEMENTS:
        target_h = int(round(h_frac * CANVAS_H))
        target_w = int(round(target_h * aspect))
        resized = figure.resize((target_w, target_h), Image.LANCZOS)
        cx = int(round(cx_frac * CANVAS_W))
        cy = int(round(cy_frac * CANVAS_H))
        top_left = (cx - target_w // 2, cy - target_h // 2)
        canvas.alpha_composite(resized, dest=top_left)
        placements_used.append(
            {"center_frac": [cx_frac, cy_frac], "height_frac": h_frac, "size_px": [target_w, target_h]}
        )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(output_path, format="PNG")
    return {"placements": placements_used, "canvas": [CANVAS_W, CANVAS_H]}


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--input", required=True)
    ap.add_argument("--output", required=True)
    args = ap.parse_args(argv)

    src_path = Path(args.input)
    out_path = Path(args.output)

    source = Image.open(src_path)
    cutout = alpha_matte(source)
    figure = crop_to_content(cutout)
    report = compose(figure, out_path)

    print(f"source: {src_path}")
    print(f"figure bbox (crop) size: {figure.size}")
    print(f"output: {out_path}")
    print(f"canvas: {report['canvas']}")
    for i, p in enumerate(report["placements"]):
        print(f"  copy {i}: center_frac={p['center_frac']} height_frac={p['height_frac']} size_px={p['size_px']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
