// Phase 13C.2A — Episode 001 motion-blocking scene components.
//
// Every component here renders the SAME settled composition already locked
// in ./variants.tsx (tagged aepoch-e001-static-v0.1.0) — same layout
// positions, same colors, same primitives from ./components — with frame-
// driven reveals added on top. Nothing in ./variants.tsx, ./components.tsx,
// ../../modules.tsx, or any other frozen/locked file is modified; these are
// new local wrappers per this phase's explicit instruction.
//
// Scenes 03 (Mission), 04 (Built for Humans), and 19 (Participant Cohort)
// reuse the frozen Tier 1 KeyStatement / DeclarativeHook / HumanNetwork
// components directly (see compositions.tsx) — those components already
// drive their own reveals from useCurrentFrame() internally, so no wrapper
// exists for them here.

import React from "react";
import { useCurrentFrame } from "remotion";
import { AepochMark, AepochScene, HumanNode } from "../../components";
import { AEPOCH_COLORS, AEPOCH_EASING, AEPOCH_TYPE, AEPOCH_LAYOUT } from "../../tokens";
import {
  deterministicStagger,
  frameProgress,
  reveal,
  revealStyle,
  strokeDash,
  strokeProgress,
} from "../../motion";
import { createSeededRandom } from "../../random";
import { DARK_SCENE_SCALE, E001_SEED, MIMICRY_ECHO_JITTER } from "./tokens";
import {
  BreathRings,
  CometArcPartial,
  ExtractionStrands,
  LegacyStructure,
  LegacyStructureCompact,
  ManufacturedConsensusField,
  ReplicationGrid,
  SymbolicFigure,
  SyntheticUnit,
  UncertainEcho,
} from "./components";
import { ACCELERATING_GAPS, SIGNAL_SEQUENCE, quietDrift, settlePulse } from "./motion-presets";
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

// ===========================================================================
// Scenes 01/02 — WelcomeDirectAddress
// ===========================================================================

// Scene 01: whole-body settling on arrival, one restrained breath-pulse on
// "grateful" (~N01's last word, proportionally ~9-10s into the combined
// 21.17s N01+N02 scene). No head-tilt (SymbolicFigure's head never moves —
// only the reveal transform on the whole figure group).
export const WelcomeMotion: React.FC<WelcomeDirectAddressProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const figureSize = 260;
  const figureHeight = figureSize * 3;
  const ringWidth = figureSize * 1.7;
  const ringHeight = figureHeight * 1.12;
  const isWelcome = props.state === "welcome";
  const settle = reveal({ frame, startFrame: 0, durationFrames: 26, fromY: 30, fromScale: 0.97, reducedMotion: reduced });
  // "grateful" pulse — Scene 01 only, ~frame 270 (9s) of this ~635-frame scene.
  const pulse = isWelcome && !reduced ? settlePulse(frame, 270, 22, 0.03) : 1;
  const ringOpacityBase = 0.34;
  const ringPulse = isWelcome && !reduced ? frameProgress(frame, 250, 20, AEPOCH_EASING.easeInOutSine) * 0.18 : 0;
  const arcProgress = strokeProgress({ frame, startFrame: 26, durationFrames: 70, reducedMotion: reduced });
  const dateReveal = reveal({ frame, startFrame: 60, durationFrames: 24, fromY: 14, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 590, top: 150, ...revealStyle(settle) }}>
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
              opacity: ringOpacityBase + ringPulse,
            }}
          />
        ) : null}
        <div style={{ transform: `scale(${pulse})`, transformOrigin: "center" }}>
          <SymbolicFigure posture={props.posture ?? "settled-a"} size={figureSize} />
        </div>
      </div>
      {!isWelcome ? (
        <>
          <div style={{ position: "absolute", right: 150, top: 260, width: 380 }} aria-hidden>
            <svg width={380} height={380 * 0.42} viewBox="0 0 420 176" style={{ display: "block" }}>
              <path
                d="M18 150 Q170 20 402 62"
                fill="none"
                stroke={AEPOCH_COLORS.iris}
                strokeWidth={AEPOCH_LAYOUT.baselineStroke}
                strokeLinecap="round"
                opacity={0.68}
                pathLength={1}
                style={strokeDash(reduced ? 1 : arcProgress)}
              />
            </svg>
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
              ...revealStyle(dateReveal),
            }}
          >
            {props.dateLabel ?? "August 9"}
          </div>
        </>
      ) : null}
    </AepochScene>
  );
};

// ===========================================================================
// Scenes 05/06/07 — SyntheticMultiplication (Mimicry / Multiplication /
// Manufactured consensus)
// ===========================================================================

