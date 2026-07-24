# ÆPOCH Motion Tokens

**Version:** 1.0  
**Status:** Beta production specification  
**Companion documents:** `VISUAL_LANGUAGE.md`, `SERIES_BIBLE.md`, `SCRIPT_RULES.md`  
**Source authority:** `260517-ÆPOCH-Brand-System-v8_2_Full_Markdown.md`

This document governs how the ÆPOCH video series moves.

The canonical brand system defines motion for the product experience. This document preserves its named motions, color logic, and restraint while adapting them for narrated 1920×1080 video rendered at 30 fps.

Motion must clarify meaning. It must never exist merely to keep the frame busy.

---

## 1. Motion principles

### 1.1 Presence before spectacle

Movement begins from human consequence, narration, or system logic. A scene does not animate simply because it can.

Every motion must serve at least one purpose:

- Direct attention
- Show a relationship
- Mark a change of state
- Reveal an ÆPOCH mechanism
- Express time, rhythm, participation, or flow
- Separate the existing system from the ÆPOCH reframe

If removing the motion leaves the idea equally clear and emotionally intact, prefer the still composition.

### 1.2 Narration controls timing

Narration is the master clock.

Cuts and transitions should align to:

- A completed clause
- A deliberate pause
- A change in argument
- A named process step
- A contrast or reveal
- A sound cue attached to one of those moments

Do not cut or animate on an arbitrary fixed interval.

### 1.3 Limited animation is the native style

The series uses:

- Pose changes
- Object translation
- Scale changes under 10%
- Opacity changes
- Line drawing
- Path-following
- Node activation
- Shape convergence
- Restrained kinetic type
- Simple camera pans and push-ins

The series does not use:

- Whip pans
- Spinning camera moves
- Decorative orbiting cameras
- Heavy parallax
- Elastic bounce
- Constant idle motion
- Fast-cut montage pacing
- Randomized motion that changes between renders
- Uncontrolled generative video as a base layer

### 1.4 Motion carries semantic meaning

| Motion behavior | Meaning |
|---|---|
| Convergence | Separate forces becoming a human-centered whole |
| Pulse | Presence, participation, or one completed activation |
| Flow along a path | Kairos, attention, information, trust, or contribution moving |
| Ring completion | Verification, collective state, or a completed cycle |
| Draw-on line | A relationship becoming visible |
| Slow push-in | Increasing importance or intimacy |
| Pull-back | Revealing collective scale |
| Fade to absence | Expiry, inactivity, or a state no longer participating |
| Sharp geometric reveal | Existing system, platform, institution, or constraint |
| Rounded eased reveal | Human, community, or living participation |

Motion semantics must remain consistent across episodes.

---

## 2. Production baseline

| Token | Value |
|---|---|
| Master resolution | 1920×1080 |
| Master frame rate | 30 fps |
| Frame duration | 33.333 ms |
| Default scene duration | Narration-driven |
| Standard transition | 12–18 frames / 0.4–0.6 s |
| Maximum ordinary push-in | 10% scale change |
| Maximum ordinary pan | 12% of frame width or height |
| Default render determinism | Required |
| Random seeds | Fixed and recorded per episode |
| Motion blur | Off by default |
| Looping | Allowed only for named ambient components |
| Safe title area | 120 px from left/right, 90 px from top/bottom |

All frame values in this document assume 30 fps.

---

## 3. Timing tokens

### 3.1 Duration scale

| Token | Frames | Time | Use |
|---|---:|---:|---|
| `instant` | 0 | 0 ms | Hard cut or immediate state replacement |
| `micro` | 4 | 133 ms | Tiny emphasis, icon response, one-word highlight |
| `quick` | 8 | 267 ms | Small object entry or text emphasis |
| `standard` | 14 | 467 ms | Default transition and object reveal |
| `measured` | 22 | 733 ms | Diagram construction, important text entry |
| `deliberate` | 36 | 1.2 s | Conceptual reframe or major scene reveal |
| `ceremonial` | 54 | 1.8 s | Rare high-significance reveal |
| `breath` | 72 | 2.4 s | Reflective hold, wide human-scale beat |
| `orbit` | 150 | 5.0 s | Standard Comet Arc orbit |
| `intro` | 120 | 4.0 s | Compressed series intro |
| `outro` | 135 | 4.5 s | Standard series landing |

