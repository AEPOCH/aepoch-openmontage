# Phase 16 Handoff — Local `build-2a` Palette Correction

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch
`aepoch-series`.

Chris approved this tranche via Monty on 2026-08-03. The approved operation
is a deterministic, local palette correction of the technically clean
`build-2a` attempt-3 plate. This is not a new generation attempt and must not
invoke Recraft, fal.ai, or any other provider.

## Approved outcome

Create one new, non-destructive corrected derivative of:

`projects/aepoch-blog-pilot-what-is-aepoch/assets/images/plates/build-2a_silhouette-warm-clay_recraft-v4-attempt3.png`

Write it to:

`projects/aepoch-blog-pilot-what-is-aepoch/assets/images/plates/build-2a_silhouette-warm-clay_recraft-v4-attempt4-local-recolor.png`

Preserve the attempt-3 source byte-for-byte. Preserve its silhouette geometry,
edges, dimensions, and flat treatment. Correct the figure's flat interior from
the measured drifted orange `#E56836` to ÆPOCH Clay `#C4835A`. Correct the
uniform background to ÆPOCH Paper `#FAF8F5` if this can be done without
altering silhouette geometry or edge quality. Do not redraw, regenerate,
inpaint, stylize, crop, scale, sharpen, blur, or introduce texture.

Use a deterministic local image-processing method appropriate to the actual
pixel structure. Document the exact mask/selection rule and command or code
path so the result is reproducible. Do not add an ad-hoc production provider
script; a narrow local transformation or existing repository/media utility is
acceptable.

## Required reading and governance

Before acting, read:

1. `AGENT_GUIDE.md` and the required durable knowledge startup set
2. `pipeline_defs/animated-explainer.yaml`
3. `skills/pipelines/explainer/asset-director.md`
4. `projects/aepoch-blog-pilot-what-is-aepoch/assets/images/recraft-build-2a-probe-review.md`
5. the current asset inventory, provisional asset manifest, assets checkpoint,
   decision log, and cost log
6. the control-room approval reference attached to this dispatch

Respect the existing animated-explainer assets-stage checkpoint. Preserve all
unrelated dirty and untracked files.

## Verification and evidence

After producing the derivative:

1. Verify encoding, dimensions, checksum, and that attempt 3 is unchanged.
2. Measure representative figure-interior pixels and report exact RGB/hex;
   target `#C4835A` with no material variance in the flat interior.
3. Measure representative background pixels and report exact RGB/hex; target
   `#FAF8F5` if background correction was safely performed.
4. Verify silhouette geometry and occupied-pixel mask against attempt 3. Any
   changed geometry, missing limb, new object, edge damage, texture, gradient,
   outline, shadow, or non-flat treatment is a failure.
5. Inspect the result at native resolution and refresh the relevant contact
   sheet if the existing production evidence convention requires it.
6. Append the attempt-4 result to
   `assets/images/recraft-build-2a-probe-review.md` without erasing earlier
   attempts or the 503 history.
7. Update the asset inventory, provisional asset manifest, assets checkpoint,
   decision log where a changed production method requires an append-only
   decision, and durable knowledge log/state so they agree. Real provider cost
   for this tranche is `$0.00`; do not alter historical spend.
8. Keep the assets checkpoint `in_progress`. Record `build-2a` and its
   `climax-3` reuse as accepted only if all checks pass.
9. Run focused validation, review the diff, commit only intended files, and
   push to `aepoch-series`.

## Hard stop

Stop after reporting the corrected plate, measurements, verification, changed
files, commit, and any residual risks. Do not generate `landing-1a`; do not
invoke any paid or network media provider; do not author composition geometry;
do not compose, render, publish, or deploy. `landing-1a` remains a separate
human approval gate after Monty's independent review of this result.
