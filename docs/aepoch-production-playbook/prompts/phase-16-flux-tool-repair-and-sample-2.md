# Phase 16 Handoff — FLUX Tool Repair and Style Sample 2

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch `aepoch-series`.

Monty independently inspected the first generated `hook-2b` sample and
confirmed its rejection. This tranche authorizes a local registered-tool
contract repair followed by exactly one revised paid style sample. It does not
authorize a batch.

## Announced paid call

- Tool: repaired registered `flux_image`
- Provider: FLUX through fal.ai
- Model: `flux-pro/v1.1`
- Mode: one revised sample only
- Scene: `hook-2b`
- Required delivered file: true PNG, exact 1920x1080
- Estimated cost: $0.05
- No provider/model fallback and no automatic retry

## Read before acting

1. `AGENT_GUIDE.md`, latest durable state and log
2. original assets sample and retry handoffs
3. `assets/images/samples/hook-2b-sample-review.md` and rejected sample
4. `asset-inventory-and-prompts.md`
5. registered `tools/graphics/flux_image.py` and `tools/base_tool.py`
6. `.agents/skills/flux-best-practices/SKILL.md`
7. official fal.ai schema:
   `https://fal.ai/models/fal-ai/flux-pro/v1.1/api`

## Repair the tool before spending

Patch `flux_image` so its public input contract supports `output_format`
(`png` or `jpeg`, default `png` for this tool) and its fal.ai payload always
sends the requested value. Capture returned `content_type`, width, and height
in result metadata. Never save bytes under an extension that contradicts the
returned content type.

Add focused mocked contract tests proving:

1. custom width/height are sent as `image_size`;
2. `output_format: png` is sent;
3. returned content type/dimensions are preserved;
4. a content-type/extension mismatch fails rather than creating a mislabeled
   artifact;
5. this change does not alter provider selection or cost estimation.

Run the focused tests before the provider call. Do not make a paid diagnostic
call merely to test the patch.

## Revised sample prompt

Create and record a new CHAI pre/critique/post triplet. The final prompt must
not use the phrases “bot icons,” “system icons,” “tech icons,” or any named
consumer object, because those phrases caused generic brand/logo/icon soup.

Request this visual instead:

- one small, unmistakable, softly rounded human silhouette in flat Clay
  `#C4835A` / RGB(196,131,90), centered in the lower-middle third so it has
  strong contrast against Void;
- 18-24 invented, nonrepresentational sharp-corner machine tiles surrounding
  it: only plain outlined rectangles, angular polygons, split squares, short
  line segments, and tiny hard-corner node clusters;
- every machine tile geometrically abstract and semantically meaningless,
  individually separated for later Remotion animation;
- machine linework strictly Iris `#8BAFD4` / RGB(139,175,212), with optional
  sparse Prism `#B8A9D9` / RGB(184,169,217), no other accent;
- perfectly uniform solid Void `#0C0B0A` / RGB(12,11,10) background across
  every pixel, like a flat vector canvas rather than a lit environment;
- at least one-third intentional empty space, especially the upper third;
- static orthographic flat editorial diagram, uniform 3px strokes, no depth,
  shading, texture, glow, vignette, lighting falloff, or representational
  symbols;
- no language-bearing or culturally recognized marks of any kind. Phrase the
  request affirmatively around invented abstract geometry; omit
  `negative_prompt` per the FLUX skill.

Do not reuse seed `3735125555`. Generate a new seed and record it.

## Generate and verify exactly once

Reserve the $0.05 maximum through the cost tracker, make one call, download
immediately, and verify actual MIME/encoding, dimensions, checksum, model,
seed, prompt, and actual cost. If fal.ai again returns anything other than a
true exact 1920x1080 PNG, reject and stop; do not normalize, resize, crop, or
convert it during this sample gate.

Inspect visually at original resolution. Reject any recognizable logo,
currency mark, consumer-device icon, cloud/gear/padlock cliché, pseudo-text,
off-palette cyan, gradient, vignette, disappearing figure, or dense stock-icon
montage. Structural separability alone is not sufficient.

Write the second sample review beside the first, update checkpoint/current
state/log, commit and push authorized tracked changes, and stop for
Chris/Monty's visual approval.

## Hard stop

Do not generate a second image or batch. Do not generate other images,
diagrams, TTS, music, SFX, or video. Do not process narration. Do not author
composition code, compose, render, publish, or deploy.

