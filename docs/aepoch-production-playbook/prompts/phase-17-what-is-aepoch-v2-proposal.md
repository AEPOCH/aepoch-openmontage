# Phase 17 — What is ÆPOCH? V2: Postmortem to Proposal Gate

## Human authorization

Chris instructed us to review V1, make an independent assessment, start over as
V2, and use **only the gates defined by Backlot / the animated-explainer
manifest**. This prompt is the tracked handoff for that approved scope.

## Execution rules

- Execute directly in the foreground. Do not delegate or spawn subagents.
- Read `AGENT_GUIDE.md` completely before acting.
- Read `pipeline_defs/animated-explainer.yaml` and the checkpoint protocol.
- Before doing each stage, read its complete stage-director file.
- Use the repository artifacts as truth, not chat history.
- Preserve V1 unchanged at `projects/aepoch-blog-pilot-what-is-aepoch/`.
- Create the new project as `aepoch-blog-pilot-what-is-aepoch-v2`.
- Use only manifest-defined human gates. Do not invent Monty, Claude, sample,
  review, or tranche approval gates beyond those already defined by the
  manifest/directors.
- Make no paid provider call. Generate no media. Do not advance into script.

## Required reading

1. `docs/aepoch-production-playbook/reports/phase-16-v1-creative-postmortem.md`
2. V1's approved source extraction, research brief, proposal, decision log,
   scene plan, asset manifest, final review, and checkpoints
3. The Phase 14A Direction A prompts, generation manifest, contact sheet, and
   review evidence under
   `projects/aepoch-episodes/001-what-is-aepoch/assets/style-exploration/phase-14a1/`
4. V1's Recraft batch contact sheet and production prompts
5. `schemas/artifacts/proposal_packet.schema.json`
6. `skills/meta/taste-direction.md`

## V2 initialization and carried provenance

Initialize the V2 project using `lib.checkpoint.init_project()` with title
`What is ÆPOCH? — V2` and pipeline type `animated-explainer`. Open its Backlot
board; board-open failure is non-blocking.

The authoritative article/source has not changed. Copy the byte-identical V1
approved `source_extraction` into V2 with explicit provenance identifying the
V1 project, original checksum, prior checkpoint, and Chris's prior approval.
Record the V2 extraction checkpoint as completed and human-approved on the
basis of that carried, unchanged artifact—this is not a skipped gate and must
be auditable. Do the same for the ungated research artifact/checkpoint where
appropriate. Do not carry forward V1's proposal approval.

Do **not** copy V1's script, scene plan, asset manifest, edit decisions,
composition, render, or creative approvals. They are rejected for V2.

## Current preflight facts to verify

Run `registry.provider_menu_summary()` and record the live result. The latest
known state was:

- Composition: FFmpeg available, Remotion available, HyperFrames unavailable
  because the npm package lookup timed out.
- Image generation: Recraft, Flux, OpenAI, Pexels, and Pixabay families
  available; Flux Kontext is the intended reference-conditioned candidate.
- Audio processing: local FFmpeg available.
- Music generation: ElevenLabs available; stock music search via Pixabay
  available; no local music library configured.
- TTS exists but is not the current narration plan because Chris recorded the
  piece himself.

If only Remotion remains available, state plainly in the proposal that
HyperFrames is unavailable and proceed with Remotion as the sole advanced
runtime option. Do not silently imply a choice between unavailable runtimes.

## Proposal content

Build a fresh, schema-valid V2 proposal packet grounded in the unchanged source
thesis and the postmortem. Present three genuinely differentiated treatments:

1. **Editorial Human Systems — recommended.** Twelve to sixteen substantial,
   human-centred editorial story beats in four or five visual families.
   Recraft V4/V4 Pro master frames establish the art direction; Flux Kontext
   reference-conditioned variations/corrections preserve continuity. Native
   motion only supports art through camera, masks, labels, and emphasis.
2. **One Expanding World.** Three or four large master tableaux become
   navigable continuous worlds through crops, camera movement, reveals, and
   selective animation. This minimizes cross-call consistency risk.
3. **Documentary Editorial Collage.** Specific human photography/licensed stock
   grounds reality; ÆPOCH illustration, typography, and diagram layers provide
   the conceptual reframe.

The proposal must make clear that Phase 14A Direction A is the minimum visual
quality bar—not a vague inspiration. Exact palette compliance is guidance, not
the primary acceptance criterion. Semantic illustration is primary.

Include these binding V2 acceptance criteria in the production plan:

- A viewer can state the primary frame's idea without reading captions.
- Each primary visual shows a human consequence, relationship, or system rather
  than an isolated generic symbol.
- The approved proof spans hook, middle, and climax and demonstrates one
  coherent world.
- Primary artwork meets or exceeds Phase 14A Direction A in richness and
  specificity.
- A normal-speed full watch is mandatory at final review; still sampling alone
  cannot establish creative quality.

Plan Remotion in `atelier` mode for hero work. Stock scene components may be
consulted only for mechanics, not used as the creative language. Keep the
existing source duration open to editorial tightening at the script gate; do
not lock V1's 32-scene structure.

Audio plan: preserve Chris's original recording untouched and propose a local
mastered derivative using FFmpeg EQ, de-essing/noise control where appropriate,
and loudness normalization. Treat this as improvement, not a cure for weak
visuals. Surface a deliberate music decision and costs; do not generate music.

Budget: provide an honest itemized estimate and cap with revision headroom.
Recommend a realistic paid-media ceiling adequate for 12–16 strong editorial
beats and several reference-conditioned corrections; do not optimize the plan
into generic low-cost graphics. No money is authorized by this prompt.

## Gate and hard stop

Validate all new artifacts against their schemas. Write the proposal checkpoint
with `status: awaiting_human` and `human_approved: false`. Ensure the Backlot
board shows the proposal awaiting approval.

Then stop completely. Do not create a script, scene plan, sample, asset, prompt
batch, provider call, composition, or render. Return the project ID, Backlot
state, validation results, preflight summary, and exact files created.
