# Canonical ÆPOCH mark variants

All files use the exact path geometry from `source/AepochLogoBlack.svg`.

## Runtime preference

Use `aepoch-mark-currentcolor.svg` when the renderer can control CSS color.
Use a fixed-color file when deterministic standalone SVG output is preferable.

## Optical placement

At a displayed mark width of 75 px, apply the canonical optical offset:

- X: `-6.5 px`
- Y: `-2.0 px`

Scale the offset proportionally at other display sizes.

Never retrace the generated reference-frame logo or replace these paths with an
AI-generated approximation.
