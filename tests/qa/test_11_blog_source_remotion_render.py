#!/usr/bin/env python3
"""QA Test 11: Full blog-source dry run rendered via the real, proposal-locked
Remotion runtime -- no ffmpeg substitution (Phase 15 readiness closure).

Extends the same approved extraction/research/proposal/script/scene_plan
content as test_10_blog_source_production_dry_run.py, then diverges at
edit/compose: this run calls tools/video/video_compose.py's high-level
`operation="render"` entry point with `render_runtime="remotion"`, which
resolves asset IDs, routes to `_remotion_render()` (a real local
`npx remotion render` subprocess against remotion-composer/src/index.tsx),
and produces a real deterministic `final_review` via the tool's own
`_run_final_review()` -- not hand-rolled in this script.

Key mechanics finding acted on here: `cuts[].in_seconds`/`out_seconds` mean
different things to the two engines. FFmpeg's `_compose`/`_render_via_ffmpeg`
treat them as an in-source trim range per clip (test_08/09/10's convention).
Remotion's Explainer.tsx treats them as absolute timeline placement
(`Sequence from={in_seconds*fps} durationInFrames={(out-in)*fps}`), per
skills/pipelines/explainer/edit-director.md's own worked example. This run
uses the render-time payload with cuts.in/out at the real scene timeline
positions (matching scene_plan.start_seconds/end_seconds) and
`source_in_seconds=0` for the per-clip trim start, while the *checkpointed*
canonical edit_decisions artifact (schema-valid, additionalProperties:false)
carries the schema's documented shape.

No API keys, no paid calls, no model downloads, no external writes, no real
production material, no publish/deploy/stage/commit. Stops after compose.
"""

import sys
import os
import json
import subprocess
import shutil
from pathlib import Path
from datetime import date

PROJECT_ROOT = str(Path(__file__).resolve().parent.parent.parent)
sys.path.insert(0, PROJECT_ROOT)

from lib.env_loader import load_env
load_env()

from lib.checkpoint import write_checkpoint, get_completed_stages, get_next_stage
from tools.cost_tracker import CostTracker, BudgetMode
from schemas.artifacts import validate_artifact

OUT = os.path.join(os.path.dirname(__file__), "output")
PIPELINE_DIR = Path(OUT) / "blog_remotion_dry_run_pipeline"
PROJECT_ID = "qa_blog_remotion_dry_run"
ASSETS_DIR = Path(OUT) / "blog_remotion_dry_run_assets"
FIXTURE_PATH = Path(PROJECT_ROOT) / "tests" / "fixtures" / "blog" / "authoritative-source.md"

if PIPELINE_DIR.exists():
    shutil.rmtree(PIPELINE_DIR)
if ASSETS_DIR.exists():
    shutil.rmtree(ASSETS_DIR)
ASSETS_DIR.mkdir(parents=True, exist_ok=True)

PASS = 0
FAIL = 0


def check(name, condition, detail=""):
    global PASS, FAIL
    if condition:
        PASS += 1
        print(f"  [PASS] {name}")
    else:
        FAIL += 1
        print(f"  [FAIL] {name}" + (f" -- {detail}" if detail else ""))


def ensure_audio(path, duration=5, freq=440):
    subprocess.run(
        ["ffmpeg", "-y", "-f", "lavfi", "-i", f"sine=frequency={freq}:duration={duration}",
         "-ar", "44100", "-ac", "1", path],
        capture_output=True, check=True,
    )


def ensure_video(path, duration=5, width=1280, height=720, color="blue"):
    subprocess.run(
        ["ffmpeg", "-y",
         "-f", "lavfi", "-i", f"color=c={color}:s={width}x{height}:d={duration}:r=30",
         "-f", "lavfi", "-i", "sine=frequency=220:duration=" + str(duration),
         "-c:v", "libx264", "-crf", "23", "-pix_fmt", "yuv420p",
         "-g", "30", "-keyint_min", "30",
         "-c:a", "aac", "-shortest", path],
        capture_output=True, check=True,
    )


def word_timestamps(text, start, end):
    words = text.split()
    if not words:
        return []
    step = (end - start) / len(words)
    return [
        {"word": w, "start": round(start + i * step, 2), "end": round(start + (i + 1) * step, 2)}
        for i, w in enumerate(words)
    ]


print("--- Setup ---")
cost_log = PIPELINE_DIR / PROJECT_ID / "cost_log.json"
tracker = CostTracker(budget_total_usd=5.0, mode=BudgetMode.OBSERVE, cost_log_path=cost_log)
fixture_text = FIXTURE_PATH.read_text()
check("Fixture exists and is readable", bool(fixture_text.strip()))

from tools.video.video_compose import VideoCompose
_engines = VideoCompose().get_info().get("render_engines", {})
check("Remotion runtime available on this machine", bool(_engines.get("remotion")), str(_engines))

