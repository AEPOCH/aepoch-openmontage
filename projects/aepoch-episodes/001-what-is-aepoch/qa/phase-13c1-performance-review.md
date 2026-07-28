# Phase 13C.1 — Performance Analysis and Timing Lock Review

Status: **PASS**
Review date: 2026-07-28
Scope: timing and performance-analysis only. Lee's recording is treated as a
pacing/performance benchmark, **not** an authoritative edit structure,
B-roll reference, or final soundtrack, per this phase's explicit
instructions. No animation, no captions, no episode assembly, no MP4
render. The approved narration, scene order, and tagged Tier 1 / Episode
001 static baselines were not modified.

## Preflight confirmation

1. **Current branch:** `aepoch-series`
2. **Locked Tier 1 tag:** `aepoch-tier1-beta-v0.1.0`
3. **Locked Episode 001 static tag:** `aepoch-e001-static-v0.1.0`
4. **Recording path:** `projects/aepoch-episodes/001-what-is-aepoch/reference/lee/lees-recording-review.mp4`
5. **Recording runtime/resolution/frame rate/audio format:** see Recording metadata below.
6. **Phase objective:** build a grounded performance/timing map connecting the
   26 approved narration beats, the 22 approved scenes, Lee's actual spoken
   pacing, natural pauses/emphasis, and internal visual developments needed
   within longer scenes — without treating the 135wpm estimate or Lee's edit
   structure as final.
7. **Stop condition:** stop after the Lee performance map, scene timing map,
   and this QA review are complete and validated — do not begin Phase
   13C.2 motion implementation.

## Recording metadata

| Property | Value |
|---|---|
| Container | MP4 (QuickTime/ISO base media) |
| Video codec | H.264 (High profile), yuv420p |
| Resolution | 1280×720 |
| Frame rate | 30000/1001 (≈29.97 fps) |
| Video frame count | 9,430 |
| Video duration | 314.648s |
| Audio codec | AAC-LC |
| Audio sample rate | 48,000 Hz |
| Audio channels | 2 (stereo) |
| Audio duration | 314.665s (authoritative — used throughout this phase) |
| File size | 39,991,559 bytes |
| Integrated loudness (whole file) | −24.4 LUFS |
| Loudness range (LRA) | 6.5 LU |
| True peak | −1.4 dBFS |

Measured via `ffprobe -show_format -show_streams` and `ffmpeg -af ebur128=peak=true`.
No cloud service was used; no upload occurred; a local 16kHz mono WAV
extraction was used for silence/volume analysis only and remains in the
gitignored scratch/temp area — **not committed**, per this phase's
instructions.

## Analysis methods

1. **`ffprobe`** — container/stream metadata (above).
2. **`ffmpeg silencedetect`** (noise floor −30dB, minimum duration 0.5s) on a
   16kHz mono extraction — 75 silence gaps ≥0.5s detected across the full
   314.665s recording; 37 of those are ≥0.7s (the phase's requested pause
   threshold).
3. **`ffmpeg ebur128`** — whole-file loudness/true-peak measurement (above).
4. **Keyframe (I-frame) packet inspection** (`ffprobe -show_packets`) — 58
   keyframes found. The first six sit on a perfectly regular ~8.34s GOP grid
   (no scene-change signal); all keyframes after that point deviate from
   that grid, which — combined with the visual spot-check below — confirms
   these later keyframes correspond mostly to genuine visual cuts (the
   recording is not one continuous static-camera take throughout).
5. **`ffprobe`-driven scene-change filter** (`select=gt(scene,0.35)` and a
   looser `0.15` threshold) — returned no usable frame timestamps for this
   file (the filter's output format didn't resolve `pkt_pts_time` for this
   stream); superseded by the keyframe-packet method above, which did work.
6. **Direct visual spot-checks** — 14 individual frames extracted at
   candidate beat-boundary timestamps and viewed directly, plus all 58
   keyframe timestamps extracted as thumbnails and reviewed together as one
   contact sheet. This is the method that surfaced this review's single
   most important finding — see "Estimated direct-address versus
   illustrative-screen balance" below.
