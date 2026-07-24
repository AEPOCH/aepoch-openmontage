# ÆPOCH Scene Modules

**Version:** 1.0  
**Status:** Beta implementation specification  
**Companion documents:** `VISUAL_LANGUAGE.md`, `MOTION_TOKENS.md`, `SERIES_BIBLE.md`, `SCRIPT_RULES.md`  
**Primary renderer:** Remotion  
**Master format:** 1920×1080, 30 fps

This document defines the reusable scene system for the ÆPOCH animated video series.

The modules are not app screens and must not recreate the ÆPOCH product interface. They borrow the app’s visual grammar—Earth Rise, restrained cards, circular fields, clear hierarchy, semantic color, generous negative space—then adapt it to narrated editorial animation.

The purpose of the module system is repeatability. A new episode should be assembled from approved scene types and approved assets rather than designed from scratch.

---

# 1. Module architecture

Every episode is assembled from three layers:

```text
Episode narrative
        ↓
Scene plan
        ↓
Reusable scene modules
        ↓
Approved assets and motion tokens
        ↓
Remotion render
```

A scene module controls:

- Layout
- Typography hierarchy
- Color semantics
- Asset placement
- Animation behavior
- Caption-safe space
- Reduced-motion output
- Technical validation

A scene plan supplies:

- Narration timing
- Copy
- Asset references
- Semantic emphasis
- Module-specific data
- Transition selection
- Motion configuration

The agent may choose among approved modules. It may not invent a new visual system inside an episode.

---

# 2. Common scene contract

Every scene component implements the common contract below.

```ts
export type AepochSceneBase = {
  id: string;
  module: AepochSceneModule;
  startFrame: number;
  durationFrames: number;

  narration?: {
    audioPath?: string;
    startFrame?: number;
    endFrame?: number;
    transcript?: string;
  };

  copy?: {
    eyebrow?: string;
    headline?: string;
    body?: string;
    footnote?: string;
  };

  theme?: "earth-rise" | "paper" | "void" | "depth";
  emphasis?: "earth" | "cosmos" | "balanced" | "signal";
  textAlign?: "left" | "center" | "right";

  transitionIn?: AepochTransition;
  transitionOut?: AepochTransition;
  camera?: AepochCameraMove;

  reducedMotion?: boolean;
  seed?: number;

  captions?: {
    enabled?: boolean;
    reserveBottomPx?: number;
  };

  assetRefs?: string[];
};
```

```ts
export type AepochSceneModule =
  | "series-intro"
  | "declarative-hook"
  | "human-consequence"
  | "circular-value-field"
  | "editorial-data-card"
  | "system-comparison"
  | "human-network"
  | "flow-lifecycle"
  | "protocol-diagram"
  | "collective-rhythm"
  | "key-statement"
  | "series-outro";
```

The motion types come from `MOTION_TOKENS.md`.

---

# 3. Shared layout rules

## 3.1 Safe areas

| Region | Minimum |
|---|---:|
| Left and right | 120 px |
| Top | 90 px |
| Bottom | 90 px |
| Caption reserve when captions are burned | 170 px minimum |
| Text-to-edge distance inside cards | 40 px |
| Gap between major composition regions | 48–72 px |

No essential visual information may sit under the caption reserve.

## 3.2 Typography hierarchy

The exact font family comes from the canonical ÆPOCH brand system or approved production fallback. The module system controls scale and hierarchy.

| Role | Suggested 1080p size | Weight |
|---|---:|---:|
| Eyebrow | 22–26 px | 700 |
| Hero headline | 72–108 px | 800 |
| Standard headline | 52–72 px | 800 |
| Section headline | 40–52 px | 800 |
| Body | 30–38 px | 400–500 |
| Diagram label | 24–30 px | 600–700 |
| Metadata | 20–24 px | 600–700 |
| Footnote | 18–22 px | 400–500 |

Rules:

- Sentence case
- No all-caps headings
- No typewriter animation
- No more than two type sizes in one visual group
- No more than approximately 18 words in a hero text block
- On-screen text should complement narration, not duplicate full narration paragraphs

## 3.3 Card system

Cards are permitted in editorial and system modules.

Canonical video card:

```text
Background: rgba(255,255,255,0.50–0.68)
Border: 1–2 px Border #E0D8D0
Radius: 24–30 px at 1920×1080
Shadow: none
Padding: 40–56 px
```

Cards must never become app-window replicas. Do not add:

- Buttons
- Form fields
- Navigation rails
- Browser chrome
- Click targets
- Fake product controls

## 3.4 Background selection

| Background | Use |
|---|---|
| Earth Rise | Default, human-centered, reframe, conclusion |
| Paper | Clean diagrams and comparisons |
| Void | Existing broken system in hook/setup |
| Depth | Secondary dark scene or contained system critique |

Void and Depth should not dominate an entire episode.

---

# 4. Asset families

Modules may only reference approved assets from these families:

```text
marks/
backgrounds/
human-forms/
icons/
diagrams/
video-components/
motion/
typography/
audio/
```

Each asset must be listed in `ASSET_INDEX.md` before production use.

Generated story-specific assets belong under:

```text
projects/<episode-id>/assets/generated/
```

Reusable approved derivatives move into:

```text
brands/aepoch/<asset-family>/
```

---

# 5. Module 1 — Series Intro

## Component name

```text
AepochSeriesIntro
```

## Purpose

Provide a recognizable opening signature without consuming the full 16-second app loading sequence.

## Duration

Default: 120 frames / 4.0 seconds.

Short-form variant: 60–75 frames.

## Structure

1. Sparse Earth and Cosmos particles
2. Pole convergence
3. Comet Arc completion
4. Æ mark emergence
5. Episode title settles

## Input contract

```ts
export type SeriesIntroProps = AepochSceneBase & {
  episodeTitle: string;
  seriesLabel?: string;
  shortForm?: boolean;
  markAsset: string;
  audioSignature?: string;
};
```

## Visual rules

- Earth Rise background
- Mark uses canonical optical offset
- Episode title in sentence case
- No slogan by default
- No CTA
- No platform logo cluster
- No coin or token imagery

## Motion

Use `seriesIntroV1` from `MOTION_TOKENS.md`.

## Reduced motion

Final Æ mark and episode title shown immediately.

## Pass conditions

- Recognizable as ÆPOCH within three seconds
- Under four seconds in standard form
- Title readable for at least 18 frames
- No visible loop seam
- No generic sci-fi particle aesthetic

---

# 6. Module 2 — Declarative Hook

## Component name

```text
DeclarativeHook
```

## Purpose

Open with a question, tension, contradiction, or concise claim.

## Typical narrative stage

Hook or setup.

## Duration

45–150 frames depending on narration.

## Input contract

```ts
export type DeclarativeHookProps = AepochSceneBase & {
  eyebrow?: string;
  lines: string[];
  accentWord?: string;
  supportingAsset?: string;
  contrastMode?: "none" | "earth-vs-system";
};
```

## Layout variants

### `left-editorial`

- Eyebrow top-left
- Large headline left
- Supporting symbolic asset right or lower-right

### `centered-statement`

- Large centered statement
- Maximum two lines
- Nearly empty frame

### `split-tension`

- Human consequence left
- System constraint right
- No formal comparison table yet

## Visual rules

- Void or Depth allowed when depicting current-system failure
- Earth Rise or Paper for reflective questions
- Maximum one emphasized word
- Signal forbidden unless this is also the approved episode reveal
- Hook should remain human-centered; avoid system architecture diagrams

## Motion

- `headlineReveal`
- `pushInSmall` optional
- `darkCut` allowed
- No diagram build

## Reduced motion

Static final composition.

## Pass conditions

