import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { AepochMark, EarthRise } from "./components";
import { CaptionPanel, TEST_REEL_CAPTIONS, TEST_REEL_TIMING } from "./captions";
import {
  CircularValueField,
  DeclarativeHook,
  FlowLifecycle,
  HumanNetwork,
  KeyStatement,
  SystemComparison,
} from "./modules";
import { reveal, revealStyle } from "./motion";
import {
  animatedCircularValueFieldProps,
  animatedDeclarativeHookProps,
  animatedFlowLifecycleProps,
  animatedHumanNetworkProps,
  animatedKeyStatementProps,
  animatedSystemComparisonProps,
} from "./previews";
import { AEPOCH_COLORS, AEPOCH_TYPE } from "./tokens";

export { TEST_REEL_TIMING, TEST_REEL_CAPTIONS };

// Phase 12C: ordinary-module transitions crossfade instead of hard-cutting
// to an empty background. Every module scene paints an opaque background
// (AepochScene / EarthRise), so fading the *outgoing* scene's own opacity
// would do nothing — the opaque *incoming* scene already fully occludes it
// the instant it mounts. The correct dissolve is the other way around:
// the outgoing module's Sequence is extended by CROSSFADE_FRAMES past its
// nominal duration (it just holds its settled final frame, fully opaque),
// and the *incoming* module fades its own opacity 0 -> 1 over its first
// CROSSFADE_FRAMES local frames, dissolving over the still-visible
// outgoing scene beneath it. A full empty-background reset remains only
// after the title slate and going into the outro landing, as specified.
const CROSSFADE_FRAMES = 12;

// Reduced motion shows every scene fully settled from its first frame, so
// there is no "empty" moment for a hard cut to expose — the crossfade
// dissolve (itself a motion effect) is skipped and reduced-motion scenes
// simply cut, matching the reduced-motion contract used everywhere else.
const CrossfadeIn: React.FC<{ reducedMotion?: boolean; children: React.ReactNode }> = ({
  reducedMotion,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = reducedMotion
    ? 1
    : interpolate(frame, [0, CROSSFADE_FRAMES], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

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
      <Sequence from={TEST_REEL_TIMING.declarativeHook.start} durationInFrames={TEST_REEL_TIMING.declarativeHook.duration + CROSSFADE_FRAMES}>
        <DeclarativeHook {...animatedDeclarativeHookProps} {...common} />
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.keyStatement.start} durationInFrames={TEST_REEL_TIMING.keyStatement.duration + CROSSFADE_FRAMES}>
        <CrossfadeIn reducedMotion={reducedMotion}>
          <KeyStatement {...animatedKeyStatementProps} {...common} />
        </CrossfadeIn>
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.circularValueField.start} durationInFrames={TEST_REEL_TIMING.circularValueField.duration + CROSSFADE_FRAMES}>
        <CrossfadeIn reducedMotion={reducedMotion}>
          <CircularValueField {...animatedCircularValueFieldProps} {...common} />
        </CrossfadeIn>
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.flowLifecycle.start} durationInFrames={TEST_REEL_TIMING.flowLifecycle.duration + CROSSFADE_FRAMES}>
        <CrossfadeIn reducedMotion={reducedMotion}>
          <FlowLifecycle {...animatedFlowLifecycleProps} {...common} />
        </CrossfadeIn>
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.humanNetwork.start} durationInFrames={TEST_REEL_TIMING.humanNetwork.duration + CROSSFADE_FRAMES}>
        <CrossfadeIn reducedMotion={reducedMotion}>
          <HumanNetwork {...animatedHumanNetworkProps} {...common} />
        </CrossfadeIn>
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.systemComparison.start} durationInFrames={TEST_REEL_TIMING.systemComparison.duration}>
        <CrossfadeIn reducedMotion={reducedMotion}>
          <SystemComparison {...animatedSystemComparisonProps} {...common} />
        </CrossfadeIn>
      </Sequence>
      <Sequence from={TEST_REEL_TIMING.outro.start} durationInFrames={TEST_REEL_TIMING.outro.duration}>
        <OutroLanding reducedMotion={reducedMotion} />
      </Sequence>
      {showCaptions ? <CaptionPanel cues={TEST_REEL_CAPTIONS} /> : null}
    </AbsoluteFill>
  );
};
