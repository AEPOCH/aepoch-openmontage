# ÆPOCH Tier 1 static review

Review date: 2026-07-24  
Format: 1920×1080 PNG, 30 fps composition baseline  
Render frame: 0  
Motion mode: `reducedMotion: true`  
Determinism: pass — a second render of every composition produced the same SHA-256 hash.

## Static correction pass — 2026-07-24

Revised contact sheet:
`projects/aepoch-tests/module-test-reel/qa/tier-1-contact-sheet.png`

- `DeclarativeHook`: replaced mark-like criticized-system geometry with neutral,
  sharp-edged stacked production geometry; increased headline from 86px to
  98px while preserving the safe area.
- `KeyStatement`: retained as the visual benchmark; shortened and narrowed the
  Comet Arc so its full stroke remains inside the right safe boundary.
- `CircularValueField`: replaced the Production-field Æ mark with a neutral
  rigid production grid; retained the Presence field; increased the bottom
  statement from 26px to 34px.
- `FlowLifecycle`: increased card height from 340px to 390px, enlarged icons
  from 72px to 88px, enlarged primary labels from 29px to 34px, and enlarged
  sublabels from 21px to 25px. The final grid column is wider for
  `Become permanent`.
- `HumanNetwork`: removed the eyebrow copy while preserving equal 96px nodes,
  explicit positions, and the distributed topology.
- `SystemComparison`: removed the two-panel settings-card treatment and rebuilt
  the content as four full-width editorial pair rows. Comparison copy is 31px,
  rows have 112px minimum height plus 16px gaps, divider weight is 1px, and
  icons no longer sit in heavy containers.
- Preview controls: added `showDebugLabel?: boolean` and
  `showCornerMark?: boolean` to the common scene contract. Production defaults
  are `false`; Tier 1 development previews explicitly enable debug labels and
  leave corner marks disabled.
- Animation: unchanged; no animation was added.
- Reference PNGs: unchanged.
- Determinism: pass. All six corrected repeat renders matched their output
  still SHA-256 hashes exactly.

Corrected render hashes:

| Still | SHA-256 |
|---|---|
| `01-declarative-hook.png` | `d31d6d7e37a4982a5ae9f2c00b3116ae4c9ed51ceb506faa90245471d140147d` |
| `02-key-statement.png` | `5572ab5845be67c0aa5670916de642d29f188c1e8a61fcce0341f0cf71db0505` |
| `03-circular-value-field.png` | `fb39117eeff25a572a52dec3f1d81bf4101295a26073fa4d62e529a5238a1946` |
| `04-flow-lifecycle.png` | `90e1ae60720ac382726ae55d6cca184facf99107dc163ff220b0572c6239d825` |
| `05-human-network.png` | `6202d863a6882e342fcb4467b64cc5de5318d8cceaef06cd63aba689a738b5e0` |
| `06-system-comparison.png` | `35643752b725606fd0ea4641ef11474a9c4af53bbe9a46bc19179d335c4e6a68` |

The six approved PNGs under `brands/aepoch/reference-frames/tier-1/` were used
only as visual composition references. No reference PNG, raster typography, or
generated reference mark is embedded in an output.

## 1. Declarative Hook

- Composition ID: `AepochTier1DeclarativeHook`
- Input data: eyebrow `For centuries,`; lines `we have measured value` / `through production.`; Earth Rise theme; Earth/system contrast; seed `1201`; captions reserve `180px`
- Render command: `cd remotion-composer && npx remotion still src/index.tsx AepochTier1DeclarativeHook ../projects/aepoch-tests/module-test-reel/renders/stills/01-declarative-hook.png --frame=0`
- Reference image: `brands/aepoch/reference-frames/tier-1/01-declarative-hook.png`
- Output still: `projects/aepoch-tests/module-test-reel/renders/stills/01-declarative-hook.png`
- Known visual differences: local Arial/Helvetica stack replaces the unavailable approved brand font; symbolic system geometry is cleaner and less luminous; canonical live Æ geometry replaces the generated reference mark
- Remaining corrections: replace the temporary local/system font stack when an approved distributable brand font is added
- Status: **PASS**

## 2. Key Statement

- Composition ID: `AepochTier1KeyStatement`
- Input data: statement `Presence activates value.`; left-editorial layout; Earth Rise theme; seed `1201`; captions reserve `180px`
- Render command: `cd remotion-composer && npx remotion still src/index.tsx AepochTier1KeyStatement ../projects/aepoch-tests/module-test-reel/renders/stills/02-key-statement.png --frame=0`
- Reference image: `brands/aepoch/reference-frames/tier-1/02-key-statement.png`
- Output still: `projects/aepoch-tests/module-test-reel/renders/stills/02-key-statement.png`
- Known visual differences: local font metrics create slightly different line lengths; the background arc uses flat semantic Iris rather than the reference’s generated luminous treatment
- Remaining corrections: approved brand font substitution when available
- Status: **PASS**

