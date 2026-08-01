---
type: Troubleshooting Register
title: ÆPOCH OpenMontage Troubleshooting
description: Confirmed failures, tested fixes, operational workarounds, unresolved limitations, and verification commands for the ÆPOCH video-production stack.
status: draft
project_state: confirmed
generated:
  by: chatgpt
  at: 2026-07-30T15:51:00+01:00
sources:
  - id: provider-setup
    resource: ../../docs/aepoch-production-playbook/PROVIDER_SETUP.md
    title: ÆPOCH Production Provider Setup
  - id: production-current-state
    resource: ../../docs/aepoch-production-playbook/CURRENT_STATE.md
    title: ÆPOCH Production Current State
  - id: production-phase-log
    resource: ../../docs/aepoch-production-playbook/PHASE_LOG.md
    title: ÆPOCH Production Phase Log
---

# ÆPOCH OpenMontage Troubleshooting

## Purpose

This document records failures and limitations that materially affect the ÆPOCH animated-video production workflow.

It distinguishes among:

- Confirmed failures with tested resolutions
- Confirmed failures with operational workarounds
- Open defects
- Known provider limitations
- Creative failures that must not be mistaken for technical failures
- Historical incidents whose final resolution still needs reconstruction

A tool reporting `available` is not proof that a real provider call works.

## Status Definitions

- **confirmed fixed** — the failure was reproduced, corrected, and successfully verified
- **confirmed workaround** — the failure remains, but a tested operational path avoids it
- **open** — unresolved defect or provider mismatch
- **historical / verification incomplete** — incident occurred, but the exact final fix has not yet been reconstructed
- **creative rejection** — technically functional output that failed creative review

---

## TR-001 — Contract tests fail because `pytest` is missing

**Status:** historical / verification incomplete
**First observed:** 2026-07-18

### Symptom

Running:

```bash
make test-contracts
```

failed with:

```text
.venv/bin/python: No module named pytest
make: *** [Makefile:96: test-contracts] Error 1
```

### Environment

- Repository virtual environment: `.venv`
- Test command invoked through the project Makefile

### Cause

`pytest` was not installed in the active project virtual environment.

### Resolution

The exact tested installation command used later in the session has not yet been reconstructed into this knowledge base.

The expected diagnostic and correction path is:

```bash
./.venv/bin/python -m pip show pytest
./.venv/bin/python -m pip install pytest
./.venv/bin/python -m pytest --version
make test-contracts
```

Do not mark this issue `confirmed fixed` until `make test-contracts` has been run again and its result captured.

### Verification required

```bash
./.venv/bin/python -m pytest --version
make test-contracts
```

### Rule

Always install and invoke Python packages through the project virtual environment.

---

## TR-002 — Wrong Python interpreter or environment

**Status:** confirmed workaround

### Symptom

A package appears installed in one Python environment but is unavailable to the project, or a provider diagnostic cannot see expected environment variables.

### Cause

Commands such as:

```bash
python
python3
pip
pip3
```

may resolve outside the project virtual environment.

### Resolution

Use the explicit interpreter path:

```bash
./.venv/bin/python -m pip install <package>
./.venv/bin/python -c "..."
./.venv/bin/python -m pytest tests/
```

The Makefile follows the same project-virtual-environment rule when no other virtual environment is active.

### Verification

```bash
./.venv/bin/python -c "import sys; print(sys.executable)"
```

Expected executable:

```text
<repository>/.venv/bin/python
```

### Rule

Use the explicit `.venv` interpreter for ad-hoc diagnostics.

---

## TR-003 — False fal.ai `401 Authentication is required`

**Status:** confirmed workaround

### Symptom

A direct provider diagnostic returns:

```text
401 Authentication is required
```

and `FAL_KEY` appears to be missing.

### Cause

The standalone diagnostic called fal.ai directly through `requests` without first importing the OpenMontage tool stack.

The project loads `.env` through a module-level call in:

```text
tools/base_tool.py
```

Importing `tools.tool_registry` or another `tools.*` module triggers that loader. A bare script importing only `requests`, `os`, or similar modules does not load `.env`.

### Resolution

Use the registered tool path:

```python
from tools.tool_registry import registry

registry.discover()
result = registry._tools["recraft_image"].execute(...)
```

For a necessary direct diagnostic, import the project loader first:

```python
import tools.base_tool
import os
import requests
```

### Verification

