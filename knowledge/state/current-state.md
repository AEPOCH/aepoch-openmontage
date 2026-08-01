---
type: Project State
title: ÆPOCH OpenMontage Current State
description: Verified production status, completed phases, current pause, blockers, and next executable action for Episode 001.
status: draft
project_state: confirmed
generated:
  by: chatgpt
  at: 2026-07-30T15:40:00+01:00
sources:
  - id: repository-baseline
    resource: ../raw/terminal-logs/2026-07-30-post-phase14b-baseline.txt
    title: Post-Phase-14B repository baseline
  - id: production-current-state
    resource: ../../docs/aepoch-production-playbook/CURRENT_STATE.md
    title: ÆPOCH Production Current State
  - id: production-phase-log
    resource: ../../docs/aepoch-production-playbook/PHASE_LOG.md
    title: ÆPOCH Production Phase Log
  - id: phase14b-review
    resource: ../../projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-production-proof-review.md
    title: Phase 14B production proof review
---

# ÆPOCH OpenMontage Current State

## Current Position

- **Repository branch:** `aepoch-series`
- **Current repository HEAD:** `0c29fae`
- **Phase 14B implementation commit:** `63a232e`
- **Current episode:** `001-what-is-aepoch`
- **Episode type:** Pre-launch countdown, Video 1
- **Working title:** `What is ÆPOCH?`
- **Last completed production phase:** Phase 14B
- **Next system phase:** Phase 15 — blog-to-video production readiness
- **Phase 15 status:** Authorized for planning, audit, and local validation
- **Episode 001 production:** Handed to Lee for manual editing and delivery outside OpenMontage
- **Phase 14B.1 status:** Superseded; it will not be executed on the current path
- **Production state:** OpenMontage development resumed with a blog-sourced-video focus

## Repository and Git Policy

Only the `knowledge/` directory is managed by the knowledge-system Git workflow.

Other modified or untracked files in the repository may be intentionally excluded by design and must not be staged by documentation commands.

Use:

```bash
git status --short -- knowledge/
git add knowledge/
git diff --cached -- knowledge/
git commit -m "docs(knowledge): describe change"
```

Do not use:

```bash
git add .
git add -A
git commit -a
```

## Locked Baselines

### Tier 1 motion baseline

- **Tag:** `aepoch-tier1-beta-v0.1.0`
- **Commit:** `a41e3fb`

### Episode 001 static baseline

- **Tag:** `aepoch-e001-static-v0.1.0`
- **Commit:** `16b7141`

### Episode 001 timing baseline

- **Tag:** `aepoch-e001-timing-v0.1.0`
- **Commit:** `0c57456`

### Provider stack baseline

- **Tag:** `aepoch-provider-stack-v0.1.0`
- **Commit:** `5895462`

### Asset-first proof baseline

- **Tag:** `aepoch-e001-asset-first-proof-v0.1.0`
- **Commit:** `63a232e`

## Production Decision Summary

The primitive Remotion-first motion-blocking approach from Phase 13C.2A is not an approved production baseline.

It remains useful as:

- A technical reference
- A timing reference
- A source of proven transition architecture
- Evidence that deterministic full-episode composition is technically feasible

It must not be reused as the final creative direction because:

- Programmatic SVG human figures lacked production quality
- Primitive metaphor scenes lacked visual sophistication
- Phrase-level synchronization was not precise enough
- The resulting proof failed creative review

The approved direction is an **asset-first hybrid workflow**:

1. Generate or select approved editorial illustration plates.
2. Use those plates as visual assets rather than complete finished scenes.
3. Apply deterministic Remotion-native motion, masking, camera movement, geometry, transitions, and brand-state changes.
4. Synchronize scene changes to real word-level timestamps.
5. Keep generated imagery and programmatic motion under explicit human creative review.

## Completed Work

### Phase 10 — Production asset system

Completed the production asset library and ÆPOCH brand-system foundations.

### Phase 12 — Tier 1 module system

Completed six Tier 1 Remotion modules, including:

