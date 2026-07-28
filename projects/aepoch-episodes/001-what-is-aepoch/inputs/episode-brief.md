# Episode Brief — "What is ÆPOCH?"

**Phase:** 13A.1 scene-plan refinement (supersedes the 13A draft's open risk framing on the two items below; see "Deliberate exceptions")
**Status:** Draft for review. No animation, no Remotion work, no rendering has occurred against this brief.

---

## Working title

**What is ÆPOCH?**

## Series context

Pre-launch countdown series, **Video 1 of the "days before August 9" run**. This is the first video an enrolled early-test participant sees. It is not a Tier 1 module test and it is not a general-audience cold-open explainer — later episodes in this pre-launch run are expected to cover mechanism in more depth; this one exists to make sure everyone starts from the same shared understanding.

## Audience

Early test participants — people who have already signed up to try ÆPOCH and received this video as part of onboarding. They know the name ÆPOCH already. They do not yet know what it means, what they're being asked to do, or why.

This is a narrower audience than SERIES_BIBLE.md's general two-segment viewer model (sovereignty-minded/Bitcoin-adjacent vs. generally skeptical). Both segments are still present here, but both have already opted in — the episode does not need to win them over from a cold start, only orient them.

## Release date context

Must be seen and understood **before August 9, 2026** — the narration itself sets this expectation ("by August 9") and invites the viewer into a 42-day test window beginning that date.

## Purpose

Give an already-enrolled participant the minimum shared understanding they need before the 42-day test begins: why ÆPOCH exists, what's broken about the internet and the economy today, and what one sentence the whole project reduces to.

## Single core thesis

Human presence has economic value, and right now the internet and the economy don't recognize that. (This restates SERIES_BIBLE.md's series-level thesis exactly — Episode 001 is the series thesis stated directly, not a narrower mechanism slice of it.)

## Deliberate exceptions

Two departures from `brands/aepoch/SERIES_BIBLE.md`'s general rules are approved and intentional for this episode specifically. Both were flagged as open risks in the 13A draft; both are now settled decisions, not outstanding questions.

1. **ÆPOCH is named before the hook lands (N02).** SERIES_BIBLE.md's pre-ship checklist asks whether the opening states the viewer's question "without naming ÆPOCH first." This episode names ÆPOCH in its second beat, before any internet-is-broken material appears. This is approved because this audience has already enrolled and already knows the project name — the rule exists to protect a cold viewer's recognition-before-pitch experience, and that concern doesn't apply to someone who signed up before pressing play.
2. **The problem/setup section exceeds one-third of the episode.** SCRIPT_RULES.md's arc-proportion guidance recommends hook and setup together stay under a third of total runtime; this episode's setup (through the end of the economic-system critique) runs to roughly 60% of the runtime. This is approved because this is a **private participant-orientation film, not a cold-audience explainer** — establishing full shared context for people who are about to spend 42 days inside an unfinished system is the point of the video, not a pacing failure to correct.

Both exceptions apply to this episode only and should not be read as a relaxation of SERIES_BIBLE.md's general rules for the rest of the series.

## Audience knowledge before viewing

- Knows they signed up for something called ÆPOCH.
- Does not know what ÆPOCH is, what problem it addresses, or what will be asked of them.
- Zero assumed protocol/crypto literacy (per SERIES_BIBLE.md's Farmer Test — this applies here at least as strongly as to a cold general audience, since this viewer may have signed up on a friend's recommendation without technical context).

## Audience understanding after viewing

- Recognizes a problem they've likely already half-noticed: an internet increasingly populated by bots, synthetic media, and manufactured consensus, sitting on top of an economic system that doesn't know what to do with human presence.
- Understands ÆPOCH's one-sentence thesis: presence — attention, care, creativity — is already a contribution, not something earned or bought.
- Knows concretely what happens next: a 42-day test starting August 9, that things will break, that confusion is expected, and that their observations will shape what gets built next.
- Does **not** need to understand KAIROS, Proof of Life, Use or Lose, Rootstock, or any governance mechanic — none of that is in this episode and none should be added.

