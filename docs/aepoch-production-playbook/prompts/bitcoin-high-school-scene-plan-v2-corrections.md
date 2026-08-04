# Bitcoin for High School Students — Scene Plan V2 Corrections

## Scope

This is the single focused correction round for the `scene_plan` stage of `projects/bitcoin-for-high-school-students`.

Chris approved Script V2. The scene-plan concept, seven-scene timing, transition system, Remotion atelier mode, navy-on-cream art direction, and reuse strategy remain unchanged. Monty rejected Scene Plan V1 run `run-20260804T112533Z-92d7da` only for one concrete compositing infeasibility and two downstream-clarity issues.

No media generation. No provider calls. No assets-stage work. Stop at `checkpoint_scene_plan.json` with `status: awaiting_human`.

## Focused reading

Read only:

1. `AGENT_GUIDE.md`
2. `pipeline_defs/animation.yaml` — scene-plan gate
3. `skills/pipelines/animation/scene-director.md`
4. `schemas/artifacts/scene_plan.schema.json`
5. `projects/bitcoin-for-high-school-students/artifacts/scene_plan.json`
6. `projects/bitcoin-for-high-school-students/artifacts/script.json`
7. `projects/bitcoin-for-high-school-students/checkpoint_scene_plan.json`

Do not redo broad analysis or reopen approved decisions.

## Binding corrections

1. **Scene 7 compositing feasibility:** Scene Plan V1 specifies one flattened three-building raster image but also requires each building to cross out and fade independently. Replace that raster with three separately controllable, locally authored SVG/vector icons: school office, bank, generic company. Keep them inside one `InstitutionIcons`/`BuildingsCrossOut` component if desired, but each icon must be independently animated. Use the approved navy/cream palette and common line weight. This reduces new generated images for the plan from 1 to 0.

2. **Scene 3 semantic clarity:** Replace the four small notebook icons with clearly readable local computer/network-node icons. The shared notebook remains the ledger hero; the node icons represent independent network computers and must not look like extra ledger copies or people.

3. **Narration asset architecture:** Preserve the approved Sample V1 hook take for scenes 1–2. Specify **one continuous Rachel narration continuation take covering script beats 2–6**, generated once at the assets stage, then ASR-transcribed for real word timings and shared across scenes 3–7. Do not imply five separate TTS generation calls or discontinuous per-scene performances.

4. Update all affected descriptions, required-assets entries, tool-path maps, asset-economy counts, reusable-motif references, and review metadata consistently. Remove stale claims about a generated buildings collage or one new FLUX image.

Keep everything else unchanged, including 0.0–59.54s coverage, seven scenes, transition families, local motion system, prohibited-iconography rules, and the final notebook hold.

## Deliverables and hard stop

- Replace the canonical scene-plan artifact with schema-valid V2.
- Run one focused self-review confirming all three corrections and unchanged timing continuity.
- Archive/supersede the V1 checkpoint normally.
- Leave `checkpoint_scene_plan.json` as `awaiting_human`, `human_approved: false`.
- Report revised generated/reused/local asset counts and narration-call architecture.
- Stop. Do not begin assets, edit, compose, or publish.