7. **Proportional word-count timing + silence-gap snapping** — see
   `reference/lee/lee-performance-map.md`'s precision statement for the full
   method. Produced phrase-level (not word-level) timing for all 26 beats.

## Transcription/alignment tooling check

- No `faster-whisper`, `whisperx`, or `openai-whisper` Python package is
  installed on this machine (confirmed via `pip show` / `import` checks).
- No cached Whisper model files (`.pt`, `ggml*.bin`, or similarly named
  directories) were found anywhere on the filesystem.
- The repository's own `tools/analysis/transcriber.py` wraps
  `faster-whisper`/`whisperx` but depends on the same missing packages.
- Per this phase's explicit instructions ("do not download a large model
  without approval"), **no installation was attempted.** This phase
  proceeded entirely on the permitted fallback: phrase-level timing from
  script word counts + silence detection + waveform/visual spot-checks,
  with precision clearly labeled throughout the performance map and scene
  timing map (`MEDIUM`/`LOW` per boundary).

## Alignment precision

**Phrase-level (beat-level), not word-level.** 25 of 26 beat boundaries
snapped to a real detected silence gap within a 4-second tolerance
(`MEDIUM` confidence); one (the N15/N16 boundary, inside the Signal scene)
did not and keeps an unsnapped proportional estimate (`LOW` confidence).
See `lee-performance-map.md` for the full per-beat breakdown and explicit
recommendation to manually verify that specific boundary before locking any
frame-level Signal-scene animation timing.

## Actual runtime versus planned runtime

| | Seconds | mm:ss |
|---|---:|---:|
| Approved planning total (`scene-plan.yaml` `assembledTotalSeconds`) | 322.72 | 5:22.72 |
| Approved pure-narration estimate (135wpm) | 319.56 | 5:19.56 |
| Lee's actual recording runtime | 314.665 | 5:14.665 |
| Difference (Lee vs. pure-narration estimate) | −4.9s | Lee is faster |
| Difference (Lee vs. assembled planning total) | −8.05s | Lee is faster |

Lee's reference reads the same 719-word script about 5–8 seconds faster
than the planning estimates, even though several individual beats (N03,
N08, N10, N14, N16, N18) run *slower* than planned — the faster overall
total is driven by a handful of notably brisk beats (N09, N11) and generally
tighter pauses than a 135wpm flat estimate assumes, not uniformly faster
delivery throughout.

## Reference speaking rate

- **Overall:** 137.1 wpm (719 words ÷ 314.665s) — close to, and slightly
  above, the approved 135wpm planning figure.
- **Range across beats:** ~102wpm (N18, slowest) to ~200wpm (N09, fastest,
  flagged LOW confidence on the rate itself — see below).
- **Pattern:** the four slowest beats (N04, N18, N14, N03) are all
  declarative/thesis-adjacent or scene-setting lines; the fastest beats
  (N09, N11) are mid-hook description lines. This is consistent with real
  speakers naturally slowing for weight on statement-type lines — a useful,
  generalizable pattern for animation pacing beyond just this one recording.

## Major narration-section boundaries

Cross-referencing beat timing with the visual spot-check (below), three
structural regions emerge in Lee's cut:

1. **Direct address (~0–42s):** Welcome through the mission statement (N01–N04).
2. **Illustrative/cutaway-heavy (~42–235s):** the entire hook, symptom list,
   statistics, consequences, economic-system critique, Signal reveal,
   ancient-idea/modern-tools, and contribution passage (N05–N17) — nearly
   two-thirds of the whole recording.
3. **Direct address resumes (~235s onward, with two brief cutaways at
   ~262s and ~270s):** the 42-day invitation through the closing sign-off
   (N18–N26).

This maps onto the approved scene plan reasonably well — Scenes 1–3 are
approved as direct-address/`KeyStatement`, Scenes 4–17 are approved as
system-critique/symbolic modules (Void/Depth themed), and Scenes 18–22
return to Earth Rise — but Lee's specific *execution* of that middle
region (see below) is not one to carry forward.

