# Bitcoin for High School Students — Edit + Compose V1

## Authorization

Chris reviewed the asset package and said **“looks good”** on 2026-08-04. Monty independently reviewed assets run `run-20260804T140936Z-be0511` and marked it `pass`.

Advance the existing `animation` pipeline project sequentially through:

1. `edit`
2. `compose`

Both stages are ungated in `pipeline_defs/animation.yaml`. Stop after the full render and post-render review. Do not enter `publish`.

Project: `projects/bitcoin-for-high-school-students`

## Locked production decisions

- Runtime: **Remotion**
- Composition mode: **atelier**
- Format: 1080x1920, 30fps, approximately 60 seconds
- Audio: approved hook take + 0.6s pause + approved continuation take; existing Pixabay music under narration
- Visual system: approved Sample V1 navy-on-cream editorial cutout collage
- Motion system: restrained settle springs, object/layout transformations, fade/transform transitions only, locked orthographic camera
- Provider spend: **$0** in this run

Do not make any TTS, image, video, music, SFX, transcription, or other provider call. Do not change runtime, composition mode, voice, script, music, or palette.

## Required focused reading

Read in stage order:

1. `AGENT_GUIDE.md`
2. `pipeline_defs/animation.yaml`
3. `skills/pipelines/animation/edit-director.md`
4. `schemas/artifacts/edit_decisions.schema.json`
5. `skills/pipelines/animation/compose-director.md`
6. `schemas/artifacts/render_report.schema.json`
7. `skills/meta/taste-direction.md`
8. `skills/meta/bespoke-composition.md`
9. `skills/meta/reviewer.md`
10. `skills/meta/checkpoint-protocol.md`
11. `.agents/skills/remotion/SKILL.md`
12. `.agents/skills/remotion-best-practices/SKILL.md` and only its rules relevant to animations, assets, audio, fonts, images, measuring text, sequencing, subtitles/captions, text animation, timing, transitions, and voiceover
13. `.agents/skills/ffmpeg/SKILL.md`
14. Canonical project artifacts: proposal, script, scene plan, asset manifest, and their current checkpoints
15. `projects/bitcoin-for-high-school-students/art-direction.md`
16. Existing approved Sample V1 composition source as mechanics and continuity reference only

Do not rerun research, proposal, script, scene planning, asset generation, or capability selection.

## State transition

Record Chris's asset approval normally, preserving checkpoint/decision history. Then enter `edit`.

## Edit stage

Create schema-valid canonical `edit_decisions.json` from the real narration timings and approved scene plan.

Binding requirements:

- `render_runtime: remotion`
- `composition_mode: atelier`
- Preserve the exact audio construction verified in assets: hook `13.142494s` + `0.6s` pause + continuation `43.978594s` = `57.721088s` narration review track.
- Use the existing word-timestamp artifacts for captions and reveal timings. Do not use the provisional word-rate timestamps as the final lock.
- Protect approximately 1.8s of final visual hold so the full video lands near 59.5s.
- Keep captions and designed labels visually distinct; never show duplicate designed text and accessibility captions with the same role/content.
- Music remains subtle beneath narration, with sensible fade-in/fade-out and no competing peak.
- Limit transitions to the approved fade/transform families.
- Record exact hold windows, stagger rules, transition map, scene timing, music levels, audio placement, caption timing source, and safe zones.

Self-review and complete the edit checkpoint according to the manifest. If a critical edit defect cannot be resolved without changing an approved production decision, stop and report it instead of composing.

## Compose stage — bespoke Remotion

Hand-author the complete project-local atelier composition. Reuse engine mechanics and the already-approved Sample V1 look/behavior, but do not import stock Remotion scene types, shared creative components, registry blocks, or templated compositions.

Implement the seven approved scenes and deterministic local components:

- NetworkNodeIcons
- InkFlourish
- LedgerPagesFan
- CheckmarkStamp
- LedgerPageStack
- InstitutionIcons
- BuildingsCrossOut
- DesignedLabel

Use the approved vector files and images from the asset manifest. Copy/stage all browser-readable media under the project's `public/` directory and reference them correctly.

Technical rules:

- Frame-based deterministic animation only; no CSS transitions, `requestAnimationFrame`, `Math.random()`, or `Date.now()`.
- Use passed scene-local duration rather than global composition duration for local animation.
- Premount sequences.
- Clamp interpolations.
- Preserve text sharpness, mobile safe zones, and readable line lengths.
- Resolve the known Sample V1 Beat 1 edge seam by a controlled crop/mask/background treatment without distorting the hero image.
- Use actual transcript word timings to drive accessibility captions.
- Keep the signature ledger-line device scarce as approved.
- Do not reintroduce prohibited crypto imagery.
- Maintain distinct scene compositions even where the ledger image recurs: position, scale, local vector action, information role, and first-frame arrangement must visibly change according to the approved scene plan.

## Validation and render

Before rendering:

1. Validate every asset path.
2. Run the applicable registered composition validation/atelier checks.
3. Verify runtime and composition mode match proposal/edit decisions.
4. Verify audio duration/placement and total frame calculation, accounting for transition overlaps.
5. Verify no stock-registry imports.

Render through registered `video_compose` with the proposal packet passed for runtime-swap detection. Use:

- Remotion atelier path
- composition output: `projects/bitcoin-for-high-school-students/renders/final.mp4`
- 1080x1920
- 30fps
- H.264, CRF 18 or equivalent high-quality setting
- AAC audio

Do not call `npx remotion render` as an ad-hoc substitute for the registered composition path unless debugging a registered-tool failure; if that failure occurs, document it and preserve the locked runtime.

## Mandatory post-render review

After render:

1. Run FFprobe and verify 1080x1920, 30fps, H.264/AAC, audio present, and duration within ±5% of 60 seconds.
2. Extract at least one representative frame from every scene plus every transition boundary.
3. Visually inspect all extracted frames for black/blank frames, edge seams, clipping, text overflow, safe-zone violations, broken SVGs, duplicate caption/label content, weak contrast, palette drift, and missing assets.
4. Check audio presence, clipping, unexpected silence, narration/music balance, and final hold.
5. Run a scene-distinctness review and explicitly explain why recurring notebook scenes do not collapse into one repeated slide.
6. Verify the approved delivery promise and reference-derived pacing/style remain intact.
7. Fix critical implementation/render defects and rerender, maximum two review rounds. No provider calls are allowed during corrections.

Write schema-valid canonical `render_report.json` and `final_review` evidence, update checkpoints/events, and make the final video visible in Backlot.

## Report

Report:

- final path,
- exact duration/resolution/codecs/file size,
- scene count,
- frame-review result,
- audio-review result,
- runtime-swap check,
- distinctness result,
- any fixes/rerenders,
- media spend this run (`$0` expected),
- total media spend and remaining ceiling.

## Hard stop

Stop after compose and final review. Do not enter `publish`, upload anywhere, or make any external/provider call.
