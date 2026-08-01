---
type: Report
title: Phase 15 Baseline and Contract Audit — Blog-to-Video Readiness
status: draft
project_state: blocked
verified:
  by: process:test-run
  at: 2026-07-31T15:50:00+01:00
sources:
  - id: repository-baseline
    resource: ../../../docs/aepoch-production-playbook/prompts/phase-15-blog-video-readiness.md
    title: Phase 15 execution brief
  - id: e2e-test-run
    resource: ../../../tests/qa/test_08_end_to_end.py
    title: Zero-cost end-to-end pipeline test
  - id: contract-test-run
    resource: ../../../tests/contracts/
    title: Zero-cost contract test suites (phase0-3, runtime presentation, taste governance)
---

# Phase 15 Baseline and Contract Audit

## Status

**Paused for scope decision.** This is an interim audit report, not a Phase 15
completion report. Execution stopped after step 5 of the Phase 15 execution
sequence (produce a contract matrix / mismatch register) because the audit
surfaced a real architecture-level contract mismatch whose repair design is a
production decision, not an engineering judgment call. Per the human
operator's direction, this work is handed back to the plan coordinator for
scope resolution before any repair is implemented.[^repository-baseline]

No repair code was written. No manifest, schema, skill, or artifact file was
modified as part of this audit.

## Baseline

- Branch: `aepoch-series`
- HEAD: `9cb05cf` (`docs(agents): add repository memory handoff`, 2026-07-30)
- Environment: Python 3.10 (`.venv`), Node 22.21.1, ffmpeg 8.0.1, 442G disk free, 7G RAM free
- Composition runtimes available: ffmpeg, Remotion, HyperFrames (all three)
- Capability coverage (via `registry.provider_menu_summary()`): tts 2/7, image_generation 7/13,
  video_generation 7/20, video_post 9/9, audio_processing 2/2 configured

### Working-tree state

Two independent sets of uncommitted changes exist:

1. **In scope, legitimate.** `knowledge/*` and `docs/aepoch-production-playbook/*` carry
   uncommitted edits recording the Episode 001 → Lee handoff and Phase 15 authorization
   (ADR-021, ADR-022 in `knowledge/state/decisions.md`). Internally consistent with
   `knowledge/log.md`'s 2026-07-31 entry. Preserved untouched by this audit.
2. **Out of scope, flagged as an anomaly.** `README.md` and `diagram.png` at the repository
   root have been overwritten with the contents of an unrelated "Phase 10C asset pack"
   distribution bundle (see `aepoch-phase10a-assets.zip`, `MANIFEST.sha256`,
   `preview/*`, `AGENT_GUIDE.md.backup`, `PROJECT_CONTEXT.md.backup` also present at repo
   root). This is unrelated to Phase 15 and was not modified or reverted by this audit —
   it is a candidate for the operator to clean up or restore
   (`git checkout HEAD -- README.md diagram.png`) separately.

## Zero-cost QA evidence

```text
.venv/bin/python tests/qa/test_08_end_to_end.py
=> END-TO-END TEST COMPLETE: 38 passed, 0 failed

.venv/bin/python -m pytest tests/contracts/test_phase0_contracts.py \
  tests/contracts/test_phase1_contracts.py tests/contracts/test_phase2_contracts.py \
  tests/contracts/test_phase3_contracts.py tests/contracts/test_runtime_presentation_contract.py \
  tests/contracts/test_taste_governance_contracts.py
=> 275 passed
```

The pipeline engine itself — schemas, checkpoints, cost tracking, real ffmpeg/Remotion/HyperFrames
composition — is healthy end to end with synthetic artifacts using the current stage order
(`research -> proposal -> script -> scene_plan -> assets -> edit -> compose -> publish`).
`lib/checkpoint.py`'s `STAGES` constant is current; the mismatches below are documentation- and
skill-level, not pipeline-engine defects.

No test or fixture anywhere in `tests/` exercises `brands/aepoch/SCRIPT_RULES.md`. The string
`"blog"` appears only as a generic `source` enum value in unrelated synthetic research-brief
fixtures (`tests/qa/test_08_end_to_end.py:109`, `tests/contracts/test_phase0_contracts.py:56,82`).
Blocker 1 in `knowledge/state/current-state.md` ("Blog-source intake has not been validated end
to end") is confirmed accurate — there is zero automated coverage today.

## The core finding: a real contract mismatch, not a missing feature

`brands/aepoch/SCRIPT_RULES.md` is titled "ÆPOCH Blog-to-Script Adapter" — it **is** the "existing
blog-to-script adapter" the Phase 15 brief refers to. It is a Layer-2 brand document (an
extraction-sheet methodology), not a Python tool or pipeline stage. It states its own contract
explicitly:

