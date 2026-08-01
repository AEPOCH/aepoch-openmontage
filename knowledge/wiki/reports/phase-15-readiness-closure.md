---
type: Report
title: Phase 15 Readiness Closure — Blog-to-Video Production Readiness
status: deprecated
project_state: superseded
superseded_by: phase-15-renderer-hardening.md
verified:
  by: process:test-run
  at: 2026-07-31T19:30:00+01:00
sources:
  - id: remotion-render
    resource: ../../../tests/qa/test_11_blog_source_remotion_render.py
    title: Real Remotion render, no ffmpeg substitution
  - id: ffmpeg-mechanics-run
    resource: ../../../tests/qa/test_10_blog_source_production_dry_run.py
    title: Full mechanics dry run (ffmpeg path)
  - id: partial-dry-run
    resource: ../../../tests/qa/test_09_blog_source_dry_run.py
    title: Extraction/research/proposal dry run
  - id: prior-verdict
    resource: phase-15-readiness-verdict.md
    title: Prior interim readiness verdict (superseded by this report)
  - id: script-rules
    resource: ../../../brands/aepoch/SCRIPT_RULES.md
    title: ÆPOCH blog-to-script adapter (Parts 2-4 rewritten this session)
---

# Phase 15 Readiness Closure

> **Superseded 2026-07-31** by
> [`phase-15-renderer-hardening.md`](phase-15-renderer-hardening.md), after
> TR-030 got a general, production-safe fix in `_remotion_render()` itself
> (this report's Remotion evidence used a test-scoped workaround) and
> TR-029 was resolved with an explicit `cut_timing_mode` field. The
> local-render and real-production verdicts below are stale — see the
> hardening report for current verdicts. Kept for history.

## Scope of this closure round

Per operator instruction, this round: (1) fixed TR-028 by rewriting
`brands/aepoch/SCRIPT_RULES.md` Parts 2-4 to match the live
`script.schema.json` field-for-field; (2) re-ran the representative fixture
through the **proposal-locked Remotion runtime for real — no ffmpeg
substitution**; (3) ran all relevant regression suites; (4) issues updated
readiness verdicts below. This report **supersedes**
`phase-15-readiness-verdict.md` for the contract, blog-adaptation, and
local-render verdicts — real-production readiness is unchanged (still NO).

No paid providers, no real production material, no publish, deploy, stage,
or commit at any point.

## What ran

```text
tests/contracts/                                    567 passed, 7 skipped
tests/qa/test_08_end_to_end.py                        38 passed, 0 failed
tests/qa/test_09_blog_source_dry_run.py               24 passed, 0 failed
tests/qa/test_10_blog_source_production_dry_run.py    47 passed, 0 failed
tests/qa/test_11_blog_source_remotion_render.py       24 passed, 0 failed  (NEW)
remotion-composer: npx tsc --noEmit                   15 errors (unchanged baseline, TR-024)
```

`test_11` is the new evidence this round: the same approved fixture, run
through extraction → research → proposal → script → scene_plan → assets →
edit → **a real `npx remotion render` subprocess** (not ffmpeg), producing a
real 1920x1080, 61.06s, h264+aac `.mp4` with a real deterministic
`final_review` built by the tool's own `_run_final_review()` — not
hand-rolled by the test.

## TR-028 fixed: SCRIPT_RULES.md now matches the live schema

Parts 2-4 rewritten field-for-field: `voice_performance` (top-level object),
per-section `delivery_cues`, `pronunciation_guides`, `source_ref`, the real
`enhancement_cues.type` enum (no `transition`), and an explicit "arc-stage
convention" section (id/label prefix, since the schema has no dedicated
`arc_stage` field). Verified by `test_10`'s script — built using exactly
these field names — validating against schema and passing all ten of Part
4's checklist items programmatically.

## Two more findings from building the real Remotion render

1. **TR-030, sub-bug, fixed:** `remotion-composer/src/Explainer.tsx`'s
   `resolveAsset()` had a regex bug that silently mis-stripped the `file://`
   prefix for POSIX absolute-path asset URIs, routing every local asset to
   a 404. Fixed and verified (regex now round-trips correctly; TypeScript
   diagnostic count unchanged from the TR-024 baseline).