`ceremonial` and `breath` must not become default scene pacing. Their weight comes from rarity.

### 3.2 Hold rules

| Content type | Minimum readable hold |
|---|---:|
| One to three words | 24 frames / 0.8 s |
| Short statement | 45 frames / 1.5 s |
| Two-line statement | 60 frames / 2.0 s |
| Simple diagram | 75 frames / 2.5 s after completion |
| Comparison with two columns | 90 frames / 3.0 s after completion |
| Numerical explanation | Narration duration plus 15-frame tail |

Text must remain visible long enough to read independently of narration.

---

## 4. Easing tokens

Use deterministic easing. Avoid visual bounce unless a later locked exception explicitly permits it.

| Token | CSS cubic-bezier | Use |
|---|---|---|
| `linear` | `linear` | Continuous path flow and steady orbit |
| `standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default UI-derived movement |
| `easeOutCubic` | `cubic-bezier(0.33, 1, 0.68, 1)` | Opacity, text, and small object entry |
| `easeInCubic` | `cubic-bezier(0.32, 0, 0.67, 0)` | Exit into a cut or convergence pull point |
| `easeOutQuint` | `cubic-bezier(0.22, 1, 0.36, 1)` | Major reveal and convergence resolution |
| `easeInOutSine` | `cubic-bezier(0.37, 0, 0.63, 1)` | Ambient breathing and slow pans |
| `sharpSystem` | `cubic-bezier(0.7, 0, 0.84, 0)` | Existing-system constraints and rigid closures |

### 4.1 Remotion spring policy

Springs are optional and must resolve without visible bounce.

Recommended restrained spring:

```ts
{
  damping: 200,
  stiffness: 120,
  mass: 1
}
```

Use a spring only for:

- A single human node settling into place
- A small icon or symbol resolving
- A restrained scale change from `0.96` to `1`

Do not use spring motion for:

- Full scene transitions
- Headlines
- Diagrams
- The Æ mark
- The Signal
- Comet Arc
- Camera movement

---

## 5. Transition tokens

### 5.1 Standard scene transitions

#### `crossfade`

- Duration: 14 frames
- Outgoing opacity: 1 → 0
- Incoming opacity: 0 → 1
- Easing: `easeOutCubic`
- Use: continuation within the same argument

#### `paperWipe`

- Duration: 16 frames
- Direction: left-to-right or bottom-to-top
- Fill: Paper
- Easing: `standard`
- Use: moving from one editorial illustration to another
- Never rotate the wipe

#### `darkCut`

- Duration: 0 frames
- Use: entering or leaving a Void/Depth hook scene
- Optional audio: restrained low transient
- Do not crossfade warm and dark scenes when the narrative calls for a rupture

#### `diagramBuild`

- Duration: 22–36 frames
- Nodes enter first
- Edges draw second
- Labels enter last
- Use: system explanation in build or climax stages

#### `signalReveal`

- Duration: 36–54 frames
- Signal appears once at the mechanism-click moment
- May include one soft glow
- Must not be reused elsewhere in the same episode

### 5.2 Transition restrictions

Never use:

- Page curl
- Cube rotation
- Radial spin
- Glitch transition
- Film burn
- Lens flare wipe
- RGB split
- Digital scanline
- Particle explosion
- Random transition selection

---

## 6. Camera tokens

All camera movement is simulated in a flat 2D composition.

### `pushInSmall`

- Scale: 1.00 → 1.05
- Duration: 60–120 frames
- Easing: `easeInOutSine`
- Use: focus on a human consequence or key statement

### `pushInMax`

- Scale: 1.00 → 1.10
- Duration: at least 90 frames
- Easing: `easeInOutSine`
- Use: rare climax emphasis
- Never exceed 1.10 for ordinary scenes

### `pullBackCollective`

- Scale: 1.08 → 1.00
- Duration: 75–150 frames
- Easing: `easeOutQuint`
- Use: reveal many humans, a network, or shared rhythm

### `panMeasured`

- Translation: no more than 12% of frame width or height
- Duration: at least 75 frames
- Easing: `easeInOutSine`
- Use: move across a process or comparison
- Never combine with a large simultaneous zoom

### `cameraStill`

Default. Static composition with motion inside the frame.

---

## 7. Named ÆPOCH motion components

## 7.1 Earth Rise

Earth Rise is the canonical light background field.

### Color pools

| Pool | Position | Radius | Color |
|---|---|---:|---|
| Earth warm | 8% W, 75% H | 75% max dimension | `rgba(196,131,90,0.15)` |
| Earth sand | 18% W, 92% H | 55% max dimension | `rgba(232,201,160,0.11)` |
| Cosmos pearl | 92% W, 4% H | 58% max dimension | `rgba(214,228,240,0.13)` |
| Cosmos prism | 98% W, 18% H | 42% max dimension | `rgba(184,169,217,0.10)` |
| Base | Full frame | — | `#FEFCF9` |

