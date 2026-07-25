import React from "react";
import { interpolate } from "remotion";
import { AEPOCH_DURATIONS, AEPOCH_EASING } from "./tokens";
import type { AepochCameraMove, AepochTransition } from "./types";

export type AepochReveal = {
  opacity: number;
  translateX: number;
  translateY: number;
  scale: number;
};

export const resolveReducedMotion = (reducedMotion?: boolean): boolean => reducedMotion === true;

export const frameProgress = (
  frame: number,
  startFrame: number,
  durationFrames: number,
  easing: (value: number) => number = AEPOCH_EASING.easeOutCubic,
  reducedMotion = false,
): number => {
  if (reducedMotion) return 1;
  if (durationFrames <= 0) return frame >= startFrame ? 1 : 0;
  return interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
};

export const reveal = ({
  frame,
  startFrame,
  durationFrames = AEPOCH_DURATIONS.standard,
  fromX = 0,
  fromY = 18,
  fromScale = 1,
  easing = AEPOCH_EASING.easeOutCubic,
  reducedMotion = false,
}: {
  frame: number;
  startFrame: number;
  durationFrames?: number;
  fromX?: number;
  fromY?: number;
  fromScale?: number;
  easing?: (value: number) => number;
  reducedMotion?: boolean;
}): AepochReveal => {
  const progress = frameProgress(frame, startFrame, durationFrames, easing, reducedMotion);
  return {
    opacity: progress,
    translateX: fromX * (1 - progress),
    translateY: fromY * (1 - progress),
    scale: fromScale + (1 - fromScale) * progress,
  };
};

export const revealStyle = (value: AepochReveal): React.CSSProperties => ({
  opacity: value.opacity,
  transform: `translate3d(${value.translateX}px, ${value.translateY}px, 0) scale(${value.scale})`,
  transformOrigin: "center",
});

export const cameraScale = ({
  frame,
  move = "cameraStill",
  startFrame = 0,
  durationFrames,
  reducedMotion = false,
}: {
  frame: number;
  move?: AepochCameraMove;
  startFrame?: number;
  durationFrames: number;
  reducedMotion?: boolean;
}): number => {
  if (reducedMotion || move === "cameraStill" || move === "panMeasured") return 1;
  const progress = frameProgress(frame, startFrame, durationFrames, AEPOCH_EASING.easeInOutSine);
  if (move === "pullBackCollective") return 1.08 - 0.08 * progress;
  if (move === "pushInMax") return 0.9 + 0.1 * progress;
  return 0.95 + 0.05 * progress;
};

export const cameraStyle = (scale: number): React.CSSProperties => ({
  transform: `scale(${scale})`,
  transformOrigin: "center",
});

export const strokeProgress = ({
  frame,
  startFrame,
  durationFrames = AEPOCH_DURATIONS.measured,
  reducedMotion = false,
}: {
  frame: number;
  startFrame: number;
  durationFrames?: number;
  reducedMotion?: boolean;
}): number => frameProgress(frame, startFrame, durationFrames, AEPOCH_EASING.standard, reducedMotion);

export const strokeDash = (progress: number, pathLength = 1): React.CSSProperties => ({
  strokeDasharray: pathLength,
  strokeDashoffset: pathLength * (1 - progress),
});

export const pathFlow = ({
  frame,
  startFrame,
  durationFrames,
  tailFraction = 0.18,
  reducedMotion = false,
}: {
  frame: number;
  startFrame: number;
  durationFrames: number;
  tailFraction?: number;
  reducedMotion?: boolean;
}): { progress: number; dasharray: string; dashoffset: number; opacity: number } => {
  if (reducedMotion) {
    return { progress: 1, dasharray: `${tailFraction} ${1 - tailFraction}`, dashoffset: -0.62, opacity: 0.72 };
  }
  const progress = frameProgress(frame, startFrame, durationFrames, AEPOCH_EASING.linear);
  const active = frame >= startFrame && frame <= startFrame + durationFrames;
  return {
    progress,
    dasharray: `${tailFraction} ${1 - tailFraction}`,
    dashoffset: -progress,
    opacity: active ? 0.9 : 0,
  };
};

export const deterministicStagger = ({
  index,
  startFrame,
  gapFrames,
  seed = 1,
  jitterFrames = 0,
}: {
  index: number;
  startFrame: number;
  gapFrames: number;
  seed?: number;
  jitterFrames?: number;
}): number => {
  const hash = Math.imul((seed ^ (index + 1)) >>> 0, 2654435761) >>> 0;
  const jitter = jitterFrames > 0 ? hash % (jitterFrames + 1) : 0;
  return startFrame + index * gapFrames + jitter;
};

export const convergenceOffset = ({
  frame,
  startFrame,
  durationFrames,
  distance,
  direction,
  reducedMotion = false,
}: {
  frame: number;
  startFrame: number;
  durationFrames: number;
  distance: number;
  direction: "left" | "right";
  reducedMotion?: boolean;
}): number => {
  const progress = frameProgress(frame, startFrame, durationFrames, AEPOCH_EASING.easeOutQuint, reducedMotion);
  const signed = direction === "left" ? -distance : distance;
  return signed * (1 - progress);
};

export const nodeEnter = (
  frame: number,
  startFrame: number,
  reducedMotion = false,
): AepochReveal =>
  reveal({
    frame,
    startFrame,
    durationFrames: AEPOCH_DURATIONS.standard,
    fromY: 24,
    fromScale: 0.94,
    reducedMotion,
  });

export const edgeDraw = (
  frame: number,
  startFrame: number,
  durationFrames = AEPOCH_DURATIONS.measured,
  reducedMotion = false,
): number => strokeProgress({ frame, startFrame, durationFrames, reducedMotion });

export const lifecycleStepStart = (index: number, firstFrame = 24, gapFrames = 34): number =>
  firstFrame + index * gapFrames;

export const lifecycleEmphasis = ({
  frame,
  index,
  count,
  reducedMotion = false,
}: {
  frame: number;
  index: number;
  count: number;
  reducedMotion?: boolean;
}): number => {
  if (reducedMotion) return 1;
  if (frame >= 154) return 1;
  const start = lifecycleStepStart(index);
  if (frame < start) return 0;
  const next = index + 1 < count ? lifecycleStepStart(index + 1) : Number.POSITIVE_INFINITY;
  return frame < next ? 1 : 0.64;
};

export const transitionOpacity = ({
  frame,
  durationFrames,
  transitionIn = "crossfade",
  transitionOut = "crossfade",
  reducedMotion = false,
}: {
  frame: number;
  durationFrames: number;
  transitionIn?: AepochTransition;
  transitionOut?: AepochTransition;
  reducedMotion?: boolean;
}): number => {
  if (reducedMotion || transitionIn === "instant" || transitionIn === "darkCut") return 1;
  const transitionFrames = reducedMotion ? 4 : AEPOCH_DURATIONS.standard;
  const incoming = frameProgress(frame, 0, transitionFrames, AEPOCH_EASING.easeOutCubic);
  if (transitionOut === "instant" || transitionOut === "darkCut") return incoming;
  const outgoing = interpolate(
    frame,
    [durationFrames - transitionFrames, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: AEPOCH_EASING.easeInCubic },
  );
  return Math.min(incoming, outgoing);
};

export type AepochCaptionCue = {
  id: string;
  startFrame: number;
  endFrame: number;
  text: string;
};

export const activeCaption = (
  frame: number,
  cues: readonly AepochCaptionCue[],
): AepochCaptionCue | undefined => cues.find((cue) => frame >= cue.startFrame && frame < cue.endFrame);
