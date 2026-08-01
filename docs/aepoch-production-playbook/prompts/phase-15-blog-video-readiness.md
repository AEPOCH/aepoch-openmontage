Begin ÆPOCH Phase 15: blog-to-video production readiness.

This is an execution brief for Claude Code. The objective is to make the
existing OpenMontage `animated-explainer` path reliably ready for videos
sourced from ÆPOCH blog posts.

CONTEXT AND DECISION

Episode 001 delivery is no longer an OpenMontage task. Lee is editing the
author's narration and video directly and will produce that video manually.
Do not wait for, request, ingest, edit, or render those recordings. Phase
14B.1 is superseded. Preserve Phase 14B as internal evidence only.

OBJECTIVE

Audit, repair, and validate the smallest representative path from a source
blog post to canonical `animated-explainer` artifacts and a deterministic
local review output. Leave durable evidence and a precise handoff for the
first real blog-sourced production.

This phase is successful when the system's actual contracts agree, the dry
run is repeatable, and remaining provider or creative decisions are clearly
separated from engineering blockers.

AUTHORITATIVE STARTING POINTS

- `AGENT_GUIDE.md`
- `PROJECT_CONTEXT.md`
- `knowledge/SCHEMA.md`
- `knowledge/state/current-state.md`
- `knowledge/state/decisions.md`
- `knowledge/index.md`
- latest relevant entries in `knowledge/log.md`
- `knowledge/operations/runbook.md`
- `knowledge/operations/providers.md`
- `knowledge/operations/troubleshooting.md`
- `knowledge/production/pipeline.md`
- `pipeline_defs/animated-explainer.yaml`
- `skills/pipelines/explainer/`
- `skills/meta/checkpoint-protocol.md`
- `skills/meta/reviewer.md`
- `brands/aepoch/SERIES_BIBLE.md`
- `brands/aepoch/SCRIPT_RULES.md`
- `brands/aepoch/VISUAL_LANGUAGE.md`
- `brands/aepoch/MOTION_TOKENS.md`
- `brands/aepoch/SCENE_MODULES.md`
- `schemas/artifacts/`
- `tools/tool_registry.py`
- `tests/qa/QA_PLAN.md`
- `tests/qa/test_08_end_to_end.py`

SCOPE

1. Establish the live baseline: branch, HEAD, dirty tree, relevant tests,
   installed dependencies, disk/memory, tool registry, provider status, and
   available composition runtimes.
2. Map the exact blog-source flow from article ingestion and claim extraction
   through `research_brief`, `proposal_packet`, `script`, `scene_plan`,
   `asset_manifest`, `edit_decisions`, and `render_report`.
3. Compare `brands/aepoch/SCRIPT_RULES.md`, the animated-explainer manifest,
   director skills, schemas, and tests. Document every mismatch before repair.
4. Fix only evidenced blockers in this path. Preserve unrelated working-tree
   changes and avoid broad refactors.
5. Select an existing small, non-sensitive blog source or create a clearly
   labelled fixture derived from repository-owned material. Record why it is
   representative. Do not silently choose a real release article.
6. Exercise the fixture through the canonical artifacts and checkpoints.
7. Use local, fixture, or zero-cost assets and render paths for this readiness
   run. Validate determinism, artifact paths, cost accounting, review gates,
   and failure messages.
8. Produce a readiness report with separate contract, tool, render, creative,
   and production verdicts plus a prioritized blocker list.
9. Draft the next real-production handoff, including the user decisions still
   required, and stop for author review.

DECISION RULES

- Follow the pipeline and stage-director system; do not invent a parallel
  orchestrator.
- Before consequential execution, state the exact tool, provider, model or
  runtime, purpose, and whether the action is a sample or batch.
- If both Remotion and HyperFrames are available, present both with their
  brief-specific tradeoffs and wait for author selection before locking the
  real-production runtime. The readiness fixture may test local mechanics but
  must not pre-decide the real production choice.
- Treat atelier versus templated authoring as a separate future production
  decision. Do not silently lock either during readiness testing.
- Prefer the smallest repair that restores contract agreement and testability.

PROHIBITED

- No work on Episode 001 or Phase 14B.1.
- No access to Lee's current edit or the author's new narration/video.
- No paid provider calls, model downloads, package installs, external writes,
  publishing, deployment, staging, committing, or tagging without explicit
  author authorization.
- No claim that the system is public-ready based only on schema tests or a
  fixture render.
- No destructive cleanup and no modification of unrelated user files.
- No replacement of repository evidence with chat summaries.

EXECUTION SEQUENCE

1. Read all required project and phase instructions.
2. Report baseline state and identify dirty-scope overlaps.
3. Run the existing contract and zero-cost QA tests relevant to the
   animated-explainer path; capture exact failures without masking the
   historical baseline.
4. Produce a contract matrix covering each stage's inputs, outputs, schema,
   director, checkpoint, tools, cost boundary, and human approval.
5. Audit the blog adapter against that matrix and propose scoped repairs.
6. Implement and test the repairs.
7. Run the representative blog fixture through canonical artifacts and the
   cheapest deterministic local review path available.
8. Verify repeatability, schema validity, file resolution, checkpoint state,
   cost records, and review output.
9. Record exact evidence and update knowledge according to
   `knowledge/SCHEMA.md`, reviewing the knowledge-only diff before changes.
10. Stop for author review with a readiness verdict and the proposed next
    real-production brief.

REQUIRED OUTPUTS

- A baseline and capability audit.
- A blog-to-video contract matrix.
- A mismatch/blocker register with severity and ownership.
- Scoped code/document fixes with relevant tests.
- Canonical dry-run artifacts from a representative blog fixture.
- A deterministic local review output when the installed path supports it.
- A Phase 15 readiness report under the project QA or docs evidence boundary.
- Updated durable knowledge and append-only log entry.
- A next-production handoff that lists unresolved human decisions, expected
  cost, and the exact approval gate.

READINESS VERDICTS

Report these separately:

- Contract readiness: PASS / CONDITIONAL / FAIL
- Tool and provider readiness: PASS / CONDITIONAL / FAIL
- Local render readiness: PASS / CONDITIONAL / FAIL
- Blog-adaptation quality: PASS / CONDITIONAL / FAIL
- Real-production readiness: YES / NO

Real-production readiness may be YES only if a representative blog source
reaches valid artifacts and review output repeatably, blockers are documented,
and the author explicitly approves the next production brief. It does not
authorize paid calls or publishing.

STOP CONDITIONS

Stop and report if progress requires a paid call, dependency installation,
model download, external write, destructive action, real release-article
selection, provider/runtime commitment for production, or a scope expansion.
Also stop if the live architecture contradicts this brief in a way that would
require redesign rather than a bounded repair.

DEFINITION OF DONE

Claude's Phase 15 handoff is complete when the live blog-to-video contracts
are reconciled, a representative zero-cost dry run has durable evidence, the
remaining blockers and decisions are explicit, knowledge reflects the new
state, and Claude stops for author review without starting paid or public
production.
