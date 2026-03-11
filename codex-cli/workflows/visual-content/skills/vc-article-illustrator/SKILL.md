---
name: vc-article-illustrator
description: "Analyze article and generate illustrations at key positions with Type x Style approach"
arguments:
  - name: input
    description: "Article file path or pipeline.openspec.json"
---

# Article Illustrator

Analyze articles, identify illustration positions, generate images with Type x Style consistency.

## Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other steps and BEFORE asking the user for input.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and use `outputs.article_md` as primary input.
   - If `$ARGUMENTS` is an article path, use it directly.
   - Then skip to Language Selection.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.article_md` candidates.

3. **Auto-scan articles**:

```bash
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
```

If files found, present them to the user with options.

4. **No upstream found**: Only in this case, ask the user for article content or file path.

## Language Selection (MANDATORY — after upstream detection)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Two Dimensions

| Dimension | Controls | Examples |
|-----------|----------|----------|
| **Type** | Information structure | infographic, scene, flowchart, comparison, framework, timeline |
| **Style** | Visual aesthetics | notion, warm, minimal, blueprint, watercolor, elegant |

Combine freely: `--type infographic --style blueprint`

## Types

| Type | Best For |
|------|----------|
| `infographic` | Data, metrics, technical |
| `scene` | Narratives, emotional |
| `flowchart` | Processes, workflows |
| `comparison` | Side-by-side, options |
| `framework` | Models, architecture |
| `timeline` | History, evolution |

## Styles

See [references/styles.md](references/styles.md) for Core Styles, full gallery, and Type x Style compatibility.

## Workflow

```
- [ ] Step 1: Pre-check (EXTEND.md, references, config)
- [ ] Step 2: Analyze content
- [ ] Step 3: Confirm settings
- [ ] Step 4: Generate outline
- [ ] Step 5: Generate images
- [ ] Step 6: Finalize
```

### Step 1: Pre-check

**1.5 Load Preferences (EXTEND.md) -- BLOCKING**

```bash
test -f .content-skills/article-illustrator/EXTEND.md && echo "project"
test -f "$HOME/.content-skills/article-illustrator/EXTEND.md" && echo "user"
```

| Result | Action |
|--------|--------|
| Found | Read, parse, display summary |
| Not found | BLOCKING: Run [first-time-setup](references/config/first-time-setup.md) |

Full procedures: [references/workflow.md](references/workflow.md#step-1-pre-check)

### Step 2: Analyze

| Analysis | Output |
|----------|--------|
| Content type | Technical / Tutorial / Methodology / Narrative |
| Purpose | information / visualization / imagination |
| Core arguments | 2-5 main points |
| Positions | Where illustrations add value |

**CRITICAL**: Metaphors -> visualize underlying concept, NOT literal image.

Full procedures: [references/workflow.md](references/workflow.md#step-2-setup--analyze)

### Step 3: Confirm Settings (REQUIRED)

**ONE interaction, max 4 questions. Q1-Q3 REQUIRED.**

| Q | Options |
|---|---------|
| **Q1: Type** | [Recommended], infographic, scene, flowchart, comparison, framework, timeline, mixed |
| **Q2: Density** | minimal (1-2), balanced (3-5), per-section (Recommended), rich (6+) |
| **Q3: Style** | [Recommended], minimal-flat, sci-fi, hand-drawn, editorial, scene, Other |
| Q4: Language | When article language != EXTEND.md setting |

Full procedures: [references/workflow.md](references/workflow.md#step-3-confirm-settings-)

### Step 4: Generate Outline

Save `outline.md` with frontmatter (type, density, style, image_count) and entries:

```yaml
## Illustration 1
**Position**: [section/paragraph]
**Purpose**: [why]
**Visual Content**: [what]
**Filename**: 01-infographic-concept-name.png
```

Full template: [references/workflow.md](references/workflow.md#step-4-generate-outline)

### Step 5: Generate Images

**BLOCKING: Prompt files MUST be saved before ANY image generation.**

1. For each illustration, create a prompt file per [references/prompt-construction.md](references/prompt-construction.md)
2. Save to `prompts/NN-{type}-{slug}.md` with YAML frontmatter
3. Prompts **MUST** use type-specific templates with structured sections (ZONES / LABELS / COLORS / STYLE / ASPECT)
4. LABELS **MUST** include article-specific data: actual numbers, terms, metrics, quotes
5. **DO NOT** pass ad-hoc inline prompts without saving prompt files first
6. Select generation skill, process references (`direct`/`style`/`palette`)
7. Apply watermark if EXTEND.md enabled
8. Generate from saved prompt files; retry once on failure

Full procedures: [references/workflow.md](references/workflow.md#step-5-generate-images)

### Step 6: Finalize

Insert `![description](path/NN-{type}-{slug}.png)` after paragraphs.

```
Article Illustration Complete!
Article: [path] | Type: [type] | Density: [level] | Style: [style]
Images: X/N generated
```

## Output Directory

```
illustrations/{topic-slug}/
├── source-{slug}.{ext}
├── references/           # if provided
├── outline.md
├── prompts/
└── NN-{type}-{slug}.png
```

**Slug**: 2-4 words, kebab-case. **Conflict**: append `-YYYYMMDD-HHMMSS`.

## Modification

| Action | Steps |
|--------|-------|
| Edit | Update prompt -> Regenerate -> Update reference |
| Add | Position -> Prompt -> Generate -> Update outline -> Insert |
| Delete | Delete files -> Remove reference -> Update outline |

## Artifact Handoff

**Output**: Illustration assets saved to:

- `openspec/runtime/deep-research/<slug>/images/` (when article is from deep-research)
- `illustrations/<topic-slug>/` (standalone mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.
- Update with:
  - `stage`: `visual-content`
  - `outputs.illustrations_dir`: illustrations directory path
  - `next.command`: `/content-utilities:markdown-to-html`
  - `next.input`: existing article markdown path

## References

| File | Content |
|------|---------|
| [references/workflow.md](references/workflow.md) | Detailed procedures |
| [references/usage.md](references/usage.md) | Command syntax |
| [references/styles.md](references/styles.md) | Style gallery |
| [references/prompt-construction.md](references/prompt-construction.md) | Prompt templates |
| [references/config/first-time-setup.md](references/config/first-time-setup.md) | First-time setup |
