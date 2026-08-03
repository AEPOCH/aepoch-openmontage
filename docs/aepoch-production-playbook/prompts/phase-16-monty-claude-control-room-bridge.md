# Phase 16 Infrastructure Handoff — Monty–Claude Control-Room Bridge

Implement the approved agent-control workflow in the OpenMontage repository.
This is infrastructure work only. Do not advance the active video production,
call paid media providers, modify generated assets, render, publish, or deploy.

## Human-approved operating contract

Chris communicates only with Monty in the primary chat. Monty proposes work and
Chris approves, rejects, or requests changes there. After approval, Monty must
be able to dispatch the tracked handoff to Claude directly, monitor execution,
inspect the resulting repository evidence, and report the verdict to Chris.
Chris must never need to paste a command into Claude, operate Claude's terminal,
or tell Monty that Claude has finished.

The repository remains the durable coordination layer. Every consequential
execution brief stays under `docs/aepoch-production-playbook/prompts/`; chat is
the approval interface, not the sole source of instructions.

## Required implementation

Build a small, dependency-free Python control bridge under `scripts/` with
focused tests under `tests/`. Use the installed Claude Code CLI; do not attempt
to inject keystrokes into an arbitrary human-owned terminal.

The bridge must support these operations with a clear CLI help surface:

1. **dispatch** — validate a tracked prompt path, acquire the single-run lock,
   record approval/starting state, start Claude Code non-interactively in the
   repository, and return a durable run ID without requiring a second terminal.
2. **status** — report the active/latest run and distinguish queued, running,
   completed, failed, interrupted, and reviewed states.
3. **wait** — wait for a run with bounded polling and stream or summarize useful
   progress without busy-spinning.
4. **output** — show Claude's captured stdout/stderr/result for diagnosis.
5. **mark-reviewed** — record Monty's independent verdict (`pass`, `fail`, or
   `pass_with_corrections`) and evidence/notes after repository review.
6. **recover** — detect a stale PID/lock after Ctrl-C, crash, or restart and
   record an interrupted run without corrupting history.

## Durable state and safety requirements

- Store runtime coordination evidence in a project-owned, documented location
  that does not pollute production artifacts. Use append-only JSONL for the
  event ledger plus one replaceable current-state JSON file if useful.
- Each run must record: run ID, tracked prompt path, explicit approval reference
  or text, timestamps, repository root, starting HEAD, process/session ID,
  state transitions, exit code, ending HEAD, captured-output paths, and Monty
  review verdict/evidence when supplied.
- Enforce exactly one active Claude execution per repository with an atomic
  lock. A second dispatch must fail clearly and non-destructively.
- Resolve and validate paths. The prompt must be a Markdown file inside
  `docs/aepoch-production-playbook/prompts/`; reject traversal, symlink escape,
  missing files, and arbitrary inline production prompts.
- Invoke Claude with an argument vector, never `shell=True`. The instruction
  must tell Claude to read `AGENT_GUIDE.md` first, execute exactly the approved
  prompt path, commit/push only as authorized by that prompt, and stop at its
  hard boundary.
- Never use `--dangerously-skip-permissions`. Make the permission mode explicit
  and configurable, with a conservative documented default.
- Capture output without secrets. Do not dump environment variables, API keys,
  or credential files into logs.
- Process exit is not equivalent to creative approval. The bridge may record
  completion but only `mark-reviewed` can record Monty's verdict.
- The bridge does not broaden authority: paid calls, provider/model changes,
  destructive operations, publishing, or other major decisions remain governed
  by the tracked prompt and Chris's approval.
- Preserve the user's unrelated dirty-worktree files. Do not stage broadly.

## Compatibility and ergonomics

- Python standard library only unless the repository already has a clearly
  appropriate dependency.
- Work on Linux with the installed `claude` CLI; produce actionable errors when
  it is missing or unauthenticated.
- Commands must be suitable for Monty to invoke through a managed process tool,
  including after chat/session compaction.
- Include a concise operator document showing the full Monty workflow and
  recovery procedure. Update ADR-029 or append a new ADR so the old
  notification-only sentinel consequence is explicitly superseded by the
  approved dispatch/monitor/review bridge.

## Tests and acceptance evidence

Write tests using a fake Claude executable/process—tests must not make network
calls or invoke the real model. Cover at minimum:

- valid dispatch and full state transition;
- rejection of paths outside the tracked prompts directory;
- second-dispatch lock rejection;
- nonzero Claude exit;
- stale-process recovery;
- captured output;
- review verdict recording;
- append-only event history and absence of secret/environment capture.

Run the focused tests and any relevant repository checks. Provide a dry-run or
fake-executable demonstration proving that Monty can dispatch, wait, inspect
output, and mark a run reviewed without another terminal.

## Documentation and handoff

Record Chris's approval and the architectural change durably. Review diffs
before editing governed `knowledge/state/` or `knowledge/operations/` files.
Commit only intended bridge, test, documentation, and knowledge changes; push
the commit. Leave a concise evidence report with commands, test results, known
limitations, and the exact command/API Monty should use for the first real
managed Claude run.

## Hard stop

Do not use the new bridge to dispatch a production tranche during its own
implementation. Do not modify the active Phase 16 asset outcome or review
commit `4d984a9`. Stop after the bridge implementation, tests, documentation,
commit, and push are complete so Monty can independently review it.

