"""Foreground render of aepoch-blog-pilot-what-is-aepoch via the registered
video_compose Remotion atelier path, per phase-16-channel-par-finish-v1.md's
compose-stage instruction. Synchronous, direct tool call -- no subagents.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from tools.tool_registry import registry

registry.discover()
tool = registry._tools["video_compose"]

project_dir = Path("projects/aepoch-blog-pilot-what-is-aepoch")
edit_decisions = json.loads((project_dir / "artifacts" / "edit_decisions.json").read_text())
proposal_packet = json.loads((project_dir / "artifacts" / "proposal_packet.json").read_text())
script_text = Path("/tmp/script_text.txt").read_text()

result = tool.execute({
    "operation": "render",
    "edit_decisions": edit_decisions,
    "output_path": str(project_dir / "renders" / "final.mp4"),
    "proposal_packet": proposal_packet,
    "narration_transcript_path": str(project_dir / "assets" / "audio" / "chris" / "chrisnarration_analysis_48k_mono_transcript.json"),
    "script_text": script_text,
})

print("success:", result.success)
print("error:", result.error)
out = json.dumps(result.data, indent=2, default=str)
Path("/tmp/compose_render_result.json").write_text(out)
print(out[:6000])