- Understandable without narration
- Reads in under three seconds
- Does not look like a marketing slogan
- No more than 18 words
- No generic stock illustration

---

# 7. Module 3 — Human Consequence

## Component name

```text
HumanConsequence
```

## Purpose

Show how an abstract system affects lived human experience.

## Typical narrative stage

Hook, setup, or human consequence after a mechanism explanation.

## Input contract

```ts
export type HumanConsequenceProps = AepochSceneBase & {
  humanAsset: string;
  environmentAsset?: string;
  systemShapeAsset?: string;
  consequence:
    | "extraction"
    | "invisibility"
    | "surveillance"
    | "disconnection"
    | "unrecognized-care"
    | "unrecognized-attention"
    | "custom";
  customLabel?: string;
};
```

## Layout

- Human form occupies 25–40% of frame
- System geometry appears separately
- Human shapes remain rounded
- System shapes remain sharp
- Relationship between the two must be visually clear

## Visual rules

- Human register: Clay, Ochre, Sand
- System register: Ink, Depth, Iris, or sharp neutral geometry
- Avoid literal biometric imagery
- Avoid helpless or victimized body language unless the narration explicitly requires it
- Do not depict violence

## Motion

- `humanEnter`
- `centralizedConstraint`
- `humanExitInactive` only when narratively appropriate
- System movement may be sharper than human movement

## Pass conditions

- Consequence is legible without explanatory labels
- Human remains the visual subject
- System does not become a cyberpunk villain cliché
- No photorealistic people

---

# 8. Module 4 — Circular Value Field

## Component name

```text
CircularValueField
```

## Purpose

Represent two concepts, states, balances, poles, or related ideas using luminous circular fields derived from the app’s visual grammar.

## Typical narrative stage

Setup, reframe, or mechanism reveal.

## Input contract

```ts
export type CircularValueFieldProps = AepochSceneBase & {
  fields: Array<{
    id: string;
    label: string;
    value?: string;
    sublabel?: string;
    pole: "earth" | "cosmos" | "neutral";
    state?: "active" | "inactive" | "converging";
  }>;
  relationship?: "separate" | "balanced" | "converge" | "exchange";
  convergenceTarget?: "vesica" | "human-ring" | "aepoch-mark";
};
```

## Layout

- One or two fields preferred
- Maximum three
- Fields remain large and editorial
- Labels outside or beneath when internal text would clutter the field

## Visual rules

- Earth field: Clay/Sand
- Cosmos field: Pearl/Iris/Prism
- No green rings except direct PoL success
- No fake wallet UI
- No decorative number counting unless explaining a real quantity

## Motion

- Separate: gentle `humanActivate`-style pulse
- Exchange: `flowPulse`
- Converge: The Signal or a restrained non-hero convergence
- Pull-back allowed when revealing a third collective state

## Reduced motion

Show final relationship.

## Pass conditions

- Circles read as concepts, not coins
- No currency symbol treatment
- No metallic rendering
- Labels remain readable on mobile

---

# 9. Module 5 — Editorial Data Card

## Component name

```text
EditorialDataCard
```

## Purpose

Present a compact set of facts, stages, or measurements using the calm row-based grammar visible in the ÆPOCH app.

## Typical narrative stage

Build or proof.

## Input contract

```ts
export type EditorialDataCardProps = AepochSceneBase & {
  title?: string;
  rows: Array<{
    id: string;
    icon?: string;
    label: string;
    sublabel?: string;
    value?: string;
    colorRole: "earth" | "iris" | "prism" | "signal" | "ink";
  }>;
  highlightedRowId?: string;
};
```

## Limits

- Two to four rows
- One line label
- One short sublabel
- One key value or term on right
- No scrolling

## Visual rules

- Fine dividers
- Pale icon containers
- One semantic color per row
- Signal only if this card contains the single approved reveal
- No Moss except direct PoL success
- Values use tabular numerals where relevant

## Motion

