#!/usr/bin/env python3
"""QA Test 10: Full blog-source dry run, extraction through compose (Phase 15).

Extends test_09_blog_source_dry_run.py's approved extraction/research/proposal
through script, scene_plan, local/zero-cost assets, edit, compose, and a
deterministic final_review. Uses the real checkpoint/schema machinery and
real local tools (AudioMixer, VideoCompose, SubtitleGen) throughout.

No API keys, no paid calls, no model downloads, no external writes, no real
production material. Stops after compose (does not exercise publish).

Script content is validated against both schemas/artifacts/script.schema.json
(the live, enforced contract) and the substantive requirements of
brands/aepoch/SCRIPT_RULES.md Part 2-4 (five-stage arc, word-count/cue-density
math, protected-field preservation, pronunciation-on-first-use, claim
traceability, hook/landing rules). Where SCRIPT_RULES.md's Part 2 illustrative
YAML uses field names (arc_stage, pause_emphasis, voice_performance_plan,
pronunciation_notes, verify_flags) that do not exist in the live schema, this
script satisfies the *substance* of each rule using the schema's real fields
(id/label prefix for arc stage, delivery_cues, top-level voice_performance,
pronunciation_guides, source_ref) per SCRIPT_RULES.md's own stated precedence:
"Where the pipeline's own terms and this document's earlier terms disagreed,
the pipeline wins." This residual field-name drift in Part 2 is flagged in
the accompanying report rather than silently patched.
"""

import sys
import os
import json
import subprocess
import shutil
from pathlib import Path
from datetime import date, datetime, timezone

PROJECT_ROOT = str(Path(__file__).resolve().parent.parent.parent)
sys.path.insert(0, PROJECT_ROOT)

from lib.env_loader import load_env
load_env()

from lib.checkpoint import write_checkpoint, get_completed_stages, get_next_stage
from tools.cost_tracker import CostTracker, BudgetMode
from schemas.artifacts import validate_artifact

OUT = os.path.join(os.path.dirname(__file__), "output")
PIPELINE_DIR = Path(OUT) / "blog_full_dry_run_pipeline"
PROJECT_ID = "qa_blog_full_dry_run"
ASSETS_DIR = Path(OUT) / "blog_full_dry_run_assets"
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

# ===================================================================
# Stages 0-2: extraction, research, proposal
# (Same approved content as tests/qa/test_09_blog_source_dry_run.py --
# this run extends that approved fixture, it does not re-derive it.)
# ===================================================================
print("\n--- Stages 0-2: extraction / research / proposal (approved, see test_09) ---")

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
    "source": {
        "title": "Presence, Not Activity",
        "reference": str(FIXTURE_PATH.relative_to(PROJECT_ROOT)),
        "publication_date": date.today().isoformat(),
        "author": "AEPOCH",
    },
    "authority": {
        "mode": "source_authoritative",
        "protected_fields": list(PROTECTED.keys()),
        "research_permissions": ["verify_claims", "add_provenance", "add_context", "identify_audience_questions", "enrich_visual_examples"],
        "change_policy": "Stop for author approval before changing a protected field.",
    },
    "episode": {
        "working_title": "What Proves You're Real Online?",
        "audience": "curious general audience, digitally literate but non-technical",
        "desired_duration_seconds": 60,
        "existing_reality": EXISTING_REALITY,
        "tension": TENSION,
        **PROTECTED,
    },
    "claim_inventory": [
        {"id": "claim-1", "claim": "Online systems treat activity as proof that people are present.", "source_location": "paragraph 1", "verification_required": False},
        {"id": "claim-2", "claim": "Synthetic systems can produce activity signals at enormous scale.", "source_location": "paragraph 2", "verification_required": True},
        {"id": "claim-3", "claim": "Engagement metrics were adopted because they were cheap to measure, not because they were reliable proof of a person.", "source_location": "research enrichment (add_context)", "verification_required": True, "notes": "Added during research; permitted under authority.research_permissions."},
    ],
    "excluded_material": [
        {"item": "Any specific proof-of-presence mechanism or protocol detail", "reason": "The source stays at the level of the reframe; mechanism detail belongs in a technical follow-up episode."},
    ],
    "ambiguities": ["Treated 'the next internet' as a design principle, not a literal protocol claim."],
}
validate_artifact("source_extraction", source_extraction)
write_checkpoint(PIPELINE_DIR, PROJECT_ID, "extraction", "completed", human_approved=True,
                  artifacts={"source_extraction": source_extraction}, pipeline_type="animated-explainer")

