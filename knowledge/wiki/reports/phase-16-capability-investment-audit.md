---
type: Report
title: Phase 16 Capability and Credit Investment Audit
status: stable
project_state: confirmed
verified:
  by: process:provider-menu-summary-and-package-audit
  at: 2026-08-01T15:05:00+01:00
sources:
  - id: registry
    resource: ../../../tools/tool_registry.py
    title: Live OpenMontage provider registry
  - id: providers
    resource: ../../operations/providers.md
    title: ÆPOCH provider register
---

# Phase 16 Capability and Credit Investment Audit

## Current strengths

- Local transcription is available through `faster-whisper==1.2.1` with
  word-level timestamp support. The registry calls the provider path
  `whisperx`, but the installed dependency is `faster-whisper`; neither the
  `whisperx` package nor OpenAI's `openai-whisper` package is installed.
- Analysis is 9/13 configured, including FFmpeg/ffprobe, local transcription,
  YouTube transcript acquisition, scene detection, and frame sampling.
- Source ingestion is 1/1 through `yt-dlp`.
- Image generation is 7/13. fal.ai plus OpenAI, Pexels, and Pixabay provide
  strong coverage; FLUX and Recraft are already suited to ÆPOCH plates.
- Video generation is 7/21, including Kling, MiniMax, Seedance, Veo, Sora,
  Pexels, and Pixabay. This is more than sufficient for experimentation, and
  generated video is not recommended for the current illustration-led pilot.
- FFmpeg and Remotion are available. HyperFrames doctor previously passed;
  current registry discovery again timed out resolving npm, so this remains a
  transient runtime-resolution watch item rather than a credit deficiency.

## Current weaknesses

- TTS is 1/7: OpenAI only.
- Music generation is 0/3.
- No local music library is authorized.
- Freesound search is unconfigured; Pixabay Music is the only search source.
- Enhancement breadth is thin (no background removal, upscale, or face
  restoration), but these are lower priority for the approved flat editorial
  illustration workflow.
- Avatar capability is 0/4 and is irrelevant to the current pilot.

## Highest-return credit investments

### 1. ElevenLabs — highest immediate leverage

One API key unlocks expressive TTS, music generation, and sound effects in the
current registry. This directly improves the weakest capability family and
gives a second narration path for sample comparison. Voice cloning or voice
conversion may only use Chris's recording with his explicit authorization.

Current official API list prices observed during the audit: Flash/Turbo TTS
`$0.05/1K characters`, Multilingual v2/v3 `$0.10/1K characters`, music
`$0.15/minute`, and sound effects `$0.12/minute`. A small pay-as-you-go balance
is enough for samples; no subscription is required for the immediate pilot.

### 2. Add modest fal.ai credit — protects the already-approved visual path

The approved proposal uses about 14 FLUX plates at roughly `$0.05/image`
(`$0.70` baseline). A small retry reserve is more valuable than adding another
image provider. Keep generated-video spending optional: premium clips can cost
orders of magnitude more than still plates and do not fit the current locked
visual direction.

### 3. Google Cloud/AI credentials — broadest optional ecosystem upgrade

Google credentials can add Chirp 3 HD TTS, Imagen, Veo direct access, Lyria
music, and Gemini media paths depending enabled APIs/account access. The
incremental value here is primarily Chirp/Lyria because fal.ai already covers
image/video. Official Chirp 3 HD list pricing observed during the audit is
`$30 per million characters` with no free usage tier shown for that SKU.

## Low-cost/free improvements before more provider spend

- Add a free Freesound API key for a second music/SFX search source.
- Pin `faster-whisper`, `yt-dlp`, and `youtube-transcript-api` in tracked setup
  dependencies so the new-machine capability is reproducible.
- Diagnose HyperFrames npm resolution separately; credits will not fix it.
- Consider Piper only as a free offline narration fallback, not as the premium
  voice path.

## Recommendation

For the current pilot, keep fal.ai funded with a small retry reserve and add a
small ElevenLabs pay-as-you-go balance only if Chris wants an expressive voice,
music, or SFX comparison. Do not buy additional video-provider access yet.
Local Whisper capability is already adequate; paid STT would add redundancy,
not solve a current blocker.
