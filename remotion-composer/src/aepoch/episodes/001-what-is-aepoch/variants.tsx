// Phase 13B — Episode 001 static reference-frame scene components.
//
// Four genuinely new modules (WelcomeDirectAddress, SyntheticMultiplication,
// HumanConsequence, AepochSeriesOutro) plus four episode-specific Tier 1
// variants whose required settled composition the frozen Tier 1 components
// (../../modules, part of the tagged aepoch-tier1-beta-v0.1.0 baseline)
// cannot express without changing their props or validators:
//
//   - DeclarativeHook "built for another world" / "does not recognize
//     presence" — the frozen DeclarativeHook always renders a HumanNode;
//     Scene 11 requires none at all.
//   - CircularValueField "ancient idea / modern tools" — the frozen
//     component has no rendered connecting path for a balanced relationship.
//   - HumanNetwork "protocol layer" — the frozen component does not render a
//     shared enclosing ring; topology is validation-only, not a visual.
//
// The other three episode-specific Tier 1 variants (traffic-data
// CircularValueField, participant-cohort HumanNetwork, 42-day FlowLifecycle)
// need no new component at all — they reuse the frozen Tier 1 components
// directly with new prop data. See static-previews.tsx.
//
// This is static scaffolding only: components render their settled
// composition directly (no frame-based reveal timelines), consistent with
// Phase 13B's "do not implement full scene animation" scope. `frame`/motion
// helpers are intentionally not wired up yet.

import React from "react";
import {
  AepochMark,
  AepochScene,
  HumanNode,
} from "../../components";
import { AEPOCH_COLORS, AEPOCH_TYPE, AEPOCH_LAYOUT } from "../../tokens";
import { DARK_SCENE_SCALE } from "./tokens";
import {
  BreathRings,
  CometArcPartial,
  EchoCluster,
  ExtractionStrands,
  LegacyStructure,
  LegacyStructureCompact,
  ManufacturedConsensusField,
  ReplicationGrid,
  SignalVesica,
  SymbolicFigure,
  UncertainEcho,
} from "./components";
import type {
  AepochSeriesOutroProps,
  BiologicalTransformerStatementProps,
  CircularValueFieldConnectedPolesProps,
  CircularValueFieldTrafficDataProps,
  ContributionStatementProps,
  DeclarativeHookVariantProps,
  FinalThesisStatementProps,
  FlowLifecyclePathProps,
  HumanConsequenceProps,
  HumanNetworkProtocolLayerProps,
  OneIdeaStatementProps,
  SignalStatementProps,
  SyntheticMultiplicationProps,
  WelcomeDirectAddressProps,
} from "./types";

const captionReserve = (props: { captions?: { enabled?: boolean; reserveBottomPx?: number } }): number =>
  props.captions?.enabled ? props.captions.reserveBottomPx ?? AEPOCH_LAYOUT.captionReserveMin : 0;

// ---------------------------------------------------------------------------
// 1. WelcomeDirectAddress
// ---------------------------------------------------------------------------
export const WelcomeDirectAddress: React.FC<WelcomeDirectAddressProps> = (props) => {
  const posture = props.posture ?? "settled-a";
  // Correction 1 rebuilt SymbolicFigure on a taller 240x720 (1:3) viewBox, so
  // figure sizing here is re-derived from the new aspect ratio rather than
  // the old 260x420 one. figureSize is the SVG's rendered width.
  const figureSize = 260;
  const figureHeight = figureSize * 3;
  const ringWidth = figureSize * 1.7;
  const ringHeight = figureHeight * 1.12;
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 590, top: 150 }}>
        {props.presenceRing ? (
          <div
            style={{
              position: "absolute",
              left: (figureSize - ringWidth) / 2,
              top: (figureHeight - ringHeight) / 2,
              width: ringWidth,
              height: ringHeight,
              borderRadius: "50%",
              border: `1px solid ${AEPOCH_COLORS.sand}`,
              opacity: 0.34,
            }}
          />
        ) : null}
        <SymbolicFigure posture={posture} size={figureSize} />
      </div>
      {props.state === "august9" ? (
        <>
          <div style={{ position: "absolute", right: 150, top: 260, width: 380 }}>
            <CometArcPartial width={380} />
          </div>
          <div
            style={{
              position: "absolute",
              right: 150,
              top: 420,
              fontSize: AEPOCH_TYPE.size.section,
              fontWeight: AEPOCH_TYPE.weight.bold,
              color: AEPOCH_COLORS.inkMid,
              letterSpacing: AEPOCH_TYPE.tracking.label * 0.4,
            }}
          >
            {props.dateLabel ?? "August 9"}
          </div>
        </>
      ) : null}
    </AepochScene>
  );
};

