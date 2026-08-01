---
type: Operations Runbook
title: ÆPOCH OpenMontage Runbook
description: Executable operating procedure for entering the project, validating the environment, running production phases, handling providers, preserving evidence, and closing sessions safely.
status: draft
project_state: confirmed
generated:
  by: chatgpt
  at: 2026-07-30T16:03:00+01:00
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
  - id: knowledge-current-state
    resource: ../state/current-state.md
    title: ÆPOCH OpenMontage Current State
  - id: knowledge-decisions
    resource: ../state/decisions.md
    title: ÆPOCH OpenMontage Decision Register
---

# ÆPOCH OpenMontage Runbook

## Purpose

This runbook defines the safe operating procedure for the ÆPOCH animated-video production repository.

It covers:

- Entering the project
- Activating and verifying the environment
- Reading the durable project state
- Inspecting Git safely
- Discovering providers
- Running approved production work
- Handling paid calls
- Capturing evidence
- Updating durable knowledge
- Closing and committing a session

This runbook does not replace phase-specific prompts or QA documents.

## Current Production Gate

The current production state is:

- Phase 14B complete
- Phase 14B.1 not started
- Phase 14B proof is internal only
- Full Episode 001 production is blocked
- The former recording pause is superseded; Episode 001 delivery is outside OpenMontage

During the pause, do not run:

- Claude production sessions
- Remotion renders
- Image generation
- Image editing
- Episode builds

Documentation work inside `knowledge/` is permitted.

## Repository Location

Expected repository path:

```text
~/Projects/aepoch/code/ai-video/aepoch-openmontage
```

Enter it with:

```bash
cd ~/Projects/aepoch/code/ai-video/aepoch-openmontage
```

Verify:

```bash
pwd
```

Expected suffix:

```text
/Projects/aepoch/code/ai-video/aepoch-openmontage
```

## Session Start Procedure

### 1. Enter the repository

```bash
cd ~/Projects/aepoch/code/ai-video/aepoch-openmontage
```

### 2. Read current project state

```bash
sed -n '1,260p' knowledge/state/current-state.md
```

### 3. Read the knowledge index

```bash
sed -n '1,260p' knowledge/index.md
```

### 4. Read the latest knowledge log

```bash
tail -n 120 knowledge/log.md
```

### 5. Read relevant operational documents

For provider work:

```bash
sed -n '1,320p' knowledge/operations/providers.md
```

For known failures:

```bash
sed -n '1,360p' knowledge/operations/troubleshooting.md
```

For current decisions:

```bash
sed -n '1,360p' knowledge/state/decisions.md
```

### 6. Inspect the repository without assuming a clean working tree

```bash
git status --short
```

The repository may intentionally contain modified and untracked files outside `knowledge/`.

Inspect knowledge-only status with:

```bash
git status --short --untracked-files=all -- knowledge/
```

### 7. Confirm the current branch and commit

```bash
git branch --show-current
git rev-parse HEAD
git log -1 --oneline --decorate
```

Expected branch at the Phase 14B checkpoint:

```text
aepoch-series
```

Expected Phase 14B implementation commit:

```text
63a232e
```

The live repository HEAD may be later because of knowledge-only commits.

### 8. Identify one immediate next action

Do not begin work until the current-state file provides one precise next action.

If the project state and repository disagree:

1. Stop production work.
2. Inspect the relevant phase documents.
3. Reconcile the contradiction.
4. Update `knowledge/state/current-state.md`.
5. Proceed only after review.

## Python Environment

## Preferred explicit interpreter

Use:

```bash
./.venv/bin/python
```

Examples:

```bash
./.venv/bin/python -m pip install <package>
./.venv/bin/python -c "..."
./.venv/bin/python -m pytest tests/
```

### Verify interpreter

```bash
./.venv/bin/python -c "import sys; print(sys.executable)"
```

Expected output ends with:

```text
/aepoch-openmontage/.venv/bin/python
```

### Activate the environment interactively

Optional:

```bash
source .venv/bin/activate
```

Verify:

```bash
which python
python -c "import sys; print(sys.executable)"
```

Even when activated, explicit `./.venv/bin/python` remains preferred in durable documentation and diagnostics.

### Leave the environment

```bash
deactivate
```

