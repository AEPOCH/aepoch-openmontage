---
type: Report
title: Phase 15 Readiness Verdict — Blog-to-Video Production Readiness
status: deprecated
project_state: superseded
superseded_by: phase-15-readiness-closure.md
verified:
  by: process:test-run
  at: 2026-07-31T18:20:00+01:00
sources:
  - id: full-dry-run
    resource: ../../../tests/qa/test_10_blog_source_production_dry_run.py
    title: Full blog-source dry run, extraction through compose
  - id: partial-dry-run
    resource: ../../../tests/qa/test_09_blog_source_dry_run.py
    title: Extraction/research/proposal dry run
  - id: contract-audit
    resource: phase-15-baseline-contract-audit.md
    title: Phase 15 baseline and contract audit
  - id: partial-dry-run-report
    resource: phase-15-blog-dry-run-results.md
    title: Phase 15 blog dry run results (extraction/research/proposal)
---

# Phase 15 Readiness Verdict

> **Superseded 2026-07-31** by
> [`phase-15-readiness-closure.md`](phase-15-readiness-closure.md), after
> TR-028 was fixed and a real Remotion render (no ffmpeg substitution) was
> produced. The contract/blog-adaptation/local-render verdicts below are
> stale — see the closure report for current verdicts. Kept for history.

## Scope of this verdict

The representative fixture (`tests/fixtures/blog/authoritative-source.md`) has
now been run **end to end through extraction, source-authoritative research,
proposal, script, scene_plan, local/zero-cost assets, edit, and compose**,
producing a real rendered `.mp4`, a real deterministic `final_review`, and a
real `render_report` — all validated against their live schemas, all via
`tests/qa/test_10_blog_source_production_dry_run.py` (47/47 checks passed).
This extends the earlier extraction/research/proposal-only run
(`test_09_blog_source_dry_run.py`, 24/24 passed,
`phase-15-blog-dry-run-results.md`).

Stopped **before `publish`**, as instructed. No paid calls, no model
downloads, no external writes, no real production material at any point in
either run.

## Verdict: Contract readiness — **PASS**

Every canonical artifact produced (`source_extraction`, `research_brief`,
`proposal_packet`, `decision_log`, `script`, `scene_plan`, `asset_manifest`,
`edit_decisions`, `render_report`, `final_review`) validates against its live
schema in `schemas/artifacts/`. Checkpoint/resume mechanics
(`get_next_stage`, `get_completed_stages`) are now verified correct in both
directions: the conditional `extraction` stage being legitimately skipped
(non-blog runs, `test_08_end_to_end.py`) and legitimately completed
(blog-sourced runs, `test_09`/`test_10`) — see ADR-025/TR-027. Full
regression suite green throughout this session:

```text
tests/contracts/            567 passed, 7 skipped
tests/qa/test_08_end_to_end.py     38 passed, 0 failed
tests/qa/test_09_blog_source_dry_run.py            24 passed, 0 failed
tests/qa/test_10_blog_source_production_dry_run.py  47 passed, 0 failed
```

## Verdict: Blog-adaptation quality — **CONDITIONAL PASS**

The substantive requirements of `brands/aepoch/SCRIPT_RULES.md` were
verified **programmatically**, not just by inspection, against the actual
script produced:

- Word count (144 actual vs. 144 target at 2.4 wps) within ±10%.
- 8 enhancement cues across 60s, max gap 12s (target 8–10s window).
- Five-stage arc (hook → setup → build → build → climax → landing) present,
  in order, no timeline gaps.
- `voice_performance` carries concrete pacing/pause/emphasis and a
  `sample_section_id`; every section carries ≥2 concrete `delivery_cues`.
- `AEPOCH` pronunciation guide (`AY-pock`, matching SCRIPT_RULES.md's
  reference table) attached at its first use, in the climax section only —
  hook/setup/build never name it, per rule 8.
- Every `claim_inventory` entry traces to a section via `source_ref`.
- Landing ends with `episode.closing_statement` verbatim, unchanged, no
  recap — and **all five protected fields**
  (`central_question`/`key_takeaway`/`aepoch_reframe`/`human_consequence`/
  `closing_statement`) plus `existing_reality`/`tension` appear **verbatim**
  in the script text — no paraphrase drift from extraction through script.

Why **conditional**, not a clean pass:

