# ÆPOCH Production — Current State

## Current position

- Current branch: `aepoch-series`
- Locked Tier 1 baseline tag: `aepoch-tier1-beta-v0.1.0`
- Tier 1 baseline commit: `a41e3fb`
- Locked Episode 001 static baseline tag: `aepoch-e001-static-v0.1.0`
- Current completed phase: **Phase 14B — production-quality visual proof.** Technical validation PASS. Asset-first hybrid workflow PASS. Word-level synchronization method PASS. **Creative-review verdict: CONDITIONAL PASS — not public-ready; suitable as an internal pipeline demonstration only.** See below and [`qa/phase-14b-production-proof-review.md`](../../projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-production-proof-review.md).
- Completed system phase: **Phase 15 — blog-to-video production readiness.** Contract PASS, blog-adaptation PASS, and local-render PASS.
- Current system phase: **Phase 16 — “What is ÆPOCH?” real blog pilot.** The live blog is authoritative; research verifies and enriches. The ÆPOCH Protocol YouTube channel is the quality benchmark.
- **Episode 001 delivery has moved outside OpenMontage.** Lee is editing the author's narration and video directly and will produce the video manually.
- **Phase 14B.1 is superseded.** The recording pause and media-entry gate no longer apply to the active system path.
- Current episode: `001-what-is-aepoch`
- Episode type: Pre-launch countdown, Video 1
- Working title: `What is ÆPOCH?`

## Completed work

### Phase 10
Production asset library and brand-system foundations completed.

### Phase 12
Six Tier 1 Remotion modules created, statically reviewed, animated, captioned,
transition-corrected, reduced-motion tested, and locked as the beta baseline.

### Phase 13A
Episode brief, narration script, scene plan, and written storyboard created.

### Phase 13A.1
Scene architecture refined:

- 22 scenes
- 719-word narration
- Approximate runtime: 5:20 at 135 words per minute
- 63.6% Tier 1 direct reuse or variant reuse
- 36.4% blocked on new or unimplemented modules
- Factual claims already approved by the author
- No visible citations required
- Narration and source outline locked

## Completed work (continued)

### Phase 13B
Static reference-frame production complete:

- Episode-specific Remotion source scaffolded under
  `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/`
  (`types.ts`, `tokens.ts`, `components.tsx`, `variants.tsx`,
  `static-previews.tsx`), importing the tagged Tier 1 baseline unmodified.
- 20 static reference stills rendered at 1920×1080 (frame 0, reducedMotion)
  for the four new modules (WelcomeDirectAddress, SyntheticMultiplication,
  HumanConsequence, AepochSeriesOutro) and seven episode-specific Tier 1
  variants — five needed new variant components, two reused frozen Tier 1
  modules with new data only.
- Four contact sheets rendered (complete reference, new modules, Tier 1
  variants, neighboring-scene differentiation).
- Type-check clean (zero new diagnostics vs. baseline), determinism verified
  (byte-identical repeat renders), Moss and Signal confirmed absent from all
  new stills.
- Full detail: `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13b-static-review.md`.

### Phase 13B.1
Static creative-correction pass: rebuilt `SymbolicFigure` on correct adult
proportions (fixed a leg-overlap bug found mid-pass), rescaled dark-scene
compositions, replaced Manufactured Consensus/Uncertain Reflection/
Extraction with brand-compliant designs, corrected the traffic-data and
42-day-test compositions, enlarged the outro mark. Regenerated all 5
contact sheets including a new full 22-scene storyboard sheet. Full detail:
`qa/phase-13b-static-review.md`'s Phase 13B.1 section.

### Phase 13B.2
KeyStatement differentiation: Scenes 3/13/15/17/20/21 all rendered as
near-identical frozen-`KeyStatement` layouts — replaced 5 of the 6 with
distinct episode-specific compositions (Scene 3 kept as the reference
baseline), including a new `SignalVesica` primitive (the episode's one
Signal moment) and a new `BreathRings` primitive. Fixed Scene 18 label
readability. Full detail: `qa/phase-13b-static-review.md`'s Phase 13B.2
section.