### Video behavior

Default behavior is static.

Optional ambient motion:

- Maximum pool translation: 1.5% of frame width/height
- Maximum radius change: 2%
- Cycle duration: 12–20 seconds
- Easing: `easeInOutSine`
- No obvious loop seam
- Fixed phase offsets per episode
- Disable when another named motion is dominant

Earth Rise is not a generic gradient background. Its positions and color poles remain fixed.

## 7.2 Comet Arc

The Comet Arc represents active time, binding, attention, or a cycle moving toward completion.

### Standard series form

| Property | Value |
|---|---|
| Orbit duration | 150 frames / 5.0 s |
| Path | Circle, ring, or approved rounded perimeter |
| Tail length | 18% of path |
| Tail segments | 60 minimum |
| Head | White-hot point |
| Head gradient | White → Pearl → Prism → transparent |
| Tail gradient | Prism → white |
| Rotation | Clockwise unless a scene explicitly requires reversal |
| Easing | Linear |
| Looping | Only while the represented process remains active |

### Hero/loading form

| Property | Value |
|---|---|
| Tail segments | 130 |
| Warm root | `rgb(196,131,90)` |
| Cool head | `rgb(230,220,248)` |
| Line width | `0.7 + tp × 4.0` |
| Opacity | `pow(tp,0.85) × cometAlpha × 0.95` |
| Outer halo radius | `22 + cometProgress × 5 px` |
| Warm bloom | Gold, 10 px |
| White core | 3.2 px |
| Rim stroke | `rgba(200,190,240,0.40)`, 6.5 px |

### Resolution

When directly depicting successful PoL biometric verification:

- Comet Arc may resolve into a full Moss ring
- Moss may not be used for generic completion or positive confirmation

In all other contexts:

- Resolve to Prism, Pearl, Clay, or Ink according to the object’s meaning
- Do not resolve to Moss

### Reduced motion

- Freeze the arc at a meaningful progress point
- Show a static Prism arc segment
- Preserve labels and state information

## 7.3 The Signal

The Signal is the canonical convergence motion.

It is reserved for:

- The conceptual turning point
- The moment the ÆPOCH mechanism becomes clear
- A rare episode-level reframe
- The compressed series intro

It must not appear as an ordinary transition.

### Canonical sequence

| Phase | Frames | Time | Behavior |
|---|---:|---:|---|
| Breath | 0–9 | 0–0.3 s | Frame settles before convergence |
| Converge | 9–63 | 0.3–2.1 s | Clay circle enters from left, Prism circle from right |
| Hold | 63–78 | 2.1–2.6 s | Vesica locks |
| Forge | 78–111 | 2.6–3.7 s | White ring draws clockwise from top |
| Radiance | 111–138 | 3.7–4.6 s | Bloom and shimmer |
| Settle | 138–162 | 4.6–5.4 s | Mark reduces to final placement |

### Geometry and light

- Left: Clay halo `rgba(196,131,90,0.10–0.11)`
- Left stroke: Clay at `0.50–0.52` opacity
- Right: Prism halo `rgba(184,169,217,0.10–0.11)`
- Right stroke: Prism at `0.50–0.52` opacity
- Warm lens edge: `rgba(235,200,150,0.62)`
- Cool lens edge: `rgba(200,222,250,0.55)`
- Human ring: white-hot stroke, no fill
- Forge begins at `-π/2`
- Bloom: three waves, warm white → cool violet → warm amber
- Bloom duration: 42 frames / 1.4 s
- Bloom begins at 82% of forge progress

### Video adaptation

For ordinary episodes, The Signal may end on:

- The Æ mark
- A human circle
- The central mechanism diagram
- One key sentence

It may not end on a purchase CTA, price, token symbol, or coin image.

