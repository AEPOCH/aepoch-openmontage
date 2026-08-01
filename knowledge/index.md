---
type: Knowledge Index
title: ÆPOCH OpenMontage Knowledge Index
description: Navigation entrypoint for durable project state, operations, production documentation, raw evidence, and agent session startup.
status: draft
project_state: confirmed
generated:
  by: chatgpt
  at: 2026-07-30T16:27:00+01:00
---

# ÆPOCH OpenMontage Knowledge Index

## Purpose

This is the navigation entrypoint for the ÆPOCH animated-video production knowledge system.

Use it to locate:

- Current project state
- Settled decisions
- Operational procedures
- Provider configuration
- Known failures and workarounds
- Production workflow
- Asset rules
- Beta-test requirements
- Raw evidence
- Agent-compiled knowledge

Chat history is not the authoritative project record.

## Current Project Position

- **Branch:** `aepoch-series`
- **Current episode:** `001-what-is-aepoch`
- **Working title:** `What is ÆPOCH?`
- **Last completed production phase:** Phase 14B
- **Completed system phase:** Phase 15 — blog-to-video production readiness
- **Current system phase:** Phase 16 — “What is ÆPOCH?” real blog pilot
- **Episode 001:** Manual edit and delivery owned by Lee outside OpenMontage
- **Phase 14B.1:** Superseded
- **Phase 14B proof:** Internal pipeline demonstration only
- **Public-ready:** No
- **OpenMontage Episode 001 production:** Superseded by Lee's manual delivery path

The authoritative live status is:

```text
knowledge/state/current-state.md
```

## Required Session Reading Order

Before doing project work, read:

1. [`state/current-state.md`](state/current-state.md)
2. This file
3. The latest entries in [`log.md`](log.md)
4. Relevant operational documents
5. Relevant production documents
6. Repository code and phase evidence

For production work, also read:

- [`operations/runbook.md`](operations/runbook.md)
- [`production/pipeline.md`](production/pipeline.md)
- [`production/beta-test-plan.md`](production/beta-test-plan.md)

For provider work, also read:

- [`operations/providers.md`](operations/providers.md)
- [`operations/troubleshooting.md`](operations/troubleshooting.md)

## Knowledge Governance

### Schema

[`SCHEMA.md`](SCHEMA.md)

Defines:

- Source hierarchy
- Directory responsibilities
- Verification levels
- Provenance rules
- Agent write boundaries
- Session start and end procedures
- Git scope
- Security
- Writing rules

### Knowledge log

[`log.md`](log.md)

Append-only record of:

- Meaningful project work
- Phase transitions
- Knowledge-system changes
- Corrections to documented state
- New evidence captures

## Current State and Decisions

### Current state

[`state/current-state.md`](state/current-state.md)

Contains:

- Current phase
- Current objective
- Completed work
- Production pause
- Active blockers
- Immediate next action
- Verification criteria
- Relevant files
- Locked baselines

### Decision register

[`state/decisions.md`](state/decisions.md)

Contains durable architectural and workflow decisions, including:

- Git-backed Markdown knowledge
- Human-governed operational docs
- Knowledge-only Git scope
- Repository-first truth hierarchy
- Rejection of primitive Remotion-first creative output
- Asset-first hybrid workflow
- Direction A visual base
- Word-level synchronization
- Lee's recording as reference only
- Separate technical and creative gates
- Phase 14B.1 scope
- Optional future wiki tooling

## Operations

### Runbook

[`operations/runbook.md`](operations/runbook.md)

Use for:

- Entering the repository
- Verifying the virtual environment
- Running tests
- Discovering providers
- Handling paid calls
- Starting Phase 14B.1
- Capturing evidence
- Updating knowledge
- Safely committing documentation

### Provider register

[`operations/providers.md`](operations/providers.md)

Contains:

- Required environment-variable names
- Correct `.env` loading path
- Registry-discovery commands
- Functional test status
- Provider-specific limitations
- Output-format normalization
- Paid-call policy
- Historical Phase 14B.1 provider requirements (superseded)

### Troubleshooting register

[`operations/troubleshooting.md`](operations/troubleshooting.md)

Contains:

- Exact known failures
- Confirmed fixes
- Workarounds
- Open defects
- Creative failure patterns
- Phase 14B.1 correction issues
- Diagnostic commands

## Production

### Production pipeline

[`production/pipeline.md`](production/pipeline.md)

Defines:

- Asset-first hybrid workflow
- Production roles
- Phase gates
- Narration workflow
- Generated-asset workflow
- Remotion assembly
- Quality assurance
- Release gate
- Current production boundary

### Asset system

[`production/asset-system.md`](production/asset-system.md)

Defines:

- Asset taxonomy
- Asset states
- Approval and rejection rules
- Naming conventions
- Provenance requirements
- Storage boundaries
- Current Episode 001 inventory
- Phase 14B plate decisions
- Phase 14B.1 asset changes

### Phase 14B.1 beta-test plan

[`production/beta-test-plan.md`](production/beta-test-plan.md)

Defines:

- Entry conditions
- Eight required corrections
- Test matrix
- Evidence requirements
- Pass and fail criteria
- Automatic fail conditions
- Review sequence
- Public-readiness gate

## Raw Evidence

Raw evidence is stored under:

```text
knowledge/raw/
```

Agents must not rewrite existing raw files.

## Terminal logs

Directory:

```text
knowledge/raw/terminal-logs/
```

Current known captures:

### Post-Phase-14B repository baseline

