# Phase 16 — Channel Par Finish: Direct Execution Correction

## Purpose

This is a corrective execution wrapper for the fully approved brief:

`docs/aepoch-production-playbook/prompts/phase-16-channel-par-finish-v1.md`

Read that brief completely and execute all of it. Its authorization, scope, creative policy, budget, runtime, quality bar, report requirements, and hard stop remain binding.

## Why this correction is required

Run `run-20260804T201427Z-1ea5d7` falsely returned completion after entering an internal delegation loop. It reported that another agent was “running,” then the foreground Claude process exited. No required production outputs were created:

- `renders/final.mp4` absent
- `checkpoint_edit.json` absent
- `checkpoint_compose.json` absent
- `checkpoint_assets.json` unchanged and still `in_progress`

The run also used permission mode `acceptEdits`, causing routine Bash/Python/Node commands to be denied non-interactively.

## Binding execution correction

You, the foreground Claude process, must perform the production work directly.

- Do **not** use Task, subagents, background agents, delegation, teams, or asynchronous workers.
- Do **not** tell another agent to do the work.
- Do **not** return while any background task is running.
- Do **not** return a plan, progress note, or “it is running” message as the final result.
- Use direct file reads, direct edits, registered pipeline tools, Python/Node/FFmpeg commands, and synchronous render commands yourself.
- Routine commands are authorized by Chris's approved completion scope and this run will use Claude permission mode `auto`.
- Do not request interactive permission for safe in-scope project commands; execute them under the available automatic permission policy.

## Completion proof required before returning

Do not claim completion unless every item below exists and has been directly verified in this foreground process:

1. `projects/aepoch-blog-pilot-what-is-aepoch/checkpoint_assets.json`
   - `status: completed`
   - `human_approved: true`
2. `projects/aepoch-blog-pilot-what-is-aepoch/artifacts/edit_decisions.json`
3. `projects/aepoch-blog-pilot-what-is-aepoch/checkpoint_edit.json`
   - `status: completed`
4. `projects/aepoch-blog-pilot-what-is-aepoch/artifacts/render_report.json`
5. `projects/aepoch-blog-pilot-what-is-aepoch/artifacts/final_review.json`
6. `projects/aepoch-blog-pilot-what-is-aepoch/checkpoint_compose.json`
   - `status: completed`
7. `projects/aepoch-blog-pilot-what-is-aepoch/renders/final.mp4`
   - nonzero file size
   - ffprobe-confirmed 1920x1080, 30fps, H.264/AAC
   - duration within pipeline tolerance of 280 seconds
8. Representative review frames spanning the complete runtime
9. A recorded normal-speed/channel-par review verdict
10. No publish checkpoint and no external upload

If a genuine blocker prevents completion, return a precise blocker report containing the exact failing command, error output, work completed, and remaining work. Do not report success.

## Hard stop

Same as the governing brief: stop after compose and final review. No publishing, upload, deployment, scheduling, or paid provider call.
