# ÆPOCH Production — Monty–Claude Control-Room Bridge

Scope: the operator workflow for `scripts/control_bridge.py`, the bridge
that lets Monty dispatch a tracked, Chris-approved execution brief to the
Claude Code CLI directly, monitor it, inspect the resulting repository
evidence, and record an independent review verdict — without Chris ever
pasting a command or operating a second terminal.

Architecture record: `knowledge/state/decisions.md` ADR-029 and its
2026-08-03 superseding entry. Approved implementation brief:
[`prompts/phase-16-monty-claude-control-room-bridge.md`](prompts/phase-16-monty-claude-control-room-bridge.md).

## What this replaces

Before this bridge, Claude ran in a terminal Chris operated, and a
notification-only sentinel told Monty when Claude had finished — Monty
still relied on Chris to relay that signal and to copy/paste the next
command. This bridge gives Monty a managed, non-interactive execution path:
Monty is the one calling `dispatch`/`status`/`wait`/`output`, through
whatever managed-process tool Monty runs commands with. The sentinel's
notification role is superseded; Monty's independent repository review
(`mark-reviewed`) is what actually closes out a run, not process exit.

## The six operations

All commands live in one file, `scripts/control_bridge.py`, and print a
single JSON object to stdout on success (or to stderr with a nonzero exit
code on failure). There is no seventh public command — `_run-worker` is an
internal implementation detail spawned by detached `dispatch`; never invoke
it directly. `--foreground` is an option on `dispatch`, not a new command.

### Decision rule: detached vs `--foreground`

Codex's (and Monty's) managed command sandbox kills detached descendants
once the launching tool call ends, so a plain `dispatch` from inside a
managed tool call would have its worker killed before Claude finishes.

- **Monty/Codex, dispatching from inside a managed tool call:** always use
  `dispatch --foreground`. It runs the identical validated lifecycle
  synchronously in the calling process — no fork, no detach — and returns
  only once the run is terminal, so it survives the sandbox tearing down
  everything the tool call spawned.
- **A human operator at a persistent terminal:** keep using plain
  (detached) `dispatch`. It returns immediately with a `queued` run and
  lets you `status`/`wait`/`output` from the same or a different shell
  without blocking it for the run's full duration.

Both modes validate the same tracked-prompt and `--approval` inputs,
acquire the same single-run lock, write the same durable run record and
ledger events, and share one lifecycle implementation
(`_execute_run_lifecycle` in `scripts/control_bridge.py`) for the Claude
invocation, redaction, transitions, result extraction, and lock cleanup —
they cannot diverge in behavior, only in whether a worker is detached.

```bash
./.venv/bin/python scripts/control_bridge.py dispatch \
  --prompt docs/aepoch-production-playbook/prompts/<tracked-brief>.md \
  --approval "Chris approved via chat, 2026-08-03" \
  [--permission-mode auto] [--model <alias>] [--claude-bin claude] \
  [--foreground]

./.venv/bin/python scripts/control_bridge.py status [--run-id <id>]

./.venv/bin/python scripts/control_bridge.py wait [--run-id <id>] \
  [--timeout 1800] [--poll-interval 5]

./.venv/bin/python scripts/control_bridge.py output [--run-id <id>] \
  [--stdout] [--stderr] [--result] [--full] [--tail 200]

./.venv/bin/python scripts/control_bridge.py mark-reviewed --run-id <id> \
  --verdict {pass,fail,pass_with_corrections} [--notes "..."] \
  [--evidence <path-or-reference> ...]

./.venv/bin/python scripts/control_bridge.py recover [--run-id <id>]
```

Every command accepts `--repo-root <path>` before the subcommand (defaults
to this checkout); it is what makes the tests hermetic and is not normally
needed for real use.

### 1. `dispatch`

