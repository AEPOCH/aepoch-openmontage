"""Contracts for TR-030 (asset staging) and TR-029 (cut_timing_mode).

Fast, subprocess-free coverage of VideoCompose._stage_local_assets_for_remotion
and the cut_timing_mode validation in _compose/_remotion_render. Real,
slow end-to-end coverage of both render runtimes lives in
tests/qa/test_10_blog_source_production_dry_run.py (FFmpeg, source_trim)
and tests/qa/test_11_blog_source_remotion_render.py (Remotion, timeline) --
this file does not duplicate those real `npx remotion render` runs.
"""

import os
import subprocess
from pathlib import Path

import pytest

from tools.video.video_compose import RemotionAssetStagingError, VideoCompose


@pytest.fixture
def public_root(tmp_path) -> Path:
    root = tmp_path / "public"
    root.mkdir()
    return root


@pytest.fixture
def composer() -> VideoCompose:
    return VideoCompose()


def make_asset(tmp_path: Path, subdir: str, name: str, content: bytes = b"fake-bytes") -> Path:
    d = tmp_path / subdir
    d.mkdir(parents=True, exist_ok=True)
    p = d / name
    p.write_bytes(content)
    return p


# ---------------------------------------------------------------------------
# Staging: images, audio, video
# ---------------------------------------------------------------------------

def test_stages_local_video_cut_source(composer, public_root, tmp_path):
    video = make_asset(tmp_path, "assets", "scene1.mp4", b"video-bytes")
    props = {"cuts": [{"id": "c1", "source": str(video), "in_seconds": 0, "out_seconds": 5}]}

    rewritten, staging_dir, provenance = composer._stage_local_assets_for_remotion(props, public_root)

    assert staging_dir is not None and staging_dir.exists()
    staged_rel = rewritten["cuts"][0]["source"]
    assert staged_rel.startswith("_render_staging/")
    staged_abs = public_root / staged_rel
    assert staged_abs.exists()
    assert staged_abs.read_bytes() == b"video-bytes"
    assert len(provenance) == 1
    assert provenance[0]["original_path"] == str(video)
    assert provenance[0]["staged_path"] == staged_rel
    # Original file untouched, and the caller's props dict is not mutated
    # in place -- only the returned copy is rewritten.
    assert video.exists() and video.read_bytes() == b"video-bytes"
    assert props["cuts"][0]["source"] == str(video)


def test_stages_local_image_background(composer, public_root, tmp_path):
    image = make_asset(tmp_path, "assets", "plate.png", b"image-bytes")
    props = {"cuts": [{"id": "c1", "source": "https://example.com/clip.mp4", "backgroundImage": str(image), "in_seconds": 0, "out_seconds": 5}]}

    rewritten, staging_dir, provenance = composer._stage_local_assets_for_remotion(props, public_root)

    assert staging_dir is not None
    staged_rel = rewritten["cuts"][0]["backgroundImage"]
    assert (public_root / staged_rel).read_bytes() == b"image-bytes"
    # http(s) source left untouched.
    assert rewritten["cuts"][0]["source"] == "https://example.com/clip.mp4"
    assert len(provenance) == 1


def test_stages_local_narration_and_music_audio(composer, public_root, tmp_path):
    narration = make_asset(tmp_path, "assets", "narration.wav", b"narration-bytes")
    music = make_asset(tmp_path, "assets", "music.wav", b"music-bytes")
    props = {
        "cuts": [],
        "audio": {
            "narration": {"src": str(narration), "volume": 1.0},
            "music": {"src": str(music), "volume": 0.2},
        },
    }

    rewritten, staging_dir, provenance = composer._stage_local_assets_for_remotion(props, public_root)

    assert staging_dir is not None
    narration_rel = rewritten["audio"]["narration"]["src"]
    music_rel = rewritten["audio"]["music"]["src"]
    assert (public_root / narration_rel).read_bytes() == b"narration-bytes"
    assert (public_root / music_rel).read_bytes() == b"music-bytes"
    assert narration_rel != music_rel
    assert len(provenance) == 2