[`raw/terminal-logs/2026-07-30-post-phase14b-baseline.txt`](raw/terminal-logs/2026-07-30-post-phase14b-baseline.txt)

Purpose:

- Preserve repository state after Phase 14B
- Record intentional Git scope
- Distinguish knowledge files from intentionally local files

### Episode 001 asset inventory

[`raw/terminal-logs/2026-07-30-episode001-asset-inventory.txt`](raw/terminal-logs/2026-07-30-episode001-asset-inventory.txt)

Purpose:

- Preserve source and asset inventory commands
- Record Episode 001 media and render files
- Record Remotion source inventory
- Confirm that the checked `remotion-composer/public/aepoch/` path returned no files

## Chat exports

Directory:

```text
knowledge/raw/chats/
```

Use for durable exports of important ChatGPT or Claude sessions.

Suggested filename:

```text
YYYY-MM-DD-<agent>-<phase>-<topic>.md
```

Chat exports are evidence, not current operational truth.

## Upstream documentation

Directory:

```text
knowledge/raw/upstream-docs/
```

Use for stable snapshots that materially support:

- Provider behavior
- Tool integration
- Architecture decisions
- Version-specific workarounds

Do not duplicate large upstream documentation without a clear reason.

## Redacted configuration

Directory:

```text
knowledge/raw/configs-redacted/
```

Use only after removing:

- API keys
- Tokens
- Passwords
- Cookies
- Private keys
- Credential-bearing URLs

Preserve:

- Environment-variable names
- Non-secret structure
- Relevant configuration logic

## References

Directory:

```text
knowledge/raw/references/
```

Use for small durable reference files that do not belong to an episode source tree.

Large media should remain in the project or external media storage, not inside `knowledge/`.

## Agent-Compiled Wiki

Directory:

```text
knowledge/wiki/
```

The wiki is for semantic synthesis and cross-project explanation.

It is not the authority for live production state.

## Concepts

```text
knowledge/wiki/concepts/
```

Possible future pages:

- Asset-first hybrid production
- Word-level visual synchronization
- Editorial geometric visual direction
- Deterministic Remotion motion
- Human-presence visual vocabulary
- Manufactured Consensus metaphor

## Entities

```text
knowledge/wiki/entities/
```

Possible future pages:

- ÆPOCH
- OpenMontage
- Remotion
- Episode 001
- Lee reference recording
- Direction A
- Recraft
- FLUX Kontext

## Sources

```text
knowledge/wiki/sources/
```

Possible future pages:

- Source summaries
- Upstream-document notes
- Provider endpoint notes
- Research references

## Comparisons

```text
knowledge/wiki/comparisons/
```

Possible future pages:

- Remotion-first versus asset-first
- Recraft versus FLUX editing
- Reference audio versus final narration
- Stock versus generated plates
- Obsidian versus OpenKnowledge

## Reports

```text
knowledge/wiki/reports/
```

Possible future pages:

- Phase retrospectives
- Provider reliability reports
- Cost reports
- Asset-family convergence reports
- Production throughput reports

## Repository Source-of-Truth Links

## Production playbook

```text
docs/aepoch-production-playbook/
```

Key files:

```text
docs/aepoch-production-playbook/CURRENT_STATE.md
docs/aepoch-production-playbook/PHASE_LOG.md
docs/aepoch-production-playbook/PROVIDER_SETUP.md
```

The production playbook contains detailed phase history.

The knowledge system provides the maintained operational entrypoint.

## Episode 001

Project root:

```text
projects/aepoch-episodes/001-what-is-aepoch/
```

Key domains:

```text
assets/
audio/
inputs/
qa/
reference/
renders/
```

## Remotion episode source

```text
remotion-composer/src/aepoch/episodes/001-what-is-aepoch/
```

## Phase 14B source

```text
remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/
```

Confirmed files:

```text
assets.ts
audio.tsx
beats.tsx
composition.tsx
consensus-geometry.tsx
plate.tsx
timeline.ts
transitions.tsx
types.ts
```

## Phase 14B review artifacts

```text
projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-proof-contact-sheet.png
projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-transition-contact-sheet.png
projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-word-alignment-contact-sheet.png
```

## Phase 14B preview

```text
projects/aepoch-episodes/001-what-is-aepoch/renders/previews/phase-14b/aepoch-e001-phase14b-proof-720p.mp4
```

## Phase 14B word timings

```text
projects/aepoch-episodes/001-what-is-aepoch/inputs/phase-14b-proof-word-timings.json
```

## Current Immediate Next Action

Run the Phase 16 handoff in
`docs/aepoch-production-playbook/prompts/phase-16-what-is-aepoch-real-blog-pilot.md`.
Use the live “What is ÆPOCH?” blog as authoritative source, verify and enrich
without rewriting it, analyze the ÆPOCH Protocol videos as a grounded quality
benchmark, produce 2–3 proposals, and stop for approval before paid generation.

## Open Knowledge Tasks

- Populate `knowledge/log.md`
- Verify exact Phase 14B runtime asset paths
- Capture a deeper Phase 14A.1 candidate inventory
- Reverify the historical missing-`pytest` incident
- Create a machine-readable production asset index
- Real web research and provider selection for a real-production brief
  (pending author authorization)
- Evaluate a sandboxed wiki compiler only after the manual knowledge system is stable

## Git Scope

This workflow manages only:

```text
knowledge/
```

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

Other repository files may intentionally remain modified or untracked.