// ---------------------------------------------------------------------------
// 2. SyntheticMultiplication
// ---------------------------------------------------------------------------
export const SyntheticMultiplication: React.FC<SyntheticMultiplicationProps> = (props) => {
  const candidate = props.candidate ?? "a";
  return (
    <AepochScene theme={props.theme ?? "void"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {props.configuration === "mimicry" ? <EchoCluster seed={4201} echoCount={6} /> : null}
        {props.configuration === "multiplication" ? <ReplicationGrid color={AEPOCH_COLORS.pearl} /> : null}
        {props.configuration === "manufactured-consensus" ? <ManufacturedConsensusField candidate={candidate} /> : null}
      </div>
    </AepochScene>
  );
};

// ---------------------------------------------------------------------------
// 3. HumanConsequence — Phase 13B.1 Correction 2 (scale) + Correction 5
// (uncertain reflection replacement) + Correction 6 (extraction destination
// and strand count).
// ---------------------------------------------------------------------------
export const HumanConsequence: React.FC<HumanConsequenceProps> = (props) => (
  <AepochScene theme={props.theme ?? "void"} captionReservePx={captionReserve(props)}>
    {/* Correction 2: figure enlarged from the Phase 13B baseline (which used
        the old, stubbier SymbolicFigure at size 260) — this size, on the
        Correction 1 figure's new proportions, reads as a clearly dominant,
        editorial-scale presence rather than a small symbol in empty space. */}
    <div style={{ position: "absolute", left: 220, top: 280 }}>
      <SymbolicFigure size={195} color={AEPOCH_COLORS.clay} />
    </div>
    {props.state === "uncertain-reflection" ? (
      <div style={{ position: "absolute", left: 760, top: 190 }}>
        <UncertainEcho size={430} />
      </div>
    ) : null}
    {props.state === "extraction" ? (
      <>
        {/* Correction 6: destination is now visually related to the Scene
            11/12 legacy-system family, not a generic labeled grid. */}
        <div style={{ position: "absolute", left: 1210, top: 360 }}>
          <LegacyStructureCompact width={440} />
        </div>
        <svg style={{ position: "absolute", inset: 0 }} viewBox="0 0 1920 1080" aria-hidden>
          <ExtractionStrands x1={430} y1={560} x2={1205} y2={560} count={3} />
        </svg>
      </>
    ) : null}
  </AepochScene>
);

// ---------------------------------------------------------------------------
// 4. AepochSeriesOutro — Phase 13B.1 Correction 9: mark and identifier
// enlarged for phone-scale legibility (64px mark -> 96px; 24px identifier
// -> 32px with wider tracking). Composition, negative space, and copy are
// otherwise unchanged.
// ---------------------------------------------------------------------------
export const AepochSeriesOutro: React.FC<AepochSeriesOutroProps> = (props) => (
  <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={0}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 320, textAlign: "center" }}>
      <div
        style={{
          fontSize: 68,
          fontWeight: AEPOCH_TYPE.weight.heavy,
          letterSpacing: AEPOCH_TYPE.tracking.tight,
          lineHeight: AEPOCH_TYPE.lineHeight.headline,
        }}
      >
        {props.conclusion}
      </div>
      <div style={{ marginTop: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <AepochMark width={96} />
        <div style={{ fontSize: 32, fontWeight: AEPOCH_TYPE.weight.semibold, letterSpacing: AEPOCH_TYPE.tracking.label * 1.4, color: AEPOCH_COLORS.inkMid }}>
          {props.identifier ?? "ÆPOCH"}
        </div>
      </div>
    </div>
  </AepochScene>
);

// ---------------------------------------------------------------------------
// 9. FlowLifecyclePathVariant — Phase 13B.1 Correction 8 full replacement
// of the 42-day test's four-card layout. A single Comet-Arc-family curve
// (same Iris color, same 3px baseline stroke, same restrained rounded-cap
// style as CometArcPartial in the Welcome/August 9 scenes, so this scene
// visually "completes" what that partial arc foreshadowed) carries four
// waypoint markers, one per locked label. No cards, no bordered containers,
// no dashboard/onboarding appearance. This intentionally does NOT reskin the
// frozen FlowLifecycle component (../../modules) — it's a distinct local
// component, since the frozen component's whole layout is card-based.
// ---------------------------------------------------------------------------
const PATH_P0 = { x: 140, y: 820 };
const PATH_P1 = { x: 960, y: 80 };
const PATH_P2 = { x: 1820, y: 480 };

const quadraticPoint = (t: number, p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }) => ({
  x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x,
  y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y,
});