def test_stages_anime_scene_images_list(composer, public_root, tmp_path):
    img1 = make_asset(tmp_path, "assets", "frame1.png", b"frame-1")
    img2 = make_asset(tmp_path, "assets", "frame2.png", b"frame-2")
    props = {"cuts": [{"id": "c1", "type": "anime_scene", "images": [str(img1), str(img2)], "in_seconds": 0, "out_seconds": 5}]}

    rewritten, staging_dir, provenance = composer._stage_local_assets_for_remotion(props, public_root)

    assert staging_dir is not None
    rel1, rel2 = rewritten["cuts"][0]["images"]
    assert (public_root / rel1).read_bytes() == b"frame-1"
    assert (public_root / rel2).read_bytes() == b"frame-2"
    assert rel1 != rel2


# ---------------------------------------------------------------------------
# No-op cases: already-remote or already-relative references
# ---------------------------------------------------------------------------

def test_http_and_relative_sources_are_left_untouched_and_no_dir_created(composer, public_root):
    props = {
        "cuts": [
            {"id": "c1", "source": "https://example.com/a.mp4", "in_seconds": 0, "out_seconds": 5},
            {"id": "c2", "source": "demo-props/existing.png", "in_seconds": 5, "out_seconds": 10},
        ],
    }

    rewritten, staging_dir, provenance = composer._stage_local_assets_for_remotion(props, public_root)

    assert staging_dir is None
    assert provenance == []
    assert rewritten["cuts"][0]["source"] == "https://example.com/a.mp4"
    assert rewritten["cuts"][1]["source"] == "demo-props/existing.png"
    assert not (public_root / "_render_staging").exists()


# ---------------------------------------------------------------------------
# Repeated filenames: collision safety
# ---------------------------------------------------------------------------

def test_repeated_filenames_from_different_directories_do_not_collide(composer, public_root, tmp_path):
    clip_a = make_asset(tmp_path, "scene_a", "clip.mp4", b"content-A")
    clip_b = make_asset(tmp_path, "scene_b", "clip.mp4", b"content-B")
    assert clip_a.name == clip_b.name == "clip.mp4"
    props = {
        "cuts": [
            {"id": "c1", "source": str(clip_a), "in_seconds": 0, "out_seconds": 5},
            {"id": "c2", "source": str(clip_b), "in_seconds": 5, "out_seconds": 10},
        ],
    }

    rewritten, staging_dir, provenance = composer._stage_local_assets_for_remotion(props, public_root)

    rel_a = rewritten["cuts"][0]["source"]
    rel_b = rewritten["cuts"][1]["source"]
    assert rel_a != rel_b, "repeated basenames from different source dirs must not collide"
    assert (public_root / rel_a).read_bytes() == b"content-A"
    assert (public_root / rel_b).read_bytes() == b"content-B"
    # Both original files still distinct and untouched.
    assert clip_a.read_bytes() == b"content-A"
    assert clip_b.read_bytes() == b"content-B"


# ---------------------------------------------------------------------------
# Missing / unreadable inputs: reject clearly, stage nothing
# ---------------------------------------------------------------------------

def test_missing_asset_rejected_clearly_and_nothing_staged(composer, public_root, tmp_path):
    missing = tmp_path / "assets" / "does-not-exist.mp4"
    props = {"cuts": [{"id": "c1", "source": str(missing), "in_seconds": 0, "out_seconds": 5}]}

    with pytest.raises(RemotionAssetStagingError) as excinfo:
        composer._stage_local_assets_for_remotion(props, public_root)

    assert str(missing) in str(excinfo.value)
    assert "missing" in str(excinfo.value).lower()
    assert not (public_root / "_render_staging").exists()


