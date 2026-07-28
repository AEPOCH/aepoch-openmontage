# ÆPOCH Production Phase Log

## Phase 10 — Production asset system

**Status:** Complete

Established the ÆPOCH asset library, canonical mark usage, Earth Rise
background, human forms, icons, diagram geometry, motion geometry, and static
Tier 1 visual references.

---

## Phase 12A — Tier 1 static modules

**Status:** Complete

Built and reviewed six deterministic Remotion scene modules:

- DeclarativeHook
- KeyStatement
- CircularValueField
- FlowLifecycle
- HumanNetwork
- SystemComparison

Static compositions were corrected for hierarchy, readability, neutral system
geometry, equal-node treatment, and reduced interface-like styling.

---

## Phase 12B — Tier 1 motion system

**Status:** Complete

Animated the six Tier 1 modules, created reduced-motion versions, generated
temporary timing narration and captions, and assembled test reels.

---

## Phase 12C — Captions and transitions

**Status:** Complete

Replaced the original caption treatment with the shared CaptionPanel component.

Corrected opaque-background transitions by holding the outgoing scene's settled
frame and fading the incoming scene above it.

Retimed:

- DeclarativeHook geometry to “production”
- CircularValueField Production → Presence → conclusion
- SystemComparison row emphasis to narration

**Commit:** `a41e3fb`  
**Tag:** `aepoch-tier1-beta-v0.1.0`

---

## Phase 13A — Episode 001 pre-production

**Status:** Complete

Created:

- Episode brief
- 26-beat narration script
- 21-scene YAML plan
- Written static storyboard

Narration: 719 words  
Planning pace: 135 words per minute  
Estimated runtime: approximately 5:20

---

## Phase 13A.1 — Scene-plan refinement

**Status:** Complete

Refined the episode to 22 scenes.

Key corrections:

- Preserved projection wording for automated-traffic figures
- Split the economic-system sequence into two compositions
- Prevented a false second Signal after “ÆPOCH is our response”
- Replaced the protocol-layer text slide with a HumanNetwork variant
- Locked the four 42-day lifecycle stages
- Removed presenter-like head motion
- Defined three distinct SyntheticMultiplication states
- Preserved the final thesis precisely
- Recalculated timing, frames, inventory, and reuse percentages

**Next phase:** Phase 13B — static reference-frame production.

---

## Phase 13B — Static reference-frame production

**Status:** Complete

Produced deterministic 1920×1080 static reference frames for the four new
modules (WelcomeDirectAddress, SyntheticMultiplication, HumanConsequence,
AepochSeriesOutro) and seven episode-specific Tier 1 variants:

- 20 required stills rendered, all verified at exactly 1920×1080.
- Five variants needed new episode-specific components (frozen Tier 1
  modules couldn't express the required composition without changing their
  props/validators); two reused frozen Tier 1 modules directly with new data.
- Four contact sheets produced, including a neighboring-scene sheet checking
  for false Signal reads and layout sameness.
- Type-check clean against baseline, determinism verified, Moss and Signal
  confirmed absent.

No full scene animation, narration, captions, episode assembly, or MP4
rendering was performed. The tagged Tier 1 beta baseline and approved
narration were not modified.

Full detail: `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13b-static-review.md`.

**Next phase:** Phase 13C — not yet scoped.

---

## Phase 13B.1 — Static creative correction

**Status:** Complete

Creative-review correction pass on the Phase 13B stills:

- Rebuilt `SymbolicFigure` on correct 8-head-unit adult proportions (fixed a
  leg-overlap bug caught mid-pass that made the figure read as one leg).
- Rescaled Mimicry/Multiplication/Manufactured-Consensus/HumanConsequence
  ~30% larger for phone-scale clarity.
- Replaced Manufactured Consensus (no more bordered panel/arrows), Uncertain
  Reflection (no more Wi-Fi-like arcs), and Extraction's destination/strand
  count with brand-compliant designs.
- Corrected traffic-data (90%+, current-vs-projected distinction, removed a
  duplicate caption) and rebuilt the 42-day test as a Comet-Arc-family path
  (no cards).
- Enlarged the series-outro mark/identifier for phone legibility.
- Regenerated all 5 contact sheets, including a new full 22-scene storyboard
  sheet.

Full detail: `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13b-static-review.md`'s Phase 13B.1 section.

**Next phase:** Phase 13B.2 — KeyStatement differentiation.

---

## Phase 13B.2 — KeyStatement differentiation and final static storyboard lock

**Status:** Complete

The full storyboard sheet showed Scenes 3, 13, 15, 17, 20, and 21 all
rendering as near-identical frozen-`KeyStatement` compositions (left text /
pale Cosmos circle / Comet Arc / small human). Built five distinct
episode-specific replacements (Scene 3 kept as the reference baseline):

- Scene 13 (Signal) — new `SignalStatement` component + `SignalVesica`
  primitive (exact vesica intersection via SVG clip-path), dead-center and
  formal — the one Signal moment in the episode.
- Scene 15 (Contribution) — human + warm ring, horizontal relationship to
  the text.
- Scene 17 (One idea) — a single point and line against vast negative space.
- Scene 20 (Final thesis) — human integrated in a large warm field, text
  left, no arc.
- Scene 21 (Biological transformer) — new `BreathRings` primitive around an
  off-center human figure.

Also fixed Scene 18's label size/spacing (two clearance bugs). Caught and
fixed a wiring bug where Root.tsx still pointed the five new scenes at the
old shared frozen-KeyStatement preview (would have type-checked but
silently rendered the wrong component).

Full detail: `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13b-static-review.md`'s Phase 13B.2 section.

**Next phase:** Phase 13C — not yet scoped.

---

## Phase 13C.1 — Performance analysis and timing lock

**Status:** Complete

Analyzed a reference recording (`reference/lee/lees-recording-review.mp4`,
314.665s, 1280×720 @29.97fps) as a pacing/performance benchmark only — not
an authoritative edit structure, B-roll reference, or final soundtrack.

- No word-level alignment tool was available (`faster-whisper`/`whisperx`
  not installed, no cached model found); per the phase's instructions, none
  was installed. Produced phrase-level timing instead, via `ffmpeg
  silencedetect` + word-count proportion, snapped to real detected pauses
  (25 of 26 beat boundaries; one flagged LOW confidence) — precision
  labeled throughout.
- **Key finding:** direct visual review of the recording's keyframes shows
  it is ≈64% AI-generated illustrative B-roll, much of it violating
  documented ÆPOCH brand exclusions (hooded-hacker imagery, literal server
  racks, a named platform logo, a coin-drop image, generic robot-hand "AI"
  iconography, distorted/uncanny faces) — explicitly flagged as not to be
  copied into the unified ÆPOCH version.
- Identified two long, well-grounded pauses (2.19s inside N14, 2.23s
  between N24/N25) as genuine structural/emotional holds, and three
  internal-motion-beat candidates (Scenes 5, 10, 12) anchored to real
  detected pauses — not invented.
- Produced `reference/lee/lee-performance-map.md` (all 26 narration beats:
  timing, pauses, emphasis, delivery character, animation/caption
  implications) and `inputs/scene-timing-map.yaml` (all 22 scenes, a
  reference-timing column alongside the approved-script column — validated
  YAML, monotonic/non-overlapping, reconciles with the recording runtime).

No animation, captions, episode assembly, or MP4 render was performed. The
approved narration, scene order, and tagged Tier 1 / Episode 001 static
baselines were not modified.

Full detail: `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13c1-performance-review.md`.

**Next phase:** Phase 13C.2 — motion implementation. Not yet started.
