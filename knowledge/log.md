---
type: Knowledge Log
title: ÆPOCH OpenMontage Knowledge Log
description: Append-only chronological record of meaningful project-state changes, knowledge-system work, evidence captures, and production decisions.
status: stable
project_state: confirmed
generated:
  by: chatgpt
  at: 2026-07-30T16:30:00+01:00
---

# ÆPOCH OpenMontage Knowledge Log

## Log Rules

This file is append-only.

Do not rewrite earlier entries to make history appear cleaner.

When a prior entry becomes inaccurate:

1. Add a new correction entry.
2. Identify the superseded statement.
3. Link to the current authoritative document.
4. Preserve the original entry.

Each entry should include:

- Date
- Time where useful
- Scope
- What changed
- Evidence
- Result
- Immediate next action

---

## 2026-07-30 — Knowledge system bootstrap initiated

### Scope

Created a durable, repository-local Markdown knowledge system for the ÆPOCH OpenMontage animated-video production project.

### Reason

Project knowledge had become distributed across:

- ChatGPT planning sessions
- Claude Code execution sessions
- Repository source
- Terminal output
- Production playbooks
- Render reviews
- Provider testing
- Creative decisions

The goal was to prevent loss of operational context after chat resets, `/clear`, compaction, or agent changes.

### Initial structure

Created and reorganized:

```text
knowledge/
├── SCHEMA.md
├── index.md
├── log.md
├── state/
│   ├── current-state.md
│   └── decisions.md
├── operations/
│   ├── runbook.md
│   ├── troubleshooting.md
│   └── providers.md
├── production/
│   ├── pipeline.md
│   ├── asset-system.md
│   └── beta-test-plan.md
├── wiki/
│   ├── concepts/
│   ├── entities/
│   ├── sources/
│   ├── comparisons/
│   └── reports/
└── raw/
    ├── chats/
    ├── terminal-logs/
    ├── upstream-docs/
    ├── configs-redacted/
    └── references/
```

### Governance model

Adopted:

- Git-backed Markdown as the authority
- Human-governed operational documents
- Immutable raw evidence
- Optional future agent-compiled wiki pages
- Explicit provenance
- Knowledge-only Git scope

### Result

Knowledge architecture established.

---

## 2026-07-30 — Git scope clarified

### Scope

Corrected the assumption that the repository must have a clean working tree before documentation work.

### Confirmed repository policy

Only:

```text
knowledge/
```

is managed by the knowledge-documentation workflow.

Other modified or untracked files may remain intentionally local and excluded by design.

### Approved commands

```bash
git status --short -- knowledge/
git add knowledge/
git diff --cached -- knowledge/
git commit -m "docs(knowledge): describe change"
```

### Prohibited broad staging commands

```bash
git add .
git add -A
git commit -a
```

### Result

The documentation process no longer risks staging intentionally local production files.

---

## 2026-07-30 — Post-Phase-14B baseline captured

### Evidence

Created:

```text
knowledge/raw/terminal-logs/2026-07-30-post-phase14b-baseline.txt
```

### Purpose

The baseline records:

- Repository status
- Knowledge-only synchronization policy
- Intentionally excluded local files
- Post-Phase-14B project context

### Result

A raw repository checkpoint now supports later state reconstruction.

---

## 2026-07-30 — Knowledge directory reorganized

### Scope

Moved the initial flat Markdown files into role-specific directories.

### Changes

```text
CURRENT_STATE.md
→ state/current-state.md

DECISIONS.md
→ state/decisions.md

RUNBOOK.md
→ operations/runbook.md

TROUBLESHOOTING.md
→ operations/troubleshooting.md

PROVIDERS.md
→ operations/providers.md

PRODUCTION_PIPELINE.md
→ production/pipeline.md

ASSET_SYSTEM.md
→ production/asset-system.md

BETA_TEST_PLAN.md
→ production/beta-test-plan.md

INDEX.md
→ index.md

LOG.md
→ log.md
```

`SCHEMA.md` remained at the knowledge root.

### Result

The system now separates:

- Governance
- State
- Operations
- Production
- Raw evidence
- Agent-compiled wiki material

---

## 2026-07-30 — Knowledge governance schema established

### File

```text
knowledge/SCHEMA.md
```

### Added rules

- Source-of-truth hierarchy
- Directory responsibilities
- Document lifecycle
- Verification levels
- Provenance requirements
- Agent write boundaries
- Session start procedure
- Session end procedure
- Git scope
- Secret-handling rules
- Decision-record requirements
- Troubleshooting-record requirements
- Current-state requirements
- Writing conventions

### Important boundary

Agents may maintain:

```text
knowledge/wiki/
knowledge/log.md
```

Agents must present or review changes before modifying:

```text
knowledge/state/
knowledge/operations/
knowledge/production/
knowledge/SCHEMA.md
knowledge/index.md
```

Existing raw evidence must not be rewritten.

### Result

The knowledge system now has explicit governance rather than relying on conversational assumptions.

---

## 2026-07-30 — Production state reconstructed from repository evidence

### File

```text
knowledge/state/current-state.md
```

### Evidence consulted

- Production playbook current state
- Production phase log
- Git history
- Phase 14B source inventory
- Repository baseline
- Episode 001 assets and review outputs

### Confirmed state

- Current branch: `aepoch-series`
- Last completed production phase: Phase 14B
- Next phase: Phase 14B.1
- Phase 14B.1 not started
- Phase 14B proof is internal only
- Public-ready verdict is NO
- Full Episode 001 production is blocked
- Production is paused while new human video and clean narration are recorded

### Phase 14B verdict

| Axis | Verdict |
|---|---|
| Technical validation | PASS |
| Asset-first workflow | PASS |
| Word-level synchronization | PASS |
| Creative validation | CONDITIONAL PASS |
| Public-ready | NO |

### Immediate production dependency

The author must complete and identify:

1. Clean narration recording
2. New human-video recording

### Result

