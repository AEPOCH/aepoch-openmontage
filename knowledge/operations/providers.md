---
type: Provider Register
title: ÆPOCH OpenMontage Provider Stack
description: Verified provider requirements, environment variables, test status, entry paths, costs, limitations, and production-use rules.
status: draft
project_state: confirmed
generated:
  by: chatgpt
  at: 2026-07-30T15:58:00+01:00
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

# ÆPOCH OpenMontage Provider Stack

## Purpose

This document defines the provider surface currently relevant to the ÆPOCH asset-first hybrid video workflow.

It covers:

- Required environment variables
- Local dependencies
- Correct provider entry paths
- Registry status versus functional validation
- Verified provider behavior
- Known limitations
- Cost controls
- Production-use rules
- Reverification commands

For the complete upstream OpenMontage provider catalog, see:

```text
docs/PROVIDERS.md
```

This file is intentionally narrower. It documents only the providers and tools relevant to the current ÆPOCH production path.

## Current Provider Strategy

The approved production workflow combines:

1. Stock-media search and download
2. AI still-image generation and editing
3. Local word-level transcription
4. Remotion-native motion and composition
5. Human creative review

The current stack does not require every OpenMontage provider to be configured or functionally tested.

## Secret-Handling Policy

API keys live in:

```text
.env
```

The `.env` file is gitignored.

Never store API-key values in:

- `knowledge/`
- Markdown documentation
- Git commits
- Terminal logs intended for synchronization
- Redacted configuration snapshots
- Chat exports

Document variable names only.

## Required Environment Variables

```bash
# Stock media
PEXELS_API_KEY=
PIXABAY_API_KEY=

# fal.ai gateway
FAL_KEY=
```

One `FAL_KEY` may provide access to multiple fal.ai-backed tools, including:

- Recraft
- FLUX
- Kling
- Veo
- MiniMax

A detected `FAL_KEY` does not prove that every provider path works.

## Local Dependencies

### `faster-whisper`

Purpose:

- Local transcription
- Word-level narration timing
- Spoken-marker location
- Reference-audio alignment

No API key is required.

Current verified version:

```text
1.2.1
```

Verify:

```bash
./.venv/bin/python -c "import faster_whisper; print(faster_whisper.__version__)"
```

Phase 14B functionally validated `faster-whisper` with:

- Model: `small`
- Device: CPU
- Compute type: `int8`
- Word timestamps: enabled

## Project Interpreter Rule

The repository uses a dedicated virtual environment:

```text
.venv/
```

Always use:

```bash
./.venv/bin/python
```

Examples:

```bash
./.venv/bin/python -m pip install <package>
./.venv/bin/python -c "..."
./.venv/bin/python -m pytest tests/
```

Avoid relying on:

```bash
python
python3
pip
pip3
```

unless the active environment has been explicitly verified.

## Environment Loading

### Canonical provider entry path

Provider environment variables are loaded through:

```text
tools/base_tool.py
```

The loader runs when the OpenMontage tool system is imported.

The normal entry path is:

```python
from tools.tool_registry import registry
```

Importing `tools.tool_registry` loads `tools.base_tool`, which loads `.env`.

### Correct diagnostic pattern

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
print(json.dumps(registry.provider_menu_summary(), indent=2))
"
```

### Incorrect diagnostic pattern

A bare script such as:

```python
import os
import requests

print(os.environ.get('FAL_KEY'))
```

does not trigger the project `.env` loader.

This previously produced a false:

```text
401 Authentication is required
```

### Direct diagnostic exception

When bypassing the registered tool is unavoidable:

```python
import tools.base_tool
import os
import requests
```

Import the project loader before reading `os.environ`.

### Secondary environment loader

A separate loader exists at:

```text
lib/env_loader.py
```

It uses `python-dotenv` and requires an explicit:

```python
load_env()
```

It is used by some QA scripts.

It is not the provider-tool entry path and should not become the default for new provider code.

## Provider-Discovery Commands

### Capability summary

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
print(json.dumps(registry.provider_menu_summary(), indent=2))
"
```

### Per-tool support envelope

