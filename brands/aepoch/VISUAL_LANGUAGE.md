# ÆPOCH Visual Language

Companion document to `SERIES_BIBLE.md` and `SCRIPT_RULES.md`. Those two govern what an episode says and how a blog post becomes a script. This one governs what an episode looks like. Every generated asset, every scene-plan handoff, and every animation pass gets checked against this before it ships.

Where this document is silent, the brand system (`260517-ÆPOCH-Brand-System-v8_2_Full_Markdown.md`) is the fallback — but that system was built for app UI, not for seven-minute narrated video. Don't port its component specs (buttons, form fields, nav bars) into the series. Port its color logic and its restraint.

---

## 1. Visual direction

The series looks like original symbolic editorial animation: flat vector illustration, explanatory diagrams, limited character movement, restrained kinetic typography. Nothing in it should look like it was rendered by a product demo team or a stock-asset generator.

Spirit Science is a reference for four things only: narration-led structure, symbolic visual storytelling, limited-animation economics, and a recurring visual grammar that lets a viewer recognize an ÆPOCH episode within three seconds of it starting. That's the entire scope of the reference.

None of the following get copied from it or from anywhere else: the character, the head shape, the specific symbols, the palette, the typography, the scene compositions. If a generated frame could be mistaken for a Spirit Science screenshot with different colors swapped in, it's wrong, not close.

The test for any asset: does it look like it belongs to ÆPOCH specifically, or does it look like "explainer video" in general? The second answer means start over.

---

## 2. The visual system

### Palette

The full brand system has thirty-some tokens built for a product interface with error states, disabled states, and hover states. Video doesn't need most of that. The series draws from two poles already defined in the brand system and leaves the rest alone.

**Earth pole — human presence.** Used for people, hands, daily life, anything the narration is describing as lived experience.

| Name | Hex | Use |
|---|---|---|
| Clay | `#C4835A` | Primary figure color, warmth, the "this is real" register |
| Ochre | `#A0673A` | Secondary figure shading, depth |
| Sand | `#E8C9A0` | Highlight, warm background tint |

**Cosmos pole — protocol and mechanism.** Used for diagrams, system shapes, anything explaining how ÆPOCH works rather than what it feels like.

| Name | Hex | Use |
|---|---|---|
| Pearl | `#D6E4F0` | Background wash behind diagrams |
| Iris | `#8BAFD4` | Diagram lines, secondary system shapes |
| Prism | `#B8A9D9` | Epoch and protocol-identity elements |

**Signal accent.** `#6B5FED`. One reveal per episode, at most. This is the color of the moment the mechanism clicks for the viewer — the climax beat in the five-stage arc. If Signal shows up more than once in a script's enhancement cues, it's not a signal anymore, it's a background color, and the reveal it was supposed to mark loses its weight.

**Base surfaces.**

| Name | Hex | Use |
|---|---|---|
| Paper | `#FAF8F5` | Default background for present-day, human-scale scenes |
| Ink | `#1A1612` | Primary line work and text on Paper |
| Void | `#0C0B0A` | Reserved for hook-stage scenes depicting the existing, broken status quo |
| Depth | `#141210` | Secondary dark surface, paired with Void |

Void and Depth exist so the hook of an episode can look and feel colder than the reframe that follows it. A script that opens on the current internet's failure to recognize presence can open in Void. The moment ÆPOCH's mechanism enters, the palette warms back toward Paper and Clay. That shift is doing narrative work — don't use the dark palette decoratively, and don't use it in more than the hook and setup stages.

**Reserved semantic use.** Moss may appear only when a scene directly depicts successful Proof of Life biometric verification. It must not be used as a general positive, growth, receipt, confirmation, network, or success color anywhere else in the series. Hearth and Ember remain error and warning states from the UI and do not appear unless an episode directly explains those states. Deep Ink is a button background, not a default video color.

### Line, corner, and shadow

The baseline stroke is 3px at 1920×1080, scaled proportionally for other export sizes. Primary hero shapes and full-screen diagrams may use 4–5px where required for mobile readability. Stroke weight must remain consistent within each asset family and scene. No sketchy or hand-drawn line quality. Consistency across shots is what makes limited animation read as a system rather than a set of disconnected drawings.

Corner treatment carries meaning. Human and presence-related shapes (people, hands, the Clay/Sand register) get soft, rounded corners. System and platform shapes — anything representing an existing tech platform, a data broker, an algorithm, the thing being critiqued — get sharp, geometric corners. That contrast is a visual argument the series is already making in narration: human things are organic, extractive systems are rigid. The shapes should say it too.

No drop shadows. Flat color fields are the default. Gradients are permitted only for the canonical Earth Rise ambient pools, the Comet Arc, and the single Signal reveal glow. No generic decorative gradients, metallic gradients, stacked shadows, or depth-simulating gradient effects.

