import React from "react";
import { AbsoluteFill } from "remotion";
import { CaptionPanel, localCaptionCues, type TestReelModuleKey } from "./captions";
import {
  CircularValueField,
  DeclarativeHook,
  FlowLifecycle,
  HumanNetwork,
  KeyStatement,
  SystemComparison,
} from "./modules";
import type {
  CircularValueFieldProps,
  DeclarativeHookProps,
  FlowLifecycleProps,
  HumanNetworkProps,
  KeyStatementProps,
  SystemComparisonProps,
} from "./types";

const base = {
  startFrame: 0,
  durationFrames: 150,
  theme: "earth-rise" as const,
  emphasis: "balanced" as const,
  textAlign: "left" as const,
  transitionIn: "instant" as const,
  transitionOut: "instant" as const,
  camera: "cameraStill" as const,
  reducedMotion: true,
  showDebugLabel: true,
  showCornerMark: false,
  seed: 1201,
  captions: { enabled: true, reserveBottomPx: 150 },
  assetRefs: [],
};

export const declarativeHookPreviewProps: DeclarativeHookProps = {
  ...base,
  id: "aepoch-tier1-declarative-hook",
  module: "declarative-hook",
  eyebrow: "For centuries,",
  lines: ["we have measured value", "through production."],
  contrastMode: "earth-vs-system",
  layout: "left-editorial",
};

export const keyStatementPreviewProps: KeyStatementProps = {
  ...base,
  id: "aepoch-tier1-key-statement",
  module: "key-statement",
  statement: "Presence activates value.",
  accentTreatment: "none",
  layout: "left-editorial",
};

export const circularValueFieldPreviewProps: CircularValueFieldProps = {
  ...base,
  id: "aepoch-tier1-circular-value-field",
  module: "circular-value-field",
  relationship: "balanced",
  fields: [
    { id: "production", label: "Production", pole: "cosmos", subject: "system" },
    { id: "presence", label: "Presence", pole: "earth", subject: "human" },
  ],
  footer: "What we count shapes what we value.",
};

export const flowLifecyclePreviewProps: FlowLifecycleProps = {
  ...base,
  id: "aepoch-tier1-flow-lifecycle",
  module: "flow-lifecycle",
  headline: "Value becomes real when it moves.",
  layout: "horizontal",
  completionState: "permanent",
  steps: [
    { id: "show-up", label: "Show up", description: "Bring your value", icon: "presence", pole: "earth" },
    { id: "activate", label: "Activate", description: "Give it purpose", icon: "activation", pole: "cosmos" },
    { id: "circulate", label: "Circulate", description: "Let it flow", icon: "circulation", pole: "cosmos" },
    { id: "permanent", label: "Become permanent", description: "Make it part of what lasts", icon: "permanence", pole: "balanced" },
  ],
};

export const humanNetworkPreviewProps: HumanNetworkProps = {
  ...base,
  id: "aepoch-tier1-human-network",
  module: "human-network",
  headline: "One human.\nOne vote.",
  supportingLine: "Participation, not accumulation.",
  topology: "distributed",
  nodes: [
    { id: "n1", position: { x: 920, y: 260 }, state: "present" },
    { id: "n2", position: { x: 1090, y: 120 }, state: "present" },
    { id: "n3", position: { x: 1250, y: 350 }, state: "active" },
    { id: "n4", position: { x: 1420, y: 120 }, state: "present" },
    { id: "n5", position: { x: 1560, y: 310 }, state: "present" },
    { id: "n6", position: { x: 1050, y: 560 }, state: "active" },
    { id: "n7", position: { x: 1280, y: 570 }, state: "present" },
    { id: "n8", position: { x: 1500, y: 580 }, state: "present" },
  ],
  edges: [
    { from: "n1", to: "n2", type: "relationship" },
    { from: "n1", to: "n6", type: "relationship" },
    { from: "n2", to: "n3", type: "vote" },
    { from: "n2", to: "n4", type: "relationship" },
    { from: "n3", to: "n6", type: "kairos" },
    { from: "n3", to: "n7", type: "relationship" },
    { from: "n4", to: "n5", type: "relationship" },
    { from: "n5", to: "n8", type: "vote" },
    { from: "n6", to: "n7", type: "relationship" },
    { from: "n7", to: "n8", type: "relationship" },
  ],
};