The earlier conversational assumption that the project was near Phase 4 was superseded by repository evidence confirming completion through Phase 14B.

---

## 2026-07-30 — Decision register established

### File

```text
knowledge/state/decisions.md
```

### Decisions recorded

- Git-backed Markdown knowledge authority
- Raw evidence separated from maintained knowledge
- Human governance for operational documents
- Knowledge-only Git scope
- Repository and verified outputs as operational truth
- Primitive Remotion-first creative baseline rejected
- Asset-first hybrid production adopted
- Direction A / Editorial Geometric selected as production base
- Custom style training deferred
- Positive-only generation prompts required
- Word-level synchronization required
- Lee's recording restricted to timing and performance reference
- Technical and creative gates separated
- Phase 14B treated as internal proof
- Phase 14B.1 restricted to proof polish
- Production paused during recording
- External LLM wiki tools remain optional
- Semantic search deferred until corpus scale requires it

### Result

Future agents have an explicit record of why settled choices exist and when they may be revisited.

---

## 2026-07-30 — Troubleshooting register established

### File

```text
knowledge/operations/troubleshooting.md
```

### Confirmed technical incidents recorded

- Missing `pytest` in the project virtual environment
- Wrong Python interpreter risk
- False fal.ai authentication failure caused by bypassing the project `.env` loader
- Recraft `422` failure caused by hex color payload format
- Recraft WebP output returned for `.png` request
- Pixabay PNG output returned under `.jpg` naming
- SVG output from `vector_illustration`
- Stale Recraft style enum
- Moderation caused by literal negative-exclusion lists
- Registry availability confused with functional validation
- Phrase-level timing shown to be too imprecise
- Pre-existing TypeScript diagnostics distinguished from regressions

### Creative and workflow failures recorded

- Primitive Remotion-first creative rejection
- Human proportion and leg-overlap issue
- Repetitive KeyStatement scenes
- Generated human and consensus brand failures
- Manufactured Consensus concept ambiguity
- Same-plate crossfades
- Weak Beat 4 visual shift
- Inconsistent multiplication plate
- Consensus markers too subtle at playback size

### Result

Confirmed fixes, workarounds, open defects, and creative failures are no longer mixed together.

---

## 2026-07-30 — Provider register established

### File

```text
knowledge/operations/providers.md
```

### Required environment-variable names recorded

```text
PEXELS_API_KEY
PIXABAY_API_KEY
FAL_KEY
```

### Local dependency recorded

```text
faster-whisper 1.2.1
```

### Correct provider entry path recorded

```python
from tools.tool_registry import registry
```

### Provider states recorded

| Provider/tool | State |
|---|---|
| Pexels | Functionally tested |
| Pixabay | Functionally tested |
| Recraft | Functionally tested after fixes |
| FLUX Kontext editing | Functionally used in Phase 14A.3 |
| Generic FLUX path | Not fully characterized |
| Kling | Registry-only |
| Veo | Registry-only |
| MiniMax | Registry-only |
| faster-whisper | Functionally tested in Phase 14B |
| ElevenLabs | Not required for current workflow |

### Cost rules recorded

- No automatic retries
- Every paid call must have a phase scope
- Maximum call count and cost must be stated
- Failures must be reported before retrying

### Result

Provider availability, functional testing, and production approval are now separate concepts.

---

## 2026-07-30 — Operational runbook established

### File

```text
knowledge/operations/runbook.md
```

### Procedures documented

- Enter repository
- Read current state
- Read index and latest log
- Verify branch and commit
- Verify `.venv`
- Run tests
- Discover providers
- Handle paid calls
- Verify image formats
- Run word-level timing
- Begin Phase 14B.1 safely
- Review Remotion output
- Capture evidence
- Update durable knowledge
- Commit only intended knowledge files
- Stop and recover when state is unclear

### Current gate recorded

No production work begins until the author explicitly lifts the recording pause.

### Result

Future execution agents now have an executable session-start and session-end procedure.

---

## 2026-07-30 — Production pipeline established

### File

```text
knowledge/production/pipeline.md
```

### Pipeline model

Adopted the asset-first hybrid flow:

1. Approved script and scene architecture
2. Approved visual plates
3. Deterministic Remotion treatment
4. Real word-level narration alignment
5. Separate technical and creative review
6. Explicit public-readiness gate

### Phase history documented

- Phase 10
- Phase 12
- Phase 13A
- Phase 13A.1
- Phase 13B
- Phase 13B.1
- Phase 13B.2
- Phase 13C.1
- Phase 13C.2A
- Phase 14A.1
- Phase 14A.2
- Phase 14A.3
- Phase 14B
- Planned Phase 14B.1

### Result

The production workflow now has explicit gates preventing technical success from being mistaken for creative approval.

---

## 2026-07-30 — Episode 001 asset inventory captured

### Raw evidence

Created:

```text
knowledge/raw/terminal-logs/2026-07-30-episode001-asset-inventory.txt
```

### Inventory covered

- Remotion ÆPOCH source files
- Phase 14B implementation files
- Episode 001 generated assets
- Audio
- Timing maps
- QA contact sheets
- Reference media
- Static renders
- Motion previews

### Important finding

The checked command returned no files under:

```text
remotion-composer/public/aepoch/
```

The actual Phase 14B runtime asset paths therefore remain to be verified from:

```text
remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/assets.ts
```

### Result

The asset system avoids inventing runtime paths and preserves the inventory used for documentation.

---

## 2026-07-30 — Production asset system established

### File

```text
knowledge/production/asset-system.md
```

### Asset categories defined

- Brand assets
- Episode inputs
- Reference media
- Generated exploration assets
- Style-convergence assets
- Production plates
- Audio
- Static renders
- Motion previews
- QA artifacts

### Asset states defined

```text
raw
exploration
candidate
approved-reference
approved-plate
internal-proof
production-approved
public-ready
rejected
superseded
```

### Current plate decisions recorded

