# Phase 17 — V2 Proposal Gate Continuation After Interrupted Run

## Authorization and governing brief

Continue the already authorized work in:

`docs/aepoch-production-playbook/prompts/phase-17-what-is-aepoch-v2-proposal.md`

Run `run-20260805T100700Z-8d7f66` was externally interrupted after it safely
initialized `projects/aepoch-blog-pilot-what-is-aepoch-v2/`, carried forward
the byte-identical approved source extraction with provenance, and completed
the ungated research carry-forward. Those files now exist and must be reused,
not recreated.

## Direct execution

- Work directly; no delegation, subagents, background tasks, or paid calls.
- Read `AGENT_GUIDE.md`, the original governing brief, the V1 postmortem, the
  animated-explainer manifest, checkpoint protocol, proposal director, taste
  direction skill, and proposal schema.
- Inspect and validate the existing V2 extraction/research artifacts and
  checkpoints. Do not alter the source thesis.
- Complete only the fresh V2 proposal packet, decision log entries needed at
  proposal, and the proposal checkpoint.
- Use the three treatments, acceptance criteria, runtime facts, audio plan,
  atelier direction, cost transparency, and other requirements from the
  governing brief.
- HyperFrames was unavailable at the verified preflight; record that and use
  Remotion as the only available advanced runtime. This is a capability fact,
  not an invented user-choice gate.
- Leave concept selection/approval pending for Chris. Do not imply that the
  recommended concept is already human-approved.

## Required terminal state

Before returning, verify:

1. `artifacts/proposal_packet.json` exists and validates against its schema.
2. The canonical V2 decision log exists and validates if the schema applies.
3. `checkpoint_proposal.json` exists with `status: awaiting_human` and
   `human_approved: false`.
4. Backlot can read the V2 project and shows proposal awaiting approval.
5. No script checkpoint or downstream artifact exists.
6. No media generation or paid call occurred.

Then stop. Report exact files and validation evidence only; do not continue to
script, scene plan, assets, edit, compose, or publish.
