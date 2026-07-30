Begin ÆPOCH Phase 13C.2A: complete episode motion blocking for
Episode 001.

Episode:

projects/aepoch-episodes/001-what-is-aepoch/

Reference recording:

projects/aepoch-episodes/001-what-is-aepoch/reference/lee/lees-recording-review.mp4

This phase implements a complete motion-blocking draft for all 22 scenes,
synchronized to the approved Lee-reference timing map.

This is not the final animation polish pass.

Do not generate captions.
Do not rewrite narration.
Do not change the approved scene order.
Do not redesign approved static compositions.
Do not use Lee’s visual footage or B-roll.
Do not produce the final 1080p delivery render.
Do not perform final audio mastering.
Do not modify either locked baseline:

- aepoch-tier1-beta-v0.1.0
- aepoch-e001-static-v0.1.0

Read completely:

- docs/aepoch-production-playbook/CURRENT_STATE.md
- docs/aepoch-production-playbook/PHASE_LOG.md
- projects/aepoch-episodes/001-what-is-aepoch/inputs/episode-brief.md
- projects/aepoch-episodes/001-what-is-aepoch/inputs/narration-script.md
- projects/aepoch-episodes/001-what-is-aepoch/inputs/scene-plan.yaml
- projects/aepoch-episodes/001-what-is-aepoch/inputs/scene-timing-map.yaml
- projects/aepoch-episodes/001-what-is-aepoch/storyboard/static-review.md
- projects/aepoch-episodes/001-what-is-aepoch/reference/lee/lee-performance-map.md
- projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13b-static-review.md
- projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13c1-performance-review.md
- remotion-composer/src/aepoch/episodes/001-what-is-aepoch/
- remotion-composer/src/aepoch/
- brands/aepoch/VISUAL_LANGUAGE.md
- brands/aepoch/MOTION_TOKENS.md
- brands/aepoch/SCENE_MODULES.md
- brands/aepoch/ASSET_INDEX.md

PREFLIGHT

Before implementation, report:

1. Current branch.
2. Locked Tier 1 tag.
3. Locked Episode 001 static tag.
4. Locked Episode 001 timing tag.
5. Reference recording path and existence.
6. Current available memory and disk space.
7. Expected composition frame rate.
8. Expected total frame count.
9. Phase objective.
10. Stop condition.

The reference recording is approximately 314.665 seconds.

The Remotion episode remains 30 fps.

Use:

- 9440 total frames
- 314.6667 seconds at 30 fps

Do not time-stretch Lee’s audio.

A difference of less than one video frame between the source-audio duration
and the Remotion composition may be handled by end trimming or silence
padding only.

REFERENCE AUDIO

Extract the audio locally from Lee’s review recording for development sync.

Suggested ignored location:

projects/aepoch-episodes/001-what-is-aepoch/reference/lee/analysis/lee-reference-audio.wav

Use:

- 48 kHz
- Stereo
- PCM WAV or another reliable local production format

Use only the audio track.

Do not incorporate any visual frames, images, edits, logos, B-roll or other
visual material from Lee’s recording.

The extracted audio and the source MP4 must remain ignored and uncommitted.

PHASE OBJECTIVE

Implement deterministic motion for all 22 approved scenes and assemble one
complete Episode 001 motion-blocking composition using the timings in:

projects/aepoch-episodes/001-what-is-aepoch/inputs/scene-timing-map.yaml

Lee-reference timing is authoritative for this development preview.

Keep the approved-script timing fields intact for future comparison.

The motion draft must prove:

- The full episode maintains visual momentum for approximately 5:15.
- Long scenes contain meaningful internal developments.
- Visual change follows the narration rather than running independently.
- Structural and emotional pauses retain stillness.
- The problem section escalates coherently.
- “ÆPOCH is our response” remains the single unmistakable Signal moment.
- The answer section feels warmer and more spacious than the problem section.
- The 42-day invitation and final thesis land clearly.
- The episode feels like one continuous ÆPOCH visual world rather than a
  sequence of unrelated slides.

SOURCE ARCHITECTURE

Add episode motion source under the existing Episode 001 directory.

Use the established architecture where possible. Appropriate additions may
include:

- motion.tsx
- timeline.tsx
- motion-presets.ts
- motion-types.ts
- audio.tsx
- compositions.tsx

Do not duplicate shared Tier 1 infrastructure unnecessarily.

Do not modify frozen Tier 1 components merely to accommodate Episode 001.

Create local wrappers where episode-specific timing or composition behavior
requires them.

All motion must derive from:

- useCurrentFrame()
- useVideoConfig()
- interpolate()
- spring()
- approved shared motion helpers
- deterministic fixed-seed helpers

