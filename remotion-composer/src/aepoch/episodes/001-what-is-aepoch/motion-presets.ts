// Phase 13C.2A — Episode 001 motion-blocking reusable timing presets.
// Builds on the shared, frozen ../../motion helpers (reveal, frameProgress,
// deterministicStagger, etc.) — nothing here duplicates Tier 1 infrastructure,
// it only encodes episode-specific frame recipes that are used by more than
// one scene in ./motion.tsx.

import { AEPOCH_EASING } from "../../tokens";
import { frameProgress } from "../../motion";

// -----------------------------------------------------------------------
// The Signal — canonical sequence (MOTION_TOKENS.md section 7.3), frame
// numbers transcribed verbatim: Breath 0-9, Converge 9-63, Hold 63-78,
// Forge 78-111, Radiance 111-138, Settle 138-162 (162 frames / 5.4s total).
// Scene 13's reference duration (~373 frames) comfortably holds this
// sequence plus a settled statement-text reveal and a long final hold.
// -----------------------------------------------------------------------
export const SIGNAL_SEQUENCE = {
  breathStart: 0,
  breathEnd: 9,
  convergeStart: 9,
  convergeEnd: 63,
  holdStart: 63,
  holdEnd: 78,
  forgeStart: 78,
  forgeEnd: 111,
  radianceStart: 111,
  radianceEnd: 138,
  settleStart: 138,
  settleEnd: 162,
  statementStart: 150,
  statementDuration: 26,
} as const;

// -----------------------------------------------------------------------
// Mechanically-accelerating reveal gaps — used by Scene 06 (Multiplication)
// for its 4 replication rows and echoed by Scene 07's tile-then-band reveal.
// Shortening gaps read as "accelerating mechanical rate" per
// MOTION_TOKENS.md's motion-semantics table (sharp/mechanical = shortening,
// exact intervals; human/organic = irregular, per Scene 05's jittered
// echo-cluster stagger instead).
// -----------------------------------------------------------------------
export const ACCELERATING_GAPS = [0, 50, 38, 26] as const;

// -----------------------------------------------------------------------
// A single restrained scale/opacity "settle pulse" — used at a real detected
// internal-pause frame to mark one meaningful visual development inside a
// long held-still scene (Scenes 05 and 10), rather than continuous idle
// motion. Not a heartbeat/pulse-monitor effect: one smooth up-and-back
// easeInOutSine cycle, matching MOTION_TOKENS.md's "ambient breathing" easing.
// -----------------------------------------------------------------------
export const settlePulse = (
  frame: number,
  centerFrame: number,
  halfWidthFrames = 14,
  magnitude = 0.045,
): number => {
  const bump =
    frame <= centerFrame
      ? frameProgress(frame, centerFrame - halfWidthFrames, halfWidthFrames, AEPOCH_EASING.easeInOutSine)
      : 1 - frameProgress(frame, centerFrame, halfWidthFrames, AEPOCH_EASING.easeInOutSine);
  return 1 + magnitude * bump;
};

// A slow, quiet, looping drift (max ~4px) for "unresolved" ambient elements
// (Scene 09's Uncertain Reflection fragments) — one of the episode's two
// permitted ambient loops (MOTION_TOKENS.md section 14: "maximum two ambient
// loops in one scene"). Deterministic (pure sine of frame/period), no
// Math.random() involved.
export const quietDrift = (frame: number, periodFrames: number, amplitudePx: number, phase = 0): number =>
  Math.sin((frame / periodFrames) * Math.PI * 2 + phase) * amplitudePx;
