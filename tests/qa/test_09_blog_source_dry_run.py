#!/usr/bin/env python3
"""QA Test 09: Blog-source-authoritative dry run (Phase 15 / ADR-024).

Runs the representative fixture at tests/fixtures/blog/authoritative-source.md
through extraction -> source-authoritative research -> proposal, using the
real checkpoint/schema machinery (no synthetic shortcuts beyond the creative
content itself, which is authored by hand from the fixture text exactly as
extraction-director.md and research-director.md require).

Verifies the ADR-024 binding-authority contract mechanically:
  - The five protected narrative fields from source_extraction.episode are
    carried forward byte-for-byte into research_brief and proposal_packet.
  - The three proposal concepts vary presentation (title/hook/narrative
    structure/visual approach/tone) while sharing one identical thesis
    (core_message), i.e. they differ in HOW, not WHAT.
  - get_next_stage() resumes correctly to "script" after extraction, research,
    and proposal checkpoint, confirming the conditional-stage fix in
    lib/checkpoint.py / lib/pipeline_loader.py holds for the real blog path.

No API keys needed. No paid calls. Stops before script/scene_plan/assets.
"""

import sys
import os
import json
import shutil
from pathlib import Path
from datetime import date

PROJECT_ROOT = str(Path(__file__).resolve().parent.parent.parent)
sys.path.insert(0, PROJECT_ROOT)

from lib.env_loader import load_env
load_env()

from lib.checkpoint import (
    write_checkpoint,
    get_completed_stages,
    get_next_stage,
)
from tools.cost_tracker import CostTracker, BudgetMode
from schemas.artifacts import validate_artifact

OUT = os.path.join(os.path.dirname(__file__), "output")
PIPELINE_DIR = Path(OUT) / "blog_dry_run_pipeline"
PROJECT_ID = "qa_blog_dry_run"
FIXTURE_PATH = Path(PROJECT_ROOT) / "tests" / "fixtures" / "blog" / "authoritative-source.md"

if PIPELINE_DIR.exists():
    shutil.rmtree(PIPELINE_DIR)

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


print("--- Setup ---")
cost_log = PIPELINE_DIR / PROJECT_ID / "cost_log.json"
tracker = CostTracker(budget_total_usd=5.0, mode=BudgetMode.OBSERVE, cost_log_path=cost_log)
print(f"  Budget: ${tracker.budget_total_usd}")

fixture_text = FIXTURE_PATH.read_text()
check("Fixture exists and is readable", bool(fixture_text.strip()))
print(f"  Fixture: {FIXTURE_PATH.relative_to(PROJECT_ROOT)} ({len(fixture_text)} chars)")

# ===================================================================
# Stage 0: extraction -> source_extraction
#
# Content below is a genuine reading of the fixture (not a synthetic
# placeholder): the fixture argues that activity-based signals (clicks,
# views, transactions) no longer prove human presence once synthetic
# systems can produce the same signals at scale, and that AEPOCH's
# reframe is to make human presence itself legible, not to ban automation.
# ===================================================================
print("\n--- Stage 0: extraction ---")

PROTECTED = {
    "central_question": "If activity no longer proves a person is there, what does?",
    "key_takeaway": "Presence has to be established directly, not inferred from activity.",
    "aepoch_reframe": "AEPOCH reframes the problem around proofs of human presence, letting human participation stay legible beside automation rather than banning it.",
    "human_consequence": "A person's participation can be recognized on its own terms instead of being drowned out or copied by synthetic activity at scale.",
    "closing_statement": "The next internet must recognize presence, not just activity.",
}

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
        "research_permissions": [
            "verify_claims",
            "add_provenance",
            "add_context",
            "identify_audience_questions",
            "enrich_visual_examples",
        ],
        "change_policy": "Stop for author approval before changing a protected field.",
    },
    "episode": {
        "working_title": "What Proves You're Real Online?",
        "audience": "curious general audience, digitally literate but non-technical",
        "desired_duration_seconds": 60,
        "existing_reality": "Online systems treat activity -- clicks, comments, views, transactions -- as a proxy for people being present.",
        "tension": "Synthetic systems can now produce the same activity signals at enormous scale, so more activity no longer means more people.",
        **PROTECTED,
    },
    "claim_inventory": [
        {
            "id": "claim-1",
            "claim": "Online systems usually treat activity as evidence that people are present.",
            "source_location": "paragraph 1",
            "verification_required": False,
        },
        {
            "id": "claim-2",
            "claim": "Synthetic systems can produce activity signals (clicks, comments, views, transactions) at enormous scale.",
            "source_location": "paragraph 2",
            "verification_required": True,
            "notes": "Directional claim in the source; research may add provenance/examples but not soften or remove it.",
        },
    ],
    "excluded_material": [
        {
            "item": "Any specific proof-of-presence mechanism or protocol detail",
            "reason": "The source stays at the level of the reframe; mechanism detail belongs in a technical follow-up episode.",
        },
    ],
    "ambiguities": [
        "The source does not say whether 'the next internet' is a literal protocol claim or a design principle -- treated as a design principle here.",
    ],
}