const PATH_WAYPOINT_T = [0.08, 0.38, 0.64, 0.9] as const;

// Phase 13B.2 Scene 18 fix: labels enlarged (30px -> 36px) and widened
// (300px -> 340px) for phone readability. Two clearance problems from
// 13B.1's blanket offset rule are fixed with explicit per-waypoint layout
// instead of a formula: waypoint 0 sat too close to its dot (its offset
// wasn't enough clearance so close to the frame's bottom-left), and
// waypoint 3's centered-on-point label ran past the right safe margin
// (point 3 sits far right on the arc, at x=1648, so centering a 340px-wide
// label on it pushed 18px past the 1800px safe boundary). Waypoints 0 and
// 3 now anchor to a fixed left position instead of centering on the point.
const PATH_LABEL_LAYOUT: Record<number, { left: number | null; dy: number }> = {
  0: { left: 140, dy: -170 },
  1: { left: null, dy: 40 },
  2: { left: null, dy: -118 },
  3: { left: 1460, dy: 40 },
};

export const FlowLifecyclePathVariant: React.FC<FlowLifecyclePathProps> = (props) => {
  const points = PATH_WAYPOINT_T.map((t) => quadraticPoint(t, PATH_P0, PATH_P1, PATH_P2));
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      {props.headline ? (
        <div style={{ position: "absolute", left: 0, top: 60, fontSize: 62, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: -2.4 }}>
          {props.headline}
        </div>
      ) : null}
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <path
          d={`M${PATH_P0.x} ${PATH_P0.y} Q${PATH_P1.x} ${PATH_P1.y} ${PATH_P2.x} ${PATH_P2.y}`}
          fill="none"
          stroke={AEPOCH_COLORS.iris}
          strokeWidth={AEPOCH_LAYOUT.baselineStroke}
          strokeLinecap="round"
          opacity={0.62}
        />
        {points.map((point, index) => {
          const step = props.steps[index];
          const color = step.pole === "earth" ? AEPOCH_COLORS.clay : step.pole === "cosmos" ? AEPOCH_COLORS.iris : AEPOCH_COLORS.prism;
          return <circle key={step.id} cx={point.x} cy={point.y} r={12} fill={color} />;
        })}
      </svg>
      {points.map((point, index) => {
        const step = props.steps[index];
        const layout = PATH_LABEL_LAYOUT[index];
        return (
          <div
            key={step.id}
            style={{
              position: "absolute",
              left: layout.left ?? point.x - 170,
              top: point.y + layout.dy,
              width: 340,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: AEPOCH_TYPE.weight.bold, lineHeight: 1.15 }}>{step.label}</div>
          </div>
        );
      })}
    </AepochScene>
  );
};

