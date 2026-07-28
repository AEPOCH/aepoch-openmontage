# ÆPOCH Production — Current State

## Current position

- Current branch: `aepoch-series`
- Locked Tier 1 baseline tag: `aepoch-tier1-beta-v0.1.0`
- Tier 1 baseline commit: `a41e3fb`
- Current completed phase: Phase 13B
- Next phase: Phase 13C
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

## Next task

Phase 13C: not yet scoped. Likely candidates per `SCENE_MODULES.md`'s
implementation order: full motion implementation for the four new modules,
and/or resolving the Phase 13B candidate A/B creative decisions. Do not begin
without an explicit new phase prompt.

## Authoritative episode files

- `projects/aepoch-episodes/001-what-is-aepoch/inputs/episode-brief.md`
- `projects/aepoch-episodes/001-what-is-aepoch/inputs/narration-script.md`
- `projects/aepoch-episodes/001-what-is-aepoch/inputs/scene-plan.yaml`
- `projects/aepoch-episodes/001-what-is-aepoch/storyboard/static-review.md`
- `projects/aepoch-episodes/001-what-is-aepoch/research/claims-and-sources.md`

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
- Every production phase has a review gate and stop condition.