# ===================================================================
# Stages 0-4: extraction / research / proposal / script / scene_plan
# (Identical content to test_10_blog_source_production_dry_run.py -- this
# run extends that same approved fixture, it does not re-derive it.)
# ===================================================================
print("\n--- Stages 0-4: extraction / research / proposal / script / scene_plan (approved, see test_10) ---")

PROTECTED = {
    "central_question": "If activity no longer proves a person is there, what does?",
    "key_takeaway": "Presence has to be established directly, not inferred from activity.",
    "aepoch_reframe": "AEPOCH reframes the problem around proofs of human presence, letting human participation stay legible beside automation rather than banning it.",
    "human_consequence": "A person's participation can be recognized on its own terms, without being drowned out or copied by synthetic activity at scale.",
    "closing_statement": "The next internet must recognize presence, not just activity.",
}
EXISTING_REALITY = "Online systems treat activity as proof that people are present."
TENSION = "Synthetic systems can now produce that same activity at enormous scale, so more activity no longer means more people."

source_extraction = {
    "version": "1.0",
    "source": {"title": "Presence, Not Activity", "reference": str(FIXTURE_PATH.relative_to(PROJECT_ROOT)), "publication_date": date.today().isoformat(), "author": "AEPOCH"},
    "authority": {
        "mode": "source_authoritative", "protected_fields": list(PROTECTED.keys()),
        "research_permissions": ["verify_claims", "add_provenance", "add_context", "identify_audience_questions", "enrich_visual_examples"],
        "change_policy": "Stop for author approval before changing a protected field.",
    },
    "episode": {"working_title": "What Proves You're Real Online?", "audience": "curious general audience, digitally literate but non-technical", "desired_duration_seconds": 60, "existing_reality": EXISTING_REALITY, "tension": TENSION, **PROTECTED},
    "claim_inventory": [
        {"id": "claim-1", "claim": "Online systems treat activity as proof that people are present.", "source_location": "paragraph 1", "verification_required": False},
        {"id": "claim-2", "claim": "Synthetic systems can produce activity signals at enormous scale.", "source_location": "paragraph 2", "verification_required": True},
        {"id": "claim-3", "claim": "Engagement metrics were adopted because they were cheap to measure, not because they were reliable proof of a person.", "source_location": "research enrichment (add_context)", "verification_required": True, "notes": "Added during research; permitted under authority.research_permissions."},
    ],
    "excluded_material": [{"item": "Any specific proof-of-presence mechanism or protocol detail", "reason": "The source stays at the level of the reframe; mechanism detail belongs in a technical follow-up episode."}],
    "ambiguities": ["Treated 'the next internet' as a design principle, not a literal protocol claim."],
}
validate_artifact("source_extraction", source_extraction)
write_checkpoint(PIPELINE_DIR, PROJECT_ID, "extraction", "completed", human_approved=True, artifacts={"source_extraction": source_extraction}, pipeline_type="animated-explainer")

