# Phase 16 — Control-Room Bridge Review Corrections

## Authority

Chris approved the Monty-managed control-room architecture and its implementation. Monty's independent review of commit `4a32275` found the bounded correctness and security gaps below. This handoff authorizes only their correction, tests, documentation/knowledge updates, and a focused commit/push. It does not authorize production advancement, provider generation, or paid media calls.

## Required corrections

1. Change the bridge's default Claude permission mode from `acceptEdits` to `auto`. Keep `bypassPermissions` and `--dangerously-skip-permissions` structurally forbidden. Update operator documentation and tests. The goal is approved, genuinely hands-free execution without bypass mode.
2. Never persist raw Claude stdout/stderr before redaction. The current worker redirects Claude directly into final files and scrubs only after exit, creating an in-flight secret exposure window. Capture output without writing raw content to disk (for the single JSON result, memory capture is acceptable), redact it, then atomically persist only scrubbed stdout/stderr and derive the result summary from scrubbed output. Add a test that inspects the output directory while a fake Claude process is still running and proves no raw secret is present.
3. Make worker cleanup exception-safe: an unexpected launch/wait/persistence failure must produce a terminal failed state when possible and release the run lock in a `finally` path. Do not swallow useful diagnostics; persist only scrubbed diagnostics.
4. Reconcile a dead worker left in either `queued` or `running`, so the record cannot remain permanently queued after a dispatch/worker-start race. Add focused recovery coverage.
5. Reject `mark-reviewed` unless the run is already in a terminal state (`completed`, `failed`, or `interrupted`). Add focused coverage.
6. Remove any duplicate/unreachable lock error or other directly adjacent hygiene defect found while making these changes. Do not broaden the refactor.

## Verification

- Run the complete focused bridge test file.
- Run any additional narrow static/syntax check useful for the modified Python.
- Preserve all unrelated dirty-worktree files.
- Update `docs/aepoch-production-playbook/control-room-bridge.md` so its security and permission statements precisely match behavior.
- Append durable knowledge/log evidence after first reading `knowledge/SCHEMA.md`; do not rewrite history.

## Deliverable and hard stop

Commit and push only the authorized corrections and evidence to `aepoch-series`. Report the commit, tests, changed behavior, and any residual risk. Stop. Do not dispatch the pending build-2a or landing work and do not make any paid call.