### Reduced motion

Show the final converged state immediately.

## 7.4 Particle convergence

Particle convergence represents potential becoming coordinated presence.

### Canonical hero form

- Total particles: 150
- Earth particles: first 75, lower-left bias
- Cosmos particles: last 75, upper-right bias
- Earth fills left semicircle
- Cosmos fills right semicircle
- Convergence delay per particle: randomized within 0–9% using a fixed seed
- Path:
  1. Ease-in cubic toward pull point
  2. Pull point sits 28% toward ring from center
  3. Ease-out quint into final ring position

### Standard scene form

Use fewer particles for readability and render economy:

| Context | Count |
|---|---:|
| Small diagram accent | 18–30 |
| Full-frame transition | 48–72 |
| Intro or major hero | 100–150 |

Particles must not resemble:

- Glitter
- Stars
- Confetti
- Sparks
- Cryptocurrency fragments
- Data rain

Use circles only, with sizes and opacity constrained to one family.

## 7.5 Æ mark emergence

### Canonical loading behavior

- Start: 63% of motion duration
- End: 88%
- Scale: 0.05 → 1.0
- Scale easing: `easeOutQuint`
- Opacity: 0 → 1
- Opacity easing: `easeOutCubic`
- Pivot: exact visual center
- Fill: Ink Mid `#4A4440`
- Optical offset at 75 px width: X `-6.5 px`, Y `-2.0 px`
- Rendering: native paths or clean vector component

### Series behavior

The Æ mark must never:

- Spin
- Bounce
- Glitch
- Shatter
- Emit a lens flare
- Become a coin
- Rotate in 3D
- Pulse continuously throughout a scene

After emergence, it may breathe once:

- Scale: 1.00 → 1.025 → 1.00
- Duration: 54–72 frames
- Easing: `easeInOutSine`
- One cycle only unless used as the fixed outro mark

---

## 8. Series intro token

The app’s 16-second loading sequence is not used in full at the beginning of every video.

The standard series intro is a compressed four-second adaptation.

### `seriesIntroV1`

| Frames | Time | Action |
|---|---:|---|
| 0–24 | 0–0.8 s | Sparse Earth and Cosmos particles enter |
| 24–66 | 0.8–2.2 s | Particles and poles converge |
| 66–102 | 2.2–3.4 s | Comet Arc completes and Æ mark emerges |
| 102–120 | 3.4–4.0 s | Episode title or series label settles |

Rules:

- No spoken narration required
- Audio signature must remain restrained
- Title uses sentence case
- Do not add a slogan unless the episode brief requires it
- The intro may be shortened to 60–75 frames for short-form exports
- Do not use the full intro after a cold open unless total duration supports it

---

## 9. Series outro token

### `seriesOutroV1`

Duration: 135 frames / 4.5 seconds.

| Frames | Action |
|---|---|
| 0–45 | Final statement remains on screen |
| 45–90 | Statement resolves toward the Æ mark |
| 90–120 | Æ mark and ÆPOCH identifier settle |
| 120–135 | Clean hold for platform end-screen behavior |

Rules:

- One concluding thought
- No stacked calls to action
- No generic “like and subscribe” animation
- Website or series identifier may appear beneath the mark
- The mark remains still during the final hold
- Audio resolves rather than abruptly cutting

---

## 10. Human motion tokens

The recurring human silhouette remains symbolic and gender-neutral.

### `humanEnter`

- Translation: 24–48 px
- Opacity: 0 → 1
- Duration: 14–22 frames
- Easing: `easeOutCubic`
- Path: slightly curved or direct
- Corners and posture remain soft

### `humanAcknowledge`

- Head rotation: maximum 8°
- Hand or arm change: one pose swap
- Duration: 12–20 frames
- Use: attention, listening, or recognition

### `humanActivate`

- One outward pulse from human node
- Pulse scale: 1.0 → 1.35
- Pulse opacity: 0.45 → 0
- Duration: 18 frames
- Color: Clay by default
- Moss only when directly depicting completed PoL biometric verification

### `humanJoinCollective`

- Individual enters first
- Relationship lines draw second
- Collective ring or field responds third
- Total duration: 36–60 frames
- Avoid simultaneous arrival of every node

### `humanExitInactive`

- Opacity: 1 → 0
- Scale: 1.0 → 0.96
- Duration: 22–36 frames
- No red flash, fire, crumble, or punitive visual