research_brief = {
    "version": "1.0", "topic": source_extraction["episode"]["working_title"], "research_date": date.today().isoformat(),
    "landscape": {
        "existing_content": [
            {"title": "Proof of Personhood explainers", "source": "youtube", "angle": "protocol deep-dive", "what_it_covers": "Cryptographic personhood mechanisms", "what_it_misses": "Why activity-as-proxy breaks down in the first place"},
            {"title": "Bot traffic reports", "source": "blog", "angle": "data/statistics", "what_it_covers": "How much web traffic is automated", "what_it_misses": "What a system should measure instead"},
            {"title": "AI content flood think-pieces", "source": "blog", "angle": "cultural commentary", "what_it_covers": "Anxiety about synthetic content volume", "what_it_misses": "A concrete reframe, not just alarm"},
        ],
        "saturated_angles": ["bots are taking over, be afraid"],
        "underserved_gaps": ["Why activity was ever treated as a proxy for presence", "What presence means as a first-class signal instead of activity"],
    },
    "data_points": [
        {"claim": "Automated traffic is a widely reported and growing share of overall web activity.", "source_url": "https://example.com/bot-traffic-report", "credibility": "secondary_source", "surprise_factor": "notable", "usable_as": "hook"},
        {"claim": "Engagement metrics were adopted because they were cheap to measure, not because they were reliable proof.", "source_url": "https://example.com/metrics-history", "credibility": "secondary_source", "surprise_factor": "surprising", "usable_as": "script_anchor"},
        {"claim": "Proof-of-personhood and proof-of-presence are a named area of protocol design distinct from bot detection.", "source_url": "https://example.com/proof-of-presence-landscape", "credibility": "secondary_source", "surprise_factor": "expected", "usable_as": "closing_punch"},
    ],
    "audience_insights": {
        "common_questions": ["Isn't this just spam/bot detection with a new name?", "How would a system tell a human from a synthetic actor without being invasive?", "Does this mean automation itself is being banned?"],
        "misconceptions": [{"myth": "Proof of presence means banning bots and automation.", "reality": "The source frames it as making human participation legible beside automation, not banning automation."}],
        "knowledge_level": "Understands bots/spam exist; unfamiliar with proof-of-presence as a distinct reframe from detection.",
    },
    "angles_discovered": [
        {"name": "The Proxy That Broke", "hook": "Every click on the internet used to mean a person. Not anymore.", "type": "narrative", "why_now": "Opens on existing_reality, turns on the same tension/reframe as the source.", "grounded_in": ["claim-1", "claim-2"]},
        {"name": "Presence Is Not a Byproduct", "hook": "What if 'being online' had to mean something again?", "type": "data_driven", "why_now": "Leads with the automated-traffic data point, lands on the identical reframe.", "grounded_in": ["claim-1"]},
        {"name": "Not a Ban. A Signal.", "hook": "This isn't about blocking bots. It's about a signal bots can't fake.", "type": "contrarian", "why_now": "Answers the audience misconception while preserving the exact reframe.", "grounded_in": ["claim-2"]},
    ],
    "sources": [
        {"url": "https://example.com/bot-traffic-report", "title": "Illustrative bot-traffic report", "used_for": "data_points", "reliability": "secondary"},
        {"url": "https://example.com/metrics-history", "title": "Illustrative platform-metrics history", "used_for": "data_points", "reliability": "secondary"},
        {"url": "https://example.com/proof-of-presence-landscape", "title": "Illustrative proof-of-presence landscape note", "used_for": "data_points", "reliability": "secondary"},
        {"url": "https://example.com/audience-forum-scan", "title": "Illustrative forum/FAQ scan", "used_for": "audience_insights", "reliability": "anecdotal"},
        {"url": str(FIXTURE_PATH.relative_to(PROJECT_ROOT)), "title": "Presence, Not Activity (source article)", "used_for": "landscape, angles, protected fields", "reliability": "primary"},
    ],
    "metadata": {"mode": "source_authoritative", "source_extraction_reference": str(FIXTURE_PATH.relative_to(PROJECT_ROOT)), "protected_fields_carried_forward": PROTECTED},
}
validate_artifact("research_brief", research_brief)
write_checkpoint(PIPELINE_DIR, PROJECT_ID, "research", "completed", artifacts={"research_brief": research_brief}, pipeline_type="animated-explainer", style_playbook="clean-professional")