Use the provider registry:

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
print(json.dumps(registry.support_envelope()['recraft_image'], indent=2))
"
```

Then perform a deliberate registered-tool test when a paid call is approved.

### Do not do

Do not diagnose provider authentication with a bare script whose only imports are:

```python
import requests
import os
```

### Additional note

A separate loader exists at:

```text
lib/env_loader.py
```

It requires an explicit `load_env()` call and is used by some QA scripts. It is not the provider-tool entry path and should not become the default loader for new provider code.

---

## TR-004 — Recraft rejects hex colors with `422 Unprocessable Entity`

**Status:** confirmed fixed

### Symptom

Recraft v4 calls failed with:

```text
422 Unprocessable Entity
```

Initial attempts incorrectly suspected the `style` parameter.

### Cause

The live Recraft endpoint requires colors as RGB objects. Raw hex strings in the provider payload are rejected.

Accepted caller inputs now include:

```json
"#B5651D"
```

or:

```json
{"r": 181, "g": 101, "b": 29}
```

### Resolution

Shared normalization was added through:

```text
tools/graphics/_shared.py
```

using:

```text
normalize_color
normalize_colors
```

Caller inputs are converted to RGB objects before the request reaches fal.ai.

Malformed inputs are rejected locally with `ValueError`, before a network call is made.

### Invalid values include

- Wrong hex length
- Non-hex characters
- Missing RGB keys
- Out-of-range RGB values
- Non-integer RGB components

### Verification

A registered-tool call was tested using mixed hex and RGB values:

```python
colors=["#2E86C1", {"r": 230, "g": 126, "b": 34}]
```

The provider call succeeded on the first attempt after the fix.

### Rule

Brand colors belong in the episode or asset-generation call site. Do not hardcode ÆPOCH colors into shared provider helpers.

---

## TR-005 — Recraft returns WebP bytes for a `.png` request

**Status:** confirmed fixed

### Symptom

A Recraft request specified a path ending in:

```text
.png
```

but fal.ai returned WebP bytes.

### Risk

A file may have an extension that does not match its actual binary format, causing:

- Broken downstream tooling
- Incorrect MIME assumptions
- Failed image verification
- Unreliable asset provenance

### Resolution

All supported image-provider tools now use:

```text
tools/graphics/_shared.py::save_image_correctly()
```

The helper:

1. Detects the actual format from the byte signature using Pillow.
2. Converts to the requested format when practical.
3. Avoids re-encoding when the source already matches.
4. Corrects the extension when conversion is not practical.
5. Never writes mismatched bytes under a misleading extension.

### Verified result

- Source format: WebP
- Requested output: PNG
- Final file: genuine PNG
- Dimensions: 1344×768
- `format_converted`: `True`

### Verification fields

Provider results expose:

```text
format
source_format
format_converted
output
```

### Rule

Do not trust the requested filename extension as evidence of actual format.

---

## TR-006 — Pixabay returns PNG bytes under a `.jpg` filename

**Status:** confirmed fixed

### Symptom

Pixabay returned PNG bytes for an illustration/vector result while the tool's default output path ended in `.jpg`.

### Cause

Provider results do not guarantee that returned content matches the requested or default filename extension.

### Resolution

The same `save_image_correctly()` path used for Recraft now handles Pixabay and Pexels.

When conversion is requested and practical:

- PNG to JPEG conversion flattens alpha onto white.
- JPEG quality is set to 95.
- PNG is saved losslessly with optimization.

### Verification

The smoke test downloaded a Pixabay result whose original bytes were PNG and corrected the saved output format.

### Rule

Verify actual format and extension after every downloaded image.

---

## TR-007 — SVG output cannot be treated as PNG

**Status:** confirmed workaround

### Symptom

Using:

```text
style="vector_illustration"
```

with Recraft returns SVG rather than PNG.

### Cause

The provider's vector illustration mode produces vector output.

### Resolution

The format-normalization helper detects SVG but deliberately does not rasterize it.

Instead it corrects the extension so the file is not falsely labelled as PNG.

For raster production assets:

- Use an accepted raster-producing style such as `any`, or
- Add an explicit reviewed SVG rasterization step outside the shared save helper

### Why the helper does not rasterize automatically

Automatic SVG rasterization would introduce:

- Renderer-specific differences
- Font substitution risk
- Incorrect sizing assumptions
- Hidden creative changes
- Additional dependencies

### Verification

Check the actual file signature and returned provider metadata.

### Open consideration

A formal, deterministic SVG-to-PNG pipeline may be added later if vector assets become a deliberate production input.

---

## TR-008 — Recraft style registry is stale

**Status:** open

### Symptom

The tool registry declares five possible Recraft style values, but the live endpoint accepted only:

```text
any
vector_illustration
```

during the tested phase.

### Cause

The local tool schema and live provider API are out of sync.

### Current workaround

Use only values confirmed by the live endpoint.

### Required fix

Update the provider tool schema or dynamically validate supported style values.

### Verification needed

- Compare the current live endpoint schema
- Update local enum
- Add a contract test
- Run one approved real call for each supported production style

### Rule

Do not assume local registry enums are current merely because discovery reports the tool as available.

---

## TR-009 — Negative-exclusion-list prompts trigger moderation

**Status:** confirmed workaround

### Symptom

Image-generation requests were moderated when prompts included literal lists of prohibited imagery or exclusions.

### Cause

Provider moderation interpreted the negative wording as requested content rather than as a prohibition.

### Resolution

Use positive-only prompt framing.

Describe:

- Desired composition
- Desired human proportions
- Desired spacing
- Desired visual language
- Desired emotional register
- Desired color and material treatment
- Desired camera or illustration perspective

Keep brand exclusions in the review checklist rather than inserting long literal negative lists into the generation prompt.

### Verification

Generation resumed successfully after prompts were reframed positively.

### Rule

Do not retry a moderated call without reporting the incident and reviewing the prompt.

---

## TR-010 — Provider `available` status is mistaken for functional validation

**Status:** confirmed operational limitation

### Symptom

The registry reports a provider tool as:

```text
available
```

and an agent assumes the provider is ready for production.

### Cause

`registry.discover()` checks whether required dependencies and environment variables are present. It does not perform a live API request.

### Correct interpretation

- **Registry-verified:** local requirements and environment variable detected
- **Functionally tested:** real API request succeeded and output was verified
- **Production-approved:** functional result also passed the project's quality and workflow checks

### Current provider status

| Provider/tool | Status |
|---|---|
| Pexels / `pexels_image` | Functionally tested |
| Pixabay / `pixabay_image` | Functionally tested |
| Recraft / `recraft_image` | Functionally tested after fixes |
| FLUX / `flux_image` | Later Kontext workflow used, but generic registry status must not substitute for path-specific verification |
| Kling / `kling_video` | Registry-verified only |
| Veo / `veo_video` | Registry-verified only |
| MiniMax / `minimax_video` | Registry-verified only |
| `faster-whisper` import | Verified in `.venv`; Phase 14B later functionally used it for transcription |

### Rule

Never describe a provider as tested based only on discovery output.

---

## TR-011 — `faster-whisper` availability confused with a transcription test

**Status:** superseded by later functional use

### Earlier state

The package import was confirmed:

```bash
./.venv/bin/python -c "import faster_whisper; print(faster_whisper.__version__)"
```

Version:

```text
1.2.1
```

At that point, no transcription had been run.

### Later state

Phase 14B successfully used `faster-whisper` with:

- Model: `small`
- Device: CPU
- Compute type: `int8`
- `word_timestamps=True`

It produced real word-level markers for the 47-second proof.

### Current conclusion

`faster-whisper` is functionally validated for local word-level timing in this project.

### Rule

Documentation must distinguish the date and phase of verification. An earlier “import only” note may be superseded by later functional evidence.

---

## TR-012 — Phrase-level timing is too imprecise for production

**Status:** confirmed workaround

### Symptom

Phrase-level timing based on silence detection and proportional word count produced less precise segment estimates.

### Cause

Phrase estimates do not locate exact spoken-word boundaries.

### Evidence

The Phase 14B word-level extraction produced a 47.00-second segment that was notably shorter than the earlier phrase-level estimate for the same material.

### Resolution

Use:

- `faster-whisper` word timestamps
- Real spoken markers
- `ffmpeg silencedetect` to refine adjacent boundaries

### Rule

Do not invent missing timing markers.

If the spoken recording deviates from the approved script:

- Record the deviation
- Preserve the approved script
- Do not silently rewrite either source

---

## TR-013 — Reference narration differs from approved script

**Status:** confirmed workflow limitation

### Symptom

Lee's reference recording contains spoken wording that differs slightly from the approved narration script.

### Cause

The reference recording is a performance reference, not an authoritative script recording.

### Resolution

- Use Lee's recording only for timing and performance analysis.
- Preserve the approved narration script.
- Record spoken deviations in timing metadata.
- Use a clean recording of the approved script for final production.

### Rule

Do not rewrite the approved script to match the reference performance.

---

## TR-014 — Primitive Remotion-first episode passes technically but fails creatively

**Status:** creative rejection

### Symptom

Phase 13C.2A:

- Rendered successfully
- Passed technical checks
- Covered all 22 scenes
- Used deterministic motion

but failed creative review.

### Cause

The production relied on:

- Programmatic SVG human figures
- Primitive geometric metaphor scenes
- Low-fidelity production artwork
- Phrase-level timing

### Resolution

Reject the primitive Remotion-first output as the production baseline.

Retain it only for:

- Technical reference
- Timing reference
- Transition architecture
- Reproducibility evidence

Use the asset-first hybrid workflow for production.

### Rule

Technical validation and creative validation are separate gates.

---

## TR-015 — `SymbolicFigure` human proportions and leg overlap

**Status:** confirmed fixed

### Symptom

The figure read as one-legged because of overlap and incorrect proportions.

### Cause

The original programmatic figure did not maintain correct adult proportions and its leg geometry overlapped.

### Resolution

The component was rebuilt around an eight-head-unit adult proportion system and the leg-overlap defect was corrected.

### Current limitation

This fix improved the static prototype but did not reverse the later creative rejection of primitive programmatic humans as production assets.

### Rule

Do not reintroduce these primitive human components into the production baseline.

---

## TR-016 — Repetitive KeyStatement scenes

**Status:** confirmed fixed

### Symptom

Scenes 3, 13, 15, 17, 20, and 21 rendered as near-identical frozen layouts.

### Cause

Multiple episode beats reused the same KeyStatement composition without sufficient visual differentiation.

### Resolution

Five of the six scenes were replaced with episode-specific compositions.

Scene 3 remained the canonical reference baseline.

Added:

- `SignalVesica`
- `BreathRings`

### Additional fixes

- Scene 18 label readability
- Root composition wiring for the new scenes

### Rule

Repeated Tier 1 modules must be evaluated in neighboring-scene contact sheets, not only in isolation.

---

## TR-017 — Brand failures in generated human and consensus imagery

**Status:** confirmed creative failure pattern

### Symptoms observed

Generated candidates included:

- Texture violations
- Mascot-adjacent or chibi proportions
- Blank-eye-adjacent artifacts
- Accessorized or personality-bearing synthetic figures
- Dense walls of repeating heads
- Missing full human figures
- Mob-like compositions
- Robot-register imagery

### Cause

The provider followed literal visual patterns that drifted away from the intended editorial human vocabulary and spatial composition.

### Operational response

- Use Direction A as the base rather than treating every generated candidate as approved.
- Review at phone and playback scale.
- Prefer broad, spacious compositions.
- Use positive prompt framing.
- Use approved plates as inputs for Remotion transformation.
- Do not train a custom style from inconsistent assets.

### Rule

A technically valid generated file is not an approved brand asset.

---

## TR-018 — Manufactured Consensus image generation does not clearly communicate shared output

**Status:** unresolved creatively; hybrid workaround validated

### Symptom

Across multiple generation and editing attempts, the “many synthetic actors resolve into one shared output” concept did not render clearly.

### Failure patterns

- Receding perspective weakened the concept
- Busy patterning obscured the transformation
- Dense repeated heads replaced full figures
- Output-band or wave devices remained ambiguous
- Edited variants improved the image but did not pass creative review

### Resolution used in Phase 14B

Use the generated image only as a figure plate.

Construct the conceptual transformation in Remotion with:

- Deterministic synchronization markers
- Lockstep convergence
- Brand geometry
- A drawn-on shared output band

### Current limitation

The Phase 14B implementation remained too subtle at normal playback size and requires strengthening in Phase 14B.1.

### Rule

Do not expect one generated image to carry the entire logical transformation.

---

## TR-019 — Crossfading the same plate into itself reads as a cut

**Status:** open correction for Phase 14B.1

### Symptom

Beats 1 and 2 use the same echoes plate but crossfade as separate beats.

Beats 3 and 4 use the same reflection plate but crossfade as separate beats.

### Result

The repeated plate transition creates unnecessary visual discontinuity and exposes the composition structure.

### Required correction

- Treat Beats 1 and 2 as one continuous echoes composition.
- Treat Beats 3 and 4 as one continuous reflection composition.
- Create internal state changes rather than same-plate crossfades.

### Verification

Review at normal playback speed and confirm the transitions no longer read as cuts.

---

## TR-020 — Phase 14B Beat 1 reveals all echoes too early

**Status:** open correction for Phase 14B.1

### Symptom

The opening frame shows all figures immediately.

### Intended result

Begin with one dominant human, then progressively reveal synthetic echoes.

### Required correction

Use crop, mask, opacity, or staged plate reveal to preserve the dominant human before multiplication becomes apparent.

### Verification

At frame 0 and early playback:

- One human must read as primary.
- Echoes must appear progressively.
- The reveal must remain legible at 720p and phone scale.

---

## TR-021 — Phone-call and catfishing shift is too subtle

**Status:** open correction for Phase 14B.1

### Symptom

The Beat 4 pan and tint-state refresh do not create a strong enough internal visual change.

### Required correction

Strengthen the state transition without introducing literal phone or dating-app interface imagery.

Possible mechanisms include:

- More pronounced camera displacement
- Stronger Iris-to-Prism color-state transition
- Registration separation
- Layer offset
- Controlled mask reveal
- Human-versus-reflection emphasis change

### Verification

The shift must be unmistakable at normal playback speed while remaining within the Direction A visual family.

---

## TR-022 — Synthetic multiplication plate is stylistically inconsistent

**Status:** open correction for Phase 14B.1

### Symptom

Beat 5 uses a Phase 14A.1 abstract-geometric multiplication frame that does not match the locked human vocabulary.

### Required correction

Replace it with either:

- The selected Direction A human vocabulary, or
- One isolated approved synthetic figure multiplied through Remotion

### Rule

Do not solve multiplication by introducing a visually unrelated plate.

---

## TR-023 — Manufactured Consensus markers are too small at normal playback size

**Status:** open correction for Phase 14B.1

### Symptom

The synchronization markers and shared output band are technically visible but read as too subtle or too small during normal playback.

### Required correction

Increase the visual hierarchy of:

- Per-figure synchronization
- Convergence timing
- Shared output band
- Final lockstep state

### Verification

Test:

- 720p playback
- 1080p frame review
- Phone-scale contact sheet
- Normal playback speed

The concept must be understandable without pausing.

---

## TR-024 — Pre-existing TypeScript baseline errors can be mistaken for regressions

**Status:** confirmed operational limitation

### Symptom

Type-check output includes 15 pre-existing diagnostics unrelated to the current episode work.

### Risk

An agent may:

- Claim the new work introduced errors
- Attempt unrelated repairs
- Hide actual new diagnostics in the baseline noise

### Resolution

Compare new type-check output against the documented baseline.

A phase may claim “type-check clean” only when it introduces zero new diagnostics relative to that baseline.

### Required future improvement

Create a captured baseline report or targeted type-check command that makes regressions explicit.

---

## TR-025 — Automatic retry can cause uncontrolled cost and duplicate generation

**Status:** confirmed operational rule

### Symptom

A failed or moderated generation could be retried automatically, increasing paid calls and obscuring the cause.

### Resolution

Do not retry:

- Failed paid calls
- Moderated requests
- Additional generation variants
- Reference-image edits

without reporting:

- Failure reason
- Call count
- Estimated cost
- Proposed correction
- Whether the retry changes the approved cap

### Rule

Every paid call must be attributable to a phase and approved scope.

---

## Diagnostic Commands

### Confirm project Python

```bash
./.venv/bin/python -c "import sys; print(sys.executable)"
```

### Confirm `pytest`

```bash
./.venv/bin/python -m pytest --version
```

### Confirm `faster-whisper`

```bash
./.venv/bin/python -c "import faster_whisper; print(faster_whisper.__version__)"
```

### Provider summary

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
print(json.dumps(registry.provider_menu_summary(), indent=2))
"
```

