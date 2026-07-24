# ÆPOCH Brand System v8.2

> **Canonical reference for all ÆPOCH design decisions.**  
> Upload this file as project knowledge. It supersedes all earlier versions.
> The TSX files (Part A and Part B) are the interactive rendered version of the same spec — open them to see the brand system rendered with live previews.

| | |
|---|---|
| Version | 8.2 |
| Date | 17 May 2026 |
| Part A TSX | 260517-ÆPOCH-Brand-System-v8_2-PartA-0000.tsx |
| Part B TSX | 260517-ÆPOCH-Brand-System-v8_2-PartB-0000.tsx |

---

# Part A — Foundations

Colour · Typography · Voice · Components · Motion · Icons · Navigation · Genie Presence · Form Fields · Loading States · App Icon

## Colour Tokens

| Token | Hex |
|---|---|
| Clay | `#C4835A` |
| Ochre | `#A0673A` |
| Loam | `#7A5230` |
| Sand | `#E8C9A0` |
| Pearl | `#D6E4F0` |
| Iris | `#8BAFD4` |
| Prism | `#B8A9D9` |
| Signal | `#6B5FED` |
| Glow | `#9B8FF5` |
| Pulse | `#C4B8FF` |
| Moss | `#4CAF82` |
| Hearth | `#8B5E2F` |
| Ember | `#A03020` |
| Paper | `#FAF8F5` |
| White | `#FFFFFF` |
| Mist | `#F3F0EB` |
| Ink | `#1A1612` |
| InkMid | `#4A4440` |
| InkSoft | `#8A8480` |
| InkFaint | `#C4BEB8` |
| Border | `#E0D8D0` |
| Void | `#0C0B0A` |
| Depth | `#141210` |
| Dusk | `#1E1B18` |
| Slate | `#2E2A26` |
| SnowFull | `#F3F0EB` |
| SnowMid | `#B0A89E` |
| SnowSoft | `#6A6460` |
| DeepInk | `#2A2520` |

## Colour Poles

**Earth Pole**

| Name | Usage |
|---|---|
| Clay | Kairos ceremony, warmth, Ceremony CTA, streak pill |
| Ochre | Deep earth. Secondary warm accent |
| Loam | Dark soil. Tertiary warm accent |
| Sand | Pale highlight. Warm surface tints |

**Cosmos Pole**

| Name | Usage |
|---|---|
| Pearl | Iridescent cool. Genie ambient, form field focus. Wallet card cosmos pool (Kairos). |
| Iris | Sky-water blue. Metadata, system info. rBTC asset identity. |
| Prism | Kairos epoch identifier · Earth/Cosmos transition · Comet Arc tail · rBTC card cosmos pool |

**Vesica — Interactive**

| Name | Usage |
|---|---|
| Signal | Nav selected, active icons, in-product action links. Never CTA bg. |
| Glow | Hover states, progress, soft highlights |
| Pulse | Disabled states, background washes |

**Confirm — THREE USES ONLY**

| Name | Usage |
|---|---|
| Moss | PoL biometric success ONLY. Three permitted uses: face capture resolution tick, landmark tap resolution tick, validation arc final ring. Nowhere else. |

**Error / Warning**

| Name | Usage |
|---|---|
| Hearth | Recoverable: name taken, wrong OTP, field errors, burn warning 4+ days, gas fee section border. WarnCTA bg. |
| Ember | Blocking/final: PoL failure all retries, irreversible states, burn warning 0–3 days, insufficient rBTC. NEVER on OTP. |

**CTA**

| Name | Usage |
|---|---|
| Deep Ink | Primary CTA. Warm near-black. Never body text. |

**Light Surfaces**

| Name | Usage |
|---|---|
| Paper | App bg |
| White | Card/surface |
| Mist | Subtle fills |
| Ink | Primary text |
| Ink Mid | Secondary text |
| Ink Soft | Tertiary/captions |
| Ink Faint | Disabled/placeholders |
| Border | Dividers, outlines |

**Dark Surfaces**

| Name | Usage |
|---|---|
| Void | App bg |
| Depth | Card/surface |
| Dusk | Subtle fills |
| Slate | Borders |


> **{children}**


> **Light mode · v9 locked**


## Loading Screen v9 — Light Mode (locked)

*Particle superposition → convergence → Comet Arc → Æ mark emergence. 16 000ms. Light mode only — dark mode pending.*


> **Approved copy**


## Animation Spec

| Property | Value |
|---|---|
| Version | v9 — locked 25 Apr 2026 |
| Total duration | 16 000ms |
| Act I — Superposition | 0–28% · 150 particles drift in probabilistic orbits |
| Act II — Convergence | 28–60% · Particles slingshot inward, lock to ring. Ghost ring appears. |
| Act III — The Comet | 60–100% · Comet orbits ring. Æ mark grows from centre point. |
| Particles | N=150 · First 75 Earth palette (lower-left bias) · Last 75 Cosmos palette (upper-right bias) |
| Ring radius | 90px logical (70px in 220px brand system shell) |
| Comet tail | 130 segments · Earth warm root rgb(196,131,90) → Cosmos cool head rgb(230,220,248) · lineWidth 0.7+tp×4.0 |
| Comet head | Outer halo (white→pearl→prism) + gold warm bloom (10px) + hard white core (3.2px) + iridescent rim rgba(200,190,240,0.40) 6.5px |
| Æ mark — timing | Start 63% · End 88% |
| Æ mark — scale | 0.05→1.0 · easeOutQuint · pivot cx,cy |
| Æ mark — opacity | 0→1 · easeOutCubic |
| Æ mark — optical offset | X -6.5px · Y -2.0px (at 75px mark width) |
| Æ mark — fill | #4A4440 (Ink Mid) |
| Æ mark — rendering | SVG image drawn via drawImage — acceptable at this display size. Native canvas paths required for app icon production export. |
| Copy | Present from frame 0 · no animation · 15px/700/#1A1612 headline · 12px/400/rgba(74,68,64,0.55) subline |
| Background | #FEFCF9 + four radial pools: Earth warm (8%W,75%H) · Earth sand (18%W,92%H) · Cosmos pearl (92%W,4%H) · Cosmos prism (98%W,18%H) |
| prefers-reduced-motion | Show final state — ring + Æ mark full opacity, copy visible. Skip animation. |
| Genie | Absent. Unauthenticated surface. |
| Dark mode | Pending. Not yet implemented. |


> **360 × 768 · Tap Security or Language → sub-panel · Back chevron → main nav**


## Colour System


> **Moss #4CAF82 — Three permitted uses only**

