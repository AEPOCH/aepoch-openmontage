// Phase 14B — Aepoch-E001-Phase14B-Proof composition assembly.
//
// Transition architecture matches the proven Episode 001 precedent (see
// ../compositions.tsx, itself following ../../reel.tsx's Phase 12C
// approach): every beat paints an opaque background (IllustrationPlate is
// an AbsoluteFill), so a crossfade is implemented by (a) holding the
// OUTGOING beat's <Sequence> open for CROSSFADE_FRAMES past its nominal
// duration — it simply holds its own already-settled final frame — and (b)
// wrapping the INCOMING beat in <CrossfadeIn>, which fades its own opacity
// 0->1 over its first CROSSFADE_FRAMES local frames, dissolving over the
// still-visible outgoing beat beneath it. There is never a blank frame
// between beats.

import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AEPOCH_COLORS, AEPOCH_VIDEO } from "../../../tokens";
import { PHASE14B_SCHEDULE, PHASE14B_TOTAL_FRAMES, Phase14bBeatId } from "./timeline";
import { CrossfadeIn, CROSSFADE_FRAMES } from "./transitions";
import { Phase14bProofAudio } from "./audio";
import {
  Beat1SomethingsOff,
  Beat2Echoes,
  Beat3Reflection,
  Beat4Catfished,
  Beat5Multiplication,
  Beat6Consensus,
} from "./beats";

type BeatRenderer = (durationFrames: number) => React.ReactNode;

const beatRenderers: Record<Phase14bBeatId, BeatRenderer> = {
  "beat1-something-off": (d) => <Beat1SomethingsOff durationFrames={d} />,
  "beat2-echoes": (d) => <Beat2Echoes durationFrames={d} />,
  "beat3-reflection": (d) => <Beat3Reflection durationFrames={d} />,
  "beat4-catfished": (d) => <Beat4Catfished durationFrames={d} />,
  "beat5-multiplication": (d) => <Beat5Multiplication durationFrames={d} />,
  "beat6-consensus": (d) => <Beat6Consensus durationFrames={d} />,
};

const Phase14bProofTimeline: React.FC = () => (
  <AbsoluteFill style={{ background: AEPOCH_COLORS.paper }}>
    {PHASE14B_SCHEDULE.map((beat, index) => {
      const isLast = index === PHASE14B_SCHEDULE.length - 1;
      const sequenceDuration = beat.durationFrames + (isLast ? 0 : CROSSFADE_FRAMES);
      const content = beatRenderers[beat.id](beat.durationFrames);
      return (
        <Sequence
          key={beat.id}
          from={beat.startFrame}
          durationInFrames={sequenceDuration}
          name={`${beat.id} — ${beat.name}`}
        >
          {index === 0 ? content : <CrossfadeIn>{content}</CrossfadeIn>}
        </Sequence>
      );
    })}
  </AbsoluteFill>
);

export const AepochE001Phase14bProof: React.FC = () => (
  <AbsoluteFill style={{ background: AEPOCH_COLORS.paper }}>
    <Phase14bProofTimeline />
    <Phase14bProofAudio />
  </AbsoluteFill>
);

export const AEPOCH_E001_PHASE14B_PROOF_DURATION = PHASE14B_TOTAL_FRAMES;
export const AEPOCH_E001_PHASE14B_PROOF_FPS = AEPOCH_VIDEO.fps;
export const AEPOCH_E001_PHASE14B_PROOF_WIDTH = AEPOCH_VIDEO.width;
export const AEPOCH_E001_PHASE14B_PROOF_HEIGHT = AEPOCH_VIDEO.height;
