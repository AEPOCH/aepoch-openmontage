// Phase 13C.2A — Episode 001 motion-blocking master timeline.
//
// This does NOT read inputs/scene-timing-map.yaml at build time (no YAML
// parser is part of the Remotion bundle's dependency set, and Root.tsx must
// stay statically typed). Instead, the 23 cut-point timestamps below are
// transcribed directly from the locked, authoritative
// `projects/aepoch-episodes/001-what-is-aepoch/inputs/scene-timing-map.yaml`
// (Phase 13C.1, tag `aepoch-e001-timing-v0.1.0`) — every
// referenceStartSeconds/referenceEndSeconds boundary in that file is
// contiguous (each scene's end exactly equals the next scene's start), so
// the full 22-scene schedule reduces to 23 ordered cut points. The YAML file
// itself is never overwritten or modified by this phase.
//
// The final cut point is nudged from the file's recorded 314.665s /
// 314.67s to exactly 314.666667s (9440 frames / 30fps), per this phase's
// explicit instruction to use 9440 total frames — a sub-frame (<1ms)
// difference handled here by end alignment only, not by time-stretching
// Lee's audio (the extracted reference WAV's own measured duration,
// 314.666667s, already matches this to float precision — see the Phase
// 13C.2A QA doc's "Scene timing reconciliation" section).

export const AEPOCH_E001_FPS = 30;
export const AEPOCH_E001_TOTAL_FRAMES = 9440;
export const AEPOCH_E001_TOTAL_SECONDS = AEPOCH_E001_TOTAL_FRAMES / AEPOCH_E001_FPS;

// 23 cut points in seconds, transcribed from scene-timing-map.yaml's
// referenceStartSeconds (sc01) followed by every scene's referenceEndSeconds.
const CUT_POINTS_SECONDS = [
  0.0, // sc01 start
  21.17, // sc01/sc02
  35.03, // sc02/sc03
  41.78, // sc03/sc04
  52.95, // sc04/sc05
  85.1, // sc05/sc06
  99.9, // sc06/sc07
  107.42, // sc07/sc08
  130.1, // sc08/sc09
  142.06, // sc09/sc10
  158.17, // sc10/sc11
  170.25, // sc11/sc12
  191.52, // sc12/sc13
  203.94, // sc13/sc14
  210.02, // sc14/sc15
  225.55, // sc15/sc16
  234.96, // sc16/sc17
  242.01, // sc17/sc18
  262.03, // sc18/sc19
  279.45, // sc19/sc20
  299.34, // sc20/sc21
  313.59, // sc21/sc22
  AEPOCH_E001_TOTAL_SECONDS, // sc22 end — nudged from 314.665/314.67 to exactly 9440 frames
] as const;

const CUT_FRAMES = CUT_POINTS_SECONDS.map((s) => Math.round(s * AEPOCH_E001_FPS));

export type SceneId =
  | "sc01" | "sc02" | "sc03" | "sc04" | "sc05" | "sc06" | "sc07" | "sc08"
  | "sc09" | "sc10" | "sc11" | "sc12" | "sc13" | "sc14" | "sc15" | "sc16"
  | "sc17" | "sc18" | "sc19" | "sc20" | "sc21" | "sc22";

export type AepochE001Transition = "instant" | "crossfade" | "darkCut" | "signalReveal";

export interface SceneScheduleEntry {
  id: SceneId;
  name: string;
  startFrame: number;
  durationFrames: number;
  transitionIn: AepochE001Transition;
  transitionOut: AepochE001Transition;
}

const SCENE_NAMES: Record<SceneId, string> = {
  sc01: "Welcome",
  sc02: "August 9 Continuation",
  sc03: "Mission",
  sc04: "Built for Humans",
  sc05: "Symptom List (Mimicry)",
  sc06: "Multiplication",
  sc07: "Manufactured Consensus",
  sc08: "Traffic Data",
  sc09: "Uncertain Reflection",
  sc10: "Extraction",
  sc11: "Built for Another World",
  sc12: "Does Not Recognize Presence",
  sc13: "Signal — ÆPOCH Is Our Response",
  sc14: "Ancient Idea / Modern Tools",
  sc15: "Already a Contribution",
  sc16: "A Layer for the Internet",
  sc17: "One Idea",
  sc18: "42-Day Test",
  sc19: "Participant Cohort",
  sc20: "Final Thesis",
  sc21: "Biological Transformer",
  sc22: "See You Tomorrow",
};

