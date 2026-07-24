# ÆPOCH Blog-to-Script Adapter

Companion document to `SERIES_BIBLE.md`. The bible defines what the series is. This document defines how a blog post becomes a `script` artifact that the `animated-explainer` pipeline can accept at the script stage without a send-back.

This version is aligned to `animated-explainer.yaml` v2.0. Where the pipeline's own terms and this document's earlier terms disagreed, the pipeline wins. Notably: the narrative arc is five stages, not four (hook → setup → build → climax → landing). Cues are called `enhancement_cues`, not a generic marker. And a voice performance plan is its own artifact, not a note scribbled next to a line of narration.

The script stage's review will check this document's output against its own `review_focus` and `success_criteria`. Nothing in this adapter should require the reviewer to infer anything the schema expects explicitly.

## The core rule

A blog post makes an argument. An episode tells a story. Those are different shapes, and the adapter's whole job is the conversion between them.

Don't summarize the post. A summary compresses everything and flattens it evenly, which is exactly what makes summarized video scripts boring. Instead, read the post and find the one moment in it that already has narrative shape: a specific tension, a specific reversal, a specific human stake. Everything else in the post — the history, the supporting examples, the secondary arguments — either feeds that one story or gets left on the page.

If a post covers three ideas, the adapter produces three separate extraction sheets, not one script trying to cover all three.

Test before writing a line of script: can you say what this episode is about in one sentence, without using the word "and"? If not, the extraction isn't finished yet.

---

## Part 1 — Extraction sheet

Every source article gets one extraction sheet before any script is written.

```yaml
source:
  title:
  file:
  publication_date:

episode:
  working_title:
  central_question:
  audience:
  desired_duration:
  key_takeaway:
  existing_reality:
  tension:
  aepoch_reframe:
  human_consequence:
  closing_statement:

claim_inventory:
  - claim:
    source:
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

**claim_inventory** — Every factual, historical, or comparative claim, listed individually with a traceable source and a verification note. These carry forward as `verify_flags` on the specific sections that use them.

**excluded_material** — Everything cut from the source post, with the reason, so a later episode doesn't reopen the same ground by accident.

---

## Part 2 — The script artifact

The script stage produces one artifact called `script`. It has to be schema-valid, hit `+/-10%` of the duration target in word count, carry enhancement cue density of roughly one per 8–10 seconds, show the five-stage arc, carry speaker directions for TTS, and include a voice performance plan with concrete pacing, pause, emphasis, and sample cues. The structure below produces all of that in one pass.

```yaml
script:
  title:
  source_reference: [source.file from the extraction sheet]
  audience: [episode.audience]
  duration_target_seconds:
  word_count_target:        # duration_target_seconds × target words-per-second, see Part 3
  word_count_actual:

  voice_performance_plan:
    voice_id:                # which configured TTS voice/character this script assumes
    overall_tone:             # one line, drawn from the series bible's voice section
    pacing_notes:             # general delivery guidance across the whole script
    sample_cues:
      - line_reference:       # which section/line this sample demonstrates
        direction:            # concrete performance note: "flat, unhurried, no rising inflection"

  sections:
    - id: hook-1
      arc_stage: hook
      speaker: narrator
      narration: >
        The line as written to be heard, not read.
      pause_emphasis:
        - "(beat) after 'the line'"
        - "*emphasis* on 'never'"
      enhancement_cues:
        - offset_seconds: 0
          type: visual
          description:
        - offset_seconds: 8
          type: on_screen_text
          description:
      on_screen_text:
      visual_intent:
      pronunciation_notes:
      verify_flags:
        - claim:
          source:
          status: unverified | verified

    # repeat for setup, build, climax, landing sections