research_brief = {
    "version": "1.0",
    "topic": source_extraction["episode"]["working_title"],
    "research_date": date.today().isoformat(),
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
        "common_questions": [
            "Isn't this just spam/bot detection with a new name?",
            "How would a system tell a human from a synthetic actor without being invasive?",
            "Does this mean automation itself is being banned?",
        ],
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
write_checkpoint(PIPELINE_DIR, PROJECT_ID, "research", "completed",
                  artifacts={"research_brief": research_brief}, pipeline_type="animated-explainer", style_playbook="clean-professional")

SHARED_CORE_MESSAGE = PROTECTED["key_takeaway"]
SHARED_KEY_POINTS = [PROTECTED["central_question"], PROTECTED["aepoch_reframe"], PROTECTED["human_consequence"]]
concept_options = [
    {"id": "c1", "title": "The Proxy That Broke", "hook": "Every click on the internet used to mean a person. Not anymore.",
     "narrative_structure": "journey", "visual_approach": "Cold open on a flood of generic activity icons resolving into a single human mark.",
     "suggested_playbook": "clean-professional", "target_audience": "curious general audience", "target_platform": "youtube",
     "target_duration_seconds": 60, "key_points": SHARED_KEY_POINTS, "core_message": SHARED_CORE_MESSAGE,
     "cta": "Look at what AEPOCH is building around proof of presence.", "tone": "measured, explanatory",
     "grounded_in": ["angle: The Proxy That Broke", "claim-1", "claim-2"],
     "why_this_works": "Journey structure lets existing_reality/tension play out before the reframe lands."},
    {"id": "c2", "title": "Presence Is Not a Byproduct", "hook": "What if 'being online' had to mean something again?",
     "narrative_structure": "data_narrative", "visual_approach": "Stat-card open on automated-traffic share, relabeled metric.",
     "suggested_playbook": "clean-professional", "target_audience": "curious general audience", "target_platform": "linkedin",
     "target_duration_seconds": 60, "key_points": SHARED_KEY_POINTS, "core_message": SHARED_CORE_MESSAGE,
     "cta": "Look at what AEPOCH is building around proof of presence.", "tone": "crisp, data-forward",
     "grounded_in": ["angle: Presence Is Not a Byproduct", "claim-1"],
     "why_this_works": "Leads with data, lands on the identical reframe, not a metrics-only conclusion."},
    {"id": "c3", "title": "Not a Ban. A Signal.", "hook": "This isn't about blocking bots. It's about a signal bots can't fake.",
     "narrative_structure": "myth_busting", "visual_approach": "Myth/reality split-screen resolving into the same human-presence mark as c1.",
     "suggested_playbook": "flat-motion-graphics", "target_audience": "curious general audience", "target_platform": "tiktok",
     "target_duration_seconds": 45, "key_points": SHARED_KEY_POINTS, "core_message": SHARED_CORE_MESSAGE,
     "cta": "Look at what AEPOCH is building around proof of presence.", "tone": "direct, myth-busting",
     "grounded_in": ["angle: Not a Ban. A Signal.", "claim-2"],
     "why_this_works": "Answers the audience misconception without touching any protected field."},
]
proposal_packet = {
    "version": "1.0",
    "concept_options": concept_options,
    "selected_concept": {"concept_id": "c1", "rationale": "Journey structure gives the reframe the clearest runway for a first episode."},
    "production_plan": {
        "pipeline": "animated-explainer", "playbook": "clean-professional", "render_runtime": "remotion",
        "stages": [
            {"stage": "script", "tools": [{"tool_name": "tts_selector", "role": "narration", "available": True}], "approach": "Script written from source_extraction + selected concept, per SCRIPT_RULES.md"},
            {"stage": "scene_plan", "tools": [], "approach": "Six scenes mapped 1:1 to script sections"},
            {"stage": "assets", "tools": [{"tool_name": "image_selector", "role": "visuals", "available": True}], "approach": "Editorial illustration plates"},
            {"stage": "edit", "tools": [], "approach": "Automated edit decisions from scene_plan"},
            {"stage": "compose", "tools": [{"tool_name": "video_compose", "role": "render", "available": True}], "approach": "Remotion render (production); this dry run exercises the ffmpeg mechanics path only -- see final_review.promise_preservation"},
        ],
        "delivery_promise": {"promise_type": "source_led", "motion_required": False, "source_required": False, "tone_mode": "educational", "quality_floor": "presentable", "approved_fallback": None},
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
        "decision_id": "d-001", "stage": "proposal", "category": "concept_selection",
        "subject": "Which presentation of the source-authoritative thesis to lead with",
        "options_considered": [
            {"option_id": "c1", "label": "The Proxy That Broke (journey)", "score": 0.9, "reason": "Best fit for a general first-episode audience"},
            {"option_id": "c2", "label": "Presence Is Not a Byproduct (data_narrative)", "score": 0.75, "reason": "Strong LinkedIn alternate", "rejected_because": "Less narrative runway for a first episode"},
            {"option_id": "c3", "label": "Not a Ban. A Signal. (myth_busting)", "score": 0.7, "reason": "Strong short-form alternate", "rejected_because": "Shorter duration trims room for the reframe"},
        ],
        "selected": "c1", "reason": "Journey structure gives the protected reframe the clearest runway.",
        "user_visible": True, "user_approved": True, "confidence": 0.8,
    }],
}
validate_artifact("decision_log", decision_log)
write_checkpoint(PIPELINE_DIR, PROJECT_ID, "proposal", "completed", human_approved=True,
                  artifacts={"proposal_packet": proposal_packet, "decision_log": decision_log},
                  pipeline_type="animated-explainer", style_playbook="clean-professional")
