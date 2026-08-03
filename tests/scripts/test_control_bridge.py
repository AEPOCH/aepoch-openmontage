"""Focused tests for the Monty-Claude control-room bridge.

Every test drives the bridge through a fake `claude` executable and a
throwaway git repo under `tmp_path` -- no network calls, no real model
invocation, and no writes to the actual project repository.
"""

from __future__ import annotations

import json
import os
import stat
import subprocess
import sys
import textwrap
import time
from pathlib import Path

import pytest

from scripts import control_bridge as cb

BRIDGE = Path(cb.__file__).resolve()

FAKE_CLAUDE_SOURCE = textwrap.dedent(
    """\
    #!/usr/bin/env python3
    import json
    import os
    import sys
    import time

    mode = os.environ.get("FAKE_CLAUDE_MODE", "ok")
    if mode == "sleep":
        time.sleep(float(os.environ.get("FAKE_CLAUDE_SLEEP", "60")))
    if mode == "leak_then_sleep":
        print(json.dumps({
            "session_id": "fake-session",
            "is_error": False,
            "result": "in flight. api_key: sk-in-flight-should-be-redacted-0123456789",
        }))
        sys.stdout.flush()
        time.sleep(float(os.environ.get("FAKE_CLAUDE_SLEEP", "2")))
        sys.exit(0)
    if mode == "fail":
        print(json.dumps({"session_id": "fake-session", "is_error": True, "result": "boom"}))
        print("a fake failure on stderr", file=sys.stderr)
        sys.exit(1)
    print(json.dumps({
        "session_id": "fake-session",
        "is_error": False,
        "result": "did the work. api_key: sk-should-be-redacted-0123456789",
        "total_cost_usd": 0.01,
    }))
    sys.exit(0)
    """
)


@pytest.fixture()
def fake_repo(tmp_path: Path) -> Path:
    repo = tmp_path / "repo"
    prompts_dir = repo / "docs" / "aepoch-production-playbook" / "prompts"
    prompts_dir.mkdir(parents=True)
    subprocess.run(["git", "init", "-q"], cwd=repo, check=True)
    subprocess.run(["git", "config", "user.email", "test@example.com"], cwd=repo, check=True)
    subprocess.run(["git", "config", "user.name", "Test"], cwd=repo, check=True)
    (repo / "README.md").write_text("hello\n", encoding="utf-8")
    subprocess.run(["git", "add", "README.md"], cwd=repo, check=True)
    subprocess.run(["git", "commit", "-q", "-m", "init"], cwd=repo, check=True)
    (prompts_dir / "fake-brief.md").write_text("# fake tracked brief\n", encoding="utf-8")
    return repo


@pytest.fixture()
def fake_claude(tmp_path: Path) -> Path:
    path = tmp_path / "fake_claude.py"
    path.write_text(FAKE_CLAUDE_SOURCE, encoding="utf-8")
    path.chmod(path.stat().st_mode | stat.S_IEXEC | stat.S_IXGRP | stat.S_IXOTH)
    return path


def run_cli(repo: Path, *args: str, env: dict | None = None) -> dict:
    full_env = os.environ.copy()
    if env:
        full_env.update(env)
    proc = subprocess.run(
        [sys.executable, str(BRIDGE), "--repo-root", str(repo), *args],
        capture_output=True,
        text=True,
        env=full_env,
        timeout=30,
    )
    return {"returncode": proc.returncode, "stdout": proc.stdout, "stderr": proc.stderr}


def parse_json(result: dict) -> dict:
    stream = result["stdout"] if result["returncode"] == 0 else result["stderr"]
    return json.loads(stream)


def dispatch(repo: Path, fake_claude: Path, prompt: str = None, approval: str = "chris-approved", env: dict | None = None) -> dict:
    prompt = prompt or "docs/aepoch-production-playbook/prompts/fake-brief.md"
    result = run_cli(
        repo, "dispatch",
        "--prompt", prompt,
        "--approval", approval,
        "--claude-bin", str(fake_claude),
        env=env,
    )
    return result