SHARED_CORE_MESSAGE = PROTECTED["key_takeaway"]
SHARED_KEY_POINTS = [PROTECTED["central_question"], PROTECTED["aepoch_reframe"], PROTECTED["human_consequence"]]
concept_options = [
    {"id": "c1", "title": "The Proxy That Broke", "hook": "Every click on the internet used to mean a person. Not anymore.", "narrative_structure": "journey", "visual_approach": "Cold open on a flood of generic activity icons resolving into a single human mark.", "suggested_playbook": "clean-professional", "target_audience": "curious general audience", "target_platform": "youtube", "target_duration_seconds": 60, "key_points": SHARED_KEY_POINTS, "core_message": SHARED_CORE_MESSAGE, "cta": "Look at what AEPOCH is building around proof of presence.", "tone": "measured, explanatory", "grounded_in": ["angle: The Proxy That Broke", "claim-1", "claim-2"], "why_this_works": "Journey structure lets existing_reality/tension play out before the reframe lands."},
    {"id": "c2", "title": "Presence Is Not a Byproduct", "hook": "What if 'being online' had to mean something again?", "narrative_structure": "data_narrative", "visual_approach": "Stat-card open on automated-traffic share, relabeled metric.", "suggested_playbook": "clean-professional", "target_audience": "curious general audience", "target_platform": "linkedin", "target_duration_seconds": 60, "key_points": SHARED_KEY_POINTS, "core_message": SHARED_CORE_MESSAGE, "cta": "Look at what AEPOCH is building around proof of presence.", "tone": "crisp, data-forward", "grounded_in": ["angle: Presence Is Not a Byproduct", "claim-1"], "why_this_works": "Leads with data, lands on the identical reframe, not a metrics-only conclusion."},
    {"id": "c3", "title": "Not a Ban. A Signal.", "hook": "This isn't about blocking bots. It's about a signal bots can't fake.", "narrative_structure": "myth_busting", "visual_approach": "Myth/reality split-screen resolving into the same human-presence mark as c1.", "suggested_playbook": "flat-motion-graphics", "target_audience": "curious general audience", "target_platform": "tiktok", "target_duration_seconds": 45, "key_points": SHARED_KEY_POINTS, "core_message": SHARED_CORE_MESSAGE, "cta": "Look at what AEPOCH is building around proof of presence.", "tone": "direct, myth-busting", "grounded_in": ["angle: Not a Ban. A Signal.", "claim-2"], "why_this_works": "Answers the audience misconception without touching any protected field."},
]
DELIVERY_PROMISE = {"promise_type": "source_led", "type": "source_led", "motion_required": False, "source_required": False, "tone_mode": "educational", "quality_floor": "presentable", "approved_fallback": None}
proposal_packet = {
    "version": "1.0", "concept_options": concept_options,
    "selected_concept": {"concept_id": "c1", "rationale": "Journey structure gives the reframe the clearest runway for a first episode."},
    "production_plan": {
        "pipeline": "animated-explainer", "playbook": "clean-professional", "render_runtime": "remotion",
        "stages": [
            {"stage": "script", "tools": [{"tool_name": "tts_selector", "role": "narration", "available": True}], "approach": "Script written from source_extraction + selected concept, per SCRIPT_RULES.md"},
            {"stage": "scene_plan", "tools": [], "approach": "Six scenes mapped 1:1 to script sections"},
            {"stage": "assets", "tools": [{"tool_name": "image_selector", "role": "visuals", "available": True}], "approach": "Editorial illustration plates"},
            {"stage": "edit", "tools": [], "approach": "Automated edit decisions from scene_plan"},
            {"stage": "compose", "tools": [{"tool_name": "video_compose", "role": "render", "available": True}], "approach": "Real Remotion render via operation='render' -- no ffmpeg substitution"},
        ],
        "delivery_promise": {k: v for k, v in DELIVERY_PROMISE.items() if k != "type"},
        "renderer_family": "explainer-data",
    },
    "cost_estimate": {"total_estimated_usd": 0.0, "line_items": [{"tool": "n/a", "operation": "Phase 15 zero-cost dry run", "estimated_usd": 0.0}], "budget_verdict": "within_budget"},
    "approval": {"status": "approved", "user_notes": "Phase 15 dry-run approval (simulated).", "approved_budget_usd": 0.0},
    "metadata": {"mode": "source_authoritative", "source_extraction_reference": str(FIXTURE_PATH.relative_to(PROJECT_ROOT)), "protected_fields_carried_forward": PROTECTED, "dry_run": True},
}
validate_artifact("proposal_packet", proposal_packet)
decision_log = {
    "version": "1.0", "project_id": PROJECT_ID,
    "decisions": [{
        "decision_id": "d-001", "stage": "proposal", "category": "concept_selection", "subject": "Which presentation of the source-authoritative thesis to lead with",
        "options_considered": [
            {"option_id": "c1", "label": "The Proxy That Broke (journey)", "score": 0.9, "reason": "Best fit for a general first-episode audience"},
            {"option_id": "c2", "label": "Presence Is Not a Byproduct (data_narrative)", "score": 0.75, "reason": "Strong LinkedIn alternate", "rejected_because": "Less narrative runway for a first episode"},
            {"option_id": "c3", "label": "Not a Ban. A Signal. (myth_busting)", "score": 0.7, "reason": "Strong short-form alternate", "rejected_because": "Shorter duration trims room for the reframe"},
        ],
        "selected": "c1", "reason": "Journey structure gives the protected reframe the clearest runway.", "user_visible": True, "user_approved": True, "confidence": 0.8,
    }],
}
validate_artifact("decision_log", decision_log)
write_checkpoint(PIPELINE_DIR, PROJECT_ID, "proposal", "completed", human_approved=True, artifacts={"proposal_packet": proposal_packet, "decision_log": decision_log}, pipeline_type="animated-explainer", style_playbook="clean-professional")