check("Extraction/research/proposal re-established and checkpointed", get_completed_stages(PIPELINE_DIR, PROJECT_ID, "animated-explainer") == ["extraction", "research", "proposal"])

# ===================================================================
# Stage 3: script (per SCRIPT_RULES.md Parts 2-4, live schema field names)
# ===================================================================
print("\n--- Stage 3: script ---")

# Sections encode arc_stage via id-prefix/label (schema has no dedicated
# arc_stage field -- see module docstring). AEPOCH is named for the first
# time in climax-1 only, per SCRIPT_RULES rule 8.
SECTIONS = [
    {
        "id": "hook-1", "label": "Hook", "start": 0, "end": 8,
        "text": f"{EXISTING_REALITY} Every click, every view, every transaction, counted the same way.",
        "delivery_cues": {"pace": "measured", "energy": "observational", "emphasis_words": ["proof", "present"], "pause_after_seconds": 0.4, "delivery_note": "Flat, unhurried -- no rising inflection. This is a description, not an alarm."},
        "enhancement_cues": [{"type": "animation", "description": "Flood of generic activity icons (clicks/views/likes) filling the frame.", "timestamp_seconds": 0}],
        "pronunciation_guides": [],
        "source_ref": "claim-1",
    },
    {
        "id": "setup-1", "label": "Setup", "start": 8, "end": 20,
        "text": f"{TENSION} The old proxy quietly stopped working.",
        "delivery_cues": {"pace": "measured", "energy": "slightly tightening", "emphasis_words": ["synthetic", "enormous", "no", "longer"], "pause_before_seconds": 0.3, "delivery_note": "Let 'no longer means more people' land as the turn, not a throwaway."},
        "enhancement_cues": [
            {"type": "stat_card", "description": "Automated-traffic share stat, from research data_points.", "timestamp_seconds": 8},
            {"type": "overlay", "description": "Activity icons stop resolving into distinct human marks -- start blurring together.", "timestamp_seconds": 14},
        ],
        "pronunciation_guides": [],
        "source_ref": "claim-2",
    },
    {
        "id": "build-1", "label": "Build", "start": 20, "end": 30,
        "text": "Platforms adopted clicks and views because they were cheap to measure, not because they proved anyone real was behind them.",
        "delivery_cues": {"pace": "conversational", "energy": "explanatory", "emphasis_words": ["cheap", "not"], "delivery_note": "This is the 'why it broke' beat -- deliver it like a small revelation, not a complaint."},
        "enhancement_cues": [{"type": "diagram", "description": "Timeline: engagement metrics adopted for cost, not reliability.", "timestamp_seconds": 20}],
        "pronunciation_guides": [],
        "source_ref": "claim-3",
    },
    {
        "id": "build-2", "label": "Build", "start": 30, "end": 42,
        "text": f"Detecting more fakes was never going to be enough. So here is the real question. {PROTECTED['central_question']}",
        "delivery_cues": {"pace": "measured", "energy": "rising toward the question", "pause_before_seconds": 0.6, "provider_text": "Detecting more fakes was never going to be enough. So here is the real question. <break time=\"0.5s\"/> If activity no longer proves a person is there, what does?"},
        "enhancement_cues": [
            {"type": "overlay", "description": "Text card: the central question, held on screen.", "timestamp_seconds": 30},
            {"type": "overlay", "description": "Hard cut from question to AEPOCH mark for the climax (schema has no 'transition' cue type -- SCRIPT_RULES.md's inline-notation table lists one that isn't in schemas/artifacts/script.schema.json; using 'overlay' here, flagged in the dry-run report).", "timestamp_seconds": 36},
        ],
        "pronunciation_guides": [],
        "source_ref": "claim-2, claim-3",
    },
    {
        "id": "climax-1", "label": "Climax", "start": 42, "end": 52,
        "text": PROTECTED["aepoch_reframe"],
        "delivery_cues": {"pace": "measured", "energy": "settled, confident", "emphasis_words": ["presence", "beside", "not", "banning"], "pause_before_seconds": 0.5, "delivery_note": "The reframe should sound like a mechanism being named, not a slogan being sold."},
        "enhancement_cues": [{"type": "stat_card", "description": "AEPOCH mark resolves at center; human-presence signal made visible beside ordinary automated activity, not replacing it.", "timestamp_seconds": 42}],
        "pronunciation_guides": [{"word": "AEPOCH", "phonetic": "AY-pock"}],
        "source_ref": "",
    },
    {
        "id": "landing-1", "label": "Landing", "start": 52, "end": 60,
        "text": f"{PROTECTED['key_takeaway']} {PROTECTED['human_consequence']} {PROTECTED['closing_statement']}",
        "delivery_cues": {"pace": "slow", "energy": "settled", "pause_before_seconds": 0.4, "delivery_note": "No lift at the end. Let the closing statement sit; do not resolve it into a pitch."},
        "enhancement_cues": [{"type": "overlay", "description": "Closing statement held as on-screen text over the human-presence mark.", "timestamp_seconds": 54}],
        "pronunciation_guides": [],
        "source_ref": "",
    },
]

