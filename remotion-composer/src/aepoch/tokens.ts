import { Easing } from "remotion";

export const AEPOCH_VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export const AEPOCH_COLORS = {
  clay: "#C4835A",
  ochre: "#A0673A",
  sand: "#E8C9A0",
  pearl: "#D6E4F0",
  iris: "#8BAFD4",
  prism: "#B8A9D9",
  signal: "#6B5FED",
  paper: "#FAF8F5",
  earthRiseBase: "#FEFCF9",
  ink: "#1A1612",
  inkMid: "#4A4440",
  muted: "#8A8480",
  border: "#E0D8D0",
  void: "#0C0B0A",
  depth: "#141210",
  moss: "#4CAF82",
} as const;

export const AEPOCH_SEMANTIC_COLORS = {
  human: AEPOCH_COLORS.clay,
  humanSecondary: AEPOCH_COLORS.ochre,
  humanHighlight: AEPOCH_COLORS.sand,
  protocol: AEPOCH_COLORS.prism,
  relationship: AEPOCH_COLORS.iris,
  protocolWash: AEPOCH_COLORS.pearl,
  text: AEPOCH_COLORS.ink,
  textMuted: AEPOCH_COLORS.inkMid,
  surface: AEPOCH_COLORS.paper,
  border: AEPOCH_COLORS.border,
  proofOfLifeVerified: AEPOCH_COLORS.moss,
} as const;

export const AEPOCH_TYPE = {
  family: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
  size: {
    eyebrow: 24,
    hero: 96,
    headline: 64,
    section: 48,
    body: 34,
    diagram: 27,
    metadata: 22,
    footnote: 20,
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
  },
  tracking: {
    tight: -3.2,
    normal: 0,
    label: 2.2,
  },
  lineHeight: {
    hero: 0.98,
    headline: 1.02,
    body: 1.3,
  },
} as const;

export const AEPOCH_LAYOUT = {
  safe: { left: 120, right: 120, top: 90, bottom: 90 },
  captionReserveMin: 170,
  cardPadding: 48,
  regionGap: 64,
  cardRadius: 28,
  cardBorder: 2,
  baselineStroke: 3,
  heroStroke: 5,
  contentWidth: 1680,
} as const;

export const AEPOCH_DURATIONS = {
  instant: 0,
  micro: 4,
  quick: 8,
  standard: 14,
  measured: 22,
  deliberate: 36,
  ceremonial: 54,
  breath: 72,
  orbit: 150,
  intro: 120,
  outro: 135,
} as const;

export const AEPOCH_EASING = {
  linear: Easing.linear,
  standard: Easing.bezier(0.4, 0, 0.2, 1),
  easeOutCubic: Easing.bezier(0.33, 1, 0.68, 1),
  easeInCubic: Easing.bezier(0.32, 0, 0.67, 0),
  easeOutQuint: Easing.bezier(0.22, 1, 0.36, 1),
  easeInOutSine: Easing.bezier(0.37, 0, 0.63, 1),
  sharpSystem: Easing.bezier(0.7, 0, 0.84, 0),
} as const;

export const AEPOCH_RESTRAINED_SPRING = {
  damping: 200,
  stiffness: 120,
  mass: 1,
} as const;

export const AEPOCH_REDUCED_MOTION_DEFAULT = false;

