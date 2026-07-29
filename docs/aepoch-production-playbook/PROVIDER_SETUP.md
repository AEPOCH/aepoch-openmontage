# ÆPOCH Production — Provider Setup

Scope: the provider surface needed for the asset-first hybrid workflow
(stock media + fal.ai image generation + local word-level narration
timing). For the full OpenMontage provider catalog (all vendors, all
capabilities, pricing), see [`docs/PROVIDERS.md`](../PROVIDERS.md) — this
file only covers the providers this project's next phase actually depends
on, plus the hardening work done to make them safe for pipeline use.

No API key values appear anywhere in this document. Keys live in `.env`,
which is gitignored.

## Required environment variables

```bash
# .env — stock media (free, no cost ever)
PEXELS_API_KEY=
PIXABAY_API_KEY=

# .env — fal.ai gateway (Recraft, FLUX, Kling, Veo, MiniMax — one key)
FAL_KEY=
```

`faster-whisper` (word-level narration timing) needs no API key — it's a
local model, installed as a Python dependency (`python:faster_whisper`)
into the project's virtualenv.

## The explicit project interpreter pattern

This project has a dedicated virtualenv at `.venv/`. Always invoke Python
and pip through it explicitly rather than relying on whatever `python`
resolves to on `$PATH`:

```bash
./.venv/bin/python -m pip install <package>
./.venv/bin/python -c "..."
./.venv/bin/python -m pytest tests/
```

The `Makefile` encodes the same rule (`RUN_PYTHON` resolves to
`$VENV_DIR/bin/python` when no other virtualenv is active) — `make test`,
`make preflight`, etc. all go through it. Prefer the explicit
`./.venv/bin/python` form in ad-hoc diagnostic commands; see "Environment
loading" below for why this matters beyond just picking the right
interpreter.

## Provider-discovery commands

Mandatory before any provider is used in production (per
[`AGENT_GUIDE.md`](../../AGENT_GUIDE.md)'s preflight section):

```bash
# Human-readable capability rollup — use this first.
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
print(json.dumps(registry.provider_menu_summary(), indent=2))
"

# Per-tool detail (status, provider, install_instructions, agent_skills).
./.venv/bin/python -c "
from tools.tool_registry import registry
import json
registry.discover()
env = registry.support_envelope()
print(json.dumps(env['recraft_image'], indent=2))
"
```

`registry.discover()` reports a tool `available` when its required env
var is present — it does not make a network call. "Registry-verified"
below means this and nothing more; "functionally tested" means a real API
call actually succeeded.

## faster-whisper interpreter command

Verify the local word-level-timing dependency is actually importable in
the project's own virtualenv (not whatever `python3` happens to be on
`$PATH`):

```bash
./.venv/bin/python -c "import faster_whisper; print(faster_whisper.__version__)"
```

Confirmed during this hardening pass: `faster_whisper` 1.2.1 is installed
in `.venv`, and the registry's `transcriber` tool (`provider=whisperx`,
`capability=analysis`) reports `status: available`. No transcription was
actually run — availability only, not a functional test (see the table
below).

## Environment loading — the documented entry path

`tools/base_tool.py` loads `.env` into `os.environ` once, at import time,
via a module-level `_load_dotenv()` call — every value from `.env` becomes
available as soon as anything imports `tools.base_tool`. Every tool
subclasses `BaseTool`, and `tools/tool_registry.py` imports
`tools.base_tool` directly, so **the moment a script imports the registry
or any `tools.*` module, `.env` is loaded.** This is the existing,
correct, single-source-of-truth mechanism — no new `load_dotenv()` calls
were added anywhere in this hardening pass, and none should be scattered
through individual tools going forward.

**The failure mode this section exists to document:** a standalone
diagnostic script that calls a provider API directly — `import requests;
requests.post(...)` — without importing anything from `tools` first will
NOT have `.env` loaded, and will see a missing key as `None`. During this
project's provider smoke test, exactly this happened: a bare `python3 -c`
script hit fal.ai directly, got `FAL_KEY=None`, and produced a `401
Authentication is required` error that looked like a real auth failure
but wasn't — the real registry-backed tool call (which does trigger
`.env` loading) succeeded once given a valid payload.

**Required entry path:** always enter through `tools.tool_registry` (or
any module under `tools.`), never through a script whose only import is
`requests`/`os`. In practice this means: use the registered tool
(`registry._tools["recraft_image"].execute(...)`), not a hand-rolled HTTP
call, for anything beyond a one-off diagnostic — and if a diagnostic must
bypass the tool, `import tools.base_tool` (or the registry) first so
`.env` is loaded before touching `os.environ`.

A second, separate loader (`lib/env_loader.py`, using `python-dotenv`)
exists and is used by a handful of QA scripts
(`tests/qa/test_04_audio_mix.py` and siblings,
`scripts/kling_official_animated_explainer_e2e.py`). It requires an
explicit `load_env()` call and is not the path any provider tool relies
on. It was left as-is — out of scope for this pass, and not something to
route new provider code through; use the `tools.base_tool` path.

## Recraft: supported color formats

`recraft_image`'s `colors` input accepts either shape, freely mixed
within one list:

- a hex string, with or without `#`, either case — `"#B5651D"`,
  `"b5651d"`, `"B5651D"`
