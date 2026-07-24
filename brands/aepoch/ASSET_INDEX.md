
## Tier 1 scene reference frames

These images define composition, hierarchy, spacing, palette treatment, and visual direction for the first Remotion scene modules. They are implementation references only and must not be embedded directly as finished video scenes. Typography, diagrams, shapes, and motion must be recreated as native Remotion/SVG components.

| Asset | Module | Status |
|---|---|---|
| `reference-frames/tier-1/01-declarative-hook.png` | Declarative Hook | Approved reference |
| `reference-frames/tier-1/02-key-statement.png` | Key Statement | Approved reference |
| `reference-frames/tier-1/03-circular-value-field.png` | Circular Value Field | Approved reference |
| `reference-frames/tier-1/04-flow-lifecycle.png` | Flow Lifecycle | Approved reference |
| `reference-frames/tier-1/05-human-network.png` | Human Network | Approved reference |
| `reference-frames/tier-1/06-system-comparison.png` | System Comparison | Approved reference |

### Reference-frame usage rules

- Recreate all text as live typography.
- Recreate shapes and diagrams as SVG, CSS, Canvas, or React components.
- Do not animate or zoom the reference PNG itself.
- Follow `VISUAL_LANGUAGE.md`, `MOTION_TOKENS.md`, and `SCENE_MODULES.md` when the raster reference conflicts with the written specification.
- Preserve the canonical Æ mark rather than tracing the generated version.
<!-- PHASE10A-ASSETS:START -->

## Phase 10A — canonical marks and backgrounds

### Source references

| Asset | Family | Purpose | Runtime status | Provenance |
|---|---|---|---|---|
| `source/AepochLogoBlack.svg` | Source | Canonical Æ mark master | Source only | Supplied canonical asset |
| `source/AEPOCH-original.svg` | Source | Earth/Cosmos artwork master | Reference only | Supplied original artwork |
| `source/app-dashboard-reference.png` | Source | Surface, spacing, and hierarchy reference | Reference only | Supplied app screenshot |
| `source/260517-ÆPOCH-Brand-System-v8_2_Full_Markdown.md` | Source | Canonical product brand system | Authority | Supplied brand document |

### Canonical marks

| Asset | Family | Purpose | Runtime status | Approved use |
|---|---|---|---|---|
| `marks/aepoch-mark-currentcolor.svg` | Mark | CSS-controlled canonical mark | Runtime ready | All modules |
| `marks/aepoch-mark-ink.svg` | Mark | Primary light-surface mark | Runtime ready | All light modules |
| `marks/aepoch-mark-inkmid.svg` | Mark | Loading and restrained secondary mark | Runtime ready | Intro, outro, loading-derived motion |
| `marks/aepoch-mark-paper.svg` | Mark | Dark-surface mark | Runtime ready | Void and Depth scenes |
| `marks/aepoch-mark-clay.svg` | Mark | Earth-pole mark variant | Restricted runtime | Human-presence scenes |
| `marks/aepoch-mark-prism.svg` | Mark | Cosmos-pole mark variant | Restricted runtime | Protocol scenes |
| `marks/aepoch-mark-signal.svg` | Mark | Single-reveal mark variant | Restricted runtime | One approved Signal reveal per episode |

### Backgrounds

| Asset | Family | Purpose | Runtime status | Approved modules |
|---|---|---|---|---|
| `backgrounds/earth-rise-light.svg` | Background | Canonical default light field | Runtime ready | All light editorial modules |
| `backgrounds/paper-clean.svg` | Background | Neutral clean surface | Runtime ready | Diagrams, comparisons, statements |
| `backgrounds/earth-field.svg` | Background | Human-presence emphasis | Runtime ready | Human consequence, human network |
| `backgrounds/cosmos-field.svg` | Background | Protocol emphasis | Runtime ready | Protocol diagram, value field |
| `backgrounds/dual-pole-field.svg` | Background | Earth/Cosmos relationship | Runtime ready | Circular value field, comparison, Signal |
| `backgrounds/void-dark.svg` | Background | Broken-system hook | Runtime ready, restricted | Declarative hook, human consequence |
| `backgrounds/depth-dark.svg` | Background | Secondary dark surface | Runtime ready, restricted | Contained system critique |

### Semantic restrictions

- Signal appears at most once per episode.
- Moss is not included in the general mark or background variants.
- Moss may appear only when directly depicting successful PoL biometric verification.
- The source artwork and app screenshot are never embedded as finished video scenes.
- Written visual and motion specifications override raster reference-frame artifacts.

<!-- PHASE10A-ASSETS:END -->
<!-- PHASE10B-ASSETS:START -->

## Phase 10B — human forms and icon vocabulary

### Human forms

