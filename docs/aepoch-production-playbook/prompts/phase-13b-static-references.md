Begin ÆPOCH Phase 13B: static reference-frame production for Episode 001.

Episode:

projects/aepoch-episodes/001-what-is-aepoch/

This phase creates static visual references and the minimum Remotion
component scaffolding needed to render those stills.

Do not implement full scene animation.
Do not generate narration audio.
Do not generate captions.
Do not assemble the complete episode timeline.
Do not render the complete episode.
Do not modify the approved narration.
Do not reopen factual claims or research.
Do not modify the Tier 1 beta behavior.

Read completely:

- projects/aepoch-episodes/001-what-is-aepoch/inputs/episode-brief.md
- projects/aepoch-episodes/001-what-is-aepoch/inputs/narration-script.md
- projects/aepoch-episodes/001-what-is-aepoch/inputs/scene-plan.yaml
- projects/aepoch-episodes/001-what-is-aepoch/storyboard/static-review.md

Also read:

- brands/aepoch/SERIES_BIBLE.md
- brands/aepoch/VISUAL_LANGUAGE.md
- brands/aepoch/MOTION_TOKENS.md
- brands/aepoch/SCENE_MODULES.md
- brands/aepoch/ASSET_INDEX.md
- remotion-composer/src/aepoch/
- projects/aepoch-tests/module-test-reel/qa/tier-1-motion-review.md

Use the tagged Tier 1 beta as the visual and technical baseline:

aepoch-tier1-beta-v0.1.0

Do not check out or modify the tag. Work on the current branch.

PHASE OBJECTIVE

Produce deterministic 1920×1080 static reference frames for every new
module and every materially new episode-specific Tier 1 variant.

The stills must demonstrate:

- Composition
- Scale
- Hierarchy
- Mobile readability
- Earth/Cosmos relationship
- Human/system distinction
- Correct use of Signal
- Correct use of Void, Depth, Paper and Earth Rise
- Clear visual differentiation between neighboring scenes

Create episode-specific source under a structure similar to:

remotion-composer/src/aepoch/episodes/001-what-is-aepoch/

Use clear filenames such as:

- components.tsx
- variants.tsx
- static-previews.tsx
- tokens.ts
- types.ts

Use the existing project architecture where a better established pattern
already exists.

Do not duplicate the entire Tier 1 module library. Import and configure
shared modules where possible.

NEW MODULES TO STATICALLY DESIGN

1. WelcomeDirectAddress

Required states:

A. Welcome
- Single symbolic human form
- Three-quarter or near-front orientation
- No facial features
- No presenter or mascot personality
- No head tilt
- Generous negative space
- Earth Rise background
- No on-screen text

B. August 9 continuation
- Same visual world and human form
- Small “August 9” date treatment
- Restrained partial Comet Arc foreshadowing
- Must read as a continuation, not a new title card

The human may imply presence through posture and stillness, but must not
look like a cartoon host.

2. SyntheticMultiplication

Create three genuinely distinct configurations:

A. Mimicry
- One irregular human rhythm
- Nearly identical echoes appear around it
- The human remains visually distinguishable
- Do not use speech bubbles, social-media cards or browser UI

B. Multiplication
- One synthetic unit replicated into many
- Clear mechanical regularity
- Composition should imply accelerating scale even as a still
- Avoid generic “AI” iconography

C. Manufactured consensus
- Replicated units resolved into a uniform pressure field
- Industrial and systemic without literal server racks
- No hooded figures
- No named platform
- No conspiracy-poster aesthetic
- Must feel visually different from Mimicry and Multiplication

3. HumanConsequence

Create two states based on the existing Tier 2 specification:

A. Uncertain reflection
- One human facing an unresolved system/reflection form
- The system does not resolve cleanly
- No literal mirror or screen
- No horror framing
- Human remains whole and dignified

B. Extraction
- Thin directional flow drawn away from a human toward a system
- Represents time, energy, data and attention extraction
- The human is not physically diminished or damaged
- No battery, fuel gauge or medical imagery

4. AepochSeriesOutro

Required state:

- Earth Rise background
- “See you tomorrow.”
- Canonical Æ mark and approved identifier treatment
- Clean end-screen-safe hold composition
- No additional CTA
- No Signal reveal
- No decorative clutter

EPISODE-SPECIFIC TIER 1 VARIANTS

Create static references for:

1. DeclarativeHook — built for another world
- N13 / Scene 11
- Rigid economic-system geometry
- No human node in the settled composition
- Must feel obsolete or structurally mismatched, not evil

2. DeclarativeHook — does not recognize presence
- N14 / Scene 12
- Same visual family as Scene 11
- Distinct settled composition
- A quiet human node remains unacknowledged at the system boundary
- Must not merely look like Scene 11 with one extra circle

3. CircularValueField — traffic data
- 53% automated
- Could climb past 90%
- Paper background
- Strong numeric hierarchy
- Tabular numerals if available
- No spinning-counter aesthetic
- No visible source citation

4. CircularValueField — ancient idea / modern tools
- Balanced relationship, not convergence
- One Earth-register form
- One Cosmos-register form
- One restrained connecting path
- No Æ mark convergence
- No vesica forge
- No white Signal ring
- Must not resemble the preceding Signal scene

