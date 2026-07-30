---
type: Beta Test Plan
title: ÆPOCH Phase 14B.1 Beta Test Plan
description: Test matrix, evidence requirements, review sequence, pass/fail criteria, and release gate for polishing the Episode 001 production proof.
status: draft
project_state: planned
generated:
  by: chatgpt
  at: 2026-07-30T16:23:00+01:00
sources:
  - id: production-current-state
    resource: ../../docs/aepoch-production-playbook/CURRENT_STATE.md
    title: ÆPOCH Production Current State
  - id: production-phase-log
    resource: ../../docs/aepoch-production-playbook/PHASE_LOG.md
    title: ÆPOCH Production Phase Log
  - id: knowledge-current-state
    resource: ../state/current-state.md
    title: ÆPOCH OpenMontage Current State
  - id: production-pipeline
    resource: pipeline.md
    title: ÆPOCH Animated Video Production Pipeline
  - id: production-asset-system
    resource: asset-system.md
    title: ÆPOCH Production Asset System
---

# ÆPOCH Phase 14B.1 Beta Test Plan

## Purpose

This plan defines how Phase 14B.1 will be tested and reviewed.

Phase 14B.1 is a targeted polish pass on the existing 47-second Phase 14B proof.

It is not:

- A new proof from scratch
- A full Episode 001 build
- A broad asset-generation phase
- A public release phase

The purpose of the beta test is to determine whether the approved asset-first hybrid workflow can produce a **public-ready proof** before the project scales to the full episode.

## Current Baseline

### Composition

```text
Aepoch-E001-Phase14B-Proof
```

### Duration

```text
47.00 seconds
```

### Frames

```text
1410 frames
```

### Frame rate

```text
30 fps
```

### Source implementation

```text
remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/
```

### Baseline preview

```text
projects/aepoch-episodes/001-what-is-aepoch/renders/previews/phase-14b/aepoch-e001-phase14b-proof-720p.mp4
```

### Baseline verdict

| Axis | Result |
|---|---|
| Technical validation | PASS |
| Asset-first workflow | PASS |
| Word-level timing | PASS |
| Creative validation | CONDITIONAL PASS |
| Public-ready | NO |

## Entry Conditions

Phase 14B.1 testing must not begin until all entry conditions are satisfied.

### Required

- [ ] The author explicitly lifts the production pause.
- [ ] The clean narration recording exists.
- [ ] The human-video recording exists.
- [ ] Both media files are readable.
- [ ] Exact source paths are recorded.
- [ ] Source files are preserved without destructive modification.
- [ ] The approved narration script is available.
- [ ] Phase 14B can still be reproduced.
- [ ] The correction scope remains limited to the existing proof.
- [ ] Any proposed paid provider call has explicit authorization.

## Required Corrections

The beta test must evaluate all eight approved corrections.

### Correction 1 — Progressive echo reveal

Begin with one dominant human.

Reveal synthetic echoes progressively.

### Correction 2 — Continuous echoes composition

Treat Beats 1 and 2 as one continuous visual composition.

Do not crossfade the same plate into itself.

### Correction 3 — Stronger phone-call and catfishing shift

Create an unmistakable internal state change during Beat 4.

Avoid literal phone, dating-app, or social-media interface imagery.

### Correction 4 — Continuous reflection composition

Treat Beats 3 and 4 as one continuous visual composition.

Do not crossfade the same plate into itself.

### Correction 5 — Replace multiplication plate

Remove the stylistically inconsistent Phase 14A.1 abstract multiplication frame.

Use:

- An approved Direction A human plate, or
- One isolated approved synthetic figure multiplied through Remotion

### Correction 6 — Strengthen Manufactured Consensus

Make the following unmistakable at normal playback size:

- Per-figure synchronization
- Convergence
- Shared output band
- Final lockstep state

### Correction 7 — Lee recording remains reference only

Do not use Lee's recording as final production narration.

### Correction 8 — Use clean approved-script narration

The beta proof must use a clean recording of the approved script.

## Test Environments

## Development review

Use for:

- Frame inspection
- Timing changes
- Debugging
- Rapid iteration

Typical environment:

- Local Ubuntu workstation
- Remotion preview
- Repository virtual environment
- Local source media

## Draft render review

Use for:

- Normal-speed review
- Audio synchronization
- Transition testing
- Phone-scale evaluation

Recommended:

- 1280×720
- H.264
- AAC
- 30 fps
- Concurrency 1

## Full-resolution still review

Use:

- 1920×1080 stills
- Contact sheets
- Transition-boundary frames
- Word-anchor frames