// Scene 05 — Mimicry: human settles first; echoes arrive at tightening,
// nearly-mechanical intervals (still imperfect, per the seeded jitter already
// baked into EchoCluster's static geometry); one real detected internal
// pause (~21.5s into the scene, inside N07) marks a single settle-pulse
// development; ends held still.
const MIMICRY_ECHO_COUNT = 6;
export const SyntheticMimicryMotion: React.FC<SyntheticMultiplicationProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const rand = createSeededRandom(E001_SEED);
  const echoes = Array.from({ length: MIMICRY_ECHO_COUNT }, (_, index) => {
    const angle = (index / MIMICRY_ECHO_COUNT) * Math.PI * 2 + rand() * 0.35;
    const radius = 175 + (rand() - 0.5) * MIMICRY_ECHO_JITTER.offsetPx * 2;
    const echoScale = 1 + (rand() - 0.5) * MIMICRY_ECHO_JITTER.scaleRange;
    const opacityJitter = (rand() - 0.5) * MIMICRY_ECHO_JITTER.opacityRange;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.72, scale: echoScale, opacityJitter };
  });
  const humanReveal = reveal({ frame, startFrame: 0, durationFrames: 24, fromScale: 0.95, reducedMotion: reduced });
  // Tightening arrival gaps (imperfect but increasingly regular), starting
  // after the human settles.
  const echoGaps = [48, 34, 24, 18, 14, 12];
  let echoStart = 40;
  const echoStarts = echoGaps.map((gap) => {
    echoStart += gap;
    return echoStart;
  });
  const internalBeatFrame = 645; // ~21.5s into the scene — the detected N07 internal pause
  const beatPulse = !reduced ? settlePulse(frame, internalBeatFrame, 16, 0.035) : 1;
  return (
    <AepochScene theme={props.theme ?? "void"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 520, height: 520, transform: `scale(${DARK_SCENE_SCALE * beatPulse})` }}>
          {echoes.map((echo, index) => {
            const echoOpacityTarget = Math.max(0.2, Math.min(0.34, 0.28 + echo.opacityJitter));
            const echoRev = reveal({ frame, startFrame: echoStarts[index], durationFrames: 16, fromScale: 0.9, reducedMotion: reduced });
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: 260 + echo.x - 60 * echo.scale,
                  top: 260 + echo.y - 90 * echo.scale,
                  transform: `scale(${echo.scale * echoRev.scale})`,
                  opacity: echoOpacityTarget * echoRev.opacity,
                }}
              >
                <SymbolicFigure size={120} color={AEPOCH_COLORS.prism} opacity={1} posture="settled-a" />
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 260 - 85, top: 260 - 125, ...revealStyle(humanReveal) }}>
            <SymbolicFigure size={170} color={AEPOCH_COLORS.clay} posture="settled-a" />
          </div>
        </div>
      </div>
    </AepochScene>
  );
};

