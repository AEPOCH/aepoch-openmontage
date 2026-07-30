// Phase 13C.2A — Episode 001 complete motion-blocking composition assembly.
//
// Transition behavior follows the Phase 12C precedent (../../reel.tsx):
// every scene module paints an opaque background, so an ordinary "crossfade"
// is implemented by (a) holding the OUTGOING scene's Sequence open for
// CROSSFADE_FRAMES past its nominal duration (it just holds its already-
// settled final frame) and (b) wrapping the INCOMING scene in a
// CrossfadeIn that fades its own opacity 0->1 over its first
// CROSSFADE_FRAMES local frames, dissolving over the still-visible outgoing
// scene beneath it. "darkCut", "instant", and "signalReveal" scenes get no
// such wrapper (hard cut / the scene's own internal reveal carries the
// entry). Reduced-motion scenes render fully settled from frame 0, so there
// is no "empty" moment for a dissolve to expose — reduced-motion transitions
// simply cut, matching the reduced-motion contract used elsewhere in this
// codebase (see ../../reel.tsx's own CrossfadeIn comment).

import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { DeclarativeHook, HumanNetwork, KeyStatement } from "../../modules";
import { reveal } from "../../motion";
import { AEPOCH_E001_SCHEDULE, AEPOCH_E001_TOTAL_FRAMES, sceneById } from "./timeline";
import { AepochE001ReferenceAudio } from "./audio";
import {
  scene03MissionProps,
  scene04BuiltForHumansProps,
  humanNetworkParticipantCohortProps,
  welcomeAProps,
  august9ContinuationProps,
  synthMimicryProps,
  synthMultiplicationProps,
  synthManufacturedConsensusAProps,
  circularValueFieldTrafficDataProps,
  humanConsequenceUncertainReflectionProps,
  humanConsequenceExtractionProps,
  declarativeHookBuiltForAnotherWorldProps,
  declarativeHookDoesNotRecognizePresenceProps,
  scene13SignalRevealProps,
  ancientIdeaModernToolsProps,
  scene15ContributionProps,
  humanNetworkProtocolLayerProps,
  scene17OneIdeaProps,
  flowLifecyclePathProps,
  scene20FinalThesisProps,
  scene21BiologicalTransformerProps,
  aepochSeriesOutroProps,
} from "./static-previews";
import {
  WelcomeMotion,
  SyntheticMimicryMotion,
  SyntheticMultiplicationMotion,
  ManufacturedConsensusMotion,
  TrafficDataMotion,
  UncertainReflectionMotion,
  ExtractionMotion,
  BuiltForAnotherWorldMotion,
  DoesNotRecognizePresenceMotion,
  SignalStatementMotion,
  AncientIdeaModernToolsMotion,
  ContributionMotion,
  ProtocolLayerMotion,
  OneIdeaMotion,
  FlowLifecyclePathMotion,
  FinalThesisMotion,
  BiologicalTransformerMotion,
  SeriesOutroMotion,
} from "./motion";

const CROSSFADE_FRAMES = 12;

const CrossfadeIn: React.FC<{ reducedMotion?: boolean; children: React.ReactNode }> = ({ reducedMotion, children }) => {
  const frame = useCurrentFrame();
  const fade = reveal({ frame, startFrame: 0, durationFrames: CROSSFADE_FRAMES, reducedMotion });
  return <AbsoluteFill style={{ opacity: reducedMotion ? 1 : fade.opacity }}>{children}</AbsoluteFill>;
};

type SceneRenderer = (reducedMotion: boolean) => React.ReactNode;

