---
type: Report
title: Phase 16 Human Narration and Timing Gate — Executive Producer Review
status: stable
project_state: blocked
verified:
  by: process:executive-producer-human-narration-review
  at: 2026-08-02T17:25:00+01:00
sources:
  - id: source-recording
    resource: ../../../projects/aepoch-blog-pilot-what-is-aepoch/assets/audio/chris/chrisnarration.mp4
    title: Chris human narration source
  - id: deviation-report
    resource: ../../../projects/aepoch-blog-pilot-what-is-aepoch/assets/audio/chris/deviation_report.md
    title: Script comparison and deviation report
  - id: timing-map
    resource: ../../../projects/aepoch-blog-pilot-what-is-aepoch/assets/audio/chris/proposed_timing_map.json
    title: Proposed real-performance timing map
  - id: technical-analysis
    resource: ../../../projects/aepoch-blog-pilot-what-is-aepoch/assets/audio/chris/source_technical_analysis.json
    title: Narration technical analysis
---

# Phase 16 Human Narration and Timing Gate — Executive Producer Review

## Verdict

**PASS PENDING TWO HUMAN EAR CHECKS.** The new recording is complete,
intelligible, unclipped, and fits the 280-second target without time
compression. No substantive omission, addition, repeated line, false start, or
structural deviation was detected. Two low-confidence ASR substitutions must
be confirmed by Chris before timing lock.

## Checks passed

- Original MP4 preserved unchanged and checksummed.
- Derived 48 kHz mono PCM WAV verified; it is correctly documented as an
  analysis derivative, not a fidelity improvement over the source AAC.
- All 17 approved sections are present and in canonical order.
- Canonical script: 627 spoken words; ASR differences are overwhelmingly
  punctuation/tokenization or expected ÆPOCH recognition noise.
- Speech begins around 2.1–2.9s and ends around 263.4–263.5s.
- Container duration: 269.291s; detected speech fits inside the 280s target
  with approximately 16.5s after the speech end, or 10.7s after the full
  container.
- No time compression is required.
- No clipping, dropout, DC-offset problem, or channel failure detected.
- Human narration is correctly recorded as the active choice, superseding the
  ElevenLabs production path while preserving all failed TTS evidence.

## Human checks required

1. At approximately **2:04.43** (124.43s), confirm the line says
   “What **if** the one resource...” rather than “What **of** the one
   resource...”. ASR confidence was only 0.75 on the disputed word.
2. At approximately **3:15.78** (195.78s), confirm the line says
   “how **loud** your voice...” rather than the nonsensical ASR split
   “low out your voice.” The second ASR token had confidence 0.582, making an
   ASR error likely.

The “ore mined”/“or, mind” result at 1:56.75 has only 0.177 confidence on the
first ASR token and is a near-homophone; it is treated as recognition noise,
not a credible script deviation. “That's” versus “That is” is semantically
identical and non-blocking.

## Technical follow-up

The narration is quiet: -33.6 LUFS integrated with -11.8 dBFS true peak. This
is usable source audio, not a reason to rerecord, but a later non-destructive
mastering derivative will need gain/loudness normalization before mixing. No
processing was authorized or applied during intake.

## Timing consequence

The human performance changes section boundaries relative to the synthetic
144-WPM plan. After Chris confirms the two words, the proposed real-performance
section/word timing map should become Gate 4's timing source, and the approved
scene plan must be retimed to those boundaries in a separate tracked tranche.
Narration text and visual concepts remain locked; only timeline boundaries and
cue placement should change.

## Current next action

Chris confirms the two audible words. Monty then prepares a tracked timing-lock
and scene-retiming handoff. No visual generation, composition, or render is
authorized before that confirmation.

---

## Human Confirmation — 2026-08-02

**Final verdict: PASS.** Chris confirmed by ear that the recording says:

- “What **if** the one resource...” at approximately 2:04.43
- “how **loud** your voice...” at approximately 3:15.78

Chris acknowledged a slight stumble on both phrases and explicitly accepted
the performance as usable. These are not script deviations and do not require
a rerecord. The raw ASR substitutions remain preserved as evidence, while the
canonical alignment may mark both words `human_confirmed: true`.

Gate 4 narration-content review is approved. The next step is a mechanical
timing-lock/scene-retiming tranche using the human performance as authority.
