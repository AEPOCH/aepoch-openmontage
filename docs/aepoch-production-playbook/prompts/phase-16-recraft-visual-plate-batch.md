# Phase 16 Handoff — Approved Recraft Visual Plate Batch

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch `aepoch-series`.

Chris approved `hook-2b_person-primitive-marks_recraft-v4-attempt5.png` as the
Recraft style anchor after Monty's PASS. This tranche authorizes the remaining
11 approved illustration plates and nothing beyond that visual batch.

## Announced paid batch

- Tool: repaired registered `recraft_image`
- Provider: Recraft through fal.ai
- Model/endpoint: `recraft/v4/text-to-image`
- Mode: batch of exactly 11 remaining plates
- Cost: 11 x $0.04 = $0.44 maximum
- Current spend: $0.9131 of $2.00
- Projected spend after successful batch: $1.3531 of $2.00
- No provider/model fallback and no content-quality retries

If a call fails before generation with an unambiguous HTTP 503/429 and the cost
tracker records $0.00, stop the batch and escalate; do not improvise retries.
Never exceed 11 new paid generations in this tranche.

## Read before acting

1. `AGENT_GUIDE.md`, latest durable state/decisions/log
2. `pipeline_defs/animated-explainer.yaml`
3. `skills/pipelines/explainer/asset-director.md`
4. approved script, scene plan, timing lock, art direction, visual language,
   playbook, decision log, checkpoint, and cost log
5. `asset-inventory-and-prompts.md`
6. all Recraft sample reviews and the human-approved anchor image
7. current official Recraft V4 schema and repaired registered tool/tests

## Lock approval and batch decision

1. Update the approved sample review/checkpoint to record Chris's explicit
   approval and Monty's PASS; the earlier self-review rejection remains visible
   as superseded evidence.
2. Append under the exact existing decision pair
   `category: provider_selection`, `subject: Image generation provider for
   illustration plates`, selecting Recraft V4 for the 11-plate batch. Record
   the approved anchor, $0.44 cap, retired FLUX path, OpenAI considered but not
   selected, no fallback, and no content retries.

## Batch inventory

Reuse the approved anchor as Plate 2 for `hook-2b`. Generate only:

1. Plate 1 `silhouette-crowd-resolve` — `hook-1b`
2. Plate 3 `two-node-empty-diagram` — `setup-1a`
3. Plate 4 `three-icons-broken-connection` — `setup-2a`
4. Plate 5 `extraction-icons-oil-ore-code` — `build-1a`, reused by `build-1b`
5. Plate 6 `silhouette-warm-clay` — `build-2a`, reused by `climax-3`
6. Plate 7 `extraction-icons-ore-debt-attention` — `build-3a`
7. Plate 8 `silhouette-scroll-attention-arrow` — `build-4a`
8. Plate 9 `door-icon-closed` — `build-5b`, reused by `build-6b`/`build-7a`
9. Plate 10 `captcha-icons-abstracted` — `build-6a`
10. Plate 11 `three-step-mechanism-diagram` — `climax-2-sceneA`
11. Plate 12 `silhouettes-community-plural` — `landing-1a`

Do not generate assets for typography scenes, hook stat cards, Presence Ring,
KAIROS word reveal, brand mark, tail, or any native animation. Exact text and
logos remain Remotion/native or existing brand assets.

## Recraft prompt adaptation

Rewrite each planned FLUX Post prompt into an auditable Recraft CHAI triplet
before its call. Preserve the approved scene concept and use the accepted
anchor's strengths:

- flat orthographic editorial geometry;
- simple isolated subjects with generous irregular spacing;
- no compound decorative motif unless the scene specifically requires one;
- no circuit/PCB/blockchain styling, generic tech wallpaper, or icon soup;
- no text, numerals, letters, logos, wordmarks, or pseudo-lettering;
- no gear/cloud/padlock/coin/graph/currency/cyberpunk clichés;
- no gradient, vignette, lighting, texture, depth, or shadow;
- avoid acute near-checkmark shapes and bilateral grid symmetry.

Use Recraft's structured palette controls rather than relying on prose alone.
Keep every plate to the smallest palette needed:

- Void scenes: Void background; Clay human; Iris/Prism secondary marks.
- Paper scenes: Paper background; Clay human; Iris/Prism system/relationship
  lines; Ochre only where the approved concept requires a second warm tone.
- Do not pass Ink in provider colors unless the scene genuinely requires it;
  the first Recraft sample mapped it to pale yellow.
- Signal `#6B5FED` is forbidden in this batch; its single use remains the
  deterministic native climax animation.

For representational concepts such as door, oil derrick, pickaxe, eye, ledger,
and CAPTCHA-like controls, request only the named minimal subject with no
surrounding decorative symbols. Generated images must never include real
brand UI or actual CAPTCHA screenshots.

All calls: `image_size: landscape_16_9`, `enable_safety_checker: true`, omit
`style`. Preserve returned native format and honest conversion provenance via
`save_image_correctly()`.

## Per-plate verification

After each successful call, verify actual encoding, dimensions/aspect,
checksum, prompt/palette/background payload, provider/model, actual cost, and
scene mapping. Inspect at original resolution against both its scene-specific
brief and the approved anchor.

Do not regenerate a creatively failed plate. Record it as rejected and continue
only if the failure is isolated. Stop the remaining batch immediately if two
plates show the same systemic failure (palette substitution, repeated motif,
brand/UI glyph leakage, or non-flat rendering); escalation costs less than a
bad full batch.

## Evidence and stop

Create:

- individual review metadata for all 12 plates, including the approved anchor;
- a labeled contact sheet of all successfully generated plates;
- a provisional asset manifest containing the approved human narration,
  accepted/rejected image evidence, existing brand mark, costs, checksums,
  reuse mappings, and explicit native-scene exclusions;
- batch cost/quality summary and outstanding decisions.

Validate the manifest schema and every referenced path that is meant to exist.
Because native composition assets and final audio mastering are outside this
tranche, keep the assets checkpoint `in_progress`; do not falsely close the
entire assets stage. Update durable state/log, commit and push authorized
tracked changes, and stop for Chris/Monty's plate-batch review.

## Hard stop

Do not generate more than 11 images. Do not retry creative failures. Do not
generate diagrams through another tool, TTS, music, SFX, or video. Do not
modify/master narration. Do not author composition code, compose, render,
publish, or deploy.

