// Phase 13B — Episode 001 static reference-frame visual primitives.
//
// New episode-specific assets only. Shared primitives (AepochMark, HumanNode,
// EditorialCard, FlowEdge, DiagramIcon, AepochScene, etc.) are imported from
// the tagged Tier 1 baseline (../../components) unmodified wherever they
// already cover the need — see variants.tsx for how these compose together.
//
// Brand rules honored throughout: rounded corners for human/presence shapes,
// sharp corners for system/synthetic shapes, no drop shadows, no texture, no
// gradients beyond the canonical Earth Rise / Comet Arc / Signal exceptions.
// Signal color and geometry (`SignalVesica` below) are used ONLY by Scene
// 13's episode-specific Signal statement (see variants.tsx) — nowhere else
// in this file or in the episode.

import React from "react";
import { AEPOCH_COLORS, AEPOCH_LAYOUT } from "../../tokens";
import { createSeededRandom } from "../../random";
import { DARK_SCENE_SCALE, MIMICRY_ECHO_JITTER } from "./tokens";

// ---------------------------------------------------------------------------
// SymbolicFigure — Phase 13B.1 Correction 1 rewrite.
//
// The Phase 13B version read as a stacked-capsule toy: head ~19% of total
// height (should be 1/7–1/8), fused arm/torso silhouette, stubby legs. This
// version is built from separated primitives on an 8-head-unit grid (head
// diameter = 1/8 of total height, matching classic adult figure-drawing
// canon) so proportions stay correct by construction rather than by hand-
// tuned bezier guessing:
//   - head: 1 unit diameter (1/8 of height)
//   - torso: shoulders inset from a wider shoulder bar, so the bar's
//     uncovered ends are exactly where the arms attach — arms and torso
//     are never the same silhouette, guaranteeing visible negative space
//     between them
//   - legs: ~3.5 units long, hips flare slightly from the waist
// No facial features, no head tilt (the head circle never moves — only limb
// groups shift for posture). Three-quarter read comes from a small arm-swing
// and weight-leg offset, not a turned head.
// ---------------------------------------------------------------------------
export const SymbolicFigure: React.FC<{
  posture?: "settled-a" | "settled-b";
  size?: number;
  color?: string;
  opacity?: number;
}> = ({ posture = "settled-a", size = 240, color = AEPOCH_COLORS.clay, opacity = 1 }) => {
  const height = size * 3; // viewBox is 240 wide x 720 tall
  const armSwing = posture === "settled-a" ? 4 : -3;
  const weightLegDx = posture === "settled-a" ? 5 : -4;
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 240 720"
      role="img"
      aria-label="Symbolic human figure, direct address"
      style={{ display: "block", opacity }}
    >
      {/* head — 90px diameter = 1/8 of the 720px figure height, never tilted */}
      <circle cx="120" cy="58" r="45" fill={color} />
      {/* neck */}
      <rect x="104" y="98" width="32" height="24" rx="8" fill={color} />
      {/* shoulder bar — establishes recognizable shoulder width; its
          uncovered end-caps are exactly where the arms attach below */}
      <rect x="40" y="118" width="160" height="36" rx="18" fill={color} />
      {/* torso — inset from the shoulder bar, restrained natural taper to
          the waist, slight hip flare at the base */}
      <path
        d="M76 138
           L164 138
           C170 138 172 148 171 160
           L162 342
           C160 370 152 394 138 410
           L102 410
           C88 394 80 370 78 342
           L69 160
           C68 148 70 138 76 138
           Z"
        fill={color}
      />
      {/* left arm — separated from the torso by visible negative space,
          hangs to roughly mid-thigh */}
      <g transform={`translate(${armSwing} 0)`}>
        <path
          d="M55 132 C44 132 36 140 35 152 L30 402 C29 414 40 422 53 422 C63 422 70 414 69 402 L63 154 C63 142 65 132 55 132 Z"
          fill={color}
          opacity={0.97}
        />
      </g>
      {/* right arm — subtly different hang for restrained three-quarter
          asymmetry (not a mirrored duplicate of the left arm) */}
      <g transform={`translate(${-armSwing * 0.7} 0)`}>
        <path
          d="M185 132 C196 132 204 140 205 152 L210 402 C211 414 200 422 187 422 C177 422 170 414 171 402 L177 154 C177 142 175 132 185 132 Z"
          fill={color}
          opacity={0.97}
        />
      </g>
      {/* hips — slight flare from the waist into the legs */}
      <path d="M94 404 L146 404 L152 434 C152 444 142 450 120 450 C98 450 88 444 88 434 Z" fill={color} />
      {/* legs — ~3.5 head-units long, weight-shift offset between postures.
          Each leg is a simple straight-sided trapezoid (guaranteed not to
          overlap its pair — the inner edges never cross) with a rounded
          foot arc; a Phase 13B.1 fix, since the previous bezier version's
          rounded feet bulged inward and merged into what read as one leg. */}
      <g transform={`translate(${weightLegDx} 0)`}>
        <path d="M90 436 L114 436 L103 672 A10 10 0 0 1 83 672 Z" fill={color} />
      </g>
      <g transform={`translate(${-weightLegDx} 0)`}>
        <path d="M150 436 L126 436 L137 672 A10 10 0 0 0 157 672 Z" fill={color} />
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// CometArcPartial — restrained truncated arc, foreshadowing without
// completing the canonical Comet Arc. No glow (that stays reserved for the
// canonical animated Comet Arc / Signal treatments elsewhere).
// ---------------------------------------------------------------------------
export const CometArcPartial: React.FC<{ width?: number; color?: string }> = ({
  width = 420,
  color = AEPOCH_COLORS.iris,
}) => (
  <svg width={width} height={width * 0.42} viewBox="0 0 420 176" aria-hidden style={{ display: "block" }}>
    <path
      d="M18 150 Q170 20 402 62"
      fill="none"
      stroke={color}
      strokeWidth={AEPOCH_LAYOUT.baselineStroke}
      strokeLinecap="round"
      opacity={0.68}
    />
  </svg>
);

// ---------------------------------------------------------------------------
// SyntheticMultiplication primitives
// ---------------------------------------------------------------------------

// A single sharp synthetic unit — deliberately not a human-form icon: hard
// corners, no interior detail, no "AI" iconography (no chip pins, no brain).
export const SyntheticUnit: React.FC<{ size?: number; color?: string; opacity?: number }> = ({
  size = 46,
  color = AEPOCH_COLORS.inkMid,
  opacity = 1,
}) => (
  <svg width={size} height={size} viewBox="0 0 46 46" aria-hidden style={{ display: "block", opacity }}>
    <rect x="3" y="3" width="40" height="40" fill={color} />
  </svg>
);

// Mimicry — Phase 13B.1 Correction 3: retained as the approved base
// (candidate A), refined so the echoes read as artificial imitation rather
// than "a group of people." All echoes now share ONE mechanically repeated
// posture (`settled-a` only — no more alternating settled-a/settled-b per
// echo), and the jitter range (tokens.ts MIMICRY_ECHO_JITTER) is tightened so
// echoes stay nearly identical. Correction 2 scale (~30% larger) is applied
// via the `scale` prop.
export const EchoCluster: React.FC<{ seed: number; echoCount?: number; scale?: number }> = ({
  seed,
  echoCount = 6,
  scale: containerScale = DARK_SCENE_SCALE,
}) => {
  const rand = createSeededRandom(seed);
  const echoes = Array.from({ length: echoCount }, (_, index) => {
    const angle = (index / echoCount) * Math.PI * 2 + rand() * 0.35;
    const radius = 175 + (rand() - 0.5) * MIMICRY_ECHO_JITTER.offsetPx * 2;
    const echoScale = 1 + (rand() - 0.5) * MIMICRY_ECHO_JITTER.scaleRange;
    const opacity = 0.28 + (rand() - 0.5) * MIMICRY_ECHO_JITTER.opacityRange;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.72,
      scale: echoScale,
      opacity: Math.max(0.20, Math.min(0.34, opacity)),
    };
  });
  return (
    <div style={{ position: "relative", width: 520, height: 520, transform: `scale(${containerScale})` }}>
      {echoes.map((echo, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: 260 + echo.x - 60 * echo.scale,
            top: 260 + echo.y - 90 * echo.scale,
            transform: `scale(${echo.scale})`,
          }}
        >
          {/* one mechanically repeated pose for every echo — no posture
              alternation, so the cluster reads as a repeated imitation of
              the human rather than a varied crowd of individuals */}
          <SymbolicFigure size={120} color={AEPOCH_COLORS.prism} opacity={echo.opacity} posture="settled-a" />
        </div>
      ))}
      <div style={{ position: "absolute", left: 260 - 85, top: 260 - 125 }}>
        <SymbolicFigure size={170} color={AEPOCH_COLORS.clay} posture="settled-a" />
      </div>
    </div>
  );
};

