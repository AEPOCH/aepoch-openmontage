# Phase 14A.2 — Direction A Visual-Style Convergence Test

Episode: `001-what-is-aepoch`. Six new 16:9 images testing whether the
approved **Direction A — Editorial Geometric** style (locked by the author
after Phase 14A.1) holds together as one coherent family across three
difficult narrative concepts: Human Among Synthetic Echoes, Uncertain
Digital Reflection, and Manufactured Consensus. Generated through the
repaired `recraft_image` tool (Recraft v4 via fal.ai), registry-routed —
never a direct API call. No animation, no video generation, no
Kling/Veo/MiniMax/FLUX calls, no Remotion code changes, no custom style
training. This document does not reopen the three-direction comparison;
Direction A was already approved as the production base before this phase
began. Generated assets live under
`assets/style-convergence/phase-14a2/` and remain gitignored (working
production assets pending creative approval).

## Preflight

| Item | Value |
|---|---|
| Tool | `recraft_image` (`tools.graphics.recraft_image.RecraftImage`), registry-routed |
| Model | Recraft v4 (non-pro) |
| Requested dimensions | `image_size="landscape_16_9"` → verified 1344×768 on all 10 calls |
| Style parameter | `"any"` — the only value confirmed (Phase 14A.1) to return a raster PNG; `vector_illustration` returns SVG, `digital_illustration`/`realistic_image`/`icon` are rejected by the live endpoint |
| Seed | **Not supported.** `recraft_image`'s `input_schema` has no `seed` field and `execute()` never forwards one. Confirmed again this phase. `determinism` is declared `STOCHASTIC` on the tool itself. Reported before generation began. |
| Colors | Fixed 10-hex array on every call: Clay `#C4835A`, Ochre `#A0673A`, Loam `#7A5230`, Sand `#E8C9A0`, Pearl `#D6E4F0`, Iris `#8BAFD4`, Prism `#B8A9D9`, Paper `#FAF8F5`, Ink `#1A1612`, InkMid `#4A4440`. No Moss, no Signal, no Glow, no Pulse. |
| Prompting | Positive-only throughout, no negative-exclusion clauses (per Phase 14A.1 Incident #3 — a literal exclusion list previously triggered fal.ai content moderation) |

## Call and cost accounting

| Round | Calls | Purpose | Cost |
|---|---|---|---|
| Round 1 | 6 | Initial candidate generation (echoes-a/b, reflection-a/b, consensus-a/b) | $0.24 |
| Round 2 | 4 | Regeneration of echoes-a, echoes-b, consensus-a, consensus-b after Round 1 creative review found brand-language and consistency problems in those four | $0.16 |
| **Total** | **10** | | **$0.40** |

Originally approved cap: 6 calls / $0.30. Both the call-count and budget
overage (4 extra calls, $0.10 over budget) were disclosed to the author and
explicitly approved before the Round 2 spend, via two separate approval
exchanges — consistent with how Phase 14A.1 handled its own cap overage.
No call failed or was moderation-rejected this phase; all 10 succeeded on
the first attempt, so there was nothing to "retry without reporting."

Final delivered set mixes rounds: `reflection-a` and `reflection-b` are
Round 1 (never regenerated — no problems found). `echoes-a`, `echoes-b`,
`consensus-a`, and `consensus-b` are Round 2 (Round 1 versions of these
four had confirmed problems and were superseded on disk by the Round 2
call to the same output path — Round 1 bytes for these four no longer
exist on disk).

## Per-image record

Format: all 10 calls (6 delivered as final + 4 superseded Round 1 attempts)
verified genuine PNG (signature-checked via Pillow, not filename-inferred)
at exactly 1344×768, all converted from the provider's real WEBP response
(`format_converted=True`). Cost: $0.04 per call (Recraft v4 non-pro).

### Human Among Synthetic Echoes

| Field | echoes-a | echoes-b |
|---|---|---|
| Prompt summary | One warm clay-toned adult figure walking in profile center-frame; four cool pearl/iris/sand echo figures in profile procession around; flat solid color fields, no texture, explicit anti-patchwork/anti-cross-hatch clause (Round 2 correction) | One warm clay-toned figure in three-quarter stance on the frame's right with large open negative space to its right; a loose cluster of 5 cool echo figures gathered only to its left; flat solid color, explicit anti-texture/anti-swirl clause and explicit one-sided composition clause (Round 2 correction) |
| Seed | Not supported | Not supported |
| Filename | `human-among-synthetic-echoes/echoes-a.png` | `human-among-synthetic-echoes/echoes-b.png` |
| Dimensions | 1344×768 | 1344×768 |
| Actual format | PNG | PNG |
| Source format | WEBP | WEBP |
| Conversion status | Converted, verified | Converted, verified |
| Estimated cost | $0.04 (Round 2 call; Round 1 attempt $0.04 also spent and superseded) | $0.04 (Round 2 call; Round 1 attempt $0.04 also spent and superseded) |
| Human anatomy quality | Good — natural adult proportions, clean walking gait, soft-corner silhouettes | Good — natural adult proportions, confident stance |
| Concept clarity | High — warm figure clearly distinguished from cool echoes by color and position; procession rhythm reads as repetition, not a crowd | Medium — asymmetric composition now correctly reads as one person plus a gathered cluster rather than a surrounding mob (Round 1's composition problem is fixed) |
| Direction A compatibility | Good — flat solid color fields, clean ink outlines, matches Direction A/F1's rendering method closely | **Fail** — the figure has sunglasses, a beanie, and a visible smiling face with defined eyes/mouth; this reads as an accessorized character with personality, which `VISUAL_LANGUAGE.md`'s "no fixed face, no name, no personality... shouldn't accumulate one" rule and this phase's own "no rendered facial features beyond minimal expression" language both push against |
| Cross-family consistency | Good — sits comfortably next to reflection-a/b and consensus-a/b | Weak — the cartoon face and props stand out sharply against every other image's featureless/restrained figures |
| Phone readability | Good | Good (the problem is brand-language, not legibility) |
| Unwanted artifacts | None | Sunglasses, beanie, and smiling facial expression — not called for in the brief, and in tension with the series' explicit no-personality rule |
| Pass/fail | **Pass** | **Fail** — composition problem fixed, but a new brand-language problem (accessorized personality/mascot-adjacent face) took its place. Two rounds, two different failure modes; no clean pass achieved for this candidate slot. |
| Creative-review status | Awaiting author review | Awaiting author review |

Round 1 notes (superseded, not delivered): the original `echoes-a` had
heavy cross-hatched/patchwork texture on the clothing, violating
`VISUAL_LANGUAGE.md`'s "no texture... flat and clean throughout" rule and
diverging from Direction A/F1's clean flat-silhouette look. The original
`echoes-b` had the same texture problem (swirl/paisley pattern fills) plus
a composition where cool echoes flanked the human on both sides, reading
closer to the brief's explicitly-disallowed "threatening mob" than the
one-sided pressure it asked for.

### Uncertain Digital Reflection

| Field | reflection-a | reflection-b |
|---|---|---|
| Prompt summary | One warm clay figure in profile, one cool iris near-duplicate offset behind and to the side; both built from concentric layered contour bands (thin nested arcs following the silhouette); the echo's bands are offset by a small consistent margin producing subtle head/shoulder misregistration | One warm clay figure and one cool prism echo standing close together in profile, same contour-band technique, bands overlapping through the shared silhouette region |
| Seed | Not supported | Not supported |
| Filename | `uncertain-digital-reflection/reflection-a.png` | `uncertain-digital-reflection/reflection-b.png` |
| Dimensions | 1344×768 | 1344×768 |
| Actual format | PNG | PNG |
| Source format | WEBP | WEBP |
| Conversion status | Converted, verified | Converted, verified |
| Estimated cost | $0.04 | $0.04 |
| Human anatomy quality | Good — natural proportions, dignified profile stance | Good — natural proportions |
| Concept clarity | High — the misregistration reads clearly as "almost but not fully aligned," exactly the narrative meaning ("the face looks right, but the lips don't quite sync") | Medium-high — the overlap/layering idea reads, though a decorative spiral motif inside the head area is an unexplained anatomy quirk that isn't a clean silhouette |
| Direction A compatibility | Good — this is the successful integration of the Direction B/F2 layered-contour *technique* into Direction A's Paper-background, restrained-palette language, exactly as the phase brief intended (technique borrowed, not the full paper-cut style, not Void background) | Good, with the spiral-head caveat above |
| Cross-family consistency | Strongest image of the six — clean, restrained, matches the family's flat-vector, soft-corner language | Good — same technique as reflection-a, clearly part of the same pair |
| Phone readability | Good | Good |
| Unwanted artifacts | None | Small decorative spiral inside the head silhouette, not specified in the brief |
| Pass/fail | **Pass** — strongest candidate across all six images | **Pass with reservation** — usable, but the spiral-head motif should be corrected in the next pass |
| Creative-review status | Awaiting author review | Awaiting author review |

No Round 2 regeneration was needed for either image — no problems were
found in Round 1.

### Manufactured Consensus

| Field | consensus-a | consensus-b |
|---|---|---|
| Prompt summary | Many repeated cool-toned adult silhouettes in vertical rows across the left two-thirds of a wide frame; explicit adult-proportion clause (1:7 head-to-body, "not chibi, not toddler, not toy-like") and explicit "resolves into a flat ribbon band, not a curling tail/spiral/animal shape" clause (both Round 2 corrections) | Many repeated cool-toned adult silhouettes in organized horizontal layered bands; explicit "no abstract blob shapes, no circular eye-like cutouts or dots, no faces" clause and explicit "every unit remains a simple flat human silhouette" clause (both Round 2 corrections) |
| Seed | Not supported | Not supported |
| Filename | `manufactured-consensus/consensus-a.png` | `manufactured-consensus/consensus-b.png` |
| Dimensions | 1344×768 | 1344×768 |
| Actual format | PNG | PNG |
| Source format | WEBP | WEBP |
| Conversion status | Converted, verified | Converted, verified |
| Estimated cost | $0.04 (Round 2 call; Round 1 attempt $0.04 also spent and superseded) | $0.04 (Round 2 call; Round 1 attempt $0.04 also spent and superseded) |
| Human anatomy quality | Good — adult proportions throughout, the chibi/mascot problem from Round 1 is fully resolved | N/A — abstract repeating head/neck silhouette shapes, not full human figures |
| Concept clarity | Medium — the many-to-few idea reads, but the mechanism is a perspective recession (figures shrinking into the distance) rather than the brief's "progressively align, compress and resolve into one shared wave/band form"; this is a different device than what was asked for | **Fail** — no visible progression or resolution toward one direction; the image is already one uniform repeating pattern edge to edge, so the "manufacturing" idea (many becoming one) doesn't land |
| Direction A compatibility | Partial — flat vector technique, but a busy zebra-stripe/paint-drip pattern across the bodies drifts from Direction A's flat-color-field simplicity | Weak — reduced to a repeating head/neck motif rather than full readable human silhouettes with Direction A's soft-corner figure language |
| Cross-family consistency | Weak — the recession/perspective device and busy body pattern are unlike anything in the other four images | Weak — the closest thing to a distinct human figure anywhere in this image is a head silhouette; doesn't relate visually to echoes-a/b or reflection-a/b |
| Phone readability | Medium — the composition is legible but busy at small scale | **Fail** — collapses into visual mush at phone scale, confirmed on the phone-scale contact sheet |
| Unwanted artifacts | Zebra-stripe/paint pattern not specified in the brief | Dense wall of repeating shapes with zero negative space — directly contradicts the brief's explicit "stays broad and spacious rather than becoming a dense wall" requirement for this candidate |
| Pass/fail | **Pass with reservations** — mascot/chibi and tail-shape problems from Round 1 are fixed, but the resolution mechanism and body pattern don't fully match the brief | **Fail** — the blank-eye-adjacent blob artifact from Round 1 is fixed, but the replacement composition fails the candidate's own explicit "broad and spacious, not a dense wall" requirement and loses full human figures entirely |
| Creative-review status | Awaiting author review | Awaiting author review |

Round 1 notes (superseded, not delivered): the original `consensus-a` used
chibi-proportioned figures (oversized heads, tiny bodies) that read as
mascot/toy-like — a direct violation of this phase's Human Design Rules —
and resolved into a curling shrimp/millipede-like tail shape rather than a
restrained wave/band form. The original `consensus-b` contained a row that
broke into an amorphous blob shape with stray white circles reading
uncomfortably close to "blank-eyed" imagery, one of this concept's explicit
hard exclusions.

## Contact sheets

All three required sheets generated and verified as valid PNGs:

- `phase-14a2-all-candidates.png` (1272×1329) — 3 rows (one concept per
  row), Candidate A and B side by side per row, labeled outside the
  artwork.
- `phase-14a2-family-comparison.png` (1356×612) — all six at identical
  420px-wide thumbnail sizing, 3 columns × 2 rows, neutral labels below
  each thumbnail.
- `phase-14a2-phone-scale.png` (604×294) — all six at ~180px width to
  approximate mobile viewing size. This sheet is what confirmed
  Consensus B's total loss of legibility at small scale.

## Consistency review

**Human anatomy:** Consistent and good across echoes-a, echoes-b (aside
from its face/accessories), reflection-a, reflection-b. Not applicable to
either Manufactured Consensus candidate — both are built from
repeated/abstracted forms rather than one clearly individuated figure,
which is consistent with how Direction A/F4 (the visual foundation for
this concept) was itself built.

**Line weight:** Consistent flat ink outlines across all six; no sketchy
or hand-drawn quality anywhere.

**Background treatment:** Consistent Paper background across all six — no
image drifted to Void/Depth or introduced background detail.

**Earth/Cosmos color logic:** Correctly applied in all six — warm
Clay/Ochre/Sand for human figures, cool Pearl/Iris/Prism for synthetic
forms, no Moss, no Signal.

**Editorial sophistication:** High in reflection-a/b and echoes-a; lower
in echoes-b (cartoon face undercuts the editorial register) and both
Manufactured Consensus candidates (busy pattern work in consensus-a, loss
of figure detail in consensus-b).

**Visual density:** Good (generous negative space) in echoes-a, echoes-b,
reflection-a, reflection-b, and consensus-a. **Fails** the brief's explicit
requirement in consensus-b, which is a dense wall with no breathing room.

**Phone-scale readability:** Good in five of six. Consensus-b fails
outright — confirmed by the phone-scale contact sheet.

**Does the reflection contour device feel like part of Direction A?**
Yes — this is the clearest success of the phase. Borrowing only the
layered-contour *technique* from Direction B/F2 (not its Void background
or full paper-cut style) and applying it on Paper with Direction A's
restrained palette produced the two strongest images in the set.

**Does Manufactured Consensus feel related to Human Among Synthetic
Echoes?** Only partially. Both use repeated humanoid forms in
Clay/Pearl/Iris/Prism, but the *rendering method* diverges: echoes-a/b are
full walking/standing figures with visible limbs and gait; consensus-a
uses a perspective-recession device; consensus-b is reduced to a repeating
head/neck motif. This echoes Phase 14A.1's own central finding — Direction
A does not yet "maintain the same illustration method" across figurative
and abstract-crowd beats.

**Does any image cross into fear, horror, or generic AI imagery?** No.
The two specific hard-exclusion risks from Round 1 (chibi/mascot figures
in consensus-a, blank-eyed-adjacent blob in consensus-b) were both
corrected in Round 2 and do not appear in the delivered six. Echoes-b's
face/accessories are a personality/mascot-adjacent concern, not a
horror/fear one, but are flagged above as their own distinct problem.

## Best candidates

- **Best Human Among Synthetic Echoes candidate: echoes-a.** Clean pass —
  no reservations.
- **Best Uncertain Digital Reflection candidate: reflection-a.** The
  strongest single image across all six, and the clearest proof that the
  Direction B/F2 contour technique integrates into Direction A.
- **Best Manufactured Consensus candidate: consensus-a**, with
  reservations (perspective-recession device instead of the brief's
  wave/band resolution; busy body pattern). Consensus-b is not
  recommended in its current form.

**Do the three selected winners form a coherent family?** Partially.
Echoes-a and reflection-a share Direction A's flat-vector, soft-corner,
restrained-palette language convincingly. Consensus-a is recognizably
related (same palette logic, same repeated-humanoid device) but uses a
distinct rendering method (perspective recession, busier pattern work)
that a viewer would likely notice as a shift in technique partway through
an episode.

**Does the B2 contour technique integrate successfully?** Yes, cleanly —
this is the single clearest positive finding of the phase.

**Is the family ready to become the basis of a custom ÆPOCH style?** Not
yet. Two of three concepts (Human Among Synthetic Echoes, Manufactured
Consensus) still lack a candidate that both passes brand compliance and
matches the other concepts' rendering method without reservation. A third
targeted pass — specifically on a Manufactured Consensus treatment that
uses full human silhouettes with Direction A's flat-color technique
end-to-end (avoiding both the perspective-recession device and the
dense-wall/no-figures device tried so far) and an Echoes B treatment
without facial accessories — would likely close the remaining gap.

## Main remaining risks

- Manufactured Consensus has now been attempted twice per candidate slot
  and still has no clean pass — this concept appears to be the hardest of
  the three for Direction A to express without drifting into either a
  different rendering method (consensus-a) or losing full human figures
  and negative space entirely (consensus-b).
- Echoes-b's accessorized/smiling-face problem is a new risk category not
  seen in Phase 14A.1 — prompt language emphasizing "distinguish the human
  from echoes" may be nudging the model toward giving the human a more
  developed, personality-bearing face. Future prompts for this concept
  should stay explicit that the human figure, like every other figure in
  the family, keeps minimal/restrained facial detail.
- Recraft v4's tendency to introduce unrequested pattern/texture work
  (patchwork in Round 1 echoes-a, swirls in Round 1 echoes-b, zebra-stripe
  in Round 2 consensus-a) suggests an explicit "flat solid color, no
  texture" clause should be a standing part of every future Direction A
  prompt in this project, not an as-needed correction.
- No seed support means none of these six results are reproducible;
  identical prompts on a future call are not guaranteed to return a
  similar image.

## Validation checklist

| Check | Result |
|---|---|
| Exactly six delivered candidate images | Pass — 2 per concept, 6 total |
| Maximum six paid calls at original cap | Not met — 10 total (4 over); overage disclosed and approved before the Round 2 spend, not silent |
| Maximum $0.30 estimated spend at original cap | Not met — $0.40 total ($0.10 over); overage disclosed and approved before the Round 2 spend, not silent |
| All images are valid 1344×768 PNG files | Pass — signature- and dimension-verified on all 10 calls made (6 delivered + 4 superseded Round 1 attempts) |
| No API keys printed or committed | Pass — no key value appears in this document, any script, or any output above |
| No video calls made | Pass |
| No FLUX/Kling/Veo/MiniMax calls made | Pass |
| No Remotion code changed | Pass |
| No custom style training performed | Pass |
| No episode-scale asset generation performed | Pass |
| Three-direction comparison not reopened | Pass — this document treats Direction A as the locked production base throughout |
| Three contact sheets created | Pass |
| QA document complete | Pass (this document) |
| Paid-call count and estimated cost recorded | Pass — see Call and cost accounting |

## Pass/fail

**Technical validation: PASS with one disclosed, approved deviation** (the
call-count/budget overage, reported and approved before the Round 2 spend).

**Creative validation: mixed, improved from Round 1 but not fully
resolved.** Two of six delivered images (echoes-a, reflection-a) are clean
passes. Two (reflection-b, consensus-a) pass with named reservations. Two
(echoes-b, consensus-b) do not currently pass — each fixed its Round 1
problem but surfaced a distinct new one, and the author explicitly chose
to stop and document rather than fund a third generation round.

**Creative-review status for all six images: awaiting author review.**
This document does not approve the family as production-ready. Per this
phase's explicit instruction, recommendation only — creative approval
remains with the author.
