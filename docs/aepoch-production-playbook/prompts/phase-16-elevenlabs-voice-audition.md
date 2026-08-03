# Phase 16 Handoff — ElevenLabs Voice Audition

You are continuing project `aepoch-blog-pilot-what-is-aepoch` on branch
`aepoch-series`.

Chris approved the revised scene plan on 2026-08-01. Chris selected
ElevenLabs over the provisional OpenAI path because it is the better fit for
the approved measured, warm, restrained narration and confirmed that the
previously disclosed existing recording is excluded entirely: do not locate,
scan, listen to, clone, transcribe, or use it as a reference.

This handoff authorizes a bounded ElevenLabs voice-audition tranche only. It
does not authorize batch narration or visual-asset generation.

## Read before acting

1. `AGENT_GUIDE.md`
2. `knowledge/state/current-state.md`
3. `knowledge/index.md`
4. the latest entries in `knowledge/log.md`
5. `pipeline_defs/animated-explainer.yaml`
6. `skills/meta/checkpoint-protocol.md`
7. `skills/pipelines/explainer/asset-director.md`
8. `skills/meta/voice-performance-director.md`
9. `.agents/skills/elevenlabs/SKILL.md`
10. the approved proposal, script, scene plan, active playbook, cost ledger,
    proposal/scene checkpoints, and cumulative decision log

## Record the approvals first

1. Rewrite `checkpoint_scene_plan.json` as `completed` with
   `human_approved: true`, preserving checkpoint history.
2. Run `get_next_stage()` and confirm that `assets` is next.
3. Write `checkpoint_assets.json` as `in_progress` with the voice-audition
   scope in `metadata.partial_progress`; do not write an incomplete canonical
   `asset_manifest` under `artifacts`.
4. Append a new decision-log entry using the exact existing pair:
   `category: "voice_selection"`,
   `subject: "Narration TTS provider"`.
   Select `elevenlabs_tts`, mark it `user_approved: true`, and retain the full
   history: OpenAI is superseded to fallback-only, while the existing recording
   is rejected because Chris explicitly excluded all use. Do not mutate or
   delete `d-005`, `d-012`, or `d-015`.
5. Update the downstream voice-selection fields that still claim OpenAI is the
   only configured provider. Preserve proposal history and all unrelated
   approved choices.

## Provider and model lock

- Tool: `elevenlabs_tts` through the registered OpenMontage tool path
- Provider: ElevenLabs
- Model: `eleven_multilingual_v2`
- Reason: production consistency for a measured, warm, unhurried five-minute
  narration; more voice-sensitive than the provisional OpenAI fallback
- Operation: paid sample/audition only, not batch
- Fallback: none during this tranche. If ElevenLabs fails, escalate and stop;
  do not call OpenAI or another provider.

Before each paid call, announce the exact tool, provider, model, voice name and
voice ID, settings, estimated cost, and that the call is a sample.

## Voice shortlist and samples

1. Use a read-only ElevenLabs voice-listing endpoint or supported registered
   capability to inspect the voices actually available to this account. Do not
   guess IDs from memory.
2. Shortlist 2–3 English voices whose real metadata/previews fit: measured,
   warm, conversational, unhurried documentary narration; no rising
   inflection, sales energy, theatrical gravitas, or YouTuber delivery.
3. Record the shortlist and reasons in decision/checkpoint metadata. Voice ID
   remains unresolved until Chris listens.
4. Generate one audition file per shortlisted voice using the same exact text
   passage and settings. Use the approved climax passage beginning at
   `climax-1` and continuing through the adjacent mechanism/KAIROS beat long
   enough to judge warmth, pacing, ÆPOCH pronunciation, KAIROS pronunciation,
   and sentence endings. Do not change the canonical script.
5. Start from these settings unless actual voice metadata provides a concrete
   reason to adjust, and record any adjustment:
   - `stability: 0.62`
   - `similarity_boost: 0.85`
   - `style: 0.25`
   - `speed: 0.95`
   - `use_speaker_boost: true`
   - `output_format: mp3_44100_192`
6. Apply phonetic input only in the provider request, not the canonical
   script: ÆPOCH = “AY-pock”; KAIROS = “KY-ross”. Because
   `eleven_multilingual_v2` has no SSML support, do not send SSML tags. Use
   punctuation/paragraph breaks and add precise silence later in post if
   required.
7. Save samples under
   `projects/aepoch-blog-pilot-what-is-aepoch/assets/audio/samples/` with
   stable filenames that include the voice name or ID. Verify each file with
   `ffprobe` and record duration, settings, provider/model provenance, and real
   cost.

## Budget

Keep the total audition spend at or below **$0.05** and within the already
approved $2.00 project cap. Estimate before calling. If the real estimate
would exceed $0.05, stop and ask Chris before spending.

## Sample gate and hard stop

After generating and verifying the samples:

- Write `checkpoint_assets.json` as `awaiting_human`, with no incomplete
  canonical `asset_manifest`; store the sample paths, shortlist, settings,
  costs, and listening instructions under `metadata.partial_progress`.
- Update durable knowledge and the cost ledger.
- Commit/push the authorized tracked changes and stop for Chris's voice choice.

Do not select a final voice yourself. Do not generate batch narration. Do not
generate an image sample, diagram, music, sound effect, review still, or any
other asset. Do not author composition code, compose, render, publish, or
deploy.
