# Phase 14A.3 — Targeted Manufactured Consensus Repair

Episode: `001-what-is-aepoch`. A narrow image-editing phase: repair the
Manufactured Consensus slot in the approved **Direction A — Editorial
Geometric** family, using reference-image editing rather than another
fresh-generation round. Does not reopen the Direction A style decision, does
not regenerate Human Among Synthetic Echoes or Uncertain Digital Reflection,
no video generation, no Remotion code changes, no custom-style training, no
episode-scale asset generation. Generated assets live under
`assets/style-convergence/phase-14a3/` and remain gitignored (working
production assets pending creative approval).

## Tool-gap finding (reported before any paid call)

The phase brief called for "FLUX Kontext or the closest registered fal.ai
reference-image editing tool available through OpenMontage." Inspecting the
registry (`capability_catalog`, `support_envelope`) found **no such tool
existed** before this phase:

- `flux_image` and `recraft_image` (both fal.ai, both `available`) are
  text-to-image only — neither accepts an `image_url`/reference-image input.
- `image_gen` (deprecated multi-provider wrapper) is also text-to-image only.
- The only two registry tools with a real edit mode (`generation_mode="edit"`,
  `image_url`/`image_path` inputs) are `grok_image` (xAI) and
  `kling_official_image` (Kling) — neither is fal.ai, and both were
  registry-`unavailable` at phase start because `XAI_API_KEY`/`KLING_API_KEY`
  in `.env` are empty placeholders, not real values. `FAL_AI_API_KEY` is
  genuinely configured (it powered every Recraft call in 14A.1/14A.2), so
  this was a missing-tool problem, not an auth problem.

This was reported to the author before any code was written or any call was
made. The author chose: build a new, narrowly-scoped fal.ai FLUX Kontext
tool rather than switching provider to xAI or Kling.

**Built:** `tools/graphics/flux_kontext_image.py` — a `BaseTool` subclass
following the exact pattern of `recraft_image.py`/`flux_image.py`
(registry-routed, uses `tools/graphics/_shared.py`'s
`save_image_correctly`), calling fal.ai's hosted FLUX.1 Kontext endpoints
(`fal-ai/flux-pro/kontext`, `fal-ai/flux-pro/kontext/max`). Also added a
small generic `file_to_data_uri` helper to `_shared.py` (local file → base64
data URI, for providers whose reference-image input only accepts a URL) —
factored out of the pattern `grok_image.py` already used ad hoc, not
duplicated.

**Endpoint verified before any billed call:** two unbilled schema-validation
diagnostics (`import tools.base_tool` first, per `PROVIDER_SETUP.md`'s
documented entry path — never a bare script) confirmed both
`fal-ai/flux-pro/kontext` and `fal-ai/flux-pro/kontext/max` are live and
require `prompt` + `image_url`; a third diagnostic with an unresolvable
`image_url` confirmed the field is validated by attempting a real download
(so local files must go in as a data URI, not a raw path) and that the
optional fields used below (`aspect_ratio`, `output_format`,
`guidance_scale`, `num_images`, `seed`, `safety_tolerance`) don't trigger a
schema rejection. Both diagnostics returned `422` before any generation ran
— unbilled, per the same unbilled-validation-rejection finding documented in
`PROVIDER_SETUP.md` from the Recraft hardening pass.

## Preflight

