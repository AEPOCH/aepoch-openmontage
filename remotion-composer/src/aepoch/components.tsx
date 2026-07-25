import React from "react";
import { AbsoluteFill } from "remotion";
import { AEPOCH_COLORS, AEPOCH_LAYOUT, AEPOCH_TYPE } from "./tokens";

export const AepochScene: React.FC<{
  children: React.ReactNode;
  theme?: "earth-rise" | "paper" | "void" | "depth";
  captionReservePx?: number;
}> = ({ children, theme = "earth-rise", captionReservePx = 0 }) => {
  const background =
    theme === "void"
      ? AEPOCH_COLORS.void
      : theme === "depth"
        ? AEPOCH_COLORS.depth
        : theme === "paper"
          ? AEPOCH_COLORS.paper
          : AEPOCH_COLORS.earthRiseBase;
  return (
    <AbsoluteFill
      style={{
        background,
        color: theme === "void" || theme === "depth" ? AEPOCH_COLORS.paper : AEPOCH_COLORS.ink,
        fontFamily: AEPOCH_TYPE.family,
        overflow: "hidden",
      }}
    >
      {theme === "earth-rise" ? <EarthRise /> : null}
      <CaptionSafeContainer reserveBottomPx={captionReservePx}>{children}</CaptionSafeContainer>
    </AbsoluteFill>
  );
};

export const CaptionSafeContainer: React.FC<{
  children: React.ReactNode;
  reserveBottomPx?: number;
  style?: React.CSSProperties;
}> = ({ children, reserveBottomPx = 0, style }) => (
  <div
    style={{
      position: "absolute",
      left: AEPOCH_LAYOUT.safe.left,
      right: AEPOCH_LAYOUT.safe.right,
      top: AEPOCH_LAYOUT.safe.top,
      bottom: Math.max(AEPOCH_LAYOUT.safe.bottom, reserveBottomPx),
      ...style,
    }}
  >
    {children}
  </div>
);

export const EarthRise: React.FC = () => (
  <AbsoluteFill aria-label="ÆPOCH Earth Rise background">
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: [
          "radial-gradient(circle 1440px at 153.6px 810px, rgba(196,131,90,0.15), rgba(196,131,90,0) 100%)",
          "radial-gradient(circle 1056px at 345.6px 993.6px, rgba(232,201,160,0.11), rgba(232,201,160,0) 100%)",
          "radial-gradient(circle 1113.6px at 1766.4px 43.2px, rgba(214,228,240,0.13), rgba(214,228,240,0) 100%)",
          "radial-gradient(circle 806.4px at 1881.6px 194.4px, rgba(184,169,217,0.10), rgba(184,169,217,0) 100%)",
        ].join(","),
      }}
    />
    <svg
      viewBox="0 0 1920 1080"
      width="1920"
      height="1080"
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <path
        d="M-120 1110 Q 610 780 2040 960 L2040 1160 L-120 1160 Z"
        fill={AEPOCH_COLORS.earthRiseBase}
        opacity={0.96}
      />
    </svg>
  </AbsoluteFill>
);

export const AepochMark: React.FC<{
  color?: string;
  width?: number;
  opticalOffset?: boolean;
  label?: string;
}> = ({ color = AEPOCH_COLORS.ink, width = 75, opticalOffset = true, label = "ÆPOCH" }) => {
  const height = width * (652 / 869);
  const scale = width / 75;
  return (
    <svg
      viewBox="0 0 869 652"
      width={width}
      height={height}
      role="img"
      aria-label={label}
      style={{
        display: "block",
        transform: opticalOffset ? `translate(${-6.5 * scale}px, ${-2 * scale}px)` : undefined,
        overflow: "visible",
      }}
    >
      <path
        d="M465.471 0.5L0.971436 651H92.4714C326.637 391.308 548.454 298.787 775.971 361L787.471 306C582.4 251.465 413.28 307.534 212.471 452.5L471.971 90V287L545.971 270.5V67H867.971V0.5H465.471Z"
        fill={color}
      />
      <g transform="translate(472 370) scale(0.993 1)">
        <path d="M75.501 0.660423L1.00098 21.6604L0.500977 278.66H399.501V215.66H75.501V0.660423Z" fill={color} />
      </g>
    </svg>
  );
};

export const EditorialCard: React.FC<{
  children: React.ReactNode;
  radius?: "human" | "system";
  tint?: string;
  style?: React.CSSProperties;
}> = ({ children, radius = "human", tint = "rgba(255,255,255,0.58)", style }) => (
  <div
    style={{
      boxSizing: "border-box",
      background: tint,
      border: `${AEPOCH_LAYOUT.cardBorder}px solid ${AEPOCH_COLORS.border}`,
      borderRadius: radius === "human" ? AEPOCH_LAYOUT.cardRadius : 4,
      padding: AEPOCH_LAYOUT.cardPadding,
      ...style,
    }}
  >
    {children}
  </div>
);