def dispatch_foreground(
    repo: Path, fake_claude: Path, prompt: str = None, approval: str = "chris-approved", env: dict | None = None
) -> dict:
    prompt = prompt or "docs/aepoch-production-playbook/prompts/fake-brief.md"
    return run_cli(
        repo, "dispatch",
        "--prompt", prompt,
        "--approval", approval,
        "--claude-bin", str(fake_claude),
        "--foreground",
        env=env,
    )


def spawn_cli(repo: Path, *args: str, env: dict | None = None) -> subprocess.Popen:
    full_env = os.environ.copy()
    if env:
        full_env.update(env)
    return subprocess.Popen(
        [sys.executable, str(BRIDGE), "--repo-root", str(repo), *args],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        env=full_env,
    )


def wait_for_terminal(repo: Path, run_id: str, timeout: float = 10.0) -> dict:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        record = parse_json(run_cli(repo, "status", "--run-id", run_id))
        if record["status"] in ("completed", "failed"):
            return record
        time.sleep(0.2)
    raise AssertionError(f"run {run_id} did not reach a terminal state in time")


# --------------------------------------------------------------------------
# Valid dispatch and full state transition
# --------------------------------------------------------------------------


def test_valid_dispatch_reaches_completed(fake_repo, fake_claude):
    result = dispatch(fake_repo, fake_claude)
    assert result["returncode"] == 0, result["stderr"]
    dispatched = parse_json(result)
    assert dispatched["status"] == "queued"
    run_id = dispatched["run_id"]

    record = wait_for_terminal(fake_repo, run_id)
    assert record["status"] == "completed"
    assert record["exit_code"] == 0
    assert record["starting_head"]
    assert record["ending_head"] == record["starting_head"]
    assert record["session_id"] == "fake-session"

    run_file = fake_repo / "control_room" / "runs" / f"{run_id}.json"
    raw = json.loads(run_file.read_text(encoding="utf-8"))
    transitions = [t["to"] for t in raw["state_transitions"]]
    assert transitions == ["queued", "running", "completed"]
    assert raw["approval_reference"] == "chris-approved"
    assert raw["prompt_path"] == "docs/aepoch-production-playbook/prompts/fake-brief.md"

    lock_path = fake_repo / "control_room" / "bridge.lock"
    assert not lock_path.exists(), "lock must be released once the run finishes"


# --------------------------------------------------------------------------
# Foreground dispatch (synchronous, no detached worker)
# --------------------------------------------------------------------------


def test_foreground_dispatch_returns_terminal_record_synchronously(fake_repo, fake_claude):
    proc = spawn_cli(
        fake_repo, "dispatch",
        "--prompt", "docs/aepoch-production-playbook/prompts/fake-brief.md",
        "--approval", "chris-approved",
        "--claude-bin", str(fake_claude),
        "--foreground",
    )
    stdout, stderr = proc.communicate(timeout=15)
    assert proc.returncode == 0, stderr
    record = json.loads(stdout)
    # `dispatch --foreground` must not return until the run is terminal --
    # unlike detached dispatch, which returns `queued` immediately.
    assert record["status"] == "completed"
    assert record["exit_code"] == 0
    assert record["session_id"] == "fake-session"
    assert record["starting_head"]
    assert record["ending_head"] == record["starting_head"]

    run_file = fake_repo / "control_room" / "runs" / f"{record['run_id']}.json"
    raw = json.loads(run_file.read_text(encoding="utf-8"))
    transitions = [t["to"] for t in raw["state_transitions"]]
    assert transitions == ["queued", "running", "completed"]
    # Foreground mode never forks/detaches a worker: the record's pid is the
    # dispatch process's own pid throughout, not a distinct child process.
    assert raw["pid"] == proc.pid


def test_foreground_dispatch_releases_lock_on_completion(fake_repo, fake_claude):
    result = dispatch_foreground(fake_repo, fake_claude)
    assert result["returncode"] == 0, result["stderr"]
    lock_path = fake_repo / "control_room" / "bridge.lock"
    assert not lock_path.exists(), "lock must be released once the foreground run finishes"


def test_foreground_dispatch_nonzero_exit_marks_run_failed(fake_repo, fake_claude):
    result = dispatch_foreground(fake_repo, fake_claude, env={"FAKE_CLAUDE_MODE": "fail"})
    assert result["returncode"] == 0, result["stderr"]
    record = parse_json(result)
    assert record["status"] == "failed"
    assert record["exit_code"] == 1
    assert not (fake_repo / "control_room" / "bridge.lock").exists()


