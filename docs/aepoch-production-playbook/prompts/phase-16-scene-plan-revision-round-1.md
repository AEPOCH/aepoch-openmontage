# Phase 16 Handoff — Scene-Plan Revision Round 1

You are continuing project `aepoch-blog-pilot-what-is-aepoch` on branch
`aepoch-series`.

Read `AGENT_GUIDE.md`, the durable project state, and
`knowledge/wiki/reports/phase-16-scene-plan-gate-review.md` before acting.
Then reread the scene director, reviewer protocol, active playbook,
`brands/aepoch/VISUAL_LANGUAGE.md`, approved script, current scene plan, and
the original scene-plan tranche prompt.

## Authorized correction scope

Revise only `scene_plan` and its checkpoint/knowledge evidence:

1. Remove the unsupported “nine out of ten” inference from `hook-1b`'s
   `shot_intent`, description, asset description, metadata, and any other
   occurrence. Preserve a faithful uncertainty-to-human-focus visual without
   implying a population ratio the source did not measure.
2. Replace `build-3a`'s forbidden radial/convergent framing with a
   left-to-right or top-to-bottom linear extraction flow, as required by
   `VISUAL_LANGUAGE.md`.
3. Reconcile movement instructions and `shot_language.camera_movement` in
   every scene. At minimum correct `hook-2b`, `build-2a`, and `landing-1a`.
   Remove any pan/dolly added only to game variation scoring. Make
   `scene_plan.metadata.camera_note` accurately describe the final artifact,
   including the actual camera-motion and lighting/color fields.
4. Replace the 18.75-second `tail-hold` with a compliant ending: the ÆPOCH
   mark may hold for no more than 12 seconds, followed by a distinct wordless
   Paper-to-black release covering the remaining timeline. Add no narration,
   text, recap, or CTA, and preserve total duration at exactly 280 seconds.

Preserve the approved narration, section timing, claims, cue intent, Presence
Ring/Signal reveal, atelier mode, runtime, provider decisions, and all other
approved creative choices.

## Verification and hard stop

- Validate against `schemas/artifacts/scene_plan.schema.json`.
- Verify exact 0–280 second coverage with no gaps or overlaps.
- Verify every script section and enhancement cue remains covered.
- Rerun variation and slideshow-risk checks and report honest before/after
  results; do not optimize metadata merely to satisfy the checker.
- Run the reviewer protocol and correct every critical finding.
- Refresh `checkpoint_scene_plan.json` as `awaiting_human`.
- Update durable knowledge, commit/push the authorized changes, and stop.

Do not approve the gate yourself. Do not start `assets`. Do not generate
images, narration, music, sound effects, review stills, or any other asset. Do
not make a paid call, compose, render, publish, or deploy.
