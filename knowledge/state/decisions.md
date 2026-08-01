---
type: Decision Register
title: ÆPOCH OpenMontage Decisions
description: Durable record of architectural, provider, workflow, and creative decisions for the ÆPOCH animated-video production system.
status: draft
project_state: confirmed
generated:
  by: chatgpt
  at: 2026-07-30T15:45:00+01:00
sources:
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

# ÆPOCH OpenMontage Decision Register

## ADR-001 — Use a Git-backed Markdown knowledge system

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Use the repository-local `knowledge/` directory as the durable memory system for the ÆPOCH animated-video production project.

### Context

Project knowledge had become distributed across:

- ChatGPT planning sessions
- Claude Code execution sessions
- Repository code
- Terminal output
- Production playbooks
- Provider configuration
- Render reviews
- Creative decisions

The risk was not only losing files, but losing the reasoning behind commands, rejected approaches, provider choices, phase boundaries, and the exact next action.

### Reason

A Git-backed Markdown system is:

- Portable
- Human-readable
- Agent-readable
- Diffable
- Recoverable
- Independent of any one application
- Usable from the terminal, VS Code, Claude Code, Codex, or an optional wiki UI

### Consequences

- Important session knowledge must be written into durable documents.
- Git history becomes the audit trail for knowledge changes.
- Chat history is no longer treated as the authoritative project record.
- Knowledge updates become part of the production workflow.

### Alternatives considered

- Relying on ChatGPT history
- Relying on Claude Code session context
- Obsidian as the primary system
- A fully autonomous LLM wiki
- A database-first knowledge platform

### Revisit condition

Revisit only if the Markdown corpus becomes too large to search effectively or if agent maintenance quality becomes unreliable.

---

## ADR-002 — Separate raw evidence from maintained knowledge

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Store immutable evidence under `knowledge/raw/` and maintain synthesized knowledge in the rest of the `knowledge/` directory.

### Context

Raw chats, terminal logs, configuration snapshots, and external documentation have different trust and maintenance requirements from current-state documents and runbooks.

### Reason

Separating raw evidence from maintained knowledge preserves provenance and prevents agents from silently rewriting the historical record.

### Consequences

- Raw files are append-only captures.
- Maintained documents may summarize raw sources.
- Contradictions must remain visible.
- Important claims must reference supporting evidence.

### Alternatives considered

- One flat directory
- Replacing raw sources with summaries
- Storing only final conclusions

### Revisit condition

Revisit if raw-source volume requires archival tiers or external object storage.

---

## ADR-003 — Human-govern operational documents

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Treat `knowledge/state/`, `knowledge/operations/`, and `knowledge/production/` as human-governed documents.

Agents may draft changes, but these files must not be silently regenerated.

### Context

Files such as `current-state.md`, `runbook.md`, and `providers.md` directly affect what commands agents run and what production work begins.

### Reason

An autonomous compiler may summarize an assumption as a fact or overwrite a carefully scoped production pause.

### Consequences

- Agents must present or review diffs before changing controlled documents.
- `knowledge/wiki/` may be more freely agent-maintained.
- Human verification remains meaningful.

### Alternatives considered

- Allowing the LLM to own the entire wiki
- Fully manual documentation
- Database permissions instead of directory boundaries

### Revisit condition

Revisit only after a compiler has demonstrated reliable, reviewable diffs in a sandbox.

---

## ADR-004 — Manage only `knowledge/` through the documentation Git workflow

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Scope documentation Git commands exclusively to `knowledge/`.

### Context

The repository intentionally contains modified and untracked files that are excluded from synchronization by design.

### Reason

Broad staging commands could accidentally commit production assets, preflight files, previews, local reference media, or other intentionally local artifacts.

### Consequences

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

### Alternatives considered

- A completely clean working tree
- Moving local-only files outside the repository
- Relying entirely on `.gitignore`

### Revisit condition

Revisit only if repository policy changes and all local artifacts become explicitly classified.

---

## ADR-005 — Use the repository and verified outputs as operational truth

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Use this trust order:

1. Repository code and configuration
2. Successful tests, renders, and terminal output
3. Official upstream source and documentation
4. Raw archived conversations and logs
5. Human-verified operational documents
6. Agent-compiled wiki pages
7. Unverified agent assumptions