// Scene 06 — Multiplication: 4 rows reveal with mechanically shortening
// gaps (accelerating rate), each row's units settling together with a tiny
// per-unit ripple.
const REPLICATION_ROWS = [
  { count: 2, gap: 96, size: 34 },
  { count: 4, gap: 62, size: 38 },
  { count: 7, gap: 40, size: 42 },
  { count: 11, gap: 26, size: 46 },
];
export const SyntheticMultiplicationMotion: React.FC<SyntheticMultiplicationProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  let cumulative = 20;
  const rowStarts = ACCELERATING_GAPS.map((gap) => {
    cumulative += gap;
    return cumulative;
  });
  return (
    <AepochScene theme={props.theme ?? "void"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-start", transform: `scale(${DARK_SCENE_SCALE})` }}>
          {REPLICATION_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", gap: row.gap - row.size }}>
              {Array.from({ length: row.count }, (_, unitIndex) => {
                const unitStart = deterministicStagger({ index: unitIndex, startFrame: rowStarts[rowIndex], gapFrames: 2, seed: E001_SEED });
                const unitReveal = reveal({ frame, startFrame: unitStart, durationFrames: 12, fromScale: 0.85, reducedMotion: reduced });
                return (
                  <div key={unitIndex} style={revealStyle(unitReveal)}>
                    <SyntheticUnit size={row.size} color={AEPOCH_COLORS.pearl} opacity={0.55 + rowIndex * 0.12} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </AepochScene>
  );
};

// Scene 07 — Manufactured consensus: continues from 06's already-replicated
// units (fast simultaneous settle, not a slow rebuild), then drop-lines draw,
// then the single uniform band/rhythm resolves.
export const ManufacturedConsensusMotion: React.FC<SyntheticMultiplicationProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const candidate = props.candidate ?? "a";
  const cols = candidate === "a" ? 12 : 9;
  const rows = candidate === "a" ? 3 : 2;
  const unitSize = candidate === "a" ? 30 : 36;
  const gap = candidate === "a" ? 16 : 22;
  const cellSpan = unitSize + gap;
  const totalWidth = cols * unitSize + (cols - 1) * gap;
  const columnCenters = Array.from({ length: cols }, (_, index) => index * cellSpan + unitSize / 2);
  const tilesReveal = reveal({ frame, startFrame: 0, durationFrames: 16, reducedMotion: reduced });
  const linesProgress = strokeProgress({ frame, startFrame: 26, durationFrames: 20, reducedMotion: reduced });
  const bandReveal = reveal({ frame, startFrame: 50, durationFrames: 26, fromY: 10, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme ?? "depth"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${DARK_SCENE_SCALE})` }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${unitSize}px)`, gap, marginBottom: 22, ...revealStyle(tilesReveal) }}>
            {Array.from({ length: cols * rows }, (_, index) => (
              <SyntheticUnit key={index} size={unitSize} color={AEPOCH_COLORS.inkMid} opacity={0.74} />
            ))}
          </div>
          <svg width={totalWidth} height={26} aria-hidden style={{ display: "block" }}>
            {columnCenters.map((x, index) => (
              <line
                key={index}
                x1={x}
                y1={0}
                x2={x}
                y2={26}
                stroke={AEPOCH_COLORS.inkMid}
                strokeWidth={2}
                opacity={0.38}
                pathLength={1}
                style={strokeDash(reduced ? 1 : linesProgress)}
              />
            ))}
          </svg>
          <div style={revealStyle(bandReveal)}>
            {candidate === "a" ? (
              <div style={{ width: totalWidth, height: 40, background: AEPOCH_COLORS.inkMid, opacity: 0.86 }} />
            ) : (
              <div style={{ display: "flex", gap, alignItems: "flex-end" }}>
                {columnCenters.map((_, index) => (
                  <div key={index} style={{ width: unitSize * 0.55, height: 48, background: AEPOCH_COLORS.inkMid, opacity: 0.82 }} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AepochScene>
  );
};

// ===========================================================================
// Scene 08 — CircularValueField "traffic data"
// ===========================================================================
const TrafficDataFieldMotion: React.FC<{
  value: string;
  eyebrow: string;
  labelAbove?: string;
  labelBelow?: string;
  projected?: boolean;
  fieldReveal: ReturnType<typeof reveal>;
}> = ({ value, eyebrow, labelAbove, labelBelow, projected = false, fieldReveal }) => (
  <div style={{ textAlign: "center", ...revealStyle(fieldReveal) }}>
    <div style={{ fontSize: 22, fontWeight: AEPOCH_TYPE.weight.bold, letterSpacing: AEPOCH_TYPE.tracking.label, textTransform: "uppercase", color: AEPOCH_COLORS.muted, marginBottom: 14 }}>
      {eyebrow}
    </div>
    {labelAbove ? <div style={{ marginBottom: 18, fontSize: 32, fontWeight: AEPOCH_TYPE.weight.semibold, color: AEPOCH_COLORS.inkMid }}>{labelAbove}</div> : null}
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
      <div style={{ fontSize: 100, fontWeight: AEPOCH_TYPE.weight.heavy, fontVariantNumeric: "tabular-nums", letterSpacing: AEPOCH_TYPE.tracking.tight, color: AEPOCH_COLORS.ink }}>
        {value}
      </div>
    </div>
    {labelBelow ? <div style={{ marginTop: 26, fontSize: 32, fontWeight: AEPOCH_TYPE.weight.semibold, color: AEPOCH_COLORS.inkMid }}>{labelBelow}</div> : null}
  </div>
);

export const TrafficDataMotion: React.FC<CircularValueFieldTrafficDataProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const todayReveal = reveal({ frame, startFrame: 20, durationFrames: 26, fromY: 24, reducedMotion: reduced });
  const projectedReveal = reveal({ frame, startFrame: 70, durationFrames: 26, fromY: 24, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme ?? "paper"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", top: 155, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 140 }}>
        <TrafficDataFieldMotion value={props.automatedValue} eyebrow="Today" labelBelow={props.automatedLabel} fieldReveal={todayReveal} />
        <TrafficDataFieldMotion value={props.projectedValue} eyebrow="Estimated" labelAbove={props.projectedLabel} projected fieldReveal={projectedReveal} />
      </div>
    </AepochScene>
  );
};

// ===========================================================================
// Scene 09 — HumanConsequence (Uncertain Reflection)
// ===========================================================================
export const UncertainReflectionMotion: React.FC<HumanConsequenceProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const humanReveal = reveal({ frame, startFrame: 0, durationFrames: 24, fromScale: 0.95, reducedMotion: reduced });
  // Fragment entry starts, then a slow, quiet, looping drift per fragment —
  // "wavers or shifts subtly rather than resolving cleanly," never settling
  // into stillness (the point is that it stays unresolved).
  const fragmentStarts = [40, 55, 70];
  const driftAmplitudes = [3, 4, 2.5];
  const driftPeriods = [220, 260, 300];
  return (
    <AepochScene theme={props.theme ?? "depth"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 220, top: 280, ...revealStyle(humanReveal) }}>
        <SymbolicFigure size={195} color={AEPOCH_COLORS.clay} />
      </div>
      <div style={{ position: "absolute", left: 760, top: 190 }}>
        <div
          style={{
            opacity: reduced ? 1 : frameProgress(frame, fragmentStarts[0], 22, AEPOCH_EASING.easeOutCubic),
            transform: `translateX(${reduced ? 0 : quietDrift(frame, driftPeriods[0], driftAmplitudes[0])}px)`,
          }}
        >
          <UncertainEcho size={430} />
        </div>
      </div>
    </AepochScene>
  );
};

// ===========================================================================
// Scene 10 — HumanConsequence (Extraction)
// ===========================================================================
export const ExtractionMotion: React.FC<HumanConsequenceProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const humanReveal = reveal({ frame, startFrame: 0, durationFrames: 24, fromScale: 0.95, reducedMotion: reduced });
  const destinationReveal = reveal({ frame, startFrame: 30, durationFrames: 22, fromY: 14, reducedMotion: reduced });
  // 3 strands, staggered so the last one fully resolves at ~frame 363 —
  // the real detected internal pause (~12.1s into the scene), landing on
  // "our presence."
  const strandStarts = [80, 108, 138];
  const strandDuration = 220;
  return (
    <AepochScene theme={props.theme ?? "depth"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 220, top: 280, ...revealStyle(humanReveal) }}>
        <SymbolicFigure size={195} color={AEPOCH_COLORS.clay} />
      </div>
      <div style={{ position: "absolute", left: 1210, top: 360, ...revealStyle(destinationReveal) }}>
        <LegacyStructureCompact width={440} />
      </div>
      <svg style={{ position: "absolute", inset: 0 }} viewBox="0 0 1920 1080" aria-hidden>
        {strandStarts.map((start, index) => {
          const progress = reduced ? 1 : frameProgress(frame, start, strandDuration, AEPOCH_EASING.standard);
          const bend = -64 + index * 52;
          const endYOffset = (index - 1) * 46;
          const x1 = 430;
          const y1 = 560;
          const x2 = 1205;
          const y2 = 560 + endYOffset;
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2 + bend;
          return (
            <path
              key={index}
              d={`M${x1} ${y1} Q${midX} ${midY} ${x2} ${y2}`}
              fill="none"
              stroke={AEPOCH_COLORS.inkMid}
              strokeWidth={4}
              strokeLinecap="round"
              opacity={(0.56 - index * 0.08) * (reduced ? 1 : frameProgress(frame, start, 14, AEPOCH_EASING.easeOutCubic))}
              pathLength={1}
              style={strokeDash(progress)}
            />
          );
        })}
      </svg>
    </AepochScene>
  );
};

// ===========================================================================
// Scenes 11/12 — DeclarativeHookVariant
// ===========================================================================

// Scene 11 — the legacy structure assembles in 4 mechanical stages,
// sharp-eased, bottom-to-top. No human.
const LEGACY_BANDS = [
  { y: 700, w: 520 },
  { y: 630, w: 430 },
  { y: 560, w: 350 },
  { y: 490, w: 280 },
];
export const BuiltForAnotherWorldMotion: React.FC<DeclarativeHookVariantProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const textReveal = reveal({ frame, startFrame: 0, durationFrames: 20, reducedMotion: reduced });
  const bandStarts = [20, 50, 80, 110];
  return (
    <AepochScene theme={props.theme ?? "void"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 175, width: 1000, ...revealStyle(textReveal) }}>
        {props.eyebrow ? <div style={{ fontSize: AEPOCH_TYPE.size.eyebrow, marginBottom: 26, color: AEPOCH_COLORS.muted }}>{props.eyebrow}</div> : null}
        <div style={{ fontSize: 88, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight, lineHeight: AEPOCH_TYPE.lineHeight.hero }}>
          {props.lines.map((line) => <div key={line}>{line}</div>)}
        </div>
      </div>
      <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0 }} aria-label="Legacy economic-system structure">
        {LEGACY_BANDS.map((band, index) => (
          <rect
            key={index}
            x={1350 - band.w / 2}
            y={band.y}
            width={band.w}
            height={58}
            fill="rgba(74,68,64,0.16)"
            stroke={AEPOCH_COLORS.inkMid}
            strokeWidth={AEPOCH_LAYOUT.baselineStroke}
            style={revealStyle(reveal({ frame, startFrame: bandStarts[index], durationFrames: 20, fromY: 18, easing: AEPOCH_EASING.sharpSystem, reducedMotion: reduced }))}
          />
        ))}
        <path
          d="M1090 758H1610"
          stroke={AEPOCH_COLORS.inkMid}
          strokeWidth={10}
          opacity={0.55}
          style={revealStyle(reveal({ frame, startFrame: 130, durationFrames: 16, easing: AEPOCH_EASING.sharpSystem, reducedMotion: reduced }))}
        />
      </svg>
    </AepochScene>
  );
};