## Emotional arc

Warm welcome and gratitude → quiet unease (recognition of something already sensed about the internet) → a heavier, colder beat (the economic system doesn't know what to do with a human) → relief/recognition at the reframe (presence already counts) → warmth and invitation (you'll help build this) → intimate, slightly playful close (the "magnificent biological transformer" line) → see-you-tomorrow anticipation.

This matches SERIES_BIBLE.md's desired viewer reaction — recognition, not persuasion — closer to "I've thought this too" than "I've been sold something."

## Target runtime

**~5 minutes 20 seconds (319.6 seconds) of pure narration**, based on the actual 719-word narration at 135 words per minute; 125/135/145 wpm bracket the estimate at 5:45 / 5:20 / 4:58. With the series-outro's canonical 4.5-second hold applied at the very end (see scene plan, final scene), the assembled planning total is **322.7 seconds (5:22.7)** — within the 5:30 planning ceiling for this refinement pass.

## Voice and tone

Warm, direct, personal — a founder or team member speaking one-to-one to someone who just signed up, not a narrator reading copy at an audience. Matches SERIES_BIBLE.md's "invitational rather than preachy" register, but more intimate than a typical episode since it opens with direct address and closes with "see you tomorrow." Humor is present exactly once (the biological-transformer line) and stays earned, not inserted for relief.

## Primary CTA

There is no purchase, signup, or link-click CTA. The ask is participatory and already framed in the narration itself: show up for the 42-day test starting August 9, expect friction, and help co-create what comes next by noticing and reporting what the team can't see from the inside. Per SCENE_MODULES.md's outro rules, the episode ends on one held thought, not a stacked call to action.

## Approved factual claims

Per `research/claims-and-sources.md` (treated as authoritative, not re-verified):

1. Current bot/automated web traffic is already a majority share (narration: "over 53%"), sourced to a cybersecuritynews.com bot-traffic report.
2. Projected automated-traffic share climbs toward/past 90% within a few years, sourced to Cloudflare Radar's bot-vs-human traffic data.

Note: the source file records URLs only, not transcribed approved wording — see the pre-production report's item 3 for the caveat this creates. If the author has more specific approved figures/phrasing in mind, that should be added to `claims-and-sources.md` before this episode locks.

## Existing scene modules to reuse

