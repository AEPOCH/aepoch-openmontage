# Phase 16 Handoff — Generate `landing-1a` with Recraft V4

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch
`aepoch-series`.

Chris explicitly approved this single paid call via Monty on 2026-08-03,
after Monty's independent acceptance of the locally corrected `build-2a`
plate. This is the conditional second Recraft call already planned by
Approach 2 (`decision_log` `d-024`), now separately authorized.

## Announced paid call

- Tool: registered `recraft_image`
- Provider: Recraft through fal.ai
- Model/endpoint: `recraft/v4/text-to-image`
- Mode: exactly one Plate 12 `landing-1a` generation; single sample, not batch
- Maximum cost: `$0.04`
- Current project spend: `$1.2731` of `$2.00`
- Projected spend after success: `$1.3131`
- No retry, provider/model fallback, or second generation call

## Required reading

Before acting, read:

1. `AGENT_GUIDE.md` and the durable knowledge startup set
2. `pipeline_defs/animated-explainer.yaml`
3. `skills/pipelines/explainer/asset-director.md`
4. the registered `recraft_image` tool contract and any current Layer 3
   skills listed by the registry
5. `docs/aepoch-production-playbook/prompts/phase-16-recraft-visual-plate-batch.md`
6. `projects/aepoch-blog-pilot-what-is-aepoch/asset-inventory-and-prompts.md`,
   especially the Recraft Plate 12 CHAI triplet
7. `assets/images/recraft-batch-correction-plan-review.md`
8. the accepted `build-2a` attempt-4 plate and its independent-review evidence
9. the current provisional asset manifest, assets checkpoint, decision log,
   and cost log

Preserve unrelated dirty and untracked files.

## Locked prompt and controls

Use the existing Recraft Plate 12 Post prompt as the semantic source of truth:

> A flat, two-dimensional editorial graphic, orthographic and static, with no
> lighting, no shading, no depth, no perspective, and no camera. Several --
> between five and seven -- clearly recognizable person pictograms, each
> identical in style and size: a plain circular head, softly rounded shoulders
> and torso, two separated arms, two separated legs, with no facial features.
> All figures are the same size, evenly distributed across the wide frame with
> generous irregular spacing and no single figure larger, more central, more
> detailed, or positioned higher than any other -- no hierarchy of any kind.
> Every figure is rendered as a single flat solid fill in Clay color. The
> background fills the frame in one perfectly flat, uniform warm solid color
> with no gradient or lighting variation. Generous open negative space at the
> top and bottom of the frame. Uniform thin strokes throughout. No recognized
> symbols, objects, letters, numerals, logos, or brand marks anywhere in the
> image.

Before the call, perform and record the asset director's CHAI pre/critique/post
review. The post prompt may be strengthened only to make the already-required
flatness explicit: no internal contour/topographic/fingerprint/wood-grain
lines, nested outlines, hatching, stripes, pattern, gradient, shading, shadow,
glow, border, or outline inside or around any figure. Do not change the concept,
count range, hierarchy, anatomy, palette, or framing.

Use exactly these structured controls:

- `model`: `v4`
- `image_size`: `landscape_16_9`
- `colors`: Clay `#C4835A` only
- `background_color`: Paper `#FAF8F5`
- `enable_safety_checker`: `true`
- omit `style` from the live V4 request

Write a successful result to:

`projects/aepoch-blog-pilot-what-is-aepoch/assets/images/plates/landing-1a_silhouettes-community-plural_recraft-v4.png`

Do not overwrite any existing asset.

## Verification and evidence

After exactly one call:

1. Record the exact request payload, provider/model, response, real cost,
   duration, encoding, dimensions, byte size, and checksum.
2. Inspect the image at native resolution. Verify 5-7 recognizable people,
   equal apparent size, no hierarchy, consistent anatomy, separated arms and
   legs, generous spacing, flat Clay fill, Paper background, and absence of
   every forbidden texture/treatment/object/text defect named above.
3. Measure representative fill/background pixels and report RGB/hex. Palette
   drift must be reported honestly; do not silently post-process it in this
   tranche.
4. Create or append a focused `landing-1a` review artifact and refresh the
   relevant contact sheet if required by the project's evidence convention.
5. Update the inventory, provisional asset manifest, assets checkpoint,
   decision log only where append-only governance requires it, cost log, and
   durable knowledge so all state agrees. Preserve all earlier attempts and
   decisions. Keep the assets checkpoint `in_progress`/not human-approved.
6. Validate changed JSON artifacts against their schemas, review the scoped
   diff, commit only intended tracked files, and push to `aepoch-series`.

If the call fails or the result fails review, record the actual outcome and
real provider-reported cost, then stop. Do not retry and do not substitute.

## Hard stop

Stop after reporting the image, review verdict, cost, measurements, evidence,
commit, and residual risks. Do not locally recolor or otherwise correct a
failed result; do not make another provider call; do not author the planned
native geometry; do not compose, render, publish, or deploy. Monty will review
the result independently before any further production authorization.