// Scene 12 — continues the same structure (with a boundary gap), already
// settled instantly; the human enters quietly at the real detected 2.19s
// internal pause, unacknowledged by the system.
export const DoesNotRecognizePresenceMotion: React.FC<DeclarativeHookVariantProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const textReveal = reveal({ frame, startFrame: 0, durationFrames: 20, reducedMotion: reduced });
  const structureReveal = reveal({ frame, startFrame: 0, durationFrames: 14, reducedMotion: reduced });
  // Detected pause: 181.6-183.8s into the recording; scene starts at 170.25s,
  // so local frames ~(181.6-170.25)*30=340 to ~(183.8-170.25)*30=407.
  const humanReveal = reveal({ frame, startFrame: 350, durationFrames: 20, fromY: 24, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme ?? "void"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 175, width: 1000, ...revealStyle(textReveal) }}>
        {props.eyebrow ? <div style={{ fontSize: AEPOCH_TYPE.size.eyebrow, marginBottom: 26, color: AEPOCH_COLORS.muted }}>{props.eyebrow}</div> : null}
        <div style={{ fontSize: 88, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight, lineHeight: AEPOCH_TYPE.lineHeight.hero }}>
          {props.lines.map((line) => <div key={line}>{line}</div>)}
        </div>
      </div>
      <div style={revealStyle(structureReveal)}>
        <LegacyStructure withBoundaryGap />
      </div>
      <div style={{ position: "absolute", left: 895, top: 660, opacity: 0.8, ...revealStyle(humanReveal) }}>
        <HumanNode size={78} state="present" />
      </div>
    </AepochScene>
  );
};

