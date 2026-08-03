# Phase 16 Handoff — Assets Preflight and FLUX Style Sample

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch `aepoch-series`.
Gate 4 is closed. Chris approved beginning the assets stage.

This tranche authorizes contrast remediation, complete asset inventory and
prompt planning, and exactly one paid representative image sample. It does not
authorize batch generation.

## Announced paid call

- Tool: registered `flux_image` (the concrete FLUX provider selected by the
  approved `image_selector` plan; use the concrete tool so no fallback occurs)
- Provider: FLUX through fal.ai
- Model: `flux-pro/v1.1`
- Mode: one sample only, not a batch
- Scene: `hook-2b`
- Size: 1920x1080 PNG
- Estimated cost: $0.05
- Reason: `hook-2b` tests the core visual grammar in one frame -- Void
  background, one soft-corner human silhouette, sharp-corner system shapes,
  restricted palette, generous negative space, and no generated text.

The project cost log currently records $0.6831 spent against the approved
$2.00 cap, leaving $1.3169 before this sample. Reserve and record the sample
through the cost tracker. Do not substitute providers or models if FLUX is
unavailable; escalate and stop.

## Read before acting

1. `AGENT_GUIDE.md`, latest durable state, decisions, and log
2. `pipeline_defs/animated-explainer.yaml`
3. `skills/pipelines/explainer/asset-director.md`
4. `.agents/skills/flux-best-practices/SKILL.md`
5. `.agents/skills/bfl-api/SKILL.md`
6. `knowledge/wiki/reports/phase-16-retimed-storyboard-review.md`
7. approved script, scene plan, proposal, decision log, timing lock, checkpoint
8. `styles/aepoch-symbolic.yaml`, `brands/aepoch/VISUAL_LANGUAGE.md`, and
   `projects/aepoch-blog-pilot-what-is-aepoch/art-direction.md`

## Lock current decisions

Append, do not mutate, the image-provider decision using the exact existing
pair `category: provider_selection`, `subject: Image generation provider for
illustration plates`. Record Chris's approval of `flux_image` and the exact
sample model `flux-pro/v1.1`; preserve Recraft and OpenAI as rejected options.
Record that automatic fallback is forbidden without new approval.

Human narration is already final. Do not create or inventory TTS work. Music
remains deferred and Chris's personal music collection remains excluded; do
not scan it or generate/search for music in this tranche.

## Resolve contrast before generation

1. Keep every locked brand color in the palette.
2. Change `overlays.key_term.text` from Signal `#6B5FED` to Ink `#1A1612` on
   lavender `#EDE9F7`. This passes normal-text AA and prevents a generalized
   key-term component from consuming the episode's single Signal use.
3. Preserve muted InkSoft `#8A8480` on Paper but add an enforceable playbook
   rule limiting that pairing to large text (WCAG AA large-text threshold) or
   non-text decoration; normal-size text must use Ink `#1A1612`.
4. Re-run playbook schema and palette validation. The key-term error must be
   gone. The muted warning may remain only if it explicitly reflects the
   documented large-text-only constraint; report it honestly.
5. Append the palette/contrast decision under the existing playbook decision
   pair rather than silently changing the file.

## Inventory and prompt plan

Build a complete asset-task inventory from all 32 scenes before generation.
Classify each need as:

- FLUX illustration plate;
- locally authored diagram/icon geometry;
- Remotion-native typography/motion (no generated image);
- existing approved brand asset;
- approved human narration.

Target the approved 12-16 FLUX plates; do not force one image per scene. Reuse
one approved plate where it genuinely serves related scenes. AI-generated
images must contain no text, logos, numerals, or wordmarks. Exact text remains
Remotion-native. Write the inventory and the auditable CHAI pre/critique/post
prompt triplets to a durable project artifact before the paid call.

FLUX's current provider skill says not to use negative prompts. Translate the
playbook's exclusions into affirmative visual instructions in the final
prompt and omit `negative_prompt`. The final prompt must specify subject,
subject state/action, scene, spatial framing, static camera, flat editorial
medium, exact hex palette, lighting, animation-safe separation, and intentional
empty space. Do not ask FLUX to render ÆPOCH terminology or any other text.

## Generate exactly one sample

Generate only the `hook-2b` plate with the announced tool/provider/model and
save it under the project's assets/images sample area with a descriptive,
stable filename. Preserve the returned seed and full prompt metadata. Verify:

- valid 1920x1080 PNG and checksum;
- no text, watermark, logo, pseudo-lettering, gradient, photographic detail,
  facial detail, coin imagery, or generic cyber/crypto clichés;
- one small centered soft-corner human silhouette;
- surrounding sharp-corner system/bot shapes remain individually separable
  for later Remotion animation;
- Void `#0C0B0A` field and approved palette read correctly;
- composition has useful negative space and is not a finished poster/frame.

Create a review artifact that embeds or links the sample, the full prompt
triplet, model, seed, checksum, actual cost, and a scored self-review. Do not
retry automatically. A rejected sample requires a new prompt and explicit
sample authorization.

Update the assets checkpoint as `in_progress`, durable current state, and log.
Commit and push the authorized tracked changes, then stop for Chris/Monty's
sample review.

## Hard stop

Do not generate a second image or any batch. Do not generate diagrams, TTS,
music, SFX, or video. Do not modify/master narration. Do not author composition
code, compose, render, publish, or deploy.

