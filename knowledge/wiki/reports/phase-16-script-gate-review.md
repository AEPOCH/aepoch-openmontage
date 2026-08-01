---
type: Report
title: Phase 16 Script Gate — Executive Producer Review
status: stable
project_state: blocked
verified:
  by: process:executive-producer-script-review
  at: 2026-08-01T15:20:00+01:00
sources:
  - id: script
    resource: ../../../projects/aepoch-blog-pilot-what-is-aepoch/artifacts/script.json
    title: Phase 16 script artifact
  - id: extraction
    resource: ../../../projects/aepoch-blog-pilot-what-is-aepoch/artifacts/source_extraction.json
    title: Authoritative source extraction
  - id: research
    resource: ../../../projects/aepoch-blog-pilot-what-is-aepoch/artifacts/research_brief.json
    title: Verified research brief
---

# Phase 16 Script Gate — Executive Producer Review

## Verdict

**REVISE before Chris's script approval.** The script is schema-valid, within
duration, structurally coherent, and preserves all five protected fields, but
contains factual-scope drift, an unsupported inference, inaccurate
traceability, and a brand-violating visual cue. Two source ambiguities require
Chris's decision before revision.

## Checks passed

- Schema-valid: 16 sections, 280-second target, 637 words, 30 cues.
- Complete five-stage arc ending with the exact protected closing statement.
- All five protected extraction fields appear verbatim.
- Concept C1's data-led hook and measured-to-warm performance direction hold.
- No audio, asset, or paid generation occurred.

## Required corrections

1. The cited 85% result applies to **US adults**; the script broadens it to
   “people.” Restore the source population.
2. “Nine out of ten people you scroll past today can't tell...” is not what
   the survey measured. Remove or faithfully replace it.
3. Metadata claims `c7` is traced in `build-3`, but no CBDC claim is narrated.
   Record `c7` as unused unless it genuinely serves the one-idea structure.
4. `setup-2` requests “app logos,” violating the no-platform-logo rule. Use
   generic, unbranded system/interface symbols.
5. Reconcile metadata's inconsistent 632/637 word counts.

## Decisions required from Chris

### Present capability versus pilot/design

The script says Proof of Life “actually is” an interaction automation “cannot
replicate.” Extraction flagged uniqueness verification at scale as an open
technical problem requiring confirmation before present-tense scripting.

Recommendation: describe the mechanism ÆPOCH is building/testing in its pilot
and distinguish intended automation resistance from a proven guarantee.

### KAIROS naming

The script repeats “protocol's native token” but never names KAIROS. Extraction
flagged this because the source omits the name while the series bible locks it.

Recommendation: preserve the protected source wording verbatim, then name
KAIROS once in an adjacent clarification rather than changing the protected
field.

## Next action

Chris approves or changes the two recommendations. Claude revises only the
script and its checkpoint/knowledge evidence, reruns validation/self-review,
and stops at `awaiting_human`. Scene planning, audio/assets, and paid calls
remain unauthorized.
