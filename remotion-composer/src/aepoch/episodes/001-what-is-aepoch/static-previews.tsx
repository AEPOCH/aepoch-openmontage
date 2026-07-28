// Phase 13B / 13B.1 / 13B.2 — Episode 001 static reference-frame preview
// registry.
//
// Phase 13B.1 creative-review correction pass: several candidate pairs were
// resolved to a single approved direction (Mimicry candidate A, Ancient
// idea/modern tools candidate A, HumanNetwork protocol-layer candidate B —
// see episode-brief.md's Phase 13B.1 section), so those now export one prop
// object instead of an A/B pair. Manufactured Consensus and Welcome keep two
// candidates each (both fully redesigned/rebuilt per Corrections 1 and 4).
// The 42-day test (Correction 8) no longer reuses the frozen FlowLifecycle
// component at all — it's a new local symbolic-path component instead.
//
// Phase 13B.2: Scenes 13, 15, 17, 20, 21 no longer reuse the frozen
// KeyStatement component — see the dedicated section below. Scenes 3 and 4
// still do (Scene 3 is the deliberate reference baseline; Scene 4 is a
// plain DeclarativeHook reuse, never part of the repetition problem).
//
// The "storyboard-only" naming from Phase 13B.1 is kept for Scenes 3 and 4
// (still frozen-component renders added only to complete the full 22-scene
// storyboard, not new creative work); Scenes 13/15/17/20/21 have moved out
// of that category since they're now genuine new episode-specific designs.

import React from "react";
import { DeclarativeHook, HumanNetwork, KeyStatement } from "../../modules";
import type { DeclarativeHookProps, HumanNetworkProps, KeyStatementProps } from "../../types";
import { E001_SEED } from "./tokens";
import {
  AepochSeriesOutro,
  BiologicalTransformerStatement,
  CircularValueFieldConnectedPoles,
  CircularValueFieldTrafficData,
  ContributionStatement,
  DeclarativeHookVariant,
  FinalThesisStatement,
  FlowLifecyclePathVariant,
  HumanConsequence,
  HumanNetworkProtocolLayer,
  OneIdeaStatement,
  SignalStatement,
  SyntheticMultiplication,
  WelcomeDirectAddress,
} from "./variants";
import type {
  AepochSeriesOutroProps,
  BiologicalTransformerStatementProps,
  CircularValueFieldConnectedPolesProps,
  CircularValueFieldTrafficDataProps,
  ContributionStatementProps,
  DeclarativeHookVariantProps,
  FinalThesisStatementProps,
  FlowLifecyclePathProps,
  HumanConsequenceProps,
  HumanNetworkProtocolLayerProps,
  OneIdeaStatementProps,
  SignalStatementProps,
  SyntheticMultiplicationProps,
  WelcomeDirectAddressProps,
} from "./types";

const staticBase = {
  startFrame: 0,
  durationFrames: 90,
  theme: "earth-rise" as const,
  emphasis: "balanced" as const,
  textAlign: "left" as const,
  transitionIn: "instant" as const,
  transitionOut: "instant" as const,
  camera: "cameraStill" as const,
  reducedMotion: true,
  showDebugLabel: false,
  showCornerMark: false,
  seed: E001_SEED,
  captions: { enabled: false },
  assetRefs: [] as string[],
};

// ---------------------------------------------------------------------------
// 01-03. WelcomeDirectAddress — Correction 1: two new candidates using the
// rebuilt SymbolicFigure (editorial adult proportions, not a mascot).
// ---------------------------------------------------------------------------
export const welcomeAProps: WelcomeDirectAddressProps = {
  ...staticBase,
  id: "e001-welcome-direct-address-a",
  module: "welcome-direct-address",
  state: "welcome",
  posture: "settled-a",
  presenceRing: true,
};

export const welcomeBProps: WelcomeDirectAddressProps = {
  ...staticBase,
  id: "e001-welcome-direct-address-b",
  module: "welcome-direct-address",
  state: "welcome",
  posture: "settled-b",
  presenceRing: false,
};

// "Use the approved candidate to update the August 9 continuation as well."
// Candidate A is used as the default pending author sign-off between the two
// new candidates — documented in the QA update, not a creative decision made
// silently.
export const august9ContinuationProps: WelcomeDirectAddressProps = {
  ...staticBase,
  id: "e001-august-9-continuation",
  module: "welcome-direct-address",
  state: "august9",
  posture: "settled-a",
  presenceRing: true,
  dateLabel: "August 9",
};