// ---------------------------------------------------------------------------
// Phase 13B.2 — five episode-specific "statement moment" compositions
// replacing the frozen KeyStatement reuse for Scenes 13, 15, 17, 20, 21.
// Each uses a deliberately different spatial arrangement so no two of these
// (or Scene 3's baseline KeyStatement layout) share a macro-layout:
//   Scene 3  (baseline, frozen KeyStatement) — left text / upper-right pale
//            Cosmos circle+Comet Arc / small human beneath.
//   Scene 13 (Signal)       — dead-center vertical stack: vesica, then text.
//   Scene 15 (Contribution) — horizontal relationship: human+ring left,
//            text at the same vertical band to its right.
//   Scene 17 (One idea)     — sparse: one point+line, text nearby, vast
//            surrounding negative space.
//   Scene 20 (Final thesis) — asymmetric two-zone: text left, warm
//            field-with-integrated-human right (no arc).
//   Scene 21 (Biological transformer) — off-center intimate vertical stack:
//            human+breath rings left-of-center, text below, left-aligned.
// ---------------------------------------------------------------------------

// Scene 13 — the episode's one and only Signal moment. Dead-center,
// symmetric, formal: the strongest central composition in the episode.
export const SignalStatement: React.FC<SignalStatementProps> = (props) => (
  <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
    <div style={{ position: "absolute", left: 680, top: 140 }}>
      <SignalVesica size={560} />
    </div>
    <div style={{ position: "absolute", left: 360, top: 780, width: 1200, textAlign: "center" }}>
      <div style={{ fontSize: 68, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight }}>{props.statement}</div>
    </div>
  </AepochScene>
);

// Scene 15 — human recognition. Horizontal relationship (not a vertical
// stack): the human and ring sit left-of-center, the statement sits at the
// same vertical band to its right — "in relationship," not stacked above.
export const ContributionStatement: React.FC<ContributionStatementProps> = (props) => {
  const figureSize = 128;
  const figureHeight = figureSize * 3;
  const ringWidth = figureSize * 2.15;
  const ringHeight = figureHeight * 1.05;
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 180, top: 195 }}>
        <div
          style={{
            position: "absolute",
            left: (figureSize - ringWidth) / 2,
            top: (figureHeight - ringHeight) / 2,
            width: ringWidth,
            height: ringHeight,
            borderRadius: "50%",
            border: `2px solid ${AEPOCH_COLORS.sand}`,
            background: "radial-gradient(circle at 50% 45%, rgba(232,201,160,0.20), rgba(196,131,90,0.04) 70%, rgba(196,131,90,0.01))",
            opacity: 0.85,
          }}
        />
        <SymbolicFigure size={figureSize} color={AEPOCH_COLORS.clay} />
      </div>
      <div style={{ position: "absolute", left: 800, top: 430, width: 760 }}>
        <div style={{ fontSize: 62, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight, lineHeight: 1.08 }}>
          {props.statement}
        </div>
      </div>
    </AepochScene>
  );
};

// Scene 17 — radical conceptual reduction. One point, one restrained line,
// generous negative space; text stays small and close to the point rather
// than commanding its own large typographic block.
export const OneIdeaStatement: React.FC<OneIdeaStatementProps> = (props) => (
  <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
    <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }} aria-hidden>
      <circle cx="620" cy="520" r="14" fill={AEPOCH_COLORS.prism} />
      <path d="M634 520 H1180" stroke={AEPOCH_COLORS.prism} strokeWidth={2} opacity={0.45} />
    </svg>
    <div style={{ position: "absolute", left: 560, top: 580, width: 540 }}>
      <div style={{ fontSize: 56, fontWeight: AEPOCH_TYPE.weight.heavy, lineHeight: 1.12 }}>{props.headline}</div>
      {props.supportingLine ? (
        <div style={{ marginTop: 18, fontSize: 30, color: AEPOCH_COLORS.inkMid }}>{props.supportingLine}</div>
      ) : null}
    </div>
  </AepochScene>
);