## 3. Circular Value Field

- Composition ID: `AepochTier1CircularValueField`
- Input data: `Production` Cosmos field with canonical Æ mark; `Presence` Earth field with canonical human node; balanced relationship; footer `What we count shapes what we value.`; seed `1201`
- Render command: `cd remotion-composer && npx remotion still src/index.tsx AepochTier1CircularValueField ../projects/aepoch-tests/module-test-reel/renders/stills/03-circular-value-field.png --frame=0`
- Reference image: `brands/aepoch/reference-frames/tier-1/03-circular-value-field.png`
- Output still: `projects/aepoch-tests/module-test-reel/renders/stills/03-circular-value-field.png`
- Known visual differences: native fields use restrained flat radial pools and omit decorative dotted orbit fragments; canonical mark geometry replaces the generated reference symbol
- Remaining corrections: none for the static Tier 1 baseline
- Status: **PASS**

## 4. Flow Lifecycle

- Composition ID: `AepochTier1FlowLifecycle`
- Input data: headline `Value becomes real when it moves.`; steps `Show up`, `Activate`, `Circulate`, `Become permanent`; horizontal layout; permanent completion; seed `1201`
- Render command: `cd remotion-composer && npx remotion still src/index.tsx AepochTier1FlowLifecycle ../projects/aepoch-tests/module-test-reel/renders/stills/04-flow-lifecycle.png --frame=0`
- Reference image: `brands/aepoch/reference-frames/tier-1/04-flow-lifecycle.png`
- Output still: `projects/aepoch-tests/module-test-reel/renders/stills/04-flow-lifecycle.png`
- Known visual differences: native cards are flatter, icon geometry is simplified to the approved circle/ring/arc vocabulary, and the large decorative generated mark is omitted to preserve hierarchy and caption safety
- Remaining corrections: motion sequencing is intentionally deferred
- Status: **PASS**

## 5. Human Network

- Composition ID: `AepochTier1HumanNetwork`
- Input data: headline `One human.\nOne vote.`; support `Participation, not accumulation.`; eight equal human nodes; distributed topology; ten explicit edges; seed `1201`
- Render command: `cd remotion-composer && npx remotion still src/index.tsx AepochTier1HumanNetwork ../projects/aepoch-tests/module-test-reel/renders/stills/05-human-network.png --frame=0`
- Reference image: `brands/aepoch/reference-frames/tier-1/05-human-network.png`
- Output still: `projects/aepoch-tests/module-test-reel/renders/stills/05-human-network.png`
- Known visual differences: native human nodes use the canonical silhouette and explicit presence rings; the network is deliberately less dense and has no glow bloom
- Remaining corrections: none for the static Tier 1 baseline
- Status: **PASS**

## 6. System Comparison

- Composition ID: `AepochTier1SystemComparison`
- Input data: headline `Different systems produce different realities.`; current-system items `Measures output`, `Rewards accumulation`, `Extracts attention`, `Centralizes power`; ÆPOCH items `Verifies presence`, `Rewards circulation`, `Recognizes contribution`, `Distributes power`; seed `1201`
- Render command: `cd remotion-composer && npx remotion still src/index.tsx AepochTier1SystemComparison ../projects/aepoch-tests/module-test-reel/renders/stills/06-system-comparison.png --frame=0`
- Reference image: `brands/aepoch/reference-frames/tier-1/06-system-comparison.png`
- Output still: `projects/aepoch-tests/module-test-reel/renders/stills/06-system-comparison.png`
- Known visual differences: existing-system geometry uses strictly sharp corners; ÆPOCH uses rounded geometry; native icons are simpler and flatter; the canonical Æ path replaces the generated reference mark
- Remaining corrections: none for the static Tier 1 baseline
- Status: **PASS**

## Technical review

- Six compositions discovered by the Remotion CLI at 1920×1080 and 30 fps: pass
- Six requested output files rendered successfully: pass
- Repeated render SHA-256 equality for all six outputs: pass
- Live React typography and native SVG/CSS composition: pass
- Canonical Æ SVG paths: pass
- No `Math.random()` in ÆPOCH render paths: pass
- Runtime validation for invalid frame durations, caption reserve, collection limits, missing network nodes, and missing asset references: pass
- Reduced-motion support in the common contract and every preview: pass
- Moss restricted to the `verified` human state: pass
- Signal unused in the Tier 1 reference previews: pass
- External rendering API calls and paid generated-video dependencies: none
- Full animation, 42-second reel, and episode work: not started, as required
