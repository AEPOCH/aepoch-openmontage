# Static Storyboard Review — "What is ÆPOCH?" (Episode 001)

Phase 13A.1 scene-plan refinement. Written storyboard only — no stills, no Remotion components, no compositions exist against this document yet. Frame ranges assume 30 fps per `brands/aepoch/MOTION_TOKENS.md`.

Source: `inputs/scene-plan.yaml` (22 scenes), `inputs/narration-script.md` (beats N01–N26, unchanged).

This revision renumbers every scene from the 13A draft (21 scenes) to reflect the split of the former economic-system scene into two, plus corrections to seven other scenes. See `inputs/scene-plan.yaml`'s header comment for the full change list.

---

## Scene 01 — Welcome

**Narration beat:** N01, N02
**Frame range (30 fps):** 0–747 (0.00s–24.89s)
**Static composition:** Earth Rise background. Single human silhouette, three-quarter posture, angled toward the viewer, occupying the lower-center-left third of the frame with generous negative space above and around. No text on screen — the composition reads as a person about to speak, not a slide.
**Motion intention:** Subtle whole-body settling as the figure arrives (natural micro weight-shift, not a rigid presenter pose); optional restrained presence-ring or a single breath-pulse on "grateful." No head-tilt, no acknowledge gesture — the figure stays still and symbolic.
**Reused component:** None.
**New component needed:** `WelcomeDirectAddress`.
**On-screen text:** None.
**Mobile readability risk:** Low — single large figure, no text to shrink.
**Creative-review status:** Needs design pass — no reference frame exists for a viewer-facing human pose anywhere in the asset library. Motion locked per Phase 13A.1 correction #6 (no head-tilt).

---

## Scene 02 — Countdown tease

**Narration beat:** N03
**Frame range:** 747–1093 (24.89s–36.44s)
**Static composition:** Same figure and background, continued. A faint, low-opacity partial Comet Arc appears in the upper-right periphery — barely perceptible, foreshadowing only. "August 9" settles as a small on-screen date marker, not a headline.
**Motion intention:** Comet Arc fragment holds nearly static; `headlineReveal` for the date text.
**Reused component:** None (Comet Arc geometry is reused motion, not a scene module).
**New component needed:** `WelcomeDirectAddress` (continued).
**On-screen text:** "August 9"
**Mobile readability risk:** Low.
**Creative-review status:** Needs design pass, same build as Scene 01.

---

## Scene 03 — Mission statement

**Narration beat:** N04
**Frame range:** 1093–1253 (36.44s–41.78s)
**Static composition:** Earth Rise. Centered headline, sentence case, generous margins. Optional faint distant silhouette in the lower third for continuity with Scenes 01–02.
**Motion intention:** `headlineReveal`, `statementHold`. No accent treatment.
**Reused component:** `KeyStatement` (layout: centered).
**New component needed:** None.
**On-screen text:** "Make the economy and internet more human again."
**Mobile readability risk:** Low.
**Creative-review status:** Ready to build.

---

## Scene 04 — Built for humans

**Narration beat:** N05
**Frame range:** 1253–1613 (41.78s–53.78s)
**Static composition:** Void background. Left: eyebrow + headline text, soft human node entering below. Right: rigid, sharp-cornered system geometry (`contrastMode=earth-vs-system`).
**Motion intention:** `headlineReveal`; `humanEnter` for the node; sharp-eased reveal for the system geometry, timed to land on "bots and AI."
**Reused component:** `DeclarativeHook` (layout: left-editorial or split-tension).
**New component needed:** None.
**On-screen text:** "Built for humans."
**Mobile readability risk:** Low-medium.
**Creative-review status:** Ready to build; first of three `DeclarativeHook` uses in this episode.

---

## Scene 05 — Something's off (Mimicry)

**Narration beat:** N06, N07
**Frame range:** 1613–2547 (53.78s–84.89s)
**Static composition:** Void background. One human node with genuinely irregular, natural rhythm, off-center, surrounded by several nearly identical echo-shapes copying it a beat behind, imperfectly. Never literal UI — no comment boxes, no video-call windows, no dating-app chrome.
**Motion intention:** Configuration A — **Mimicry**: echoes trail the human node's irregular rhythm imperfectly, almost right but not quite; ends held still on the closing question.
**Reused component:** None.
**New component needed:** `SyntheticMultiplication` (configuration A: Mimicry).
**On-screen text:** "Something's off."
**Mobile readability risk:** Medium.
**Creative-review status:** Needs design pass — new module, no reference frame, no icon set. This configuration is explicitly distinct from Scenes 06 and 07, not the same motif at a different density.

---

