# Phase 16 — Control-Room Final Stabilization

## Authority

Chris approved this final stabilization tranche after Monty's independent review of commits `f9a8fa5` and `21da076`. This brief authorizes only the foreground execution adapter, focused verification, reconciliation of the Phase 16 prompt corpus into Git after a secret audit, durable documentation/knowledge evidence, and a harmless fake-executable dogfood run. It does not authorize production advancement, paid media calls, or changes to generated assets.

## Why this tranche exists

The corrected bridge passes its focused suite, but Codex's managed command sandbox kills detached descendants when the launching tool call ends. The normal detached `dispatch` remains appropriate for an operator's persistent terminal, but Monty needs an explicitly supported foreground form that keeps the worker inside the active tool call when dispatching from this chat. Separately, 21 Phase 16 handoff Markdown files currently live in the correct prompts directory but are untracked, which defeats the approved Git-backed handoff model.

## Required implementation

1. Add a `--foreground` option to the existing `dispatch` operation; do not add a seventh public operation.
2. In foreground mode, validate the same tracked prompt and approval inputs, acquire the same single-run lock, create the same durable record/ledger events, execute the existing worker lifecycle synchronously in the dispatch process, and return the terminal run record only after completion. Do not fork or detach a worker in this mode.
3. Preserve detached dispatch as the default for normal terminal use. Both modes must share behavior rather than duplicate the Claude invocation, redaction, transition, result, and cleanup logic.
4. Foreground mode must remain genuinely hands-free with the existing `auto` default while structurally excluding bypass mode and the dangerous skip flag.
5. Add focused fake-Claude tests proving foreground success, terminal status/result capture, lock cleanup, nonzero-exit failure, redaction, and that a second active run is still rejected. Keep all existing tests passing.
6. Update the operator document with a clear decision rule: Monty/Codex managed tool calls use `dispatch --foreground`; a human-owned persistent terminal may use detached dispatch. State that Ctrl-C/tool termination can still require `recover`; do not claim Python `finally` survives SIGKILL or machine termination.
7. Run a harmless foreground dogfood call against the test fake executable or an equivalent temporary fake—no real Claude/model call, network access, or paid provider—and preserve concise evidence of the successful lifecycle.

## Prompt-corpus reconciliation

1. Audit every currently untracked `docs/aepoch-production-playbook/prompts/phase-16-*.md` file for literal credential values and other secrets. References to environment-variable names, authorization decisions, and redaction requirements are expected and are not secrets. Do not print or persist any discovered literal secret.
2. If a literal secret is found, stop and report the affected path without committing it. Otherwise, add all current Phase 16 prompt Markdown files—including this brief—to Git so past attempts, failures, approvals, and handoffs become durable history.
3. Do not add unrelated untracked files or modify existing user-owned dirty files.

## Verification and evidence

- Run the complete focused bridge suite, Python compile check, and bug-focused static check already used by the bridge work.
- Confirm the committed range contains only the bridge implementation/tests/operator docs, Phase 16 prompt corpus, and append-only knowledge evidence authorized here.
- Read `knowledge/SCHEMA.md` before appending the result and the managed-sandbox limitation to `knowledge/log.md`.
- Commit and push the bounded work to `aepoch-series`.

## Hard stop

Report commit(s), exact test results, prompt files reconciled, dogfood outcome, and residual risks. Stop. Do not recolor `build-2a`, generate `landing-1a`, invoke a media provider, compose, render, publish, or otherwise advance production.
