---
type: Project State
title: ÆPOCH OpenMontage Current State
description: Verified production status, completed phases, current pause, blockers, and next executable action for Episode 001.
status: draft
project_state: confirmed
generated:
  by: chatgpt
  at: 2026-07-30T15:40:00+01:00
sources:
  - id: repository-baseline
    resource: ../raw/terminal-logs/2026-07-30-post-phase14b-baseline.txt
    title: Post-Phase-14B repository baseline
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

# ÆPOCH OpenMontage Current State

## Current Position

- **Repository branch:** `aepoch-series`
- **Current repository HEAD:** `0c29fae`
- **Phase 14B implementation commit:** `63a232e`
- **Current episode:** `001-what-is-aepoch`
- **Episode type:** Pre-launch countdown, Video 1
- **Working title:** `What is ÆPOCH?`
- **Last completed production phase:** Phase 14B
- **Next production phase:** Phase 14B.1
- **Phase 14B.1 status:** Not started
- **Full Episode 001 production:** Blocked pending Phase 14B.1 approval
- **Production state:** Paused for new human-video recording and clean narration recording

## Repository and Git Policy

Only the `knowledge/` directory is managed by the knowledge-system Git workflow.

Other modified or untracked files in the repository may be intentionally excluded by design and must not be staged by documentation commands.

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

## Locked Baselines

### Tier 1 motion baseline

- **Tag:** `aepoch-tier1-beta-v0.1.0`
- **Commit:** `a41e3fb`

### Episode 001 static baseline

- **Tag:** `aepoch-e001-static-v0.1.0`
- **Commit:** `16b7141`

### Episode 001 timing baseline

- **Tag:** `aepoch-e001-timing-v0.1.0`
- **Commit:** `0c57456`

### Provider stack baseline

- **Tag:** `aepoch-provider-stack-v0.1.0`
- **Commit:** `5895462`

### Asset-first proof baseline

- **Tag:** `aepoch-e001-asset-first-proof-v0.1.0`
- **Commit:** `63a232e`

## Production Decision Summary

The primitive Remotion-first motion-blocking approach from Phase 13C.2A is not an approved production baseline.

It remains useful as:

- A technical reference
- A timing reference
- A source of proven transition architecture
- Evidence that deterministic full-episode composition is technically feasible

It must not be reused as the final creative direction because:

- Programmatic SVG human figures lacked production quality
- Primitive metaphor scenes lacked visual sophistication
- Phrase-level synchronization was not precise enough
- The resulting proof failed creative review

The approved direction is an **asset-first hybrid workflow**:

1. Generate or select approved editorial illustration plates.
2. Use those plates as visual assets rather than complete finished scenes.
3. Apply deterministic Remotion-native motion, masking, camera movement, geometry, transitions, and brand-state changes.
4. Synchronize scene changes to real word-level timestamps.
5. Keep generated imagery and programmatic motion under explicit human creative review.

## Completed Work

### Phase 10 — Production asset system

Completed the production asset library and ÆPOCH brand-system foundations.

### Phase 12 — Tier 1 module system

Completed six Tier 1 Remotion modules, including:

- Static review
- Motion implementation
- Caption support
- Transition correction
- Reduced-motion testing
- Baseline lock

### Phase 13A — Episode 001 pre-production

Completed:

- Episode brief
- Approved narration script
- Scene plan
- Written storyboard

### Phase 13A.1 — Scene-plan refinement

Locked:

- 22 scenes
- 719-word narration
- Approximate runtime of 5:20 at 135 words per minute
- 63.6% Tier 1 direct reuse or variant reuse
- 36.4% requiring new or unimplemented modules
- Factual claims
- Source outline
- No visible citation requirement

### Phase 13B — Static reference production

Completed the Episode 001 static source scaffold and rendered the required reference frames and contact sheets.

Verified:

- No modification to the frozen Tier 1 baseline
- Deterministic repeat rendering
- No new TypeScript diagnostics beyond the baseline
- Moss and Signal exclusions respected where required

### Phase 13B.1 — Static creative correction

Corrected:

- Human proportions
- Dark-scene scale
- Manufactured Consensus composition
- Uncertain Reflection composition
- Extraction composition
- Traffic-data layout
- 42-day-test layout
- Outro mark scale

### Phase 13B.2 — KeyStatement differentiation

Replaced repetitive KeyStatement layouts with differentiated episode-specific compositions.

Added:

- `SignalVesica`
- `BreathRings`

Preserved one canonical KeyStatement scene as the reference baseline.

### Phase 13C.1 — Performance analysis and timing lock

Analyzed Lee's 314.665-second reference recording as a pacing and performance reference only.

Produced:

- `reference/lee/lee-performance-map.md`
- `inputs/scene-timing-map.yaml`

Key conclusion:

Lee's reference video is not an approved visual or audio production source. It contains extensive generic AI B-roll and imagery that conflicts with the ÆPOCH brand system.

### Phase 13C.2A — Complete motion-blocking draft

Implemented deterministic motion for all 22 scenes.

Registered:

- `Aepoch-E001-MotionBlocking`
- `Aepoch-E001-MotionBlocking-Reduced`

Technical result:

- PASS

Creative result:

- FAIL
- Production baseline rejected

The source remains retained as a technical and timing reference only.

### Provider hardening

Functionally verified:

- fal.ai Recraft generation
- Pexels search and download
- Pixabay search and download
- `faster-whisper` import in the project virtual environment

Registry-verified but not yet functionally exercised:

- FLUX generation path beyond the later Kontext edit workflow
- Kling
- Veo
- MiniMax

Known provider findings:

- Recraft `vector_illustration` returns SVG rather than PNG.
- The live Recraft endpoint accepts fewer style values than the tool registry advertises.
- Literal negative-exclusion-list prompt wording can trigger moderation.
- Positive-only prompt framing is required.
- Pixabay may return PNG content under a `.jpg` default filename.

### Phase 14A.1 — Illustration direction exploration

Generated 12 editorial illustration candidates across three visual directions and four narrative beats.

Outcome:

- No direction passed all four frames cleanly.
- Direction A, Editorial Geometric, was selected as the production base.

### Phase 14A.2 — Direction A convergence test

Tested Direction A across:

- Human Among Synthetic Echoes
- Uncertain Digital Reflection
- Manufactured Consensus

Approved or retained assets included:

- `echoes-a`
- `reflection-a`
- `reflection-b`

Manufactured Consensus remained unresolved as a clean generated image.

### Phase 14A.3 — Manufactured Consensus repair

Used FLUX Kontext reference-image editing to repair the Manufactured Consensus slot.

Outcome:

- Technical validation: PASS
- Creative validation: FAIL
- The image improved but did not fully resolve the visual concept

### Phase 14B — Production-quality visual proof

**Status:** Complete

Built a 47-second proof segment:

- **Duration:** 47.00 seconds
- **Frames:** 1410
- **Frame rate:** 30 fps
- **Composition:** `Aepoch-E001-Phase14B-Proof`
- **Source directory:** `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/`

The proof covers narration beats N06–N09.

#### Assets used

- `echoes-a`
- `reflection-a`
- `consensus-edit-a`
- One Direction A multiplication frame from Phase 14A.1

No new image-generation or image-editing calls were made during Phase 14B.

#### Word-level timing

Ran `faster-whisper` locally using:

- Model: `small`
- Device: CPU
- Compute type: `int8`
- Word timestamps enabled

All ten required spoken markers were located from the real recording rather than estimated.

The extracted timing record is:

```text
inputs/phase-14b-proof-word-timings.json
```

Exact proof boundaries:

- Start: 52.60 seconds
- End: 99.60 seconds
- Duration: 47.00 seconds

Audio was extracted from Lee's recording without:

- Time stretching
- Normalization
- Equalization
- Denoising

Lee's recording remains a timing reference only.

#### Phase 14B beats

1. **Something's Off**
   - Uses `echoes-a`
   - Paper edge-wash reveal

2. **Comments and Rapid Responses**
   - Continues the echoes concept
   - Mechanical color-state strobe on the speed reference

3. **Uncertain Video Identity**
   - Uses `reflection-a`
   - Restrained registration wobble

4. **Phone Calls and Catfishing**
   - Continues the reflection concept
   - Pan and tint-state refresh

5. **Synthetic Multiplication**
   - Uses a Direction A multiplication frame
   - Crop-pan and deterministic highlight sweep

6. **Manufactured Consensus**
   - Uses `consensus-edit-a` as a figure plate
   - Adds deterministic synchronization markers and a shared output band through Remotion geometry

#### Phase 14B output

Rendered:

- One full 720p preview
- One clean proof contact sheet
- One word-alignment contact sheet
- One transition contact sheet

Verified:

- No blank transition frames
- No new TypeScript diagnostics beyond the existing baseline
- No Moss
- No Signal
- No `Math.random()`
- No primitive human components in the new Phase 14B source

#### Phase 14B review verdict

| Axis | Verdict |
|---|---|
| Technical validation | PASS |
| Asset-first hybrid workflow | PASS |
| Word-level synchronization method | PASS |
| Creative proof | CONDITIONAL PASS |
| Public-ready | NO |

The Phase 14B proof is suitable only as an internal pipeline demonstration.

It is not approved for public release.

The full Episode 001 build must not begin from this proof without completing and approving Phase 14B.1.

## Current Phase — Phase 14B.1

**Status:** Not started

Phase 14B.1 is a polish pass on the existing 47-second proof.

It is not:

- A new proof from scratch
- A full Episode 001 build
- An episode-scale asset-generation phase

## Required Phase 14B.1 Corrections

1. Begin with one dominant human and reveal synthetic echoes progressively.
2. Treat Beats 1 and 2 as one continuous echoes composition.
3. Strengthen the internal visual shift during the phone-call and catfishing narration.
4. Treat Beats 3 and 4 as one continuous reflection composition.
5. Replace the inconsistent synthetic-multiplication plate.
6. Make Manufactured Consensus synchronization unmistakable at normal playback size.
7. Continue using Lee's recording only as the timing reference.
8. Replace Lee's reference audio with a clean recording of the approved script for final production.

## Current Production Pause

Production is paused while the author records:

- New human video
- A clean narration performance of the approved script

During the recording session, do not run:

- Claude production sessions
- Remotion renders
- Image generation
- Image editing
- Episode builds

Phase 14B.1 begins only after the author explicitly confirms that the recording session is complete.

## Active Blockers

### Blocker 1 — New recording dependency

Phase 14B.1 requires the author to complete the clean narration recording and new human-video capture.

### Blocker 2 — Creative correction approval

The eight Phase 14B.1 corrections must be implemented and reviewed before the proof can become public-ready.

### Blocker 3 — Full-episode authorization

Full Episode 001 production is explicitly blocked until Phase 14B.1 passes review.

### Blocker 4 — Final audio replacement

Lee's reference recording cannot be used as final production audio.

## Immediate Next Action

The author must explicitly signal that the recording session is complete and identify the repository or filesystem locations of:

1. The clean narration recording
2. The new human-video recording

After those inputs are available, begin Phase 14B.1 by validating the media files and updating the proof timing against the clean narration.

## Verification Criteria for Phase 14B.1 Start

Phase 14B.1 may begin only when:

- The recording pause has been explicitly lifted
- The clean narration file exists and is readable
- The human-video source exists and is readable
- The clean narration matches the approved script closely enough for timing alignment
- The existing Phase 14B proof remains reproducible
- The correction scope remains limited to the existing 47-second proof

## Verification Criteria for Phase 14B.1 Completion

Phase 14B.1 is complete only when:

- All eight required corrections have been implemented
- The proof uses the clean narration recording
- Beats 1 and 2 read as one continuous composition
- Beats 3 and 4 read as one continuous composition
- Synthetic multiplication uses an approved visual vocabulary
- Manufactured Consensus is legible at normal playback size
- Technical validation passes
- Word-level synchronization passes
- Creative review passes
- The author explicitly approves the proof as public-ready or records a new correction phase

## Relevant Files

### Production state and phase history

- `docs/aepoch-production-playbook/CURRENT_STATE.md`
- `docs/aepoch-production-playbook/PHASE_LOG.md`
- `docs/aepoch-production-playbook/PROVIDER_SETUP.md`

### Phase 14B implementation

- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/assets.ts`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/audio.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/beats.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/composition.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/consensus-geometry.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/plate.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/timeline.ts`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/transitions.tsx`
- `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/types.ts`

### Phase 14B timing and review

- `projects/aepoch-episodes/001-what-is-aepoch/inputs/phase-14b-proof-word-timings.json`
- `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-production-proof-review.md`

### Phase 14B render

- `renders/previews/phase-14b/aepoch-e001-phase14b-proof-720p.mp4`

## Contradictions and Superseded State

The earlier conversational assumption that the project was near the end of Phase 4 is superseded.

Repository and production-playbook evidence confirms that:

- Phase 14B is complete
- Phase 14B.1 is next
- The full Episode 001 build has not been authorized
- The current production proof is not public-ready