## Scene 06 — Faster, never sleeping (Multiplication)

**Narration beat:** N08
**Frame range:** 2547–2933 (84.89s–97.78s)
**Static composition:** Void background. One synthetic unit, no human node — pure automation.
**Motion intention:** Configuration B — **Multiplication**: the single unit replicates itself at a steadily accelerating, perfectly mechanical rate, each copy at a shortening exact interval — distinct from Scene 05's imperfect echo timing.
**Reused component:** None.
**New component needed:** `SyntheticMultiplication` (configuration B: Multiplication).
**On-screen text:** "Faster. Never sleeping."
**Mobile readability risk:** Medium.
**Creative-review status:** Needs design pass, tied to Scene 05's build but a visually distinct configuration.

---

## Scene 07 — Manufacturing consensus (Manufactured consensus)

**Narration beat:** N09
**Frame range:** 2933–3267 (97.78s–108.89s)
**Static composition:** Depth background. The replication from Scene 06 has stopped — instead, one perfectly uniform, flat, dense pressure field with no visible individual units. No data-center illustration, no hooded figures, no named entity implied.
**Motion intention:** Configuration C — **Manufactured consensus**: replicated units resolve into a single undifferentiated mass — a distinct end-state, not Scene 06's grid rendered denser.
**Reused component:** None.
**New component needed:** `SyntheticMultiplication` (configuration C: Manufactured consensus).
**On-screen text:** "Manufacturing consensus."
**Mobile readability risk:** Low — the field is uniform and doesn't require reading individual elements.
**Creative-review status:** Needs design pass, tied to Scenes 05–06 as the third and final distinct configuration.

---

## Scene 08 — The numbers

**Narration beat:** N10
**Frame range:** 3267–3853 (108.89s–128.44s)
**Static composition:** Paper background. Two `CircularValueField` poles side by side: a small, static human-traffic field and a larger automated-traffic field carrying the percentage values.
**Motion intention:** Automated-traffic value counts from the current figure to the projected figure via `numberResolve` (max 30-frame crossfade count, tabular numerals, never spinning digits).
**Reused component:** `CircularValueField`.
**New component needed:** Percentage/value display treatment for the field (not used in the Tier 1 test reel).
**On-screen text:** "53% automated." / "Could climb past 90%." (two lines, corrected per Phase 13A.1 to match approved narration wording exactly).
**Mobile readability risk:** Medium.
**Creative-review status:** Needs variant design.

---

## Scene 09 — The reflection isn't real

**Narration beat:** N11
**Frame range:** 3853–4320 (128.44s–144.00s)
**Static composition:** Depth background. Single human node facing an indistinct, wavering system/reflection shape. No violence, no victimized body language.
**Motion intention:** `humanEnter`; the reflection shape shifts subtly rather than resolving into a clean state.
**Reused component:** None.
**New component needed:** `HumanConsequence` (Tier 2 — speced, not yet implemented).
**On-screen text:** "The reflection isn't always real."
**Mobile readability risk:** Low.
**Creative-review status:** Blocked on Tier 2 implementation.

---

## Scene 10 — It feeds off our presence

**Narration beat:** N12
**Frame range:** 4320–4853 (144.00s–161.78s)
**Static composition:** Depth background. Human node with a thin line drawn away from it toward an abstract system shape, representing extraction. The human node stays visually whole and present.
**Motion intention:** Thin `flowPulse`-style line draws outward from the human node.
**Reused component:** None.
**New component needed:** `HumanConsequence` (Tier 2, consequence=extraction).
**On-screen text:** "It feeds off our presence."
**Mobile readability risk:** Low.
**Creative-review status:** Blocked on Tier 2 implementation, same build as Scene 09.

---

## Scene 11 — Built for another world

**Narration beat:** N13
**Frame range:** 4853–5253 (161.78s–175.11s)
**Static composition:** Void background. Rigid, sharp-cornered system geometry assembles and settles into a fixed, dated architecture — a closed rigid frame implying debt, scarcity, and extraction structurally. **No human node appears in this scene at all.**
**Motion intention:** `sharpSystem`-eased reveal of the system geometry, settling into a stillness that reads as old and outdated.
**Reused component:** `DeclarativeHook` — second use in this episode, first of two scenes sharing this economic-system-critique variant family.
**New component needed:** None.
**On-screen text:** "Built for another world."
**Mobile readability risk:** Low.
**Creative-review status:** Needs variant design. This scene and Scene 12 must read as visually distinct compositions, not the same frame with different captions — this one has no human node at all, establishing the system before its blind spot is shown.

---

## Scene 12 — Can't see attention, care, creativity

