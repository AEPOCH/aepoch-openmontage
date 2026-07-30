// Phase 14B — proof-segment audio playback.
//
// The file is the exact 52.60s-99.60s (47.00s) slice of Lee's original
// recording, extracted with `ffmpeg -af "atrim=start=52.60:end=99.60,
// asetpts=PTS-STARTPTS"` — a lossless trim, no time-stretch, normalization,
// compression, EQ, denoise, or replacement (see qa/phase-14b-production-
// proof-review.md for the full extraction record). It lives at
// `projects/aepoch-episodes/001-what-is-aepoch/audio/final/
// phase-14b-proof-audio.wav` (gitignored via the repo's blanket `projects/`
// ignore rule) and is copied into
// `remotion-composer/public/aepoch-e001-phase14b-proof-audio.wav` so
// Remotion's bundler can serve it via `staticFile()` — that copy is also
// gitignored (`remotion-composer/public/*`).

import React from "react";
import { Audio, staticFile } from "remotion";
import { PHASE14B_AUDIO_FILE } from "./assets";

export const Phase14bProofAudio: React.FC = () => (
  <Audio src={staticFile(PHASE14B_AUDIO_FILE)} />
);