// Scene 20 — the thesis landing. Asymmetric two-zone (text left, a stable
// warm presence field with the human integrated inside it, right) — more
// visually substantial than Scene 17's single point, with no Comet Arc.
export const FinalThesisStatement: React.FC<FinalThesisStatementProps> = (props) => (
  <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
    <div style={{ position: "absolute", left: 130, top: 260, width: 760 }}>
      <div style={{ fontSize: 64, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight, lineHeight: 1.08 }}>
        {props.headline}
      </div>
      <div style={{ marginTop: 30, fontSize: 34, color: AEPOCH_COLORS.inkMid, lineHeight: 1.32 }}>{props.supportingLine}</div>
    </div>
    <div style={{ position: "absolute", right: 190, top: 220 }}>
      <div
        style={{
          position: "relative",
          width: 480,
          height: 480,
          borderRadius: "50%",
          border: `3px solid ${AEPOCH_COLORS.sand}`,
          background: "radial-gradient(circle at 48% 45%, rgba(232,201,160,0.36), rgba(196,131,90,0.10) 62%, rgba(196,131,90,0.02))",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <div style={{ marginBottom: 34 }}>
          <SymbolicFigure size={104} color={AEPOCH_COLORS.clay} />
        </div>
      </div>
    </div>
  </AepochScene>
);

// Scene 21 — intimate, embodied, slightly playful. Off-center vertical
// stack (deliberately not dead-center like Scene 13's formal Signal
// moment): human + restrained breath rings, text below and left-aligned to
// the figure rather than centered across the full frame.
export const BiologicalTransformerStatement: React.FC<BiologicalTransformerStatementProps> = (props) => {
  const figureSize = 150;
  const figureHeight = figureSize * 3;
  const ringSize = 640;
  // Rings centered exactly on the figure's own bounding-box center, so the
  // breath halo reads as surrounding the body, not offset from it.
  const ringLeft = figureSize / 2 - ringSize / 2;
  const ringTop = figureHeight / 2 - ringSize / 2;
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 520, top: 110 }}>
        <div style={{ position: "absolute", left: ringLeft, top: ringTop }}>
          <BreathRings size={ringSize} />
        </div>
        <SymbolicFigure size={figureSize} color={AEPOCH_COLORS.clay} posture="settled-b" />
      </div>
      <div style={{ position: "absolute", left: 380, top: 700, width: 1000 }}>
        <div style={{ fontSize: 58, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight }}>{props.statement}</div>
      </div>
    </AepochScene>
  );
};

