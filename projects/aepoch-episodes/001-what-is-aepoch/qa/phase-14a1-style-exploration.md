# Phase 14A.1 — AI Editorial Illustration Style Exploration

Episode: `001-what-is-aepoch`. Twelve production-direction still images (three
directions × four shared narrative beats), generated through the repaired
`recraft_image` tool (Recraft v4 via fal.ai), for creative comparison only —
**no direction is selected or approved by this document.** No animation, no
video generation, no Kling/Veo/MiniMax/FLUX calls, no Remotion code changes.
Generated assets live under `assets/style-exploration/phase-14a1/` and remain
gitignored (working production assets pending creative approval).

## Preflight

| Item | Value |
|---|---|
| Tool | `recraft_image` (`tools.graphics.recraft_image.RecraftImage`), registry-routed, never a direct API call |
| Model | Recraft v4 (non-pro) |
| Requested dimensions | `image_size="landscape_16_9"` → verified 1344×768 |
| Planned calls | 12 (one image per request, one per direction × frame) |
| Planned max cost | $0.48 (12 × $0.04), under the $0.60 approved cap |
| Style parameter | Originally split by direction (`vector_illustration` / `digital_illustration`) — **invalidated mid-phase, see Incident Log** |
| Seed | **Not supported.** `recraft_image`'s `input_schema` has no `seed` field and `execute()` never forwards one to fal.ai even if passed. Reported to the user before generation began. `determinism` is declared `STOCHASTIC` on the tool itself. |
| Colors | Fixed 8-hex ÆPOCH array on every call: Clay `#C4835A`, Ochre `#A0673A`, Sand `#E8C9A0`, Pearl `#D6E4F0`, Iris `#8BAFD4`, Prism `#B8A9D9`, Paper `#FAF8F5`, Ink `#1A1612`. No Moss, no Signal. |

## Incident log (reported to the user before any retry, per phase instruction)

Three real technical findings surfaced during generation, each reported and
approved before further paid calls were made:

1. **`style="vector_illustration"` returns SVG, not PNG.** The first 4 calls
   (Direction A, all frames) succeeded but returned genuine SVG vector data.
   `save_image_correctly()` correctly declined to auto-rasterize the SVG
   (documented, correct behavior — it does not invent pixel dimensions the
   provider never returned), so the tool wrote real `.svg` files with
   `width`/`height` both `None`. This cannot satisfy the phase's mandatory
   "real PNG at exactly 1344×768" check. Cost: $0.16 (4 calls), discarded —
   the SVG files were deleted, not delivered as part of the 12.