export const WelcomeDirectAddressPreview: React.FC<WelcomeDirectAddressProps> = (props) => (
  <WelcomeDirectAddress {...props} />
);

// ---------------------------------------------------------------------------
// 04-07. SyntheticMultiplication
// Theme per approved scene-plan.yaml: sc05 (Mimicry) and sc06 (Multiplication)
// are "void"; sc07 (Manufactured consensus) is "depth".
// ---------------------------------------------------------------------------

// Mimicry: candidate A retained as the sole approved base (Correction 3);
// no candidate B is rendered going forward.
export const synthMimicryProps: SyntheticMultiplicationProps = {
  ...staticBase,
  id: "e001-synthetic-mimicry",
  module: "synthetic-multiplication",
  theme: "void",
  configuration: "mimicry",
  candidate: "a",
};

export const synthMultiplicationProps: SyntheticMultiplicationProps = {
  ...staticBase,
  id: "e001-synthetic-multiplication",
  module: "synthetic-multiplication",
  theme: "void",
  configuration: "multiplication",
};

// Manufactured consensus: Correction 4 full replacement — both candidates
// are new designs (evolution of the Multiplication grid into a shared
// pressure band / synchronized rhythm), not the old bordered panel.
export const synthManufacturedConsensusAProps: SyntheticMultiplicationProps = {
  ...staticBase,
  id: "e001-manufactured-consensus-a",
  module: "synthetic-multiplication",
  theme: "depth",
  configuration: "manufactured-consensus",
  candidate: "a",
};

export const synthManufacturedConsensusBProps: SyntheticMultiplicationProps = {
  ...staticBase,
  id: "e001-manufactured-consensus-b",
  module: "synthetic-multiplication",
  theme: "depth",
  configuration: "manufactured-consensus",
  candidate: "b",
};

export const SyntheticMultiplicationPreview: React.FC<SyntheticMultiplicationProps> = (props) => (
  <SyntheticMultiplication {...props} />
);

// ---------------------------------------------------------------------------
// 08-09. HumanConsequence — Correction 5 (uncertain reflection) and
// Correction 6 (extraction) full replacements; Correction 2 scale increase.
// Theme per approved scene-plan.yaml: both sc09/sc10 are "depth".
// ---------------------------------------------------------------------------
export const humanConsequenceUncertainReflectionProps: HumanConsequenceProps = {
  ...staticBase,
  id: "e001-human-consequence-uncertain-reflection",
  module: "human-consequence",
  theme: "depth",
  state: "uncertain-reflection",
};

export const humanConsequenceExtractionProps: HumanConsequenceProps = {
  ...staticBase,
  id: "e001-human-consequence-extraction",
  module: "human-consequence",
  theme: "depth",
  state: "extraction",
};

export const HumanConsequencePreview: React.FC<HumanConsequenceProps> = (props) => <HumanConsequence {...props} />;

// ---------------------------------------------------------------------------
// 10-11. DeclarativeHook variants — unchanged by Phase 13B.1 (not in the
// correction list); re-exported as-is.
// ---------------------------------------------------------------------------
export const declarativeHookBuiltForAnotherWorldProps: DeclarativeHookVariantProps = {
  ...staticBase,
  id: "e001-declarative-hook-built-for-another-world",
  module: "declarative-hook",
  theme: "void",
  eyebrow: "Under all of that,",
  lines: ["Built for another world."],
  variant: "built-for-another-world",
};

export const declarativeHookDoesNotRecognizePresenceProps: DeclarativeHookVariantProps = {
  ...staticBase,
  id: "e001-declarative-hook-does-not-recognize-presence",
  module: "declarative-hook",
  theme: "void",
  eyebrow: "And it doesn't recognize",
  lines: ["Can't see attention,", "care, creativity."],
  variant: "does-not-recognize-presence",
};

export const DeclarativeHookVariantPreview: React.FC<DeclarativeHookVariantProps> = (props) => (
  <DeclarativeHookVariant {...props} />
);

// ---------------------------------------------------------------------------
// 12. CircularValueField — traffic data — Correction 7.
// ---------------------------------------------------------------------------
export const circularValueFieldTrafficDataProps: CircularValueFieldTrafficDataProps = {
  ...staticBase,
  theme: "paper",
  id: "e001-circular-value-field-traffic-data",
  module: "circular-value-field",
  automatedValue: "53%",
  automatedLabel: "Automated.",
  projectedValue: "90%+",
  projectedLabel: "Could climb past",
};