script = {
    "version": "1.0",
    "title": concept_options[0]["title"],
    "total_duration_seconds": 60,
    "voice_performance": {
        "performance_intent": "Measured, trustworthy explainer voice that earns the reframe rather than selling it.",
        "pacing_profile": "contemplative",
        "energy_curve": "Calm and observational through hook/setup, tightens slightly through build as the tension sharpens, settles for climax and landing.",
        "pause_policy": "A clear beat before the central question in build-2, and before the closing statement in landing-1.",
        "sample_section_id": "climax-1",
        "provider_notes": {"tts_selector": "Local/offline voice acceptable for this dry-run sample; production voice selection is a separate proposal-stage decision."},
    },
    "sections": [
        {
            "id": s["id"], "label": s["label"], "text": s["text"],
            "start_seconds": s["start"], "end_seconds": s["end"],
            "speaker_directions": s["delivery_cues"].get("delivery_note", ""),
            "delivery_cues": s["delivery_cues"],
            "enhancement_cues": s["enhancement_cues"],
            "pronunciation_guides": s["pronunciation_guides"],
            "source_ref": s["source_ref"],
        }
        for s in SECTIONS
    ],
    "metadata": {
        "arc_stages_in_order": [s["label"] for s in SECTIONS],
        "source_extraction_reference": str(FIXTURE_PATH.relative_to(PROJECT_ROOT)),
    },
}

try:
    validate_artifact("script", script)
    check("script validates against schemas/artifacts/script.schema.json", True)
except Exception as e:
    check("script validates against schemas/artifacts/script.schema.json", False, str(e))

# --- SCRIPT_RULES.md Part 3/4 checks, using live schema field names ---
all_text = " ".join(s["text"] for s in SECTIONS)
word_count_actual = sum(len(s["text"].split()) for s in SECTIONS)
word_count_target = round(60 * 2.4)
check(
    "Part 3: word_count_actual within +/-10% of word_count_target (60s * 2.4 wps)",
    abs(word_count_actual - word_count_target) / word_count_target <= 0.10,
    f"actual={word_count_actual} target={word_count_target}",
)

all_cues = []
for s in SECTIONS:
    for c in s["enhancement_cues"]:
        all_cues.append(c["timestamp_seconds"])
all_cues.sort()
gaps = [b - a for a, b in zip(all_cues, all_cues[1:])]
check("Part 3: at least 6 enhancement cues (60s / 9s target)", len(all_cues) >= 6, str(len(all_cues)))
check("Part 3: no cue gap exceeds 12s (target spacing 8-10s)", all(g <= 12 for g in gaps), str(gaps))

labels_in_order = [s["label"] for s in SECTIONS]
check(
    "Part 2/4 #4: five-stage arc present in order with no gaps (id/label encodes arc_stage; schema has no dedicated field)",
    labels_in_order == ["Hook", "Setup", "Build", "Build", "Climax", "Landing"],
    str(labels_in_order),
)
starts_ends_contiguous = all(SECTIONS[i]["end"] == SECTIONS[i + 1]["start"] for i in range(len(SECTIONS) - 1))
check("Sections cover full duration with no timeline gaps", SECTIONS[0]["start"] == 0 and SECTIONS[-1]["end"] == 60 and starts_ends_contiguous)

check(
    "Part 4 #5: voice_performance has concrete pacing/pause/emphasis + a sample_section_id tied to an actual section",
    all(script["voice_performance"].get(k) for k in ("performance_intent", "pacing_profile", "pause_policy"))
    and script["voice_performance"]["sample_section_id"] in {s["id"] for s in SECTIONS},
)
check(
    "Every narration section carries >=2 concrete delivery_cues (pace/energy/emphasis/pause/note/provider_text)",
    all(sum(1 for k in ("pace", "energy", "emphasis_words", "pause_before_seconds", "pause_after_seconds", "delivery_note", "provider_text") if s["delivery_cues"].get(k)) >= 2 for s in SECTIONS),
)

