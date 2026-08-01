# ÆPOCH Blog-to-Script Adapter

Companion document to `SERIES_BIBLE.md`. The bible defines what the series is.
This document defines how a blog post first becomes a canonical
`source_extraction` artifact and later constrains the `script` produced by the
`animated-explainer` pipeline.

The live route is:

`blog source → source_extraction → research → proposal → script`

The source article remains authoritative for the thesis and intended story.
Research verifies and enriches; it does not silently replace the article's
central question, takeaway, ÆPOCH reframe, human consequence, or closing.

This version is aligned to `animated-explainer.yaml` v2.0 and to the live
`schemas/artifacts/script.schema.json`, field for field — not just in the
surrounding prose. Where the pipeline's own terms and this document's
earlier terms disagreed, the pipeline wins. Notably: the narrative arc is
five stages, not four (hook → setup → build → climax → landing). Cues are
called `enhancement_cues`, not a generic marker, and their `type` is
constrained to the schema's enum (`overlay`, `broll`, `diagram`, `stat_card`,
`code_snippet`, `animation` — there is no `transition` type). And a voice
performance plan is a dedicated top-level `voice_performance` object in the
script artifact, not a note scribbled next to a line of narration.

The script stage's review will check this document's output against its own `review_focus` and `success_criteria`. Nothing in this adapter should require the reviewer to infer anything the schema expects explicitly.

## The core rule

A blog post makes an argument. An episode tells a story. Those are different shapes, and the adapter's whole job is the conversion between them.

Don't summarize the post. A summary compresses everything and flattens it evenly, which is exactly what makes summarized video scripts boring. Instead, read the post and find the one moment in it that already has narrative shape: a specific tension, a specific reversal, a specific human stake. Everything else in the post — the history, the supporting examples, the secondary arguments — either feeds that one story or gets left on the page.

If a post covers three ideas, the adapter produces three separate extraction sheets, not one script trying to cover all three.

Test before writing a line of script: can you say what this episode is about in one sentence, without using the word "and"? If not, the extraction isn't finished yet.

---

## Part 1 — Canonical source extraction

Every source article gets one `source_extraction` artifact before research or
script writing. Validate it against
`schemas/artifacts/source_extraction.schema.json`.

```yaml
source:
  title:
  reference:
  publication_date:

authority:
  mode: source_authoritative
  protected_fields:
    - central_question
    - key_takeaway
    - aepoch_reframe
    - human_consequence
    - closing_statement
  research_permissions:
    - verify_claims
    - add_provenance
    - update_stale_facts
    - add_context
    - identify_audience_questions
    - enrich_visual_examples

episode:
  working_title:
  central_question:
  audience:
  desired_duration_seconds:
  key_takeaway:
  existing_reality:
  tension:
  aepoch_reframe:
  human_consequence:
  closing_statement:

claim_inventory:
  - id:
    claim:
    source_location:
    verification_required:

excluded_material:
  - item:
    reason:
```

### Field guidance

**source.title / source.file / source.publication_date** — Pulled directly from the post's metadata. The paper trail back to the original if anything in the extraction gets questioned later.

**episode.working_title** — Not the blog post's title. Names the story angle this episode is taking, usually narrower than the post's own framing.

**episode.central_question** — The narrative question a viewer already half-has. Not "What is Proof of Life?" Closer to "How does anything know you're real?"

**episode.audience** — Which of the series' viewer segments this cut targets. If the post has technical and lay versions available, name which one this extraction draws from.

**episode.desired_duration** — Set before scripting starts, in seconds. This becomes `duration_target_seconds` in the script artifact and drives both the word count target and the enhancement cue count.

**episode.key_takeaway** — One sentence. If it needs two, the idea hasn't been narrowed enough.

**episode.existing_reality** — The status quo the episode opens on, described without ÆPOCH in the frame yet. This becomes the hook.

**episode.tension** — What's wrong with the existing reality, as a specific consequence, not a general complaint. This becomes the setup and feeds the build.

**episode.aepoch_reframe** — How ÆPOCH's mechanism responds to that tension. Names the actual mechanism, not a slogan. This is the climax of the arc.

**episode.human_consequence** — What the reframe means for an actual person's actual day. Feeds the tail end of the climax and the landing.

