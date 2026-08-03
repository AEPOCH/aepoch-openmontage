# Phase 16 Handoff — Bill KAIROS Pronunciation Correction

You are continuing project `aepoch-blog-pilot-what-is-aepoch` on branch
`aepoch-series`.

Chris confirms that the Bill correction sample now pronounces ÆPOCH correctly.
The same sample exposed a second pronunciation defect that Chris missed in the
first audition: KAIROS is exactly two syllables, **KYE-rohs**, IPA
**`/ˈkaɪ.roʊs/`**. “Kye” rhymes with “fry,” with a K at the beginning; “rohs”
rhymes with “gross,” without the G. The current `KY-ross` guide has the wrong
second vowel.

This is a Bill-only KAIROS correction and sample recheck. It does not authorize
batch narration or visual generation.

## Read before acting

Read `AGENT_GUIDE.md`, the latest durable state/log, the approved script and
voice-performance plan, the current assets checkpoint and Bill sample
evidence, `skills/pipelines/explainer/asset-director.md`,
`skills/meta/voice-performance-director.md`, and
`.agents/skills/elevenlabs/SKILL.md`.

## Required corrections

1. Preserve Bill (`pqHfZKP75CvOlQylNhV4`) as the selected voice and preserve
   both earlier Bill files as immutable comparison evidence.
2. Correct every **active** KAIROS pronunciation guide from `KY-ross` to an
   unambiguous guide:
   `KYE-rohs` — IPA `/ˈkaɪ.roʊs/`; exactly two syllables; “kye” rhymes with
   “fry” and “rohs” rhymes with “gross”; never use the short `ross` vowel.
   This includes the script artifact's `pronunciation_guides`, its active
   `kairos_naming_note`, and `brands/aepoch/SCRIPT_RULES.md`'s pronunciation
   reference table.
3. Do not rewrite historical `knowledge/log.md` entries that accurately record
   what earlier prompts and failed samples used. Append a superseding entry.
4. Do not change the canonical narrated spelling `KAIROS` or `ÆPOCH` in script
   text. Apply provider-only spelling in the ElevenLabs request. With
   `eleven_multilingual_v2`, use `KYE-rohs` in the request, while retaining the
   now-successful `A-pock` spelling for ÆPOCH.
5. Generate one new Bill sample using the same passage and settings as the
   successful ÆPOCH correction sample. Save it with a distinct stable filename
   such as `_pronunciation-fix-2.mp3`; never overwrite fix 1.

## Paid call announcement and lock

Before the paid call, announce:

- tool: `elevenlabs_tts`
- provider: ElevenLabs
- model: `eleven_multilingual_v2`
- voice: Bill (`pqHfZKP75CvOlQylNhV4`)
- settings: identical to the prior Bill correction sample
- provider request spellings: ÆPOCH = `A-pock`; KAIROS = `KYE-rohs`
- purpose: Bill-only KAIROS pronunciation correction sample
- registered estimated cost, monthly-quota impact, and current project budget

No fallback is authorized. If ElevenLabs or Bill fails, stop and escalate.

## Verification and hard stop

1. Verify the new file with `ffprobe` and record path, duration, model, voice
   ID, settings, request spellings, cost/quota effect, and provenance.
2. Do not claim pronunciation success from file existence. Chris must listen
   and approve both words in the new sample.
3. Refresh `checkpoint_assets.json` as `in_progress` with the new sample and
   listening instructions under `metadata.partial_progress`. The known
   checkpoint-contract gap prevents a truthful `awaiting_human` assets
   checkpoint before a complete `asset_manifest`; do not fabricate one.
4. Update durable knowledge, commit/push the authorized tracked changes, and
   stop.

Do not generate batch narration. Do not generate images, diagrams, music,
sound effects, review stills, or any other asset. Do not author composition
code, compose, render, publish, or deploy.
