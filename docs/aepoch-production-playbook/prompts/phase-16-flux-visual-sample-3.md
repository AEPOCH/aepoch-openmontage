# Phase 16 Handoff — FLUX Visual Sample 3, Honest JPEG Gate

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch `aepoch-series`.

Attempt 2 cannot be visually reviewed because the repaired tool correctly
refused fal.ai's JPEG response to a PNG request before download. Do not spend
again trying to force PNG. This tranche authorizes one intentional JPEG sample
using fal.ai's documented 16:9 preset so Chris and Monty can finally judge the
revised art direction rather than transport semantics.

## Announced paid call

- Tool: registered `flux_image`
- Provider: FLUX through fal.ai
- Model: `flux-pro/v1.1`
- Scene: `hook-2b`
- Mode: exactly one visual-gate sample
- Requested format: `jpeg`, saved honestly with `.jpg`
- Requested size: fal.ai enum `landscape_16_9`
- Estimated cost: $0.05
- No fallback, no automatic retry, no batch

## Read before acting

1. `AGENT_GUIDE.md`, latest durable state and log
2. all three preceding FLUX handoffs and both sample reviews
3. revised Plate 2 Attempt 2 CHAI prompt in `asset-inventory-and-prompts.md`
4. official fal.ai schema:
   `https://fal.ai/models/fal-ai/flux-pro/v1.1/api`
5. `.agents/skills/flux-best-practices/SKILL.md`

## Small registered-tool contract addition

Before spending, extend `flux_image` to accept an optional `image_size` enum
with fal.ai's documented values, including `landscape_16_9`. When present,
send that enum unchanged; otherwise preserve the existing custom width/height
behavior. Add focused mocked tests for both branches and run the focused suite.
Do not weaken the content-type/extension safety check.

## Prompt

Use the fully revised Plate 2 Attempt 2 Post prompt unchanged: Clay human
figure, invented nonrepresentational sharp-corner machine tiles, Iris/Prism
linework, uniform Void field, at least one-third negative space, and no
semantic icons or recognized marks. Do not reuse either prior seed. Omit
`negative_prompt`.

## Generate and review once

Reserve/reconcile the $0.05 through the cost tracker. Request
`image_size: landscape_16_9`, `output_format: jpeg`, and a `.jpg` output path.
Download immediately. Record real content type, dimensions, aspect ratio,
checksum, model, seed, full prompt, actual cost, and result metadata.

The returned JPEG need not be 1920x1080 at this visual gate, but it must be
genuinely 16:9. Do not resize, crop, convert, or normalize it yet. Inspect at
original resolution and score the revised creative checklist. Reject any
recognizable logo, currency mark, consumer device, cloud/gear/padlock cliché,
pseudo-text, representational icon, off-palette cyan, gradient/vignette,
disappearing figure, or dense generic stock montage.

If the art passes, mark only the *visual sample* approved/pending human; do not
convert it or authorize batch. Write a Sample 3 review beside the earlier
reviews, update checkpoint/current state/log, commit/push authorized tracked
changes, and stop for Chris/Monty.

If the art fails, record the failure and recommend retiring FLUX 1.1 for this
pilot rather than paying for a fourth creative attempt. Do not select or call a
replacement provider without Chris's approval.

## Hard stop

Do not generate a second image or batch. Do not generate other images,
diagrams, TTS, music, SFX, or video. Do not process narration. Do not compose,
render, publish, or deploy.