1. **SCRIPT_RULES.md Part 2 still doesn't match the live schema.** Its
   illustrative YAML uses `arc_stage`, `pause_emphasis`,
   `voice_performance_plan`, `pronunciation_notes`, `verify_flags`,
   `on_screen_text`, `visual_intent`, and an `enhancement_cues` type value
   of `transition` — **none of these exist** in
   `schemas/artifacts/script.schema.json` (`additionalProperties: false`;
   `transition` isn't in the cue-type enum — confirmed by an actual
   validation failure during this run, fixed by using `overlay` instead).
   This dry run satisfied SCRIPT_RULES.md's *substance* using the schema's
   *real* field names (`delivery_cues`, top-level `voice_performance`,
   `pronunciation_guides`, `source_ref`, id/label prefix for arc stage) per
   the document's own stated precedence ("where the pipeline's own terms and
   this document's earlier terms disagreed, the pipeline wins") — but Part 2
   itself is still unrepaired and would mislead an agent who followed it
   literally. Logged as **TR-028**.
2. **One fixture, one pass, one agent.** This is a single hand-authored
   script against one short, simple fixture, not reviewed by the author, not
   cross-checked against a second/different source article, and produced in
   one draft rather than the iterative self-evaluation
   `script-director.md` Step 6 describes.
3. **All research content is dry-run placeholder**, not real web research
   (data point URLs are `example.com`) — acceptable for a zero-cost mechanics
   test, not sufficient grounding for a real episode.

## Verdict: Local-render readiness — **CONDITIONAL**

The FFmpeg mechanics path is real and proven: `AudioMixer.execute()` (duck
mix), `VideoCompose.execute()` (compose), `SubtitleGen.execute()`
(deterministic SRT from real script timings, no ASR), `ffprobe` technical
validation, and real frame sampling for a visual spotcheck all ran for real
against a real 1920x1080/60.0s/h264+aac output with no black frames detected.
The `final_review` artifact — required by the manifest, absent from the
older `test_08_end_to_end.py` — was produced for real from that inspection,
not fabricated.

Not proven:

- **The actually-locked render runtime.** `proposal_packet` locked
  `render_runtime: "remotion"`, but this dry run rendered via the ffmpeg
  mechanics path only — no Remotion composition was authored or rendered.
  This is **disclosed, not silent**: `final_review.checks.promise_preservation`
  records `render_runtime_used: "ffmpeg"`, `runtime_swap_detected: true`, and
  an explanatory `runtime_swap_check`, and `render_report.warnings` repeats
  it. `final_review.status` is `"revise"` precisely because of this and the
  placeholder-asset limitation below — the artifact correctly refuses to
  call itself `"pass"`.
- **HyperFrames** was not exercised at all.
- **All visual/audio assets are ffmpeg-synthesized placeholders** (solid
  color frames, sine-tone audio) — proves the pipe, not visual or narration
  quality.

## Verdict: Real-production readiness — **NO**

Per the original Phase 15 brief's own rule, real-production readiness
requires repeatable valid artifacts and review output **and** documented
blockers **and** explicit author approval of the next production brief —
approval hasn't happened yet; that's what this verdict is for. Concretely
still needed before a real blog episode:

1. Author review of this verdict and the two dry-run reports.
2. A real Remotion (or HyperFrames) render test — the locked runtime has
   never actually executed against this content.
3. Real provider selection and cost approval for TTS/image generation
   (currently 2/7 TTS, 7/13 image providers configured per the 2026-07-31
   baseline audit — re-check before committing to a real proposal, provider
   keys may have changed).
4. Real web research to replace the dry run's placeholder data points and
   sources.
5. Fix TR-028 (SCRIPT_RULES.md Part 2 field names) so the next agent isn't
   misled by the illustrative YAML.
6. A second fixture (different length/topic) run through this same path, to
   build confidence this isn't overfit to one short article.
7. The unrelated README.md/diagram.png working-tree anomaly (baseline audit
   report) is still unresolved — should be cleaned up before any real
   production work touches the repo root.

No paid call, provider generation, or public production is authorized by
this readiness phase.

## Immediate next action

Author review. Decide, in order of likely priority: (a) fix TR-028, (b) run
a real Remotion render test against this same fixture/artifacts, (c)
authorize a real-production brief once (a) and (b) are addressed.