2. **TR-030, deeper limitation, open:** even with that fixed,
   `@remotion/renderer`'s own asset-download step rejects `file://` sources
   outright, and a bare absolute path also fails (404 via the dev server).
   There is currently **no supported way for `_remotion_render()` to serve
   an arbitrary local absolute-path asset** in its default, documented
   `operation="render"` flow. `test_11` proved a real Remotion render is
   otherwise fully capable — by staging assets into a project-scoped
   subdirectory of `remotion-composer/public/` (the same convention already
   used for episode-scoped assets there) and cleaning up afterward — but
   that staging happened in the *test*, not in `_remotion_render()` itself.
   **A real production agent calling `operation="render"` today, without
   pre-staging local assets, would still fail.** This is the single most
   significant open blocker to real-production readiness. A proper general
   fix (auto-stage + `--public-dir`, mirroring `_render_via_atelier`'s
   existing `public_dir` pattern) was deliberately not implemented this
   session: it touches shared render infrastructure used by every pipeline,
   not just blog-sourced explainers, and exceeds "smallest repair" scope
   for an unattended session — left for a scoped decision with the author.

Also documented (not code-fixed, found while building the real render):
**TR-029** — `cuts[].in_seconds`/`out_seconds` mean an in-source trim range
under FFmpeg but an absolute timeline position under Remotion. Both
conventions are now proven correct for their respective engine
(`test_10` vs. `test_11`), but the field pair itself is not documented as
having two meanings anywhere, which could trip up a future agent building
`edit_decisions` by hand for the wrong engine.

## Updated verdicts

### Contract readiness — **PASS** (unchanged)

Every canonical artifact validates against its live schema. Checkpoint/resume
mechanics proven correct in both directions (TR-027/ADR-025). All five
zero-cost regression suites green, including the new real-Remotion run.

### Blog-adaptation quality — **PASS** (upgraded from CONDITIONAL PASS)

TR-028 — the one open item behind the prior CONDITIONAL verdict — is
resolved: `SCRIPT_RULES.md` now matches the live schema exactly, and the
script built against it satisfies every substantive Part 4 requirement
programmatically (word count, cue density, five-stage arc, voice
performance, pronunciation-on-first-use, claim traceability, hook/landing
rules, all five protected fields verbatim end to end). Residual context, not
grounds for a lower verdict: still one fixture, one hand-authored pass, not
yet reviewed by the author, and research content is dry-run placeholder —
these are real-production-readiness items, not adaptation-*mechanism*
defects.

### Local-render readiness — **CONDITIONAL** (evidence substantially strengthened, verdict unchanged)

The proposal-locked Remotion runtime **can** render this content correctly
end to end — proven for real this round, with no runtime swap and a
genuine, tool-generated `final_review` (technical_probe, visual_spotcheck
with 4 real sampled frames and no black frames, subtitle_check, all
passing). This is a materially stronger result than the prior round's
ffmpeg-only mechanics evidence.

Still CONDITIONAL, not PASS, because: (a) that render only succeeded after
this session's out-of-band asset-staging workaround (TR-030) — the
documented, default `operation="render"` path does not yet work out of the
box for local absolute-path assets, which is the common case for
locally-generated TTS/image/video; (b) HyperFrames remains entirely
untested; (c) all visual/audio assets are still ffmpeg-synthesized
placeholders (proves the pipe, not visual or narration quality).

### Real-production readiness — **NO** (unchanged; blocker list narrower and sharper)

Still requires, in likely priority order:

1. **TR-030's general fix** — `_remotion_render()` needs to serve local
   absolute-path assets without manual pre-staging, or every real
   locally-generated-asset production hits this wall.
2. Author review of this closure report and both dry-run reports.
3. Real provider selection and cost approval for TTS/image generation
   (2/7 TTS, 7/13 image providers configured as of the 2026-07-31 baseline
   audit — re-check before a real proposal).
4. Real web research to replace placeholder data points and sources.
5. A second fixture (different length/topic) to build confidence this
   isn't overfit to one short article.
6. The unrelated README.md/diagram.png working-tree anomaly (baseline audit
   report) is still unresolved.

TR-028 (SCRIPT_RULES.md) and the "has Remotion ever actually rendered this
content" question are both now closed — that is the concrete progress this
round made against the prior blocker list.

No paid call, provider generation, or public production is authorized by
this readiness phase.

## Immediate next action

Author review of this report. The highest-leverage next step is almost
certainly TR-030's general fix (it blocks every real local-asset Remotion
production, not just blog-sourced ones) — recommend scoping that as its own
piece of work before authorizing a real-production brief.