> - 1. Face capture resolution tick (56x56px centred over circle)
> - 2. Facial landmark tap resolution tick
> - 3. Validation arc final ring (Comet Arc resolves to Moss full-circle ring)
> - Nowhere else in the product. Not on Kept screen ticks. Not on Draw screen submission. Not on progress bars.
> - Not on any ceremony icon that is not PoL biometric resolution.
> - The Clay circle tick (#C4835A) is used for all Kairos activation ceremony states.


## Typography


## Metadata Label Convention

| Property | Value |
|---|---|
| Convention | Sentence case everywhere. No textTransform: uppercase on metadata labels. |
| Correct | Serial # · Epoch # · Activated by · Origin story · Mood · Date |
| Wrong | SERIAL # · EPOCH # · ACTIVATED BY · ORIGIN STORY |
| Tracking | 0.06em on secondary labels |
| Weight | 700 on labels · 400 on values (except 700 for key data) |


## Sentence case — all UI copy (locked)


> **Screen headings, body copy, CTAs, labels, and all UI copy follow sentence case**


## Voice & Tone


> **WE ARE NOT**


## Terminology — Locked Rules


## Copy Examples


## Genie — Voice Rules

> - Always first-person. Never third-person self-reference.
> - Present tense always.
> - Contractions encouraged: 'you're', not 'you are'.
> - Never says: 'please', 'kindly', 'simply', or 'just'.
> - No hyphens in copy. Ever.
> - No negative conjunctions. Reframe as a positive statement.
> - No emojis.
> - Notices the environment or the moment. Never the member's appearance.
> - When something is permanent, says so plainly. No softening.
> - Refers to all members as humans. Never 'person', never 'user'.
> - Absent on Splash and OTP. Emerges at Screen 3a onward.


## Genie bubble — when not to use it (locked)


> **The Genie bubble must not appear on:**

> - PoL screen instructional copy
> - Draw/signature screen instructional copy
> - Any screen where the copy is factual or operational rather than conversational
> - The Sealed. screen subhead and body
> - Any system instruction copy


## Proper nouns — canonical list (locked)

| Property | Value |
|---|---|
| AEPOCH | Always fully capitalised. Always with the AE ligature. Never AEPOCH as typed differently, Aepoch, or lowercase. |
| Kairos | Always capitalised. It is the protocol core unit. A proper noun in every context. |
| Names | Always capitalised as standard. e.g. Blessing, not blessing. |
| Handles | Always lowercase. @blessing not @Blessing. The @ prefix does not change capitalisation rules. |
| Origin Story | Capitalised when used as a named feature (add an Origin Story). Lowercase when used descriptively inside a field prompt (write your origin story here). |
| Epoch | Capitalised when referring to the protocol epoch (Epoch I). Lowercase in general use (this epoch). |
| PoL | Always the abbreviation. Proof of Life in full. Never proof of life when referring to the protocol step. |
| # symbol | The ordinal member number does not use the # symbol on the ceremony screen. 369 not #369. The number stands alone. |


## Button System

| Property | Value |
|---|---|
| Primary | bg Deep Ink #2A2520 · color #FAF8F5 · radius 13px · height 52px · weight 700 14px |
| BigCTA | bg Deep Ink #2A2520 · height 52px · weight 800 15px · tracking -0.01em · Used for single primary action on Confirm screens (e.g. Send) |
| Secondary | Text only. No border. No background. color Ink Mid #4A4440 · weight 700 14px |
| Ghost | Text only. No border. No background. color Ink Soft #8A8480 · weight 700 14px |
| GhostBorder | Border 1.5px #E0D8D0 · bg rgba(255,255,255,0.35) · radius 13px · height 48px · Ink Mid label. See Part B — Wallet. |
| Ceremony | bg Clay #C4835A · color #FAF8F5 · radius 13px · height 52px · Kairos transfers, Origin Story commit, irreversible one-time actions |
| Warn / Recovery | bg Hearth #8B5E2F · color #FAF8F5 · radius 13px · height 52px · retry/recovery after failure |
| Signal — NEVER | Signal is never a CTA background colour |
| Transfer action rule | Give this Kairos / Send = CeremonyCTA. Navigation steps = PrimaryCTA. |


## Link Styles

| Property | Value |
|---|---|
| Contextual / legal | color Ink Mid #4A4440 · underline · hover Ink. Never Signal on legal copy. |
| In-product action | color Signal #6B5FED · no underline at rest · hover Glow + underline |
| Terminal screen exit | Text link at 13px/700 · Ink Soft · underline border 1px rgba(138,132,128,0.25) · Used on Sent screen as sole navigation out |
| Never | Signal on legal copy. Ink Mid underline on actions. |


## Genie Communication — C5 Dual Source

| Property | Value |
|---|---|
| Genie → Member | C5 dual-source wash. No border. No bubble. Post-login only. |
| Member → Genie | rgba(42,37,32,0.86) · radius 13px 13px 3px 13px · #FAF8F5 text · right-aligned |
| Cosmos source | radial-gradient ellipse 70% at 85% 10% · rgba(184,169,217,0.26) |
| Earth source | radial-gradient ellipse 70% at 15% 90% · rgba(232,201,160,0.20) |


## Motion — Timing Scale


## Comet Arc — Named Motion Component

| Property | Value |
|---|---|
| Name | Comet Arc |
| Initial DID binding | 5 seconds per arc · 4 separate arcs · circular path · one arc per face step (front, left, right) and one arc for the validation screen |
| New whisper (Collection) | ~5 seconds per orbit · rectangle card perimeter path |
| Head | White-hot point · radial gradient white → Pearl → Prism → transparent |
| Tail | Prism→white gradient · 18% of path length · 60 segments |
| Resolution — PoL success | Moss full-circle ring |
| prefers-reduced-motion | Freeze arc at current position. Static Prism arc segment. |


## Input Bar — All Icons


## Genie Lamp — 3 States


## Navigation Icons


## Send / Action Arrow Icon

| Property | Value |
|---|---|
| Form | Arrow up-and-right — diagonal line + L-shaped corner (northeast) · standard DeFi/crypto send affordance |
| SVG | line x1=5.5 y1=12.5 x2=12.5 y2=5.5 + polyline points='7,5.5 12.5,5.5 12.5,11' · 1.6px stroke · round caps/joins · 18×18 viewbox |
| Never | Paper plane · double circle · right-only horizontal arrow |


## Receive / Request Arrow

*Mirror of the Send icon. Southwest diagonal — down-and-left.*

| Property | Value |
|---|---|
| Form | Arrow down-and-left — diagonal line + L-shaped corner (southwest) · mirror of Send icon |
| SVG | line x1=12.5 y1=5.5 x2=5.5 y2=12.5 + polyline points='11,12.5 5.5,12.5 5.5,7' · 1.6px stroke · round caps/joins · 18×18 viewbox |
| Send vs Receive | Send = up-and-right (northeast) · Receive = down-and-left (southwest). Same geometry, mirrored. |
| Hover colour | Moss on receive — incoming value is a positive confirmation. Distinct from Send hover (Clay). |
| Never | Paper plane · double circle · downward-only arrow (ambiguous with dismiss) |


## Drawer Icons

*Used in the navigation drawer only.*

| Property | Value |
|---|---|
| Security | Shield outline + vesica piscis inset · opens Security sub-panel |
| Seed Phrase | 3×4 dot grid · irregular opacity 0.35–0.90 · Security sub-panel row |
| Account Backup | Document outline + circular restore arc with arrow · Security sub-panel row |
| Log Out | Arrow-from-box · Hearth #8B5E2F always · never Signal · never Ink |
| Language | Abbreviation pill (42×28px, 1.5px border, Mist bg) — no dedicated icon component |


## Status & Feedback Icons

*Each colour-locked to a single semantic register.*

| Property | Value |
|---|---|
| Moss circle tick | PoL biometric success ONLY · 56×56px ceremony · 24px inline · Moss #4CAF82 |
| Signal circle tick | In-product transaction confirmation · never biometric · Signal #6B5FED |
| Clay circle tick | Kairos activation · Origin Story · one-time irreversible positive actions · Clay #C4835A |
| Prism checkmark | Form field available/valid state · name validation · never biometric · Prism #B8A9D9 |
| Hearth warning panel | Recoverable: wrong OTP · name taken · field errors · burn 4–7 days · radius 9px |
| Ember warning panel | Blocking: PoL retries exhausted · irreversible · burn 0–3 days · insufficient rBTC |
| Never | Moss on OTP · Signal on biometric · Ember on recoverable errors |


## Screen State Icons — Hero Scale

*Used at the top of full error and stall screens. Never inline or at nav scale.*

| Property | Value |
|---|---|
| Container | 80px diameter · border-radius 50% · border 2px · bg tint 9% · centred above heading |
| Warn — ! | Hearth · recoverable errors: PoL signal unclear, camera issues, retry available |
| Block — × | Ember · terminal: PoL liveness fail all retries, session terminated and recorded |
| Hourglass | Hearth · stall: session timeout, waiting too long, retry tomorrow |
| Info circle | Ink Soft · neutral decline: not eligible, feature unavailable |
| Icon inside | ~50% of container diameter · 1.6px stroke · round caps/joins · same colour as border |
| Never | At nav scale (22px) · on success states |


## No Connection — Hero Icon

*Used at 80px on the No connection screen. Hearth register — recoverable, blameless.*

| Property | Value |
|---|---|
| Viewbox | 0 0 40 40 — wider than the standard 24×24 to accommodate the arc geometry |
| Arc 1 — wide | d='M6 13 Q20 3 34 13' · opacity 0.28 · far field signal |
| Arc 2 — mid | d='M10 19 Q20 11 30 19' · opacity 0.55 · mid field signal |
| Arc 3 — close | d='M15 25 Q20 19 25 25' · opacity 0.82 · near field signal |
| Dot | cx=20 cy=30 r=2 · filled · device pivot point |
| Slash | line x1=7 y1=7 x2=33 y2=33 · strokeWidth 2 · cuts through all arcs |
| Stroke | 1.8px arcs · 2px slash · round caps and joins |
| Colour | Hearth #8B5E2F · never Ember — member has done nothing wrong |
| Container | 80px · border-radius 50% · bg rgba(139,94,47,0.09) · border 2px rgba(139,94,47,0.40) |
| Screen spec | Single screen, all causes. Back chevron + 'Try again' CTA. No Genie. No cause variants. |


## Stat Row Icons — Home Screen (locked)

*Used in the stat card on the Home Screen. Colour per row is semantically fixed — never swap.*

| Property | Value |
|---|---|
| Days activated | Tally spine · Signal #6B5FED · bg rgba(107,95,237,0.08) · Permanent protocol record. Signal because every activation is an immutable on-chain event. |
| Days activated — SVG | Vertical spine x1=12 y1=3 x2=12 y2=21 + 4 tick marks alternating left/right at y=6,10,14,18 · strokeWidth 1.6 · round caps · 24×24 viewbox |
| Current streak | Flame fill · Ochre #A0673A · opacity 0.85 · bg rgba(196,131,90,0.12) · Human achievement, Earth palette. Never Signal. |
| Current streak — SVG | path d='M12 3C10 6 7 8.5 7 13a5 5 0 0010 0c0-2.5-1.2-4.5-2.5-5.5C14 9.5 13.2 11 12 11.5 12 10 11.5 7 12 3z' · fill Ochre · opacity 0.85 |
| Your flow | Bidirectional swap arrows · Iris #8BAFD4 · bg rgba(139,175,212,0.12) · Transfer/circulation. Two horizontal arrows pointing opposite directions. |
| Your flow — SVG | Two arrow lines: top right (M17 3l4 4-4 4 + line 3,7→21,7) · bottom left (M7 21l-4-4 4-4 + line 21,17→3,17) · strokeWidth 1.6 · 24×24 viewbox |
| In circulation | Globe · Prism #B8A9D9 · bg rgba(184,169,217,0.12) · Economy-wide protocol data. Globe = world scale. |
| In circulation — SVG | circle r=9 + ellipse rx=4 ry=9 (vertical latitude) + horizontal equator line · strokeWidth 1.6/1.3 · 24×24 viewbox |


## Stat Row Icons — Profile Screen (locked)

*Profile screen stat card. Three rows, three distinct colour poles.*

| Property | Value |
|---|---|
| Days activated | Tally spine · Signal #6B5FED · bg rgba(107,95,237,0.07) · Identical to home screen. Permanent protocol record. |
| Total burned | Circle + diagonal slash · Ember #A03020 · bg rgba(160,48,32,0.07) · border rgba(160,48,32,0.18) · Terminal/expired state. Value receded: number rendered in Ink Soft, not Ink. |
| Total burned — SVG | circle cx=12 cy=12 r=9 + line x1=18.36 y1=5.64 x2=5.64 y2=18.36 · strokeWidth 1.8 · round caps · 24×24 viewbox. Diagonal runs top-right to bottom-left. |
| Total burned — rationale | Circle-slash is universally understood as 'unavailable / no longer exists.' Ember register is correct — burned Kairos is a terminal state. Never Hearth (recoverable). Never InkSoft alone (too ambiguous). |
| Added to circulation | Plus sign · Clay #C4835A · bg rgba(196,131,90,0.08) · border rgba(196,131,90,0.18) · Human act of giving. Earth palette, same register as streak — Clay because it is a member's personal action, not a protocol measurement. |
| Added to circulation — SVG | Two perpendicular lines: vertical x1=12 y1=4 x2=12 y2=20 + horizontal x1=4 y1=12 x2=20 y2=12 · strokeWidth 2.2 · round caps · 24×24 viewbox. Slightly heavier stroke than 1.6px baseline to give the plus visual weight. |
| Added to circulation — rationale | Signal was rejected here. Signal is for permanent protocol records. Clay is for human achievements and actions (same as streak). Giving Kairos to the economy is a human act, not a protocol measurement. |
| Colour logic — three poles | Days activated = Signal (Vesica/protocol pole) · Total burned = Ember (error/terminal) · Added to circulation = Clay (Earth/human pole). Three distinct registers, no colour repeated across the card. |


## Copy Icon — System Standard (locked)

*Used everywhere a text value is copied to clipboard: wallet addresses, serial numbers, any raw string.*

| Property | Value |
|---|---|
| Form | Two overlapping rounded rectangles. Back rect: Signal fill at 18% opacity + Signal stroke. Front rect: Paper #FAF8F5 fill + Signal stroke. Front is offset top-right of back. |
| SVG | rect x=4 y=7 w=12 h=14 rx=2.5 (back, Signal fill 0.18 + stroke) · rect x=8 y=3 w=12 h=14 rx=2.5 (front, Paper fill + Signal stroke) · strokeWidth 1.5 · 24×24 viewbox |
| Success state | Moss tick replaces the icon for 2.2 seconds · polyline 2.5,7 5.5,10 11.5,4 · strokeWidth 1.6 · Moss #4CAF82 |
| Feedback copy | 'Copied. Keep this safe.' · 11px/600 · Moss · appears below the row for 2.2s then fades |
| Button container | 36×36px · border-radius 9px · rest: Border bg rgba(255,255,255,0.70) · success: rgba(76,175,130,0.08) bg + rgba(76,175,130,0.45) border |
| Never | Use the link-chain icon for copying URLs. Use this two-rect icon for raw values (addresses, codes, serial numbers) only. |
| Source | Matches iOS/macOS system copy affordance. Confirmed against uploaded system reference 21 Apr 2026. |


## Utility Icons — Profile Screen (locked)

| Property | Value |
|---|---|
| Public URL icon | Link chain · Prism #B8A9D9 · container bg rgba(184,169,217,0.10) · border rgba(184,169,217,0.22) |
| Public URL icon — SVG | Standard link-chain path (two interlocked rounded rectangles) · Prism stroke · strokeWidth 1.6 · round caps/joins · 24×24 viewbox |
| Public URL icon — rationale | Prism distinguishes the URL card from the Signal-heavy stat and wallet sections below. Prism register is appropriate for identity-layer data (the public profile URL is the member's identity on the open web). |
| Public URL copy button | Uses the standard two-rect copy icon (Signal), not the link-chain. The link-chain is the section icon only. Same copy button as wallet addresses. |
| Never | Globe on the public URL card — globe is reserved for 'In circulation' on the home screen stat card. Using it twice on the same app creates semantic collision. |


## Proof of Life Activity Log — Biometric Pill (locked)

| Property | Value |
|---|---|
| Section label | 'Your Proof of Life activity' — Proof of Life always capitalised |
| Pill — full check | 'Full biometric check' · Moss register · bg rgba(76,175,130,0.12) · border rgba(76,175,130,0.30) · text color #2E7D52 · 10px/700 |
| Pill — liveness only | 'Liveness check' · same Moss styling · used when the via source is a third-party API that does not perform the full ÆPOCH biometric validation (e.g. API for Facebook) |
| Pill — dot | 5×5px Moss circle · flexShrink 0 · left of label text |
| Log entry structure | Row 1: date (12px/700/Ink) + time (11px/Ink Soft, right-aligned) · Row 2: biometric pill · Row 3: device name (11px/Ink Soft) + via source (10px/Ink Faint, right-aligned) |
| Via sources (examples) | ÆPOCH App · API for Facebook · API for Coinbase · API for [partner name] |
| Devices (examples) | iPhone 15 Pro · Samsung Galaxy A17 · any real device identifier from the session |
| Rationale | The distinction between 'Full biometric check' and 'Liveness check' is a security-relevant fact members deserve to see. Third-party API integrations may only prove liveness, not perform ÆPOCH's full biometric validation. The log is a member's right to audit their own account access. |


## Canvas Control Icons — Undo Stroke (locked)

*Removes the last drawn stroke from a canvas. Tap repeatedly to undo multiple strokes. Appears left of the Done button in the canvas controls bar.*

| Property | Value |
|---|---|
| Name | Undo Stroke |
| Purpose | Removes the last drawn stroke from the canvas. Tap repeatedly to undo multiple strokes. |
| Viewbox | 0 0 20 20 |
| Rendered size | 20×20px |
| Touch target | 44×44px via padding: 12px all sides |
| Stroke weight | 1.6px |
| Stroke cap | round |
| Stroke join | round |
| SVG path 1 | M4 8H12.5C14.985 8 17 10.015 17 12.5C17 14.985 14.985 17 12.5 17H8 |
| SVG path 2 | M7 5L4 8L7 11 |
| Colour — default | Ink Soft #8A8480 · when canvas is empty or no strokes present |
| Colour — active | Signal #6B5FED · when one or more strokes are present on canvas |
| Disabled state | Ink Soft · opacity 0.3 · when canvas is empty and undo is not available |
| Position | Left of the Done button in the canvas controls bar |
| accessibilityLabel | 'Undo last stroke' |
| accessibilityRole | 'button' |
| Surfaces | Signature canvas (PoL Binding flow) · any future freehand canvas interaction |
| Never | Use Signal as the default/rest state. Signal only activates when strokes exist to undo. |


## Screen Icons — Waitlist Confirmation (Screen 1.6b)

*Hero icon for the waitlist confirmation screen. Not a nav icon. Not reused elsewhere.*

| Property | Value |
|---|---|
| Container | 72×72px · border-radius 22px · background rgba(184,169,217,0.12) · border 1px rgba(184,169,217,0.28) |
| Icon rendered size | 34×34px inside container |
| SVG | rect x=2 y=4 w=20 h=16 rx=2.5 (envelope body) + path d='M2 8l10 6 10-6' (flap V) · Prism stroke · strokeWidth 1.6 · round caps/joins · 24×24 viewbox |
| Colour | Prism #B8A9D9 |
| Colour rationale | Prism register is correct for an informational/identity-adjacent moment on an unauthenticated surface. Not Signal (no interaction confirmed). Not Moss (no biometric success). Not Clay (no ceremony). Prism is the identity-layer colour. |
| Genie | Absent. Screen 1.6b is a pre-login unauthenticated surface. Genie does not appear. |
| Screen | Screen 1.6b — Waitlist confirmation only. Not reused on any other screen. |


## Pulse Screen Icons — Statistics Screen (locked v8.0)

*New icons for the "What we are building together" screen. All render at 18×18px inside 34×34px stat row containers or 38×38px hero card containers.*

| Property | Value |
|---|---|
| Calendar — used for | Days running (Rhythm screen · This epoch section) |
| Calendar — colour | Signal #6B5FED · bg rgba(107,95,237,.08) · Permanent protocol record — epoch time elapsed is as fundamental as activation count. |
| Calendar — SVG | rect x=3 y=4 w=18 h=17 rx=3 + line y=9 (header rule) + lines at x=8 and x=16 y=2→6 (hanger marks) · strokeWidth 1.6 · 24×24 viewbox |
| People — used for | Total members (This epoch) · Members who showed up today (Today) · hero card |
| People — colour | Moss #4CAF82 · bg rgba(76,175,130,.12) · Membership is living presence — same register as biological life and growth. |
| People — SVG | circle cx=9 cy=7 r=3.5 (primary) + circle cx=16.5 cy=8 r=2.5 opacity .6 (secondary) + path d='M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6' (primary shadow) + path secondary shadow opacity .6 · 24×24 viewbox |
| Epoch Remaining — used for | Kairos remaining row (This epoch section) |
| Epoch Remaining — colour | Clay #C4835A · bg rgba(196,131,90,.10) · The sun as constant energy source; the arc as depleting epoch charge. |
| Epoch Remaining — viewBox | 0 0 44 44 — wider viewBox to accommodate arc geometry |
| Epoch Remaining — arc behaviour | Track: full circle at opacity .22. Charge arc: dasharray changes with % remaining. At 100%: ~85% coverage. At 65%: dasharray 67.9 39.0. At 50%: 53.4 53.4. At 20%: 21.4 85.4. Core opacity reduces to ~50% when <=10%. |
| Epoch Remaining — never | Animate in loops — this is a supply gauge, not a spinner. |
| Rhythm nav icon — used for | Bottom navigation · Connections group · fifth primary nav item |
| Rhythm nav icon — ECG variant | J — pure waveform, no baseline. Polyline points: 5,28 12,28 15,27 19,10 22,34 25,22 28,28 39,28 |


## Icon Rules

| Property | Value |
|---|---|
| Style | Outline · 1.6px stroke · round caps and joins · 24×24 viewbox |
| Active state | Signal colour + animation = alive. Ink Soft + static = off/unavailable. |
| Input bar order | Speaker · Mic (56px centre) · Keyboard · [divider] · Genie lamp (40px) |
| Mic | 5-bar animated waveform canvas. Auric gradient per bar. Locked. |
| Touch targets | Minimum 44×44px for all interactive elements. Mic 56×56px. |
| Four-pointed stars  | Banned. Overused in AI/tech as of 2025–26. |


## Drawer — Live Demo

*360×768. Tap Security or Language to slide in a sub-panel. Back chevron returns to main nav.*


## Drawer — Group Structure

| Property | Value |
|---|---|
| Group 1 — Primary nav | Home · Collection · Wallet · Connections · Rhythm |
| Group 2 — Secondary nav | Support · Find Members |
| Group 3 — Account | Security · Language |
| Group 4 — Identity + Exit | Profile footer · Log out button |
| Dividers | 3 total. Between groups 1/2, 2/3, 3/4. |
| Chevrons | Only on Security and Language — they open sub-panels. |


## Rhythm — Navigation Tab (locked v8.0)

| Property | Value |
|---|---|
| Nav label | Rhythm — locked. Never 'Statistics'. Never 'Together'. |
| Screen title | What we are building together. — sentence case, full stop is part of the title |
| Position in nav | After Connections — fifth item in Group 1 |
| Icon — active | ECG heartbeat waveform · variant J · Signal #6B5FED · strokeWidth 2.2 · round caps/joins |
| Icon — inactive | Same paths · InkFaint #C4BEB8 |
| Icon viewBox | 0 0 44 44 · rendered at 22×22px inside 44×44px touch target |
| SVG paths | polyline points='5,28 12,28 15,27 19,10 22,34 25,22 28,28 39,28' |
| Design rationale | ECG variant J — pure waveform, no baseline, no decoration. The spike at x=19,y=10 is collective activation; the valley at x=22,y=34 is the echo. Reads instantly as life, not data. Chosen over convergence arcs and charged arc variants for legibility at 22px. |


## Statistics Screen Icon Sizes — Note

| Property | Value |
|---|---|
| Stat row icons | 18×18px rendered inside 34×34px containers — up from standard 15×15px |
| Hero Today card icons | 18×18px rendered inside 38×38px containers |
| Rationale | Larger rendered size improves legibility in scrollable context where icons compete with 56px headline numbers. viewBox and path data unchanged — only width/height attributes on the svg element change. |


## Drawer — Spec

| Property | Value |
|---|---|
| Pattern | Left-side slide-in drawer. No persistent bottom tab bar. |
| Trigger | Frosted pill · fixed bottom-right · 44×44px · background rgba(254,252,249,0.82) · border 1px rgba(224,216,208,0.70) · border-radius 14px · backdrop-filter blur(8px) · three lines 18×1.8px Ink Mid · gap 5px |
| Surface | #FEFCF9 · canvas grain overlay opacity:0.35 · mix-blend-mode:overlay |
| Scrim | rgba(26,22,18,0.36) — warm Ink-family dark. |
| Transition | 0.30s cubic-bezier(0.4,0,0.2,1) |
| Selected state | 44×44px circle · rgba(107,95,237,0.10) · border-radius 50% · Signal on icon + label · weight 700 |
| Activate Kairos | Primary CTA. Collapses to absence once activated. No disabled state. |
| Profile entry | Member avatar in drawer footer only. Never a primary nav item. |


## Security Sub-Panel

| Property | Value |
|---|---|
| Pattern | Slides in over main panel from right. |
| Items | Seed phrase · Account backup — both are direct destinations. |
| Item containers | 44×44px · border-radius 12px |
| Seed phrase icon | 12 dots in 3×4 grid · irregular opacity 0.35–0.90 |
| Backup icon | Document outline + circular restore arc + arrow |


## Language Sub-Panel

| Property | Value |
|---|---|
| Pattern | Slides in over main panel from right. Search auto-focuses after 350ms. |
| Search | Filters by label, sublabel, and abbreviation. Live. |
| Language row | Abbr pill (42×28px) · label · sublabel · Moss checkmark on selected |
| On select | Language updates immediately. Panel slides back to main. |


## Log Out

| Property | Value |
|---|---|
| Form | Hearth border button · full width · 44px · border-radius 12px |
| Rationale | Hearth register: consequential but reversible. Not Ember. Not ghost text. |


## Language Entry — Single-Line Demo


## Back Navigation — Locked Rule

| Property | Value |
|---|---|
| Form | Chevron icon only. Never icon + label. Never label only. |
| Touch target | 44×44px minimum — WCAG AA. Visible icon is 20px. Pad to 44px via padding or transparent hit area. |
| Never | The word 'Back'. A screen name. A native OS chevron. Any per-screen variation. |
| Suppression rule | Suppressed on terminal screens (Sent state). 'Back to Wallet' text link only. |
| Security screens | No back arrow on Seed Phrase or Account Backup. Drawer sub-panel back chevron handles return. |
| Coming soon screens | Back arrow present and sufficient. No secondary text link. |
| Rationale | 'Back' is a browser convention. Every well-crafted mobile product — iOS, Linear, Phantom, Superhuman — uses icon only. |


## Back Navigation — Icon Spec

| Property | Value |
|---|---|
| Shape | Left-pointing chevron — two strokes meeting at a point on the left |
| SVG path | d='M12 5L7 10l5 5' |
| Stroke weight | 1.6px |
| Stroke cap | round |
| Stroke join | round |
| Viewbox | 0 0 20 20 |
| Rendered size | 20×20px |
| Colour — light mode | Ink Soft #8A8480 |
| Colour — dark mode | rgba(250,248,245,0.55) |
| Colour implementation | Set via CSS currentColor — do not hardcode hex in the SVG. |


## Back Navigation — Position

| Property | Value |
|---|---|
| Position | Top-left of the screen content area — below the status bar, above the page title |
| Top offset | 20px from the top of the content area |
| Left offset | 24px from the left edge |
| Sticky | Fixed to top of viewport. Never scrolls away. |
| Z-index | Above page content. Never obscured by scroll. |


## Back Navigation — Component Spec

*Build once. Import everywhere. Never inline per-screen.*

| Property | Value |
|---|---|
| Component name | BackButton — consistent across all codebases |
| accessibilityLabel | 'Go back' — required for screen readers. Never omit. |
| accessibilityRole | 'button' |
| hitSlop | { top: 12, bottom: 12, left: 12, right: 12 } |
| Dark mode | Pass color='rgba(250,248,245,0.55)' as prop on dark surfaces |
| Custom behaviour | Pass onPress prop to override default navigation.goBack() |

| Property | Value |
|---|---|
| Implementation note | Full component code is in the Session 16 handoff doc. Reference that file when building BackButton in the mobile codebase. |
| Wrapper | TouchableOpacity · padding 12 · marginLeft 12 · marginTop 8 |
| Navigation | navigation.goBack() as default onPress — override via prop |
| SVG library | Use the SVG library from your mobile stack · d='M12 5L7 10l5 5' · strokeWidth 1.6 · round caps/joins |
| Stroke token | Ink Soft #8A8480 (light) · rgba(250,248,245,0.55) (dark) — pass as color prop |


## Camera Active Pill

| Property | Value |
|---|---|
| Component | Dark pill · rgba(26,22,18,0.62) bg · Moss live dot (6px) · uppercase label |
| Text | CAMERA ACTIVE — ON DEVICE ONLY · 10px/700 · rgba(250,248,245,0.92) |
| Placement | Always immediately below the camera canvas. Centre-justified. Never above. |


## Genie Presence — C5 Dual Source

| Property | Value |
|---|---|
| Rule | Absent on Splash and OTP. Emerges at Screen 3a. Present on all post-login screens. |
| Screen 1.6a (Waitlist sign-up) | Absent. Pre-login unauthenticated surface. |
| Screen 1.6b (Waitlist confirmation) | Absent. Pre-login unauthenticated surface. Confirmed 22 Apr 2026. |
| Never | On any unauthenticated surface. |
| Cosmos source | radial-gradient ellipse 70% 70% at 85% 10% · rgba(184,169,217,0.26) → transparent 65% |
| Earth source | radial-gradient ellipse 70% 70% at 15% 90% · rgba(232,201,160,0.20) → transparent 65% |
| Genie copy placement | Always above visual content. Voice leads, visual follows. |


## Form Field States

| Property | Value |
|---|---|
| Rest | border 1.5px #E0D8D0 · bg rgba(255,255,255,0.40) · radius 13px |
| Focus | border 1.5px rgba(214,228,240,0.90) · bg rgba(214,228,240,0.12) · ring 0 0 0 3px rgba(184,169,217,0.14) |
| Filled | border 1.5px #E0D8D0 · bg rgba(255,255,255,0.70) |
| Disabled | border 1.5px #E0D8D0 · bg rgba(196,190,184,0.12) · color Ink Soft · cursor not-allowed |
| Hearth | border 1.5px #8B5E2F · ring rgba(139,94,47,0.08) · 5.8:1 AA v |
| Ember | border 1.5px #A03020 · ring rgba(160,48,32,0.08) · 6.2:1 AA v |
| Cursor | rgba(184,169,217,0.85) — Prism-toned. Never Signal. |
| Moss — never here | Moss is PoL biometric success ONLY. Never on input validation. |


## OTP Error States — Locked Rule

> - Hearth on wrong OTP code. Always. This is a recoverable state.
> - Ember is NEVER used on OTP. A wrong code is not destructive or final.
> - Ember is reserved for: all PoL retries exhausted, irreversible actions, burn urgency 0–3 days, insufficient rBTC (blocking).


## App Icon — Concept

*Direction: Celestial. A blazing white star core radiates from the centre. Sky blue top-left. Signal violet bottom-right. Gold lens at optical centre of the Æ mark. Earth warm bottom-left. The Æ brandmark at centre in deep Ink. Communicates: something luminous, something becoming real.*

| Property | Value |
|---|---|
| Direction | Celestial — locked 24 Apr 2026 |
| Background base | #F5F7FF — near-white with a breath of blue |
| Corner radius | Applied by OS (iOS superellipse ~22%, Android varies). Never bake corner radius into the PNG. |
| Grain | Applied at rendered sizes 60px and above only. Below 60px adds noise without texture. |
| Transparency | None — iOS App Store requirement. Solid background always. |
| Mark size | 58% of icon width |
| Mark optical offset | X: -6.5px · Y: -2.0px (at 75px mark width, scaled proportionally). Compensates visual weight of diagonal stroke. |
| Mark fill — 180–120px | #1E1A16 |
| Mark fill — 80–60px | #1A1612 |
| Mark fill — 40–29px | #0E0B08 — contrast increases at small sizes |
| Mark rendering | Native canvas paths only. Never SVG drawImage. SVG scaling introduces bilinear blur at small sizes (noticeably soft at 60–80px). |


## Gradient Field Spec

*All gradient strengths scale on t = clamp((S - 29) / (180 - 29), 0, 1) where S is icon size in px.*

| Property | Value |
|---|---|
| Sky blue — position | Top-left radial · radius S×1.22 |
| Sky blue — colours | rgba(92,158,216, strength) → rgba(108,170,220, strength×0.67) → rgba(146,196,230, strength×0.27) → 0 |
| Sky blue — strength | 0.72 + (1-t)×0.14 |
| Signal violet — position | Bottom-right radial · radius S×1.08 |
| Signal violet — colours | rgba(107,95,237, strength) → rgba(107,95,237, strength×0.62) → rgba(155,143,245, strength×0.24) → 0 |
| Signal violet — strength | 0.65 + (1-t)×0.12 |
| Earth warm — position | Bottom-left radial · radius S×0.58 |
| Earth warm — colours | rgba(196,131,90, 0.32) → rgba(196,131,90, 0.09) → 0 |
| White star — position | Centred radial · radius S×(0.28 + t×0.30) |
| White star — colours | white peak → white peak×0.90 → rgba(250,252,255, 0.42+t×0.46) → rgba(242,246,255, …×0.32) → 0 |
| White star — peak | 0.78 + t×0.22 |
| Gold lens — position | Centred at 0.45×S, 0.47×S · radius S×(0.18 + t×0.10) |
| Gold lens — colours | rgba(255,218,130, strength) → rgba(252,210,120, strength×0.42) → 0 |
| Gold lens — strength | 0.38 + t×0.14 |


## Æ Mark Path Data

*Both vectors rendered as native canvas paths. ViewBox 0 0 869 652.*

| Property | Value |
|---|---|
| Vector 1 — Æ body | M465.471 0.5L0.971436 651H92.4714C326.637 391.308 548.454 298.787 775.971 361L787.471 306C582.4 251.465 413.28 307.534 212.471 452.5L471.971 90V287L545.971 270.5V67H867.971V0.5H465.471Z |
| Vector 2 — E lower bar | translate(472,370) scale(0.993,1.0) then: M75.501 0.660423L1.00098 21.6604L0.500977 278.66H399.501V215.66H75.501V0.660423Z |
| Scale formula | markW = S × 0.58 · scale = markW / 867.73 |
| Translate formula | tx = S/2 - (0.97 + 867.73/2) × scale + optX · ty = S/2 - (0.5 + 650.5/2) × scale + optY |
| Optical offset | optX = (-6.5 / 75) × markW · optY = (-2.0 / 75) × markW |


## Required Sizes — iOS

| Property | Value |
|---|---|
| Icon-20.png | 20px · Notification @1x |
| Icon-20@2x.png | 40px · Notification @2x |
| Icon-20@3x.png | 60px · Notification @3x |
| Icon-29.png | 29px · Settings @1x |
| Icon-29@2x.png | 58px · Settings @2x |
| Icon-29@3x.png | 87px · Settings @3x |
| Icon-40.png | 40px · Spotlight @1x |
| Icon-40@2x.png | 80px · Spotlight @2x |
| Icon-40@3x.png | 120px · Spotlight @3x |
| Icon-60@2x.png | 120px · Home @2x |
| Icon-60@3x.png | 180px · Home @3x |
| Icon-76.png | 76px · iPad @1x |
| Icon-76@2x.png | 152px · iPad @2x |
| Icon-83.5@2x.png | 167px · iPad Pro @2x |
| Icon-1024.png | 1024px · App Store Connect |


## Required Sizes — Android

| Property | Value |
|---|---|
| mipmap-mdpi | ic_launcher.png + ic_launcher_round.png · 48px |
| mipmap-hdpi | ic_launcher.png + ic_launcher_round.png · 72px |
| mipmap-xhdpi | ic_launcher.png + ic_launcher_round.png · 96px |
| mipmap-xxhdpi | ic_launcher.png + ic_launcher_round.png · 144px |
| mipmap-xxxhdpi | ic_launcher.png + ic_launcher_round.png · 192px |
| playstore | playstore-512.png · 512px |


## Rhythm — Screen Identity

*The collective heartbeat of ÆPOCH. Shows what all members are building together. Not a personal dashboard — a shared mirror. Full spec in Part B → Rhythm tab.*

| Property | Value |
|---|---|
| Screen name | What we are building together. |
| Nav label | Rhythm — locked. Never 'Statistics'. Never 'Together'. |
| Purpose | Shows collective epoch statistics. Creates group dopamine — the feeling of building something together. |
| File | AEPOCH_StatisticsScreen_v1-3.tsx |
| Section labels | 10px / 700 / letterSpacing .09em / Signal #6B5FED · Sentence case · No text-transform: uppercase |
| Page title style | 22px · weight 800 · Ink #1A1612 · letterSpacing -0.025em · lineHeight 1.15 |
| Epoch stamp | Top-right corner · 'Epoch' label 9px/700/InkFaint/letterSpacing .11em/uppercase · numeral 32px/800/Signal · plain roman numeral character only, no decoration |
| Icon sizes | 18×18px rendered inside 34×34px containers (stat rows) · 18×18px inside 38×38px (hero Today cards) |
| Background | Earth Rise + Grain — standard authenticated screen treatment |
| Full spec | See Part B → Rhythm tab for all section, card, and row specs |


---

# Part B — Product Screens & Decisions

Home Screen · Ceremonial · PoL Binding · Wallet · Collection · Loading States · Onboarding · Decisions Log


> **{children}**


## Activate Card — Copy

| Property | Value |
|---|---|
| Headline | Create today's Kairos. |
| Subline | Add your pulse to a new economy. |
| Button label | Activate |
| Button style | Deep Ink #2A2520 · #FAF8F5 text · height 42px · radius 12px · weight 700 13px |
| Card height | 108px |
| Card border-radius | 14px |
| Background | Canvas animated plasma field · seven blobs · light base rgba(252,250,246,0.90) |
| Border | 1px solid rgba(255,255,255,0.88) |
| Shadow | 0 8px 36px rgba(107,95,237,0.18) · 0 3px 14px rgba(184,169,217,0.22) |
| Activation behaviour | CTA collapses to absence once activated. No disabled state. Absence IS the feedback. |


## Stat Card — Four Rows (locked)

| Property | Value |
|---|---|
| Row 1 — label | Days activated |
| Row 1 — sub-copy | Every Kairos you've ever created |
| Row 1 — icon | Kairos branch mark · Signal #6B5FED · bg rgba(107,95,237,0.08) |
| Row 2 — label | Current streak |
| Row 2 — sub-copy | Showing up — days activating in a row |
| Row 2 — icon | Flame SVG · Ochre #A0673A opacity 0.85 · bg rgba(196,131,90,0.12) |
| Row 2 — progress bar | Clay → Sand gradient: rgba(160,103,58,0.75) → rgba(232,201,160,0.90). Never Signal/Prism. |
| Row 3 — label | Your flow |
| Row 3 — sub-copy | Kairos you've activated and sent |
| Row 3 — icon | Swap/transfer arrows · Iris #8BAFD4 · bg rgba(139,175,212,0.12) |
| Row 4 — label | In circulation |
| Row 4 — sub-copy | Total Kairos circulating in the economy |
| Row 4 — icon | Globe (circle + latitude ellipse + equator line) · Prism #B8A9D9 · bg rgba(184,169,217,0.12) |
| Label case | All row labels sentence case. Never title case. Never uppercase. 'Your flow' — lowercase f always. |
| Stat number — rows 1–3 | 20px · weight 800 · tabular-nums |
| Stat number — row 4 | 16px · weight 800 · tabular-nums (larger number, needs room) |
| Icon containers | 34×34px · border-radius 10px |
| Card container | border-radius 14px · background rgba(255,255,255,0.50) · border 1px #E0D8D0 |
| Icon colour rationale | Days activated = Signal: permanent protocol record. Current streak = Ochre/Clay: human achievement, Earth palette, never Signal. Your flow = Iris: transfer/circulation. In circulation = Prism: economy-wide protocol data. |


## Burn Strip — Visibility Rules (locked)

| Property | Value |
|---|---|
| Default state | Strip is NOT a permanent fixture. It is a conditional alert. |
| No Use or Lose Kairos held | Never shown |
| 15+ days remaining | Not shown. |
| 8–14 days remaining | Not shown. Member has ample time. |
| 4–7 days remaining | Shown. Hearth register. Gentle prompt. |
| 0–3 days remaining | Shown. Ember register. Urgent. |
| Multiple Use or Lose Kairos | Show strip based on the soonest-expiring Kairos only. |
| Already activated today | Strip may still show if other Use or Lose Kairos are within the threshold. |
| Threshold summary | Silent at 8+ days. Hearth at 4–7. Ember at 0–3. |


## Burn Strip — Copy and Colour by Urgency


## Burn Strip — Copy Rules

| Property | Value |
|---|---|
| Day abbreviation | Never 'd'. Always full word 'days'. |
| Multiple burning | Show most urgent one only. Copy stays singular: '1 Kairos burns…'. |
| Strip — Ember styling | border-radius 9px · padding 9px 12px · bg rgba(160,48,32,0.09) · border 1px rgba(160,48,32,0.26) |
| Strip — Hearth styling | border-radius 9px · padding 9px 12px · bg rgba(139,94,47,0.08) · border 1px rgba(139,94,47,0.26) |


## Home Screen — Top Bar

| Property | Value |
|---|---|
| Contents | Status bar only: time (left) · system icons (right) |
| Logo | Absent. The vesica logo does not appear on the home screen top bar. |
| Hamburger | Absent from top bar. See Part A — Navigation tab. |
| Previous spec | Earlier versions had logo top-left and hamburger top-right. Both are removed. |


## Home Screen — Label Case

| Property | Value |
|---|---|
| 'Recent activity' | Sentence case. Never 'RECENT ACTIVITY'. Remove text-transform: uppercase. letter-spacing: 0.07em retained. |
| All stat row labels | Sentence case. See Stat Card section above. |


## KairosStrip — Locked Component

*Tap origin story chevron to expand.*

| Property | Value |
|---|---|
| Primary field | Serial # — always. Never the date. |
| Serial format | Æ01-12236199 · epoch Prism #B8A9D9 · separator Ink Faint · digits Ink #1A1612 · monospace 18px/700 |
| Secondary row | by @{handle} · date · mood text only · 11–12px Ink Soft |
| Date format | Standard locale-appropriate format (e.g. '14 Mar 2026'). Roman numerals: NFT obverse/reverse and KairosStrip PoC Bound screen only. |
| Mood in strip | Text only. No colour pill. No colour dot. |
| Origin story | Collapsed accordion by default. Plain weight 13px/400 Ink Mid when open. |
| Background | rgba(255,255,255,0.55) · border 1px #E0D8D0 · radius 14px |
| Mood accent bar | 3px full-width top · linear-gradient mood colour 80% → 12% |


## Serial Number Format — System-Wide

| Property | Value |
|---|---|
| Format | Æ[EE]-SSSSSSSSSSS |
| Epoch | Zero-padded 2 digits. Epoch 1 = 01. |
| Serial | Unpadded sequence number. Starts at 1. |
| First ever | Æ01-1 |
| Example | Æ01-12236199 |
| Colour split | Epoch Æ01: Prism #B8A9D9 · Separator -: Ink Faint · Digits: Ink #1A1612 |
| Applies to | KairosStrip, Minted metadata, grid tile label, list row, detail hero, confirm tables — everywhere |


## Card States — New (Unread Received)

*Tap sender to cycle.*


## Card States — New Whisper


## Card States — Fossil (Burned)

| Property | Value |
|---|---|
| Treatment | opacity: 0.55 on outer container. Nothing else. |
| Member-facing term | 'Burned' — never 'Fossil' |
| Protocol rule | A fossil never circulated. No whispers, no flow count, no recipient. |


## Security — Navigation Pattern

| Property | Value |
|---|---|
| Entry | Drawer → Security sub-panel → tap 'Seed phrase' or 'Account backup' row directly |
| Hub screen | None. The drawer sub-panel is the hub. |
| Back navigation | None on either screen. The drawer's own back chevron handles return. |
| Never | A back arrow on Seed Phrase or Account Backup. A Security landing/hub screen. |


## Seed Phrase Screen

| Property | Value |
|---|---|
| Hero icon | 56×56px · radius 18px · rgba(107,95,237,0.07) bg · Signal border at 16% · Shield + vesica icon in Signal |
| Heading | 'Your seed phrase.' · 22px/800 · Ink · full stop |
| Body copy | Genie voice. States plainly: write down, don't photograph, don't share with anyone — including me. |
| Word grid | 3×4 · 12 word tiles · number (10px/700/Ink Faint) + word (14px/700/Ink · monospace) · bg rgba(255,255,255,0.60) · radius 10px · 8px gap |
| Reveal mechanic | Words blurred (CSS blur 6px) by default. 'Hold to reveal' (Deep Ink CTA, eye icon). Hold lifts blur after 400ms. Release re-blurs. |
| Copy action | 'Copy all words' · Signal · only while revealed · Moss tick + 'Copied. Now close this screen.' · resets after 2.5s |
| Warning panel | Hearth tones · 'Anyone with these words can access your account. Keep them offline and private.' |
| No confirmation checkbox | Never. A checkbox creates false security. |
| Cryptography note | The seed phrase IS the private key — the human-readable encoding of the entropy used to derive it. It is computed on-device, in memory, when needed. |


## Account Backup Screen

| Property | Value |
|---|---|
| Hero icon | 56×56px · radius 18px · rgba(107,95,237,0.07) bg · Signal border at 16% · Document + restore arc icon in Signal |
| Heading | 'Account backup.' · 22px/800 · Ink · full stop |
| What's included | Your handle · your Kairos record · your wallet address · your cryptographic identity |
| Not included | Your seed phrase · your biometric data |
| 'Private keys' — never listed | Derived on-device from the seed phrase when needed. Not a storable object. |
| Download CTA | BigCTA (52px/800) 'Download backup' · Deep Ink |
| Success state | Moss-bordered row · Moss tick + 'Backup downloaded.' · last backup date in standard date format · never Roman numerals |
| Warning panel | Hearth tones · 'This file can identify you, but it can't control your wallet.' |


## Date Format — Scope Rule

| Property | Value |
|---|---|
| Roman numeral dates | Scoped to two surfaces only: (1) the Kairos NFT obverse and reverse, and (2) the KairosStrip PoC variant on the Bound screen. Nowhere else. |
| Kairos NFT | XIV · III · MMXXVI — ceremonial, permanent |
| KairosStrip PoC — Bound screen | Roman numerals in secondary row only. Ceremonially equivalent to the NFT obverse. |
| All other UI dates | Standard locale-appropriate date format. '30 Mar 2026' or locale equivalent. Never Roman numerals. |
| Rationale | Roman numerals on the NFT and binding-moment strip reinforce permanence. On functional UI surfaces they obscure information. |


## PoL Binding Flow — Overview

*Full account-creation flow for a new member. Distinct from the daily PoL flow. Sequence: Threshold → Face Capture (×3) → Facial Landmark Tap → Signature Canvas → Validation Arc → Bound Screen.*

| Property | Value |
|---|---|
| Purpose | Create and permanently bind a new member account. One per human. Cannot be undone. |
| Surfaces | Light mode throughout except Validation Arc screen (Void dark). |
| Genie | Present. This is a post-identity surface. |


## Threshold Screen

| Property | Value |
|---|---|
| Vesica mark | Centred · 56×38px · Prism stroke · Prism fill at 8% opacity |
| Heading | 'One living human. One account. Always.' · 26px/800/Ink |
| Genie copy | 'Before your account is created, I'll confirm you're not already in ÆPOCH. Your face, the way you move, and the mark you make will create a signature that belongs to you alone. If no account exists for you, I'll create one and bind it to you permanently.' |
| Second line | 'This takes about a minute. It can't be undone.' · Ink Mid |
| CTA | 'Begin' · PrimaryCTA (Deep Ink) |
| Footer note | 'No biometric data is stored or transmitted. Only a derived number leaves this device.' · 11px/Ink Faint |
| Never | Bullet lists. Info cards. |


## Face Capture — Three Steps

| Property | Value |
|---|---|
| Circle size | 312×312px · border-radius 50% · dark fill rgba(14,12,16,0.65) |
| Border — rest | 2px solid rgba(255,255,255,0.22) |
| Border — capture | 2px solid rgba(76,175,130,0.5) |
| Comet Arc | Orbits the circle for the duration of each step |
| Duration | 5 seconds per step (front, left, right) |
| Direction arrows | Prism chevron inside circle on turn steps. Never on front step. |
| Resolution | Moss tick (56×56px) centred over circle |
| Camera Active pill | 28px below the circle bottom edge |
| Guide — front | 'Centre your face. Hold still.' |
| Guide — left | 'Turn your head slowly to the left.' |
| Guide — right | 'Now turn slowly to the right.' |


## Facial Landmark Tap — LandmarkTap Component

| Property | Value |
|---|---|
| Purpose | Liveness check. Member taps their own face — left eye, right eye, nose, mouth — in any order. |
| No targets | Visible targets give automated systems the coordinates. Member must locate their own features without assistance. |
| Guide prompt | 'Tap both eyes, your nose, and your mouth.' — shown throughout |
| Pulse ring on tap | 450ms · scale 0.4→3.2× · opacity 0.9→0 · 24×24px · Prism border · borderRadius 50% |
| Permanent dot | 10×10px · Prism 55% opacity · remains at tap coordinate |
| Resolution | Moss tick over circle · 'Identity confirmed.' in Moss below |


## Signature Canvas

| Property | Value |
|---|---|
| Canvas size | 327×220px |
| Background | Paper #FAF8F5 |
| Border radius | 16px |
| Stroke style | Ink #1A1612 · lineWidth 2 · round caps and joins |
| Privacy line | 'Your signature does not leave this device.' · 12px/Ink Soft · below guide text · marginBottom 16px |
| Thresholds (UI gate) | Min 3 strokes · min 1800ms duration · min 120px path length — all three must be met |
| Stroke counter | Displayed inside the canvas · bottom-left · not external status text. Shows 'N / 3' until threshold met, then 'N strokes ✓'. 11px/600/InkSoft. |
| No done overlay | When submitted, canvas border colour change is the only feedback. No tick overlay. |
| Moss — never | Moss does not appear on the Draw/signature screen at any point. No submission tick in Moss. The Clay circle tick is used for Kairos ceremony states. Moss = PoL biometric only. |
| Done button — active | background #2A2520 · color #FAF8F5 · height 36px · borderRadius 9px · Deep Ink · never Signal |
| Done button — inactive | background rgba(42,37,32,0.12) · color rgba(42,37,32,0.35) |
| Hint | 'Take your time — sign slowly.' in Hearth for 1.8s if Done tapped early |
| Undo control | Undo icon (no 'Undo' label) + 'Clear' text · centred pair below canvas. See Undo Stroke spec below. |


## Draw Screen — Controls Bar (locked)

| Property | Value |
|---|---|
| Layout | Undo icon + 'Clear' text · centred as a pair below the canvas |
| Undo icon | Icon only — no 'Undo' label beside it |
| Implementation | Snapshots getImageData before each stroke begins. Restores via putImageData on undo tap. |
| Controls position | Below canvas, above Done button |
| Genie bubble | Must not appear on this screen. Instructional copy is plain text (14px/400/InkMid). See Part A Voice → Genie Bubble prohibition. |


## Done Button — Canvas Interactions (Locked Rule)

| Property | Value |
|---|---|
| Rule | Canvas interaction Done buttons use Deep Ink (#2A2520), not Signal. |
| Rationale | Signal is reserved for navigation, selection, and in-product action links. Never a CTA background colour. |
| Active | background #2A2520 · color #FAF8F5 · height 36px · borderRadius 9px |
| Inactive | background rgba(42,37,32,0.12) · color rgba(42,37,32,0.35) |
| Affects | Signature · constellation · any future inline canvas action button |


## Undo Stroke Button — Canvas Controls Bar (locked)

*Sits left of the Done button. Removes the last drawn stroke. Full spec and SVG in Part A — Icons tab.*

| Property | Value |
|---|---|
| Purpose | Removes the last drawn stroke from the canvas. Tap repeatedly to undo multiple strokes. |
| Position in controls bar | Left of Done button · right of stroke count label |
| Colour — default | Ink Soft #8A8480 · when canvas is empty |
| Colour — active | Signal #6B5FED · when one or more strokes are present |
| Disabled | Ink Soft · opacity 0.3 · canvas empty, nothing to undo |
| Touch target | 44×44px · padding 12px all sides |
| accessibilityLabel | 'Undo last stroke' |
| Never | Show as active (Signal) when canvas is empty. The icon colour is the undo availability indicator. |
| SVG | See Part A — Icons tab — Canvas Control Icons — Undo Stroke for full paths and preview. |


## Validation Arc Screen

| Property | Value |
|---|---|
| Background | Void #0C0B0A — the only dark screen in the binding flow |
| Arc | Comet Arc · 240×240px · centred |
| Duration | 5 seconds fixed (PoC) |
| Phase labels — 0–1.6s | 'Checking the registry…' |
| Phase labels — 1.6–3.2s | 'Issuing your account…' |
| Phase labels — 3.2–5s | 'Binding your wallet…' |
| Resolution | Comet Arc resolves to Moss full-circle ring · Bound screen after 900ms |
| Not skippable | Member cannot tap past it |


## Bound Screen — 'You're real.' (Screen 1)

| Property | Value |
|---|---|
| Supersedes | Old stagger timing row replaced by phase timings below. |
| Layout | Absolute-positioned zones across full screen height. Not a flex stack. |
| Background | Earth Rise (light mode only) |
| Zone 1 — upper quarter | Status bar clearance (44px) + vesica placeholder (40px, centre at 64px) + ceremony word |
| Zone 2 — vertical centre | ~295px from top · ordinal number block |
| Zone 3 — lower third | ~490px from top · account permanence copy |
| Bottom anchor | Ghost CTA |
| Ceremony word | 64–72px / 800 / -0.03em / Ink · left-aligned · two lines: 'You're' line 1, 'real.' line 2. Full stop on its own line. |
| Ordinal number | 72–96px / 800 / -0.045em / Clay · solid colour, no gradient fade. No # symbol. |
| Ordinal copy below | 14–15px / 500 / InkSoft · 'You are the Nth human being to become a member of ÆPOCH.' |
| Account copy | 'Your account has been created. It's permanent and it belongs to you alone. No one else can use it and you cannot create another.' · 14px/Ink Mid |
| Ghost CTA | 'See your first Kairos →' — placeholder copy, pending final approval |
| Phase timings (from The Signal start) | Breath 0–300ms · Converge 300–2100ms · Hold 2100–2600ms · Forge 2600–3700ms · Radiance 3700–4600ms · Shrink to mark 4600–5400ms |
| Content stagger (from phase 5 end) | +500ms ceremony word · +1800ms ordinal number · +3000ms account copy · +4200ms ghost CTA |


## The Signal — Convergence Animation (locked)

*Precedes the 'You're real.' ceremony screen. Fires immediately after the Validation Arc completes. Light mode only.*

| Property | Value |
|---|---|
| Name | The Signal |
| Direction | Convergence. Two circles enter from screen edges (left = Clay/Earth, right = Prism/Cosmos), decelerate into the vesica piscis position, lock. The ring is then forged clockwise from the top of the lens. |
| Background | Earth Rise — same as home screen. Light mode only. |
| Left circle | Clay warm halo rgba(196,131,90,0.10–0.11) + circle stroke rgba(196,131,90,0.50–0.52) 1.5–1.6px |
| Right circle | Prism cool halo rgba(184,169,217,0.10–0.11) + circle stroke rgba(184,169,217,0.50–0.52) 1.5–1.6px |
| Lens edges | Warm left arc rgba(235,200,150,0.62) / cool right arc rgba(200,222,250,0.55) — clipped to intersection |
| Ring (The Human) | White-hot stroke, no fill. Forged clockwise from top of lens (-π/2). 800–1100ms to complete. |
| Ring — head | Bright white radial glow rgba(255,255,255,0.92) with heat trail |
| Ring — completed | Slow shimmer rotation (~0.00032 rad/ms), single specular highlight rotating around circumference |
| Bloom on ring completion | Three-wave radial expansion (warm white → cool violet → warm amber), 1400ms, fires at 82% of forge progress |
| Settled mark | Vesica shrinks from animation position to CY_TOP = statusBarHeight + vesicaPlaceholderHeight/2 = 64px. Small mark continues breathing. |
| prefers-reduced-motion | Skip animation entirely. Show final settled mark and all content immediately. |


## KairosStrip — PoC Variant (Bound Screen)

| Property | Value |
|---|---|
| Card | borderRadius 14px · background rgba(255,255,255,0.58) · border 1px Border |
| Accent bar | 3px full-width · linear-gradient Prism → Pearl → Signal at 33% opacity → Prism |
| Comet Arc | Orbits card perimeter — continuous loop |
| Serial number | Æ01 in Prism 22px/800 monospace · dash in Ink Faint · digits in Ink 22px/800 monospace |
| Secondary row | 'by @handle · X · IV · MMXXVI · Epoch I' · all 12px/Ink Soft |
| Date format | Roman numerals — ceremonially equivalent to NFT obverse. Only UI surface besides the NFT where Roman numerals are permitted. |


## Your First Kairos Screen (Screen 2)

*Shown once only, immediately after 'You're real.' when member taps the ghost CTA. No animation — content fades in on mount (0.65s opacity transition).*

| Property | Value |
|---|---|
| Trigger | One-time only. Tapping 'See your first Kairos →' on Screen 1. |
| Heading | 'Your first Kairos has been activated.' · 24px / 800 / -0.028em / Ink |
| Subhead | 'It is yours.' · 14px / 400 / InkSoft |
| Background | Earth Rise — same as home screen. No animation. |
| KairosStrip | Same spec as KairosStrip PoC Bound screen variant (comet, Roman numerals) |
| Origin Story field | First-encounter variant — includes explanation prose before the field. See Origin Story Field spec below. |
| CTA primary | CeremonyCTA 'Give this Kairos' · Clay · passes originText (may be empty) |
| CTA secondary | Ghost 'I'll give it later' |
| No back arrow | Suppressed. This screen is one-way. |
| Genie bubble | Must not appear. Content is factual/operational. Plain text only. |


## Daily Activation Flow — Minted / Sealed Screen (locked)

*Daily equivalent of the first-Kairos ceremony. Fires after Draw/signature submission.*

| Property | Value |
|---|---|
| Ceremony word | 'Sealed.' · 38px / 800 / -0.03em / Ink |
| Ceremony icon | Clay circle tick (44×44px) · left of ceremony word |
| Subhead | 'Your Kairos for today has been activated.' · 15px / 400 / InkMid · plain text, no Genie bubble |
| Flow order | Clay tick + 'Sealed.' → subhead → KairosStrip → Origin Story field (daily variant) → Streak pill (centred, only when streak ≥ 2) → CTAs |
| Phase timings | 600ms: ceremony word · 1400ms: subhead · 2100ms: strip + field + streak · 2800ms: CTAs |
| CTA primary | CeremonyCTA 'Give this Kairos' · Clay · passes originText |
| CTA secondary | Ghost 'Keep it in my wallet' |
| Moss — never | No Moss on this screen. Clay tick only. Moss = PoL biometric resolution exclusively. |


## Daily Activation Flow — PoL Screen Idle State (locked)

*State before the member taps 'Begin'. Guides face positioning before capture starts.*

| Property | Value |
|---|---|
| Flower of Life | Drawn at opacity 0.22–0.32 · iridescent — individual circle colours walk between warm Prism and Clay tones based on distance from centre and a per-circle shimmer offset |
| Inner glow | Radial gradient centred on face position area (slightly above canvas centre) · Prism → Signal → transparent · breathing at ~1.6s |
| Head silhouette | Dashed Prism oval for head · opacity 0.48–0.62 · breathing at ~1.4s |
| Shoulder guide | Bezier shoulder curves · opacity 0.32–0.42 · neck lines opacity 0.26–0.34 |
| Purpose | Guide face positioning before capture begins. Not decorative. |
| Genie bubble | Must not appear on this screen. Instructional copy is plain text (14px/400/InkMid). |


## Daily Activation Flow — 3-2-1 Countdown (locked)

| Property | Value |
|---|---|
| Trigger | Member taps 'Begin' |
| Canvas during countdown | Flower of Life at reduced opacity |
| Numerals | 72px / 800 / white / centred in circle |
| 'Go' | 38px / Prism |
| Animation | Each number pops in with scale spring (0.35s) |
| Duration | 3.4s total |
| Phase status bar text | 'Get ready…' |


## Origin Story Field (locked)

*Optional 140-character text field attached to a Kairos at the moment of activation. Two variants: first-encounter and daily.*

| Property | Value |
|---|---|
| Definition | A 140-character optional text field that can be added to any Kairos at the moment of activation. Only the activating member can add it. Once given, it is permanent and cannot be changed. Visible to all ÆPOCH members. |
| First-encounter variant | Used on 'Your first Kairos' screen (Screen 2) only. Includes explanation prose before the field: 'Every Kairos can carry an Origin Story. Only you can add one to the Kairos you activate. Other members can see it. What you write here stays with this Kairos forever and cannot be changed.' + motivating line: 'Mark this Kairos as a part of your legacy.' |
| Daily variant | Used on Minted/Sealed screen. No explanation prose. Member already knows what it is. Prompt only as placeholder inside field. |
| Placeholder copy | 'Write your origin story here. What do you want the future to know about this moment?' |
| Field — card | borderRadius 14px · bg rgba(255,255,255,0.65–0.72) · border 1.5px solid Border at rest |
| Field — focus | border rgba(196,131,90,0.55) · focus ring: 0 0 0 3px rgba(196,131,90,0.08) |
| Field — padding | 16px 16px 44px (tall bottom for counter) |
| Character counter | Always visible at opacity 0.45 when field empty, 1.0 when typing. Turns Clay when ≤ 20 chars remain. Bottom-right inside field. |
| Permanence note | 'Permanent and visible to the ÆPOCH community once given.' · 11–12px / 400 / InkSoft · below field |
| Skip behaviour | Leaving field empty and tapping 'Give this Kairos' is valid skip. No separate skip button. No skip label. |
| Data | onGiveKairos(originStory: string) — empty string = skipped |


## Loading Screen v9 — Light Mode (locked 25 Apr 2026)

*Full interactive preview is in Part A — Loading States tab. Spec only here. Dark mode is pending.*


## Three-Act Animation Structure (locked v7.8)

| Property | Value |
|---|---|
| Concept | Quantum materialisation: the member's identity exists in superposition and converges into permanent form. This is what is literally happening on-chain during device binding. |
| Total duration | 16 000ms |
| Act I — Superposition | 0–28% · 150 particles drift in probabilistic orbits. Nothing at centre. |
| Act II — Convergence | 28–60% · Particles arc inward via slingshot pull, lock to ring. Ghost ring appears. |
| Act III — The Comet | 60–100% · Comet orbits ring. Æ mark grows from centre point. |


## Particle System

| Property | Value |
|---|---|
| Count | N = 150. First 75 = Earth palette. Last 75 = Cosmos palette. |
| Earth particles | Lower-left quadrant bias · rgb(196,131,90) · rgb(210,158,110) · rgb(232,201,160) · rgb(184,108,66) · rgb(172,95,55) |
| Cosmos particles | Upper-right quadrant bias · rgb(184,169,217) · rgb(214,228,240) · rgb(139,175,212) · rgb(200,185,232) · rgb(168,200,228) |
| Ring angle | Earth fills left semicircle · Cosmos fills right semicircle |
| Convergence path | Staggered convDelay 0–0.09 per particle. Slingshot: ease-in cubic to pull-point (28% toward ring from centre) → ease-out quint to ring. |


## Comet Arc

| Property | Value |
|---|---|
| Ring radius | 90px logical |
| Orbit period | 16 000ms |
| Tail | 130 segments · Earth warm root rgb(196,131,90) → Cosmos cool head rgb(230,220,248) · lineWidth 0.7 + tp×4.0 · opacity pow(tp,0.85) × cometAlpha × 0.95 |
| Head — outer halo | white → pearl → prism · radius 22 + cometProgress×5px |
| Head — warm bloom | Gold · 10px radius |
| Head — white core | Hard white · 3.2px radius |
| Head — rim stroke | rgba(200,190,240,0.40) · 6.5px — iridescent |


## Æ Mark Emergence

| Property | Value |
|---|---|
| Start | 63% of total duration |
| End | 88% of total duration |
| Scale | 0.05 → 1.0 · easeOutQuint · pivot always cx, cy |
| Opacity | 0 → 1 · easeOutCubic |
| Final size | 75px wide · 75×(652/869) ≈ 56px tall |
| Optical offset | X -6.5px · Y -2.0px — same as app icon |
| Fill | #4A4440 (Ink Mid) |
| Rendering | Native canvas paths only. Never SVG drawImage. Same path data as App Icon — see Part A App Icon tab. |


## Background — Earth Rise (Light Mode)

| Property | Value |
|---|---|
| Base | #FEFCF9 |
| Earth warm pool | 8%W, 75%H · r=75%maxDim · rgba(196,131,90, 0.15) |
| Earth sand pool | 18%W, 92%H · r=55%maxDim · rgba(232,201,160, 0.11) |
| Cosmos pearl pool | 92%W, 4%H · r=58%maxDim · rgba(214,228,240, 0.13) |
| Cosmos prism pool | 98%W, 18%H · r=42%maxDim · rgba(184,169,217, 0.10) |


## Copy

| Property | Value |
|---|---|
| Timing | Present from frame 0. No animation delay on copy. |
| Headline | 15px · weight 700 · #1A1612 |
| Subline | 12px · weight 400 · rgba(74,68,64,0.55) |
| Default copy | 'Binding your device.' / 'This takes a few seconds.' |
| Approved variants | 'Your wallet's being bound.' / 'One moment.' / 'Setting up your account.' |
| Voice | System copy. Not Genie. Present continuous tense. Never 'Please', 'Please wait', 'Loading...', fake progress bars. |
| Punctuation | Headline and subline both end with full stop. |


## Shared Rules

| Property | Value |
|---|---|
| Genie | Absent. Unauthenticated surface. |
| Completion | Comet Arc resolves to Moss full-circle ring on success. |
| prefers-reduced-motion | Skip all animation. Show final state — ring + Æ mark at full opacity, copy visible. |
| Dark mode | Pending. Not yet implemented. Light mode only at v9. |
| Removed — Flower of Life | Removed v7.8. Added complexity without clarity. |
| Removed — vesica piscis overlay | Removed v7.8. Particle-to-comet arc is conceptually complete without it. |


## System Copy Register

| Property | Value |
|---|---|
| Voice | System, not Genie. No Genie rule set applies. |
| Tense | Present continuous for loading. Present tense for errors and legal. |
| Register | Warm and plain. Direct without being cold. |
| Never | 'Please', 'Please wait', 'Loading...', 'Processing your request' |
| Punctuation | Statements end with full stop. Always. |
| Applies to | Loading states · legal screens · form errors · pilot gate · any pre-identity surface |


## Legal / Consent Link Style — Locked Rule

| Property | Value |
|---|---|
| Style | Ink Mid #4A4440 · underline · transition to Ink on hover |
| Never | Signal #6B5FED on legal copy. Signal is for in-product action links only. |
| Applies to | Privacy Policy · Terms of Use · Communications Policy · all legal link-outs |
| Email addresses | Same — Ink Mid · underline. Never Signal. |


## Member Name Validation — URL Rules

| Property | Value |
|---|---|
| Allowed | a–z · 0–9 · hyphen ( - ) |
| Not allowed | Spaces · underscores · uppercase · accented characters · any symbol · leading/trailing hyphen · double hyphen |
| Length | Minimum 3 · Maximum 20 characters |
| Available state | Prism checkmark in field. URL preview: æpoch.id/{name}. CTA activates. |
| All errors | Hearth, not Ember. All are recoverable. |


## Wallet Architecture

| Property | Value |
|---|---|
| Pattern | Vertical card stack. Active card at top. Two peek layers beneath (scaleX delta 4.4% per layer, 10px vertical offset). |
| Assets | Kairos (Clay pole) and rBTC (Iris/Prism pole) |
| Card surface | Iridescent dual-pole gradient per asset, canvas rendered. Kairos = Clay/Pearl. rBTC = Iris/Prism. |
| Navigation | Arrow buttons and 1 of N counter below stack |
| Recent activity | Last 4 transactions. Tap row to open bottom sheet detail. |


## Kairos Asset — Balance Display

| Property | Value |
|---|---|
| Total balance | Large display number. Thousands separator always. 1,000 not 1000. toLocaleString enforced. |
| Use or Lose | Hearth colour. N burn in X days. Never 'burns', never 'd' abbreviation. |
| Yours to Keep | InkSoft. Never expires. |
| Pulses | 1 Kairos = 100,000 Pulses. Shown as secondary on amount entry and confirm screens. |


## Activity List — Transaction Rows

| Property | Value |
|---|---|
| Send icon | Northeast diagonal arrow. 18x18 viewbox. stroke InkSoft 1.6px. strokeLinecap round. |
| Receive icon | Southwest diagonal arrow. 18x18 viewbox. stroke Clay 1.6px. strokeLinecap round. |
| Received amount colour | Clay. Never Moss. Moss is PoL biometric only. |
| Sent amount colour | InkMid |
| Row tap | Opens transaction detail bottom sheet. No inline expansion. |
| Tag | Not in the list row. Lives in the detail sheet only. |


## Transaction Detail — Bottom Sheet

| Property | Value |
|---|---|
| Trigger | Tap on any transaction row |
| Presentation | Slide-up bottom sheet. Scrim rgba(26,22,18,0.30) dims background. Tap scrim to dismiss. |
| Sheet surface | rgba(254,252,249,0.99). borderRadius 24px 24px 44px 44px. |
| Drag handle | 36x4px pill. rgba(26,22,18,0.12). Centred at top of sheet. |
| Amount hero | Direction label 12px/600/InkSoft. Amount 44px/800/Ink. Unit 13px/InkSoft below. |
| Detail rows | From/To, Date, Memo (if present), Expiry, Tag. 13px. InkSoft label, Ink/700 value. |
| Expiry row | Received transactions only. Label: Expiry. Value: Yours to keep. Does not expire. In Signal. |
| Tag row | Always present. Coloured pill if tagged. Em dash if untagged. |


## Send Flow — Steps (locked v8.2)

| Property | Value |
|---|---|
| Steps | Recipient, Amount, Tag, Confirm, Sent |
| Back navigation | Each step has an inline back chevron (36x36px) going to the previous step. Global BackBtn suppressed for send screen. |
| Gas fee footnote | Fees are paid in rBTC to the Rootstock network. The exact fee is calculated at send time. |
| Irreversible warning | This cannot be undone. The Kairos and rBTC fee move permanently. |
| Confirm CTA | Single full-width BigCTA (52px, weight 800) labelled Send. Cancel below as GhostText. |


## Send Flow — Recipient Step

| Property | Value |
|---|---|
| Search | Empty on entry. Member types handle or wallet address. |
| Change from amount | Tapping Change or back chevron clears recipient state and returns to empty search. Previously selected member appears in suggestions list normally. |
| External wallet | Detected when query length exceeds 3 and no member match. Presented as selectable row. |


## Send Flow — Amount Step

| Property | Value |
|---|---|
| Header | Inline bar: back chevron (36x36px), avatar, recipient name, Change link (Signal). Single row. |
| Amount display | Large numpad-driven display. Thousands separator active. Colour shifts to Ember if over max. |
| Memo field | Add a short note (optional). 36 char max. Counter bottom-right. |
| Advance | Next goes to Tag step. Disabled until amount exceeds 0 and not over max. |


## Send Flow — Tag Step (locked v8.2)

| Property | Value |
|---|---|
| Purpose | Member tags the send with a descriptor. Helps the community understand how value is moving. |
| Optional | Yes. Member may continue without selecting. |
| Timing | Tags cannot be added after sending. Stated on screen when no tag is selected. |
| Grid | 2-column. borderRadius 13px. Signal highlight on selection. 13px/700 label. |
| Selected state | Signal border rgba(107,95,237,0.55). Signal bg rgba(107,95,237,0.07). Signal dot. Text colour Signal. |
| CTA selected | Continue with [Tag name] |
| CTA untagged | Continue without a tag |
| Header copy | What's this for? — 22px/800/-0.025em |
| Description copy | How would you describe this send? |
| Skip note | Tags can't be added after sending — 11px/InkFaint — shown only when no tag selected |


## Transfer Tags — Canonical List (locked v8.2)

| Property | Value |
|---|---|
| Market and Exchange | Purchase, Commission, Collab, Help |
| Generosity and Recognition | Gift, Tip, Boost, Donation |
| Deep Human Presence | Attention, Care, Vouch, Source, Guide, Bridge |
| Purchase | Getting a tangible good or specific service |
| Commission | Requesting custom, future work or creation |
| Collab | Co-creating or working on a project together |
| Help | Practical tasks, technical support, or problem-solving |
| Gift | Sending tokens with no expectation of return |
| Tip | Quick appreciation for a good interaction or moment |
| Boost | Amplifying visibility, project, or voice |
| Donation | Supporting a shared cause, group pool, or public good |
| Attention | Deep listening, uninterrupted focus, or dedicated review |
| Care | Emotional support, wellness, hospitality, or nervous-system holding |
| Vouch | Standing behind someone's character or validating their humanity |
| Source | Providing unique human data, raw feedback, or original insights |
| Guide | Mentoring, navigating complexity, or onboarding newcomers |
| Bridge | Networking, referrals |


## Send Flow — Confirm Step

| Property | Value |
|---|---|
| Back | Chevron goes to Tag step |
| Confirm rows | To, Amount (Kairos), Amount (Pulses), Note (if present), Tag |
| Amount rows | Two separate rows: Amount (Kairos) and Amount (Pulses) |
| Tag row | Always present. Coloured pill if tagged. None / Add one link if untagged, navigates to Tag step. |
| Tag pill | flexShrink:0. whiteSpace:nowrap. Coloured bg and text from tag definition. |


## Send Flow — Sent Screen (locked v8.2)

| Property | Value |
|---|---|
| Ceremony word | On its way. — 32px/800/-0.03em/Ink |
| Icon | Signal circle tick. 72px container rgba(107,95,237,0.09). Circle outline 1.5px Signal. No fill. |
| Body copy | Your Kairos is heading to @[handle]. You will know when it lands. — 15px/InkMid. Handle bold. |
| CTA | BigCTA Back to Wallet — full width dark button |
| Ghost link | View in block explorer with right arrow — Signal — 13px/700 |
| Tag | Does not appear on sent screen |
| Back arrow | Suppressed |


## Insufficient rBTC — Warning Pattern

| Property | Value |
|---|---|
| Trigger | rBTC balance below estimated gas fee |
| Warning panel | Ember border. Ember bg tint. Not enough rBTC to cover the fee. |
| CTA | Request more rBTC — Ember border button |
| Post-request state | Signal tick (not Moss) and Request sent. We will be in touch. Signal colour. Moss is PoL biometric only. |


## Wallet Copy Rules

| Property | Value |
|---|---|
| Thousands separator | Always. toLocaleString enforced on all Kairos and Pulse amounts. |
| Burn copy | N burn in X days — never burns, never d abbreviation |
| Irreversible warning | Both Kairos AND rBTC fee named: The Kairos and rBTC fee move permanently. |
| rBTC label | Always rBTC. Rootstock Smart Bitcoin as subtitle only. |
| Tag permanence | Tags can't be added after sending. Plain statement, no softening. |
| Expiry received | Yours to keep. Does not expire. No hyphens, no exclamation mark. Signal colour. |


## Rhythm — Screen Identity

| Property | Value |
|---|---|
| Screen name | What we are building together. |
| Nav label | Rhythm — locked v8.0. Never 'Statistics'. Never 'Together'. 'Statistics' must not appear in any member-facing context. |
| Nav icon | ECG heartbeat waveform — variant J · Signal active · InkFaint inactive · See Part A Icons tab for full SVG spec |
| Nav position | Fifth item in Group 1 primary nav — after Connections |
| Purpose | Shows collective epoch statistics. Not a personal dashboard. Creates group dopamine — the feeling of building something together. |
| File | AEPOCH_StatisticsScreen_v1-3.tsx — source of truth for layout, spacing, and component decisions |
| Version | v1.3 |


## Page Header Spec

| Property | Value |
|---|---|
| Title copy | What we are building together. |
| Title style | 22px · weight 800 · Ink #1A1612 · letterSpacing -0.025em · lineHeight 1.15 · sentence case |
| Epoch stamp — position | Top-right corner of header |
| Epoch stamp — label | 'Epoch' · 9px/700/InkFaint/letterSpacing .11em/uppercase |
| Epoch stamp — numeral | 32px/800/Signal · plain roman numeral character (I, II, III…) · no bars, no decoration, no serifs |
| Section labels | 10px / 700 / letterSpacing .09em / Signal #6B5FED · Sentence case · No text-transform: uppercase |


## Section: Today

| Property | Value |
|---|---|
| Members who showed up today — icon | People (two overlapping circles + path) · Moss #4CAF82 · bg rgba(76,175,130,.12) |
| Members who showed up today — large number | 56px / 800 / Ink / letterSpacing -.05em / tabular-nums |
| Members who showed up today — /total | 14px / 500 / InkFaint · paddingBottom 8px · beside large number |
| Members who showed up today — sub-copy | '[N] still to show up.' · sentence case · InkSoft 11px |
| Members who showed up today — progress label | '[N]% of those who showed up have activated today' · 10px / InkSoft · above bar |
| Members who showed up today — progress bar | height 3px · bg rgba(76,175,130,.15) · fill linear-gradient(90deg, rgba(76,175,130,.6), Moss #4CAF82) |
| Today's flow — icon | Swap/transfer arrows · Iris #8BAFD4 · bg rgba(139,175,212,.12) · same icon as 'Your flow' and 'Monthly flow' |
| Today's flow — large number | 56px / 800 / Iris / letterSpacing -.05em / tabular-nums |
| Today's flow — sparkline | 7 bars · flex layout · height 22px · today = rightmost bar full Iris · prior days opacity .18 through .46 ascending |


## Section: This epoch

| Property | Value |
|---|---|
| Card container | rgba(255,255,255,.55) · border 1px Border · radius 14px |
| Days running | Calendar icon · Signal #6B5FED · bg rgba(107,95,237,.08) · 20px/800/Ink |
| Total members | People icon · Moss #4CAF82 · bg rgba(76,175,130,.12) · 20px/800/Ink |
| Kairos activated | Kairos branch mark · Signal #6B5FED · bg rgba(107,95,237,.08) · 20px/800/Ink |
| Kairos burned | Slash-circle · Ember #A03020 · bg rgba(160,48,32,.07) · 20px/800/Ink (not InkSoft) |
| In circulation | Globe · Prism #B8A9D9 · bg rgba(184,169,217,.12) · 17px/800/Ink |
| Monthly flow | Swap arrows · Iris #8BAFD4 · bg rgba(139,175,212,.12) · 17px/800/Ink |
| Kairos remaining — row bg | rgba(196,131,90,.04) · border-top 1px solid rgba(196,131,90,.14) |
| Kairos remaining — icon | Epoch Remaining sun/arc · Clay #C4835A · bg rgba(196,131,90,.10) · border rgba(196,131,90,.18) |
| Kairos remaining — label colour | Clay #C4835A |
| Kairos remaining — number | 20px/800/Clay |
| Kairos remaining — progress | Left: '[N,NNN of N,NNN activated]' in Clay/700 · Right: '[NN.N%]' in Clay/700 · Bar: height 3px · bg rgba(196,131,90,.14) · fill linear-gradient(90deg, rgba(196,131,90,.45), Clay) |


## Section: Leading the way

| Property | Value |
|---|---|
| Top streak | Flame icon · Ochre #A0673A · bg rgba(160,103,58,.12) · 20px/800/Ink |
| Top flower | Swap arrows icon · Iris #8BAFD4 · bg rgba(139,175,212,.12) · 20px/800/Ink |
| Top flower — definition | The member who has given (flowed) the most Kairos in the current epoch. 'Flower' = a member who gives Kairos. |
| Leader badge — condition | Shown only when a single member clearly leads. Set to null when no clear leader — badge does not render. |
| Leader badge — style | display inline-flex · padding 2px 7px · borderRadius 20px · bg rgba(107,95,237,.08) · border 1px solid rgba(107,95,237,.18) · 9px/700/Signal |


## Rhythm — Terminology

| Property | Value |
|---|---|
| Rhythm | Navigation label for 'What we are building together' screen. Short form used in drawer nav only. Full title used as screen heading. |
| What we are building together. | Full title of the Rhythm screen. Always sentence case. The full stop is part of the title. Never shortened to 'Statistics' or 'Rhythm' in member-facing headings. |
| Top flower | The member who has given (flowed) the most Kairos in the current epoch. Label shown in the 'Leading the way' section with a handle badge only when one member clearly leads. |
| Flower (verb) | To give Kairos — to flow Kairos to another member. 'She flowered 7 Kairos this epoch.' |


## Open Decisions — Not Yet Locked


## Decisions Log

*Every formally locked design decision. New sessions appended below.*


> **{session.session}**


## Streak Pill

| Property | Value |
|---|---|
| Background | rgba(196,131,90,0.10) · border rgba(196,131,90,0.28) · radius 20px |
| Icon | Flame SVG · Clay fill · opacity 0.85 · 13×13px |
| Number | 12px/700 · Clay #C4835A |
| Label | days in a row. · 12px/400 · Ink Mid · always with full stop |
| Never | Signal. Streak is human achievement — Earth palette only. |


## Streak Pill — Visibility Rule (locked)

| Property | Value |
|---|---|
| Rule | Never display streak information — pill, number, progress bar, or streak copy — when streak is 0 or 1. Show only when streak >= 2. |
| Streak = 0 | No pill. No number. No progress bar. No copy. Absence is the correct state. |
| Streak = 1 | No pill. Today's activation is not a streak. A streak requires continuity across at least two consecutive days. |
| Streak >= 2 | Show the streak pill with number and 'days in a row.' copy. |
| Rationale | A streak of 1 is just today — it implies a chain where none exists yet. Showing streak = 0 highlights absence, which is never the right signal. The pill earns its place only when there is something genuinely worth reinforcing. |
| Applies to | Home screen stat card streak pill · Profile screen streak pill in 'Your record' header · Streak progress bar on home screen stat card · Any notification copy referencing streak (e.g. 'streak at risk' push should not fire if streak is 0 or 1) · Any future surface displaying streak data |
| Never | Show '0 days in a row.' or '1 day in a row.' or a near-empty streak bar. Do not replace with a zero state or placeholder. |


## Progress Bar — Standard Variant (locked)

*Used for all reading and process progress. Full developer spec in 260421-ÆPOCH-ProgressBar-Spec-v1_0.md.*

| Property | Value |
|---|---|
| Variants | standard · streak · warn — three types only. Never improvise a fourth. |
| Standard — use when | Legal document scroll · DID binding flow · daily Kairos minting · face capture steps · any multi-step process or onboarding flow |
| Standard — fill gradient | linear-gradient(90deg, rgba(196,131,90,0.85) 0%, rgba(184,169,217,0.90) 50%, rgba(107,95,237,0.85) 100%) — Earth → Prism → Signal |
| Standard — rationale | Three stops = three ÆPOCH colour poles. All three poles engaged = the full protocol is in motion. |
| Streak — use when | Current streak row on home screen stat card only. Never on any other surface. |
| Streak — fill gradient | linear-gradient(90deg, rgba(160,103,58,0.75) 0%, rgba(232,201,160,0.90) 100%) — Ochre → Sand |
| Warn — use when | Use or Lose expiry approaching · PoL retry countdown · session timeout. Only when something is actively at risk. |
| Warn — fill gradient | linear-gradient(90deg, #8B5E2F 0%, rgba(139,94,47,0.40) 100%) — Hearth → faded |
| Track | rgba(224,216,208,0.55) — Border at 55% opacity. Same for all three variants. |
| Height | 2px · border-radius 1px |
| Animation | width transition · 0.6s · cubic-bezier(0.4, 0, 0.2, 1) |
| Accessibility | role='progressbar' · aria-valuenow · aria-valuemin=0 · aria-valuemax=100 · aria-label where context is not labelled by adjacent text |
| Moss — never | → See Part A Colour → Moss consolidated rule. Moss has three permitted uses only. Progress bar fill is not one of them. |
| Green — wrong | The green progress bar used on legal scroll screens in earlier builds was wrong. Replace with standard variant. |


## Ceremony Words

| Property | Value |
|---|---|
| Form | One word. Full stop. Display weight 800. Ink. Two words are permitted where the meaning requires it. 'You're real.' is the approved exception. The full stop rule and type spec remain unchanged. |
| Size — standard | 34px · weight 800 · tracking -0.03em |
| Size — 'You're real.' exception | 64–72px · weight 800 · tracking -0.03em. Named exception only. This is the most significant moment in the protocol. Display headline register. Only on the two-screen ceremony flow following PoL binding. |
| Icon — biometric | Moss circle tick. PoL/biometric only. |
| Icon — transaction | Signal circle tick. In-product transactions. |
| Icon — ceremony | Clay circle tick. Kairos activation, Origin Story, 'Sealed.' screen. |
| Examples | Heard. · You're real. (exception) · Here. · Sent. · Sealed. |


## Ceremony Words — 'You're real.' Display Exception (locked)


## Decisions Log

Every formally locked design decision. Rationale and affected components recorded.


### Session 16 · 14 April 2026

**Decision:** Activate card border-radius corrected from 16px to 14px  
**Rationale:** 14px aligns with the global rule (13–14px for cards and buttons). The 16px conflicted with the system spec.  
**Affects:** Home screen activate card  

**Decision:** Hamburger moved from top-bar to fixed bottom-right frosted pill  
**Rationale:** Removes dead space at top. Moves navigation trigger to thumb-reachable position.  
**Affects:** Home screen layout · Navigation tab Trigger row  

**Decision:** Burn strip visibility threshold locked: silent at 8+ days, Hearth at 4–7, Ember at 0–3  
**Rationale:** Showing urgency at 15+ days creates noise. 4–7 days introduces urgency when action is meaningful.  
**Affects:** Home screen burn strip  

**Decision:** 'Your Flow' corrected to 'Your flow'  
**Rationale:** Consistent with sentence case rule. Title case was a prototyping error.  
**Affects:** Home screen stat card · any surface using this label  

**Decision:** Fourth stat row 'In circulation' added  
**Rationale:** Gives members a sense of the economy's scale. Reinforces that their activation matters at a macro level.  
**Affects:** Home screen stat card  


### Session 16 · 10 April 2026 (PoL Binding)

**Decision:** Done button in canvas interactions uses Deep Ink, not Signal  
**Rationale:** Signal is never a CTA background colour. Done buttons are primary actions — they take Deep Ink.  
**Affects:** Signature canvas · constellation · any future inline canvas action button  

**Decision:** Bound screen copy updated to four-part statement  
**Rationale:** Original copy implied possession but did not state: account just created, permanent, cannot be duplicated.  
**Affects:** Bound screen  

**Decision:** Kairos activation line: Signal → Ink Mid, weight 600 → 400, copy updated  
**Rationale:** Signal on body copy reads as a tappable link. This is a statement of fact.  
**Affects:** Bound screen  

**Decision:** Validation arc updated to three phase labels  
**Rationale:** Three labels accurately describe what the backend is doing across the full 5-second window.  
**Affects:** Validation arc screen  

**Decision:** Facial Landmark Tap: no visible targets  
**Rationale:** Visible targets reveal coordinates to automated systems. The interaction is only meaningful if the member locates their own features without assistance.  
**Affects:** LandmarkTap component  


### Session · 22 April 2026 (Brand System v7.7)

**Decision:** Streak pill and streak data hidden when streak is 0 or 1  
**Rationale:** A streak of 1 is just today — it implies continuity where none exists. Showing streak = 0 highlights absence. The pill earns its place only at streak >= 2.  
**Affects:** Home screen stat card streak pill · Profile screen streak pill · Streak progress bar · Streak-related push notifications  

**Decision:** Progress bar — three variants locked: standard, streak, warn  
**Rationale:** Single standard treatment (Earth → Prism → Signal gradient) replaces all ad-hoc bar colours. Green (Moss) on legal scroll bars was wrong — Moss is PoL biometric success only. One system-wide component with variant prop.  
**Affects:** Legal document scroll screens · DID binding progress · Kairos minting progress · Face capture steps · Use or Lose expiry bars · Streak bar (exception, Earth palette)  

**Decision:** Undo Stroke icon added to canvas controls bar spec  
**Rationale:** The icon was built in another chat and needed documenting in the brand system before it was lost. Ink Soft default, Signal active, 0.3 opacity disabled. Anticlockwise curved arrow — standard undo iconography.  
**Affects:** Signature canvas · PoL Binding flow · any future freehand canvas interaction  

**Decision:** Envelope icon added — Screen 1.6b waitlist confirmation  
**Rationale:** Hero icon for the check-inbox confirmation screen. Prism register is correct for an informational identity-layer moment on an unauthenticated surface.  
**Affects:** Screen 1.6b — Waitlist confirmation only  

**Decision:** Genie presence resolved for Screen 1.6 — absent on both 1.6a and 1.6b  
**Rationale:** Both waitlist screens are pre-login unauthenticated surfaces. Genie emergence rule is clear. Screen 1.6 Pending status removed.  
**Affects:** Screen 1.6a (Waitlist sign-up) · Screen 1.6b (Waitlist confirmation) · Genie Presence spec in Part A  


### Session · 24 April 2026 (Brand System v7.8)

**Decision:** App icon direction: Celestial locked  
**Rationale:** Stands apart in any app drawer. Blazing white core reads as luminous and alive — consistent with ÆPOCH's presence-as-value positioning. Distinct from every competitor.  
**Affects:** App icon all sizes · App Icon tab Part A  

**Decision:** Mark rendered as native canvas paths not SVG drawImage  
**Rationale:** SVG drawImage introduces bilinear blur at small sizes (60px, 80px noticeably soft). Native canvas paths are always crisp at any resolution.  
**Affects:** App icon · loading screen Æ mark emergence  

**Decision:** Optical offset locked: X=-6.5px, Y=-2.0px  
**Rationale:** Calibrated against ring/icon centre using interactive slider tool. Compensates visual weight of diagonal stroke pulling left and top-heaviness of the Æ composition.  
**Affects:** App icon all sizes · loading screen Æ mark  

**Decision:** Loading screen: Flower of Life and vesica overlay removed  
**Rationale:** Added complexity without clarity. Members don't need sacred geometry to understand 'something is happening'. The particle-to-comet arc is conceptually complete on its own.  
**Affects:** Loading screen animation  

**Decision:** Loading screen: Æ mark emerges from centre in Act III  
**Rationale:** The mark materialising from a near-invisible point is the payoff of the entire animation — identity becoming real. Replaces plain wordmark.  
**Affects:** Loading screen animation  

**Decision:** Loading screen: copy present from frame 0  
**Rationale:** Copy is context, not reward. Members need to know what's happening immediately.  
**Affects:** Loading screen animation  

**Decision:** Loading States tab restored to Part A navigation  
**Rationale:** LoadingStatesSection component existed in Part A v7.7 code but was omitted from the SECTIONS_A array, making it invisible. Fixed in v7.8.  
**Affects:** Part A — Loading States tab visibility  


### Session · 25 April 2026 (Brand System v7.9)

**Decision:** Loading screen preview updated to v9 particle animation in Part A  
**Rationale:** Previous interactive preview in Part A showed the old single-Comet-Arc loading screen. v9 (AEPOCH_loading_v9_ae_locked.html) was the locked direction — three-act particle superposition → convergence → comet → Æ mark emergence. The brand system preview now matches the actual locked animation.  
**Affects:** Part A Loading States tab — interactive preview  

**Decision:** Dark mode loading screen marked pending  
**Rationale:** v9 is light mode only. The old dark mode preview (vesica + dark background + typewriter) was based on a superseded direction. Removed from Part A. Marked pending in both parts.  
**Affects:** Part A Loading States tab · Part B Loading States spec  

**Decision:** Old animation spec rows removed from Part A  
**Rationale:** The v7.8 update appended redundant spec rows after the new LoadingStatesSection. These duplicated the inline spec table and caused confusion. Cleaned in v7.9.  
**Affects:** Part A Loading States tab  


### Session · 2 May 2026 (Brand System v8.0)

**Decision:** 'What we are building together' screen added — nav label locked as Rhythm  
**Rationale:** 'Statistics' is internal jargon. 'Together' was the brief's proposal but too generic. 'Pulse' was rejected — collides with the Kairos denomination. 'Rhythm' chosen: warm, musical, captures the daily repetition at the heart of the protocol.  
**Affects:** Part A Navigation tab · Part A Icons tab · Part B Rhythm tab · DrawerDemo nav array  

**Decision:** Rhythm positioned after Connections in Group 1 nav  
**Rationale:** Brief proposed 'between Profile and Wallet' but Profile is not in primary nav (drawer footer only). After Connections is correct — the natural position for a collective/community surface.  
**Affects:** Part A Navigation — Group 1 primary nav · DrawerDemo  

**Decision:** New icons locked: Calendar, People, Epoch Remaining arc, Rhythm ECG nav icon  
**Rationale:** All four required for the Rhythm screen and nav tab. Signal for protocol records (Calendar), Moss for living membership (People), Clay for epoch supply (Epoch Remaining), Signal/InkFaint for nav states (ECG).  
**Affects:** Part A Icons tab · Part B Rhythm tab  

**Decision:** 'Flower' terminology added — Top flower and flower (verb)  
**Rationale:** ÆPOCH-specific language needing formal documentation before it drifts. 'Top flower' = member who has given the most Kairos. 'Flower' as a verb = to give/flow Kairos.  
**Affects:** Part B Rhythm tab — terminology section  

**Decision:** Statistics screen icon sizes: 18×18px in 34×34px containers  
**Rationale:** Standard is 15×15px. Larger for legibility when icons compete with 56px headline numbers. viewBox and paths unchanged — width/height attributes only.  
**Affects:** Part A Icons tab — icon size note · Part B Rhythm tab  


### Session · 15 May 2026 (Brand System v8.1)

**Decision:** The Signal convergence animation spec locked  
**Rationale:** The animation existed in built screens (260513-ÆPOCH-YoureReal-TwoScreen-v1_0.jsx) but was undocumented. Without a spec it will be re-implemented inconsistently across platforms. Locked now from the built direction.  
**Affects:** Part B PoL Binding — The Signal animation spec · Bound Screen  

**Decision:** 'You're real.' ceremony word promoted to 64–72px display exception  
**Rationale:** 34px (standard ceremony word size) is insufficient for the most significant moment in the entire onboarding. This screen is the member's first confirmation of permanent identity in the protocol. The copy needs to fill the screen with weight. All other ceremony words remain at 34px.  
**Affects:** Part B Ceremonial — Ceremony Words spec · Part B PoL Binding — Bound Screen layout spec  

**Decision:** Bound Screen redesigned as absolute-positioned zone layout  
**Rationale:** The original flex-stack layout treated the 'You're real.' moment like a standard card screen. Three absolute-positioned zones distributed across full screen height give each element room to land. The ordinal number at vertical centre is the emotional climax.  
**Affects:** Part B PoL Binding — Bound Screen layout spec  

**Decision:** 'Your first Kairos' added as Screen 2 of the post-binding ceremony  
**Rationale:** The original Bound Screen tried to do too much — account confirmation + Kairos + Give CTA. Splitting into two screens gives each moment its own space and allows the Origin Story field to be introduced properly.  
**Affects:** Part B PoL Binding — Your First Kairos Screen (new section)  

**Decision:** Origin Story Field specced as a named component  
**Rationale:** The field was referenced in KairosStrip spec and built in two screens but never formally specced. Two variants (first-encounter with explanation prose, daily without) prevent inconsistent implementations.  
**Affects:** Part B PoL Binding — Origin Story Field (new section) · Part B PoL Binding — Minted/Sealed Screen  

**Decision:** Daily activation Minted/Sealed screen spec added  
**Rationale:** The daily activation flow ended at Draw/submission with no specced completion state. 'Sealed.' is the daily ceremony equivalent of 'You're real.' — it needed a full spec including phase timings and Clay tick.  
**Affects:** Part B PoL Binding — Minted/Sealed Screen (new section)  

**Decision:** Daily PoL idle state and countdown specced  
**Rationale:** The existing PoL spec covered only the running/capture state. The idle state (Flower of Life + silhouette guide) and 3-2-1 countdown existed in built screens but had no spec.  
**Affects:** Part B PoL Binding — PoL Idle State and Countdown specs (new sections)  

**Decision:** Signature canvas stroke minimum updated from 2 to 3  
**Rationale:** The PoC implementation uses 3 strokes and the brief confirms this is correct. The original spec (min 2) was set conservatively. 3 strokes provides a richer signature sample.  
**Affects:** Part B PoL Binding — Signature Canvas spec  

**Decision:** Stroke counter moved inside canvas (bottom-left)  
**Rationale:** External status text competes with instructional copy. Inline counter at bottom-left of canvas is a standard drawing tool pattern — it is where the member's eye already is.  
**Affects:** Part B PoL Binding — Signature Canvas spec  

**Decision:** Moss prohibition consolidated into single boxed rule in Part A Colour  
**Rationale:** The rule was scattered across two spec rows (Progress Bar and Ceremony Words). Repeated scattered rules get overridden in implementation. A single prominent boxed rule in the Colour section is the authoritative statement. All other references now point there.  
**Affects:** Part A Colour — Moss boxed rule · Part B Ceremonial — Progress Bar Moss note (updated to cross-reference)  

**Decision:** Sentence case rule elevated to explicit screen-heading spec in Part A Typography  
**Rationale:** The rule existed only under Metadata Label Convention, which implementers read as applying to data labels only. Violations found in multiple built screens ('Time to Activate', 'Make your Mark'). Now an explicit named rule with correct/wrong examples.  
**Affects:** Part A Typography — Sentence Case rule (new)  

**Decision:** Proper nouns canonical list added to Part A Voice  
**Rationale:** Kairos capitalisation was inconsistent. 'Origin Story' had no capitalisation rule. 'PoL' had no canonical expansion documented. A single authoritative list prevents drift.  
**Affects:** Part A Voice — Proper Nouns list (new)  

**Decision:** Genie bubble prohibition added to Part A Voice  
**Rationale:** The spec defined when to use the Genie bubble but not when it must not appear. Violations found: Genie bubbles on PoL screen instructional copy, Draw screen copy. The prohibition is now explicit with named screens.  
**Affects:** Part A Voice — Genie Bubble prohibition (new)  

**Decision:** # symbol prohibited before ordinal member number on ceremony screen  
**Rationale:** '#369' reads as a hashtag (social media) or a reference code. '369' alone reads as a coordinate — which is what it is. The number is the member's position in the human record, not a label.  
**Affects:** Part A Voice — Proper Nouns list · Part B PoL Binding — Bound Screen layout spec  


### Session 17 May 2026 (Brand System v8.2)

**Decision:** Send flow updated from 4 steps to 5: Recipient, Amount, Tag, Confirm, Sent  
**Rationale:** Transfer tags are a primary research instrument in the pilot. A dedicated step gives the tag the weight it deserves and makes it feel like a moment of intention rather than a form field.  
**Affects:** Part B Wallet — Send Flow spec  

**Decision:** 14 transfer tags across 3 semantic groups locked  
**Rationale:** Market and Exchange: Purchase, Commission, Collab, Help. Generosity and Recognition: Gift, Tip, Boost, Donation. Deep Human Presence: Attention, Care, Vouch, Source, Guide, Bridge. Groups inform colour assignment in implementation but do not appear as headers on screen.  
**Affects:** Part B Wallet — Transfer Tags section (new)  

**Decision:** Transaction detail moved from inline row expansion to bottom sheet  
**Rationale:** The slide-up sheet matches the reference app (screenshot provided 16 May 2026). More screen space, cleaner list, matches iOS and Android native patterns for transaction detail.  
**Affects:** Part B Wallet — Transaction Detail section (new)  

**Decision:** Tag lives in transaction detail sheet only, not in activity list row  
**Rationale:** The list row is a scanning surface. Tags add noise to scanning. The detail sheet is a reading surface and the right place for full tag context.  
**Affects:** Part B Wallet — Activity List spec and Transaction Detail spec  

**Decision:** Received transaction colour changed from Moss to Clay throughout wallet  
**Rationale:** Moss is PoL biometric resolution only (three permitted uses, none of which are wallet transactions). Clay is the Earth pole positive colour and the correct semantic choice for received value.  
**Affects:** Part B Wallet — Activity List spec and Insufficient rBTC post-request state  

**Decision:** Insufficient rBTC post-request confirmation uses Signal not Moss  
**Rationale:** Moss prohibition applies. Signal is the correct confirmation colour in non-biometric contexts.  
**Affects:** Part B Wallet — Insufficient rBTC spec  

**Decision:** Sent screen ceremony word updated from Sent to On its way.  
**Rationale:** On its way is present progressive and reflects the truth of the moment. The Kairos is in transit, not yet delivered. Matched to reference screenshot provided 16 May 2026.  
**Affects:** Part B Wallet — Sent Screen spec  

**Decision:** Amount (Kairos) and Amount (Pulses) are separate rows on the Confirm screen  
**Rationale:** Separating them gives Pulses their own presence. They are a distinct unit and deserve to be named explicitly in the confirmation.  
**Affects:** Part B Wallet — Confirm Step spec  

**Decision:** Thousands separator enforced on all Kairos amount displays  
**Rationale:** 1,000 is unambiguous. 1000 is ambiguous at a glance. Members need confidence when reading and confirming amounts.  
**Affects:** Part B Wallet — Kairos Balance Display spec and Amount entry  

**Decision:** Change button on amount screen clears recipient state and returns to empty search  
**Rationale:** Returning with previous name pre-filled was confusing. Empty search is the honest state. Previously selected member remains in the suggestions list.  
**Affects:** Part B Wallet — Recipient Step spec  

**Decision:** Send and receive icons updated to brand-system diagonal arrows  
**Rationale:** Previous icons were generic up/down arrows not in the brand system icon set. Replaced with northeast/southwest diagonal arrows per the locked SVG spec.  
**Affects:** Part B Wallet — Activity List spec  
