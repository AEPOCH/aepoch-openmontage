# Phase 16 Handoff — Approved Script to Scene Plan

You are continuing the real “What is ÆPOCH?” blog pilot on branch
`aepoch-series` in project `aepoch-blog-pilot-what-is-aepoch`.

Chris approved the Phase 16 script at revision round 3 on 2026-08-01. This
handoff authorizes the `scene_plan` tranche only.

## Read before acting

Read these files in order:

1. `AGENT_GUIDE.md`
2. `knowledge/state/current-state.md`
3. `knowledge/index.md`
4. the latest entries in `knowledge/log.md`
5. `pipeline_defs/animated-explainer.yaml`
6. `skills/meta/checkpoint-protocol.md`
7. `skills/pipelines/explainer/scene-director.md`
8. `skills/meta/taste-direction.md`
9. `skills/meta/bespoke-composition.md`
10. `brands/aepoch/VISUAL_LANGUAGE.md`
11. `brands/aepoch/SERIES_BIBLE.md`
12. the approved proposal, script, source extraction, benchmark analysis,
    active playbook, and decision log for this project

## Authorized work

1. Rewrite `checkpoint_script.json` as `completed` with
   `human_approved: true`, preserving checkpoint history.
2. Run `get_next_stage()` and confirm that `scene_plan` is next.
3. Write an initial `in_progress` scene-plan checkpoint before planning.
4. Produce a schema-valid, atelier-specific scene plan covering the complete
   280-second timeline with no gaps or overlaps.
5. Preserve all approved narration timing and enhancement-cue intent.
6. Specify clear shot intent, motion purpose, transition logic, asset
   requirements, and representative review-frame intent for every scene.
7. Run schema validation, the reviewer protocol, variation checking, and
   slideshow-risk scoring. Correct every critical finding.
8. Checkpoint `scene_plan` as `awaiting_human`, update durable knowledge,
   commit and push the authorized changes, and stop.

## Creative constraints

This is approved as `composition_mode: atelier`. Plan bespoke ÆPOCH
compositions, not stock Remotion scene templates, registry blocks, frozen
components, or generic explainer layouts. Reuse engine knowledge, never
creative components.

Enforce the locked visual grammar:

- Void-to-Paper narrative color shift
- soft human shapes versus sharp system shapes
- circle, ring, and arc vocabulary
- Signal accent used for one reveal only
- purposeful, restrained movement rather than decorative pan-and-zoom
- sufficient visual and layout variation to avoid slideshow behavior
- no third-party logos, coins, price charts or tickers, hackers, cyberpunk,
  generic icon packs, decorative gradients, textures, or shadows

## Open audio decision

ElevenLabs is now configured, so the proposal's statement that OpenAI is the
only available TTS provider is stale. Do not select a provider or generate
audio during this tranche. Record OpenAI versus ElevenLabs as an open decision
that Chris must resolve before the asset/audio stage. Do not silently mutate
the previously logged voice choice; any later change must be appended using
the same decision-log category and subject, per `AGENT_GUIDE.md`.

## Hard stop

Do not generate images, narration, music, sound effects, or any other asset.
Do not make a paid call. Do not compose or render video. Do not begin `assets`,
`edit`, `compose`, `publish`, or deployment work.

End with the schema-valid `scene_plan` checkpointed `awaiting_human` for Chris
and Monty's review.