## Python Dependency Checks

### Verify `pytest`

```bash
./.venv/bin/python -m pytest --version
```

### Verify `faster-whisper`

```bash
./.venv/bin/python -c "import faster_whisper; print(faster_whisper.__version__)"
```

Expected verified version:

```text
1.2.1
```

### Verify basic imports

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
import faster_whisper
print('tool registry: OK')
print('faster-whisper:', faster_whisper.__version__)
"
```

## Test Commands

### Contract tests

```bash
make test-contracts
```

If this fails with:

```text
No module named pytest
```

follow:

```bash
./.venv/bin/python -m pip show pytest
./.venv/bin/python -m pip install pytest
./.venv/bin/python -m pytest --version
make test-contracts
```

Do not mark the incident resolved until `make test-contracts` passes and the result is captured.

### General project tests

Use repository-defined Make targets where possible:

```bash
make test
```

Before using an unfamiliar target:

```bash
make help 2>/dev/null || grep -nE '^[A-Za-z0-9_.-]+:' Makefile
```

## Provider Environment

Required variable names:

```text
PEXELS_API_KEY
PIXABAY_API_KEY
FAL_KEY
```

Keys remain in:

```text
.env
```

Never print key values into synchronized logs.

### Check only whether variables are loaded

Use the registered tool path:

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
registry.discover()
summary = registry.provider_menu_summary()
print(summary)
"
```

Do not use a bare `os.environ` diagnostic before importing the tool stack.

## Provider Discovery

### Human-readable provider menu

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
print(json.dumps(registry.provider_menu_summary(), indent=2))
"
```

### Recraft support envelope

```bash
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
env = registry.support_envelope()
print(json.dumps(env['recraft_image'], indent=2))
"
```

### Interpretation rule

`available` means:

- Required environment variable detected
- Tool registered
- Local dependency detected where applicable

It does not mean:

- Live API call succeeded
- Output was valid
- Cost was acceptable
- Result passed creative review
- Tool is approved for the current phase

## Paid Provider Call Procedure

Before any paid call:

1. Confirm the current phase permits it.
2. Confirm the exact provider and endpoint.
3. State the maximum call count.
4. State the maximum cost.
5. Confirm the expected output path.
6. Confirm the expected format and dimensions.
7. Confirm whether a retry is allowed.
8. Capture the result metadata.
9. Review the asset before a second call.

### Never retry automatically

After a failure or moderation event, report:

- Provider
- Tool
- Endpoint
- Exact failure
- Call count
- Estimated cost
- Likely cause
- Proposed correction
- Proposed new cap

Then obtain approval before continuing.

## Recraft Call Rules

### Color inputs

The caller may use:

```json
"#B5651D"
```

or:

```json
{"r": 181, "g": 101, "b": 29}
```

The shared helper normalizes valid hex strings to RGB objects.

### Prompt framing

Use positive-only framing.

Describe the desired:

- Composition
- Spacing
- Proportions
- Materials
- Color system
- Visual register
- Emotional tone
- Camera or illustration perspective

Do not paste long negative-exclusion lists into the prompt.

### Style values

Use only live-endpoint-supported values confirmed for the current tool version.

Previously confirmed:

```text
any
vector_illustration
```

Do not assume the local enum is current.

### Output verification

Check returned metadata:

```text
output
format
source_format
format_converted
```

Verify the file on disk:

```bash
file path/to/output
identify path/to/output 2>/dev/null || true
```

For PNG:

```bash
xxd -l 8 path/to/output
```

Expected PNG signature:

```text
89504e470d0a1a0a
```

## Stock Provider Procedure

### Pexels

Use for scoped stock-image discovery.

Record:

- Search query
- Asset identifier
- Source URL or provider reference
- Downloaded dimensions
- Actual format
- License notes
- Intended scene

### Pixabay

Apply the same procedure.

Do not trust the requested `.jpg` filename as proof of JPEG format.

## Image Format Verification

The shared save path is:

```text
tools/graphics/_shared.py::save_image_correctly()
```

It should:

1. Detect real format from bytes.
2. Convert when appropriate.
3. Preserve matching bytes.
4. Correct extensions when conversion is not possible.
5. Report source and final format.

Verify every production asset:

```bash
file path/to/image
identify path/to/image 2>/dev/null || true
```

For batches:

```bash
find path/to/assets -type f -print0 |
  xargs -0 -n1 file
