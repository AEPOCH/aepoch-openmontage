# Edit Director — Explainer Pipeline

## When to Use

You are the Editor for a generated explainer video. You have an `asset_manifest` with all generated files, a `scene_plan` with visual structure, and a `script` with timing. Your job is to assemble the edit decision list (EDL): what plays when, how elements layer, where subtitles go, and how music and narration interact.

This is where raw assets become a coherent video. Good editing makes average assets shine; bad editing wastes great assets.

## Prerequisites

| Layer | Resource | Purpose |
|-------|----------|---------|
| Schema | `schemas/artifacts/edit_decisions.schema.json` | Artifact validation |
| Prior artifacts | `state.artifacts["assets"]["asset_manifest"]`, `state.artifacts["scene_plan"]["scene_plan"]`, `state.artifacts["script"]["script"]` | Assets, visual plan, timing |
| Playbook | Active style playbook | Transitions, pacing rules, overlay styles |

## Process

### Step 1: Map Assets to Timeline

For each scene in the scene plan:
1. Find the matching assets from the asset manifest (by `scene_id`)
2. Find the matching narration audio (by script section)
3. Note the scene's timing (`start_seconds`, `end_seconds`)

Build a timeline map:
```
0s-10s: scene-1 (talking_head) | narration-s1 | img-intro.png
10s-18s: scene-2 (diagram) | narration-s2 | diagram-flow.svg
18s-22s: scene-3 (text_card) | narration-s3 | [text overlay]
...
```

### Step 2: Define Cuts

Each cut defines what visual is shown and when. **First set
`edit_decisions.cut_timing_mode`** to match the `render_runtime` locked at
proposal — the two composition engines interpret `in_seconds`/`out_seconds`
differently, and the field makes that choice explicit rather than leaving
it to guesswork (TR-029, `knowledge/operations/troubleshooting.md`):

- `render_runtime: "ffmpeg"` → `cut_timing_mode: "source_trim"` (also the
  default if omitted). `in_seconds`/`out_seconds` are an **in-source trim
  range** for that cut's own file — "play this clip from second `in_seconds`
  to second `out_seconds`" — and cuts render back-to-back in list order.
- `render_runtime: "remotion"` → `cut_timing_mode: "timeline"` is
  **required**; `video_compose.py` rejects the render otherwise.
  `in_seconds`/`out_seconds` become the cut's **absolute position on the
  final output timeline** instead — "this cut occupies the video from
  second `in_seconds` to second `out_seconds`" — and the in-source trim
  start moves to a separate field, `source_in_seconds` (default `0`).

`source_trim` example (FFmpeg):

```json
{
  "cut_timing_mode": "source_trim",
  "cuts": [
    {
      "id": "cut-1",
      "source": "img-scene-1",
      "in_seconds": 0,
      "out_seconds": 10,
      "layer": "primary",
      "transform": {
        "scale": 1.0,
        "position": "center",
        "animation": "ken-burns-slow-zoom"
      },
      "transition_in": "fade",
      "transition_out": "dissolve",
      "transition_duration": 0.4
    }
  ]
}
```

`timeline` example (Remotion) — same scene, same 10-second placement, but
`in_seconds`/`out_seconds` now describe *where on the output timeline* this
cut sits, and `source_in_seconds` says where in the source file to start
reading from (here, the source file starts at its own beginning):

```json
{
  "cut_timing_mode": "timeline",
  "cuts": [
    {
      "id": "cut-1",
      "source": "img-scene-1",
      "in_seconds": 0,
      "out_seconds": 10,
      "source_in_seconds": 0,
      "layer": "primary"
    }
  ]
}
```

A cut placed later on the timeline (e.g. the third scene in a six-scene,
60-second video, at 20s-30s) keeps the same `source_in_seconds: 0` if its
own source clip is exactly that scene's footage — only `in_seconds`/
`out_seconds` change to reflect the new timeline position. Use
`source_in_seconds` > 0 only when trimming into a longer source file (e.g.
seconds 30-45 of a longer interview clip placed at timeline position
10s-25s: `in_seconds: 10, out_seconds: 25, source_in_seconds: 30`).

