// Phase 13B — Episode 001 static reference-frame constants.
// Reuses AEPOCH_COLORS / AEPOCH_TYPE / AEPOCH_LAYOUT from the tagged Tier 1
// baseline (../../tokens.ts) unmodified; this file only adds episode-scoped
// values that don't belong in the shared baseline.

export const E001_SEED = 4201;

// Phase 13B.1 Correction 3: tightened from the Phase 13B ranges (offsetPx 14,
// scaleRange 0.06, opacityRange 0.14) so echoes read as "nearly identical"
// mechanical repeats rather than a loosely varied crowd. Position jitter is
// kept (echoes still can't overlap exactly), but scale/opacity variance is
// narrowed and pose is no longer alternated per echo (see components.tsx
// EchoCluster) — every echo now shares one mechanically repeated posture.
export const MIMICRY_ECHO_JITTER = {
  offsetPx: 10,
  scaleRange: 0.03,
  opacityRange: 0.07,
} as const;

// Phase 13B.1 Correction 2: dark-scene principal-composition scale multiplier
// (~30%, within the requested 25-40% range) applied to Mimicry, Multiplication,
// Manufactured Consensus, and both HumanConsequence states.
export const DARK_SCENE_SCALE = 1.3;
