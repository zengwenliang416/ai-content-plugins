---
name: icon-retrieval
description: >
  Search and fetch SVG icons from AntV's infographic icon library via HTTP API,
  with a local cache. Returns up to 20 icons per query. Use when a skill needs
  thematic icons for infographics, slides, cards, or covers. Triggers on "icon",
  "图标", "search icon", "找图标", "icon svg".
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - WebFetch
---

# Icon Retrieval

Fetch SVG icons matching a concept keyword. Results are cached locally so repeated queries are instant and work offline after first hit.

## Usage

```bash
# Search by keyword, default topK=5
/visual-content:icon "security"

# Chinese keyword supported
/visual-content:icon "数据分析" --topk 10

# Direct API mode (skip cache)
/visual-content:icon "cloud" --no-cache
```

## API

- **Endpoint**: `GET https://lab.weavefox.cn/api/v1/infographic/icon`
- **Params**: `text` (required, URL-encoded), `topK` (1–20, default 5)
- **Response**: `{ success: true, data: ["<svg-url-1>", ...] }`

## Workflow

### Step 1: Normalize Query

- Accept English or Chinese keyword.
- Strip quotes, trim whitespace.
- URL-encode for the query param.

### Step 2: Check Cache

```bash
CACHE_DIR="openspec/runtime/visuals/icons/_cache"
CACHE_KEY=$(echo -n "<query>:<topK>" | shasum -a 1 | cut -c1-16)
CACHE_FILE="$CACHE_DIR/$CACHE_KEY.json"
```

If `$CACHE_FILE` exists and is fresh (< 30 days) → load URLs from it, skip step 3.

### Step 3: Call API (if cache miss)

```bash
curl -sS -L --max-time 20 \
  "https://lab.weavefox.cn/api/v1/infographic/icon?text=$(python3 -c 'import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))' "<query>")&topK=<N>"
```

Save the response JSON to `$CACHE_FILE`.

### Step 4: Fetch SVG Content

For each URL in `data`, fetch and save as `<sha16>.svg` under `$CACHE_DIR`. Return both the remote URL and the local path so downstream skills can choose either.

```bash
for url in $URLS; do
  HASH=$(echo -n "$url" | shasum -a 1 | cut -c1-16)
  LOCAL="$CACHE_DIR/$HASH.svg"
  [ -f "$LOCAL" ] || curl -sS -L --max-time 20 "$url" -o "$LOCAL"
done
```

### Step 5: Return Result

Emit a compact table to the user:

```markdown
| # | Keyword Match | Local Path | Remote URL |
|---|---|---|---|
| 1 | document | .../_cache/a1b2....svg | https://... |
```

And inline-preview the first SVG if the terminal supports it.

## Cache Strategy

| Item | Policy |
|---|---|
| Query results | JSON, keyed by `sha16(query:topK)`, 30-day TTL |
| SVG files | Content-addressed by `sha16(url)`, no expiration (immutable CDN) |
| Eviction | Manual: `rm -rf openspec/runtime/visuals/icons/_cache` |

## Integration Points

Other skills can call this skill via the shared cache:

- `infographic-dsl` → passes `icon <keyword>` in DSL, pre-fetches via this skill
- `cover-generator` → background motifs
- `slide-generator` → bullet point icons
- `xhs-card` → decorative elements

Downstream skills should prefer the local SVG path (`openspec/runtime/visuals/icons/_cache/<hash>.svg`) over the remote URL for offline robustness.

## Failure Handling

| Scenario | Response |
|---|---|
| API 4xx/5xx | Retry once with `topK=3`, then report failure with endpoint reachability note |
| Network unavailable | List cached matches only; warn user that results may be partial |
| Zero matches | Suggest alternative keywords (broader / English equivalent) |
| Invalid SVG content | Skip that entry, continue with the rest |

## Notes

- The endpoint is AntV / WeaveFox internal — behavior may evolve. The cache doubles as a resilience layer.
- Icons are MIT-licensed through the AntV ecosystem; attribution is not strictly required but is appreciated in published content.