### Context

The earlier conversational checkpoint suggested the project was near Phase 4, while the repository and production playbook showed completion through Phase 14B.

### Reason

Conversation summaries can become stale, incomplete, or disconnected from actual implementation.

### Consequences

- Phase claims must be reconciled with repository evidence.
- Old conversational state may be marked superseded.
- Agents must inspect the repository before acting.

### Alternatives considered

- Treating the latest chat as authoritative
- Treating the playbook alone as authoritative
- Treating Git history alone as sufficient

### Revisit condition

No planned revisit.

---

## ADR-006 — Reject the primitive Remotion-first creative baseline

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Do not use the Phase 13C.2A primitive Remotion-first creative content as the production visual baseline.

Retain it only as:

- A technical reference
- A timing reference
- A source of proven transition architecture
- Evidence that deterministic full-episode composition works

### Context

Phase 13C.2A implemented motion for all 22 scenes and passed technical validation, but failed creative review.

### Reason

The approach relied too heavily on:

- Programmatic SVG human figures
- Primitive geometric metaphors
- Phrase-level timing
- Low-fidelity visual assets

It did not reach production quality.

### Consequences

- Primitive human components must not appear in final production.
- The full motion-blocking draft remains retained rather than deleted.
- Only structurally proven parts may be reused.

### Alternatives considered

- Refining the primitive system incrementally
- Rebuilding the same system with more SVG detail
- Treating technical completion as sufficient for production

### Revisit condition

No planned revisit for Episode 001.

---

## ADR-007 — Adopt an asset-first hybrid production workflow

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Use an asset-first hybrid workflow for production-quality ÆPOCH videos.

### Workflow

1. Generate, select, or capture approved visual plates.
2. Use those plates as source assets rather than finished scenes.
3. Apply deterministic Remotion-native:
   - Camera movement
   - Cropping
   - Masks
   - Color-state changes
   - Brand geometry
   - Transitions
   - Timing
4. Align visual actions to real word-level timestamps.
5. Require human creative review.

### Context

Phase 14B validated this approach with a 47-second proof.

### Reason

The workflow combines:

- Higher-quality artwork
- Deterministic motion
- Brand control
- Reproducibility
- Precise timing
- Lower dependence on getting every concept correct in a single generated image

### Consequences

- Generated images are treated as editable plates.
- Remotion supplies motion and transformation.
- Creative approval remains separate from technical validation.
- Production may use generated, captured, and designed assets together.

### Alternatives considered

- Fully generated video
- Fully programmatic animation
- Static slideshow editing
- Generic stock B-roll
- Template-only Remotion production

### Revisit condition

Revisit after several complete episodes establish whether the workflow scales.

---

## ADR-008 — Use Direction A / Editorial Geometric as the production illustration base

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Use Direction A, Editorial Geometric, as the current production illustration base.

### Context

Phase 14A.1 tested three directions across four narrative beats. No direction passed every frame cleanly, but Direction A was the closest coherent family and was later approved by the author.

### Reason

Direction A best aligned with:

- ÆPOCH brand geometry
- Editorial clarity
- A broad, composed visual field
- The ability to integrate contour techniques
- Remotion-native motion and masking

### Consequences

- New illustration work should extend Direction A.
- Existing approved Direction A assets may be reused as plates.
- Direction A is a base, not a custom trained model or immutable style specification.

### Alternatives considered

- Direction B
- Direction C
- Immediate custom-style training
- Stock-first production

### Revisit condition

Revisit after sufficient approved frames exist to justify custom-style training.

---

## ADR-009 — Do not train a custom ÆPOCH style yet

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Do not train a custom ÆPOCH image style at the current stage.

### Context

Direction A had not converged cleanly across all difficult concepts, especially Manufactured Consensus.

### Reason

Training on inconsistent or partially approved outputs would encode unresolved visual problems into the style.

### Consequences

- Continue controlled generation and editing.
- Build a stronger approved visual corpus first.
- Document successful prompt patterns and failures.
- Treat custom-style training as a later optimization.

### Alternatives considered

- Train immediately on the best available frames
- Fine-tune only the human vocabulary
- Train separate concept-specific styles