- Rows enter sequentially
- 6–10 frame stagger
- Highlight may appear after all rows settle
- No spreadsheet-like number animation

## Reduced motion

Show all rows.

## Pass conditions

- Card reads as editorial information, not an app screenshot
- No interactive affordances
- Every row contributes to the spoken argument
- Maximum four rows

---

# 10. Module 6 — System Comparison

## Component name

```text
SystemComparison
```

## Purpose

Compare the existing system with ÆPOCH or compare two protocol states.

## Typical narrative stage

Setup, reframe, or climax.

## Input contract

```ts
export type SystemComparisonProps = AepochSceneBase & {
  left: {
    title: string;
    items: string[];
    register: "existing-system" | "neutral";
  };
  right: {
    title: string;
    items: string[];
    register: "aepoch" | "neutral";
  };
  relationship?: "contrast" | "transition" | "before-after";
};
```

## Layout

- Two equal-width panels
- Maximum four items per side
- Shared baseline
- Central divider or transition axis
- Optional symbolic asset above each title

## Visual rules

Existing-system side:

- Sharper corners
- Ink/Depth or restrained cool neutral
- No alarm-red treatment

ÆPOCH side:

- Rounded corners
- Earth Rise, Clay, Iris, Prism
- Signal only at approved reveal

Do not turn the comparison into a feature checklist.

## Motion

1. Left system appears
2. Tension or limitation becomes visible
3. Right system appears
4. Relationship resolves

Use `distributedOpen` when showing structural opening.

## Reduced motion

Final side-by-side state.

## Pass conditions

- Comparison is fair and specific
- No straw-man labels
- Text remains concise
- No more than four paired concepts

---

# 11. Module 7 — Human Network

## Component name

```text
HumanNetwork
```

## Purpose

Show verified people joining, participating in, voting within, or circulating value through a collective network.

## Typical narrative stage

Build, climax, or landing.

## Input contract

```ts
export type HumanNetworkProps = AepochSceneBase & {
  nodes: Array<{
    id: string;
    position?: { x: number; y: number };
    state: "present" | "verified" | "active" | "inactive";
    label?: string;
  }>;
  edges?: Array<{
    from: string;
    to: string;
    type: "relationship" | "kairos" | "attention" | "trust" | "vote";
  }>;
  topology:
    | "individual"
    | "centralized"
    | "distributed"
    | "collective-ring"
    | "equal-vote";
  revealOrder?: string[];
};
```

## Visual rules

- Human nodes use equal base size
- Wealth or holdings never change node size
- Verified state may use Moss only when directly representing completed PoL
- Active participation generally uses Clay or Prism
- Edge density must remain readable
- Maximum 18 named nodes or 36 anonymous nodes in a standard scene

## Motion

- `nodeEnter`
- `edgeDraw`
- `humanJoinCollective`
- `equalVote`
- `flowPulse`
- `pullBackCollective`

## Reduced motion

Final topology with directional indicators.

## Pass conditions

- One human, one vote remains visually true
- No node becomes visually dominant without a narrative reason
- Network does not become an unreadable web
- Edge semantics are consistent

---

# 12. Module 8 — Flow Lifecycle

## Component name

```text
FlowLifecycle
```

## Purpose

Explain sequential state change, especially the core ÆPOCH lifecycle.

## Default canonical sequence

```text
Show up
→ Activate
→ Circulate
→ Become permanent
```

## Input contract

```ts
export type FlowLifecycleProps = AepochSceneBase & {
  steps: Array<{
    id: string;
    label: string;
    description?: string;
    icon?: string;
    pole: "earth" | "cosmos" | "balanced";
  }>;
  layout?: "horizontal" | "vertical" | "circular";
  currentStepId?: string;
  completionState?: "open" | "permanent" | "expired";
};
```

## Layout

- Three to five steps
- Horizontal preferred for 16:9
- Circular allowed only when cycle meaning is central
- Connectors remain simple and directional

