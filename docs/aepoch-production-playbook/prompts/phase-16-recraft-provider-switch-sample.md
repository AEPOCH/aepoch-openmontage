# Phase 16 Handoff — Retire FLUX 1.1 and Sample Recraft V4

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch `aepoch-series`.

Monty independently inspected FLUX Sample 3 and confirmed rejection. After
three attempts, FLUX 1.1 repeatedly ignored the locked palette and emitted
generic representational tech glyphs. This handoff, once Chris explicitly
approves it, retires FLUX 1.1 for this pilot and authorizes one Recraft V4
raster sample. It does not authorize a batch.

## Proposed provider change and paid call

- Tool: registered `recraft_image`, repaired for the current V4 schema
- Provider: Recraft through fal.ai
- Model/endpoint: `recraft/v4/text-to-image`
- Mode: one sample only
- Scene: `hook-2b`
- Size: `landscape_16_9`
- Output: provider WebP normalized locally and honestly to PNG
- Estimated cost: $0.04
- No fallback, automatic retry, second image, or batch

Reason: Recraft V4 is design/brand oriented and the live endpoint exposes
explicit `colors` and `background_color` controls, directly targeting FLUX's
palette failure. Official schema:
`https://fal.ai/models/fal-ai/recraft/v4/text-to-image/api`.

## Read before acting

1. `AGENT_GUIDE.md`, latest durable state, decisions, and log
2. all FLUX sample handoffs and three reviews/images
3. `asset-inventory-and-prompts.md`
4. registered `tools/graphics/recraft_image.py` and shared image saver
5. official Recraft V4 schema linked above
6. current cost log and assets checkpoint

## Re-log the provider decision

Append, never mutate, under the exact existing pair
`category: provider_selection`, `subject: Image generation provider for
illustration plates`:

- select `recraft_image` / Recraft V4 raster for the new sample;
- record FLUX 1.1 as retired for this pilot after three evidenced attempts;
- preserve OpenAI as considered but not selected;
- state that this approves one Recraft sample, not a batch;
- prohibit automatic fallback.

## Repair the current Recraft V4 contract before spending

The live V4 raster schema supports `prompt`, `image_size`, `colors`,
`background_color`, and `enable_safety_checker`; it does not list the current
tool's legacy `style` parameter.

1. Add `background_color` to the public input schema, accepting the same hex
   or RGB shape as palette colors and normalizing it to one RGB object.
2. Add `enable_safety_checker` with default `true` and send it explicitly.
3. For model `v4`/`v4-pro`, do not send `style` to the V4 raster endpoint.
   Preserve the public field only for compatibility, document that V4 style
   direction belongs in the prompt, and do not silently route endpoints.
4. Preserve `save_image_correctly()` so returned WebP is detected and
   converted to the requested PNG without mislabeling.
5. Add focused mocked tests for payload keys, color/background normalization,
   absence of `style`, WebP-to-PNG normalization, endpoint selection, and
   unchanged cost estimate. Run focused and full contract suites before spend.

## Sample prompt and explicit palette

Adapt the approved revised Plate 2 prompt for Recraft without changing the
scene concept. Ask for a flat vector editorial illustration plate with:

- one small, softly rounded Clay human silhouette in the lower-middle third;
- 18-24 invented, nonrepresentational sharp-corner machine tiles, individually
  separated, made only from rectangles, angular polygons, split squares,
  short line segments, and hard-corner node clusters;
- no semantic/recognized glyphs, language-bearing marks, or consumer objects;
- at least one-third empty space, especially the upper third;
- uniform flat 2D geometry, consistent 3px strokes, no depth or lighting.

Pass these controls separately from the prompt:

- `colors`: Clay RGB(196,131,90), Iris RGB(139,175,212), Prism
  RGB(184,169,217), Ink RGB(26,22,18)
- `background_color`: Void RGB(12,11,10)
- `image_size`: `landscape_16_9`
- `enable_safety_checker`: true
- omit `style`

Record a new CHAI triplet and do not reuse FLUX seeds (Recraft is stochastic).

## Generate and review exactly once

Reserve/reconcile $0.04, make one call, download immediately, and verify real
source format, conversion provenance, PNG encoding, dimensions/aspect,
checksum, model, full prompt/palette/background payload, actual cost, and tool
metadata. Inspect at original resolution.

Reject any logo, currency mark, consumer-device/UI glyph, cloud/gear/padlock,
pseudo-text, representational icon, palette substitution, gradient/vignette,
disappearing figure, or dense generic montage. Write a durable Recraft sample
review beside the FLUX evidence, update checkpoint/current state/log, commit
and push authorized tracked changes, and stop for Chris/Monty.

## Hard stop

Do not generate a second image or batch. Do not generate other assets,
diagrams, TTS, music, SFX, or video. Do not process narration. Do not compose,
render, publish, or deploy.

