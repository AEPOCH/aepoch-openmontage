SUPERSEDED — DO NOT EXECUTE

Phase 14B.1 is no longer on the active production path. Lee is editing the
author's narration and video directly and will produce Episode 001 manually.

The historical brief below is retained only to preserve the prior plan and
review findings. Use the current handoff instead:

`docs/aepoch-production-playbook/prompts/phase-15-blog-video-readiness.md`

---

Begin ÆPOCH Phase 14B.1: proof polish for Episode 001.

This is an execution brief for Claude Code. Do not begin execution merely
because this brief exists.

ENTRY GATE

Phase 14B.1 may begin only after the author explicitly:

1. Confirms that the recording session is complete and lifts the production
   pause.
2. Supplies the exact path to a clean narration recording of the approved
   script.
3. Supplies the exact path to the new human-video recording.

Before modifying or rendering anything, Claude must verify that both files
exist and are readable, record their exact source paths, preserve the
originals, confirm that the approved narration script is available, and
confirm that the Phase 14B baseline remains reproducible.

If any condition is missing, report it and stop. Do not transcribe or copy
media, run Remotion, modify source, generate assets, call providers, or
update project state.

OBJECTIVE

Polish the existing Phase 14B proof covering narration beats N06–N09 so it
can receive a new public-readiness review.

The proof currently runs 47.00 seconds (1410 frames at 30 fps). Its exact
Phase 14B.1 duration may change only as required by the clean narration's
real N06–N09 word and silence boundaries.

This is not a new proof, a public release, or a full Episode 001 build.

APPROVED SCOPE

- Validate the two supplied recordings without modifying the originals.
- Verify the clean narration against the approved script and derive new
  word-level timings for N06–N09.
- Reproduce and preserve Phase 14B before editing.
- Add an isolated Phase 14B.1 implementation and composition for direct
  comparison with Phase 14B.
- Apply exactly the eight approved corrections below.
- Produce the beta-plan review evidence and a Phase 14B.1 QA report.
- Stop at explicit author review. A successful render does not approve
  creative quality, public readiness, or full-episode production.

AUTHORITATIVE INPUTS

Repository and locked baseline:

- Branch at brief review: `aepoch-series`
- HEAD at brief review: `9cb05cf`
- Phase 14B implementation: commit `63a232e`
- Asset-first proof tag: `aepoch-e001-asset-first-proof-v0.1.0`
- Tier 1 tag: `aepoch-tier1-beta-v0.1.0`
- Episode static tag: `aepoch-e001-static-v0.1.0`
- Episode timing tag: `aepoch-e001-timing-v0.1.0`

Phase 14B baseline:

- Composition: `Aepoch-E001-Phase14B-Proof`
- Source:
  `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/`
- Runtime plates:
  `remotion-composer/public/aepoch-e001-phase14b/`
- Reference-derived proof audio:
  `remotion-composer/public/aepoch-e001-phase14b-proof-audio.wav`
- Timing:
  `projects/aepoch-episodes/001-what-is-aepoch/inputs/phase-14b-proof-word-timings.json`
- Preview:
  `projects/aepoch-episodes/001-what-is-aepoch/renders/previews/phase-14b/aepoch-e001-phase14b-proof-720p.mp4`
- QA:
  `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b-production-proof-review.md`

The current proof passed technical validation, the asset-first workflow,
and word-level timing. Creative validation was conditional and public
readiness was denied.

The exact new-media paths are not known at brief review. Obtain them only
from the author's gate-lifting message; do not guess them.

FILES TO INSPECT

Read completely before execution:

- `AGENT_GUIDE.md`
- `PROJECT_CONTEXT.md`
- `knowledge/SCHEMA.md`
- `knowledge/state/current-state.md`
- `knowledge/state/decisions.md`
- `knowledge/index.md`
- the latest relevant entries in `knowledge/log.md`
- `knowledge/operations/runbook.md`
- `knowledge/operations/troubleshooting.md`
- `knowledge/production/pipeline.md`
- `knowledge/production/asset-system.md`
- `knowledge/production/beta-test-plan.md`
- `docs/aepoch-production-playbook/CURRENT_STATE.md`
- `docs/aepoch-production-playbook/PHASE_LOG.md`
- `brands/aepoch/SERIES_BIBLE.md`
- `brands/aepoch/VISUAL_LANGUAGE.md`
- `brands/aepoch/MOTION_TOKENS.md`
- `brands/aepoch/ASSET_INDEX.md`
- `projects/aepoch-episodes/001-what-is-aepoch/inputs/episode-brief.md`
- `projects/aepoch-episodes/001-what-is-aepoch/inputs/narration-script.md`
- `projects/aepoch-episodes/001-what-is-aepoch/inputs/scene-plan.yaml`
- the Phase 14B timing and QA files listed above
- every file under
  `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b/`
- `remotion-composer/src/Root.tsx`
- `remotion-composer/package.json`

REQUIRED CORRECTIONS

1. Dominant-human opening
   - Begin with one dominant human.
   - Reveal synthetic echoes progressively instead of showing all figures
     from frame 0.

