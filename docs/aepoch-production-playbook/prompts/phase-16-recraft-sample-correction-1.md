# Phase 16 Handoff — Recraft Sample Correction 1

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch `aepoch-series`.

Monty independently inspected the first Recraft V4 sample and confirmed
rejection, but also confirmed that Recraft resolved FLUX's model-level failure
categories. This tranche authorizes exactly one prompt-corrected Recraft V4
sample. It does not authorize a batch.

## Announced paid call

- Tool: repaired registered `recraft_image`
- Provider: Recraft through fal.ai
- Model/endpoint: `recraft/v4/text-to-image`
- Scene: `hook-2b`
- Size: `landscape_16_9`
- Estimated cost: $0.04
- Mode: one corrected sample only
- No fallback, automatic retry, second image, or batch

## Read before acting

1. `AGENT_GUIDE.md`, latest durable state/decisions/log
2. Recraft provider-switch handoff and sample review/image
3. `asset-inventory-and-prompts.md`
4. approved scene plan, visual language, art direction, and playbook
5. current cost log and assets checkpoint

## Preserve the provider decision

Recraft V4 remains the selected sample provider. Do not append a redundant
provider-selection decision unless the existing decision's scope/status must
be revised. Do not restore FLUX or select another provider.

## Correct the prompt architecture

Write and record a new CHAI pre/critique/post triplet. Do not incrementally
edit the prior sentence; rewrite around primitive marks.

The final prompt must request:

- one small, recognizable gender-neutral person pictogram centered in the
  lower-middle third: circular head, softly rounded shoulders and torso, two
  separate arms, two separate legs, flat solid fill, no face;
- exactly 18 separate primitive machine marks around the person:
  6 empty sharp-corner rectangles, 6 simple L-shaped angle marks, and 6 pairs
  of short parallel line segments;
- each mark must be a single plain outline with no internal lines or internal
  symbols;
- all 18 marks disconnected from one another, randomly but evenly distributed,
  with large empty gaps and no alignment into a grid;
- at least the upper third of the frame completely empty;
- flat orthographic 2D editorial graphic, uniform 3px strokes, no lighting,
  depth, shadow, texture, or perspective.

Avoid all conceptual vocabulary that caused the repeated motif: do not use
“tile,” “node,” “cluster,” “network,” “circuit,” “trace,” “blockchain,”
“system,” “technology,” “digital,” “automation,” or “icon.” Do not request any
internal corner dots. State that the primitive marks are unconnected and have
no internal detail. No recognized symbols, objects, letters, numerals, or
logos.

Pass only these structured color controls:

- `colors`: Clay RGB(196,131,90), Iris RGB(139,175,212), Prism
  RGB(184,169,217)
- `background_color`: Void RGB(12,11,10)

Do not include Ink in the provider palette; it caused an unrequested pale
yellow substitution and is unnecessary in this scene. Assign Clay exclusively
to the person in prose. Assign Iris and Prism exclusively to the 18 primitive
marks. Request `image_size: landscape_16_9`, safety checker true, and omit
`style`.

## Generate and review exactly once

Reserve/reconcile $0.04, make one call, download immediately, and preserve all
technical/generation metadata. Honest WebP-to-PNG normalization remains
allowed and must be recorded.

Inspect at original resolution. The aspect may be close to 16:9 and later
normalized deterministically; content approval is the gate here. Reject if:

- the person is pawn-shaped or missing distinct arms/legs;
- any repeated compound motif dominates;
- marks connect into a network/grid or contain internal decoration;
- any recognizable UI/device/currency/gear/cloud/brand glyph appears;
- any color outside Clay/Iris/Prism/Void appears materially;
- the upper-third empty-space requirement fails.

Write the correction sample review, update checkpoint/current state/log,
commit/push authorized tracked changes, and stop for Chris/Monty.

## Hard stop

Do not generate a second image or batch. Do not generate other assets,
diagrams, TTS, music, SFX, or video. Do not process narration. Do not compose,
render, publish, or deploy.

