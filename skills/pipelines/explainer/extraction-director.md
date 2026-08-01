# Source Extraction Director — Explainer Pipeline

## When to Use

Use this stage when an explainer is sourced from an author-provided blog post
or article. Produce the canonical `source_extraction` artifact before research.

The article is the narrative authority. Your job is to expose its intended
story contract, not to improve, rewrite, debate, or replace its thesis.

## Prerequisites

| Layer | Resource | Purpose |
|---|---|---|
| Schema | `schemas/artifacts/source_extraction.schema.json` | Artifact validation |
| Brand adapter | `brands/aepoch/SCRIPT_RULES.md` | Extraction method |
| User input | Exact source article or repository path | Authoritative content |

If no source article exists, this stage is not applicable; use the ordinary
topic-led research path defined by the pipeline entry condition.

## Binding Authority Rule

Preserve these fields from extraction through proposal and script unless the
author explicitly approves a change:

- `central_question`
- `key_takeaway`
- `aepoch_reframe`
- `human_consequence`
- `closing_statement`

Research may verify claims, add provenance, update a stale factual value,
add context, identify audience questions, or enrich visual examples. It may
not silently select a different thesis or angle. A material contradiction or
necessary change is a stop condition for author resolution.

## Process

1. Read the complete source and record its stable reference, metadata, and
   content hash when a local file is available.
2. Apply Part 1 of `brands/aepoch/SCRIPT_RULES.md` to identify one narrative
   through-line. Do not summarize the whole article.
3. Populate all `episode` fields with language faithful to the source.
4. Inventory factual, historical, and comparative claims individually. Point
   each claim back to its location in the source and flag verification needs.
5. Record excluded material and why it does not belong in this episode.
6. Record ambiguities; do not resolve material ambiguity by guessing.
7. Set `authority.mode` to `source_authoritative`, include all five protected
   fields, and list the permitted research operations.
8. Validate against the schema and checkpoint the artifact.

## Review Focus

- The extracted episode has one central question and one takeaway.
- Protected narrative fields reflect the article rather than external trends.
- Every factual claim is traceable to a source location.
- Exclusions are deliberate and preserve future episode opportunities.
- No new thesis, mechanism, or conclusion was invented.

## Gate Reminder

This stage is an accuracy gate for author-supplied meaning. When human
approval is required, checkpoint as `awaiting_human`, present the extraction,
and end the turn. Do not begin research until it is approved.
