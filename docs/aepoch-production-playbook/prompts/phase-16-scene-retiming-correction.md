# Phase 16 Handoff — Scene-Retiming Boundary Correction

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch `aepoch-series`.

Monty's review of the completed timing-lock tranche found that proportional
scene scaling placed eight internal visual cuts inside spoken words. Gate 4 is
not closed. This handoff authorizes a narrow correction of scene timing fields
and timing-derived verification metadata only.

## Read before acting

1. `AGENT_GUIDE.md`
2. latest durable state and log
3. `docs/aepoch-production-playbook/prompts/phase-16-human-narration-timing-lock.md`
4. `knowledge/wiki/reports/phase-16-retimed-storyboard-review.md`
5. canonical word alignment, locked script, scene plan, timing lock, and assets checkpoint

## Correct the blocking cuts

The review identifies eight cut times that cross spoken words: 21.009,
82.010, 100.165, 157.886, 191.829, 214.658, 248.351, and 261.729 seconds.

1. Move each affected boundary to a nearby intentional word onset, word end,
   or measured pause that semantically supports the two unchanged scene
   concepts on either side.
2. Audit every other internal boundary too; passing the eight known failures
   is necessary but not sufficient.
3. Do not derive replacement boundaries through proportional scaling or equal
   subdivision.
4. `tail-hold-mark`, described as “no narration,” must begin no earlier than
   the final spoken-word end at approximately 263.39s. Preserve a useful mark
   hold and the approved release-to-black within the 280-second runtime.
5. Preserve every scene ID, description, type, visual subject, shot intent,
   movement, transition, asset requirement, creative decision, section
   boundary, enhancement cue, and narration timing. Change only scene
   `start_seconds`/`end_seconds` plus timing-derived review/checkpoint metadata.

## Verification

- Validate the script and scene plan against their schemas.
- Prove exact 0.0-280.0 scene coverage with no gap or overlap.
- Programmatically prove no internal scene boundary lies strictly inside any
  canonical spoken-word interval.
- Confirm `tail-hold-mark` and `tail-release` contain no narration.
- Confirm every enhancement cue remains inside a scene and its owning section.
- Confirm every scene remains within the active duration guidance, or disclose
  any unavoidable exception.
- Rerun variation and slideshow-risk checks.
- Produce a semantic diff proving only scene timing fields and timing-derived
  metadata changed in this correction.

Update the review evidence, checkpoint partial progress, current state, and
durable log. Commit and push only the authorized tracked changes, then stop for
Monty's Gate 4 review.

## Hard stop

Do not modify or master audio. Do not generate TTS, images, diagrams, music,
sound effects, review stills, or other assets. Do not author composition code,
compose, render, publish, or deploy.

