# ÆPOCH Episode 001 — Phase 13B Static Reference Review

Status: **PASS**
Review date: 2026-07-28
Scope: static reference-frame production only — new module scaffolding
(WelcomeDirectAddress, SyntheticMultiplication, HumanConsequence,
AepochSeriesOutro) plus seven episode-specific Tier 1 variants. No full scene
animation, no narration, no captions, no episode timeline assembly, no MP4
render. The tagged `aepoch-tier1-beta-v0.1.0` baseline
(`remotion-composer/src/aepoch/*.ts(x)`) was imported but not modified.

Format: 1920×1080 PNG, 30 fps composition baseline, frame 0, `reducedMotion: true`.

## Source scaffolding

```text
remotion-composer/src/aepoch/episodes/001-what-is-aepoch/
├── types.ts              — episode-specific prop contracts
├── tokens.ts              — episode-scoped constants (seed, echo jitter)
├── components.tsx        — new visual primitives (SymbolicFigure, EchoCluster,
│                           ReplicationGrid, PressureField, UncertainReflectionForm,
│                           ExtractionFlow, CometArcPartial, SyntheticUnit)
├── variants.tsx           — the 8 new scene/variant components
└── static-previews.tsx    — one prop object (or candidate pair) per required
                            still, plus thin preview wrapper components
```

Twenty static compositions are registered in `remotion-composer/src/Root.tsx`,
all prefixed `Aepoch-E001-Static-`. Only static-preview compositions were
registered; the full episode composition was not created.

## Component architecture decisions

Of the seven "episode-specific Tier 1 variants" required by this phase, **two
need no new component** — the frozen Tier 1 modules already expose everything
the scene needs via new prop data alone:

| Variant | Reuses | Why no new component needed |
|---|---|---|
| HumanNetwork — participant cohort | `HumanNetwork` (`../../modules`) | Arbitrary node positions + `distributed` topology is exactly what the frozen component already does. |
| FlowLifecycle — 42-day test | `FlowLifecycle` (`../../modules`) | Arbitrary 3–5 step labels/icons is exactly what the frozen component already does. |

**Five needed an episode-specific variant component**, built from shared
primitives (`AepochScene`, `HumanNode`, `AepochMark`, tokens, motion helpers —
all imported unmodified from the baseline) because the frozen top-level
component cannot express the required composition without changing its props
or validators (which would mean modifying the tagged baseline):

| Variant | Frozen component's limitation |
|---|---|
| DeclarativeHook — built for another world | Always renders a `HumanNode`; Scene 11 requires none at all. |
| DeclarativeHook — does not recognize presence | Same limitation; also needs a distinct settled composition from Scene 11, not just an added circle. |
| CircularValueField — traffic data | Never renders `field.value` at all (only label/sublabel) — cannot deliver "strong numeric hierarchy, tabular numerals." |
| CircularValueField — ancient idea / modern tools | No rendered connecting path for a `balanced` relationship — the scene requires one restrained connecting line. |
| HumanNetwork — protocol layer | `topology` is validation-only; the frozen component never renders a shared enclosing ring. |

This is recorded so a future phase doesn't assume all "variants" are prop-only
reuses — five of seven are genuinely separate React components.

## Required stills

| # | Composition ID | Scene | Module / variant | Candidate | Filename |
|---:|---|---|---|---|---|
| 1 | `Aepoch-E001-Static-WelcomeA` | ep001-sc01 | WelcomeDirectAddress (new) | A | `01-welcome-direct-address-a.png` |
| 2 | `Aepoch-E001-Static-WelcomeB` | ep001-sc01 | WelcomeDirectAddress (new) | B | `02-welcome-direct-address-b.png` |
| 3 | `Aepoch-E001-Static-August9Continuation` | ep001-sc02 | WelcomeDirectAddress (new) | — | `03-august-9-continuation.png` |
| 4 | `Aepoch-E001-Static-SynthMimicryA` | ep001-sc05 | SyntheticMultiplication (new) — Mimicry | A | `04-synthetic-mimicry-a.png` |
| 5 | `Aepoch-E001-Static-SynthMimicryB` | ep001-sc05 | SyntheticMultiplication (new) — Mimicry | B | `05-synthetic-mimicry-b.png` |
| 6 | `Aepoch-E001-Static-SynthMultiplication` | ep001-sc06 | SyntheticMultiplication (new) — Multiplication | — | `06-synthetic-multiplication.png` |
| 7 | `Aepoch-E001-Static-ManufacturedConsensusA` | ep001-sc07 | SyntheticMultiplication (new) — Manufactured consensus | A | `07-manufactured-consensus-a.png` |
| 8 | `Aepoch-E001-Static-ManufacturedConsensusB` | ep001-sc07 | SyntheticMultiplication (new) — Manufactured consensus | B | `08-manufactured-consensus-b.png` |
| 9 | `Aepoch-E001-Static-HumanConsequenceUncertainReflection` | ep001-sc09 | HumanConsequence (new) — Uncertain reflection | — | `09-human-consequence-uncertain-reflection.png` |
| 10 | `Aepoch-E001-Static-HumanConsequenceExtraction` | ep001-sc10 | HumanConsequence (new) — Extraction | — | `10-human-consequence-extraction.png` |
| 11 | `Aepoch-E001-Static-DeclarativeHookBuiltForAnotherWorld` | ep001-sc11 | DeclarativeHook variant (episode-specific) | — | `11-declarative-hook-built-for-another-world.png` |
| 12 | `Aepoch-E001-Static-DeclarativeHookDoesNotRecognizePresence` | ep001-sc12 | DeclarativeHook variant (episode-specific) | — | `12-declarative-hook-does-not-recognize-presence.png` |
| 13 | `Aepoch-E001-Static-CircularValueFieldTrafficData` | ep001-sc08 | CircularValueField variant (episode-specific) | — | `13-circular-value-field-traffic-data.png` |
| 14 | `Aepoch-E001-Static-AncientIdeaModernToolsA` | ep001-sc14 | CircularValueField variant (episode-specific) | A | `14-ancient-idea-modern-tools-a.png` |
| 15 | `Aepoch-E001-Static-AncientIdeaModernToolsB` | ep001-sc14 | CircularValueField variant (episode-specific) | B | `15-ancient-idea-modern-tools-b.png` |
| 16 | `Aepoch-E001-Static-HumanNetworkProtocolLayerA` | ep001-sc16 | HumanNetwork variant (episode-specific) | A | `16-human-network-protocol-layer-a.png` |
| 17 | `Aepoch-E001-Static-HumanNetworkProtocolLayerB` | ep001-sc16 | HumanNetwork variant (episode-specific) | B | `17-human-network-protocol-layer-b.png` |
| 18 | `Aepoch-E001-Static-HumanNetworkParticipantCohort` | ep001-sc19 | HumanNetwork (frozen, new data) | — | `18-human-network-participant-cohort.png` |
| 19 | `Aepoch-E001-Static-FlowLifecycle42Day` | ep001-sc18 | FlowLifecycle (frozen, new data) | — | `19-flow-lifecycle-42-day-test.png` |
| 20 | `Aepoch-E001-Static-SeriesOutro` | ep001-sc22 | AepochSeriesOutro (new) | — | `20-aepoch-series-outro.png` |

All 20 stills are under
`projects/aepoch-episodes/001-what-is-aepoch/renders/stills/phase-13b/`.

## Per-still detail

### 1–3. WelcomeDirectAddress
- Reused assets: `AepochScene`, Earth Rise background, brand tokens (all baseline).
- New assets: `SymbolicFigure` (full-body three-quarter human silhouette — no
  existing asset covered "direct address," confirmed in `ASSET_INDEX.md`),
  `CometArcPartial` (truncated foreshadowing arc).