def test_foreground_dispatch_redacts_secrets_in_captured_output(fake_repo, fake_claude):
    result = dispatch_foreground(fake_repo, fake_claude)
    record = parse_json(result)
    stdout_text = Path(record["stdout_path"]).read_text(encoding="utf-8")
    assert "sk-should-be-redacted" not in stdout_text
    assert "REDACTED" in stdout_text
    result_text = Path(record["result_path"]).read_text(encoding="utf-8")
    assert "sk-should-be-redacted" not in result_text


def test_foreground_dispatch_ledger_records_full_lifecycle(fake_repo, fake_claude):
    result = dispatch_foreground(fake_repo, fake_claude)
    record = parse_json(result)
    ledger_path = fake_repo / "control_room" / "ledger.jsonl"
    lines = [json.loads(line) for line in ledger_path.read_text(encoding="utf-8").splitlines() if line.strip()]
    events = [entry["event"] for entry in lines if entry.get("run_id") == record["run_id"]]
    assert events == ["dispatched", "run_started", "run_finished"]
    dispatched_event = next(e for e in lines if e.get("run_id") == record["run_id"] and e["event"] == "dispatched")
    assert dispatched_event["foreground"] is True


def test_second_dispatch_rejected_while_foreground_run_is_active(fake_repo, fake_claude):
    proc = spawn_cli(
        fake_repo, "dispatch",
        "--prompt", "docs/aepoch-production-playbook/prompts/fake-brief.md",
        "--approval", "chris-approved",
        "--claude-bin", str(fake_claude),
        "--foreground",
        env={"FAKE_CLAUDE_MODE": "sleep", "FAKE_CLAUDE_SLEEP": "5"},
    )
    try:
        run_id = None
        deadline = time.monotonic() + 5
        while time.monotonic() < deadline:
            current = current_run_id_or_none(fake_repo)
            if current:
                record = parse_json(run_cli(fake_repo, "status", "--run-id", current))
                if record["status"] == "running":
                    run_id = current
                    break
            time.sleep(0.1)
        assert run_id, "foreground run never reported running"

        second = dispatch(fake_repo, fake_claude)
        assert second["returncode"] != 0
        err = parse_json(second)
        assert "already active" in err["error"]
        assert run_id in err["error"]
    finally:
        stdout, stderr = proc.communicate(timeout=10)
        assert proc.returncode == 0, stderr
        finished = json.loads(stdout)
        assert finished["status"] == "completed"
        assert not (fake_repo / "control_room" / "bridge.lock").exists()


def current_run_id_or_none(repo: Path) -> str | None:
    current_path = repo / "control_room" / "current.json"
    if not current_path.exists():
        return None
    return json.loads(current_path.read_text(encoding="utf-8")).get("run_id")


def test_wait_command_blocks_until_completion(fake_repo, fake_claude):
    dispatched = parse_json(dispatch(fake_repo, fake_claude))
    run_id = dispatched["run_id"]
    result = run_cli(fake_repo, "wait", "--run-id", run_id, "--timeout", "10", "--poll-interval", "0.2")
    assert result["returncode"] == 0, result["stderr"]
    waited = parse_json(result)
    assert waited["status"] == "completed"
    assert waited["timed_out"] is False


# --------------------------------------------------------------------------
# Path validation
# --------------------------------------------------------------------------


def test_rejects_prompt_outside_tracked_directory(fake_repo, fake_claude):
    outside = fake_repo.parent / "outside.md"
    outside.write_text("# not tracked\n", encoding="utf-8")
    result = dispatch(fake_repo, fake_claude, prompt=str(outside))
    assert result["returncode"] != 0
    err = parse_json(result)
    assert "must resolve inside" in err["error"]
    assert not (fake_repo / "control_room" / "bridge.lock").exists()


def test_rejects_prompt_traversal(fake_repo, fake_claude):
    result = dispatch(fake_repo, fake_claude, prompt="../README.md")
    assert result["returncode"] != 0
    err = parse_json(result)
    assert "error" in err


