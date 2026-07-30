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
