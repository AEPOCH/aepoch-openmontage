export type AepochTransition =
  | "instant"
  | "crossfade"
  | "paperWipe"
  | "darkCut"
  | "diagramBuild"
  | "signalReveal";

export type AepochCameraMove =
  | "cameraStill"
  | "pushInSmall"
  | "pushInMax"
  | "pullBackCollective"
  | "panMeasured";

export type AepochSceneModule =
  | "declarative-hook"
  | "key-statement"
  | "circular-value-field"
  | "flow-lifecycle"
  | "human-network"
  | "system-comparison";

export interface AepochSceneBase {
  [key: string]: unknown;
  id: string;
  module: AepochSceneModule;
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

export interface DeclarativeHookProps extends AepochSceneBase {
  lines: string[];
  eyebrow?: string;
  accentWord?: string;
  contrastMode?: "none" | "earth-vs-system";
  layout?: "left-editorial" | "centered-statement" | "split-tension";
}

export interface KeyStatementProps extends AepochSceneBase {
  statement: string;
  supportingLine?: string;
  accentTreatment?: "none" | "clay-underline" | "prism-ring" | "signal-reveal";
  layout?: "centered" | "left-editorial" | "statement-and-ring";
}

export interface CircularValueFieldProps extends AepochSceneBase {
  fields: Array<{
    id: string;
    label: string;
    value?: string;
    sublabel?: string;
    pole: "earth" | "cosmos" | "neutral";
    state?: "active" | "inactive" | "converging";
    subject?: "human" | "mark" | "system" | "none";
  }>;
  relationship?: "separate" | "balanced" | "converge" | "exchange";
  convergenceTarget?: "vesica" | "human-ring" | "aepoch-mark";
  footer?: string;
}

export interface FlowLifecycleProps extends AepochSceneBase {
  headline?: string;
  steps: Array<{
    id: string;
    label: string;
    description?: string;
    icon?: "presence" | "activation" | "circulation" | "permanence";
    pole: "earth" | "cosmos" | "balanced";
  }>;
  layout?: "horizontal" | "vertical" | "circular";
  currentStepId?: string;
  completionState?: "open" | "permanent" | "expired";
}

export interface HumanNetworkProps extends AepochSceneBase {
  eyebrow?: string;
  headline?: string;
  supportingLine?: string;
  nodes: Array<{
    id: string;
    position?: { x: number; y: number };
    state: "present" | "verified" | "active" | "inactive";
    label?: string;
  }>;
  edges?: Array<{
    from: string;
    to: string;
    type: "relationship" | "kairos" | "attention" | "trust" | "vote";
  }>;
  topology: "individual" | "centralized" | "distributed" | "collective-ring" | "equal-vote";
  revealOrder?: string[];
}

export interface SystemComparisonProps extends AepochSceneBase {
  headline?: string;
  left: {
    title: string;
    items: string[];
    register: "existing-system" | "neutral";
  };
  right: {
    title: string;
    items: string[];
    register: "aepoch" | "neutral";
  };
  relationship?: "contrast" | "transition" | "before-after";
}