## Phone-scale review

Review output at an approximate mobile viewing width.

The concept must remain understandable without zooming or pausing.

## Test Evidence Requirements

Each test result must include:

- Test ID
- Date
- Composition or file tested
- Source commit
- Exact command
- Output path
- Result
- Reviewer
- Notes
- Screenshot or contact sheet where useful

Do not record only “looks good.”

## Test Matrix

# A. Input Media Validation

## BT-A01 — Clean narration file exists

### Procedure

```bash
test -f /path/to/clean-narration && echo PASS || echo FAIL
file /path/to/clean-narration
ffprobe -hide_banner /path/to/clean-narration
```

### Pass criteria

- File exists
- File is readable
- Container and codec are recognized
- Duration is plausible
- No obvious corruption

## BT-A02 — Human-video file exists

### Procedure

```bash
test -f /path/to/human-video && echo PASS || echo FAIL
file /path/to/human-video
ffprobe -hide_banner /path/to/human-video
```

### Pass criteria

- File exists
- File is readable
- Resolution is known
- Frame rate is known
- Rotation metadata is understood
- Duration is plausible

## BT-A03 — Original media preservation

### Pass criteria

- Originals remain untouched
- Working copies are distinct
- No destructive overwrite
- Source paths are recorded

# B. Narration Validation

## BT-B01 — Script fidelity

### Procedure

Transcribe the clean narration with word timestamps and compare it with the approved script.

### Pass criteria

- No missing required sentence
- No material wording changes
- No unapproved additions
- Minor delivery variations documented
- Approved script remains authoritative

## BT-B02 — Word-level alignment

### Pass criteria

- Required spoken anchors are located
- Timestamps come from real spoken words
- No invented markers
- Low-confidence words are flagged
- Silence boundaries are reviewed

## BT-B03 — Audio technical quality

### Review

- Clipping
- Excessive noise
- Dropouts
- Plosives
- Distortion
- Inconsistent levels
- Unusable room echo

### Pass criteria

Audio is suitable for proof-level creative review.

This does not automatically mean final mastering is complete.

## BT-B04 — Lee-audio exclusion

### Pass criteria

- Final Phase 14B.1 proof does not use Lee's narration
- Lee's recording remains only a timing reference
- No accidental fallback path points to the old proof audio

# C. Baseline Reproduction

## BT-C01 — Existing Phase 14B composition registers

### Pass criteria

```text
Aepoch-E001-Phase14B-Proof
```

is still discoverable and renders or previews.

## BT-C02 — Existing Phase 14B proof matches baseline

### Review

Compare:

- Duration
- Beat boundaries
- Plate selection
- Transitions
- Audio
- Contact sheets

### Pass criteria

No unexplained regression exists before Phase 14B.1 edits begin.

## BT-C03 — Baseline files remain preserved

### Pass criteria

- Phase 14B source remains available
- Phase 14B preview remains available
- Phase 14B QA artifacts remain available
- Phase 14B can be compared directly against Phase 14B.1

# D. Correction-Specific Visual Tests

## BT-D01 — Dominant-human opening

### Review frames

- Frame 0
- Early reveal
- Mid reveal
- Full echo state

### Pass criteria

- One human reads as dominant at the opening
- Echoes appear progressively
- The opening does not reveal the entire crowd immediately
- The reveal remains clear at normal speed

## BT-D02 — Beats 1 and 2 continuity

### Pass criteria

- No same-plate crossfade
- No visible reset
- No blank frame
- Internal state change carries the transition
- The composition reads as one continuous idea

## BT-D03 — Phone-call/catfishing visual shift

### Pass criteria

- The state change is unmistakable at normal speed
- The shift remains within the Direction A family
- No literal phone UI
- No dating-app UI
- No generic platform imagery
- The change supports the narration rather than distracting from it

## BT-D04 — Beats 3 and 4 continuity

### Pass criteria

- No same-plate crossfade
- No visible reset
- The reflection concept persists continuously
- Beat 4 develops the existing state rather than restarting it

## BT-D05 — Multiplication replacement

### Pass criteria

- Old abstract multiplication plate is absent
- Replacement uses approved Direction A vocabulary
- Multiplication is deterministic
- Human or synthetic figure proportions remain consistent
- No primitive Phase 13C.2A human component is reintroduced
- The multiplication concept is clear at normal playback speed

## BT-D06 — Manufactured Consensus synchronization

### Pass criteria

- Individual figures visibly synchronize
- Convergence is understandable
- The shared output band is visually dominant enough
- Final lockstep state is unmistakable
- The concept works without pausing
- The result remains legible at phone scale