try:
    validate_artifact("source_extraction", source_extraction)
    check("source_extraction validates against schema", True)
except Exception as e:
    check("source_extraction validates against schema", False, str(e))

check(
    "All five protected fields present in episode",
    all(source_extraction["episode"].get(f) for f in PROTECTED),
)

write_checkpoint(
    PIPELINE_DIR, PROJECT_ID, "extraction", "completed", human_approved=True,
    artifacts={"source_extraction": source_extraction},
    pipeline_type="animated-explainer",
)
check("Extraction checkpoint written", (PIPELINE_DIR / PROJECT_ID).exists())

# ===================================================================
# Stage 1: research -> research_brief (source-authoritative mode)
#
# Three angles below are presentation variants of the SAME thesis: they
# reuse the extraction's reframe/takeaway rather than proposing a
# different angle. type/hook/why_now differ; the underlying claim doesn't.
# ===================================================================
print("\n--- Stage 1: research (source-authoritative) ---")

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
        "saturated_angles": ["bots are taking over, be afraid", "AI detection arms race"],
        "underserved_gaps": ["Why activity was ever treated as a proxy for presence", "What 'presence' could mean as a first-class signal instead of activity"],
    },
    "data_points": [
        {"claim": "Automated traffic is a widely reported and growing share of overall web activity.", "source_url": "https://example.com/bot-traffic-report", "source_name": "Illustrative bot-traffic report (dry-run placeholder)", "credibility": "secondary_source", "surprise_factor": "notable", "usable_as": "hook"},
        {"claim": "Engagement metrics (clicks, views, comments) were adopted as presence proxies because they were cheap to measure, not because they were reliable proof.", "source_url": "https://example.com/metrics-history", "source_name": "Illustrative platform-metrics history (dry-run placeholder)", "credibility": "secondary_source", "surprise_factor": "surprising", "usable_as": "script_anchor"},
        {"claim": "Proof-of-personhood and proof-of-presence approaches are an active, named area of protocol design distinct from bot *detection*.", "source_url": "https://example.com/proof-of-presence-landscape", "source_name": "Illustrative proof-of-presence landscape note (dry-run placeholder)", "credibility": "secondary_source", "surprise_factor": "expected", "usable_as": "closing_punch"},
    ],
    "audience_insights": {
        "common_questions": [
            "Isn't this just spam/bot detection with a new name?",
            "How would a system actually tell a human from a synthetic actor without being invasive?",
            "Does this mean automation itself is being banned or blocked?",
        ],
        "misconceptions": [
            {"myth": "Proof of presence means banning bots and automation.", "reality": "The source frames it as making human participation legible beside automation, not banning automation."},
        ],
        "knowledge_level": "Understands bots/spam exist; unfamiliar with proof-of-presence as a distinct design reframe from detection.",
        "pain_points": ["General fatigue with 'AI is ruining the internet' framing that offers no constructive alternative"],
    },
    "angles_discovered": [
        {
            "name": "The Proxy That Broke",
            "hook": "Every click on the internet used to mean a person. Not anymore.",
            "type": "narrative",
            "why_now": "Opens on the existing_reality (activity as proxy) and turns on the same tension/reframe as the source -- a history-of-a-broken-assumption framing.",
            "grounded_in": ["claim-1", "claim-2"],
        },
        {
            "name": "Presence Is Not a Byproduct",
            "hook": "What if 'being online' had to mean something again?",
            "type": "data_driven",
            "why_now": "Leads with the automated-traffic data point, then lands on the identical reframe (proofs of human presence, not an automation ban) rather than a metrics-only conclusion.",
            "grounded_in": ["claim-1"],
        },
        {
            "name": "Not a Ban. A Signal.",
            "hook": "This isn't about blocking bots. It's about a signal bots can't fake.",
            "type": "contrarian",
            "why_now": "Directly answers the common misconception (this is anti-automation) while preserving the exact same aepoch_reframe and human_consequence as the source.",
            "grounded_in": ["claim-2"],
        },
    ],
    "sources": [
        {"url": "https://example.com/bot-traffic-report", "title": "Illustrative bot-traffic report", "used_for": "data_points", "reliability": "secondary"},
        {"url": "https://example.com/metrics-history", "title": "Illustrative platform-metrics history", "used_for": "data_points", "reliability": "secondary"},
        {"url": "https://example.com/proof-of-presence-landscape", "title": "Illustrative proof-of-presence landscape note", "used_for": "data_points", "reliability": "secondary"},
        {"url": "https://example.com/audience-forum-scan", "title": "Illustrative forum/FAQ scan (dry-run placeholder)", "used_for": "audience_insights", "reliability": "anecdotal"},
        {"url": str(FIXTURE_PATH.relative_to(PROJECT_ROOT)), "title": "Presence, Not Activity (source article)", "used_for": "landscape, angles, protected fields", "reliability": "primary"},
    ],
    "research_summary": "The source article's reframe -- presence as a direct signal rather than an activity proxy -- is not yet a mainstream framing; existing content either does protocol-level proof-of-personhood deep dives or generic bot-traffic alarm, leaving the 'why the old proxy broke, and what a legible-presence-not-a-ban reframe looks like' angle open. All three angles below preserve that reframe and vary only presentation.",
    "metadata": {
        "mode": "source_authoritative",
        "source_extraction_reference": str(FIXTURE_PATH.relative_to(PROJECT_ROOT)),
        "protected_fields_carried_forward": PROTECTED,
    },
}