SECTIONS = [
    {"id": "hook-1", "label": "Hook", "start": 0, "end": 8, "text": f"{EXISTING_REALITY} Every click, every view, every transaction, counted the same way.",
     "delivery_cues": {"pace": "measured", "energy": "observational", "emphasis_words": ["proof", "present"], "pause_after_seconds": 0.4, "delivery_note": "Flat, unhurried -- no rising inflection."},
     "enhancement_cues": [{"type": "animation", "description": "Flood of generic activity icons filling the frame.", "timestamp_seconds": 0}], "pronunciation_guides": [], "source_ref": "claim-1"},
    {"id": "setup-1", "label": "Setup", "start": 8, "end": 20, "text": f"{TENSION} The old proxy quietly stopped working.",
     "delivery_cues": {"pace": "measured", "energy": "slightly tightening", "emphasis_words": ["synthetic", "enormous", "no", "longer"], "pause_before_seconds": 0.3, "delivery_note": "Let 'no longer means more people' land as the turn."},
     "enhancement_cues": [{"type": "stat_card", "description": "Automated-traffic share stat.", "timestamp_seconds": 8}, {"type": "overlay", "description": "Activity icons blur together.", "timestamp_seconds": 14}], "pronunciation_guides": [], "source_ref": "claim-2"},
    {"id": "build-1", "label": "Build", "start": 20, "end": 30, "text": "Platforms adopted clicks and views because they were cheap to measure, not because they proved anyone real was behind them.",
     "delivery_cues": {"pace": "conversational", "energy": "explanatory", "emphasis_words": ["cheap", "not"], "delivery_note": "Deliver like a small revelation, not a complaint."},
     "enhancement_cues": [{"type": "diagram", "description": "Timeline: metrics adopted for cost, not reliability.", "timestamp_seconds": 20}], "pronunciation_guides": [], "source_ref": "claim-3"},
    {"id": "build-2", "label": "Build", "start": 30, "end": 42, "text": f"Detecting more fakes was never going to be enough. So here is the real question. {PROTECTED['central_question']}",
     "delivery_cues": {"pace": "measured", "energy": "rising toward the question", "pause_before_seconds": 0.6, "provider_text": "Detecting more fakes was never going to be enough. So here is the real question. <break time=\"0.5s\"/> If activity no longer proves a person is there, what does?"},
     "enhancement_cues": [{"type": "overlay", "description": "Text card: the central question, held on screen.", "timestamp_seconds": 30}, {"type": "overlay", "description": "Cut to AEPOCH mark for the climax.", "timestamp_seconds": 36}], "pronunciation_guides": [], "source_ref": "claim-2, claim-3"},
    {"id": "climax-1", "label": "Climax", "start": 42, "end": 52, "text": PROTECTED["aepoch_reframe"],
     "delivery_cues": {"pace": "measured", "energy": "settled, confident", "emphasis_words": ["presence", "beside", "not", "banning"], "pause_before_seconds": 0.5, "delivery_note": "The reframe should sound like a mechanism being named, not a slogan being sold."},
     "enhancement_cues": [{"type": "stat_card", "description": "AEPOCH mark resolves; human-presence signal visible beside automated activity.", "timestamp_seconds": 42}], "pronunciation_guides": [{"word": "AEPOCH", "phonetic": "AY-pock"}], "source_ref": ""},
    {"id": "landing-1", "label": "Landing", "start": 52, "end": 60, "text": f"{PROTECTED['key_takeaway']} {PROTECTED['human_consequence']} {PROTECTED['closing_statement']}",
     "delivery_cues": {"pace": "slow", "energy": "settled", "pause_before_seconds": 0.4, "delivery_note": "No lift at the end. Let the closing statement sit."},
     "enhancement_cues": [{"type": "overlay", "description": "Closing statement held as on-screen text.", "timestamp_seconds": 54}], "pronunciation_guides": [], "source_ref": ""},
]

script = {
    "version": "1.0", "title": concept_options[0]["title"], "total_duration_seconds": 60,
    "voice_performance": {
        "performance_intent": "Measured, trustworthy explainer voice that earns the reframe rather than selling it.",
        "pacing_profile": "contemplative",
        "energy_curve": "Calm and observational through hook/setup, tightens slightly through build, settles for climax and landing.",
        "pause_policy": "A clear beat before the central question in build-2, and before the closing statement in landing-1.",
        "sample_section_id": "climax-1",
        "provider_notes": {"tts_selector": "Local/offline voice acceptable for this dry-run sample."},
    },
    "sections": [
        {"id": s["id"], "label": s["label"], "text": s["text"], "start_seconds": s["start"], "end_seconds": s["end"],
         "speaker_directions": s["delivery_cues"].get("delivery_note", ""), "delivery_cues": s["delivery_cues"],
         "enhancement_cues": s["enhancement_cues"], "pronunciation_guides": s["pronunciation_guides"], "source_ref": s["source_ref"]}
        for s in SECTIONS
    ],
    "metadata": {"arc_stages_in_order": [s["label"] for s in SECTIONS], "source_extraction_reference": str(FIXTURE_PATH.relative_to(PROJECT_ROOT))},
}
validate_artifact("script", script)
write_checkpoint(PIPELINE_DIR, PROJECT_ID, "script", "completed", human_approved=True, artifacts={"script": script}, pipeline_type="animated-explainer")

SCENE_TYPES = ["text_card", "animation", "diagram", "text_card", "generated", "text_card"]
scenes = []
for i, s in enumerate(SECTIONS):
    scenes.append({
        "id": f"sc{i + 1}", "type": SCENE_TYPES[i], "description": f"{s['label']} scene, script section {s['id']}",
        "start_seconds": s["start"], "end_seconds": s["end"], "script_section_id": s["id"],
        "narrative_role": {"Hook": "establish_context", "Setup": "build_tension", "Build": "evidence", "Climax": "deliver_payload", "Landing": "resolution"}[s["label"]],
        "required_assets": [{"type": "narration", "description": f"TTS narration for {s['label']}", "source": "generate"}, {"type": "image", "description": f"Visual plate for {s['label']}", "source": "generate"}],
    })