// Multiplication — one synthetic unit replicated at accelerating mechanical
// rate. Density increases toward the bottom-right to imply acceleration
// within a single still frame. Correction 2 scale applied via the `scale` prop.
export const ReplicationGrid: React.FC<{ color?: string; scale?: number }> = ({
  color = AEPOCH_COLORS.inkMid,
  scale = DARK_SCENE_SCALE,
}) => {
  const rows = [
    { count: 2, gap: 96, size: 34 },
    { count: 4, gap: 62, size: 38 },
    { count: 7, gap: 40, size: 42 },
    { count: 11, gap: 26, size: 46 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-start", transform: `scale(${scale})` }}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", gap: row.gap - row.size }}>
          {Array.from({ length: row.count }, (_, index) => (
            <SyntheticUnit key={index} size={row.size} color={color} opacity={0.55 + rowIndex * 0.12} />
          ))}
        </div>
      ))}
    </div>
  );
};

// Manufactured consensus — Phase 13B.1 Correction 4 full replacement. The
// Phase 13B version (a bordered bar-coded panel with inward arrows) read as
// a device/interface, which is exactly what this correction forbids. This
// version is a direct visual evolution of ReplicationGrid: the same
// identical sharp SyntheticUnit tiles, now in mechanically perfect (not
// accelerating) rows spanning a broad horizontal field, whose separate
// outputs resolve into one shared treatment beneath them — no border, no
// device rectangle, no arrows.
//
// Candidate A ("pressure"): straight parallel drop-lines from every unit
// converge into one flat, solid, unbordered band — many outputs pressed into
// one uniform mass.
// Candidate B ("rhythm"): the units feed a row of perfectly uniform pulse
// bars — identical height, evenly spaced — reading as synchronization
// rather than pressure. Genuinely distinct from candidate A, not a resize.
export const ManufacturedConsensusField: React.FC<{ candidate?: "a" | "b"; scale?: number }> = ({
  candidate = "a",
  scale = DARK_SCENE_SCALE,
}) => {
  const cols = candidate === "a" ? 12 : 9;
  const rows = candidate === "a" ? 3 : 2;
  const unitSize = candidate === "a" ? 30 : 36;
  const gap = candidate === "a" ? 16 : 22;
  const cellSpan = unitSize + gap;
  const totalWidth = cols * unitSize + (cols - 1) * gap;
  const columnCenters = Array.from({ length: cols }, (_, index) => index * cellSpan + unitSize / 2);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${scale})` }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${unitSize}px)`, gap, marginBottom: 22 }}>
        {Array.from({ length: cols * rows }, (_, index) => (
          <SyntheticUnit key={index} size={unitSize} color={AEPOCH_COLORS.inkMid} opacity={0.74} />
        ))}
      </div>
      <svg width={totalWidth} height={26} aria-hidden style={{ display: "block" }}>
        {columnCenters.map((x, index) => (
          <line key={index} x1={x} y1={0} x2={x} y2={26} stroke={AEPOCH_COLORS.inkMid} strokeWidth={2} opacity={0.38} />
        ))}
      </svg>
      {candidate === "a" ? (
        // Pressure: one flat, unbordered, uniform band — the merged output.
        <div style={{ width: totalWidth, height: 40, background: AEPOCH_COLORS.inkMid, opacity: 0.86 }} />
      ) : (
        // Rhythm: perfectly uniform pulse bars — identical height, evenly
        // spaced, reading as manufactured synchronization rather than a
        // single mass.
        <div style={{ display: "flex", gap, alignItems: "flex-end" }}>
          {columnCenters.map((_, index) => (
            <div key={index} style={{ width: unitSize * 0.55, height: 48, background: AEPOCH_COLORS.inkMid, opacity: 0.82 }} />
          ))}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// LegacyStructure — shared between the DeclarativeHook "economic system"
// variants (Scenes 11/12) and HumanConsequence's Extraction destination
// (Scene 10, Correction 6), so the extraction target reads as visually
// related to the same legacy-system family rather than a generic shape.
// Stacked rigid bands, sharp corners, no human roundness.
// ---------------------------------------------------------------------------
export const LegacyStructure: React.FC<{ withBoundaryGap?: boolean; scale?: number }> = ({
  withBoundaryGap = false,
  scale = 1,
}) => (
  <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0, transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: "center" }} aria-label="Legacy economic-system structure">
    {[
      { y: 700, w: 520 },
      { y: 630, w: 430 },
      { y: 560, w: 350 },
      { y: 490, w: 280 },
    ].map((band, index) => (
      <rect
        key={index}
        x={1350 - band.w / 2}
        y={band.y}
        width={withBoundaryGap && index === 0 ? band.w - 140 : band.w}
        height={58}
        fill="rgba(74,68,64,0.16)"
        stroke={AEPOCH_COLORS.inkMid}
        strokeWidth={AEPOCH_LAYOUT.baselineStroke}
      />
    ))}
    <path d="M1090 758H1610" stroke={AEPOCH_COLORS.inkMid} strokeWidth={10} opacity={0.55} />
  </svg>
);