### Recraft provider envelope

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
print(json.dumps(registry.support_envelope()['recraft_image'], indent=2))
"
```

### Knowledge-only Git state

```bash
git status --short --untracked-files=all -- knowledge/
```

## TR-026 — SCRIPT_RULES.md blog-to-script adapter contract disagrees with the live script stage

**Status:** resolved 2026-07-31; representative agent-led dry run passed

### Symptom

`brands/aepoch/SCRIPT_RULES.md` states a blog-sourced `script` artifact is
acceptable at the `animated-explainer` pipeline's script stage without a
send-back. Following the pipeline literally, it is not: the stage's own
contract and director skill disagree with that claim.

### Environment

Branch `aepoch-series`, HEAD `9cb05cf`. Static/documentation audit — no
runtime error, no test failure. Confirmed by `grep`/`read` inspection, not
by attempting a live run.

### Exact evidence

- `pipeline_defs/animated-explainer.yaml`: `script` stage
  `required_artifacts_in: [proposal_packet]` — a blog-sourced script per
  SCRIPT_RULES.md has no `proposal_packet` (no `research`/`proposal` stage ran).
- `skills/pipelines/explainer/script-director.md:5`: *"You have a `brief`
  artifact from the Idea Explorer."* — stale v1.0 language; the current
  manifest has no `idea` stage. Its own Prerequisites table two lines later
  correctly names `proposal_packet`, contradicting the opening line.
- `skills/pipelines/explainer/idea-director.md` (produces `brief` per
  `schemas/artifacts/brief.schema.json`) is not referenced by
  `animated-explainer.yaml`'s `stages` or `required_skills` — orphaned for
  this pipeline (still legitimately used by other pipelines).
- `required_artifacts_in` is not enforced in `lib/checkpoint.py` or
  `lib/pipeline_loader.py` (confirmed by grep) — it is an agent-honored
  contract, not a hard code gate, so nothing crashes; an agent following
  Rule Zero literally simply cannot satisfy the stage's documented
  prerequisites from a blog source alone.
- Zero test/fixture coverage of `SCRIPT_RULES.md` exists in `tests/`.

### Cause

Documentation drift. `SCRIPT_RULES.md` was written assuming direct
blog-to-script injection was already wired into the pipeline; the pipeline
manifest and script-director skill were never updated to expose that entry
path, and script-director.md itself still carries pre-v2.0 wording.

### Resolution

Added a conditional extraction stage before research with a canonical
`source_extraction` artifact. The source article's central question, key
takeaway, ÆPOCH reframe, human consequence, and closing are protected.
Research may verify and enrich but may not silently change them. Research,
proposal, and script directors now encode this boundary. See ADR-024.

### Verification

The complete contract suite passed after implementation: 566 passed, 7
skipped. A representative blog fixture and focused authority tests exist.

**2026-07-31, later same day:** Ran the representative fixture
(`tests/fixtures/blog/authoritative-source.md`) through extraction,
source-authoritative research, and proposal for real, using the actual
checkpoint/schema machinery — `tests/qa/test_09_blog_source_dry_run.py`,
24/24 checks passed. Confirmed mechanically:

- All five protected fields (`central_question`, `key_takeaway`,
  `aepoch_reframe`, `human_consequence`, `closing_statement`) are identical,
  byte-for-byte, from `source_extraction` through `research_brief` and
  `proposal_packet`.
- All three `angles_discovered` in the research brief are `grounded_in` the
  extraction's claims rather than proposing a competing thesis.
- All three `proposal_packet.concept_options` share one identical
  `core_message` (the protected thesis) while their `title`, `hook`,
  `narrative_structure`, `visual_approach`, `target_platform`, and `tone`
  all differ — presentation varies, thesis does not, exactly as ADR-024
  requires.
- Full contract suite (567 passed, 7 skipped) and `test_08_end_to_end.py`
  (38/38) both stayed green alongside this run.

Discovered and fixed one regression along the way — see TR-027. Full
evidence: `knowledge/wiki/reports/phase-15-blog-dry-run-results.md`.

### Related files

- `brands/aepoch/SCRIPT_RULES.md`
- `pipeline_defs/animated-explainer.yaml`
- `skills/pipelines/explainer/script-director.md`
- `skills/pipelines/explainer/idea-director.md`
- `schemas/artifacts/brief.schema.json`, `schemas/artifacts/proposal_packet.schema.json`
- `tests/qa/test_09_blog_source_dry_run.py`
- `knowledge/wiki/reports/phase-15-baseline-contract-audit.md`
- `knowledge/wiki/reports/phase-15-blog-dry-run-results.md`

---

## TR-027 — Conditional pipeline stages broke `get_next_stage` resume logic

**Status:** resolved 2026-07-31

### Symptom

After the ADR-024 `extraction` stage (conditional: `source_article_exists`)
was added to `animated-explainer.yaml`, re-running the existing zero-cost
regression test regressed: `tests/qa/test_08_end_to_end.py` went from 38
passed/0 failed to 36 passed/2 failed.

### Environment

Branch `aepoch-series`. `.venv/bin/python tests/qa/test_08_end_to_end.py`
(non-blog, topic-led synthetic run — never produces a `source_extraction`).

### Exact error

```text
[FAIL] Next stage after proposal
...
[FAIL] Next stage is None (done)
```

### Cause

`lib/pipeline_loader.py`'s `get_stage_order()` already filtered conditional
*sub*-stages (`_condition_is_active`) but applied no such filter to
top-level stages — it unconditionally appended every `manifest["stages"]`
entry, including `extraction`. `lib/checkpoint.py`'s `get_next_stage()`
walks that order looking for the first stage without a completed
checkpoint. For any run that legitimately never executes `extraction`
(the ordinary topic-led explainer path — the majority of animated-explainer
productions), `get_next_stage` got permanently stuck returning
`"extraction"` instead of resuming at the real next stage, even after
`research`/`proposal`/.../`publish` all completed.

`required_artifacts_in`-style declarative fields are agent-honored, not
code-enforced (confirmed by grep, see TR-026), so nothing crashed — this
would have silently confused any caller (a real orchestrator run, not just
the test) that asks "what's next" after skipping a conditional stage.

### Resolution

- Added `get_conditional_stage_names(manifest)` to `lib/pipeline_loader.py`
  — returns the set of top-level stage names that declare a `condition`.
- Updated `get_next_stage()` in `lib/checkpoint.py`: when walking stages in
  order, a not-yet-completed conditional stage is skipped if any stage
  *after* it in the order is already completed (proof the condition did not
  apply and the stage was legitimately bypassed, not left unfinished).

### Verification

```bash
.venv/bin/python tests/qa/test_08_end_to_end.py   # 38 passed, 0 failed (was 36/2)
.venv/bin/python -m pytest tests/contracts/ -q    # 567 passed, 7 skipped, unchanged
.venv/bin/python tests/qa/test_09_blog_source_dry_run.py  # 24 passed, 0 failed
```

Confirmed the fix holds for both the conditional-stage-skipped path
(non-blog explainer runs) and the conditional-stage-completed path
(blog-sourced runs, via test_09).

### Related files

- `lib/pipeline_loader.py`
- `lib/checkpoint.py`
- `tests/qa/test_08_end_to_end.py`
- `tests/qa/test_09_blog_source_dry_run.py`

---

## TR-028 — SCRIPT_RULES.md Part 2 field names still don't match `script.schema.json`

**Status:** resolved 2026-07-31

### Symptom

`brands/aepoch/SCRIPT_RULES.md` Part 2's illustrative YAML for the `script`
artifact uses field names that do not exist in
`schemas/artifacts/script.schema.json`: `arc_stage`, `pause_emphasis`,
`voice_performance_plan` (top-level fields per section), `pronunciation_notes`,
`verify_flags`, `on_screen_text`, `visual_intent`, `offset_seconds`, and an
`enhancement_cues` type value of `transition`. The schema's actual fields are
`delivery_cues`, top-level `voice_performance`, `pronunciation_guides`,
`source_ref`, `enhancement_cues[].timestamp_seconds`, and no `transition` in
the cue-type enum (`overlay`, `broll`, `diagram`, `stat_card`,
`code_snippet`, `animation`).

### Environment

Branch `aepoch-series`. Discovered via a real validation failure during
`tests/qa/test_10_blog_source_production_dry_run.py`'s first run.

### Exact error

```text
jsonschema.exceptions.ValidationError: 'transition' is not one of
['overlay', 'broll', 'diagram', 'stat_card', 'code_snippet', 'animation']
...
On instance['sections'][3]['enhancement_cues'][1]['type']: 'transition'
```

### Cause

ADR-024's implementation reconciled SCRIPT_RULES.md Part 1 (extraction) with
`source_extraction.schema.json` and updated the document's introduction to
claim alignment with `animated-explainer.yaml` v2.0's real terms
(`enhancement_cues`, a standalone voice-performance artifact), but Part 2's
actual YAML block was not updated to match — it still reflects an earlier,
never-implemented schema shape.

### Resolution

`brands/aepoch/SCRIPT_RULES.md` Parts 2-4 rewritten field-for-field against
the live `script.schema.json`: `voice_performance` (top-level object),
per-section `delivery_cues`, `pronunciation_guides`, `source_ref`, and the
real `enhancement_cues.type` enum (no `transition` — documented as
`overlay`). Added an explicit "arc-stage convention" section since the
schema has no dedicated `arc_stage` field (encoded via `id`/`label` prefix
instead, e.g. `hook-1`/`Hook`). Part 3's word-count/cue-density math and
Part 4's ten-item checklist were updated to reference the real fields
(`sections[].text`, `enhancement_cues[].timestamp_seconds`,
`source_extraction.excluded_material`) rather than the old fictional ones.
The intro's "voice performance plan is its own artifact" claim was also
corrected to "a dedicated top-level `voice_performance` object in the
script artifact" — it was never a separate artifact.

### Verification

```bash
.venv/bin/python tests/qa/test_10_blog_source_production_dry_run.py
# 47 passed, 0 failed -- script built using exactly the rewritten Part 2
# field names, validates against schemas/artifacts/script.schema.json,
# and satisfies all ten Part 4 checklist items programmatically.
.venv/bin/python -m pytest tests/contracts/test_blog_source_extraction_contract.py -q
# 6 passed -- test_directors_encode_source_authority and
# test_blog_adapter_points_to_live_route_and_schema both still pass against
# the rewritten document.
```

### Related files

- `brands/aepoch/SCRIPT_RULES.md`
- `schemas/artifacts/script.schema.json`
- `skills/pipelines/explainer/script-director.md` (template used for the
  Part 2 rewrite)
- `tests/qa/test_10_blog_source_production_dry_run.py`
- `tests/qa/test_11_blog_source_remotion_render.py`
- `knowledge/wiki/reports/phase-15-readiness-closure.md`

---

## TR-029 — `cuts[].in_seconds`/`out_seconds` mean different things to FFmpeg vs. Remotion

**Status:** resolved 2026-07-31

### Symptom

The same `edit_decisions.cuts[].in_seconds`/`out_seconds` field pair is
interpreted two different ways depending on which engine consumes it:

- FFmpeg's `_compose`/`_render_via_ffmpeg` (`tools/video/video_compose.py`)
  treat them as an **in-source trim range per clip**, concatenated in list
  order — e.g. `in_seconds=0, out_seconds=8` means "use this clip's first 8
  seconds," repeated per clip regardless of its position in the final video.
- Remotion's `Explainer.tsx` treats them as **absolute timeline placement**:
  `Sequence from={in_seconds*fps} durationInFrames={(out_seconds-in_seconds)*fps}`.

An `edit_decisions` artifact built with the FFmpeg (trim) convention for
every cut — e.g. `in_seconds=0, out_seconds=<clip length>` repeated
identically for six sequential scenes — renders correctly under FFmpeg but
would place all six scenes at frame 0, fully overlapping, under Remotion.

### Environment

Discovered by inspection while building a real Remotion render
(`tests/qa/test_11_blog_source_remotion_render.py`), cross-referencing
`skills/pipelines/explainer/edit-director.md`'s own worked example (which
uses the timeline convention: `0s-10s: scene-1 | ... | 10s-18s: scene-2 |
...` mapped to `in_seconds: 0, out_seconds: 10` for the first cut) against
`_compose`'s actual trim/concat behavior.

### Cause

Two rendering engines were built against two different informal readings of
one schema field pair; `edit_decisions.schema.json` itself only documents
`in_seconds`/`out_seconds` as `minimum: 0` numbers, with no semantic
clarification of which convention applies.

### Resolution

Resolved option (a): `edit_decisions.schema.json` gained an explicit,
validated `cut_timing_mode` field (`"source_trim"` | `"timeline"`, default
`"source_trim"`) plus `cuts[].source_in_seconds` (default `0`, the
in-source trim start under `"timeline"` mode). `_compose()` now rejects
`cut_timing_mode="timeline"` with a clear error instead of silently
misinterpreting it; `_remotion_render()` now *requires*
`cut_timing_mode="timeline"` explicitly and rejects anything else
(including it being absent) with a clear error naming the fix. Neither
engine's actual trim/placement behavior changed — the field just makes the
existing, previously-implicit convention explicit and enforced.
`skills/pipelines/explainer/edit-director.md` rewritten with a "Cut Timing
Mode" subsection and worked examples for both modes.

### Verification

```bash
.venv/bin/python -m pytest tests/contracts/test_remotion_asset_staging_contract.py -q
# 16 passed -- includes cut_timing_mode rejection tests for both engines
# and a default-preserves-FFmpeg-behavior test.
.venv/bin/python tests/qa/test_08_end_to_end.py            # 38 passed (no cut_timing_mode set -- default path)
.venv/bin/python tests/qa/test_10_blog_source_production_dry_run.py  # 47 passed (source_trim, explicit)
.venv/bin/python tests/qa/test_11_blog_source_remotion_render.py     # 28 passed (timeline, explicit, required)
```

### Related files

- `schemas/artifacts/edit_decisions.schema.json`
- `skills/pipelines/explainer/edit-director.md`
- `tools/video/video_compose.py` (`_compose`, `_remotion_render`)
- `tests/contracts/test_remotion_asset_staging_contract.py`
- `tests/qa/test_10_blog_source_production_dry_run.py`, `tests/qa/test_11_blog_source_remotion_render.py`
- `knowledge/wiki/reports/phase-15-renderer-hardening.md`

---

## TR-030 — Real Remotion render rejects local absolute-path assets by default

**Status:** resolved 2026-07-31 (general fix implemented in `_remotion_render()`)

### Symptom

A real `npx remotion render` invocation via
`tools/video/video_compose.py`'s `operation="render"` (render_runtime=
`remotion`) fails to load any asset referenced by an absolute local
filesystem path — the common case for locally-generated TTS/image/video
files.

### Environment

Branch `aepoch-series`. Discovered building the first real, non-ffmpeg
Remotion render for this project
(`tests/qa/test_11_blog_source_remotion_render.py`) — apparently the first
time `operation="render"` with `render_runtime="remotion"` had been
exercised end to end against local absolute-path video assets.

### Exact errors (two distinct bugs found in sequence)

1. **Sub-bug (fixed):** `remotion-composer/src/Explainer.tsx`'s
   `resolveAsset()` used `src.replace(/^file:\/\/\/?/, "")` to strip a
   `file://` prefix — the optional third slash greedily consumed the
   path's own leading slash for POSIX absolute-path URIs
   (`file:///home/foo` → `home/foo`, not `/home/foo`), silently
   misrouting every such asset to `staticFile()` (served under
   `/public/home/foo`, a 404) instead of treating it as an absolute path.
   ```text
   404 while downloading file
   http://localhost:3000/public/home/chris/.../scene_sc1.mp4
   ```
