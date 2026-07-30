// Phase 14B — the six proof beats.
//
// Every beat treats its locked illustration as a designed visual plate
// (see ./plate.tsx) and applies only the permitted Remotion treatments
// listed in the phase brief: cropping, layer separation, masking, slow
// controlled camera movement, opacity/scale, parallax, repeated-element
// reveals, color-state transitions, typography, brand geometry, output
// bands/waveforms, and scene transitions. No beat redraws a human as an SVG
// primitive and no beat distorts anatomy — every human figure on screen is
// pixels from an approved generated illustration, never a programmatic
// shape.

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { AEPOCH_COLORS } from "../../../tokens";
import { AEPOCH_EASING } from "../../../tokens";
import { frameProgress } from "../../../motion";
import { IllustrationPlate } from "./plate";
import { ConsensusSyncMarkers, ConsensusOutputWave } from "./consensus-geometry";
import { PHASE14B_ASSETS } from "./assets";
import { PHASE14B_MARKERS } from "./timeline";

// ---------------------------------------------------------------------------
// Beat 1 — Something's Off
// ---------------------------------------------------------------------------
// Begins tightly cropped on echoes-a's single warm human figure (readable,
// unremarkable). A slow, continuous crop-out (not an "ordinary" push/pull —
// this is the Cropping treatment named in the phase brief, sustained across
// nearly the whole beat so it never reads as a zoom effect) lets the edge of
// one cool echo figure enter frame right as "something's off" lands,
// introducing the first note of uncertainty without any new asset.
export const Beat1SomethingsOff: React.FC<{ durationFrames: number }> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const progress = frameProgress(frame, 0, durationFrames, AEPOCH_EASING.easeInOutSine);
  const scale = interpolate(progress, [0, 1], [1.55, 1.18]);
  // Shift the zoomed content down so the crop centers on the human figure's
  // head/chest (roughly 27% down the source image) rather than the frame's
  // dead-center (which sits at the figures' hips) — see beats.tsx history
  // for the derivation. Settles to 0 (frame-centered) by the time this beat
  // hands off to Beat 2's full-composition view.
  const translateYPercent = interpolate(progress, [0, 1], [36, 0]);

  // "Begin human and readable, then introduce subtle repetition or
  // uncertainty": echoes-a's four cool echo figures flank the warm human
  // left and right. A soft Paper-colored wash over both edges hides them at
  // the very start and clears by the "something's off" marker — a
  // color-state reveal, not a mask on the artwork itself.
  const revealProgress = frameProgress(frame, 0, PHASE14B_MARKERS.somethingsOff, AEPOCH_EASING.easeInOutSine);
  const edgeWashOpacity = interpolate(revealProgress, [0, 1], [0.94, 0]);

  return (
    <IllustrationPlate
      src={PHASE14B_ASSETS.echoesA}
      objectPosition="50% 50%"
      scale={scale}
      translateYPercent={translateYPercent}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, ${AEPOCH_COLORS.paper} 0%, transparent 30%, transparent 70%, ${AEPOCH_COLORS.paper} 100%)`,
          opacity: edgeWashOpacity,
        }}
      />
    </IllustrationPlate>
  );
};

// ---------------------------------------------------------------------------
// Beat 2 — Comments and Rapid Responses (echoes-a)
// ---------------------------------------------------------------------------
// Continues the same plate and completes the crop-out from Beat 1 (scale
// 1.18 -> 1.0) so the full echoes-a composition — warm human dominant,
// centered, cool echoes flanking — is fully readable exactly as "Comments
// that sound human" begins. A brief mechanical strobe (a flat Iris
// color-state pulse, not a filter/warp) marks "faster than humans can
// type" — three quick pulses, deterministic, timed to the word itself.
const REVEAL_END_FRAME = PHASE14B_MARKERS.commentsThatSoundHuman; // full reveal completes as this word lands
const STROBE_START = PHASE14B_MARKERS.fasterThanHumansCanType;
const STROBE_DURATION = 20;

export const Beat2Echoes: React.FC<{ durationFrames: number }> = () => {
  const frame = useCurrentFrame();
  const revealProgress = frameProgress(frame, 0, REVEAL_END_FRAME, AEPOCH_EASING.easeOutCubic);
  const scale = interpolate(revealProgress, [0, 1], [1.18, 1.0]);

  let strobeOpacity = 0;
  if (frame >= STROBE_START && frame <= STROBE_START + STROBE_DURATION) {
    const local = frame - STROBE_START;
    const cyclePosition = (local % 7) / 7; // three quick pulses across ~20 frames
    strobeOpacity = Math.max(0, Math.sin(cyclePosition * Math.PI)) * 0.16;
  }

  return (
    <IllustrationPlate
      src={PHASE14B_ASSETS.echoesA}
      objectPosition="50% 42%"
      scale={scale}
      tint={strobeOpacity > 0 ? { color: AEPOCH_COLORS.iris, opacity: strobeOpacity } : undefined}
    />
  );
};

// ---------------------------------------------------------------------------
// Beat 3 — Uncertain Video Identity (reflection-a)
// ---------------------------------------------------------------------------
// reflection-a already depicts a warm figure and its offset cool contour
// echo. A restrained registration wobble (a few pixels of horizontal
// translation, deterministic sine function — never a per-limb warp) runs
// through the beat; its amplitude gets one small, deliberate uptick exactly
// on "lips aren't quite sinking" (the actual spoken anchor — see the
// word-timings JSON for the documented deviation from the approved
// script's "the face looks right... don't quite sync"), then settles back
// to its ambient level. The reflection is never fully resolved — that
// ambiguity is the point of this beat.
export const Beat3Reflection: React.FC<{ durationFrames: number }> = () => {
  const frame = useCurrentFrame();
  const markerFrame = PHASE14B_MARKERS.lipsDontQuiteSync;
  const emphasis = frameProgress(frame, markerFrame - 6, 6, AEPOCH_EASING.easeOutCubic)
    - frameProgress(frame, markerFrame + 10, 16, AEPOCH_EASING.easeInCubic);
  const ambientAmplitude = 2.2;
  const emphasisAmplitude = 3.0;
  const amplitude = ambientAmplitude + emphasisAmplitude * Math.max(0, emphasis);
  const wobble = Math.sin(frame * 0.12) * amplitude;
  return (
    <IllustrationPlate
      src={PHASE14B_ASSETS.reflectionA}
      objectPosition="50% 46%"
      scale={1.06}
      translateXPercent={wobble * 0.05}
    />
  );
};

// ---------------------------------------------------------------------------
// Beat 4 — Phone Calls and Catfishing
// ---------------------------------------------------------------------------
// No literal phone or dating-app interface — the brief is explicit that
// this beat continues the uncertainty language established by reflection-a.
// A slow measured pan (<=12% of frame width, matching MOTION_TOKENS'
// panMeasured limit) plus a gradual Iris -> Prism color-state shift creates
// a genuinely new internal visual state without a new illustration, giving
// the required mid-beat refresh. The pan settles and the tint holds through
// "catfished" (the actual spoken anchor is "getting catfish." — see
// word-timings JSON), then the beat quietly settles toward its own end.
export const Beat4Catfished: React.FC<{ durationFrames: number }> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const panProgress = frameProgress(frame, 0, durationFrames, AEPOCH_EASING.easeInOutSine);
  const translateXPercent = interpolate(panProgress, [0, 1], [1.5, -6.5]);

  // The refresh: a deliberate tint-state change starting partway through
  // the beat (around the 5s mark, well inside the brief's 4-7s refresh
  // cadence) rather than a hard cut, so the frame "refreshes without
  // abandoning the established style."
  const refreshStart = 130;
  const tintOpacity = interpolate(frame, [refreshStart, refreshStart + 40], [0, 0.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <IllustrationPlate
      src={PHASE14B_ASSETS.reflectionA}
      objectPosition="50% 46%"
      scale={1.14}
      translateXPercent={translateXPercent}
      tint={{ color: AEPOCH_COLORS.prism, opacity: tintOpacity }}
    />
  );
};

// ---------------------------------------------------------------------------
// Beat 5 — Synthetic Multiplication
// ---------------------------------------------------------------------------
// synthetic-multiplication.png already contains the "small, readable
// number -> dense repeated block" progression as a single static
// composition (left = 2 units, right = a dense multiplied block). A slow,
// continuous crop-pan left-to-right realizes that progression as motion —
// deliberate and mechanical, not a decorative zoom — plus a thin,
// deterministic highlight sweep (sine-timed, not random particles)
// reinforcing "increase repetition mechanically."
export const Beat5Multiplication: React.FC<{ durationFrames: number }> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const panProgress = frameProgress(frame, 0, durationFrames, AEPOCH_EASING.easeInOutSine);
  const scale = interpolate(panProgress, [0, 1], [1.55, 1.12]);
  const objectPositionX = interpolate(panProgress, [0, 1], [14, 88]);

  const sweepPeriod = 46;
  const sweepLocal = frame % sweepPeriod;
  const sweepX = (sweepLocal / sweepPeriod) * 100;
  const sweepOpacity = Math.max(0, Math.sin((sweepLocal / sweepPeriod) * Math.PI)) * 0.10;

  return (
    <IllustrationPlate
      src={PHASE14B_ASSETS.syntheticMultiplication}
      objectPosition={`${objectPositionX}% 45%`}
      scale={scale}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, transparent ${Math.max(0, sweepX - 6)}%, ${AEPOCH_COLORS.pearl} ${sweepX}%, transparent ${Math.min(100, sweepX + 6)}%)`,
          opacity: sweepOpacity,
          mixBlendMode: "screen",
        }}
      />
    </IllustrationPlate>
  );
};