def test_rejects_symlink_escape(fake_repo, fake_claude):
    outside_dir = fake_repo.parent / "outside"
    outside_dir.mkdir()
    target = outside_dir / "evil.md"
    target.write_text("# escape\n", encoding="utf-8")
    link = fake_repo / "docs" / "aepoch-production-playbook" / "prompts" / "escape-link.md"
    link.symlink_to(target)
    result = dispatch(fake_repo, fake_claude, prompt="docs/aepoch-production-playbook/prompts/escape-link.md")
    assert result["returncode"] != 0
    err = parse_json(result)
    assert "must resolve inside" in err["error"]


def test_rejects_missing_prompt_file(fake_repo, fake_claude):
    result = dispatch(fake_repo, fake_claude, prompt="docs/aepoch-production-playbook/prompts/nope.md")
    assert result["returncode"] != 0
    err = parse_json(result)
    assert "does not exist" in err["error"]


def test_rejects_non_markdown_prompt(fake_repo, fake_claude):
    non_md = fake_repo / "docs" / "aepoch-production-playbook" / "prompts" / "not-markdown.txt"
    non_md.write_text("hello\n", encoding="utf-8")
    result = dispatch(fake_repo, fake_claude, prompt="docs/aepoch-production-playbook/prompts/not-markdown.txt")
    assert result["returncode"] != 0
    err = parse_json(result)
    assert "Markdown" in err["error"]


# --------------------------------------------------------------------------
# Locking
# --------------------------------------------------------------------------


def test_second_dispatch_rejected_while_first_is_active(fake_repo, fake_claude):
    first = parse_json(dispatch(fake_repo, fake_claude, env={"FAKE_CLAUDE_MODE": "sleep", "FAKE_CLAUDE_SLEEP": "5"}))
    run_id = first["run_id"]
    try:
        second = dispatch(fake_repo, fake_claude)
        assert second["returncode"] != 0
        err = parse_json(second)
        assert "already active" in err["error"]
        assert run_id in err["error"]
    finally:
        pid = parse_json(run_cli(fake_repo, "status", "--run-id", run_id)).get("pid")
        if pid:
            try:
                os.kill(int(pid), 9)
            except ProcessLookupError:
                pass
        run_cli(fake_repo, "recover", "--run-id", run_id)


# --------------------------------------------------------------------------
# Nonzero exit
# --------------------------------------------------------------------------


def test_nonzero_claude_exit_marks_run_failed(fake_repo, fake_claude):
    dispatched = parse_json(dispatch(fake_repo, fake_claude, env={"FAKE_CLAUDE_MODE": "fail"}))
    run_id = dispatched["run_id"]
    record = wait_for_terminal(fake_repo, run_id)
    assert record["status"] == "failed"
    assert record["exit_code"] == 1
    assert not (fake_repo / "control_room" / "bridge.lock").exists()


# --------------------------------------------------------------------------
# Stale-process recovery
# --------------------------------------------------------------------------


def test_recover_detects_and_clears_stale_run(fake_repo, fake_claude):
    dispatched = parse_json(dispatch(fake_repo, fake_claude, env={"FAKE_CLAUDE_MODE": "sleep", "FAKE_CLAUDE_SLEEP": "60"}))
    run_id = dispatched["run_id"]

    deadline = time.monotonic() + 5
    pid = None
    while time.monotonic() < deadline:
        record = parse_json(run_cli(fake_repo, "status", "--run-id", run_id))
        if record["status"] == "running" and record.get("pid"):
            pid = record["pid"]
            break
        time.sleep(0.1)
    assert pid, "worker never reported running"

    os.kill(int(pid), 9)
    deadline = time.monotonic() + 5
    while time.monotonic() < deadline and cb._pid_alive(int(pid)):
        time.sleep(0.1)
    assert not cb._pid_alive(int(pid))

    status_before = parse_json(run_cli(fake_repo, "status", "--run-id", run_id))
    assert "unrecovered" in status_before["status"]

    recovered = parse_json(run_cli(fake_repo, "recover", "--run-id", run_id))
    assert recovered["recovered"] is True
    assert recovered["status"] == "interrupted"
    assert not (fake_repo / "control_room" / "bridge.lock").exists()

    idempotent = parse_json(run_cli(fake_repo, "recover", "--run-id", run_id))
    assert idempotent["recovered"] is False
    assert idempotent["status"] == "interrupted"

    # a fresh dispatch must now succeed since the lock was released
    second = dispatch(fake_repo, fake_claude)
    assert second["returncode"] == 0, second["stderr"]


