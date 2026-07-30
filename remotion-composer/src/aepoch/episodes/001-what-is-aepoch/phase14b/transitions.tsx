// Phase 14B transitions — the proven incoming-over-outgoing architecture
// already used for Episode 001 (see ../compositions.tsx and, before that,
// ../../reel.tsx's Phase 12C precedent): every beat paints an opaque
// background, so a crossfade is implemented by (a) holding the OUTGOING
// beat's <Sequence> open for CROSSFADE_FRAMES past its nominal duration
// (it simply holds its own already-settled final frame) and (b) wrapping
// the INCOMING beat in <CrossfadeIn>, which fades its own opacity 0->1 over
// its first CROSSFADE_FRAMES local frames, dissolving over the still-visible
// outgoing beat beneath it. This guarantees there is never a blank frame
// between beats — the outgoing artwork is always still on screen while the
// incoming artwork resolves on top of it.

import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { reveal } from "../../../motion";

export const CROSSFADE_FRAMES = 14; // AEPOCH_DURATIONS.standard — 0.467s, within the 0.4-0.6s standard-transition token.

export const CrossfadeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const fade = reveal({ frame, startFrame: 0, durationFrames: CROSSFADE_FRAMES });
  return <AbsoluteFill style={{ opacity: fade.opacity }}>{children}</AbsoluteFill>;
};
