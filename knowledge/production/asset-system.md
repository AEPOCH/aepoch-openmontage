---
type: Production Asset System
title: ÆPOCH Production Asset System
description: Asset taxonomy, provenance, approval states, naming rules, storage boundaries, review requirements, and the current Episode 001 asset inventory.
status: draft
project_state: confirmed
generated:
  by: chatgpt
  at: 2026-07-30T16:18:00+01:00
sources:
  - id: episode-asset-inventory
    resource: ../raw/terminal-logs/2026-07-30-episode001-asset-inventory.txt
    title: Episode 001 asset inventory
  - id: production-current-state
    resource: ../../docs/aepoch-production-playbook/CURRENT_STATE.md
    title: ÆPOCH Production Current State
  - id: production-phase-log
    resource: ../../docs/aepoch-production-playbook/PHASE_LOG.md
    title: ÆPOCH Production Phase Log
  - id: knowledge-current-state
    resource: ../state/current-state.md
    title: ÆPOCH OpenMontage Current State
  - id: knowledge-decisions
    resource: ../state/decisions.md
    title: ÆPOCH OpenMontage Decision Register
---

# ÆPOCH Production Asset System

## Purpose

This document defines how ÆPOCH production assets are:

- Classified
- Named
- Stored
- Reviewed
- Approved
- Rejected
- Promoted into production
- Referenced by Remotion
- Preserved for provenance
- Reused across episodes

The asset system must prevent temporary experiments, rejected visuals, source recordings, review outputs, and production-approved assets from being confused with one another.

## Core Rule

An asset existing in the repository does not make it production-approved.

Every asset must have an explicit role and state.

## Current Inventory Boundary

The current inventory confirmed files under:

```text
projects/aepoch-episodes/001-what-is-aepoch/
remotion-composer/src/aepoch/
```

No files were found by the checked command under:

```text
remotion-composer/public/aepoch/
```

Therefore:

- The Episode 001 project tree is currently the authoritative visible asset inventory.
- Runtime public-asset paths must be verified from source code before documenting exact locations.
- This document does not invent a public-path structure.
- `phase14b/assets.ts` remains the code authority for how the proof resolves its runtime assets.

## Asset Domains

## 1. Brand assets

Reusable visual assets that belong to the ÆPOCH system rather than one episode.

Examples:

- Canonical marks
- Backgrounds
- Typography
- Color tokens
- Icon vocabulary
- Human-form vocabulary
- Diagram geometry
- Motion primitives

Typical code locations:

```text
remotion-composer/src/aepoch/tokens.ts
remotion-composer/src/aepoch/components.tsx
remotion-composer/src/aepoch/modules.tsx
remotion-composer/src/aepoch/motion.tsx
remotion-composer/src/aepoch/random.ts
remotion-composer/src/aepoch/runtime.ts
remotion-composer/src/aepoch/types.ts
```

## 2. Episode source inputs

Narrative, timing, and structural inputs for one episode.

Current Episode 001 inputs:

```text
projects/aepoch-episodes/001-what-is-aepoch/inputs/scene-plan.yaml
projects/aepoch-episodes/001-what-is-aepoch/inputs/scene-timing-map.yaml
projects/aepoch-episodes/001-what-is-aepoch/inputs/phase-14b-proof-word-timings.json
```

These are source-of-truth inputs, not review outputs.

## 3. Reference media

External or internal media used for analysis, timing, inspiration, or comparison.

Current Episode 001 reference media:

```text
projects/aepoch-episodes/001-what-is-aepoch/reference/lee/lees-recording-review.mp4
projects/aepoch-episodes/001-what-is-aepoch/reference/lee/analysis/lee-reference-audio.wav
```

Reference media must not be assumed to be approved for final publication.

Lee's recording is:

- A pacing reference
- A performance reference
- A temporary timing source

It is not:

- Final narration
- Script authority
- Final visual direction
- Final edit authority

## 4. Generated exploration assets

Generated assets created to explore a visual direction.

Current Episode 001 exploration directory:

```text
projects/aepoch-episodes/001-what-is-aepoch/assets/style-exploration/phase-14a1/
```

Confirmed files:

```text
all-directions-contact-sheet.png
concept-comparison-contact-sheet.png
phone-scale-contact-sheet.png
generation-manifest.json
```

These files document exploration and comparison.

They are not automatically production plates.

## 5. Style-convergence assets

Generated or edited assets used to test whether a selected direction forms a coherent family.

Current directories:

```text
projects/aepoch-episodes/001-what-is-aepoch/assets/style-convergence/phase-14a2/
projects/aepoch-episodes/001-what-is-aepoch/assets/style-convergence/phase-14a3/
```

Confirmed Phase 14A.2 review files:

```text
phase-14a2-all-candidates.png
phase-14a2-family-comparison.png
phase-14a2-phone-scale.png
```

Confirmed Phase 14A.3 candidate files:

```text
consensus-edit-a.png
consensus-edit-b.png
consensus-edit-c.png
phase-14a3-consensus-candidates.png
phase-14a3-family-lock.png
phase-14a3-phone-scale.png
```

## 6. Production plates

Visual assets deliberately selected for use inside a Remotion composition.

For Phase 14B, the documented locked plate family was:

- `echoes-a`
- `reflection-a`
- `consensus-edit-a`
- One Direction A multiplication frame from Phase 14A.1

The exact runtime file paths must be read from:

```text
remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/assets.ts
```

Do not infer runtime paths solely from contact-sheet filenames.

## 7. Audio assets

### Reference audio

```text
projects/aepoch-episodes/001-what-is-aepoch/reference/lee/analysis/lee-reference-audio.wav
```

### Phase 14B proof audio

```text
projects/aepoch-episodes/001-what-is-aepoch/audio/final/phase-14b-proof-audio.wav
```

Despite the `audio/final/` directory name, the Phase 14B proof audio is not final public narration.

Its role is:

- Finalized audio for the Phase 14B internal proof
- Extracted from Lee's reference recording
- Timing reference only for future production

Phase 14B.1 must replace it with a clean recording of the approved script before public readiness.

## 8. Static renders

Static renders are review artifacts.

Current directories:

```text
projects/aepoch-episodes/001-what-is-aepoch/renders/stills/phase-13b/
projects/aepoch-episodes/001-what-is-aepoch/renders/stills/phase-13b1/
projects/aepoch-episodes/001-what-is-aepoch/renders/stills/phase-13b2/
```

These outputs document the evolution of Episode 001's static visual system.

They are not automatically reusable source assets.

## 9. Motion previews

Motion previews are review and validation outputs.

Current directories:

```text
projects/aepoch-episodes/001-what-is-aepoch/renders/previews/phase-13c2a/
projects/aepoch-episodes/001-what-is-aepoch/renders/previews/phase-14b/
```

Current Phase 14B preview:

```text
projects/aepoch-episodes/001-what-is-aepoch/renders/previews/phase-14b/aepoch-e001-phase14b-proof-720p.mp4
```

This preview is:

- Technically validated
- An internal workflow demonstration
- Not public-ready
- The comparison baseline for Phase 14B.1

## 10. QA artifacts

QA assets document review results and must remain separate from production source assets.

Current Episode 001 QA images include:

```text
projects/aepoch-episodes/001-what-is-aepoch/qa/complete-reference-contact-sheet.png
projects/aepoch-episodes/001-what-is-aepoch/qa/full-episode-storyboard-contact-sheet.png
projects/aepoch-episodes/001-what-is-aepoch/qa/neighboring-scenes-contact-sheet.png
projects/aepoch-episodes/001-what-is-aepoch/qa/new-modules-contact-sheet.png
projects/aepoch-episodes/001-what-is-aepoch/qa/tier1-variants-contact-sheet.png
projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13c2a-transition-contact-sheet.png
projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-proof-contact-sheet.png
projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-transition-contact-sheet.png
projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-word-alignment-contact-sheet.png
```

QA artifacts may prove approval or rejection, but should not be imported as scene plates.

## Asset States

Use one of the following states.

### `raw`

Original source material that has not been transformed.

Examples:

- Camera recording
- Narration recording
- Provider download
- Provider-returned image
- Reference recording

### `exploration`

Created to compare visual directions or techniques.

Not approved for production.

### `candidate`

Selected for focused review but not yet approved.

### `approved-reference`

Approved as a visual, timing, or structural reference.

May not be publication-ready.

### `approved-plate`

Approved for use as a source asset inside a production composition.

### `internal-proof`

Approved for internal validation only.

### `production-approved`

Approved for final production.

### `public-ready`

Approved for release.

### `rejected`

Must not be used in production.

### `superseded`

Previously approved or useful, but replaced by a newer asset or workflow.

## Approval Is Context-Specific

An asset may be approved in one role and rejected in another.

Example:

Lee's recording is:

- `approved-reference` for pacing and timing
- `rejected` as final narration
- `rejected` as final visual direction

