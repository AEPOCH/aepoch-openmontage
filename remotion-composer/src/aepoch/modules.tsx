import React from "react";
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
  validateAepochSceneBase(props);
  if (props.lines.length < 1 || props.lines.length > 3) {
    throw new Error("DeclarativeHook requires one to three lines");
  }
  const words = props.lines.join(" ").trim().split(/\s+/).length;
  if (words > 18) throw new Error("DeclarativeHook supports no more than 18 words");
  return (
    <AepochScene theme={props.theme} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 155, width: 1160 }}>
        {props.eyebrow ? (
          <div style={{ fontSize: AEPOCH_TYPE.size.eyebrow, marginBottom: 30, color: AEPOCH_COLORS.inkMid }}>
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
          {props.lines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <circle cx="1435" cy="280" r="330" fill="rgba(214,228,240,0.20)" stroke="rgba(184,169,217,0.24)" strokeWidth="3" />
        <rect x="1240" y="180" width="330" height="420" fill="rgba(74,68,64,0.13)" stroke="rgba(74,68,64,0.52)" strokeWidth="10" />
        <rect x="1135" y="315" width="205" height="285" fill="rgba(224,216,208,0.42)" stroke="rgba(74,68,64,0.45)" strokeWidth="8" />
        <path d="M1105 670H1600" stroke="rgba(74,68,64,0.58)" strokeWidth="18" />
        <path d="M1190 670V735M1370 670V735M1535 670V735" stroke="rgba(74,68,64,0.40)" strokeWidth="12" />
      </svg>
      <div style={{ position: "absolute", left: 820, top: 625 }}><HumanNode size={115} state="present" /></div>
      <SceneChrome number={1} label="Declarative hook" showDebugLabel={props.showDebugLabel} showCornerMark={props.showCornerMark} />
    </AepochScene>
  );
};

export const KeyStatement: React.FC<KeyStatementProps> = (props) => {
  validateAepochSceneBase(props);
  const words = props.statement.trim().split(/\s+/).length;
  if (words > 14) throw new Error("KeyStatement supports no more than 14 words");
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
          {props.statement}
        </div>
        {props.supportingLine ? (
          <div style={{ marginTop: 30, fontSize: AEPOCH_TYPE.size.body, color: AEPOCH_COLORS.inkMid }}>
            {props.supportingLine}
          </div>
        ) : null}
      </div>
      <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <circle cx="1380" cy="245" r="310" fill="rgba(214,228,240,0.18)" stroke="rgba(184,169,217,0.28)" strokeWidth="3" />
        <path d="M960 760 Q1280 365 1645 380" fill="none" stroke="rgba(139,175,212,0.62)" strokeWidth="36" />
      </svg>
      <div style={{ position: "absolute", left: 1080, top: 590 }}><HumanNode size={104} state="present" /></div>
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
  validateCircularValueField(props);
  return (
    <AepochScene theme={props.theme} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", top: 85, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 150 }}>
        {props.fields.map((field) => (
          <div key={field.id} style={{ textAlign: "center" }}>
            <CircularSubject pole={field.pole} subject={field.subject} />
            <div style={{ marginTop: 30, fontSize: AEPOCH_TYPE.size.diagram, letterSpacing: 1.2, color: AEPOCH_COLORS.inkMid }}>
              {field.label}
            </div>
            {field.sublabel ? <div style={{ marginTop: 10, fontSize: AEPOCH_TYPE.size.footnote }}>{field.sublabel}</div> : null}
          </div>
        ))}
      </div>
      {props.footer ? (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 52, textAlign: "center", fontSize: 34, fontStyle: "italic", color: AEPOCH_COLORS.inkMid }}>
          {props.footer}
        </div>
      ) : null}
      <SceneChrome number={3} label="Circular value field" showDebugLabel={props.showDebugLabel} showCornerMark={props.showCornerMark} />
    </AepochScene>
  );
};