// ===========================================================================
// Scene 13 — SignalStatement — the canonical Signal sequence
// ===========================================================================
export const SignalStatementMotion: React.FC<SignalStatementProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const size = 560;
  const r = size * 0.27;
  const cx = size / 2;
  const cy = size / 2;
  const sep = r * 0.66;
  const earthFinal = { x: cx - sep / 2, y: cy };
  const cosmosFinal = { x: cx + sep / 2, y: cy };

  const breath = reduced ? 1 : frameProgress(frame, SIGNAL_SEQUENCE.breathStart, SIGNAL_SEQUENCE.breathEnd, AEPOCH_EASING.easeOutCubic);
  const converge = reduced ? 1 : frameProgress(frame, SIGNAL_SEQUENCE.convergeStart, SIGNAL_SEQUENCE.convergeEnd - SIGNAL_SEQUENCE.convergeStart, AEPOCH_EASING.easeOutQuint);
  const forge = reduced ? 1 : frameProgress(frame, SIGNAL_SEQUENCE.forgeStart, SIGNAL_SEQUENCE.forgeEnd - SIGNAL_SEQUENCE.forgeStart, AEPOCH_EASING.standard);
  const radiance = reduced ? 0 : frameProgress(frame, SIGNAL_SEQUENCE.radianceStart, SIGNAL_SEQUENCE.radianceEnd - SIGNAL_SEQUENCE.radianceStart, AEPOCH_EASING.easeInOutSine) *
    (1 - frameProgress(frame, SIGNAL_SEQUENCE.radianceEnd - 6, 12, AEPOCH_EASING.easeInOutSine));
  const settle = reduced ? 1 : frameProgress(frame, SIGNAL_SEQUENCE.settleStart, SIGNAL_SEQUENCE.settleEnd - SIGNAL_SEQUENCE.settleStart, AEPOCH_EASING.easeOutQuint);

  // Converge: circles travel from off-frame edges to their final vesica
  // positions.
  const earthX = reduced ? earthFinal.x : earthFinal.x - (1 - converge) * 260;
  const cosmosX = reduced ? cosmosFinal.x : cosmosFinal.x + (1 - converge) * 260;
  // Settle: a small convergence-emphasis scale (1.06) reduces to 1.0.
  const groupScale = reduced ? 1 : 1 + 0.06 * (1 - settle);

  const clipId = "e001-signal-vesica-motion-clip";
  const forgeRadius = r * 1.22;

  const statementReveal = reveal({
    frame,
    startFrame: SIGNAL_SEQUENCE.statementStart,
    durationFrames: SIGNAL_SEQUENCE.statementDuration,
    fromY: 16,
    reducedMotion: reduced,
  });

  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 680, top: 140, opacity: breath, transform: `scale(${groupScale})`, transformOrigin: "center" }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Signal — Earth and Cosmos resolved">
          <defs>
            <clipPath id={clipId}>
              <circle cx={cosmosX} cy={cosmosFinal.y} r={r} />
            </clipPath>
            <radialGradient id="e001-signal-halo-motion" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={AEPOCH_COLORS.signal} stopOpacity={0.34} />
              <stop offset="100%" stopColor={AEPOCH_COLORS.signal} stopOpacity={0} />
            </radialGradient>
            <radialGradient id="e001-signal-bloom-warm" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </radialGradient>
            <radialGradient id="e001-signal-bloom-cool" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={AEPOCH_COLORS.prism} stopOpacity={0.5} />
              <stop offset="100%" stopColor={AEPOCH_COLORS.prism} stopOpacity={0} />
            </radialGradient>
            <radialGradient id="e001-signal-bloom-amber" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={AEPOCH_COLORS.sand} stopOpacity={0.5} />
              <stop offset="100%" stopColor={AEPOCH_COLORS.sand} stopOpacity={0} />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={r * 1.7} fill="url(#e001-signal-halo-motion)" opacity={reduced ? 1 : converge} />
          <circle cx={earthX} cy={earthFinal.y} r={r} fill="rgba(196,131,90,0.20)" stroke={AEPOCH_COLORS.clay} strokeWidth={3} />
          <circle cx={cosmosX} cy={cosmosFinal.y} r={r} fill="rgba(139,175,212,0.18)" stroke={AEPOCH_COLORS.iris} strokeWidth={3} />
          {converge > 0.55 || reduced ? (
            <circle cx={earthFinal.x} cy={earthFinal.y} r={r} fill={AEPOCH_COLORS.signal} clipPath={`url(#${clipId})`} opacity={0.92} />
          ) : null}
          {/* Forge — white ring drawn clockwise from top (-pi/2). */}
          <circle
            cx={cx}
            cy={cy}
            r={forgeRadius}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={4}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            pathLength={1}
            style={strokeDash(reduced ? 1 : forge)}
            opacity={reduced ? 0.9 : forge > 0 ? 0.9 : 0}
          />
          {/* Radiance — three-wave bloom: warm white, cool violet, warm amber. */}
          <circle cx={cx} cy={cy} r={forgeRadius * 1.3} fill="url(#e001-signal-bloom-warm)" opacity={radiance} />
          <circle cx={cx} cy={cy} r={forgeRadius * 1.15} fill="url(#e001-signal-bloom-cool)" opacity={radiance * 0.8} />
          <circle cx={cx} cy={cy} r={forgeRadius * 1.4} fill="url(#e001-signal-bloom-amber)" opacity={radiance * 0.6} />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 360, top: 780, width: 1200, textAlign: "center", ...revealStyle(statementReveal) }}>
        <div style={{ fontSize: 68, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight }}>{props.statement}</div>
      </div>
    </AepochScene>
  );
};