### Revisit condition

Revisit when a sufficiently large set of visually consistent, approved assets exists across multiple concepts and episodes.

---

## ADR-010 — Use positive-only prompt framing for image generation

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Use positive visual descriptions rather than literal negative-exclusion lists in generation prompts.

### Context

Literal negative-list prompt wording triggered provider moderation during Phase 14A.1.

### Reason

Positive framing avoids moderation problems and generally produces clearer visual instructions.

### Consequences

Instead of listing prohibited elements, prompts should specify:

- Desired composition
- Desired proportions
- Desired materials
- Desired emotional register
- Desired spacing
- Desired color and texture rules

Brand exclusions remain documented separately as review criteria.

### Alternatives considered

- Long negative prompts
- Provider-specific moderation workarounds
- Post-generation filtering only

### Revisit condition

Revisit if a provider adds reliable structured negative prompting.

---

## ADR-011 — Use word-level synchronization for production timing

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Use real word-level timestamps for production timing rather than phrase-level estimates.

### Context

Phase 13C.1 used phrase-level timing because no word-level tool was available under the phase constraints. Phase 14B later ran `faster-whisper` and found real spoken-word boundaries.

### Reason

Phrase-level estimates were materially less precise and produced longer timing assumptions than the actual recording.

### Consequences

- Production timing must be derived from actual spoken words.
- Timing markers must not be invented.
- Silence detection may refine boundaries.
- Transcript deviations must be disclosed rather than silently rewritten.

### Alternatives considered

- Word-count proportional timing
- Manual waveform estimation
- Script-only timing
- Full automatic edit decisions from transcription

### Revisit condition

Revisit if a more accurate alignment system replaces `faster-whisper`.

---

## ADR-012 — Lee's recording is a timing reference only

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Use Lee's recording only as a timing and performance reference.

Do not use it as:

- Final production narration
- Authoritative script wording
- Authoritative visual direction
- Final edit structure

### Context

The recording includes spoken deviations from the approved script and extensive generic AI B-roll that conflicts with ÆPOCH brand rules.

### Reason

The recording is useful for rhythm and pacing but does not meet final creative or audio requirements.

### Consequences

- Final production requires a clean recording of the approved script.
- Spoken deviations must not overwrite the approved narration.
- Reference visuals must not be copied.
- Word-level timestamps may still be used as provisional timing evidence.

### Alternatives considered

- Cleaning and using Lee's audio
- Adopting Lee's edit structure
- Rewriting the script to match the recording

### Revisit condition

No planned revisit.

---

## ADR-013 — Treat technical and creative validation as separate gates

**Date:** 2026-07-30
**Status:** confirmed

### Decision

A production phase does not pass merely because it renders correctly.

Track separate verdicts for:

- Technical validation
- Workflow validation
- Timing validation
- Creative validation
- Public readiness

### Context

Phase 13C.2A passed technically but failed creatively. Phase 14B passed technically and validated the workflow, but received only a conditional creative pass and was not public-ready.

### Reason

Rendering success does not establish production quality.

### Consequences

- Review reports must state each verdict separately.
- Full production cannot begin from an internal proof without explicit approval.
- A conditional pass may authorize targeted correction but not publication.

### Alternatives considered

- One binary phase status
- Technical completion as the definition of done
- Informal creative review only

### Revisit condition

No planned revisit.

---

## ADR-014 — Phase 14B is an internal proof, not a production release

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Treat the 47-second Phase 14B proof as an internal pipeline demonstration only.

### Context

Phase 14B validated:

- Asset-first hybrid production
- Word-level synchronization
- Deterministic Remotion treatment
- Manufactured Consensus as a mixed plate-and-geometry concept

The author review found eight corrections still required.

### Reason

The proof is technically sound but not visually resolved enough for public release.

### Consequences

- Do not publish the proof.
- Do not begin the full Episode 001 build.
- Restrict the next phase to polishing the existing proof.
- Preserve the Phase 14B proof as the baseline for comparison.

### Alternatives considered

- Publish as a beta
- Proceed directly to full episode production
- Discard and regenerate the proof

### Revisit condition

Superseded only after Phase 14B.1 receives final review.