check(
    "Part 4 #6: AEPOCH pronunciation marked on first use, matching SCRIPT_RULES.md's reference table (AY-pock)",
    any(g["word"] == "AEPOCH" and g["phonetic"] == "AY-pock" for s in SECTIONS for g in s["pronunciation_guides"]),
)
check(
    "Part 4 #8: hook/setup/build avoid naming AEPOCH before the climax reframe",
    "AEPOCH" not in (SECTIONS[0]["text"] + SECTIONS[1]["text"] + SECTIONS[2]["text"] + SECTIONS[3]["text"]).upper().replace("AEPOCH", "") and
    "AEPOCH" not in SECTIONS[0]["text"] and "AEPOCH" not in SECTIONS[1]["text"] and "AEPOCH" not in SECTIONS[2]["text"] and "AEPOCH" not in SECTIONS[3]["text"],
)
check("AEPOCH is named starting at the climax section", "AEPOCH" in SECTIONS[4]["text"])

claim_ids = {c["id"] for c in source_extraction["claim_inventory"]}
referenced_claim_ids = set()
for s in SECTIONS:
    for cid in claim_ids:
        if cid in s["source_ref"]:
            referenced_claim_ids.add(cid)
check(
    "Part 4 #7: every claim_inventory entry is traceable to a section via source_ref",
    referenced_claim_ids == claim_ids,
    f"missing={claim_ids - referenced_claim_ids}",
)
check(
    "Part 4 #10: excluded_material still accounts for material cut from the source (unchanged from extraction)",
    len(source_extraction["excluded_material"]) >= 1,
)

# --- Protected-field preservation into script (the user's core ask) ---
landing_text = SECTIONS[-1]["text"]
check(
    "Part 4 #9: landing matches episode.closing_statement unchanged, as the final sentence, no recap added",
    landing_text.rstrip().endswith(PROTECTED["closing_statement"]),
)
check("hook text is exactly episode.existing_reality plus supporting detail (verbatim substring)", EXISTING_REALITY in SECTIONS[0]["text"])
check("setup text carries episode.tension verbatim", TENSION in SECTIONS[1]["text"])
check("build-2 carries episode.central_question verbatim (protected)", PROTECTED["central_question"] in SECTIONS[3]["text"])
check("climax carries episode.aepoch_reframe verbatim (protected)", PROTECTED["aepoch_reframe"] in SECTIONS[4]["text"])
check("landing carries episode.key_takeaway verbatim (protected)", PROTECTED["key_takeaway"] in landing_text)
check("landing carries episode.human_consequence verbatim (protected)", PROTECTED["human_consequence"] in landing_text)
check("landing carries episode.closing_statement verbatim (protected)", PROTECTED["closing_statement"] in landing_text)
check(
    "All five protected fields appear verbatim somewhere in the script text (no paraphrase drift)",
    all(v in all_text for v in PROTECTED.values()),
)

write_checkpoint(PIPELINE_DIR, PROJECT_ID, "script", "completed", human_approved=True,
                  artifacts={"script": script}, pipeline_type="animated-explainer")

# ===================================================================
# Stage 4: scene_plan
# ===================================================================
print("\n--- Stage 4: scene_plan ---")

SCENE_TYPES = ["text_card", "animation", "diagram", "text_card", "generated", "text_card"]
scenes = []
for i, s in enumerate(SECTIONS):
    scenes.append({
        "id": f"sc{i + 1}",
        "type": SCENE_TYPES[i],
        "description": f"{s['label']} scene, script section {s['id']}",
        "start_seconds": s["start"],
        "end_seconds": s["end"],
        "script_section_id": s["id"],
        "narrative_role": {"Hook": "establish_context", "Setup": "build_tension", "Build": "evidence", "Climax": "deliver_payload", "Landing": "resolution"}[s["label"]],
        "required_assets": [
            {"type": "narration", "description": f"TTS narration for {s['label']}", "source": "generate"},
            {"type": "image", "description": f"Visual plate for {s['label']}", "source": "generate"},
        ],
    })
scene_plan = {"version": "1.0", "style_playbook": "clean-professional", "scenes": scenes}

try:
    validate_artifact("scene_plan", scene_plan)
    check("scene_plan validates against schema", True)
except Exception as e:
    check("scene_plan validates against schema", False, str(e))

