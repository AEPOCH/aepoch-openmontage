# Phase 16 Handoff — Delivery Mode: Build and Render Draft 1

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch
`aepoch-series`.

Chris explicitly approved this delivery-mode reset via Monty on 2026-08-03
after concluding that the prior micro-tranche process had optimized evidence
and isolated-asset perfection at the expense of producing a video.

This is one consolidated production brief. Complete the remaining assets,
edit, composition, and one watchable Draft 1 render in this run. Do not stop at
intermediate human gates. Record Chris's explicit full-run pre-authorization
as an append-only `approval_policy` decision covering assets -> edit -> compose
for Draft 1 only. It does not authorize publishing.

## Delivery objective

Produce a complete, playable Draft 1 of the approved ~280-second “What is
AEPOCH?” blog-pilot video using the locked human narration, locked timing,
approved scene plan, existing usable assets, and the already-approved
Remotion + atelier path.

Write the deliverable to:

`projects/aepoch-blog-pilot-what-is-aepoch/renders/draft-1/aepoch-what-is-aepoch-draft-1.mp4`

The definition of success is a full watchable video, not perfect isolated
assets. Draft 1 may contain non-critical visual roughness. Fix render blockers,
missing audio, broken timing, black frames, unreadable text/captions, invalid
assets, or obviously wrong scene content. Record lesser polish issues for the
single human review after the render instead of blocking delivery.

## Locked production decisions

- Pipeline: `animated-explainer`
- Concept: C1, “The Realness Tax”
- Runtime: `remotion` (Remotion and HyperFrames were both presented earlier;
  Remotion was explicitly selected and is already logged)
- Composition mode: `atelier`
- Duration/timeline: use the real human-narration timing lock; approximately
  280 seconds, with the canonical scene plan covering 0.0-280.0 seconds
- Narration: Chris's existing recorded narration and its locked timing map
- Music: none; the existing decision defers music and excludes Chris's personal
  collection from scope
- Provider generation: none in this run
- Publishing/deployment: not authorized

Do not reopen these choices or ask for another runtime/provider/music decision.

## Required reading before implementation

1. `AGENT_GUIDE.md` and the required durable knowledge startup set
2. `pipeline_defs/animated-explainer.yaml`
3. `skills/pipelines/explainer/asset-director.md`
4. `skills/pipelines/explainer/edit-director.md`
5. `skills/pipelines/explainer/compose-director.md`
6. `skills/meta/taste-direction.md`
7. `skills/meta/bespoke-composition.md`
8. `.agents/skills/remotion/SKILL.md`
9. `.agents/skills/remotion-best-practices/SKILL.md` and only the rule files
   needed for this composition (assets, audio, captions/subtitles, timing,
   sequencing, transitions, images, compositions)
10. the approved proposal, script, scene plan, human narration timing lock,
    current asset inventory/manifest, decision log, checkpoints, AEPOCH brand
    visual-language documents, and prior accepted/rejected review evidence

Use existing engine mechanics and project conventions, but do not reuse a
prior video's creative composition. Preserve unrelated dirty/untracked files.

## Delivery-mode asset policy

1. Freeze and use all currently accepted assets. Do not re-review or regenerate
   them in isolation.
2. Do not use the rejected Recraft `landing-1a` plate.
3. Resolve `landing-1a` locally and deterministically from the accepted
   `build-2a` attempt-4 silhouette: isolate its accepted figure without
   changing its geometry or Clay color, then arrange five equal copies with
   irregular spacing, no hierarchy, and generous negative space on Paper.
   This may be a local transparent asset or authored directly in the bespoke
   composition, whichever is simpler and more robust. Record provenance.
4. Build the previously planned zero-cost native visuals (`build-1a`/
   `build-1b`, `build-6a`, `climax-2-sceneA`) directly in the atelier
   composition with the locked AEPOCH primitive vocabulary.
5. For any remaining missing visual, prefer simple deterministic typography,
   geometry, or an existing accepted plate. Do not invoke image/video/TTS/
   music/SFX providers and do not browse for replacement media.
6. “Good enough for Draft 1” is binding. Do not create another asset-correction
   tranche inside this run.

## Edit and composition requirements

- Hand-author the complete Remotion composition under the project workspace or
  the repository's established atelier location, following the existing
  staging/render contract.
- Cover the entire locked timeline with no gaps or overlapping primary scenes.
- Use the real narration as the timing authority and embed it in the render.
- Include readable captions/subtitles from the existing word timing data. If
  the existing caption artifact needs a narrow deterministic conversion for
  Remotion, perform it locally; do not retranscribe through a paid provider.
- Preserve the approved Void-to-Paper narrative color arc, Signal reservation,
  AEPOCH typography/mark rules, and scene meanings.
- Motion should be restrained and legible. Prefer a simple complete scene over
  elaborate unfinished choreography.
- Do not add music merely to satisfy a generic director default; the project
  explicitly locked no music for this draft.
- Create schema-valid `edit_decisions` and `render_report`; update checkpoints
  and project artifacts honestly. Assets may be advanced under the recorded
  full-run pre-authorization without another pause.

## Render and verification

Render one complete H.264/AAC Draft 1 MP4. Use 1920x1080 if practical; a
1280x720 Draft 1 is acceptable if it materially reduces render risk/time, but
record the actual profile. Do not silently switch away from Remotion.

Before declaring success:

1. Validate the composition and all asset references.
2. Render the entire video, not a still or short sample.
3. Probe with `ffprobe`: require one video stream, one audible narration audio
   stream, expected resolution/profile, and duration consistent with the real
   narration/timeline.
4. Extract representative review frames across the beginning, middle, climax,
   and ending; verify no black/blank/corrupt frames and readable typography.
5. Perform a narrow audio check that confirms narration is present throughout
   and not truncated. Use existing transcript/timing evidence; do not start a
   new content-revision cycle.
6. Run the relevant focused tests/typecheck/render checks.
7. Allow only one self-review/correction round, limited to catastrophic or
   delivery-blocking defects. Record non-critical polish findings for Chris.

## Evidence, Git, and handoff

Update canonical artifacts/checkpoints, append durable knowledge, and preserve
the exact output path plus codec/duration/size/checksum evidence. Commit and
push all intended tracked source, prompt, tests, and knowledge changes to
`aepoch-series`; project media/artifacts remain under the established
gitignored project workspace convention.

Report:

- final Draft 1 path
- duration, resolution, codecs, file size, checksum
- narration/caption presence
- render command/path and validation results
- any non-blocking Draft 1 roughness Chris should watch for
- commit(s) and real provider cost (`$0.00` expected)

## Hard stop

Stop after the complete Draft 1 is rendered, verified, documented, committed,
and pushed. Do not publish or deploy. Do not open a new provider-generation or
asset-perfection loop. The next and only gate is Chris watching the complete
video.
