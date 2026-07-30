# Phase 14B — Production-Quality Visual Proof Review

Episode: `001-what-is-aepoch`. A single 47.00-second production-quality proof
segment (narration beats N06–N09), built asset-first: three locked Direction
A / Editorial Geometric illustrations (`echoes-a`, `reflection-a`,
`consensus-edit-a`) plus one Direction A multiplication frame, treated
entirely through Remotion-native motion (crop, mask, camera, color-state,
brand geometry). No new image generation calls were made this phase. No
primitive React-drawn humans, no rejected Phase 13C.2A creative content, no
captions, no audio mastering, no full 1080p render.

## Exact audio boundaries

| | Value |
|---|---|
| Start | **52.60s** |
| End | **99.60s** |
| Duration | **47.00s** |
| Frames @30fps | **1410** |

Both boundaries were chosen inside a real `ffmpeg silencedetect` gap
(`-30dB`, min 0.1s) adjacent to the quoted script boundary, not on the raw
word timestamp itself (which would risk clipping onset/offset consonants):

- **Start** — anchor word "If" begins at 53.02s (faster-whisper). The
  preceding detected silence gap is 52.527s–53.375s; 52.60s sits inside it,
  giving a ~0.42s clean pre-roll before speech begins.
- **End** — anchor word "minds." ends at 99.24s. The following detected
  silence gap is 99.378s–99.711s; 99.60s sits inside it, giving a ~0.36s
  clean tail, before "Some" (the start of N10) begins at 99.90s.

Full evidence trail (gap timestamps, anchor words, method) is recorded in
`inputs/phase-14b-proof-word-timings.json`'s `proof_segment` block.

**Note on the 35–50s target:** the phrase-level estimate used in Phase
13C.1's `lee-performance-map.md` (N06 start ≈52.95s, N09 end ≈107.42s, an
implied ≈54.5s span) would have exceeded the 35–50s window. Real
word-level timestamps from this phase show the actual segment is
**47.00s** — comfortably inside the target. This is the expected outcome of
moving from phrase-level to word-level timing, not a discrepancy requiring
resolution.

## Transcription record

| Field | Value |
|---|---|
| Tool | faster-whisper (`./.venv/bin/python`) |
| Model | `small` |
| Device / compute type | `cpu` / `int8` |
| `word_timestamps` | `True` |
| `vad_filter` | `False` |
| `beam_size` | 5 |
| Full-file duration transcribed | 314.667s (the complete Lee reference recording) |
| Detected language | `en` (probability 1.0) |
| Elapsed transcription time | 723.6s |
| Word count in proof segment | 133 |

Full per-word output for the proof segment, plus the ten required markers,
is saved at `inputs/phase-14b-proof-word-timings.json`.

## Word-level marker confidence

All ten required markers were located as real faster-whisper word
timestamps — no value below is estimated or invented. **Several markers
reveal a genuine spoken-delivery deviation from the approved narration
script** (`inputs/narration-script.md` N06–N09); Lee's actual recorded words
differ from the approved script in minor ways at three of the ten anchor
points. Every deviation is disclosed here and in the JSON's
`spoken_deviation` field — no timestamp is invented for words that were
never spoken.

| Marker | Frame (of 1410) | Time | Spoken-delivery match |
|---|---:|---:|---|
| "something's off" | 97 | 3.23s | Exact match |
| "comments that sound human" | 136 | 4.53s | Exact match (script: "...but aren't") |
| "faster than humans can type" | 241 | 8.03s | Near-exact — Lee adds "that" ("Responses **that** get written...") |
| "lips don't quite sync" | 352 | 11.73s | **Deviation** — Lee actually says "Videos that look like people, but their lips aren't quite sinking." The words "the face looks right" do not occur anywhere in the recording. Anchored to the actual spoken words carrying the same meaning. |
| "catfished" | 593 | 19.77s | **Deviation** — Lee says "...you might be getting catfish." (no "-ed", different lead-in). Anchored to the actual spoken word "catfish." |
| "bots can create accounts" | 731 | 24.37s | Exact match |
| "voice clones" | 841 | 28.03s | Near-exact — Lee adds "and" between the two clone types |
| "never sleep" | 1061 | 35.37s | Exact match |
| "billions of fake accounts" | 1111 | 37.03s | Exact match |
| "manufacturing consensus" | 1276 | 42.53s | Near-exact — Lee says "consensus **and** attempting" (script has a comma) |

Confidence: **HIGH** for all ten — every marker is a directly observed word
in faster-whisper's transcript of the real recording (not a phrase-level
estimate, not a proportional/silence-snapped approximation as used in
Phase 13C.1). The two flagged deviations are delivery/transcript facts, not
timing-confidence issues.

## Selected assets and source phase