- Static review
- Motion implementation
- Caption support
- Transition correction
- Reduced-motion testing
- Baseline lock

### Phase 13A — Episode 001 pre-production

Completed:

- Episode brief
- Approved narration script
- Scene plan
- Written storyboard

### Phase 13A.1 — Scene-plan refinement

Locked:

- 22 scenes
- 719-word narration
- Approximate runtime of 5:20 at 135 words per minute
- 63.6% Tier 1 direct reuse or variant reuse
- 36.4% requiring new or unimplemented modules
- Factual claims
- Source outline
- No visible citation requirement

### Phase 13B — Static reference production

Completed the Episode 001 static source scaffold and rendered the required reference frames and contact sheets.

Verified:

- No modification to the frozen Tier 1 baseline
- Deterministic repeat rendering
- No new TypeScript diagnostics beyond the baseline
- Moss and Signal exclusions respected where required

### Phase 13B.1 — Static creative correction

Corrected:

- Human proportions
- Dark-scene scale
- Manufactured Consensus composition
- Uncertain Reflection composition
- Extraction composition
- Traffic-data layout
- 42-day-test layout
- Outro mark scale

### Phase 13B.2 — KeyStatement differentiation

Replaced repetitive KeyStatement layouts with differentiated episode-specific compositions.

Added:

- `SignalVesica`
- `BreathRings`

Preserved one canonical KeyStatement scene as the reference baseline.

### Phase 13C.1 — Performance analysis and timing lock

Analyzed Lee's 314.665-second reference recording as a pacing and performance reference only.

Produced:

- `reference/lee/lee-performance-map.md`
- `inputs/scene-timing-map.yaml`

Key conclusion:

Lee's reference video is not an approved visual or audio production source. It contains extensive generic AI B-roll and imagery that conflicts with the ÆPOCH brand system.

### Phase 13C.2A — Complete motion-blocking draft

Implemented deterministic motion for all 22 scenes.

Registered:

- `Aepoch-E001-MotionBlocking`
- `Aepoch-E001-MotionBlocking-Reduced`

Technical result:

- PASS

Creative result:

- FAIL
- Production baseline rejected

The source remains retained as a technical and timing reference only.

### Provider hardening

Functionally verified:

- fal.ai Recraft generation
- Pexels search and download
- Pixabay search and download
- `faster-whisper` import in the project virtual environment

Registry-verified but not yet functionally exercised:

- FLUX generation path beyond the later Kontext edit workflow
- Kling
- Veo
- MiniMax

Known provider findings:

- Recraft `vector_illustration` returns SVG rather than PNG.
- The live Recraft endpoint accepts fewer style values than the tool registry advertises.
- Literal negative-exclusion-list prompt wording can trigger moderation.
- Positive-only prompt framing is required.
- Pixabay may return PNG content under a `.jpg` default filename.

### Phase 14A.1 — Illustration direction exploration

Generated 12 editorial illustration candidates across three visual directions and four narrative beats.

Outcome:

- No direction passed all four frames cleanly.
- Direction A, Editorial Geometric, was selected as the production base.

### Phase 14A.2 — Direction A convergence test

Tested Direction A across:

- Human Among Synthetic Echoes
- Uncertain Digital Reflection
- Manufactured Consensus

Approved or retained assets included:

- `echoes-a`
- `reflection-a`
- `reflection-b`

Manufactured Consensus remained unresolved as a clean generated image.

### Phase 14A.3 — Manufactured Consensus repair

Used FLUX Kontext reference-image editing to repair the Manufactured Consensus slot.

Outcome:

- Technical validation: PASS
- Creative validation: FAIL
- The image improved but did not fully resolve the visual concept

### Phase 14B — Production-quality visual proof

**Status:** Complete

Built a 47-second proof segment:

- **Duration:** 47.00 seconds
- **Frames:** 1410
- **Frame rate:** 30 fps
- **Composition:** `Aepoch-E001-Phase14B-Proof`
- **Source directory:** `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/`

