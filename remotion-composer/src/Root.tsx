import { Composition, CalculateMetadataFunction } from "remotion";
import { Explainer, ExplainerProps } from "./Explainer";
import {
  CinematicRenderer,
  calculateCinematicMetadata,
} from "./CinematicRenderer";
import { signalFromTomorrowWithMusicFixture } from "./cinematic/fixtures";
import { TalkingHead, TalkingHeadProps } from "./TalkingHead";
import {
  TitledVideo,
  calculateTitledVideoMetadata,
} from "./TitledVideo";
import { EndTag, EndTagProps } from "./components/EndTag";
import { HeroTitle } from "./components/HeroTitle";
import { ProductReveal, ProductRevealProps } from "./components/ProductReveal";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { CollageBurst, CollageBurstProps } from "./CollageBurst";
import { LyricOverlay, LyricOverlayProps } from "./LyricOverlay";
import {
  CircularValueFieldPreview,
  circularValueFieldPreviewProps,
  DeclarativeHookPreview,
  declarativeHookPreviewProps,
  FlowLifecyclePreview,
  flowLifecyclePreviewProps,
  HumanNetworkPreview,
  humanNetworkPreviewProps,
  KeyStatementPreview,
  keyStatementPreviewProps,
  SystemComparisonPreview,
  systemComparisonPreviewProps,
  animatedCircularValueFieldProps,
  animatedDeclarativeHookProps,
  animatedFlowLifecycleProps,
  animatedHumanNetworkProps,
  animatedKeyStatementProps,
  animatedSystemComparisonProps,
  reducedCircularValueFieldProps,
  reducedDeclarativeHookProps,
  reducedFlowLifecycleProps,
  reducedHumanNetworkProps,
  reducedKeyStatementProps,
  reducedSystemComparisonProps,
  DeclarativeHookAnimatedCaptioned,
  KeyStatementAnimatedCaptioned,
  CircularValueFieldAnimatedCaptioned,
  FlowLifecycleAnimatedCaptioned,
  HumanNetworkAnimatedCaptioned,
  SystemComparisonAnimatedCaptioned,
} from "./aepoch/previews";
import { AEPOCH_VIDEO } from "./aepoch/tokens";
import { AepochTier1TestReel, TEST_REEL_TIMING } from "./aepoch/reel";
import {
  welcomeAProps,
  welcomeBProps,
  august9ContinuationProps,
  WelcomeDirectAddressPreview,
  synthMimicryProps,
  synthMultiplicationProps,
  synthManufacturedConsensusAProps,
  synthManufacturedConsensusBProps,
  SyntheticMultiplicationPreview,
  humanConsequenceUncertainReflectionProps,
  humanConsequenceExtractionProps,
  HumanConsequencePreview,
  declarativeHookBuiltForAnotherWorldProps,
  declarativeHookDoesNotRecognizePresenceProps,
  DeclarativeHookVariantPreview,
  circularValueFieldTrafficDataProps,
  CircularValueFieldTrafficDataPreview,
  ancientIdeaModernToolsProps,
  CircularValueFieldConnectedPolesPreview,
  humanNetworkProtocolLayerProps,
  HumanNetworkProtocolLayerPreview,
  humanNetworkParticipantCohortProps,
  HumanNetworkParticipantCohortPreview,
  flowLifecyclePathProps,
  FlowLifecyclePathPreview,
  aepochSeriesOutroProps,
  AepochSeriesOutroPreview,
  scene03MissionProps,
  scene04BuiltForHumansProps,
  scene13SignalRevealProps,
  scene15ContributionProps,
  scene17OneIdeaProps,
  scene20FinalThesisProps,
  scene21BiologicalTransformerProps,
  KeyStatementStoryboardPreview,
  Scene13SignalRevealPreview,
  Scene15ContributionPreview,
  Scene17OneIdeaPreview,
  Scene20FinalThesisPreview,
  Scene21BiologicalTransformerPreview,
  DeclarativeHookStoryboardPreview,
} from "./aepoch/episodes/001-what-is-aepoch/static-previews";
import {
  AepochE001MotionBlocking,
  AepochE001MotionBlockingReduced,
  AEPOCH_E001_MOTION_BLOCKING_DURATION,
} from "./aepoch/episodes/001-what-is-aepoch/compositions";
import {
  AepochE001Phase14bProof,
  AEPOCH_E001_PHASE14B_PROOF_DURATION,
  AEPOCH_E001_PHASE14B_PROOF_FPS,
  AEPOCH_E001_PHASE14B_PROOF_WIDTH,
  AEPOCH_E001_PHASE14B_PROOF_HEIGHT,
} from "./aepoch/episodes/001-what-is-aepoch/phase14b/composition";