check("scene_plan covers full script duration with no gaps", scenes[0]["start_seconds"] == 0 and scenes[-1]["end_seconds"] == 60 and all(scenes[i]["end_seconds"] == scenes[i + 1]["start_seconds"] for i in range(len(scenes) - 1)))
check("At least 3 different scene types used", len(set(SCENE_TYPES)) >= 3, str(set(SCENE_TYPES)))
check("No 3+ consecutive scenes of the same type", all(not (SCENE_TYPES[i] == SCENE_TYPES[i + 1] == SCENE_TYPES[i + 2]) for i in range(len(SCENE_TYPES) - 2)))

write_checkpoint(PIPELINE_DIR, PROJECT_ID, "scene_plan", "completed", human_approved=True,
                  artifacts={"scene_plan": scene_plan}, pipeline_type="animated-explainer")

# ===================================================================
# Stage 5: assets (local/zero-cost fixtures -- ffmpeg-synthesized, no
# provider calls, no downloads, no model weights)
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
scene_images = {}
scene_videos = {}
assets = []
for i, (s, scene) in enumerate(zip(SECTIONS, scenes)):
    scene_id = scene["id"]
    assets.append({"id": f"a_tts_{s['id']}", "type": "narration", "path": tts_files[s["id"]], "source_tool": "tts_selector", "scene_id": scene_id, "duration_seconds": s["end"] - s["start"], "generation_summary": "Local ffmpeg sine-tone placeholder for zero-cost dry-run mechanics; not a real narration voice."})
    img_path = str(ASSETS_DIR / f"img_{scene_id}.png")
    subprocess.run(["ffmpeg", "-y", "-f", "lavfi", "-i", f"color=c={image_colors[i]}:s=1280x720:d=1", "-frames:v", "1", img_path], capture_output=True, check=True)
    scene_images[scene_id] = img_path
    assets.append({"id": f"a_img_{scene_id}", "type": "image", "path": img_path, "source_tool": "image_selector", "scene_id": scene_id, "generation_summary": "Local ffmpeg solid-color placeholder plate for zero-cost dry-run mechanics."})
    vid_path = str(ASSETS_DIR / f"scene_{scene_id}.mp4")
    ensure_video(vid_path, duration=s["end"] - s["start"], color=image_colors[i])
    scene_videos[scene_id] = vid_path
    assets.append({"id": f"a_vid_{scene_id}", "type": "video", "path": vid_path, "source_tool": "video_compose", "scene_id": scene_id, "generation_summary": "Local ffmpeg placeholder clip standing in for the composed scene."})

assets.append({"id": "a_music", "type": "music", "path": music_path, "source_tool": "music_gen", "scene_id": "sc1", "generation_summary": "Local ffmpeg sine-tone placeholder music bed."})

# Deterministic subtitle generation from the actual script text/timings via
# the real subtitle_gen tool (no ASR -- word timestamps evenly distributed
# across each section's known start/end window).
from tools.subtitle.subtitle_gen import SubtitleGen
subtitle_segments = [
    {"start": s["start"], "end": s["end"], "text": s["text"], "words": word_timestamps(s["text"], s["start"], s["end"])}
    for s in SECTIONS
]
srt_path = str(ASSETS_DIR / "captions.srt")
sub_result = SubtitleGen().execute({"segments": subtitle_segments, "format": "srt", "output_path": srt_path, "max_words_per_cue": 8})
check("subtitle_gen produced an SRT file from real script timings", sub_result.success and os.path.exists(srt_path), sub_result.error or "")
assets.append({"id": "a_captions", "type": "subtitle", "path": srt_path, "source_tool": "subtitle_gen", "scene_id": "sc1", "generation_summary": "Deterministic SRT from script section text and timing (even word-spacing, no ASR)."})

asset_manifest = {"version": "1.0", "assets": assets, "total_cost_usd": 0.0}

try:
    validate_artifact("asset_manifest", asset_manifest)
    check("asset_manifest validates against schema", True)
except Exception as e:
    check("asset_manifest validates against schema", False, str(e))
check("All asset files exist on disk", all(os.path.exists(a["path"]) for a in assets))
check("Zero-cost: asset_manifest.total_cost_usd is 0.0", asset_manifest["total_cost_usd"] == 0.0)

write_checkpoint(PIPELINE_DIR, PROJECT_ID, "assets", "completed", human_approved=True,
                  artifacts={"asset_manifest": asset_manifest}, pipeline_type="animated-explainer",
                  cost_snapshot=tracker.cost_snapshot())

# ===================================================================
# Stage 6: edit
# ===================================================================
print("\n--- Stage 6: edit ---")

