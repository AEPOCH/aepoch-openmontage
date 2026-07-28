# ÆPOCH Tier 1 Motion Review

Status: **PASS**  
Review date: 2026-07-25  
Format: 1920×1080, 30 fps, 1275 frames / 42.5 seconds

## Composition and timing map

| Section | Composition ID | Reel frames | Duration | Narration window | Caption window |
|---|---|---:|---:|---:|---:|
| Title slate | `AepochTier1TestReelCaptioned` / `Clean` / `Reduced` | 0–59 | 60f / 2.0s | None | None |
| Declarative Hook | `AepochTier1DeclarativeHookAnimated` | 60–209 | 150f / 5.0s | 66–164 | 72–194 |
| Key Statement | `AepochTier1KeyStatementAnimated` | 210–329 | 120f / 4.0s | 210–328 | 220–319 |
| Circular Value Field | `AepochTier1CircularValueFieldAnimated` | 330–509 | 180f / 6.0s | 336–450 | 345–489 |
| Flow Lifecycle | `AepochTier1FlowLifecycleAnimated` | 510–719 | 210f / 7.0s | 516–652 | 520–694 |
| Human Network | `AepochTier1HumanNetworkAnimated` | 720–929 | 210f / 7.0s | 726–888 | 730–914 |
| System Comparison | `AepochTier1SystemComparisonAnimated` | 930–1139 | 210f / 7.0s | 936–1126 | 940–1124 |
| Outro landing | Reel composition | 1140–1274 | 135f / 4.5s | 1146–1244 | 1150–1264 |

Narration uses the exact approved text in `inputs/test-reel-script.md`. The two-clause captions use adjacent cues so each phrase remains readable inside title-safe and caption-safe bounds. Piper `en_US-lessac-medium` is used only as a temporary timing voice; “ÆPOCH” is pronounced “AY-pock” in synthesis without changing the stored script or captions.

## Module motion

| Module | Internal timing | Motion tokens and behavior | Reduced motion |
|---|---|---|---|
| Declarative Hook | Eyebrow 0–18; headline lines 12–42; human 42–62; rigid geometry 50–72; camera 0–96 | `standard`, `measured`, `easeOutCubic`, `sharpSystem`, `pushInSmall` (0.95→1.0) | Approved final composition is present from frame 0; translation, stagger, and camera motion are removed. |
| Key Statement | Lines 0–36; human 30–50; Comet Arc 34–70 | `standard`, `measured`, `easeOutCubic`, single SVG stroke reveal | Complete static composition from frame 0; arc is fully drawn and does not loop. |
| Circular Value Field | Production 12–34; Presence 34–56; convergence 34–76; conclusion 76–98 | `measured`, `easeOutQuint`, convergence | Both fields and conclusion are immediately present; no balance translation. |
| Flow Lifecycle | Headline 0–22; steps 24/58/92/126; connectors follow each step; permanent resolution by 154 | `measured`, `standard`, lifecycle step timing, SVG edge draw | All four equal cards, labels, and connectors are immediately visible and still. |
| Human Network | Headline 0–22; nodes begin 18 with deterministic 6f stagger; edges follow endpoints; pull-back 18–126 | `standard`, deterministic stagger, node/edge helpers, two bounded path flows, `pullBackSmall` (1.08→1.0) | Full equal-scale network is present from frame 0; no stagger, path illumination, or camera movement. |
| System Comparison | Headline 0–22; existing header 14–22; pairs at 24/56/88/120; alternatives follow at +10f | `quick`, `standard`, `sharpSystem` on the existing side, `easeOutCubic` on the ÆPOCH side | All four editorial relationships are present from frame 0; no directional translation or stagger. |

All modules settle into their approved native static compositions. No bounce, spin, glitch, whip pan, perpetual movement, uncontrolled parallax, or render-path `Math.random()` is used. Camera scale changes remain below the locked 10% maximum.

## Signal and semantic color

- The Signal is used **zero times** in this reel.
- Moss is not used for an unverified or decorative state.
- The Comet Arc appears once in Key Statement and performs one draw-on reveal without looping.

## Narration and captions

- Narration master: `audio/test-reel-narration.wav`
- Piper model: `audio/piper-models/en_US-lessac-medium.onnx`
- Captions: `captions/test-reel-captions.srt` and `captions/test-reel-captions.json`
- Caption text is an exact transcription of the supplied narration.
- Captioned variants burn captions inside the caption-safe container; the clean variant retains narration without burned text.

## Render commands

Representative module command:

```bash
npx remotion render src/index.tsx AepochTier1DeclarativeHookAnimated \
  ../projects/aepoch-tests/module-test-reel/renders/modules/01-declarative-hook.mp4 \
  --codec=h264 --crf=18
```

Reduced-motion compositions use the corresponding `*Reduced` IDs. The full standard reel was rendered in scene-aligned frame ranges from `AepochTier1TestReelClean`, concatenated at 30 fps, and trimmed to exactly 1275 frames. The captioned version burns the exact SRT with FFmpeg/libass. The reduced reel holds one native Remotion-rendered frame per reduced scene for its prescribed duration, then burns the same SRT. Narration is muxed from the common 42.5-second WAV master.

## Outputs

Standard module previews:

- `renders/modules/01-declarative-hook.mp4`
- `renders/modules/02-key-statement.mp4`
- `renders/modules/03-circular-value-field.mp4`
- `renders/modules/04-flow-lifecycle.mp4`
- `renders/modules/05-human-network.mp4`
- `renders/modules/06-system-comparison.mp4`

Reduced-motion module previews use the same filenames under `renders/reduced-motion/`.

Reels:

- `renders/aepoch-tier-1-test-reel-captioned.mp4`
- `renders/aepoch-tier-1-test-reel-clean.mp4`
- `renders/reduced-motion/aepoch-tier-1-test-reel-reduced.mp4`

All three reels probe as H.264/AAC, 1920×1080, 30 fps, and exactly 42.500 seconds.

## Determinism

Repeat still renders were byte-identical at representative frames:

| Module | Frame | SHA-256 |
|---|---:|---|
| Declarative Hook | 55 | `7726e77ec9d1cf536f5ca00860ca8d71e75b19daa3ab7198091b86d9f3347220` |
| Key Statement | 45 | `bee839ec1db1b7b8c469fbeb509a5add3eb44058624f26048a70c114f9f706f0` |
| Circular Value Field | 45 | `4be9f2e3480cb35d7f89103b7980f8aa393a5b19a4ebeef261037ebc4aba4e5b` |
| Flow Lifecycle | 100 | `08057a357598a418b98f02e224b7b5fcde763950797c816f8bc46e49a5087a33` |
| Human Network | 82 | `2ea18309f634b49c7d4f0df19f10328c032297200223afc0928cbe4acd4cd3be` |
| System Comparison | 92 | `fcd640767e54af09fac38873c556193c9a238103b4668cb1cf4d57969407fb74` |

The complete reel composition was also repeated at global frame 1000. Both native renders produced:
`7a4f7b2971565ea2d3f6df6f34b0a062340c375ad5986058738adb4f642bd9c5`.

## Known visual issues and disposition

- The narration is intentionally a temporary Piper timing voice, not the final series narrator.
- MP4 module containers report approximately 0.053–0.061 seconds of encoder/container tail beyond their exact Remotion frame counts. The reel assembly uses the specified frame boundaries and all final reels are exactly 42.500 seconds.
- No approved reference PNG or approved native still was modified or used as animated raster content.
- Existing unrelated legacy TypeScript errors remain untouched as requested; the new ÆPOCH source reports no ÆPOCH-scoped TypeScript diagnostics.

Final result: **PASS — six animated previews, six reduced-motion previews, and all three narrated reel variants rendered successfully.**

---

## Phase 12C — Caption and transition correction

Status: **PASS**
Review date: 2026-07-28
Scope: caption treatment replacement, caption phrase grouping, combined-reel
transition overlap, and three targeted per-module timing corrections
(DeclarativeHook, CircularValueField, SystemComparison). No scene
composition was redesigned, no new scene modules were introduced, no
episode was begun, and no final narrator voice was chosen. Tier 1 motion
behavior from the review above remains approved; this section records only
the corrections applied on top of it.

### Caption specification

The prior burned-caption treatment (`CaptionLayer` in `reel.tsx`) used a
light cream panel (`rgba(250,248,245,0.92)`, dark ink text, 22px radius,
unbounded ~1500px width) that did not match the approved spec, and the
standalone module previews had **no burned captions at all** despite
carrying narration audio. Both are replaced by one shared component,
`CaptionPanel` (`remotion-composer/src/aepoch/captions.tsx`), used
identically by the combined reel and by all six module previews:

| Property | Spec range | Implemented |
|---|---|---|
| Font size | 36–42 px | 38 px |
| Max width | 1180–1280 px | 1240 px |
| Max lines | 2 | 2 (hard-clamped via `-webkit-line-clamp`) |
| Bottom offset | 54–72 px | 64 px |
| Horizontal padding | 24–32 px | 28 px |
| Vertical padding | 12–16 px | 14 px |
| Background | rgba(26,22,18,0.72–0.80) | rgba(26,22,18,0.76) |
| Text color | #FAF8F5 | #FAF8F5 |
| Corner radius | 10–14 px | 12 px |
| Line height | 1.18–1.25 | 1.22 |
| Caption-safe reserve | 140–160 px | 150 px |

One continuous panel is rendered per active cue (never separate word or
line boxes), centered horizontally (`left:0; right:0; display:flex;
justify-content:center`), with `pointerEvents:none`. `AEPOCH_LAYOUT.captionReserveMin`
moved from 170px to 150px and the `runtime.ts` scene-validation floor moved
from 170px to 140px to match; `previews.tsx`'s base `captions.reserveBottomPx`
moved from 180px to 150px.

### Caption line grouping

Text is byte-identical to the approved narration script — only cue
boundaries changed. Three cues that were previously one long block are now
split at their natural clause so each half sits comfortably inside the new
1240px/38px/2-line panel instead of relying on unconstrained wrapping:

- Hook: "For centuries, we have measured value" / "through production."
- Circular Value Field: "What we count shapes what we value:" / "production, or presence."
- Outro: "Presence activates value." / "Flow makes it permanent."

The remaining cues (Key Statement, Flow Lifecycle, Human Network, System
Comparison) were already split at clause boundaries and needed no change.
`-webkit-line-clamp:2` on the panel is a hard backstop — no cue observed
in review exceeds 2 lines, but the clamp guarantees it regardless.

Module previews reuse the exact same global cues, sliced to each module's
local timeline by `localCaptionCues(moduleKey)` (subtracts the module's
`TEST_REEL_TIMING` start frame and keeps only cues fully inside its
duration) — there is one caption source of truth, not a duplicated copy.

### Transition overlap timing

Every module scene paints an opaque background (`AepochScene` / `EarthRise`),
so fading the outgoing scene's own opacity has no visible effect — the
opaque incoming scene already fully occludes it the instant it mounts.
The working implementation instead:

1. Extends the **outgoing** module's `Sequence` by `CROSSFADE_FRAMES = 12`
   frames past its nominal duration. It holds its already-settled final
   frame for that tail (no motion, already at steady state) so there is
   something to dissolve over.
2. Wraps the **incoming** module in `CrossfadeIn`, which fades opacity
   0 → 1 over its own first 12 local frames, dissolving over the still-
   visible outgoing scene beneath it.

Applied between: DeclarativeHook↔KeyStatement, KeyStatement↔CircularValueField,
CircularValueField↔FlowLifecycle, FlowLifecycle↔HumanNetwork,
HumanNetwork↔SystemComparison. Earth Rise remains visible throughout every
crossfade since it is part of each scene's own opaque content, never a
separate layer that could be interrupted.

A full empty-background reset is preserved in exactly the two places
authorized: Title → DeclarativeHook, and SystemComparison → Outro landing
(neither gets a tail extension or a `CrossfadeIn` wrapper — both remain
instant cuts, verified in the rendered output).

Reduced motion skips the dissolve entirely (`CrossfadeIn` renders at
opacity 1 immediately when `reducedMotion` is true): every reduced scene is
already fully settled from its first frame, so there is no "empty" moment
for a hard cut to expose, and adding a 12-frame fade would itself be a
motion effect the reduced-motion contract forbids. Verified in the
rendered reduced reel: module boundaries cut instantly to the next
module's complete static composition.

`TEST_REEL_TIMING` start/duration values are unchanged; only `Sequence`
tail extensions were added, so the composition's total length and every
narration/caption window remain exactly as documented above.

### Module-specific timing changes

Word-level narration timestamps are not available; timing below is derived
from each module's isolated narration clip duration (ffprobe) mapped
proportionally across the transcript's word count, anchored to the
existing narration-window frame numbers.

**DeclarativeHook** — the rigid production geometry (the right-side SVG
system icon) previously reached full reveal at local frame 72, well before
its narration finished. Narration (`01-declarative-hook.wav`, 3.274s ≈ 98
frames, local 6–104) speaks "For centuries, we have measured value through
production." (8 words); "production." is the 8th/last word, landing at
approximately local frame 92–104. The system reveal is retimed to
start frame 72 / duration 28 (settles at local frame 100), landing its
strongest arrival on the spoken word. The human entrance is unchanged
(start 42, duration 20, soft fromY/fromScale) per instruction.

