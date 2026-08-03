# Phase 16 Handoff — Human Narration Timing Lock and Scene Retiming

You are continuing project `aepoch-blog-pilot-what-is-aepoch` on branch
`aepoch-series`.

Chris and Monty approved the new human narration at Gate 4. Chris confirmed by
ear that the two ASR ambiguities are the canonical words “if” at approximately
124.43s and “loud” at approximately 195.78s. He accepts the slight delivery
stumbles and does not require a rerecord.

This handoff authorizes timing-lock and mechanical retiming only. It does not
authorize audio mastering, visual generation, composition, or rendering.

## Read before acting

1. `AGENT_GUIDE.md`
2. the latest durable state and log
3. `knowledge/wiki/reports/phase-16-human-narration-timing-gate-review.md`
4. `knowledge/production/pipeline.md`, Gate 4 — Timing lock
5. `pipeline_defs/animated-explainer.yaml`
6. the approved script and scene plan
7. `assets/audio/chris/deviation_report.md`
8. `assets/audio/chris/asr_word_timestamps_raw.json`
9. `assets/audio/chris/canonical_word_alignment.json`
10. `assets/audio/chris/proposed_timing_map.json`
11. the current assets checkpoint and decision log

## Lock the human confirmation

1. Preserve raw ASR evidence unchanged.
2. Update the reconciled canonical alignment—not the raw ASR—to mark `if` at
   ~124.43s and `loud` at ~195.78s as `human_confirmed: true`, recording Chris's
   accepted slight stumble on each.
3. Update the deviation report so both items are resolved as correct canonical
   words with minor accepted delivery stumbles. Keep the original ASR readings
   visible as evidence.
4. Write a durable timing-lock artifact under `assets/audio/chris/` containing
   source/derived checksums, confirmed speech boundaries, canonical word map
   reference, final section boundaries, target duration, and approval evidence.

## Timeline placement

Use the complete source audio at timeline t=0 for now, including its natural
leading and trailing room tone. Do not trim, normalize, denoise, compress,
gate, EQ, or speed-change it in this tranche. The first aligned word remains
around 2.89s and the last around 263.39s; the 280-second composition retains a
wordless ending after the narration.

## Update canonical timing fields

1. Update `script.json` section start/end timing and narration-end/tail-hold
   metadata to the approved real-performance boundaries. Preserve every spoken
   word, claim, delivery cue, pronunciation guide, and non-timing decision.
2. Reposition every script enhancement cue to a meaningful real-performance
   word/pause boundary within its owning section. Do not distribute cues
   mechanically or leave any cue outside its section.
3. Retiming must not rewrite the approved script text or visual concepts.

## Retime the approved scene plan

1. Retime all 32 approved scenes against the real human performance, preserving
   IDs, descriptions, visual subjects, shot intent, movement, transitions,
   required assets, Presence Ring/Signal reveal, and atelier/runtime choices.
2. Cover exactly 0.0–280.0 seconds with no gaps or overlaps, including natural
   pauses, leading room tone, and the wordless ending.
3. Place visual changes and the single Signal reveal on their corresponding
   real spoken words or purposeful pauses. KAIROS must align to its actual
   spoken occurrence.
4. Keep scene durations within the active playbook where possible. If the real
   performance creates an exception, solve it by moving a visual boundary
   within the same approved concept before disclosing an exception. Do not
   invent a new visual concept merely to satisfy a duration checker.
5. Update timing-only metadata and any scene-plan review arithmetic that became
   stale. Do not alter creative-review conclusions without evidence.

## Verification

- Validate `script.json` and `scene_plan.json` against their schemas.
- Verify all 17 sections are ordered and mapped.
- Verify every canonical word is aligned or explicitly human-confirmed/
  interpolated with provenance.
- Verify every enhancement cue falls within its owning section and a scene.
- Verify exact 0–280s scene coverage with no gaps/overlaps.
- Rerun variation and slideshow-risk checks; report results honestly.
- Diff the scene plan semantically and prove that only timing-related fields
  and timing-derived metadata changed.

Keep `checkpoint_assets.json` `in_progress`; update
`metadata.partial_progress` with the approved narration, timing-lock paths,
retimed artifact checks, and next action. Update durable knowledge,
commit/push the authorized tracked changes, and stop for Chris/Monty's retimed
storyboard review.

## Hard stop

Do not master or modify audio. Do not generate TTS, images, diagrams, music,
sound effects, review stills, or any other asset. Do not author composition
code, compose, render, publish, or deploy.