Do not use:

- CSS keyframe animations
- setTimeout
- wall-clock time
- Math.random()
- nondeterministic layout
- runtime network requests

COMPOSITIONS

Register:

1. Aepoch-E001-MotionBlocking
2. Aepoch-E001-MotionBlocking-Reduced

Both compositions:

- 1920×1080 logical canvas
- 30 fps
- 9440 frames
- Same reference audio
- No captions
- No debug labels
- No corner mark unless already required by the approved scene

The normal composition receives the full motion-blocking treatment.

The reduced-motion composition must use the same scene timing and settled
compositions but limit motion to:

- Opacity changes
- Short path reveals
- Minimal scale changes
- Immediate or short-duration state changes
- No accelerating multiplication
- No large translations
- No repeated pulsing
- No camera motion

Do not render a full reduced-motion episode during this phase. Register and
validate it, then render only the reduced-motion spot checks specified below.

MOTION DENSITY

Use the recommendations in scene-timing-map.yaml and
lee-performance-map.md.

During dense explanatory sections, introduce one meaningful visual
development approximately every 4–8 seconds.

Lee’s observed visual-refresh cadence of roughly 5–7 seconds is a useful
pacing benchmark.

Do not translate that into arbitrary movement.

A meaningful development may be:

- A new element entering
- A repeated unit multiplying
- A field becoming mechanically regular
- A relationship line forming
- A number or state resolving
- A system acknowledging or failing to acknowledge a human
- A composition simplifying
- A visual field settling around a human
- A restrained camera or scale change
- A deliberate pause after a major statement

Do not continuously move everything.

Every scene should have clear moments of:

- Reveal
- Development
- Resolution
- Hold

TRANSITIONS

Use the transition behavior proven in Phase 12C.

Because every scene owns an opaque background:

- Hold the outgoing scene’s settled state beneath the transition.
- Fade the incoming scene above it.
- Use approximately 12 frames unless the timing map calls for a different
  transition.
- Do not fade only the outgoing scene beneath an already opaque incoming
  scene.
- Do not introduce blank Earth Rise, Void or black reset frames between
  ordinary scenes.
- Do not use generic slide transitions.

For major tonal transitions between Void/Depth and Earth Rise, allow the
incoming full scene and its background to dissolve over the settled outgoing
composition.

The outro may use a cleaner settling transition, but it must not flash or
hard-reset unnecessarily.

SCENE-SPECIFIC MOTION DIRECTION

SCENE 01 — WELCOME

- Improved editorial human settles naturally into the frame.
- Minimal whole-body weight shift only.
- Optional single restrained breath or presence pulse on “grateful.”
- No head gesture.
- No waving.
- No presenter or mascot behavior.
- Preserve the intimate opening.

SCENE 02 — AUGUST 9

- Continue the exact Scene 01 visual world.
- Do not reintroduce the human as a new shot.
- Date treatment appears quietly.
- Partial Comet Arc draws or reveals slowly.
- The scene should feel like a continuation of the welcome.

SCENE 03 — MISSION

- Restrained KeyStatement reveal.
- Keep movement minimal after the text resolves.
- No Signal treatment.
- This is the baseline statement composition against which later statement
  scenes differ.

SCENE 04 — BUILT FOR HUMANS

- Reveal the human register first.
- Introduce rigid system geometry in alignment with “bots and AI.”
- System motion may use sharper easing than human motion.
- Do not imply that the system is malicious.

SCENE 05 — MIMICRY

- Preserve the singular irregular human rhythm.
- Add nearly identical synthetic echoes at increasingly regular intervals.
- Use the internal motion beat recorded in the timing map.
- The human must remain visually dominant.
- End with enough stillness for the viewer to understand the imitation.

SCENE 06 — MULTIPLICATION

- Begin from one synthetic unit.
- Replicate into an increasingly regular field.
- Increase cadence mechanically.
- Keep individual units legible long enough to understand the source-to-many
  relationship.
- Do not turn the field into random particle motion.

SCENE 07 — MANUFACTURED CONSENSUS

- Continue visually from Scene 06’s replicated units.
- Units align into mechanically perfect rows.
- Separate outputs resolve into one synchronized pressure or output band.
- The final state should feel unnaturally unanimous.
- No panel, dashboard, oversized arrows or interface metaphor.

SCENE 08 — TRAFFIC DATA

- Resolve the current 53% observation first.
- Introduce 90%+ as a future projection second.
- Use solid versus projected/dashed treatment already approved.
- No spinning numbers.
- No casino counter.
- Preserve the wording:
  “53% automated.”
  “Could climb past 90%.”

SCENE 09 — UNCERTAIN REFLECTION