## Visual rules

- Current step uses full emphasis
- Previous steps remain visible at reduced emphasis
- Permanent state resolves into stillness
- Expiry uses fade to absence, not flames
- No coin illustrations

## Motion

Use `lifecycleStep`.

Optional `flowPulse` between stages.

## Reduced motion

All stages visible; current stage marked by weight and color.

## Pass conditions

- Sequence can be understood without narration
- Direction is unambiguous
- Each stage uses one short phrase
- Permanent state visibly settles

---

# 13. Module 9 — Protocol Diagram

## Component name

```text
ProtocolDiagram
```

## Purpose

Explain architecture, governance, issuance, DID binding, relayers, or other system mechanics.

## Typical narrative stage

Build or proof only.

## Input contract

```ts
export type ProtocolDiagramProps = AepochSceneBase & {
  nodes: Array<{
    id: string;
    label: string;
    type:
      | "human"
      | "device"
      | "foundation-service"
      | "contract"
      | "dao"
      | "network"
      | "wallet";
    asset?: string;
  }>;
  edges: Array<{
    from: string;
    to: string;
    label?: string;
    type: "request" | "proof" | "attestation" | "value" | "vote" | "data";
  }>;
  layout: "left-right" | "top-bottom";
  focusSequence?: string[];
};
```

## Visual rules

- Circles and rings for people, states, and collectives
- Sharp boxes permitted for services and infrastructure
- No isometric servers
- No generic cloud icons
- No padlock clichés
- Labels must be plain-language first; technical term may follow
- Show only the portion of architecture relevant to the narration

## Motion

1. Nodes enter
2. Edges draw
3. Flow or proof travels
4. Current focus increases emphasis
5. Diagram holds

## Reduced motion

Completed diagram with focus state.

## Pass conditions

- No more than seven primary nodes in one scene
- No more than nine visible edges
- Diagram is readable on a phone
- Narration and focus sequence match exactly
- Technical claim matches approved source material

---

# 14. Module 10 — Collective Rhythm

## Component name

```text
CollectiveRhythm
```

## Purpose

Show the cumulative effect of many humans participating over time.

## Typical narrative stage

Climax or landing.

## Input contract

```ts
export type CollectiveRhythmProps = AepochSceneBase & {
  participantCount?: number;
  visibleNodeCount: number;
  activationPattern:
    | "wave"
    | "daily-rhythm"
    | "distributed"
    | "heartbeat";
  aggregateLabel?: string;
  aggregateValue?: string;
  resolveToMark?: boolean;
};
```

## Visual rules

- Individual nodes remain visible before becoming a collective
- Rhythm must feel human, not mechanical
- ECG motif may be used sparingly
- No analytics-dashboard recreation
- No leaderboard treatment
- No explosive growth graph

## Motion

- Sequential pulses
- Phase offsets
- Pull-back to collective scale
- Optional resolution into Æ mark
- At least one motion layer stops before the final hold

## Reduced motion

Final network with one visible rhythm path.

## Pass conditions

- Collective scale does not erase individuality
- Pulse pattern does not resemble trading data
- Motion settles before the scene ends
- No more than two simultaneous ambient loops

---

# 15. Module 11 — Key Statement

## Component name

```text
KeyStatement
```

## Purpose

Land one memorable line with maximum clarity.

## Typical narrative stage

Reframe, climax, section landing, or final conclusion.

## Input contract

```ts
export type KeyStatementProps = AepochSceneBase & {
  statement: string;
  supportingLine?: string;
  markAsset?: string;
  accentTreatment?:
    | "none"
    | "clay-underline"
    | "prism-ring"
    | "signal-reveal";
};
```

## Layout variants

### `centered`

Large centered statement.

### `left-editorial`

Statement left; mark or symbol right.

### `statement-and-ring`

Statement with restrained ring or Comet Arc.

## Visual rules