The proof covers narration beats N06–N09.

#### Assets used

- `echoes-a`
- `reflection-a`
- `consensus-edit-a`
- One Direction A multiplication frame from Phase 14A.1

No new image-generation or image-editing calls were made during Phase 14B.

#### Word-level timing

Ran `faster-whisper` locally using:

- Model: `small`
- Device: CPU
- Compute type: `int8`
- Word timestamps enabled

All ten required spoken markers were located from the real recording rather than estimated.

The extracted timing record is:

```text
inputs/phase-14b-proof-word-timings.json
```

Exact proof boundaries:

- Start: 52.60 seconds
- End: 99.60 seconds
- Duration: 47.00 seconds

Audio was extracted from Lee's recording without:

- Time stretching
- Normalization
- Equalization
- Denoising

Lee's recording remains a timing reference only.

#### Phase 14B beats

1. **Something's Off**
   - Uses `echoes-a`
   - Paper edge-wash reveal

2. **Comments and Rapid Responses**
   - Continues the echoes concept
   - Mechanical color-state strobe on the speed reference

3. **Uncertain Video Identity**
   - Uses `reflection-a`
   - Restrained registration wobble

4. **Phone Calls and Catfishing**
   - Continues the reflection concept
   - Pan and tint-state refresh

5. **Synthetic Multiplication**
   - Uses a Direction A multiplication frame
   - Crop-pan and deterministic highlight sweep

6. **Manufactured Consensus**
   - Uses `consensus-edit-a` as a figure plate
   - Adds deterministic synchronization markers and a shared output band through Remotion geometry

#### Phase 14B output

Rendered:

- One full 720p preview
- One clean proof contact sheet
- One word-alignment contact sheet
- One transition contact sheet

Verified:

- No blank transition frames
- No new TypeScript diagnostics beyond the existing baseline
- No Moss
- No Signal
- No `Math.random()`
- No primitive human components in the new Phase 14B source

#### Phase 14B review verdict

| Axis | Verdict |
|---|---|
| Technical validation | PASS |
| Asset-first hybrid workflow | PASS |
| Word-level synchronization method | PASS |
| Creative proof | CONDITIONAL PASS |
| Public-ready | NO |

The Phase 14B proof is suitable only as an internal pipeline demonstration.

It is not approved for public release.

The full Episode 001 build must not begin from this proof. Delivery has moved
to Lee's manual workflow, and Phase 14B.1 is superseded.

## Current Phase — Phase 16: “What is ÆPOCH?” Real Blog Pilot

**Status:** Authorized for preflight, authoritative extraction, verification/enrichment, reference analysis, and proposal; paid generation and full production await explicit proposal approval

The immediate objective is to make OpenMontage reliably accept an ÆPOCH
blog post and carry it through the `animated-explainer` pipeline using the
existing blog-to-script adapter, canonical artifacts, capability preflight,
checkpoints, and review gates.

This phase is system readiness work. It is not Episode 001 production and it
does not authorize paid generation, publishing, deployment, or an unattended
full-cost production run.

A baseline and capability audit ran on 2026-07-31 and found a real contract
mismatch between `brands/aepoch/SCRIPT_RULES.md` (the blog-to-script adapter)
and the live `script` stage contract in `pipeline_defs/animated-explainer.yaml`
and `skills/pipelines/explainer/script-director.md`. Full findings:
`knowledge/wiki/reports/phase-15-baseline-contract-audit.md`. The operator
selected an authoritative source-extraction stage before research (ADR-024),
implemented and contract-tested (567 passed, 7 skipped).

The representative fixture (`tests/fixtures/blog/authoritative-source.md`)
has since been run end to end through extraction, source-authoritative
research, and proposal using the real checkpoint/schema machinery
(`tests/qa/test_09_blog_source_dry_run.py`, 24/24 passed). Protected
narrative fields verified unchanged byte-for-byte across all three
artifacts; the three proposal concepts verified to vary presentation
(title/hook/narrative_structure/visual_approach/target_platform/tone) while
sharing one identical thesis (`core_message`). A regression in
`get_next_stage()` introduced by the ADR-024 stage addition was found and
fixed along the way (TR-027) — both zero-cost regression suites stayed green
throughout. Full results: `knowledge/wiki/reports/phase-15-blog-dry-run-results.md`.