| Asset | Purpose | Runtime status | Approved modules |
|---|---|---|---|
| `human-forms/human-neutral.svg` | Canonical unstyled person | Runtime ready | Human consequence, network, diagrams |
| `human-forms/human-neutral-currentcolor.svg` | Runtime-recolorable person | Runtime ready | All human modules |
| `human-forms/human-present.svg` | Presence is visible | Runtime ready | Human consequence, circular field |
| `human-forms/human-active.svg` | Active participation | Runtime ready | Human network, collective rhythm |
| `human-forms/human-verified.svg` | Successful PoL verification | Runtime ready, restricted | Direct PoL success only |
| `human-forms/human-inactive.svg` | Inactive participation | Runtime ready | Human network, lifecycle |
| `human-forms/human-pair.svg` | Direct human relationship | Runtime ready | Human consequence, human network |
| `human-forms/human-community.svg` | Small collective | Runtime ready | Human network, collective rhythm |

### Icons

| Asset | Purpose | Runtime status | Approved modules |
|---|---|---|---|
| `icons/presence.svg` | Presence | Runtime ready | Lifecycle, data card |
| `icons/activation.svg` | Activation | Runtime ready | Lifecycle, data card |
| `icons/circulation.svg` | Circulation | Runtime ready | Lifecycle, comparison |
| `icons/permanence.svg` | Settled permanent state | Runtime ready | Lifecycle |
| `icons/attention.svg` | Human attention | Runtime ready | Comparison, human consequence |
| `icons/contribution.svg` | Contribution to collective | Runtime ready | Comparison, data card |
| `icons/equal-vote.svg` | One human, one vote | Runtime ready | Human network, governance |
| `icons/human-node.svg` | Human network node | Runtime ready | Human network, protocol diagram |
| `icons/collective.svg` | Collective participation | Runtime ready | Human network, collective rhythm |
| `icons/arrow-flow.svg` | Directional flow | Runtime ready | Lifecycle, diagrams |
| `icons/ring.svg` | Protocol or collective ring | Runtime ready | Circular field, diagrams |
| `icons/epoch-arc.svg` | Time or epoch boundary | Runtime ready | Intro, lifecycle, key statement |

### Semantic restrictions

- Human forms remain equal in base scale.
- No human node is enlarged because of token holdings, wealth, or status.
- `human-verified.svg` is the only asset in this set that uses Moss.
- Inactivity is shown by reduced emphasis, not punishment or destruction.
- Icons inherit semantic color at runtime via `currentColor`.
- New icons must use the same circle, ring, arc, and path vocabulary.

<!-- PHASE10B-ASSETS:END -->
<!-- PHASE10C-ASSETS:START -->

## Phase 10C — diagrams, motion geometry, and runtime identifier

### Diagram primitives

| Asset | Purpose | Runtime status | Approved modules |
|---|---|---|---|
| `diagrams/node-human.svg` | Equal-scale human node | Runtime ready | Human network, protocol diagram |
| `diagrams/node-system.svg` | Sharp existing-system node | Runtime ready | System comparison, protocol diagram |
| `diagrams/node-foundation.svg` | Foundation-operated service | Runtime ready | Protocol diagram |
| `diagrams/network-centralized.svg` | Centralized topology | Runtime ready | System comparison |
| `diagrams/network-distributed.svg` | Distributed topology | Runtime ready | Human network, system comparison |
| `diagrams/network-equal-vote.svg` | One human, one vote | Runtime ready | Human network, governance |
| `diagrams/flow-kairos.svg` | Contribution and circulation | Runtime ready | Human network, lifecycle |
| `diagrams/lifecycle-core.svg` | Core four-stage lifecycle | Runtime ready | Flow lifecycle |
| `diagrams/earth-cosmos-convergence.svg` | Earth/Cosmos/human relationship | Runtime ready | Circular value field, Signal |

### Motion geometry

| Asset | Purpose | Runtime status |
|---|---|---|
| `motion/comet-circle-path.svg` | Circular Comet Arc path | Geometry ready |
| `motion/comet-rounded-path.svg` | Rounded-perimeter Comet Arc path | Geometry ready |
| `motion/signal-vesica.svg` | The Signal final geometry | Geometry ready |
| `motion/convergence-paths.svg` | Earth/Cosmos entry and pull paths | Geometry ready |
| `motion/particle-ring-targets.json` | Fixed 150-particle ring targets | Runtime data ready |

### Runtime identifier

| Asset | Purpose | Runtime status |
|---|---|---|
| `wordmarks/aepoch-identifier-ink.svg` | Light-surface brand identifier | Provisional live-text runtime asset |
| `wordmarks/aepoch-identifier-paper.svg` | Dark-surface brand identifier | Provisional live-text runtime asset |
| `wordmarks/aepoch-identifier-prism.svg` | Protocol-accent identifier | Provisional live-text runtime asset |

### Identifier limitation

The identifier SVGs use the canonical Æ mark plus live text and embed no font
file. They are not a substitute for a future official outlined wordmark
master. Remotion should use the approved repository font at runtime.

<!-- PHASE10C-ASSETS:END -->