// ---------------------------------------------------------------------------
// 5/6. DeclarativeHook variants — "built for another world" /
// "does not recognize presence". Unchanged by Phase 13B.1 (not in the
// correction list); `LegacyStructure` now lives in components.tsx so
// HumanConsequence's Extraction destination (Correction 6) can reuse the
// same visual family.
// ---------------------------------------------------------------------------
export const DeclarativeHookVariant: React.FC<DeclarativeHookVariantProps> = (props) => (
  <AepochScene theme={props.theme ?? "depth"} captionReservePx={captionReserve(props)}>
    <div style={{ position: "absolute", left: 0, top: 175, width: 1000 }}>
      {props.eyebrow ? (
        <div style={{ fontSize: AEPOCH_TYPE.size.eyebrow, marginBottom: 26, color: AEPOCH_COLORS.muted }}>{props.eyebrow}</div>
      ) : null}
      <div style={{ fontSize: 88, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight, lineHeight: AEPOCH_TYPE.lineHeight.hero }}>
        {props.lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
    </div>
    <LegacyStructure withBoundaryGap={props.variant === "does-not-recognize-presence"} />
    {props.variant === "does-not-recognize-presence" ? (
      // Quiet and unacknowledged, not broken: "present" (not "inactive", whose
      // dashed ring reads as network-offline) at reduced opacity and no edge
      // connecting it to the system geometry.
      <div style={{ position: "absolute", left: 895, top: 660, opacity: 0.8 }}>
        <HumanNode size={78} state="present" />
      </div>
    ) : null}
  </AepochScene>
);

// ---------------------------------------------------------------------------
// 7. CircularValueField "traffic data" — Phase 13B.1 Correction 7. The
// frozen CircularValueField (../../modules) never renders `field.value` at
// all, only label/sublabel, so it can't deliver "strong numeric hierarchy /
// tabular numerals" on its own — this episode-specific variant reuses the
// circular-pole visual grammar but puts the percentage itself, in tabular
// numerals, inside each field.
//
// Correction 7 fixes: the projected field now reads "90%+" (not a bare
// "90%", which understated "could climb past"); the small duplicate italic
// sentence that repeated both stats at the bottom is removed entirely — the
// approved wording ("53% automated." / "Could climb past 90%.") now appears
// exactly once each, as each field's own primary label, sized to read
// clearly at phone scale; and the two fields are visually distinguished as
// current-observation (solid ring, solid fill) vs. future-projection
// (dashed ring, lighter fill, an "Estimated" eyebrow tag).
// ---------------------------------------------------------------------------
// Reads top-to-bottom as one sentence: eyebrow tag, then either the label
// (when it precedes the number, e.g. "Could climb past") above the circle
// or below it (e.g. "Automated." following "53%"), so each field reproduces
// its exact approved sentence in natural reading order — once, not twice.
const TrafficDataField: React.FC<{
  value: string;
  eyebrow: string;
  labelAbove?: string;
  labelBelow?: string;
  projected?: boolean;
}> = ({ value, eyebrow, labelAbove, labelBelow, projected = false }) => (
  <div style={{ textAlign: "center" }}>
    <div
      style={{
        fontSize: 22,
        fontWeight: AEPOCH_TYPE.weight.bold,
        letterSpacing: AEPOCH_TYPE.tracking.label,
        textTransform: "uppercase",
        color: AEPOCH_COLORS.muted,
        marginBottom: 14,
      }}
    >
      {eyebrow}
    </div>
    {labelAbove ? (
      <div style={{ marginBottom: 18, fontSize: 32, fontWeight: AEPOCH_TYPE.weight.semibold, color: AEPOCH_COLORS.inkMid }}>{labelAbove}</div>
    ) : null}
    <div
      style={{
        width: 320,
        height: 320,
        borderRadius: "50%",
        border: `3px ${projected ? "dashed" : "solid"} ${AEPOCH_COLORS.iris}`,
        background: projected
          ? "radial-gradient(circle at 45% 45%, rgba(214,228,240,0.24), rgba(184,169,217,0.05) 60%, rgba(184,169,217,0.01))"
          : "radial-gradient(circle at 45% 45%, rgba(214,228,240,0.42), rgba(184,169,217,0.10) 60%, rgba(184,169,217,0.02))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 100,
          fontWeight: AEPOCH_TYPE.weight.heavy,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: AEPOCH_TYPE.tracking.tight,
          color: AEPOCH_COLORS.ink,
        }}
      >
        {value}
      </div>
    </div>
    {labelBelow ? (
      <div style={{ marginTop: 26, fontSize: 32, fontWeight: AEPOCH_TYPE.weight.semibold, color: AEPOCH_COLORS.inkMid }}>{labelBelow}</div>
    ) : null}
  </div>
);

export const CircularValueFieldTrafficData: React.FC<CircularValueFieldTrafficDataProps> = (props) => (
  <AepochScene theme={props.theme ?? "paper"} captionReservePx={captionReserve(props)}>
    <div style={{ position: "absolute", top: 155, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 140 }}>
      {/* "53%" then "Automated." below — reads as "53% Automated." */}
      <TrafficDataField value={props.automatedValue} eyebrow="Today" labelBelow={props.automatedLabel} />
      {/* "Could climb past" above then "90%+" — reads as "Could climb past 90%+" */}
      <TrafficDataField value={props.projectedValue} eyebrow="Estimated" labelAbove={props.projectedLabel} projected />
    </div>
  </AepochScene>
);

// ---------------------------------------------------------------------------
// 7b. CircularValueField "ancient idea / modern tools" — connected, not
// converging poles.
// ---------------------------------------------------------------------------
const Pole: React.FC<{ pole: "earth" | "cosmos"; label: string }> = ({ pole, label }) => (
  <div style={{ textAlign: "center" }}>
    <div
      style={{
        width: 300,
        height: 300,
        borderRadius: "50%",
        border: `3px solid ${pole === "earth" ? AEPOCH_COLORS.sand : AEPOCH_COLORS.pearl}`,
        background:
          pole === "earth"
            ? "radial-gradient(circle at 52% 45%, rgba(232,201,160,0.38), rgba(196,131,90,0.10) 60%, rgba(196,131,90,0.02))"
            : "radial-gradient(circle at 45% 45%, rgba(214,228,240,0.46), rgba(184,169,217,0.12) 60%, rgba(184,169,217,0.02))",
      }}
    />
    <div style={{ marginTop: 24, fontSize: AEPOCH_TYPE.size.diagram, color: AEPOCH_COLORS.inkMid }}>{label}</div>
  </div>
);

export const CircularValueFieldConnectedPoles: React.FC<CircularValueFieldConnectedPolesProps> = (props) => {
  const candidate = props.candidate ?? "a";
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", top: 210, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 220 }}>
        <Pole pole="earth" label={props.leftLabel} />
        <Pole pole="cosmos" label={props.rightLabel} />
      </div>
      <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0 }} aria-hidden>
        {candidate === "a" ? (
          <path d="M690 358H990" stroke={AEPOCH_COLORS.iris} strokeWidth={3} opacity={0.55} />
        ) : (
          <path d="M690 358 Q840 330 990 358" fill="none" stroke={AEPOCH_COLORS.iris} strokeWidth={3} opacity={0.55} />
        )}
      </svg>
      {props.footer ? (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 90, textAlign: "center", fontSize: 32, fontStyle: "italic", color: AEPOCH_COLORS.inkMid }}>
          {props.footer}
        </div>
      ) : null}
    </AepochScene>
  );
};

