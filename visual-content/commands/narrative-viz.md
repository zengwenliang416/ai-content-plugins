---
description: Generate structured data narrative reports with inline mini charts via AntV T8 Syntax
argument-hint: "[data file | --framework html|react|vue | --length short|standard|long]"
---

## Step 1: Upstream Artifact Detection (MANDATORY)

**Detection order**:

1. **Explicit argument**:
   - `--data <path>` or positional file path → data source.
   - `--framework html|react|vue` (default: `html`).
   - `--length short|standard|long` (default: `standard`, 800 words).

2. **Auto-scan**:

```bash
# Data + analysis pair (preferred)
find openspec/runtime/deep-research/ -name "data-workbook.md" -mtime -7 2>/dev/null | head -3
find openspec/runtime/deep-research/ -name "analysis.md" -mtime -7 2>/dev/null | head -3

# Pipeline contracts
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

Prefer the pair (`data-workbook.md` + `analysis.md`) from the same slug when both are fresh.

3. **No upstream**: Ask user for topic + key metrics + data source.

## Language Selection (MANDATORY)

Use AskUserQuestion:

"请选择输出语言 / Select output language:
1. 中文 (Chinese)
2. English"

All narrative prose and entity annotations use the chosen language.

## Step 2: Load Skill and Execute

Load the `narrative-text-viz` skill.

## Artifact Handoff

**Output**:
- Pipeline: `openspec/runtime/deep-research/<slug>/visuals/narrative/`
- Standalone: `openspec/runtime/visuals/narrative/<topic-slug>/`

Files: `narrative.t8`, `narrative.html`, `narrative.png`, `narrative.meta.json`.

**OpenSpec contract**: Update `pipeline.openspec.json` with `outputs.narrative_dir` and `outputs.narrative_html` when in pipeline mode.

**Next step**: Suggest `/publishing:wechat-publisher` (T8 HTML is WeChat-compatible) or `/publishing:x-publisher` for X Articles.