| Concept | Asset | Source phase | File |
|---|---|---|---|
| Human Among Synthetic Echoes | `echoes-a` | Phase 14A.2 (Round 2) | `assets/style-convergence/phase-14a2/human-among-synthetic-echoes/echoes-a.png` |
| Uncertain Digital Reflection | `reflection-a` | Phase 14A.2 (Round 1) | `assets/style-convergence/phase-14a2/uncertain-digital-reflection/reflection-a.png` |
| Manufactured Consensus (figure plate only) | `consensus-edit-a` | Phase 14A.3 | `assets/style-convergence/phase-14a3/consensus-edit-a.png` |
| Synthetic Multiplication | Direction A / Frame 3 | Phase 14A.1 | `assets/style-exploration/phase-14a1/direction-a-editorial-geometric/frame3-synthetic-multiplication.png` |

Per the creative lock: **`consensus-edit-a`**, not the phase-14A.3 QA
document's own recommended-best `consensus-edit-c`, was used — this is an
explicit author decision (`consensus-edit-a` is the strongest figure
rendering of the three edit candidates; the missing "resolve into one
output" device that made it fail its own phase is supplied here through
Remotion geometry, not another image-generation attempt). No other
Manufactured Consensus candidate (`consensus-a`, `consensus-b`,
`consensus-edit-b`, `consensus-edit-c`, or Phase 14A.1 Direction A/Frame 4)
appears anywhere in this composition. No new image-generation or
image-editing calls were made this phase — all four assets are copied
byte-for-byte from their locked phase outputs into
`remotion-composer/public/aepoch-e001-phase14b/` (verified via direct
Pillow signature/dimension checks: `echoes-a`/`reflection-a`/
`synthetic-multiplication` at 1344×768, `consensus-edit-a` at 1392×752 —
all genuine PNGs).

## Visual events mapped to spoken words

| Beat | Frames (overall) | Asset | Anchored events |
|---|---|---|---|
| 1 — Something's Off | 0–126 | `echoes-a` (tight crop, edge-washed) | Edge-wash reveal completes exactly at "something's off" (frame 97) |
| 2 — Comments and Rapid Responses | 126–290 | `echoes-a` (full reveal) | Full composition settles as "Comments that sound human" begins (frame 136); mechanical strobe pulses on "faster than humans can type" (frame 241) |
| 3 — Uncertain Video Identity | 290–400 | `reflection-a` | Restrained registration wobble gets one deliberate uptick on "lips don't quite sync" / actual "lips aren't quite sinking" (frame 352) |
| 4 — Phone Calls and Catfishing | 400–700 | `reflection-a` (continued, new crop/tint) | Measured pan + Iris→Prism tint-state refresh begins ~frame 530 (mid-beat refresh); holds through "catfished" / actual "getting catfish." (frame 593) |
| 5 — Synthetic Multiplication | 700–1082 | Direction A / Frame 3 | Continuous crop-pan from small readable cluster to dense block; markers at "bots can create accounts" (731), "voice clones" (841), "never sleep" (1061) |
| 6 — Manufactured Consensus | 1082–1410 | `consensus-edit-a` + Remotion geometry | Per-figure sync markers converge and a drawn-on Iris wave completes its resolution around "manufacturing consensus" (frame 1276); settles into one uniform rhythm through the proof's end |

## Consensus transformation implementation

`consensus-edit-a.png` is used strictly as a figure plate — no image model
was asked to generate another output device (per the phase brief). The
"resolve into one shared output" transformation, which failed across all
five prior generation attempts in Phases 14A.2/14A.3, is built entirely
from Remotion-native brand geometry in
`remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/consensus-geometry.tsx`:

1. **Figures enter with slight differences** — eight small sync-marker
   dots (one per figure, positioned by visual estimate over each figure's
   head) each pulse on a distinct deterministic phase/period (seeded hash,
   not `Math.random()`).
2. **Spacing becomes regular / timing synchronizes** — each marker's phase
   offset decays toward zero across ~7 seconds (`SYNC_DURATION` = 210
   frames), converging into lockstep.
3. **Cool Cosmos treatment increases** — a flat Iris tint wash ramps from
   0 to 0.22 opacity across the first ~8.7 seconds of the beat.
4. **A broad output band/waveform forms** — a single flat-colored Iris
   sine-wave line draws on (stroke-reveal) beside the figures over
   `WAVE_DURATION` = 230 frames (~7.7s), completing just after "manufacturing
   consensus" lands.
5. **Resolves into one uniform mechanical rhythm** — both the sync markers
   and the wave reach their fully-settled state with ~3.3s of beat runtime
   remaining, so the proof ends on stillness, not mid-motion.

No blob/puddle, control panel, giant arrow, tunnel, black void, megaphone,
platform logo, or server-rack shape appears anywhere in this device — it is
a single restrained stroked path plus small circular pulse markers, built
from the same circle/ring/arc vocabulary `VISUAL_LANGUAGE.md` and
`MOTION_TOKENS.md` already establish for the series.

