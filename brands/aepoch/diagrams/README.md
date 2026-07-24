# ÆPOCH reusable diagram assets

These SVGs are structural references and runtime-ready primitives.

## Geometry semantics

- Human nodes: circular and equal in base size
- System nodes: sharp corners
- Foundation-operated services: rounded rectangles
- Relationships: single-weight paths
- Kairos: moving contribution along a path, never a coin
- Permanence: still completed ring or check state
- Governance: one equal response per human

## Runtime use

Static SVGs may be loaded directly, but preferred Remotion implementation is
to recreate their geometry as React/SVG components so nodes, edges, labels,
and path progress can animate independently.

Do not rasterize these assets into a full scene and animate the PNG.