// A compact, self-contained (non-absolute) version of the same legacy-band
// silhouette, sized for use as the Extraction destination rather than a
// full-frame background diagram.
export const LegacyStructureCompact: React.FC<{ width?: number }> = ({ width = 340 }) => {
  const height = width * (900 / 1680) * 1.9;
  return (
    <svg width={width} height={height} viewBox="0 0 520 300" aria-label="Legacy economic-system structure" style={{ display: "block" }}>
      {[
        { y: 232, w: 480 },
        { y: 176, w: 380 },
        { y: 120, w: 290 },
        { y: 64, w: 210 },
      ].map((band, index) => (
        <rect
          key={index}
          x={260 - band.w / 2}
          y={band.y}
          width={band.w}
          height={48}
          fill="rgba(74,68,64,0.18)"
          stroke={AEPOCH_COLORS.inkMid}
          strokeWidth={AEPOCH_LAYOUT.baselineStroke}
        />
      ))}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// HumanConsequence primitives
// ---------------------------------------------------------------------------

// Uncertain reflection — Phase 13B.1 Correction 5 full replacement. The
// Phase 13B version (three standalone concentric arcs) risked reading as a
// Wi-Fi/broadcast-signal icon. This version is instead a broken, offset
// echo of the human silhouette itself: a head-fragment and a torso-fragment
// (reusing the same head/torso geometry language as SymbolicFigure, at low
// opacity in the cool system register) that are deliberately misaligned —
// the head doesn't sit above the torso, and a second, smaller torso echo is
// offset the other way — so it reads as "related to the human, unresolved,"
// never a clean mirrored copy, never a literal screen.
export const UncertainEcho: React.FC<{ size?: number }> = ({ size = 460 }) => {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 300 450" aria-hidden style={{ display: "block" }}>
      {/* offset head fragments — neither sits where a torso would expect it */}
      <circle cx="168" cy="66" r="34" fill={AEPOCH_COLORS.iris} opacity={0.40} />
      <circle cx="122" cy="94" r="24" fill={AEPOCH_COLORS.prism} opacity={0.26} />
      {/* primary torso echo, shifted right and down from where the head
          fragments imply it should be */}
      <path
        d="M96 150 L204 150 C210 150 212 160 210 172 L200 330 C198 352 190 372 178 386 L146 386 C134 372 126 352 124 330 L114 172 C112 160 114 150 120 150 Z"
        fill={AEPOCH_COLORS.pearl}
        opacity={0.30}
        transform="translate(24 6)"
      />
      {/* a second, cooler, smaller torso echo offset the other way —
          suggests instability/multiplicity without becoming a clean
          duplicate copy of the human */}
      <path
        d="M96 150 L204 150 C210 150 212 160 210 172 L200 330 C198 352 190 372 178 386 L146 386 C134 372 126 352 124 330 L114 172 C112 160 114 150 120 150 Z"
        fill={AEPOCH_COLORS.iris}
        opacity={0.18}
        transform="translate(-30 34) scale(0.86)"
      />
    </svg>
  );
};

// Extraction — Phase 13B.1 Correction 6: two or three restrained, unlabeled
// directional strands leaving the human toward the (now legacy-structure-
// related) system destination. Each strand is one single static curve, not
// a fading multi-segment line, so the count stays exactly legible as
// "two or three strands," not an ambiguous trail.
export const ExtractionStrands: React.FC<{ x1: number; y1: number; x2: number; y2: number; count?: 2 | 3 }> = ({
  x1,
  y1,
  x2,
  y2,
  count = 3,
}) => {
  const strands = Array.from({ length: count }, (_, index) => {
    const bend = -64 + index * 52;
    const endYOffset = (index - (count - 1) / 2) * 46;
    return { bend, endYOffset };
  });
  return (
    <>
      {strands.map((strand, index) => {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 + strand.bend;
        const ex2 = x2;
        const ey2 = y2 + strand.endYOffset;
        return (
          <path
            key={index}
            d={`M${x1} ${y1} Q${midX} ${midY} ${ex2} ${ey2}`}
            fill="none"
            stroke={AEPOCH_COLORS.inkMid}
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.56 - index * 0.08}
          />
        );
      })}
    </>
  );
};