// ---------------------------------------------------------------------------
// Beat 6 — Manufactured Consensus (consensus-edit-a + Remotion geometry)
// ---------------------------------------------------------------------------
// consensus-edit-a is used strictly as a figure plate. The "resolve into
// one shared output" device — the thing no image-generation attempt ever
// produced cleanly across five tries in Phases 14A.2/14A.3 — is built here
// entirely from ÆPOCH brand geometry: per-figure sync markers that
// converge into lockstep, an increasing Cool Cosmos tint, and a single flat
// drawn-on wave line. The transformation is anchored to "manufacturing
// consensus" and settles into stillness for the remainder of the beat.
const SYNC_DURATION = 210;
const WAVE_DURATION = 230;

export const Beat6Consensus: React.FC<{ durationFrames: number }> = () => {
  const frame = useCurrentFrame();
  const tintProgress = frameProgress(frame, 0, 260, AEPOCH_EASING.easeInOutSine);
  const tintOpacity = interpolate(tintProgress, [0, 1], [0, 0.22]);

  return (
    <IllustrationPlate
      src={PHASE14B_ASSETS.consensusEditA}
      objectPosition="50% 48%"
      scale={1.08}
      tint={{ color: AEPOCH_COLORS.iris, opacity: tintOpacity }}
    >
      <ConsensusSyncMarkers frame={frame} startFrame={0} durationFrames={SYNC_DURATION} />
      <ConsensusOutputWave frame={frame} startFrame={0} durationFrames={WAVE_DURATION} />
    </IllustrationPlate>
  );
};
