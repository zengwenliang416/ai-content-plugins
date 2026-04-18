---
name: narrative-text-viz
description: >
  Generate structured data narrative reports with semantic entity annotations
  using AntV T8 Syntax — a Markdown-like language for data-rich articles with
  inline mini charts (pie, line), metric highlights, and trend callouts. Best
  for data analysis reports, financial summaries, research briefings. Triggers
  on "narrative", "data narrative", "data report", "数据报告", "T8", "叙事文本".
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - WebFetch
  - AskUserQuestion
---

# Narrative Text Visualization (T8)

Turn data + insights into a structured narrative report where every meaningful entity (metric, value, trend, dimension) is semantically tagged. Renders with inline mini charts and professional styling via the AntV T8 library.

T = Text. 8 = byte — a metaphor for "deeper insight beneath the text".

## When to Use

- Quarterly / weekly analysis reports
- Research briefings with supporting data
- Trend analysis narratives
- Executive summaries with callout metrics
- Anywhere "prose + data" needs publication-grade rendering

For pure article writing without data callouts → use `content-production/article-builder` instead.

## Usage

```bash
# Auto-detect upstream data + article
/visual-content:narrative-viz

# Explicit inputs
/visual-content:narrative-viz --data data-workbook.md --topic "Q3 AI spend trends"

# Pick output framework
/visual-content:narrative-viz --framework html|react|vue
```

## Workflow

### Step 0: Upstream Detection

```bash
find openspec/runtime/deep-research/ -name "data-workbook.md" -mtime -7
find openspec/runtime/deep-research/ -name "analysis.md" -mtime -7
```

Prefer `data-workbook.md` (structured data) + `analysis.md` (interpretation) as combined input when both exist.

### Step 1: Identify Requirements

- **Topic / data scope**
- **Narrative type**: report | summary | briefing | memo
- **Key metrics** to highlight
- **Target length**: short (≈300 words) | standard (≈800 words) | long (≈1500+ words)
- **Output framework**: HTML (default) | React | Vue

### Step 2: Generate T8 Syntax Content

T8 Syntax is Markdown with semantic entity annotations. See `references/t8-syntax.md` for the full spec. Key shapes:

```
# Title

Standard Markdown prose with {metric:Active Users|origin=analytics} of
{value:1.2M|assessment=positive} in {dimension:Q3 2025}, up from
{value:980K|trend=up}.

<pie data='[{"label":"Chrome","value":65},{"label":"Safari","value":25},{"label":"Other","value":10}]'/>

## Section

- {metric:CAC}: {value:$42|assessment=negative}
- {metric:LTV}: {value:$380|assessment=positive}
```

**Rules**:

- All data points worth highlighting → wrap in `{entity:value|attr=val}` form.
- Entity kinds: `metric`, `value`, `trend`, `dimension`, `delta`, `ratio`.
- Mini charts: `<pie>`, `<line>`, `<bar>` with inline `data='...'`.
- Minimum 800 words (standard length) or explicit user override.
- All data from **authentic sources** — cite via `origin=` attribute.

### Step 3: Generate Frontend Code

Pick the framework → emit runnable code:

| Framework | Template |
|---|---|
| HTML | Standalone file with `@antv/t8` from jsDelivr, `<div id="root">` target |
| React | Component with `import { T8 } from '@antv/t8'` |
| Vue | SFC with `<T8 :content="t8" />` |

All frameworks load T8 from CDN with jsDelivr (primary) → unpkg (fallback).

### Step 4: Validate

Pre-publish checklist:

- [ ] All entities have authentic `origin=` (source attribution)
- [ ] Content length meets target (800+ words for standard)
- [ ] At least one mini chart per major section
- [ ] Headings form logical hierarchy (1 H1, 2–6 H2s)
- [ ] No raw numbers outside entity wraps
- [ ] Language matches user input

### Step 5: Render + Export

```bash
node ${SKILL_DIR}/scripts/render-narrative.mjs \
  --content /tmp/narrative.t8 \
  --framework html \
  --output <output_dir> \
  [--export pdf|png]
```

Default: HTML file + screenshot of the rendered page (PNG) for quick sharing.

## Artifact Paths

| Mode | Path |
|---|---|
| Pipeline | `openspec/runtime/deep-research/<slug>/visuals/narrative/` |
| Standalone | `openspec/runtime/visuals/narrative/<topic-slug>/` |

Files:

```
<dir>/
├── narrative.t8       # source T8 syntax
├── narrative.html     # interactive
├── narrative.png      # preview screenshot
└── narrative.meta.json  # topic, data sources, word count
```

## Failure Handling

| Scenario | Response |
|---|---|
| No data source found | Ask user to paste / attach data |
| Fewer than 5 entity annotations detected | Warn: narrative is thin — suggest adding more `{metric}` tags |
| Mini chart JSON invalid | Point to the offending tag + show expected shape |
| CDN both blocked | Ship HTML with local `@antv/t8` copy; instruct user to run `npm i @antv/t8` |

## Integration

- Feed from `topic-research/deep-research` (reads `data-workbook.md` + `analysis.md`)
- Feed from `content-analysis/trend-analysis` (narrative wraps the trend charts)
- Feed into `publishing/wechat-publisher` (T8 HTML is WeChat-compatible after minor CSS tweaks)

## Notes

- T8 is LLM-friendly by design — the syntax was built for AI generation.
- Entity annotations become hooks for future tooling (search, filtering, highlighting).
- Unlike `chart-visualization` (images), this skill produces *live HTML* with charts embedded — it's meant to be read as a document.