---

## 11. Diagram motion tokens

### `nodeEnter`

- Scale: 0.94 → 1
- Opacity: 0 → 1
- Duration: 14 frames
- Easing: `easeOutCubic`

### `edgeDraw`

- Stroke reveal: 0 → 100%
- Duration: 18–30 frames
- Easing: `standard`
- Arrowhead appears in final 20% only

### `flowPulse`

- Small luminous segment travels along an existing edge
- Duration: proportional to path length
- Default speed: 280–420 px/s
- Color:
  - Clay for human contribution or Kairos given
  - Iris for circulation or transfer
  - Prism for protocol identity
  - Signal only for the episode’s single reveal

### `equalVote`

- Human nodes activate one at a time
- Every node uses identical diameter and pulse amplitude
- No node grows larger because of token holdings
- Final tally appears only after all participating nodes settle

### `centralizedConstraint`

- Sharp system shape closes or channels multiple human paths
- Duration: 14–22 frames
- Easing: `sharpSystem`
- System shape uses sharp geometry
- Do not imply violence toward the human nodes

### `distributedOpen`

- Central bottleneck fades
- Human-to-human paths draw outward
- Duration: 36–54 frames
- Easing: `easeOutQuint`
- Final network must remain readable, not become a dense web

### `lifecycleStep`

- One state activates at a time
- Previous states remain visible at 55–70% emphasis
- Current state uses full emphasis
- Completed connector remains visible
- Default gap between step activations: 10–16 frames

---

## 12. Kinetic typography tokens

Typography remains editorial, not promotional.

### `headlineReveal`

- Opacity: 0 → 1
- Translation Y: 18 px → 0
- Duration: 18–24 frames
- Easing: `easeOutCubic`
- Reveal by line, not by individual letter

### `keyWordEmphasis`

Choose one:

- Weight shift
- Clay underline draw
- Prism ring around the word
- One Signal reveal when this is the episode’s mechanism-click moment

Do not:

- Bounce words
- Rotate words
- Animate every word independently
- Use typewriter effects for narration
- Flash words rapidly
- Fill whole paragraphs with Signal

### `statementHold`

- No movement after reveal
- Minimum hold: 45 frames
- Optional push-in: maximum 5%
- Best for the final line of a section

### `numberResolve`

- Value changes through crossfade or short count
- Counting duration: maximum 30 frames
- Use tabular numerals
- Do not use casino-style spinning digits
- Do not animate speculative prices or market gains

---

## 13. State-change vocabulary

### Activation

1. Human or node becomes present
2. One pulse expands
3. Relationship or value path becomes available

### Circulation

1. Existing path illuminates
2. A segment travels along it
3. Recipient or destination responds once

### Permanence

1. Moving element settles
2. Ring or boundary completes
3. Motion stops

Permanence is communicated through stillness, not endless glow.

### Expiry

1. Uncirculated element loses emphasis
2. Opacity reduces
3. Element fades to absence
4. Remaining system rebalances

Do not use burning flames, destruction, punishment, or red alarm imagery.

### Governance

1. Equal human nodes appear
2. Nodes register one equal response each
3. Aggregate sentiment appears separately
4. No wealth-weighted size differences

### Verification

1. Human is already visible
2. Arc or ring checks the state
3. Successful PoL may resolve in Moss
4. Private biometric content is never depicted literally

---

## 14. Ambient motion policy

Ambient motion is allowed only when it reinforces a named idea.

Permitted loops:

- Earth Rise pool drift
- Comet Arc during an active process
- Slow collective rhythm pulse
- Very subtle shimmer on a completed Signal ring
- Quiet line-flow in a network that narration describes as active

Rules:

- Maximum two ambient loops in one scene
- At least one loop should stop when the scene’s state resolves
- Avoid synchronized loops unless rhythm is the explicit subject
- Do not animate background objects independently without meaning
- No perpetual pulsing logo in ordinary scenes

---

## 15. Audio and motion relationship

Sound design remains secondary to narration.

| Motion | Optional sound |
|---|---|
| Node activation | Soft low click or breath |
| Edge completion | Quiet tonal thread |
| Comet head pass | Subtle airy movement |
| The Signal lock | Soft convergence tone |
| Ring forge completion | Restrained harmonic bloom |
| Hard dark cut | Low transient |
| Outro settle | Short resolving tone |