// ===========================================================================
// Scene 14 — CircularValueField "ancient idea / modern tools"
// ===========================================================================
const PoleMotion: React.FC<{ pole: "earth" | "cosmos"; label: string; poleReveal: ReturnType<typeof reveal> }> = ({ pole, label, poleReveal }) => (
  <div style={{ textAlign: "center", ...revealStyle(poleReveal) }}>
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

export const AncientIdeaModernToolsMotion: React.FC<CircularValueFieldConnectedPolesProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const candidate = props.candidate ?? "a";
  const leftReveal = reveal({ frame, startFrame: 0, durationFrames: 24, fromX: -24, fromY: 0, reducedMotion: reduced });
  const rightReveal = reveal({ frame, startFrame: 0, durationFrames: 24, fromX: 24, fromY: 0, reducedMotion: reduced });
  const lineProgress = strokeProgress({ frame, startFrame: 40, durationFrames: 20, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", top: 210, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 220 }}>
        <PoleMotion pole="earth" label={props.leftLabel} poleReveal={leftReveal} />
        <PoleMotion pole="cosmos" label={props.rightLabel} poleReveal={rightReveal} />
      </div>
      <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0 }} aria-hidden>
        {candidate === "a" ? (
          <path d="M690 358H990" stroke={AEPOCH_COLORS.iris} strokeWidth={3} opacity={0.55} pathLength={1} style={strokeDash(reduced ? 1 : lineProgress)} />
        ) : (
          <path d="M690 358 Q840 330 990 358" fill="none" stroke={AEPOCH_COLORS.iris} strokeWidth={3} opacity={0.55} pathLength={1} style={strokeDash(reduced ? 1 : lineProgress)} />
        )}
      </svg>
      {props.footer ? (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 90, textAlign: "center", fontSize: 32, fontStyle: "italic", color: AEPOCH_COLORS.inkMid, ...revealStyle(reveal({ frame, startFrame: 60, durationFrames: 20, reducedMotion: reduced })) }}>
          {props.footer}
        </div>
      ) : null}
    </AepochScene>
  );
};

// ===========================================================================
// Scene 15 — ContributionStatement
// ===========================================================================
export const ContributionMotion: React.FC<ContributionStatementProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const figureSize = 128;
  const figureHeight = figureSize * 3;
  const ringWidth = figureSize * 2.15;
  const ringHeight = figureHeight * 1.05;
  const figureReveal = reveal({ frame, startFrame: 0, durationFrames: 24, fromScale: 0.95, reducedMotion: reduced });
  const ringReveal = reveal({ frame, startFrame: 30, durationFrames: 26, fromScale: 0.9, reducedMotion: reduced });
  const textReveal = reveal({ frame, startFrame: 55, durationFrames: 22, fromY: 18, reducedMotion: reduced });
  // Detected internal pause ~9.8-11.1s into the scene (frame ~294-333) —
  // the ring brightens slightly rather than a visual cut.
  const ringBrighten = !reduced ? frameProgress(frame, 294, 39, AEPOCH_EASING.easeInOutSine) * 0.15 : 0;
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
            opacity: (0.85 + ringBrighten) * ringReveal.opacity,
            transform: `scale(${ringReveal.scale})`,
          }}
        />
        <div style={revealStyle(figureReveal)}>
          <SymbolicFigure size={figureSize} color={AEPOCH_COLORS.clay} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 800, top: 430, width: 760, ...revealStyle(textReveal) }}>
        <div style={{ fontSize: 62, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight, lineHeight: 1.08 }}>
          {props.statement}
        </div>
      </div>
    </AepochScene>
  );
};

