import React from "react";
import { useCurrentFrame } from "remotion";
import {
  AepochMark,
  AepochScene,
  DiagramIcon,
  EditorialCard,
  FlowEdge,
  HumanNode,
  ModuleFooter,
} from "./components";
import {
  validateAepochSceneBase,
  validateCircularValueField,
  validateFlowLifecycle,
  validateHumanNetwork,
  validateSystemComparison,
} from "./runtime";
import { AEPOCH_COLORS, AEPOCH_LAYOUT, AEPOCH_TYPE } from "./tokens";
import {
  cameraScale,
  cameraStyle,
  convergenceOffset,
  deterministicStagger,
  edgeDraw,
  frameProgress,
  lifecycleEmphasis,
  lifecycleStepStart,
  nodeEnter,
  pathFlow,
  reveal,
  revealStyle,
  strokeDash,
  strokeProgress,
} from "./motion";
import { AEPOCH_DURATIONS, AEPOCH_EASING } from "./tokens";
import type {
  CircularValueFieldProps,
  DeclarativeHookProps,
  FlowLifecycleProps,
  HumanNetworkProps,
  KeyStatementProps,
  SystemComparisonProps,
} from "./types";

const captionReserve = (props: { captions?: { enabled?: boolean; reserveBottomPx?: number } }): number =>
  props.captions?.enabled ? props.captions.reserveBottomPx ?? AEPOCH_LAYOUT.captionReserveMin : 0;

// Phase 12C: SystemComparison row emphasis start frames, spread across the
// full 190-frame narration instead of bunched in its first half. See usage
// below for the narrated-contrast rationale.
const ROW_EMPHASIS_START = [20, 55, 110, 155] as const;

const BrandLockup: React.FC = () => (
  <div style={{ position: "absolute", left: 0, bottom: 0 }}>
    <AepochMark width={52} />
  </div>
);

const SceneChrome: React.FC<{
  number: number;
  label: string;
  showDebugLabel?: boolean;
  showCornerMark?: boolean;
}> = ({ number, label, showDebugLabel = false, showCornerMark = false }) => (
  <>
    {showCornerMark ? <BrandLockup /> : null}
    {showDebugLabel ? <ModuleFooter number={number} label={label} /> : null}
  </>
);

export const DeclarativeHook: React.FC<DeclarativeHookProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  validateAepochSceneBase(props);
  if (props.lines.length < 1 || props.lines.length > 3) {
    throw new Error("DeclarativeHook requires one to three lines");
  }
  const words = props.lines.join(" ").trim().split(/\s+/).length;
  if (words > 18) throw new Error("DeclarativeHook supports no more than 18 words");
  const camera = cameraScale({
    frame,
    move: props.camera ?? "pushInSmall",
    durationFrames: 105,
    reducedMotion: reduced,
  });
  const eyebrowReveal = reveal({ frame, startFrame: 0, durationFrames: 18, reducedMotion: reduced });
  const humanReveal = reveal({ frame, startFrame: 42, durationFrames: 20, fromY: 36, fromScale: 0.96, reducedMotion: reduced });
  // Phase 12C: the rigid production geometry's strongest arrival (reveal
  // complete) is timed to land on the spoken word "production" — the last
  // word of the hook narration, which ends at local frame ~104 (narration
  // starts local frame 6, runs 98 frames total; "production." is the 8th
  // of 8 words).
  const systemReveal = reveal({
    frame,
    startFrame: 72,
    durationFrames: 28,
    fromX: 36,
    fromY: 0,
    easing: AEPOCH_EASING.sharpSystem,
    reducedMotion: reduced,
  });
  return (
    <AepochScene theme={props.theme} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", inset: 0, ...cameraStyle(camera) }}>
      <div style={{ position: "absolute", left: 0, top: 155, width: 1160 }}>
        {props.eyebrow ? (
          <div style={{ fontSize: AEPOCH_TYPE.size.eyebrow, marginBottom: 30, color: AEPOCH_COLORS.inkMid, ...revealStyle(eyebrowReveal) }}>
            {props.eyebrow}
          </div>
        ) : null}
        <div
          style={{
            fontSize: 98,
            fontWeight: AEPOCH_TYPE.weight.heavy,
            letterSpacing: AEPOCH_TYPE.tracking.tight,
            lineHeight: AEPOCH_TYPE.lineHeight.hero,
          }}
        >
          {props.lines.map((line, index) => (
            <div key={line} style={revealStyle(reveal({ frame, startFrame: 12 + index * 14, durationFrames: 22, reducedMotion: reduced }))}>{line}</div>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0, ...revealStyle(systemReveal) }} aria-hidden>
        <circle cx="1435" cy="280" r="330" fill="rgba(214,228,240,0.20)" stroke="rgba(184,169,217,0.24)" strokeWidth="3" />
        <rect x="1240" y="180" width="330" height="420" fill="rgba(74,68,64,0.13)" stroke="rgba(74,68,64,0.52)" strokeWidth="10" />
        <rect x="1135" y="315" width="205" height="285" fill="rgba(224,216,208,0.42)" stroke="rgba(74,68,64,0.45)" strokeWidth="8" />
        <path d="M1105 670H1600" stroke="rgba(74,68,64,0.58)" strokeWidth="18" />
        <path d="M1190 670V735M1370 670V735M1535 670V735" stroke="rgba(74,68,64,0.40)" strokeWidth="12" />
      </svg>
      <div style={{ position: "absolute", left: 820, top: 625, ...revealStyle(humanReveal) }}><HumanNode size={115} state="present" /></div>
      </div>
      <SceneChrome number={1} label="Declarative hook" showDebugLabel={props.showDebugLabel} showCornerMark={props.showCornerMark} />
    </AepochScene>
  );
};