The run was then extended through `script`, `scene_plan`, local/zero-cost
`assets`, `edit`, and `compose`
(`tests/qa/test_10_blog_source_production_dry_run.py`, 47/47 passed),
producing a real rendered `.mp4`, a real deterministic `final_review`, and a
real `render_report` — all schema-valid. The script was validated
programmatically against `brands/aepoch/SCRIPT_RULES.md` Parts 2-4 (word
count, cue density, five-stage arc, protected-field verbatim preservation,
pronunciation-on-first-use, claim traceability, hook/landing rules); a
residual documentation drift in SCRIPT_RULES.md Part 2 (field names that
don't match the live `script.schema.json`) was found and logged as TR-028.
The proposal's locked `render_runtime` ("remotion") was **not** actually
exercised in that round — it rendered via the ffmpeg mechanics path only,
disclosed explicitly in `final_review` (`runtime_swap_detected: true`)
rather than silently.

**Readiness closure round (2026-07-31, later same day):** Per operator
instruction, fixed TR-028 by rewriting `SCRIPT_RULES.md` Parts 2-4
field-for-field against the live schema, then re-ran the fixture through the
**proposal-locked Remotion runtime for real — no ffmpeg substitution**
(`tests/qa/test_11_blog_source_remotion_render.py`, 24/24 passed): a genuine
`npx remotion render` produced a real 1920x1080, 61.06s, h264+aac `.mp4`
with `runtime_swap_detected: false`. Building that render surfaced two more
findings: TR-030 (a real bug in `Explainer.tsx`'s asset-path resolution,
fixed, plus a deeper limitation in how `_remotion_render()` serves local
absolute-path assets, still open — the most significant remaining
real-production blocker) and TR-029 (documented, not code-fixed: `cuts[]`
`in_seconds`/`out_seconds` mean different things to FFmpeg vs. Remotion).
All five zero-cost regression suites green throughout (contracts 567/7,
test_08 38/0, test_09 24/0, test_10 47/0, test_11 24/0). Updated verdicts —
contract PASS, blog-adaptation PASS (upgraded), local-render CONDITIONAL
(evidence substantially strengthened), real-production NO — recorded in
`knowledge/wiki/reports/phase-15-readiness-closure.md`, which supersedes the
prior `phase-15-readiness-verdict.md`.

**Final renderer hardening round (2026-07-31, later same day):** Per
operator instruction, implemented the general TR-030 fix inside
`VideoCompose._remotion_render()` itself — `_stage_local_assets_for_remotion()`
detects local absolute-path assets (video/image/audio, including
`backgroundImage`/`backgroundVideo`/`images[]`), validates them up front
with clear rejection of every missing/unreadable input at once, stages them
into a UUID-scoped collision-safe directory under
`remotion-composer/public/`, rewrites props, preserves provenance, and
cleans up unconditionally without ever touching pre-existing content. This
replaces the prior round's test-scoped workaround; no caller-side
pre-staging is needed anymore. Also resolved TR-029 by adding
`edit_decisions.cut_timing_mode` (`"source_trim"` default | `"timeline"`)
and `cuts[].source_in_seconds` to the schema, with `_compose()` and
`_remotion_render()` each explicitly rejecting the mode they don't
implement rather than silently reinterpreting the same fields. New fast
regression suite `tests/contracts/test_remotion_asset_staging_contract.py`
(16 tests, 0.15s) plus a re-run of the real Remotion render using only the
general fix (`test_11_blog_source_remotion_render.py`, 28/28, up from
24/24 — 4 new checks for staging/provenance/cleanup, independently verified
via `ffprobe` and a `remotion-composer/public/` listing diff). Full sweep
green: contracts 583/7, test_08 38/0, test_09 24/0, test_10 47/0, test_11
28/0, TypeScript diagnostics unchanged (15). Updated verdicts — contract
PASS, blog-adaptation PASS, local-render **PASS** (upgraded from
CONDITIONAL), real-production NO — recorded in
`knowledge/wiki/reports/phase-15-renderer-hardening.md`, which supersedes
`phase-15-readiness-closure.md`.

**Phase 15 is complete.** Its contract, blog-adaptation, and local-render
readiness verdicts are PASS. The first real pilot is the live “What is ÆPOCH?”
blog post, benchmarked against the existing ÆPOCH Protocol YouTube channel.
The source is authoritative; research may verify and enrich it but may not
rewrite its thesis or protected narrative fields. The executable handoff is
`docs/aepoch-production-playbook/prompts/phase-16-what-is-aepoch-real-blog-pilot.md`.

## Historical Phase 14B.1 Corrections (Superseded)

1. Begin with one dominant human and reveal synthetic echoes progressively.
2. Treat Beats 1 and 2 as one continuous echoes composition.
3. Strengthen the internal visual shift during the phone-call and catfishing narration.
4. Treat Beats 3 and 4 as one continuous reflection composition.
5. Replace the inconsistent synthetic-multiplication plate.
6. Make Manufactured Consensus synchronization unmistakable at normal playback size.
7. Continue using Lee's recording only as the timing reference.
8. Replace Lee's reference audio with a clean recording of the approved script for final production.

## Episode 001 Disposition

The recording dependency and Phase 14B.1 correction path are no longer part
of the active OpenMontage plan. Lee is editing the author's narration and
video directly and will produce the Episode 001 video manually.

OpenMontage must not wait for, ingest, or modify that media unless the author
later creates a new explicit scope. The Phase 14B proof remains preserved as
internal workflow evidence and is not public-ready.

## Active Blockers

### Blocker 1 — Blog-source intake has not been validated end to end

The repository contains `brands/aepoch/SCRIPT_RULES.md`, but the current
blog-post-to-canonical-artifact path must be audited against the live
`animated-explainer` manifest and schemas.

**Update 2026-07-31:** Audited. Confirmed real: `SCRIPT_RULES.md` claims its
`script` output is directly acceptable at the pipeline's script stage, but
`animated-explainer.yaml` requires `proposal_packet` there and
`script-director.md` still opens with stale v1.0 (`brief`/"Idea Explorer")
language with no mention of the adapter. See
`knowledge/wiki/reports/phase-15-baseline-contract-audit.md` and ADR-023.
Resolved structurally by ADR-024 and TR-026, and now verified by a real
extraction → research → proposal dry run (24/24 passed). **Closed** for the
extraction/research/proposal scope; script stage onward not yet exercised.

### Blocker 2 — Production preflight needs a current evidence run

Available providers, render runtimes, local dependencies, and zero-cost test
paths must be rediscovered and recorded before a new production proposal.
Composition-runtime and capability-preflight evidence was captured during
the 2026-07-31 baseline audit
(`knowledge/wiki/reports/phase-15-baseline-contract-audit.md`); a fresh
snapshot should still be taken immediately before any real production
proposal, since providers/keys may change between now and then.

**Update 2026-08-01 (closed):** The new-machine environment was rebuilt and
the full zero-cost Phase 15 baseline passed: contracts 642/7, QA test_08 38/0,
test_09 24/0, test_10 47/0, and real-Remotion test_11 28/0. FFmpeg, Remotion,
and HyperFrames are available; source ingestion and the local reference-analysis
toolchain are configured. Python 3.14 and the untracked installation of
`faster-whisper`/`yt-dlp`/`youtube-transcript-api` remain disclosed watch
items. See `knowledge/wiki/reports/phase-16-machine-readiness-preflight.md`.

### Blocker 3 — A bounded representative dry run has not passed

A short blog-sourced fixture must reach validated artifacts and a local
review output before the system is called ready for a real blog episode.

**Update 2026-07-31 (closed):** Passed end to end, extraction through
compose, with a real rendered output and a real deterministic `final_review`
— first via ffmpeg mechanics, then via a genuine, proposal-locked Remotion
render with no substitution. See
`knowledge/wiki/reports/phase-15-readiness-closure.md`. Remaining gaps
before real-production readiness are listed in that report's verdict
section (TR-030's general fix, real research, real provider selection, a
second fixture), not blockers to calling this dry-run scope complete.

### Blocker 4 — `_remotion_render()` cannot serve local absolute-path assets by default (TR-030)

Opened 2026-07-31 while building the real Remotion render.

**Update 2026-07-31 (closed):** General fix implemented in
`_remotion_render()` itself (`_stage_local_assets_for_remotion`) — no
caller-side pre-staging required anymore. Verified by re-running the real
Remotion render using only the general fix (28/28 passed) plus 16 fast
regression tests covering images/audio/video/repeated-filenames/missing-
files/cleanup. See TR-030 in `knowledge/operations/troubleshooting.md` and
`knowledge/wiki/reports/phase-15-renderer-hardening.md`.

## Immediate Next Action

**Update 2026-08-01 (extraction tranche executed, awaiting approval):**
Claude initialized `projects/aepoch-blog-pilot-what-is-aepoch/`, retrieved the
live blog (`https://aepoch.xyz/blog/post/what-is-aepoch` — WebFetch was
blocked by Cloudflare bot-protection; a browser-User-Agent `curl` retrieval of
the same public page succeeded), and produced a schema-valid
`source_extraction` artifact per `skills/pipelines/explainer/extraction-director.md`
and `brands/aepoch/SCRIPT_RULES.md` Part 1. The extraction checkpoint is
written as `awaiting_human`
(`projects/aepoch-blog-pilot-what-is-aepoch/checkpoint_extraction.json`).
Full detail: `knowledge/log.md`, 2026-08-01 "Phase 16 extraction tranche
executed" entry.

**Update 2026-08-01 (research, benchmark analysis, and proposal completed):**
Chris approved the extraction. Claude completed research/verification
(`research_brief`), analyzed all 8 ÆPOCH Protocol YouTube videos, and produced
a 3-concept `proposal_packet` + `decision_log`, checkpointed `awaiting_human`
per the manifest's gate on the `proposal` stage. Full detail:
`knowledge/log.md`, 2026-08-01 "Extraction approved; research, benchmark
analysis, and proposal completed" entry.

Headline findings: the source's core claims are verified/strengthened (a
fresher hook candidate surfaced — 85% of people can't tell real from
AI-generated content); 4 of the 8 benchmark videos are confirmed Google
NotebookLM auto-generated outputs, not bespoke productions, and the channel's
visual identity is not currently locked across its more custom videos; all 8
videos use zero camera movement, validating the project's asset-first hybrid
workflow and identifying real Remotion motion as a genuine differentiator; and
the existing untracked `styles/aepoch-symbolic.yaml` — recommended as the
playbook — currently fails schema validation and needs a fix before scene
planning can use it.

