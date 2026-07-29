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

---

## Phase 13C.2A — Complete episode motion-blocking draft

**Status:** Technical validation PASS — Creative review FAIL — **Production baseline REJECTED**

**Creative-review verdict:** The primitive Remotion-first approach (programmatic
SVG human figures, geometric metaphor scenes, phrase-level audio timing) lacks
production-quality artwork and precise word-level synchronization. The
technical implementation below passed every validation check in
`qa/phase-13c2a-motion-blocking-review.md`, but is rejected as a production
baseline on creative grounds. **The current `SymbolicFigure`/`HumanNode`
figures and the primitive metaphor scenes (Mimicry, Multiplication,
Manufactured Consensus, Uncertain Reflection, Extraction, Legacy Structure,
etc.) must not be used as production assets.** The rejected prototype is
retained on disk/in source (not deleted) as a technical reference for scene
timing, motion semantics, and composition structure only.

**Next direction:** an asset-first hybrid production approach — real human
footage, AI-generated editorial artwork, stock media where appropriate, with
Remotion retained as the composition/assembly layer rather than the source
of primitive geometric visuals.

**Next deliverable:** a 30–45 second production-quality proof (not another
complete five-minute draft).

**Required new capabilities before that proof can begin:**
- fal.ai — for Recraft, FLUX, and selective image-to-video generation.
- Pexels and Pixabay stock APIs.
- faster-whisper — for word-level narration timing (the phrase-level timing
  used in Phases 13C.1/13C.2A is insufficient going forward).

What Phase 13C.2A actually implemented and validated technically (retained
for reference — see "Next direction" above for why none of this is a
production asset):

Implemented deterministic motion for all 22 approved scenes, synchronized to
the Lee-reference timing map (`inputs/scene-timing-map.yaml`), and assembled
two compositions:

- `Aepoch-E001-MotionBlocking` — full motion-blocking treatment.
- `Aepoch-E001-MotionBlocking-Reduced` — same scene timing/settled
  compositions, motion limited to opacity/short reveals only.

Both register at exactly 1920×1080, 30fps, 9440 frames. New episode-specific
source added under `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/`
(`timeline.ts`, `motion-presets.ts`, `motion.tsx`, `audio.tsx`,
`compositions.tsx`) — the frozen Tier 1 baseline and the locked Episode 001
static baseline (`variants.tsx`, `components.tsx`, etc.) were reused, not
modified. Scenes 03, 04, and 19 reuse the frozen `KeyStatement`/
`DeclarativeHook`/`HumanNetwork` components directly (already frame-driven);
every other scene got a new local motion wrapper.

- Scene 13 ("ÆPOCH is our response") implements the full canonical Signal
  sequence (breath/converge/hold/forge/radiance/settle, per
  `MOTION_TOKENS.md` §7.3) — the episode's one Signal moment, confirmed
  absent everywhere else.
- The Scene 13 entry boundary was manually spot-checked against the
  reference-audio waveform (a real detected pause immediately precedes it,
  upgrading its confidence from Phase 13C.1's original LOW estimate).
- The two longest documented pauses (2.19s inside N14, 2.23s after N24) are
  preserved and drive Scenes 12 and 20/21's timing directly.
- Reference audio extracted from Lee's recording (audio only, no visual
  material used), synchronized without time-stretching — the extracted
  WAV's measured duration matches the instructed 9440-frame total to
  floating-point precision.
- Rendered: one full 720p motion-blocking preview, six chapter clips, three
  reduced-motion spot checks, and a 63-frame transition contact sheet
  (spot-checked for blank flashes, hard resets, and Signal leakage — none
  found).
- Type-check clean (zero new diagnostics vs. the 15 pre-existing baseline
  errors, unrelated to this episode).

No captions, no final 1080p render, no audio mastering, no locked-baseline
modification. Full detail:
`projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13c2a-motion-blocking-review.md`.

**Next phase:** Not Phase 13C.2B (motion polish on the rejected prototype).
Next is scoping the asset-first hybrid production approach and the
30–45 second production-quality proof described above.

---

## Provider hardening pass — prerequisite for the asset-first proof

**Status:** Complete

**Context:** Phase 13C.2A was technically successful (clean type-check,
correct timing sync, all validation checks passed) but was **creatively
rejected** — the primitive Remotion-first approach lacks production-quality
artwork. The project has moved to an asset-first hybrid workflow (real
human footage, AI-generated editorial artwork, stock media, Remotion as
composition layer only), and a provider-authentication smoke test
(2026-07-29) surfaced three defects that had to be fixed before that
workflow's tools could be trusted for real asset production. Provider
hardening — not asset generation — was the prerequisite this pass
addressed.

**Fixed:**

1. **Recraft color format.** `tools/graphics/recraft_image.py` documented
   and accepted `colors` as hex strings, then forwarded them unchanged to
   fal.ai. fal.ai's actual Recraft v4 endpoint requires RGB objects
   (`{"r": 181, "g": 101, "b": 29}`) and rejects hex strings with `422`.
   Added `tools/graphics/_shared.py` with generic (not ÆPOCH-specific)
   `normalize_color`/`normalize_colors` helpers: both hex strings and RGB
   objects are now accepted, normalized to RGB objects before the fal.ai
   call, and malformed entries are rejected locally with a `ValueError`
   before any network request.
2. **Recraft output-format mislabeling.** fal.ai returned WebP bytes for a
   request whose `output_path` ended in `.png`. Added
   `save_image_correctly()` to the same shared module: detects the real
   format from the downloaded bytes' signature, converts to the requested
   extension where practical (dimensions preserved), or corrects the
   extension when conversion isn't practical (undecodable bytes, SVG) —
   never silently renames bytes under a contradicting extension.
3. **Pixabay output-format mislabeling.** Pixabay returned PNG bytes for
   an illustration/vector hit under this tool's default `.jpg` output
   name. Now routed through the same `save_image_correctly()` path, as is
   `pexels_image` (no defect found there, but the same shared save path
   is now used for consistency and future-proofing).

All three tools now report `format`, `source_format`, and
`format_converted` alongside `output` in their result data, so provenance
is visible rather than inferred from a filename.

**Environment loading:** confirmed (not changed) that `tools/base_tool.py`
already loads `.env` once at import time for every tool, via any import of
`tools.tool_registry` or `tools.*`. The false `401` seen during the smoke
test came from a standalone diagnostic script that bypassed this
(`import requests` with no `tools` import), not from a real auth failure.
No `load_dotenv()` calls were added anywhere — the existing entry path is
correct and is now documented rather than duplicated.

**Tests:** `tests/tools/test_recraft_color_normalization.py` and
`tests/tools/test_image_format_normalization.py` — hex→RGB conversion, RGB
passthrough, malformed-input rejection (including a check that no network
call happens on invalid input), WebP→PNG conversion, PNG→JPEG conversion,
SVG left un-rasterized with a corrected extension, and a parametrized check
that every returned path's extension matches its file's actual signature.
Full existing suite re-run clean: 897 passed, 9 skipped (one pre-existing,
unrelated flaky perf-timing test in `tests/backlot/test_server.py`
deselected — a wall-clock budget assertion, not something this pass
touched). No real paid API calls were made while writing or running tests.

**Functional verification:** one real, user-approved Recraft v4 call
through the repaired `recraft_image` tool (not a direct API call) — see
`PROVIDER_SETUP.md` for the exact result, cost, and output path.

Full detail: [`PROVIDER_SETUP.md`](PROVIDER_SETUP.md).

**Next phase:** The 30–45 second production-quality proof itself. Not yet
scoped, not yet started — no prompt received.
