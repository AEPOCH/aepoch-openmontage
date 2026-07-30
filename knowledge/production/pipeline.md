---
type: Production Pipeline
title: ÆPOCH Animated Video Production Pipeline
description: End-to-end production workflow for planning, asset creation, timing, Remotion assembly, review, correction, and release.
status: draft
project_state: confirmed
generated:
  by: chatgpt
  at: 2026-07-30T16:09:00+01:00
sources:
  - id: production-current-state
    resource: ../../docs/aepoch-production-playbook/CURRENT_STATE.md
    title: ÆPOCH Production Current State
  - id: production-phase-log
    resource: ../../docs/aepoch-production-playbook/PHASE_LOG.md
    title: ÆPOCH Production Phase Log
  - id: provider-setup
    resource: ../../docs/aepoch-production-playbook/PROVIDER_SETUP.md
    title: ÆPOCH Production Provider Setup
  - id: knowledge-current-state
    resource: ../state/current-state.md
    title: ÆPOCH OpenMontage Current State
  - id: knowledge-decisions
    resource: ../state/decisions.md
    title: ÆPOCH OpenMontage Decision Register
---

# ÆPOCH Animated Video Production Pipeline

## Purpose

This document defines the approved end-to-end workflow for producing ÆPOCH animated videos with OpenMontage, Remotion, generated or captured visual assets, and human creative review.

The pipeline is designed to preserve:

- Production quality
- Brand consistency
- Deterministic rendering
- Precise word-level timing
- Phase-level cost control
- Traceable creative decisions
- Separation between technical and creative validation
- Recoverable project state across agent sessions

## Core Production Principle

The approved production model is an **asset-first hybrid workflow**.

The workflow combines:

1. Human-approved script and scene architecture
2. Generated, captured, designed, or licensed visual plates
3. Deterministic Remotion-native motion and compositing
4. Real word-level narration timing
5. Human creative review at each major gate

The final visual result should not depend on a single generated image or a single generated video accurately expressing the full concept.

Generated assets are inputs to the production system, not finished scenes by default.

## Production Roles

### Human author

Owns:

- Script approval
- Creative direction
- Narration performance
- Human-video performance
- Final asset approval
- Public-readiness decision
- Phase authorization
- Paid-call approval where required

### ChatGPT

Acts as:

- Playbook architect
- Workflow planner
- Knowledge-system maintainer
- Phase-scoping assistant
- Review framework designer
- Documentation and decision recorder

ChatGPT does not become the source of truth merely by describing a plan.

### Claude Code or execution agent

Acts as:

- Repository implementation agent
- Test and render executor
- Tool integration agent
- Evidence generator
- Phase-specific code operator

Execution agents must read the durable project state before acting.

### Remotion

Provides:

- Deterministic composition
- Motion
- Camera movement
- Cropping
- Masks
- Color-state changes
- Geometry
- Transitions
- Caption systems
- Timing
- Final rendering

### Image and stock providers

Provide:

- Editorial illustration plates
- Reference images
- Stock photography
- Targeted image edits
- Optional future generated-video assets

Provider output is never automatically approved.

## Pipeline Gates

Every major stage must pass its own gate.

### Gate 1 — Script lock

Required:

- Approved narration script
- Approved factual claims
- Approved episode intent
- Approved source outline
- Approved audience and release context

A recording does not supersede the approved script.

### Gate 2 — Scene architecture lock

Required:

- Scene list
- Scene purpose
- Narration mapping
- Visual concept
- Reuse classification
- New-asset requirement
- Timing estimate
- Transition intent

### Gate 3 — Static visual lock

Required:

- Static reference frames
- Neighboring-scene review
- Brand compliance
- Human proportion review
- Phone-scale review
- Visual differentiation
- Deterministic output

### Gate 4 — Timing lock

Required:

- Narration recording or timing reference
- Word-level timestamps
- Silence-boundary review
- Scene and beat mapping
- Documented script deviations
- Confirmed start and end boundaries

### Gate 5 — Motion proof

Required:

- Deterministic motion
- No blank transitions
- Audio alignment
- Visual hierarchy
- Brand consistency
- Normal-speed review
- Reduced-motion behavior where required

### Gate 6 — Creative proof

Required:

