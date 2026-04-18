---
name: infographic-dsl
description: >
  Create structured infographics (SWOT, quadrants, timelines, mind maps, org
  trees, sequence steps, comparison tables, hierarchical lists) via AntV
  Infographic DSL — 50+ data-driven templates. Different from `infographic-gen`:
  this one is for STRUCTURED DATA infographics; `infographic-gen` is for VISUAL
  AESTHETIC infographics. Triggers on "SWOT", "quadrant", "timeline", "mind map",
  "flowchart", "结构化信息图", "流程图", "时间线", "思维导图", "象限图".
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - WebFetch
  - AskUserQuestion
---

# Infographic DSL (Structured)

Generate data-structured infographics using the AntV Infographic DSL. Produces a standalone HTML that renders in-browser, plus an auto-exported PNG/SVG via Puppeteer.

## When to Use This vs `infographic-gen`

| Use `infographic-dsl` (this skill) when... | Use `infographic-gen` when... |
|---|---|
| Content has explicit structure: pros/cons, steps, hierarchy, quadrants, comparisons | Content is prose or bullet points without strict structure |
| You need a proven template (SWOT, timeline, roadmap, mind map) | You want layout + style aesthetic variety |
| Output is for reports, analyses, or knowledge decomposition | Output is for Xiaohongshu, covers, marketing visuals |

The two skills are complementary, not redundant.

## Usage

```bash
# Auto-detect upstream article
/visual-content:infographic-dsl

# With explicit template preference
/visual-content:infographic-dsl notes/analysis.md --template compare-swot

# Force offline render (no CDN required)
/visual-content:infographic-dsl analysis.md --offline
```

## Workflow

### Step 0: Upstream Detection

Same as other visual-content skills — scan `openspec/runtime/deep-research/*/pipeline.openspec.json` and `openspec/runtime/articles/*.md` (mtime < 7 days).

### Step 1: Extract Structure

Read the content and identify:

- **Title + description** (the infographic's semantic frame)
- **Structural type**: list / sequence / compare / hierarchy / relation / chart
- **Items** (labels, values, optional icons, optional children)

Ask the user (via AskUserQuestion) only if structure is genuinely ambiguous. Pre-select the most likely template.

### Step 2: Pick Template

Match structure to one of the 58 available templates (see `references/templates.md`). Common picks:

| Content Signal | Template Family |
|---|---|
| Strengths / Weaknesses / Opportunities / Threats | `compare-swot` |
| 2×2 matrix (Impact × Effort, etc.) | `compare-quadrant-*` |
| Pros vs Cons | `compare-binary-*` |
| Chronological steps | `sequence-timeline-*` |
| Development path | `sequence-roadmap-*` |
| Ordered list with visual progression | `sequence-stairs-*` / `sequence-pyramid-*` |
| Tree / org chart | `hierarchy-structure` / `hierarchy-tree-*` |
| Radiating ideas | `hierarchy-mindmap-*` |
| Simple bullet list with icons | `list-row-*` / `list-column-*` |
| Grid of key points | `list-grid-*` |
| Dependencies between nodes | `relation-dagre-flow-*` |
| Embedded bar / pie / word-cloud | `chart-*` |

### Step 3: Generate DSL

Emit valid DSL. Strict rules:

1. First line: `infographic <template-name>`.
2. Two-space indent inside `data` / `theme` blocks.
3. Key/value separated by a single space; arrays use `-` prefix.
4. **One data field only** (never mix `lists` + `items`): pick according to template family (see `references/syntax.md`).
5. Binary templates (`compare-binary-*`, `compare-hierarchy-left-right-*`) require exactly two root entries under `compares`.
6. `hierarchy-*` uses a single `root` with nested `children` (not repeated `root`).
7. Respect user input language — Chinese in → Chinese out.

See `references/syntax.md` for the full DSL reference and `references/templates.md` for all 58 templates with example data.

### Step 4: Render

```bash
node ${SKILL_DIR}/scripts/render-infographic.mjs \
  --dsl /tmp/infographic.dsl \
  --output <output_dir> \
  [--format png|svg|both] \
  [--offline]
```

The script:

1. Writes a standalone HTML using `@antv/infographic@latest` from **jsDelivr** (primary) → **unpkg** (fallback).
2. Opens it headless via Puppeteer (reuses xhs-card runtime).
3. Waits for `document.fonts.ready` + `infographic.on('rendered')`.
4. Exports PNG (screenshot) and optionally SVG (`infographic.toDataURL({ type: 'svg' })`).

### Step 5: Report

```
Infographic DSL Complete!

Template: compare-swot
Output:
- <dir>/infographic.html   (interactive, open in browser)
- <dir>/infographic.png    (raster, 2x DPR)
- <dir>/infographic.svg    (vector)
- <dir>/infographic.dsl    (source DSL for reproducibility)
```

## Artifact Paths

| Mode | Path |
|---|---|
| Pipeline | `openspec/runtime/deep-research/<slug>/visuals/infographic-dsl/` |
| Standalone | `openspec/runtime/visuals/infographic-dsl/<topic-slug>/` |

## Theme Customization

```
theme
  stylize rough           # hand-drawn
  palette
    - #3b82f6
    - #8b5cf6
    - #f97316
  base
    text
      font-family Noto Sans CJK SC
```

Built-in styles: `rough`, `pattern`, `linear-gradient`, `radial-gradient`.

## Failure Handling

| Scenario | Response |
|---|---|
| jsDelivr and unpkg both blocked | Warn; ship the HTML file — user can open in a browser on a different network |
| Puppeteer unavailable | Still write HTML + DSL; PNG/SVG generation skipped with a note |
| Template not found | List close matches from `references/templates.md` |
| DSL validation error | Show the offending line + rule from `references/syntax.md` |

## Notes

- This skill deliberately keeps the original AntV DSL intact — any documentation on infographic.antv.vision applies directly.
- For strict content structure (reports / analyses), this skill produces sharper output than the aesthetic-first `infographic-gen`.
