// Phase 14B — production-quality visual proof timeline.
//
// Every number below is transcribed directly from
// inputs/phase-14b-proof-word-timings.json (faster-whisper word-level
// timestamps on Lee's real recording, refined against ffmpeg silencedetect
// gaps — see that file's `boundary_method`/`beat_schedule`/
// `required_markers` fields for the full evidence trail). Nothing here is
// invented or estimated; the JSON is the source of truth and this file is a
// typed transcription of it for the Remotion bundle (which has no JSON-at-
// build-time guarantee the way ../timeline.ts's own comment explains for
// the Phase 13C.2A prototype).

export const PHASE14B_FPS = 30;
export const PHASE14B_TOTAL_FRAMES = 1410; // 47.00s exact, from the extracted proof-segment audio duration.

export const PHASE14B_MARKERS = {
  somethingsOff: 97, // "something's off." — beat1-local frame
  commentsThatSoundHuman: 10, // "Comments that sound human, but aren't." — beat2-local
  fasterThanHumansCanType: 115, // "Responses that get written faster than humans can type." — beat2-local
  lipsDontQuiteSync: 62, // "...their lips aren't quite sinking." (spoken deviation from script — see word-timings JSON) — beat3-local
  catfished: 193, // "...getting catfish." (spoken deviation — see word-timings JSON) — beat4-local
  botsCanCreateAccounts: 31, // "bots can create accounts at lightning speed." — beat5-local
  voiceClones: 141, // "AI can generate voice clones and live video clones" — beat5-local
  neverSleep: 361, // "...and never sleep." — beat5-local
  billionsOfFakeAccounts: 29, // "They hide behind billions of fake accounts." — beat6-local
  manufacturingConsensus: 194, // "...manufacturing consensus and attempting..." — beat6-local
} as const;

export type Phase14bBeatId =
  | "beat1-something-off"
  | "beat2-echoes"
  | "beat3-reflection"
  | "beat4-catfished"
  | "beat5-multiplication"
  | "beat6-consensus";

export interface Phase14bScheduleEntry {
  id: Phase14bBeatId;
  name: string;
  startFrame: number;
  durationFrames: number;
}

// startFrame/durationFrames define each beat's own <Sequence> window in the
// overall 1410-frame proof composition. Cut points (0, 126, 290, 400, 700,
// 1082, 1410) all fall inside a real ffmpeg-detected silence gap adjacent to
// the cut — see the word-timings JSON's `beat_schedule` for each gap's exact
// bounds. The transition layer (../phase14b/transitions.tsx) adds
// CROSSFADE_FRAMES on top of these nominal durations for every beat except
// the last.
export const PHASE14B_SCHEDULE: Phase14bScheduleEntry[] = [
  { id: "beat1-something-off", name: "Something's Off", startFrame: 0, durationFrames: 126 },
  { id: "beat2-echoes", name: "Comments and Rapid Responses", startFrame: 126, durationFrames: 164 },
  { id: "beat3-reflection", name: "Uncertain Video Identity", startFrame: 290, durationFrames: 110 },
  { id: "beat4-catfished", name: "Phone Calls and Catfishing", startFrame: 400, durationFrames: 300 },
  { id: "beat5-multiplication", name: "Synthetic Multiplication", startFrame: 700, durationFrames: 382 },
  { id: "beat6-consensus", name: "Manufactured Consensus", startFrame: 1082, durationFrames: 328 },
];
