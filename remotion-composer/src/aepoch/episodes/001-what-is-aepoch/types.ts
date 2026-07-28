// Phase 13B — Episode 001 ("What is ÆPOCH?") static reference-frame types.
//
// These extend the shared AepochSceneBase contract from ../../types.ts
// (part of the tagged aepoch-tier1-beta-v0.1.0 baseline, imported but not
// modified) for the four genuinely new modules and the four episode-specific
// Tier 1 variants whose settled composition the frozen Tier 1 components
// cannot express without changing their props/validators.

import type { AepochCameraMove, AepochTransition } from "../../types";

// AepochSceneBase (../../types.ts) carries a `[key: string]: unknown` index
// signature, which makes `Omit<AepochSceneBase, "module">` collapse every
// named field's type down to `unknown` under TypeScript's keyof/mapped-type
// rules — so instead of Omit, this duplicates the base contract's field
// shapes explicitly (same fields, same types) and re-types `module` to each
// episode component's own literal. Nothing in ../../types.ts is modified.
interface EpisodeSceneBase<TModule extends string> {
  // Matches AepochSceneBase's index signature — Remotion's <Composition>
  // generic needs a component prop type assignable to Record<string,
  // unknown>, which requires this signature (the same reason the frozen
  // Tier 1 prop types carry one).
  [key: string]: unknown;
  id: string;
  module: TModule;
  startFrame: number;
  durationFrames: number;
  narration?: {
    audioPath?: string;
    startFrame?: number;
    endFrame?: number;
    transcript?: string;
  };
  copy?: {
    eyebrow?: string;
    headline?: string;
    body?: string;
    footnote?: string;
  };
  theme?: "earth-rise" | "paper" | "void" | "depth";
  emphasis?: "earth" | "cosmos" | "balanced" | "signal";
  textAlign?: "left" | "center" | "right";
  transitionIn?: AepochTransition;
  transitionOut?: AepochTransition;
  camera?: AepochCameraMove;
  reducedMotion?: boolean;
  seed?: number;
  showDebugLabel?: boolean;
  showCornerMark?: boolean;
  captions?: {
    enabled?: boolean;
    reserveBottomPx?: number;
  };
  assetRefs?: string[];
}

export type WelcomeDirectAddressState = "welcome" | "august9";

export interface WelcomeDirectAddressProps extends EpisodeSceneBase<"welcome-direct-address"> {
  state: WelcomeDirectAddressState;
  /** Only used when state === "august9". */
  dateLabel?: string;
  /** Two settled-posture candidates for the Welcome state (13B candidate A/B). */
  posture?: "settled-a" | "settled-b";
  /** Optional restrained presence-ring/breath-pulse cue, shown as a static thin ring. */
  presenceRing?: boolean;
}

export type SyntheticMultiplicationConfiguration =
  | "mimicry"
  | "multiplication"
  | "manufactured-consensus";

export interface SyntheticMultiplicationProps extends EpisodeSceneBase<"synthetic-multiplication"> {
  configuration: SyntheticMultiplicationConfiguration;
  /** Candidate treatment for configurations that need alternate stills (Mimicry, Manufactured consensus). */
  candidate?: "a" | "b";
}

export type HumanConsequenceState = "uncertain-reflection" | "extraction";

export interface HumanConsequenceProps extends EpisodeSceneBase<"human-consequence"> {
  state: HumanConsequenceState;
}

export interface AepochSeriesOutroProps extends EpisodeSceneBase<"series-outro"> {
  conclusion: string;
  identifier?: string;
}

export type DeclarativeHookVariant = "built-for-another-world" | "does-not-recognize-presence";

export interface DeclarativeHookVariantProps extends EpisodeSceneBase<"declarative-hook"> {
  eyebrow?: string;
  lines: string[];
  variant: DeclarativeHookVariant;
}

export interface CircularValueFieldTrafficDataProps extends EpisodeSceneBase<"circular-value-field"> {
  automatedValue: string;
  automatedLabel: string;
  projectedValue: string;
  projectedLabel: string;
  footer?: string;
}

export interface CircularValueFieldConnectedPolesProps extends EpisodeSceneBase<"circular-value-field"> {
  leftLabel: string;
  rightLabel: string;
  footer?: string;
  candidate?: "a" | "b";
}

export interface HumanNetworkProtocolLayerProps extends EpisodeSceneBase<"human-network"> {
  headline?: string;
  supportingLine?: string;
  nodeCount?: number;
  candidate?: "a" | "b";
}

// Phase 13B.1 Correction 8: episode-specific symbolic-path replacement for
// the 42-day test sequence. Deliberately not "FlowLifecycleProps" from
// ../../types — that shape assumes the frozen card-based layout; this is a
// distinct local component, not a reskin of the frozen FlowLifecycle.
export interface FlowLifecyclePathStep {
  id: string;
  label: string;
  pole: "earth" | "cosmos" | "balanced";
}

export interface FlowLifecyclePathProps extends EpisodeSceneBase<"flow-lifecycle"> {
  headline?: string;
  steps: FlowLifecyclePathStep[];
}

// Phase 13B.2 — five episode-specific "statement moment" compositions that
// replace the frozen KeyStatement reuse for Scenes 13, 15, 17, 20, and 21.
// Scene 3 (the reference baseline) keeps using the frozen KeyStatement
// unchanged; these five needed their own local components because the
// correction's whole point is that they must NOT share KeyStatement's
// Comet-Arc/pale-cosmos-circle/small-human layout with Scene 3 or with each
// other. None of these extend/reskin the frozen KeyStatement type.

// Scene 13 — the episode's one and only Signal moment.
export interface SignalStatementProps extends EpisodeSceneBase<"key-statement"> {
  statement: string;
}

// Scene 15 — human recognition.
export interface ContributionStatementProps extends EpisodeSceneBase<"key-statement"> {
  statement: string;
}

// Scene 17 — radical conceptual reduction.
export interface OneIdeaStatementProps extends EpisodeSceneBase<"key-statement"> {
  headline: string;
  supportingLine?: string;
}

// Scene 20 — the thesis landing; two-part text hierarchy over a stable
// presence field.
export interface FinalThesisStatementProps extends EpisodeSceneBase<"key-statement"> {
  headline: string;
  supportingLine: string;
}

// Scene 21 — intimate, embodied, slightly playful.
export interface BiologicalTransformerStatementProps extends EpisodeSceneBase<"key-statement"> {
  statement: string;
}