def test_directory_given_as_asset_path_rejected_clearly(composer, public_root, tmp_path):
    a_dir = tmp_path / "assets" / "not_a_file"
    a_dir.mkdir(parents=True)
    props = {"cuts": [{"id": "c1", "source": str(a_dir), "in_seconds": 0, "out_seconds": 5}]}

    with pytest.raises(RemotionAssetStagingError) as excinfo:
        composer._stage_local_assets_for_remotion(props, public_root)

    assert "not a regular file" in str(excinfo.value).lower()
    assert not (public_root / "_render_staging").exists()


@pytest.mark.skipif(os.name != "posix" or os.geteuid() == 0, reason="permission bits meaningless as root / non-POSIX")
def test_unreadable_asset_rejected_clearly(composer, public_root, tmp_path):
    unreadable = make_asset(tmp_path, "assets", "locked.mp4", b"secret")
    unreadable.chmod(0o000)
    props = {"cuts": [{"id": "c1", "source": str(unreadable), "in_seconds": 0, "out_seconds": 5}]}
    try:
        with pytest.raises(RemotionAssetStagingError) as excinfo:
            composer._stage_local_assets_for_remotion(props, public_root)
        assert "unreadable" in str(excinfo.value).lower()
        assert not (public_root / "_render_staging").exists()
    finally:
        unreadable.chmod(0o644)


def test_multiple_missing_assets_all_reported_not_just_first(composer, public_root, tmp_path):
    missing1 = tmp_path / "a.mp4"
    missing2 = tmp_path / "b.mp4"
    props = {
        "cuts": [
            {"id": "c1", "source": str(missing1), "in_seconds": 0, "out_seconds": 5},
            {"id": "c2", "source": str(missing2), "in_seconds": 5, "out_seconds": 10},
        ],
    }

    with pytest.raises(RemotionAssetStagingError) as excinfo:
        composer._stage_local_assets_for_remotion(props, public_root)

    message = str(excinfo.value)
    assert str(missing1) in message
    assert str(missing2) in message


# ---------------------------------------------------------------------------
# Cleanup: after render success and after render failure, never touching
# pre-existing public/ content
#
# _remotion_render()'s composer_dir is hardcoded relative to this module's
# own file location (Path(__file__).resolve().parent.parent.parent /
# "remotion-composer"), so these two tests drive the real method against
# the real repo's remotion-composer/public/ directory, mocking only the
# subprocess call (no real npx/Chrome). That is exactly the boundary this
# fix owns: staging happens on real disk, only the render itself is faked.
# ---------------------------------------------------------------------------

def _staging_root() -> Path:
    import tools.video.video_compose as vc_module
    repo_root = Path(vc_module.__file__).resolve().parents[2]
    return repo_root / "remotion-composer" / "public" / "_render_staging"


def test_remotion_render_cleans_up_staging_dir_after_successful_render(tmp_path, monkeypatch):
    import tools.video.video_compose as vc_module

    staging_root = _staging_root()
    assert not staging_root.exists() or not list(staging_root.glob("*")), (
        "test precondition: no leftover staging dirs from a prior run"
    )

    video = tmp_path / "clip.mp4"
    video.write_bytes(b"video-bytes")
    output_path = tmp_path / "out" / "final.mp4"

    composer = VideoCompose()
    observed_mid_render: list[Path] = []

    def fake_run_command(cmd, *, timeout=None, cwd=None):
        # Confirm staging happened BEFORE the "render" -- exactly one
        # uuid-named staging directory should exist right now.
        dirs = list(staging_root.glob("*"))
        assert len(dirs) == 1
        observed_mid_render.append(dirs[0])
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_bytes(b"rendered-video")
        return subprocess.CompletedProcess(cmd, 0, stdout="", stderr="")

    monkeypatch.setattr(composer, "run_command", fake_run_command)
    monkeypatch.setattr(vc_module.shutil, "which", lambda name: "/usr/bin/npx")

    result = composer._remotion_render({
        "edit_decisions": {
            "cut_timing_mode": "timeline",
            "renderer_family": "explainer-data",
            "cuts": [{"id": "c1", "source": str(video), "in_seconds": 0, "out_seconds": 5}],
        },
        "output_path": str(output_path),
    })

    assert result.success is True
    assert result.data["staged_assets"], "staging provenance should be present in a successful result too"
    assert observed_mid_render, "fake_run_command should have observed a staging dir mid-render"
    assert not list(staging_root.glob("*")), "staging directory must be removed after a successful render"