Validates that `--prompt` resolves to a real Markdown file inside
`docs/aepoch-production-playbook/prompts/` (rejects traversal, symlink
escape, missing files, and — structurally, since there is no
"inline prompt text" flag — arbitrary un-tracked production prompts),
takes the single-run lock, records the approval reference Monty was given,
and starts Claude Code in the background:

```
Read AGENT_GUIDE.md first. Then execute exactly <prompt path>. This brief is
explicitly approved by Chris (approval reference: <--approval text>). Do not
advance production. Commit and push only the authorized implementation and
evidence described in that prompt, then stop at its hard boundary.
```

By default `dispatch` returns immediately with a durable `run_id` — it does
not block. Claude runs non-interactively (`claude -p ... --output-format
json`) as a detached background process; its stdout/stderr are captured to
`control_room/output/<run_id>/`.

With `--foreground`, `dispatch` runs the exact same validated lifecycle —
same prompt/approval checks, same lock, same run record and ledger events,
same Claude invocation, redaction, transitions, and result capture — but
synchronously inside the calling process instead of spawning a detached
worker, and only returns once the run has reached a terminal status
(`completed`, `failed`, or, if the process is killed mid-run, whatever
`recover` later reconciles it to). Use it whenever the caller is a managed
tool call rather than a persistent terminal — see "Decision rule" above.
It remains genuinely hands-free with the `auto` default and, being the
same code path, structurally excludes `bypassPermissions` and
`--dangerously-skip-permissions` exactly as detached dispatch does.

The lifecycle itself (`_execute_run_lifecycle`, internal — invoked by the
detached worker `_run-worker` in normal dispatch, or directly by `dispatch
--foreground`) is exception-safe by construction: any unexpected failure
launching, waiting on, or persisting Claude's output drives the run to a
terminal `failed` state when possible
(with only scrubbed diagnostics ever written to `stderr.log`) and always
releases the run lock in a `finally` path, so a Python-level exception
during the run can never leave it stuck `queued`/`running` while still
holding the single-run lock — in either dispatch mode. That `finally`
path only runs if the process itself keeps running: it does not survive
Ctrl-C delivered as SIGKILL, a managed tool call being torn down, or the
machine being terminated. Those cases still leave a dead process holding a
stale lock/record, exactly as with detached dispatch — see "Recovery
procedure" below; `recover` is how you reconcile them, not a claim that
`finally` is unnecessary.

### 2. `status`

Reports the run's current state: `queued`, `running`, `completed`,
`failed`, `interrupted (unrecovered)`, or — once Monty has reviewed it —
`reviewed:<verdict> (run=<terminal state>)`. `status` never mutates state;
if the recorded process has died without a recorded exit, it says so
(`interrupted (unrecovered -- run recover)`) rather than lying that the run
is still active.

### 3. `wait`

Polls (default every 5s, bounded by `--timeout`, default 1800s) without
busy-spinning, and returns once the run reaches a terminal state or the
timeout elapses (`timed_out: true`, run left untouched). Use this instead of
sleeping in a loop from whatever tool is driving the bridge.

### 4. `output`

Shows the tail (default 200 lines; `--full` for everything) of the
captured stdout, stderr, and the parsed result summary (`session_id`,
`is_error`, `result`, cost/turn counters extracted from the
`--output-format json` payload). This is what Monty reads to actually
review the repository evidence a run produced.

### 5. `mark-reviewed`

Records Monty's **independent** verdict — `pass`, `fail`, or
`pass_with_corrections` — plus notes and evidence references. This is
deliberately a separate step from process completion: a `completed` run
with `exit_code: 0` has not been reviewed until `mark-reviewed` is called.
Process exit is not creative or engineering approval. `mark-reviewed`
**refuses to record a verdict** unless the run is already in a terminal
state (`completed`, `failed`, or `interrupted`) — a still-`queued`/`running`
run has no outcome yet to review, so the CLI rejects the attempt with a
clear error rather than let a verdict get attached to a run that later
changes underneath it.

