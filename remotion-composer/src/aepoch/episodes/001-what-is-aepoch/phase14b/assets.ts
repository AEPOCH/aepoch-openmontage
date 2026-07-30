// Phase 14B locked production assets — creative lock per the phase brief:
// Direction A / Editorial Geometric, exactly these four files. No other
// Manufactured Consensus candidate (consensus-edit-b, consensus-edit-c, or
// consensus-a) may be substituted without new authorization.
//
// Each PNG was copied byte-for-byte from its authoritative phase output
// under projects/aepoch-episodes/001-what-is-aepoch/assets/ into this
// Remotion project's public/ folder (gitignored, per
// remotion-composer/public/*) so it can be served via staticFile().

export const PHASE14B_ASSETS = {
  /** Phase 14A.2 — Human Among Synthetic Echoes, Candidate A. 1344x768. */
  echoesA: "aepoch-e001-phase14b/echoes-a.png",
  /** Phase 14A.2 — Uncertain Digital Reflection, Candidate A. 1344x768. */
  reflectionA: "aepoch-e001-phase14b/reflection-a.png",
  /** Phase 14A.3 — Manufactured Consensus repair, Candidate A (lateral
   * synchronization). 1392x752. An illustration plate, not a finished
   * concept — the "resolve into one shared output" device is built here in
   * Remotion, not asked of the image model again. */
  consensusEditA: "aepoch-e001-phase14b/consensus-edit-a.png",
  /** Phase 14A.1 Direction A / Frame 3 — Synthetic Multiplication. 1344x768. */
  syntheticMultiplication: "aepoch-e001-phase14b/synthetic-multiplication.png",
} as const;

/** The exact proof-segment audio extracted from Lee's original recording
 * (no time-stretch, no normalization/EQ/denoise) — see
 * qa/phase-14b-production-proof-review.md for the exact boundaries. */
export const PHASE14B_AUDIO_FILE = "aepoch-e001-phase14b-proof-audio.wav";