export const systemComparisonPreviewProps: SystemComparisonProps = {
  ...base,
  id: "aepoch-tier1-system-comparison",
  module: "system-comparison",
  headline: "Different systems produce different realities.",
  relationship: "contrast",
  left: {
    title: "Current system",
    register: "existing-system",
    items: ["Measures output", "Rewards accumulation", "Extracts attention", "Centralizes power"],
  },
  right: {
    title: "ÆPOCH",
    register: "aepoch",
    items: ["Verifies presence", "Rewards circulation", "Recognizes contribution", "Distributes power"],
  },
};

export const DeclarativeHookPreview: React.FC<DeclarativeHookProps> = (props) => <DeclarativeHook {...props} />;
export const KeyStatementPreview: React.FC<KeyStatementProps> = (props) => <KeyStatement {...props} />;
export const CircularValueFieldPreview: React.FC<CircularValueFieldProps> = (props) => <CircularValueField {...props} />;
export const FlowLifecyclePreview: React.FC<FlowLifecycleProps> = (props) => <FlowLifecycle {...props} />;
export const HumanNetworkPreview: React.FC<HumanNetworkProps> = (props) => <HumanNetwork {...props} />;
export const SystemComparisonPreview: React.FC<SystemComparisonProps> = (props) => <SystemComparison {...props} />;

export const animatedDeclarativeHookProps: DeclarativeHookProps = {
  ...declarativeHookPreviewProps,
  durationFrames: 150,
  reducedMotion: false,
  camera: "pushInSmall",
};

export const animatedKeyStatementProps: KeyStatementProps = {
  ...keyStatementPreviewProps,
  durationFrames: 120,
  reducedMotion: false,
};

export const animatedCircularValueFieldProps: CircularValueFieldProps = {
  ...circularValueFieldPreviewProps,
  durationFrames: 180,
  reducedMotion: false,
};

export const animatedFlowLifecycleProps: FlowLifecycleProps = {
  ...flowLifecyclePreviewProps,
  durationFrames: 210,
  reducedMotion: false,
};

export const animatedHumanNetworkProps: HumanNetworkProps = {
  ...humanNetworkPreviewProps,
  durationFrames: 210,
  reducedMotion: false,
  camera: "pullBackCollective",
};

export const animatedSystemComparisonProps: SystemComparisonProps = {
  ...systemComparisonPreviewProps,
  durationFrames: 210,
  reducedMotion: false,
};

export const reducedDeclarativeHookProps: DeclarativeHookProps = { ...animatedDeclarativeHookProps, reducedMotion: true };
export const reducedKeyStatementProps: KeyStatementProps = { ...animatedKeyStatementProps, reducedMotion: true };
export const reducedCircularValueFieldProps: CircularValueFieldProps = { ...animatedCircularValueFieldProps, reducedMotion: true };
export const reducedFlowLifecycleProps: FlowLifecycleProps = { ...animatedFlowLifecycleProps, reducedMotion: true };
export const reducedHumanNetworkProps: HumanNetworkProps = { ...animatedHumanNetworkProps, reducedMotion: true };
export const reducedSystemComparisonProps: SystemComparisonProps = { ...animatedSystemComparisonProps, reducedMotion: true };

// Phase 12C: the six standalone animated module previews get the same
// burned-caption panel used in the combined reel, sliced to each module's
// own local timeline via localCaptionCues. Independent fade behavior of
// the previews themselves is untouched — this only adds a caption layer
// on top.
const withCaptions = <P extends object>(
  ModuleComponent: React.FC<P>,
  moduleKey: TestReelModuleKey,
): React.FC<P> => {
  const cues = localCaptionCues(moduleKey);
  const Captioned: React.FC<P> = (props) => (
    <AbsoluteFill>
      <ModuleComponent {...props} />
      <CaptionPanel cues={cues} />
    </AbsoluteFill>
  );
  return Captioned;
};

export const DeclarativeHookAnimatedCaptioned = withCaptions(DeclarativeHookPreview, "declarativeHook");
export const KeyStatementAnimatedCaptioned = withCaptions(KeyStatementPreview, "keyStatement");
export const CircularValueFieldAnimatedCaptioned = withCaptions(CircularValueFieldPreview, "circularValueField");
export const FlowLifecycleAnimatedCaptioned = withCaptions(FlowLifecyclePreview, "flowLifecycle");
export const HumanNetworkAnimatedCaptioned = withCaptions(HumanNetworkPreview, "humanNetwork");
export const SystemComparisonAnimatedCaptioned = withCaptions(SystemComparisonPreview, "systemComparison");