// ===========================================================================
// Scene 16 — HumanNetworkProtocolLayer
// ===========================================================================
export const ProtocolLayerMotion: React.FC<HumanNetworkProtocolLayerProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const candidate = props.candidate ?? "a";
  const count = props.nodeCount ?? 7;
  const ringRadius = candidate === "a" ? 300 : 330;
  const center = { x: 1375, y: 470 };
  const positions = Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    const jitter = candidate === "a" ? 0 : (index % 2 === 0 ? -26 : 22);
    return { x: center.x + Math.cos(angle) * (ringRadius + jitter), y: center.y + Math.sin(angle) * (ringRadius + jitter) * 0.82 };
  });
  const headlineReveal = reveal({ frame, startFrame: 0, durationFrames: 22, reducedMotion: reduced });
  const nodeStarts = positions.map((_, index) => deterministicStagger({ index, startFrame: 20, gapFrames: 17, seed: props.seed ?? E001_SEED }));
  const lastNodeStart = Math.max(...nodeStarts);
  const ringProgress = strokeProgress({ frame, startFrame: lastNodeStart + 14, durationFrames: 30, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 260, width: 620, ...revealStyle(headlineReveal) }}>
        <div style={{ fontSize: 78, fontWeight: AEPOCH_TYPE.weight.heavy, lineHeight: 1.04, letterSpacing: -2.8 }}>
          {(props.headline ?? "A layer for the internet.").split("\n").map((line) => <div key={line}>{line}</div>)}
        </div>
        {props.supportingLine ? <div style={{ marginTop: 24, fontSize: 30, color: AEPOCH_COLORS.muted }}>{props.supportingLine}</div> : null}
      </div>
      <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <ellipse
          cx={center.x}
          cy={center.y}
          rx={ringRadius + 68}
          ry={(ringRadius + 68) * 0.82}
          fill="none"
          stroke={AEPOCH_COLORS.prism}
          strokeWidth={3}
          opacity={0.5}
          pathLength={1}
          style={strokeDash(reduced ? 1 : ringProgress)}
        />
      </svg>
      {positions.map((pos, index) => (
        <div key={index} style={{ position: "absolute", left: pos.x - 44, top: pos.y - 44, ...revealStyle(reveal({ frame, startFrame: nodeStarts[index], durationFrames: 16, fromScale: 0.9, reducedMotion: reduced })) }}>
          <HumanNode size={88} state={index % 3 === 0 ? "active" : "present"} />
        </div>
      ))}
    </AepochScene>
  );
};

// ===========================================================================
// Scene 17 — OneIdeaStatement
// ===========================================================================
export const OneIdeaMotion: React.FC<OneIdeaStatementProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const pointReveal = reveal({ frame, startFrame: 0, durationFrames: 18, fromScale: 0.7, reducedMotion: reduced });
  const lineProgress = strokeProgress({ frame, startFrame: 20, durationFrames: 20, reducedMotion: reduced });
  const textReveal = reveal({ frame, startFrame: 40, durationFrames: 24, fromY: 16, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <circle cx="620" cy="520" r="14" fill={AEPOCH_COLORS.prism} style={revealStyle(pointReveal)} />
        <path d="M634 520 H1180" stroke={AEPOCH_COLORS.prism} strokeWidth={2} opacity={0.45} pathLength={1} style={strokeDash(reduced ? 1 : lineProgress)} />
      </svg>
      <div style={{ position: "absolute", left: 560, top: 580, width: 540, ...revealStyle(textReveal) }}>
        <div style={{ fontSize: 56, fontWeight: AEPOCH_TYPE.weight.heavy, lineHeight: 1.12 }}>{props.headline}</div>
        {props.supportingLine ? <div style={{ marginTop: 18, fontSize: 30, color: AEPOCH_COLORS.inkMid }}>{props.supportingLine}</div> : null}
      </div>
    </AepochScene>
  );
};

