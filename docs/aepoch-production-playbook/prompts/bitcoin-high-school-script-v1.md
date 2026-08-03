# Bitcoin for High School Students — Script V1

## Authorization

Chris watched and explicitly approved Sample V1 in Backlot on 2026-08-03. Monty independently reviewed run `run-20260803T185447Z-847089` and marked it `pass`.

Advance **only the `script` stage** of the existing `animation` pipeline project:

- Project: `projects/bitcoin-for-high-school-students`
- Approved concept: **The Cafeteria Ledger**
- Format: 60-second, 9:16 YouTube Short
- Audio architecture: single narrator
- Approved direction: the exact editorial cutout-collage language, tone, and pacing demonstrated in Sample V1
- Sample: `projects/bitcoin-for-high-school-students/assets/sample/sample_v1.mp4`

Do not generate narration, images, music, or a new render in this run. This is a no-media-spend script-stage run.

## Required reading and state

Read, in this order, and reuse the existing artifacts rather than recreating research or proposal work:

1. `AGENT_GUIDE.md`
2. `pipeline_defs/animation.yaml`
3. `skills/pipelines/animation/script-director.md`
4. `skills/meta/voice-performance-director.md`
5. `skills/meta/reviewer.md`
6. `skills/meta/checkpoint-protocol.md`
7. `schemas/artifacts/script.schema.json`
8. `projects/bitcoin-for-high-school-students/artifacts/research_brief.json`
9. `projects/bitcoin-for-high-school-students/artifacts/proposal_packet.json`
10. `projects/bitcoin-for-high-school-students/reference-analysis/video_analysis_brief.json`
11. `projects/bitcoin-for-high-school-students/artifacts/sample-v1-generation-evidence.md`
12. `projects/bitcoin-for-high-school-students/checkpoint_proposal.json`

Do not repeat preflight, reference download, reference analysis, research, proposal generation, provider selection, or sample generation. Those are complete and approved.

## Script brief

Write the complete narration and on-screen-text plan for a roughly 60-second Short explaining Bitcoin to high school students through the cafeteria-ledger metaphor.

Preserve the approved opening verbatim unless a schema/timing constraint makes a tiny punctuation-only change necessary:

> Imagine buying lunch without cash, a card, or even Venmo. Instead, everyone in the cafeteria keeps the exact same list of who paid whom. That's the basic idea behind Bitcoin.

Build from that opening through a clear causal explanation:

1. The shared list is the public ledger.
2. A wallet uses a private key to sign a payment; explain this as an unforgeable personal signature, without implying the key is publicly shared.
3. The network checks that the payer has the bitcoin and has not already spent it.
4. Confirmed transactions become increasingly difficult to rewrite.
5. Close with a neutral, memorable distinction: Bitcoin is a payment/ownership system people can use without one school office, bank, or company keeping the master list.

Accuracy constraints:

- Do not call Bitcoin anonymous, instant, free, guaranteed, or an investment.
- Do not make price predictions or investment claims.
- Do not say every participant literally stores or manually checks every transaction.
- Keep mining/consensus at a high-school-comprehensible functional level; avoid proof-of-work mechanics unless essential.
- Every factual claim must trace to the existing `research_brief`; if a necessary claim is absent, verify it using a primary Bitcoin source and append that source to the research artifact before using it.

Creative constraints:

- One concrete physical-object idea per beat.
- Maintain the approved cafeteria world long enough for the metaphor to teach, then clearly label where the metaphor maps to the real Bitcoin system.
- Avoid the generic crypto-explainer sequence: Satoshi portrait, pizza purchase, glowing coin, chain links, mining rigs, price charts.
- Captions/subtitles are not the same as designed on-screen text.
- Designed on-screen text: maximum 8 words per title and 15 words per description.
- Leave genuine breathing room for entrances, reveals, and holds.
- Target approximately 140–160 spoken words, but prioritize a natural 55–60 second Rachel delivery with visual holds over mechanically filling every second.
- Include structured `voice_performance` and section-level `delivery_cues` for the already-approved ElevenLabs Rachel performance: warm, calm, clear, patient, never hyped.

## Carry-forward corrections from Sample V1

Record these for downstream scene/assets/edit work without changing the approved direction:

1. Generate/crop all full-production imagery to a consistent true 9:16 safe frame; eliminate the faint Beat 1 edge seam.
2. Derive final caption timing from real narration/ASR word timing rather than hand estimates.
3. Treat Sample V1's coherent navy-on-cream palette as approved production art direction; do not spend budget chasing the earlier Clay/Paper hex values.

Append decision-log history where needed using the exact existing `(category, subject)` pair for revised palette/art-direction decisions. Do not mutate prior entries in place.

## Deliverables and gate

1. Write a schema-valid script artifact to the canonical project artifact location.
2. Self-review it against every `script` review focus and success criterion in `pipeline_defs/animation.yaml`, with no more than two review rounds.
3. Write `checkpoint_script.json` with `status: awaiting_human` and the canonical artifact attached, as required by the manifest.
4. Update Backlot-visible event/state evidence normally.
5. Report total word count, estimated spoken duration, beat count, factual-source mapping, and any reviewer findings.

## Hard stop

Stop after the script checkpoint is `awaiting_human`. Do **not** begin `scene_plan`, assets, edit, compose, or publish. Do **not** make any paid provider call.

Keep this run focused. The governing artifacts already exist; do not spend turns rebuilding or debating approved work.
