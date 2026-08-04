# Bitcoin for High School Students — Publish Close V1

## Authorization

Chris reviewed the completed final render and said **“approved done and shippable”** on 2026-08-04.

This is explicit human approval for the final gated `publish` stage of the existing `animation` pipeline project. Package the approved render locally, record the approval and export, and close the project as shippable.

Project: `projects/bitcoin-for-high-school-students`

This authorization does **not** authorize uploading, posting, scheduling, or transmitting the video to YouTube or any other external service.

## Required focused reading

Read before acting:

1. `AGENT_GUIDE.md`
2. `pipeline_defs/animation.yaml`
3. `skills/pipelines/animation/publish-director.md`
4. `schemas/artifacts/publish_log.schema.json`
5. `skills/meta/reviewer.md`
6. `skills/meta/checkpoint-protocol.md`
7. The project's proposal, research brief, script, render report, final review, decision log, and compose checkpoint

Do not rerun or revise any earlier production stage.

## Locked deliverable

- Canonical approved render: `projects/bitcoin-for-high-school-students/renders/final.mp4`
- Platform package: YouTube Shorts, vertical 9:16
- Render facts: 59.562667 seconds, 1080x1920, 30fps, H.264 High, AAC LC 48kHz stereo
- Approved media spend: `$0.3885` total; this closeout must incur `$0`
- Final review status: pass

Do not alter, transcode, rerender, or replace the canonical final video.

## Publish-stage work

1. Enter the publish stage through the normal checkpoint protocol.
2. Preserve Chris's exact final approval text and date in the durable artifact/checkpoint metadata.
3. Create a clearly labeled local export package under:
   `projects/bitcoin-for-high-school-students/exports/youtube-shorts/`
4. Copy the approved file into that package with a human-readable release filename suitable for delivery. The copied bytes must be identical to `renders/final.mp4`.
5. Create a concise human-readable release README in the package containing:
   - delivery status,
   - title,
   - platform and aspect ratio,
   - exact technical specifications,
   - duration and file size,
   - SHA-256 checksum,
   - a short platform-ready description,
   - a restrained set of relevant hashtags,
   - thumbnail concept and hero-frame notes,
   - an explicit statement that no external upload has occurred.
6. Write schema-valid canonical `projects/bitcoin-for-high-school-students/artifacts/publish_log.json` with one `youtube_shorts` entry whose status is `exported`, whose `export_path` points to the packaged MP4, and whose metadata accurately reflects this animation's cafeteria-ledger visual system. Do not invent a URL or video ID.
7. Include these animation-specific fields in top-level `publish_log.metadata`, as required by the director:
   - `animation_mode`
   - `hero_frame_notes`
   - `thumbnail_concept`
   - `platform_notes`
   Also record approval provenance, source path, export checksum, byte-identity verification, and the fact that no external publishing occurred.
8. Complete `checkpoint_publish.json` with `human_approval_required: true` and `human_approved: true`, referencing the canonical `publish_log`, and update normal Backlot events/state so the production reads as complete/shippable.

## Packaging guidance

The title and copy should be direct and useful to a high-school audience, not generic crypto hype. The thumbnail concept must match the actual navy-on-cream editorial cutout animation and its cafeteria-payment-to-shared-ledger metaphor. Avoid coins, chain links, candlestick charts, mining rigs, logos, and sensational price claims.

Use the final video's own visual truth. Do not generate a thumbnail image in this run; document a production-ready concept and recommended hero frame only.

## Verification

Before completing the checkpoint:

1. Verify both source and export exist.
2. Compute SHA-256 for each and prove they match.
3. FFprobe the packaged file and confirm it retains the locked technical properties.
4. Validate `publish_log.json` against `schemas/artifacts/publish_log.schema.json`.
5. Self-review the package against the publish director's quality gate.
6. Confirm no external/provider call and `$0` additional media spend.

## Report

Report the export path, checksum, title, technical properties, metadata package status, checkpoint status, and explicit confirmation that nothing was uploaded externally.

## Hard stop

Stop after local export packaging and publish-stage closure. No external upload, post, schedule, deploy, provider call, or paid action.
