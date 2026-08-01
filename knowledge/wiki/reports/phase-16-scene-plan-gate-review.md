---
type: Report
title: Phase 16 Scene-Plan Gate — Executive Producer Review
status: stable
project_state: blocked
verified:
  by: process:executive-producer-scene-plan-review
  at: 2026-08-01T17:45:00+01:00
sources:
  - id: scene-plan
    resource: ../../../projects/aepoch-blog-pilot-what-is-aepoch/artifacts/scene_plan.json
    title: Phase 16 scene-plan artifact
  - id: script
    resource: ../../../projects/aepoch-blog-pilot-what-is-aepoch/artifacts/script.json
    title: Approved Phase 16 script
  - id: visual-language
    resource: ../../../brands/aepoch/VISUAL_LANGUAGE.md
    title: ÆPOCH visual language
  - id: playbook
    resource: ../../../styles/aepoch-symbolic.yaml
    title: ÆPOCH symbolic playbook
---

# Phase 16 Scene-Plan Gate — Executive Producer Review

## Verdict

**REVISE before Chris's scene-plan approval.** The artifact is schema-valid,
covers all 280 seconds without gaps or overlaps, maps every script section,
and passes the repository's variation and slideshow-risk checks. Four concrete
content, brand, and execution-contract defects remain despite those automated
scores.

## Checks passed

- Schema-valid: 31 scenes, all required fields present.
- Complete 280-second coverage with no timeline gaps or overlaps.
- Every approved script section and enhancement cue is covered.
- Atelier composition mode and Remotion runtime are preserved.
- The Presence Ring is planted once and paid off once at the single Signal
  reveal.
- No third-party logos, paid calls, asset generation, or downstream stage work
  occurred.
- Variation checker reports `strong` with score `0.0`.
- Slideshow-risk checker reports `strong` with average `0.42`.

## Required corrections

1. **Unsupported survey inference reintroduced (`hook-1b`).**
   `shot_intent` says the scene visualizes “nine out of ten,” although the
   approved script explicitly removed that inference because the survey did
   not measure the people in a feed. Replace the intent and crowd logic with a
   faithful uncertainty-to-human-focus interpretation that does not imply a
   nine-of-ten population ratio.

2. **Forbidden radial diagram (`build-3a`).**
   `framing` specifies a “radial/convergent layout.” `VISUAL_LANGUAGE.md`
   requires diagrams to run left-to-right or top-to-bottom and forbids radial
   mind-map layouts. Rebuild this as a linear three-source extraction sequence
   flowing into the collection point.

3. **Contradictory and checker-driven camera metadata.**
   Several scenes state that there is no camera movement or a static hold while
   `shot_language.camera_movement` says otherwise: `hook-2b` (`dolly_out` vs.
   “no camera movement”), `build-2a` (`dolly_in` vs. “no positional movement”),
   and `landing-1a` (`dolly_out` vs. “Static hold”). The top-level
   `metadata.camera_note` also says all scenes are static except `climax-3` and
   that lighting/color fields are omitted, while the artifact contains many
   pans/dollies and populates those fields throughout. Reconcile each scene's
   movement, shot language, and shot intent; remove motion added solely to
   satisfy variation scoring. Rewrite `camera_note` to describe the artifact
   truthfully, then rerun the checkers without gaming them.

4. **Playbook-breaking 18.75-second logo hold (`tail-hold`).**
   The active playbook caps a scene hold at 12 seconds. The disclosed rationale
   incorrectly treats splitting as impossible. Keep the ÆPOCH mark for no more
   than 12 seconds, then use a distinct wordless Paper-to-black release for the
   remaining time. This preserves the protected closing line, introduces no
   CTA or recap, avoids repeating the same primary subject, and respects the
   playbook.

## Non-blocking observations

- `climax-2b-scene` is 2.92 seconds, only 0.08 seconds under the playbook's
  three-second minimum. Accept as a disclosed timing exception because it
  follows the approved narration boundary.
- Thirteen of 31 scenes are text-based. The checker keeps this below its flag
  threshold, but the assets review should confirm that the final treatment
  feels like editorial animation rather than animated slides.
- OpenAI versus ElevenLabs remains an unresolved audio decision and does not
  block scene-plan correction.

## Next action

Claude makes a scene-plan-only revision, reruns schema validation, variation,
and slideshow-risk checks, refreshes the checkpoint as `awaiting_human`,
updates durable knowledge, commits/pushes, and stops. No asset or audio
generation is authorized.
