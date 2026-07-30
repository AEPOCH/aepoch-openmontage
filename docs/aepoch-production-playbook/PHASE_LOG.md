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

---

## Phase 14A.1 — AI editorial illustration style exploration

**Status:** Complete

Generated twelve production-direction still images (three directions ×
four shared narrative beats: Human Among Synthetic Echoes, Uncertain
Digital Reflection, Synthetic Multiplication, Manufactured Consensus)
through the repaired `recraft_image` tool, for creative comparison only —
this phase did not select a direction itself.

**Three incidents found and fixed/worked around, each reported before
further paid calls:**

1. `style="vector_illustration"` returns SVG, not PNG — the first 4 calls
   (Direction A) had to be discarded and redone.
2. The live fal.ai Recraft v4 endpoint only accepts `style="any"` or
   `"vector_illustration"` — the tool's declared 5-value enum is stale (a
   genuine, separate defect from the Provider hardening pass above, not
   fixed in this phase, flagged as a follow-up).
3. A literal negative-exclusion-list prompt clause triggered content
   moderation; fixed by switching to positive-only prompt framing.

Both the call-count cap (12 planned → 19 actual attempts) and the budget
cap ($0.60 → $0.64 actual) were exceeded, disclosed, and approved
mid-phase before the corrective spend happened.

**Finding:** no direction currently qualifies as a clean four-frame
family. Direction B/F4 (masked/hooded-figure read) and Direction C/F3
(robot-register imagery) are direct brand-exclusion failures, not just
style-consistency notes. Direction A was judged the closest to a coherent
family and the easiest to animate/composite later, and was recommended —
not approved — as the most promising starting point for further work.

Full detail: `qa/phase-14a1-style-exploration.md`.

**Next phase:** Author reviewed the twelve images outside this document
and approved **Direction A — Editorial Geometric** as the production
base. The three-direction comparison is now closed.

---

## Phase 14A.2 — Direction A visual-style convergence test

**Status:** Complete — technical validation PASS (one disclosed, approved
cap overage); **creative validation mixed, awaiting author review**

Tested whether the approved Direction A style holds together as one
coherent family across three difficult narrative concepts not covered by
Phase 14A.1's frames: Human Among Synthetic Echoes, Uncertain Digital
Reflection, and Manufactured Consensus — two candidates each, six images
total, using Direction A/F1 and Direction A/F4 from Phase 14A.1 as visual
anchors and borrowing only the layered-contour *technique* (not the full
paper-cut style or Void background) from Direction B/F2 for the
reflection concept.