**Narration beat:** N14
**Frame range:** 5253–5773 (175.11s–192.44s)
**Static composition:** Void background, continuing Scene 11's system geometry. A human node now enters small and peripheral, nearly out of the system's own frame — a visual blind spot, not a punishment.
**Motion intention:** `humanEnter` for the human node at the frame's edge; the system geometry does not react or acknowledge it — stillness is the point.
**Reused component:** `DeclarativeHook` — third use in this episode overall, second of the two scenes sharing the economic-system-critique variant family with Scene 11.
**New component needed:** None.
**On-screen text:** "Can't see attention, care, creativity."
**Mobile readability risk:** Medium — 39 words across two sentences, ending on a colon-joined list.
**Creative-review status:** Needs variant design, distinguished from Scene 11 by the human node's quiet, unacknowledged presence.

---

## Scene 13 — ÆPOCH is our response

**Narration beat:** N15
**Frame range:** 5773–6213 (192.44s–207.11s)
**Static composition:** Earth Rise, warm return after five consecutive Void/Depth scenes. The Signal's converged final state: warm/cool convergence resolved, white ring settled, statement text present.
**Motion intention:** Full canonical Signal sequence — `signalReveal` (~5.4s per `MOTION_TOKENS.md` section 7.3) — the episode's **only** Signal use.
**Reused component:** `KeyStatement`.
**New component needed:** None.
**On-screen text:** "ÆPOCH is our response."
**Mobile readability risk:** Low.
**Creative-review status:** Ready to build. **Signal-reveal exclusivity**: no other scene, including Scene 14 immediately following, may repeat this treatment.

---

## Scene 14 — Ancient idea, modern tools

**Narration beat:** N16
**Frame range:** 6213–6413 (207.11s–213.78s)
**Static composition:** Earth Rise. Two abstract poles, each settled independently and stably, joined by one restrained static connecting line. This is deliberately **not** a convergence — the poles stay visually distinct, with no shared center point, no vesica, no white-ring forge, no bloom.
**Motion intention:** `CircularValueField` relationship=`balanced` (not `converge`); a single edgeDraw-style connecting line appears once between the two settled poles.
**Reused component:** `CircularValueField`.
**New component needed:** None — new variant configuration only.
**On-screen text:** "An ancient idea. Modern tools."
**Mobile readability risk:** Low.
**Creative-review status:** Needs variant design. Redesigned per Phase 13A.1 correction #3 — must not read as a second Signal reveal immediately after Scene 13.

---

## Scene 15 — Already a contribution

**Narration beat:** N17
**Frame range:** 6413–6867 (213.78s–228.89s)
**Static composition:** Earth Rise. Human node, still and centered, with a restrained ring around the figure (`accentTreatment=prism-ring`). Five short declarative fragments reveal in sequence.
**Motion intention:** `headlineReveal` by line across the five fragments; `statementHold`.
**Reused component:** `KeyStatement` (layout: statement-and-ring).
**New component needed:** None.
**On-screen text:** "Already a contribution."
**Mobile readability risk:** Medium.
**Creative-review status:** Ready to build.

---

## Scene 16 — A layer for the internet

**Narration beat:** N18
**Frame range:** 6867–7080 (228.89s–236.00s)
**Static composition:** Earth Rise. A small set of individually distinct human nodes (not identical, not an equal-vote tally), each connected to one shared restrained ring representing the layer itself. No browser or application UI, no technical stack diagram.
**Motion intention:** `nodeEnter` for each human node, staggered with natural/unequal spacing; one ring draws once around/beneath the nodes; topology=`collective-ring`.
**Reused component:** `HumanNetwork` (topology: collective-ring).
**New component needed:** None — new variant configuration only.
**On-screen text:** "A layer for the internet."
**Mobile readability risk:** Low.
**Creative-review status:** Needs variant design. Replaces a plain `KeyStatement` scene per Phase 13A.1 correction #4 — the ring is symbolic, not a system-architecture diagram, and carries no Signal.

---

## Scene 17 — One idea

**Narration beat:** N19
**Frame range:** 7080–7333 (236.00s–244.44s)
**Static composition:** Earth Rise. Short statement marking the series' single-idea structure explicitly.
**Motion intention:** `headlineReveal`, `statementHold`.
**Reused component:** `KeyStatement`.
**New component needed:** None.
**On-screen text:** "One idea. Everything else follows."
**Mobile readability risk:** Low.
**Creative-review status:** Ready to build.

---

## Scene 18 — 42 days