**episode.closing_statement** — The line the episode ends on. Lands on a specific idea or open question, not a call to arms and not a recap.

**claim_inventory** — Every factual, historical, or comparative claim, listed individually with a traceable source and a verification note. These carry forward via each script section's `source_ref`, which names the claim id(s) it draws on.

**excluded_material** — Everything cut from the source post, with the reason, so a later episode doesn't reopen the same ground by accident.

---

## Part 2 — The script artifact

The script stage produces one artifact called `script`, validated against
`schemas/artifacts/script.schema.json`. It has to be schema-valid, hit
`+/-10%` of the duration target in word count, carry enhancement cue density
of roughly one per 8–10 seconds, show the five-stage arc, carry speaker
directions for TTS, and include a voice performance plan with concrete
pacing, pause, emphasis, and a sample section. The structure below is the
schema's actual field shape — it produces all of that in one pass, and
nothing in it needs translation before it validates.

```yaml
script:
  version: "1.0"
  title:
  total_duration_seconds:

  voice_performance:
    performance_intent:      # one line: what the narration should feel like, and why
    pacing_profile:           # contemplative | conversational | energetic | technical | cinematic | custom
    energy_curve:              # how energy should move across the piece
    pause_policy:              # where pauses matter most, in plain language
    sample_section_id:        # id of the section to use for TTS sample approval
    provider_notes:            # optional: free-form per-provider notes, e.g. {tts_selector: "..."}

  sections:
    - id: hook-1               # see "The arc-stage convention" below
      label: Hook
      text: >
        The line as written to be heard, not read.
      start_seconds: 0
      end_seconds: 8
      speaker_directions:       # prose fallback; prefer delivery_cues below
      delivery_cues:
        pace:                   # slow | measured | conversational | brisk | fast | custom
        energy:
        emphasis_words: []
        pause_before_seconds:
        pause_after_seconds:
        delivery_note:
        provider_text:           # SSML-ready text, e.g. with <break time="0.6s"/>
      enhancement_cues:
        - type: overlay          # overlay | broll | diagram | stat_card | code_snippet | animation
          description:
          timestamp_seconds: 0
      pronunciation_guides:
        - word:
          phonetic:
      source_ref:                # claim_inventory id(s) this section's claims trace to, e.g. "claim-2" or "claim-2, claim-3"

    # repeat for setup, build (as many sections as the content needs), climax, landing
```

### The arc-stage convention

The schema has no dedicated `arc_stage` field. Encode it explicitly through
`id` and `label` instead: prefix every section's `id` with its arc stage
(`hook-1`, `setup-1`, `build-1`, `build-2`, ...) and set `label` to the
capitalized stage name (`Hook`, `Setup`, `Build`, `Climax`, `Landing`). A
section can be one narration line or several — what matters is that the
id/label prefix makes the stage unambiguous, so the scene-director stage
downstream can check "no gaps" against the full five-stage sequence by
reading labels in order, not guessing where one stage ends and the next
begins.

### Section-by-section, mapped to the five-stage arc

**hook** — Opens on `episode.existing_reality`. No ÆPOCH mention. The viewer needs to recognize this as their own situation before anything else can land. Usually one to two sections.

**setup** — Introduces `episode.tension` as something specific and costly, not a vague unease. Still no ÆPOCH mechanism named yet, or named only in passing if the post's own structure requires it.

**build** — Develops the tension further and starts the turn toward ÆPOCH's response. This is where the pipeline expects the most enhancement cue density, since it's usually the section doing the most explanatory work.

**climax** — `episode.aepoch_reframe` lands here. The mechanism is introduced through what it does, not what it is. This is the pivot of the whole episode.

**landing** — `episode.human_consequence` and `episode.closing_statement`. No recap. No call to arms. One idea, held, and then the video ends.

### Inline notation used inside a section