2. **Deeper limitation (not fixed):** even with the regex corrected to
   produce a technically-valid `file:///...` URI,
   `@remotion/renderer`'s own asset-download step
   (`node_modules/@remotion/renderer/dist/assets/read-file.js` →
   `getClient()`) rejects it outright:
   ```text
   Error: Can only download URLs starting with http:// or https://,
   got "file:///home/chris/.../scene_sc1.mp4"
   ```
   A bare absolute path (no URI scheme at all) was also tested and fails
   differently — `OffthreadVideo` prepends the local dev-server origin and
   404s, since only `public/`-relative paths (via `staticFile()`) are
   actually served over HTTP by the render pipeline's dev server.

### Cause

`_remotion_render()` (`tools/video/video_compose.py`) was written assuming
absolute local paths could be passed through as `file://` URIs; this
version of `@remotion/renderer`'s asset-download mechanism does not support
that scheme at all for `OffthreadVideo`/`Img` sources during a CLI render —
only `http(s)://` or a path already reachable under the bundle's
`public/` directory (via `staticFile()`) work.

### Resolution

- **Fixed (earlier round):** the `resolveAsset()` regex bug itself
  (independently correct regardless of the deeper limitation — see the
  code comment left in `Explainer.tsx` documenting both).
- **General fix implemented (this round), per explicit operator
  authorization:** added `VideoCompose._stage_local_assets_for_remotion()`
  to `tools/video/video_compose.py`, called from inside `_remotion_render()`
  itself — not the caller. It scans every asset-bearing field
  `ExplainerProps` actually reads (`cuts[].source`,
  `cuts[].backgroundImage`, `cuts[].backgroundVideo`, `cuts[].images[]`,
  `audio.narration.src`, `audio.music.src`), validates every local
  absolute-path reference up front (missing / not-a-file / unreadable,
  *all* problems reported at once, nothing staged if any fail), stages
  validated assets into a UUID-scoped `remotion-composer/public/
  _render_staging/<uuid>/` directory (collision-safe across concurrent
  renders; index-prefixed filenames so repeated basenames from different
  source directories never collide within one render), rewrites the
  corresponding props fields to `staticFile()`-relative paths, returns
  full provenance (`original_path` → `staged_path`) in
  `ToolResult.data["staged_assets"]`, and removes the staging directory
  (plus its now-empty parent) in a `finally` block — on success *and* on
  render failure. `operation="render"` now works out of the box for local
  absolute-path assets; no caller-side pre-staging required.