## Transition behavior

The proven incoming-over-outgoing architecture (first established in Phase
12C, reused unmodified in Phase 13C.2A's `compositions.tsx`) is reused
structurally — never the rejected prototype's creative content, only its
transition mechanics: every beat paints an opaque background; the outgoing
beat's `<Sequence>` holds open 14 extra frames (its own settled final
frame), while the incoming beat is wrapped in `<CrossfadeIn>`, fading its
opacity 0→1 over its own first 14 frames on top of the still-visible
outgoing beat. `CROSSFADE_FRAMES = 14` (0.467s), inside `MOTION_TOKENS.md`'s
standard 12–18 frame / 0.4–0.6s transition token.

`qa/phase-14b-transition-contact-sheet.png` samples all five cuts (Beat1→2,
2→3, 3→4, 4→5, 5→6) at five points each (−3, 0, +3, +7, +13 frames relative
to the nominal cut). No blank/background-only frame appears at any sampled
point — the outgoing beat's artwork is visible under the incoming beat's
dissolve at every cut, confirmed by direct visual review of the sheet.

## Mobile readability

All four illustration plates are flat-vector, high-contrast, soft-corner
silhouettes with generous negative space at their native resolution — the
same readability profile Phase 14A.1/14A.2's own phone-scale contact sheets
already validated for `echoes-a`/`reflection-a`. The Beat 6 sync markers
(14px circles at 1920×1080) and the wave stroke (5px) remain individually
legible at the 1280×720 review-render scale; both would need a follow-up
phone-scale spot check before this proof is used in a vertical/social
context, which is out of this phase's scope.

## Render metadata

| Field | Value |
|---|---|
| Composition ID | `Aepoch-E001-Phase14B-Proof` |
| Logical canvas | 1920×1080 @ 30fps |
| Review render | 1280×720 (`--scale=0.6666666666666666`, exact 2/3) |
| Duration | 1410 frames / 47.00s (container-reported 47.061s — AAC encoder priming padding, not a frame-count or sync discrepancy; video stream frame count independently verified at exactly 1410 via `ffprobe -count_frames`) |
| Video codec | h264, crf 26 |
| Audio codec | aac, 128k |
| Concurrency | 1 (conservative; `free -h` showed ~8.5GiB/14GiB available immediately before render) |
| Output path | `renders/previews/phase-14b/aepoch-e001-phase14b-proof-720p.mp4` (4.6 MB) |
| Type-check | Clean — 15 pre-existing baseline diagnostics only (Explainer.tsx, Root.tsx's other compositions, TitledVideo.tsx, ProviderChip.tsx), zero new diagnostics from any `phase14b/` file |

## Known limitations

- Beat 4's mid-beat "refresh" (pan + Iris→Prism tint ramp) is deliberately
  restrained and reads subtly at normal viewing size — a reviewer scrubbing
  quickly could perceive Beats 3 and 4 as one continuous shot rather than
  two distinct beats. This is a defensible reading of "refresh without
  abandoning the established style," but is flagged as a candidate for a
  slightly stronger treatment if creative review disagrees.
- The Beat 6 sync-marker figure positions (`FIGURE_X_FRACTIONS` in
  `consensus-geometry.tsx`) are placed by direct visual estimate against the
  rendered image, not by any programmatic detection — verified by eye
  against the rendered stills (see contact sheets) but not pixel-measured.
- No phone-scale contact sheet was produced this phase (only the three
  required sheets) — mobile readability above is inferred from the assets'
  already-validated flat-vector profile, not freshly re-tested at phone
  scale for this specific composition.
- Two of ten required markers ("lips don't quite sync", "catfished") are
  anchored to real spoken words that deviate from the approved narration
  script, not to the exact script phrase quoted in the phase brief — see
  "Word-level marker confidence" above. The approved script itself was not
  modified.
- The audio segment's container-reported duration (47.061s) very slightly
  exceeds the exact 47.00s trim due to AAC encoder priming samples — a
  known, cosmetic encoder artifact; the underlying video frame count (1410)
  and the source WAV trim (exactly 47.000000s per `ffprobe`) are both exact.

## Creative-review status

**Awaiting creative review.** This document does not approve the proof as
production-ready — per this project's standing convention, creative
approval remains with the author.

## Pass/fail

**Technical validation: PASS.** Audio boundaries are grounded in real
faster-whisper word timestamps refined against detected silence gaps; all
ten required markers are located as real spoken words with disclosed
delivery deviations where they exist; the composition renders at the exact
frame count implied by the extracted audio; type-check is clean against
baseline; no primitive human components, no rejected Phase 13C.2A creative
content, no `Math.random()`, no Moss, no Signal, and no blank transition
frames were found in this phase's new code or render.

**Creative validation: PENDING** — awaiting author review of the rendered
proof, per the phase's stop condition.
