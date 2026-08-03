# Bitcoin for High School Students — Reference-Driven Sample V1

Run the OpenMontage `animation` pipeline's reference-aware proposal sample for
project `bitcoin-for-high-school-students` on branch `aepoch-series`.

Chris supplied this reference and asked for a Bitcoin version aimed at high
school students:

`https://www.youtube.com/shorts/5HszJ9VqI8g`

The project workspace and Backlot board already exist. The raw standard
reference analysis plus ten corrective uniform frame samples are under
`projects/bitcoin-for-high-school-students/reference-analysis/`.

## Human-approved direction

Chris approved the recommended package via chat on 2026-08-03:

- concept: **The Cafeteria Ledger**
- audience: high school students
- format: YouTube Short, 9:16, approximately 60 seconds for the eventual full
  video
- audio architecture: single narrator
- visual language: editorial cut-out collage inspired by the reference's
  pacing, concrete-object metaphors, continuous transformations, and large
  captions, but not a carbon copy
- creative differentiation: explain Bitcoin through a school cafeteria
  payment and a shared student ledger rather than repeating the usual
  Satoshi/pizza/mining-computer sequence
- image path: `image_selector` with FLUX Pro 1.1 preferred
- narration path: `tts_selector` with ElevenLabs
  `eleven_multilingual_v2`, default Rachel voice for this sample
- music path: Pixabay Music royalty-free search/download
- render runtime: Remotion; HyperFrames was disclosed as unavailable because
  the npm package check timed out
- composition mode: atelier editorial collage
- full production media ceiling: `$5.00`
- current authorization: sample only, maximum `$0.40`

Do not ask the user to reconfirm these decisions. Record them in the canonical
proposal and append-only decision log, including `render_runtime_selection`,
`composition_mode`, `audio_architecture`, provider selections, music source,
budget, and approval status.

## Required workflow

Read and follow, in order:

1. `AGENT_GUIDE.md` and the knowledge startup set
2. `skills/meta/video-reference-analyst.md`
3. `pipeline_defs/animation.yaml`
4. `skills/pipelines/animation/research-director.md`
5. `skills/pipelines/animation/proposal-director.md`
6. `skills/meta/taste-direction.md`
7. `skills/meta/checkpoint-protocol.md`
8. the registered tool contracts for `video_analyzer`, `tts_selector`,
   `image_selector`, `pixabay_music`, and `video_compose`
9. every Layer 3 skill named by those tools before writing prompts or calling
   them; at minimum expect `elevenlabs`, `text-to-speech`,
   `flux-best-practices`, `bfl-api`, `music`, `remotion-best-practices`,
   `remotion`, and `ffmpeg`

Do not read provider source code for usage guidance. Preserve unrelated dirty
and untracked repository files.

## Pre-production artifacts

Turn the completed reference analysis and research into canonical project
artifacts before generating the sample:

- enrich and persist a schema-valid `video_analysis_brief` with the manual
  uniform-frame observations and honest motion classification (continuous
  animated editorial collage/animated stills; automatic hard-cut detection
  under-counted the visual beats)
- produce a schema-valid animation `research_brief` with at least five sources,
  including authoritative Bitcoin mechanics and the reference-aware content/
  animation landscape
- produce a schema-valid `proposal_packet` containing the three concepts
  already presented to Chris, selecting **The Cafeteria Ledger** and recording
  the approved provider/runtime/mode/budget package
- produce/update the canonical append-only `decision_log`
- write the proposal checkpoint as completed/human-approved based on Chris's
  explicit chat approval

Use primary/authoritative sources for technical claims. The educational frame
must be neutral: explain the payment-network mechanism, not predict Bitcoin's
price or present it as guaranteed profit.

## Sample V1 creative brief

Create one 10–15 second opening-hook sample at:

`projects/bitcoin-for-high-school-students/assets/sample/sample_v1.mp4`

Suggested narration meaning (rewrite only as needed for natural timing):

> Imagine buying lunch without cash, a card, or even Venmo. Instead, everyone
> in school keeps the same list of who paid whom. That is the basic idea behind
> Bitcoin.

The sample must demonstrate:

- the approved single narrator and actual sample voice
- a vertical cafeteria/payment visual metaphor
- cut-out collage treatment on a clean editorial background
- a receipt, lunch tray or cafeteria object, phone/payment gesture, and shared
  notebook/ledger motif
- continuous object motion or transformation rather than cinematic AI-video
  footage
- large, readable burned-in captions suitable for Shorts
- the selected music bed at a low level under narration
- pacing recognizably inspired by the reference without copying its exact
  imagery, graphics, or layout

## Paid/sample calls

This is a sample batch, not full production:

- one sample narration via `tts_selector`, ElevenLabs preferred,
  `eleven_multilingual_v2`, default Rachel voice
- two portrait collage source images via `image_selector`, FLUX Pro 1.1
  preferred; at most one corrective image regeneration if essential and if the
  total sample stays within `$0.40`
- one free Pixabay Music selection/download
- local Remotion composition/render

Before every call, log the CHAI pre/critique/post prompt evidence and the Layer
3 skills read. Use explicit output paths under this project. Track actual costs
through the project cost log. Do not silently switch providers. If an approved
provider is unavailable or fails, record the blocker and stop rather than
substituting.

## Verification and checkpoint

Verify the sample with `ffprobe`: 9:16 video stream, audible narration/music
audio stream, duration 10–15 seconds, valid H.264/AAC or equivalent supported
profile. Extract representative frames and inspect caption readability,
collage coherence, and absence of broken/blank frames. Perform a narrow audio
content check against the sample script.

Write the proposal sample checkpoint as `awaiting_human` and include:

- sample path
- actual cost and remaining `$5.00` full-production budget
- voice/provider/model
- image provider/model and asset provenance
- music provenance
- render evidence and self-review findings

Commit and push intended tracked artifacts/source/knowledge only. Project media
and canonical run artifacts remain in the gitignored project workspace under
the existing convention.

## Hard stop

Stop after Sample V1 is rendered, verified, documented, and awaiting Chris's
review. Do not write the full 60-second script, generate full-production assets,
or proceed to scene plan/edit/final compose/publish until Chris approves the
sample.