export const KeyStatement: React.FC<KeyStatementProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  validateAepochSceneBase(props);
  const words = props.statement.trim().split(/\s+/).length;
  if (words > 14) throw new Error("KeyStatement supports no more than 14 words");
  const statementLines = props.statement.split(/(?<=activates) /);
  const humanReveal = reveal({ frame, startFrame: 30, durationFrames: 20, fromY: 34, fromScale: 0.96, reducedMotion: reduced });
  const arcProgress = strokeProgress({ frame, startFrame: 34, durationFrames: 36, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 210, width: 920 }}>
        <div
          style={{
            fontSize: 102,
            fontWeight: AEPOCH_TYPE.weight.heavy,
            letterSpacing: AEPOCH_TYPE.tracking.tight,
            lineHeight: AEPOCH_TYPE.lineHeight.hero,
          }}
        >
          {statementLines.map((line, index) => (
            <div key={line} style={revealStyle(reveal({ frame, startFrame: index * 14, durationFrames: 22, reducedMotion: reduced }))}>{line}</div>
          ))}
        </div>
        {props.supportingLine ? (
          <div style={{ marginTop: 30, fontSize: AEPOCH_TYPE.size.body, color: AEPOCH_COLORS.inkMid }}>
            {props.supportingLine}
          </div>
        ) : null}
      </div>
      <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <circle cx="1380" cy="245" r="310" fill="rgba(214,228,240,0.18)" stroke="rgba(184,169,217,0.28)" strokeWidth="3" />
        <path d="M960 760 Q1280 365 1645 380" pathLength={1} fill="none" stroke="rgba(139,175,212,0.62)" strokeWidth="36" style={strokeDash(arcProgress)} />
      </svg>
      <div style={{ position: "absolute", left: 1080, top: 590, ...revealStyle(humanReveal) }}><HumanNode size={104} state="present" /></div>
      <SceneChrome number={2} label="Key statement" showDebugLabel={props.showDebugLabel} showCornerMark={props.showCornerMark} />
    </AepochScene>
  );
};

const CircularSubject: React.FC<{ pole: "earth" | "cosmos" | "neutral"; subject?: "human" | "mark" | "system" | "none" }> = ({
  pole,
  subject = "none",
}) => (
  <div style={{ position: "relative", width: 460, height: 460 }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        border: `3px solid ${pole === "earth" ? AEPOCH_COLORS.sand : AEPOCH_COLORS.pearl}`,
        background:
          pole === "earth"
            ? "radial-gradient(circle at 52% 45%, rgba(232,201,160,0.42), rgba(196,131,90,0.13) 58%, rgba(196,131,90,0.02))"
            : "radial-gradient(circle at 45% 45%, rgba(214,228,240,0.50), rgba(184,169,217,0.15) 58%, rgba(184,169,217,0.02))",
      }}
    />
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {subject === "mark" ? <AepochMark width={235} color={AEPOCH_COLORS.inkMid} /> : null}
      {subject === "human" ? <HumanNode size={210} state="present" /> : null}
      {subject === "system" ? (
        <svg width="250" height="250" viewBox="0 0 250 250" aria-label="Rigid production system">
          <rect x="42" y="34" width="166" height="182" fill="rgba(224,216,208,0.42)" stroke={AEPOCH_COLORS.inkMid} strokeWidth="7" />
          <path d="M42 92H208M42 154H208M96 34V216M154 34V216" stroke={AEPOCH_COLORS.inkMid} strokeWidth="5" />
          <rect x="101" y="99" width="48" height="48" fill={AEPOCH_COLORS.inkMid} />
        </svg>
      ) : null}
    </div>
  </div>
);