```

## Word-Level Narration Timing

### Current approved method

Use local `faster-whisper` with word timestamps.

Phase 14B validated:

- Model: `small`
- CPU
- `int8`
- `word_timestamps=True`

### Timing rules

- Use real spoken words.
- Do not invent missing markers.
- Record script deviations.
- Preserve the approved script.
- Use silence detection to refine boundaries.
- Treat Lee's recording only as a reference.

### Silence detection

Example inspection command:

```bash
ffmpeg -i path/to/audio \
  -af silencedetect=noise=-35dB:d=0.2 \
  -f null - 2>&1 | tee /tmp/silencedetect.log
```

Thresholds may need adjustment based on the actual recording.

### Audio segment extraction

Phase 14B used lossless timing extraction without processing.

General pattern:

```bash
ffmpeg -i input.wav \
  -af "atrim=start=<START>:end=<END>,asetpts=PTS-STARTPTS" \
  output.wav
```

Do not add:

- Time stretching
- Normalization
- EQ
- Denoising

unless the phase explicitly authorizes audio processing.

## Superseded Phase 14B.1 Entry Procedure

**Status:** Superseded on 2026-07-31. Retained for historical context only.
Episode 001 delivery is now owned by Lee's manual production workflow. Do
not execute the procedure below unless the author explicitly restores this
scope.

Do not begin until the author explicitly lifts the recording pause.

### Required inputs

1. Clean narration recording of the approved script
2. New human-video recording
3. Existing Phase 14B proof
4. Existing Phase 14B implementation
5. Existing word-timing evidence

### Step 1 — confirm media paths

Record the exact repository-relative or absolute paths.

Do not move or rename source media without preserving the original.

### Step 2 — inspect files

```bash
file /path/to/clean-narration
file /path/to/human-video
```

### Step 3 — inspect technical metadata

```bash
ffprobe -hide_banner /path/to/clean-narration
ffprobe -hide_banner /path/to/human-video
```

Capture:

- Container
- Codec
- Sample rate
- Channels
- Duration
- Frame rate
- Resolution
- Color format
- Rotation metadata

### Step 4 — archive raw evidence

Add a new file under:

```text
knowledge/raw/terminal-logs/
```

Do not overwrite the original media or store large media files inside `knowledge/`.

### Step 5 — verify narration against approved script

Use word-level transcription.

Record:

- Missing lines
- Added words
- Material deviations
- Timing markers
- Confidence concerns

Do not silently alter the approved script.

### Step 6 — reproduce the existing Phase 14B proof

Before editing Phase 14B.1, confirm that the existing composition still renders or previews as expected.

Composition:

```text
Aepoch-E001-Phase14B-Proof
```

Do not change the Phase 14B baseline before reproducing it.

### Step 7 — create a Phase 14B.1 implementation boundary

Prefer a new source boundary or clearly isolated commit rather than overwriting the Phase 14B reference state without traceability.

The exact implementation structure should preserve direct comparison with Phase 14B.

### Step 8 — apply only the eight authorized corrections

1. One dominant human with progressive echo reveal
2. Continuous echoes composition across Beats 1 and 2
3. Stronger phone-call/catfishing visual shift
4. Continuous reflection composition across Beats 3 and 4
5. Replacement of inconsistent multiplication plate
6. Stronger consensus synchronization and output band
7. Lee's recording retained only as timing reference
8. Clean narration used for final proof audio

### Step 9 — validate at normal playback scale

Required review surfaces:

- 720p full proof
- 1080p stills
- Phone-scale contact sheet
- Transition review
- Word-alignment review
- Normal-speed playback

### Step 10 — issue separate verdicts

Record:

- Technical validation
- Workflow validation
- Timing validation
- Creative validation
- Public readiness

Do not collapse them into one binary result.

## Remotion Review Rules

### Determinism

Do not use:

```text
Math.random()
```

Use deterministic values or fixed-seed helpers.

### Brand constraints

Do not reintroduce:

- Primitive programmatic humans
- Moss where excluded
- Signal outside the approved Signal moment
- Generic hacker imagery
- Server-rack B-roll
- Named platform logos
- Coin-drop metaphors
- Generic robot hands

### Transition review

Check for:

- Blank frames
- Duplicate same-plate crossfades
- Unintended opacity dips
- Timing discontinuity
- Audio drift
- Unreadable geometry at playback scale

### Contact sheets

Use contact sheets to review:

- Neighboring-scene differentiation
- Phone-scale legibility
- Transition boundaries
- Word alignment
- Visual-family consistency

## Evidence Capture

### Terminal logs

Store under:

```text
knowledge/raw/terminal-logs/
```

Suggested naming:

```text
YYYY-MM-DD-phase-<phase>-<description>.txt
```

Example:

```text
2026-07-30-phase-14b1-media-inspection.txt
```

### Chat exports

Store under:

```text
knowledge/raw/chats/
```

Suggested naming:

```text
YYYY-MM-DD-<agent>-<phase>-<topic>.md
```

### Redacted configuration

Store under:

```text
knowledge/raw/configs-redacted/
```

Before saving:

- Remove key values
- Remove tokens
- Remove cookies
- Remove private URLs containing credentials
- Preserve variable names and non-secret structure

### Upstream documentation

Store only when a stable snapshot materially supports a decision.

Prefer links and version metadata over duplicating large external documents.

## Knowledge Update Procedure

After meaningful work:

### 1. Update current state

```text
knowledge/state/current-state.md
```

Record:

- Completed action
- New blocker
- Last verified checkpoint
- Immediate next action

### 2. Update troubleshooting

```text
knowledge/operations/troubleshooting.md
```

Add:

- Exact symptom
- Root cause
- Fix or workaround
- Verification command

### 3. Update decisions

```text
knowledge/state/decisions.md
```

Use a new ADR when the work changes:

- Architecture
- Provider strategy
- Production workflow
- Creative baseline
- Validation gates

### 4. Update production documentation

Relevant files:

```text
knowledge/production/pipeline.md
knowledge/production/asset-system.md
knowledge/production/beta-test-plan.md
```

### 5. Append to the log

```text
knowledge/log.md
```

Never rewrite old log entries to make history cleaner.

### 6. Update the index

```text
knowledge/index.md
```

Add new maintained pages and important raw sources.

## Knowledge-Only Git Procedure

### Inspect

```bash
git status --short --untracked-files=all -- knowledge/
```

### Review unstaged diff

```bash
git diff -- knowledge/
```

### Stage only knowledge

```bash
git add knowledge/
```

### Review staged diff

```bash
git diff --cached -- knowledge/
```

### Commit

```bash
git commit -m "docs(knowledge): describe change"
```

### Confirm

```bash
git status --short -- knowledge/
git log -1 --oneline --decorate
```

## Session End Checklist

Before ending a production or documentation session:

- [ ] Current state reflects reality
- [ ] One immediate next action is recorded
- [ ] New errors are in troubleshooting
- [ ] New decisions are in the ADR register
- [ ] Raw evidence is captured
- [ ] No secrets appear in knowledge files
- [ ] Knowledge-only diff has been reviewed
- [ ] Only intended knowledge files are staged
- [ ] Commit message describes the knowledge change
- [ ] Other local repository files remain untouched

## Emergency Stop Conditions

Stop work immediately if:

- The repository state contradicts `current-state.md`
- A paid call would exceed the approved cap
- A provider retry is being attempted without review
- A credential appears in a tracked or staged file
- The clean narration does not match the approved script materially
- A generated asset violates a hard brand exclusion
- A phase begins to expand beyond its approved scope
- The full Episode 001 build is started before Phase 14B.1 approval
- An agent attempts broad Git staging
- Raw evidence is about to be overwritten

## Recovery Procedure

When state is unclear:

1. Stop production.
2. Record the current terminal state.
3. Run:

```bash
git branch --show-current
git rev-parse HEAD
git status --short
git status --short -- knowledge/
```

4. Read:

```text
knowledge/state/current-state.md
docs/aepoch-production-playbook/CURRENT_STATE.md
docs/aepoch-production-playbook/PHASE_LOG.md
```

5. Compare repository files with the phase record.
6. Mark uncertain claims `provisional`.
7. Identify the last confirmed checkpoint.
8. Resume from one precise verified action.