---

## ADR-015 — Scope Phase 14B.1 to the existing proof

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Phase 14B.1 is a correction pass on the existing 47-second proof only.

It is not:

- A new proof from scratch
- A full Episode 001 build
- An episode-scale asset-generation phase

### Required correction scope

1. Progressive synthetic-echo reveal from one dominant human
2. Continuous Beats 1 and 2
3. Stronger phone-call/catfishing visual shift
4. Continuous Beats 3 and 4
5. Replacement of the inconsistent multiplication plate
6. Stronger Manufactured Consensus synchronization and output band
7. Lee audio retained only as timing reference
8. Final use of a clean approved-script narration recording

### Reason

A narrow correction phase isolates the workflow issues and establishes whether the proof can reach public quality before scaling to the full episode.

### Consequences

- No full-episode work may begin.
- No broad regeneration campaign should be started.
- Success or failure can be evaluated against the Phase 14B baseline.

### Alternatives considered

- Restart Phase 14B
- Proceed directly to Episode 001
- Fix only the most visible issues

### Revisit condition

Revisit after Phase 14B.1 review.

---

## ADR-016 — Pause production during recording

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Pause production while the author records new human video and a clean narration pass.

During the recording session, do not run:

- Claude production sessions
- Remotion renders
- Image generation
- Image editing
- Episode builds

### Context

The next correction phase depends on new media inputs, and concurrent production work could proceed against obsolete audio or video assumptions.

### Reason

A clean pause prevents wasted work and state divergence.

### Consequences

Phase 14B.1 begins only after the author explicitly confirms recording is complete and provides the media locations.

### Alternatives considered

- Continue visual corrections before audio arrives
- Continue provider testing
- Begin full-episode asset work

### Revisit condition

This decision expires when the author explicitly lifts the recording pause.

---

## ADR-017 — Do not adopt an external LLM wiki as the authority

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Do not replace the repository-local knowledge system with Obsidian, OpenWiki, `llm-wiki-manager`, `llm-wiki-compiler`, or another external application.

### Context

Several useful tools exist for compiling, browsing, querying, and maintaining LLM-oriented Markdown wikis.

### Reason

The project requires a stable authority that remains valid even if a specific application or MCP server is abandoned.

### Consequences

- Plain Markdown remains canonical.
- Git remains the history and recovery layer.
- External applications may act as optional interfaces or compilers.
- No external tool may silently own operational state.

### Alternatives considered

- Obsidian-first vault
- OpenKnowledge-first project
- Fully compiled wiki
- Database-backed memory service

### Revisit condition

Revisit if a tool proves reliable in a sandbox and preserves file-level portability.

---

## ADR-018 — Consider `llm-wiki-compiler` only as a sandboxed compiler layer

**Date:** 2026-07-30
**Status:** planned

### Decision

Consider testing `llm-wiki-compiler` later in an isolated directory using copied sources.

### Intended use

Potentially use it for:

- Session ingestion
- Claim-level citations
- Contradiction detection
- Staleness detection
- Context-package generation
- MCP querying

### Restrictions

- Do not initially install it into the live repository.
- Do not grant it write access to human-governed operational documents.
- Do not enable automated commits.
- Keep review queues enabled.
- Compare generated diffs manually.

### Reason

The tool may improve compilation and retrieval, but it is early software and introduces its own directory and lifecycle model.

### Alternatives considered

- Immediate direct adoption
- No compiler layer
- `llm-wiki-manager`

### Revisit condition

Revisit after the initial knowledge reconstruction is complete.

---

## ADR-019 — Obsidian is optional, not required

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Do not require Obsidian for the knowledge system.

### Context

Obsidian can provide a useful visual browsing experience for Markdown links and project relationships.

### Reason

The durable asset is the Markdown repository, not the editor.

### Consequences

- The system must remain fully usable from the terminal and VS Code.
- Obsidian or OpenKnowledge may be evaluated as optional interfaces.
- No editor-specific syntax should become necessary for core operation.

### Alternatives considered

- Obsidian as the primary interface
- OpenKnowledge as the primary interface
- Terminal-only use

### Revisit condition

Revisit only as a UI preference, not an architecture change.

---