export const CircularValueFieldTrafficDataPreview: React.FC<CircularValueFieldTrafficDataProps> = (props) => (
  <CircularValueFieldTrafficData {...props} />
);

// ---------------------------------------------------------------------------
// 13. CircularValueField "ancient idea / modern tools" — candidate A
// (straight connecting path) retained as the sole approved base.
// ---------------------------------------------------------------------------
export const ancientIdeaModernToolsProps: CircularValueFieldConnectedPolesProps = {
  ...staticBase,
  id: "e001-ancient-idea-modern-tools",
  module: "circular-value-field",
  leftLabel: "Ancient idea",
  rightLabel: "Modern tools",
  footer: "An ancient idea. Modern tools.",
  candidate: "a",
};

export const CircularValueFieldConnectedPolesPreview: React.FC<CircularValueFieldConnectedPolesProps> = (props) => (
  <CircularValueFieldConnectedPoles {...props} />
);

// ---------------------------------------------------------------------------
// 14. HumanNetwork "protocol layer" — candidate B (organic human spacing)
// retained as the sole approved base.
// ---------------------------------------------------------------------------
export const humanNetworkProtocolLayerProps: HumanNetworkProtocolLayerProps = {
  ...staticBase,
  id: "e001-human-network-protocol-layer",
  module: "human-network",
  headline: "A layer for the\ninternet.",
  supportingLine: "That can recognize this, and eventually pay for it.",
  nodeCount: 7,
  candidate: "b",
};

export const HumanNetworkProtocolLayerPreview: React.FC<HumanNetworkProtocolLayerProps> = (props) => (
  <HumanNetworkProtocolLayer {...props} />
);

// ---------------------------------------------------------------------------
// 15. HumanNetwork — participant cohort (frozen component, new data only).
// Unchanged by Phase 13B.1.
// ---------------------------------------------------------------------------
export const humanNetworkParticipantCohortProps: HumanNetworkProps = {
  ...staticBase,
  id: "e001-human-network-participant-cohort",
  module: "human-network",
  headline: "You'll notice things\nwe can't.",
  supportingLine: "Early testers, distributed and distinct.",
  topology: "distributed",
  nodes: [
    { id: "p1", position: { x: 940, y: 240 }, state: "present" },
    { id: "p2", position: { x: 1120, y: 150 }, state: "present" },
    { id: "p3", position: { x: 1310, y: 260 }, state: "active" },
    { id: "p4", position: { x: 1480, y: 170 }, state: "present" },
    { id: "p5", position: { x: 1010, y: 420 }, state: "present" },
    { id: "p6", position: { x: 1230, y: 470 }, state: "active" },
    { id: "p7", position: { x: 1440, y: 400 }, state: "present" },
    { id: "p8", position: { x: 1580, y: 520 }, state: "present" },
    { id: "p9", position: { x: 1080, y: 600 }, state: "present" },
  ],
  edges: [
    { from: "p1", to: "p5", type: "relationship" },
    { from: "p3", to: "p6", type: "relationship" },
    { from: "p4", to: "p7", type: "relationship" },
    { from: "p6", to: "p9", type: "relationship" },
  ],
};

export const HumanNetworkParticipantCohortPreview: React.FC<HumanNetworkProps> = (props) => (
  <HumanNetwork {...props} />
);

// ---------------------------------------------------------------------------
// 16. FlowLifecyclePathVariant — 42-day test — Correction 8 full replacement.
// ---------------------------------------------------------------------------
export const flowLifecyclePathProps: FlowLifecyclePathProps = {
  ...staticBase,
  id: "e001-flow-lifecycle-path",
  module: "flow-lifecycle",
  headline: "For 42 days, starting August 9.",
  steps: [
    { id: "start", label: "Start August 9", pole: "earth" },
    { id: "test", label: "Test what we built", pole: "cosmos" },
    { id: "notice", label: "Notice what happens", pole: "cosmos" },
    { id: "shape", label: "Shape what comes next", pole: "balanced" },
  ],
};

export const FlowLifecyclePathPreview: React.FC<FlowLifecyclePathProps> = (props) => <FlowLifecyclePathVariant {...props} />;

