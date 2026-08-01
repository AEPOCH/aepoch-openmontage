---
type: Report
title: Phase 15 Final Renderer Hardening — TR-030 General Fix and TR-029 Resolution
status: stable
project_state: confirmed
verified:
  by: process:test-run
  at: 2026-07-31T20:30:00+01:00
sources:
  - id: remotion-render-3
    resource: ../../../tests/qa/test_11_blog_source_remotion_render.py
    title: Real Remotion render using the general TR-030 fix
  - id: staging-contract
    resource: ../../../tests/contracts/test_remotion_asset_staging_contract.py
    title: Fast regression coverage for asset staging and cut_timing_mode
  - id: prior-closure
    resource: phase-15-readiness-closure.md
    title: Prior readiness closure (superseded for local-render/real-production verdicts)
  - id: video-compose
    resource: ../../../tools/video/video_compose.py
    title: VideoCompose tool (general fix implemented here)
---

# Phase 15 Final Renderer Hardening

## Scope of this round

Per operator instruction: implement a general, production-safe TR-030 fix
in `VideoCompose._remotion_render()` (not the prior session's test-scoped
workaround); resolve TR-029 with an explicit, validated field; add
regression coverage for images/audio/video/repeated-filenames/missing-files/
cleanup/both-runtimes; rerun all Phase 15 suites; issue updated verdicts.
**This report supersedes `phase-15-readiness-closure.md` for the
local-render and real-production verdicts.**

No paid providers, no real production material, no publish, deploy, stage,
or commit at any point.

## TR-030: general fix implemented

Added `VideoCompose._stage_local_assets_for_remotion()` to
`tools/video/video_compose.py`. It:

- Scans every asset-bearing field `Explainer.tsx`'s `ExplainerProps`
  actually reads: `cuts[].source`, `cuts[].backgroundImage`,
  `cuts[].backgroundVideo`, `cuts[].images[]`, `audio.narration.src`,
  `audio.music.src`.
- Validates every local absolute-path reference up front — missing, not a
  regular file, or unreadable — and raises `RemotionAssetStagingError`
  listing **every** problem found (not just the first) before touching the
  filesystem at all.
- Stages validated assets into `remotion-composer/public/_render_staging/
  <uuid4>/`, one fresh directory per render — collision-safe across
  concurrent or repeated renders by construction.
- Names staged files with a global per-render index prefix
  (`f"{index:03d}_{name}"`), so two different source assets sharing a
  basename can never collide within one staging directory — regression
  tested directly, not just asserted by design.
- Rewrites the corresponding prop fields to `public/`-relative paths
  `staticFile()` resolves correctly.
- Returns provenance (`original_path` → `staged_path` for every staged
  asset) in the `ToolResult.data["staged_assets"]` on both success and
  failure paths.