export const FlowLifecycle: React.FC<FlowLifecycleProps> = (props) => {
  validateFlowLifecycle(props);
  return (
    <AepochScene theme={props.theme} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 60, fontSize: 66, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: -2.4 }}>
        {props.headline}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 220, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.12fr", alignItems: "center", gap: 18 }}>
        {props.steps.map((step, index) => {
          const color = step.pole === "earth" ? AEPOCH_COLORS.clay : step.pole === "cosmos" ? AEPOCH_COLORS.iris : AEPOCH_COLORS.prism;
          return (
            <React.Fragment key={step.id}>
              <EditorialCard style={{ width: "100%", height: 390, padding: 38, textAlign: "center", position: "relative" }}>
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
          <div key={left} style={{ position: "absolute", left: `${left}%`, top: 163, zIndex: 2, color: index === 0 ? AEPOCH_COLORS.clay : AEPOCH_COLORS.iris, fontSize: 42 }}>→</div>
        ))}
      </div>
      <SceneChrome number={4} label="Flow lifecycle" showDebugLabel={props.showDebugLabel} showCornerMark={props.showCornerMark} />
    </AepochScene>
  );
};

export const HumanNetwork: React.FC<HumanNetworkProps> = (props) => {
  validateHumanNetwork(props);
  const nodes = props.nodes.map((node, index) => ({
    ...node,
    position: node.position ?? { x: 930 + (index % 4) * 180, y: 190 + Math.floor(index / 4) * 200 },
  }));
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return (
    <AepochScene theme={props.theme} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 250, width: 650 }}>
        {props.eyebrow ? <div style={{ fontSize: AEPOCH_TYPE.size.eyebrow, color: AEPOCH_COLORS.inkMid, marginBottom: 26 }}>{props.eyebrow}</div> : null}
        <div style={{ fontSize: 84, fontWeight: AEPOCH_TYPE.weight.heavy, lineHeight: 1.02, letterSpacing: -3 }}>
          {(props.headline ?? "").split("\n").map((line) => <div key={line}>{line}</div>)}
        </div>
        {props.supportingLine ? <div style={{ fontSize: 31, color: AEPOCH_COLORS.muted, marginTop: 26 }}>{props.supportingLine}</div> : null}
      </div>
      <svg viewBox="0 0 1680 900" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <circle cx="1375" cy="350" r="360" fill="rgba(214,228,240,0.18)" />
        {(props.edges ?? []).map((edge, index) => {
          const from = byId.get(edge.from)?.position;
          const to = byId.get(edge.to)?.position;
          if (!from || !to) return null;
          return <FlowEdge key={`${edge.from}-${edge.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} bend={index % 2 ? 38 : -32} color={index % 3 === 0 ? AEPOCH_COLORS.prism : AEPOCH_COLORS.iris} />;
        })}
      </svg>
      {nodes.map((node) => (
        <div key={node.id} style={{ position: "absolute", left: node.position.x - 48, top: node.position.y - 48 }}>
          <HumanNode size={96} state={node.state} />
        </div>
      ))}
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
  validateSystemComparison(props);
  return (
    <AepochScene theme={props.theme} captionReservePx={captionReserve(props)}>
      <div style={{ position: "absolute", left: 0, top: 12, fontSize: 62, fontWeight: AEPOCH_TYPE.weight.heavy, letterSpacing: -2.4 }}>
        {props.headline}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 135 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 110px 1fr", alignItems: "center", padding: "0 36px 22px", fontSize: 39, fontWeight: AEPOCH_TYPE.weight.bold }}>
          <div>{props.left.title}</div>
          <div />
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}><AepochMark width={42} color={AEPOCH_COLORS.clay} />{props.right.title}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {props.left.items.map((leftItem, index) => (
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
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <div style={{ opacity: 0.68 }}>{comparisonIcon(index, "left")}</div>
                {leftItem}
              </div>
              <div style={{ textAlign: "center", color: AEPOCH_COLORS.muted, fontSize: 31 }}>→</div>
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <div style={{ opacity: 0.82 }}>{comparisonIcon(index, "right")}</div>
                {props.right.items[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SceneChrome number={6} label="System comparison" showDebugLabel={props.showDebugLabel} showCornerMark={props.showCornerMark} />
    </AepochScene>
  );
};