# E. Transition Tests

## BT-E01 — No blank transition frames

### Procedure

Create a transition contact sheet spanning every beat boundary.

### Pass criteria

- No white frame
- No black frame
- No unintended empty frame
- No opacity collapse
- No missing asset

## BT-E02 — No repeated-plate crossfade artifacts

### Pass criteria

- Beats 1–2 have internal continuity
- Beats 3–4 have internal continuity
- No visual flash caused by identical source plates

## BT-E03 — Transition timing

### Pass criteria

- Transitions occur on or near intended spoken anchors
- Transitions do not obscure key visual information
- No perceptible timing drift

# F. Timing Tests

## BT-F01 — Composition duration

### Pass criteria

Duration matches the approved narration segment.

Any duration change must be explained by the clean narration timing.

## BT-F02 — Spoken-anchor alignment

Review all major visual changes against real words.

### Required anchors include

- Something's off
- Comments that sound human
- Faster than humans can type
- Lips do not quite sync or actual clean-script equivalent
- Catfished
- Bots can create accounts
- Voice clones
- Never sleep
- Billions of fake accounts
- Manufacturing consensus

### Pass criteria

- Visual actions are attached to actual spoken words
- Markers reflect the clean narration
- No marker is copied blindly from Lee's recording

## BT-F03 — Audio/video drift

### Pass criteria

No perceptible drift across the complete proof.

# G. Technical Tests

## BT-G01 — TypeScript regression test

### Pass criteria

- Zero new diagnostics relative to the documented baseline
- Pre-existing diagnostics remain clearly separated

## BT-G02 — Determinism

### Procedure

Render the same still or short clip twice.

Compare hashes:

```bash
sha256sum first-output second-output
```

### Pass criteria

Byte-identical where the rendering path is expected to be deterministic.

If encoding introduces nondeterminism, compare deterministic still frames or decoded frame hashes instead.

## BT-G03 — No `Math.random()`

### Procedure

```bash
grep -Rni "Math.random" \
  remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b*
```

### Pass criteria

No new use.

## BT-G04 — Runtime assets exist

### Procedure

Inspect all runtime paths referenced by the Phase 14B.1 source.

### Pass criteria

- Every referenced file exists
- Format is valid
- Dimensions are known
- Provenance is known
- No hidden dependency on missing local-only paths

## BT-G05 — Render completion

### Pass criteria

- Draft render completes
- Output file is valid
- Audio stream exists
- Video stream exists
- Duration matches expectation
- No fatal browser or Remotion error

# H. Brand and Creative Tests

## BT-H01 — Direction A consistency

### Pass criteria

- Echoes
- Reflection
- Multiplication
- Consensus

read as one coherent visual family.

## BT-H02 — Human credibility

### Pass criteria

- Adult proportions
- No chibi or mascot register
- No blank-eye artifact
- No personality-bearing synthetic accessories unless explicitly approved
- No primitive programmatic human replacement

## BT-H03 — Brand exclusions

### Fail immediately if the proof introduces:

- Generic hacker imagery
- Server racks
- Named platform logos
- Coin-drop imagery
- Generic robot hands
- Unapproved Moss
- Unapproved Signal
- Literal dating-app UI
- Literal social-platform UI

## BT-H04 — Playback-scale legibility

### Pass criteria

At normal speed and phone scale:

- Dominant human is clear
- Echo multiplication is clear
- Reflection uncertainty is clear
- Synthetic multiplication is clear
- Manufactured Consensus is clear

## BT-H05 — Creative pacing

### Pass criteria

- No scene feels static without intention
- No visual shift is too subtle
- No visual shift is gratuitously strong
- Major actions support the narration
- The proof feels authored rather than templated

# I. Audio-Visual Integration Tests

## BT-I01 — Narration remains intelligible

### Pass criteria

Music, effects, or visual emphasis do not impair narration comprehension.

## BT-I02 — Human-video integration

The exact use remains phase-dependent.

### Pass criteria

- Footage is technically clean enough
- Integration supports the proof
- Footage does not break the editorial visual family
- Color and framing feel intentional
- Human footage is not used merely because it exists

## BT-I03 — Final proof audio path

### Pass criteria

The composition points to the clean narration asset rather than the Phase 14B reference-derived proof audio.

# J. Review Deliverables

## BT-J01 — Full 720p proof

Required output:

```text
projects/aepoch-episodes/001-what-is-aepoch/renders/previews/phase-14b1/
```

Recommended filename:

