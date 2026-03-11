---
name: vc-xhs-images
description: "Generate Xiaohongshu infographic series with 11 visual styles and 8 layouts"
arguments:
  - name: input
    description: "Content file, topic, or pipeline.openspec.json"
---

# Xiaohongshu Infographic Series Generator

Break down complex content into eye-catching infographic series for Xiaohongshu with multiple style options.

## Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other steps and BEFORE asking the user for input.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.article_md` (fallback `outputs.analysis_md`).
   - If `$ARGUMENTS` is a content file or topic, use it directly.
   - Then skip to Language Selection.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.article_md` and `outputs.analysis_md`.

3. **Auto-scan legacy content assets**:

```bash
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/analysis.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下小红书卡片素材，请选择要用于生成图文系列的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for content or topic for the Xiaohongshu series.

## Language Selection (MANDATORY — after upstream detection)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Two Dimensions

| Dimension | Controls | Options |
|-----------|----------|---------|
| **Style** | Visual aesthetics: colors, lines, decorations | cute, fresh, warm, bold, minimal, retro, pop, notion, chalkboard, study-notes, claymorphic-ui |
| **Layout** | Information structure: density, arrangement | sparse, balanced, dense, list, comparison, flow, mindmap, quadrant |

Style x Layout can be freely combined. Example: `--style notion --layout dense` creates an intellectual-looking knowledge card with high information density.

## Style Gallery

| Style | Description |
|-------|-------------|
| `cute` (Default) | Sweet, adorable, girly - classic Xiaohongshu aesthetic |
| `fresh` | Clean, refreshing, natural |
| `warm` | Cozy, friendly, approachable |
| `bold` | High impact, attention-grabbing |
| `minimal` | Ultra-clean, sophisticated |
| `retro` | Vintage, nostalgic, trendy |
| `pop` | Vibrant, energetic, eye-catching |
| `notion` | Minimalist hand-drawn line art, intellectual |
| `chalkboard` | Colorful chalk on black board, educational |
| `study-notes` | Realistic handwritten photo style, blue pen + red annotations + yellow highlighter |
| `claymorphic-ui` | 3D polymer clay UI, soft panels, floating elements, chibi characters |

Detailed style definitions: `references/presets/<style>.md`

## Layout Gallery

| Layout | Description |
|--------|-------------|
| `sparse` (Default) | Minimal information, maximum impact (1-2 points) |
| `balanced` | Standard content layout (3-4 points) |
| `dense` | High information density, knowledge card style (5-8 points) |
| `list` | Enumeration and ranking format (4-7 items) |
| `comparison` | Side-by-side contrast layout |
| `flow` | Process and timeline layout (3-6 steps) |
| `mindmap` | Center radial mind map layout (4-8 branches) |
| `quadrant` | Four-quadrant / circular section layout |

Detailed layout definitions: `references/elements/canvas.md`

## Auto Selection

| Content Signals | Style | Layout |
|-----------------|-------|--------|
| Beauty, fashion, cute, girl, pink | `cute` | sparse/balanced |
| Health, nature, clean, fresh, organic | `fresh` | balanced/flow |
| Life, story, emotion, feeling, warm | `warm` | balanced |
| Warning, important, must, critical | `bold` | list/comparison |
| Professional, business, elegant, simple | `minimal` | sparse/balanced |
| Classic, vintage, old, traditional | `retro` | balanced |
| Fun, exciting, wow, amazing | `pop` | sparse/list |
| Knowledge, concept, productivity, SaaS | `notion` | dense/list |
| Education, tutorial, learning, teaching, classroom | `chalkboard` | balanced/dense |
| Notes, handwritten, study guide, knowledge, realistic, photo | `study-notes` | dense/list/mindmap |
| Tech, AI, app, product, feature, tool, trendy | `claymorphic-ui` | balanced/list/flow |

## Outline Strategies

### Strategy A: Story-Driven

| Aspect | Description |
|--------|-------------|
| **Concept** | Personal experience as main thread, emotional resonance first |
| **Features** | Start from pain point, show before/after change, strong authenticity |
| **Best for** | Reviews, personal shares, transformation stories |
| **Structure** | Hook -> Problem -> Discovery -> Experience -> Conclusion |

### Strategy B: Information-Dense

| Aspect | Description |
|--------|-------------|
| **Concept** | Value-first, efficient information delivery |
| **Features** | Clear structure, explicit points, professional credibility |
| **Best for** | Tutorials, comparisons, product reviews, checklists |
| **Structure** | Core conclusion -> Info card -> Pros/Cons -> Recommendation |