edit_decisions = {
    "version": "1.0",
    "render_runtime": proposal_packet["production_plan"]["render_runtime"],
    "renderer_family": proposal_packet["production_plan"]["renderer_family"],
    # TR-029: cuts below use in_seconds=0/out_seconds=duration per clip --
    # the source_trim convention -- matching the ffmpeg mechanics path this
    # dry run actually exercises (disclosed render_runtime swap, see
    # final_review.checks.promise_preservation below).
    "cut_timing_mode": "source_trim",
    "cuts": [
        {"id": f"cut_{scene['id']}", "source": scene_videos[scene["id"]], "in_seconds": 0, "out_seconds": scene["end_seconds"] - scene["start_seconds"], "speed": 1.0}
        for scene in scenes
    ],
    "audio": {
        "narration": {"segments": [{"asset_id": f"a_tts_{s['id']}", "start_seconds": s["start"], "end_seconds": s["end"]} for s in SECTIONS]},
        "music": {"asset_id": "a_music", "volume": 0.2, "fade_in_seconds": 1.0, "fade_out_seconds": 2.0, "ducking": {"enabled": True, "threshold_db": -30, "reduction_db": 12}},
    },
    "subtitles": {"enabled": True, "style": "sentence", "source": srt_path, "position": "bottom-center", "max_words_per_line": 8},
}

try:
    validate_artifact("edit_decisions", edit_decisions)
    check("edit_decisions validates against schema", True)
except Exception as e:
    check("edit_decisions validates against schema", False, str(e))
check("edit_decisions.render_runtime carries proposal's locked runtime unchanged ('remotion')", edit_decisions["render_runtime"] == "remotion")

write_checkpoint(PIPELINE_DIR, PROJECT_ID, "edit", "completed",
                  artifacts={"edit_decisions": edit_decisions}, pipeline_type="animated-explainer")

# ===================================================================
# Stage 7: compose (real local tools) + deterministic final_review
# ===================================================================
print("\n--- Stage 7: compose (real local tools) ---")

from tools.audio.audio_mixer import AudioMixer
from tools.video.video_compose import VideoCompose

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

composer = VideoCompose()
final_video = str(Path(OUT) / "blog_full_dry_run_output.mp4")
compose_result = composer.execute({
    "operation": "compose",
    "edit_decisions": {"cut_timing_mode": "source_trim", "cuts": [{"source": c["source"], "in_seconds": c["in_seconds"], "out_seconds": c["out_seconds"], "speed": c.get("speed", 1.0)} for c in edit_decisions["cuts"]]},
    "audio_path": mix_output,
    "codec": "libx264", "crf": 23, "preset": "fast",
    "output_path": final_video,
})
check("VideoCompose render succeeded (real local tool)", compose_result.success, compose_result.error or "")
check("Output video file exists", os.path.exists(final_video))

# --- Deterministic technical probe ---
duration = 0.0
video_stream, audio_stream = {}, {}
if os.path.exists(final_video):
    probe = subprocess.run(["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", "-show_streams", final_video], capture_output=True, text=True)
    info = json.loads(probe.stdout)
    duration = float(info.get("format", {}).get("duration", 0))
    for st in info.get("streams", []):
        if st.get("codec_type") == "video" and not video_stream:
            video_stream = st
        elif st.get("codec_type") == "audio" and not audio_stream:
            audio_stream = st
    print(f"  Output: {video_stream.get('width')}x{video_stream.get('height')} {video_stream.get('codec_name')} | {duration:.1f}s | Audio: {audio_stream.get('codec_name')} | Size: {os.path.getsize(final_video)} bytes")

check("Video has audio track", bool(audio_stream))
check("Video has video track", bool(video_stream))
check("Duration within 10% of script's 60s target", duration > 0 and abs(duration - 60) / 60 <= 0.10, f"{duration:.1f}s")

# --- Deterministic visual spotcheck: sample real frames from the real output ---
frame_dir = ASSETS_DIR / "review_frames"
frame_dir.mkdir(exist_ok=True)
frame_fractions = [0.0, 0.33, 0.66, 0.95]
frame_paths = []
for i, frac in enumerate(frame_fractions):
    t = max(0.0, min(duration - 0.1, duration * frac))
    fp = str(frame_dir / f"frame_{i}.png")
    subprocess.run(["ffmpeg", "-y", "-ss", f"{t:.2f}", "-i", final_video, "-frames:v", "1", fp], capture_output=True, check=True)
    if os.path.exists(fp):
        frame_paths.append(fp)
check("Sampled >=4 real frames from the rendered output for visual spotcheck", len(frame_paths) >= 4, str(len(frame_paths)))
black_frames = 0
for fp in frame_paths:
    r = subprocess.run(["ffprobe", "-v", "error", "-f", "lavfi", "-i", f"movie={fp},blackframe=98:32", "-show_entries", "frame=pkt_pts_time", "-of", "csv=p=0"], capture_output=True, text=True)
    if r.stdout.strip():
        black_frames += 1
check("No black frames detected among sampled frames", black_frames == 0, f"{black_frames} of {len(frame_paths)}")

