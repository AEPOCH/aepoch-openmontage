---
type: Knowledge Governance
title: ÆPOCH AI Video Knowledge Schema
description: Rules governing durable project memory, provenance, agent access, verification, and document maintenance.
status: stable
project_state: confirmed
verified:
  by: human:chris
  at: 2026-07-30T15:32:00+01:00
---

# ÆPOCH AI Video Knowledge Schema

## Purpose

The `knowledge/` directory is the durable operational memory for the ÆPOCH AI animated-video production system.

It preserves:

- Current implementation state
- Verified commands and configurations
- Decisions and their reasoning
- Known failures and tested resolutions
- Provider requirements and fallbacks
- Production procedures
- Asset specifications
- Test and render results
- Historical source material
- Agent session context that must survive chat resets

Chat sessions are working conversations. They are not the authoritative project record.

## Sources of Truth

Use this priority order:

1. Repository code and configuration
2. Successful tests, renders, and terminal output
3. Upstream source code and official documentation
4. Raw archived conversations and logs
5. Human-verified operational documents
6. Agent-compiled wiki pages
7. Unverified agent assumptions

When documentation conflicts with code or verified test results, code and verified results take precedence.

## Directory Responsibilities

### `knowledge/raw/`

Immutable supporting evidence.

Contents may include:

- Chat exports
- Terminal logs
- Upstream documentation snapshots
- Redacted configuration files
- Reference materials

Agents must not rewrite or silently alter captured raw sources.

### `knowledge/state/`

Human-governed project control documents.

Contains:

- `current-state.md`
- `decisions.md`

These documents define the active project state and intentional choices.

Agents must not silently regenerate them.

### `knowledge/operations/`

Verified operational knowledge.

Contains:

- `runbook.md`
- `troubleshooting.md`
- `providers.md`

Commands must be tested before being labelled confirmed.

### `knowledge/production/`

The production system and creative workflow.

Contains:

- `pipeline.md`
- `asset-system.md`
- `beta-test-plan.md`

These documents describe how ÆPOCH video productions are planned, assembled, rendered, reviewed, and released.

### `knowledge/wiki/`

Agent-compiled semantic knowledge.

Contains:

- `concepts/`
- `entities/`
- `sources/`
- `comparisons/`
- `reports/`

Agents may propose and maintain pages here, provided claims include provenance and verification status.

### `knowledge/index.md`

The navigation and catalog entrypoint for the entire knowledge system.

### `knowledge/log.md`

Append-only chronological history of meaningful project work and knowledge-system changes.

## Document Lifecycle

Use the `status` frontmatter field with one of:

- `draft`
- `stable`
- `deprecated`

Use the `project_state` field where applicable with one of:

- `confirmed`
- `provisional`
- `planned`
- `blocked`
- `superseded`

Do not present assumptions or proposals as confirmed facts.

## Verification Levels

A document without a `verified` field is unverified.

Machine verification may use:

```yaml
verified:
  by: process:test-name
  at: YYYY-MM-DDTHH:MM:SS+01:00
```

Human verification must use:

```yaml
verified:
  by: human:chris
  at: YYYY-MM-DDTHH:MM:SS+01:00
```

Human verification means the document has been deliberately reviewed, not merely generated.

## Provenance Rules

Important claims must identify their supporting sources.

Use frontmatter:

```yaml
sources:
  - id: repository-baseline
    resource: ../raw/terminal-logs/example.txt
    title: Repository baseline
```

Specific claims may cite a source using Markdown footnotes:

```markdown
Phase 14B completed successfully.[^repository-baseline]

[^repository-baseline]: See the source identified as
`repository-baseline` in the document frontmatter.
```

Provenance is required for:

- Current phase claims
- Phase completion claims
- Provider capabilities and requirements
- Known failures and resolutions
- Architectural decisions
- Production-quality conclusions
- Asset specifications
- Configuration requirements

## Agent Write Boundaries

Agents may directly maintain:

- `knowledge/wiki/`
- `knowledge/log.md`

Agents must present or review a diff before changing:

- `knowledge/state/`
- `knowledge/operations/`
- `knowledge/production/`
- `knowledge/SCHEMA.md`
- `knowledge/index.md`

Agents must not modify:

- `knowledge/raw/`

Raw files may only be added as new captures or deliberately replaced by the human operator.

## Required Session Start Procedure

Before performing project work:

1. Read `knowledge/state/current-state.md`.
2. Read `knowledge/index.md`.
3. Read the latest entries in `knowledge/log.md`.
4. Read documents relevant to the active phase.
5. Inspect the repository.
6. Verify that documented state still matches repository reality.
7. Identify the single immediate next action.

## Required Session End Procedure

After meaningful work:

1. Update `knowledge/state/current-state.md`.
2. Record verified failures and fixes in `knowledge/operations/troubleshooting.md`.
3. Record architectural, provider, or workflow decisions in `knowledge/state/decisions.md`.
4. Update relevant operational or production documents.
5. Append a dated entry to `knowledge/log.md`.
6. Add important raw evidence under `knowledge/raw/`.
7. Review the knowledge-only Git diff.
8. Commit only the intended `knowledge/` changes.

## Git Scope Rules

This documentation workflow manages only the `knowledge/` directory.

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

Other modified or untracked repository files may intentionally remain outside Git and must not be staged by this workflow.

## Security Rules

Never store:

- API keys
- Passwords
- Access tokens
- Private keys
- Seed phrases
- Authentication cookies
- Unredacted credential files

Document environment-variable names and credential requirements, but never their values.

Files under `knowledge/raw/configs-redacted/` must have secrets removed before being added.

## Decision Record Requirements

Every significant decision should include:

- Decision ID
- Date
- Status
- Decision
- Context
- Reason
- Consequences
- Alternatives considered
- Revisit condition
- Supporting sources

Do not silently replace old decisions. Mark them `superseded` and link to the replacement decision.

## Troubleshooting Record Requirements

Every issue should include:

- Symptom
- Environment
- Exact error
- Cause
- Resolution
- Verification
- Related files or commits

A resolution may only be labelled `confirmed` after successful testing.

## Current-State Requirements

`knowledge/state/current-state.md` must always identify:

- Current phase
- Current objective
- Last verified checkpoint
- Completed work
- Active blockers
- Provisional assumptions
- Immediate next action
- Verification criteria
- Relevant files
- Last updated date

There must be one clearly stated immediate next action.

## Writing Rules

- Prefer exact commands over vague instructions.
- Use repository-relative paths where practical.
- Use dates in `YYYY-MM-DD` format.
- Separate verified facts from proposals.
- Preserve why decisions were made.
- Avoid duplicating full upstream documents.
- Link related knowledge pages using relative Markdown links.
- Keep operational instructions concise and executable.
- Record contradictions instead of silently choosing one version.