- Brand-rule checks: no facial features — pass. No head tilt — pass (head stays
  perfectly upright in both candidates; only torso/hip/arm offsets differ
  between candidate A and B). Earth Rise background — pass. No on-screen text
  in the Welcome state — pass. August 9 state reads as a continuation of the
  same figure/world, not a new title card — pass (same figure position/scale,
  only a small date label and partial arc added to the right).
- Mobile readability: figure occupies a clear, legible silhouette against a
  light background at 1/6 frame scale; "August 9" label at 48px is legible at
  reduced sizes.
- Signal-use check: none present — pass.
- Known limitations: the `SymbolicFigure` primitive is a first-pass silhouette
  built from simple stacked circle/capsule shapes; a refined outlined-brand-mark
  version could sharpen the torso/arm silhouette in a later creative pass, but
  it already satisfies "no facial features, no head tilt, not a mascot."
- Pass/fail: **PASS**. Creative-review status: pending author sign-off on
  candidate A vs B posture.

### 4–8. SyntheticMultiplication
- Reused assets: `AepochScene`, Void/Depth theme surfaces (baseline).
- New assets: `EchoCluster` (Mimicry), `SyntheticUnit`/`ReplicationGrid`
  (Multiplication), `PressureField` (Manufactured consensus).
- Theme per approved `scene-plan.yaml`: sc05/sc06 (Mimicry, Multiplication) use
  `void`; sc07 (Manufactured consensus) uses `depth` — verified against the
  YAML, not guessed.
- Brand-rule checks: no speech bubbles/social-media cards/browser UI (Mimicry)
  — pass. No generic "AI" iconography, sharp mechanical regularity
  (Multiplication) — pass. No literal server racks, no hooded figures, no
  named platform, no conspiracy-poster aesthetic (Manufactured consensus) —
  pass. All three configurations are visually distinct compositions, not one
  grid at increasing density — pass (Mimicry is a loose organic ring around
  one warm figure; Multiplication is a precise sharp grid; Manufactured
  consensus is a bar-coded compressed panel with directional pressure lines).
- Mobile readability: central Clay figure in Mimicry remains the clearest,
  brightest element even at reduced scale; the grid and pressure-field
  configurations read as abstract textures at any scale, which is the
  intended "systemic, not literal" read.
- Neighboring-scene differentiation: confirmed distinct — see
  `neighboring-scenes-contact-sheet.png` row 2.
- Signal-use check: none present — pass.
- Known limitations: `EchoCluster`'s jitter uses the shared seeded PRNG
  (`random.ts`, unmodified) with a fixed per-candidate seed, so candidate A/B
  are deterministic but not independently art-directed beyond seed choice.
- Pass/fail: **PASS**. Creative-review status: pending author sign-off,
  particularly on Mimicry vs Manufactured consensus candidate pairs.

### 9–10. HumanConsequence
- Reused assets: `AepochScene`, Depth theme (baseline).
- New assets: `UncertainReflectionForm` (overlapping incomplete arcs),
  `ExtractionFlow` (tapering directional flow), a small inline sharp
  "critiqued system" shape (episode-local, not a formal `ASSET_INDEX.md`
  addition).
- Theme per approved `scene-plan.yaml`: both sc09/sc10 use `depth`.
- Brand-rule checks: no literal mirror or screen (Uncertain reflection) —
  pass, the reflection never resolves into a clean copy of the human. No
  battery/fuel-gauge/medical imagery (Extraction) — pass, uses a tapering
  line only. Human remains whole and dignified in both — pass.
- Mobile readability: the human silhouette remains the dominant, legible
  element in both stills; the reflection/extraction elements are secondary
  and intentionally more abstract.
- Signal-use check: none present — pass.
- Known limitations: `HumanConsequence` is Tier 2 (speced, not yet
  implemented in code prior to this phase) — this is the first code for it;
  full motion behavior (`humanEnter`, `centralizedConstraint`) is still
  unbuilt, per this phase's scope.
- Pass/fail: **PASS**. Creative-review status: pending author sign-off.

### 11–12. DeclarativeHook variants
- Reused assets: `AepochScene`, Void theme, brand typography tokens (baseline).
- New assets: `LegacyStructure` (stacked rigid band geometry, distinct from
  the Tier 1 DeclarativeHook's own "production system" geometry so the two
  don't read as the same frame).
- Theme per approved `scene-plan.yaml`: both sc11/sc12 use `void`.
- On-screen text matches the approved `scene-plan.yaml` `onScreenText` fields
  exactly: "Built for another world." / "Can't see attention, care,
  creativity."
- Brand-rule checks: Scene 11 has **no human node anywhere** in the
  composition — pass. Scene 12 introduces a small, quiet, unacknowledged
  human node (`state="present"`, 0.8 opacity, no connecting edge to the
  system) at the structure's boundary, and the structure itself has a
  notch/gap at that boundary — pass, this is a genuine compositional
  difference, not the same frame with one added circle. Reads as obsolete/
  mismatched, not evil — pass, no menacing color or motion implied.
- Mobile readability: headline at 88px remains legible; the legacy-structure
  geometry is secondary/lower-right and doesn't compete with the text.
- Neighboring-scene differentiation: confirmed — see
  `neighboring-scenes-contact-sheet.png` row 3 and
  `tier1-variants-contact-sheet.png`.
- Signal-use check: none present — pass.
- Pass/fail: **PASS**. Creative-review status: pending author sign-off.

### 13. CircularValueField — traffic data
- Reused assets: `AepochScene`, Paper theme, brand typography tokens (baseline).
- New assets: `TrafficDataField` (circular pole with a large tabular-numeral
  value, since the frozen `CircularValueField` never renders `field.value` —
  see "Component architecture decisions" above).
- On-screen text matches approved `scene-plan.yaml` exactly (verified via the
  same corrected wording from Phase 13A.1): "53% automated. Could climb past
  90%."
- Brand-rule checks: Paper background — pass. Strong numeric hierarchy via
  108px tabular numerals — pass. No spinning-counter aesthetic (fully static)
  — pass. No visible source citation — pass.
- Mobile readability: 108px numerals remain legible even scaled to a phone
  frame; labels beneath at 27px are the practical minimum for this treatment.
- Signal-use check: none present — pass.
- Pass/fail: **PASS**. Creative-review status: pending author sign-off.

### 14–15. CircularValueField — ancient idea / modern tools
- Reused assets: `AepochScene`, Earth Rise theme, circular-pole visual
  grammar (styled consistently with the frozen component's `CircularSubject`,
  rebuilt locally since the frozen component has no rendered connecting-path
  option).
- New assets: `Pole` (circular field without a subject icon, label beneath),
  connecting-path treatment (candidate A: straight restrained line; candidate
  B: gentle curved line).
- On-screen text updated to match approved `scene-plan.yaml` exactly: "An
  ancient idea. Modern tools."
- Brand-rule checks: `relationship='balanced'`, not `converge` — pass, no
  translation/convergence math applied at all, poles sit at their fixed
  separated positions. No Æ mark convergence, no vesica, no white Signal ring
  — pass, confirmed by code inspection (no `AepochMark`, no white/vesica
  geometry, no Signal color anywhere in `CircularValueFieldConnectedPoles`).
  Must not resemble the preceding Signal scene — pass, see Signal-use check
  below.
- Mobile readability: both poles and the connecting line remain legible at
  reduced scale; the connecting line is intentionally thin (3px) so it
  doesn't compete visually with the poles themselves.
- Neighboring-scene differentiation: confirmed — see
  `neighboring-scenes-contact-sheet.png` row 4.
- Signal-use check: **verified by code inspection** — `Signal` color
  (`#6B5FED`) and `signal-reveal`/`signalReveal` tokens do not appear
  anywhere in the episode's new source (`grep` returned no matches across
  `components.tsx`, `variants.tsx`, `static-previews.tsx`, `types.ts`,
  `tokens.ts`). This scene cannot be mistaken for a second Signal reveal.