// ---------------------------------------------------------------------------
// 17. AepochSeriesOutro — Correction 9 (enlarged mark/identifier).
// ---------------------------------------------------------------------------
export const aepochSeriesOutroProps: AepochSeriesOutroProps = {
  ...staticBase,
  id: "e001-series-outro",
  module: "series-outro",
  conclusion: "See you tomorrow.",
  identifier: "ÆPOCH",
};

export const AepochSeriesOutroPreview: React.FC<AepochSeriesOutroProps> = (props) => <AepochSeriesOutro {...props} />;

// ---------------------------------------------------------------------------
// STORYBOARD-ONLY — frozen Tier 1 KeyStatement / DeclarativeHook renders for
// Scenes 3, 4, 13, 15, 17, 20, 21, added solely to complete the full
// 22-scene storyboard contact sheet. Not new creative design work; the
// frozen components (../../modules) are used exactly as they are, with this
// episode's approved on-screen text as data. Where the frozen component
// doesn't yet visually differentiate a prop (e.g. KeyStatement's
// `accentTreatment` and `layout` don't currently change its rendering — see
// the Phase 13B QA doc), that's a pre-existing Tier 1 baseline limitation,
// not something this phase introduces or fixes.
// ---------------------------------------------------------------------------
const keyStatementBase = {
  ...staticBase,
  module: "key-statement" as const,
  layout: "left-editorial" as const,
  accentTreatment: "none" as const,
};

export const scene03MissionProps: KeyStatementProps = {
  ...keyStatementBase,
  id: "e001-sc03-mission",
  statement: "Make the economy and internet more human again.",
};

export const KeyStatementStoryboardPreview: React.FC<KeyStatementProps> = (props) => <KeyStatement {...props} />;

// ---------------------------------------------------------------------------
// Phase 13B.2 — Scenes 13, 15, 17, 20, 21 no longer reuse the frozen
// KeyStatement (see the Phase 13B.2 QA section for why: all six scenes,
// including Scene 3, rendered as near-identical text/pale-Cosmos-circle/
// Comet-Arc/tiny-human compositions). Each now has its own local component
// (variants.tsx) with a deliberately distinct spatial arrangement.
// ---------------------------------------------------------------------------
export const scene13SignalRevealProps: SignalStatementProps = {
  ...staticBase,
  id: "e001-sc13-signal-reveal",
  module: "key-statement",
  statement: "ÆPOCH is our response.",
};

export const Scene13SignalRevealPreview: React.FC<SignalStatementProps> = (props) => <SignalStatement {...props} />;

export const scene15ContributionProps: ContributionStatementProps = {
  ...staticBase,
  id: "e001-sc15-contribution",
  module: "key-statement",
  statement: "Already a contribution.",
};

export const Scene15ContributionPreview: React.FC<ContributionStatementProps> = (props) => <ContributionStatement {...props} />;

export const scene17OneIdeaProps: OneIdeaStatementProps = {
  ...staticBase,
  id: "e001-sc17-one-idea",
  module: "key-statement",
  headline: "One idea.",
  supportingLine: "Everything else follows.",
};

export const Scene17OneIdeaPreview: React.FC<OneIdeaStatementProps> = (props) => <OneIdeaStatement {...props} />;

export const scene20FinalThesisProps: FinalThesisStatementProps = {
  ...staticBase,
  id: "e001-sc20-final-thesis",
  module: "key-statement",
  headline: "Alive and present is enough.",
  supportingLine: "Presence is the foundation of value.",
};

export const Scene20FinalThesisPreview: React.FC<FinalThesisStatementProps> = (props) => <FinalThesisStatement {...props} />;

export const scene21BiologicalTransformerProps: BiologicalTransformerStatementProps = {
  ...staticBase,
  id: "e001-sc21-biological-transformer",
  module: "key-statement",
  statement: "A magnificent biological transformer.",
};

export const Scene21BiologicalTransformerPreview: React.FC<BiologicalTransformerStatementProps> = (props) => (
  <BiologicalTransformerStatement {...props} />
);

export const scene04BuiltForHumansProps: DeclarativeHookProps = {
  ...staticBase,
  id: "e001-sc04-built-for-humans",
  module: "declarative-hook",
  theme: "void",
  eyebrow: "When the internet was invented,",
  lines: ["it was built for humans."],
  contrastMode: "earth-vs-system",
  layout: "left-editorial",
};

export const DeclarativeHookStoryboardPreview: React.FC<DeclarativeHookProps> = (props) => <DeclarativeHook {...props} />;