- Maximum 14 words preferred
- One thought only
- No quotation marks unless it is a sourced quotation
- Signal reveal permitted only once per episode
- Empty space is part of the composition

## Motion

- `headlineReveal`
- `statementHold`
- Optional `pushInSmall`
- Optional single Comet Arc

## Reduced motion

Static final composition.

## Pass conditions

- Statement remains visible at least 45 frames
- It works as a still image
- No competing visual element
- No CTA unless this is the series outro

---

# 16. Module 12 — Series Outro

## Component name

```text
AepochSeriesOutro
```

## Purpose

Resolve the episode into one thought and the ÆPOCH identity.

## Duration

Default: 135 frames / 4.5 seconds.

## Input contract

```ts
export type SeriesOutroProps = AepochSceneBase & {
  conclusion: string;
  markAsset: string;
  identifier?: string;
  website?: string;
  audioSignature?: string;
};
```

## Structure

1. Final statement holds
2. Statement reduces or fades
3. Æ mark settles
4. Identifier or website appears
5. Clean final hold

## Visual rules

- Earth Rise or Paper
- No stacked calls to action
- No “like and subscribe”
- No animated social icons
- No perpetual logo pulse
- Website optional
- Final frame must remain clean for end-screen overlays

## Motion

Use `seriesOutroV1`.

## Reduced motion

Final frame shown throughout.

## Pass conditions

- One conclusion
- Mark remains still in final hold
- Audio resolves cleanly
- End frame contains adequate empty space

---

# 17. Scene-plan schema

The OpenMontage scene planner should emit one object per scene.

```json
{
  "id": "ep001-sc04",
  "module": "flow-lifecycle",
  "startFrame": 540,
  "durationFrames": 180,
  "narration": {
    "startFrame": 540,
    "endFrame": 705,
    "transcript": "Show up. Activate. Circulate. What moves becomes permanent."
  },
  "theme": "earth-rise",
  "emphasis": "balanced",
  "transitionIn": "diagramBuild",
  "transitionOut": "crossfade",
  "camera": "cameraStill",
  "seed": 1042,
  "captions": {
    "enabled": true,
    "reserveBottomPx": 180
  },
  "steps": [
    {
      "id": "present",
      "label": "Show up",
      "pole": "earth"
    },
    {
      "id": "activate",
      "label": "Activate",
      "pole": "balanced"
    },
    {
      "id": "circulate",
      "label": "Circulate",
      "pole": "cosmos"
    },
    {
      "id": "permanent",
      "label": "Become permanent",
      "pole": "balanced"
    }
  ],
  "layout": "horizontal",
  "completionState": "permanent",
  "assetRefs": [
    "brands/aepoch/icons/human-presence.svg",
    "brands/aepoch/icons/flow-arrow.svg",
    "brands/aepoch/marks/aepoch-mark-ink.svg"
  ]
}
```

---

# 18. Scene selection rules

## Use `declarative-hook` when

- The narration begins with a question
- One contradiction can carry the opening
- Human consequence matters more than mechanism

## Use `human-consequence` when

- The script describes lived impact
- A system abstraction needs grounding in human experience

## Use `circular-value-field` when

- Two poles or states need visual comparison
- The vesica or convergence is meaningful
- A balance or relationship is more important than architecture

## Use `editorial-data-card` when

- Two to four facts support the argument
- The facts are parallel and concise

## Use `system-comparison` when

- Two structures need direct contrast
- Before/after or current/alternative framing is explicit

## Use `human-network` when

- People, votes, participation, or circulation are the subject

## Use `flow-lifecycle` when

- A process is sequential
- State progression matters

## Use `protocol-diagram` when

- Architecture must be explained
- More than one system component participates

## Use `collective-rhythm` when

- Accumulation of participation is the emotional point

## Use `key-statement` when

- The narration reaches a sentence worth remembering

---

# 19. Prohibited module misuse

Do not:

- Use `protocol-diagram` in the first hook scene
- Use `editorial-data-card` for more than four rows
- Use `human-network` as decorative background
- Use `circular-value-field` to depict coins
- Use `system-comparison` as a marketing feature table
- Use `collective-rhythm` as an upward price chart
- Use `key-statement` for paragraphs
- Recreate wallet, activation, or navigation UI as a video scene
- Put a CTA button inside any ordinary module
- Create a new module during episode production without first documenting and testing it

---

# 20. Implementation order

Build and validate modules in this order:

## Tier 1 — Required for first pilot

1. `DeclarativeHook`
2. `KeyStatement`
3. `CircularValueField`
4. `FlowLifecycle`
5. `HumanNetwork`
6. `SystemComparison`

## Tier 2 — Required for full EP001

7. `HumanConsequence`
8. `EditorialDataCard`
9. `ProtocolDiagram`
10. `CollectiveRhythm`

## Tier 3 — Series packaging

11. `AepochSeriesIntro`
12. `AepochSeriesOutro`

The first six modules should be implemented before any full episode is produced.

---

# 21. Static reference frame requirement

Before coding each Tier 1 module, create one approved 1920×1080 static reference frame.

Required frames:

```text
reference-frames/
├── 01-declarative-hook.png
├── 02-key-statement.png
├── 03-circular-value-field.png
├── 04-flow-lifecycle.png
├── 05-human-network.png
└── 06-system-comparison.png
```

Each reference frame must demonstrate:

- Final composition
- Typography hierarchy
- Color role
- Asset style
- Caption-safe area
- Mobile readability

Static frames are the visual acceptance criteria for implementation.

---

# 22. Module test reel

After Tier 1 implementation, render a single test reel.

## Reel structure

| Segment | Duration |
|---|---:|
| Title slate | 2 s |
| Declarative Hook | 5 s |
| Key Statement | 4 s |
| Circular Value Field | 6 s |
| Flow Lifecycle | 7 s |
| Human Network | 7 s |
| System Comparison | 7 s |
| Outro | 4.5 s |

Target reel length: approximately 42 seconds.

## Reel requirements

- One temporary narration track
- One captioned version
- One clean version without captions
- One reduced-motion version
- Technical metadata log
- Fixed render seed
- No paid generated video

---

# 23. Module QA checklist

A module is not complete until all answers are yes.

## Visual

1. Does it resemble ÆPOCH without relying on the logo?
2. Does it use only approved palette roles?
3. Is the type hierarchy readable on mobile?
4. Does it preserve sufficient negative space?
5. Does it avoid app-screen recreation?
6. Does it remain coherent as a static frame?

## Motion

7. Does motion follow `MOTION_TOKENS.md`?
8. Is every motion narratively justified?
9. Is output deterministic?
10. Does it define a reduced-motion state?
11. Does it settle before transition out?

## Technical

12. Does it render at 1920×1080 and 30 fps?
13. Does it accept the common scene contract?
14. Does it respect caption-safe space?
15. Does it validate missing asset references?
16. Does it avoid extending beyond its assigned frame window?
17. Does it render without network access after assets are frozen?

## Semantic

18. Is Signal used only when approved?
19. Is Moss limited to direct PoL biometric success?
20. Are human and system geometry semantically distinct?
21. Are all ÆPOCH terms spelled and capitalized correctly?
22. Does the module avoid implying functionality or claims not supported by the approved source?

---

# 24. Definition of done

Phase 12 is complete when:

- All Tier 1 static reference frames are approved
- All Tier 1 Remotion components are implemented
- The common scene schema validates
- The module test reel renders successfully
- Caption-safe and clean variants render
- Reduced-motion variants render
- Fixed-seed repeat renders are pixel-consistent
- No conventional timeline editor is required
- Codex can assemble a new test scene from JSON without changing component code
- `ASSET_INDEX.md` lists every reusable dependency
- The component library is committed and tagged as the beta baseline
