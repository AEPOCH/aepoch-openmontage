---
type: Production Review
title: Phase 16 Retimed Storyboard Review
description: Executive-producer review of the human-narration scene retiming.
status: stable
project_state: confirmed
generated:
  by: codex
  at: 2026-08-02T18:00:00+01:00
sources:
  - id: timing-handoff
    resource: ../../../docs/aepoch-production-playbook/prompts/phase-16-human-narration-timing-lock.md
    title: Human narration timing-lock handoff
  - id: word-alignment
    resource: ../../../projects/aepoch-blog-pilot-what-is-aepoch/assets/audio/chris/canonical_word_alignment.json
    title: Canonical word alignment
  - id: retimed-scene-plan
    resource: ../../../projects/aepoch-blog-pilot-what-is-aepoch/artifacts/scene_plan.json
    title: Retimed scene plan
---

# Phase 16 Retimed Storyboard Review

## Verdict

**REVISION REQUIRED.** Section timing, narration confirmation, exact timeline
coverage, and the timing-only creative constraint pass. The internal scene
retiming does not pass Gate 4 because proportional scaling placed eight visual
cuts inside spoken words. The handoff required scene changes on corresponding
real words or purposeful pauses.

## Blocking findings

| Scene beginning | Cut (s) | Spoken word crossed | Word span (s) |
|---|---:|---|---:|
| `hook-2b` | 21.009 | digital | 20.97-21.31 |
| `build-1b` | 82.010 | Code | 81.73-82.03 |
| `build-2b` | 100.165 | not | 100.09-100.33 |
| `build-5b` | 157.886 | form | 156.91-158.03 |
| `build-7b` | 191.829 | everyone | 191.82-192.12 |
| `climax-2-sceneB` | 214.658 | and | 214.16-215.08 |
| `landing-1b` | 248.351 | is | 248.17-248.71 |
| `tail-hold-mark` | 261.729 | and | 261.61-262.07 |

The last finding is additionally a semantic contradiction: `tail-hold-mark`
is described as having “no narration,” but narration continues through the
last word at approximately 263.39s.

## Required correction

Move each affected internal boundary to an intentional nearby word onset,
word end, or measured pause that supports the unchanged approved visual
concept. `tail-hold-mark` must not begin before the last spoken word ends.
Recheck every internal scene boundary, exact 0-280 coverage, duration limits,
cue containment, schema validity, and the timing-only semantic diff. No visual
concept or non-timing field may change.

---

## Correction Applied — 2026-08-02

All 8 flagged cuts were moved to the exact real word edge nearest the
original cut, matching this report's own word spans:

| Scene boundary | Old cut (s) | New cut (s) | Real word edge used |
|---|---:|---:|---|
| `hook-2a`/`hook-2b` | 21.009 | 20.970 | onset of "digital" |
| `build-1a`/`build-1b` | 82.010 | 82.030 | end of "Code" |
| `build-2a`/`build-2b` | 100.165 | 100.090 | onset of "not" |
| `build-5a`/`build-5b` | 157.886 | 158.030 | end of "form" |
| `build-7a`/`build-7b` | 191.829 | 191.820 | onset of "everyone" |
| `climax-2-sceneA`/`climax-2-sceneB` | 214.658 | 215.080 | end of "and" |
| `landing-1a`/`landing-1b` | 248.351 | 248.170 | onset of "is" |
| `tail-hold-mark` start | 261.729 | 263.390 | real narration end (no-narration constraint) |

A full programmatic audit of every other internal and cross-section boundary
(not just the 8 listed above) found **two additional violations** this
report did not catch: `setup-2a`/`setup-2b` at 62.332s (inside "still",
62.060-62.340) and `build-4a`/`build-4b` at 139.225s (inside "scroll,",
139.210-139.690). Both corrected the same way (nearest real word edge:
62.340 and 139.210 respectively).

`tail-hold-mark` now begins exactly at the real narration end (263.39s,
confirmed zero spoken words at or after that point) and holds for its
original, already-approved 12.0s design maximum; `tail-release` absorbs the
remaining 4.61s, still within the playbook's 3.0-12.0s range.

Re-verified: schema-valid, exact 0.0-280.0s coverage across 32 scenes with no
gaps or overlaps, zero of the 33 unique scene-boundary points lie strictly
inside any of the 627 canonical spoken-word intervals, every enhancement cue
remains within its owning section and a scene, every scene falls within
3.0-12.0s, and the variation checker (strong/0.6) and slideshow-risk checker
(strong/0.42) are unchanged from the pre-correction scene plan. `script.json`
was not modified -- out of scope for this correction. Full detail:
`knowledge/log.md`, 2026-08-02 "Scene-retiming boundary correction executed"
entry.

## Monty Re-review — 2026-08-02

**Final verdict: PASS. Gate 4 is closed.** Monty independently reproduced the
boundary audit after commit `75f26fa`:

- zero internal scene boundaries lie strictly inside any canonical spoken-word
  interval;
- all 32 scenes cover exactly 0.0-280.0s with no gaps or overlaps;
- every scene duration is within the active 3.0-12.0s guidance;
- `tail-hold-mark` begins at 263.39s, exactly at the locked narration end, and
  `tail-release` is also narration-free;
- the corrected tail comprises a 12.0s mark hold and 4.61s release;
- no asset generation, audio processing, composition, or rendering occurred.

The corrected human-performance timing is approved as the production timing
source. Further work requires a separate tracked assets-stage handoff.