## Major pause inventory

37 pauses ≥0.7s detected (full list of all 75 gaps ≥0.5s is in the analysis
scratch data; the ≥0.7s subset is reproduced with classification below).
Classification key: **Breath** (short, mid-clause), **Structural** (marks a
sentence/beat boundary), **Emotional** (marks a register shift), **Transition**
(marks a scene/visual change), **Uncertain** (ambiguous, possibly
edit-created).

| Time range | Duration | Likely narration position | Classification | Recommendation |
|---|---:|---|---|---|
| 9.39–10.73s | 1.34s | N01/N02 boundary | Structural | Complete stillness |
| 44.35–45.16s | 0.81s | Inside N05, near the darkCut | Transition | Transition (matches approved darkCut) |
| 75.25–76.39s | 1.14s | Inside N07 (symptom list) | Breath/Structural | Settling motion only |
| 99.36–100.44s | 1.08s | N08/N09 boundary | Structural | Complete stillness |
| 114.87–115.94s | 1.07s | Inside N10 (stats) | Breath | Complete stillness |
| 154.14–155.26s | 1.12s | Inside N12, before closing triad | Structural | New visual reveal (ExtractionStrands resolving) |
| **181.56–183.75s** | **2.19s** | **Inside N14, the hook's pivot line** | **Emotional/Structural** | **New visual reveal (human node entrance), then hold** |
| 195.75–196.90s | 1.15s | Inside N15 (Signal scene), LOW confidence | Uncertain | Possible Signal-resolve point; verify by ear |
| 219.76–221.08s | 1.33s | Inside N17 (contribution anaphora) | Breath | Settling motion only (restraint over motion) |
| 226.46–227.55s | 1.09s | Inside N18 | Breath | Complete stillness |
| 241.37–242.64s | 1.27s | N19/N20 boundary — likely return to direct address | Transition | Caption clearance + transition |
| **298.22–300.46s** | **2.23s** | **N24/N25 boundary — thesis to reflection** | **Emotional** | **Complete stillness — do not fill with animation** |

The two longest pauses in the entire recording (2.19s inside N14, 2.23s
between N24 and N25) are the strongest, best-grounded findings in this
analysis: both land at structurally significant points (the hook's pivot
line, and the thesis-to-reflection register shift), and both should be
protected as genuine holds, not filled with motion. **Not every pause was
filled with an animation recommendation** — most of the 37 are classified
as breath-only and recommended for complete stillness, consistent with this
phase's explicit instruction not to fill every pause.

## Visual-refresh cadence

Within the illustrative/cutaway-heavy region (~42–235s), keyframe-packet
analysis and direct frame review show a new distinct image roughly every
**5–7 seconds** on average (≈30 distinct illustrative images across ~193
seconds). This cadence — not the specific imagery — is the useful benchmark:
it falls squarely inside the phase's own target range of "a meaningful
visual development approximately every 4–8 seconds during dense explanatory
passages." The approved scene plan's internal-motion-beat recommendations
in `scene-timing-map.yaml` (e.g., `ep001-sc05`, `ep001-sc10`, `ep001-sc12`)
are calibrated against this cadence, using the episode's own symbolic
modules — not Lee's specific cutaway images.

## Estimated direct-address versus illustrative-screen balance

**This is the review's most important finding.** Direct visual review of
all 58 keyframe thumbnails (assembled into one contact sheet for review)
shows Lee's recording is **not** predominantly direct-to-camera. Approximate
breakdown (keyframe-granularity estimate, not frame-accurate):

- **Direct address (Lee speaking to camera):** ≈114s / ≈36% of the recording.
- **Illustrative cutaway imagery:** ≈201s / ≈64% of the recording.

The cutaway imagery is AI-generated illustrative/photorealistic content
(several frames carry a visible "NotebookLM" watermark) in a completely
different visual register from the approved ÆPOCH system — flat vector,
symbolic, restrained. Concretely observed cutaway content includes:

- A robotic hand typing on a keyboard (generic "AI" iconography).
- A hooded figure at a glowing green terminal screen.
- Multiple frames of literal server-rack corridors.
- A "Meta — 1 Hacker Way" billboard (a real, named platform/company logo).
- A literal bar chart titled "Bots Overtake Human Web Traffic."
- A hand dropping a coin into a wooden box.
- Distorted/warped human faces (uncanny, borderline horror-adjacent framing).
- A generic synthwave/cyberpunk grid-and-light-beam tunnel.
- Photorealistic/painterly human faces and hands unrelated to the approved
  `SymbolicFigure` visual system.

## What Lee's version does especially well

- **Direct-address warmth.** The opening (~0–35s) and closing (~242–314s)
  segments show genuine warmth, expressive hand gestures, and direct eye
  contact — a strong, usable benchmark for `WelcomeDirectAddress`'s
  intended register.
- **Natural pacing and real pauses.** The pause inventory above is full of
  plausible, well-motivated breath and structural pauses rather than a flat,
  metronomic read — a good benchmark for how a real narrator's rhythm
  should inform (not dictate) animation timing.
- **Restraint at the thesis landing.** The lack of a second energy spike or
  re-acceleration at N24 (the thesis restatement) suggests the performer
  correctly read it as "a landing, not a second climax," matching the
  approved script's own editorial intent.
- **A brisk (not over-dramatized) Signal-reveal line.** N15's estimated pace
  (~159wpm) is a genuinely useful, if lower-confidence, data point: it
  suggests the "ÆPOCH is our response" line lands better as a warm, forward
  declaration than a suspended, hushed dramatic pause — worth weighing
  against the Signal scene's current formal/dead-center static composition
  once animation begins.

## What should not be copied

- **The B-roll imagery itself, in its entirety.** Every one of the specific
  images described above conflicts with documented ÆPOCH brand rules already
  enforced elsewhere in this project:
  - Hooded figure at a screen — `VISUAL_LANGUAGE.md`'s "always exclude:
    hooded hacker."
  - Server-rack corridors — the same rule this project's own
    `SCENE_MODULES.md`-driven work has repeatedly avoided ("no isometric
    servers," "no literal server racks" — see the Phase 13B/13B.1 QA docs'
    own component-design rationale).
  - The Meta billboard — a named platform logo, explicitly forbidden.
  - The coin-drop image — `VISUAL_LANGUAGE.md`'s "always exclude: coin
    stack," and `SERIES_BIBLE.md`'s anti-crypto-imagery rule.
  - The bar chart — a literal data-chart treatment, inconsistent with the
    approved `CircularValueFieldTrafficData` module's symbolic circular
    numerals.
  - The robot hand — generic "AI" iconography, the exact thing this
    project's `SyntheticUnit`/`ReplicationGrid` primitives were designed to
    avoid ("no chip pins, no brain," per the Phase 13B QA doc).
  - The distorted/warped faces — risk of a horror read, which
    `HumanConsequence`'s uncertain-reflection state was specifically
    corrected in Phase 13B.1 to avoid.
- **The edit's shot-change cadence as a literal cut list.** The ~5–7s
  refresh rate is a useful *cadence* benchmark (see above), but the
  *specific* cut points were driven by B-roll content this project is not
  using — do not map Lee's cut timestamps directly onto Remotion scene
  boundaries.
- **The B-roll-to-direct-address ratio.** At ≈64% illustrative, Lee's cut is
  far more cutaway-heavy than the approved episode design, which is built
  around the direct-address `WelcomeDirectAddress` framing plus the
  episode's own restrained symbolic modules — not stock-style illustrative
  inserts.

## How the unified ÆPOCH version should differ

- Replace every illustrative cutaway with the already-approved, already
  statically-referenced ÆPOCH modules (`SyntheticMultiplication`,
  `HumanConsequence`, the `DeclarativeHook` variants, etc.) — these exist
  precisely to cover this narrative content without generic AI-stock
  imagery.
- Use Lee's pause structure and internal-pause timing (the grounded
  findings above) to decide *when* those modules' internal developments
  land, not *what* they show.
