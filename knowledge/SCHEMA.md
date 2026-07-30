# ÆPOCH AI Video Knowledge Schema

## Purpose

This directory is the durable operational memory for the ÆPOCH AI
animated-video production system.

It exists to preserve:

- Current implementation state
- Verified commands and configurations
- Decisions and their reasoning
- Known failures and fixes
- Provider requirements and fallbacks
- Production procedures
- Asset specifications
- Beta-test results
- Historical source material

Chat sessions are working conversations. They are not the authoritative
project record.

## Sources of Truth

Use this priority order:

1. Repository code and configuration
2. Test results and terminal output
3. Upstream documentation and source code
4. Raw archived conversations
5. Maintained knowledge documents
6. Unverified agent assumptions

When documentation conflicts with the repository or test results, the
repository and test results take precedence.

## Required Status Labels

Important claims and decisions should use one of these statuses:

- `confirmed`
- `provisional`
- `planned`
- `blocked`
- `deprecated`
- `superseded`

Do not present an assumption as confirmed.

## Required Session Start Procedure

Before performing project work:

1. Read `knowledge/CURRENT_STATE.md`.
2. Read `knowledge/INDEX.md`.
3. Read documents relevant to the current phase.
4. Inspect the repository and verify that documented state still matches
   the code and configuration.
5. Check the latest entries in `knowledge/LOG.md`.

## Required Session End Procedure

After meaningful work:

1. Update `knowledge/CURRENT_STATE.md`.
2. Record verified failures and fixes in
   `knowledge/TROUBLESHOOTING.md`.
3. Record architectural, provider or workflow decisions in
   `knowledge/DECISIONS.md`.
4. Update the relevant operational document.
5. Append a dated entry to `knowledge/LOG.md`.
6. Preserve important raw evidence under `knowledge/raw/`.
7. Commit the documentation changes to Git.

## Security Rules

Never store:

- API keys
- Passwords
- Access tokens
- Private keys
- Seed phrases
- Authentication cookies
- Unredacted credential files

Document environment-variable names and credential requirements, but
never their values.

Configuration snapshots stored in
`knowledge/raw/configs-redacted/` must have secrets removed.

## Raw Source Rules

Files under `knowledge/raw/` should normally remain unchanged after
capture.

Use these directories:

- `raw/chats/` — exported or reconstructed conversations
- `raw/terminal-logs/` — command output and installation evidence
- `raw/upstream-docs/` — relevant external documentation snapshots
- `raw/configs-redacted/` — sanitized configuration snapshots
- `raw/references/` — supporting source material

Maintained knowledge documents should synthesize raw sources rather than
replace them.

## Decision Record Format

Each major decision should include:

- ID
- Date
- Status
- Decision
- Context
- Reason
- Consequences
- Alternatives considered
- Revisit condition
- Supporting sources

## Troubleshooting Record Format

Each issue should include:

- Symptom
- Environment
- Exact error
- Cause
- Resolution
- Verification
- Related files or commits

Only call a resolution confirmed when it has been tested successfully.

## Current-State Rules

`CURRENT_STATE.md` must always identify:

- Current phase
- Last verified checkpoint
- Completed work
- Active blockers
- Current assumptions
- Immediate next action
- Verification criteria
- Relevant files
- Last updated date

There should be one clearly stated immediate next action.

## Writing Rules

- Prefer exact commands over vague instructions.
- Include repository-relative paths.
- Include dates in `YYYY-MM-DD` format.
- Separate verified facts from proposals.
- Preserve why a decision was made.
- Avoid duplicating entire upstream documents.
- Link related knowledge pages using relative Markdown links.