This closes the gap the prior round's test-scoped workaround left open — a
real production agent calling `operation="render"` today, without doing
anything special, gets working local-asset support.

### Verification

```bash
.venv/bin/python -m pytest tests/contracts/test_remotion_asset_staging_contract.py -q
# 16 passed, 0.15s -- images/audio/video staging, repeated filenames,
# missing/unreadable/not-a-file rejection (all problems reported at once),
# cleanup after both success and subprocess failure (driven through the
# real _remotion_render() against the real remotion-composer/public/,
# subprocess mocked), cut_timing_mode validation for both engines.

.venv/bin/python tests/qa/test_11_blog_source_remotion_render.py
# 28 passed, 0 failed (up from 24 -- 4 new checks for the general fix).
# Real npx remotion render succeeded using ONLY the general fix (no
# manual test-side staging): 1920x1080 h264, 61.06s, audio present, no
# black frames, subtitles present, staged_assets provenance present,
# _render_staging/ fully empty afterward.
# final_review.checks.promise_preservation.render_runtime_used == "remotion"
# runtime_swap_detected == False

npx tsc --noEmit   # (remotion-composer/) 15 errors, unchanged baseline (TR-024)
```

A real production agent calling `operation="render"` today, with local
absolute-path TTS/image/video assets and no special handling of its own,
now gets a working render. This closes the single most significant
real-production blocker found in Phase 15.