The Phase 14B proof is:

- `internal-proof`
- not `public-ready`

The Phase 13C.2A motion blocking is:

- `approved-reference` for technical architecture
- `rejected` as the creative production baseline

## Current Episode 001 Asset Decisions

## Direction A

Direction A / Editorial Geometric is the current production illustration base.

It is an approved direction, not a guarantee that every Direction A image is approved.

## `echoes-a`

Current state:

```text
approved-plate
```

Approved role:

- Human Among Synthetic Echoes
- Phase 14B Beats 1 and 2

Phase 14B.1 requirement:

- Preserve one dominant human at the opening
- Reveal synthetic echoes progressively
- Use one continuous composition across Beats 1 and 2

## `reflection-a`

Current state:

```text
approved-plate
```

Approved role:

- Uncertain Digital Reflection
- Phase 14B Beats 3 and 4

Phase 14B.1 requirement:

- Use one continuous composition across Beats 3 and 4
- Strengthen the phone-call and catfishing visual state change

## `reflection-b`

Current state:

```text
approved-reference
```

It passed the convergence review but was not documented as the active Phase 14B production plate.

Do not substitute it without a deliberate comparison and decision.

## `consensus-edit-a`

Current state:

```text
approved-plate-with-geometry-dependency
```

Approved role:

- Figure plate for Manufactured Consensus

Limitation:

The plate does not communicate the full transformation alone.

Required Remotion additions:

- Synchronization markers
- Lockstep convergence
- Shared output band
- Strong playback-scale hierarchy

Phase 14B.1 must strengthen these additions.

## `consensus-edit-b`

Current state:

```text
candidate-not-selected
```

Do not use unless reopened by creative review.

## `consensus-edit-c`

Current state:

```text
candidate-not-selected
```

Do not use unless reopened by creative review.

## Phase 14A.1 multiplication frame

Current state:

```text
superseded-for-production
```

It was used in Phase 14B as an internal proof plate.

Phase 14B.1 requires replacement because it does not match the selected Direction A human vocabulary consistently enough.

Permitted replacement paths:

1. Use an approved Direction A human plate.
2. Isolate one approved synthetic figure.
3. Multiply the approved figure deterministically through Remotion.

## Phase 13C.2A programmatic humans

Current state:

```text
rejected
```

Do not reuse as final production assets.

They may remain in the repository for:

- Technical comparison
- Timing reference
- Regression analysis

## Episode 001 Static Render Inventory

## Phase 13B

Confirmed files:

```text
01-welcome-direct-address-a.png
02-welcome-direct-address-b.png
03-august-9-continuation.png
04-synthetic-mimicry-a.png
05-synthetic-mimicry-b.png
06-synthetic-multiplication.png
07-manufactured-consensus-a.png
08-manufactured-consensus-b.png
09-human-consequence-uncertain-reflection.png
10-human-consequence-extraction.png
11-declarative-hook-built-for-another-world.png
12-declarative-hook-does-not-recognize-presence.png
13-circular-value-field-traffic-data.png
14-ancient-idea-modern-tools-a.png
15-ancient-idea-modern-tools-b.png
16-human-network-protocol-layer-a.png
17-human-network-protocol-layer-b.png
18-human-network-participant-cohort.png
19-flow-lifecycle-42-day-test.png
20-aepoch-series-outro.png
```

These are historical static-review outputs.

## Phase 13B.1

Confirmed corrected stills:

```text
01-welcome-direct-address-a.png
02-welcome-direct-address-b.png
03-august-9-continuation.png
04-synthetic-mimicry.png
05-synthetic-multiplication.png
06-manufactured-consensus-a.png
07-manufactured-consensus-b.png
08-human-consequence-uncertain-reflection.png
09-human-consequence-extraction.png
10-declarative-hook-built-for-another-world.png
11-declarative-hook-does-not-recognize-presence.png
12-circular-value-field-traffic-data.png
13-ancient-idea-modern-tools.png
14-human-network-protocol-layer.png
15-human-network-participant-cohort.png
16-flow-lifecycle-path.png
17-aepoch-series-outro.png
```

These supersede Phase 13B equivalents for static-review comparison.

They do not supersede the later decision to reject primitive programmatic humans as final production assets.

## Phase 13B.2

Confirmed differentiated stills:

```text
16-flow-lifecycle-path.png
sc13-signal-reveal.png
sc15-contribution.png
sc17-one-idea.png
sc18-42-day-test.png
sc20-final-thesis.png
sc21-biological-transformer.png
```

