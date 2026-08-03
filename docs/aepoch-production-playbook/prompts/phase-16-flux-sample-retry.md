# Phase 16 Handoff — FLUX Sample Credential Verification and Single Retry

Continue project `aepoch-blog-pilot-what-is-aepoch` on branch `aepoch-series`.

The first `hook-2b` FLUX sample attempt returned HTTP 401 and incurred no
cost. Monty's independent review corrected the earlier diagnosis: the
registered `flux_image` path imports `tools/base_tool.py`, whose loader already
strips inline comments. In that real tool environment `FAL_KEY` resolves empty,
then `flux_image` falls back to the present `FAL_AI_API_KEY`, which fal.ai
rejected. Do not patch `lib/env_loader.py`; that is not the loader used by the
failed call.

Because a partial fragment of the fallback key was printed in the prior Claude
conversation, Chris must rotate it and install a new valid fal.ai credential as
`FAL_KEY` in the repository `.env` before this handoff can execute.

## Read before acting

1. `AGENT_GUIDE.md`, latest durable state and log
2. `docs/aepoch-production-playbook/prompts/phase-16-assets-flux-sample.md`
3. `projects/aepoch-blog-pilot-what-is-aepoch/asset-inventory-and-prompts.md`
4. `.agents/skills/flux-best-practices/SKILL.md`
5. the registered `tools/base_tool.py` and `tools/graphics/flux_image.py`
6. current cost log and assets checkpoint

## Credential prerequisite

Using a fresh process that imports `tools.base_tool`, verify without printing
the secret that `FAL_KEY` is present and non-empty. Report only booleans and
length; never print a prefix, suffix, fragment, hash, or the `.env` line.

If `FAL_KEY` is absent/empty, stop without a network call and tell Chris to add
the rotated fal.ai key. Do not fall back to `FAL_AI_API_KEY`, because that value
was both rejected and partially exposed. Do not modify `.env` or handle the
secret on Chris's behalf.

## Authorized paid retry

Only after the prerequisite passes:

- Tool: registered concrete `flux_image`
- Provider: FLUX through fal.ai
- Model: `flux-pro/v1.1`
- Scene: `hook-2b`
- Output: one 1920x1080 PNG
- Estimated maximum cost: $0.05
- Prompt: the already-vetted Plate 2 Post prompt in
  `asset-inventory-and-prompts.md`
- `negative_prompt`: omitted

Reserve/reconcile through the cost tracker. Generate exactly once. No automatic
retry and no provider/model fallback. Download immediately and preserve model,
seed, full prompt, checksum, dimensions, actual cost, and tool result metadata.

Perform the complete visual and technical sample review specified in the
original handoff. Write/update the durable sample-review artifact, checkpoint,
current state, and log. Commit/push authorized tracked changes and stop for
Chris/Monty's visual review.

## Hard stop

Do not generate a second image or batch. Do not generate other assets, TTS,
music, SFX, diagrams, or video. Do not process narration. Do not compose,
render, publish, or deploy.