- Is cleaned up in a `finally` block inside `_remotion_render()` —
  guaranteed on success **and** on subprocess failure, verified by driving
  the real method (subprocess mocked, everything else real) against the
  actual `remotion-composer/public/` directory. A polish pass also removes
  the shared `_render_staging/` parent once empty (via `rmdir()`, which
  only ever succeeds on an empty directory — never at risk of removing a
  concurrent render's in-progress subdirectory or any real content).

`_render()` already resolves `cuts[].source` from `asset_manifest` IDs to
real file paths before reaching `_remotion_render()` — the staging step
picks those up automatically, so callers pass asset IDs as before and get
staging for free.

## TR-029: resolved with an explicit, validated field

Added `edit_decisions.cut_timing_mode` (`"source_trim"` | `"timeline"`,
default `"source_trim"`) and `cuts[].source_in_seconds` (default `0`) to
`schemas/artifacts/edit_decisions.schema.json`.

- **`_compose()`** (FFmpeg): unchanged trim/concat behavior, now guarded —
  rejects `cut_timing_mode="timeline"` explicitly with a clear error
  instead of silently misinterpreting it. Absent the field, defaults to
  `"source_trim"`, so every existing caller (`test_08_end_to_end.py`
  included) is unaffected — verified by rerunning it unmodified.
- **`_remotion_render()`**: now **requires** `cut_timing_mode="timeline"`
  explicitly and rejects anything else (including the field being absent)
  with a clear error naming the fix (`cuts[].source_in_seconds` for the
  in-source trim start) and pointing at `edit-director.md`. No existing
  caller previously depended on the old silent behavior — Remotion had
  never successfully rendered local content before this Phase 15 work
  (TR-030's own history).
- `skills/pipelines/explainer/edit-director.md` rewritten with a new "Cut
  Timing Mode" subsection: which mode to set for which `render_runtime`,
  worked examples for both, and when to use `source_in_seconds` for a
  genuine in-source trim (e.g. seconds 30-45 of a longer interview clip
  placed at timeline position 10s-25s).

FFmpeg and Remotion can no longer silently reinterpret the same
`in_seconds`/`out_seconds` pair differently — either the mode matches what
the engine expects, or the render is rejected with a clear, actionable
error before anything is written.

## Regression coverage added

`tests/contracts/test_remotion_asset_staging_contract.py` — 16 fast,
subprocess-free-except-two tests (0.15s total):

- Staging: local video (`cuts[].source`), local image
  (`cuts[].backgroundImage`), local audio (both `audio.narration.src` and
  `audio.music.src`), and an `anime_scene`'s `images[]` list.
- No-op correctness: `http(s)://` and already-relative sources are left
  untouched and **no staging directory is created** when there's nothing
  local to stage.
- Repeated filenames: two different source directories each containing
  `clip.mp4` stage to distinct, non-colliding paths with correct,
  independently-verified content.
- Missing file: rejected clearly, nothing staged, no directory created.
- Not-a-regular-file (a directory given as the asset path): rejected
  clearly.
- Unreadable file (permission-denied): rejected clearly (skipped when
  running as root, where the check is meaningless).
- Multiple simultaneous problems: **all** are reported in one error, not
  just the first.
- Cleanup after a successful render: drives the real
  `_remotion_render()` (subprocess mocked) against the real
  `remotion-composer/public/` directory; confirms exactly one staging
  directory exists mid-render and zero remain afterward.
- Cleanup after a **failed** render: same real-method drive, subprocess
  raises `CalledProcessError`; confirms the staging directory is still
  removed.
- `cut_timing_mode` validation: Remotion rejects it missing, rejects it as
  `"source_trim"`; FFmpeg rejects it as `"timeline"`; FFmpeg's default
  (field absent) is proven to take the `source_trim` code path, not
  silently succeed for an unrelated reason.

**Both render runtimes**, real end to end, are covered by the existing slow
dry-run scripts rather than duplicated here:
`tests/qa/test_10_blog_source_production_dry_run.py` (FFmpeg,
`source_trim`, 47/0) and `tests/qa/test_11_blog_source_remotion_render.py`
(Remotion, `timeline`, now using the general fix, 28/0 — up from 24/0, four
new checks for staging/provenance/cleanup).

## Full regression sweep (all green)

```text
tests/contracts/                                       583 passed, 7 skipped
tests/qa/test_08_end_to_end.py                           38 passed, 0 failed
tests/qa/test_09_blog_source_dry_run.py                  24 passed, 0 failed
tests/qa/test_10_blog_source_production_dry_run.py       47 passed, 0 failed
tests/qa/test_11_blog_source_remotion_render.py          28 passed, 0 failed
remotion-composer: npx tsc --noEmit                      15 errors (unchanged baseline, TR-024)
```

`test_11`'s real render was independently verified via `ffprobe`
(1920x1080, 61.056s, h264/aac) and confirmed to leave zero staging
artifacts behind (`remotion-composer/public/` matches its pre-render
listing exactly).

## Updated verdicts

### Contract readiness — **PASS** (unchanged)

### Blog-adaptation quality — **PASS** (unchanged)

### Local-render readiness — **PASS** (upgraded from CONDITIONAL)

The prior CONDITIONAL verdict existed because the real Remotion render only
worked via a workaround living in the *test*, not the tool — a real
production agent following the documented `operation="render"` contract
would still have failed. That gap is closed: the fix lives in
`_remotion_render()` itself, requires no caller-side staging, validates its
inputs and rejects bad ones clearly, cleans up unconditionally, and is
regression-tested independent of the slow full-pipeline dry runs. Remaining
honest caveat, not grounds for a lower verdict: all visual/audio assets in
this round are still ffmpeg-synthesized placeholders (proves the pipe, not
creative quality), and HyperFrames remains untested.

### Real-production readiness — **NO** (blocker list shorter)

Remaining, in likely priority order:

1. Author review of this report and the prior closure report.
2. Real provider selection and cost approval for TTS/image generation.
3. Real web research to replace placeholder data points and sources.
4. A second fixture (different length/topic) for generalization confidence.
5. The unrelated README.md/diagram.png working-tree anomaly (baseline audit
   report) is still unresolved.

TR-028, TR-029, and TR-030 are now all resolved or explicitly guarded — no
open engineering blockers remain on the extraction → compose path for a
Remotion-rendered, blog-sourced explainer.

No paid call, provider generation, or public production is authorized by
this readiness phase.

## Immediate next action

Author review. With TR-028/029/030 closed, the next real step is most
likely scoping a real-production brief (real research + real provider
selection) using this fixture path as the template — pending your
authorization.