### 6. `recover`

Idempotent and non-destructive. If the recorded run is `queued` or
`running` but its worker process is dead (crash, Ctrl-C, machine restart,
or a worker that died before ever reaching `running` in a dispatch/
worker-start race), marks it `interrupted` and releases the run lock so
the next `dispatch` can proceed. If the run is genuinely still alive,
`recover` reports that and changes nothing.

## Single-run lock

Exactly one Claude execution may be active per repository at a time
(`control_room/bridge.lock`). A second `dispatch` while a run is active
fails clearly and without touching any state:

```json
{"error": "A run is already active (run_id=..., pid=...). Use `status` to inspect it, `wait` to block on it, or `recover` if it is actually dead."}
```

## Where state lives, and why it isn't committed

`control_room/` (gitignored, alongside `projects/`) holds:

- `runs/<run_id>.json` — the full run record (mutable snapshot: prompt
  path, approval reference, timestamps, starting/ending HEAD,
  pid/session id, state transitions, exit code, captured-output paths,
  review verdict).
- `ledger.jsonl` — append-only event log across every run
  (`dispatched`, `run_started`, `run_finished`, `recovered_interrupted`,
  `reviewed`, …). Never rewritten, only appended to.
- `output/<run_id>/{stdout,stderr,result}.log|.json` — Claude's captured
  output, passed through a secret-redaction filter before being persisted.
- `current.json` — pointer to the most recently dispatched run, so
  `status`/`wait`/`output`/`mark-reviewed` work without `--run-id`.
- `bridge.lock` — the single-run lock.

This is runtime coordination state, not source: it is machine-local,
regenerable from a fresh run, and would otherwise bloat git history with
per-run Claude transcripts. The durable coordination layer this bridge
serves is still the repository — the **tracked prompts**
(`docs/aepoch-production-playbook/prompts/`) and **`knowledge/`** — exactly
as ADR-029 established; `control_room/` only carries this bridge's own
process bookkeeping.

## Permission mode

The bridge's `--permission-mode` choices are `acceptEdits`, `auto`
(default), `dontAsk`, `manual`, `plan` — **`bypassPermissions` is not an
available choice**, and the bridge never passes
`--dangerously-skip-permissions`. This is a hard constraint in the code
(`scripts/control_bridge.py:PERMISSION_MODE_CHOICES`), not a convention to
remember. `auto` is the approved default: it gives Monty genuinely
hands-free execution of a tracked, Chris-approved brief without ever
reaching for `bypassPermissions`/`--dangerously-skip-permissions`, which
remain structurally excluded from `PERMISSION_MODE_CHOICES` regardless of
what an operator passes on the command line.

## Secrets

The bridge never writes `os.environ` or any credential file to disk.
Claude's stdout/stderr are captured to memory only (`subprocess.PIPE` +
`communicate()`, not a file handle), scrubbed there by the redaction
filter (`scrub_secrets` in `scripts/control_bridge.py`) for common secret
shapes (`sk-…`, `AIza…`, `Bearer …`, `api_key: …`, etc.), and only the
already-scrubbed text is ever written to `control_room/output/<run_id>/`
via an atomic replace. There is no in-flight window where a partially
captured, unredacted line is readable from disk while Claude is still
running — nothing appears in the output directory until the process has
exited and its output has been scrubbed. This is defense in depth on top
of not logging environment values in the first place.

## Recovery procedure

If Monty's managed-process tool restarts, the machine crashes, an operator
hits Ctrl-C on a blocking `wait` or a plain `dispatch --foreground`
invocation, or a managed tool call running `dispatch --foreground` is
torn down mid-run (killing everything the call spawned, including the
dispatch process itself):

1. `status` — if it reports `interrupted (unrecovered -- run recover)`,
   the run's process died without a recorded outcome.