**CircularValueField** — Production and Presence previously revealed at
local frames 0 and 24, well before either word is spoken, and the footer
conclusion revealed at frame 62, before the fields had even converged.
Narration (`03-circular-value-field.wav`, 3.808s ≈ 114 frames, local
6–120) speaks "What we count shapes what we value: production, or
presence." (10 words); "production," ≈ local 86–97, "presence." ≈ local
109–120. Retimed: Production reveal start 70/duration 22 (settles 92,
inside "production,"'s window); Presence reveal start 96/duration 22
(settles 118, inside "presence."'s window); convergence start
122/duration 26 (after presence settles); footer conclusion start
150/duration 22 (after convergence completes). Verified by rendered
frames: Production alone at frame 92, Presence joins by frame 118, footer
appears only at frame 150+.

**SystemComparison** — layout unchanged. The four paired rows previously
all emphasized within local frames 34–103, finishing before the narration
even reached its second clause. Narration (`06-system-comparison.wav`,
6.339s ≈ 190 frames, local 6–196) splits into "Different systems produce
different realities:" (local ≈ 10–105) and "extraction or contribution,
concentration or flow." (local ≈ 105–195) — the second clause names rows 2
and 3 directly. Row emphasis start frames changed from `34 + index*23`
(34/57/80/103) to `[20, 55, 110, 155]`, spreading rows 0–1 across the first
clause and landing rows 2–3 inside the second clause where "extraction or
contribution" and "concentration or flow" are actually spoken. Verified by
rendered frame 175: row 3 ("Centralizes power" → "Distributes power") is
mid-reveal exactly as the caption reads "concentration or flow."

FlowLifecycle, HumanNetwork, and KeyStatement motion is untouched — no
internal timing constants were modified in these three modules.

### Render commands

Module previews (Remotion render, then FFmpeg audio mux — no caption burn
step; captions are native to the Remotion render):

```bash
npx remotion render src/index.tsx AepochTier1DeclarativeHookAnimated \
  <video>.mp4 --codec=h264 --crf=18
ffmpeg -y -i <video>.mp4 -i audio/01-declarative-hook.wav \
  -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k \
  renders/modules/01-declarative-hook.mp4
```

(repeated for `AepochTier1KeyStatementAnimated`, `AepochTier1CircularValueFieldAnimated`,
`AepochTier1FlowLifecycleAnimated`, `AepochTier1HumanNetworkAnimated`,
`AepochTier1SystemComparisonAnimated` against their matching narration clips)

Complete reels (captions are burned natively by Remotion for the captioned
and reduced compositions — no FFmpeg/libass subtitle burn is used):

```bash
npx remotion render src/index.tsx AepochTier1TestReelCaptioned captioned.mp4 --codec=h264 --crf=18
npx remotion render src/index.tsx AepochTier1TestReelClean clean.mp4 --codec=h264 --crf=18
npx remotion render src/index.tsx AepochTier1TestReelReduced reduced.mp4 --codec=h264 --crf=18

ffmpeg -y -i captioned.mp4 -i audio/test-reel-narration.wav \
  -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k \
  renders/aepoch-tier-1-test-reel-captioned.mp4
# (repeated for clean.mp4 -> renders/aepoch-tier-1-test-reel-clean.mp4
#  and reduced.mp4 -> renders/reduced-motion/aepoch-tier-1-test-reel-reduced.mp4)
```

Determinism check (representative-frame stills, matching the Tier 1
methodology): `npx remotion still src/index.tsx <compositionId> <out>.png
--frame=<n>`, rendered twice per composition and compared byte-for-byte.

### Output hashes

Module previews (final muxed deliverables):

| File | SHA-256 |
|---|---|
| `renders/modules/01-declarative-hook.mp4` | `841506f8ea8e793d8a7262c85ddf0859168b800f2d8be37e4039c8b6c2b5ec0d` |
| `renders/modules/02-key-statement.mp4` | `e521bf75b2317bfca50622e28b954d77015ad9a5fe3f1ba0e3d8a56770d1894d` |
| `renders/modules/03-circular-value-field.mp4` | `c31c60d06c69f1a09333c022623b026daf64715465595b05ed70885a94da2eba` |
| `renders/modules/04-flow-lifecycle.mp4` | `eecc9bc075d804ad1db603783c94077ddc2fa916e4098e0e66c361292cf0d816` |
| `renders/modules/05-human-network.mp4` | `b90b6a458e01cd2a09ef863238b1746e78ac2a4f0a31a6bcf626c52600b255ad` |
| `renders/modules/06-system-comparison.mp4` | `81e7f9174ca4eefa29baab646195456c82f2d927b66eae768d53780181c8cdba` |

Complete reels:

| File | SHA-256 |
|---|---|
| `renders/aepoch-tier-1-test-reel-captioned.mp4` | `0f92536c2d6650bf5262c1fcf7074dd502d060b048963227858e71178b381809` |
| `renders/aepoch-tier-1-test-reel-clean.mp4` | `450451272d0b1ed7da68350ef8df3c5fa38bdab48959843ac0070e38f510cadc` |
| `renders/reduced-motion/aepoch-tier-1-test-reel-reduced.mp4` | `c58f6bb30ade3e13b97a667abaa1cc36a21ad707a6aacc55925f8a8dd01c38c9` |

Representative-frame determinism (repeat still render, byte-identical
SHA-256 both times):

| Composition | Frame | SHA-256 |
|---|---:|---|
| `AepochTier1DeclarativeHookAnimated` | 95 | `09e8ae1c311335268aa22bde066afe9e917327a687b6b1ea63db61169a2dffe8` |
| `AepochTier1TestReelCaptioned` | 1000 | `301b087f6101e4cff866a12d157d000a46dccfff57a6899e5b8c3a2be0659dd9` |

Single-render representative frames for the remaining four modules (code
audit confirms no `Math.random()` / `Date.now()` / other non-deterministic
source anywhere in `modules.tsx`, `motion.tsx`, or `captions.tsx`, so a
second render is expected to match and was not separately re-executed for
every module):

| Composition | Frame | SHA-256 |
|---|---:|---|
| `AepochTier1KeyStatementAnimated` | 45 | `e06591ccc05b9d97b18edae98c6bc63aa0232692db5d8ede42413f812004b0c9` |
| `AepochTier1CircularValueFieldAnimated` | 110 | `d79ae95b2a0cbe614106f37230c114d96371e175c2d9d51950a5cd8b22e3728f` |
| `AepochTier1FlowLifecycleAnimated` | 100 | `9646339dd59f16a8f2e31c872da9a9c43c5ae66878d8c067b8788376ab06aefb` |
| `AepochTier1HumanNetworkAnimated` | 82 | `1b8a22ac2e9cdf4484940f83b310589bb2cd136c5f1c1dc8ecbd6a27af8987ef` |
| `AepochTier1SystemComparisonAnimated` | 130 | `b17767358b93c9a7030f29956ed6551b44322e7bb7de4b13a44ec11deac6bad9` |

### Verification performed

- All three complete reels probe as H.264/AAC, 1920×1080, 30 fps, exactly
  42.500000 seconds — transition overlaps used tail-extended `Sequence`
  durations, not timeline shifts, so `TEST_REEL_TIMING.total` (1275 frames)
  and the 42.5s runtime are unchanged.
- All six module previews probe as H.264/AAC, 1920×1080, 30 fps.
- Captions verified inside the caption-safe region and never overlapping
  labels, human nodes, diagrams, cards, or authored on-screen statements,
  spot-checked in the densest cases (Human Network's 8-node diagram,
  System Comparison's 4-row grid, the outro's centered lockup).
- Clean reel confirmed to carry no caption panel at any active-cue
  timestamp; it differs from its prior version only in the crossfade
  transitions and the three authorized module-timing corrections above —
  no layout, composition, or new-module changes.
- Reduced-motion reel confirmed to cut instantly at every module boundary
  (no crossfade motion) while still carrying the burned captions, and
  every module shows its complete static composition from its first frame.
- Title → DeclarativeHook and SystemComparison → Outro confirmed as
  instant hard cuts in the rendered captioned reel (frames 65 and the
  outro landing checked directly).

### Known pre-existing issues (unrelated to this phase)

- `02-key-statement.wav`, `04-flow-lifecycle.wav`, and `07-outro.wav` each
  emit an FFmpeg "Invalid PCM packet, data has size 1 but at least a size
  of 2 was expected" decode warning on their final sample (a pre-existing,
  sub-millisecond trailing-byte artifact in the Piper-exported WAV files,
  not introduced by this phase). It does not affect the muxed output
  audibly or change container duration in any of the deliverables above.
- Narration remains the temporary Piper timing voice, unchanged from Tier 1.

Final result: **PASS — caption treatment replaced to spec on the combined
reel and all six module previews, phrase grouping corrected, ordinary-
module transitions crossfade over 12 frames with hard resets preserved
only after the title slate and into the outro, the three authorized
per-module timing corrections verified against their narration windows,
and all three complete-reel variants render successfully at exactly 42.5
seconds.**