// Maps every scene id to its rendered content. Scenes 03/04/19 reuse the
// frozen Tier 1 components directly (already frame-driven internally);
// every other scene uses its Phase 13C.2A motion wrapper from ./motion.tsx.
const sceneRenderers: Record<string, SceneRenderer> = {
  sc01: (r) => <WelcomeMotion {...welcomeAProps} reducedMotion={r} durationFrames={sceneById("sc01").durationFrames} />,
  sc02: (r) => <WelcomeMotion {...august9ContinuationProps} reducedMotion={r} durationFrames={sceneById("sc02").durationFrames} />,
  sc03: (r) => <KeyStatement {...scene03MissionProps} reducedMotion={r} durationFrames={sceneById("sc03").durationFrames} />,
  sc04: (r) => <DeclarativeHook {...scene04BuiltForHumansProps} reducedMotion={r} durationFrames={sceneById("sc04").durationFrames} />,
  sc05: (r) => <SyntheticMimicryMotion {...synthMimicryProps} reducedMotion={r} durationFrames={sceneById("sc05").durationFrames} />,
  sc06: (r) => <SyntheticMultiplicationMotion {...synthMultiplicationProps} reducedMotion={r} durationFrames={sceneById("sc06").durationFrames} />,
  sc07: (r) => <ManufacturedConsensusMotion {...synthManufacturedConsensusAProps} reducedMotion={r} durationFrames={sceneById("sc07").durationFrames} />,
  sc08: (r) => <TrafficDataMotion {...circularValueFieldTrafficDataProps} reducedMotion={r} durationFrames={sceneById("sc08").durationFrames} />,
  sc09: (r) => <UncertainReflectionMotion {...humanConsequenceUncertainReflectionProps} reducedMotion={r} durationFrames={sceneById("sc09").durationFrames} />,
  sc10: (r) => <ExtractionMotion {...humanConsequenceExtractionProps} reducedMotion={r} durationFrames={sceneById("sc10").durationFrames} />,
  sc11: (r) => <BuiltForAnotherWorldMotion {...declarativeHookBuiltForAnotherWorldProps} reducedMotion={r} durationFrames={sceneById("sc11").durationFrames} />,
  sc12: (r) => <DoesNotRecognizePresenceMotion {...declarativeHookDoesNotRecognizePresenceProps} reducedMotion={r} durationFrames={sceneById("sc12").durationFrames} />,
  sc13: (r) => <SignalStatementMotion {...scene13SignalRevealProps} reducedMotion={r} durationFrames={sceneById("sc13").durationFrames} />,
  sc14: (r) => <AncientIdeaModernToolsMotion {...ancientIdeaModernToolsProps} reducedMotion={r} durationFrames={sceneById("sc14").durationFrames} />,
  sc15: (r) => <ContributionMotion {...scene15ContributionProps} reducedMotion={r} durationFrames={sceneById("sc15").durationFrames} />,
  sc16: (r) => <ProtocolLayerMotion {...humanNetworkProtocolLayerProps} reducedMotion={r} durationFrames={sceneById("sc16").durationFrames} />,
  sc17: (r) => <OneIdeaMotion {...scene17OneIdeaProps} reducedMotion={r} durationFrames={sceneById("sc17").durationFrames} />,
  sc18: (r) => <FlowLifecyclePathMotion {...flowLifecyclePathProps} reducedMotion={r} durationFrames={sceneById("sc18").durationFrames} />,
  sc19: (r) => <HumanNetwork {...humanNetworkParticipantCohortProps} reducedMotion={r} durationFrames={sceneById("sc19").durationFrames} />,
  sc20: (r) => <FinalThesisMotion {...scene20FinalThesisProps} reducedMotion={r} durationFrames={sceneById("sc20").durationFrames} />,
  sc21: (r) => <BiologicalTransformerMotion {...scene21BiologicalTransformerProps} reducedMotion={r} durationFrames={sceneById("sc21").durationFrames} />,
  sc22: (r) => <SeriesOutroMotion {...aepochSeriesOutroProps} reducedMotion={r} durationFrames={sceneById("sc22").durationFrames} />,
};

const AepochE001MotionTimeline: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => (
  <AbsoluteFill style={{ background: "#0C0B0A" }}>
    {AEPOCH_E001_SCHEDULE.map((scene) => {
      const useCrossfadeOut = scene.transitionOut === "crossfade" && !reducedMotion;
      const useCrossfadeIn = scene.transitionIn === "crossfade" && !reducedMotion;
      const sequenceDuration = scene.durationFrames + (useCrossfadeOut ? CROSSFADE_FRAMES : 0);
      const content = sceneRenderers[scene.id](reducedMotion);
      return (
        <Sequence key={scene.id} from={scene.startFrame} durationInFrames={sequenceDuration} name={`${scene.id} — ${scene.name}`}>
          {useCrossfadeIn ? <CrossfadeIn reducedMotion={reducedMotion}>{content}</CrossfadeIn> : content}
        </Sequence>
      );
    })}
  </AbsoluteFill>
);

export type AepochE001MotionBlockingProps = {
  [key: string]: unknown;
  reducedMotion?: boolean;
};

export const AepochE001MotionBlocking: React.FC<AepochE001MotionBlockingProps> = ({ reducedMotion = false }) => (
  <AbsoluteFill style={{ background: "#0C0B0A" }}>
    <AepochE001MotionTimeline reducedMotion={reducedMotion} />
    <AepochE001ReferenceAudio />
  </AbsoluteFill>
);

export const AepochE001MotionBlockingReduced: React.FC<AepochE001MotionBlockingProps> = (props) => (
  <AepochE001MotionBlocking {...props} reducedMotion />
);

export const AEPOCH_E001_MOTION_BLOCKING_DURATION = AEPOCH_E001_TOTAL_FRAMES;