## ADR-020 — Delay local semantic search until the corpus requires it

**Date:** 2026-07-30
**Status:** confirmed

### Decision

Do not add QMD, embeddings, or another semantic search layer during the initial bootstrap.

### Context

The current corpus is still small enough for:

- `index.md`
- Relative links
- `grep`
- `find`
- Agent file reading

### Reason

Adding indexing infrastructure now would create maintenance overhead before it solves a real retrieval problem.

### Consequences

- Start with deterministic file navigation.
- Add semantic search only when agents begin missing relevant pages or the corpus grows substantially.

### Alternatives considered

- Immediate QMD installation
- Remote vector database
- Obsidian embeddings plugin

### Revisit condition

Revisit when the maintained corpus approaches roughly 100 substantial pages or retrieval failures become common.

---

## ADR-021 — Move Episode 001 delivery outside OpenMontage

**Date:** 2026-07-31
**Status:** confirmed

### Decision

Lee will edit the author's narration and video directly and produce the
Episode 001 video manually. OpenMontage will not execute Phase 14B.1 on the
current path.

### Context

The release schedule cannot wait for the system to reach production speed.
The earlier recording pause and media-entry gate assumed OpenMontage would
perform the final proof correction and episode build; that assumption no
longer applies.

### Consequences

- Phase 14B.1 is superseded rather than completed.
- Phase 14B remains preserved as internal technical and workflow evidence.
- The Episode 001 manual edit is outside OpenMontage's current scope.
- No media from Lee is awaited or ingested without a new explicit request.

### Revisit condition

Only if the author explicitly brings Episode 001 media or finishing work
back into OpenMontage.

---

## ADR-022 — Prioritize blog-to-video production readiness

**Date:** 2026-07-31
**Status:** confirmed

### Decision

The next system phase is Phase 15: validate and repair the existing
blog-source-to-`animated-explainer` path before starting another public
episode.

### Scope

- Audit the blog-source adapter, manifest, director skills, schemas, tools,
  checkpoints, and cost boundaries.
- Validate a representative blog fixture through canonical artifacts.
- Use local or zero-cost paths first.
- Produce a durable readiness report and next-production handoff.

### Restrictions

- No paid provider calls without explicit authorization.
- No publishing, deployment, or public-release claim.
- No renewed Episode 001 work.
- No redesign of the whole platform unless an evidenced blocker requires a
  separately approved scope change.

### Revisit condition

After the Phase 15 readiness report is reviewed by the author.

---

## ADR-023 — Pause Phase 15 repair pending scope decision on the script-stage contract mismatch

**Date:** 2026-07-31
**Status:** confirmed

### Decision

Stop Phase 15 execution after the baseline audit (execution-sequence steps
1-4 plus a partial step 5). Do not choose or implement a repair for the
blog-adapter/script-stage contract mismatch unilaterally. Update the
knowledge tree with the finding and hand the decision back to the plan
coordinator to scope the correct work.

### Context

The audit confirmed `brands/aepoch/SCRIPT_RULES.md` promises a blog-sourced
`script` artifact is acceptable at the `animated-explainer` script stage
without a send-back, but the live manifest requires `proposal_packet` there
and `script-director.md` still carries stale v1.0 (`brief`/"Idea Explorer")
assumptions with no knowledge of the adapter. Three repair options exist
(synthesize a minimal `proposal_packet`; relax `required_artifacts_in`; add a
dedicated `extraction` pre-stage), each with different blast radius on a
shared pipeline manifest used by other productions. Full detail:
`knowledge/wiki/reports/phase-15-baseline-contract-audit.md`.

### Reason

This is a production-architecture choice affecting a manifest contract other
pipelines may depend on, not a bug fix. `AGENT_GUIDE.md`'s "Ask Before Major
Changes" and the Phase 15 brief's own stop conditions ("stop if the live
architecture contradicts this brief in a way that would require redesign
rather than a bounded repair") both point to escalating rather than deciding
silently. The human operator explicitly directed a pause and hand-off rather
than picking one of the three options.

### Consequences

- No manifest, schema, skill, or artifact file was modified.
- Phase 15 completion (fixture run, readiness verdicts, next-production
  handoff) is deferred until the repair scope is agreed.