def test_remotion_render_cleans_up_staging_dir_even_when_render_subprocess_fails(tmp_path, monkeypatch):
    import tools.video.video_compose as vc_module

    staging_root = _staging_root()
    assert not staging_root.exists() or not list(staging_root.glob("*")), (
        "test precondition: no leftover staging dirs from a prior run"
    )

    video = tmp_path / "clip.mp4"
    video.write_bytes(b"video-bytes")

    composer = VideoCompose()

    def fake_run_command(cmd, *, timeout=None, cwd=None):
        raise subprocess.CalledProcessError(1, cmd, output="", stderr="simulated Remotion failure")

    monkeypatch.setattr(composer, "run_command", fake_run_command)
    monkeypatch.setattr(vc_module.shutil, "which", lambda name: "/usr/bin/npx")

    result = composer._remotion_render({
        "edit_decisions": {
            "cut_timing_mode": "timeline",
            "renderer_family": "explainer-data",
            "cuts": [{"id": "c1", "source": str(video), "in_seconds": 0, "out_seconds": 5}],
        },
        "output_path": str(tmp_path / "out" / "final.mp4"),
    })

    assert result.success is False
    assert "simulated Remotion failure" in result.error
    assert not list(staging_root.glob("*")), (
        "staging directory must be removed even when the render subprocess fails"
    )


# ---------------------------------------------------------------------------
# cut_timing_mode validation (TR-029): explicit, not silent
# ---------------------------------------------------------------------------

def test_remotion_render_rejects_missing_cut_timing_mode(composer):
    result = composer._remotion_render({
        "edit_decisions": {
            "renderer_family": "explainer-data",
            "cuts": [{"id": "c1", "source": "https://example.com/a.mp4", "in_seconds": 0, "out_seconds": 5}],
        },
        "output_path": "irrelevant.mp4",
    })
    assert result.success is False
    assert "cut_timing_mode" in result.error
    assert "timeline" in result.error


def test_remotion_render_rejects_source_trim_mode(composer):
    result = composer._remotion_render({
        "edit_decisions": {
            "cut_timing_mode": "source_trim",
            "renderer_family": "explainer-data",
            "cuts": [{"id": "c1", "source": "https://example.com/a.mp4", "in_seconds": 0, "out_seconds": 5}],
        },
        "output_path": "irrelevant.mp4",
    })
    assert result.success is False
    assert "cut_timing_mode" in result.error


def test_compose_rejects_timeline_mode(composer, tmp_path):
    result = composer._compose({
        "edit_decisions": {
            "cut_timing_mode": "timeline",
            "cuts": [{"id": "c1", "source": str(tmp_path / "nonexistent.mp4"), "in_seconds": 0, "out_seconds": 5}],
        },
        "output_path": str(tmp_path / "out.mp4"),
    })
    assert result.success is False
    assert "cut_timing_mode" in result.error
    assert "source_trim" in result.error


def test_compose_defaults_to_source_trim_when_field_absent(composer, tmp_path):
    """Backward compatibility: existing callers that never set
    cut_timing_mode (e.g. tests/qa/test_08_end_to_end.py) must not be
    rejected -- the default keeps their behavior unchanged."""
    result = composer._compose({
        "edit_decisions": {
            "cuts": [{"id": "c1", "source": str(tmp_path / "nonexistent.mp4"), "in_seconds": 0, "out_seconds": 5}],
        },
        "output_path": str(tmp_path / "out.mp4"),
    })
    # Rejected for a different reason (missing source file), not for
    # cut_timing_mode -- proves the default path was taken, not the
    # explicit-rejection path.
    assert result.success is False
    assert "cut_timing_mode" not in result.error
    assert "not found" in result.error.lower()