No texture. No paper grain, no noise overlay, no halftone. Flat and clean throughout. Texture reads as an aesthetic choice borrowed from somewhere else; this series doesn't need one.

### Character proportions

One reusable human silhouette style, used across every episode. Gender-neutral, no fixed face, no name, no personality — this isn't a mascot and shouldn't accumulate one. The moment a recurring character starts feeling like ÆPOCH's spokesperson, it's competing with the actual argument the series is making.

Proportions stay close to natural (roughly 1:7 head-to-body), not the compressed chibi ratio of a cartoon mascot. Detail stays symbolic: silhouette, posture, gesture. No rendered facial features beyond what's needed to read an expression from a distance. Animation stays limited — a walk cycle, a hand raising, a head turning — never a fully rigged character performing complex physical acting. If a moment needs more expressive weight than the silhouette can carry, the diagram or the kinetic type carries it instead, not a more detailed character.

### Icon and diagram geometry

Icons build from the same primitive vocabulary the brand system already uses for its loading sequence: circles, rings, arcs. A circle reads as an individual or a single unit of presence. A ring reads as the protocol or the collective. An arc reads as time or an epoch boundary. Stay inside that vocabulary rather than importing generic tech-explainer icon sets (gears, clouds, padlocks, chips) that carry no ÆPOCH-specific meaning.

Diagrams use flat nodes-and-edges syntax: circles for states or people, single-weight lines for relationships or flow. Layout runs left-to-right or top-to-bottom. No isometric 3D diagram blocks, no radial mind-map bursts, no dashboard-style panels. A diagram earns its place in the build or climax stage of an episode, per `SCRIPT_RULES.md`'s five-stage arc — it doesn't belong in the hook, which should stay on people and consequence, not on system architecture.

### Motion

Transitions cut on the beats the narration already creates — a pause in the voice performance plan is a natural place for a cut, not an arbitrary timer. Standard transition length is 0.4–0.6 seconds, crossfade or simple wipe. No fast-cut MTV editing, no whip pans, no spinning or orbiting camera moves that read as a product demo reel.

Camera movement, since everything lives on a flat 2D plane, means simulated pans and push-ins. A push-in should stay under roughly 10% scale change across a section — enough to add attention, not enough to feel like a zoom effect. No parallax-heavy 2.5D layering, no Ken Burns effect used decoratively on static illustrations without narrative reason.

---

## 3. Generation prompts

Every generated asset prompt includes the constraints below. Treat this as the non-negotiable base layer that every prompt is built on top of, not a suggestion to draw from selectively.

**Always include:**

```
flat vector editorial illustration
consistent 3px baseline line weight, 4–5px only for approved hero-scale readability
ÆPOCH palette only: Clay #C4835A, Ochre #A0673A, Sand #E8C9A0, Pearl #D6E4F0, Iris #8BAFD4, Prism #B8A9D9, Paper #FAF8F5, Ink #1A1612
clean geometric shapes
human-centered technology
symbolic rather than photorealistic
simple readable silhouettes
no facial detail beyond basic expression
designed for animation at 1920x1080
flat color fields by default; gradients only for canonical Earth Rise ambient pools, Comet Arc, or one restrained Signal reveal glow; no generic decorative gradients
no drop shadow
```

**Always exclude:**

```
photorealistic
3D render
cyberpunk
glowing cryptocurrency coin
coin stack
upward-trending chart or ticker counter
hooded hacker
generic corporate stock illustration
random lettering
complex background detail
multiple art styles
distorted anatomy
watermark
mascot-style cartoon character
gear, cloud, or padlock icon clichés
paper grain or texture overlay
```

The coin, chart, and hacker exclusions aren't generic AI-art hygiene — they're specific to `SERIES_BIBLE.md`'s rule against cryptocurrency and crypto-thriller imagery. KAIROS is presence made visible, not currency made visible. If a generated asset would work equally well in a video about any other crypto project, the prompt hasn't done its job.

---

## 4. Before an asset ships

1. Would this frame read as ÆPOCH-specific if the logo were removed, or does it read as generic explainer video?
2. Is every color used one from the locked palette above, with Signal appearing at most once per episode?
3. Do human shapes have soft corners and system/platform shapes have sharp corners, consistently?
4. Is texture, shadow, or gradient use fully accounted for by the exceptions above, with nothing extra sneaking in?
5. Does the character silhouette match the one reused style, with no new face or personality drifting in?
6. If this is a diagram, does it belong to the build or climax stage, not the hook?
7. Does anything in frame resemble a coin, a price chart, a hacker, or a cyberpunk cityscape? If so, cut it.
8. Would this asset still make sense pulled from the video and shown as a single still frame? If it only works in motion, the composition isn't carrying its own weight.