final_review = {
    "version": "1.0",
    "output_path": final_video,
    "status": "revise",
    "checks": {
        "technical_probe": {
            "valid_container": bool(video_stream) and bool(audio_stream),
            "duration_seconds": round(duration, 2),
            "resolution": f"{video_stream.get('width', 0)}x{video_stream.get('height', 0)}",
            "fps": 30,
            "has_audio": bool(audio_stream),
            "codec": video_stream.get("codec_name", ""),
            "file_size_bytes": os.path.getsize(final_video) if os.path.exists(final_video) else 0,
            "issues": [],
        },
        "visual_spotcheck": {
            "frames_sampled": len(frame_paths),
            "frame_paths": frame_paths,
            "black_frames_detected": black_frames > 0,
            "broken_overlays": False,
            "missing_assets": False,
            "unreadable_text": False,
            "issues": ["Frames are solid-color placeholder plates, not real editorial illustration -- expected for a zero-cost mechanics dry run, not a creative review."],
        },
        "audio_spotcheck": {
            "narration_present": mix_result.success,
            "music_present": mix_result.success,
            "unexpected_silence": False,
            "clipping_detected": False,
            "mix_intelligible": mix_result.success,
            "issues": ["Narration is a synthesized sine-tone placeholder, not real speech -- intelligibility is not meaningfully assessable in this dry run."],
        },
        "promise_preservation": {
            "delivery_promise_honored": True,
            "renderer_family_used": proposal_packet["production_plan"]["renderer_family"],
            "render_runtime_used": "ffmpeg",
            "runtime_swap_detected": True,
            "runtime_swap_check": "detected -- proposal locked render_runtime='remotion'; this zero-cost dry run deliberately exercised the ffmpeg mechanics path only (no Remotion composition was authored/rendered). Disclosed, not silent. A real production run must either render via the locked Remotion runtime or record a new render_runtime_selection decision before compose.",
            "silent_downgrade_detected": False,
            "issues": ["render_runtime_used ('ffmpeg') differs from proposal_packet.production_plan.render_runtime ('remotion') -- intentional, disclosed dry-run scope limitation, see runtime_swap_check."],
        },
        "subtitle_check": {
            "subtitles_expected": True,
            "subtitles_present": os.path.exists(srt_path),
            "coverage_ratio": 1.0 if os.path.exists(srt_path) else 0.0,
            "timing_drift_detected": False,
            "issues": ["SRT file generated from real script timings via subtitle_gen, but not burned into the rendered video's pixels in this dry run."],
        },
    },
    "issues_found": [],
    "recommended_action": "revise_edit",
    "metadata": {"dry_run": True, "purpose": "Phase 15 blog-source mechanics validation, not a creative review of production-quality output."},
}
final_review["issues_found"] = [
    issue for check_block in final_review["checks"].values() for issue in check_block.get("issues", [])
]

try:
    validate_artifact("final_review", final_review)
    check("final_review validates against schema", True)
except Exception as e:
    check("final_review validates against schema", False, str(e))

render_report = {
    "version": "1.0",
    "outputs": [{
        "path": final_video, "format": "mp4", "codec": video_stream.get("codec_name", "h264"),
        "audio_codec": audio_stream.get("codec_name", "aac"), "resolution": f"{video_stream.get('width', 1280)}x{video_stream.get('height', 720)}",
        "fps": 30, "duration_seconds": round(duration, 2), "file_size_bytes": os.path.getsize(final_video) if os.path.exists(final_video) else 0,
        "platform_target": concept_options[0]["target_platform"],
    }],
    "render_time_seconds": compose_result.duration_seconds,
    "render_grammar": proposal_packet["production_plan"]["renderer_family"],
    "final_review_ref": "inline (see checkpoint artifacts.final_review for this stage)",
    "warnings": ["render_runtime_used=ffmpeg, not the locked remotion -- see final_review.checks.promise_preservation"],
}

try:
    validate_artifact("render_report", render_report)
    check("render_report validates against schema", True)
except Exception as e:
    check("render_report validates against schema", False, str(e))

write_checkpoint(PIPELINE_DIR, PROJECT_ID, "compose", "completed",
                  artifacts={"render_report": render_report, "final_review": final_review},
                  pipeline_type="animated-explainer", cost_snapshot=tracker.cost_snapshot())

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
print(f"BLOG SOURCE PRODUCTION DRY RUN COMPLETE: {PASS} passed, {FAIL} failed")
print("=" * 60)
print(f"\nOutput: {final_video}")
print("Stopped before publish. No paid calls, model downloads, external writes, or real production material.")
print("final_review.status='revise': placeholder assets + disclosed ffmpeg/remotion runtime swap -- not production-ready, see report.")

sys.exit(1 if FAIL else 0)
