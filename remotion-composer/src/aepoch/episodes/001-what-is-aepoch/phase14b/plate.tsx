// Phase 14B — the illustration-plate primitive.
//
// Every beat treats its locked generated illustration as a designed visual
// plate (per the phase brief's "Asset Treatment" section): the artwork
// itself is never redrawn, warped, or distorted. All motion is Remotion-side
// treatment — crop (via object-fit + a container's own width/height/inset),
// layer separation (the plate sits under/behind overlay children), masking,
// slow camera movement (scale/translate on the plate itself, never on
// individual figures), opacity, and color-state overlays (a flat tint layer
// above the plate, never a filter that would distort anatomy).

import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const IllustrationPlate: React.FC<{
  src: string;
  /** CSS object-position, e.g. "50% 40%" — for framing a crop without
   * touching the source pixels. */
  objectPosition?: string;
  /** Camera scale (1.0 = no zoom). Applies to the plate only. */
  scale?: number;
  /** Camera translation in percent of frame width/height (kept within the
   * MOTION_TOKENS.md panMeasured limit of 12% by every caller). */
  translateXPercent?: number;
  translateYPercent?: number;
  /** Flat color-wash overlay above the plate (e.g. a Cool Cosmos tint that
   * increases over a beat) — a flat color field, never a gradient/filter
   * that would distort the artwork. */
  tint?: { color: string; opacity: number };
  children?: React.ReactNode;
}> = ({
  src,
  objectPosition = "50% 50%",
  scale = 1,
  translateXPercent = 0,
  translateYPercent = 0,
  tint,
  children,
}) => (
  <AbsoluteFill style={{ overflow: "hidden" }}>
    <AbsoluteFill
      style={{
        transform: `translate3d(${translateXPercent}%, ${translateYPercent}%, 0) scale(${scale})`,
        transformOrigin: "center",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          display: "block",
        }}
      />
    </AbsoluteFill>
    {tint ? (
      <AbsoluteFill style={{ background: tint.color, opacity: tint.opacity }} />
    ) : null}
    {children}
  </AbsoluteFill>
);