**Directly, no variant:**
- `KeyStatement` — mission line, "ÆPOCH is our response" (the episode's single Signal reveal), the contribution/anaphora line, "whole thesis," the final one-sentence thesis (now "Alive and present is enough. Presence is the foundation of value."), and the closing biological-transformer line. Used in 6 of 22 scenes.
- `DeclarativeHook` — opening internet-built-for-humans/bots contrast.

**With an episode-specific variant:**
- `DeclarativeHook` — two further uses, both drawn from the economic-system critique, now split across two scenes sharing one variant: "built for another world" and "cannot recognize presence" — same component, distinct settled compositions and motion intentions per scene (three `DeclarativeHook` uses total in the episode).
- `CircularValueField` — variant A: human-vs-automated-traffic poles carrying the 53%/90% values; variant B: "ancient idea / modern tools" as two stable, related poles connected by a restrained path — explicitly **not** a convergence, so it can't be mistaken for a second Signal reveal.
- `FlowLifecycle` — variant with four locked step labels for the 42-day test period: "Start August 9," "Test what we built," "Notice what happens," "Shape what comes next." Not the canonical Show up→Activate→Circulate→Permanent sequence. "Things will break" / "That's normal" remain spoken secondary statements, not lifecycle stages.
- `HumanNetwork` — two variants: a protocol-layer diagram (individually distinct human nodes sharing one restrained ring/layer, replacing what was a plain `KeyStatement` scene) and an early-participant test cohort framing (not governance/voting).

## New scene modules required

**Genuinely new (no existing spec):**
- **Welcome / Direct Address** — opening greeting and August-9 setup. No documented module covers direct-to-camera address. Motion locked to whole-body settling and minimal weight shift (no head-tilt), with an optional restrained presence-ring or breath pulse on "grateful" — the figure must read as symbolic, never as a mascot or presenter character.
- **Synthetic Multiplication / Automation Surge** — three explicitly distinct configurations, not one grid at increasing density: **Mimicry** (one irregular human rhythm surrounded by nearly identical echoes), **Multiplication** (one synthetic unit replicating at an accelerating mechanical rate), and **Manufactured consensus** (replicated units resolving into a perfectly uniform pressure field).

**Speced but not yet implemented in code (Tier 2/3, per SCENE_MODULES.md):**
- `HumanConsequence` (Tier 2) — disorientation/distrust beat and the knock-on-effects/extraction beat.
- `AepochSeriesOutro` (Tier 3) — "See you tomorrow."

## Production risks

Items formerly numbered 1 and 2 here (arc-proportion length; naming ÆPOCH before the hook) are resolved — see "Deliberate exceptions" above. Remaining open risks:

1. **Two new modules (Welcome/Direct Address, Synthetic Multiplication) need full design + build before this episode can be produced** — neither exists in spec or code today. This is real scope, not incidental.
2. **Two Tier 2/3 modules (HumanConsequence, AepochSeriesOutro) are speced but unbuilt.** Building the full episode requires them; the Tier 1 module test reel alone does not cover this episode's needs.
3. **No asset exists for a viewer-facing "direct address" human pose**, nor for automation/multiplication iconography — `human-forms/` and `icons/` currently only cover profile/interaction poses and the presence/activation/circulation/network vocabulary. New assets needed before build, and now more specifically: three visually distinct Synthetic Multiplication configurations (Mimicry, Multiplication, Manufactured consensus) each need their own reference treatment, not one asset reused at different densities.
4. **Caption load is uneven.** Several beats (N07, N10, N12, N14, N22) run long with multiple clauses; caption phrase-grouping will need the same care given to the Tier 1 test reel's Phase 12C caption correction, or captions will exceed two lines or arrive too fast to read.
5. **Single-Signal-reveal discipline.** With six `KeyStatement` uses in one episode plus a `CircularValueField` convergence-adjacent scene right after the Signal, it will be easy to accidentally read the "ancient idea / modern tools" scene as a second reveal. Only the "ÆPOCH is our response" scene gets the Signal; the following scene must read as two stable, connected poles, not a convergence.
6. **"Notice what happens" / "Shape what comes next" appear twice, in two registers.** The 42-day `FlowLifecycle` diagram now previews these two ideas as lifecycle steps, and the later `HumanNetwork` cohort scene ("help us see what we can't") delivers the same two ideas again in human/emotional form. This is a deliberate design choice — the diagram previews the arc, the cohort scene makes it felt — but it should be watched in review so it reads as reinforcement, not redundancy.

## Definition of done (for this pre-production phase)

- [x] Narration outline and research read completely.
- [x] Narration lightly edited for rhythm/redundancy/clarity/precision/pronunciation/caption-readability, with every substantive edit logged.
- [x] Narration organized into ID'd beats (N01–N26) with word counts, durations, purpose, and source references.
- [x] Scene plan authored and refined (22 scenes as of Phase 13A.1) mapping every beat to a module, variant, or new-module requirement, with timing, transitions, caption risk, and asset dependencies.
- [x] Storyboard static review written scene-by-scene with component inventory, implementation order, reuse percentage, and complexity estimate.
- [x] Deliberate exceptions (ÆPOCH named before the hook; arc-proportion length) documented explicitly as approved decisions, not open risks.
- [ ] Episode brief, narration script, scene plan, and storyboard reviewed and approved by the author/creative lead.
- [ ] Two new modules (Welcome/Direct Address, Synthetic Multiplication) and two Tier 2/3 modules (HumanConsequence, AepochSeriesOutro) designed, static-reference-framed, and implemented — **not started, out of scope for this phase**.
- [ ] No voice audio, captions, Remotion components, compositions, stills, or renders exist yet for this episode — **intentionally, per this phase's scope**.