def test_recover_reconciles_run_left_queued_by_dispatch_worker_race(fake_repo, fake_claude):
    """A worker can die before it ever transitions its own record past
    `queued` (e.g. it crashes on startup, or dispatch's start-worker race
    loses). Simulate that directly: hand-craft a `queued` run record and
    lock pointing at a pid that is guaranteed dead, without ever starting a
    real worker, then confirm `recover` reconciles it rather than leaving it
    queued forever with a held lock.
    """
    paths = cb.Paths.for_repo(fake_repo)
    paths.ensure_dirs()

    dead_proc = subprocess.Popen([sys.executable, "-c", "pass"])
    dead_proc.wait()
    dead_pid = dead_proc.pid
    assert not cb._pid_alive(dead_pid)

    run_id = cb.new_run_id()
    out_dir = paths.output_dir / run_id
    out_dir.mkdir(parents=True, exist_ok=True)
    record = {
        "run_id": run_id,
        "prompt_path": "docs/aepoch-production-playbook/prompts/fake-brief.md",
        "approval_reference": "chris-approved",
        "instruction": "irrelevant for this test",
        "created_at": cb.now_iso(),
        "started_at": None,
        "ended_at": None,
        "repo_root": str(paths.repo_root),
        "starting_head": None,
        "ending_head": None,
        "pid": dead_pid,
        "claude_pid": None,
        "session_id": None,
        "permission_mode": cb.DEFAULT_PERMISSION_MODE,
        "claude_bin": str(fake_claude),
        "model": None,
        "exit_code": None,
        "status": "queued",
        "state_transitions": [{"to": "queued", "at": cb.now_iso()}],
        "stdout_path": str(out_dir / "stdout.log"),
        "stderr_path": str(out_dir / "stderr.log"),
        "result_path": str(out_dir / "result.json"),
        "review": None,
    }
    cb.save_run(paths, record)
    cb.set_current_run_id(paths, run_id)
    cb.acquire_lock(paths, run_id, pid=dead_pid)

    status_before = parse_json(run_cli(fake_repo, "status", "--run-id", run_id))
    assert "unrecovered" in status_before["status"]

    recovered = parse_json(run_cli(fake_repo, "recover", "--run-id", run_id))
    assert recovered["recovered"] is True
    assert recovered["status"] == "interrupted"
    assert not (fake_repo / "control_room" / "bridge.lock").exists()

    raw = json.loads((paths.runs_dir / f"{run_id}.json").read_text(encoding="utf-8"))
    assert raw["state_transitions"][-1]["to"] == "interrupted"

    ledger_lines = [
        json.loads(line)
        for line in (fake_repo / "control_room" / "ledger.jsonl").read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    recovered_events = [e for e in ledger_lines if e.get("run_id") == run_id and e["event"] == "recovered_interrupted"]
    assert recovered_events and recovered_events[0]["from_status"] == "queued"


# --------------------------------------------------------------------------
# Captured output
# --------------------------------------------------------------------------


def test_output_command_shows_captured_streams(fake_repo, fake_claude):
    dispatched = parse_json(dispatch(fake_repo, fake_claude))
    run_id = dispatched["run_id"]
    wait_for_terminal(fake_repo, run_id)

    result = run_cli(fake_repo, "output", "--run-id", run_id)
    assert result["returncode"] == 0, result["stderr"]
    payload = parse_json(result)
    assert payload["sections"]["stdout"]["captured"] is True
    assert "fake-session" in payload["sections"]["stdout"]["text"]
    assert payload["sections"]["result"]["captured"] is True
    assert json.loads(payload["sections"]["result"]["text"])["parsed"] is True


def test_no_raw_secret_on_disk_while_claude_is_still_running(fake_repo, fake_claude):
    """The worker must capture Claude's output to memory, scrub it, and only
    then persist it -- there must be no window where the in-flight process's
    raw (unredacted) output is readable from the output directory.
    """
    dispatched = parse_json(dispatch(
        fake_repo, fake_claude, env={"FAKE_CLAUDE_MODE": "leak_then_sleep", "FAKE_CLAUDE_SLEEP": "3"},
    ))
    run_id = dispatched["run_id"]
    stdout_path = Path(dispatched["stdout_path"])
    out_dir = stdout_path.parent

    observed_running = False
    deadline = time.monotonic() + 10
    while time.monotonic() < deadline:
        record = parse_json(run_cli(fake_repo, "status", "--run-id", run_id))
        if record["status"] == "completed":
            break
        if record["status"] == "running":
            observed_running = True
            for path in out_dir.rglob("*"):
                if path.is_file():
                    text = path.read_text(encoding="utf-8", errors="replace")
                    assert "sk-in-flight-should-be-redacted" not in text, (
                        f"raw secret readable on disk at {path} while Claude was still running"
                    )
        time.sleep(0.1)

    assert observed_running, "test never observed the run in the `running` state"
    record = wait_for_terminal(fake_repo, run_id)
    assert record["status"] == "completed"
    final_text = stdout_path.read_text(encoding="utf-8")
    assert "sk-in-flight-should-be-redacted" not in final_text
    assert "REDACTED" in final_text


def test_output_redacts_secrets_in_captured_files(fake_repo, fake_claude):
    dispatched = parse_json(dispatch(fake_repo, fake_claude))
    run_id = dispatched["run_id"]
    record = wait_for_terminal(fake_repo, run_id)

    stdout_text = Path(record["stdout_path"]).read_text(encoding="utf-8")
    assert "sk-should-be-redacted" not in stdout_text
    assert "REDACTED" in stdout_text

    result_text = Path(record["result_path"]).read_text(encoding="utf-8")
    assert "sk-should-be-redacted" not in result_text


# --------------------------------------------------------------------------
# Review verdict recording
# --------------------------------------------------------------------------


def test_mark_reviewed_records_verdict_and_evidence(fake_repo, fake_claude):
    dispatched = parse_json(dispatch(fake_repo, fake_claude))
    run_id = dispatched["run_id"]
    wait_for_terminal(fake_repo, run_id)

    result = run_cli(
        fake_repo, "mark-reviewed", "--run-id", run_id,
        "--verdict", "pass_with_corrections",
        "--notes", "minor nit fixed",
        "--evidence", "control_room/output/x/stdout.log",
        "--evidence", "commit abc123",
    )
    assert result["returncode"] == 0, result["stderr"]
    reviewed = parse_json(result)
    assert reviewed["review"]["verdict"] == "pass_with_corrections"
    assert reviewed["review"]["notes"] == "minor nit fixed"
    assert reviewed["review"]["evidence"] == ["control_room/output/x/stdout.log", "commit abc123"]
    assert "reviewed:pass_with_corrections" in reviewed["status"]

    status_after = parse_json(run_cli(fake_repo, "status", "--run-id", run_id))
    assert status_after["review"]["verdict"] == "pass_with_corrections"


def test_mark_reviewed_rejected_while_run_is_not_terminal(fake_repo, fake_claude):
    dispatched = parse_json(dispatch(fake_repo, fake_claude, env={"FAKE_CLAUDE_MODE": "sleep", "FAKE_CLAUDE_SLEEP": "5"}))
    run_id = dispatched["run_id"]
    try:
        deadline = time.monotonic() + 5
        while time.monotonic() < deadline:
            record = parse_json(run_cli(fake_repo, "status", "--run-id", run_id))
            if record["status"] in ("queued", "running"):
                break
            time.sleep(0.1)
        assert record["status"] in ("queued", "running")

        result = run_cli(fake_repo, "mark-reviewed", "--run-id", run_id, "--verdict", "pass")
        assert result["returncode"] != 0
        err = parse_json(result)
        assert "not in a terminal state" in err["error"]

        status_after = parse_json(run_cli(fake_repo, "status", "--run-id", run_id))
        assert status_after["review"] is None
    finally:
        pid = parse_json(run_cli(fake_repo, "status", "--run-id", run_id)).get("pid")
        if pid:
            try:
                os.kill(int(pid), 9)
            except ProcessLookupError:
                pass
        run_cli(fake_repo, "recover", "--run-id", run_id)


def test_process_completion_is_not_review_by_itself(fake_repo, fake_claude):
    dispatched = parse_json(dispatch(fake_repo, fake_claude))
    run_id = dispatched["run_id"]
    record = wait_for_terminal(fake_repo, run_id)
    assert record["status"] == "completed"
    assert record["review"] is None


# --------------------------------------------------------------------------
# Append-only ledger and secret/environment absence
# --------------------------------------------------------------------------


def test_ledger_is_append_only_and_records_full_lifecycle(fake_repo, fake_claude):
    dispatched = parse_json(dispatch(fake_repo, fake_claude))
    run_id = dispatched["run_id"]
    wait_for_terminal(fake_repo, run_id)
    run_cli(fake_repo, "mark-reviewed", "--run-id", run_id, "--verdict", "pass")

    ledger_path = fake_repo / "control_room" / "ledger.jsonl"
    lines = [json.loads(line) for line in ledger_path.read_text(encoding="utf-8").splitlines() if line.strip()]
    events = [entry["event"] for entry in lines if entry.get("run_id") == run_id]
    assert events == ["dispatched", "run_started", "run_finished", "reviewed"]

    size_before = ledger_path.stat().st_size
    mtime_before_lines = list(ledger_path.read_text(encoding="utf-8").splitlines())

    second = parse_json(dispatch(fake_repo, fake_claude))
    wait_for_terminal(fake_repo, second["run_id"])

    after_lines = ledger_path.read_text(encoding="utf-8").splitlines()
    assert after_lines[: len(mtime_before_lines)] == mtime_before_lines, "prior ledger lines were mutated, not appended"
    assert ledger_path.stat().st_size > size_before


def test_no_environment_or_secret_values_persisted_to_disk(fake_repo, fake_claude, monkeypatch):
    monkeypatch.setenv("TOTALLY_FAKE_SECRET_TOKEN", "should-never-appear-anywhere")
    dispatched = parse_json(dispatch(
        fake_repo, fake_claude,
        env={"TOTALLY_FAKE_SECRET_TOKEN": "should-never-appear-anywhere"},
    ))
    run_id = dispatched["run_id"]
    record = wait_for_terminal(fake_repo, run_id)

    control_room = fake_repo / "control_room"
    for path in control_room.rglob("*"):
        if path.is_file():
            text = path.read_text(encoding="utf-8", errors="replace")
            assert "should-never-appear-anywhere" not in text, f"leaked into {path}"
            assert "sk-should-be-redacted" not in text, f"unredacted secret in {path}"

    run_file = fake_repo / "control_room" / "runs" / f"{run_id}.json"
    raw = json.loads(run_file.read_text(encoding="utf-8"))
    assert "TOTALLY_FAKE_SECRET_TOKEN" not in json.dumps(raw)
    assert "should-never-appear-anywhere" not in json.dumps(raw)


# --------------------------------------------------------------------------
# CLI never invokes --dangerously-skip-permissions or bypassPermissions
# --------------------------------------------------------------------------


def test_bypass_permissions_is_not_an_allowed_choice():
    assert "bypassPermissions" not in cb.PERMISSION_MODE_CHOICES
    assert cb.DEFAULT_PERMISSION_MODE in cb.PERMISSION_MODE_CHOICES


def test_default_permission_mode_is_auto_not_accept_edits(fake_repo, fake_claude):
    """Approved correction: hands-free execution defaults to `auto`, not the
    more conservative `acceptEdits` -- without ever allowing `bypassPermissions`.
    """
    assert cb.DEFAULT_PERMISSION_MODE == "auto"

    dispatched = parse_json(dispatch(fake_repo, fake_claude))
    run_id = dispatched["run_id"]
    wait_for_terminal(fake_repo, run_id)
    raw = json.loads((fake_repo / "control_room" / "runs" / f"{run_id}.json").read_text(encoding="utf-8"))
    assert raw["permission_mode"] == "auto"


def test_dispatch_never_passes_dangerous_skip_flag(fake_repo, fake_claude):
    dispatched = parse_json(dispatch(fake_repo, fake_claude))
    run_id = dispatched["run_id"]
    wait_for_terminal(fake_repo, run_id)
    run_file = fake_repo / "control_room" / "runs" / f"{run_id}.json"
    raw = run_file.read_text(encoding="utf-8")
    assert "dangerously-skip-permissions" not in raw
    assert "bypassPermissions" not in raw
