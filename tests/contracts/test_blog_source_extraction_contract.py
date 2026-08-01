"""Contracts for the authoritative blog-source entry path."""

from pathlib import Path

from lib.checkpoint import CANONICAL_STAGE_ARTIFACTS
from lib.pipeline_loader import get_stage_order, load_pipeline
from schemas.artifacts import ARTIFACT_NAMES, validate_artifact


ROOT = Path(__file__).resolve().parents[2]


def sample_source_extraction() -> dict:
    return {
        "version": "1.0",
        "source": {
            "title": "Why presence matters",
            "reference": "fixtures/blog/why-presence-matters.md",
            "publication_date": "2026-07-31",
            "author": "ÆPOCH",
        },
        "authority": {
            "mode": "source_authoritative",
            "protected_fields": [
                "central_question",
                "key_takeaway",
                "aepoch_reframe",
                "human_consequence",
                "closing_statement",
            ],
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
            "working_title": "How does the internet know you are real?",
            "central_question": "How can a digital system distinguish a person from synthetic activity?",
            "audience": "curious general audience",
            "desired_duration_seconds": 60,
            "key_takeaway": "Presence must be established through human participation, not inferred from traffic.",
            "existing_reality": "Online systems count activity as a proxy for people.",
            "tension": "Synthetic activity can imitate that signal at scale.",
            "aepoch_reframe": "ÆPOCH coordinates proofs of human presence.",
            "human_consequence": "A person's participation can carry meaning without competing with bots.",
            "closing_statement": "The next internet must recognize presence, not just activity.",
        },
        "claim_inventory": [
            {
                "id": "claim-1",
                "claim": "Synthetic activity can imitate engagement signals.",
                "source_location": "section 2, paragraph 1",
                "verification_required": True,
            }
        ],
        "excluded_material": [
            {"item": "Protocol implementation detail", "reason": "Belongs in a technical follow-up."}
        ],
    }


def test_source_extraction_is_registered_and_valid():
    assert "source_extraction" in ARTIFACT_NAMES
    validate_artifact("source_extraction", sample_source_extraction())


def test_extraction_is_first_animated_explainer_stage():
    manifest = load_pipeline("animated-explainer")
    assert get_stage_order(manifest)[:4] == [
        "extraction",
        "research",
        "proposal",
        "script",
    ]
    extraction = manifest["stages"][0]
    assert extraction["condition"] == "source_article_exists"
    assert extraction["produces"] == ["source_extraction"]
    assert extraction["human_approval_default"] is True


def test_extraction_has_canonical_checkpoint_artifact():
    assert CANONICAL_STAGE_ARTIFACTS["extraction"] == "source_extraction"


def test_directors_encode_source_authority():
    for relative in (
        "skills/pipelines/explainer/extraction-director.md",
        "skills/pipelines/explainer/research-director.md",
        "skills/pipelines/explainer/proposal-director.md",
        "skills/pipelines/explainer/script-director.md",
    ):
        text = (ROOT / relative).read_text().lower()
        assert "source" in text
        assert "authorit" in text


def test_blog_adapter_points_to_live_route_and_schema():
    text = (ROOT / "brands/aepoch/SCRIPT_RULES.md").read_text()
    assert "source_extraction" in text
    assert "blog source → source_extraction → research → proposal → script" in text
    assert "schemas/artifacts/source_extraction.schema.json" in text


def test_representative_blog_fixture_exists_and_supports_extraction():
    fixture = ROOT / "tests/fixtures/blog/authoritative-source.md"
    text = fixture.read_text()
    assert "activity" in text.lower()
    assert "human presence" in text.lower()
    extraction = sample_source_extraction()
    extraction["source"]["reference"] = str(fixture.relative_to(ROOT))
    validate_artifact("source_extraction", extraction)
