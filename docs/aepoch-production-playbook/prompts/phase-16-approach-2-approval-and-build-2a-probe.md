# Phase 16 Handoff — Approach 2 Approval and `build-2a` Recraft Probe

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch `aepoch-series`.

Chris explicitly approved Approach 2 on 2026-08-03: deterministic
Remotion-native geometry for the remaining diagram/icon concepts, with Recraft
V4 reserved for the remaining editorial human/community plates. The total
approved ceiling is two paid calls / $0.08, but this tranche authorizes only the
first gated probe / $0.04. Stop for Monty review before the conditional second
call.

## Announced paid call

- Tool: registered `recraft_image`
- Provider: Recraft through fal.ai
- Model/endpoint: `recraft/v4/text-to-image`
- Mode: one correction probe for Plate 6, `build-2a`
- Cost: one call, $0.04 maximum in this tranche
- Current project spend: $1.2331 of $2.00
- Projected spend after the probe: $1.2731
- No retry, provider/model fallback, or second image call

## Read before acting

1. `AGENT_GUIDE.md`, durable knowledge state/decisions/log
2. `pipeline_defs/animated-explainer.yaml`
3. `skills/pipelines/explainer/asset-director.md`
4. `.agents/skills/recraft` or the registered tool's current Layer 3 skill
5. `assets/images/recraft-batch-correction-plan-review.md`
6. `assets/images/recraft-plate-batch-review.md`
7. the approved anchor and rejected Plate 6 at native resolution
8. current asset inventory, manifest, checkpoint, decision log, and cost log

## Record Chris's binding decision

Append a new decision-log entry under the exact existing pair:

- `category`: `provider_selection`
- `subject`: `Image generation provider for illustration plates`

Record that Approach 2 supersedes the all-Recraft remainder in `d-023`:

- `build-1a`/`build-1b`, `build-6a`, and `climax-2-sceneA` are now
  deterministic Remotion-native geometry;
- Recraft V4 remains selected for `build-2a`/`climax-3` and `landing-1a`;
- two Recraft calls / $0.08 are approved in total, gated one at a time;
- this tranche authorizes only the `build-2a` probe / $0.04;
- no provider/model fallback and no creative retry.

Do not mutate or delete prior decision entries.

## Reconcile the planned inventory before generation

Update the asset inventory, provisional manifest metadata, checkpoint notes,
and scene mappings to reflect the approved native/generated split. Native
geometry is planned composition work, not a generated asset: do not author the
Remotion composition in this tranche and do not falsely mark those scenes as
completed assets.

## Plate 6 correction probe

Generate exactly one replacement for `build-2a`, reused by `climax-3`. Preserve
the accepted editorial family and smallest palette:

- Paper `#FAF8F5` background;
- one warm Clay `#C4835A` human silhouette;
- recognizable adult human with head, torso, two distinct arms, and two
  distinct legs;
- centered, calm, upright, generous surrounding negative space;
- one continuous, completely uniform, opaque flat fill;
- no internal lines of any kind.

The post-caption must explicitly forbid: topographic/contour lines, wood grain,
fingerprint lines, hatching, stripes, nested outlines, internal decoration,
patterns, texture, gradient, shading, shadow, glow, lighting, depth, border,
outline, facial features, clothing detail, text, symbols, and extra objects.

Use Recraft's structured `colors` and `background_color` controls. Use
`image_size: landscape_16_9`, `enable_safety_checker: true`, omit `style`, and
preserve honest returned-format provenance. Run and record the CHAI
pre-caption/critique/post-caption triplet before the call.

## Verification and hard stop

After the one call:

1. Verify actual encoding, dimensions, checksum, request payload,
   provider/model, real cost, and scene/reuse mapping.
2. Inspect at native resolution. The image fails if any internal line, texture,
   pattern, palette drift, missing limb, extra object, or non-flat treatment is
   visible.
3. Produce an individual review and update the contact sheet, provisional
   manifest, checkpoint, cost record, and durable log honestly.
4. Keep the assets checkpoint `in_progress` regardless of probe outcome.
5. Commit and push only intended tracked changes.
6. Stop for Monty/Chris review.

Do **not** generate `landing-1a` in this tranche, even if the probe passes. Do
not retry a failed probe. Do not call another provider, generate diagrams,
author native geometry/composition code, modify narration, generate TTS/music/
SFX/video, render, publish, or deploy.