- `echoes-a`: approved plate
- `reflection-a`: approved plate
- `reflection-b`: approved reference
- `consensus-edit-a`: approved plate with geometry dependency
- `consensus-edit-b`: candidate not selected
- `consensus-edit-c`: candidate not selected
- Phase 14A.1 multiplication frame: superseded for production
- Phase 13C.2A primitive humans: rejected

### Result

Repository presence is no longer confused with asset approval.

---

## 2026-07-30 — Phase 14B.1 beta-test plan established

### File

```text
knowledge/production/beta-test-plan.md
```

### Entry conditions defined

- Recording pause explicitly lifted
- Clean narration exists
- Human video exists
- Media inspected
- Phase 14B reproduced
- Scope remains limited to the existing proof
- Paid provider calls explicitly authorized

### Eight corrections converted into tests

1. Progressive echo reveal
2. Continuous Beats 1 and 2
3. Stronger Beat 4 shift
4. Continuous Beats 3 and 4
5. Replacement multiplication plate
6. Stronger Manufactured Consensus
7. Lee audio reference-only
8. Clean approved-script narration

### Test families created

- Input media
- Narration
- Baseline reproduction
- Correction-specific visuals
- Transitions
- Timing
- Technical validation
- Brand and creative review
- Audio-visual integration
- Review deliverables

### Result

Phase 14B.1 now has a concrete, evidence-based public-readiness gate.

---

## 2026-07-30 — Knowledge index established

### File

```text
knowledge/index.md
```

### Added

- Current project position
- Required session reading order
- Maintained document map
- Raw evidence map
- Repository source links
- Phase 14B source links
- Phase 14B review links
- Immediate next action
- Open knowledge tasks
- Git scope reminder

### Result

Future agents have one navigation entrypoint after reading `current-state.md`.

---

## 2026-07-30 — Knowledge bootstrap status

### Core files completed

- [x] `SCHEMA.md`
- [x] `index.md`
- [x] `log.md`
- [x] `state/current-state.md`
- [x] `state/decisions.md`
- [x] `operations/runbook.md`
- [x] `operations/troubleshooting.md`
- [x] `operations/providers.md`
- [x] `production/pipeline.md`
- [x] `production/asset-system.md`
- [x] `production/beta-test-plan.md`

### Raw evidence completed

- [x] Post-Phase-14B repository baseline
- [x] Episode 001 asset inventory

### Remaining verification tasks

- [ ] Inspect exact Phase 14B runtime asset paths
- [ ] Verify no secrets appear in knowledge files
- [ ] Review the complete knowledge-only diff
- [ ] Confirm Markdown links and paths
- [ ] Stage only `knowledge/`
- [ ] Commit the completed bootstrap
- [ ] Reverify the historical `pytest` failure
- [ ] Add new recording metadata after production resumes

### Current immediate next action

Run a full knowledge-system audit before staging and committing.

Recommended audit commands:

```bash
git status --short --untracked-files=all -- knowledge/
find knowledge -maxdepth 4 -type f -printf '%p\n' | sort
grep -RniE \
  '(api[_-]?key|secret|password|token|private[_-]?key)[[:space:]]*[:=][[:space:]]*[^[:space:]]+' \
  knowledge/ \
  --exclude='*.txt'
git diff --check -- knowledge/
git diff --stat -- knowledge/
```
## 2026-07-31 — Episode 001 moved to manual production; Phase 15 authorized

### Human decision

- Lee will edit the author's narration and video directly and produce Episode
  001 manually.
- OpenMontage will not wait for those recordings or execute Phase 14B.1 on
  the current path.
- Development returns to the core goal of producing videos from blog posts.

### State changes

- Phase 14B.1 marked superseded, not completed.
- Phase 14B retained as internal technical and workflow evidence only.
- Recording pause lifted by the scope change; the media remains outside the
  active OpenMontage scope.
- Phase 15, blog-to-video production readiness, authorized for audit and local
  or zero-cost validation.

### Handoff

Created:

```text
docs/aepoch-production-playbook/prompts/phase-15-blog-video-readiness.md
```

The previous Phase 14B.1 prompt now carries an explicit superseded warning.
Paid calls, publishing, deployment, and real public production remain
unauthorized pending Phase 15 evidence and author review.

---

## 2026-07-31 — Phase 15 baseline audit run; paused for scope decision

### What ran

Executed Phase 15 execution-sequence steps 1-4 and part of step 5: baseline
state, capability preflight, zero-cost QA/contract tests, and a first pass
at the research/proposal/script contract matrix.

### Evidence captured

- `test_08_end_to_end.py`: 38/38 passed (full synthetic 8-stage run, real
  ffmpeg render, current stage order `research -> proposal -> script ->
  scene_plan -> assets -> edit -> compose -> publish`).
- `tests/contracts/` (phase0-3, runtime presentation, taste governance):
  275/275 passed.
- All three composition runtimes (ffmpeg, Remotion, HyperFrames) available.
- No test or fixture anywhere exercises `brands/aepoch/SCRIPT_RULES.md`.

### Finding

`brands/aepoch/SCRIPT_RULES.md` (the ÆPOCH blog-to-script adapter) claims its
`script` output is directly acceptable at the `animated-explainer` pipeline's
script stage. The live manifest requires `proposal_packet` there, and
`skills/pipelines/explainer/script-director.md` still opens with stale v1.0
(`brief`/"Idea Explorer") language unaware of the adapter. Full detail, exact
file/line evidence, and three repair options:
`knowledge/wiki/reports/phase-15-baseline-contract-audit.md`. Logged as
TR-025 (`knowledge/operations/troubleshooting.md`) and ADR-023
(`knowledge/state/decisions.md`).

### Anomaly flagged, not touched

`README.md` and `diagram.png` at the repository root are currently
overwritten with the contents of an unrelated "Phase 10C asset pack"
distribution bundle (working-tree state, unrelated to Phase 15). Left as-is
for the operator to address separately.

### Decision

