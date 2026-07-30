// Phase 13C.2A — reference-audio playback for the motion-blocking preview.
//
// The audio file itself is Lee's extracted reference track (audio only — no
// visual frames, images, edits, logos, or B-roll from his recording are used
// anywhere in this episode's source). It lives at
// `projects/aepoch-episodes/001-what-is-aepoch/reference/lee/analysis/
// lee-reference-audio.wav` (48kHz stereo PCM, gitignored via the repo's
// blanket `projects/` ignore rule) and is copied into
// `remotion-composer/public/aepoch-e001-lee-reference-audio.wav` so Remotion's
// bundler can serve it via `staticFile()` — that copy is also gitignored
// (`remotion-composer/public/*`). Per this phase's instructions, the audio is
// used at its existing level: no normalization, compression, EQ, de-noise,
// time-stretch, or replacement.

import React from "react";
import { Audio, staticFile } from "remotion";

export const AEPOCH_E001_REFERENCE_AUDIO_FILE = "aepoch-e001-lee-reference-audio.wav";

export const AepochE001ReferenceAudio: React.FC = () => (
  <Audio src={staticFile(AEPOCH_E001_REFERENCE_AUDIO_FILE)} />
);
