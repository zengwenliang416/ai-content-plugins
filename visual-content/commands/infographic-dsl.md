---
description: Create structured data infographics (SWOT, quadrants, timelines, mind maps, 58 templates) via AntV DSL
argument-hint: "[content file | --template <name> | --offline]"
---

## Step 1: Upstream Artifact Detection (MANDATORY)

**Detection order**:

1. **Explicit argument**:
   - Content file path → use directly.
   - `--template <name>` → template override.
   - `--offline` → force local render (requires pre-cached AntV Infographic bundle).

2. **Auto-scan**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
find openspec/runtime/articles/ -name "*.md" -mtime -7 2>/dev/null | head -5
find openspec/runtime/deep-research/ -name "analysis.md" -mtime -7 2>/dev/null | head -5
```

Prefer `outputs.analysis_md` > `outputs.article_md` > latest article.

3. **No upstream**: Ask user for topic + structural type (SWOT / timeline / tree / comparison / etc.).

## Language Selection (MANDATORY — after Step 1)

Use AskUserQuestion:

"请选择输出语言 / Select output language:
1. 中文 (Chinese)
2. English"

All DSL text uses the chosen language.

## Step 2: Load Skill and Execute

Load the `infographic-dsl` skill.

## Differentiation Note

This command produces **structured data infographics** (SWOT, quadrants, timelines, mind maps). For **aesthetic layout + style** infographics (21 layout × 21 style combinations), use `/visual-content:infographic` instead. The two are complementary.

## Artifact Handoff

**Output**:
- Pipeline: `openspec/runtime/deep-research/<slug>/visuals/infographic-dsl/`
- Standalone: `openspec/runtime/visuals/infographic-dsl/<topic-slug>/`

Files: `infographic.dsl`, `infographic.html`, `infographic.png`, `infographic.svg`.

**OpenSpec contract**: Update `pipeline.openspec.json` with `outputs.infographic_dsl_dir` when in pipeline mode.