- Production-quality asset treatment
- Clear visual storytelling
- Playback-scale legibility
- Successful neighboring-beat continuity
- Human author review

### Gate 7 — Public readiness

Required:

- Technical validation: PASS
- Timing validation: PASS
- Workflow validation: PASS
- Creative validation: PASS
- Final audio approved
- Final visuals approved
- No unresolved blocking corrections
- Explicit author approval

## Production Status Vocabulary

Use these verdicts separately:

- **Technical validation**
- **Workflow validation**
- **Timing validation**
- **Creative validation**
- **Public readiness**

Do not collapse all five into one `PASS` or `FAIL`.

### Example

A proof may be:

- Technical validation: PASS
- Workflow validation: PASS
- Timing validation: PASS
- Creative validation: CONDITIONAL PASS
- Public readiness: NO

That result authorizes a correction phase, not publication or full-episode expansion.

## Phase Architecture

## Phase 10 — Production asset-system foundation

Purpose:

- Establish brand assets
- Define reusable production primitives
- Create canonical marks
- Define backgrounds
- Define human and icon vocabulary
- Create reusable geometry and visual tokens

Completion criteria:

- Assets exist in documented locations
- Naming is consistent
- Variants are clear
- No secrets or undocumented dependencies
- Production assets are distinct from temporary references

## Phase 12 — Tier 1 Remotion module system

Purpose:

- Build reusable visual modules
- Validate motion patterns
- Validate transitions
- Validate captions
- Validate reduced-motion behavior
- Lock a reusable baseline

Required review:

- Static
- Animated
- Neighboring-module comparison
- Reduced motion
- Transition boundaries
- Determinism

## Phase 13A — Episode pre-production

Purpose:

- Convert the episode concept into a locked production brief

Outputs:

- Episode brief
- Narration script
- Scene plan
- Written storyboard

## Phase 13A.1 — Scene architecture refinement

Purpose:

- Quantify reuse
- Identify new assets
- Lock scene count
- Lock narration structure
- Map factual claims
- Map source requirements

Current Episode 001 result:

- 22 scenes
- 719 words
- Approximate runtime: 5:20 at 135 words per minute
- 63.6% Tier 1 reuse or variant reuse
- 36.4% new or unimplemented modules

## Phase 13B — Static reference production

Purpose:

- Produce episode-specific static reference frames before full motion work

Outputs:

- Static episode source
- Reference stills
- Contact sheets
- New module previews
- Variant previews
- Neighboring-scene comparisons

Required checks:

- 1920×1080
- Deterministic
- No unexpected brand elements
- No debug labels
- No blank frames
- Correct typography
- Correct human proportions

## Phase 13B.1 — Static creative correction

Purpose:

- Repair proportion, scale, readability, and concept problems discovered during static review

Rule:

Do not advance into motion merely because all required files rendered.

## Phase 13B.2 — Scene differentiation

Purpose:

- Prevent repetitive module reuse from creating a template-like episode

Review:

- Similar scene classes
- Repeated typography structures
- Repeated geometry
- Repeated pacing
- Neighboring-scene visual contrast

## Phase 13C.1 — Performance and timing analysis

Purpose:

- Understand the narration's real pacing
- Map spoken performance to approved script structure
- Identify timing uncertainty
- Separate reference recording from final production audio

Required outputs:

- Performance map
- Scene timing map
- Confidence labels
- Documented script deviations
- Source-audio role

## Phase 13C.2A — Full motion blocking

Purpose:

- Prove technical feasibility for all scenes
- Validate composition registration
- Validate full-episode duration
- Validate transitions
- Validate deterministic motion

Important result:

The Episode 001 motion blocking passed technically but failed creatively.

It remains a technical reference only.

## Phase 14A — Production asset direction

### Phase 14A.1 — Style exploration

Purpose:

- Explore multiple visual directions
- Test the same concepts across each direction
- Compare consistency rather than selecting isolated attractive images

### Phase 14A.2 — Direction convergence

Purpose:

- Test whether the selected direction holds across difficult concepts
- Evaluate visual-family consistency
- Identify prompt and provider failure modes

### Phase 14A.3 — Targeted repair

Purpose:

- Use editing or reference-image techniques to repair a specific unresolved concept
- Avoid broad regeneration when only one concept remains weak