export const HumanNode: React.FC<{
  size?: number;
  state?: "present" | "verified" | "active" | "inactive";
  color?: string;
}> = ({ size = 90, state = "present", color = AEPOCH_COLORS.clay }) => {
  const inactive = state === "inactive";
  const ring =
    state === "verified"
      ? AEPOCH_COLORS.moss
      : state === "active"
        ? AEPOCH_COLORS.prism
        : AEPOCH_COLORS.clay;
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" role="img" aria-label={`Human node: ${state}`}>
      <circle
        cx="128"
        cy="128"
        r="108"
        fill={state === "verified" ? "rgba(76,175,130,0.10)" : "rgba(232,201,160,0.16)"}
        stroke={ring}
        strokeWidth={state === "verified" ? 5 : 3}
        strokeDasharray={inactive ? "10 12" : undefined}
        opacity={inactive ? 0.48 : 1}
      />
      <g color={inactive ? AEPOCH_COLORS.muted : color} opacity={inactive ? 0.45 : 1}>
        <circle cx="128" cy="56" r="25" fill="currentColor" />
        <path
          d="M82 118C82 91.5 103.5 70 130 70H126C152.5 70 174 91.5 174 118V215C174 226.6 164.6 236 153 236H103C91.4 236 82 226.6 82 215V118Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export const FlowEdge: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  bend?: number;
  markerId?: string;
}> = ({ x1, y1, x2, y2, color = AEPOCH_COLORS.iris, bend = 0, markerId }) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 + bend;
  return (
    <path
      d={`M${x1} ${y1} Q${midX} ${midY} ${x2} ${y2}`}
      fill="none"
      stroke={color}
      strokeWidth={AEPOCH_LAYOUT.baselineStroke}
      strokeLinecap="round"
      opacity={0.72}
      markerEnd={markerId ? `url(#${markerId})` : undefined}
    />
  );
};

export const DiagramIcon: React.FC<{
  type: "presence" | "activation" | "circulation" | "permanence" | "system" | "collective";
  size?: number;
  color?: string;
}> = ({ type, size = 64, color = AEPOCH_COLORS.inkMid }) => {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={type}>
      {type === "presence" ? (
        <>
          <circle {...common} cx="12" cy="6.5" r="2.3" />
          <path {...common} d="M7.6 20v-7.2A4.4 4.4 0 0 1 12 8.4a4.4 4.4 0 0 1 4.4 4.4V20" />
        </>
      ) : null}
      {type === "activation" ? (
        <>
          <circle {...common} cx="12" cy="12" r="3.2" />
          <path {...common} d="M12 2.8V5.1M12 18.9V21.2M2.8 12H5.1M18.9 12H21.2M5.5 5.5L7.1 7.1M16.9 16.9L18.5 18.5M18.5 5.5L16.9 7.1M7.1 16.9L5.5 18.5" />
        </>
      ) : null}
      {type === "circulation" ? (
        <>
          <path {...common} d="M5.2 8.4A7.5 7.5 0 0 1 18.1 6.8M17.9 3.9L18.4 7.2L15.1 7.6" />
          <path {...common} d="M18.8 15.6A7.5 7.5 0 0 1 5.9 17.2M6.1 20.1L5.6 16.8L8.9 16.4" />
        </>
      ) : null}
      {type === "permanence" ? (
        <>
          <circle {...common} cx="12" cy="12" r="8.4" />
          <path {...common} d="M8.2 12.3L10.8 14.9L16.2 9.4" />
        </>
      ) : null}
      {type === "system" ? <rect {...common} x="5" y="5" width="14" height="14" rx="1" /> : null}
      {type === "collective" ? (
        <>
          <circle {...common} cx="8" cy="8.2" r="1.8" />
          <circle {...common} cx="16" cy="8.2" r="1.8" />
          <circle {...common} cx="12" cy="6.2" r="2" />
          <path {...common} d="M5.5 17.8V15C5.5 13.5 6.7 12.3 8.2 12.3M18.5 17.8V15C18.5 13.5 17.3 12.3 15.8 12.3M8.5 18.2V14.2C8.5 12.3 10 10.8 12 10.8C14 10.8 15.5 12.3 15.5 14.2V18.2" />
        </>
      ) : null}
    </svg>
  );
};

export const ModuleFooter: React.FC<{ number: number; label: string }> = ({ number, label }) => (
  <div
    style={{
      position: "absolute",
      right: 0,
      bottom: 0,
      fontSize: 16,
      fontWeight: AEPOCH_TYPE.weight.bold,
      letterSpacing: AEPOCH_TYPE.tracking.label,
      textTransform: "uppercase",
      color: AEPOCH_COLORS.muted,
    }}
  >
    Module {number}: <span style={{ color: AEPOCH_COLORS.inkMid }}>{label}</span>
  </div>
);