2. **The tool's `style` enum is stale against the live fal.ai contract.**
   A diagnostic call (raw `requests.post`, entered via `import
   tools.base_tool` first so `.env` loads correctly, per
   `PROVIDER_SETUP.md`'s documented entry path — never a bare script) showed
   fal.ai's actual Recraft v4 endpoint rejects `digital_illustration`,
   `realistic_image`, and `icon` outright:
   `{"type":"literal_error","loc":["body","style"],"msg":"Input should be
   'any' or 'vector_illustration'"}`. Only those two values are real. Since
   `vector_illustration` produces SVG (finding #1), **`any` is the only
   value that returns a raster PNG at all** — this is a genuine defect in
   `tools/graphics/recraft_image.py`'s declared `input_schema` (lists 5
   style values, live endpoint accepts 2), independent of this phase and
   worth a follow-up hardening pass alongside the color/format fixes already
   logged in `PROVIDER_SETUP.md`. Not fixed here — out of this phase's
   scope (style exploration, not tool maintenance).
3. **A literal "Exclude: hooded hacker, horror imagery, distorted
   anatomy..." negative-style clause triggered fal.ai's content moderation**
   (`content_policy_violation` — the same exact prompt succeeded seconds
   earlier under `vector_illustration`, isolating the cause to the
   style/route difference plus the negative list, confirmed via a second
   diagnostic call with the exclude clause stripped, which returned `200`).
   Recraft v4 has no native negative-prompt field, so stuffing a `SERIES_BIBLE`/
   `VISUAL_LANGUAGE`-derived exclusion list into the main prompt is read by
   the classifier as literal content tokens, not as negation. Fixed by
   dropping the literal exclusion list in favor of a short, positive-framed
   clause ("clean, flat, single unified illustration style... no
   photorealism... no embedded text..."); the actual excluded content
   (robots, hackers, coins, etc.) is instead kept out by not describing it
   and by the strongly specified positive composition, not by naming it.

**Net effect on the call/cost caps:** the corrective work (redoing Direction
A, working around the style-enum and content-policy findings) pushed total
attempted fal.ai requests to 19 (16 successful generations + 3 failed/
rejected, believed unbilled per `PROVIDER_SETUP.md`'s prior finding that
validation-rejected requests aren't charged — unverified against the actual
billing dashboard) and total real spend to **$0.64** against the original
**$0.60** cap. Both the call-count overage and the budget overage were
disclosed to the user and explicitly approved mid-phase, in two separate
approval exchanges, before any of the corrective spend happened. The
delivered 12 images below are exactly four per direction, all valid PNGs —
the overage is entirely the discarded 4-SVG batch plus 3 unbilled diagnostic
calls, not duplicate or extra deliverables.

## Per-image record

Seed: not supported by this tool (see Preflight) for all 12 — omitted from
the table below, noted once here rather than repeated 12 times. Cost: $0.04
per image (Recraft v4 non-pro), all 12. Format: all 12 verified genuine PNG
(signature-checked, not filename-inferred) at exactly 1344×768 — all
converted from the provider's actual WEBP response, `format_converted=True`.
Style param: `any` for all 12 (see Incident Log #2).

### Direction A — Editorial Geometric

| Beat | Prompt summary | Anatomy | Concept clarity | Brand fit | Cross-frame consistency | Mobile readability | Artifacts | Pass/fail |
|---|---|---|---|---|---|---|---|---|
| F1 Human Among Synthetic Echoes | Warm-clay figure walking center-frame, near-identical Iris/Pearl echo-figures flanking in profile procession | Simplified, believable, soft-corner silhouettes; strong human/echo contrast | High — human immediately distinguishable by color + center position | Good — palette matches, no drop shadow, flat fields | Baseline for the direction | Good — clean silhouettes read at small size | None | Pass (frame) |
| F2 Uncertain Digital Reflection | Two seated figures, a bar-like prop crosses both figures' eyes | Anatomy fine, dignified posture | Medium — reads as two companions rather than one person and their misaligned echo; the eye-bar prop is not called for in the brief and risks an unintended masked/blindfold read | Partial — white sneakers slightly off the locked 8-hex palette | Weak vs. F1 — same rendering method but different compositional logic (pair vs. individual+crowd) | Good | Eye-crossing bar prop not specified in brief — flag for revision | Fail (concept drift + unspecified prop) |
| F3 Synthetic Multiplication | Abstract cubist bird/totem units multiplying left→right into a dense block | Not applicable (fully abstract, no human) | High — clean source-to-multiplication logic, correctly Cosmos-only palette | Good — no earth tones present, matches the frame's own palette rule | Weak — abstract geometric mode, unrelated to F1/F2's figurative silhouette style | Medium — dense block compresses at small size but individual units remain legible | None | Pass (frame) / Fail (family) |
| F4 Manufactured Consensus | Dense striped human-silhouette rows resolving into a wave/DNA-like converged form | Not applicable (abstract resolution) | Medium-high — the "many becoming one field" idea reads, though the resolved shape is busier than "uniform" implies | Partial — heavy black fills and a saturated orange read outside the strict locked-hex feel | Weak — third distinct rendering mode within one direction | Weak — the converged wave detail blurs together at phone scale | None (no coins/racks/panels) | Pass (frame) / Fail (family) |

**Direction A summary:** F1 is the strongest single frame in the whole
exploration. F2–F4 each solve their own beat reasonably on their own terms
but do not share F1's rendering method — the "same illustration method
throughout" consistency rule is not currently met across this direction.

### Direction B — Paper-Cut Symbolic

| Beat | Prompt summary | Anatomy | Concept clarity | Brand fit | Cross-frame consistency | Mobile readability | Artifacts | Pass/fail |
|---|---|---|---|---|---|---|---|---|
| F1 Human Among Synthetic Echoes | Warm figure center, cool echo-figures either side, orbital ring-and-sphere motif behind | Believable, simplified | Medium — echo figures read as a small group more than "nearly identical echoes"; orbital rings dilute the reflection idea | Risk — the ring/orbit-with-spheres treatment reads close to `VISUAL_LANGUAGE.md`'s explicitly discouraged "radial mind-map burst" / isometric diagram language, not the paper-cut layered-shape brief | Baseline for the direction | Medium — rings survive small scale, figures get busy | None banned, but see brand-fit note | Fail (brand-language risk) |
| F2 Uncertain Digital Reflection | Two profile figures facing off, concentric layered arc bands, black (Void) background | Strong, dignified profiles | High — closest of any image to the actual "almost aligned echo" brief; the layered arcs genuinely read as paper-cut/screen-print | Good — clean two-tone (warm/cool) execution | Good tactile-layering match to the direction's own target; background shifts to Void without a stated reason | Good — bold shapes hold at small size | None | Pass — strongest frame in this direction |
| F3 Synthetic Multiplication | Radial ring diagram + row of wagon-wheel-headed figures multiplying toward camera | Stylized, not naturalistic (deliberate for this beat) | High — clear multiplication logic | Risk — same radial/orbit diagram concern as F1; wagon-wheel head icon is new, not from the approved circle/ring/arc vocabulary though built from compatible primitives | Weak vs. F2's arc-layering approach | Medium | None banned | Fail (brand-language risk, repeat of F1's issue) |
| F4 Manufactured Consensus | Dense crowd of masked-looking figures with solid black almond eye-cutouts converging to a vanishing point | N/A (stylized masks, not naturalistic) | Medium — the convergence-to-a-point idea reads | **Fail** — the blank almond eye-holes and uniform dark hoods read directly as the excluded "hooded figure" / "horror imagery" register, regardless of composition intent | Weakest link in the direction — most different from F2's warm layered-arc treatment | Weak — dense crowd loses individual readability at phone scale | **Hooded/masked-figure read, blank eyes** — direct brand-exclusion risk | **Fail — brand-compliance concern, needs a full redo before this direction could be reconsidered** |

**Direction B summary:** F2 is genuinely excellent and the clearest proof
that the paper-cut layered-arc language can carry this series. F1 and F3
lean toward a radial/orbit diagram treatment the brand doc explicitly
discourages. F4 is a real compliance problem, not just a style-consistency
note — it should not advance without a substantial revision.

### Direction C — Refined Human Editorial

| Beat | Prompt summary | Anatomy | Concept clarity | Brand fit | Cross-frame consistency | Mobile readability | Artifacts | Pass/fail |
|---|---|---|---|---|---|---|---|---|
| F1 Human Among Synthetic Echoes | Cropped rear/waist-down view of a warm figure's legs and shoes among cool-toned echo legs and shoes | Natural gesture in the visible portion, but the crop removes the figure's identity entirely | Medium — human vs. echo reads through shoe color, but cropping out the head/face undercuts "one clearly human, believable adult figure" | Risk — the tight shoe/leg crop reads closer to a sneaker/fashion editorial shot than a symbolic figure illustration, which the brief for this direction explicitly rules out ("not fashion illustration") | Baseline for the direction | Good — bold simple shapes | None | Fail (concept — brief requires the human figure, not just legs) |
| F2 Uncertain Digital Reflection | Two full figures in profile, warm vs. cool, scattered Memphis-style geometric shapes (circles/triangles) in the background | Strong, natural gesture and posture, restrained faces exactly as directed | Medium-high — reads as two related figures rather than one person and their own misaligned echo, but is dignified and calm as required | Risk — the scattered background shapes likely read as `VISUAL_LANGUAGE.md`'s excluded "complex background detail" against the required "clean generous negative space" | Weak vs. F1 — full-figure/background-detail treatment vs. F1's cropped/empty-background treatment | Good | None banned | Pass with reservations |
| F3 Synthetic Multiplication | Grid of abstract claw/eyeball/foot robotic-insect units repeating densely | N/A — no human content at all | Low — reads as a repeating texture more than a legible "source multiplying" narrative | **Fail** — the units read directly as the explicitly excluded "robot" register, and the direction's own brief ("human-centered," "not comic-book," restrained faces) is entirely abandoned here | **Fail** — a completely different, non-human, non-editorial visual language from F1/F2/F4 | **Fail** — the repeating grid collapses into illegible mush at phone scale (see phone-scale contact sheet) | **Robot-like imagery, direct brand exclusion** | **Fail — brand-compliance and consistency, needs a full redo** |
| F4 Manufactured Consensus | Many colored human silhouettes converging on a black (Void) background into a narrowing channel | Simple flat silhouettes, no facial detail (consistent with the direction's "featureless faces" allowance) | High — the many-to-one convergence reads clearly | Partial — the silhouette color range (browns, blues, pinks, whites) extends past the strict 8-hex locked palette; Void background is a hard cut from F1–F3's Paper backgrounds with no stated reason | Weak — background and palette both shift without explanation | Medium | None banned | Pass with reservations |

**Direction C summary:** F2 and F4 are usable starting points; F1's crop
works against the direction's own stated intent, and F3 is a genuine
brand-compliance failure that also breaks the family's internal
consistency more severely than anything in A or B.

## Contact sheets

All three required sheets generated and verified as valid PNGs:

- `all-directions-contact-sheet.png` (1480×769) — 3 rows (one per
  direction) × 4 columns (one per narrative frame), labeled.
- `concept-comparison-contact-sheet.png` (1232×1100) — 4 rows (one per
  narrative beat) × 3 columns (Direction A/B/C side by side), labeled.
- `phone-scale-contact-sheet.png` (710×427) — all 12 thumbnails at
  ~160px width to approximate mobile viewing size. This sheet is what
  surfaced Direction C/F3's total loss of legibility and the general
  density problems in every direction's F4.

## Cross-direction comparison

**Strongest human rendering:** Direction A (F1) and Direction B (F2) are
tied — both render dignified, anatomically believable figures with clean
soft-corner silhouettes. Direction C's figures are strong where shown in
full (F2, F4) but F1's crop undercuts the direction's own human-centered
premise.

**Strongest conceptual communication:** Direction B (F2) is the single
clearest realization of any narrative beat in the whole set — the
"uncertain reflection" idea is legible at a glance. Direction A's F1 is a
close second for the "human among echoes" beat specifically.

**Strongest ÆPOCH brand fit:** No direction currently passes cleanly across
all four frames. Direction A stays closest to the locked palette and avoids
any hard exclusion violations, but drifts stylistically between frames.
Direction B has one genuine compliance problem (F4). Direction C has one
severe compliance and consistency problem (F3, robot-register imagery).

**Most consistent four-frame family:** None of the three fully satisfies
"maintain the same illustration method" — this is the exploration's central
open finding, not a close call. Direction A is the closest of the three
(all four frames share flat vector rendering and the locked palette even
though the illustration *method* — figurative vs. abstract-geometric —
shifts), followed by Direction B (F2/F3 share the arc-layering language;
F1 and F4 diverge from it in different ways), then Direction C (F3 breaks
from the other three entirely).

**Easiest to animate or composite later:** Direction A's flat, evenly-
weighted silhouette style (F1 especially) would port most directly into
Remotion's existing SVG/component approach — simple shapes, clear layer
separation, no complex internal gradients. Direction B's layered-arc
language (F2) also composites well (each arc band is a natural motion
layer). Direction C's fuller, more textured figures would need more
rework to separate into animatable layers.

**Main risks:**
- No direction currently holds together as a coherent four-frame family
  without revision — a second exploration pass, informed by whichever
  single frame from each direction reads best (A/F1, B/F2, C/F2 or C/F4),
  would likely be more productive than picking a full direction outright.
- Direction B/F4 and Direction C/F3 are not just weak — they cross into
  genuine brand-exclusion territory (masked/hooded-figure read; robot
  read) and should not be treated as acceptable variants within their
  direction even if the direction itself is chosen.
- The radial/orbit-ring motif appearing in B/F1 and B/F3 is a repeated
  pattern, not a one-off, and is worth flagging as a prompt-level tendency
  to actively steer away from in any follow-up generation round.
- Recraft v4's content-moderation sensitivity to negative-style prompt
  language (Incident Log #3) means any follow-up prompt work should stay
  positive-framed rather than reintroducing an explicit exclusion list.

**Recommended direction (recommendation only — creative approval remains
with the author):** Direction A, on the strength of F1 and its closer
overall palette discipline, is the most promising starting point for a
second, more targeted exploration round — but this is not a
recommendation to proceed with Direction A's F2–F4 as-is, and B/F2 in
particular is strong enough to be worth carrying forward as a reference
even if Direction A is chosen as the primary direction.

## Cost and call accounting

| Item | Value |
|---|---|
| Delivered images | 12 (4 per direction), all valid 1344×768 PNGs |
| Delivered-image cost | $0.48 (12 × $0.04) |
| Discarded/incident cost | $0.16 (4 SVG-format calls, Direction A redo cause) |
| Diagnostic calls | 3 (2 failed/unbilled — schema 422, content-policy 422; 1 succeeded/billed $0.04, reused as A/F1 rather than re-spent) |
| **Total real spend, this phase** | **$0.64** |
| Original approved cap | $0.60 — exceeded by $0.04, disclosed and approved mid-phase before the overage occurred |
| Total fal.ai requests attempted | 19 (16 successful generations + 3 rejected/failed) |
| Original call cap | "exactly twelve paid image calls" — not met literally; both the overage and its cause were reported to the user before any corrective call was made, per the phase's "do not retry a failed generation without reporting first" instruction |

## Format validation (all 12)

Every file verified by reading its actual byte signature (not inferred from
extension) and decoding with Pillow — all 12 are genuine PNG at exactly
1344×768, all converted from the provider's real WEBP response
(`format_converted=True`), consistent with the WebP-return behavior already
documented in `PROVIDER_SETUP.md`.

## Validation checklist

| Check | Result |
|---|---|
| Exactly twelve Recraft calls maximum | **Not met** — 19 total attempts (see Cost and call accounting); overage disclosed and approved mid-phase, not silent |
| Exactly four images per direction | Pass — 4/4/4 delivered |
| All images are valid 1344×768 PNG files | Pass — signature- and dimension-verified on all 12 |
| No API keys printed or committed | Pass — no key value appears in this document, the manifest, or any script output above |
| No video calls made | Pass |
| No FLUX calls made | Pass |
| No Remotion code changed | Pass — `git status` shows no changes under `remotion-composer/` from this phase |
| Three contact sheets created | Pass |
| QA document complete | Pass (this document) |
| Paid-call count and estimated cost recorded | Pass — see Cost and call accounting |

## Pass/fail

**Technical validation: PASS with one disclosed, approved deviation** (the
call-count/budget overage, both reported and approved before the spend).
**Creative validation: mixed** — no direction currently qualifies as a
clean four-frame family; two individual frames (Direction B/F4, Direction
C/F3) cross into direct brand-exclusion territory and should not advance
without revision regardless of which direction is chosen.

**Creative-review status for all 12 images: awaiting author review.** This
document does not select a direction. Per this phase's explicit
instruction, creative approval remains with the author.