// ---------------------------------------------------------------------------
// SignalVesica — Phase 13B.2, Scene 13 only. The canonical Signal geometry:
// a warm Earth field and a cool Cosmos field, overlapping and resolving into
// a solid Signal-colored vesica (the intersection of the two circles, drawn
// via clip-path so the lens shape is exact rather than hand-approximated
// with arc math) with a soft halo glow behind it — the one place in this
// episode where Signal color/geometry is permitted.
// ---------------------------------------------------------------------------
export const SignalVesica: React.FC<{ size?: number }> = ({ size = 560 }) => {
  const r = size * 0.27;
  const cx = size / 2;
  const cy = size / 2;
  const sep = r * 0.66;
  const earthCenter = { x: cx - sep / 2, y: cy };
  const cosmosCenter = { x: cx + sep / 2, y: cy };
  const clipId = "signal-vesica-clip";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Signal — Earth and Cosmos resolved">
      <defs>
        <clipPath id={clipId}>
          <circle cx={cosmosCenter.x} cy={cosmosCenter.y} r={r} />
        </clipPath>
        <radialGradient id="signal-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={AEPOCH_COLORS.signal} stopOpacity={0.34} />
          <stop offset="100%" stopColor={AEPOCH_COLORS.signal} stopOpacity={0} />
        </radialGradient>
      </defs>
      {/* soft halo glow — the one canonical exception to "no decorative gradients" */}
      <circle cx={cx} cy={cy} r={r * 1.7} fill="url(#signal-halo)" />
      {/* Earth field (warm, left) */}
      <circle cx={earthCenter.x} cy={earthCenter.y} r={r} fill="rgba(196,131,90,0.20)" stroke={AEPOCH_COLORS.clay} strokeWidth={3} />
      {/* Cosmos field (cool, right) */}
      <circle cx={cosmosCenter.x} cy={cosmosCenter.y} r={r} fill="rgba(139,175,212,0.18)" stroke={AEPOCH_COLORS.iris} strokeWidth={3} />
      {/* resolved Signal vesica — exact intersection via clip-path */}
      <circle cx={earthCenter.x} cy={earthCenter.y} r={r} fill={AEPOCH_COLORS.signal} clipPath={`url(#${clipId})`} opacity={0.92} />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// BreathRings — Phase 13B.2, Scene 21. Restrained concentric rings around
// the human figure suggesting breath/biological rhythm without any literal
// pulse-monitor or heartbeat-line imagery. Static (this is a settled still),
// varying only in opacity/radius, never overlapping the SymbolicFigure's own
// silhouette.
// ---------------------------------------------------------------------------
export const BreathRings: React.FC<{ size?: number; color?: string }> = ({ size = 620, color = AEPOCH_COLORS.sand }) => {
  const rings = [0.5, 0.68, 0.86, 1.0];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden style={{ display: "block" }}>
      {rings.map((f, index) => (
        <circle
          key={index}
          cx={size / 2}
          cy={size / 2}
          r={(size / 2) * f}
          fill="none"
          stroke={color}
          strokeWidth={2}
          opacity={0.42 - index * 0.08}
        />
      ))}
    </svg>
  );
};
