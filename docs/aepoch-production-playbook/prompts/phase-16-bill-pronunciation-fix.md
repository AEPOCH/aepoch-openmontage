# Phase 16 Handoff — Bill Pronunciation Correction

You are continuing project `aepoch-blog-pilot-what-is-aepoch` on branch
`aepoch-series`.

Chris selected **Bill** as the winning ElevenLabs voice. The audition exposed
a pronunciation defect: the provider interpreted the existing guide as if it
should spell out “A-Y-POCK.” The correct pronunciation of ÆPOCH is exactly two
syllables: **A-pock**, IPA **`/ˈeɪ.pɒk/`**. The first syllable is the letter-name
“A,” as at the start of “angle”; never speak the letter Y and never expand the
word to three syllables.

This is a Bill-only pronunciation correction and sample recheck. It does not
authorize batch narration or any visual generation.

## Read before acting

Read `AGENT_GUIDE.md`, the latest durable state/log, the approved script and
voice-performance plan, the current assets checkpoint and audition metadata,
`skills/pipelines/explainer/asset-director.md`,
`skills/meta/voice-performance-director.md`, and
`.agents/skills/elevenlabs/SKILL.md`.

## Required corrections

1. Record Bill as Chris's selected voice using the real voice name and voice
   ID already captured in the audition evidence. Append a decision-log entry;
   do not mutate or delete the provider/voice shortlist history.
2. Correct every active pronunciation guide that says or implies `AY-pock` or
   `A-Y-POCK`, including the script artifact and
   `brands/aepoch/SCRIPT_RULES.md`, to an unambiguous guide:
   `A-pock` — IPA `/ˈeɪ.pɒk/`; two syllables; first syllable is the spoken
   letter-name A; never pronounce a separate Y.
3. Do not change the canonical narrated spelling `ÆPOCH` in the script text.
   Apply provider-only pronunciation spelling in the ElevenLabs request. For
   `eleven_multilingual_v2`, which has no SSML/phoneme support, use the tested
   request spelling most likely to produce two syllables (begin with
   `A-pock`, not `A-Y-pock`).
4. Preserve the failed/mispronounced audition files as evidence. Do not
   overwrite them. Generate one new Bill correction sample with a distinct,
   stable filename.

## Paid call announcement and lock

Before the paid call, announce:

- tool: `elevenlabs_tts`
- provider: ElevenLabs
- model: `eleven_multilingual_v2`
- voice: Bill, with the exact account voice ID
- settings: the same approved audition settings unless a documented
  pronunciation-specific adjustment is required
- purpose: Bill-only pronunciation correction sample
- estimated cost and current project spend

No fallback is authorized. If ElevenLabs or Bill fails, stop and escalate.

## Verification

1. Verify the new file with `ffprobe` and record path, duration, model, voice
   ID, settings, request spelling, real cost, and provenance.
2. Do not claim pronunciation success from file existence. Leave the sample
   for Chris to hear and approve.
3. Refresh `checkpoint_assets.json` as `awaiting_human`, storing the corrected
   Bill sample under `metadata.partial_progress`; do not write an incomplete
   canonical `asset_manifest`.
4. Update durable knowledge, commit/push the authorized tracked changes, and
   stop.

## Hard stop

Do not generate batch narration. Do not generate images, diagrams, music,
sound effects, review stills, or any other asset. Do not author composition
code, compose, render, publish, or deploy.