export const CircularValueField: React.FC<CircularValueFieldProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  validateCircularValueField(props);
  return (
    <AepochScene theme={props.theme} captionReservePx={captionReserve(props)}>
      {/*
        Phase 12C: Production (index 0) introduces first, Presence (index 1)
        second, each timed to its spoken word in "What we count shapes what
        we value: production, or presence." (114-frame narration, local
        frames 6-120; "production," ~86-97, "presence." ~109-120). Both
        fields settle, then converge, then the authored conclusion reveals.
      */}
      <div style={{ position: "absolute", top: 85, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 150 }}>
        {props.fields.map((field, index) => {
          const start = index === 0 ? 70 : 96;
          const offset = convergenceOffset({
            frame,
            startFrame: 122,
            durationFrames: 26,
            distance: 34,
            direction: index === 0 ? "left" : "right",
            reducedMotion: reduced,
          });
          return (
          <div key={field.id} style={{ textAlign: "center", ...revealStyle(reveal({ frame, startFrame: start, durationFrames: 22, fromX: index === 0 ? -34 : 34, fromY: 0, reducedMotion: reduced })), transform: `translateX(${offset}px)` }}>
            <CircularSubject pole={field.pole} subject={field.subject} />
            <div style={{ marginTop: 30, fontSize: AEPOCH_TYPE.size.diagram, letterSpacing: 1.2, color: AEPOCH_COLORS.inkMid }}>
              {field.label}
            </div>
            {field.sublabel ? <div style={{ marginTop: 10, fontSize: AEPOCH_TYPE.size.footnote }}>{field.sublabel}</div> : null}
          </div>
        )})}
      </div>
      {props.footer ? (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 52, textAlign: "center", fontSize: 34, fontStyle: "italic", color: AEPOCH_COLORS.inkMid, ...revealStyle(reveal({ frame, startFrame: 150, durationFrames: 22, reducedMotion: reduced })) }}>
          {props.footer}
        </div>
      ) : null}
      <SceneChrome number={3} label="Circular value field" showDebugLabel={props.showDebugLabel} showCornerMark={props.showCornerMark} />
    </AepochScene>
  );
};

export const FlowLifecycle: React.FC<FlowLifecycleProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  validateFlowLifecycle(props);
  return (
    <AepochScene theme={props.theme} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 60, fontSize: 66, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: -2.4, ...revealStyle(reveal({ frame, startFrame: 0, durationFrames: 22, reducedMotion: reduced })) }}>
        {props.headline}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 220, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.12fr", alignItems: "center", gap: 18 }}>
        {props.steps.map((step, index) => {
          const color = step.pole === "earth" ? AEPOCH_COLORS.clay : step.pole === "cosmos" ? AEPOCH_COLORS.iris : AEPOCH_COLORS.prism;
          return (
            <React.Fragment key={step.id}>
              <EditorialCard style={{ width: "100%", height: 390, padding: 38, textAlign: "center", position: "relative", opacity: lifecycleEmphasis({ frame, index, count: props.steps.length, reducedMotion: reduced }), ...revealStyle(nodeEnter(frame, lifecycleStepStart(index), reduced)) }}>
                <div style={{ margin: "4px auto 24px", width: 132, height: 132, borderRadius: "50%", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <DiagramIcon type={step.icon ?? "presence"} size={88} color={color} />
                </div>
                <div style={{ fontSize: 34, fontWeight: AEPOCH_TYPE.weight.bold, lineHeight: 1.08 }}>{step.label}</div>
                {step.description ? <div style={{ marginTop: 16, fontSize: 25, lineHeight: 1.2, color: AEPOCH_COLORS.inkMid }}>{step.description}</div> : null}
              </EditorialCard>
            </React.Fragment>
          );
        })}
        {[25.3, 49.9, 73.7].map((left, index) => (
          <div key={left} style={{ position: "absolute", left: `${left}%`, top: 163, zIndex: 2, color: index === 0 ? AEPOCH_COLORS.clay : AEPOCH_COLORS.iris, fontSize: 42, ...revealStyle(reveal({ frame, startFrame: lifecycleStepStart(index) + 14, durationFrames: 18, fromX: -18, fromY: 0, reducedMotion: reduced })) }}>→</div>
        ))}
      </div>
      <SceneChrome number={4} label="Flow lifecycle" showDebugLabel={props.showDebugLabel} showCornerMark={props.showCornerMark} />
    </AepochScene>
  );
};

