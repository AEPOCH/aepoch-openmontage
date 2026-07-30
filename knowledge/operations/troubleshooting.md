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

## Maintenance Rule

When adding an incident:

1. Record the exact symptom.
2. Preserve the exact error text when available.
3. State whether the issue is technical, operational, provider-specific, or creative.
4. Distinguish root cause from an early incorrect diagnosis.
5. Record the tested fix or explicitly say verification is incomplete.
6. Add commands that prove the issue is resolved.
7. Never label a workaround as a permanent fix.
