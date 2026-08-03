# Phase 16 Handoff — Retry `build-2a` Probe After fal.ai 503

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch `aepoch-series`.

Chris explicitly authorized one retry after the prior `build-2a` correction
probe failed before generation with HTTP 503 and cost $0.00. This is an
identical-prompt infrastructure retry, not a new creative iteration.

## Announced paid call

- Tool: registered `recraft_image`
- Provider: Recraft through fal.ai
- Model/endpoint: `recraft/v4/text-to-image`
- Mode: one retry of the corrected Plate 6 `build-2a` probe
- Cost: one call, $0.04 maximum
- Current project spend: $1.2331 of $2.00
- Projected spend after a successful retry: $1.2731
- No second retry, provider/model fallback, prompt change, or `landing-1a` call

## Read before acting

1. `AGENT_GUIDE.md`, durable knowledge state/decisions/log
2. `pipeline_defs/animated-explainer.yaml`
3. `skills/pipelines/explainer/asset-director.md`
4. the registered `recraft_image` tool's current Layer 3 skill
5. `docs/aepoch-production-playbook/prompts/phase-16-approach-2-approval-and-build-2a-probe.md`
6. `assets/images/recraft-build-2a-probe-review.md`
7. `asset-inventory-and-prompts.md`, Plate 6 attempt 2's complete CHAI triplet
8. current manifest, checkpoint, decision log, and cost log

## Locked inputs

Reuse Plate 6 attempt 2's post-caption and request parameters **verbatim**.
Do not rewrite, shorten, strengthen, or otherwise creatively alter the prompt.
Use the same structured controls:

- `image_size`: `landscape_16_9`
- `colors`: Clay `#C4835A` only
- `background_color`: Paper `#FAF8F5`
- `enable_safety_checker`: `true`
- omit `style`

Write any successful result to a distinct attempt-3 path so neither the
original rejected image nor the failed attempt-2 record is overwritten:

`assets/images/plates/build-2a_silhouette-warm-clay_recraft-v4-attempt3.png`

Decision `d-024` remains the current provider/inventory decision. Do not append
a redundant provider-selection decision because this retry does not change the
selected approach, provider, model, or scope. Record Chris's retry authorization
in the probe review, checkpoint, cost evidence, and durable log.

## Verification and hard stop

After exactly one call:

1. Verify actual encoding, dimensions, checksum, exact request payload,
   provider/model, real cost, and `build-2a`/`climax-3` reuse mapping.
2. Inspect at native resolution. Reject if any internal line, contour,
   wood-grain/fingerprint texture, pattern, gradient, shading, shadow, border,
   outline, palette drift, missing limb, extra object, or non-flat treatment is
   visible.
3. Append the attempt-3 outcome to the existing probe review without erasing
   attempt 2's 503 evidence. Update the contact sheet, provisional manifest,
   checkpoint, cost record, inventory, and durable log honestly.
4. Keep the assets checkpoint `in_progress` regardless of outcome.
5. Commit and push only intended tracked changes.
6. Stop for Monty/Chris review.

If this call returns another 503/429 or any other failure, record the real
$0.00 or provider-reported cost and stop. Do not retry again. Even if the image
passes Claude's self-review, do **not** generate `landing-1a` in this tranche.
Do not call another provider, author native geometry/composition code, modify
narration, generate diagrams/TTS/music/SFX/video, render, publish, or deploy.

