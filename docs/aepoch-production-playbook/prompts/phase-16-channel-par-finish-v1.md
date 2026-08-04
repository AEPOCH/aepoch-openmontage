# Phase 16 — Finish “What is ÆPOCH?” at Channel Par

## Authorization and intent

Chris explicitly said **“lets finish it”** on 2026-08-04 after reviewing the completed Bitcoin short and agreeing that the existing ÆPOCH Protocol YouTube channel — not an imagined perfect brand film — is the correct publication benchmark.

This authorizes completing the existing project through `assets`, `edit`, and `compose`, including up to two local correction/rerender rounds for visible defects. Record this as explicit full-run pre-authorization for these three stages in the append-only decision log, so the work is not broken into more micro-approval loops.

Project: `projects/aepoch-blog-pilot-what-is-aepoch`
Pipeline: `animated-explainer`
Runtime remains: **Remotion**
Composition mode remains: **atelier**
Target remains: **1920x1080, 30fps, 280 seconds**
Narration remains: Chris's locked recording and canonical word alignment

Stop after the finished render and final review. Do not enter `publish` and do not upload, post, deploy, or schedule anything externally.

## Why this completion brief exists

The project became stuck because aspirational taste guidance was enforced as microscopic pass/fail law. The project's own benchmark analysis proves that this was disproportionate:

- 4 of the 8 existing channel videos are NotebookLM outputs;
- all 8 are static holds or animated stills with localized micro-motion;
- none uses true camera movement;
- the channel contains multiple inconsistent visual styles;
- existing published work succeeds mainly through narration, argument, structure, and relevant visuals.

The objective is now a coherent, technically clean ÆPOCH video that meets or exceeds the actual channel, not a flawless flagship film.

## Required reading

Read before acting:

1. `AGENT_GUIDE.md`
2. `knowledge/state/current-state.md`, `knowledge/index.md`, and the latest relevant `knowledge/log.md` entries
3. `pipeline_defs/animated-explainer.yaml`
4. `skills/pipelines/explainer/executive-producer.md`
5. `skills/pipelines/explainer/asset-director.md`
6. `skills/pipelines/explainer/edit-director.md`
7. `skills/pipelines/explainer/compose-director.md`
8. `skills/meta/animation-runtime-selector.md`
9. `skills/meta/reviewer.md`
10. `skills/meta/checkpoint-protocol.md`
11. `skills/meta/taste-direction.md`
12. `skills/meta/bespoke-composition.md`
13. `.agents/skills/hyperframes/SKILL.md` for routing only; do not switch the already-approved runtime
14. `.agents/skills/remotion/SKILL.md`
15. `.agents/skills/remotion-best-practices/SKILL.md` plus the relevant rules for animations, assets, audio, captions, images, measuring text, sequencing, timing, transitions, and video
16. `.agents/skills/ffmpeg/SKILL.md`
17. `.agents/skills/music/SKILL.md` before using the registered `pixabay_music` tool because the registry references that skill
18. `projects/aepoch-blog-pilot-what-is-aepoch/artifacts/benchmark_analysis.md`
19. All canonical project artifacts, current checkpoints, art direction, timing lock, word alignment, and accepted/rejected asset reviews

Do not rerun extraction, research, proposal, script, scene planning, narration intake, transcription, or timing alignment.

## Binding Channel Par quality policy

### Hard acceptance requirements

- The blog's approved thesis and script remain unchanged.
- Chris's narration is intelligible, correctly placed, and not time-stretched.
- ÆPOCH and KAIROS are the words Chris actually recorded; do not replace the narration with TTS.
- Visuals are relevant to the words and broadly coherent at normal viewing speed.
- Text and captions are readable at 1080p.
- No blank/black frames, broken assets, severe clipping, missing audio, corrupt render, or obvious overlay leakage.
- ÆPOCH branding is present and correctly spelled.
- Runtime remains Remotion with no silent swap.
- All media is licensed/project-owned and the budget remains governed.

### Guidance, not rejection criteria

Do **not** reject or rebuild otherwise usable work merely for:

- generated-image colors not matching exact hex values;
- small palette variation that is not distracting at normal playback;
- minor internal contour or illustration quirks;
- repeated visual subjects or layouts;
- static holds or modest motion;
- imperfect prompt compliance that does not damage the communicated idea;
- lack of true camera movement;
- a scene being less bespoke than an imagined flagship treatment;
- a defect visible only through pixel measurement, magnification, or forensic still inspection.

Review the finished video at normal playback speed first. Frame inspection exists to catch material defects, not to invent them.

## Assets-stage completion