**Narration beat:** N20, N21
**Frame range:** 7333–7973 (244.44s–265.78s)
**Static composition:** Earth Rise. A `FlowLifecycle` sequence with four locked steps — "Start August 9" → "Test what we built" → "Notice what happens" → "Shape what comes next" — paired with a Comet Arc completing a partial orbit, rhyming with the arc foreshadowed in Scene 02.
**Motion intention:** `lifecycleStep` per-step activation, 10–16-frame gaps; Comet Arc progresses alongside. "Things will break" / "That's normal" (N21) appear as a secondary caption line, not a fifth lifecycle step.
**Reused component:** `FlowLifecycle`.
**New component needed:** New step icons/labels only (component itself is Tier 1-complete).
**On-screen text:** "Start August 9. Test what we built. Notice what happens. Shape what comes next."
**Mobile readability risk:** Medium.
**Creative-review status:** Needs variant design. Steps locked per Phase 13A.1 correction #5. Note: "Notice what happens" / "Shape what comes next" preview, in diagram form, the same ideas Scene 19 delivers again in human form — flagged in the episode brief as deliberate reinforcement, worth watching in review.

---

## Scene 19 — Help us see what we can't

**Narration beat:** N22
**Frame range:** 7973–8480 (265.78s–282.67s)
**Static composition:** Earth Rise. A small distributed network of human nodes — the enrolled test cohort — each individually distinguishable, natural and unequal spacing. Explicitly not a governance/voting topology, and a distinct configuration from Scene 16's collective-ring layer.
**Motion intention:** `humanJoinCollective` — individual enters, relationship lines draw, collective responds; deterministic per-node stagger.
**Reused component:** `HumanNetwork` (topology: distributed).
**New component needed:** None — new variant configuration only.
**On-screen text:** "Help us see what we can't."
**Mobile readability risk:** Low.
**Creative-review status:** Needs variant design.

---

## Scene 20 — The whole thing in one sentence