## Phase 14B — Production-quality proof

Purpose:

- Validate the asset-first hybrid workflow on a real timed segment

Current Episode 001 proof:

- 47.00 seconds
- 1410 frames
- 30 fps
- 1920×1080 composition
- 720p review render
- Six beats
- Word-level timing
- Existing approved plates
- Remotion-native transformation
- No new generation calls during the phase

Verdict:

- Technical validation: PASS
- Asset-first workflow: PASS
- Word-level timing: PASS
- Creative proof: CONDITIONAL PASS
- Public-ready: NO

## Phase 14B.1 — Proof polish

Purpose:

- Correct the existing proof
- Establish whether the workflow reaches public quality before full-episode scaling

Scope:

1. Progressive echo reveal from one dominant human
2. Continuous Beats 1 and 2
3. Stronger phone-call and catfishing shift
4. Continuous Beats 3 and 4
5. Replacement multiplication plate
6. Stronger Manufactured Consensus readability
7. Lee recording retained only as timing reference
8. Clean approved-script narration used for final proof

Not authorized:

- Full Episode 001 production
- Broad new asset campaign
- New proof from scratch
- Unbounded image generation
- Automatic provider retries

## Full Episode Production

Full Episode 001 production begins only after:

- Phase 14B.1 creative review passes
- The proof is approved as public-ready
- Final narration workflow is accepted
- Asset-first hybrid workflow is confirmed at playback scale
- The author explicitly authorizes expansion

## Production Inputs

Every episode should define:

### Narrative inputs

- Approved script
- Episode brief
- Sources
- Claims
- Call to action
- Audience
- Release context

### Timing inputs

- Final narration
- Word-level timing
- Scene timing map
- Silence boundaries
- Delivery deviations

### Visual inputs

- Brand system
- Approved static references
- Generated plates
- Captured human video
- Stock media
- Icons
- Diagrams
- Backgrounds
- Typography
- Canonical marks

### Technical inputs

- Composition dimensions
- Frame rate
- Duration
- Output targets
- Audio format
- Caption format
- Reduced-motion requirements
- Rendering constraints

## Asset-First Scene Construction

Each scene should be divided into:

1. Plate
2. Camera behavior
3. Internal state changes
4. Brand geometry
5. Narration anchors
6. Transition behavior
7. Exit state

### Plate

The visual base may be:

- Generated illustration
- Human video
- Stock footage
- Designed still
- Diagram
- Composite of approved assets

### Camera behavior

Possible treatments:

- Pan
- Push
- Pull
- Crop reveal
- Reframe
- Parallax
- Registration shift
- Hold

### Internal state changes

Possible treatments:

- Color-state transition
- Mask reveal
- Layer separation
- Duplication
- Synchronization
- Highlight sweep
- Focus change
- Opacity hierarchy

### Brand geometry

Use for:

- Conceptual transformation
- Synchronization
- Direction
- Boundaries
- Emphasis
- Network relationships
- Shared state

Brand geometry should clarify the concept rather than decorate the frame.

### Narration anchors

Each meaningful visual action should attach to:

- A spoken word
- A spoken phrase
- A silence boundary
- A deliberate musical or sound cue

Do not time major actions only by scene percentage when a spoken anchor exists.

## Narration Workflow

### Reference narration

May be used for:

- Pacing
- Performance analysis
- Temporary timing
- Word-level markers

May not automatically be used for:

- Final production
- Script authority
- Final audio
- Final edit structure

### Final narration

Must:

- Follow the approved script closely
- Be technically readable
- Be captured at a suitable sample rate
- Avoid clipping
- Preserve sufficient room tone
- Be timed at word level
- Be reviewed for deviations

## Word-Level Alignment Procedure

1. Inspect the source audio.
2. Run local transcription.
3. Enable word timestamps.
4. Identify required spoken anchors.
5. Record real timestamps.
6. Run silence detection.
7. Refine boundaries to nearby silence where appropriate.
8. Record discrepancies.
9. Preserve the approved script.
10. Store timing results in episode inputs.

## Generated-Asset Workflow

### Before generation

Define:

- Scene
- Concept
- Visual direction
- Aspect ratio
- Output size
- Required human vocabulary
- Composition
- Color system
- Maximum calls
- Maximum cost
- Review criteria