| Item | Value |
|---|---|
| Tool | `flux_kontext_image` (`tools.graphics.flux_kontext_image.FluxKontextImage`), new this phase, registry-routed, never a direct API call |
| Provider / model | fal.ai, FLUX.1 Kontext [pro] (`fal-ai/flux-pro/kontext`) for all 3 calls |
| Requested dimensions | `aspect_ratio="16:9"` |
| **Actual returned dimensions** | **1392×768→752 — see Validation** (not 1344×768; see below) |
| Prompting | Positive-only edit instructions throughout, no negative-exclusion lists (per Phase 14A.1 Incident #3) |
| Source image | `consensus-a.png` (Phase 14A.2) for Candidates A and B; `consensus-edit-a.png` (this phase's own Candidate A) for Candidate C |
| Seed | Not requested (fal.ai returns one per call regardless; recorded per candidate below, but reproducibility on a repeat call is not guaranteed) |

### Source-image decision

The brief allowed Phase 14A.1 Direction A / Frame 4 as the editing base only
if "tool limitations or visual inspection establish [it as] the better
editing base." Visual inspection of both:

- **`consensus-a.png`** (Phase 14A.2): full walking human silhouettes with
  visible heads, torsos, arms, legs, and gait — recognizable individuals.
  Its documented problems (perspective recession toward a vanishing point,
  a busy zebra-stripe body pattern) are both concrete, localized, and
  describable — exactly what a reference-image edit is suited to correct.
- **Frame 4** (Phase 14A.1): a dense wall of repeating round head/shoulder
  blobs with no visible limbs or bodies at all — it fails the brief's own
  "figures must remain recognizable as simplified human identities"
  requirement outright, and separately reads close to the explicitly
  prohibited "dense wall of bodies." Fixing this would require adding full
  bodies and negative space from nothing — a wholesale recomposition, not
  an edit.

**Decision: `consensus-a.png` remains the source**, per the brief's own
default. No override was justified.

## Candidate-by-candidate result

All three calls used FLUX.1 Kontext [pro] at $0.04 each. All three
downloads verified genuine PNG (signature-checked via Pillow) at
1392×752px, converted status `False` (fal.ai returned PNG bytes directly
for this endpoint, unlike Recraft's WebP-by-default behavior).

### Candidate A — Lateral synchronization

| Field | Value |
|---|---|
| Source | `consensus-a.png` |
| Edit instruction | Redraw as one broad horizontal row of full-body walking figures at consistent size (no shrink/recession), even spacing, generous Paper negative space, flat solid Clay/Ochre/Loam/Sand color (no stripe/pattern texture), gradually more aligned rightward, resolving into one simple flat Iris/Prism wave band at the far right |
| Seed | 559386804 |
| Output | `consensus-edit-a.png` |
| Cost | $0.04 |
| Concept clarity | **Partial.** Fixed the perspective-recession and busy-pattern problems cleanly — all 8 figures are full-body, consistent size, flat solid color. But the "resolve into one shared output band/waveform" instruction was effectively dropped: the row just fades from warm to two cool-toned figures, still shaped like every other figure in the row, not a distinct output shape. No visible left-to-right synchronization gradient either — all figures share the same pose from the start. |
| Direction A compatibility | Good — flat color fields, clean Ink outlines, no drop shadow, correct palette registers (warm for human, cool for the last two figures) |
| Human anatomy quality | Good — natural adult proportions, consistent walking gait |
| Negative space | Good — generous space above and around the row |
| Phone readability | Good — bold, simple shapes |
| Unwanted artifacts | Minor: slightly more visible facial detail (nose/chin lines) than the established Direction A restraint (echoes-a, reflection-a) — not a hard violation, but a drift worth flagging |
| Pass/fail | **Fail** — the core "many becoming one output" narrative device is missing entirely |

### Candidate B — Layered synchronization

| Field | Value |
|---|---|
| Source | `consensus-a.png` |
| Edit instruction | Redraw as 3 shallow horizontal layers of full-body walking figures (no perspective recession), generous spacing within/between layers, same flat-color/no-texture constraint, layers gradually align left→right, combining into one simple flat Iris/Prism waveform band on the right |
| Seed | 3312309438 |
| Output | `consensus-edit-b.png` |
| Cost | $0.04 |
| Concept clarity | **Fail.** No output band or resolution device appeared at all — three static rows of near-identical figures, no visible left-to-right progression. |
| Direction A compatibility | **Fail** — figures regressed to chibi/toddler proportions (oversized heads, short stocky bodies, small hands) holding hands in a paper-doll chain. This is a direct repeat of the exact chibi/mascot problem Phase 14A.2 Round 1 already had to correct for this same concept slot. |
| Human anatomy quality | **Fail** — not believable adult proportions |
| Negative space | Weak — 13 figures per row packed edge-to-edge, minimal space between figures within a row (though decent space between the three rows) |
| Phone readability | Legible but reads as a childish "paper doll chain," not an editorial illustration |
| Unwanted artifacts | Hand-holding motif — reads as organic/warm connection, the opposite of the concept's required "manufactured agreement... not organic human connection" |
| Pass/fail | **Fail** — regresses on anatomy, misses the concept, and introduces a new brand-language problem |

### Candidate C — Corrective pass on Candidate A (deviates from the literal "Minimal consensus" brief)

The brief's Candidate C ("fewer, larger figures... maximum negative space")
was not produced literally. Since neither A nor B passed, and A already
solved the hardest problems (adult anatomy, no recession, no texture, good
negative space) while only missing the output-band device, the third call
was spent as a **targeted correction of Candidate A** — instructing the
model to preserve the row exactly and add only the missing resolution
device. This is flagged explicitly as a deviation from the brief's literal
Candidate C description, made in the interest of the strongest achievable
result within the 3-call cap.

| Field | Value |
|---|---|
| Source | `consensus-edit-a.png` (this phase's own Candidate A, not `consensus-a.png` directly) |
| Edit instruction | Preserve the figures/spacing/palette exactly; add one flat Iris/Prism wave-band at the right edge distinct from the figures; slightly increase postural/spacing uniformity approaching the right edge |
| Seed | 1069596461 |
| Output | `consensus-edit-c.png` |
| Cost | $0.04 |
| Concept clarity | **Partial improvement, still not a clean pass.** An output shape does now appear at the right edge — but it reads as an ambiguous rounded blob/puddle/hill at ground level, not a clean, unmistakable band, wave, or field. No visible left-to-right alignment gradient was added either (the instruction to "settle into a steady rhythm" was not realized). Figure count dropped from 8 to 6 (2 lost, likely absorbed into/replaced by the new shape) — figures that remain kept their good proportions. |
| Direction A compatibility | Good — flat color, clean outlines, correct palette; the added blob shape is flat-colored and shadow-free (no drop-shadow violation) but its rounded, ground-hugging form doesn't clearly read as "wave" or "field" the way `reflection-a`'s contour bands or the brief's own language implies |
| Human anatomy quality | Good — same 6 remaining figures retain the adult proportions from Candidate A |
| Negative space | Good |
| Phone readability | Figures read fine; the blob shape is ambiguous at small scale (confirmed on the phone-scale contact sheet — reads as a rug/cloud, not clearly an "output") |
| Unwanted artifacts | The added shape's ambiguous read (blob/puddle rather than band/wave) is itself the main open problem — not a hard brand-exclusion violation (no masks, no blank eyes, no dashboard), but not "visually simple and unmistakable" as the brief requires |
| Pass/fail | **Fail, closest of the three** — recommended as the best available candidate, with named reservations, not a clean pass |

## Concept clarity across all three (summary)

None of the three candidates achieves the full four-part narrative arc the
brief specifies (distinct visible figures → increasing alignment →
resolving into one output → reading as manufactured agreement, not organic
connection):

- **Distinct individually-visible figures**: A and C succeed; B's are
  present but chibi/mascot-proportioned.
- **Progressive alignment/synchronization**: none of the three show this
  clearly — all three either start uniform (A, C) or never de-synchronize
  meaningfully in the first place (B).
- **Resolves into one broad, unmistakable output**: A has none; B has none;
  C has an ambiguous attempt.
- **Reads as manufactured, not organic**: A and C are neutral-to-good on
  this axis (figures don't interact); B actively fails it (hand-holding
  reads as warm/organic).

## Validation

| Check | consensus-edit-a | consensus-edit-b | consensus-edit-c |
|---|---|---|---|
| Genuine PNG signature | Pass | Pass | Pass |
| Extension matches format | Pass — no conversion needed, fal.ai returned PNG bytes directly for this endpoint (`format_converted=False`) | Pass | Pass |
| Dimensions | **1392×752 — not 1344×768** | **1392×752 — not 1344×768** | **1392×752 — not 1344×768** |
| Source image recorded | `consensus-a.png` | `consensus-a.png` | `consensus-edit-a.png` |
| Model recorded | `fal-ai/flux-pro/kontext` | `fal-ai/flux-pro/kontext` | `fal-ai/flux-pro/kontext` |
| Edit instruction recorded | Above | Above | Above |
| Cost recorded | $0.04 | $0.04 | $0.04 |
| No API keys in logs/files | Pass — confirmed no key value appears in this document, the new tool source, or any script output above | | |

**Dimension discrepancy (disclosed, not silently resolved):** the phase
brief's "verify 1344×768" checkpoint was written assuming Recraft v4's
native 16:9 bucket (1344×768, confirmed across Phases 14A.1/14A.2). FLUX.1
Kontext on fal.ai is a different model/provider with its own native 16:9
output bucket — it consistently returned **1392×752** across all 3 calls
this phase (aspect ratio 1.851, vs. 1344×768's 1.75 — a ~5.7% difference,
not just a scale difference). A direct resize to 1344×768 would stretch the
image and was **not done**, consistent with this project's standing rule
(`_shared.py`'s `save_image_correctly`) against silently mislabeling or
distorting image content. All three candidates are delivered at their
genuine native 1392×752 resolution, correctly labeled as such. If exact
1344×768 is required downstream, a follow-up center-crop (not a stretch)
would be the correct fix — not performed here as it wasn't requested and
would need author sign-off on which edge(s) to crop.

## Contact sheets

All three required sheets generated and verified as genuine PNG (signature-
checked):

- `phase-14a3-consensus-candidates.png` (1324×596) — original `consensus-a`,
  Phase 14A.1 Direction A/Frame 4, and all three new candidates, labeled,
  consistent 420px-wide thumbnails.
- `phase-14a3-family-lock.png` (1384×341) — `echoes-a`, `reflection-a`, and
  `consensus-edit-c` (the best available candidate) as one proposed family,
  440px-wide thumbnails.
- `phase-14a3-phone-scale.png` (604×193) — the same proposed three-image
  family at ~180px width, approximating phone viewing size.

## Paid-call and cost accounting

| Call | Purpose | Model | Cost |
|---|---|---|---|
| 1 | Candidate A (lateral sync) | FLUX.1 Kontext [pro] | $0.04 |
| 2 | Candidate B (layered sync) | FLUX.1 Kontext [pro] | $0.04 |
| 3 | Candidate C (corrective pass on A) | FLUX.1 Kontext [pro] | $0.04 |
| **Total** | | | **$0.12** |

Against the phase cap of 3 calls / $0.25: **3 of 3 calls used, $0.12 of
$0.25 spent** — under budget, at the call-count limit. Two unbilled
schema-validation diagnostics preceded the first paid call (see "Tool-gap
finding" above), consistent with `PROVIDER_SETUP.md`'s documented
unbilled-validation-rejection behavior. No call was retried without
reporting its result first.

## Best candidate

**`consensus-edit-c.png`**, recommended with significant reservations, not
a clean pass. It's the closest of the three to the brief's requirements
(adult anatomy, no recession, no texture, good negative space, an attempt
at a resolution device) but the resolution shape itself reads as an
ambiguous blob rather than the brief's required "visually simple and
unmistakable" output, and no candidate demonstrates the required
progressive-alignment narrative beat.

## Does the proposed three-image family cohere?

**Partially, with a visible seam.** `echoes-a` and `reflection-a` share
Direction A's flat-vector, soft-corner, restrained-palette language
convincingly (this was already established in Phase 14A.2).
`consensus-edit-c` is recognizably related — same palette logic, same
walking-figure device, same flat rendering — but its added output shape is
the weakest, least resolved element of any of the three images, and would
likely read to a viewer as an unfinished or unclear moment rather than a
deliberate climax.

## Ready for custom-style training?

**Not yet.** The same conclusion Phase 14A.2 reached still holds:
Manufactured Consensus is the hardest of the three concepts for Direction A
to express, and after two full phases (14A.2's two rounds, now 14A.3's
three edit calls — five total generation attempts at this concept slot) it
still has no clean pass. The output-band/waveform device in particular has
never been successfully realized in any attempt across either phase.

## Pass/fail

**Technical validation: PASS with one disclosed finding** (the
1392×752-vs-1344×768 dimension discrepancy, explained above — not an
error, a genuine cross-provider difference, correctly reported rather than
silently resized).

**Creative validation: FAIL, improved but not resolved.** No candidate
achieves a clean pass. `consensus-edit-c` is the best available result and
is recommended as the basis for a possible future fourth attempt (outside
this phase's cap) — specifically needing a redesigned instruction for the
output-band device itself, which has now failed to render clearly across
all five generation attempts spanning two phases.

## Validation checklist

| Check | Result |
|---|---|
| No FLUX Kontext/reference-edit tool existed at phase start | Confirmed, reported before any call, author approved building one |
| New tool built, registry-routed, follows existing pattern | Pass — `tools/graphics/flux_kontext_image.py` |
| Endpoint verified via unbilled diagnostics before first paid call | Pass |
| Source-image decision made via visual inspection, reported | Pass — `consensus-a.png` confirmed over Frame 4 |
| Maximum 3 paid image-edit calls | Pass — exactly 3 used |
| Maximum $0.25 estimated spend | Pass — $0.12 spent |
| Every candidate: real PNG signature, extension matches format | Pass — all 3 |
| Every candidate: source, model, instruction, cost, format/conversion status recorded | Pass |
| No API keys in logs or files | Pass |
| No video generation | Pass |
| No Remotion code changes | Pass |
| No custom-style training | Pass |
| No episode-scale asset generation | Pass |
| Direction A style decision not reopened | Pass |
| Human Among Synthetic Echoes / Uncertain Digital Reflection not regenerated | Pass |
| Three contact sheets created, verified PNG | Pass |
| QA document complete | Pass (this document) |
| Paid-call count and cost reported before/after each call | Pass — reported before Candidate A, after A before B, after B before C, and final accounting above |

**Creative-review status: awaiting author review.** This document does not
approve the family as production-ready. Recommendation only: `consensus-edit-c`
is the best of five total generation attempts across two phases at this
concept slot, but the "one unmistakable shared output" requirement remains
unmet, and a fourth attempt (with a redesigned approach to that specific
element — possibly abandoning the wave/band device for something the model
renders more reliably) is the likely next step if the author wants to keep
pursuing this composition rather than reconsidering the concept's visual
device entirely.