| Element | Where it lives | Notation |
|---|---|---|
| Pause, before a line | `delivery_cues.pause_before_seconds` | seconds, e.g. `0.6` |
| Pause, after a line | `delivery_cues.pause_after_seconds` | seconds, e.g. `1.5` |
| Emphasis | `delivery_cues.emphasis_words` | list of the exact words to stress, e.g. `["never"]` |
| SSML-ready delivery | `delivery_cues.provider_text` | narration text with break tags, e.g. `<break time="0.6s"/>` |
| Pronunciation | `pronunciation_guides` | `{word: "ÆPOCH", phonetic: "A-pock"}`, on first use of the term in the whole script |
| Fact-check flag | `source_ref` | claim_inventory id(s) used in that section's narration |
| Scene beat / cut | `enhancement_cues`, `type: overlay` | e.g. `description: "cut from phone screen to open hand"` — the enum has no `transition` value; use `overlay` for a cue marking a cut or visual-beat change |

Keep pause, emphasis, and pronunciation attached to the section that contains the line they modify. A reviewer checking one section shouldn't have to cross-reference a different part of the document to find out how a line is supposed to sound.

### Pronunciation reference (carry forward across scripts)

| Term | Say it as |
|---|---|
| ÆPOCH | A-pock -- IPA `/ˈeɪ.pɒk/`; exactly two syllables; first syllable is the spoken letter-name "A" (as in "angle"); never pronounce a separate "Y" sound or expand to three syllables. Corrected 2026-08-01 after a real ElevenLabs audition mispronounced the prior "AY-pock" guide as "A-Y-POCK." |
| Kairos | KY-ross (rhymes with "eye-ross," not "care-ee-os") |
| KAIROS (the token, spoken) | same as above |
| Pulses | as spelled, normal English |
| RSK / Rootstock | say "Rootstock" in narration; "RSK" only in on-screen text |

Add a term here once it's been said correctly on record, so the next script doesn't have to solve it again.

---

## Part 3 — Duration, word count, and cue density

The script stage checks word count against duration within 10%, and enhancement cue density at roughly one per 8–10 seconds. Both are arithmetic, not judgment calls, so do the math before submitting rather than after a send-back.

**Word count target** — Use 2.3 to 2.5 words per second as the baseline for narrator-voiced explainer pacing (roughly 140–150 words per minute, which is a measured, unhurried conversational read, slower than average speech). Target word count = `total_duration_seconds × 2.4`. This is a tracked quantity, not a schema field — the schema only stores `sections[].text`; count words directly from the concatenation of every section's `text` and check that sum against the target before calling the script done.

**Enhancement cue count** — `total_duration_seconds ÷ 9` gives a rough target cue count (9 as the midpoint of the 8–10 second window). Count the actual `enhancement_cues` entries across all sections against that target. A script that's cue-light in the build section and cue-heavy in the hook will pass the average check and still fail the review, since density is checked as spacing, not just total count — check the gaps between consecutive `enhancement_cues[].timestamp_seconds` values, not just the total. Spread cues where the sentence structure already wants a break, not evenly by force.

**Arc proportion** — There's no fixed ratio from the pipeline spec, but as a starting point: hook and setup together should not exceed a third of total duration, climax should not be compressed into a single line, and landing should be the shortest stage. If the climax is being rushed to protect a longer hook, that's a sign the extraction sheet's `existing_reality` field is doing too much work and needs trimming.

---

## Part 4 — Before a script moves to the scene_plan stage

This list mirrors the pipeline's own `review_focus` and `success_criteria` for the script stage, so nothing here should surprise that review.

1. Does the extraction sheet name one story, checkable in a single sentence without "and"?
2. Is the total word count across all `sections[].text` within 10% of `total_duration_seconds × 2.4`?
3. Are `enhancement_cues` spaced at roughly one per 8–10 seconds, checked section by section (consecutive `timestamp_seconds` gaps), not just averaged across the whole script?
4. Does every section's `id`/`label` declare its arc stage explicitly (see "The arc-stage convention" in Part 2), and do the five stages appear in order with no gaps?
5. Does `voice_performance` include concrete `performance_intent`/`pacing_profile`/`pause_policy`, and does `sample_section_id` reference an actual section id?
6. Does every locked term match `SERIES_BIBLE.md` exactly, with a `pronunciation_guides` entry on first use?
7. Does every claim in `claim_inventory` appear in at least one section's `source_ref`, not left blank?
8. Does the hook avoid naming ÆPOCH before the viewer has recognized the existing reality as their own?
9. Does the landing section match `episode.closing_statement`, unchanged, without a recap added underneath it?
10. Does `source_extraction.excluded_material` account for everything cut from the source post?