- Human enters or holds first.
- Broken human-like echo fragments emerge offset from the human.
- The reflection must remain unresolved.
- Do not allow the fragments to become a clean clone.
- Keep motion quiet and unsettling rather than frightening.

SCENE 10 — EXTRACTION

- Use the internal motion beat recorded in the timing map.
- Introduce the three extraction strands in meaningful phrase alignment.
- The strands represent time, attention and data but remain unlabeled.
- The rigid destination geometry belongs to the Scenes 11–12 visual family.
- The human remains visually whole.

SCENE 11 — BUILT FOR ANOTHER WORLD

- Assemble the rigid legacy structure in controlled mechanical stages.
- No human in the final composition.
- The system should feel mismatched or obsolete, not evil.
- End in a stable settled state.

SCENE 12 — DOES NOT RECOGNIZE PRESENCE

- Use the internal motion beat recorded in the timing map.
- Begin from the related legacy-system family established in Scene 11.
- Introduce the quiet human at the system boundary.
- The system fails to acknowledge or connect to the human.
- Preserve the approximately 2.19-second structural pause identified inside
  N14.
- During that pause use complete stillness or settling motion only.
- Do not fill the pause with a new reveal.

SCENE 13 — ÆPOCH IS OUR RESPONSE

- This is the only Signal scene.
- Manually spot-check the provisional Scene 13 entry boundary against the
  waveform and the spoken phrase “ÆPOCH is our response.”
- Record the final chosen entry timing and confidence in QA.
- Use the canonical Signal sequence:
  breath
  convergence
  forge/resolution
  radiance
  settle
- Resolve into the approved SignalVesica composition.
- This must be the strongest and most formal motion event in the episode.
- Signal color and geometry are forbidden everywhere else.

SCENE 14 — ANCIENT IDEA / MODERN TOOLS

- Enter from the settled aftermath of Scene 13 without creating another
  convergence.
- Hold the two poles in balanced relationship.
- Reveal the straight connecting path quietly.
- No forge.
- No white ring.
- No vesica.
- No Signal color.
- This scene must feel calm after the Signal event.

SCENE 15 — ALREADY A CONTRIBUTION

- Human is the primary subject.
- Warm recognition ring or field resolves around the human.
- Text appears in relationship to the figure.
- The effect is recognition, not activation or verification.
- No Signal.
- No Moss.

SCENE 16 — PROTOCOL LAYER

- Human nodes remain individually distinguishable.
- Introduce nodes sequentially.
- Shared ring or layer appears only after individuals are established.
- The layer should connect without flattening individuality.
- No hierarchy.
- No browser or technical-stack metaphor.

SCENE 17 — ONE IDEA

- Reduce visual complexity.
- Resolve toward the approved single-point and line composition.
- Use generous stillness.
- This is a conceptual simplification, not another dramatic climax.
- No Signal.

SCENE 18 — 42-DAY TEST

- Reveal the Comet-Arc-family path.
- Activate the four waypoints sequentially:

  Start August 9
  Test what we built
  Notice what happens
  Shape what comes next

- Preserve improved label readability.
- Do not reintroduce cards.
- “Things will break” and “That’s normal” are not additional stages.
- The path should visibly rhyme with the partial arc introduced in Scene 02.

SCENE 19 — PARTICIPANT COHORT

- Individual humans join gradually.
- Use natural, unequal timing.
- Relationship lines form after people are established.
- The collective responds subtly.
- No central leader.
- No voting or governance symbolism.
- No hierarchy.

SCENE 20 — FINAL THESIS

- Land:
  “Alive and present is enough.
  Presence is the foundation of value.”
- Human and stable value/presence field resolve together.
- Give this scene greater visual weight than Scene 17.
- Preserve the approximately 2.23-second emotional pause after the thesis.
- During the pause use near-complete stillness.
- Allow captions to clear later, but do not implement captions in this phase.
- No Signal.

SCENE 21 — MAGNIFICENT BIOLOGICAL TRANSFORMER

- Reopen gently after the thesis pause.
- Use the editorial human and restrained BreathRings.
- Motion should feel embodied and lightly playful.
- No machine parts.
- No glowing brain.
- No robot metaphor.
- No exaggerated pulsing.
- No Signal.

SCENE 22 — SEE YOU TOMORROW

- Resolve toward the approved enlarged Æ mark and identifier.
- Use a clean, quiet hold.
- Preserve end-screen-safe negative space.
- No CTA.
- No Signal.
- No decorative motion after the composition settles.

AUDIO BEHAVIOR

Use Lee’s extracted audio at its existing level for the motion-blocking
preview.

Do not:

- Normalize to final loudness
- Compress
- EQ
- De-noise
- Time-stretch
- Replace sections
- Add music
- Add sound effects