scene_plan = {"version": "1.0", "style_playbook": "clean-professional", "scenes": scenes}
validate_artifact("scene_plan", scene_plan)
write_checkpoint(PIPELINE_DIR, PROJECT_ID, "scene_plan", "completed", human_approved=True, artifacts={"scene_plan": scene_plan}, pipeline_type="animated-explainer")

check("Extraction through scene_plan re-established and checkpointed", get_completed_stages(PIPELINE_DIR, PROJECT_ID, "animated-explainer") == ["extraction", "research", "proposal", "script", "scene_plan"])

# ===================================================================
# Stage 5: assets (local/zero-cost fixtures)
# ===================================================================
print("\n--- Stage 5: assets (local/zero-cost) ---")

tts_files = {}
for s in SECTIONS:
    path = str(ASSETS_DIR / f"tts_{s['id']}.wav")
    ensure_audio(path, duration=s["end"] - s["start"], freq=220)
    tts_files[s["id"]] = path

music_path = str(ASSETS_DIR / "music_bg.wav")
ensure_audio(music_path, duration=60, freq=110)

image_colors = ["slategray", "darkslateblue", "darkolivegreen", "steelblue", "indigo", "midnightblue"]
scene_videos = {}
assets = []
for i, (s, scene) in enumerate(zip(SECTIONS, scenes)):
    scene_id = scene["id"]
    assets.append({"id": f"a_tts_{s['id']}", "type": "narration", "path": tts_files[s["id"]], "source_tool": "tts_selector", "scene_id": scene_id, "duration_seconds": s["end"] - s["start"], "generation_summary": "Local ffmpeg sine-tone placeholder for zero-cost dry-run mechanics; not a real narration voice."})
    img_path = str(ASSETS_DIR / f"img_{scene_id}.png")
    subprocess.run(["ffmpeg", "-y", "-f", "lavfi", "-i", f"color=c={image_colors[i]}:s=1280x720:d=1", "-frames:v", "1", img_path], capture_output=True, check=True)
    assets.append({"id": f"a_img_{scene_id}", "type": "image", "path": img_path, "source_tool": "image_selector", "scene_id": scene_id, "generation_summary": "Local ffmpeg solid-color placeholder plate for zero-cost dry-run mechanics."})
    vid_path = str(ASSETS_DIR / f"scene_{scene_id}.mp4")
    ensure_video(vid_path, duration=s["end"] - s["start"], color=image_colors[i])
    scene_videos[scene_id] = vid_path
    assets.append({"id": f"a_vid_{scene_id}", "type": "video", "path": vid_path, "source_tool": "video_compose", "scene_id": scene_id, "generation_summary": "Local ffmpeg placeholder clip standing in for the composed scene."})

assets.append({"id": "a_music", "type": "music", "path": music_path, "source_tool": "music_gen", "scene_id": "sc1", "generation_summary": "Local ffmpeg sine-tone placeholder music bed."})

from tools.subtitle.subtitle_gen import SubtitleGen
subtitle_segments = [{"start": s["start"], "end": s["end"], "text": s["text"], "words": word_timestamps(s["text"], s["start"], s["end"])} for s in SECTIONS]
srt_path = str(ASSETS_DIR / "captions.srt")
sub_result = SubtitleGen().execute({"segments": subtitle_segments, "format": "srt", "output_path": srt_path, "max_words_per_cue": 8})
check("subtitle_gen produced an SRT file from real script timings", sub_result.success and os.path.exists(srt_path), sub_result.error or "")
assets.append({"id": "a_captions", "type": "subtitle", "path": srt_path, "source_tool": "subtitle_gen", "scene_id": "sc1", "generation_summary": "Deterministic SRT from script section text and timing (even word-spacing, no ASR)."})

asset_manifest = {"version": "1.0", "assets": assets, "total_cost_usd": 0.0}
validate_artifact("asset_manifest", asset_manifest)
check("All asset files exist on disk", all(os.path.exists(a["path"]) for a in assets))
write_checkpoint(PIPELINE_DIR, PROJECT_ID, "assets", "completed", human_approved=True, artifacts={"asset_manifest": asset_manifest}, pipeline_type="animated-explainer", cost_snapshot=tracker.cost_snapshot())

# --- Real local duck mix (narration + music), reused as the single
# Remotion narration audio layer -- ExplainerProps.audio.narration is a flat
# {src, volume}, not the schema's per-segment audio.narration.segments[]. ---
from tools.audio.audio_mixer import AudioMixer
concat_narration = str(ASSETS_DIR / "narration_concat.wav")
narration_list = str(ASSETS_DIR / "narration_list.txt")
with open(narration_list, "w") as f:
    for s in SECTIONS:
        f.write(f"file '{tts_files[s['id']].replace(chr(92), '/')}'\n")
subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", narration_list, "-c", "copy", concat_narration], capture_output=True, check=True)
mixer = AudioMixer()
mix_output = str(ASSETS_DIR / "final_mix.wav")
mix_result = mixer.execute({
    "operation": "duck",
    "tracks": [{"path": concat_narration, "role": "speech"}, {"path": music_path, "role": "music"}],
    "ducking": {"enabled": True, "music_volume_during_speech": 0.15},
    "output_path": mix_output,
})
check("AudioMixer duck mix succeeded (real local tool)", mix_result.success, mix_result.error or "")

# ===================================================================
# Stage 6: edit (canonical, schema-valid edit_decisions)
# ===================================================================
print("\n--- Stage 6: edit ---")

edit_decisions = {
    "version": "1.0",
    "render_runtime": "remotion",
    "renderer_family": "explainer-data",
    # TR-029: Remotion requires cut_timing_mode="timeline" explicitly --
    # in_seconds/out_seconds below are absolute output-timeline positions
    # (matching scene_plan.start_seconds/end_seconds), not an in-source
    # trim range. source_in_seconds=0 on every cut since each staged clip
    # already starts at the beginning of its own scene.
    "cut_timing_mode": "timeline",
    "cuts": [
        {"id": f"cut_{scene['id']}", "source": f"a_vid_{scene['id']}", "in_seconds": scene["start_seconds"], "out_seconds": scene["end_seconds"], "source_in_seconds": 0, "speed": 1.0}
        for scene in scenes
    ],
    "audio": {
        "narration": {"segments": [{"asset_id": f"a_tts_{s['id']}", "start_seconds": s["start"], "end_seconds": s["end"]} for s in SECTIONS]},
        "music": {"asset_id": "a_music", "volume": 0.2, "fade_in_seconds": 1.0, "fade_out_seconds": 2.0, "ducking": {"enabled": True, "threshold_db": -30, "reduction_db": 12}},
    },
    "subtitles": {"enabled": True, "style": "sentence", "source": srt_path, "position": "bottom-center", "max_words_per_line": 8},
}
validate_artifact("edit_decisions", edit_decisions)
check("edit_decisions.cuts use timeline in/out positions matching scene_plan (Remotion Sequence semantics)", edit_decisions["cuts"][0]["in_seconds"] == 0 and edit_decisions["cuts"][-1]["out_seconds"] == 60 and edit_decisions["cuts"][1]["in_seconds"] == 8)
check("edit_decisions.render_runtime carries proposal's locked runtime unchanged ('remotion')", edit_decisions["render_runtime"] == "remotion")
check("edit_decisions.cut_timing_mode is explicitly 'timeline' (TR-029)", edit_decisions["cut_timing_mode"] == "timeline")
write_checkpoint(PIPELINE_DIR, PROJECT_ID, "edit", "completed", artifacts={"edit_decisions": edit_decisions}, pipeline_type="animated-explainer")

# ===================================================================
# Stage 7: compose -- REAL Remotion render via operation="render"
# ===================================================================
print("\n--- Stage 7: compose (real Remotion render, no ffmpeg substitution) ---")

composer = VideoCompose()
final_video = str(Path(OUT) / "blog_remotion_dry_run_output.mp4")

# Render-time payload: canonical shape plus a flat audio.narration
# ExplainerProps can actually read (the schema's audio.narration.segments[]
# has no equivalent there -- see module docstring), and fields the tool's
# pre-compose validation and final_review look for that aren't part of the
# checkpointed edit_decisions schema (total_duration_seconds, top-level
# delivery_promise).
#
# TR-030 (general fix, see tools/video/video_compose.py
# VideoCompose._stage_local_assets_for_remotion): cuts[].source below are
# asset_manifest IDs, resolved to real local absolute paths by _render()
# before reaching Remotion; audio.narration.src is a real local absolute
# path directly. Both get staged into remotion-composer/public/_render_
# staging/<uuid>/ automatically and cleaned up after the render -- no
# manual public/ staging in this test anymore (unlike the prior session's
# workaround, which lived here rather than in the tool).
render_payload = dict(edit_decisions)
render_payload["audio"] = {
    "narration": {"src": mix_output, "volume": 1.0},
}
render_payload["total_duration_seconds"] = 60
render_payload["delivery_promise"] = DELIVERY_PROMISE

render_result = composer.execute({
    "operation": "render",
    "edit_decisions": render_payload,
    "asset_manifest": asset_manifest,
    "proposal_packet": proposal_packet,
    "scene_plan": scenes,
    "output_path": final_video,
    "remotion_timeout_ms": 1500000,
})
check("VideoCompose operation='render' succeeded (real npx remotion render subprocess)", render_result.success, render_result.error or "")
check("Output video file exists", os.path.exists(final_video))

