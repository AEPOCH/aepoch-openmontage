# ÆPOCH motion geometry

This directory stores reusable paths and final geometry. Timing remains
authoritative in `MOTION_TOKENS.md`.

| Asset | Use |
|---|---|
| `comet-circle-path.svg` | Standard circular Comet Arc |
| `comet-rounded-path.svg` | Comet around an approved rounded perimeter |
| `signal-vesica.svg` | Final Earth/Cosmos convergence geometry |
| `convergence-paths.svg` | Entry and pull-path references |
| `particle-ring-targets.json` | Fixed 150-particle final ring positions |

The SVG paths are guides and may be copied into React components. Do not
animate dashed guide strokes in final production. The renderer must construct
the actual tail, glow, head, and progressive stroke using `MOTION_TOKENS.md`.