**Narration beat:** N23, N24
**Frame range:** 8480–9080 (282.67s–302.67s)
**Static composition:** Earth Rise. Human node, still, centered. Brief hold on the transitional cue line, then the crystallized two-line thesis with a warm underline accent (not Signal).
**Motion intention:** Short `statementHold` on N23, then `headlineReveal` + longer `statementHold` on the N24 thesis text; `accentTreatment=clay-underline`.
**Reused component:** `KeyStatement`.
**New component needed:** None.
**On-screen text:** "Alive and present is enough." / "Presence is the foundation of value." (replaced per Phase 13A.1 correction #8; spoken narration unchanged).
**Mobile readability risk:** Medium.
**Creative-review status:** Ready to build.

---

## Scene 21 — Magnificent biological transformer

**Narration beat:** N25
**Frame range:** 9080–9547 (302.67s–318.22s)
**Static composition:** Earth Rise. Warm, still human silhouette — no robot parts, no machine imagery, no glowing-brain treatment. A gentle push-in on the final clause for intimacy.
**Motion intention:** `headlineReveal`, `statementHold`, `pushInSmall` (max 5%).
**Reused component:** `KeyStatement`.
**New component needed:** None.
**On-screen text:** "A magnificent biological transformer."
**Mobile readability risk:** Low.
**Creative-review status:** Ready to build. Flagged for extra creative-review attention given the literal-imagery risk named in the episode brief.

---

## Scene 22 — See you tomorrow

**Narration beat:** N26
**Frame range:** 9547–9682 (318.22s–322.72s, using the outro's canonical 4.5s hold rather than the bare 1.33s spoken duration)
**Static composition:** Earth Rise. Final statement resolves toward the Æ mark; mark and identifier settle; clean hold suitable for platform end-screen overlays.
**Motion intention:** `seriesOutroV1` — statement resolves, mark settles, clean hold.
**Reused component:** None.
**New component needed:** `AepochSeriesOutro` (Tier 3 — speced, not yet implemented).
**On-screen text:** "See you tomorrow."
**Mobile readability risk:** Low.
**Creative-review status:** Blocked on Tier 3 implementation.

---

## Complete component inventory

| Component | Tier | Code status | Scenes using it |
|---|---|---|---|
| `KeyStatement` | 1 | Implemented | 03, 13, 15, 17, 20, 21 (6 scenes) |
| `DeclarativeHook` | 1 | Implemented | 04, 11, 12 (3 scenes — 04 direct reuse; 11/12 share one variant family) |
| `CircularValueField` | 1 | Implemented | 08, 14 (2 scenes, both need variants) |
| `FlowLifecycle` | 1 | Implemented | 18 (needs variant) |
| `HumanNetwork` | 1 | Implemented | 16, 19 (2 scenes, two distinct variants: collective-ring and distributed) |
| `SystemComparison` | 1 | Implemented | Not used — no passage in this episode needs a full two-column parallel structure |
| `WelcomeDirectAddress` | — | **Does not exist** | 01, 02 |
| `SyntheticMultiplication` | — | **Does not exist** | 05, 06, 07 (three distinct configurations: Mimicry, Multiplication, Manufactured consensus) |
| `HumanConsequence` | 2 | Speced, not implemented | 09, 10 |
| `AepochSeriesOutro` | 3 | Speced, not implemented | 22 |

## New-component implementation order

Unchanged reasoning from the 13A draft, still following `SCENE_MODULES.md`'s tier logic:

1. **`HumanConsequence`** (Tier 2, already speced) — implementation-only work against an existing spec. Blocks Scenes 09 and 10.
2. **`WelcomeDirectAddress`** (new) — opens the episode; needed before anything else can be sequenced end-to-end. Blocks Scenes 01 and 02.
3. **`SyntheticMultiplication`** (new) — now explicitly three distinct visual grammars (Mimicry, Multiplication, Manufactured consensus), each needing its own reference frame rather than one shared reference at different densities. Blocks Scenes 05, 06, 07.
4. **`AepochSeriesOutro`** (Tier 3, already speced) — last scene only, lowest urgency. Blocks Scene 22.

Variant work (existing Tier 1 modules, new configurations) can proceed in parallel: `DeclarativeHook` (economic-system-critique variant family, shared across Scenes 11–12 but with two distinct settled compositions), `CircularValueField` (percentage display for Scene 08; connected-poles for Scene 14 — explicitly not the convergence relationship), `FlowLifecycle` (locked four-step set for Scene 18), `HumanNetwork` (collective-ring for Scene 16, distributed cohort for Scene 19).

## Reuse percentage

Of 22 scenes:

- **7 scenes (31.8%)** use a Tier 1 module with no variant needed (03, 04, 13, 15, 17, 20, 21).
- **7 scenes (31.8%)** use a Tier 1 module but need a new variant/configuration (08, 11, 12, 14, 16, 18, 19).
- **8 scenes (36.4%)** need a module that doesn't exist in code yet — 3 already speced (Tier 2/3: 09, 10, 22), 5 genuinely new with no spec at all, across two module families (01, 02 share `WelcomeDirectAddress`; 05, 06, 07 share `SyntheticMultiplication`'s three configurations).

By that count: **63.6% of scenes reuse Tier 1 as-is or via variant; 36.4% are blocked on new-module or Tier 2/3 implementation work.**

## Estimated production complexity

**Medium-high**, concentrated almost entirely in new-module design rather than variant work or timing — largely unchanged from the 13A estimate, with two refinements from this pass:

- The economic-system `DeclarativeHook` variant now explicitly requires **two** distinct settled compositions sharing one variant family (Scenes 11–12), not one reused composition with swapped text — a modest increase in variant design scope.
- `SyntheticMultiplication` now locks **three** explicitly distinct visual grammars (Mimicry, Multiplication, Manufactured consensus) rather than one motif at increasing density — each needs its own static reference frame, per `SCENE_MODULES.md` section 21's requirement, before build begins.

The core conclusion is unchanged: this episode cannot be fully produced on the current Tier 1 module set alone. Two genuinely new modules and two Tier 2/3 modules still gate roughly a third of the episode's scenes.

## Proposed static-storyboard review checkpoint

Before any Remotion work begins on this episode:

1. Author/creative lead reviews and approves the refined `inputs/episode-brief.md` (including the "Deliberate exceptions" section), `inputs/narration-script.md` (unchanged text, beat IDs stable), `inputs/scene-plan.yaml` (22 scenes), and this storyboard.
2. Author confirms the two documented deliberate exceptions (ÆPOCH named before the hook; arc-proportion length) are settled, not open for further debate.
3. Author confirms `research/claims-and-sources.md` doesn't need additional transcribed wording before Scene 08's two statistics lock.
4. Static reference frames are produced and approved for `WelcomeDirectAddress` and all three `SyntheticMultiplication` configurations (Mimicry, Multiplication, Manufactured consensus), per `SCENE_MODULES.md` section 21.
5. `HumanConsequence` and `AepochSeriesOutro` are implemented against their existing `SCENE_MODULES.md` specs and pass the Tier 1 module QA checklist (section 23).
6. Reviewer specifically checks Scene 14 against Scene 13 side by side to confirm the connected-poles treatment does not read as a second Signal reveal, and checks Scenes 11–12 side by side to confirm they read as two distinct compositions rather than one reused frame.
7. Only after all of the above does scene assembly and Remotion composition work begin.