```

### Section-by-section, mapped to the five-stage arc

**hook** — Opens on `episode.existing_reality`. No ÆPOCH mention. The viewer needs to recognize this as their own situation before anything else can land. Usually one to two sections.

**setup** — Introduces `episode.tension` as something specific and costly, not a vague unease. Still no ÆPOCH mechanism named yet, or named only in passing if the post's own structure requires it.

**build** — Develops the tension further and starts the turn toward ÆPOCH's response. This is where the pipeline expects the most enhancement cue density, since it's usually the section doing the most explanatory work.

**climax** — `episode.aepoch_reframe` lands here. The mechanism is introduced through what it does, not what it is. This is the pivot of the whole episode.

**landing** — `episode.human_consequence` and `episode.closing_statement`. No recap. No call to arms. One idea, held, and then the video ends.

A section can be one narration line or several. What matters is that every section declares its `arc_stage` explicitly, so the scene-director stage downstream can check "no gaps" against the full five-stage sequence rather than guessing where one stage ends and the next begins.

### Inline notation used inside a section

| Element | Where it lives | Notation |
|---|---|---|
| Pause, short | `pause_emphasis` | `(beat)` |
| Pause, longer | `pause_emphasis` | `(pause – 1.5s)` |
| Emphasis | `pause_emphasis`, referencing the word in `narration` | `*word*` |
| Pronunciation | `pronunciation_notes` | `[SAY "ÆPOCH" as "AY-pock"]`, on first use of the term in the whole script |
| Fact-check flag | `verify_flags` | one entry per claim used in that section's narration |
| Scene transition | `enhancement_cues`, `type: transition` | e.g. `description: "cut from phone screen to open hand"` |

Keep pause, emphasis, and pronunciation attached to the section that contains the line they modify. A reviewer checking one section shouldn't have to cross-reference a different part of the document to find out how a line is supposed to sound.

### Pronunciation reference (carry forward across scripts)

| Term | Say it as |
|---|---|
| ÆPOCH | AY-pock |
| Kairos | KY-ross (rhymes with "eye-ross," not "care-ee-os") |
| KAIROS (the token, spoken) | same as above |
| Pulses | as spelled, normal English |
| RSK / Rootstock | say "Rootstock" in narration; "RSK" only in on-screen text |

Add a term here once it's been said correctly on record, so the next script doesn't have to solve it again.

---

## Part 3 — Duration, word count, and cue density

The script stage checks word count against duration within 10%, and enhancement cue density at roughly one per 8–10 seconds. Both are arithmetic, not judgment calls, so do the math before submitting rather than after a send-back.

**Word count target** — Use 2.3 to 2.5 words per second as the baseline for narrator-voiced explainer pacing (roughly 140–150 words per minute, which is a measured, unhurried conversational read, slower than average speech). `word_count_target = duration_target_seconds × 2.4`. Write to that number, then check the actual draft's word count against it and adjust before calling the script done.

**Enhancement cue count** — `duration_target_seconds ÷ 9` gives a rough target cue count (9 as the midpoint of the 8–10 second window). Count the actual `enhancement_cues` entries across all sections against that target. A script that's cue-light in the build section and cue-heavy in the hook will pass the average check and still fail the review, since density is checked as spacing, not just total count. Spread cues where the sentence structure already wants a break, not evenly by force.

**Arc proportion** — There's no fixed ratio from the pipeline spec, but as a starting point: hook and setup together should not exceed a third of total duration, climax should not be compressed into a single line, and landing should be the shortest stage. If the climax is being rushed to protect a longer hook, that's a sign the extraction sheet's `existing_reality` field is doing too much work and needs trimming.

---

## Part 4 — Before a script moves to the scene_plan stage

This list mirrors the pipeline's own `review_focus` and `success_criteria` for the script stage, so nothing here should surprise that review.

1. Does the extraction sheet name one story, checkable in a single sentence without "and"?
2. Is `word_count_actual` within 10% of `word_count_target`?
3. Are `enhancement_cues` spaced at roughly one per 8–10 seconds, checked section by section, not just averaged across the whole script?
4. Does every section declare an `arc_stage`, and do the five stages appear in order with no gaps?
5. Does `voice_performance_plan` include concrete pacing, pause, emphasis, and at least one sample cue tied to an actual line?
6. Does every locked term match `SERIES_BIBLE.md` exactly, with pronunciation marked on first use?
7. Does every claim in `claim_inventory` appear as a `verify_flag` on the section that uses it, with a real status, not left blank?
8. Does the hook avoid naming ÆPOCH before the viewer has recognized the existing reality as their own?
9. Does the landing section match `episode.closing_statement`, unchanged, without a recap added underneath it?
10. Does `excluded_material` account for everything cut from the source post?