- `knowledge/state/current-state.md` Blocker 1 and Immediate Next Action
  updated to reflect the pause.

### Alternatives considered

- Pick the smallest-blast-radius option (synthesize a minimal
  `proposal_packet`) and proceed unilaterally — rejected because it still
  edits a shared pipeline contract without operator sign-off.
- Continue the full Phase 15 sequence and only flag the mismatch in the
  final readiness report — rejected because the operator asked to stop now.

### Revisit condition

When the plan coordinator returns a scoped repair approach for the
script-stage contract mismatch.

**Resolution (2026-07-31):** Resolved by ADR-024.

---

## ADR-024 — Add an authoritative source-extraction stage before research

**Date:** 2026-07-31
**Status:** confirmed

### Decision

For blog-sourced animated explainers, use:

```text
blog source → source_extraction → research → proposal → script
```

The source article remains authoritative for the central question, key
takeaway, ÆPOCH reframe, human consequence, and closing statement.

### Research boundary

Research may verify claims, add provenance, update stale factual values, add
context, identify audience questions, and enrich visual examples. It may not
silently replace the thesis, angle, mechanism, intended human consequence, or
conclusion. Material contradictions require author review.

### Implementation

- Added the canonical `source_extraction` schema and artifact registration.
- Added a conditional explainer extraction stage and director.
- Passed the extraction into research, proposal, and script.
- Updated all four director contracts to preserve source authority.
- Corrected stale `brief`/Idea Explorer wording in the script director.
- Added focused contract and representative blog-fixture coverage.

### Alternatives rejected

- A synthesized minimal proposal is neither valid nor minimal: the schema
  requires three concepts, production planning, cost, and approval.
- Relaxing the proposal prerequisite would bypass research, cost/runtime
  planning, and the human approval gate.

### Revisit condition

Only if a real blog dry run shows that this boundary distorts the source's
intended meaning.

**Update 2026-07-31:** The real blog dry run ran
(`tests/qa/test_09_blog_source_dry_run.py`, 24/24 passed). It did not
distort the source's meaning: protected fields verified unchanged
byte-for-byte and all three proposal concepts verified to vary only
presentation. No revisit needed on that basis. See
`knowledge/wiki/reports/phase-15-blog-dry-run-results.md`.

---

## ADR-025 — Skip conditional pipeline stages when a later stage already completed

**Date:** 2026-07-31
**Status:** confirmed

### Decision

`get_next_stage()` (`lib/checkpoint.py`) treats a not-yet-completed
conditional stage (one declaring a manifest `condition`, e.g. `extraction`
with `condition: source_article_exists`) as legitimately skipped — not
unfinished — whenever a later stage in the pipeline's order already has a
completed checkpoint.

### Context

Adding the ADR-024 `extraction` stage regressed `test_08_end_to_end.py`
(38/0 → 36/2 failed): `get_next_stage` got stuck returning `"extraction"`
forever on any run that never produces a `source_extraction` (the ordinary
topic-led explainer path), even after every later stage completed. Root
cause: `get_stage_order()` already filtered conditional *sub*-stages but
applied no such filter to top-level stages. Full detail: TR-027.

### Reason

A resume/"what's next" function must not permanently block on a stage a run
was never going to produce, or every non-blog-sourced animated-explainer
production breaks. The chosen heuristic (skip if a later stage is already
completed) needs no runtime context threading and is provably correct for
both directions: the skipped-conditional-stage case (`test_08_end_to_end.py`)
and the completed-conditional-stage case
(`tests/qa/test_09_blog_source_dry_run.py`).

### Consequences

- `lib/pipeline_loader.py` gained `get_conditional_stage_names(manifest)`.
- `lib/checkpoint.py`'s `get_next_stage()` now loads the manifest (when
  `pipeline_type` is given) to apply this check.
- Fixed without escalation: a small, immediately-testable mechanics bug, not
  a production-architecture decision. Consistent with Phase 15's "fix only
  evidenced blockers" / "smallest repair" rules.

### Alternatives considered

- Thread a runtime `context` dict (e.g. `{"source_article_exists": bool}`)
  through `get_pipeline_stages`/`get_completed_stages`/`get_next_stage` —
  rejected as more invasive for no behavioral gain over the completed-stage
  heuristic, and it would require every caller to supply context correctly.

