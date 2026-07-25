import type {
  AepochSceneBase,
  CircularValueFieldProps,
  FlowLifecycleProps,
  HumanNetworkProps,
  SystemComparisonProps,
} from "./types";

function requireText(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`ÆPOCH scene validation: ${field} must be a non-empty string`);
  }
}

export const validateAepochSceneBase = (scene: AepochSceneBase): void => {
  requireText(scene.id, "id");
  if (!Number.isInteger(scene.startFrame) || scene.startFrame < 0) {
    throw new Error("ÆPOCH scene validation: startFrame must be a non-negative integer");
  }
  if (!Number.isInteger(scene.durationFrames) || scene.durationFrames <= 0) {
    throw new Error("ÆPOCH scene validation: durationFrames must be a positive integer");
  }
  const reserve = scene.captions?.reserveBottomPx;
  if (reserve !== undefined && (!Number.isFinite(reserve) || reserve < 170)) {
    throw new Error("ÆPOCH scene validation: caption reserve must be at least 170px");
  }
  for (const asset of scene.assetRefs ?? []) {
    requireText(asset, "assetRefs[]");
  }
};

export const validateAssetRefs = (
  assetRefs: string[] | undefined,
  availableAssets: ReadonlySet<string>,
): void => {
  for (const asset of assetRefs ?? []) {
    if (!availableAssets.has(asset)) {
      throw new Error(`ÆPOCH scene validation: missing approved asset "${asset}"`);
    }
  }
};

export const validateCircularValueField = (props: CircularValueFieldProps): void => {
  validateAepochSceneBase(props);
  if (props.fields.length < 1 || props.fields.length > 3) {
    throw new Error("CircularValueField requires one to three fields");
  }
  props.fields.forEach((field, index) => {
    requireText(field.id, `fields[${index}].id`);
    requireText(field.label, `fields[${index}].label`);
  });
};

export const validateFlowLifecycle = (props: FlowLifecycleProps): void => {
  validateAepochSceneBase(props);
  if (props.steps.length < 3 || props.steps.length > 5) {
    throw new Error("FlowLifecycle requires three to five steps");
  }
  props.steps.forEach((step, index) => {
    requireText(step.id, `steps[${index}].id`);
    requireText(step.label, `steps[${index}].label`);
  });
};

export const validateHumanNetwork = (props: HumanNetworkProps): void => {
  validateAepochSceneBase(props);
  const max = props.nodes.some((node) => node.label) ? 18 : 36;
  if (props.nodes.length < 1 || props.nodes.length > max) {
    throw new Error(`HumanNetwork requires one to ${max} nodes for this label density`);
  }
  const nodeIds = new Set(props.nodes.map((node) => node.id));
  props.edges?.forEach((edge) => {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      throw new Error(`HumanNetwork edge ${edge.from} → ${edge.to} references a missing node`);
    }
  });
};

export const validateSystemComparison = (props: SystemComparisonProps): void => {
  validateAepochSceneBase(props);
  requireText(props.left.title, "left.title");
  requireText(props.right.title, "right.title");
  if (props.left.items.length < 1 || props.left.items.length > 4) {
    throw new Error("SystemComparison left side requires one to four items");
  }
  if (props.right.items.length < 1 || props.right.items.length > 4) {
    throw new Error("SystemComparison right side requires one to four items");
  }
  props.left.items.forEach((item, index) => requireText(item, `left.items[${index}]`));
  props.right.items.forEach((item, index) => requireText(item, `right.items[${index}]`));
};