Example for Recraft:

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
env = registry.support_envelope()
print(json.dumps(env['recraft_image'], indent=2))
"
```

The support envelope can include:

- Provider
- Capability
- Status
- Install instructions
- Required environment variables
- Agent skills
- Tool metadata

## Status Vocabulary

### Registry-verified

The registry found:

- Required package or tool registration
- Required environment variable
- Required local dependency

This does not mean a network call succeeded.

### Functionally tested

A real call succeeded and its output was verified.

Verification may include:

- File exists
- File signature is valid
- Format is correct
- Dimensions are correct
- Result metadata agrees with disk state
- Call cost and duration were recorded

### Production-approved

The provider path is functionally tested and the result also passes:

- ÆPOCH brand review
- Workflow review
- Cost controls
- Phase-specific scope
- Human approval where required

A provider can be technically functional without being production-approved for a specific asset.

## Current Provider Matrix

| Provider | Tool | Purpose | Registry status | Functional status | Production status |
|---|---|---|---|---|---|
| Pexels | `pexels_image` | Stock-image search and download | available | tested | approved for scoped stock use |
| Pixabay | `pixabay_image` | Stock-image search and download | available | tested | approved for scoped stock use |
| Recraft via fal.ai | `recraft_image` | Editorial still generation | available | tested after fixes | approved for scoped generation |
| FLUX via fal.ai | `flux_image` | Still generation | available | generic path not fully characterized | use only after path-specific test |
| FLUX Kontext via fal.ai | project edit workflow | Reference-image editing | used in Phase 14A.3 | tested | approved only with explicit phase scope |
| Kling via fal.ai | `kling_video` | Generated video | available | registry-only | not production-approved |
| Veo via fal.ai | `veo_video` | Generated video | available | registry-only | not production-approved |
| MiniMax via fal.ai | `minimax_video` | Generated video | available | registry-only | not production-approved |
| faster-whisper | `transcriber` / local library | Word-level timing | available | tested in Phase 14B | approved for timing |
| ElevenLabs | not required in current path | Text-to-speech | not configured | not tested | not required |
| OpenAI | project-dependent | Language or image tasks | configured separately where applicable | not defined by this provider register | not assumed |
| Anthropic | project-dependent | Agent execution | configured separately | operational outside provider stack | not an asset provider |

## Pexels

### Purpose

- Free stock-image search
- Reference-image discovery
- Download of source photography

### Environment variable

```text
PEXELS_API_KEY
```

### Functional smoke test

Query:

```text
human creativity hands making art
```

Result:

- Approximately 8,000 search results
- One image downloaded
- Verified JPEG
- Dimensions: 867×1300

### Current status

Functionally tested.

### Production rule

Use Pexels only when:

- The required visual can be represented by stock media
- The result fits the ÆPOCH brand direction
- Licensing and attribution requirements have been checked
- The asset is recorded in the production asset index

### Known risk

Stock imagery may introduce:

- Generic visual language
- Inconsistent color treatment
- Uncontrolled wardrobe or setting
- Brand-exclusion conflicts
- Documentary implications not intended by the script

Stock assets require the same creative review as generated assets.

## Pixabay

### Purpose

- Free stock-image and illustration search
- Reference-image discovery
- Download of source assets

### Environment variable

```text
PIXABAY_API_KEY
```

### Functional smoke test

Query:

```text
human connection abstract
```

Result:

- Approximately 25,977 search results
- One asset downloaded
- Provider returned PNG bytes under a `.jpg` request
- Format normalization corrected the mismatch

### Current status

Functionally tested.

### Production rule

Verify:

- Actual binary format
- Final extension
- Dimensions
- License metadata
- Asset source URL or identifier

### Known risk

Illustration and vector results may not match the default filename extension.

Do not trust the requested output name as proof of format.

## Recraft via fal.ai

### Purpose

- Editorial still-image generation
- Direction exploration
- Production plate generation

### Environment variable

```text
FAL_KEY
```

### Current status

Functionally tested after tool fixes.

### Confirmed endpoint

```text
fal-ai/recraft/v4/text-to-image
```

### Confirmed color input behavior

The caller may provide:

```json
"#B5651D"
```

or:

```json
{"r": 181, "g": 101, "b": 29}
```

The tool normalizes inputs to RGB objects before the provider request.

### Invalid color behavior

Malformed inputs are rejected locally before a paid call.

Examples:

- Invalid hex length
- Invalid characters
- Missing RGB keys
- RGB values outside 0–255
- Non-integer RGB values

### Confirmed output behavior

Recraft may return WebP bytes even when the requested output path ends in `.png`.

The shared save helper converts or renames the file correctly.

### Confirmed style behavior

The live endpoint accepted:

```text
any
vector_illustration
```

during the verified phase.

The local five-value style enum was stale.

### Vector output behavior

```text
style="vector_illustration"
```

returns SVG.

SVG is not automatically rasterized by the shared helper.

### Prompt moderation behavior

Literal negative-exclusion-list wording may trigger moderation.

Use positive-only visual framing.

### Verified paid call

Parameters included mixed color formats:

```python
colors=["#2E86C1", {"r": 230, "g": 126, "b": 34}]
```

Result:

- Successful on first attempt after fix
- Model: v4
- Requested size: `landscape_16_9`
- Provider source: WebP
- Final output: PNG
- Dimensions: 1344×768
- `format_converted`: `True`
- Recorded cost: $0.04
- Duration: 23.12 seconds

### Current production role

Recraft is approved for scoped still-generation work where:

- The phase defines the concept and call count
- Prompts follow the approved visual direction
- Cost is explicitly bounded
- Outputs undergo brand review
- Failed calls are not automatically retried

## FLUX

### Generic `flux_image` path

Current state:

- Registry reports available
- Generic generation path was not fully functionally characterized during the provider-hardening session

Do not describe generic FLUX generation as production-verified without a path-specific test.

### FLUX Kontext editing path

Phase 14A.3 used reference-image editing to attempt a Manufactured Consensus repair.

Technical outcome:

- PASS

Creative outcome:

- FAIL, improved but unresolved

### Production rule

FLUX Kontext may be used for targeted, phase-approved image edits.

It must not be treated as proof that all FLUX models, endpoints, or parameter combinations work.

## Kling

### Purpose

Generated video.

### Environment variable

```text
FAL_KEY
```

### Current status

Registry-verified only.

### Production status

Not approved.

### Requirement before use

A deliberate validation phase must record:

- Exact endpoint
- Input schema
- Output format
- Resolution
- Duration
- Determinism behavior
- Cost
- Failure behavior
- Content moderation behavior
- Download and save behavior
- ÆPOCH creative suitability

## Veo

### Purpose

Generated video.

### Environment variable

```text
FAL_KEY
```

### Current status

Registry-verified only.

### Production status

Not approved.

### Requirement before use

Same path-specific functional and creative validation required as Kling.

## MiniMax

### Purpose

Generated video.

### Environment variable

```text
FAL_KEY
```

### Current status

Registry-verified only.

### Production status

Not approved.

### Requirement before use

Same path-specific functional and creative validation required as Kling and Veo.

## ElevenLabs

### Current role

Not required for the current Phase 14B.1 path.

### Current state

- No ElevenLabs API account was required to complete Phase 14B.
- The project uses recorded human narration for final production.
- `faster-whisper` provides local timing alignment.

### Decision

Do not block the current production workflow on ElevenLabs.

### Revisit when

Reconsider only if a future phase requires:

- Synthetic narration
- Voice cloning
- Multilingual voice generation
- Automated scratch narration
- Provider-specific timing or dubbing features

Any use of cloned or synthetic voices requires explicit approval and disclosure rules.

## Image Format Normalization

The shared helper is:

```text
tools/graphics/_shared.py::save_image_correctly()
```

Used by:

- `recraft_image`
- `pexels_image`
- `pixabay_image`

### Behavior

1. Detect actual format from byte signature.
2. Compare with requested extension.
3. Convert when practical.
4. Preserve bytes when already correct.
5. Correct the extension when conversion is not practical.
6. Avoid silent extension and content mismatches.

### JPEG behavior

When converting to JPEG:

- Alpha is flattened onto white
- Quality is 95

### PNG behavior

- Saved losslessly
- `optimize=True`

### SVG behavior

- Detected
- Not rasterized automatically
- Extension corrected

### Result metadata

Each supported tool returns:

```text
output
format
source_format
format_converted
```

## Paid-Call Policy

Do not retry a failed paid call automatically.

Before a retry, report:

- Provider
- Tool
- Endpoint
- Failure
- Root-cause hypothesis
- Calls already made
- Estimated cost incurred
- Proposed parameter or prompt change
- New maximum call count
- New maximum cost

## Known Paid Calls

### Provider smoke-test session

Real authenticated fal.ai requests:

- Two failed `422` due to malformed color format
- One failed `422` after incorrectly removing `style`
- One succeeded after RGB-object color conversion

Estimated successful-generation cost:

```text
$0.04
```

Failed schema-validation requests were believed uncharged, but billing-dashboard verification was not recorded.

### Provider-hardening verification

- One approved Recraft call
- Cost: $0.04
- Duration: 23.12 seconds
- No retries

## Provider Use Checklist

Before using a provider in a production phase:

1. Confirm the exact tool and endpoint.
2. Confirm the required environment variable is present.
3. Enter through the registered tool path.
4. Distinguish registry availability from functional validation.
5. Confirm the phase permits a paid call.
6. Confirm the maximum call count and cost.
7. Confirm expected output format and dimensions.
8. Confirm save-path behavior.
9. Capture result metadata.
10. Review the output against ÆPOCH brand rules.
11. Record failed or moderated calls before retrying.
12. Add approved assets to the production asset index.

## Reverification Commands

### Provider menu

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
print(json.dumps(registry.provider_menu_summary(), indent=2))
"
```

### Recraft envelope

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
print(json.dumps(registry.support_envelope()['recraft_image'], indent=2))
"
```

### faster-whisper

```bash
./.venv/bin/python -c "import faster_whisper; print(faster_whisper.__version__)"
```

### Python executable

```bash
./.venv/bin/python -c "import sys; print(sys.executable)"
```

## Open Provider Issues

| Issue | State |
|---|---|
| Recraft local style enum differs from live endpoint | Open |
| Generic FLUX path lacks a complete functional characterization | Open |
| Kling has not received a real test call | Open |
| Veo has not received a real test call | Open |
| MiniMax has not received a real test call | Open |
| Formal deterministic SVG rasterization is not defined | Planned only if needed |
| Failed fal.ai schema-validation billing was not checked against dashboard | Unverified |
| Full provider cost ledger is not yet maintained in `knowledge/` | Planned |

## Current Phase 14B.1 Provider Requirement

Phase 14B.1 should begin from:

- Existing Phase 14B approved plates
- New human-video recording
- New clean narration recording
- Existing Remotion implementation
- Local `faster-whisper` timing alignment

No new image-generation call is automatically authorized by entering Phase 14B.1.

Any proposed new provider call must be justified against the eight scoped corrections and approved before execution.