5. HumanNetwork — protocol layer
- Individually distinct human nodes
- One restrained shared layer or ring
- No browser UI
- No technical stack
- No Signal
- Must visually communicate “a layer for the internet”

6. HumanNetwork — participant cohort
- Distributed early-tester network
- Natural unequal spacing
- Each human node visually distinguishable
- Not governance
- Not voting
- Not a hierarchy

7. FlowLifecycle — 42-day test
Use exactly these four stages:

- Start August 9
- Test what we built
- Notice what happens
- Shape what comes next

“Things will break” and “That’s normal” are not lifecycle stages.

The static reference should prove all four labels remain readable at
1920×1080 and plausible on mobile.

STATIC REFERENCE REQUIREMENTS

Render one approved-candidate still for each required state above.

Also render alternate candidates where the design decision is not
obvious:

- WelcomeDirectAddress: 2 candidates
- SyntheticMultiplication Mimicry: 2 candidates
- SyntheticMultiplication Manufactured consensus: 2 candidates
- HumanNetwork protocol layer: 2 candidates
- Ancient idea / modern tools: 2 candidates

Other states may use one candidate unless implementation reveals a real
visual ambiguity.

Render all stills at:

- 1920×1080
- PNG
- Deterministic frame and seed
- No debug labels by default
- No corner mark unless the scene specification explicitly requires it

Output under:

projects/aepoch-episodes/001-what-is-aepoch/renders/stills/phase-13b/

Use descriptive filenames, for example:

01-welcome-direct-address-a.png
01-welcome-direct-address-b.png
02-august-9-continuation.png
05-synthetic-mimicry-a.png
05-synthetic-mimicry-b.png
06-synthetic-multiplication.png
07-manufactured-consensus-a.png
07-manufactured-consensus-b.png

Continue consistently for all required states.

CONTACT SHEETS

Create:

1. complete-reference-contact-sheet.png
2. new-modules-contact-sheet.png
3. tier1-variants-contact-sheet.png
4. neighboring-scenes-contact-sheet.png

The neighboring-scenes sheet must place these sequences side by side:

- Welcome → August 9 → Mission
- Mimicry → Multiplication → Manufactured consensus
- Built for another world → Does not recognize presence
- ÆPOCH is our response → Ancient idea / modern tools
- Already a contribution → Protocol layer → One idea
- 42 days → Participant cohort → Final thesis → Biological transformer
- Biological transformer → See you tomorrow

This sheet exists specifically to expose repetition, false Signals,
layout sameness and poor transitions before animation begins.

QA DOCUMENT

Create or update:

projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13b-static-review.md

Record:

- Composition ID
- Scene represented
- Module or variant
- Candidate filename
- Reused assets
- New assets introduced
- Brand-rule checks
- Mobile-readability assessment
- Neighboring-scene differentiation
- Signal-use check
- Known limitations
- Pass/fail
- Creative-review status

TECHNICAL RULES

- Reuse canonical Earth Rise.
- Reuse the exact canonical Æ mark paths.
- Preserve the approved optical offset.
- Use sentence case.
- Use ÆPOCH capitalization.
- Baseline stroke is 3px at 1920×1080.
- Hero stroke may reach 4–5px only where readability requires it.
- Moss is not permitted anywhere in this episode unless directly showing
  a successful Proof of Life biometric verification. This episode does
  not contain such a scene, so Moss should not appear.
- Signal may appear only in the existing approved “ÆPOCH is our response”
  scene.
- Do not introduce Signal color or Signal geometry into any new static
  reference.
- No drop shadows.
- No decorative textures.
- No generic gradients beyond the canonical Earth Rise background.
- No platform logos.
- No literal UI.
- No robots, glowing brains, coins, Matrix code or cyberpunk imagery.
- No random positioning. Any variation must use a fixed seed.

REGISTRATION

Register only static-preview compositions needed to render the reference
frames and contact sheets.

Prefix composition IDs clearly, for example:

Aepoch-E001-Static-

Do not register the full episode composition yet.

VALIDATION

Before stopping:

- Type-check the Remotion project.
- Validate all static composition IDs.
- Render every required still.
- Verify every PNG is exactly 1920×1080.
- Verify deterministic hashes by rendering at least three representative
  stills twice.
- Verify Moss is absent.
- Verify only the approved Signal scene uses Signal treatment.
- Verify the ancient-idea/modern-tools scene cannot be mistaken for a
  second Signal.
- Verify Scenes 11 and 12 are genuinely different compositions.
- Verify all FlowLifecycle labels are readable.
- Verify the participant cohort does not look hierarchical.
- Verify the direct-address human does not read as a mascot.
- Update the QA document with commands, hashes and results.

STOP CONDITION

Stop after:

- Static source scaffolding is complete
- Required stills are rendered
- Contact sheets are rendered
- Phase 13B QA document is complete
- Type-check and deterministic checks pass

Do not:

- Animate the full scenes
- Generate narration
- Generate captions
- Assemble the episode timeline
- Render an MP4
- Modify the narration
- Modify the Tier 1 beta baseline
- Begin Phase 13C
