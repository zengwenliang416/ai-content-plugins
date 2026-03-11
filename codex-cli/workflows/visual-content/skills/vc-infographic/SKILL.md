---
name: vc-infographic
description: "Generate a professional infographic with 21 layout types and 21 visual styles"
arguments:
  - name: input
    description: "Content file, topic, or pipeline.openspec.json"
---

# Infographic Generator

Two dimensions: **layout** (information structure) x **style** (visual aesthetics). Freely combine any layout with any style.

## Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other steps and BEFORE asking the user for input.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prefer `outputs.analysis_md` or `outputs.article_md`.
   - If `$ARGUMENTS` is a content path or topic, use it directly.
   - Then skip to Language Selection.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.analysis_md` and `outputs.article_md`.

3. **No upstream found**: Only in this case, ask the user for subject, key data points, and target format.

## Language Selection (MANDATORY — after upstream detection)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Options

| Option | Values |
|--------|--------|
| `--layout` | 21 options (see Layout Gallery), default: bento-grid |
| `--style` | 21 options (see Style Gallery), default: craft-handmade |
| `--aspect` | landscape (16:9), portrait (9:16), square (1:1) |
| `--lang` | en, zh, ja, etc. |

## Layout Gallery

| Layout | Best For |
|--------|----------|
| `linear-progression` | Timelines, processes, tutorials |
| `binary-comparison` | A vs B, before-after, pros-cons |
| `comparison-matrix` | Multi-factor comparisons |
| `hierarchical-layers` | Pyramids, priority levels |
| `tree-branching` | Categories, taxonomies |
| `hub-spoke` | Central concept with related items |
| `structural-breakdown` | Exploded views, cross-sections |
| `bento-grid` | Multiple topics, overview (default) |
| `iceberg` | Surface vs hidden aspects |
| `bridge` | Problem-solution |
| `funnel` | Conversion, filtering |
| `isometric-map` | Spatial relationships |
| `dashboard` | Metrics, KPIs |
| `periodic-table` | Categorized collections |
| `comic-strip` | Narratives, sequences |
| `story-mountain` | Plot structure, tension arcs |
| `jigsaw` | Interconnected parts |
| `venn-diagram` | Overlapping concepts |
| `winding-roadmap` | Journey, milestones |
| `circular-flow` | Cycles, recurring processes |
| `dense-modules` | High-density modules, data-rich guides |

Full definitions: `references/layouts/<layout>.md`

## Style Gallery

| Style | Description |
|-------|-------------|
| `craft-handmade` | Hand-drawn, paper craft (default) |
| `claymation` | 3D clay figures, stop-motion |
| `kawaii` | Japanese cute, pastels |
| `storybook-watercolor` | Soft painted, whimsical |
| `chalkboard` | Chalk on black board |
| `cyberpunk-neon` | Neon glow, futuristic |
| `bold-graphic` | Comic style, halftone |
| `aged-academia` | Vintage science, sepia |
| `corporate-memphis` | Flat vector, vibrant |
| `technical-schematic` | Blueprint, engineering |
| `origami` | Folded paper, geometric |
| `pixel-art` | Retro 8-bit |
| `ui-wireframe` | Grayscale interface mockup |
| `subway-map` | Transit diagram |
| `ikea-manual` | Minimal line art |
| `knolling` | Organized flat-lay |
| `lego-brick` | Toy brick construction |
| `pop-laboratory` | Blueprint grid, coordinate markers, lab precision |
| `morandi-journal` | Hand-drawn doodle, warm Morandi tones |
| `retro-pop-grid` | 1970s retro pop art, Swiss grid, thick outlines |
| `claymorphic-ui` | 3D polymer clay UI, soft panels, floating elements |

Full definitions: `references/styles/<style>.md`

## Recommended Combinations

| Content Type | Layout + Style |
|--------------|----------------|
| Timeline/History | `linear-progression` + `craft-handmade` |
| Step-by-step | `linear-progression` + `ikea-manual` |
| A vs B | `binary-comparison` + `corporate-memphis` |
| Hierarchy | `hierarchical-layers` + `craft-handmade` |
| Overlap | `venn-diagram` + `craft-handmade` |
| Conversion | `funnel` + `corporate-memphis` |
| Cycles | `circular-flow` + `craft-handmade` |
| Technical | `structural-breakdown` + `technical-schematic` |
| Metrics | `dashboard` + `corporate-memphis` |
| Educational | `bento-grid` + `chalkboard` |
| Journey | `winding-roadmap` + `storybook-watercolor` |
| Categories | `periodic-table` + `bold-graphic` |
| Product Guide | `dense-modules` + `morandi-journal` |
| Technical Guide | `dense-modules` + `pop-laboratory` |
| Trendy Guide | `dense-modules` + `retro-pop-grid` |
| Tech Product | `bento-grid` + `claymorphic-ui` |

Default: `bento-grid` + `craft-handmade`

## Keyword Shortcuts

When user input contains these keywords, **auto-select** the associated layout and offer associated styles as top recommendations. Skip content-based layout inference for matched keywords.

If a shortcut has **Prompt Notes**, append them to the generated prompt as additional style instructions.

| User Keyword | Layout | Recommended Styles | Default Aspect | Prompt Notes |
|--------------|--------|--------------------|----------------|--------------|
| high-density-info | `dense-modules` | `morandi-journal`, `pop-laboratory`, `retro-pop-grid` | portrait | -- |
| infographic | `bento-grid` | `craft-handmade` | landscape | Minimalist: clean canvas, ample whitespace, no complex background textures. Simple cartoon elements and icons only. |

## Output Structure

```
infographic/{topic-slug}/
├── source-{slug}.{ext}
├── analysis.md
├── structured-content.md
├── prompts/infographic.md
└── infographic.png
```

Slug: 2-4 words kebab-case from topic. Conflict: append `-YYYYMMDD-HHMMSS`.

## Core Principles

- Preserve all source data **verbatim** -- no summarization or rephrasing
- Define learning objectives before structuring content
- Structure for visual communication (headlines, labels, visual elements)

## Workflow

### Step 1: Setup & Analyze

**1.1 Load Preferences (EXTEND.md)**

```bash
test -f .content-skills/infographic-gen/EXTEND.md && echo "project"
test -f "$HOME/.content-skills/infographic-gen/EXTEND.md" && echo "user"
```

| Path | Location |
|------|----------|
| `.content-skills/infographic-gen/EXTEND.md` | Project directory |
| `$HOME/.content-skills/infographic-gen/EXTEND.md` | User home |

| Result | Action |
|--------|--------|
| Found | Read, parse, display summary |
| Not found | Ask the user (see references/config/first-time-setup.md) |

**EXTEND.md Supports**: Preferred layout/style | Default aspect ratio | Custom style definitions | Language preference

Schema: `references/config/preferences-schema.md`

**1.2 Analyze Content -> `analysis.md`**

1. Save source content (file path or paste -> `source.md`)
   - **Backup rule**: If `source.md` exists, rename to `source-backup-YYYYMMDD-HHMMSS.md`
2. Analyze: topic, data type, complexity, tone, audience
3. Detect source language and user language
4. Extract design instructions from user input
5. Save analysis
   - **Backup rule**: If `analysis.md` exists, rename to `analysis-backup-YYYYMMDD-HHMMSS.md`

See `references/analysis-framework.md` for detailed format.

### Step 2: Generate Structured Content -> `structured-content.md`

Transform content into infographic structure:
1. Title and learning objectives
2. Sections with: key concept, content (verbatim), visual element, text labels
3. Data points (all statistics/quotes copied exactly)
4. Design instructions from user

**Rules**: Markdown only. No new information. All data verbatim.

See `references/structured-content-template.md` for detailed format.

### Step 3: Recommend Combinations

**3.1 Check Keyword Shortcuts first**: If user input matches a keyword from the **Keyword Shortcuts** table, auto-select the associated layout and prioritize associated styles as top recommendations. Skip content-based layout inference.

**3.2 Otherwise**, recommend 3-5 layout x style combinations based on:
- Data structure -> matching layout
- Content tone -> matching style
- Audience expectations
- User design instructions

### Step 4: Confirm Options

Use a **single interaction** with multiple questions to confirm all options together:

| Question | When | Options |
|----------|------|---------|
| **Combination** | Always | 3+ layout x style combos with rationale |
| **Aspect** | Always | landscape (16:9), portrait (9:16), square (1:1) |
| **Language** | Only if source != user language | Language for text content |

### Step 5: Generate Prompt -> `prompts/infographic.md`

**Backup rule**: If `prompts/infographic.md` exists, rename to `prompts/infographic-backup-YYYYMMDD-HHMMSS.md`

Combine:
1. Layout definition from `references/layouts/<layout>.md`
2. Style definition from `references/styles/<style>.md`
3. Base template from `references/base-prompt.md`
4. Structured content from Step 2
5. All text in confirmed language

### Step 6: Generate Image

1. Select available image generation skill (ask user if multiple)
2. **Check for existing file**: Before generating, check if `infographic.png` exists
   - If exists: Rename to `infographic-backup-YYYYMMDD-HHMMSS.png`
3. Call with prompt file and output path
4. On failure, auto-retry once

### Step 7: Output Summary

Report: topic, layout, style, aspect, language, output path, files created.

## Artifact Handoff

**Output**: Infographic assets saved to:

- `openspec/runtime/deep-research/<slug>/images/` (if contract/deep-research mode)
- `infographic/<topic-slug>/` (standalone mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.
- Update with:
  - `stage`: `visual-content`
  - `outputs.infographic_dir`: infographic output directory
  - `next.command`: `/content-utilities:markdown-to-html`
  - `next.input`: `outputs.article_md` if available

## References

- `references/analysis-framework.md` - Analysis methodology
- `references/structured-content-template.md` - Content format
- `references/base-prompt.md` - Prompt template
- `references/layouts/<layout>.md` - 21 layout definitions
- `references/styles/<style>.md` - 21 style definitions

## Extension Support

Custom configurations via EXTEND.md. See **Step 1.1** for paths and supported options.