staged_assets = (render_result.data or {}).get("staged_assets") or []
check("Tool staged local assets automatically (TR-030 general fix)", len(staged_assets) >= 7, str(len(staged_assets)))
check(
    "Staging provenance records both original and staged path for every asset",
    all(a.get("original_path") and a.get("staged_path") for a in staged_assets),
)
check(
    "Staging directory was cleaned up after the render (no leftover _render_staging dirs)",
    not list((Path(PROJECT_ROOT) / "remotion-composer" / "public" / "_render_staging").glob("*"))
    if (Path(PROJECT_ROOT) / "remotion-composer" / "public" / "_render_staging").exists()
    else True,
)

final_review = (render_result.data or {}).get("final_review")
check("Tool produced a final_review automatically (via _run_final_review)", final_review is not None)

if final_review:
    try:
        validate_artifact("final_review", final_review)
        check("final_review validates against schema", True)
    except Exception as e:
        check("final_review validates against schema", False, str(e))

    promise = final_review.get("checks", {}).get("promise_preservation", {})
    check(
        "final_review reports render_runtime_used='remotion' (the actual engine that ran)",
        promise.get("render_runtime_used") == "remotion",
        str(promise.get("render_runtime_used")),
    )
    check(
        "final_review reports NO runtime swap -- proposal-locked Remotion matched what actually rendered",
        promise.get("runtime_swap_detected") is False,
        promise.get("runtime_swap_check", ""),
    )
    print(f"  runtime_swap_check: {promise.get('runtime_swap_check')}")

    tp = final_review.get("checks", {}).get("technical_probe", {})
    print(f"  Output: {tp.get('resolution')} {tp.get('codec')} | {tp.get('duration_seconds')}s | audio={tp.get('has_audio')} | {tp.get('file_size_bytes')} bytes")
    check("technical_probe: valid container", tp.get("valid_container") is True)
    check("technical_probe: has audio", tp.get("has_audio") is True)
    check("technical_probe: duration within 25% of 60s target (tool's own drift check)", not any("Duration drift" in i for i in tp.get("issues", [])), str(tp.get("issues")))

    vs = final_review.get("checks", {}).get("visual_spotcheck", {})
    check("visual_spotcheck: >=4 real frames sampled from the actual Remotion render", vs.get("frames_sampled", 0) >= 4, str(vs.get("frames_sampled")))
    check("visual_spotcheck: no black frames detected", vs.get("black_frames_detected") is False)

    sc = final_review.get("checks", {}).get("subtitle_check", {})
    check("subtitle_check: subtitles expected and present (real SRT path)", sc.get("subtitles_expected") is True and sc.get("subtitles_present") is True)

render_report = {
    "version": "1.0",
    "outputs": [{
        "path": final_video, "format": "mp4",
        "codec": final_review["checks"]["technical_probe"].get("codec", "h264") if final_review else "h264",
        "resolution": final_review["checks"]["technical_probe"].get("resolution", "1920x1080") if final_review else "1920x1080",
        "fps": final_review["checks"]["technical_probe"].get("fps", 30) if final_review else 30,
        "duration_seconds": final_review["checks"]["technical_probe"].get("duration_seconds", 0) if final_review else 0,
        "file_size_bytes": final_review["checks"]["technical_probe"].get("file_size_bytes", 0) if final_review else 0,
        "platform_target": concept_options[0]["target_platform"],
    }],
    "render_time_seconds": render_result.duration_seconds,
    "render_grammar": "explainer-data",
    "final_review_ref": "inline (see checkpoint artifacts.final_review for this stage)",
}
try:
    validate_artifact("render_report", render_report)
    check("render_report validates against schema", True)
except Exception as e:
    check("render_report validates against schema", False, str(e))

write_checkpoint(
    PIPELINE_DIR, PROJECT_ID, "compose", "completed",
    artifacts={"render_report": render_report, "final_review": final_review or {}},
    pipeline_type="animated-explainer", cost_snapshot=tracker.cost_snapshot(),
)

# ===================================================================
# Final validation
# ===================================================================
print("\n--- Final validation ---")
completed = get_completed_stages(PIPELINE_DIR, PROJECT_ID, "animated-explainer")
check("All six pre-publish stages completed in order", completed == ["extraction", "research", "proposal", "script", "scene_plan", "assets", "edit", "compose"], str(completed))
next_stage = get_next_stage(PIPELINE_DIR, PROJECT_ID, "animated-explainer")
check("Next stage after compose is 'publish'", next_stage == "publish", str(next_stage))
cost_snapshot = tracker.cost_snapshot()
check("Zero-cost dry run throughout: no spend recorded", cost_snapshot.get("total_spent_usd") == 0.0, str(cost_snapshot))

print(f"\n  Final cost: {cost_snapshot}")
print("\n" + "=" * 60)
print(f"REMOTION BLOG SOURCE DRY RUN COMPLETE: {PASS} passed, {FAIL} failed")
print("=" * 60)
print(f"\nOutput: {final_video}")
print("Stopped before publish. No paid calls, model downloads, external writes, or real production material.")

sys.exit(1 if FAIL else 0)