- Pass/fail: **PASS**. Creative-review status: pending author sign-off on
  candidate A (straight line) vs B (curved line).

### 16–17. HumanNetwork — protocol layer
- Reused assets: `AepochScene`, `HumanNode` (baseline), Earth Rise theme.
- New assets: none beyond a simple SVG ellipse for the shared ring (no new
  reusable component needed beyond what's already in `variants.tsx`).
- Headline matches approved `scene-plan.yaml` exactly: "A layer for the
  internet."
- Brand-rule checks: individually distinct human nodes (varied `state`:
  `active`/`present`, giving different ring colors) sharing one restrained
  ring — pass. No browser UI, no technical stack diagram, no Signal — pass,
  confirmed by code inspection. Visually communicates "a layer for the
  internet" — pass, the ring reads as a shared protocol layer beneath/around
  individual participants.
- Mobile readability: 7 nodes at 88px with clear individual separation
  remain legible; the ring itself is thin (3px) and doesn't overwhelm the
  nodes.
- Neighboring-scene differentiation: confirmed — see
  `neighboring-scenes-contact-sheet.png` row 5.
- Signal-use check: none present — pass.
- Pass/fail: **PASS**. Creative-review status: pending author sign-off on
  candidate A (evenly spaced ring) vs B (looser organic spacing, larger ring).

### 18. HumanNetwork — participant cohort (frozen component, new data)
- Reused: entire `HumanNetwork` component and validator, unmodified.
- Brand-rule checks: natural unequal node spacing — pass. Each human node
  visually distinguishable via position — pass. Not governance/voting — pass,
  no `vote`-type edges used, only `relationship` edges. Not a hierarchy —
  pass, no node is larger or positioned as a "root."
- Mobile readability: 9 nodes with organic spacing remain individually
  legible at 96px.
- Signal-use check: none present — pass.
- Pass/fail: **PASS**. Creative-review status: pending author sign-off.

### 19. FlowLifecycle — 42-day test (frozen component, new data)
- Reused: entire `FlowLifecycle` component and validator, unmodified.
- Brand-rule checks: exactly the four locked labels — "Start August 9," "Test
  what we built," "Notice what happens," "Shape what comes next" — pass. No
  fifth stage for "Things will break"/"That's normal" (carried as narration
  only, not represented as a step) — pass. All four labels readable at
  1920×1080 — pass, verified visually; card width comfortably fits each label
  at 34px.
- Mobile readability: four equal cards with 88px icons and 34px labels remain
  legible at reduced scale; this is the same card treatment already approved
  in the Tier 1 static review.
- Signal-use check: none present — pass.
- Pass/fail: **PASS**. Creative-review status: pending author sign-off.

### 20. AepochSeriesOutro
- Reused assets: `AepochMark`, `AepochScene`, Earth Rise theme (all baseline).
- New assets: none — this composition is entirely built from existing
  baseline primitives plus new copy.
- Brand-rule checks: "See you tomorrow." conclusion, canonical Æ mark,
  "ÆPOCH" identifier — pass. No stacked CTA, no "like and subscribe," no
  animated social icons — pass (all absent by construction). No Signal
  reveal — pass, confirmed by code inspection. Clean end-screen-safe hold
  with generous negative space — pass.
- Mobile readability: conclusion text at 68px and identifier at 24px remain
  legible; ample negative space around the mark.
- Signal-use check: none present — pass.
- Pass/fail: **PASS**. Creative-review status: pending author sign-off.

## Contact sheets

All under `projects/aepoch-episodes/001-what-is-aepoch/qa/`:

1. `complete-reference-contact-sheet.png` — all 20 stills, 4×5 grid, labeled by filename.
2. `new-modules-contact-sheet.png` — the 11 stills across the four new modules (WelcomeDirectAddress ×3, SyntheticMultiplication ×5, HumanConsequence ×2, AepochSeriesOutro ×1).
3. `tier1-variants-contact-sheet.png` — the 9 stills across the seven episode-specific Tier 1 variants.
4. `neighboring-scenes-contact-sheet.png` — the seven sequences specified in the Phase 13B prompt, one row each, explicitly labeling which comparison items fall outside this phase's scope (plain `KeyStatement` reuses — Mission, Already a contribution, ÆPOCH is our response / the Signal reveal, Final thesis, Biological transformer — none of which required a new static reference under this phase).

Built with ImageMagick `montage`/`convert` (already available on this
machine; no new dependency introduced).

## Technical validation

- **Type-check**: `npx tsc --noEmit` inside `remotion-composer/` reports the
  same 51 pre-existing legacy diagnostics as the unmodified baseline (verified
  by diffing against a `git stash`'d run) — only line numbers shift from this
  phase's insertions into `Root.tsx`. **Zero new diagnostics** attributable to
  `src/aepoch/episodes/001-what-is-aepoch/*` or to the Root.tsx additions.
- **Composition discovery**: `npx remotion compositions src/index.tsx` lists
  all 20 `Aepoch-E001-Static-*` IDs at 1920×1080, 30 fps.
- **Render**: all 20 required stills rendered successfully via
  `npx remotion still src/index.tsx <id> <output>.png --frame=0`.
- **Dimensions**: `identify -format "%wx%h"` confirms all 20 outputs are
  exactly `1920x1080`.
- **Determinism**: three representative stills — one plain new-module render
  (`01-welcome-direct-address-a.png`), one using the seeded PRNG
  (`04-synthetic-mimicry-a.png`, via `EchoCluster`), and one frozen-component
  reuse (`19-flow-lifecycle-42-day-test.png`) — were each rendered twice.
  SHA-256 hashes matched exactly on both renders in all three cases:

  | Still | SHA-256 |
  |---|---|
  | `01-welcome-direct-address-a.png` | `3d3f9a30cbd9c7c35894523ac29b258dc4d021e99a1b91db2f795d0b8c0b4c06` |
  | `04-synthetic-mimicry-a.png` | `6433c18870bd842000dbe1b28a1614339c5feee90d166e665d25b7b07b4a1035` |
  | `19-flow-lifecycle-42-day-test.png` | `02fbbd133a8934268998e8d8e5e266be219cbd4761401df7adb3c28202b7aa86` |

- **Full manifest**: SHA-256 for all 20 stills recorded below (single-render;
  the three above were the double-rendered determinism sample).

  | Still | SHA-256 |
  |---|---|
  | `01-welcome-direct-address-a.png` | `3d3f9a30cbd9c7c35894523ac29b258dc4d021e99a1b91db2f795d0b8c0b4c06` |
  | `02-welcome-direct-address-b.png` | `07d3e3516a63d552d14d2267a46eae4d247615ceda8894585ff50d37534f347f` |
  | `03-august-9-continuation.png` | `31128a0655820591edd1f698818b4e977db1ab19c7c7d6d31a568302728114d1` |
  | `04-synthetic-mimicry-a.png` | `6433c18870bd842000dbe1b28a1614339c5feee90d166e665d25b7b07b4a1035` |
  | `05-synthetic-mimicry-b.png` | `0525e82c324db6350541c2d669df25a11d820a0c8f6e863f25af9e614ff7630d` |
  | `06-synthetic-multiplication.png` | `09483583c4e995306e5946ba42e396d6b7729cadaba62215c3f8c037b2c1856f` |
  | `07-manufactured-consensus-a.png` | `4915e252f02fd99c15ba9019cd814b979c7fdf069120fdf9a8e91082a49af152` |
  | `08-manufactured-consensus-b.png` | `99e2388adb77989a5cce5e5eab10fec142e9ce15f72ab283a250668f66da5067` |
  | `09-human-consequence-uncertain-reflection.png` | `8ff70dbfc45bb4a5878214ad9ccf610a4db05a41c9c9738ff00f6b8e94b50233` |
  | `10-human-consequence-extraction.png` | `0934860f25abcf177eb08b750daeb2a248c4391e5fbc5051a90ac6356eb98184` |
  | `11-declarative-hook-built-for-another-world.png` | `8a78a5c350ddeca01412f85f70c412f8471d4a235b6dea5bf8036fcc2d85b3ae` |
  | `12-declarative-hook-does-not-recognize-presence.png` | `3de3d8134afaa0bf2ca16394ba3cde761f42359f670c8ccdb8f37e3cacdf0e27` |
  | `13-circular-value-field-traffic-data.png` | `920363e3ed37a1cae58160bd5bdd7978a0e04652a37b33ba1f77359e0a2f86b3` |
  | `14-ancient-idea-modern-tools-a.png` | `88371135dd2f1d3bff28a91c5232770d6906aae889618561e9d35f0abd1e217e` |
  | `15-ancient-idea-modern-tools-b.png` | `f802c11a28179688ee2e2324693ea90f8a1f7dfe8d1090835d3bafc68d74cd63` |
  | `16-human-network-protocol-layer-a.png` | `1d44b51e4f316bcd2cc3f40383ac06085168b9eee7665b73daa00517d156e197` |
  | `17-human-network-protocol-layer-b.png` | `cfac1c689ad3a6b8e3a1cd8ad198f80849347789ca2755f29746c05bd622d6eb` |
  | `18-human-network-participant-cohort.png` | `f91a21a58b7ddff4f442f2a82dcad97c042fe940f106282f88fa22e0ec001d01` |
  | `19-flow-lifecycle-42-day-test.png` | `02fbbd133a8934268998e8d8e5e266be219cbd4761401df7adb3c28202b7aa86` |
  | `20-aepoch-series-outro.png` | `ae196039601de10a224189606d68882d0a97d0aff94bfe06d1fdd5af3618b010` |

- **Moss check**: `grep -rn "moss\|Moss"` across the episode's new source
  returns no matches — Moss is absent, as required (this episode contains no
  Proof of Life verification scene).
- **Signal check**: `grep -rn "AEPOCH_COLORS.signal\|#6B5FED\|signal-reveal\|signalReveal"`
  across the episode's new source returns no matches — Signal is used zero
  times in this phase's new stills, confirming the single approved
  "ÆPOCH is our response" scene (out of this phase's scope, unmodified)
  remains the only Signal use in the episode.
- **`Math.random()` check**: no occurrences in render paths (only in code
  comments explaining the seeded-PRNG approach); `EchoCluster`'s jitter uses
  `createSeededRandom` from the baseline's `random.ts`, unmodified.
- **Scene 11 vs Scene 12 differentiation**: verified both by code (Scene 11
  has zero human-node JSX; Scene 12 adds one at reduced opacity plus a notch
  in the legacy-structure geometry) and visually via the contact sheets.
- **Ancient-idea/modern-tools vs Signal-scene confusion**: verified by code
  (no `AepochMark`, no vesica, no white ring, no Signal color anywhere in
  `CircularValueFieldConnectedPoles`) and by the composition itself (two
  separated, distinctly colored poles joined by one thin static line).
- **FlowLifecycle label readability**: verified visually — all four labels
  fit their cards without truncation or overlap at 1920×1080.
- **Participant cohort hierarchy check**: verified — no node is enlarged,
  centered-as-root, or connected via `vote`-type edges.
- **Direct-address mascot check**: verified — `SymbolicFigure` has no facial
  features, no head tilt, and uses the same flat abstracted-silhouette
  vocabulary as the rest of the Tier 1 system (not a rendered/detailed
  character).

## Known limitations

- `SymbolicFigure`, `EchoCluster`, `ReplicationGrid`, `PressureField`,
  `UncertainReflectionForm`, and `ExtractionFlow` are first-pass episode-local
  components, not yet promoted to `brands/aepoch/<asset-family>/` or listed in
  `ASSET_INDEX.md`. Per `SCENE_MODULES.md` §4, generated story-specific assets
  belong under `projects/<episode-id>/assets/generated/` until approved as
  reusable; these are React/SVG components rather than image assets, so they
  live in the episode's Remotion source instead, but the same "not yet
  promoted to reusable" status applies.
- Candidate pairs (Welcome A/B, Mimicry A/B, Manufactured consensus A/B,
  Ancient-idea/modern-tools A/B, Protocol-layer A/B) are unresolved creative
  decisions — this review does not pick a winner; that's the author/creative
  lead's call at the pre-existing "reviewed and approved" gate in the episode
  brief's definition of done.
- No motion, narration, or caption behavior was implemented for the four new
  modules — only enough component scaffolding exists to render their settled
  static composition, per this phase's explicit scope.

## Stop condition confirmation

Per the Phase 13B prompt: static source scaffolding is complete, all 20
required stills are rendered, all 4 contact sheets are rendered, this QA
document is complete, and type-check/determinism checks pass. No full scene
animation, narration, captions, episode timeline assembly, or MP4 render was
performed. The approved narration and the tagged Tier 1 beta baseline were not
modified. Stopping here — Phase 13C has not begun.

---

# Phase 13B.1 — Static Creative Correction and Full Storyboard Review

Status: **PASS**
Review date: 2026-07-28
Scope: focused correction pass following creative review of the Phase 13B
contact sheets, plus a complete 22-scene episode storyboard contact sheet.
No full scene animation, no narration/audio/captions/MP4, no timed episode
assembly, no change to approved narration/research/scene timing. The tagged
`aepoch-tier1-beta-v0.1.0` baseline was imported but not modified.

## Approved candidate directions (resolved this phase)

Three candidate pairs from Phase 13B are now resolved to a single approved
base — these no longer render as A/B pairs:

| Element | Resolved to | Prop object |
|---|---|---|
| SyntheticMultiplication — Mimicry | Candidate A | `synthMimicryProps` |
| CircularValueField — ancient idea / modern tools | Candidate A, straight connecting path | `ancientIdeaModernToolsProps` |
| HumanNetwork — protocol layer | Candidate B, organic human spacing | `humanNetworkProtocolLayerProps` |

Welcome and Manufactured Consensus keep two candidates each — both were
fully rebuilt (Corrections 1 and 4), so the candidate question is now "which
new design," not "which of the old pair."

## Correction 1 — Welcome human form (full `SymbolicFigure` rebuild)

The Phase 13B figure read as a stacked-capsule toy: head ≈19% of total
height (spec calls for 1/7–1/8), fused arm/torso silhouette, stubby ~21%-of-
height legs. Rebuilt on an 8-head-unit grid (240×720 viewBox, head diameter
exactly 1/8 of total height) in `components.tsx`:

- **Head**: 90px diameter / 720px total height = 12.5% (1/8) — within the
  required 1/7–1/8 range.
- **Shoulders**: a dedicated shoulder bar (160px wide) establishes
  recognizable shoulder width independent of the torso.
- **Torso**: inset from the shoulder bar with a restrained straight-sided
  taper to the waist, slight hip flare at the base.
- **Arms**: attach at the shoulder bar's uncovered end-caps, outside the
  torso's (narrower, inset) side edges — guaranteed visible negative space
  between arm and torso by construction, not by hand-tuning.
- **Legs**: ~3.5 head-units long (vs. the old figure's ~1.3 units) — a
  Phase 13B.1 mid-correction bug fix was also needed here: the first
  rewrite's rounded foot caps bulged inward and merged into what rendered as
  a single leg (visible in an intermediate render, caught before finalizing);
  fixed by replacing the bezier foot caps with simple straight-sided
  trapezoids plus a small elliptical arc per foot, which by construction
  cannot cross the opposite leg's boundary.
- **Head never moves** — only limb groups (arms, legs) shift between
  `posture="settled-a"` / `"settled-b"`, so "no head tilt" holds structurally,
  not just by convention.
- No facial features, no clothing details, no personality gesture — confirmed
  by code inspection (the component has no face/clothing paths at all).

Two new candidates rendered (`01-welcome-direct-address-a.png`,
`02-welcome-direct-address-b.png`), differing only in the restrained
weight-shift/arm-swing offsets. The August 9 continuation
(`03-august-9-continuation.png`) uses candidate A as the default — **this is
a placeholder choice pending author sign-off between the two new
candidates, not a creative decision made silently**; the ring/figure sizing
math was also re-derived for the new figure's 1:3 (width:height) aspect
ratio, since the old math assumed the previous ~1:1.6 ratio and would have
produced a wildly oversized or undersized figure otherwise.

## Correction 2 — Dark-scene scale

Added `DARK_SCENE_SCALE = 1.3` (30%, within the requested 25–40% range) in
`tokens.ts`, applied to:

- `EchoCluster` (Mimicry) — container `transform: scale(1.3)`.
- `ReplicationGrid` (Multiplication) — same.
- `ManufacturedConsensusField` (both candidates) — same.
- `HumanConsequence` — `SymbolicFigure` size increased directly (195, vs. a
  ~150 natural baseline for this composition) and `UncertainEcho`/
  `LegacyStructureCompact` sized proportionally larger, rather than a blanket
  CSS transform, since these compositions mix multiple independently-
  positioned elements.

All five corrected compositions read as clearly dominant, editorial-scale
presences rather than small symbols floating in empty frames, while
retaining generous surrounding negative space — verified visually against
each rendered still.

## Correction 3 — Mimicry

Candidate A retained as the base. Fixes in `EchoCluster`:

- Every echo now uses **one mechanically repeated pose**
  (`posture="settled-a"` for all echoes) — the Phase 13B version alternated
  `settled-a`/`settled-b` per echo, which read as varied individuals rather
  than a repeated imitation.
- `MIMICRY_ECHO_JITTER` tightened (`tokens.ts`): `offsetPx` 14→10,
  `scaleRange` 0.06→0.03, `opacityRange` 0.14→0.07, and the opacity clamp
  narrowed to 0.20–0.34 (was 0.16–0.42) — echoes now read as nearly
  identical, not loosely varied.
- The warm Clay-colored central figure remains visually dominant against the
  cool, muted Prism echoes — confirmed visually.

## Correction 4 — Manufactured Consensus (full replacement)

The Phase 13B version (a bordered bar-coded panel with inward-arrow
markers) read as a device/interface — exactly what this correction forbids.
Replaced with `ManufacturedConsensusField` in `components.tsx`: a direct
visual evolution of `ReplicationGrid` — the same identical sharp
`SyntheticUnit` tiles, now in **mechanically perfect (not accelerating)**
rows spanning a broad horizontal field, with straight (non-arrow) drop-lines
connecting each unit down to one of two candidate resolutions:

- **Candidate A ("pressure")**: one flat, unbordered, uniform band — the
  merged output.
- **Candidate B ("rhythm")**: a row of perfectly uniform pulse bars —
  identical height, evenly spaced — reading as synchronization rather than
  a single mass.

No border, no device rectangle, no arrows, no elevator-like symbols, no
interface language, no server racks, no named platform, no
conspiracy-poster aesthetic — verified by code inspection (no `rect` with a
`stroke` forming a frame, no `marker`/arrowhead elements) and visually.

## Correction 5 — Uncertain Reflection (full replacement)

The Phase 13B version (three standalone concentric arcs) risked reading as
a Wi-Fi/broadcast-signal icon. Replaced with `UncertainEcho`: a broken,
offset echo of the human silhouette itself — a head-fragment and a
torso-fragment (reusing the head/torso geometry language of `SymbolicFigure`,
at low opacity in the cool Iris/Prism/Pearl system register) that are
deliberately misaligned (the head doesn't sit above the torso), plus a
second, smaller, cooler torso echo offset the other way to suggest
instability without becoming a clean duplicate. No arcs, no rings, nothing
resembling a signal/broadcast icon — verified visually against the
rendered still.

## Correction 6 — Extraction

Replaced the generic bordered-grid destination with `LegacyStructureCompact`
— a compact version of the same stacked-band `LegacyStructure` geometry used
in Scenes 11/12 (moved into `components.tsx` so both scenes can share it),
so the extraction destination now reads as visually related to the
established legacy-system family. `ExtractionFlow`'s single fading multi-
segment line was replaced with `ExtractionStrands`: exactly **three**
distinct, unlabeled, single-curve strands (not a fading trail whose count is
ambiguous). No battery/fuel/medical/life-bar imagery; the human silhouette
is unchanged, not diminished or damaged — verified by code inspection (no
opacity/scale reduction applied to the human figure in the extraction
state) and visually.

## Correction 7 — Traffic Data

Rebuilt field ordering and framing in `CircularValueFieldTrafficData`:

- Projected value now reads **"90%+"** (was a bare "90%", which understated
  "could climb past").
- The duplicate italic footer sentence (which repeated both stats a second
  time below the fields) is removed entirely.
- Each field now carries its exact approved wording exactly once, in
  natural reading order: "Today / **53%** / Automated." and "Estimated /
  Could climb past / **90%+**" — verified this reconstructs the approved
  sentences ("53% automated." / "Could climb past 90%.") when read top to
  bottom.
- Current vs. projected are now visually distinguished: solid ring + solid
  fill for the current/measured field, dashed ring + lighter fill for the
  projected field, plus "Today"/"Estimated" eyebrow tags.
- Paper background retained, 100px tabular numerals retained, no visible
  source citation — confirmed unchanged.

## Correction 8 — 42-Day Test (full replacement)

The four-card `FlowLifecycle` treatment is replaced with a new local
component, `FlowLifecyclePathVariant` — deliberately **not** a reskin of the
frozen `FlowLifecycle` (`../../modules`), since that component's entire
layout is card-based. A single Comet-Arc-family curve (same Iris color, same
3px baseline stroke, same restrained rounded-cap style as `CometArcPartial`
in the Welcome/August 9 scenes) carries four waypoint dots, one per locked
label — "Start August 9," "Test what we built," "Notice what happens,"
"Shape what comes next" — with no fifth waypoint for "Things will break" /
"That's normal" (still narration-only). No cards, no bordered containers, no
dashboard/onboarding appearance. Waypoint positions are computed with the
same quadratic-bezier formula used to draw the curve itself
(`quadraticPoint()`, sharing `PATH_P0`/`PATH_P1`/`PATH_P2`), so dots are
guaranteed to sit exactly on the drawn path rather than being eyeballed
separately.

**Known limitation**: the label for the first waypoint ("Start August 9,"
near the bottom-left of the arc, where the curve is steepest) sits closer to
its dot than the other three labels do, since the "stagger above/below"
placement rule doesn't fully account for local curve slope. It remains
legible and unambiguously associated with the correct dot; a future pass
could offset it further if flagged in creative review.

## Correction 9 — Series Outro

`AepochMark` width increased 64px → 96px; identifier font size increased
24px → 32px with wider tracking. Composition, end-screen-safe negative
space, and copy are otherwise unchanged. No CTA, no Signal, no decorative
clutter — confirmed unchanged by code inspection.

## Full episode storyboard

`qa/full-episode-storyboard-contact-sheet.png` — all 22 approved scenes,
in actual scene order, clearly numbered with scene name beneath each frame,
consistent 380×214 thumbnail size, no missing or placeholder frames, no
caption panels. Every frame uses the scene's intended settled visual state.

Seven scenes needed a render that didn't exist before this phase because
they reuse the frozen Tier 1 `KeyStatement`/`DeclarativeHook` modules as-is
(Scenes 3, 4, 13, 15, 17, 20, 21) — these are genuinely new renders (new
`Aepoch-E001-Static-Scene*` compositions in `static-previews.tsx`/`Root.tsx`),
but **not new creative design work**: the frozen components are used
exactly as they already exist, with this episode's approved on-screen text
as data, per the prompt's explicit "do not redesign approved Tier 1 scenes
merely to create this sheet."

**Known limitation carried into these renders**: the frozen `KeyStatement`
component doesn't currently branch its rendering on `accentTreatment` or
`layout` at all (confirmed by code inspection of `../../modules.tsx`) — so
Scene 13's Signal reveal renders with the same Iris arc + human node as
every other `KeyStatement` scene, not a distinct Signal-colored treatment.
This is a pre-existing Tier 1 baseline limitation already documented in the
Phase 13B section above (Correction/Signal-use check), not something this
phase introduced. It also means Scenes 3, 13, 15, 17, 20, and 21 are more
visually repetitive than the written scene plan implies, since all six
`KeyStatement` uses currently look nearly identical except for text — this
is a **flagged finding for creative/engineering review**, not a defect this
phase is scoped to fix (fixing it means extending the Tier 1 baseline's
`KeyStatement` component, which is out of scope and would touch the tagged
baseline).

### Review findings from the full storyboard

- **Repetitive layouts**: confirmed above — six `KeyStatement` scenes
  (3, 13, 15, 17, 20, 21) currently render near-identically. Flagged for a
  future phase to extend the frozen component's `accentTreatment`/`layout`
  handling (would require a baseline version bump, not an episode-local fix).
- **Excessive KeyStatement reuse**: 6 of 22 scenes (27%) — consistent with
  the ratio already documented and approved in Phase 13A.1's episode brief;
  not a new finding.
- **Earth Rise / Void-Depth alternation**: clearly visible on the sheet —
  Scenes 1–3 open on Earth Rise (welcome), Scenes 4–12 (the entire problem/
  setup stretch) sit on Void/Depth, and Scene 13 onward returns to Earth
  Rise/Paper through the end. This matches `VISUAL_LANGUAGE.md`'s rule that
  Void/Depth stay confined to hook/setup.
- **Signal exclusivity**: confirmed — only Scene 13 is the Signal scene;
  `grep` across all episode-local source confirms no Signal color/token
  appears anywhere else.
- **Visual escalation through the problem section**: Scenes 4→12 read as an
  escalating sequence (built-for-humans → mimicry → multiplication →
  manufactured consensus → traffic stats → uncertain reflection → extraction
  → built-for-another-world → does-not-recognize-presence), each heavier
  than the last.
- **Warm return at "ÆPOCH is our response"**: confirmed — Scene 13 is the
  first Earth Rise frame after nine consecutive Void/Depth scenes, landing
  exactly where the episode brief's emotional arc calls for it.
- **Final sequence pacing**: Scenes 17–22 alternate `KeyStatement` beats
  with diagram/network scenes (18, 19, 22) rather than stacking similar
  scenes back to back.
- **Mobile-scale hierarchy**: at storyboard-thumbnail scale, the Void-themed
  abstract compositions (5, 6, 7) read as smaller/quieter than the
  Earth-Rise scenes — consistent with their intentionally abstract,
  systemic register, but worth a explicit mobile-device check (not just a
  thumbnail check) before this episode locks, since thumbnail scale isn't a
  perfect proxy for an actual phone screen.

## Regenerated and new contact sheets

All under `projects/aepoch-episodes/001-what-is-aepoch/qa/`:

1. `complete-reference-contact-sheet.png` — regenerated, now 17 corrected
   stills (down from 20, since three redundant candidate renders were
   dropped per the resolved-candidate corrections above).
2. `new-modules-contact-sheet.png` — regenerated, 10 stills across the four
   new modules.
3. `tier1-variants-contact-sheet.png` — regenerated, 7 stills across the
   seven episode-specific Tier 1 variants.
4. `neighboring-scenes-contact-sheet.png` — regenerated with real renders
   throughout (Phase 13B's version had to flag several comparison items as
   "out of scope" with no image; every sequence now shows real frames,
   including the Signal reveal and all six `KeyStatement` scenes).
5. `full-episode-storyboard-contact-sheet.png` — new, all 22 scenes.

## Technical validation

- **Type-check**: `npx tsc --noEmit` reports the same 51 pre-existing
  legacy diagnostics as the unmodified baseline (confirmed by diffing
  against a `git stash`'d baseline run with line numbers normalized) —
  **zero new diagnostics** attributable to this phase's changes.
- **Composition discovery**: `npx remotion compositions src/index.tsx`
  lists all 24 `Aepoch-E001-Static-*` IDs (17 corrected/retained + 7
  storyboard-only) at 1920×1080, 30fps.
- **Render**: all 17 corrected stills and all 22 full-storyboard frames
  rendered successfully via `npx remotion still ... --frame=0`.
- **Dimensions**: `identify -format "%wx%h"` confirms all 17 corrected
  stills and all 22 storyboard frames are exactly `1920x1080`.
- **Determinism**: four representative compositions — including
  `SynthMimicry` (uses the seeded PRNG via `EchoCluster`),
  `ManufacturedConsensusB` (the new rhythm-candidate design), and
  `FlowLifecyclePath` (the new Comet-Arc waypoint component) — were each
  rendered twice. SHA-256 matched exactly in all four cases:

  | Composition | SHA-256 |
  |---|---|
  | `WelcomeA` | `91a44b8fee14942f0c9520938b9b7d651f957b53262eb32fb4034989497f6605` |
  | `SynthMimicry` | `334471436e250ca8df9bf7162124f508e4ee10ed5f13ca0dea20d90d09e7708c` |
  | `ManufacturedConsensusB` | `1ac0446890a12638d8a1bf2aa9b1973e81460f12f2b535148e0d148281f2d0e4` |
  | `FlowLifecyclePath` | `304746c9b36fdce3800947fb3de9a8e892ad047fe5eee7f7ec5061f9eda9d02e` |

- **Moss check**: `grep -rn "moss\|Moss"` across the episode's source
  returns no matches.
- **Signal check**: `grep -rn "AEPOCH_COLORS.signal\|#6B5FED\|signal-reveal\|signalReveal"`
  matches only Scene 13's `id`/`accentTreatment` (the one approved Signal
  scene) — no Signal color or token appears anywhere else in the episode's
  source.
- **`Math.random()` check**: no occurrences in render paths.
- **Direct-address mascot check**: verified — the rebuilt `SymbolicFigure`
  has recognizable shoulders, a tapered torso, separated arms, and
  proportionate (1/8-height-head) longer legs; it reads as an editorial
  adult silhouette, not a mascot, toy, or stacked-capsule character.
- **Manufactured Consensus interface check**: verified — no border, no
  device rectangle, no arrows, no elevator symbols, no interface language
  anywhere in `ManufacturedConsensusField`.
- **Uncertain reflection Wi-Fi check**: verified — `UncertainEcho` contains
  no concentric-arc geometry at all; it's built from offset head/torso
  fragments instead.
- **42-day onboarding-interface check**: verified — `FlowLifecyclePathVariant`
  contains no card, border, or container elements; only a path, dots, and
  plain text labels.
- **Outro phone-scale legibility check**: verified visually — the enlarged
  96px mark and 32px identifier read clearly at the rendered still's full
  resolution and remain legible scaled down to a phone-sized preview.

## Stop condition confirmation

Per the Phase 13B.1 prompt: all nine corrections are implemented and
rendered, the three resolved candidate directions are retained as approved
bases, all 17 corrected stills and all 22 full-storyboard frames are
rendered at 1920×1080, all five contact sheets render successfully,
determinism is confirmed on four representative compositions, type-check
reports zero new diagnostics, and this QA document is updated. No full
scene animation, narration, audio, captions, MP4 render, or timed episode
assembly was performed. The approved narration, research, and scene timing
were not modified. The tagged Tier 1 beta baseline was not modified.
Stopping here — Phase 13C has not begun.

---

# Phase 13B.2 — KeyStatement Differentiation and Final Static Storyboard Lock

Status: **PASS**
Review date: 2026-07-28
Scope: narrow final static-design pass correcting settled-state repetition
among Scenes 3, 13, 15, 17, 20, 21, plus a Scene 18 label-readability fix and
a final full-storyboard regeneration/lock. No full scene animation, no
narration/audio/captions/MP4, no timed episode assembly, no change to
narration/scene timing/research. The tagged `aepoch-tier1-beta-v0.1.0`
baseline was imported but not modified.

## Repeated-layout issue identified

The Phase 13B.1 full-storyboard sheet showed Scenes 3, 13, 15, 17, 20, and 21
all rendering as visually near-identical compositions: left-aligned text,
a pale Cosmos-toned circle at upper right, a blue Comet Arc, and a small
Clay-colored human beneath it. This was a direct consequence of Phase
13B.1's storyboard-completion work reusing the same frozen `KeyStatement`
component for all six scenes with only the statement text changed — the
frozen component doesn't branch its rendering on any other prop (documented
as a known limitation in the Phase 13B section above), so six narratively
distinct moments collapsed into one visual template.

## New episode-specific components created

Five new local components in `variants.tsx` (backed by two new shared
primitives in `components.tsx`: `SignalVesica`, `BreathRings`), each with
its own prop type in `types.ts`. None reskin or extend the frozen
`KeyStatement` type — they are independent compositions built from the
episode's own primitives and the baseline's low-level pieces
(`SymbolicFigure`, tokens, `AepochScene`).

| Scene | Component | Macro-layout |
|---|---|---|
| 3 (unchanged, reference baseline) | frozen `KeyStatement` | Left text / upper-right pale Cosmos circle + Comet Arc / small human beneath |
| 13 | `SignalStatement` | Dead-center vertical stack: vesica, then text — the strongest, most formal, most symmetric composition in the episode |
| 15 | `ContributionStatement` | Horizontal relationship: human + ring left-of-center, text at the same vertical band to its right |
| 17 | `OneIdeaStatement` | Sparse: one point + one restrained line, small two-tier text nearby, vast surrounding negative space |
| 20 | `FinalThesisStatement` | Asymmetric two-zone: text left, a large stable warm presence field with the human integrated inside it, right — no arc |
| 21 | `BiologicalTransformerStatement` | Off-center intimate vertical stack: human + concentric breath rings left-of-center, text below, left-aligned (not dead-center like Scene 13) |

Five distinct macro-layouts across five corrected scenes, plus Scene 3's own
sixth layout — verified no two scenes share a spatial arrangement (see
`full-episode-storyboard-contact-sheet.png`).

**Corrected mid-pass**: the first implementation wired all five new
components into `static-previews.tsx`/`Root.tsx` but Root.tsx's five
`Composition` entries still pointed at the old shared
`KeyStatementStoryboardPreview` component — this would have type-checked
successfully (both prop shapes satisfy the same loose `Record<string,
unknown>`-compatible index signature) while silently still rendering the
frozen `KeyStatement` at runtime. Caught before rendering by grepping
`Root.tsx` for the old component name; fixed by importing and wiring the
five new `Scene*Preview` components individually.

## Scene-by-scene differentiation decisions

### Scene 3 — Mission (unchanged)
Retained as the reference baseline per the prompt ("This may remain the
primary baseline KeyStatement composition"). Clear left-aligned hierarchy,
Earth Rise, restrained Earth/Cosmos relationship, no Signal — all unchanged,
confirmed by code inspection (no edits to this scene's prop wiring).

### Scene 13 — ÆPOCH is our response (Signal)
`SignalVesica` (`components.tsx`): a warm Earth circle (Clay stroke) and a
cool Cosmos circle (Iris stroke) overlap; the exact intersection is filled
solid Signal color (`AEPOCH_COLORS.signal`) via an SVG `clipPath` (circle A
clipped to circle B's area) rather than hand-computed arc geometry — this
guarantees a mathematically exact vesica lens rather than an approximated
one. A soft radial-gradient halo behind it is the canonical "Signal reveal
glow" exception to the no-decorative-gradients rule. Statement text sits
below, both elements on a single dead-center vertical axis — deliberately
the most formal, symmetric composition in the episode, reserved for the one
Signal moment. No Comet Arc, no tiny passive human, no reuse of Scene 3's
layout — confirmed visually and by code inspection (`SignalStatement` has
no `HumanNode`/`SymbolicFigure`/Comet-Arc reference anywhere).

### Scene 15 — Already a contribution
`ContributionStatement`: one `SymbolicFigure` (Clay) surrounded by a
restrained warm (Sand-stroke, warm-tinted) ring, positioned left-of-center;
the statement sits at the same vertical band to its right, reading as "in
relationship" rather than stacked above/below. No Comet Arc, no pale
upper-right Cosmos circle, no Signal — confirmed by code inspection. The
human is centered in generous space at a modest scale (not filling the
frame), avoiding a mascot read.

### Scene 17 — One idea
`OneIdeaStatement`: exactly one small solid circle (Prism) and one thin
restrained line extending from it — the only diagram element in the
composition. Two-tier text ("One idea." / "Everything else follows.") sits
near the point, small relative to the vast surrounding negative space. No
Comet Arc, no repeated human-under-circle layout, no Signal — confirmed by
code inspection (no `SymbolicFigure`, `HumanNode`, or arc path anywhere in
the component).

### Scene 20 — Final thesis
`FinalThesisStatement`: text-left / warm-field-right, but the field is
Earth-toned (Sand-stroke, warm radial fill) with the `SymbolicFigure`
integrated inside it (not a separate tiny accessory beneath a Cosmos circle,
and no Comet Arc at all) — clearly distinct from Scene 3's cool-toned,
arc-bearing, detached-human layout. Two-part text hierarchy (64px headline /
34px supporting line). Field diameter (480px) and combined human+field
scale read as substantially larger and more prominent than Scene 17's
single point — confirmed visually via the storyboard sheet.

### Scene 21 — Magnificent biological transformer
`BiologicalTransformerStatement`: `SymbolicFigure` (posture `settled-b`, for
"subtle human asymmetry") surrounded by `BreathRings` — four concentric
restrained rings, static (no literal pulse-monitor line, no heartbeat
graph), reading as a breath/biological-rhythm motif. Composition sits
off-center-left (figure horizontal center ≈595px, vs. the frame's true
center at 960px) — deliberately not dead-center like Scene 13's formal
Signal moment, keeping the two centered-stack scenes visually distinct from
each other. No machine parts, no glowing-brain imagery, no robot metaphor,
no Comet Arc, no Signal — confirmed by code inspection.

### Scene 18 — 42-day test label readability
Retained the Correction-8 Comet-Arc-family path and exactly four waypoints
(no fifth step, no cards, no bordered containers). Label font size
increased 30px → 36px, width increased 300px → 340px. Two clearance bugs
from Phase 13B.1 fixed with explicit per-waypoint positioning
(`PATH_LABEL_LAYOUT`) instead of a blanket alternating-offset formula:

- Waypoint 0 ("Start August 9") sat too close to its dot in the 13B.1
  render (the arc is steepest there, so the blanket "-92px above" offset
  wasn't enough clearance) — now anchored to a fixed `left: 140` position
  with `dy: -170` for real separation.
- Waypoint 3 ("Shape what comes next") centered on its point (`x=1648`)
  pushed its 340px-wide label 18px past the 1800px right safe-area boundary
  — now anchored to a fixed `left: 1460`, keeping its right edge at 1800,
  exactly on the safe boundary.

Verified visually: all four labels now have clear separation from their
dots and from each other, "Shape what comes next" reads fully on-screen
with margin to spare, and the labels still alternate above/below the path
(waypoints 0 and 2 above, 1 and 3 below).

## Signal exclusivity verification

`grep -rn "AEPOCH_COLORS.signal\|#6B5FED\|SignalVesica\|signal-reveal\|signalReveal"`
across all episode-local source returns matches only inside `SignalVesica`'s
own definition (`components.tsx`) and its two call sites: the import/usage
in `variants.tsx`'s `SignalStatement` (Scene 13's component), and Scene 13's
`id` string in `static-previews.tsx`. No other component —
`ContributionStatement`, `OneIdeaStatement`, `FinalThesisStatement`,
`BiologicalTransformerStatement`, or any Phase 13B/13B.1 component — 
references Signal color or geometry anywhere.

## Composition IDs and output filenames

| Scene | Composition ID | Filename (storyboard) |
|---|---|---|
| 13 | `Aepoch-E001-Static-Scene13SignalReveal` | `sc13-signal-reveal.png` |
| 15 | `Aepoch-E001-Static-Scene15Contribution` | `sc15-contribution.png` |
| 17 | `Aepoch-E001-Static-Scene17OneIdea` | `sc17-one-idea.png` |
| 18 | `Aepoch-E001-Static-FlowLifecyclePath` (unchanged ID, label fix only) | `sc18-42-day-test.png` |
| 20 | `Aepoch-E001-Static-Scene20FinalThesis` | `sc20-final-thesis.png` |
| 21 | `Aepoch-E001-Static-Scene21BiologicalTransformer` | `sc21-biological-transformer.png` |

All under
`projects/aepoch-episodes/001-what-is-aepoch/renders/stills/phase-13b2/` and
`.../phase-13b2/storyboard/` (the latter holding all 22 scenes for the
full-storyboard sheet).

## Regenerated contact sheets

All under `projects/aepoch-episodes/001-what-is-aepoch/qa/`:

1. `complete-reference-contact-sheet.png` — regenerated with the corrected
   `16-flow-lifecycle-path.png` (label fix); the other 16 stills are
   byte-identical to Phase 13B.1's (unaffected by this phase).
2. `new-modules-contact-sheet.png` — **not regenerated**; none of its 10
   stills (Welcome, SyntheticMultiplication, HumanConsequence, Outro) were
   touched by this phase's corrections.
3. `tier1-variants-contact-sheet.png` — regenerated with the corrected
   Scene 18 still.
4. `neighboring-scenes-contact-sheet.png` — regenerated with real Scene
   13/15/17/18/20/21 renders throughout.
5. `full-episode-storyboard-contact-sheet.png` — regenerated, all 22 scenes.

## Technical validation

- **Type-check**: `npx tsc --noEmit` reports the same 51 pre-existing
  legacy diagnostics as the unmodified baseline (diffed against a
  `git stash`'d baseline run, line numbers normalized) — **zero new
  diagnostics**.
- **Composition discovery**: `npx remotion compositions src/index.tsx`
  lists `Aepoch-E001-Static-Scene13SignalReveal`,
  `Scene15Contribution`, `Scene17OneIdea`, `Scene20FinalThesis`,
  `Scene21BiologicalTransformer` (new components confirmed wired, not the
  old shared frozen-KeyStatement preview) plus the unchanged
  `FlowLifecyclePath`, all at 1920×1080, 30fps.
- **Render**: all 6 corrected compositions and all 22 full-storyboard
  frames rendered successfully via `npx remotion still ... --frame=0`.
- **Dimensions**: `identify -format "%wx%h"` confirms all 22 storyboard
  frames are exactly `1920x1080`.
- **Determinism**: four representative corrected compositions —
  `Scene13SignalReveal` (uses the new `clipPath`-based `SignalVesica`),
  `Scene17OneIdea`, `FlowLifecyclePath` (the relabeled Scene 18), and
  `Scene21BiologicalTransformer` (uses the new `BreathRings`) — were each
  rendered twice. SHA-256 matched exactly in all four cases:

  | Composition | SHA-256 |
  |---|---|
  | `Scene13SignalReveal` | `3731f92c32582156dbffd6f1977fa17165e576974617d4a48e8a9a9ff90c5fb8` |
  | `Scene17OneIdea` | `1f0f6cb353e2784ba1dac0fc30704ca1a55609bb72dfeb24b1530a8b7c3c48e9` |
  | `FlowLifecyclePath` | `eecbff68ed80a51db50218a5679f194b6f06035fe81bceaf371c368322f900b0` |
  | `Scene21BiologicalTransformer` | `937286c4f78df59a9eeb8c48ec3c06fa6bfa2c394aca4c42d165010571009eed` |

- **Moss check**: `grep -rn "moss\|Moss"` across the episode's source
  returns no matches.
- **Signal check**: confirmed above — exclusive to Scene 13.
- **Scene 18 readability check**: verified visually — all four labels have
  clear separation from their dots and from the frame edges at full
  resolution; the fix specifically addressed the two clearance problems
  found in the 13B.1 render.
- **Baseline check**: `git diff --stat` against all ten tagged Tier 1
  source files (`tokens.ts`, `types.ts`, `components.tsx`, `modules.tsx`,
  `motion.tsx`, `previews.tsx`, `reel.tsx`, `runtime.ts`, `captions.tsx`,
  `index.ts`, `random.ts`) returns empty — confirmed unmodified.

## Full static storyboard review

Verified directly against the regenerated `full-episode-storyboard-contact-
sheet.png`:

- Scenes 3, 13, 15, 17, 20, and 21 no longer look like repeated copies —
  six distinct macro-layouts (left-text-arc-baseline, dead-center-vesica,
  horizontal-relationship, sparse-point, asymmetric-warm-field,
  off-center-intimate-rings).
- Scene 13 is unmistakably the single Signal moment — the only frame in the
  entire episode with purple Signal-colored geometry, in a uniquely formal
  centered composition found nowhere else.
- Scene 15 centers recognition of the human — the figure is the visual
  anchor, warmly held in a restrained ring, with the statement placed in
  direct spatial relationship to it.
- Scene 17 feels visually reduced to one idea — a single point and line
  against vast negative space, the sparsest composition in the episode.
- Scene 20 lands the thesis with visibly more weight than Scene 17 (a large
  integrated human+field vs. a single point) and reads clearly differently
  from Scene 21 (asymmetric two-zone vs. centered intimate stack).
- Scene 21 feels embodied and intimate — the human figure with soft breath
  rings, off-center and warm, distinct from Scene 13's formal symmetry.
- Scene 18 labels are readable — confirmed above.
- Scene 22 remains a quiet outro after Scene 21 — no human figure, no rings,
  just the mark, identifier, and conclusion line on a clean Earth Rise
  field; the register shift from Scene 21's embodied warmth to Scene 22's
  settled close is intentional and reads clearly on the sheet.

## Final static-storyboard pass/fail

**PASS.** All six correction targets (Scenes 3/13/15/17/18/20/21 — Scene 3
retained unchanged as instructed) are resolved, verified both by code
inspection and by direct visual review of the regenerated full-storyboard
sheet. No repeated layouts remain among the six statement-family scenes.

## Stop condition confirmation

Per the Phase 13B.2 prompt: corrected stills for Scenes 13, 15, 17, 18, 20,
21 are rendered at 1920×1080; the complete 22-scene storyboard sheet is
regenerated; the affected contact sheets (complete-reference,
tier1-variants, neighboring-scenes, full-episode-storyboard) are
regenerated; determinism is confirmed on four representative corrected
compositions; type-check reports zero new diagnostics; Moss remains absent;
Signal exists only in Scene 13; none of Scenes 15/17/20/21 reuse Signal
color or geometry; Scene 18 labels are readable; the tagged Tier 1 baseline
remains unmodified; and this QA document is updated. No full scene
animation, narration, audio, captions, MP4 render, or timed episode
assembly was performed. The approved narration, research, and scene timing
were not modified. Stopping here — Phase 13C has not begun.