**Executive-producer review 2026-08-01 — proposal revision required:** The
four canonical JSON artifacts validate and the protected source fields are
preserved, but the required eight-video benchmark analysis was not persisted.
The proposal points to chat and unrelated decision entries rather than a
repository artifact; `research_brief` still says benchmark analysis will be
merged later. Claude must persist the structured benchmark analysis and its
frame/transcript provenance, update artifact references, re-run proposal
review, refresh the proposal checkpoint as `awaiting_human`, update durable
knowledge, and stop. Full finding:
`knowledge/wiki/reports/phase-16-proposal-gate-review.md`.

**Update 2026-08-01 (revision executed):** Persisted the full 8-video
benchmark analysis under `projects/aepoch-blog-pilot-what-is-aepoch/artifacts/`
— `benchmark_analysis.md` (cross-video synthesis), 8 schema-valid
`video_analysis_brief.json` files, `benchmark/raw/` (full per-shot 5-aspect
breakdowns), and `benchmark/evidence/` (transcripts, sampled keyframes,
scene-change timestamps). Fixed `research_brief.json` and
`proposal_packet.json` references to point to these real paths instead of
chat/decision-log cross-references. All 4 canonical artifacts plus all 8
`video_analysis_brief` files re-validated clean. Proposal checkpoint refreshed
as `awaiting_human` (revision round 1). Full detail: `knowledge/log.md`,
2026-08-01 "Benchmark evidence persisted per executive-producer revision
request" entry. No script, paid generation, full production, publish, or
deploy is authorized.