### Revisit condition

If OpenMontage adds a second conditional top-level stage whose condition
can be independently true/false from a downstream stage's completion (this
heuristic assumes conditional stages are strictly ordered before the stages
that would prove them skipped).

---

## ADR-026 — Fix the Explainer.tsx asset-path regex; do not generalize local-asset serving in `_remotion_render()` this session

**Date:** 2026-07-31
**Status:** confirmed

### Decision

While building the first real, non-ffmpeg Remotion render for this project
(Phase 15 readiness closure), fix the isolated, independently-correct
`resolveAsset()` regex bug in `remotion-composer/src/Explainer.tsx`
directly. Do not implement a general fix for the deeper limitation it
exposed — that `_remotion_render()` (`tools/video/video_compose.py`) has no
supported way to serve local absolute-path assets in its default
`operation="render"` flow. Instead, prove the render works via a narrow,
test-scoped workaround (staging assets into a project-scoped subdirectory of
the existing `remotion-composer/public/`, cleaned up afterward) and
document the gap as TR-030 for a scoped decision with the author.

### Context

The regex bug was a self-contained, provably-correct one-line fix
(verified: TypeScript diagnostic count unchanged from the TR-024 baseline,
no new errors). The deeper limitation is not: `@remotion/renderer`'s
asset-download step rejects `file://` sources and bare absolute paths both
fail differently; a real fix requires `_remotion_render()` to auto-stage
assets and pass `--public-dir` (mirroring `_render_via_atelier`'s existing
`public_dir` pattern) — a genuine engineering task, not a one-liner, that
touches the render tool shared by every pipeline in the system, not only
blog-sourced explainers.

### Reason

Phase 15's own decision rules say "fix only evidenced blockers in this path"
and "prefer the smallest repair that restores contract agreement and
testability." The regex fix satisfies both. Generalizing the asset-serving
fix does not: it is a bigger, riskier change to shared infrastructure that
could affect every existing and future production, and the user's
instruction this round was specifically scoped to fixing TR-028, producing
real Remotion render evidence, and stopping for author review — not
redesigning the render tool's asset pipeline.

### Consequences

- `remotion-composer/src/Explainer.tsx`'s `resolveAsset()` is now correct
  for what it does (round-trips POSIX and Windows absolute-path `file://`
  URIs properly) — but that scheme still isn't accepted by the renderer's
  download step, so the fix alone does not unblock real production.
- `tests/qa/test_11_blog_source_remotion_render.py` proves the render CAN
  work, using a workaround that lives in the test, not in shared code.
- A real production agent following the documented `operation="render"`
  contract today, without pre-staging assets, still fails. TR-030 remains
  open and is now flagged as the top real-production blocker.

### Alternatives considered

- Implement the general `--public-dir` auto-staging fix in
  `_remotion_render()` this session — rejected: bigger blast radius, no
  author sign-off on the approach, exceeds this round's explicit scope.
- Leave the regex bug unfixed too, since the deeper issue blocks anyway —
  rejected: the regex bug is real and independently wrong regardless of the
  deeper limitation, and leaving it would misrepresent the code as correct
  when it visibly isn't (confirmed by the first failure's exact 404 URL).

### Revisit condition

When the author scopes and approves the general `_remotion_render()`
local-asset-serving fix (TR-030).