// ===========================================================================
// Scene 18 — FlowLifecyclePathVariant (42-day test) — episode-specific
// symbolic path variant, NOT the frozen FlowLifecycle component.
// ===========================================================================
const PATH_P0 = { x: 140, y: 820 };
const PATH_P1 = { x: 960, y: 80 };
const PATH_P2 = { x: 1820, y: 480 };
const quadraticPoint = (t: number, p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }) => ({
  x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x,
  y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y,
});
const PATH_WAYPOINT_T = [0.08, 0.38, 0.64, 0.9] as const;
const PATH_LABEL_LAYOUT: Record<number, { left: number | null; dy: number }> = {
  0: { left: 140, dy: -170 },
  1: { left: null, dy: 40 },
  2: { left: null, dy: -118 },
  3: { left: 1460, dy: 40 },
};
// Waypoint activation frames: waypoint 0 lands as the path reaches it
// (N20's energized opening); waypoint 2 lands near the real N20/N21
// register-shift boundary (~12.2s = frame 366); waypoint 3 lands later,
// matching N21's slower, reassuring pace.
const WAYPOINT_STARTS = [50, 150, 260, 420];
export const FlowLifecyclePathMotion: React.FC<FlowLifecyclePathProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const points = PATH_WAYPOINT_T.map((t) => quadraticPoint(t, PATH_P0, PATH_P1, PATH_P2));
  const pathProgress = strokeProgress({ frame, startFrame: 0, durationFrames: 60, reducedMotion: reduced });
  const headlineReveal = reveal({ frame, startFrame: 0, durationFrames: 20, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      {props.headline ? (
        <div style={{ position: "absolute", left: 0, top: 60, fontSize: 62, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: -2.4, ...revealStyle(headlineReveal) }}>
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
          pathLength={1}
          style={strokeDash(reduced ? 1 : pathProgress)}
        />
        {points.map((point, index) => {
          const step = props.steps[index];
          const color = step.pole === "earth" ? AEPOCH_COLORS.clay : step.pole === "cosmos" ? AEPOCH_COLORS.iris : AEPOCH_COLORS.prism;
          const dotReveal = reveal({ frame, startFrame: WAYPOINT_STARTS[index], durationFrames: 16, fromScale: 0.5, reducedMotion: reduced });
          return <circle key={step.id} cx={point.x} cy={point.y} r={12} fill={color} style={revealStyle(dotReveal)} />;
        })}
      </svg>
      {points.map((point, index) => {
        const step = props.steps[index];
        const layout = PATH_LABEL_LAYOUT[index];
        const labelReveal = reveal({ frame, startFrame: WAYPOINT_STARTS[index] + 6, durationFrames: 18, fromY: 10, reducedMotion: reduced });
        return (
          <div
            key={step.id}
            style={{ position: "absolute", left: layout.left ?? point.x - 170, top: point.y + layout.dy, width: 340, textAlign: "center", ...revealStyle(labelReveal) }}
          >
            <div style={{ fontSize: 36, fontWeight: AEPOCH_TYPE.weight.bold, lineHeight: 1.15 }}>{step.label}</div>
          </div>
        );
      })}
    </AepochScene>
  );
};

// ===========================================================================
// Scene 20 — FinalThesisStatement
// ===========================================================================
export const FinalThesisMotion: React.FC<FinalThesisStatementProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  // N23 (the cue line) carries no visual development — a held breath.
  // N23's proportional share of the scene is ~4s (~120 frames); the text and
  // field both resolve together right after that, per this phase's direction.
  const resolveStart = 120;
  const headlineReveal = reveal({ frame, startFrame: resolveStart, durationFrames: 22, fromY: 16, reducedMotion: reduced });
  const supportingReveal = reveal({ frame, startFrame: resolveStart + 16, durationFrames: 22, fromY: 16, reducedMotion: reduced });
  const fieldReveal = reveal({ frame, startFrame: resolveStart, durationFrames: 30, fromScale: 0.94, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 130, top: 260, width: 760 }}>
        <div style={{ fontSize: 64, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight, lineHeight: 1.08, ...revealStyle(headlineReveal) }}>
          {props.headline}
        </div>
        <div style={{ marginTop: 30, fontSize: 34, color: AEPOCH_COLORS.inkMid, lineHeight: 1.32, ...revealStyle(supportingReveal) }}>{props.supportingLine}</div>
      </div>
      <div style={{ position: "absolute", right: 190, top: 220, ...revealStyle(fieldReveal) }}>
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
};

// ===========================================================================
// Scene 21 — BiologicalTransformerStatement
// ===========================================================================
export const BiologicalTransformerMotion: React.FC<BiologicalTransformerStatementProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const figureSize = 150;
  const figureHeight = figureSize * 3;
  const ringSize = 640;
  const ringLeft = figureSize / 2 - ringSize / 2;
  const ringTop = figureHeight / 2 - ringSize / 2;
  // "Reopen gently" — a slower-than-usual settle (40 frames, not the usual
  // 22-24), honoring the inherited pause rather than snapping in.
  const groupReveal = reveal({ frame, startFrame: 0, durationFrames: 44, fromScale: 0.96, reducedMotion: reduced });
  const textReveal = reveal({ frame, startFrame: 55, durationFrames: 24, fromY: 16, reducedMotion: reduced });
  // One restrained breath pulse, landing near "magnificent biological
  // transformer" (~80% through the scene).
  const pulseCenter = Math.round(0.8 * 427);
  const pulse = !reduced ? settlePulse(frame, pulseCenter, 26, 0.035) : 1;
  const groupStyle = revealStyle(groupReveal);
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 520, top: 110, ...groupStyle, transform: `${groupStyle.transform} scale(${pulse})` }}>
        <div style={{ position: "absolute", left: ringLeft, top: ringTop }}>
          <BreathRings size={ringSize} />
        </div>
        <SymbolicFigure size={figureSize} color={AEPOCH_COLORS.clay} posture="settled-b" />
      </div>
      <div style={{ position: "absolute", left: 380, top: 700, width: 1000, ...revealStyle(textReveal) }}>
        <div style={{ fontSize: 58, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight }}>{props.statement}</div>
      </div>
    </AepochScene>
  );
};

// ===========================================================================
// Scene 22 — AepochSeriesOutro
// ===========================================================================
// Compressed to this scene's real ~32-frame reference-timing allocation (see
// timeline.ts and the Phase 13C.2A QA doc's "known limitations" section) —
// a quick, clean settle rather than the full seriesOutroV1 4.5s hold, which
// belongs to a later phase once the final narration track sets total runtime.
export const SeriesOutroMotion: React.FC<AepochSeriesOutroProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  const settle = reveal({ frame, startFrame: 0, durationFrames: 14, fromScale: 0.97, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme ?? "earth-rise"} captionReservePx={0}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 320, textAlign: "center", ...revealStyle(settle) }}>
        <div style={{ fontSize: 68, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: AEPOCH_TYPE.tracking.tight, lineHeight: AEPOCH_TYPE.lineHeight.headline }}>
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
};