### Strategy C: Visual-First

| Aspect | Description |
|--------|-------------|
| **Concept** | Visual impact as core, minimal text |
| **Features** | Large images, atmospheric, instant appeal |
| **Best for** | High-aesthetic products, lifestyle, mood-based content |
| **Structure** | Hero image -> Detail shots -> Lifestyle scene -> CTA |

## File Structure

### Pipeline Mode

When source article is from `openspec/runtime/deep-research/<slug>/`:

```
openspec/runtime/deep-research/<slug>/visuals/xhs/
├── source-{slug}.{ext}
├── analysis.md
├── outline-strategy-a.md
├── outline-strategy-b.md
├── outline-strategy-c.md
├── outline.md
├── prompts/
│   ├── 01-cover-[slug].md
│   ├── 02-content-[slug].md
│   └── ...
├── 01-cover-[slug].png
├── 02-content-[slug].png
└── NN-ending-[slug].png
```

### Standalone Mode

```
openspec/runtime/visuals/xhs/{topic-slug}/
├── source-{slug}.{ext}
├── analysis.md
├── ...  (same structure as above)
└── NN-ending-[slug].png
```

### Output Path Resolution

```
Input path contains "openspec/runtime/deep-research/" ?
  -> YES: Pipeline mode -> openspec/runtime/deep-research/<slug>/visuals/xhs/
  -> NO:  Standalone mode -> openspec/runtime/visuals/xhs/{topic-slug}/
```

**Slug**: 2-4 words, kebab-case. Conflict: append `-YYYYMMDD-HHMMSS`.

## Workflow

### Progress Checklist

```
XHS Infographic Progress:
- [ ] Pre-flight: Upstream artifact scan (if no path provided)
- [ ] Step 0: Check preferences (EXTEND.md) BLOCKING
  - [ ] Found -> load preferences -> continue
  - [ ] Not found -> run first-time setup -> MUST complete before Step 1
- [ ] Step 1: Analyze content -> analysis.md
- [ ] Step 2: Confirmation 1 - Content understanding REQUIRED
- [ ] Step 3: Generate 3 outline + style variants
- [ ] Step 4: Confirmation 2 - Outline & style & elements selection REQUIRED
- [ ] Step 5: Generate images (sequential)
- [ ] Step 6: Completion report
```

### Flow

```
[Pre-flight: Upstream Scan] -- Path provided -> use directly
                             -- 1 article found -> auto-load
                             -- N articles -> ask user to choose
                             -- 0 found -> accept pasted content
                                    |
Input -> [Step 0: Preferences] -- Found -> Continue
                                -- Not found -> First-Time Setup BLOCKING
                                               -> Complete setup -> Save EXTEND.md -> Continue
        |
Analyze -> [Confirm 1] -> 3 Outlines -> [Confirm 2: Outline + Style + Elements] -> Generate -> Complete
```

### Step 0: Load Preferences (EXTEND.md) -- BLOCKING

**CRITICAL**: If EXTEND.md not found, MUST complete first-time setup before ANY other questions or steps.

```bash
test -f .content-skills/xhs-card/EXTEND.md && echo "project"
test -f "$HOME/.content-skills/xhs-card/EXTEND.md" && echo "user"
```

| Path | Location |
|------|----------|
| `.content-skills/xhs-card/EXTEND.md` | Project directory |
| `$HOME/.content-skills/xhs-card/EXTEND.md` | User home |

| Result | Action |
|--------|--------|
| Found | Read, parse, display summary -> Continue to Step 1 |
| Not found | BLOCKING: Run first-time setup ONLY (see references/config/first-time-setup.md) -> Complete and save EXTEND.md -> Then Step 1 |

**EXTEND.md Supports**: Watermark | Preferred style/layout | Custom style definitions | Language preference

Schema: `references/config/preferences-schema.md`

### Step 1: Analyze Content -> `analysis.md`

1. **Save source content** (if not already a file):
   - **Backup rule**: If `source.md` exists, rename to `source-backup-YYYYMMDD-HHMMSS.md`
2. Read source content
3. **Deep analysis** following `references/workflows/analysis-framework.md`
4. Detect source language
5. Determine recommended image count (2-10)
6. **Generate clarifying questions** (see Step 2)
7. **Save to `analysis.md`**

### Step 2: Confirmation 1 - Content Understanding (REQUIRED)

**Display summary**:
- Content type + topic identified
- Key points extracted
- Tone detected
- Source images count

