import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { AepochMark, EarthRise } from "./components";
import {
  CircularValueField,
  DeclarativeHook,
  FlowLifecycle,
  HumanNetwork,
  KeyStatement,
  SystemComparison,
} from "./modules";
import { activeCaption, reveal, revealStyle, type AepochCaptionCue } from "./motion";
import {
  animatedCircularValueFieldProps,
  animatedDeclarativeHookProps,
  animatedFlowLifecycleProps,
  animatedHumanNetworkProps,
  animatedKeyStatementProps,
  animatedSystemComparisonProps,
} from "./previews";
import { AEPOCH_COLORS, AEPOCH_TYPE } from "./tokens";

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

export const TEST_REEL_CAPTIONS: readonly AepochCaptionCue[] = [
  { id: "hook", startFrame: 72, endFrame: 195, text: "For centuries, we have measured value through production." },
  { id: "key-1", startFrame: 220, endFrame: 265, text: "ÆPOCH begins somewhere else." },
  { id: "key-2", startFrame: 265, endFrame: 320, text: "Presence activates value." },
  { id: "field", startFrame: 345, endFrame: 490, text: "What we count shapes what we value: production, or presence." },
  { id: "life-1", startFrame: 520, endFrame: 570, text: "Show up. Activate." },
  { id: "life-2", startFrame: 570, endFrame: 695, text: "Circulate. What moves becomes permanent." },
  { id: "network-1", startFrame: 730, endFrame: 825, text: "Participation, not accumulation, defines power." },
  { id: "network-2", startFrame: 825, endFrame: 915, text: "One human. One vote." },
  { id: "comparison-1", startFrame: 940, endFrame: 1035, text: "Different systems produce different realities:" },
  { id: "comparison-2", startFrame: 1035, endFrame: 1125, text: "extraction or contribution, concentration or flow." },
  { id: "outro", startFrame: 1150, endFrame: 1265, text: "Presence activates value. Flow makes it permanent." },
] as const;

const TitleSlate: React.FC<{ reducedMotion?: boolean }> = ({ reducedMotion }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: AEPOCH_COLORS.earthRiseBase, fontFamily: AEPOCH_TYPE.family, color: AEPOCH_COLORS.ink }}>
      <EarthRise />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", ...revealStyle(reveal({ frame, startFrame: 0, durationFrames: 22, reducedMotion })) }}>
        <AepochMark width={112} color={AEPOCH_COLORS.inkMid} />
        <div style={{ marginTop: 34, fontSize: 62, fontWeight: 800, letterSpacing: -2 }}>Tier 1 module test reel</div>
        <div style={{ marginTop: 14, fontSize: 24, color: AEPOCH_COLORS.inkMid }}>Motion implementation review</div>
      </div>
    </AbsoluteFill>
  );
};

const OutroLanding: React.FC<{ reducedMotion?: boolean }> = ({ reducedMotion }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: AEPOCH_COLORS.earthRiseBase, fontFamily: AEPOCH_TYPE.family, color: AEPOCH_COLORS.ink }}>
      <EarthRise />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontSize: 66, fontWeight: 800, letterSpacing: -2.4, ...revealStyle(reveal({ frame, startFrame: 0, durationFrames: 22, reducedMotion })) }}>
          Presence activates value.
        </div>
        <div style={{ marginTop: 14, fontSize: 46, color: AEPOCH_COLORS.inkMid, ...revealStyle(reveal({ frame, startFrame: 24, durationFrames: 22, reducedMotion })) }}>
          Flow makes it permanent.
        </div>
        <div style={{ marginTop: 50, ...revealStyle(reveal({ frame, startFrame: 54, durationFrames: 22, fromScale: 0.96, reducedMotion })) }}>
          <AepochMark width={90} color={AEPOCH_COLORS.inkMid} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CaptionLayer: React.FC<{ cues: readonly AepochCaptionCue[] }> = ({ cues }) => {
  const frame = useCurrentFrame();
  const cue = activeCaption(frame, cues);
  if (!cue) return null;
  return (
    <div style={{ position: "absolute", left: 210, right: 210, bottom: 42, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ background: "rgba(250,248,245,0.92)", border: `1px solid ${AEPOCH_COLORS.border}`, borderRadius: 22, padding: "16px 30px", fontFamily: AEPOCH_TYPE.family, fontSize: 36, fontWeight: 700, color: AEPOCH_COLORS.ink, textAlign: "center", lineHeight: 1.18 }}>
        {cue.text}
      </div>
    </div>
  );
};

export type AepochTier1TestReelProps = {
  [key: string]: unknown;
  showCaptions?: boolean;
  reducedMotion?: boolean;
};

export const AepochTier1TestReel: React.FC<AepochTier1TestReelProps> = ({
  showCaptions = true,
  reducedMotion = false,
}) => {
  const common = { showDebugLabel: false, showCornerMark: false, reducedMotion };
  return (
    <AbsoluteFill style={{ background: AEPOCH_COLORS.earthRiseBase }}>
      <Sequence from={TEST_REEL_TIMING.title.start} durationInFrames={TEST_REEL_TIMING.title.duration}>
        <TitleSlate reducedMotion={reducedMotion} />
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.declarativeHook.start} durationInFrames={TEST_REEL_TIMING.declarativeHook.duration}>
        <DeclarativeHook {...animatedDeclarativeHookProps} {...common} />
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.keyStatement.start} durationInFrames={TEST_REEL_TIMING.keyStatement.duration}>
        <KeyStatement {...animatedKeyStatementProps} {...common} />
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.circularValueField.start} durationInFrames={TEST_REEL_TIMING.circularValueField.duration}>
        <CircularValueField {...animatedCircularValueFieldProps} {...common} />
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.flowLifecycle.start} durationInFrames={TEST_REEL_TIMING.flowLifecycle.duration}>
        <FlowLifecycle {...animatedFlowLifecycleProps} {...common} />
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.humanNetwork.start} durationInFrames={TEST_REEL_TIMING.humanNetwork.duration}>
        <HumanNetwork {...animatedHumanNetworkProps} {...common} />
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.systemComparison.start} durationInFrames={TEST_REEL_TIMING.systemComparison.duration}>
        <SystemComparison {...animatedSystemComparisonProps} {...common} />
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.outro.start} durationInFrames={TEST_REEL_TIMING.outro.duration}>
        <OutroLanding reducedMotion={reducedMotion} />
      </Sequence>
      {showCaptions ? <CaptionLayer cues={TEST_REEL_CAPTIONS} /> : null}
    </AbsoluteFill>
  );
};

