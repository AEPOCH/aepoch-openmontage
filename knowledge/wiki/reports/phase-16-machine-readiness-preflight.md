---
type: Report
title: Phase 16 New-Machine Readiness Preflight
status: stable
project_state: confirmed
verified:
  by: process:phase-16-machine-readiness-preflight
  at: 2026-08-01T12:56:20+01:00
sources:
  - id: claude-readiness-report
    resource: ../../../docs/aepoch-production-playbook/prompts/phase-16-what-is-aepoch-real-blog-pilot.md
    title: Phase 16 execution contract and operator-reported Claude readiness results
  - id: phase-15-baseline
    resource: phase-15-renderer-hardening.md
    title: Phase 15 renderer-hardening baseline
  - id: pipeline-manifest
    resource: ../../../pipeline_defs/animated-explainer.yaml
    title: Animated explainer pipeline manifest
---

# Phase 16 New-Machine Readiness Preflight

## Scope

Claude executed the bounded new-machine bootstrap and Phase 16 capability
preflight authorized by Chris and scoped by the executive producer. No paid
provider calls, Phase 16 workspace initialization, live-blog extraction,
benchmark-video analysis, production assets, publish, deploy, or commit were
performed.

Existing modified and untracked working-tree files were reported unchanged.
The copied `.env` remained mode `600`, owned by `chris`, and Git-ignored; no
credential values were recorded.

## Environment restored

- Python virtual environment created with Python 3.14.4.
- `requirements.txt` and `requirements-dev.txt` installed successfully.
- `faster-whisper==1.2.1`, `yt-dlp`, and `youtube-transcript-api` installed
  explicitly because they are not tracked by the current requirement files.
- `remotion-composer` dependencies restored deterministically with `npm ci`.
- Node 24.18.1, npm 11.16.0, FFmpeg/ffprobe 8.0.1-3ubuntu2, Remotion 4.0.484,
  and HyperFrames 0.7.87 reported available.
- HyperFrames doctor exited successfully. The earlier npm-resolution warning
  did not recur and is treated as a transient prior condition.

## Verification results

```text
tests/contracts/                                      642 passed, 7 skipped
tests/qa/test_08_end_to_end.py                          38 passed, 0 failed
tests/qa/test_09_blog_source_dry_run.py                 24 passed, 0 failed
tests/qa/test_10_blog_source_production_dry_run.py      47 passed, 0 failed
tests/qa/test_11_blog_source_remotion_render.py         28 passed, 0 failed
remotion-composer: npx tsc --noEmit                     15 errors (unchanged baseline)
```

The real Remotion QA run produced a 1920x1080, 61.06-second H.264/AAC render
with automatic local-asset staging and cleanup and no runtime substitution.
This reproduces the Phase 15 engineering baseline on the new machine.

One stale, Git-ignored directory under
`remotion-composer/public/_render_staging/` was removed because it violated
two contract-test preconditions. The directory was reported as residue from
an interrupted prior render, not a tracked-code regression.

## Current capability envelope

- Composition runtimes: FFmpeg, Remotion, and HyperFrames available.
- Analysis: 8/13 configured.
- Source ingest: 1/1 configured (`yt-dlp`).
- Image generation: 7/13 configured.
- Video generation: 7/21 configured.
- TTS: 1/7 configured (OpenAI).
- Music generation: 0/3 configured.
- Music search: 1/2 configured (Pixabay Music).
- Music library: 0/1; no local `music_library/` exists.
- Video post: 9/9 configured.

The remaining registry runtime warning is the informational ComfyUI VRAM
floor note. Core local reference-analysis capabilities were reported ready:
source download, transcript fetch/transcription, scene detection, and frame
sampling.

## Disclosed deviations and risks

1. **Python 3.14 deviation:** the Phase 15 environment used the documented
   Python 3.10 path. No Python 3.10-3.13 interpreter, pyenv, or uv was present
   on the new host. Python 3.14 satisfies the repository's `>=3.10` tooling
   gate and all dependencies/tests passed, but it remains a platform deviation
   to watch rather than an established project baseline.
2. **Unpinned operational dependencies:** `faster-whisper`, `yt-dlp`, and
   `youtube-transcript-api` require direct installation and will not be
   restored by the tracked requirements alone. This is a reproducibility
   maintenance item, not a blocker to the authorized Phase 16 tranche.
3. **YouTube runtime caveat:** Deno is absent. Claude reported that yt-dlp's
   YouTube-specific extraction path may require it. Benchmark acquisition must
   be proven with a real zero-cost download before reference analysis is called
   ready; any failure is a stop-and-report blocker, not permission to install a
   system runtime or silently skip analysis.
4. **Thin audio capability:** only one TTS provider is configured, no music
   generator is configured, and no local music library exists. Proposal must
   disclose these constraints and offer available alternatives. No audio
   provider or music choice may be locked without Chris's approval.

## Readiness verdict

- New-machine engineering baseline: **PASS**.
- Local composition runtime readiness: **PASS** for FFmpeg, Remotion, and
  HyperFrames discovery; runtime selection remains an explicit proposal gate.
- Phase 16 pre-production readiness: **PASS WITH WATCH ITEMS** for extraction,
  verification/enrichment, benchmark acquisition/analysis, and proposal.
- Paid generation and full production: **NOT AUTHORIZED**.

## Next action

Authorize Claude to initialize a new Phase 16 project workspace, record the
fresh preflight, and execute the live-blog `extraction` stage only. Because
`pipeline_defs/animated-explainer.yaml` marks extraction as
`human_approval_default: true`, Claude must produce the schema-valid
`source_extraction`, write the extraction checkpoint as `awaiting_human`,
update the knowledge tree, and stop for Chris. Verification/enrichment,
benchmark-video analysis, research, and proposals remain the following
authorized scope but cannot begin until Chris approves the extraction gate.
