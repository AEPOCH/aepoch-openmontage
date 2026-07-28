# Lee Performance Map — Episode 001 ("What is ÆPOCH?")

Phase: 13C.1 (performance analysis and timing lock)
Reference recording: `reference/lee/lees-recording-review.mp4`
Recording runtime: 314.665s (5:14.665) — see `qa/phase-13c1-performance-review.md` for full recording metadata.

## Precision statement (read before using this document)

**No word-level forced alignment was available on this machine** (no
`faster-whisper`, `whisperx`, `whisper.cpp`, or cached Whisper model was
found, and none was installed — installing one would mean downloading a
model, which this phase's instructions reserve for explicit approval).
Per the phase's own permitted fallback, timing below is **phrase-level
(beat-level), not word-level**, built from:

1. The approved script's exact per-beat word counts (`inputs/narration-script.md`).
2. `ffmpeg silencedetect` (threshold ‑30dB, minimum 0.5s) run against a
   16kHz mono extraction of the recording's audio — 75 silence gaps ≥0.5s
   were detected across the full recording.
3. A proportional word-count timeline (each beat's estimated end = its
   cumulative word fraction × the recording's total duration), then
   **snapped to the nearest detected silence-gap midpoint** within a 4-second
   tolerance window. 25 of 26 beat boundaries snapped successfully (labeled
   **MEDIUM** confidence below); one (the N15/N16 boundary) found no gap
   within tolerance and keeps the unsnapped proportional estimate (labeled
   **LOW**).
4. Visual spot-checks: representative frames extracted at candidate
   boundaries and viewed directly to sanity-check delivery register
   (energy, posture, direct-address vs. cutaway) against the estimated
   timing — see the QA review for the direct-address/B-roll structural
   finding this surfaced.

**Durations, entry/exit pauses, and per-beat speaking rates below are
estimates anchored to real detected pauses, not measured word-by-word
timestamps.** Treat single-beat wpm figures as indicative, especially for
short beats (N04, N09, N23, N26) where a boundary-snap error of even 1–2
seconds swings the rate substantially. **Emphasis words/phrases and
delivery character are inferred from the approved script's content, each
beat's estimated pace, and its surrounding pause structure — not from
confirmed acoustic stress/pitch analysis** (no prosody-analysis tool was
available; treat these as directorial hypotheses to verify by ear before
locking any animation timing, not as transcribed fact).

Every beat's *approved spoken text* below is the locked script text from
`inputs/narration-script.md` — this document does not alter it. Where
Lee's actual delivery is likely to have paraphrased, added, or dropped
words, that is noted under "Spoken deviation," always phrase-level/
probabilistic (no transcript exists to confirm exact wording), and never
used to change the approved script.

---

## N01

- **Approved spoken text:** "Hi. If you're watching this, you've said yes to being one of the first humans to try something new — and we're grateful to be here with you."
- **Lee start:** 0.00s (leading pre-roll silence 0.00–0.52s, then speech begins)
- **Lee end:** ~10.06s
- **Duration:** ~10.06s (approved-script estimate at 135wpm: 12.4s — Lee's delivery is faster)
- **Estimated speaking rate:** ~167 wpm
- **Entry pause:** 0.52s (natural pre-roll, not a mid-performance pause)
- **Exit pause:** 0.85s (gap 9.39–10.73s)
- **Emphasis words/phrases (inferred):** "yes," "grateful"
- **Delivery character:** intimate, invitational
- **Spoken deviation:** none suspected — opening lines are typically read closest to as-written; no evidence otherwise.
- **Confidence level:** MEDIUM (boundary snapped to a real detected pause)
- **Implication for animation:** `WelcomeDirectAddress` should settle into its held, warm, un-tilted posture well within the first ~10s — Lee's actual pace confirms the approved scene's 24.89s combined N01+N02 window (`ep001-sc01`) has generous room, not a tight fit.
- **Implication for captions:** Two clean clauses ("Hi. If you're watching this, you've said yes...new" / "and we're grateful to be here with you") — natural two-cue caption split at the em dash.
- **Recommended visual density:** Low — one settled composition, no internal development needed at Lee's pace.

---

## N02

- **Approved spoken text:** "Most people who've signed up for this might not fully grasp what ÆPOCH is yet. And that's fair — it's a new idea and it's a new category."
- **Lee start:** ~10.06s
- **Lee end:** ~21.17s
- **Duration:** ~11.12s (approved-script estimate: 12.4s — close match)
- **Estimated speaking rate:** ~151 wpm
- **Entry pause:** 0.85s
- **Exit pause:** 0.81s (gap 20.75–21.60s)
- **Emphasis words/phrases (inferred):** "ÆPOCH" (first spoken use — pronunciation cue), "fair," "new idea," "new category"
- **Delivery character:** orienting, invitational
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** This still sits inside `ep001-sc01`'s window per the approved plan (N01+N02 together = 24.89s) — no internal visual change needed; the same settled Welcome composition holds through both beats.
- **Implication for captions:** First on-screen appearance of "ÆPOCH" — caption should carry the correct spelling/diacritic; no pronunciation guide needed on-screen (audio carries it).
- **Recommended visual density:** Low.

---

## N03

- **Approved spoken text:** "Over the next few days we'll walk through the fundamentals in a few short videos, so you'll have the basic understanding you need by August 9."
- **Lee start:** ~21.17s
- **Lee end:** ~35.03s
- **Duration:** ~13.86s (approved-script estimate: 11.6s — Lee runs slightly longer here)
- **Estimated speaking rate:** ~113 wpm (slowest so far — deliberate, orienting pace)
- **Entry pause:** 0.81s
- **Exit pause:** 0.81s (gap 34.62–35.44s)
- **Emphasis words/phrases (inferred):** "August 9" (first date mention in the episode)
- **Delivery character:** orienting
- **Spoken deviation:** none suspected, though the slower pace here (vs. the approved 135wpm estimate) is itself a useful finding — see scene-timing-map's `narrationDeviationNotes` for `ep001-sc02`.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc02` (`WelcomeDirectAddress`, august9 state) — the partial Comet Arc and "August 9" label should resolve calmly; Lee's slower pace here supports a slightly longer settle rather than a quick reveal.
- **Implication for captions:** One clean single-cue line; "August 9" should not be split across a caption break.
- **Recommended visual density:** Low.

---

## N04

- **Approved spoken text:** "Our mission is to make the economy and internet more human again."
- **Lee start:** ~35.03s
- **Lee end:** ~41.78s
- **Duration:** ~6.75s (approved-script estimate: 5.3s)
- **Estimated speaking rate:** ~107 wpm (slowest single-clause beat in the episode)
- **Entry pause:** 0.81s
- **Exit pause:** 0.52s (gap 38.60–39.40s — a **short** exit pause given how the next scene is a hard `darkCut`; see note below)
- **Emphasis words/phrases (inferred):** "mission," "human again"
- **Delivery character:** declarative
- **Spoken deviation:** none suspected — this is a short, quotable line, typically read close to verbatim.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc03` (`KeyStatement`, the reference-baseline composition — see Phase 13B.2 QA) benefits from the deliberately slow delivery: hold the statement fully settled, no rush into the `darkCut` that follows.
- **Implication for captions:** One line, no split.
- **Recommended visual density:** Low — single held statement.

---

## N05

- **Approved spoken text:** "When the internet was invented, it was built for humans. Its inventors didn't imagine a time when bots and AI would be acting as humans on it."
- **Lee start:** ~41.78s
- **Lee end:** ~52.95s
- **Duration:** ~11.17s (approved-script estimate: 12.0s — close match)
- **Estimated speaking rate:** ~145 wpm
- **Entry pause:** 0.52s — **this is where Lee's cut hard-cuts from direct address into the first illustrative cutaway image** (see QA review's visual-structure finding — do not copy the specific image, but the `darkCut` transition timing the approved plan already specifies here is validated by Lee's own transition placement).
- **Exit pause:** 0.86s (gap 52.52–53.38s)
- **Emphasis words/phrases (inferred):** "built for humans," "bots and AI," "acting as humans"
- **Delivery character:** orienting, factual
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc04` (`DeclarativeHook`, void theme) — Lee's own edit placing a hard visual break exactly at this beat's start independently confirms the approved `transitionIn: darkCut` here.
- **Implication for captions:** Two clauses, natural split at the period.
- **Recommended visual density:** Low-moderate — one settled contrast composition; this beat is short enough not to need an internal development.

---

## N06

- **Approved spoken text:** "If you've been connected to the internet lately, you might have felt something's off. Comments that sound human but aren't. Responses get written faster than humans can type."
- **Lee start:** ~52.95s
- **Lee end:** ~66.15s
- **Duration:** ~13.20s (approved-script estimate, N06+N07 combined for `ep001-sc05` = 31.11s; N06 alone ≈12.4s — close match)
- **Estimated speaking rate:** ~127 wpm
- **Entry pause:** 0.86s
- **Exit pause:** 0.94s (gap 65.87–66.42s)
- **Emphasis words/phrases (inferred):** "something's off"
- **Delivery character:** uneasy
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** First half of the Mimicry symptom list (`ep001-sc05`). Lee's cut begins its first illustrative cutaways around here — do not copy the specific imagery (see QA review), but the cadence of "a new unsettling image roughly every 6–8s" through this stretch is a legitimate benchmark for `EchoCluster`'s internal pacing if this scene is later animated.
- **Implication for captions:** Three short clauses — likely three caption cues, matching the list rhythm.
- **Recommended visual density:** Moderate — this begins the "symptom list," which benefits from a steady internal cadence once animated.

---

## N07

- **Approved spoken text:** "Videos where the face looks right, but the lips don't quite sync. Phone calls where you're not fully sure the person on the other end is even real. Dating apps where you suspect you're being catfished. Does any of this sound familiar?"
- **Lee start:** ~66.15s
- **Lee end:** ~85.10s
- **Duration:** ~18.95s (approved-script estimate: 18.7s — very close match, the best-aligned beat in the episode)
- **Estimated speaking rate:** ~133 wpm
- **Entry pause:** 0.94s
- **Exit pause:** 0.62s (gap 84.79–85.41s)
- **Internal pause detected:** ~75.25–76.39s (1.14s) — falls mid-beat, likely between the "catfished" clause and the closing direct question. Candidate for an internal visual beat if this scene is animated (e.g., the echo cluster settling a beat before the direct-address question lands).
- **Emphasis words/phrases (inferred):** "lips don't quite sync," "catfished," "familiar?" (direct question back to the viewer)
- **Delivery character:** uneasy, closing into invitational (the direct question)
- **Spoken deviation:** none suspected; word-for-word duration match is unusually tight for a phrase-level estimate, which is itself a useful cross-check that the overall beat-boundary model is well-calibrated through this stretch.
- **Confidence level:** MEDIUM
- **Implication for animation:** Longest beat in the episode by word count (42 words) — within `ep001-sc05`'s combined 31.11s window (N06+N07), this is where an internal visual development (a second/third distinct symptom image, or the Mimicry echoes shifting) would land naturally, at the ~75s internal pause.
- **Implication for captions:** Four cues — three short clauses plus the closing question, which should get its own caption for emphasis.
- **Recommended visual density:** Moderate — one internal development at the detected internal pause, timed to the direct question.

---

## N08

- **Approved spoken text:** "Today, bots can create accounts at lightning speed, and AI can generate voice clones, live video clones, images and more. These systems communicate faster than humans and never sleep."
- **Lee start:** ~85.10s
- **Lee end:** ~99.90s
- **Duration:** ~14.80s (approved-script estimate: 12.9s — Lee runs slightly longer)
- **Estimated speaking rate:** ~118 wpm
- **Entry pause:** 0.62s
- **Exit pause:** 1.08s (gap 99.36–100.44s)
- **Emphasis words/phrases (inferred):** "lightning speed," "never sleep"
- **Delivery character:** factual, accelerating in content (a capability list) but not rushed in pace
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc06` (`SyntheticMultiplication`, Multiplication configuration) — this is a single beat mapped to a single scene, comfortably within the approved 12.89s window even at Lee's slightly slower pace.
- **Implication for captions:** Two sentences, two cues.
- **Recommended visual density:** Low-moderate — one settled Multiplication composition; the approved grid-density visual already implies acceleration without needing internal motion cuts.

---

## N09

- **Approved spoken text:** "They hide behind billions of fake accounts. And organizations set up server farms — running around the clock, manufacturing consensus, attempting to program human minds."
- **Lee start:** ~99.90s
- **Lee end:** ~107.42s
- **Duration:** ~7.52s (approved-script estimate: 11.1s — **Lee delivers this markedly faster**)
- **Estimated speaking rate:** ~200 wpm (fastest beat in the episode — flag for verification by ear)
- **Entry pause:** 1.08s
- **Exit pause:** 0.94s (gap 106.95–107.89s)
- **Emphasis words/phrases (inferred):** "billions," "manufacturing consensus"
- **Delivery character:** accelerating, uneasy
- **Spoken deviation:** **Possible** — a ~200wpm estimate for this specific beat is high enough that it may indicate the phrase-level boundary snapped slightly early (i.e., this beat may actually extend a little into the neighboring pause), rather than Lee literally speaking this fast. Flagged for a real listen/transcript check before locking `ep001-sc07`'s internal timing.
- **Confidence level:** MEDIUM (boundary snapped cleanly) but **LOW** on the derived speaking-rate figure specifically.
- **Implication for animation:** `ep001-sc07` (`SyntheticMultiplication`, Manufactured Consensus). Given the uncertainty above, do not lock this scene's internal pacing to the ~200wpm figure — treat the approved 11.11s window as the safer planning basis until verified.
- **Implication for captions:** Two clauses.
- **Recommended visual density:** Low — short beat, one settled composition (`ManufacturedConsensusField`).

---

## N10

- **Approved spoken text:** "Some people call this the dead internet theory. What used to sound like conspiracy is now backed by data: a recent study found over 53% of online traffic is already automated, and projections say that number could climb past 90% within a few years."
- **Lee start:** ~107.42s
- **Lee end:** ~130.10s
- **Duration:** ~22.68s (approved-script estimate: 19.6s — Lee runs longer, consistent with landing two statistics deliberately)
- **Estimated speaking rate:** ~116 wpm
- **Entry pause:** 0.94s
- **Exit pause:** 0.82s (gap 129.69–130.51s)
- **Emphasis words/phrases (inferred):** "dead internet theory," "53%," "90%"
- **Delivery character:** factual
- **Spoken deviation:** none suspected; the longer-than-planned duration is itself the notable finding (see `narrationDeviationNotes` for `ep001-sc08`) — landing sourced statistics clearly appears to take real speakers longer than the flat 135wpm estimate assumes.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc08` (`CircularValueFieldTrafficData`) — Lee's slower, more deliberate pace here supports the approved scene's already-generous 19.56s window; if anything this suggests protecting (not shrinking) this scene's duration in any future timing pass.
- **Implication for captions:** Three clauses across the sentence; "53%" and "90%" should each land on their own caption cue for legibility, matching the approved on-screen text exactly ("53% automated." / "Could climb past 90%.").
- **Recommended visual density:** Low — one settled two-field composition; the numbers are the content, not motion.

---

## N11

- **Approved spoken text:** "This causes confusion, disorientation and distrust online — because the reflection we see isn't always real. Some of us feel this intuitively, but can't quite explain it — it's genuinely hard to know for certain."
- **Lee start:** ~130.10s
- **Lee end:** ~142.06s
- **Duration:** ~11.96s (approved-script estimate: 15.6s — Lee runs faster here)
- **Estimated speaking rate:** ~176 wpm
- **Entry pause:** 0.82s
- **Exit pause:** 0.77s (gap 141.68–142.45s)
- **Emphasis words/phrases (inferred):** "isn't always real"
- **Delivery character:** uneasy, reflective
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc09` (`HumanConsequence`, uncertain-reflection). Lee's faster-than-planned pace means the approved 15.56s window has slack — worth a hold at the end rather than compressing the visual.
- **Implication for captions:** Two clauses, natural split at the em dash.
- **Recommended visual density:** Low — this is a single unresolved visual (the offset human echo); no internal development needed, the point is that it *doesn't* resolve.

---

## N12

- **Approved spoken text:** "And it has knock-on effects on real-life relationships and mental health. It fuels fights that wouldn't otherwise happen. It extracts our data without our knowledge. And it feeds off our life force — our time and energy — our presence."
- **Lee start:** ~142.06s
- **Lee end:** ~158.17s
- **Duration:** ~16.11s (approved-script estimate: 17.8s — close match)
- **Estimated speaking rate:** ~149 wpm
- **Entry pause:** 0.77s
- **Exit pause:** 0.83s (gap 157.75–158.58s)
- **Internal pause detected:** ~154.14–155.26s (1.12s) — falls late in the beat, likely just before the closing "our time and energy — our presence" triad.
- **Emphasis words/phrases (inferred):** "extracts," "life force," "our presence" (final word of the triad, the pivot into the reframe)
- **Delivery character:** uneasy, building toward reflective
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc10` (`HumanConsequence`, extraction). The internal pause near the end supports timing the `ExtractionStrands` reveal to land just before "our presence," giving the final word of the triad a settled, uncluttered visual moment.
- **Implication for captions:** Four clauses/cues, with the closing triad ("our time and energy — our presence") likely worth its own cue for weight.
- **Recommended visual density:** Moderate — one internal development (the strands appearing) timed to the detected internal pause.

---

## N13

- **Approved spoken text:** "Under all of that, there's a bigger shift. Our economic system evolved to serve a world before this. It's morphed into something that runs on debt, artificial scarcity, and extraction."
- **Lee start:** ~158.17s
- **Lee end:** ~170.25s
- **Duration:** ~12.08s (approved-script estimate: 13.3s — close match)
- **Estimated speaking rate:** ~149 wpm
- **Entry pause:** 0.83s
- **Exit pause:** 0.71s (gap 169.89–170.60s)
- **Emphasis words/phrases (inferred):** "bigger shift," "debt, artificial scarcity, and extraction" (closing triad)
- **Delivery character:** declarative
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc11` (`DeclarativeHook`, "built for another world" — no human node). Straightforward single-development scene; approved window is well-matched.
- **Implication for captions:** Two clauses.
- **Recommended visual density:** Low.

---

## N14

- **Approved spoken text:** "It doesn't know what to do with a world where machines can do most of the labor and the thinking. And it doesn't recognize the one thing that stays uniquely human: our presence, expressed as attention, care and creativity."
- **Lee start:** ~170.25s
- **Lee end:** ~191.52s
- **Duration:** ~21.27s (approved-script estimate: 17.3s — Lee runs noticeably longer; this is the hook's pivot line and the longest single-beat duration in the analysis)
- **Estimated speaking rate:** ~110 wpm (one of the slowest rates in the episode — consistent with this being the pivot the entire reframe depends on)
- **Entry pause:** 0.71s
- **Exit pause:** confidence LOW (see below — this beat's end/N15's start did not snap to a clean detected gap)
- **Internal pause detected:** ~181.56–183.75s (**2.19s** — one of the longest pauses in the whole recording), falling mid-beat, almost certainly between "...do most of the labor and the thinking." and "And it doesn't recognize..." This is a real, substantial, deliberate-sounding pause, not a boundary artifact.
- **Emphasis words/phrases (inferred):** "uniquely human," "attention, care and creativity" (closing triad — the exact three words `HumanConsequence`/reframe imagery must carry)
- **Delivery character:** declarative, reflective
- **Spoken deviation:** none suspected — the extended duration and the strong internal pause both read as *intentional weight*, not a struggle with the line.
- **Confidence level:** MEDIUM on duration/internal pause; **LOW on the exact N14/N15 boundary** (see next entry).
- **Implication for animation:** `ep001-sc12` (`DeclarativeHook`, "does not recognize presence" — the quiet unacknowledged human node). The 2.19s internal pause is a strong, well-grounded candidate for timing the human node's quiet entrance: hold the empty legacy-structure composition through the first clause, then let the human node settle in during/after the internal pause, landing before "attention, care and creativity."
- **Implication for captions:** The colon-joined sentence should probably split into two cues at the internal pause, matching the detected breath.
- **Recommended visual density:** Moderate — exactly one internal development (the human node's entrance), timed to the real detected pause, not arbitrary.

---

## N15

- **Approved spoken text:** "ÆPOCH is our response to that. Because the various expressions of presence - such as attention, care, and creativity — are what any economy of the future will need to serve us well."
- **Lee start:** ~191.52s (see confidence note — this boundary is estimated, not gap-confirmed)
- **Lee end:** ~203.94s
- **Duration:** ~12.42s (approved-script estimate: 14.7s — close-ish)
- **Estimated speaking rate:** ~159 wpm
- **Entry pause:** not cleanly detected (see above)
- **Internal pause detected:** ~195.75–196.90s (1.15s), plausibly between "ÆPOCH is our response to that." and "Because the various expressions of presence..."
- **Emphasis words/phrases (inferred):** "ÆPOCH is our response" (the reveal line itself)
- **Delivery character:** declarative, invitational — **notably not** hushed or dramatically slow; Lee's estimated pace here (~159 wpm) is brisk, closer to a warm forward-moving statement than a suspended dramatic beat. This is a genuine finding worth weighing before locking the Signal scene's motion pacing (see QA review).
- **Spoken deviation:** none suspected in wording; the *pacing character* (brisk rather than hushed) is the notable observation, not a wording deviation.
- **Confidence level:** **LOW** — this is the one beat boundary in the whole map that did not snap to a detected silence gap within tolerance (no gap found within 4s of the proportional estimate). Treat both this beat's start and `ep001-sc13`'s reference timing as the least-certain entries in this document. Recommend a manual listen/transcript pass here before finalizing motion timing for the Signal scene specifically.
- **Implication for animation:** `ep001-sc13` (`SignalStatement`) — given LOW confidence, do not lock exact frame-level Signal-reveal timing to this estimate. The internal pause at ~195.75s (if the boundary estimate is roughly right) is a plausible candidate for when the vesica fully resolves, ahead of the supporting clause.
- **Implication for captions:** Two cues, split at "that." and again likely at the em dash before "are what any economy...".
- **Recommended visual density:** This is the one Signal moment in the episode — a single strong resolved composition, then hold. No additional internal development beyond the vesica's own resolve.

---

## N16

- **Approved spoken text:** "ÆPOCH provides a new kind of currency, built on one ancient idea using modern tools."
- **Lee start:** ~203.94s
- **Lee end:** ~210.02s
- **Duration:** ~6.08s (approved-script estimate: 6.7s — close match)
- **Estimated speaking rate:** ~148 wpm
- **Entry pause:** not cleanly detected (inherits the N15/N16 boundary uncertainty above)
- **Exit pause:** 0.80s (gap 209.62–210.43s)
- **Emphasis words/phrases (inferred):** "ancient idea," "modern tools"
- **Delivery character:** factual
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM (this beat's own exit is gap-confirmed even though its entry inherits N15's uncertainty)
- **Implication for animation:** `ep001-sc14` (`CircularValueFieldConnectedPoles`) — short, single-development scene, well inside the approved window.
- **Implication for captions:** One line.
- **Recommended visual density:** Low.

---

## N17

- **Approved spoken text:** "That you being here, unique, alive and present, is already a contribution. Not something you earn. Not something you have to buy from someone else. Something you already are. Something that should be celebrated."
- **Lee start:** ~210.02s
- **Lee end:** ~225.55s
- **Duration:** ~15.53s (approved-script estimate: 15.1s — very close match)
- **Estimated speaking rate:** ~131 wpm
- **Entry pause:** 0.80s
- **Exit pause:** 0.55s (gap 225.28–225.83s)
- **Internal pause detected:** ~219.76–221.08s (1.33s) — falls mid-anaphora, plausibly between "Not something you have to buy from someone else." and "Something you already are."
- **Emphasis words/phrases (inferred):** the repeated "Not something..." / "Something..." anaphora itself; "celebrated" (closing word)
- **Delivery character:** reflective, invitational, warm — the episode's warmest passage
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc15` (`ContributionStatement`). The internal pause is a good candidate for a restrained visual beat within the anaphora — e.g., the presence ring settling or brightening slightly partway through — but given this passage's "the repetition is the point" editorial note, restraint is more important than added motion here.
- **Implication for captions:** Five short cues matching the five anaphoric clauses.
- **Recommended visual density:** Low — one settled composition (human + ring), at most one very restrained internal shift at the internal pause; do not fragment this passage's rhythm with visual cuts.

---

## N18

- **Approved spoken text:** "We're building a layer for the internet that can recognise that, and eventually pay for it."
- **Lee start:** ~225.55s
- **Lee end:** ~234.96s
- **Duration:** ~9.41s (approved-script estimate: 7.1s — Lee runs longer)
- **Estimated speaking rate:** ~102 wpm (slowest single-clause beat, alongside N04)
- **Entry pause:** 0.55s
- **Exit pause:** 0.74s (gap 234.59–235.33s)
- **Emphasis words/phrases (inferred):** "eventually" (the hedge word SERIES_BIBLE.md requires)
- **Delivery character:** factual, reflective (the deliberate pace suggests careful hedging, not haste)
- **Spoken deviation:** none suspected — the slow pace matches the line's careful, hedged claim.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc16` (`HumanNetworkProtocolLayer`) — the deliberate pace supports letting the shared ring settle fully rather than rushing to the next scene.
- **Implication for captions:** One line.
- **Recommended visual density:** Low.

---

## N19

- **Approved spoken text:** "That's the whole thesis. Everything else we walk through in the days ahead is downstream of that one idea."
- **Lee start:** ~234.96s
- **Lee end:** ~242.01s
- **Duration:** ~7.05s (approved-script estimate: 8.4s — close match)
- **Estimated speaking rate:** ~162 wpm
- **Entry pause:** 0.74s
- **Exit pause:** 1.27s (gap 241.37–242.64s — one of the longer pauses, likely marking a real return to direct address; see QA review's visual-structure note)
- **Emphasis words/phrases (inferred):** "whole thesis," "one idea"
- **Delivery character:** declarative
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc17` (`OneIdeaStatement`) — the long exit pause supports a genuine settled hold at the end of this scene before moving on, matching the scene's own "reduced to one idea" design intent.
- **Implication for captions:** Two clauses.
- **Recommended visual density:** Low — this scene is deliberately the sparsest in the episode; the pause data supports, not contradicts, that restraint.

---

## N20

- **Approved spoken text:** "For 42 days starting on August 9, you're going to help us test the foundational systems we've built. You'll be first. You'll be inside this earlier than almost anyone else will ever be."
- **Lee start:** ~242.01s
- **Lee end:** ~262.03s (combined with N21 for `ep001-sc18`)
- **Duration (N20 only, estimated):** ~12.20s (approved-script estimate: 14.7s)
- **Estimated speaking rate:** ~162 wpm
- **Entry pause:** 1.27s (see N19 above — likely the return-to-direct-address transition)
- **Exit pause:** 0.78s (gap 253.82–254.60s)
- **Emphasis words/phrases (inferred):** "42 days," "August 9," "You'll be first."
- **Delivery character:** invitational, accelerating (energized delivery of the invitation)
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc18` (`FlowLifecyclePathVariant`, waypoint 1 "Start August 9"). Energized delivery supports a confident, forward-moving reveal of the first waypoint rather than a tentative one.
- **Implication for captions:** Three clauses/cues.
- **Recommended visual density:** Moderate — this is the first of two beats sharing one scene; expect the waypoint-path visual to begin developing here.

---

## N21

- **Approved spoken text:** "Things will break. That's what first tests are for. You'll get confused sometimes. That's normal."
- **Lee start:** ~254.21s
- **Lee end:** ~262.03s
- **Duration:** ~7.82s (approved-script estimate: 6.7s — close match)
- **Estimated speaking rate:** ~115 wpm (slower, reassuring pace)
- **Entry pause:** inherits N20's exit gap (0.78s)
- **Exit pause:** 0.56s (gap 261.74–262.31s)
- **Emphasis words/phrases (inferred):** "That's normal." (closing reassurance)
- **Delivery character:** reflective, intimate
- **Spoken deviation:** none suspected — this line is explicitly protected in the approved script ("must not be cut or softened") and the slower, warmer pace here is consistent with that intent being honored in performance.
- **Confidence level:** MEDIUM
- **Implication for animation:** Second half of `ep001-sc18` — the reassuring pace supports the "Test what we built" / "Notice what happens" waypoints settling calmly rather than rushing through the four-step path.
- **Implication for captions:** Four short cues, one per sentence.
- **Recommended visual density:** Moderate — continuation of the single scene's internal path development; no new visual register needed.

---

## N22

- **Approved spoken text:** "And you'll notice things we can't see from where we sit — the moments, the patterns, the questions that shape what we build next. Either way, you'll help co-create what comes next and how we launch this properly."
- **Lee start:** ~262.03s
- **Lee end:** ~279.45s
- **Duration:** ~17.42s (approved-script estimate: 16.9s — close match)
- **Estimated speaking rate:** ~131 wpm
- **Entry pause:** 0.56s
- **Exit pause:** 0.82s (gap 279.04–279.86s)
- **Emphasis words/phrases (inferred):** "co-create," "notice things we can't see"
- **Delivery character:** invitational
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc19` (`HumanNetwork`, participant cohort). Well-matched to the approved window; single settled composition.
- **Implication for captions:** Two clauses.
- **Recommended visual density:** Low-moderate.

---

## N23

- **Approved spoken text:** "So — here's the whole thing in one sentence:"
- **Lee start:** ~279.45s
- **Lee end:** ~283.89s
- **Duration:** ~4.44s (approved-script estimate: 4.0s — close match)
- **Estimated speaking rate:** ~122 wpm
- **Entry pause:** 0.82s
- **Exit pause:** part of the shared N23/N24 gap analysis (see N24)
- **Emphasis words/phrases (inferred):** "one sentence" (the cue itself)
- **Delivery character:** orienting — a pure transitional beat
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** First half of `ep001-sc20`. This is a cue line, not a content beat — should not carry its own visual development, just a brief settle before the thesis lands.
- **Implication for captions:** One short cue.
- **Recommended visual density:** Low (deliberately quiet, a held breath before the thesis).

---

## N24

- **Approved spoken text:** "We're making the economy and internet more human again, starting with a new kind of currency built on the idea that you being here, alive and present, is enough. Because it's the foundation of value itself."
- **Lee start:** ~283.89s
- **Lee end:** ~299.34s
- **Duration:** ~15.45s (approved-script estimate: 16.0s — close match)
- **Estimated speaking rate:** ~140 wpm
- **Entry pause:** inherits N23's position
- **Exit pause:** **2.23s** (gap 298.22–300.46s) — the second-longest pause in the recording, landing right after the thesis's final words ("the foundation of value itself"). This is almost certainly a deliberate, structural/emotional pause marking the transition from the intellectual thesis into the intimate personal-reflection register that follows (N25).
- **Emphasis words/phrases (inferred):** "alive and present," "the foundation of value" (the crystallized thesis, matching the approved on-screen text exactly)
- **Delivery character:** declarative, landing
- **Spoken deviation:** none suspected — this is the thesis restatement and, per the approved script's own note, "a landing restatement, not a second climax," which the performance appears to honor (no re-acceleration, no second Signal-like energy spike detected).
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc20` (`FinalThesisStatement`). The 2.23s exit pause is strong, well-grounded evidence that this scene should end on a genuine held stillness — not a quick cut into N25 — regardless of the scene's own internal duration budget.
- **Implication for captions:** Two-part cue matching the approved two-line on-screen text exactly.
- **Recommended visual density:** Low — one substantial settled composition, then a real hold through the detected pause.

---

## N25

- **Approved spoken text:** "Say that back to yourself. Try it on for the rest of the day and see how it feels. And don't forget to take a moment to appreciate the magnificent biological transformer that you are."
- **Lee start:** ~299.34s (immediately following the 2.23s structural pause noted above)
- **Lee end:** ~313.59s
- **Duration:** ~14.25s (approved-script estimate: 15.6s — close match)
- **Estimated speaking rate:** ~147 wpm
- **Entry pause:** 2.23s (see N24)
- **Exit pause:** 0.56s (gap 313.31–313.87s)
- **Emphasis words/phrases (inferred):** "magnificent biological transformer" (the protected line)
- **Delivery character:** playful, intimate
- **Spoken deviation:** none suspected — this line is explicitly protected in the approved script.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc21` (`BiologicalTransformerStatement`). The long entry pause supports opening this scene on a genuine register shift — settling into the breath-rings composition calmly rather than snapping in immediately after N24.
- **Implication for captions:** Three clauses/cues.
- **Recommended visual density:** Low — one warm, settled composition; the register shift itself (via the pause) does the narrative work, not added motion.

---

## N26

- **Approved spoken text:** "See you tomorrow."
- **Lee start:** ~313.59s
- **Lee end:** 314.665s (fixed to the recording's measured end)
- **Duration:** ~1.08s (approved-script estimate: 1.3s — close match)
- **Estimated speaking rate:** ~167 wpm (short beat, treat rate as indicative only)
- **Entry pause:** 0.56s
- **Exit pause:** none within the recording (this is the final beat)
- **Emphasis words/phrases (inferred):** "tomorrow"
- **Delivery character:** closing, intimate
- **Spoken deviation:** none suspected.
- **Confidence level:** MEDIUM
- **Implication for animation:** `ep001-sc22` (`AepochSeriesOutro`). The approved scene already holds well past this beat's spoken duration (4.5s canonical hold vs. ~1.08s of speech) — Lee's recording confirms the spoken line itself is brief; the hold is doing the work of the sign-off, not the words.
- **Implication for captions:** One short cue.
- **Recommended visual density:** Low — the outro's clean, held composition is correct as designed; no additional motion needed.

---

## Summary — pacing observations across all 26 beats

- Overall measured speaking rate across the full recording: **137.1 wpm**
  (719 words ÷ 314.665s), close to but slightly faster than the approved
  135wpm planning estimate.
- Fastest beats: N09 (~200wpm, flagged LOW confidence on the rate itself —
  likely a boundary-snap artifact, not necessarily genuine rapid delivery),
  N11 (~176wpm), N01 (~167wpm), N26 (~167wpm, short beat).
- Slowest beats: N04 (~107wpm), N18 (~102wpm), N14 (~110wpm), N03 (~113wpm)
  — three of these four are declarative/thesis-adjacent lines, consistent
  with real speakers slowing down for weight on statement-type beats.
- The two longest pauses in the entire recording (2.19s inside N14, 2.23s
  between N24 and N25) both land at structurally significant points — the
  hook's pivot line and the thesis-to-reflection register shift — and are
  the strongest, best-grounded evidence in this document for where a
  deliberate hold (not filled with animation) belongs.