2. Continuous echoes composition
   - Treat Beats 1 and 2 as one continuous `echoes-a` composition.
   - Replace the same-plate crossfade with an internal state change and no
     visible reset or blank frame.

3. Stronger phone-call/catfishing shift
   - Make Beat 4's internal state change unmistakable at normal speed.
   - Develop the existing reflection concept without literal phone,
     dating-app, or social-platform UI.

4. Continuous reflection composition
   - Treat Beats 3 and 4 as one continuous `reflection-a` composition.
   - Replace the same-plate crossfade with continuous development and no
     visible reset.

5. Multiplication replacement
   - Remove the Phase 14A.1 abstract multiplication plate from the new
     runtime.
   - Use an approved Direction A human plate or an isolated approved
     synthetic figure multiplied deterministically in Remotion.
   - Do not reintroduce Phase 13C.2A primitive programmatic humans.

6. Stronger Manufactured Consensus
   - Make per-figure synchronization, convergence, the shared output band,
     and final lockstep unmistakable at normal speed and phone scale.
   - Continue treating `consensus-edit-a` as the figure plate unless a
     blocker is reported; strengthen the Remotion-native geometry.

7. Lee recording is reference only
   - Preserve it only for timing comparison.
   - Do not use its audio or blindly copy its timings into Phase 14B.1.

8. Clean approved-script narration
   - Use the supplied clean narration in the new proof.
   - Transcribe it with real word timestamps, compare it with the approved
     script, and document deviations and confidence concerns.
   - Derive all new boundaries and anchors from words and silences actually
     present in the clean recording.

PERMITTED CHANGES

- Add isolated source under
  `remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b1/`.
- Register a distinct `Aepoch-E001-Phase14B1-Proof` composition.
- Add Phase 14B.1 runtime assets and proof audio under distinct
  `aepoch-e001-phase14b1` paths.
- Add Phase 14B.1 timing JSON, previews, stills, contact sheets, QA report,
  and a new dated raw terminal-evidence capture.
- Modify shared composition registration only as required for the new
  composition.
- Record observed results as awaiting author review after evidence exists,
  following `knowledge/SCHEMA.md` diff-review rules.

The human-video recording is a mandatory validated input, but its use in
the proof is phase-dependent. Integrate it only if the author's
gate-lifting instruction explicitly approves a placement within N06–N09.
Otherwise record BT-I02 as not applicable with the reason; do not use
footage merely because it exists.

PROHIBITED CHANGES

- Do not overwrite or modify Phase 14B source, assets, audio, timing,
  preview, or QA evidence.
- Do not change the approved script, facts, scene order, Direction A style,
  Remotion runtime, or N06–N09 content scope. Timing boundaries may move
  only to match the clean narration.
- Do not begin full Episode 001 production or episode-scale asset work.
- Do not generate or edit images, video, music, or speech.
- No provider or paid call is authorized. If one becomes necessary, report
  the exact tool, provider, model, reason, call count, and estimated cost,
  then stop for a revised authorization.
- Do not add captions, final mastering, or a public-release render.
- Do not introduce primitive humans, `Math.random()`, Moss, unapproved
  Signal, generic hacker imagery, server racks, named platform logos,
  coin-drop imagery, robot hands, or literal dating/social UI.
- Do not alter unrelated working-tree changes.
- Do not stage, commit, tag, publish, deploy, mark Phase 14B.1 complete or
  public-ready, or begin a later phase.

EXECUTION SEQUENCE

1. Verify and quote the entry-gate authorization; record both media paths.
2. Report branch, HEAD, locked tags, dirty scope overlaps, disk/memory,
   objective, scope, and stop conditions.
3. Validate both original media files with `test`, `file`, and `ffprobe`;
   capture metadata and preserve distinct working copies.
4. Transcribe the clean narration locally with `faster-whisper` word
   timestamps. Compare N06–N09 with the approved script. Stop for author
   resolution on any material deviation or unusable audio.
5. Confirm the Phase 14B composition registers and reproduce a baseline
   still or short preview. Stop on unexplained regression.
6. Create the isolated Phase 14B.1 composition, media paths, and timing
   record without changing Phase 14B.
7. Implement only the eight corrections.
8. Validate each correction with full-resolution stills or short previews,
   real spoken anchors, normal-speed playback, and phone-scale review.
9. Render one 1280×720 H.264/AAC draft at 30 fps and concurrency 1.
10. Produce the clean-proof, word-alignment, transition, and phone-scale
    contact sheets plus the QA report.
11. Run the complete beta-test matrix, record exact commands and evidence,
    show scoped diffs/status, and stop for author verdict.

VALIDATION COMMANDS

Use the author's literal paths:

```bash
test -f /exact/path/to/clean-narration
test -f /exact/path/to/human-video
file /exact/path/to/clean-narration
file /exact/path/to/human-video
ffprobe -hide_banner /exact/path/to/clean-narration
ffprobe -hide_banner /exact/path/to/human-video
```

Repository and baseline:

```bash
git branch --show-current
git rev-parse --short HEAD
git tag --list 'aepoch-*'
git status --short --untracked-files=all
```

From `remotion-composer/`, after the gate passes:

