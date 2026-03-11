---
name: cp-infographic
description: "Create visual summary cards and infographic layouts for social media, presentations, and editorial content"
arguments:
  - name: input
    description: "Topic/data, content path, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read it first and prioritize `outputs.analysis_md`, then `outputs.article_md`, then `inputs.topic`.
   - If `$ARGUMENTS` is topic/data or content path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.analysis_md`, `outputs.article_md`, and `inputs.topic`.

3. **Auto-scan legacy infographic inputs**:

```bash
ls -t openspec/runtime/deep-research/*/analysis.md 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/infographic/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下图解素材，请选择要用于信息图生成的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for subject, key data points, and intended platform.

## Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Core Workflow

### Gather Info

- Topic or subject of the infographic
- Key data points, statistics, or comparisons to include
- Items to compare (if comparison layout)
- Target platform (Instagram, Twitter/X, LinkedIn, presentation slide, print)
- Brand colors or style preferences (if any)

### Choose Layout

Select the layout that best fits the content:

| Layout | Best For |
|--------|----------|
| **Comparison card** | Side-by-side comparison of 2-3 options |
| **Timeline** | Historical progression or process steps |
| **Flowchart** | Decision trees or process flows |
| **Stats overview** | 4-6 key numbers with context |
| **Checklist** | Actionable steps or feature list |
| **Ranked list** | Top N items with brief descriptions |

### Structure Content for Visual Format

Apply these rules to strip content down to visual density:

- **Limit text**: Max 10 words per label, max 3 lines per section
- **Lead with numbers**: "47%" is stronger than "nearly half"
- **Use bullet points**: Never full sentences in visual cells
- **Hierarchy**: Title -> Section headers -> Data points -> Source
- **One insight per visual element**: Don't crowd multiple ideas into one box

**Layout Reference — Stats Overview (most common):**
```
+-------------------------------------+
|  [TITLE -- 6-8 words max]           |
+----------+----------+---------------+
|  STAT 1  |  STAT 2  |    STAT 3     |
|  [#] [%] |  [#] [%] |   [#] [%]    |
|  [label] |  [label] |   [label]    |
+----------+----------+---------------+
|  KEY TAKEAWAY (1 sentence)          |
|  Source: [citation]                 |
+-------------------------------------+
```

**Layout Reference — Comparison Card:**
```
+--------------------------------------+
|     [TOPIC] -- A vs B                |
+-----------------+--------------------+
|   OPTION A      |   OPTION B         |
|   - Point 1     |   - Point 1        |
|   - Point 2     |   - Point 2        |
|   - Point 3     |   - Point 3        |
|   [Pro/Con]     |   [Pro/Con]        |
+-----------------+--------------------+
```

### Create the Infographic

Produce using one of:
- **PowerPoint / Keynote**: Single slide, 1:1 or 4:5 ratio for social
- **Image generation prompt**: Detailed text prompt for AI image tools
- **Markdown table**: For text-based summary when visual tools not available

When creating via PowerPoint:
- Use 1080x1080px (Instagram) or 1200x628px (LinkedIn/Twitter) canvas
- Font: 2-3 sizes max (title, headers, body)
- Colors: 2-3 brand colors + white/black
- Padding: Minimum 40px on all edges

### Quality Checklist

Before delivering:
- [ ] All data is accurate — verify every number
- [ ] No text overflow — every label fits its container
- [ ] Clean design — remove anything that doesn't add information
- [ ] Readable at phone size — test at 375px width
- [ ] Source cited at bottom
- [ ] Title communicates the key insight, not just the topic

## Artifact Handoff

**Output path**:

- `openspec/runtime/infographic/YYYY-MM-DD-<topic>/` (standalone mode)
- `openspec/runtime/deep-research/<slug>/images/infographic/` (pipeline mode)

**OpenSpec contract (MANDATORY)**:

- Standalone: create or update a stage-local `*.openspec.json` contract.
- Pipeline: update `pipeline.openspec.json` in-place with `stage: content-production`, `outputs.production_infographic_dir`, `next.command: /content-utilities:compress-image`.

## Important Notes

- The best infographics make one point extremely clearly — not ten points vaguely
- If the content doesn't fit the visual format, suggest an article instead
- Color and layout should reinforce hierarchy, not decorate
- Always include a source line — credibility matters