These document scene differentiation and specific primitives.

They remain part of the rejected primitive creative baseline unless explicitly approved for another role.

## Asset Naming Rules

Use lowercase kebab-case for production files.

Preferred pattern:

```text
<episode>-<phase>-<concept>-<variant>.<ext>
```

Or within a phase-specific directory:

```text
<concept>-<variant>.<ext>
```

Examples:

```text
echoes-a.png
reflection-a.png
consensus-edit-a.png
phase-14b-proof-audio.wav
aepoch-e001-phase14b-proof-720p.mp4
```

## Required Name Components

Use names that communicate:

- Episode or project
- Phase
- Concept
- Variant
- Review scale or purpose
- Resolution where relevant

Avoid names such as:

```text
final.png
final2.png
new-final.png
test.png
image1.png
```

## Variant Naming

Use simple stable variant suffixes:

```text
-a
-b
-c
```

Do not reuse a suffix for a materially different generation after review.

If a candidate is regenerated, either:

- Preserve the original and increment the variant, or
- Use a round-specific subdirectory

## Review Artifact Naming

Use explicit purpose:

```text
phase-14a2-family-comparison.png
phase-14a2-phone-scale.png
phase-14b-transition-contact-sheet.png
phase-14b-word-alignment-contact-sheet.png
```

## Asset Metadata Requirements

Every generated or downloaded production candidate should record:

- Asset ID
- Episode
- Phase
- Concept
- Variant
- Date
- Creator or provider
- Tool
- Endpoint or source
- Prompt or query
- Seed where supported
- Parameters
- Original filename
- Stored filename
- Source format
- Final format
- Conversion status
- Dimensions
- Duration for time-based media
- Cost
- License or usage basis
- Review state
- Reviewer
- Approved role
- Rejection reason where applicable
- Related QA artifact

## Generation Manifest

Phase 14A.1 includes:

```text
projects/aepoch-episodes/001-what-is-aepoch/assets/style-exploration/phase-14a1/generation-manifest.json
```

Future generation phases should preserve a similar manifest.

The manifest should not contain API-key values.

## Storage Rules

## Original source media

Preserve originals without destructive editing.

Recommended structure:

```text
projects/aepoch-episodes/<episode>/source/
projects/aepoch-episodes/<episode>/reference/
```

The current repository uses `reference/` for Lee's material.

If author-owned camera or narration recordings are brought back into a future
OpenMontage scope, they should receive a clear source-media directory first.
The former Phase 14B.1 recording dependency is superseded.

Do not place large media in `knowledge/`.

## Generated assets

Use:

```text
projects/aepoch-episodes/<episode>/assets/<purpose>/<phase>/
```

Example:

```text
assets/style-convergence/phase-14a3/
```

## Audio

Use clear role-specific directories.

Recommended distinctions:

```text
audio/source/
audio/reference/
audio/working/
audio/proof/
audio/final/
```

The current `audio/final/phase-14b-proof-audio.wav` name is historically retained but should not be interpreted as public-final audio.

Future Phase 14B.1 audio should be named to reflect its actual role.

## Renders

Use:

```text
renders/stills/<phase>/
renders/previews/<phase>/
renders/final/
```

Do not overwrite a reviewed phase render.

## QA

Use:

```text
qa/
```

or phase-specific QA directories if the volume grows.

QA output should include its phase and purpose in the filename.

## Runtime Assets

Remotion runtime assets must be copied or exposed through a deterministic public path.

Because the current public inventory command found no files under:

```text
remotion-composer/public/aepoch/
```

the exact current runtime path remains to be verified from:

```text
remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/assets.ts
```

Before Phase 14B.1:

1. Inspect `phase14b/assets.ts`.
2. Record every runtime asset path.
3. Confirm each file exists.
4. Confirm each source asset's provenance.
5. Decide whether the public directory structure should be normalized.
6. Do not move files until existing Phase 14B is reproduced.

## Asset Promotion Workflow

An asset advances through these stages:

```text
raw
  → exploration
  → candidate
  → approved-reference
  → approved-plate
  → internal-proof
  → production-approved
  → public-ready
```

Not every asset must pass through every state.

At any stage it may become:

```text
rejected
superseded
```

## Promotion Criteria

### Candidate to approved reference

Requires:

- Valid file
- Provenance
- Concept relevance
- Review evidence
- No hard exclusion failure

### Approved reference to approved plate

Requires:

- Composition fit
- Correct visual family
- Playback-scale legibility
- Known runtime path
- Known dimensions
- Known format
- Approved Remotion role

