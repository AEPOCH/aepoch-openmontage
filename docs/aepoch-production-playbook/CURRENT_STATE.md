# ÆPOCH Production — Current State

## Current position

- Current branch: `aepoch-series`
- Locked Tier 1 baseline tag: `aepoch-tier1-beta-v0.1.0`
- Tier 1 baseline commit: `a41e3fb`
- Locked Episode 001 static baseline tag: `aepoch-e001-static-v0.1.0`
- Current completed phase: Phase 14A.2 — Direction A visual-style convergence test. Technical validation PASS (with one disclosed, approved cap overage). Creative validation mixed and **awaiting author review** — see below and [`qa/phase-14a2-style-convergence.md`](../../projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14a2-style-convergence.md).
- Next phase: not yet started. Depending on author review of Phase 14A.2, likely a third targeted image-generation pass on the two still-failing candidate slots (Human Among Synthetic Echoes B, Manufactured Consensus B), followed eventually by the 30–45 second production-quality proof (asset-first hybrid production: real human footage, AI-generated editorial artwork, stock media, Remotion as composition layer only).
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

## Next task

Not yet started — awaiting author review of Phase 14A.2. Likely next
step: a third, narrower image-generation pass on the two still-failing
candidate slots (Human Among Synthetic Echoes B — remove facial
accessories/expression; Manufactured Consensus B — full human silhouettes
with generous spacing, not a dense repeating pattern). After the family
converges cleanly, the next deliverable is a 30–45 second
production-quality proof (asset-first hybrid: real human footage,
AI-generated editorial artwork in the converged style, stock media where
appropriate, Remotion as composition layer only) — not another complete
five-minute draft, and not yet scoped or started.

Do not begin episode-scale asset generation for Episode 001 without an
explicit new phase prompt.

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
  visual style (author decision, outside Phase 14A.1/14A.2's own scope —
  neither document selects a direction itself). The three-direction
  comparison is closed and must not be reopened without explicit new
  authorization. Direction A is not yet a fully converged, production-
  ready family — see Phase 14A.2 in `PHASE_LOG.md` for the specific gaps
  (Manufactured Consensus, in particular, has no clean pass after two
  generation rounds).
- Every production phase has a review gate and stop condition.
- The Phase 13C.2A primitive Remotion-first prototype (programmatic
  `SymbolicFigure`/`HumanNode` figures, geometric metaphor scenes) was
  rejected on creative-review grounds and **must not be used as production
  assets** — retained on disk only as a technical/timing reference. See
  Phase 13C.2A in `PHASE_LOG.md` for the rejection rationale and next
  direction.