export const HumanNetwork: React.FC<HumanNetworkProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  validateHumanNetwork(props);
  const nodes = props.nodes.map((node, index) => ({
    ...node,
    position: node.position ?? { x: 930 + (index % 4) * 180, y: 190 + Math.floor(index / 4) * 200 },
  }));
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const nodeStarts = new Map(nodes.map((node, index) => [
    node.id,
    deterministicStagger({ index, startFrame: 18, gapFrames: 6, seed: props.seed ?? 1 }),
  ]));
  const networkScale = cameraScale({ frame, move: "pullBackCollective", startFrame: 30, durationFrames: 120, reducedMotion: reduced });
  return (
    <AepochScene theme={props.theme} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 250, width: 650, ...revealStyle(reveal({ frame, startFrame: 0, durationFrames: 22, reducedMotion: reduced })) }}>
        {props.eyebrow ? <div style={{ fontSize: AEPOCH_TYPE.size.eyebrow, color: AEPOCH_COLORS.inkMid, marginBottom: 26 }}>{props.eyebrow}</div> : null}
        <div style={{ fontSize: 84, fontWeight: AEPOCH_TYPE.weight.heavy, lineHeight: 1.02, letterSpacing: -3 }}>
          {(props.headline ?? "").split("\n").map((line) => <div key={line}>{line}</div>)}
        </div>
        {props.supportingLine ? <div style={{ fontSize: 31, color: AEPOCH_COLORS.muted, marginTop: 26 }}>{props.supportingLine}</div> : null}
      </div>
      <div style={{ position: "absolute", inset: 0, ...cameraStyle(networkScale) }}>
      <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <circle cx="1375" cy="350" r="360" fill="rgba(214,228,240,0.18)" />
        {(props.edges ?? []).map((edge, index) => {
          const from = byId.get(edge.from)?.position;
          const to = byId.get(edge.to)?.position;
          if (!from || !to) return null;
          const start = Math.max(nodeStarts.get(edge.from) ?? 0, nodeStarts.get(edge.to) ?? 0) + 14;
          return <FlowEdge key={`${edge.from}-${edge.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} bend={index % 2 ? 38 : -32} color={index % 3 === 0 ? AEPOCH_COLORS.prism : AEPOCH_COLORS.iris} progress={edgeDraw(frame, start, 22, reduced)} />;
        })}
        {(props.edges ?? []).slice(2, 4).map((edge, index) => {
          const from = byId.get(edge.from)?.position;
          const to = byId.get(edge.to)?.position;
          if (!from || !to) return null;
          const flow = pathFlow({ frame, startFrame: 96 + index * 18, durationFrames: 30, reducedMotion: reduced });
          return (
            <path
              key={`flow-${edge.from}-${edge.to}`}
              d={`M${from.x} ${from.y} Q${(from.x + to.x) / 2} ${(from.y + to.y) / 2 + (index ? 38 : -32)} ${to.x} ${to.y}`}
              pathLength={1}
              fill="none"
              stroke={index ? AEPOCH_COLORS.iris : AEPOCH_COLORS.clay}
              strokeWidth={7}
              strokeLinecap="round"
              strokeDasharray={flow.dasharray}
              strokeDashoffset={flow.dashoffset}
              opacity={flow.opacity}
            />
          );
        })}
      </svg>
      {nodes.map((node) => (
        <div key={node.id} style={{ position: "absolute", left: node.position.x - 48, top: node.position.y - 48, ...revealStyle(nodeEnter(frame, nodeStarts.get(node.id) ?? 18, reduced)) }}>
          <HumanNode size={96} state={node.state} />
        </div>
      ))}
      </div>
      <SceneChrome number={5} label="Human network" showDebugLabel={props.showDebugLabel} showCornerMark={props.showCornerMark} />
    </AepochScene>
  );
};

const comparisonIcon = (index: number, side: "left" | "right"): React.ReactNode => {
  const left = ["system", "collective", "circulation", "collective"] as const;
  const right = ["presence", "circulation", "presence", "collective"] as const;
  return <DiagramIcon type={(side === "left" ? left : right)[index] ?? "presence"} size={42} color={side === "left" ? AEPOCH_COLORS.inkMid : index % 2 ? AEPOCH_COLORS.iris : AEPOCH_COLORS.clay} />;
};

export const SystemComparison: React.FC<SystemComparisonProps> = (props) => {
  const frame = useCurrentFrame();
  const reduced = props.reducedMotion === true;
  validateSystemComparison(props);
  return (
    <AepochScene theme={props.theme} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 12, fontSize: 62, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: -2.4, ...revealStyle(reveal({ frame, startFrame: 0, durationFrames: 22, reducedMotion: reduced })) }}>
        {props.headline}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 135 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 110px 1fr", alignItems: "center", padding: "0 36px 22px", fontSize: 39, fontWeight: AEPOCH_TYPE.weight.bold }}>
          <div style={revealStyle(reveal({ frame, startFrame: 16, durationFrames: 14, fromX: -24, fromY: 0, easing: AEPOCH_EASING.sharpSystem, reducedMotion: reduced }))}>{props.left.title}</div>
          <div />
          <div style={{ display: "flex", alignItems: "center", gap: 18, ...revealStyle(reveal({ frame, startFrame: 44, durationFrames: 22, fromX: 24, fromY: 0, reducedMotion: reduced })) }}><AepochMark width={42} color={AEPOCH_COLORS.clay} />{props.right.title}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {props.left.items.map((leftItem, index) => {
            // Phase 12C: row emphasis aligned to the narrated contrasts.
            // Narration (190 frames, local 6-196) splits into "Different
            // systems produce different realities:" (local 10-105) and
            // "extraction or contribution, concentration or flow."
            // (local 105-195) — the latter names rows 2 and 3 directly, so
            // those two rows are timed to land inside that second clause.
            const rowStart = ROW_EMPHASIS_START[index] ?? ROW_EMPHASIS_START[ROW_EMPHASIS_START.length - 1] + (index - ROW_EMPHASIS_START.length + 1) * 45;
            return (
            <div
              key={leftItem}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 110px 1fr",
                alignItems: "center",
                minHeight: 112,
                padding: "0 36px",
                background: index % 2 === 0 ? "rgba(255,255,255,0.42)" : "rgba(214,228,240,0.16)",
                borderTop: `1px solid rgba(224,216,208,0.62)`,
                borderBottom: `1px solid rgba(224,216,208,0.62)`,
                fontSize: 31,
                fontWeight: AEPOCH_TYPE.weight.semibold,
                opacity: frameProgress(frame, rowStart, 14, AEPOCH_EASING.sharpSystem, reduced),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 22, ...revealStyle(reveal({ frame, startFrame: rowStart, durationFrames: 14, fromX: -26, fromY: 0, easing: AEPOCH_EASING.sharpSystem, reducedMotion: reduced })) }}>
                <div style={{ opacity: 0.68 }}>{comparisonIcon(index, "left")}</div>
                {leftItem}
              </div>
              <div style={{ textAlign: "center", color: AEPOCH_COLORS.muted, fontSize: 31, ...revealStyle(reveal({ frame, startFrame: rowStart + 8, durationFrames: 14, fromX: -10, fromY: 0, reducedMotion: reduced })) }}>→</div>
              <div style={{ display: "flex", alignItems: "center", gap: 22, ...revealStyle(reveal({ frame, startFrame: rowStart + 14, durationFrames: 22, fromX: 26, fromY: 0, reducedMotion: reduced })) }}>
                <div style={{ opacity: 0.82 }}>{comparisonIcon(index, "right")}</div>
                {props.right.items[index]}
              </div>
            </div>
          )})}
        </div>
      </div>
      <SceneChrome number={6} label="System comparison" showDebugLabel={props.showDebugLabel} showCornerMark={props.showCornerMark} />
    </AepochScene>
  );
};