**Update 2026-07-31:** The author explicitly scoped and authorized this
fix ("Resume Phase 15 for final renderer hardening... Implement a general,
production-safe TR-030 fix in VideoCompose._remotion_render()..."). See
ADR-027 for the implementation decision and outcome. TR-030 is now
resolved.

---

## ADR-027 — Implement the general TR-030 asset-staging fix, and resolve TR-029 with an explicit `cut_timing_mode` field

**Date:** 2026-07-31
**Status:** confirmed

### Decision

Per explicit operator authorization (ADR-026's revisit condition), replace
the test-scoped TR-030 workaround with a general fix inside
`VideoCompose._remotion_render()` itself:
`_stage_local_assets_for_remotion()` — detects local absolute-path assets
across every field `ExplainerProps` reads, validates them up front
(rejecting missing/unreadable inputs clearly, all problems at once), stages
them into a UUID-scoped, collision-safe directory under
`remotion-composer/public/`, rewrites props to the staged relative paths,
preserves provenance in the tool result, and cleans up unconditionally
(success or failure) without ever touching pre-existing `public/` content.

Also resolve TR-029 by adding `edit_decisions.cut_timing_mode`
(`"source_trim"` default | `"timeline"`) and `cuts[].source_in_seconds` to
the schema, with `_compose()` and `_remotion_render()` each validating and
rejecting the mode they don't implement, rather than silently
misinterpreting the same field pair.

### Context

ADR-026 deliberately deferred this exact fix, reasoning it was too large a
change to make without author sign-off in an unattended session. The
author has now explicitly scoped and requested it, including the specific
mechanism (collision-safe staging, provenance, clear rejection of
missing/unreadable inputs, safe cleanup) and explicit regression-coverage
requirements (images, audio, video, repeated filenames, missing files,
cleanup, both render runtimes).

### Consequences

- `_remotion_render()` now requires `cut_timing_mode="timeline"` explicitly
  — a real behavior change for that function, but it had no prior working
  callers to break (TR-030's own history: this was "apparently the first
  time `operation='render'` with `render_runtime='remotion'` had been
  exercised end to end" against local assets).
- `_compose()`'s default (`cut_timing_mode` absent → `"source_trim"`)
  preserves 100% backward compatibility for every existing FFmpeg caller —
  verified by rerunning `test_08_end_to_end.py` unmodified (38/0).
- New regression suite `tests/contracts/test_remotion_asset_staging_contract.py`
  (16 tests, 0.15s) covers the staging helper and both engines' validation
  in isolation; `test_11_blog_source_remotion_render.py` re-verified the
  full real Remotion render using only the general fix (28/0, up from 24/0
  — 4 new checks for staging/provenance/cleanup), independently confirmed
  via `ffprobe` and a `remotion-composer/public/` listing diff.
- `tests/qa/test_10_blog_source_production_dry_run.py` and
  `tests/qa/test_11_blog_source_remotion_render.py` updated to set
  `cut_timing_mode` explicitly (self-documenting; only `test_11`'s change
  was functionally required).

### Alternatives considered

- Keep the test-scoped workaround and only document the general fix as a
  future task — superseded by the author's explicit authorization this
  round.
- Auto-detect and silently default `cut_timing_mode` per `render_runtime`
  rather than requiring it explicitly — rejected: defeats the purpose of
  TR-029 (the whole point is an engine never silently assumes a cut-timing
  convention the caller didn't state).

### Revisit condition

If a third composition engine is added, or if `_render_via_atelier`'s
separate `public_dir` contract should be unified with this staging
mechanism (currently intentionally separate — atelier bypasses the
cut-schema entirely).

---

## ADR-028 — Use the live “What is ÆPOCH?” blog as the authoritative real-production pilot

**Date:** 2026-08-01
**Status:** confirmed

### Decision

Phase 16 will use `https://aepoch.xyz/blog/post/what-is-aepoch` as its
authoritative source and `https://www.youtube.com/@AepochProtocol` as its
quality benchmark set. Research may verify and enrich the blog but may not
silently revise its thesis, narrative intent, terminology, or protected facts.
The benchmark videos must be analyzed through the reference-video workflow;
production readiness requires an author-reviewed finished video on par with
that grounded benchmark, not merely a technically successful render.

### Context

Phase 15 closed the engineering blockers on the blog extraction-to-compose
path. The author selected this live post as the actual production test and
confirmed that its existing research remains authoritative.

### Consequences

- Phase 15 is complete and Phase 16 is the active system phase.
- Verification conflicts are escalated rather than silently resolved.
- Proposal approval precedes paid calls and full production.
- Technical PASS alone cannot establish production readiness.

### Alternatives considered

- Use another synthetic fixture first — rejected because Phase 15 already
  established fixture-level readiness.
- Treat external research as free to rewrite the source — rejected because it
  would reverse the author-approved authority model.

### Revisit condition

If the author changes the pilot source, benchmark set, or source-authority rule.
