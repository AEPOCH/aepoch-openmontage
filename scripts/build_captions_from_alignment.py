"""Build phrase-chunked caption cues for the compose stage from the canonical
word-level alignment, per phase-16-channel-par-finish-v1.md's edit-stage
instruction to use "the canonical word alignment for captions and meaningful
visual cues". Groups words within each script section into chunks of at most
8 words (edit-director.md's max_words_per_line guidance), never crossing a
section boundary. Read-only transform: reads canonical_word_alignment.json,
writes projects/aepoch-blog-pilot-what-is-aepoch/composition/data/captions.json.
"""
import json
from pathlib import Path

SRC = Path("projects/aepoch-blog-pilot-what-is-aepoch/assets/audio/chris/canonical_word_alignment.json")
OUT = Path("projects/aepoch-blog-pilot-what-is-aepoch/composition/data/captions.json")
MAX_WORDS = 8

data = json.loads(SRC.read_text())
words = data["reconciled_word_timestamp_map"]

cues = []
current_section = None
buf = []


def flush():
    if not buf:
        return
    text = " ".join(w["word"] for w in buf)
    cues.append({
        "section_id": buf[0]["section_id"],
        "text": text,
        "start": buf[0]["start"],
        "end": buf[-1]["end"],
    })


for w in words:
    if w["section_id"] != current_section:
        flush()
        buf = []
        current_section = w["section_id"]
    buf.append(w)
    if len(buf) >= MAX_WORDS:
        flush()
        buf = []
flush()

OUT.write_text(json.dumps(cues, indent=2))
print(f"wrote {len(cues)} caption cues to {OUT}")
print(json.dumps(cues[:3], indent=2))
print(json.dumps(cues[-3:], indent=2))
