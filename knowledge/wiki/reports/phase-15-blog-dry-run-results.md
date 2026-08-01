---
type: Report
title: Phase 15 Blog-Source Dry Run Results
status: stable
project_state: confirmed
verified:
  by: process:test-run
  at: 2026-07-31T17:10:00+01:00
sources:
  - id: dry-run-script
    resource: ../../../tests/qa/test_09_blog_source_dry_run.py
    title: Blog-source-authoritative dry run
  - id: fixture
    resource: ../../../tests/fixtures/blog/authoritative-source.md
    title: Representative blog fixture
  - id: prior-audit
    resource: phase-15-baseline-contract-audit.md
    title: Phase 15 baseline and contract audit
  - id: adr-024
    resource: ../decisions.md
    title: ADR-024 — Add an authoritative source-extraction stage before research
---

# Phase 15 Blog-Source Dry Run Results

## Status

**Passed.** ADR-024 (authoritative source-extraction stage) is implemented and
verified end to end through a real run of the representative fixture, using
the actual checkpoint/schema machinery — not a documentation-only check. This
resolves TR-026 (`knowledge/wiki/reports/phase-15-baseline-contract-audit.md`,
ADR-023) and closes Blockers 1 and 3 in `knowledge/state/current-state.md`.

Scope of this run: **extraction → source-authoritative research → proposal**
only, per operator instruction. Script, scene_plan, assets, edit, and compose
were not exercised for the blog path in this session. No paid calls, no
provider generation, no public production.

## What ran

```bash
.venv/bin/python tests/qa/test_09_blog_source_dry_run.py
# BLOG SOURCE DRY RUN COMPLETE: 24 passed, 0 failed

.venv/bin/python -m pytest tests/contracts/ -q
# 567 passed, 7 skipped

.venv/bin/python tests/qa/test_08_end_to_end.py
# END-TO-END TEST COMPLETE: 38 passed, 0 failed
```

`test_09_blog_source_dry_run.py` reads `tests/fixtures/blog/authoritative-source.md`
and hand-authors a genuine extraction (not a placeholder) following
`extraction-director.md`'s process, then a source-authoritative
`research_brief` and `proposal_packet` following `research-director.md` and
`proposal-director.md`, validating each against its live schema and writing
real checkpoints via `lib.checkpoint.write_checkpoint`.

## What was verified, and how

### 1. Protected narrative fields remain unchanged

The five fields ADR-024 protects — `central_question`, `key_takeaway`,
`aepoch_reframe`, `human_consequence`, `closing_statement` — were compared
byte-for-byte across all three artifacts:

- `source_extraction.episode.*` (the five fields, authored from the fixture)
- `research_brief.metadata.protected_fields_carried_forward` (asserted `==`
  the extraction's copy)
- `proposal_packet.metadata.protected_fields_carried_forward` (asserted `==`
  the extraction's copy)
- Every `proposal_packet.concept_options[*].core_message` asserted equal to
  `source_extraction.episode.key_takeaway`
- Every `proposal_packet.concept_options[*].key_points` asserted equal (as a
  set) to `{central_question, aepoch_reframe, human_consequence}`

All checks passed.

### 2. Concepts vary presentation, not thesis

Three `research_brief.angles_discovered` entries (`narrative`, `data_driven`,
`contrarian` type) and three matching `proposal_packet.concept_options`
(`journey`, `data_narrative`, `myth_busting` structure) were authored as
genuinely different tellings of the same source thesis — different opening
image, different platform (`youtube`/`linkedin`/`tiktok`), different tone —
while every one traces back to the same `grounded_in` claims and the same
`core_message`. The script asserts, per concept, that `title`, `hook`,
`narrative_structure`, `visual_approach`, `target_platform`, and `tone` are
pairwise distinct across all three, while `core_message` is identical across
all three. Both directions passed for all six presentation fields and the one
thesis field.

### 3. Zero-cost dry-run path held

`CostTracker` in `OBSERVE` mode recorded `total_spent_usd: 0.0` throughout.
No provider tool was called; no network request was made beyond none (all
research content is hand-authored from the fixture, matching how
`test_08_end_to_end.py` establishes its zero-cost baseline for research and
proposal).

### 4. Checkpoint/resume mechanics hold for the real conditional-stage path

`get_completed_stages` returned `["extraction", "research", "proposal"]` in
manifest order, and `get_next_stage` correctly returned `"script"` — not
`"extraction"` again and not `None`. This exercises the **completed**
conditional-stage case; `test_08_end_to_end.py` (a non-blog run that never
produces `source_extraction`) exercises the **skipped** conditional-stage
case. See TR-027 below — this pairing is what proves both directions of the
fix.

## Regression found and fixed along the way

Re-running the existing zero-cost suite after the ADR-024 implementation
(before writing the new dry run) surfaced a real regression:
`test_08_end_to_end.py` dropped from 38/0 to 36/2 failed. `get_next_stage()`
got permanently stuck returning `"extraction"` after `research`/`proposal`
completed, because the new conditional `extraction` stage was appended
unconditionally to the stage order with no account taken of whether its
`condition` applied. Fixed in `lib/pipeline_loader.py`
(`get_conditional_stage_names`) and `lib/checkpoint.py` (`get_next_stage`
now skips a not-yet-completed conditional stage when a later stage in the
order is already completed). Full detail: TR-027 in
`knowledge/operations/troubleshooting.md`. Both regression suites (contracts,
e2e) and the new dry run are green after the fix.

This was a small, evidenced, immediately-testable bug fix in the mechanics
layer (not a production-architecture decision), so it was made directly
rather than escalated — consistent with Phase 15's "fix only evidenced
blockers in this path" and "prefer the smallest repair" decision rules.

## What has not been done

- `script`, `scene_plan`, `assets`, `edit`, `compose`, `publish` stages were
  not exercised for the blog-sourced path.
- No real web research, no provider calls, no render.
- The unrelated README.md/diagram.png working-tree anomaly noted in the
  baseline audit report is still unresolved and untouched.

## Immediate next action

Author review of this result, then either: (a) authorize extending the dry
run through `script` (SCRIPT_RULES.md Part 2/3/4) to close Blocker 2's
remaining scope and produce a full Phase 15 readiness verdict, or (b) hand
off a real-production brief using this fixture path as the template.