2. `recover [--run-id <id>]` — marks it `interrupted`, releases the lock.
   Safe to call speculatively; it is a no-op if the run is still alive or
   already reconciled.
3. `dispatch` a new run once `recover` (or `status`) confirms the lock is
   clear.

`wait` also self-heals: if it detects the recorded process has died
mid-poll, it reconciles the run to `interrupted` itself rather than
spinning until the timeout.

The lifecycle's `finally`-based lock release (see "1. `dispatch`" above)
only fires while the process is still executing Python — it protects
against in-process exceptions, not against the process being killed
outright. SIGKILL, a managed sandbox tearing down a tool call, or a
machine terminating mid-run all skip `finally` entirely, in both dispatch
modes. `recover` — not `finally` — is the actual answer to "the process
is gone but the lock/record still says otherwise"; do not treat `finally`
as a substitute for it.

## Fake-executable dry run (no real Claude call, no network)

`tests/scripts/test_control_bridge.py` drives the full CLI surface against
a throwaway git repo and a small fake `claude` executable (`--claude-bin`)
— covering valid dispatch, the full `queued → running → completed`
transition, path-traversal/symlink-escape/missing-file rejection,
second-dispatch lock rejection, a nonzero Claude exit, stale-process
recovery after a `kill -9` (both from `running` and from a hand-crafted
`queued` record simulating a dispatch/worker-start race), captured-output
redaction (including proving no raw secret is readable on disk while
Claude is still running), the `auto` default permission mode,
`mark-reviewed` rejecting a non-terminal run, review-verdict recording,
and append-only ledger history. `--foreground` gets its own focused
coverage: synchronous success returning a terminal record with the
dispatch process's own pid (no forked worker), lock release on
completion, a nonzero-exit run marked `failed`, secret redaction, and a
second dispatch still being rejected while a foreground run is active.
Run it with:

```bash
./.venv/bin/python -m pytest tests/scripts/test_control_bridge.py -v
```

## First real managed dispatch

Once Monty has independently reviewed this bridge's implementation and
evidence and Chris has approved a production tranche, Monty dispatches it
exactly the way the tests exercise the CLI, with the real `claude` binary
(the default for `--claude-bin`) and a written approval reference. From a
human-owned persistent terminal:

```bash
./.venv/bin/python scripts/control_bridge.py dispatch \
  --prompt docs/aepoch-production-playbook/prompts/<next-tracked-brief>.md \
  --approval "Chris approved <what> via chat on <date>"

./.venv/bin/python scripts/control_bridge.py wait --timeout 3600
./.venv/bin/python scripts/control_bridge.py output
# Monty reviews the repository evidence the run produced, then:
./.venv/bin/python scripts/control_bridge.py mark-reviewed \
  --verdict pass --notes "..." --evidence "commit <sha>"
```

From inside a Monty/Codex managed tool call, add `--foreground` and skip
`wait` — the call already blocks until the run is terminal:

```bash
./.venv/bin/python scripts/control_bridge.py dispatch \
  --prompt docs/aepoch-production-playbook/prompts/<next-tracked-brief>.md \
  --approval "Chris approved <what> via chat on <date>" \
  --foreground

./.venv/bin/python scripts/control_bridge.py output
./.venv/bin/python scripts/control_bridge.py mark-reviewed \
  --verdict pass --notes "..." --evidence "commit <sha>"
```

## Known limitations

- One active run per repository, by design — this bridge does not queue
  or parallelize dispatches.
- `wait`'s timeout only bounds the *caller's* poll loop; it does not kill
  a long-running Claude process. There is intentionally no `kill`/`cancel`
  command in this bridge — only the six operations in the approved brief.
- `recover` reconciles state; it cannot recover a run's actual outcome if
  the process was killed before writing one. Such runs are recorded as
  `interrupted` with `exit_code: null`, which is the honest answer.
- `--foreground` is an option on `dispatch`, not a seventh operation —
  there are still exactly six public operations.