### Related files

- `remotion-composer/src/Explainer.tsx` (`resolveAsset()`)
- `tools/video/video_compose.py` (`_stage_local_assets_for_remotion`,
  `_remotion_render`, `_render_via_atelier`'s `public_dir` pattern used as
  the original reference)
- `schemas/artifacts/edit_decisions.schema.json` (`cut_timing_mode`, TR-029)
- `tests/contracts/test_remotion_asset_staging_contract.py`
- `tests/qa/test_11_blog_source_remotion_render.py`
- `knowledge/wiki/reports/phase-15-renderer-hardening.md`

---

## Open Issues Summary

| ID | Issue | State |
|---|---|---|
| TR-001 | Historical missing `pytest` resolution not yet reverified | Verification incomplete |
| TR-008 | Recraft style enum differs from live endpoint | Open |
| TR-018 | Manufactured Consensus generated-image concept remains unresolved alone | Hybrid workaround |
| TR-019 | Same-plate crossfades in Beats 1–2 and 3–4 | Phase 14B.1 |
| TR-020 | All echoes visible from frame 0 | Phase 14B.1 |
| TR-021 | Phone/catfishing shift too subtle | Phase 14B.1 |
| TR-022 | Multiplication plate inconsistent | Phase 14B.1 |
| TR-023 | Consensus markers/output band too subtle | Phase 14B.1 |
| TR-024 | Fifteen pre-existing TypeScript diagnostics | Operational limitation |
| TR-026 | SCRIPT_RULES.md blog adapter contract disagreed with live script stage | Resolved (ADR-024), dry run passed |
| TR-027 | Conditional stages broke `get_next_stage` resume logic | Resolved |
| TR-028 | SCRIPT_RULES.md Part 2 field names didn't match `script.schema.json` | Resolved |
| TR-029 | `cuts[].in_seconds`/`out_seconds` mean different things to FFmpeg vs. Remotion | Resolved (`cut_timing_mode`) |
| TR-030 | Real Remotion render rejects local absolute-path assets by default | Resolved (general fix) |
| TR-028 | SCRIPT_RULES.md Part 2 field names don't match `script.schema.json` | Open |

## Maintenance Rule

When adding an incident:

1. Record the exact symptom.
2. Preserve the exact error text when available.
3. State whether the issue is technical, operational, provider-specific, or creative.
4. Distinguish root cause from an early incorrect diagnosis.
5. Record the tested fix or explicitly say verification is incomplete.
6. Add commands that prove the issue is resolved.
7. Never label a workaround as a permanent fix.
