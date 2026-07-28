import React from "react";
import { useCurrentFrame } from "remotion";
import { activeCaption, type AepochCaptionCue } from "./motion";
import { AEPOCH_CAPTION, AEPOCH_TYPE } from "./tokens";

// Phase 12C timing map for the combined test reel. Frame numbers are global
// (relative to the reel composition), matching the QA review's timing table.
export const TEST_REEL_TIMING = {
  title: { start: 0, duration: 60 },
  declarativeHook: { start: 60, duration: 150 },
  keyStatement: { start: 210, duration: 120 },
  circularValueField: { start: 330, duration: 180 },
  flowLifecycle: { start: 510, duration: 210 },
  humanNetwork: { start: 720, duration: 210 },
  systemComparison: { start: 930, duration: 210 },
  outro: { start: 1140, duration: 135 },
  total: 1275,
} as const;

export type TestReelModuleKey =
  | "declarativeHook"
  | "keyStatement"
  | "circularValueField"
  | "flowLifecycle"
  | "humanNetwork"
  | "systemComparison";

// Phase 12C: phrase grouping revised so every cue breaks at a natural clause
// and wraps to no more than two lines inside the new caption panel (max
// width 1240px, 38px bold type). Text is byte-identical to the approved
// narration script; only cue boundaries and the split of "key" changed.
export const TEST_REEL_CAPTIONS: readonly AepochCaptionCue[] = [
  { id: "hook-1", startFrame: 72, endFrame: 132, text: "For centuries, we have measured value" },
  { id: "hook-2", startFrame: 132, endFrame: 195, text: "through production." },
  { id: "key-1", startFrame: 220, endFrame: 265, text: "ÆPOCH begins somewhere else." },
  { id: "key-2", startFrame: 265, endFrame: 320, text: "Presence activates value." },
  { id: "field-1", startFrame: 345, endFrame: 418, text: "What we count shapes what we value:" },
  { id: "field-2", startFrame: 418, endFrame: 490, text: "production, or presence." },
  { id: "life-1", startFrame: 520, endFrame: 570, text: "Show up. Activate." },
  { id: "life-2", startFrame: 570, endFrame: 695, text: "Circulate. What moves becomes permanent." },
  { id: "network-1", startFrame: 730, endFrame: 825, text: "Participation, not accumulation, defines power." },
  { id: "network-2", startFrame: 825, endFrame: 915, text: "One human. One vote." },
  { id: "comparison-1", startFrame: 940, endFrame: 1035, text: "Different systems produce different realities:" },
  { id: "comparison-2", startFrame: 1035, endFrame: 1125, text: "extraction or contribution, concentration or flow." },
  { id: "outro-1", startFrame: 1150, endFrame: 1207, text: "Presence activates value." },
  { id: "outro-2", startFrame: 1207, endFrame: 1265, text: "Flow makes it permanent." },
] as const;

export const localCaptionCues = (moduleKey: TestReelModuleKey): AepochCaptionCue[] => {
  const { start, duration } = TEST_REEL_TIMING[moduleKey];
  return TEST_REEL_CAPTIONS.filter(
    (cue) => cue.startFrame >= start && cue.endFrame <= start + duration,
  ).map((cue) => ({
    ...cue,
    startFrame: cue.startFrame - start,
    endFrame: cue.endFrame - start,
  }));
};

// Phase 12C burned-caption treatment: one continuous panel (never separate
// word/line boxes), centered, clamped to two lines, sized and colored to
// spec. Used by both the combined reel and the six standalone module
// previews so the burned look is identical everywhere it appears.
export const CaptionPanel: React.FC<{ cues: readonly AepochCaptionCue[] }> = ({ cues }) => {
  const frame = useCurrentFrame();
  const cue = activeCaption(frame, cues);
  if (!cue) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: AEPOCH_CAPTION.bottomOffset,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          maxWidth: AEPOCH_CAPTION.maxWidth,
          background: AEPOCH_CAPTION.background,
          color: AEPOCH_CAPTION.text,
          borderRadius: AEPOCH_CAPTION.cornerRadius,
          padding: `${AEPOCH_CAPTION.paddingV}px ${AEPOCH_CAPTION.paddingH}px`,
          fontFamily: AEPOCH_TYPE.family,
          fontSize: AEPOCH_CAPTION.fontSize,
          fontWeight: AEPOCH_TYPE.weight.bold,
          lineHeight: AEPOCH_CAPTION.lineHeight,
          textAlign: "center",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: AEPOCH_CAPTION.maxLines,
          overflow: "hidden",
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};
