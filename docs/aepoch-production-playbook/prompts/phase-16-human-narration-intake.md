# Phase 16 Handoff — Chris Human Narration Intake and Timing Review

You are continuing project `aepoch-blog-pilot-what-is-aepoch` on branch
`aepoch-series`.

Chris recorded a new narration after the approved script was complete and
explicitly selected it as the final narration source:

`projects/aepoch-blog-pilot-what-is-aepoch/assets/audio/chris/chrisnarration.mp4`

This is not the previously disclosed recording that Chris excluded. It is a
new, purpose-recorded performance of the approved script. The MP4 is a source
container with H.264 video plus AAC 48 kHz stereo audio, duration 269.291s.
Use its audio only; preserve the original file unchanged.

This handoff authorizes human-narration intake, validation, transcription,
script comparison, and proposed timing alignment only. It does not authorize
visual generation or composition.

## Read before acting

1. `AGENT_GUIDE.md`
2. `knowledge/state/current-state.md`
3. `knowledge/index.md`
4. the latest entries in `knowledge/log.md`
5. `pipeline_defs/animated-explainer.yaml`
6. `skills/meta/checkpoint-protocol.md`
7. `skills/pipelines/explainer/asset-director.md`
8. `.agents/skills/ffmpeg/SKILL.md`
9. `.agents/skills/video-understand/SKILL.md`
10. `knowledge/production/pipeline.md`, especially Gate 4 — Timing lock
11. the approved script, scene plan, human-readable narration script, current
    assets checkpoint, cost ledger, and cumulative decision log

## Record the revised voice decision

Append a new decision-log entry using the exact existing pair:

- `category: "voice_selection"`
- `subject: "Narration TTS provider"`

Select `human_narration` and mark it `user_approved: true`. Explain that the
subject name is retained to supersede the earlier provider decision on the
board. Record ElevenLabs, OpenAI, and the earlier excluded recording in
`options_considered`; ElevenLabs is rejected for production after the
documented pronunciation failures, OpenAI was only provisional, and the
earlier recording remains excluded. Do not mutate or delete historical
decision entries. Distinguish the new `chrisnarration.mp4` clearly from the
earlier excluded recording.

Update downstream active voice-selection fields that still describe
ElevenLabs as the production path, preserving proposal and decision history.

## Preserve and inspect the source

1. Record source path, checksum, container/stream metadata, duration, and
   modification time before any derived work.
2. Do not alter, rename, normalize, trim, or overwrite `chrisnarration.mp4`.
3. Ignore the H.264 video stream for production. Do not extract frames or use
   the image as a visual asset.
4. Use FFmpeg to extract a deterministic analysis/master WAV at 48 kHz mono
   PCM (`pcm_s16le`) under `assets/audio/chris/`, with a distinct filename.
   This is a derived file; do not claim that conversion improves the source's
   original AAC fidelity.
5. Verify the WAV with `ffprobe` and checksum it.
6. Analyze—not modify—integrated loudness, true/sample peak where available,
   leading/trailing silence, long pauses, clipping, and obvious channel issues.
   Do not normalize, denoise, compress, gate, EQ, trim, or speed-change yet.

## Local transcription and alignment

1. Use the registered local `transcriber` tool with `faster-whisper`, model
   `small`, CPU, `int8`, English, and word timestamps. No cloud transcription
   or paid call is authorized.
2. Save the raw transcription result, segments, and flat word timestamps under
   `assets/audio/chris/` with stable JSON filenames.
3. Compare the transcript against the canonical 17-section approved script.
   Produce a human-readable deviation report covering omissions, additions,
   repeated lines, pickups, wording changes, false starts, and substantial
   pauses. Treat expected ASR spelling errors for ÆPOCH/KAIROS as recognition
   uncertainty, not proof that Chris spoke them incorrectly.
4. Align the approved canonical words to the recording's timestamps. Preserve
   both raw ASR output and the reconciled canonical word-timestamp map; never
   silently rewrite ASR evidence.
5. Produce a proposed section timing map from the real performance, plus total
   narration duration and the remaining hold within the approved 280-second
   video target.
6. Do not silently rewrite the approved script or scene plan to match the
   recording. If the spoken performance materially differs, stop and present
   the deviations for Chris's decision. If differences are only ASR noise,
   punctuation, or non-semantic delivery variation, say so with evidence.

## Quality and scope checks

- Confirm the audio is intelligible and technically usable.
- Confirm whether the performance can fit the 280-second project target
  without time compression. The source duration is 269.291s, leaving about
  10.709s, but use detected speech boundaries rather than container duration
  alone.
- Do not approve pronunciation by transcript spelling alone.
- Do not create a complete `asset_manifest` while visual assets remain absent.
- Keep `checkpoint_assets.json` `in_progress` and update
  `metadata.partial_progress` with source/derived paths, checksums, technical
  analysis, transcript/alignment paths, deviations, timing proposal, and the
  exact next review action.

## Close and hard stop

Update durable knowledge, commit/push the authorized tracked changes, and stop
for Chris and Monty's narration/timing review.

Do not generate TTS, images, diagrams, music, sound effects, review stills, or
any other asset. Do not author composition code. Do not modify the approved
scene plan, compose, render, publish, or deploy.