```bash
npx remotion compositions src/index.tsx
npx remotion still src/index.tsx Aepoch-E001-Phase14B-Proof /tmp/aepoch-phase14b-baseline.png --frame=0
npx remotion still src/index.tsx Aepoch-E001-Phase14B1-Proof /tmp/aepoch-phase14b1-a.png --frame=0
npx remotion still src/index.tsx Aepoch-E001-Phase14B1-Proof /tmp/aepoch-phase14b1-b.png --frame=0
sha256sum /tmp/aepoch-phase14b1-a.png /tmp/aepoch-phase14b1-b.png
npx remotion render src/index.tsx Aepoch-E001-Phase14B1-Proof ../projects/aepoch-episodes/001-what-is-aepoch/renders/previews/phase-14b1/aepoch-e001-phase14b1-proof-720p.mp4 --codec=h264 --crf=26 --audio-codec=aac --audio-bitrate=128k --scale=0.6666666666666666 --concurrency=1
```

Validate the output from the repository root:

```bash
ffprobe -hide_banner projects/aepoch-episodes/001-what-is-aepoch/renders/previews/phase-14b1/aepoch-e001-phase14b1-proof-720p.mp4
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 projects/aepoch-episodes/001-what-is-aepoch/renders/previews/phase-14b1/aepoch-e001-phase14b1-proof-720p.mp4
rg -n "Math\\.random|Moss|Signal" remotion-composer/src/aepoch/episodes/001-what-is-aepoch/phase14b1
git diff --check
git status --short --untracked-files=all
```

Inspect and use the repository's current TypeScript command. Record its
full diagnostics before and after implementation; Phase 14B.1 must add
zero diagnostics relative to the documented 15-diagnostic baseline. Record
the replacement multiplication asset's provenance and hash so QA can prove
the old Phase 14A.1 plate is absent; do not infer this from a filename.

EXPECTED EVIDENCE AND OUTPUTS

- Input-media metadata and preservation evidence for both recordings.
- A clean-narration script comparison and Phase 14B.1 word-timing JSON.
- Preserved and reproducible Phase 14B baseline.
- Isolated Phase 14B.1 source, runtime media, and composition.
- One valid 720p proof with clean narration and valid audio/video streams.
- 1080p correction and anchor stills.
- Clean-proof, word-alignment, transition, and phone-scale contact sheets.
- Test records for beta-plan families A–J, including all eight corrections.
- QA report:
  `projects/aepoch-episodes/001-what-is-aepoch/qa/phase-14b1-production-proof-review.md`
- Separate technical, workflow, timing, creative, and public-readiness
  verdicts, with author-controlled verdicts left pending.
- No staged files or commit.

HUMAN REVIEW CRITERIA

The author reviews the proof at normal speed and phone scale, then assigns:

- Technical PASS only with a valid deterministic render, no new type
  diagnostics, no missing assets, and no blank transitions.
- Workflow PASS only if the asset-first hybrid method and provenance remain
  intact.
- Timing PASS only if clean narration, real word-level markers, correct
  spoken-anchor alignment, and no perceptible drift are verified.
- Creative PASS only if all eight corrections are resolved, every concept
  reads clearly at normal speed, Direction A remains coherent, and there is
  no blocking brand defect.
- Public-ready YES only after technical, workflow, timing, and creative
  PASS; approved clean narration; final proof review; and explicit author
  approval.

Human review must fail public readiness automatically if Lee's audio or the
old multiplication plate remains; either same-plate crossfade remains;
echoes are all visible from frame 0; Manufactured Consensus remains subtle;
a primitive human or hard brand exclusion appears; required evidence is
missing; or author approval is absent.

STOP CONDITIONS

Stop if the entry gate fails; an input is missing, unreadable, corrupt, or
implausible; narration materially diverges from the approved script; audio
is unusable; Phase 14B cannot be reproduced; work would overwrite Phase
14B or exceed N06–N09; a provider call or other prohibited change becomes
necessary; a scope decision is unresolved; or a blocking test failure
cannot be corrected within this brief.

After producing the authorized evidence, stop for author review. Do not
mark Phase 14B.1 complete or public-ready and do not begin full Episode 001.

DEFINITION OF DONE

Claude Code's execution handoff is done only when:

- Every entry condition is evidenced and original recordings remain
  untouched.
- Clean narration matches the approved script, or the author has resolved
  every material deviation.
- Phase 14B remains unchanged, preserved, and reproducible.
- All eight corrections are implemented within an isolated N06–N09
  Phase 14B.1 composition.
- The proof uses clean narration and timings derived from that recording.
- Beta-plan technical, workflow, timing, transition, brand, determinism,
  audio-visual, normal-speed, and phone-scale checks have evidence.
- The required preview, stills, contact sheets, timing JSON, raw evidence,
  and QA report exist at the documented paths.
- The QA report records separate verdicts and leaves creative validation
  and public readiness for explicit author decision.
- No unapproved production scope changed; nothing was staged, committed,
  tagged, published, or deployed.
- Claude Code stops for review without marking Phase 14B.1 complete or
  beginning full Episode 001 production.