// Approved scene-plan.yaml / scene-timing-map.yaml recommendedTransitionIn/Out
// values, transcribed verbatim (see storyboard/static-review.md and
// inputs/scene-timing-map.yaml for the source of each value).
const TRANSITIONS: Record<SceneId, { in: AepochE001Transition; out: AepochE001Transition }> = {
  sc01: { in: "instant", out: "crossfade" },
  sc02: { in: "crossfade", out: "crossfade" },
  sc03: { in: "crossfade", out: "crossfade" },
  sc04: { in: "darkCut", out: "crossfade" },
  sc05: { in: "crossfade", out: "crossfade" },
  sc06: { in: "crossfade", out: "crossfade" },
  sc07: { in: "crossfade", out: "darkCut" },
  sc08: { in: "crossfade", out: "crossfade" },
  sc09: { in: "crossfade", out: "crossfade" },
  sc10: { in: "crossfade", out: "crossfade" },
  sc11: { in: "crossfade", out: "crossfade" },
  sc12: { in: "crossfade", out: "darkCut" },
  sc13: { in: "signalReveal", out: "crossfade" },
  sc14: { in: "crossfade", out: "crossfade" },
  sc15: { in: "crossfade", out: "crossfade" },
  sc16: { in: "crossfade", out: "crossfade" },
  sc17: { in: "crossfade", out: "crossfade" },
  sc18: { in: "crossfade", out: "crossfade" },
  sc19: { in: "crossfade", out: "crossfade" },
  sc20: { in: "crossfade", out: "crossfade" },
  sc21: { in: "crossfade", out: "crossfade" },
  sc22: { in: "crossfade", out: "instant" },
};

const SCENE_IDS: SceneId[] = [
  "sc01", "sc02", "sc03", "sc04", "sc05", "sc06", "sc07", "sc08",
  "sc09", "sc10", "sc11", "sc12", "sc13", "sc14", "sc15", "sc16",
  "sc17", "sc18", "sc19", "sc20", "sc21", "sc22",
];

export const AEPOCH_E001_SCHEDULE: SceneScheduleEntry[] = SCENE_IDS.map((id, index) => {
  const startFrame = CUT_FRAMES[index];
  const durationFrames = CUT_FRAMES[index + 1] - CUT_FRAMES[index];
  return {
    id,
    name: SCENE_NAMES[id],
    startFrame,
    durationFrames,
    transitionIn: TRANSITIONS[id].in,
    transitionOut: TRANSITIONS[id].out,
  };
});

export const sceneById = (id: SceneId): SceneScheduleEntry => {
  const entry = AEPOCH_E001_SCHEDULE.find((s) => s.id === id);
  if (!entry) throw new Error(`Unknown Episode 001 scene id: ${id}`);
  return entry;
};

// Six review chapters (Phase 13C.2A output requirement). Boundaries are
// snapped to the nearest thematically-sensible scene boundary rather than
// the prompt's approximate mm:ss labels — see the Phase 13C.2A QA doc's
// "Scene timing reconciliation" section for the exact rationale per chapter.
export interface ChapterEntry {
  fileName: string;
  label: string;
  firstScene: SceneId;
  lastScene: SceneId;
}

export const AEPOCH_E001_CHAPTERS: ChapterEntry[] = [
  { fileName: "00-welcome-and-setup.mp4", label: "Welcome and setup", firstScene: "sc01", lastScene: "sc04" },
  { fileName: "01-automation-and-synthetic-internet.mp4", label: "Automation and synthetic internet", firstScene: "sc05", lastScene: "sc08" },
  { fileName: "02-consequence-and-economic-system.mp4", label: "Consequence and economic system", firstScene: "sc09", lastScene: "sc12" },
  { fileName: "03-aepoch-answer.mp4", label: "ÆPOCH answer", firstScene: "sc13", lastScene: "sc17" },
  { fileName: "04-test-invitation.mp4", label: "Test invitation", firstScene: "sc18", lastScene: "sc19" },
  { fileName: "05-thesis-and-close.mp4", label: "Thesis and close", firstScene: "sc20", lastScene: "sc22" },
];

export const chapterBounds = (chapter: ChapterEntry): { startFrame: number; endFrame: number } => {
  const first = sceneById(chapter.firstScene);
  const last = sceneById(chapter.lastScene);
  return { startFrame: first.startFrame, endFrame: last.startFrame + last.durationFrames };
};

// Reduced-motion spot-check windows (Phase 13C.2A requirement — 3 clips only,
// not the full reduced-motion episode).
export interface SpotCheckEntry {
  fileName: string;
  label: string;
  firstScene: SceneId;
  lastScene: SceneId;
}

export const AEPOCH_E001_REDUCED_SPOT_CHECKS: SpotCheckEntry[] = [
  { fileName: "reduced-automation-sequence.mp4", label: "Automation sequence", firstScene: "sc05", lastScene: "sc08" },
  { fileName: "reduced-signal-transition-and-aftermath.mp4", label: "Signal transition and aftermath", firstScene: "sc12", lastScene: "sc14" },
  { fileName: "reduced-final-thesis-through-outro.mp4", label: "Final thesis through outro", firstScene: "sc20", lastScene: "sc22" },
];
