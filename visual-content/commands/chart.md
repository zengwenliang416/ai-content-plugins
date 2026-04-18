---
description: Generate data charts (bar, line, pie, scatter, radar, sankey, mind-map, 26+ types) via AntV with local fallback
argument-hint: "[data file | --type <chart-type> | --offline]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: Complete this step BEFORE loading the skill and BEFORE asking the user for input.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - `.json` / `.csv` / `.md` path → treat as data source.
   - `--type <name>` → chart type override.
   - `--offline` → force local renderer.
   - Skip to Step 2 once parsed.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
find openspec/runtime/deep-research/ -name "data-workbook.md" -mtime -7 2>/dev/null | head -3
```

If found → read and prefer `outputs.data_workbook_md` or the latest `data-workbook.md`.

3. **No upstream**: Ask user for data source + chart preference.

## Step 2: Load Skill and Execute

Load the `chart-visualization` skill and generate the chart.

## Artifact Handoff

**Output**: Chart image saved to:

- `openspec/runtime/deep-research/<slug>/visuals/charts/` (pipeline mode)
- `openspec/runtime/visuals/charts/<topic-slug>/` (standalone mode)

**OpenSpec contract**: Update `pipeline.openspec.json` with `outputs.charts_dir` if in pipeline mode.

**Next step**: Suggest `/visual-content:narrative-viz` to wrap the chart in a data narrative, or `/content-utilities:markdown-to-html` to package into HTML.