**Ask the user**:
1. Core selling point (multiSelect: true)
2. Target audience
3. Style preference: Authentic sharing / Professional review / Aesthetic mood / Auto
4. Additional context (optional)

**After response**: Update `analysis.md` -> Step 3

### Step 3: Generate 3 Outline + Style Variants

Based on analysis + user context, create three distinct strategy variants. Each variant includes both **outline structure** and **visual style recommendation**.

| Strategy | Filename | Outline |
|----------|----------|---------|
| A | `outline-strategy-a.md` | Story-driven: emotional, before/after |
| B | `outline-strategy-b.md` | Information-dense: structured, factual |
| C | `outline-strategy-c.md` | Visual-first: atmospheric, minimal text |

**Constraints**:
- Each strategy MUST recommend a **different** style
- Selection based on content signals + strategy nature + user's `preferred_style`
- Any strategy can recommend any style

Reference: `references/workflows/outline-template.md`

### Step 4: Confirmation 2 - Outline & Style & Elements Selection (REQUIRED)

**Question 1: Outline Strategy** - Choose A/B/C or combine.

**Question 2: Visual Style** (grouped categories):
- [auto-selected style] (Recommended)
- Warm & Approachable (cute/fresh/warm)
- High Impact (bold/pop/retro)
- Knowledge & Craft (notion/minimal/chalkboard/study-notes/claymorphic-ui)

**Question 3: Visual Elements** - Use style defaults or adjust background/decorations.

**After response**: Copy selected strategy to `outline.md` with confirmed style and elements.

### Step 5: Generate Images

**Visual Consistency — Reference Image Chain**:
1. **Generate image 1 (cover) FIRST** — without `--ref`
2. **Use image 1 as `--ref` for ALL remaining images** (2, 3, ..., N)

**For each image (cover + content + ending)**:
1. Save prompt to `prompts/NN-{type}-[slug].md`
   - **Backup rule**: If prompt file exists, rename to `prompts/NN-{type}-[slug]-backup-YYYYMMDD-HHMMSS.md`
2. Generate image:
   - **Image 1**: Generate without `--ref`
   - **Images 2+**: Generate with `--ref <image-01-path>` for consistency
   - **Backup rule**: If image file exists, rename to `NN-{type}-[slug]-backup-YYYYMMDD-HHMMSS.png`
3. Report progress after each generation

**Session Management**: If image generation skill supports `--sessionId`:
1. Generate unique session ID: `xhs-{topic-slug}-{timestamp}`
2. Use same session ID for all images

### Step 6: Completion Report

```
Xiaohongshu Infographic Series Complete!

Topic: [topic]
Strategy: [A/B/C/Combined]
Style: [style name]
Layout: [layout name or "varies"]
Location: [directory path]
Images: N total
```

## Image Modification

| Action | Steps |
|--------|-------|
| **Edit** | **Update prompt file FIRST** -> Regenerate with same session ID |
| **Add** | Specify position -> Create prompt -> Generate -> Renumber subsequent files (NN+1) -> Update outline |
| **Delete** | Remove files -> Renumber subsequent (NN-1) -> Update outline |

## Content Breakdown Principles

1. **Cover (Image 1)**: Hook + visual impact -> `sparse` layout
2. **Content (Middle)**: Core value per image -> `balanced`/`dense`/`list`/`comparison`/`flow`
3. **Ending (Last)**: CTA / summary -> `sparse` or `balanced`

## Artifact Handoff

**Output**: Xiaohongshu image series saved to:

- `openspec/runtime/deep-research/<slug>/images/xhs/` (if contract/deep-research mode)
- `xhs-images/<topic-slug>/` (standalone mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.
- Update with:
  - `stage`: `visual-content`
  - `outputs.xhs_images_dir`: xhs images directory path
  - `next.command`: `/content-utilities:compress-image`
  - `next.input`: xhs images directory path

## References

**Elements**: `elements/canvas.md` | `elements/image-effects.md` | `elements/typography.md` | `elements/decorations.md`
**Presets**: `presets/<name>.md`
**Workflows**: `workflows/analysis-framework.md` | `workflows/outline-template.md` | `workflows/prompt-assembly.md` | `workflows/style-selection.md`
**Config**: `config/preferences-schema.md` | `config/first-time-setup.md` | `config/watermark-guide.md`

## Notes

- Auto-retry once on failure | Cartoon alternatives for sensitive figures
- Use confirmed language preference | Maintain style consistency
- **Two confirmation points required** (Steps 2 & 4) - do not skip