try:
    validate_artifact("research_brief", research_brief)
    check("research_brief validates against schema", True)
except Exception as e:
    check("research_brief validates against schema", False, str(e))

check(
    "research_brief carries protected fields unchanged from extraction",
    research_brief["metadata"]["protected_fields_carried_forward"] == PROTECTED,
)
check(
    "All three angles are grounded_in extraction claims (no invented competing thesis)",
    all(a.get("grounded_in") for a in research_brief["angles_discovered"]),
)
check(
    "Angle types genuinely differ (presentation variety, not just relabeling)",
    len({a["type"] for a in research_brief["angles_discovered"]}) == len(research_brief["angles_discovered"]),
)

write_checkpoint(
    PIPELINE_DIR, PROJECT_ID, "research", "completed",
    artifacts={"research_brief": research_brief},
    pipeline_type="animated-explainer",
    style_playbook="clean-professional",
)
check(
    "Completed stages after research",
    get_completed_stages(PIPELINE_DIR, PROJECT_ID, "animated-explainer") == ["extraction", "research"],
)

# ===================================================================
# Stage 2: proposal -> proposal_packet + decision_log
#
# Three concepts share one identical core_message (the thesis) and vary
# narrative_structure / visual_approach / tone / target_platform
# (the presentation). This is the mechanical test of "concepts vary
# presentation, not thesis."
# ===================================================================
print("\n--- Stage 2: proposal (source-authoritative) ---")

SHARED_CORE_MESSAGE = PROTECTED["key_takeaway"]
SHARED_KEY_POINTS = [
    PROTECTED["central_question"],
    PROTECTED["aepoch_reframe"],
    PROTECTED["human_consequence"],
]