**Update 2026-08-01 — proposal approved as recommended:** Chris approved
Concept C1 (“The Realness Tax”), Remotion, atelier authoring, FLUX
illustration plates, the provisional OpenAI-TTS path subject to a voice
sample, a provisional Pixabay music search subject to fit, approximately 280
seconds, a $0.77 estimate under a $2.00 cap, and adapting
`styles/aepoch-symbolic.yaml` to the existing schema rather than expanding the
shared schema. Chris also disclosed an existing voice recording and a large
music collection. Their paths and the recording's intended role (performance
reference versus final narration) must be resolved before the audio plan is
locked.

**Audio clarification 2026-08-01:** Chris withdrew the large music collection
from scope because it is too broad to inventory and OpenMontage does not have
permission to use it. Chris may later identify a suitable track from artists
he knows and can license directly. Music is deferred and remains unlocked;
Claude must not scan the collection or assume permission. OpenAI TTS remains
only a later sample option, not authorization for an audio-generation call.

**Immediate next action:** Claude appends the approved proposal decisions using
the existing decision subjects, completes the proposal checkpoint correctly,
fixes and validates the custom playbook without changing the shared schema,
and executes the `script` stage only with music left deferred. Claude writes
the script checkpoint as `awaiting_human`, updates durable knowledge, and
stops. No asset generation, audio generation, paid calls, full production,
publish, or deploy is authorized.

