#!/usr/bin/env python3
"""Monty-Claude control-room bridge.

A dependency-free CLI that lets Monty dispatch a tracked, human-approved
execution brief to the Claude Code CLI non-interactively, monitor it,
inspect captured output, and record Monty's independent review verdict --
without Chris ever touching a second terminal.

Approved architecture: see `knowledge/state/decisions.md` ADR-029 and its
superseding entry, and the bounded implementation brief at
`docs/aepoch-production-playbook/prompts/phase-16-monty-claude-control-room-bridge.md`.

Commands
--------
    dispatch       Validate a tracked prompt, take the run lock, start Claude
                   Code in the background, and return a durable run ID.
    status         Report the active/latest run's state.
    wait           Block (with bounded polling) until a run finishes.
    output         Show a run's captured stdout/stderr/result.
    mark-reviewed  Record Monty's independent verdict on a finished run.
    recover        Detect and reconcile a stale lock/run after a crash,
                   Ctrl-C, or restart.

Durable state lives under `<repo_root>/control_room/` (gitignored -- runtime
coordination evidence, not a production artifact and not repository source;
see the operator doc for why). Nothing in this module ever writes an
environment variable or raw secret value to disk; captured Claude output is
passed through a redaction filter before being persisted.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

DEFAULT_REPO_ROOT = Path(__file__).resolve().parent.parent

# Permission modes this bridge will pass to Claude Code. `bypassPermissions`
# is deliberately excluded -- it is the `--dangerously-skip-permissions`
# equivalent and the brief forbids that class of invocation outright.
PERMISSION_MODE_CHOICES = ["acceptEdits", "auto", "dontAsk", "manual", "plan"]
DEFAULT_PERMISSION_MODE = "auto"

REVIEW_VERDICTS = ["pass", "fail", "pass_with_corrections"]

TERMINAL_STATUSES = {"completed", "failed", "interrupted"}


class BridgeError(RuntimeError):
    """A clear, user-facing bridge failure. Never leaves state half-written."""


# --------------------------------------------------------------------------
# Paths
# --------------------------------------------------------------------------


@dataclass(frozen=True)
class Paths:
    repo_root: Path
    control_root: Path
    runs_dir: Path
    output_dir: Path
    ledger_path: Path
    lock_path: Path
    current_path: Path
    prompts_dir: Path

    @classmethod
    def for_repo(cls, repo_root: Path) -> "Paths":
        repo_root = repo_root.resolve()
        control_root = repo_root / "control_room"
        return cls(
            repo_root=repo_root,
            control_root=control_root,
            runs_dir=control_root / "runs",
            output_dir=control_root / "output",
            ledger_path=control_root / "ledger.jsonl",
            lock_path=control_root / "bridge.lock",
            current_path=control_root / "current.json",
            prompts_dir=repo_root / "docs" / "aepoch-production-playbook" / "prompts",
        )

    def ensure_dirs(self) -> None:
        self.runs_dir.mkdir(parents=True, exist_ok=True)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.ledger_path.touch(exist_ok=True)


# --------------------------------------------------------------------------
# Small helpers
# --------------------------------------------------------------------------


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def new_run_id() -> str:
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    return f"run-{stamp}-{os.urandom(3).hex()}"


def _atomic_write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_name = tempfile.mkstemp(dir=str(path.parent), prefix=".tmp-", suffix=".json")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            json.dump(data, fh, indent=2)
            fh.write("\n")
        os.replace(tmp_name, path)
    except Exception:
        try:
            os.remove(tmp_name)
        except OSError:
            pass
        raise


def _pid_alive(pid: Optional[int]) -> bool:
    if not pid:
        return False
    try:
        os.kill(pid, 0)
    except ProcessLookupError:
        return False
    except PermissionError:
        return True
    return True


def git_head(repo_root: Path) -> Optional[str]:
    try:
        proc = subprocess.run(
            ["git", "rev-parse", "HEAD"],
            cwd=str(repo_root),
            capture_output=True,
            text=True,
            timeout=10,
        )
    except (OSError, subprocess.SubprocessError):
        return None
    if proc.returncode != 0:
        return None
    return proc.stdout.strip() or None


# --------------------------------------------------------------------------
# Secret redaction -- defense in depth over captured Claude output.
# --------------------------------------------------------------------------

_SECRET_PATTERNS = [
    re.compile(r"sk-[A-Za-z0-9_-]{10,}"),
    re.compile(r"AIza[0-9A-Za-z_-]{10,}"),
    re.compile(r"gsk_[A-Za-z0-9]{10,}"),
    re.compile(r"xox[abpr]-[A-Za-z0-9-]{10,}"),
    re.compile(
        r"(?i)\b(api[_-]?key|secret|token|password|passwd|authorization)\b\s*[:=]\s*"
        r"[\"']?([^\s\"']{6,})[\"']?"
    ),
    re.compile(r"(?i)\bBearer\s+([A-Za-z0-9._-]{10,})"),
]


def scrub_secrets(text: str) -> str:
    redacted = text
    for pattern in _SECRET_PATTERNS:
        if pattern.groups:
            redacted = pattern.sub(
                lambda m: m.group(0).replace(m.group(m.lastindex), "***REDACTED***"),
                redacted,
            )
        else:
            redacted = pattern.sub("***REDACTED***", redacted)
    return redacted


def _atomic_write_text(path: Path, text: str) -> None:
    """Write `text` to `path` atomically -- a concurrent reader sees either
    the previous complete content or the new complete content, never a
    partial write. Used so captured Claude output only ever appears on disk
    already scrubbed; raw output is never written to `path`.
    """
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_name = tempfile.mkstemp(dir=str(path.parent), prefix=".tmp-", suffix=path.suffix or ".log")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            fh.write(text)
        os.replace(tmp_name, path)
    except Exception:
        try:
            os.remove(tmp_name)
        except OSError:
            pass
        raise


# --------------------------------------------------------------------------
# Run record persistence
# --------------------------------------------------------------------------


def _run_path(paths: Paths, run_id: str) -> Path:
    return paths.runs_dir / f"{run_id}.json"


def load_run(paths: Paths, run_id: str) -> Optional[dict]:
    path = _run_path(paths, run_id)
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def save_run(paths: Paths, record: dict) -> None:
    _atomic_write_json(_run_path(paths, record["run_id"]), record)


def current_run_id(paths: Paths) -> Optional[str]:
    if not paths.current_path.exists():
        return None
    data = json.loads(paths.current_path.read_text(encoding="utf-8"))
    return data.get("run_id")


def set_current_run_id(paths: Paths, run_id: str) -> None:
    _atomic_write_json(paths.current_path, {"run_id": run_id, "updated_at": now_iso()})


def append_ledger(paths: Paths, event: dict) -> None:
    line = json.dumps({"ts": now_iso(), **event}, sort_keys=True)
    with open(paths.ledger_path, "a", encoding="utf-8") as fh:
        fh.write(line + "\n")


def _transition(record: dict, to_status: str) -> None:
    record["status"] = to_status
    record.setdefault("state_transitions", []).append({"to": to_status, "at": now_iso()})


# --------------------------------------------------------------------------
# Lock
# --------------------------------------------------------------------------


def read_lock(paths: Paths) -> Optional[dict]:
    if not paths.lock_path.exists():
        return None
    try:
        return json.loads(paths.lock_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return None


def acquire_lock(paths: Paths, run_id: str, pid: Optional[int]) -> None:
    """Atomically create the lock file (`O_EXCL`).

    `cmd_dispatch` already checks `read_lock` up front and raises a
    friendlier, situation-specific error before ever reaching here; this
    `except` only fires if another dispatch wins a race in the gap between
    that check and this call. Report the lock actually on disk rather than
    a generic message, since the caller's own pre-check message does not
    apply to a race it already ruled out.
    """
    paths.control_root.mkdir(parents=True, exist_ok=True)
    payload = json.dumps({"run_id": run_id, "pid": pid, "acquired_at": now_iso()}, indent=2)
    try:
        fd = os.open(str(paths.lock_path), os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o644)
    except FileExistsError as exc:
        existing = read_lock(paths) or {}
        raise BridgeError(
            "Lock acquisition raced with a concurrent dispatch (now held by "
            f"run_id={existing.get('run_id')}, pid={existing.get('pid')}); "
            "refusing to acquire a second lock."
        ) from exc
    with os.fdopen(fd, "w", encoding="utf-8") as fh:
        fh.write(payload)


def update_lock_pid(paths: Paths, run_id: str, pid: int) -> None:
    lock = read_lock(paths)
    if lock is None or lock.get("run_id") != run_id:
        raise BridgeError(f"Cannot update lock: no lock held for run {run_id}")
    lock["pid"] = pid
    _atomic_write_json(paths.lock_path, lock)


def release_lock(paths: Paths, expected_run_id: str) -> bool:
    lock = read_lock(paths)
    if lock is None:
        return False
    if lock.get("run_id") != expected_run_id:
        return False
    try:
        os.remove(paths.lock_path)
    except FileNotFoundError:
        pass
    return True


# --------------------------------------------------------------------------
# Prompt path validation
# --------------------------------------------------------------------------


def resolve_tracked_prompt(paths: Paths, raw: str) -> Path:
    """Resolve `raw` to a real file inside `paths.prompts_dir`.

    Rejects traversal, symlink escape, missing files, and anything that is
    not a Markdown file -- this is the only way a prompt reaches Claude, so
    it is also how the bridge refuses arbitrary inline production prompts.
    """
    if not raw:
        raise BridgeError("A --prompt path is required.")
    candidate = Path(raw)
    if not candidate.is_absolute():
        candidate = paths.repo_root / candidate
    try:
        resolved = candidate.resolve(strict=True)
    except FileNotFoundError as exc:
        raise BridgeError(f"Prompt path does not exist: {raw}") from exc
    try:
        prompts_root = paths.prompts_dir.resolve(strict=True)
    except FileNotFoundError as exc:
        raise BridgeError(f"Tracked prompts directory is missing: {paths.prompts_dir}") from exc
    try:
        resolved.relative_to(prompts_root)
    except ValueError as exc:
        raise BridgeError(
            f"Prompt path must resolve inside {paths.prompts_dir}; "
            f"got {resolved} (traversal or symlink escape rejected)"
        ) from exc
    if not resolved.is_file():
        raise BridgeError(f"Prompt path is not a regular file: {resolved}")
    if resolved.suffix.lower() != ".md":
        raise BridgeError(f"Prompt path must be a Markdown (.md) file: {resolved}")
    return resolved


def build_instruction(prompt_rel: str, approval: str) -> str:
    return (
        "Read AGENT_GUIDE.md first. Then execute exactly "
        f"{prompt_rel}. This brief is explicitly approved by Chris "
        f"(approval reference: {approval}). Do not advance production. "
        "Commit and push only the authorized implementation and evidence "
        "described in that prompt, then stop at its hard boundary."
    )


# --------------------------------------------------------------------------
# Status display
# --------------------------------------------------------------------------


def effective_status(record: dict) -> str:
    base = record["status"]
    if base in ("queued", "running") and not _pid_alive(record.get("pid")):
        base = "interrupted (unrecovered -- run `recover`)"
    if record.get("review"):
        return f"reviewed:{record['review']['verdict']} (run={base})"
    return base


def display_record(record: dict) -> dict:
    return {
        "run_id": record["run_id"],
        "status": effective_status(record),
        "prompt_path": record["prompt_path"],
        "approval_reference": record["approval_reference"],
        "created_at": record["created_at"],
        "started_at": record["started_at"],
        "ended_at": record["ended_at"],
        "exit_code": record["exit_code"],
        "starting_head": record["starting_head"],
        "ending_head": record["ending_head"],
        "pid": record["pid"],
        "session_id": record.get("session_id"),
        "review": record.get("review"),
        "stdout_path": record["stdout_path"],
        "stderr_path": record["stderr_path"],
        "result_path": record["result_path"],
    }


# --------------------------------------------------------------------------
# Reconciliation (shared by `recover` and the safety-net in `wait`)
# --------------------------------------------------------------------------


def reconcile_interrupted(paths: Paths, run_id: str) -> bool:
    """If `run_id` is recorded `queued` or `running` but its worker process
    is dead, mark it interrupted and release its lock. Returns True if
    anything changed. Idempotent and non-destructive -- safe to call
    repeatedly.

    Covers both statuses because a worker can die before it ever gets to
    transition its own record to `running` (e.g. a dispatch/worker-start
    race, or the worker crashing on startup) -- without this, such a run
    would stay `queued` forever with a dead pid and a held lock.
    """
    record = load_run(paths, run_id)
    if record is None:
        return False
    changed = False
    if record["status"] in ("queued", "running") and not _pid_alive(record.get("pid")):
        from_status = record["status"]
        _transition(record, "interrupted")
        record["ended_at"] = record.get("ended_at") or now_iso()
        save_run(paths, record)
        append_ledger(paths, {"event": "recovered_interrupted", "run_id": run_id, "from_status": from_status})
        changed = True
    lock = read_lock(paths)
    if lock and lock.get("run_id") == run_id and not _pid_alive(lock.get("pid")):
        if release_lock(paths, run_id):
            append_ledger(paths, {"event": "lock_released_stale", "run_id": run_id})
            changed = True
    return changed


# --------------------------------------------------------------------------
# Result extraction
# --------------------------------------------------------------------------


def extract_result(stdout_text: str) -> dict:
    """Parse the already-captured (and already-scrubbed) stdout text into a
    result summary. Operates on in-memory text, never re-reads from disk,
    so it never sees anything other than fully scrubbed content.
    """
    text = stdout_text.strip()
    if not text:
        return {"parsed": False, "reason": "empty stdout"}
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        return {"parsed": False, "reason": "stdout was not a single JSON object", "raw_tail": text[-2000:]}
    summary = {"parsed": True}
    for key in ("session_id", "is_error", "result", "subtype", "num_turns", "duration_ms", "total_cost_usd"):
        if key in data:
            summary[key] = data[key]
    return summary


# --------------------------------------------------------------------------
# Commands
# --------------------------------------------------------------------------


def cmd_dispatch(args: argparse.Namespace, paths: Paths) -> dict:
    paths.ensure_dirs()

    if shutil.which(args.claude_bin) is None and not Path(args.claude_bin).exists():
        raise BridgeError(
            f"Claude executable '{args.claude_bin}' was not found on PATH. "
            "Install/authenticate the Claude Code CLI or pass --claude-bin."
        )

    lock = read_lock(paths)
    if lock is not None:
        if _pid_alive(lock.get("pid")):
            raise BridgeError(
                f"A run is already active (run_id={lock.get('run_id')}, pid={lock.get('pid')}). "
                "Use `status` to inspect it, `wait` to block on it, or `recover` if it is actually dead."
            )
        raise BridgeError(
            f"Stale lock detected for run_id={lock.get('run_id')} (pid {lock.get('pid')} is not running). "
            "Run `recover` before dispatching a new run."
        )

    if not args.approval:
        raise BridgeError("An --approval reference (Chris's approval text/pointer) is required.")

    prompt_abs = resolve_tracked_prompt(paths, args.prompt)
    prompt_rel = str(prompt_abs.relative_to(paths.repo_root))

    run_id = new_run_id()
    starting_head = git_head(paths.repo_root)
    instruction = build_instruction(prompt_rel, args.approval)
    out_dir = paths.output_dir / run_id
    out_dir.mkdir(parents=True, exist_ok=True)

    record = {
        "run_id": run_id,
        "prompt_path": prompt_rel,
        "approval_reference": args.approval,
        "instruction": instruction,
        "created_at": now_iso(),
        "started_at": None,
        "ended_at": None,
        "repo_root": str(paths.repo_root),
        "starting_head": starting_head,
        "ending_head": None,
        "pid": None,
        "claude_pid": None,
        "session_id": None,
        "permission_mode": args.permission_mode,
        "claude_bin": args.claude_bin,
        "model": args.model,
        "exit_code": None,
        "status": "queued",
        "state_transitions": [{"to": "queued", "at": now_iso()}],
        "stdout_path": str(out_dir / "stdout.log"),
        "stderr_path": str(out_dir / "stderr.log"),
        "result_path": str(out_dir / "result.json"),
        "review": None,
    }
    save_run(paths, record)
    set_current_run_id(paths, run_id)
    acquire_lock(paths, run_id, pid=os.getpid())

    worker_cmd = [
        sys.executable,
        str(Path(__file__).resolve()),
        "--repo-root", str(paths.repo_root),
        "_run-worker",
        "--run-id", run_id,
    ]
    worker = subprocess.Popen(
        worker_cmd,
        cwd=str(paths.repo_root),
        stdin=subprocess.DEVNULL,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        start_new_session=True,
        close_fds=True,
    )
    record["pid"] = worker.pid
    save_run(paths, record)
    update_lock_pid(paths, run_id, worker.pid)
    append_ledger(paths, {
        "event": "dispatched",
        "run_id": run_id,
        "prompt_path": prompt_rel,
        "approval_reference": args.approval,
        "pid": worker.pid,
    })
    return display_record(record)


def _fail_run_unexpectedly(paths: Paths, run_id: str, exc: BaseException) -> None:
    """Best-effort terminal-failure path for an unexpected launch/wait/
    persistence error in the worker. Never raises -- this runs from an
    `except`/`finally` context and must not mask the original error or
    leave the run stuck. Only scrubbed diagnostics are persisted.
    """
    diagnostic = scrub_secrets(
        f"control_bridge: worker failed unexpectedly: {type(exc).__name__}: {exc}\n"
    )
    try:
        record = load_run(paths, run_id)
        if record is None:
            return
        stderr_path = Path(record["stderr_path"])
        try:
            existing = stderr_path.read_text(encoding="utf-8") if stderr_path.exists() else ""
        except OSError:
            existing = ""
        _atomic_write_text(stderr_path, existing + diagnostic)
        record["ending_head"] = git_head(paths.repo_root)
        _transition(record, "failed")
        record["ended_at"] = record.get("ended_at") or now_iso()
        save_run(paths, record)
        append_ledger(paths, {
            "event": "run_finished", "run_id": run_id,
            "exit_code": record.get("exit_code"), "status": "failed",
            "unexpected_error": type(exc).__name__,
        })
    except Exception:
        pass


def cmd_run_worker(args: argparse.Namespace, paths: Paths) -> None:
    """Internal: owns one Claude run end to end. Spawned detached by
    `dispatch`; never invoked directly by an operator.

    Exception-safe by construction: any unexpected launch/wait/persistence
    failure is caught, drives the run to a terminal `failed` state when
    possible, and the run lock is always released in the `finally` path --
    a crash here must never leave a run stuck `running`/`queued` while
    still holding the single-run lock.
    """
    run_id = args.run_id
    try:
        record = load_run(paths, run_id)
        if record is None:
            return

        record["pid"] = os.getpid()
        record["started_at"] = now_iso()
        _transition(record, "running")
        save_run(paths, record)
        append_ledger(paths, {"event": "run_started", "run_id": run_id, "pid": os.getpid()})

        argv = [
            record["claude_bin"], "-p", record["instruction"],
            "--output-format", "json",
            "--permission-mode", record["permission_mode"],
        ]
        if record.get("model"):
            argv += ["--model", record["model"]]

        stdout_path = Path(record["stdout_path"])
        stderr_path = Path(record["stderr_path"])
        env = os.environ.copy()

        exit_code: int
        stdout_text = ""
        stderr_text = ""
        try:
            proc = subprocess.Popen(
                argv,
                cwd=record["repo_root"],
                stdin=subprocess.DEVNULL,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                env=env,
                text=True,
            )
            record["claude_pid"] = proc.pid
            save_run(paths, record)
            # `communicate()` captures both streams to memory (no thread
            # deadlock from a full pipe buffer) -- nothing raw ever touches
            # disk. Only the scrubbed text below is persisted.
            stdout_text, stderr_text = proc.communicate()
            exit_code = proc.returncode
        except FileNotFoundError as exc:
            exit_code = 127
            stderr_text = (
                f"control_bridge: failed to launch claude executable "
                f"'{record['claude_bin']}': {exc}\n"
            )

        stdout_scrubbed = scrub_secrets(stdout_text)
        stderr_scrubbed = scrub_secrets(stderr_text)
        _atomic_write_text(stdout_path, stdout_scrubbed)
        _atomic_write_text(stderr_path, stderr_scrubbed)

        result_summary = extract_result(stdout_scrubbed)
        _atomic_write_text(Path(record["result_path"]), json.dumps(result_summary, indent=2) + "\n")

        record = load_run(paths, run_id) or record
        record["exit_code"] = exit_code
        record["ending_head"] = git_head(paths.repo_root)
        record["session_id"] = result_summary.get("session_id")
        _transition(record, "completed" if exit_code == 0 else "failed")
        record["ended_at"] = now_iso()
        save_run(paths, record)
        append_ledger(paths, {
            "event": "run_finished", "run_id": run_id,
            "exit_code": exit_code, "status": record["status"],
        })
    except Exception as exc:
        _fail_run_unexpectedly(paths, run_id, exc)
    finally:
        release_lock(paths, run_id)


def cmd_status(args: argparse.Namespace, paths: Paths) -> dict:
    run_id = args.run_id or current_run_id(paths)
    if run_id is None:
        return {"status": "no_runs"}
    record = load_run(paths, run_id)
    if record is None:
        raise BridgeError(f"No run record found for {run_id}")
    return display_record(record)


def cmd_wait(args: argparse.Namespace, paths: Paths) -> dict:
    run_id = args.run_id or current_run_id(paths)
    if run_id is None:
        raise BridgeError("No run to wait on.")
    record = load_run(paths, run_id)
    if record is None:
        raise BridgeError(f"No run record found for {run_id}")

    poll = max(1, args.poll_interval)
    deadline = time.monotonic() + args.timeout
    while True:
        record = load_run(paths, run_id)
        if record["status"] in TERMINAL_STATUSES:
            break
        if record["status"] in ("queued", "running") and not _pid_alive(record.get("pid")):
            reconcile_interrupted(paths, run_id)
            record = load_run(paths, run_id)
            break
        if time.monotonic() >= deadline:
            result = display_record(record)
            result["timed_out"] = True
            return result
        time.sleep(poll)

    result = display_record(record)
    result["timed_out"] = False
    return result


def cmd_output(args: argparse.Namespace, paths: Paths) -> dict:
    run_id = args.run_id or current_run_id(paths)
    if run_id is None:
        raise BridgeError("No run to show output for.")
    record = load_run(paths, run_id)
    if record is None:
        raise BridgeError(f"No run record found for {run_id}")

    show_all = not (args.stdout or args.stderr or args.result)
    sections = []
    if args.stdout or show_all:
        sections.append(("stdout", record["stdout_path"]))
    if args.stderr or show_all:
        sections.append(("stderr", record["stderr_path"]))
    if args.result or show_all:
        sections.append(("result", record["result_path"]))

    out = {"run_id": run_id, "sections": {}}
    for name, path_str in sections:
        path = Path(path_str)
        if not path.exists():
            out["sections"][name] = {"path": path_str, "captured": False}
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        if not args.full:
            lines = text.splitlines()
            omitted = max(0, len(lines) - args.tail)
            text = "\n".join(lines[-args.tail:])
        else:
            omitted = 0
        out["sections"][name] = {"path": path_str, "captured": True, "omitted_lines": omitted, "text": text}
    return out


def cmd_mark_reviewed(args: argparse.Namespace, paths: Paths) -> dict:
    run_id = args.run_id or current_run_id(paths)
    if run_id is None:
        raise BridgeError("No run to mark reviewed.")
    record = load_run(paths, run_id)
    if record is None:
        raise BridgeError(f"No run record found for {run_id}")
    if record["status"] not in TERMINAL_STATUSES:
        raise BridgeError(
            f"Cannot mark-reviewed: run {run_id} is not in a terminal state "
            f"(status={record['status']}). Wait for it to reach "
            f"{sorted(TERMINAL_STATUSES)}, or `recover` it first if the "
            "worker process is actually dead."
        )

    record["review"] = {
        "verdict": args.verdict,
        "notes": args.notes or "",
        "evidence": args.evidence or [],
        "reviewed_at": now_iso(),
        "reviewer": args.reviewer,
    }
    save_run(paths, record)
    append_ledger(paths, {
        "event": "reviewed", "run_id": run_id,
        "verdict": args.verdict, "reviewer": args.reviewer,
    })
    return display_record(record)


def cmd_recover(args: argparse.Namespace, paths: Paths) -> dict:
    run_id = args.run_id or current_run_id(paths)
    if run_id is None:
        return {"recovered": False, "reason": "no runs recorded"}
    record = load_run(paths, run_id)
    if record is None:
        raise BridgeError(f"No run record found for {run_id}")
    changed = reconcile_interrupted(paths, run_id)
    record = load_run(paths, run_id)
    result = display_record(record)
    result["recovered"] = changed
    return result


# --------------------------------------------------------------------------
# CLI wiring
# --------------------------------------------------------------------------


def _add_run_id_arg(sub: argparse.ArgumentParser, required: bool = False) -> None:
    sub.add_argument("--run-id", required=required, help="Run ID. Defaults to the latest dispatched run.")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="control_bridge.py",
        description=(
            "Monty-Claude control-room bridge: dispatch a tracked, approved "
            "prompt to Claude Code non-interactively, monitor it, and record "
            "an independent review verdict."
        ),
    )
    parser.add_argument(
        "--repo-root",
        default=os.environ.get("CONTROL_BRIDGE_REPO_ROOT", str(DEFAULT_REPO_ROOT)),
        help="Repository root the bridge operates in (default: this checkout).",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    p_dispatch = sub.add_parser("dispatch", help="Dispatch a tracked, approved prompt to Claude Code.")
    p_dispatch.add_argument("--prompt", required=True, help="Path to the tracked prompt (must be under docs/aepoch-production-playbook/prompts/).")
    p_dispatch.add_argument("--approval", required=True, help="Chris's approval reference or text for this dispatch.")
    p_dispatch.add_argument("--permission-mode", default=os.environ.get("CONTROL_BRIDGE_PERMISSION_MODE", DEFAULT_PERMISSION_MODE), choices=PERMISSION_MODE_CHOICES)
    p_dispatch.add_argument("--claude-bin", default=os.environ.get("CONTROL_BRIDGE_CLAUDE_BIN", "claude"))
    p_dispatch.add_argument("--model", default=None, help="Optional model override passed through to Claude Code.")
    p_dispatch.set_defaults(func=cmd_dispatch)

    p_status = sub.add_parser("status", help="Report the active/latest run's state.")
    _add_run_id_arg(p_status)
    p_status.set_defaults(func=cmd_status)

    p_wait = sub.add_parser("wait", help="Block with bounded polling until a run finishes.")
    _add_run_id_arg(p_wait)
    p_wait.add_argument("--timeout", type=float, default=1800.0, help="Max seconds to poll before returning (default: 1800).")
    p_wait.add_argument("--poll-interval", type=float, default=5.0, help="Seconds between polls (default: 5).")
    p_wait.set_defaults(func=cmd_wait)

    p_output = sub.add_parser("output", help="Show a run's captured stdout/stderr/result.")
    _add_run_id_arg(p_output)
    p_output.add_argument("--stdout", action="store_true")
    p_output.add_argument("--stderr", action="store_true")
    p_output.add_argument("--result", action="store_true")
    p_output.add_argument("--full", action="store_true", help="Show full captured content instead of the tail.")
    p_output.add_argument("--tail", type=int, default=200, help="Lines to show from the end when not --full (default: 200).")
    p_output.set_defaults(func=cmd_output)

    p_review = sub.add_parser("mark-reviewed", help="Record Monty's independent review verdict for a run.")
    _add_run_id_arg(p_review)
    p_review.add_argument("--verdict", required=True, choices=REVIEW_VERDICTS)
    p_review.add_argument("--notes", default=None)
    p_review.add_argument("--evidence", action="append", default=None, help="Repeatable: a path or reference to supporting evidence.")
    p_review.add_argument("--reviewer", default="Monty")
    p_review.set_defaults(func=cmd_mark_reviewed)

    p_recover = sub.add_parser("recover", help="Reconcile a stale lock/run after a crash, Ctrl-C, or restart.")
    _add_run_id_arg(p_recover)
    p_recover.set_defaults(func=cmd_recover)

    # Internal only -- spawned detached by `dispatch`. Hidden from --help.
    p_worker = sub.add_parser("_run-worker", help=argparse.SUPPRESS)
    p_worker.add_argument("--run-id", required=True)
    p_worker.set_defaults(func=cmd_run_worker)

    return parser


def main(argv: Optional[list] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    paths = Paths.for_repo(Path(args.repo_root))

    if args.command != "_run-worker":
        paths.ensure_dirs()

    try:
        result = args.func(args, paths)
    except BridgeError as exc:
        print(json.dumps({"error": str(exc)}, indent=2), file=sys.stderr)
        return 2

    if args.command == "_run-worker":
        return 0

    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