1. Preserve all currently accepted generated plates and Chris's locked narration.
2. Do not make any paid TTS, image, video, SFX, or music-generation call.
3. Resolve `landing-1a` locally and deterministically by reusing the accepted `build-2a` silhouette as the canonical person and arranging five equal copies with irregular spacing and no hierarchy on the Paper field. A pre-existing untracked helper `scripts/build_landing1a_local.py` may be inspected and used only if it is safe, deterministic, scoped to this project, and produces the intended result; otherwise implement the local asset inside the project composition. Do not touch unrelated dirty files.
4. Treat build-1a/build-1b, build-6a, and climax-2-sceneA as Remotion-native geometry as already approved in decision `d-024`.
5. Finalize the canonical asset manifest so every scene's needs are honestly covered by an existing plate, brand asset, narration asset, or declared Remotion-native component. Native composition geometry does not require a fake generated-file asset.
6. Music: use the registered `pixabay_music` tool for one free stock-library search/download, provider `pixabay_music`, model/variant `stock-library search`, query direction “sparse ambient humanist documentary, restrained, no driving beat,” duration at least 280 seconds, output under the project's `assets/music/`. This is one batch selection at `$0`. Listen/probe it and use it only if it supports the narration. If the tool fails or no suitable track is found, record the failure and render without music; do not switch provider and do not block completion.
7. Record Chris's full-run authorization and the revised Channel Par acceptance policy in the decision log with honest supersession/history.
8. Complete the assets checkpoint with `human_approved: true`, using Chris's explicit “lets finish it” authorization for assets/edit/compose. Preserve history.

## Edit stage

Create schema-valid `artifacts/edit_decisions.json` using:

- `render_runtime: remotion`
- `cut_timing_mode: timeline`
- the locked 0–280s timing map
- Chris's complete source narration at timeline 0, preserving its natural leading/trailing room tone
- the canonical word alignment for captions and meaningful visual cues
- the selected Pixabay bed at restrained volume if one passed review; otherwise no music, explicitly documented
- simple fades, reveals, masks, scale/position moves, and local geometry transitions that serve the argument

The 31 approved scene entries may remain as timing/cue units, but the composition may visually group adjacent units into longer continuous sequences. Do not force 31 radically unique designs. Reuse is allowed when it creates continuity.

## Compose stage

Hand-author the full atelier Remotion composition from the approved scene plan, existing assets, local native geometry, and the locked audio timing. Reuse engineering mechanics, not unrelated finished creative components.

Creative priorities, in order:

1. Follow Chris's narration and make the argument understandable.
2. Maintain a coherent Void/Depth-to-Paper/Clay visual progression.
3. Make the Presence Ring payoff clear.
4. Keep captions readable and avoid duplicate designed text serving the same role.
5. Use modest deterministic motion to keep still imagery alive.
6. End with a clean ÆPOCH-branded landing and hold.

Do not overbuild. Static or lightly animated illustration plates are already at parity with the channel benchmark. Native components should be clear and intentional, not technically ornate.

Render through the registered `video_compose` Remotion atelier path with the proposal packet supplied for runtime-swap detection:

- output: `projects/aepoch-blog-pilot-what-is-aepoch/renders/final.mp4`
- 1920x1080
- 30fps
- H.264/AAC
- target 280 seconds, within the manifest tolerance

## Review and correction policy

Perform one complete normal-speed review before forensic frame review.

Pass when:

- the video is understandable and watchable;
- the narration/audio is intact;
- visuals support the spoken sections;
- no material technical defects are present;
- the result meets or exceeds the actual ÆPOCH channel benchmark summarized in `benchmark_analysis.md`.

Fix critical viewer-visible defects only, with a maximum of two local correction/rerender rounds. Suggestions and nitpicks do not block delivery. Do not restart the asset strategy, regenerate usable plates, or rewrite the script to chase polish.

Create schema-valid `render_report.json` and `final_review.json`, extract representative review frames across the runtime, and record:

- normal-speed viewing verdict;
- technical probe;
- audio presence/balance;
- caption readability;
- broken/blank/overflow/overlay checks;
- runtime-swap check;
- channel-par comparison;
- fixes and rerenders;
- `$0` paid media spend in this completion run and updated total project spend.

## Git and repository discipline

- Preserve unrelated modified/untracked files, including `README.md`, `diagram.png`, backups, archives, previews, and other pre-existing workspace material.
- Generated project artifacts stay under the gitignored project workspace.
- Update durable knowledge only after reading `knowledge/SCHEMA.md`, and only with facts established by this run.
- Do not stage broad paths or use `git add .`, `git add -A`, or `git commit -a`.

## Report

Report the final video path, duration, resolution, codecs, size, narration and music status, scene/sequence count, review verdict, any correction rounds, runtime-swap result, media spend, and comparison to the existing channel bar.

## Hard stop

Stop after compose and final review. Do not enter publish, upload, deploy, schedule, or make any paid provider call.