// ---------------------------------------------------------------------------
// 8. HumanNetwork "protocol layer" — distinct human nodes sharing one ring.
// ---------------------------------------------------------------------------
export const HumanNetworkProtocolLayer: React.FC<HumanNetworkProtocolLayerProps> = (props) => {
  const candidate = props.candidate ?? "a";
  const count = props.nodeCount ?? 7;
  const ringRadius = candidate === "a" ? 300 : 330;
  const center = { x: 1375, y: 470 };
  const positions = Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    const jitter = candidate === "a" ? 0 : (index % 2 === 0 ? -26 : 22);
    return {
      x: center.x + Math.cos(angle) * (ringRadius + jitter),
      y: center.y + Math.sin(angle) * (ringRadius + jitter) * 0.82,
    };
  });
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 260, width: 620 }}>
        <div style={{ fontSize: 78, fontWeight: AEPOCH_TYPE.weight.heavy, lineHeight: 1.04, letterSpacing: -2.8 }}>
          {(props.headline ?? "A layer for the internet.").split("\n").map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
        {props.supportingLine ? (
          <div style={{ marginTop: 24, fontSize: 30, color: AEPOCH_COLORS.muted }}>{props.supportingLine}</div>
        ) : null}
      </div>
      <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <ellipse cx={center.x} cy={center.y} rx={ringRadius + 68} ry={(ringRadius + 68) * 0.82} fill="none" stroke={AEPOCH_COLORS.prism} strokeWidth={3} opacity={0.5} />
      </svg>
      {positions.map((pos, index) => (
        <div key={index} style={{ position: "absolute", left: pos.x - 44, top: pos.y - 44 }}>
          <HumanNode size={88} state={index % 3 === 0 ? "active" : "present"} />
        </div>
      ))}
    </AepochScene>
  );
};