**Layering rules:**
- `primary` — main visual (one at a time)
- `overlay` — text cards, stat cards, key terms (on top of primary)
- `background` — solid color or texture behind everything

### Step 3: Configure Subtitles

Subtitles are mandatory for all explainer content:

```json
{
  "subtitles": {
    "enabled": true,
    "style": "word-by-word",
    "font": "Inter",
    "font_size": 48,
    "color": "#FFFFFF",
    "background": "#00000088",
    "position": "bottom-center",
    "max_words_per_line": 8
  }
}
```

**Subtitle timing**: Derive from narration audio timestamps. Each word should highlight as it's spoken (word-by-word style) or display in phrase chunks (phrase style).

Use the playbook's typography for font choices.

### Step 4: Configure Audio Layers

```json
{
  "audio": {
    "narration": {
      "segments": [
        { "asset_id": "narration-s1", "start_seconds": 0 },
        { "asset_id": "narration-s2", "start_seconds": 10 }
      ]
    },
    "music": {
      "asset_id": "music-bg",
      "volume": 0.08,
      "fade_in_seconds": 2,
      "fade_out_seconds": 3,
      "ducking": {
        "enabled": true,
        "threshold_db": -3,
        "reduction_db": -8,
        "attack_ms": 200,
        "release_ms": 500
      }
    },
    "sfx": []
  }
}
```

**Music ducking**: Music volume drops when narration plays, rises during pauses. Use playbook's `audio.ducking_threshold_db`.

### Step 5: Apply Pacing Rules

Check the playbook's `motion.pacing_rules`:
- No cut shorter than `min_scene_hold_seconds`
- No cut longer than `max_scene_hold_seconds`
- Text cards hold for `text_card_hold_seconds`
- Transitions use `transition_duration_seconds`

Adjust cut timing if any violates these rules.

### Step 6: Verify Edit Completeness

**Timeline coverage:**
- [ ] Cuts span full video duration (no black frames)
- [ ] No overlapping primary cuts
- [ ] Every scene in scene_plan has at least one corresponding cut

**Asset references:**
- [ ] Every cut's `source` references a valid asset_id from the manifest
- [ ] Every narration segment references a valid audio asset
- [ ] Music asset exists

**Audio sync:**
- [ ] Narration segments are ordered and non-overlapping
- [ ] Narration timing aligns with corresponding visual cuts
- [ ] Music ducking is configured

**Subtitles:**
- [ ] Subtitles enabled
- [ ] Subtitle style uses playbook-compatible fonts and colors

### Step 7: Self-Evaluate

Score (1-5):

| Criterion | Question |
|-----------|----------|
| **Continuity** | Does every second of the video have a visual? |
| **Pacing** | Do cuts follow the playbook's timing rules? |
| **Audio-visual sync** | Does what you see match what you hear at every moment? |
| **Subtitle quality** | Are subtitles readable and correctly timed? |
| **Transition coherence** | Do transitions follow the playbook's allowed set? |

If any dimension scores below 3, revise.

### Step 8: Submit

Validate the edit_decisions artifact against the schema and persist via checkpoint.

## Common Pitfalls

- **Forgetting gaps**: If scene-1 ends at 10s and scene-2 starts at 10.5s, there's a 0.5s black frame. Check for gaps.
- **Audio drift**: Narration audio may be slightly longer/shorter than planned. Adjust visual cuts to match actual narration durations, not planned durations.
- **No ducking**: Music playing at full volume under narration makes the video unwatchable. Always configure ducking.
- **Same transition everywhere**: Varying transitions creates rhythm. Use the playbook's allowed set, but don't use the same one for every cut.
- **Subtitle font mismatch**: Subtitles should use the playbook's body font, not a random default.