**Round 1** (6 calls, within the original 6-call/$0.30 cap) found real
problems in four of six images: heavy unrequested texture/pattern fills
in both Human Among Synthetic Echoes candidates (violating
`VISUAL_LANGUAGE.md`'s flat-color-field rule), chibi/mascot-proportioned
figures and a curling tail-shape in Manufactured Consensus A, and a
blank-eye-adjacent blob artifact in Manufactured Consensus B (a direct
brand-exclusion risk, not just a style note).

**Round 2** (4 more calls, disclosed and approved as a cap overage — 10
calls / $0.40 total against the original 6-call/$0.30 cap) regenerated
those four with corrected prompts. Results were mixed: `echoes-a` and
`consensus-a`'s specific Round 1 problems were fixed (the latter with new
reservations); `echoes-b` traded its texture/composition problems for a
new one (an accessorized, personality-bearing face — in tension with the
series' no-mascot rule); `consensus-b` traded its blank-eye artifact for
a different failure (a dense wall of repeating head/neck shapes with no
negative space, violating that candidate's own explicit "broad and
spacious, not a dense wall" requirement). The author reviewed this
outcome and chose to stop and document rather than fund a third
generation round.

**Positive finding:** the Direction B/F2 layered-contour technique
integrated cleanly into Direction A on a Paper background —
`reflection-a` and `reflection-b` (both untouched since Round 1) are the
two strongest images in the set.

**Verdict:** the family is not yet ready to become the basis of a custom
ÆPOCH style. Two of three concepts have a clean or near-clean pass
(Human Among Synthetic Echoes via `echoes-a`; Uncertain Digital
Reflection via either candidate). Manufactured Consensus has no clean
pass after two rounds — this is the phase's main open risk.

Full detail: `qa/phase-14a2-style-convergence.md`.

**Next phase:** Awaiting author review. Recommendation only (not
approved): a third, narrower pass on Human Among Synthetic Echoes B and
Manufactured Consensus B specifically, then reconsider custom-style
training once all three concepts converge cleanly.

---

## Phase 14A.3 — Targeted Manufactured Consensus repair

**Status:** Complete — technical validation PASS (one disclosed,
non-error finding); **creative validation FAIL, improved but not
resolved, awaiting author review**

Narrow image-editing phase: repair the Manufactured Consensus slot only,
using reference-image editing on `consensus-a.png` rather than another
fresh-generation round. Did not reopen the Direction A style decision, did
not regenerate Human Among Synthetic Echoes or Uncertain Digital
Reflection, no video generation, no Remotion code changes, no custom-style
training.

**Tool-gap finding, reported and resolved before any paid call:** no FLUX
Kontext or fal.ai reference-image-editing tool existed in the registry.
`flux_image`/`recraft_image` are text-to-image only; the only two
edit-capable tools (`grok_image`/xAI, `kling_official_image`/Kling) aren't
fal.ai and were registry-`unavailable` (empty key placeholders, not a real
auth failure — `FAL_AI_API_KEY` itself is genuinely configured). Author
approved building a new tool rather than switching provider. Added
`tools/graphics/flux_kontext_image.py` (calls fal.ai's hosted FLUX.1
Kontext endpoints, `fal-ai/flux-pro/kontext` and `.../kontext/max`),
following the exact `recraft_image.py`/`flux_image.py` pattern, plus a
small generic `file_to_data_uri` helper added to
`tools/graphics/_shared.py`. The live endpoint schema was confirmed via two
unbilled `422` schema-validation diagnostics before the first real call.

**Source-image decision:** `consensus-a.png` confirmed over Phase 14A.1
Direction A/Frame 4 via visual inspection — Frame 4 has no visible human
bodies/limbs at all (a wall of head/shoulder blobs), failing the brief's
"recognizable as simplified human identities" requirement outright and
requiring a rebuild, not an edit; `consensus-a.png`'s problems (perspective
recession, busy body pattern) are concrete and edit-fixable.

**Three edit calls (all FLUX.1 Kontext [pro], $0.04 each, $0.12 total
against a $0.25 cap):**

- **Candidate A (lateral sync):** fixed the recession and busy-pattern
  problems cleanly — full-body figures, consistent size, flat color, good
  negative space — but dropped the "resolve into one shared output"
  device entirely; no output band appeared. **Fail.**
- **Candidate B (layered sync):** regressed to chibi/toddler proportions
  in a hand-holding paper-doll-chain composition — a repeat of the exact
  problem Phase 14A.2 Round 1 already fixed once for this same concept
  slot — plus no output device and weak negative space. **Fail.**
- **Candidate C (corrective pass on Candidate A, not the literal
  "Minimal consensus" brief — deviation disclosed):** added an output
  shape, but it reads as an ambiguous blob/puddle rather than a clean,
  unmistakable band or wave; no alignment-gradient progression appeared;
  figure count dropped from 8 to 6. **Fail, but the best of the three** —
  recommended candidate, with reservations.

**Dimension finding (disclosed, not silently resolved):** all three
candidates returned genuine PNG at **1392×752**, not the 1344×768 the
phase brief expected (written against Recraft v4's native bucket). FLUX
Kontext's native 16:9 bucket differs by aspect ratio (1.851 vs. 1.75), not
just scale — a direct resize would have distorted the image, so none was
performed; all three are delivered at their true native resolution,
correctly labeled.

**Verdict:** Manufactured Consensus still has no clean pass after five
total generation attempts across two phases (14A.2's two rounds + 14A.3's
three edit calls). The output-band/waveform device specifically has never
rendered successfully in any attempt. `consensus-edit-c.png` is the
recommended best candidate for a possible future fourth attempt, but the
family (`echoes-a`, `reflection-a`, `consensus-edit-c`) is not yet ready
for custom-style training.

Full detail: `qa/phase-14a3-consensus-repair.md`.

**Next phase:** Awaiting author review. Recommendation only (not
approved): a fourth attempt focused specifically on the output-band
device (likely needing a different visual approach than a "wave" shape,
given its consistent failure to render clearly), then reconsider
custom-style training once all three concepts converge cleanly.

---

## Phase 14B — Production-quality visual proof

**Status:** Complete — technical validation PASS; asset-first hybrid
workflow PASS; word-level synchronization method PASS; **creative-review
verdict: CONDITIONAL PASS — not public-ready**

Built one 35–50 second production-quality proof using the asset-first
hybrid workflow, per the phase's creative lock: Direction A / Editorial
Geometric, family = `echoes-a` (Phase 14A.2), `reflection-a` (Phase 14A.2),
`consensus-edit-a` (Phase 14A.3). No new image-generation or image-editing
calls this phase — all four locked assets (plus the Phase 14A.1 Direction A
multiplication frame) were copied byte-for-byte into Remotion's `public/`
folder and used strictly as illustration plates. Does not reuse or modify
the rejected Phase 13C.2A motion-blocking prototype's creative content
(programmatic `SymbolicFigure`/metaphor scenes) — only its proven
incoming-over-outgoing crossfade transition architecture was reused
structurally, in a fresh `phase14b/` source directory.

**Word-level alignment:** Ran `faster-whisper` (`small` model, CPU/int8,
`word_timestamps=True`) locally via `./.venv/bin/python` on the complete
314.667s Lee reference recording — the word-level tool Phase 13C.1
explicitly could not use. All ten required markers ("something's off",
"comments that sound human", "faster than humans can type", "lips don't
quite sync", "catfished", "bots can create accounts", "voice clones",
"never sleep", "billions of fake accounts", "manufacturing consensus")
located as real spoken-word timestamps — none estimated or invented. Two
markers ("lips don't quite sync", "catfished") reveal genuine
spoken-delivery deviations from the approved script (Lee's actual words
differ slightly from `inputs/narration-script.md`); both are disclosed,
neither required a script change. Full record:
`inputs/phase-14b-proof-word-timings.json`.

**Exact segment boundaries:** 52.60s–99.60s (47.00s / 1410 frames @30fps),
chosen inside real `ffmpeg silencedetect` gaps adjacent to each quoted
narration boundary. Notably shorter than Phase 13C.1's phrase-level
estimate for the same span (≈54.5s) would have suggested — confirming that
phrase-level timing was imprecise in the direction the real transcript now
corrects, not a new problem. Audio extracted losslessly (`ffmpeg atrim`,
no time-stretch/normalize/EQ/denoise) from Lee's original recording.

**Composition:** Registered `Aepoch-E001-Phase14B-Proof` (1920×1080, 30fps,
1410 frames) with six beats, each phrase-aligned to the word-timings JSON:

1. **Something's Off** — `echoes-a`, tight crop with a Paper edge-wash that
   clears exactly on "something's off," introducing the cool echo figures
   as a reveal rather than showing the full crowd immediately.
2. **Comments and Rapid Responses** — `echoes-a` full composition, with a
   brief mechanical color-state strobe on "faster than humans can type."
3. **Uncertain Video Identity** — `reflection-a`, a restrained registration
   wobble with one deliberate uptick on the actual spoken anchor ("lips
   aren't quite sinking").
4. **Phone Calls and Catfishing** — continues `reflection-a` (no literal
   phone/dating UI) with a measured pan and an Iris→Prism tint-state
   refresh, holding through "catfished."
5. **Synthetic Multiplication** — a continuous crop-pan across the Phase
   14A.1 Direction A multiplication frame, small-to-dense, with a
   deterministic (non-random) mechanical highlight sweep.
6. **Manufactured Consensus** — `consensus-edit-a` used strictly as a
   figure plate; the "resolve into one shared output" device that failed
   across all five prior image-generation attempts (Phases 14A.2/14A.3) is
   built here entirely from Remotion brand geometry: per-figure
   deterministic sync markers converging into lockstep plus a single
   drawn-on flat Iris wave, both resolving around "manufacturing
   consensus."

**Rendered:** one full 720p preview
(`renders/previews/phase-14b/aepoch-e001-phase14b-proof-720p.mp4`, 1280×720,
h264/aac, concurrency 1) and three required contact sheets (clean proof,
word-alignment, transition) — all verified as valid PNGs showing no blank
transition frames across all five beat cuts. Type-check clean (zero new
diagnostics vs. the pre-existing 15-error baseline). No Moss, no Signal, no
`Math.random()`, no primitive human components anywhere in the new code.

No captions, no audio mastering, no full 1080p render, no episode-scale
asset generation. Full detail:
`qa/phase-14b-production-proof-review.md`.

**Author creative-review decision:**

| Axis | Verdict |
|---|---|
| Technical validation | PASS |
| Asset-first hybrid workflow | PASS |
| Word-level synchronization method | PASS |
| Creative proof | **CONDITIONAL PASS** |
| Public-ready | **NO** |

The proof is suitable as an **internal pipeline demonstration** only. The
full Episode 001 must not begin yet.

**Next phase:** Phase 14B.1 — a polish pass on the existing 47-second proof
only (not a new proof, not full Episode 001). Not yet started.

---

## Phase 14B.1 — Proof polish (required corrections)

**Status:** Not yet started

Scoped corrections to the existing Phase 14B proof, per the author's
creative review of that proof:

1. Begin with one dominant human and reveal synthetic echoes progressively
   (Beat 1 currently shows all figures from frame 0, not a single dominant
   human).
2. Treat Beats 1 and 2 as **one continuous** echoes composition rather than
   crossfading the same plate into itself.
3. Strengthen the internal visual shift during the phone-call/catfishing
   narration (Beat 4) — the current tint/pan refresh reads too subtly.
4. Treat Beats 3 and 4 as **one continuous** reflection composition rather
   than crossfading the same plate into itself.
5. Replace the inconsistent synthetic-multiplication plate (Beat 5) with
   either the selected Direction A human vocabulary or an isolated approved
   synthetic figure multiplied through Remotion — not the Phase 14A.1
   Direction A/Frame 3 abstract-geometric plate currently used.
6. Make the Manufactured Consensus synchronization and the shared output
   band **unmistakable at normal playback size**.
7. Continue using Lee's recording **only as the timing reference** — not as
   final production audio.
8. Final narration will use a **clean recording of the approved script**
   (not Lee's reference recording, whose disclosed spoken-delivery
   deviations are documented in Phase 14B's word-timings JSON).

**Production paused:** the author is recording new human video and the
clean narration pass referenced in correction 8. No Claude session,
Remotion render, image generation, or episode build should run during that
recording session. Phase 14B.1 begins only after the author explicitly
signals the recording session is complete.

**Next phase:** Phase 14B.1 itself, once the recording pause ends.