// ---------------------------------------------------------------------------
// Theme System — prevents every video from looking like dark fintech
// ---------------------------------------------------------------------------

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  mutedTextColor: string;
  headingFont: string;
  bodyFont: string;
  monoFont: string;
  chartColors: string[];
  springConfig: { damping: number; stiffness: number; mass: number };
  transitionDuration: number;
  captionHighlightColor: string;
  captionBackgroundColor: string;
}

export const THEMES: Record<string, ThemeConfig> = {
  "clean-professional": {
    primaryColor: "#2563EB",
    accentColor: "#F59E0B",
    backgroundColor: "#FFFFFF",
    surfaceColor: "#F9FAFB",
    textColor: "#1F2937",
    mutedTextColor: "#6B7280",
    headingFont: "Inter",
    bodyFont: "Inter",
    monoFont: "JetBrains Mono",
    chartColors: ["#2563EB", "#F59E0B", "#10B981", "#8B5CF6", "#EC4899", "#06B6D4"],
    springConfig: { damping: 20, stiffness: 120, mass: 1 },
    transitionDuration: 0.4,
    captionHighlightColor: "#2563EB",
    captionBackgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  "flat-motion-graphics": {
    primaryColor: "#7C3AED",
    accentColor: "#EC4899",
    backgroundColor: "#0F172A",
    surfaceColor: "#1E293B",
    textColor: "#F8FAFC",
    mutedTextColor: "#94A3B8",
    headingFont: "Space Grotesk",
    bodyFont: "Space Grotesk",
    monoFont: "Fira Code",
    chartColors: ["#7C3AED", "#EC4899", "#06B6D4", "#F59E0B", "#10B981", "#EF4444"],
    springConfig: { damping: 12, stiffness: 80, mass: 1 },
    transitionDuration: 0.3,
    captionHighlightColor: "#22D3EE",
    captionBackgroundColor: "rgba(15, 23, 42, 0.75)",
  },
  "minimalist-diagram": {
    primaryColor: "#1A1A2E",
    accentColor: "#E94560",
    backgroundColor: "#FAFAFA",
    surfaceColor: "#FFFFFF",
    textColor: "#1A1A2E",
    mutedTextColor: "#6B7280",
    headingFont: "IBM Plex Sans",
    bodyFont: "IBM Plex Sans",
    monoFont: "IBM Plex Mono",
    chartColors: ["#E94560", "#1A1A2E", "#0F3460", "#9CA3AF"],
    springConfig: { damping: 25, stiffness: 150, mass: 1 },
    transitionDuration: 0.5,
    captionHighlightColor: "#E94560",
    captionBackgroundColor: "rgba(250, 250, 250, 0.9)",
  },
  "anime-ghibli": {
    primaryColor: "#2D5016",
    accentColor: "#FFB347",
    backgroundColor: "#0A0A1A",
    surfaceColor: "#1A2332",
    textColor: "#F0E6D3",
    mutedTextColor: "#A8957E",
    headingFont: "Noto Serif JP",
    bodyFont: "Noto Sans",
    monoFont: "Fira Code",
    chartColors: ["#FFB347", "#2D5016", "#FF6B9D", "#A8E6CF", "#6B4C8A", "#E8927C"],
    springConfig: { damping: 18, stiffness: 60, mass: 1 },
    transitionDuration: 1.0,
    captionHighlightColor: "#FFB347",
    captionBackgroundColor: "rgba(10, 10, 26, 0.8)",
  },
};

// Default theme when none is specified — uses the existing dark style for backwards compatibility
export const DEFAULT_THEME = THEMES["flat-motion-graphics"];

export function resolveTheme(props: Record<string, unknown>): ThemeConfig {
  const themeName = (props.theme as string) || (props.playbook as string);
  if (themeName && THEMES[themeName]) {
    return THEMES[themeName];
  }
  // Allow custom theme passed as full object
  if (props.themeConfig && typeof props.themeConfig === "object") {
    return { ...DEFAULT_THEME, ...(props.themeConfig as Partial<ThemeConfig>) };
  }
  return DEFAULT_THEME;
}

const calculateMetadata: CalculateMetadataFunction<ExplainerProps> = async ({
  props,
}) => {
  const cuts = props.cuts || [];
  if (cuts.length === 0) {
    return { durationInFrames: 30 * 60 };
  }
  const lastEnd = Math.max(...cuts.map((c) => c.out_seconds || 0));
  // Add 1 second padding for final fade
  return { durationInFrames: Math.ceil((lastEnd + 1) * 30) };
};

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="AepochTier1DeclarativeHook"
        component={DeclarativeHookPreview}
        durationInFrames={declarativeHookPreviewProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={declarativeHookPreviewProps}
      />
      <Composition
        id="AepochTier1KeyStatement"
        component={KeyStatementPreview}
        durationInFrames={keyStatementPreviewProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={keyStatementPreviewProps}
      />
      <Composition
        id="AepochTier1CircularValueField"
        component={CircularValueFieldPreview}
        durationInFrames={circularValueFieldPreviewProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={circularValueFieldPreviewProps}
      />
      <Composition
        id="AepochTier1FlowLifecycle"
        component={FlowLifecyclePreview}
        durationInFrames={flowLifecyclePreviewProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={flowLifecyclePreviewProps}
      />
      <Composition
        id="AepochTier1HumanNetwork"
        component={HumanNetworkPreview}
        durationInFrames={humanNetworkPreviewProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={humanNetworkPreviewProps}
      />
      <Composition
        id="AepochTier1SystemComparison"
        component={SystemComparisonPreview}
        durationInFrames={systemComparisonPreviewProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={systemComparisonPreviewProps}
      />
      <Composition
        id="AepochTier1DeclarativeHookAnimated"
        component={DeclarativeHookAnimatedCaptioned}
        durationInFrames={animatedDeclarativeHookProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={animatedDeclarativeHookProps}
      />
      <Composition
        id="AepochTier1KeyStatementAnimated"
        component={KeyStatementAnimatedCaptioned}
        durationInFrames={animatedKeyStatementProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={animatedKeyStatementProps}
      />
      <Composition
        id="AepochTier1CircularValueFieldAnimated"
        component={CircularValueFieldAnimatedCaptioned}
        durationInFrames={animatedCircularValueFieldProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={animatedCircularValueFieldProps}
      />
      <Composition
        id="AepochTier1FlowLifecycleAnimated"
        component={FlowLifecycleAnimatedCaptioned}
        durationInFrames={animatedFlowLifecycleProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={animatedFlowLifecycleProps}
      />
      <Composition
        id="AepochTier1HumanNetworkAnimated"
        component={HumanNetworkAnimatedCaptioned}
        durationInFrames={animatedHumanNetworkProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={animatedHumanNetworkProps}
      />
      <Composition
        id="AepochTier1SystemComparisonAnimated"
        component={SystemComparisonAnimatedCaptioned}
        durationInFrames={animatedSystemComparisonProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={animatedSystemComparisonProps}
      />
      <Composition
        id="AepochTier1DeclarativeHookReduced"
        component={DeclarativeHookPreview}
        durationInFrames={reducedDeclarativeHookProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={reducedDeclarativeHookProps}
      />
      <Composition
        id="AepochTier1KeyStatementReduced"
        component={KeyStatementPreview}
        durationInFrames={reducedKeyStatementProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={reducedKeyStatementProps}
      />
      <Composition
        id="AepochTier1CircularValueFieldReduced"
        component={CircularValueFieldPreview}
        durationInFrames={reducedCircularValueFieldProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={reducedCircularValueFieldProps}
      />
      <Composition
        id="AepochTier1FlowLifecycleReduced"
        component={FlowLifecyclePreview}
        durationInFrames={reducedFlowLifecycleProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={reducedFlowLifecycleProps}
      />
      <Composition
        id="AepochTier1HumanNetworkReduced"
        component={HumanNetworkPreview}
        durationInFrames={reducedHumanNetworkProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={reducedHumanNetworkProps}
      />
      <Composition
        id="AepochTier1SystemComparisonReduced"
        component={SystemComparisonPreview}
        durationInFrames={reducedSystemComparisonProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={reducedSystemComparisonProps}
      />
      <Composition
        id="AepochTier1TestReelCaptioned"
        component={AepochTier1TestReel}
        durationInFrames={TEST_REEL_TIMING.total}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={{ showCaptions: true, reducedMotion: false }}
      />
      <Composition
        id="AepochTier1TestReelClean"
        component={AepochTier1TestReel}
        durationInFrames={TEST_REEL_TIMING.total}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={{ showCaptions: false, reducedMotion: false }}
      />
      <Composition
        id="AepochTier1TestReelReduced"
        component={AepochTier1TestReel}
        durationInFrames={TEST_REEL_TIMING.total}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={{ showCaptions: true, reducedMotion: true }}
      />
      {/* Phase 13B — Episode 001 static reference-frame compositions.
          Static scaffolding only: every composition below renders its
          settled/reducedMotion frame for `npx remotion still ... --frame=0`.
          Not part of the tagged Tier 1 beta baseline. */}
      <Composition
        id="Aepoch-E001-Static-WelcomeA"
        component={WelcomeDirectAddressPreview}
        durationInFrames={welcomeAProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={welcomeAProps}
      />
      <Composition
        id="Aepoch-E001-Static-WelcomeB"
        component={WelcomeDirectAddressPreview}
        durationInFrames={welcomeBProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={welcomeBProps}
      />
      <Composition
        id="Aepoch-E001-Static-August9Continuation"
        component={WelcomeDirectAddressPreview}
        durationInFrames={august9ContinuationProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={august9ContinuationProps}
      />
      <Composition
        id="Aepoch-E001-Static-SynthMimicry"
        component={SyntheticMultiplicationPreview}
        durationInFrames={synthMimicryProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={synthMimicryProps}
      />
      <Composition
        id="Aepoch-E001-Static-SynthMultiplication"
        component={SyntheticMultiplicationPreview}
        durationInFrames={synthMultiplicationProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={synthMultiplicationProps}
      />
      <Composition
        id="Aepoch-E001-Static-ManufacturedConsensusA"
        component={SyntheticMultiplicationPreview}
        durationInFrames={synthManufacturedConsensusAProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={synthManufacturedConsensusAProps}
      />
      <Composition
        id="Aepoch-E001-Static-ManufacturedConsensusB"
        component={SyntheticMultiplicationPreview}
        durationInFrames={synthManufacturedConsensusBProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={synthManufacturedConsensusBProps}
      />
      <Composition
        id="Aepoch-E001-Static-HumanConsequenceUncertainReflection"
        component={HumanConsequencePreview}
        durationInFrames={humanConsequenceUncertainReflectionProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={humanConsequenceUncertainReflectionProps}
      />
      <Composition
        id="Aepoch-E001-Static-HumanConsequenceExtraction"
        component={HumanConsequencePreview}
        durationInFrames={humanConsequenceExtractionProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={humanConsequenceExtractionProps}
      />
      <Composition
        id="Aepoch-E001-Static-DeclarativeHookBuiltForAnotherWorld"
        component={DeclarativeHookVariantPreview}
        durationInFrames={declarativeHookBuiltForAnotherWorldProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={declarativeHookBuiltForAnotherWorldProps}
      />
      <Composition
        id="Aepoch-E001-Static-DeclarativeHookDoesNotRecognizePresence"
        component={DeclarativeHookVariantPreview}
        durationInFrames={declarativeHookDoesNotRecognizePresenceProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={declarativeHookDoesNotRecognizePresenceProps}
      />
      <Composition
        id="Aepoch-E001-Static-CircularValueFieldTrafficData"
        component={CircularValueFieldTrafficDataPreview}
        durationInFrames={circularValueFieldTrafficDataProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={circularValueFieldTrafficDataProps}
      />
      <Composition
        id="Aepoch-E001-Static-AncientIdeaModernTools"
        component={CircularValueFieldConnectedPolesPreview}
        durationInFrames={ancientIdeaModernToolsProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={ancientIdeaModernToolsProps}
      />
      <Composition
        id="Aepoch-E001-Static-HumanNetworkProtocolLayer"
        component={HumanNetworkProtocolLayerPreview}
        durationInFrames={humanNetworkProtocolLayerProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={humanNetworkProtocolLayerProps}
      />
      <Composition
        id="Aepoch-E001-Static-HumanNetworkParticipantCohort"
        component={HumanNetworkParticipantCohortPreview}
        durationInFrames={humanNetworkParticipantCohortProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={humanNetworkParticipantCohortProps}
      />
      <Composition
        id="Aepoch-E001-Static-FlowLifecyclePath"
        component={FlowLifecyclePathPreview}
        durationInFrames={flowLifecyclePathProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={flowLifecyclePathProps}
      />
      <Composition
        id="Aepoch-E001-Static-SeriesOutro"
        component={AepochSeriesOutroPreview}
        durationInFrames={aepochSeriesOutroProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={aepochSeriesOutroProps}
      />
      {/* Phase 13B.1 — storyboard-only frozen Tier 1 renders (Scenes 3, 4,
          13, 15, 17, 20, 21), added solely to complete the full 22-scene
          storyboard contact sheet. Not new creative design work. */}
      <Composition
        id="Aepoch-E001-Static-Scene03Mission"
        component={KeyStatementStoryboardPreview}
        durationInFrames={scene03MissionProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={scene03MissionProps}
      />
      <Composition
        id="Aepoch-E001-Static-Scene04BuiltForHumans"
        component={DeclarativeHookStoryboardPreview}
        durationInFrames={scene04BuiltForHumansProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={scene04BuiltForHumansProps}
      />
      <Composition
        id="Aepoch-E001-Static-Scene13SignalReveal"
        component={Scene13SignalRevealPreview}
        durationInFrames={scene13SignalRevealProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={scene13SignalRevealProps}
      />
      <Composition
        id="Aepoch-E001-Static-Scene15Contribution"
        component={Scene15ContributionPreview}
        durationInFrames={scene15ContributionProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={scene15ContributionProps}
      />
      <Composition
        id="Aepoch-E001-Static-Scene17OneIdea"
        component={Scene17OneIdeaPreview}
        durationInFrames={scene17OneIdeaProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={scene17OneIdeaProps}
      />
      <Composition
        id="Aepoch-E001-Static-Scene20FinalThesis"
        component={Scene20FinalThesisPreview}
        durationInFrames={scene20FinalThesisProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={scene20FinalThesisProps}
      />
      <Composition
        id="Aepoch-E001-Static-Scene21BiologicalTransformer"
        component={Scene21BiologicalTransformerPreview}
        durationInFrames={scene21BiologicalTransformerProps.durationFrames}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={scene21BiologicalTransformerProps}
      />
      {/* Phase 13C.2A — complete episode motion-blocking draft (all 22
          scenes, synced to the Lee-reference timing map). Development
          preview only, not the final animation polish pass. */}
      <Composition
        id="Aepoch-E001-MotionBlocking"
        component={AepochE001MotionBlocking}
        durationInFrames={AEPOCH_E001_MOTION_BLOCKING_DURATION}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={{ reducedMotion: false }}
      />
      <Composition
        id="Aepoch-E001-MotionBlocking-Reduced"
        component={AepochE001MotionBlockingReduced}
        durationInFrames={AEPOCH_E001_MOTION_BLOCKING_DURATION}
        fps={AEPOCH_VIDEO.fps}
        width={AEPOCH_VIDEO.width}
        height={AEPOCH_VIDEO.height}
        defaultProps={{ reducedMotion: true }}
      />
      {/* Phase 14B — production-quality visual proof (35-50s asset-first
          hybrid proof segment, N06-N09). Isolated composition, does not
          reuse the rejected Phase 13C.2A motion-blocking prototype above. */}
      <Composition
        id="Aepoch-E001-Phase14B-Proof"
        component={AepochE001Phase14bProof}
        durationInFrames={AEPOCH_E001_PHASE14B_PROOF_DURATION}
        fps={AEPOCH_E001_PHASE14B_PROOF_FPS}
        width={AEPOCH_E001_PHASE14B_PROOF_WIDTH}
        height={AEPOCH_E001_PHASE14B_PROOF_HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="Explainer"
        component={Explainer}
        durationInFrames={30 * 60}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          cuts: [],
          overlays: [],
          captions: [],
          audio: {},
        }}
        calculateMetadata={calculateMetadata}
      />
      <Composition
        id="CinematicRenderer"
        component={CinematicRenderer}
        durationInFrames={30 * 30}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: [],
          titleFontSize: 78,
          titleWidth: 1320,
          signalLineCount: 18,
        }}
        calculateMetadata={calculateCinematicMetadata}
      />
      <Composition
        id="SignalFromTomorrowWithMusic"
        component={CinematicRenderer}
        durationInFrames={30 * 30}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={signalFromTomorrowWithMusicFixture}
        calculateMetadata={calculateCinematicMetadata}
      />
      <Composition
        id="TalkingHead"
        component={TalkingHead}
        durationInFrames={30 * 300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          videoSrc: "",
          captions: [],
          overlays: [],
          wordsPerPage: 4,
          fontSize: 52,
          highlightColor: "#22D3EE",
        }}
      />
      <Composition
        id="TitledVideo"
        component={TitledVideo}
        durationInFrames={30 * 60}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoSrc: "",
          tagline: "home is a verb.",
          taglineInSeconds: 53.5,
          taglineOutSeconds: undefined,
          topPx: 150,
          fontSize: 148,
          accentColor: "#F5C470",
        }}
        calculateMetadata={calculateTitledVideoMetadata}
      />
      <Composition
        id="HeroTitle"
        component={HeroTitle}
        durationInFrames={30 * 17}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "THE CALIBRATORS",
          subtitle: "The People Who Define Reality",
        }}
      />
      <Composition
        id="ProductReveal"
        component={ProductReveal}
        durationInFrames={30 * 8}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          productImage: "airnothing/product.png",
          productName: "AirNothing Pro Max Ultra",
          price: "Starting at $999",
          tagline: "Nothing included.",
          closer: "Less is nothing.",
          accentColor: "#00D4FF",
        } as ProductRevealProps}
      />
      <Composition
        id="ProductRevealVertical"
        component={ProductReveal}
        durationInFrames={30 * 8}
        fps={30}
        width={720}
        height={1280}
        defaultProps={{
          productImage: "airnothing/product.png",
          productName: "AirNothing Pro Max Ultra",
          price: "Starting at $999",
          tagline: "Nothing included.",
          closer: "Less is nothing.",
          accentColor: "#00D4FF",
        } as ProductRevealProps}
      />
      <Composition
        id="CaptionOverlayOnly"
        component={CaptionOverlay}
        durationInFrames={30 * 300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          words: [] as WordCaption[],
          wordsPerPage: 3,
          fontSize: 58,
          highlightColor: "#FACC15",
          backgroundColor: "rgba(15, 23, 42, 0.75)",
        }}
      />
      <Composition
        id="CollageBurst"
        component={CollageBurst}
        durationInFrames={30 * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          backgroundSrc: "",
          backgroundInSeconds: 0,
          curtainStartSeconds: 1.5,
          curtainEndSeconds: 3.0,
          clips: [],
        } as CollageBurstProps}
      />
      <Composition
        id="LyricOverlay"
        component={LyricOverlay}
        durationInFrames={30 * 28}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          videoSrc: "",
          lyrics: [],
          bottomY: 0.88,
        } as LyricOverlayProps}
      />
      <Composition
        id="EndTag"
        component={EndTag}
        // 5.5s at 30fps = 165 frames. Render CLI can override via --props.
        durationInFrames={165}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          text: "THE CITY KEEPS ITS OWN VIGIL.",
          palette: "cool_offwhite_on_black",
          fadeInSeconds: 0.6,
          holdSeconds: 4.3,
          fadeOutSeconds: 0.6,
        } as EndTagProps}
      />
      <Composition
        id="EndTagOverlay"
        component={EndTag}
        // 8.19s at 30fps = 246 frames. Render CLI can override via --props.
        // Intended to be composited on top of body footage, not concat'd.
        durationInFrames={246}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          text: "EARN THE LIGHT.",
          palette: "cool_offwhite_on_black",
          fadeInSeconds: 1.0,
          holdSeconds: 5.69,
          fadeOutSeconds: 1.5,
          overlay: true,
        } as EndTagProps}
      />
    </>
  );
};
