# Bitcoin for High School Students — Script V2 Corrections

## Authorization and scope

This is the single permitted correction round for the `script` stage of `projects/bitcoin-for-high-school-students`.

Sample V1 and its creative direction remain approved. Monty independently reviewed Script V1 run `run-20260803T193703Z-e91925` and rejected it only for specific timing and factual-precision defects. Correct those defects; do not reopen the concept, reference analysis, research direction, provider choices, composition choices, or sample.

No media calls. No scene planning. No assets. No rendering. Stop at `checkpoint_script.json` with `status: awaiting_human`.

## Read only what is needed

1. `AGENT_GUIDE.md`
2. `pipeline_defs/animation.yaml` — script stage only
3. `skills/pipelines/animation/script-director.md`
4. `skills/meta/voice-performance-director.md`
5. `skills/meta/reviewer.md`
6. `skills/meta/checkpoint-protocol.md`
7. `schemas/artifacts/script.schema.json`
8. `projects/bitcoin-for-high-school-students/artifacts/script.json`
9. `projects/bitcoin-for-high-school-students/artifacts/research_brief.json`
10. `projects/bitcoin-for-high-school-students/checkpoint_script.json`

Do not repeat any completed analysis or research unless a corrected factual sentence lacks support in the existing research brief.

## Binding corrections

Preserve the approved opening verbatim and keep the same six-beat structure, single narrator, cafeteria-ledger metaphor, navy-on-cream editorial collage, and warm Rachel performance.

Make these corrections:

1. **True 60-second timing.** Script V1 has 158 words and estimates 65.94 seconds, while the approved opening alone measured 13.14 seconds at Rachel's real pace. Trim the complete narration to roughly 138–145 words and plan for **58–60 seconds total including holds**. Do not use the manifest's ±10% allowance as a reason to deliver a 66-second Short.

2. **Wallet/private-key precision.** Replace the absolute claim `Every wallet holds a private key` and the misleading phrase `only you can make it`. Explain concisely that a wallet uses a private key to authorize/sign a payment, the key is kept secret, and whoever controls it can authorize spending. Do not imply all wallets have identical custody models. Describe authorizing a payment, not literal phone tapping, as the cryptographic signing mechanism.

3. **Validation/confirmation precision.** Replace `Once enough copies agree it's real`. Copy count is not a vote and does not explain Bitcoin consensus. At a high-school-functional level, say that network computers independently validate transactions; valid transactions can be included in a block; later blocks/confirmations make rewriting that history increasingly difficult. Avoid detailed proof-of-work mechanics, but do not replace them with a false majority-copies explanation.

4. **Ledger wording.** Avoid implying every person or every device manually stores/checks the full ledger. Preserve the cafeteria metaphor while clearly marking the transition to the real network.

5. **Closing precision.** A neutral close may say there is no single bank or company maintaining the master record. Avoid `everyone can check` if it reads as every user personally validates every transaction; `the record can be independently verified` is safer.

## Deliverables

- Replace the canonical `projects/bitcoin-for-high-school-students/artifacts/script.json` with schema-valid Script V2.
- Keep source mapping for every factual beat.
- Report exact narration word count, total planned duration including holds, beat count, and the corrected phrases.
- Run one self-review against the script-stage criteria.
- Archive/supersede the prior checkpoint through the normal checkpoint writer and leave `checkpoint_script.json` as `awaiting_human`, `human_approved: false`.
- Make the V2 script readable in Backlot.

## Hard stop

End immediately after the corrected script checkpoint. Do not proceed to `scene_plan` or make any paid/free media-generation call.