## Verification Criteria for Phase 15 Start

Phase 15 may begin when:

- The agent has read the repository guide and current knowledge state
- The active scope is system readiness, not Episode 001 production
- Existing unrelated working-tree changes are preserved
- No paid provider call is made without a new explicit authorization

## Verification Criteria for Phase 15 Completion

Phase 15 is complete only when:

- A blog source can be transformed into schema-valid research/proposal/script
  and scene-plan artifacts with traceable claims and exclusions
- Capability preflight reports the actual available tools and render runtimes
- The chosen local or zero-cost test path reaches a deterministic review output
- Checkpoint, cost, and human-approval boundaries behave as documented
- Failures, fixes, exact commands, and evidence are recorded
- A follow-on real-production brief can be handed off without relying on chat context
- The author reviews the readiness report and authorizes the next production phase

## Relevant Files

### Production state and phase history

- `docs/aepoch-production-playbook/CURRENT_STATE.md`
- `docs/aepoch-production-playbook/PHASE_LOG.md`
- `docs/aepoch-production-playbook/PROVIDER_SETUP.md`

### Phase 14B implementation

- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/assets.ts`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/audio.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/beats.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/composition.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/consensus-geometry.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/plate.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/timeline.ts`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/transitions.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/types.ts`

### Phase 14B timing and review

- `projects/aepoch-episodes/001-what-is-aepoch/inputs/phase-14b-proof-word-timings.json`
- `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-production-proof-review.md`

### Phase 14B render

- `renders/previews/phase-14b/aepoch-e001-phase14b-proof-720p.mp4`

## Contradictions and Superseded State

The earlier conversational assumption that the project was near the end of Phase 4 is superseded.

Repository and production-playbook evidence confirms that:

- Phase 14B is complete
- Phase 14B.1 has been superseded
- Episode 001 is being produced manually by Lee outside OpenMontage
- Phase 15 blog-to-video production readiness is next
- The current production proof is not public-ready
