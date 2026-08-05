# Phase 17 — What is ÆPOCH? V2 Script Gate

## Human approval

Chris explicitly replied **“approved”** to the V2 proposal gate on 2026-08-05.
Record that approval for:

- Concept C1, `Editorial Human Systems`
- Remotion render runtime
- Atelier composition mode
- Recraft V4 editorial masters plus Flux Kontext reference-conditioned work
- The $3.00 budget ceiling (no spend is authorized during this script stage)
- Preserving Chris's original narration and creating only a local mastered
  derivative later

The optional ElevenLabs music line remains an option for the later asset gate,
not authorization to generate music now.

## Direct execution

- Read `AGENT_GUIDE.md` completely before acting.
- Work directly; do not delegate or use subagents/background tasks.
- Read the animated-explainer manifest, checkpoint protocol, script director,
  voice-performance director, active ÆPOCH playbook/visual language, and script
  schema before editing artifacts.
- Operate only in `projects/aepoch-blog-pilot-what-is-aepoch-v2/`.
- Validate every modified artifact.
- No paid provider call, media generation, audio processing, or composition.
- Use only the manifest-defined script gate. Invent no extra approval gate.

## Proposal approval record

Update the proposal artifact, proposal checkpoint, and append-only decision log
so Backlot records Chris's explicit approval. Do not rewrite earlier decision
history; append or update only as the repository's canonical checkpoint and
decision-log rules require.

## Script-stage instruction

Create a fresh V2 `script.json` from the approved source extraction, research,
proposal, and the actual human narration transcript/alignment. The artifact must
be canonical and schema-valid.

Important distinction: V1's script artifact is rejected as a creative planning
artifact, but Chris's recorded narration remains the approved performance
source. Therefore rebuild the script artifact from the actual words Chris
recorded rather than copying V1's provisional timing or inventing replacement
dialogue that no longer matches the audio.

Preserve the source-authoritative central question, key takeaway, ÆPOCH reframe,
human consequence, and closing statement. Preserve Chris's two acknowledged
spoken stumbles (“What if the one resource” and “How Loud”) as the actual audio
record unless a later explicit audio-edit decision changes them.

Requirements:

- Use the real word-level alignment/timestamps where available, not estimated
  word-rate timing.
- Structure the narration into substantial editorial sections suitable for
  **12–16 visual story beats**, not V1's 32 micro-scenes.
- Enhancement cues must describe meaningful human situations, relationships,
  systems, or consequences—never generic isolated icons as primary coverage.
- Every primary visual cue must be capable of passing: “Can a viewer state the
  idea without captions?”
- Add a concrete top-level `voice_performance` plan reflecting the existing
  human performance and later mastering needs. Section delivery cues describe
  the observed/desired performance but must not imply TTS will be generated.
- Include pronunciation guides for ÆPOCH and Kairos using the settled human
  pronunciations where those words actually occur.
- Keep all claims traceable to the carried source extraction/research.
- Self-review against the script director's rubric and record review evidence.

## Required terminal state

Before returning, verify:

1. Proposal checkpoint is completed and human-approved.
2. `artifacts/script.json` exists and validates.
3. `checkpoint_script.json` exists with `status: awaiting_human` and
   `human_approved: false`.
4. Backlot shows the script gate awaiting human review.
5. No scene-plan or downstream checkpoint/artifact exists.
6. No paid call or media generation occurred.

Then stop. Return exact paths, validation evidence, word count/runtime summary,
and the Backlot gate state only.