```text
aepoch-e001-phase14b1-proof-720p.mp4
```

## BT-J02 — Clean proof contact sheet

Must show representative frames across all beats.

## BT-J03 — Word-alignment contact sheet

Must show visual states at required spoken anchors.

## BT-J04 — Transition contact sheet

Must show frames immediately before, during, and after every beat boundary.

## BT-J05 — Phone-scale contact sheet

Must show key frames at approximate mobile size.

## BT-J06 — QA report

Recommended path:

```text
projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b1-production-proof-review.md
```

The report must issue separate verdicts.

# Review Sequence

Use this order.

## Review 1 — Technical preflight

Confirm:

- Media inputs
- Runtime assets
- Source paths
- Composition registration
- TypeScript state
- Render viability

## Review 2 — Timing

Confirm:

- Clean narration
- Word markers
- Beat boundaries
- Duration
- Sync

## Review 3 — Correction scope

Confirm all eight corrections were implemented.

## Review 4 — Normal-speed creative review

Watch the proof without pausing.

Record:

- First impression
- Confusing moments
- Weak transitions
- Illegible concepts
- Timing problems

## Review 5 — Phone-scale review

Review the full proof and contact sheet at mobile scale.

## Review 6 — Frame-level review

Inspect:

- Transition frames
- Anchor frames
- Opening state
- Consensus resolution
- Multiplication frame

## Review 7 — Author verdict

The author assigns:

- Technical validation
- Workflow validation
- Timing validation
- Creative validation
- Public readiness

# Pass and Fail Rules

## Technical PASS

Requires:

- Successful render
- Valid audio and video
- No new type errors
- No missing runtime assets
- No blank transition frames
- Deterministic motion

## Workflow PASS

Requires:

- Asset-first hybrid method remains viable
- Production plates are treated through Remotion rather than used as static slides
- New media is integrated without breaking provenance or scope
- Provider calls remain controlled

## Timing PASS

Requires:

- Clean narration
- Word-level markers
- Correct spoken-anchor alignment
- No perceptible drift
- Documented deviations

## Creative PASS

Requires:

- All eight corrections resolved
- Concepts clear at normal speed
- Direction A family remains coherent
- Proof feels public-quality
- No blocking brand issue

## Public-ready YES

Requires all of:

- Technical PASS
- Workflow PASS
- Timing PASS
- Creative PASS
- Clean narration approved
- Final proof reviewed
- Explicit author approval

# Failure Categories

Use one of:

- `technical-blocker`
- `timing-blocker`
- `asset-blocker`
- `creative-blocker`
- `brand-blocker`
- `scope-violation`
- `provider-blocker`
- `documentation-blocker`

# Automatic Fail Conditions

Phase 14B.1 automatically fails public readiness if:

- Lee's narration remains in the final proof
- The old multiplication plate remains
- Same-plate crossfades remain in Beats 1–2 or 3–4
- Manufactured Consensus remains too subtle
- Echoes are fully visible from frame 0
- A primitive Phase 13C.2A human is reintroduced
- A hard brand exclusion appears
- The full episode is started before proof approval
- Required evidence is missing
- The author does not explicitly approve public readiness

# Correction Loop

If the result is not public-ready:

1. Record exact failed test IDs.
2. Classify each failure.
3. Define the smallest correction phase.
4. Preserve the Phase 14B.1 baseline.
5. Do not broaden into full-episode work.
6. Update current state.
7. Update troubleshooting.
8. Record any new decision.
9. Repeat only the failed test areas plus regression checks.

# Evidence Log Template

```markdown
## BT-<ID> — <Test name>

- Date:
- Commit:
- Composition:
- Command:
- Output:
- Reviewer:
- Result: PASS | FAIL | BLOCKED
- Notes:
- Related files:
```

# Final Review Table Template

| Axis | Verdict | Evidence |
|---|---|---|
| Technical validation | PASS / FAIL | |
| Asset-first workflow | PASS / FAIL | |
| Word-level timing | PASS / FAIL | |
| Creative validation | PASS / CONDITIONAL PASS / FAIL | |
| Public-ready | YES / NO | |

# Authorization After PASS

A successful Phase 14B.1 does not automatically begin full Episode 001 production.

After public-ready approval:

1. Update `knowledge/state/current-state.md`.
2. Record the approval in `knowledge/log.md`.
3. Add or update a decision authorizing the next phase.
4. Define the full-episode production phase.
5. Confirm asset and provider budgets.
6. Confirm final narration and human-video strategy.
7. Begin only after explicit author authorization.