Audio mastering and final soundtrack choice belong to a later phase.

MACHINE-SAFE RENDER POLICY

This desktop was recently under heavy resource pressure.

Use conservative rendering:

- Never run multiple video renders simultaneously.
- Maximum render concurrency: 2.
- Prefer concurrency 1 if memory pressure is high.
- Render the full review video only at 1280×720.
- Use the existing 1920×1080 logical composition with a compatible render
  scale rather than changing the composition dimensions.
- Use H.264 with a review-quality CRF around 25–27.
- Use AAC around 128 kbps.
- Use `nice` where available.
- Check available memory before the full render.
- Do not create a full-resolution 1080p episode render.
- Stop and report rather than repeatedly retrying a resource-exhausted render.

Inspect the installed Remotion CLI help and existing project scripts before
choosing exact flags. Use only flags supported by the installed version.

OUTPUTS

Render one complete normal-motion blocking preview:

projects/aepoch-episodes/001-what-is-aepoch/renders/previews/phase-13c2a/aepoch-e001-motion-blocking-720p.mp4

After the single full preview is rendered, create six review chapters using
FFmpeg stream-copy where possible rather than rerendering:

1. 00-welcome-and-setup.mp4
   Approximately 0:00–0:45

2. 01-automation-and-synthetic-internet.mp4
   Approximately 0:45–2:10

3. 02-consequence-and-economic-system.mp4
   Approximately 2:10–3:12

4. 03-aepoch-answer.mp4
   Approximately 3:12–4:02

5. 04-test-invitation.mp4
   Approximately 4:02–4:33

6. 05-thesis-and-close.mp4
   Approximately 4:33–end

Use the exact approved scene boundaries from scene-timing-map.yaml where
they differ from these approximate chapter descriptions.

Render three short reduced-motion spot checks only:

- Automation sequence
- Signal transition and aftermath
- Final thesis through outro

Do not render the complete reduced-motion episode during this phase.

QA ARTIFACTS

Create:

projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13c2a-motion-blocking-review.md

Record:

- Composition IDs
- Total frame count and runtime
- Reference-audio path and metadata
- Scene timing reconciliation
- Scene 13 manually selected entry timing
- Motion treatment for all 22 scenes
- Internal visual-refresh moments
- Long-pause treatment
- Transition behavior
- Reduced-motion behavior
- Render commands
- Render concurrency
- Output metadata
- Known limitations
- Creative-review status
- Pass/fail

Create:

projects/aepoch-episodes/001-what-is-aepoch/qa/phase-13c2a-transition-contact-sheet.png

The contact sheet should inspect representative frames immediately before,
during and after every scene transition.

Its purpose is to expose:

- Blank flashes
- Hard resets
- Accidental double backgrounds
- Text collisions
- Broken crossfades
- Signal leakage
- Poor tonal transitions between Void/Depth and Earth Rise

Do not burn captions or debug labels into this contact sheet.

VALIDATION

Before stopping:

- All 22 scenes appear exactly once and in approved order.
- Composition duration is exactly 9440 frames at 30 fps.
- Scene ranges are monotonic and non-overlapping.
- Reference audio is synchronized without time-stretching.
- No ordinary transition contains a blank reset frame.
- Incoming-scene fades visibly work over outgoing settled frames.
- Motion remains deterministic.
- No Math.random() exists in render paths.
- Moss remains absent.
- Signal appears only in Scene 13.
- Scene 13 entry timing is manually spot-checked and documented.
- The approximately 2.19-second N14 pause is preserved.
- The approximately 2.23-second post-thesis pause is preserved.
- Dense passages receive meaningful visual development every 4–8 seconds.
- Quiet passages are allowed to remain quiet.
- Normal and reduced-motion compositions both register successfully.
- Type-check introduces zero new episode-related diagnostics.
- Full 720p preview renders successfully.
- All six chapter clips exist.
- All three reduced-motion spot checks exist.
- Transition contact sheet renders successfully.
- No captions were generated.
- No final 1080p render was generated.
- No locked source or baseline was modified.

Update:

- docs/aepoch-production-playbook/CURRENT_STATE.md
- docs/aepoch-production-playbook/PHASE_LOG.md

Mark Phase 13C.2A as awaiting creative review, not final completion.

STOP CONDITION

Stop after:

- Complete 720p motion-blocking preview
- Six chapter review clips
- Three reduced-motion spot checks
- Transition contact sheet
- QA document
- Type-check and validation
- Tracking-document update

Do not begin:

- Phase 13C.2B motion polish
- Captions
- Final soundtrack work
- Music or sound design
- Final audio mastering
- Final 1080p rendering