### Approved plate to production approved

Requires:

- Successful integration
- Timing validation
- Motion validation
- Transition validation
- Creative review
- Public-production context

### Production approved to public ready

Requires:

- Final audio
- Final render
- Final QA
- Explicit author approval

## Rejection Rules

Record the specific reason.

Examples:

- Human proportions fail
- Visual family mismatch
- Concept unclear
- Dense or mob-like layout
- Blank-eye artifact
- Personality-bearing synthetic face
- Generic robot register
- Brand exclusion
- Incorrect file format
- Missing provenance
- Insufficient playback-scale readability
- Copyright or license uncertainty

Do not delete rejected assets merely to simplify the directory.

Retain enough evidence to explain the decision unless storage policy requires archival.

## Contact Sheet Rules

Contact sheets should answer a specific review question.

### Family comparison

Does the visual direction remain coherent across concepts?

### Phone scale

Does the concept remain legible on a small screen?

### Neighboring scenes

Do adjacent scenes feel distinct enough?

### Transition sheet

Are there blank frames, repeated-plate cuts, or opacity collapses?

### Word alignment

Do visual actions occur on the intended spoken words?

## Phase 14B.1 Asset Procedure

Before work begins:

1. Lift the recording pause explicitly.
2. Identify the clean narration file.
3. Identify the new human-video file.
4. Preserve original media.
5. Run `file` and `ffprobe`.
6. Record exact paths.
7. Inspect `phase14b/assets.ts`.
8. Reproduce Phase 14B.
9. Create a new Phase 14B.1 asset record.
10. Implement only scoped replacements and corrections.

## Phase 14B.1 Expected Asset Changes

### Echoes plate

Likely retained:

```text
echoes-a
```

Change:

- Presentation and reveal logic
- Not necessarily the source image

### Reflection plate

Likely retained:

```text
reflection-a
```

Change:

- Internal visual state
- Continuous beat treatment

### Multiplication plate

Must be replaced.

Preferred result:

- Isolated approved Direction A synthetic figure
- Deterministically multiplied in Remotion

### Consensus plate

Likely retained:

```text
consensus-edit-a
```

Change:

- Stronger Remotion synchronization
- Stronger shared output band
- Stronger normal-playback readability

### Narration

Replace the Phase 14B proof audio with the clean approved-script recording.

### Human video

Its exact role remains to be defined by the Phase 14B.1 execution plan.

Do not assume it replaces any plate until the footage has been inspected.

## Asset Verification Commands

### Inventory images and media

```bash
find projects/aepoch-episodes/001-what-is-aepoch \
  -type f \
  \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \
     -o -iname '*.svg' -o -iname '*.webp' -o -iname '*.mp4' \
     -o -iname '*.wav' -o -iname '*.mp3' -o -iname '*.json' \
     -o -iname '*.yaml' \) \
  -printf '%p\n' | sort
```

### Verify file types

```bash
find projects/aepoch-episodes/001-what-is-aepoch/assets \
  -type f -print0 |
  xargs -0 -n1 file
```

### Inspect image dimensions

```bash
identify path/to/image 2>/dev/null
```

### Inspect media

```bash
ffprobe -hide_banner path/to/media
```

### Find Phase 14B runtime references

```bash
sed -n '1,260p' \
  remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/assets.ts
```

### Find all runtime asset references in Phase 14B

```bash
grep -RniE \
  'staticFile|public/|\\.png|\\.jpg|\\.jpeg|\\.svg|\\.webp|\\.wav|\\.mp3|\\.mp4' \
  remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b
```

## Open Asset-System Issues

| Issue | State |
|---|---|
| Exact Phase 14B public runtime paths not yet recorded in knowledge | Open |
| No files found under checked `remotion-composer/public/aepoch/` path | Needs verification |
| Individual Phase 14A.1 generated candidates were not visible in the supplied depth-limited inventory | Needs deeper inventory |
| Clean narration source location not yet defined | Blocked by recording |
| New human-video source location not yet defined | Blocked by recording |
| Phase 14B.1 multiplication replacement not yet selected | Open correction |
| Formal machine-readable asset index is not yet implemented | Planned |
| License metadata is not yet centralized in `knowledge/` | Planned |

## Immediate Asset-System Next Action

Before Phase 14B.1 production work begins, inspect:

```text
remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/assets.ts
```

and capture the exact runtime asset map.

Do not reorganize runtime assets until the existing Phase 14B proof has been reproduced successfully.