concept_options = [
    {
        "id": "c1",
        "title": "The Proxy That Broke",
        "hook": "Every click on the internet used to mean a person. Not anymore.",
        "narrative_structure": "journey",
        "visual_approach": "Cold open on a flood of generic activity icons (clicks/views/likes) that quietly resolve into a single distinct human mark -- history-of-an-assumption pacing.",
        "suggested_playbook": "clean-professional",
        "target_audience": "curious general audience, digitally literate but non-technical",
        "target_platform": "youtube",
        "target_duration_seconds": 60,
        "key_points": SHARED_KEY_POINTS,
        "core_message": SHARED_CORE_MESSAGE,
        "cta": "Look at what AEPOCH is building around proof of presence.",
        "tone": "measured, explanatory",
        "grounded_in": ["angle: The Proxy That Broke", "claim-1", "claim-2"],
        "why_this_works": "Matches the 'narrative' angle from research_brief; the journey structure lets the existing_reality/tension play out before the reframe lands, without altering the reframe itself.",
    },
    {
        "id": "c2",
        "title": "Presence Is Not a Byproduct",
        "hook": "What if 'being online' had to mean something again?",
        "narrative_structure": "data_narrative",
        "visual_approach": "Stat-card open on automated-traffic share, then a single animated metric relabeled from 'activity' to 'presence' -- data-led pacing.",
        "suggested_playbook": "clean-professional",
        "target_audience": "curious general audience, digitally literate but non-technical",
        "target_platform": "linkedin",
        "target_duration_seconds": 60,
        "key_points": SHARED_KEY_POINTS,
        "core_message": SHARED_CORE_MESSAGE,
        "cta": "Look at what AEPOCH is building around proof of presence.",
        "tone": "crisp, data-forward",
        "grounded_in": ["angle: Presence Is Not a Byproduct", "claim-1"],
        "why_this_works": "Matches the 'data_driven' angle from research_brief; leads with the bot-traffic data point but lands on the identical reframe and human_consequence, not a metrics-only conclusion.",
    },
    {
        "id": "c3",
        "title": "Not a Ban. A Signal.",
        "hook": "This isn't about blocking bots. It's about a signal bots can't fake.",
        "narrative_structure": "myth_busting",
        "visual_approach": "Myth/reality split-screen (ban vs. reframe), resolving into the same human-presence mark used in c1 for visual continuity across concepts.",
        "suggested_playbook": "flat-motion-graphics",
        "target_audience": "curious general audience, digitally literate but non-technical",
        "target_platform": "tiktok",
        "target_duration_seconds": 45,
        "key_points": SHARED_KEY_POINTS,
        "core_message": SHARED_CORE_MESSAGE,
        "cta": "Look at what AEPOCH is building around proof of presence.",
        "tone": "direct, myth-busting",
        "grounded_in": ["angle: Not a Ban. A Signal.", "claim-2"],
        "why_this_works": "Matches the 'contrarian' angle from research_brief; directly answers the audience misconception without touching central_question, key_takeaway, aepoch_reframe, human_consequence, or closing_statement.",
    },
]

proposal_packet = {
    "version": "1.0",
    "concept_options": concept_options,
    "selected_concept": {
        "concept_id": "c1",
        "rationale": "Journey structure gives the reframe the most room to land cleanly for a general audience on a first episode; c2/c3 are strong alternates for LinkedIn/TikTok cuts of the same thesis.",
    },
    "production_plan": {
        "pipeline": "animated-explainer",
        "playbook": "clean-professional",
        "render_runtime": "remotion",
        "stages": [
            {"stage": "script", "tools": [{"tool_name": "tts_selector", "role": "narration", "available": True}], "approach": "Script written from source_extraction + selected concept, per brands/aepoch/SCRIPT_RULES.md"},
            {"stage": "scene_plan", "tools": [], "approach": "Five-stage arc (hook/setup/build/climax/landing) mapped 1:1 to extraction fields"},
            {"stage": "assets", "tools": [{"tool_name": "image_selector", "role": "visuals", "available": True}], "approach": "Editorial illustration plates, ÆPOCH visual language"},
            {"stage": "edit", "tools": [], "approach": "Automated edit decisions from scene_plan"},
            {"stage": "compose", "tools": [{"tool_name": "video_compose", "role": "render", "available": True}], "approach": "Remotion render"},
        ],
        "delivery_promise": {
            "promise_type": "source_led",
            "motion_required": False,
            "source_required": False,
            "tone_mode": "educational",
            "quality_floor": "presentable",
            "approved_fallback": None,
        },
        "renderer_family": "explainer-data",
    },
    "cost_estimate": {
        "total_estimated_usd": 0.0,
        "line_items": [
            {"tool": "n/a", "operation": "Phase 15 zero-cost dry run -- no generation calls made", "estimated_usd": 0.0, "notes": "Real cost estimate deferred to real-production proposal after author approval"},
        ],
        "budget_verdict": "within_budget",
    },
    "approval": {
        "status": "approved",
        "user_notes": "Phase 15 dry-run approval (simulated) -- validates contract mechanics only, not a real-production go-ahead.",
        "approved_budget_usd": 0.0,
    },
    "metadata": {
        "mode": "source_authoritative",
        "source_extraction_reference": str(FIXTURE_PATH.relative_to(PROJECT_ROOT)),
        "protected_fields_carried_forward": PROTECTED,
        "dry_run": True,
    },
}

