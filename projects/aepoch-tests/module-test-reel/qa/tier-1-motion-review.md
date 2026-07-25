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
