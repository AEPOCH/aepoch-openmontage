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