### During generation

Record:

- Provider
- Tool
- Endpoint
- Prompt
- Seed where available
- Parameters
- Call count
- Cost
- Duration
- Output path
- Source format
- Final format
- Conversion status

### After generation

Review:

- Brand fit
- Human proportions
- Visual-family consistency
- Concept clarity
- Phone-scale readability
- Artifacts
- Moderation issues
- Format
- Dimensions

### Retry policy

Do not retry automatically.

Report the failure and propose the exact adjustment.

## Captured Human Video Workflow

Before use:

- Preserve original files
- Inspect codec and metadata
- Check rotation
- Check frame rate
- Check resolution
- Check color profile
- Check audio tracks
- Check duration
- Note performance selects
- Identify usable clean handles

Human video should be integrated as a production asset, not assumed to replace the editorial visual language automatically.

## Remotion Assembly Workflow

### Composition rules

- Explicit dimensions
- Explicit frame rate
- Explicit duration
- Deterministic behavior
- No hidden network dependencies during render
- No `Math.random()`
- Stable asset paths
- Stable font loading
- Explicit timing constants

### Source isolation

Each major proof or phase should have a clear implementation boundary.

Do not overwrite a reviewed baseline without preserving the ability to compare.

### Transition rules

- Incoming-over-outgoing architecture is permitted where appropriate
- Same-plate crossfades should be avoided
- Transitions must be reviewed at frame boundaries
- No blank frames
- No accidental opacity collapse
- No timing drift

## Quality Assurance

## Static QA

Verify:

- Dimensions
- File validity
- Brand palette
- Typography
- Human proportions
- Visual hierarchy
- Scene differentiation
- No debug overlays

## Motion QA

Verify:

- Timing
- Transitions
- Camera movement
- Easing
- Determinism
- Playback-scale clarity
- Reduced-motion behavior

## Audio QA

Verify:

- Duration
- Sync
- Sample rate
- Channel layout
- Clipping
- Silence boundaries
- Script fidelity

## Provider QA

Verify:

- Correct environment path
- Correct endpoint
- Actual file format
- Dimensions
- Conversion
- Cost
- Call count
- Output provenance

## Creative QA

Review:

- Concept clarity
- Emotional tone
- Visual-family consistency
- Human credibility
- Brand exclusions
- Scene continuity
- Normal playback
- Phone scale
- Public readiness

## Required Review Outputs

Depending on phase:

- Static contact sheet
- Neighboring-scene contact sheet
- Transition contact sheet
- Word-alignment contact sheet
- Phone-scale contact sheet
- Full preview render
- Reduced-motion preview
- QA report

## Render Tiers

### Draft preview

Use for:

- Timing
- Transition review
- Gross composition
- Fast iteration

Typical:

- 720p
- H.264
- AAC
- Concurrency 1 where required for reliability

### Review render

Use for:

- Creative review
- Phone-scale review
- Internal stakeholder review

### Final render

Only after public readiness.

Must define:

- Final resolution
- Final bitrate
- Final audio
- Captions
- Color handling
- Delivery format
- Archive format

## Release Gate

Do not release until:

- Final script approved
- Final narration approved
- Final visual assets approved
- Technical QA passed
- Creative QA passed
- No blocking corrections remain
- Public-ready verdict is YES
- Final author approval is explicit

## Evidence and Documentation

After every meaningful phase:

1. Update production playbook
2. Update `knowledge/state/current-state.md`
3. Update `knowledge/state/decisions.md` if needed
4. Update troubleshooting
5. Update asset index
6. Append knowledge log
7. Preserve terminal evidence
8. Review knowledge-only Git diff
9. Commit only `knowledge/`

## Current Immediate Production Boundary

The project is presently between Phase 14B and Phase 14B.1.

Production remains paused while the author records:

- New human video
- Clean narration of the approved script

The next executable production action is not a render or generation call.

The next executable production action is:

1. Confirm the recording pause is lifted.
2. Identify the source media paths.
3. Inspect the media.
4. Capture metadata.
5. Align the clean narration.
6. Reproduce Phase 14B.
7. Begin only the eight scoped Phase 14B.1 corrections.