Rules:

- No impact sound on every transition
- No app-notification sounds
- No crypto trading sounds
- No excessive whooshes
- Music must duck beneath narration
- Silence is an intentional option

---

## 16. Reduced-motion behavior

Every scene module must define a reduced-motion state, even though the primary output is rendered video.

Reduced-motion exports are useful for:

- Accessible embeds
- Social variants
- Static previews
- Review frames
- Low-distraction editions

General conversion:

| Standard motion | Reduced-motion equivalent |
|---|---|
| Crossfade | Hard cut or 4-frame fade |
| Push-in or pan | Static final composition |
| Comet Arc | Static partial arc |
| Particle convergence | Final ring and mark |
| The Signal | Final converged state |
| Edge draw | Completed edge |
| Flow pulse | Directional arrow or highlighted segment |
| Character movement | Final pose |
| Ambient background | Static Earth Rise |

Do not remove information when motion is removed.

---

## 17. Remotion implementation contract

Each scene component should accept a common motion configuration.

```ts
export type AepochMotionConfig = {
  reducedMotion?: boolean;
  transitionIn?: AepochTransition;
  transitionOut?: AepochTransition;
  camera?: AepochCameraMove;
  seed?: number;
  narrationStartFrame?: number;
  narrationEndFrame?: number;
};

export type AepochTransition =
  | "instant"
  | "crossfade"
  | "paperWipe"
  | "darkCut"
  | "diagramBuild"
  | "signalReveal";

export type AepochCameraMove =
  | "cameraStill"
  | "pushInSmall"
  | "pushInMax"
  | "pullBackCollective"
  | "panMeasured";
```

Named motion components should be reusable, not reimplemented per scene:

```text
EarthRise
CometArc
TheSignal
ParticleConvergence
AepochMarkEmergence
HumanNode
FlowEdge
LifecycleStepper
StatementReveal
```

### Determinism requirements

- All randomized positions derive from a fixed seed
- No `Math.random()` inside render paths without seeded wrapping
- The selected seed is recorded in the episode decision log
- Frame output must remain identical across repeated renders
- Provider-generated assets are frozen before composition begins

### Frame ownership

Narration timings define:

- Scene start and end
- Internal emphasis frames
- Transition windows
- Caption timing

A scene component may not silently extend itself beyond the approved narration window.

---

## 18. Motion QA checklist

Before a scene ships:

1. Does every motion clarify a relationship, state, or narrative beat?
2. Does the timing follow narration rather than an arbitrary interval?
3. Is the camera movement below the locked scale and translation limits?
4. Is Signal used only at the approved episode-level reveal?
5. Is Moss used only for a directly depicted successful PoL biometric verification?
6. Are human movements soft and system constraints geometrically sharp?
7. Does the scene avoid bounce, spin, glitch, and decorative orbiting?
8. Is all randomized movement deterministic?
9. Does the final still frame remain compositionally complete?
10. Is there a reduced-motion equivalent?
11. Do all moving labels remain readable?
12. Does the scene settle into stillness after communicating permanence?
13. Are loops limited to named ambient components?
14. Does the render remain recognizably ÆPOCH with the logo removed?
15. Would removing a motion make no difference? If yes, remove it.

---

## 19. Token summary

```json
{
  "fps": 30,
  "durations": {
    "micro": 4,
    "quick": 8,
    "standard": 14,
    "measured": 22,
    "deliberate": 36,
    "ceremonial": 54,
    "breath": 72,
    "orbit": 150,
    "intro": 120,
    "outro": 135
  },
  "limits": {
    "maxOrdinaryScale": 1.10,
    "maxOrdinaryPanPercent": 12,
    "maxAmbientLoopsPerScene": 2,
    "signalRevealsPerEpisode": 1
  },
  "easing": {
    "standard": [0.4, 0, 0.2, 1],
    "easeOutCubic": [0.33, 1, 0.68, 1],
    "easeInCubic": [0.32, 0, 0.67, 0],
    "easeOutQuint": [0.22, 1, 0.36, 1],
    "easeInOutSine": [0.37, 0, 0.63, 1],
    "sharpSystem": [0.7, 0, 0.84, 0]
  }
}
```

This summary is a convenience for implementation. The semantic rules in the full document remain authoritative.