### Phase 13C.1
Performance analysis and timing lock, using a reference recording
(`reference/lee/lees-recording-review.mp4`, 314.665s) as a pacing/
performance benchmark only — not an authoritative edit structure or
soundtrack. No word-level alignment tool was available (none installed,
per the phase's "no model download without approval" instruction);
produced phrase-level timing via silence detection + word-count proportion,
confidence-labeled throughout. Key finding: the reference recording is
≈64% AI-generated illustrative B-roll (much of it violating documented
brand exclusions — hooded-hacker imagery, server racks, a named platform
logo, a coin-drop, generic robot hands) that must not be copied into the
unified ÆPOCH version. Produced `reference/lee/lee-performance-map.md`
(all 26 narration beats) and `inputs/scene-timing-map.yaml` (all 22 scenes,
a reference-timing column alongside the approved-script column — does not
overwrite `scene-plan.yaml`). Full detail:
`qa/phase-13c1-performance-review.md`.

### Phase 13C.2A
Complete episode motion-blocking draft: implemented deterministic motion for
all 22 scenes, synced to `inputs/scene-timing-map.yaml`'s Lee-reference
timing. Registered `Aepoch-E001-MotionBlocking` and
`Aepoch-E001-MotionBlocking-Reduced` (1920×1080, 30fps, 9440 frames). New
source under `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/`
(`timeline.ts`, `motion-presets.ts`, `motion.tsx`, `audio.tsx`,
`compositions.tsx`) — reuses, does not modify, the frozen Tier 1 baseline and
locked Episode 001 static baseline. Scene 13 implements the full canonical
Signal sequence (the episode's one Signal moment); its entry boundary was
manually spot-checked against the reference-audio waveform. Rendered a full
720p preview, six chapter clips, three reduced-motion spot checks, and a
63-frame transition contact sheet. Type-check clean (zero new diagnostics).
**Status: technical validation PASS — creative review FAIL — production baseline REJECTED.**
Cause: the primitive Remotion-first approach (programmatic SVG human figures,
geometric metaphor scenes, phrase-level audio timing) lacks production-quality
artwork and precise word-level synchronization. The current human figures and
primitive metaphor scenes must not be used as production assets. The
rejected prototype is retained (not deleted) as a technical/timing reference
only. Full detail: `qa/phase-13c2a-motion-blocking-review.md`.

### Provider hardening (prerequisite for the asset-first proof)

- fal.ai — Recraft functionally verified (color-format bug fixed, one real
  generation succeeded). FLUX, Kling, Veo, MiniMax remain registry-verified
  only (env var present; not yet actually called).
- Pexels and Pixabay stock APIs — functionally verified (real search +
  download on both), plus a provider-format-mislabeling bug fixed (Pixabay
  returning PNG under a `.jpg`-named default output).
- faster-whisper — import verified in `.venv` (1.2.1); no transcription run
  yet.

Full detail: [`PROVIDER_SETUP.md`](PROVIDER_SETUP.md).

### Phase 14A.1 — AI editorial illustration style exploration

Twelve production-direction still images (three directions × four shared
narrative beats) generated through the repaired `recraft_image` tool, for
creative comparison only. No direction was selected by this phase itself.
Key findings: `style="vector_illustration"` returns SVG not PNG; the live
fal.ai endpoint only accepts `"any"` or `"vector_illustration"` (the tool's
declared 5-value enum is stale, unfixed, logged as a follow-up); literal
negative-exclusion-list prompt text triggers content moderation (fixed by
positive-only framing). No direction passed cleanly across all four
frames; Direction A (editorial geometric) was judged closest to a coherent
family and was subsequently **approved by the author as the production
base**, outside this document. Full detail:
`qa/phase-14a1-style-exploration.md`.

### Phase 14A.2 — Direction A visual-style convergence test

Six new 16:9 images testing whether Direction A holds together across
three difficult concepts (Human Among Synthetic Echoes, Uncertain Digital
Reflection, Manufactured Consensus), two candidates each. Round 1 (6
calls) found brand-language/consistency problems in four of six images
(texture violations, mascot-adjacent chibi proportions, a blank-eye-
adjacent artifact, a "surrounding mob" composition). Round 2 (4 more
calls, disclosed/approved cap overage — 10 calls total, $0.40 against an
original $0.30 cap) regenerated those four; two now pass cleanly
(`echoes-a`, plus the untouched `reflection-a`/`reflection-b`), one passes
with reservations (`consensus-a`), and two still do not pass
(`echoes-b` now has an accessorized/personality-bearing face; `consensus-b`
now fails the "broad and spacious, not a dense wall" requirement and lost
full human figures). The Direction B/F2 layered-contour technique
integrated successfully into Direction A on a Paper background — the
clearest positive finding. **Not yet ready to become the basis of a custom
ÆPOCH style** — Manufactured Consensus in particular has no clean pass
after two rounds. Full detail:
`qa/phase-14a2-style-convergence.md`.

### Phase 14A.3 — Targeted Manufactured Consensus repair

Repaired the Manufactured Consensus slot via FLUX Kontext reference-image
editing rather than another fresh-generation round. Technical validation
PASS. Creative validation FAIL, improved but not resolved after five total
generation attempts across two phases. Full detail:
`qa/phase-14a3-consensus-repair.md`.

### Phase 14B — Production-quality visual proof

**Status:** Complete — technical validation PASS; creative validation
**awaiting author review**.

Built one 47.00-second (1410-frame @30fps) proof segment covering narration
beats N06–N09, using the asset-first hybrid workflow: three locked
Direction A illustrations (`echoes-a`, `reflection-a`, `consensus-edit-a`)
plus one Direction A multiplication frame, treated entirely through
Remotion-native motion (crop, mask, camera, color-state, brand geometry) —
no new image-generation calls this phase.

- Word-level audio boundaries determined via `faster-whisper` (`small`
  model, CPU/int8) on Lee's real reference recording, refined against
  `ffmpeg silencedetect` gaps — not the phrase-level estimate from Phase
  13C.1. All ten required markers located as real spoken words; two show a
  genuine spoken-delivery deviation from the approved script (disclosed,
  script itself unchanged). Full word-level output:
  `inputs/phase-14b-proof-word-timings.json`.
- Registered `Aepoch-E001-Phase14B-Proof` (1920×1080, 30fps, 1410 frames)
  under a fresh `phase14b/` source directory — does not reuse or modify the
  rejected Phase 13C.2A motion-blocking prototype's creative content;
  reuses only its proven incoming-over-outgoing crossfade architecture.
- Beat 6 (Manufactured Consensus) builds the "resolve into one shared
  output" transformation — unresolved across all five prior
  image-generation attempts in Phases 14A.2/14A.3 — entirely from Remotion
  brand geometry (deterministic sync-marker convergence + a drawn-on flat
  wave line), using `consensus-edit-a` strictly as a figure plate.
- Rendered a full 720p preview and three required contact sheets (clean,
  word-alignment, transition). Type-check clean (zero new diagnostics vs.
  the 15 pre-existing baseline errors).

Full detail: `qa/phase-14b-production-proof-review.md`.

**Author creative-review decision (post-phase, recorded here):**

| Axis | Verdict |
|---|---|
| Technical validation | PASS |
| Asset-first hybrid workflow | PASS |
| Word-level synchronization method | PASS |
| Creative proof | **CONDITIONAL PASS** |
| Public-ready | **NO** |

The proof is suitable as an **internal pipeline demonstration** only. The
full Episode 001 must not begin yet. **Phase 14B.1** is the next production
phase, and it will **polish the existing 47-second proof only** — not
regenerate it from scratch, and not extend it into the full episode.

**Historical next phase:** Phase 14B.1 was planned but is now superseded. See
the disposition below.

## Phase 14B.1 — required corrections (superseded)

These corrections are retained as historical review findings. They are not
the active execution plan because Episode 001 delivery has moved to Lee's
manual workflow.

Scoped corrections to the existing Phase 14B proof, per author creative
review:

1. Begin with one dominant human and reveal synthetic echoes progressively
   (Beat 1's opening currently shows all figures from frame 0, not a single
   dominant human).
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
   band **unmistakable at normal playback size** (the current sync markers
   and wave line are legible but read as subtle/small).
7. Continue using Lee's recording **only as the timing reference** — not as
   final production audio.
8. Final narration will use a **clean recording of the approved script**
   (not Lee's reference recording, which has the disclosed spoken-delivery
   deviations documented in Phase 14B's word-timings JSON).

## Recording pause (lifted by scope change)

The earlier pause is no longer active. OpenMontage does not await the new
recordings because Lee owns their edit and final Episode 001 delivery.
This does not authorize OpenMontage to use those recordings.

## Next task

Execute Phase 16 using
`prompts/phase-16-what-is-aepoch-real-blog-pilot.md`: run fresh preflight,
extract and verify the live authoritative blog, analyze the benchmark videos,
and present differentiated production proposals. Stop for approval before paid
generation or a full production render.

## Authoritative episode files

- `projects/aepoch-episodes/001-what-is-aepoch/inputs/episode-brief.md`
- `projects/aepoch-episodes/001-what-is-aepoch/inputs/narration-script.md`
- `projects/aepoch-episodes/001-what-is-aepoch/inputs/scene-plan.yaml`
- `projects/aepoch-episodes/001-what-is-aepoch/inputs/scene-timing-map.yaml` (reference timing only; does not supersede `scene-plan.yaml`)
- `projects/aepoch-episodes/001-what-is-aepoch/storyboard/static-review.md`
- `projects/aepoch-episodes/001-what-is-aepoch/research/claims-and-sources.md`
- `projects/aepoch-episodes/001-what-is-aepoch/reference/lee/lee-performance-map.md`
- `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14a1-style-exploration.md`
- `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14a2-style-convergence.md`
- `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14a3-consensus-repair.md`
- `projects/aepoch-episodes/001-what-is-aepoch/inputs/phase-14b-proof-word-timings.json`
- `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-production-proof-review.md`

## Authoritative brand and production files

- `brands/aepoch/SERIES_BIBLE.md`
- `brands/aepoch/SCRIPT_RULES.md`
- `brands/aepoch/VISUAL_LANGUAGE.md`
- `brands/aepoch/MOTION_TOKENS.md`
- `brands/aepoch/SCENE_MODULES.md`
- `brands/aepoch/ASSET_INDEX.md`
- `projects/aepoch-tests/module-test-reel/qa/tier-1-motion-review.md`

## Permanent constraints

- Do not modify the tagged Tier 1 beta baseline.
- Do not reopen approved factual claims.
- Do not modify approved narration without explicit authorization.
- Moss is reserved for direct successful Proof of Life verification and is not
  used in Episode 001.
- Signal appears only in the approved “ÆPOCH is our response” scene.
- No generic AI, cyberpunk, crypto-coin, robot, browser-interface, platform-logo,
  or decorative-gradient imagery.
- Generated video, audio, previews, and renders remain uncommitted unless
  explicitly selected.
- **Direction A — Editorial Geometric** is the approved production-base
  visual style (author decision, outside Phase 14A.1/14A.2/14A.3's own
  scope — none of those documents selects a direction itself). The
  three-direction comparison is closed and must not be reopened without
  explicit new authorization. Direction A is not yet a fully converged,
  production-ready family — see Phase 14A.3 in `PHASE_LOG.md` for the
  specific gaps (Manufactured Consensus, in particular, still has no clean
  pass after two generation rounds plus a three-call targeted edit pass —
  five total generation attempts at this concept slot).
- Every production phase has a review gate and stop condition.
- The Phase 13C.2A primitive Remotion-first prototype (programmatic
  `SymbolicFigure`/`HumanNode` figures, geometric metaphor scenes) was
  rejected on creative-review grounds and **must not be used as production
  assets** — retained on disk only as a technical/timing reference. See
  Phase 13C.2A in `PHASE_LOG.md` for the rejection rationale and next
  direction.
