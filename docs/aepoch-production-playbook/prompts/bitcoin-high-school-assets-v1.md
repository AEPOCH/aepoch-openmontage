# Bitcoin for High School Students — Assets V1

## Authorization

Chris approved Scene Plan V2 in Backlot/chat on 2026-08-04. Monty independently reviewed Scene Plan V2 run `run-20260804T120145Z-322b27` and marked it `pass`.

Advance **only the `assets` stage** of the existing animation-pipeline project:

- Project: `projects/bitcoin-for-high-school-students`
- Approved scene plan: `projects/bitcoin-for-high-school-students/artifacts/scene_plan.json`
- Approved script: `projects/bitcoin-for-high-school-students/artifacts/script.json`
- Approved TTS provider/model/voice: ElevenLabs `eleven_multilingual_v2`, Rachel `21m00Tcm4TlvDq8ikWAM`
- Approved voice settings from Sample V1: stability `0.6`, similarity boost `0.85`, style `0.25`, speed `1.0`
- Approved hook take: `projects/bitcoin-for-high-school-students/assets/audio/sample_narration.mp3`
- Approved images: the two Sample V1 hero images
- Approved music: existing Pixabay track
- Asset-stage paid-media cap: **$0.25**
- Full-production remaining media ceiling before this stage: **$4.7978**

## Paid call announcement and limit

Exactly one paid batch generation call is authorized:

- Tool path: `tts_selector`
- Provider: ElevenLabs
- Model: `eleven_multilingual_v2`
- Voice: Rachel (`21m00Tcm4TlvDq8ikWAM`)
- Operation: one continuous narration continuation take for script beats 2–6
- Expected cost: approximately `$0.10–$0.15`
- Hard stage cap: `$0.25`

Do not make a second TTS generation call automatically. If the first call has a technical, pronunciation, pacing, or duration defect, preserve the evidence, checkpoint the stage as blocked/failed as appropriate, and report it for human direction. Do not switch provider/model/voice.

No image, video, music, SFX, or other paid generation call is authorized. The previously approved sample satisfies the mandatory voice/visual sample gate.

## Required reading

Read, in focused order:

1. `AGENT_GUIDE.md`
2. `pipeline_defs/animation.yaml` — assets stage and locked decisions
3. `skills/pipelines/animation/asset-director.md`
4. `skills/meta/voice-performance-director.md`
5. `skills/meta/animation-runtime-selector.md`
6. `skills/meta/reviewer.md`
7. `skills/meta/checkpoint-protocol.md`
8. `schemas/artifacts/asset_manifest.schema.json`
9. `projects/bitcoin-for-high-school-students/artifacts/script.json`
10. `projects/bitcoin-for-high-school-students/artifacts/scene_plan.json`
11. `projects/bitcoin-for-high-school-students/artifacts/proposal_packet.json`
12. `projects/bitcoin-for-high-school-students/checkpoint_scene_plan.json`
13. `.agents/skills/elevenlabs/SKILL.md`
14. `.agents/skills/speech-to-text/SKILL.md`
15. `.agents/skills/remotion/SKILL.md`
16. `.agents/skills/ffmpeg/SKILL.md`

Before calling `tts_selector`, inspect its live registry contract and `agent_skills`; do not guess the parameter schema. Use the selector, not a direct provider import or ad-hoc API script.

## State transition

Record Chris's Scene Plan V2 approval through the normal checkpoint and decision history without erasing prior history. Then enter assets.

## Narration work

Construct one continuous provider text from the approved `provider_text` values for script sections `beat-2-ledger` through `beat-6-close`, in order. Use punctuation/paragraph breaks only; `eleven_multilingual_v2` does not support SSML breaks.

Generate exactly one file:

`projects/bitcoin-for-high-school-students/assets/audio/narration_beats2-6.mp3`

Then:

1. Verify codec, duration, sample rate, channels, and non-silence with local tools.
2. Transcribe it locally using the existing `transcriber`/Whisper path with word-level timestamps. Do **not** use a paid ElevenLabs Scribe call.
3. Save the transcript/timing artifact under `projects/bitcoin-for-high-school-students/assets/audio/`.
4. Compare the transcript against the exact approved narration. Treat omissions, substitutions that change meaning, or mispronunciations as a failed asset—not a reason for an unauthorized second call.
5. Confirm the performance remains warm, calm, clear, and patient, with no hype.
6. Assemble a local full-narration review file from the approved hook take, the planned inter-beat silence, and this continuation take using registered/local FFmpeg tooling. Do not alter the original takes.
7. Save the review file as `projects/bitcoin-for-high-school-students/assets/audio/narration_full_review.mp3` and record its exact construction/timing.

## Deterministic visual assets

Create the locally authored SVG/vector ingredients required by Scene Plan V2 under a clear canonical assets subdirectory. These are deterministic local files, not provider-generated images:

- four clearly readable computer/network-node icons,
- signature ink flourish,
- ledger page primitive usable for fan and stack,
- checkmark stamp,
- three independently controllable institution icons: school office, bank, generic company,
- cross-out mark,
- designed-label style specification if represented as a file/token artifact.

Requirements:

- approved navy/cream/glow palette and common line weight,
- transparent backgrounds where appropriate,
- true 9:16 safe-frame compatibility,
- no glowing coins, chain links, mining rigs, price charts, Satoshi portraits, or pizza imagery,
- inspect the SVGs for valid XML/viewBox and produce a contact-sheet or deterministic preview image under the project for Backlot/human review,
- do not author the final Remotion composition in this stage.

## Reused assets

Manifest and verify the existence/provenance of:

- Sample V1 hook narration,
- Sample V1 lunch-tray/phone image,
- Sample V1 shared-ledger image,
- approved Pixabay music track,
- newly generated continuation narration,
- locally assembled full-narration review track,
- all local vector/SVG ingredients.

Every asset path in the manifest must exist. Record the approved sample path/settings in each narration asset's `voice_performance` metadata.

## Deliverables and gate

1. Write schema-valid `projects/bitcoin-for-high-school-students/artifacts/asset_manifest.json`.
2. Include all required `layer3_skills_read` metadata.
3. Record exact paid cost and updated remaining full-production ceiling.
4. Self-review against every assets-stage review focus and success criterion, maximum two rounds.
5. Write `checkpoint_assets.json` as `awaiting_human`, `human_approved: false`, with the canonical artifact attached.
6. Keep Backlot events/state current.
7. Report the continuation duration, full-review duration, transcription match, SVG count, preview path, total asset-stage spend, and remaining ceiling.

## Hard stop

Stop at the assets human gate. Do not begin edit, compose, render, or publish. Do not make any generation call beyond the single authorized ElevenLabs continuation call.