try:
    validate_artifact("proposal_packet", proposal_packet)
    check("proposal_packet validates against schema", True)
except Exception as e:
    check("proposal_packet validates against schema", False, str(e))

decision_log = {
    "version": "1.0",
    "project_id": PROJECT_ID,
    "decisions": [
        {
            "decision_id": "d-001",
            "stage": "proposal",
            "category": "concept_selection",
            "subject": "Which presentation of the source-authoritative thesis to lead with",
            "options_considered": [
                {"option_id": "c1", "label": "The Proxy That Broke (journey)", "score": 0.9, "reason": "Best fit for a general first-episode audience"},
                {"option_id": "c2", "label": "Presence Is Not a Byproduct (data_narrative)", "score": 0.75, "reason": "Strong LinkedIn/technical-adjacent alternate"},
                {"option_id": "c3", "label": "Not a Ban. A Signal. (myth_busting)", "score": 0.7, "reason": "Strong short-form/TikTok alternate", "rejected_because": "Shorter duration target trims room for the reframe on a first episode"},
            ],
            "selected": "c1",
            "reason": "Journey structure gives the protected reframe the clearest runway without altering it.",
            "user_visible": True,
            "user_approved": True,
            "confidence": 0.8,
        },
    ],
}

try:
    validate_artifact("decision_log", decision_log)
    check("decision_log validates against schema", True)
except Exception as e:
    check("decision_log validates against schema", False, str(e))

# --- The core ADR-024 mechanical check: presentation varies, thesis does not ---
core_messages = {c["core_message"] for c in concept_options}
check(
    "All three concepts share one identical thesis (core_message)",
    core_messages == {SHARED_CORE_MESSAGE},
    detail=str(core_messages),
)
check(
    "Shared thesis matches extraction.episode.key_takeaway exactly",
    SHARED_CORE_MESSAGE == source_extraction["episode"]["key_takeaway"],
)
presentation_fields = ["title", "hook", "narrative_structure", "visual_approach", "target_platform", "tone"]
for field in presentation_fields:
    values = [c[field] for c in concept_options]
    check(f"Concepts vary presentation field '{field}'", len(set(values)) == len(values), detail=str(values))

check(
    "proposal_packet carries protected fields unchanged from extraction",
    proposal_packet["metadata"]["protected_fields_carried_forward"] == PROTECTED,
)
check(
    "key_points on every concept preserve the protected central_question/reframe/consequence",
    all(set(c["key_points"]) == set(SHARED_KEY_POINTS) for c in concept_options),
)

write_checkpoint(
    PIPELINE_DIR, PROJECT_ID, "proposal", "completed", human_approved=True,
    artifacts={"proposal_packet": proposal_packet, "decision_log": decision_log},
    pipeline_type="animated-explainer",
    style_playbook="clean-professional",
)

# ===================================================================
# Final validation: checkpoint/resume mechanics for the real blog path
# ===================================================================
print("\n--- Final validation ---")

completed = get_completed_stages(PIPELINE_DIR, PROJECT_ID, "animated-explainer")
check(
    "All three pre-production stages completed in order",
    completed == ["extraction", "research", "proposal"],
    detail=str(completed),
)
next_stage = get_next_stage(PIPELINE_DIR, PROJECT_ID, "animated-explainer")
check(
    "Next stage after proposal is 'script' (not stuck re-requesting 'extraction')",
    next_stage == "script",
    detail=str(next_stage),
)

cost_snapshot = tracker.cost_snapshot()
check(
    "Zero-cost dry run: no spend recorded",
    cost_snapshot.get("total_spent_usd", None) == 0.0,
    detail=str(cost_snapshot),
)

print(f"\n  Final cost: {cost_snapshot}")
print("\n" + "=" * 60)
print(f"BLOG SOURCE DRY RUN COMPLETE: {PASS} passed, {FAIL} failed")
print("=" * 60)
print("\nStopped before script/scene_plan/assets stages per Phase 15 scope.")
print("No paid calls, no provider generation, no public production.")

sys.exit(1 if FAIL else 0)
