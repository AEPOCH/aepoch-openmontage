# Bitcoin for High School Students — Scene Plan V1

## Authorization

Chris explicitly approved Script V2 via chat on 2026-08-04. Monty independently reviewed Script V2 run `run-20260804T091044Z-de1285` and marked it `pass`.

Advance **only the `scene_plan` stage** of the existing animation-pipeline project:

- Project: `projects/bitcoin-for-high-school-students`
- Approved concept: The Cafeteria Ledger
- Approved sample: `projects/bitcoin-for-high-school-students/assets/sample/sample_v1.mp4`
- Approved script: `projects/bitcoin-for-high-school-students/artifacts/script.json`
- Format: 9:16, 1080x1920, approximately 60 seconds
- Runtime/mode: Remotion atelier
- Audio architecture: single narrator
- Approved production palette: Sample V1's navy-on-cream editorial collage

No media generation or provider calls are authorized. Stop at the human scene-plan gate.

## Focused reading

Read only the resources necessary for this stage:

1. `AGENT_GUIDE.md`
2. `pipeline_defs/animation.yaml` — scene-plan stage and relevant locked decisions
3. `skills/pipelines/animation/scene-director.md`
4. `skills/meta/reviewer.md`
5. `skills/meta/checkpoint-protocol.md`
6. `schemas/artifacts/scene_plan.schema.json`
7. `projects/bitcoin-for-high-school-students/artifacts/script.json`
8. `projects/bitcoin-for-high-school-students/artifacts/proposal_packet.json`
9. `projects/bitcoin-for-high-school-students/art-direction.md`
10. `projects/bitcoin-for-high-school-students/artifacts/sample-v1-generation-evidence.md`
11. `projects/bitcoin-for-high-school-students/checkpoint_script.json`

Do not repeat preflight, research, proposal work, reference analysis, script writing, or sample generation.

## Required state transition

Record Chris's Script V2 approval through the normal checkpoint/decision history without erasing prior history. Then enter the scene-plan stage.

## Scene-plan requirements

Turn the approved six-beat script into a feasible, schema-valid scene plan that genuinely extends the approved sample rather than designing a different video.

For every scene, specify:

- what appears first,
- what transforms or changes,
- what holds for comprehension,
- how it exits,
- its explicit Remotion atelier tool path,
- all five scene aspects required by `scene-director.md`, using explicit `N/A` where cinematographic camera concepts do not apply to 2D motion graphics,
- overlays separately from depth/framing,
- exact required assets and whether each is reused, generated later, or created locally in the composition.

Use a limited motion system:

- Settling paper-cutout entrance with restrained overshoot.
- Transform/crossfade between conceptual beats.
- One reserved hand-drawn ledger-line animation only; do not repeat it as generic decoration.
- Locked orthographic/editorial camera language; motion comes primarily from objects, layout, scale, opacity, and transforms—not simulated cinematic camera moves.
- Large burned-in captions remain distinct from designed on-screen labels.

Carry forward the approved corrections:

1. Every generated visual must target a consistent true 9:16 safe frame; no faint edge seams.
2. Caption timing will later derive from real narration/ASR word timings.
3. Navy-on-cream is the production palette; do not chase the superseded Clay/Paper hex lock.
4. Never visualize Bitcoin with glowing coins, chain links, mining rigs, price charts, Satoshi portraits, or pizza lore.

The plan must remain achievable inside the remaining **$4.7978 media ceiling**, with the proposal's expected standard path around $0.75 total. Planning itself costs $0.

## Asset economy

Design for deliberate reuse without visual monotony:

- Reuse the approved sample lunch-tray/phone and shared-ledger imagery where appropriate.
- Prefer roughly one new hero collage object per remaining conceptual beat, not multiple generations per line.
- Identify which elements should be local vector/text/shape animation in Remotion rather than generated images.
- Do not generate anything during this run.

## Deliverables and gate

1. Write the canonical schema-valid scene plan under `projects/bitcoin-for-high-school-students/artifacts/`.
2. Self-review against every scene-plan review focus and success criterion in `pipeline_defs/animation.yaml`, with at most two rounds.
3. Write `checkpoint_scene_plan.json` with `status: awaiting_human`, `human_approved: false`, and the canonical artifact attached.
4. Keep Backlot events/state current.
5. Report scene count, timing coverage, unique generated-asset count, reused-asset count, local-composition element count, transition families, and any findings.

## Hard stop

Stop after the scene-plan checkpoint reaches `awaiting_human`. Do not begin assets, edit, compose, or publish. Do not call TTS, image, video, or music providers.