- Preserve Lee's demonstrated restraint at emotionally weighted moments
  (the two long pauses, the un-re-accelerated thesis landing) rather than
  his B-roll's decorative visual density.
- Keep the direct-address segments' warmth as the target register for
  `WelcomeDirectAddress` and the closing `BiologicalTransformerStatement`/
  `AepochSeriesOutro` scenes specifically, since those approved scenes are
  the ones actually built around a symbolic human figure in direct-address
  spirit.

## Whether any approved scene duration appears unworkable

**None appear unworkable.** The largest single deviation (`ep001-sc12`,
approved 17.33s vs. Lee-reference ~21.27s, a difference driven by the
longest internal pause in the whole recording) is still a stretch, not a
break — it suggests this scene may want more time than currently planned if
the final narrator delivers with similar weight, not that the scene's
design fails. `ep001-sc08` (traffic-data stats) shows the same pattern in
miniature (Lee runs longer, not shorter). No scene came in so much faster or
slower than planned that its approved static composition would need
redesigning.

## Whether any scene needs additional internal visual states

Three scenes have well-grounded internal-motion-beat candidates, all backed
by an actually-detected pause (not invented):

- `ep001-sc05` (Mimicry/symptom list) — one internal development at the
  detected pause inside N07.
- `ep001-sc10` (Extraction) — one internal development (the strands
  resolving) at the detected pause inside N12.
- `ep001-sc12` (Does not recognize presence) — one internal development
  (the quiet human node's entrance) at the longest detected pause in the
  recording, inside N14.

No scene needs more than one additional internal state per this analysis —
consistent with the phase's instruction not to convert the 22 scenes into
dozens of disconnected shots.

## Whether any scene boundary should shift for timing only

No scene-boundary shift is recommended at this time. `ep001-sc13`'s
Lee-reference timing is the one flagged LOW-confidence entry in this whole
analysis (the N15/N16 boundary didn't snap to a detected pause) — any
boundary-shift decision touching Scenes 13/14 should wait for a manual
verification pass, not be made on this data alone. All other scene
boundaries are MEDIUM confidence and show no evidence of needing to move;
observed deviations are duration-only (a scene running longer or shorter
than planned), not boundary-placement problems.

## Phase pass/fail

**PASS.** All required deliverables are complete and validated:

- `reference/lee/lee-performance-map.md` — all 26 beats (N01–N26) present
  with every required field.
- `inputs/scene-timing-map.yaml` — all 22 scenes present, valid YAML,
  monotonic and non-overlapping, reconciling exactly with the recording's
  measured 314.665s runtime, with both an approved-script timing column and
  a separate Lee-reference timing column (not collapsed into one).
- This QA review, covering every requested section.

## Remaining uncertainties

- **The N15/N16 boundary (`ep001-sc13`/`ep001-sc14`)** is the single
  lowest-confidence timing estimate in this entire analysis. Recommend a
  manual listen or a future transcription pass (with explicit approval to
  install a local Whisper model) before locking any frame-level Signal-scene
  animation timing.
- **N09's ~200wpm estimated rate** (`ep001-sc07`) may be a boundary-snap
  artifact rather than genuinely rapid delivery — flagged for verification,
  not treated as fact.
- **All emphasis-word and delivery-character assignments are inferred from
  script content and pause/duration structure, not confirmed acoustic
  prosody analysis** — no pitch/stress-detection tool was available. These
  should be treated as directorial hypotheses to verify by ear, not
  transcribed fact, before locking any per-word caption or animation timing.
- **Spoken-wording deviations from the approved script could not be
  confirmed at all** without a transcript — this analysis can only flag
  *timing* anomalies (e.g., N09's unusually fast estimated rate) as
  indirect evidence of a possible deviation; it cannot confirm actual
  wording changes, additions, or omissions. No such deviation was assumed
  or acted upon.
- **The direct-address/illustrative-screen balance percentage (≈36%/64%)**
  is a keyframe-granularity estimate from visual spot-checks, not a
  frame-accurate shot-boundary detection — treat it as directionally
  correct (Lee's cut is B-roll-heavy) rather than precise to the percentage
  point.
