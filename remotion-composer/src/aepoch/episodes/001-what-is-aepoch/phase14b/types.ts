// Phase 14B — production-quality visual proof.
//
// Fresh types for the asset-first hybrid proof. Deliberately not extending
// or reusing the Phase 13C.2A `EpisodeSceneBase`/motion-blocking types
// (../types.ts, ../timeline.ts) — that prototype was creatively rejected
// (see PHASE_LOG.md's Phase 13C.2A entry) and this phase's instructions are
// explicit that it must not serve as a creative baseline. Only the shared
// Tier 1 primitives (../../tokens, ../../motion) are imported.

export type Phase14bBeatId =
  | "beat1-something-off"
  | "beat2-echoes"
  | "beat3-reflection"
  | "beat4-catfished"
  | "beat5-multiplication"
  | "beat6-consensus";

export interface Phase14bBeatSchedule {
  id: Phase14bBeatId;
  name: string;
  /** Frame this beat starts on, in the overall proof composition. */
  startFrame: number;
  /** How many frames this beat's <Sequence> occupies (including any held
   * crossfade-out overlap with the next beat). */
  durationFrames: number;
  /** Frame offsets are local to the beat's own Sequence (i.e. 0 = this
   * beat's first frame), matching Remotion's useCurrentFrame() inside a
   * <Sequence>. Each entry names the spoken word/phrase it is anchored to
   * and the exact word-level start time (seconds, from
   * inputs/phase-14b-proof-word-timings.json) that frame offset was derived
   * from — never an invented value. */
  markers: Phase14bMarker[];
}

export interface Phase14bMarker {
  /** Short label for the spoken anchor, e.g. "something's off". */
  label: string;
  /** Frame offset local to the beat's Sequence. */
  localFrame: number;
  /** The exact word-level start time (seconds) this marker was derived from. */
  sourceSeconds: number;
}