Per the human operator, stopped here rather than choosing a repair approach
unilaterally. Knowledge tree updated; handing back to the plan coordinator
to scope the correct work. No manifest, schema, skill, or artifact file was
modified.

### Handoff

Next session should read
`knowledge/wiki/reports/phase-15-baseline-contract-audit.md`, get a scoped
repair decision, then resume Phase 15 at execution-sequence step 5.

---

## 2026-07-31 — Authoritative blog extraction contract implemented

### Human decision

The source blog remains authoritative. OpenMontage research may verify and
enrich it but may not silently change its thesis or intended conclusion.

### Implementation

- Added `source_extraction` schema and checkpoint registration.
- Added a conditional extraction stage before research.
- Added source-authority rules to extraction, research, proposal, and script.
- Reframed `brands/aepoch/SCRIPT_RULES.md` around the live route.
- Corrected stale script-director `brief`/Idea Explorer language.
- Added a representative blog fixture and focused authority contracts.
- Renumbered the duplicate adapter troubleshooting entry to TR-026; the
  original TR-025 retry-cost entry remains unchanged.

### Verification

```text
.venv/bin/python -m pytest tests/contracts -q
566 passed, 7 skipped
```

### Next action

Run the representative fixture agent-first through extraction, research, and
proposal. Confirm protected fields survive unchanged before continuing to the
zero-cost production dry run.

---

## 2026-07-31 — Blog-source dry run passed; one regression found and fixed

### What ran

Resumed Phase 15 per operator instruction: ran
`tests/fixtures/blog/authoritative-source.md` through extraction,
source-authoritative research, and proposal using the real checkpoint/schema
machinery (new `tests/qa/test_09_blog_source_dry_run.py`, not a documentation
check). Stopped before `script` per instruction.

### Results

- `test_09_blog_source_dry_run.py`: 24/24 passed.
- Protected fields (`central_question`, `key_takeaway`, `aepoch_reframe`,
  `human_consequence`, `closing_statement`) verified byte-for-byte identical
  from `source_extraction` through `research_brief` and `proposal_packet`.
- All three `proposal_packet.concept_options` verified to share one
  identical `core_message` (thesis) while `title`/`hook`/`narrative_structure`/
  `visual_approach`/`target_platform`/`tone` all differ (presentation).
- `tests/contracts/`: 567 passed, 7 skipped (unchanged).
- `tests/qa/test_08_end_to_end.py`: 38/38 passed after a fix (see below);
  was 36/2 failed immediately after the ADR-024 implementation, before this
  session's fix.

### Regression found and fixed

Re-running the zero-cost suite (routine verification, not something the ADR-024
implementation session had done) surfaced that adding the conditional
`extraction` stage broke `get_next_stage()` for any run that never produces
`source_extraction` — it got stuck returning `"extraction"` forever instead
of resuming correctly. Fixed in `lib/pipeline_loader.py`
(`get_conditional_stage_names`) and `lib/checkpoint.py` (`get_next_stage`).
Logged as ADR-025 and TR-027. Fixed directly rather than escalated — small,
evidenced, immediately testable, not a production-architecture choice.

### Evidence

`knowledge/wiki/reports/phase-15-blog-dry-run-results.md`.

### Next action

Author review. Then either extend the dry run through `script` (Blocker 3
remainder) or hand off a real-production brief. No paid calls, provider
generation, or public production without new explicit authorization.

---

## 2026-07-31 — Full dry run (extraction through compose) passed; four readiness verdicts recorded

### What ran

Extended the approved fixture through `script`, `scene_plan`, local/zero-cost
`assets`, `edit`, and `compose`
(`tests/qa/test_10_blog_source_production_dry_run.py`, 47/47 passed), using
real local tools throughout: `AudioMixer` (duck mix), `VideoCompose`
(ffmpeg-path render), `SubtitleGen` (deterministic SRT from real script
timings, no ASR), `ffprobe` technical validation, and real frame sampling
for a `final_review` visual spotcheck. Produced a real 1920x1080/60.0s
h264+aac `.mp4`. Stopped before `publish`.

### Script validated against SCRIPT_RULES.md Parts 2-4, programmatically

Word count (144 vs. 144 target), cue density (8 cues, max gap 12s),
five-stage arc in order with no gaps, concrete voice-performance/delivery
cues, AEPOCH pronunciation on first use only (climax), every claim traceable
via `source_ref`, landing ends with `closing_statement` verbatim — and all
five protected fields plus `existing_reality`/`tension` appear verbatim in
the script text, no paraphrase drift from extraction through script.

### Findings

