---
name: chart-visualization
description: >
  Generate data charts (bar, line, pie, scatter, radar, sankey, mind-map, funnel,
  flow, histogram, boxplot, treemap, word-cloud, 26+ types) via AntV GPT-Vis API
  with a local Puppeteer+G2 fallback. Triggers on "chart", "图表", "柱状图",
  "折线图", "饼图", "散点图", "雷达图", "桑基图", "思维导图", "数据可视化",
  "data viz", "visualize data".
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - WebFetch
---

# Chart Visualization

Turn structured data into a chart image. Two rendering paths:

1. **Remote (default, fast)**: POST to AntV GPT-Vis API → returns image URL.
2. **Local fallback (resilient)**: G2 CDN + Puppeteer screenshot → local PNG.

The runner script auto-falls back when the API is unreachable, rate-limited, or the user asks for offline output.

## Usage

```bash
# Auto-detect upstream data, pick chart type
/visual-content:chart

# Explicit data + type
/visual-content:chart --type line --data path/to/data.json --title "Weekly Revenue"

# Force local rendering
/visual-content:chart --type bar --data data.json --offline
```

## Runtime Requirements

- `curl` (for API path)
- Node.js + Puppeteer (for local path — reuses `visual-content/skills/xhs-card` runtime: `puppeteer` or `XHS_CARD_PUPPETEER_PATH`)

## Workflow

### Step 0: Upstream Artifact Detection (MANDATORY)

> **CONSTRAINT — Upstream Artifact Auto-Detection is MANDATORY**:
> Before asking the user for input, scan for existing upstream artifacts.
> If exactly one recent artifact is found, load it automatically and inform the user.
> Only ask when none or multiple candidates exist.

```bash
# Stage-local pipeline contracts
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3

# Data workbooks (deep-research Task 2 output)
find openspec/runtime/deep-research/ -name "data-workbook.md" -mtime -7 2>/dev/null
```

Priority: `pipeline.openspec.json → outputs.data_workbook_md` > latest `data-workbook.md` > user-provided path.

### Step 1: Analyze Data and Pick Chart Type

Read the data, then map it to the most appropriate chart type:

| Data Shape | Recommended Type |
|---|---|
| Time series, single metric | `line` |
| Time series, cumulative | `area` |
| Time series, two dual-scale metrics | `dual-axes` |
| Categorical comparison (horizontal) | `bar` |
| Categorical comparison (vertical) | `column` |
| Running total with +/- deltas | `waterfall` |
| Value distribution (numeric) | `histogram` |
| Proportion | `pie` |
| Hierarchical proportion | `treemap` |
| Correlation, two numeric vars | `scatter` |
| Flow between entities | `sankey` |
| Set overlap | `venn` |
| Org / tree structure | `organization-chart` |
| Radiating branches | `mind-map` |
| Multi-dimensional profile | `radar` |
| Stage conversion | `funnel` |
| Percent / progress | `liquid` |
| Word frequency | `word-cloud` |
| Statistical spread | `boxplot` / `violin` |
| Complex graph | `network-graph` |
| Process | `flow-diagram` |
| Cause → effect | `fishbone-diagram` |
| Tabular / pivot | `spreadsheet` |

### Step 2: Build the Chart Spec

Construct JSON matching the upstream schema. Required fields: `type`, `source: "chart-visualization-skills"`, `data`. Optional: `title`, `theme` (`default` | `academy` | `dark`), `width`, `height`, `axisXTitle`, `axisYTitle`, `style.texture` (`default` | `rough` for hand-drawn).

Data format per type: see `references/chart-types.md`.

### Step 3: Render (with automatic fallback)

Run the unified entry script. It tries remote API first, falls back to local three-tier renderer (G2 → G6 → custom HTML/SVG) on failure:

```bash
node ${SKILL_DIR}/scripts/gen-chart.mjs \
  --spec /tmp/chart-spec.json \
  --output <output_dir>/chart_01.png \
  [--offline] \
  [--html-only]
```

Flags:
- `--offline` — skip remote API, go straight to local
- `--html-only` — write the HTML template without launching a browser (useful when Puppeteer is unavailable; the user opens the HTML manually)

### Step 4: Emit Markdown Reference

Output a Markdown image reference the user can paste anywhere:

```markdown
![<title>](<output_path>)
```

## Artifact Paths

| Mode | Path |
|---|---|
| Pipeline (input inside `openspec/runtime/deep-research/<slug>/`) | `openspec/runtime/deep-research/<slug>/visuals/charts/` |
| Standalone | `openspec/runtime/visuals/charts/<topic-slug>/` |

Filenames: `chart_NN_<type>.png` + sibling `chart_NN_<type>.json` (the spec, for reproducibility).

## Fallback Behavior

Three-tier local renderer — covers 24 of 26 chart types without any upstream API:

| Tier | Renderer | Chart Types |
|---|---|---|
| G2 (17) | `@antv/g2@5` via jsDelivr → unpkg | line, area, bar, column, pie, scatter, histogram, radar, funnel, treemap, word-cloud, dual-axes, waterfall, boxplot, violin, liquid, sankey |
| G6 (5) | `@antv/g6@5` via jsDelivr → unpkg | mind-map, organization-chart, network-graph, flow-diagram, fishbone-diagram |
| Custom (2) | Pure HTML/SVG, no CDN | venn, spreadsheet |

`gen-chart.mjs` logic:

1. If `--offline` → jump to local render.
2. Otherwise POST to `https://antv-studio.alipay.com/api/gpt-vis`, timeout 20s.
3. On any non-2xx, network error, or `success: false` → log reason, switch to local.
4. Local picks the tier based on `type`, loads CDN assets (jsDelivr primary, unpkg fallback), renders with headless Chrome via the shared `lib/puppeteer-helper.mjs`, screenshots the `#chart` element.
5. If Puppeteer is unavailable → writes `.html` and `.spec.json` sidecars so the user can render externally.

The user always gets something usable; they see which path succeeded in the output JSON (`mode: "remote" | "local-g2" | "local-g6" | "local-custom" | "local-html-only"`).

## Preflight

Before first use, run:

```bash
node visual-content/scripts/preflight.mjs
```

Checks Node >= 18, Puppeteer, and reachability of AntV API / CDN endpoints. Returns exit code 0 (all green), 1 (required failure — fix before use), or 2 (optional warnings — falls through gracefully).

## Failure Handling

| Scenario | Response |
|---|---|
| Both paths fail | Emit the raw spec JSON + an error note so the user can render externally |
| Data too large (>500 rows) | Warn, suggest pre-aggregation, offer to sample |
| Unsupported chart type | List the 26+ supported types and ask user to pick |

## Notes

- Upstream API is AntV's public endpoint — no guaranteed SLA. The local fallback is the reliability net.
- For Chinese content, make sure `title`, labels, and axis titles are in Chinese; the remote renderer handles CJK correctly.
- `style.texture: "rough"` produces hand-drawn style, great for brainstorm/casual posts.
