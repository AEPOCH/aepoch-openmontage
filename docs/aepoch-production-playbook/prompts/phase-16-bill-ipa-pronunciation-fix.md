# Phase 16 Handoff — Bill IPA Pronunciation Correction

You are continuing project `aepoch-blog-pilot-what-is-aepoch` on branch
`aepoch-series`.

Chris rejected the latest Bill correction because `eleven_multilingual_v2`
interpreted the provider spelling `KYE-rohs` as letters and produced
“Kai-Y-E-ross.” Chris explicitly approved switching this pronunciation sample
to ElevenLabs `eleven_flash_v2_5` so both locked terms can use IPA phoneme
tags instead of ambiguous English respelling.

This is a Bill-only, one-sample model/pronunciation correction. It does not
authorize batch narration or visual generation.

## Read before acting

Read `AGENT_GUIDE.md`, the latest durable state/log, the approved script and
voice-performance plan, the current assets checkpoint and all Bill sample
evidence, `skills/pipelines/explainer/asset-director.md`,
`skills/meta/voice-performance-director.md`, and
`.agents/skills/elevenlabs/SKILL.md`.

## Decision and evidence rules

1. Preserve Bill (`pqHfZKP75CvOlQylNhV4`) as the selected voice.
2. Preserve every prior audition/correction file and its recorded failure as
   immutable evidence. Do not overwrite, rename, or delete them.
3. Append the model change to the decision history under the same relevant
   voice/model subject. Do not mutate the earlier
   `eleven_multilingual_v2` entries. Record that Chris approved the switch
   specifically because phonetic respelling produced a three-part
   “Kai-Y-E-ross” defect.
4. Keep the canonical script spellings `ÆPOCH` and `KAIROS` unchanged. Active
   human-readable pronunciation guides remain:
   - ÆPOCH: `A-pock`, IPA `/ˈeɪ.pɒk/`, exactly two syllables
   - KAIROS: `KYE-rohs`, IPA `/ˈkaɪ.roʊs/`, exactly two syllables

## Provider/model lock

- Tool: registered `elevenlabs_tts`
- Provider: ElevenLabs
- Voice: Bill (`pqHfZKP75CvOlQylNhV4`)
- Model: `eleven_flash_v2_5`
- Operation: one paid pronunciation-correction sample only
- Output: `mp3_44100_128` (the account-supported format)
- Fallback: none

Use explicit SSML phoneme tags in the provider request wherever the terms
occur:

```xml
<phoneme alphabet="ipa" ph="ˈeɪ.pɒk">ÆPOCH</phoneme>
<phoneme alphabet="ipa" ph="ˈkaɪ.roʊs">KAIROS</phoneme>
```

Do not substitute `AY-pock`, `A-Y-pock`, `KY-ross`, `KYE-rohs`, or another
invented respelling in this provider request. Do not include slash delimiters
inside the `ph` attribute. Keep all non-pronunciation text identical to the
latest Bill comparison passage.

Retain the prior Bill voice settings if supported by Flash:

- `stability: 0.62`
- `similarity_boost: 0.85`
- `style: 0.25`
- `speed: 0.95`
- `use_speaker_boost: true`

If the registered tool or provider rejects the phoneme tags or model/settings,
stop and report the exact error. Do not retry with a guessed spelling, change
models again, or fall back to another provider.

## Paid-call announcement

Before the call, announce the exact tool, provider, model, Bill voice ID,
settings, both IPA values, sample purpose, registered estimated cost,
monthly-quota impact, and remaining project budget.

## Verification and hard stop

1. Save the result as a new stable file such as
   `climax-audition_bill_pqHfZKP75CvOlQylNhV4_pronunciation-fix-3-flash.mp3`.
2. Verify it with `ffprobe` and record path, duration, format, model, voice ID,
   settings, exact IPA request tags, cost/quota effect, and provenance.
3. Do not infer pronunciation success from file existence. Chris must listen
   and approve both ÆPOCH and KAIROS.
4. Refresh `checkpoint_assets.json` as `in_progress` with the sample and
   listening instructions under `metadata.partial_progress`; do not fabricate
   an incomplete `asset_manifest` to force `awaiting_human`.
5. Update durable knowledge, commit/push the authorized tracked changes, and
   stop.

Do not generate batch narration. Do not generate images, diagrams, music,
sound effects, review stills, or any other asset. Do not author composition
code, compose, render, publish, or deploy.