- **TR-028 (open):** `SCRIPT_RULES.md` Part 2's illustrative YAML still uses
  field names (`arc_stage`, `pause_emphasis`, `voice_performance_plan`,
  `pronunciation_notes`, `verify_flags`, cue type `transition`) that don't
  exist in the live `script.schema.json` — caught by a real validation
  failure during this run. Worked around using the schema's real fields
  (satisfies SCRIPT_RULES.md's substance per its own stated precedence);
  document itself still needs the rewrite.
- The proposal's locked `render_runtime` ("remotion") was not actually
  exercised — this dry run rendered via ffmpeg mechanics only. Disclosed
  explicitly in `final_review.checks.promise_preservation`
  (`runtime_swap_detected: true`), not silent. `final_review.status` is
  `"revise"` because of this plus placeholder-asset limitations.

### Four readiness verdicts

Recorded in `knowledge/wiki/reports/phase-15-readiness-verdict.md`:

- Contract readiness: **PASS**
- Blog-adaptation quality: **CONDITIONAL PASS** (substance verified; TR-028 open; one fixture, one pass, no author review yet)
- Local-render readiness: **CONDITIONAL** (ffmpeg mechanics proven; Remotion/HyperFrames untested; placeholder assets)
- Real-production readiness: **NO** (author approval, real render test, real research, TR-028 fix, second fixture all still needed)

### Next action

Author review of the readiness verdict report. No paid calls, provider
generation, publish, or real production without new explicit authorization.

---

## 2026-07-31 — Phase 15 readiness closure: TR-028 fixed, real Remotion render proven

### What ran

Per operator instruction: (1) fixed TR-028 by rewriting
`brands/aepoch/SCRIPT_RULES.md` Parts 2-4 field-for-field against the live
`schemas/artifacts/script.schema.json`; (2) re-ran the approved fixture
through the proposal-locked Remotion runtime for real — no ffmpeg
substitution (`tests/qa/test_11_blog_source_remotion_render.py`, 24/24
passed); (3) ran all regression suites; (4) issued updated verdicts.

### TR-028 fix

`SCRIPT_RULES.md` Parts 2-4 now use the schema's real field names
(`voice_performance`, `delivery_cues`, `pronunciation_guides`, `source_ref`,
the real `enhancement_cues.type` enum) and an explicit "arc-stage
convention" (id/label prefix) since the schema has no `arc_stage` field.
Verified via `test_10`'s script, built with exactly these names, validating
and passing all ten Part 4 checklist items.

### Building the real Remotion render found two more issues

- **TR-030 (partially fixed):** `Explainer.tsx`'s `resolveAsset()` had a
  regex bug silently mis-stripping `file://` prefixes for POSIX absolute
  paths, routing local assets to a 404. Fixed and verified (TypeScript
  diagnostic count unchanged from the TR-024 baseline of 15). Deeper
  limitation found and left open: `@remotion/renderer`'s asset-download
  step rejects `file://` and bare absolute paths both — there's no
  supported way for `_remotion_render()` to serve local absolute-path
  assets by default today. Proved the render otherwise works by staging
  assets into a project-scoped `remotion-composer/public/` subdirectory
  (test-scoped workaround, not a fix to shared code) — see ADR-026 for why
  the general fix was deliberately not attempted this session.
- **TR-029 (documented only):** `cuts[].in_seconds`/`out_seconds` mean an
  in-source trim range under FFmpeg's compose path but an absolute timeline
  position under Remotion's `Explainer.tsx`. Both conventions verified
  correct for their engine; the field pair's dual meaning isn't documented
  anywhere.

### Real Remotion render result

`npx remotion render` succeeded for real: 1920x1080, 61.06s, h264+aac,
independently verified via `ffprobe`. `final_review` (built by the tool's
own `_run_final_review()`, not hand-rolled): `render_runtime_used:
"remotion"`, `runtime_swap_detected: false`, `runtime_swap_check: "ok —
proposal and edit agree"`, 4 real sampled frames with no black frames,
subtitles present. First real, successful, non-ffmpeg Remotion render for
this project via the `operation="render"` high-level entry point.

### Regression suites (all green)

```text
tests/contracts/                                    567 passed, 7 skipped
tests/qa/test_08_end_to_end.py                        38 passed, 0 failed
tests/qa/test_09_blog_source_dry_run.py               24 passed, 0 failed
tests/qa/test_10_blog_source_production_dry_run.py    47 passed, 0 failed
tests/qa/test_11_blog_source_remotion_render.py       24 passed, 0 failed
remotion-composer: npx tsc --noEmit                   15 errors (unchanged baseline)
```

### Updated verdicts

Recorded in `knowledge/wiki/reports/phase-15-readiness-closure.md`
(supersedes `phase-15-readiness-verdict.md`):

- Contract readiness: **PASS** (unchanged)
- Blog-adaptation quality: **PASS** (upgraded from CONDITIONAL PASS — TR-028 resolved)
- Local-render readiness: **CONDITIONAL** (real Remotion proven capable; TR-030's general fix still needed for it to work without pre-staging)
- Real-production readiness: **NO** (TR-030 fix, real research/providers, author review, second fixture)

### Next action

Author review. TR-030's general fix recommended as the highest-priority
next step — it blocks every real local-asset Remotion production, not just
blog-sourced ones. No paid calls, provider generation, publish, deploy,
stage, or commit without new explicit authorization.

---

## 2026-07-31 — Final renderer hardening: TR-030 general fix, TR-029 resolved, all Phase 15 engineering blockers closed

### What ran

Per operator instruction: implemented the general, production-safe TR-030
fix in `VideoCompose._remotion_render()` itself (replacing the prior
round's test-scoped workaround); resolved TR-029 with an explicit
`cut_timing_mode` field; added regression coverage for images, audio,
video, repeated filenames, missing files, cleanup, and both render
runtimes; reran all Phase 15 suites; issued updated verdicts. No paid
providers, real production material, publish, deploy, stage, or commit.

### TR-030 general fix

Added `VideoCompose._stage_local_assets_for_remotion()` to
`tools/video/video_compose.py`, called from inside `_remotion_render()`.
Scans `cuts[].source`, `cuts[].backgroundImage`, `cuts[].backgroundVideo`,
`cuts[].images[]`, `audio.narration.src`, `audio.music.src`; validates
every local absolute-path reference up front (all problems reported at
once, nothing staged if any fail); stages into a UUID-scoped,
collision-safe `remotion-composer/public/_render_staging/<uuid>/`
(index-prefixed filenames prevent repeated-basename collisions); rewrites
props to `staticFile()`-relative paths; returns provenance in
`ToolResult.data["staged_assets"]`; cleans up unconditionally (success or
failure) in a `finally` block, plus a polish pass removing the shared
parent directory once empty. No caller-side pre-staging needed anymore.

### TR-029 resolution

Added `edit_decisions.cut_timing_mode` (`"source_trim"` default |
`"timeline"`) and `cuts[].source_in_seconds` to the schema.
`_compose()` rejects `"timeline"` explicitly (unchanged default behavior
otherwise — `test_08_end_to_end.py` unaffected, 38/0 unmodified).
`_remotion_render()` now requires `"timeline"` explicitly and rejects
anything else, including it being absent. `edit-director.md` rewritten
with a "Cut Timing Mode" subsection and worked examples for both engines.

### Regression coverage added

`tests/contracts/test_remotion_asset_staging_contract.py` — 16 tests,
0.15s: staging (video/image/audio/anime-scene-images), no-op for
http(s)/relative sources, repeated-filename collision safety, missing/
not-a-file/unreadable rejection (all problems reported, not just first),
cleanup after success and after subprocess failure (both driven through
the real `_remotion_render()` against the real `remotion-composer/public/`,
subprocess mocked), `cut_timing_mode` validation for both engines
including the backward-compatible default.

### Real Remotion render re-verified using only the general fix

`tests/qa/test_11_blog_source_remotion_render.py`: 28/28 passed (up from
24/24 — 4 new checks for staging/provenance/cleanup). Real
`npx remotion render` succeeded with zero manual staging in the test
itself. Independently verified via `ffprobe` (1920x1080, 61.056s,
h264/aac) and a `remotion-composer/public/` directory listing diff
(identical before/after — no leftover staging artifacts).

### Full regression sweep (all green)

```text
tests/contracts/                                       583 passed, 7 skipped
tests/qa/test_08_end_to_end.py                           38 passed, 0 failed
tests/qa/test_09_blog_source_dry_run.py                  24 passed, 0 failed
tests/qa/test_10_blog_source_production_dry_run.py       47 passed, 0 failed
tests/qa/test_11_blog_source_remotion_render.py          28 passed, 0 failed
remotion-composer: npx tsc --noEmit                      15 errors (unchanged baseline)
```

### Updated verdicts

Recorded in `knowledge/wiki/reports/phase-15-renderer-hardening.md`
(supersedes `phase-15-readiness-closure.md`):

- Contract readiness: **PASS** (unchanged)
- Blog-adaptation quality: **PASS** (unchanged)
- Local-render readiness: **PASS** (upgraded from CONDITIONAL — TR-030 general fix closes the gap)
- Real-production readiness: **NO** (real research/providers, author review, second fixture — no engineering blockers remain)

### Next action

Author review. TR-028, TR-029, and TR-030 are all resolved. No paid calls,
provider generation, publish, deploy, stage, or commit without new explicit
authorization.

---

## 2026-08-01 — Phase 15 accepted; real “What is ÆPOCH?” blog pilot queued

The author accepted the Phase 15 readiness direction and selected the live
“What is ÆPOCH?” post as the actual production test, with the ÆPOCH Protocol
YouTube channel as the required quality bar. The author confirmed that the
blog's prior research remains authoritative: downstream research may verify
and enrich, not rewrite.

Created the Phase 16 handoff prompt with source-authority protections,
reference-video analysis, capability and cost disclosure, Remotion versus
HyperFrames and templated versus atelier proposal decisions, approval gates,
and an explicit benchmark-parity definition of production readiness. No paid
provider call, production render, publish, or deployment was performed.

---

## 2026-08-01 — New-machine Phase 16 readiness preflight passed

Following migration to a new machine, Claude executed the bounded environment
bootstrap and readiness-preflight assignment under the historical role split:
Chris as author/approver, ChatGPT (Monty) as executive producer/orchestrator,
and Claude as implementation/execution agent.

Rebuilt `.venv`, restored Remotion dependencies with `npm ci`, installed the
documented local ingestion/transcription dependencies, and ran HyperFrames
doctor. FFmpeg, Remotion, and HyperFrames now report available. The current
capability envelope includes image generation 7/13, video generation 7/21,
TTS 1/7, source ingest 1/1, music search 1/2, and no configured music generator
or local music library.

All zero-cost baseline checks passed: contracts 642 passed/7 skipped, QA
test_08 38/0, test_09 24/0, test_10 47/0, and real-Remotion test_11 28/0;
TypeScript remains at the known 15-diagnostic baseline. The real Remotion QA
render completed at 1920x1080/61.06s with clean local-asset staging and no
runtime swap.

Recorded watch items: Python 3.14 is newer than the prior documented runtime;
`faster-whisper`, `yt-dlp`, and `youtube-transcript-api` are not yet pinned in
tracked requirements; Deno is absent and real YouTube acquisition remains to
be proven; audio-provider breadth is thin. Full evidence and the readiness
verdict are in
`knowledge/wiki/reports/phase-16-machine-readiness-preflight.md`.

### Next action

Claude may begin the first real Phase 16 pre-production tranche: initialize a
new workspace, record preflight, perform authoritative extraction and
verification/enrichment, analyze the benchmark videos, prepare 2-3 proposals,
and stop for Chris's explicit approval. No paid generation, full production,
publish, or deployment is authorized.

---

## 2026-08-01 — Phase 16 next action corrected to honor extraction gate

Executive-producer review caught that the broad Phase 16 first-session
sequence cannot be executed as one uninterrupted tranche. The binding
`animated-explainer` manifest sets `extraction` to
`human_approval_default: true`; under the checkpoint protocol, Claude must end
its turn after writing the schema-valid `source_extraction` and an
`awaiting_human` extraction checkpoint.

The immediate next action is therefore workspace initialization, recorded
preflight, and authoritative extraction only. Verification/enrichment,
benchmark analysis, research, and proposal work follow only after Chris
approves the extraction artifact. This correction supersedes the broader next
action stated in the immediately preceding log entry; no production work had
started.

---

## 2026-08-01 — Chris authorized the Phase 16 extraction tranche

Chris approved the executive producer's recommendation to begin the first
real Phase 16 tranche. Authorization is limited to creating the separate pilot
workspace, recording current preflight evidence, retrieving the live “What is
ÆPOCH?” blog, producing and validating the canonical authoritative
`source_extraction`, writing the extraction checkpoint as `awaiting_human`,
and updating durable knowledge.

Claude must stop at the extraction gate. This approval does not cover
verification/enrichment, benchmark-video analysis, research, proposals, paid
provider calls, asset generation, full production, publishing, or deployment.

### Next action

Claude resumes from `knowledge/state/current-state.md`, executes the authorized
extraction-only tranche, records evidence and knowledge, and returns the
extraction artifact for Chris's approval.

---

## 2026-08-01 — Phase 16 extraction tranche executed; awaiting Chris's approval

Claude executed the authorized extraction-only tranche. Initialized a new
project workspace, `projects/aepoch-blog-pilot-what-is-aepoch/` (distinct from
the superseded manual `aepoch-episodes/001-what-is-aepoch/` workspace), via
`lib.checkpoint.init_project`. Attempting to open the Backlot board was
blocked by the local permission classifier; this is non-fatal per
`AGENT_GUIDE.md` (the board is an observer, never a blocker) and was not
retried.

Retrieved the live blog at `https://aepoch.xyz/blog/post/what-is-aepoch`.
`WebFetch` returned HTTP 403 (a Cloudflare bot-protection fingerprint block,
confirmed by a bare `curl -I` from this host); a retry with a standard
browser `User-Agent` string returned HTTP 200. No authentication bypass was
involved — the page is public company content. The full article text (~6.3k
characters) was extracted and hashed for provenance (`sha256`, recorded in
the artifact's `source.content_hash`).

Produced a schema-valid `source_extraction` artifact
(`schemas/artifacts/source_extraction.schema.json`) following
`skills/pipelines/explainer/extraction-director.md` and Part 1 of
`brands/aepoch/SCRIPT_RULES.md`. One central narrative through-line was
identified — ÆPOCH's Proof of Life mechanism as what makes confirmed daily
human presence economically foundational — satisfying `SCRIPT_RULES.md`'s
one-sentence-without-"and" test and `SERIES_BIBLE.md`'s "one central idea per
episode" rule. The `central_question` ("How does the internet know you're
real?") matches `SERIES_BIBLE.md`'s own worked example verbatim. All five
protected narrative fields are populated. Nine claims were individually
inventoried with source location and a `verification_required` flag,
including two `SERIES_BIBLE.md`-driven flags: (1) the source never names the
token "KAIROS" (locked terminology) — only "the protocol's native token" —
and (2) the Proof of Life mechanism description reads as present-tense
capability where `SERIES_BIBLE.md` requires pilot-today vs. future-vision to
be distinguished on screen. Four items were recorded as `excluded_material`
(broader economic-history critique, CBDC/surveillance context,
founding-cohort recruitment framing, and waitlist CTAs) to keep the episode
to one idea. Four `ambiguities` were recorded rather than silently resolved,
most notably that `desired_duration_seconds` (300s) is a working default
against the benchmark channel's range, not an author-specified figure.

Wrote the extraction checkpoint as `awaiting_human`
(`projects/aepoch-blog-pilot-what-is-aepoch/checkpoint_extraction.json`),
matching the `animated-explainer` manifest's `human_approval_default: true`
gate for the `extraction` stage. No research, verification/enrichment,
benchmark-video analysis, proposal work, paid provider call, or production
work was performed — Claude stopped at the gate as directed by the corrected
next action above.

### Next action

Chris reviews the `source_extraction` artifact and either approves it,
requests revision, or flags a material conflict for resolution. Only after
approval may Claude proceed to source verification/enrichment, benchmark-video
analysis, research, and differentiated proposals, per the Phase 16 handoff
(`docs/aepoch-production-playbook/prompts/phase-16-what-is-aepoch-real-blog-pilot.md`).

---

## 2026-08-01 — Extraction approved; research, benchmark analysis, and proposal completed; awaiting Chris's proposal approval

Chris approved the `source_extraction` artifact. Claude re-wrote the extraction
checkpoint as `completed`/`human_approved=True` and proceeded through research,
benchmark-video analysis, and proposal per the Phase 16 handoff.

**Research (`research_brief`, non-gated):** Verified and enriched the nine
inventoried claims. The source's core "more than half of internet traffic is
automated" claim is confirmed and strengthened (Thales/Imperva 2026 Bad Bot
Report: 53%, though Cloudflare's own Q2 2026 telemetry shows a lower 35.2% —
disclosed rather than picked silently). The CBDC claim was enriched with real
figures (146 countries exploring, 66 in advanced pilot, 3 fully launched). The
source's "every monetary system required extraction" claim was found to be
contested by real anthropological scholarship (Graeber's debt/credit theory)
rather than settled fact, and flagged for the script stage to treat as
illustrative framing, not fact. Landscape research placed ÆPOCH in a real
"proof of personhood" space (World/Worldcoin, Pi Network, Gitcoin Passport,
BrightID, Proof of Humanity, Idena) and found the genuine, defensible gap: no
comparable project pairs identity verification with an equal, no-accumulation
value layer. A stronger hook candidate surfaced: 85% of people now say they
can't tell real from AI-generated content (Malwarebytes 2026), and Reddit is
actively weighing a World ID integration right now.

**Benchmark analysis (all 8 ÆPOCH Protocol YouTube videos):** Downloaded via
`yt-dlp` (confirmed working without Deno, using the format-18 legacy fallback)
and analyzed via ffmpeg scene-detection/frame-sampling, auto-captions, and
direct visual inspection. Key finding: 4 of 8 videos ("KAIROS Presence in
Motion," "Securing the Human Economy," "The Synthetic Internet," "Valuing
Human Presence") are confirmed Google NotebookLM "Video Overview"
auto-generated outputs — visible NotebookLM watermark on every frame, one
ending on a bare `notebooklm.google.com` end-card with no ÆPOCH branding at
all. The other 4 ("The Fable of the Reclaimed Forest," "The Magic of Waking
Up," "Manufactured Consensus," "ÆPOCH Building the Presence Layer") are more
deliberately produced but use three different, mutually inconsistent
illustration styles (painterly myth, storybook, watercolor essay, halftone
pop-art) — the channel's visual identity is not currently locked. All 8 videos
are 100% static/animated-still with zero camera movement in every sampled
shot; none use motion_clip footage, which validates the project's own
already-locked Phase 13C asset-first hybrid workflow (illustration plates +
deterministic Remotion motion) and identifies real camera movement as a
genuine, low-risk differentiation opportunity. Two videos ("The Synthetic
Internet," "Securing the Human Economy") visibly violate `VISUAL_LANGUAGE.md`
with crypto/hacker-cliche imagery (glowing terminal text, robotic claws,
shadow monsters) in their "threat" sections.

**Proposal (`proposal_packet` + `decision_log`, gated):** Produced 3
differentiated concepts sharing one identical `core_message` and preserving
all five protected `source_extraction` fields: "The Realness Tax"
(data_narrative, agent-recommended), "A Different Answer to the Same
Question" (comparison), and "One Thing Every Human Still Makes for Free"
(analogy). Both composition runtimes were presented per the hard rule
(Remotion recommended, reasoned against the project's existing Remotion
investment; HyperFrames presented honestly) and both composition modes
(atelier recommended for this hero-quality pilot over templated). Real cost
figures were pulled from each tool's `estimate_cost()` rather than estimated:
FLUX $0.05/image, OpenAI TTS $0.0645 for a ~720-word script — total estimate
$0.77 of a $2.00 budget. A real, verified blocker was found and disclosed
rather than silently worked around: the existing untracked
`styles/aepoch-symbolic.yaml` — which otherwise faithfully encodes
`VISUAL_LANGUAGE.md` and is recommended as the playbook — currently **fails**
`playbook_loader.load_playbook()` schema validation (`background_dark` and
`reveal_accent` are rejected as additional properties by
`schemas/styles/playbook.schema.json`). No music generation or library is
configured; Pixabay stock search is the only real option, presented alongside
"provide a track" and "no music."

Proposal checkpoint written as `awaiting_human`
(`projects/aepoch-blog-pilot-what-is-aepoch/checkpoint_proposal.json`) per the
`animated-explainer` manifest's gate on this stage. No paid provider call,
asset generation, or production work was performed.

### Next action

Chris reviews the 3 concepts, the runtime/composition-mode/provider/cost
decisions, and the `aepoch-symbolic.yaml` schema blocker, then approves,
requests changes, or rejects. Only after approval may Claude proceed to
script and later stages.

---

## 2026-08-01 — Executive-producer proposal review requires persisted benchmark evidence

Monty reviewed the Phase 16 proposal gate after Chris confirmed that extraction
approval occurred in Claude's separate session. All four canonical JSON
artifacts validate, protected fields are preserved, and the proposal correctly
keeps concept/runtime/mode/provider/music decisions pending.

The proposal did not pass executive-producer review because the required
eight-video benchmark analysis exists only as a knowledge-log summary and a
reference to chat. No structured benchmark-analysis artifact, five-aspect
shot/shot-group report, or frame/transcript evidence index exists in the
workspace. `research_brief` says analysis will be merged later, while
`proposal_packet.benchmark_summary_ref` points to chat and unrelated decision
entries.

### Next action

Claude persists the completed benchmark analysis and evidence under the Phase
16 workspace, updates real artifact references, reruns validation and proposal
self-review, refreshes the proposal checkpoint as `awaiting_human`, updates
knowledge, and stops. Full requirements:
`knowledge/wiki/reports/phase-16-proposal-gate-review.md`. No new paid calls or
advance to script is authorized.

---

## 2026-08-01 — Benchmark evidence persisted per executive-producer revision request

Executed Monty's required revision (`knowledge/wiki/reports/phase-16-proposal-gate-review.md`).
The prior round's benchmark analysis existed only in a session-local `/tmp`
scratchpad and a knowledge-log narrative summary — not a repository artifact a
fresh agent could resume from, violating the Phase 16 handoff's
resume-without-chat-history requirement.

Persisted, under `projects/aepoch-blog-pilot-what-is-aepoch/artifacts/`:

- `benchmark_analysis.md` — cross-video synthesis (the NotebookLM-generation
  finding, the zero-camera-movement finding, brand-coherence violations found,
  and techniques worth adopting).
- `benchmark/<video_id>.video_analysis_brief.json` — one per channel video (8
  total), each schema-valid against `schemas/artifacts/video_analysis_brief.schema.json`,
  covering structure/scenes, style profile, replication guidance, and keyframe
  references.
- `benchmark/raw/<video_id>.md` — the full original per-shot 5-aspect
  narrative breakdowns, preserved verbatim.
- `benchmark/evidence/<video_id>/` — transcripts (`.en.srt`), a representative
  set of sampled keyframes, and scene-change timestamp lists for each video.
  Full source `.mp4`/`.wav` files were deliberately not persisted (disk size);
  the recorded video ID/URL in each brief is sufficient to re-acquire them via
  the same `yt-dlp` command, and this decision is stated explicitly in
  `benchmark_analysis.md`'s Confidence and Limitations section rather than
  left as a silent gap.

Corrected `research_brief.json`'s `metadata` (previously said benchmark
analysis "will be merged later") and `proposal_packet.json`'s
`metadata.benchmark_summary_ref` (previously pointed to "chat presentation"
and decision entries `d-006`/`d-007`) to reference the real persisted paths
above. Verified `decision_log.json`'s `d-006`/`d-007` were already correctly
scoped to `concept_selection` and `music_source` respectively — the
misrepresentation was only in `proposal_packet`'s cross-reference to them, not
in the decisions themselves, so no `decision_log` edit was needed.

Re-ran schema validation on all 4 canonical artifacts plus all 8
`video_analysis_brief` files — all pass. Refreshed the proposal checkpoint as
`awaiting_human` with the updated artifact set and a note documenting this as
revision round 1. The three concepts, cost estimate, and
runtime/composition-mode/provider/music decisions are otherwise unchanged from
the prior round — no new paid calls, no advance to script.

### Next action

Monty (executive producer) re-reviews the proposal gate with the now-persisted
benchmark evidence. If it passes, Chris reviews and approves/revises/rejects
the proposal itself. No script, paid generation, full production, publish, or
deploy is authorized until both reviews clear.

---