> "This document defines how a blog post becomes a `script` artifact that the
> `animated-explainer` pipeline can accept at the script stage without a send-back."
> — `brands/aepoch/SCRIPT_RULES.md:3`

That contract does not hold against the live pipeline:

1. **Manifest gate.** `pipeline_defs/animated-explainer.yaml` declares the `script` stage's
   `required_artifacts_in: [proposal_packet]`. A blog-sourced script produced per SCRIPT_RULES.md
   has no `proposal_packet` (no `research` or `proposal` stage ran). `required_artifacts_in` is not
   enforced anywhere in `lib/checkpoint.py` or `lib/pipeline_loader.py` (confirmed by grep) — it is
   a declarative contract the *agent* is expected to honor via Rule Zero, not a hard code gate. So
   nothing crashes, but an agent following the stage director skill literally cannot proceed.

2. **Stale director skill.** `skills/pipelines/explainer/script-director.md` — the actual director
   skill an agent is required to read before the script stage (Rule Zero, `AGENT_GUIDE.md`) — opens
   with: *"You have a `brief` artifact from the Idea Explorer."* (`script-director.md:5`). `brief`
   and the "Idea Explorer" are v1.0 pipeline vocabulary. The current `animated-explainer.yaml` v2.0
   has no `idea` stage at all; its own "Prerequisites" table two lines later correctly names
   `proposal_packet` as the prior artifact, contradicting its own opening line. Nowhere in
   `script-director.md` is `SCRIPT_RULES.md`, "extraction sheet," or a blog-direct entry path
   mentioned.

3. **Orphaned sibling skill.** `skills/pipelines/explainer/idea-director.md` (producing `brief` per
   `schemas/artifacts/brief.schema.json`) still sits in the explainer skill directory but is not
   referenced by `animated-explainer.yaml`'s `stages` or `required_skills`. `brief.schema.json` is
   legitimately used by *other* pipelines (talking-head, hybrid, screen-demo, clip-factory,
   podcast-repurpose, documentary-montage, cinematic, animation) — it is not dead in general, only
   unreachable from animated-explainer's current stage list.

4. **Stale project doc.** `PROJECT_CONTEXT.md`'s documented state machine
   (`idea -> script -> scene_plan -> assets -> edit -> compose -> publish`) also reflects the old
   v1.0 shape and omits `research`/`proposal`, consistent with the same drift.

None of this is a pipeline-engine defect (see QA evidence above) — it is a **content-adapter
contract gap**: the brand-level methodology that promises direct blog-to-script conversion was
written against (or never updated for) the current manifest, and the stage director skill that
would need to honor that promise still carries v1.0 assumptions and has no knowledge of the
adapter's existence.

## Repair options identified (not yet chosen)

Presented to the operator; scope decision deferred to the plan coordinator:

1. **Synthesize a minimal `proposal_packet`** from the SCRIPT_RULES.md extraction sheet fields
   (single `concept_option`, approval attributed to the blog source). Smallest blast radius — no
   manifest change, `required_artifacts_in` stays intact for every other caller of the script stage.
2. **Relax `required_artifacts_in`** for the script stage when a `source_reference` (blog origin)
   is present. Touches the shared manifest contract; other pipelines/tests may assume
   `required_artifacts_in` is fixed.
3. **Add a dedicated `extraction` pre-stage** to the manifest with its own canonical artifact and
   schema, formalizing the adapter as a first-class pipeline stage. More correct long-term, larger
   surface area (new schema, new director skill, new tests, new review focus) to design and land.

Also needs a decision either way regardless of which option is chosen: fix
`script-director.md`'s stale "Idea Explorer" / `brief` opening line, and decide the fate of the
orphaned `idea-director.md` within the explainer skill directory (remove, or explicitly document
as unused for this pipeline).

## What has not been done

- No contract matrix beyond `research/proposal/script` was produced (scene_plan/assets/edit/compose
  were exercised only via the existing synthetic `test_08_end_to_end.py`, which already passes).
- No blog fixture was created or run.
- No knowledge-tree repair, schema change, or skill edit was made beyond this report and the
  routine state/log/decision updates recording that this audit occurred and is paused.

## Immediate next action

Scope the repair approach (see options above) with the plan coordinator, then resume Phase 15
execution sequence at step 5 (contract matrix) with the chosen approach, or issue a revised
Phase 15 brief if the scope should change.
