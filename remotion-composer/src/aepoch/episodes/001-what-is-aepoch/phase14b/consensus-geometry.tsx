// Phase 14B, Beat 6 — Manufactured Consensus brand geometry.
//
// consensus-edit-a.png is used strictly as a figure plate (per the phase
// brief: "Do not ask an image model to generate another output device").
// Everything below is Remotion-native brand geometry laid over that plate:
//
//   1. Figures enter with slight differences   -> per-figure pulse markers,
//      each with a distinct deterministic phase/period (not synchronized).
//   2. Spacing becomes regular                 -> the pulse markers snap
//      from their organic offsets onto one evenly-spaced row.
//   3. Timing synchronizes                     -> each marker's phase
//      converges onto one shared beat.
//   4. Cool Cosmos treatment increases          -> a flat Iris/Prism tint
//      wash over the plate, opacity ramping across the beat.
//   5. A broad output band/waveform forms       -> a single flat-colored
//      sine-wave line draws on (stroke reveal) beside the figures.
//   6. Resolves into one uniform mechanical rhythm -> markers lock to
//      identical scale/opacity, pulsing in lockstep, wave fully drawn.
//
// No blob/puddle, control panel, giant arrows, tunnel, black void,
// megaphone, platform logo, or server-rack shape anywhere below — the wave
// is a single restrained stroked path, matching reflection-a's contour-line
// register rather than introducing a new device.

import React from "react";
import { interpolate } from "remotion";
import { AEPOCH_COLORS } from "../../../tokens";
import { frameProgress, deterministicStagger } from "../../../motion";

// Approximate x-fraction (0-1, of the plate's own 1392px-wide frame) of each
// of consensus-edit-a's 8 walking figures' head centers, read directly off
// the image (see Phase 14B QA doc's asset review) — not measured
// programmatically, an intentional visual estimate for overlay placement
// only; it never touches the source pixels.
const FIGURE_X_FRACTIONS = [0.148, 0.253, 0.358, 0.463, 0.568, 0.673, 0.778, 0.883];
const FIGURE_HEAD_Y_FRACTION = 0.19;

export const ConsensusSyncMarkers: React.FC<{
  frame: number;
  startFrame: number;
  durationFrames: number;
  seed?: number;
}> = ({ frame, startFrame, durationFrames, seed = 7 }) => {
  const syncProgress = frameProgress(frame, startFrame, durationFrames);
  return (
    <>
      {FIGURE_X_FRACTIONS.map((xFraction, index) => {
        // Organic, unsynchronized phase per figure — deterministic (seeded
        // hash), not Math.random(). Converges to 0 (perfectly in phase) as
        // syncProgress -> 1.
        const organicOffsetFrames = deterministicStagger({
          index,
          startFrame: 0,
          gapFrames: 5,
          seed,
          jitterFrames: 18,
        });
        const period = 26; // frames per pulse cycle once synced
        const phaseFrames = organicOffsetFrames * (1 - syncProgress);
        const cyclePosition = ((frame + phaseFrames) % period) / period;
        const pulse = Math.sin(cyclePosition * Math.PI * 2) * 0.5 + 0.5;
        const scale = 1 + pulse * (0.35 - 0.2 * syncProgress);
        const opacity = 0.45 + pulse * 0.35 + syncProgress * 0.2;
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${xFraction * 100}%`,
              top: `${FIGURE_HEAD_Y_FRACTION * 100}%`,
              width: 14,
              height: 14,
              marginLeft: -7,
              marginTop: -7,
              borderRadius: "50%",
              background: AEPOCH_COLORS.prism,
              opacity: Math.min(1, opacity),
              transform: `scale(${scale})`,
            }}
          />
        );
      })}
    </>
  );
};

export const ConsensusOutputWave: React.FC<{
  frame: number;
  startFrame: number;
  durationFrames: number;
}> = ({ frame, startFrame, durationFrames }) => {
  const progress = frameProgress(frame, startFrame, durationFrames);
  if (progress <= 0) return null;

  const width = 1920;
  const bandLeft = 1550;
  const bandRight = 1860;
  const centerY = 620;
  const amplitude = 26;
  const points = 60;
  const path = Array.from({ length: points + 1 }, (_, i) => {
    const t = i / points;
    const x = bandLeft + t * (bandRight - bandLeft);
    const y = centerY + Math.sin(t * Math.PI * 3) * amplitude;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const pathLength = 1;
  const dashOffset = pathLength * (1 - progress);

  return (
    <svg
      viewBox={`0 0 ${width} 1080`}
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <path
        d={path}
        fill="none"
        stroke={AEPOCH_COLORS.iris}
        strokeWidth={5}
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: dashOffset,
          opacity: interpolate(progress, [0, 0.15, 1], [0, 1, 1]),
        }}
      />
    </svg>
  );
};