- an RGB object — `{"r": 181, "g": 101, "b": 29}`

Both are normalized internally (`tools/graphics/_shared.py`,
`normalize_color`/`normalize_colors`) to the RGB-object shape before the
request reaches fal.ai, because the actual Recraft v4 endpoint
(`fal-ai/recraft/v4/text-to-image`) requires that shape and rejects hex
strings with `422 Unprocessable Entity`. Malformed entries (wrong hex
length, non-hex characters, out-of-range or non-integer RGB components,
missing keys) raise a local `ValueError` and the tool returns
`success=False` **before** any network call — no malformed payload is
ever sent to fal.ai.

This is a generic helper, not an ÆPOCH-specific one — no ÆPOCH brand
colors are hardcoded into `tools/graphics/_shared.py` or
`recraft_image.py`. Brand color values belong in the caller's prompt/call
site (e.g. an episode's asset-generation script), not in the shared tool.

## Output-format normalization behavior

Providers do not reliably return the format implied by the extension a
caller requested. Two confirmed cases from this project's smoke test:

- fal.ai's Recraft v4 endpoint returned **WebP** bytes for a request whose
  `output_path` ended in `.png`.
- Pixabay returned **PNG** bytes (an illustration/vector hit) under this
  tool's default `.jpg` output name.

`tools/graphics/_shared.py`'s `save_image_correctly()` is now the single
save path for `recraft_image`, `pexels_image`, and `pixabay_image`:

1. Detects the real format from the downloaded bytes' own signature (via
   Pillow), not from the filename or any HTTP header.
2. If the caller's requested extension maps to a known format and differs
   from what was actually downloaded, re-encodes into the requested
   format (dimensions preserved; JPEG flattens alpha onto white at
   quality=95, PNG saves losslessly with `optimize=True`).
3. If the bytes already match the requested format, writes them
   unchanged — no lossy round-trip re-encode.
4. If conversion isn't practical (undecodable bytes, or SVG — which this
   helper detects and deliberately does not try to rasterize), corrects
   the file extension to match reality instead of leaving a mismatched
   one in place.
5. Never silently renames bytes under an extension that contradicts their
   actual signature.

Every one of the three tools now returns `format`, `source_format`, and
`format_converted` fields alongside `output`, so a caller (or the board)
can see exactly what was downloaded versus what was written to disk.

## Smoke-test results (2026-07-29)

| Provider | Tool | Registry status | Functional test | Result |
|---|---|---|---|---|
| Pexels | `pexels_image` | available | ✅ real search + download | Search "human creativity hands making art" → 8,000 results, downloaded 1, verified JPEG 867×1300 on disk |
| Pixabay | `pixabay_image` | available | ✅ real search + download | Search "human connection abstract" → 25,977 results, downloaded 1 — **provider returned PNG bytes under a `.jpg` request**, now corrected by format normalization |
| Recraft (fal.ai) | `recraft_image` | available | ✅ real generation, after fix | First 2 attempts failed `422` — root cause traced to hex-string `colors` (fal.ai requires RGB objects), not the `style` param as an earlier code comment claimed. Fixed generation returned **WebP** bytes for a `.png` request — now corrected by format normalization. Final verified output: WebP source → converted PNG, 1344×768 |
| FLUX (fal.ai) | `flux_image` | available | registry-verified only | Not called this session |
| Kling (fal.ai) | `kling_video` | available | registry-verified only | Not called this session |
| Veo (fal.ai) | `veo_video` | available | registry-verified only | Not called this session |
| MiniMax (fal.ai) | `minimax_video` | available | registry-verified only | Not called this session |
| faster-whisper | `transcriber` | available | registry-verified only | Import confirmed in `.venv` (1.2.1); no transcription run |

**Registry-verified only** means `registry.discover()` saw the required
env var and reports `status: available` — it does not mean the provider
was actually called. **Functionally tested** means a real API call was
made and its output verified (file on disk, format, dimensions).

## Total real paid calls

**Smoke-test session (before the fix):** 4 real fal.ai requests with valid
auth (2 failed `422` on malformed colors, 1 failed `422` after removing
`style` alone — the real cause was traced via a diagnostic call, 1
succeeded once colors were sent as RGB objects). ~$0.04 for the one
successful generation; the rejected requests are believed uncharged (fal.ai
does not appear to bill requests that fail schema validation before
generation), unverified against the actual fal.ai billing dashboard.

**Provider-hardening pass (functional verification of the fix):** one
real, user-approved call through the repaired `recraft_image` tool via the
normal registry path (not a direct API call) — `model=v4`, `image_size=
landscape_16_9`, `colors=["#2E86C1", {"r": 230, "g": 126, "b": 34}]`
(mixed hex + RGB input, exercising both accepted shapes), output requested
at `/tmp/openmontage-provider-hardening/recraft-verify.png`. Succeeded on
the first attempt — no retries needed. fal.ai again returned WebP bytes
regardless of the requested `.png` extension; `save_image_correctly`
converted them, and the file on disk was verified as a genuine PNG,
1344×768, matching `result.data["format"] == "PNG"` and
`format_converted == True`. Cost: $0.04 (`result.cost_usd`), duration
23.12s. **Total paid calls this pass: 1. Total estimated cost this pass:
$0.04.**
