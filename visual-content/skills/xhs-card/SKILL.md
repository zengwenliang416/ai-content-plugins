---
name: xhs-card
description: Renders Markdown into styled Xiaohongshu card images via HTML/CSS + Puppeteer screenshot. Multiple CSS themes, auto-sliced into 1242x1660px pages. Use when user mentions "小红书图片", "XHS images", "RedNote cards", "小红书种草", or wants social media cards for Chinese platforms.
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
---

# Xiaohongshu Card Generator

Render Markdown into styled card images for Xiaohongshu. Pipeline: Markdown → HTML (CSS theme) → Puppeteer screenshot → auto-sliced PNG pages.

## Usage

```bash
# Auto-detect upstream article, default style
/xhs-card

# Specify markdown file
/xhs-card posts/ai-future/article.md

# Specify style
/xhs-card posts/ai-future/article.md --style bold

# Direct content input
/xhs-card
[paste content]
```

## Options

| Option           | Description                          |
| ---------------- | ------------------------------------ |
| `--style <name>` | CSS theme (see Theme Gallery)        |
| `--output <dir>` | Custom output directory              |

## Runtime Requirements

- Node.js available in PATH
- A Puppeteer runtime via local install (`puppeteer` / `puppeteer-core`) or `XHS_CARD_PUPPETEER_PATH`
- Chrome / Chromium installed locally, or `XHS_CARD_CHROME_PATH` set explicitly

## Theme Gallery

| Theme      | Vibe                                    | Best For                                        |
| ---------- | --------------------------------------- | ----------------------------------------------- |
| `bold`     | Dark background, neon accents, high contrast | Data-heavy, tech analysis, warnings, rankings   |
| `notion`   | Clean white, Notion-like, professional  | Knowledge sharing, tutorials, SaaS content      |
| `minimal`  | Warm stone, ultra-elegant, thin typography | Premium content, thought leadership, essays     |
| `cute`     | Pink, playful, emoji-friendly           | Lifestyle, beauty, personal stories, 种草        |

## Auto Theme Selection

| Content Signals                                | Theme      |
| ---------------------------------------------- | ---------- |
| Data, rankings, tech analysis, warnings        | `bold`     |
| Knowledge, tutorials, productivity, SaaS       | `notion`   |
| Thought leadership, essays, premium, editorial | `minimal`  |
| Lifestyle, beauty, personal stories, 种草       | `cute`     |

## Canvas

- **Size**: 1242 x 1660px @2x (3:4 portrait, standard XHS ratio)
- **Slicing**: Content auto-flows and is sliced into pages at 1660px boundaries
- **Format**: PNG

## File Structure

Output directory depends on input source (see `docs/artifact-conventions.md`):

### Pipeline Mode

When source article is from `openspec/runtime/deep-research/<slug>/`:

```
openspec/runtime/deep-research/<slug>/visuals/xhs/
├── page-01.png
├── page-02.png
└── page-NN.png
```

### Standalone Mode

When source is user-provided file or pasted content:

```
openspec/runtime/visuals/xhs/{topic-slug}/
├── page-01.png
├── page-02.png
└── page-NN.png
```

### Output Path Resolution

```
Input path contains "openspec/runtime/deep-research/" ?
  → YES: Pipeline mode → openspec/runtime/deep-research/<slug>/visuals/xhs/
  → NO:  Standalone mode → openspec/runtime/visuals/xhs/{topic-slug}/
```

**Slug Generation**:

1. Extract main topic from content (2-4 words, kebab-case)
2. Example: "AI工具推荐" → `ai-tools-recommend`

**Conflict Resolution**:
If target directory already exists, append timestamp: `{topic-slug}-YYYYMMDD-HHMMSS`

## Upstream Artifact Detection

> **CONSTRAINT -- Upstream Artifact Auto-Detection is MANDATORY**:
> Before asking the user for input, you MUST first scan for existing upstream artifacts.
> If exactly one recent article is found, load it automatically and inform the user.
> Only ask the user when NO upstream artifact is found or when multiple candidates exist.

**When no content path is provided**, run this scan BEFORE any user interaction:

```bash
# Scan for recent articles (within 3 days)
find openspec/runtime/deep-research/ -name "article.md" -mtime -3 2>/dev/null
find openspec/runtime/articles/ -name "*.md" -mtime -3 2>/dev/null
```

| Found       | Action                                                                |
| ----------- | --------------------------------------------------------------------- |
| 0 articles  | Proceed with direct content input (ask user or accept pasted content) |
| 1 article   | Auto-load, inform user which article was found, proceed to Step 0     |
| 2+ articles | List candidates (max 5), ask user to choose, then proceed             |

**When content path IS provided**: Use it directly. If path is inside `openspec/runtime/deep-research/`, enable pipeline mode output path.

## Workflow

### Progress Checklist

```
XHS Card Progress:
- [ ] Pre-flight: Upstream artifact scan (if no path provided)
- [ ] Step 0: Check preferences (EXTEND.md)
  - [ ] Found → load preferences → continue
  - [ ] Not found → run first-time setup → MUST complete before Step 1
- [ ] Step 1: Find or receive markdown source
- [ ] Step 2: Confirm style choice
- [ ] Step 3: Run script → generate PNG pages
- [ ] Step 4: Report results
```

### Flow

```
[Pre-flight: Upstream Scan] ─┬─ Path provided → use directly
                             ├─ 1 article found → auto-load
                             ├─ N articles → ask user to choose
                             └─ 0 found → accept pasted content
                                    │
Input → [Step 0: Preferences] ─┬─ Found → Continue
                               └─ Not found → First-Time Setup → Save EXTEND.md → Continue
                                                                                      │
        ┌─────────────────────────────────────────────────────────────────────────────┘
        ↓
[Step 1: Source] → [Step 2: Confirm Style] → [Step 3: Run Script] → [Step 4: Report]
```

### Step 0: Load Preferences (EXTEND.md)

**Purpose**: Load user preferences or run first-time setup.

**CRITICAL**: If EXTEND.md not found, MUST complete first-time setup before ANY other questions or steps.

Use Bash to check EXTEND.md existence (priority order):

```bash
# Check project-level first
test -f .content-skills/xhs-card/EXTEND.md && echo "project"

# Then user-level
test -f "$HOME/.content-skills/xhs-card/EXTEND.md" && echo "user"
```

| Path                                         | Location          |
| -------------------------------------------- | ----------------- |
| `.content-skills/xhs-card/EXTEND.md`         | Project directory |
| `$HOME/.content-skills/xhs-card/EXTEND.md`   | User home         |

| Result    | Action                                                              |
| --------- | ------------------------------------------------------------------- |
| Found     | Read, parse, display summary → Continue to Step 1                   |
| Not found | Run first-time setup → Complete and save EXTEND.md → Then Step 1    |

**First-Time Setup** (when EXTEND.md not found):

**Language**: Use user's input language or saved language preference.

Use AskUserQuestion with ALL questions in ONE call. See `references/config/first-time-setup.md` for question details.

**EXTEND.md Supports**: Watermark | Preferred style | Language preference

Schema: `references/config/preferences-schema.md`

### Step 1: Find or Receive Markdown Source

Locate the markdown content to render.

**Actions**:

1. If user provides a file path: use as-is
2. If user pastes content: save to `source.md` in target directory
3. If auto-loaded from upstream: use the detected article path

No content analysis or outline generation needed -- the script handles rendering directly from markdown.

### Step 2: Confirm Style Choice

**Purpose**: Let user pick a CSS theme. One confirmation point.

**Display available themes** with descriptions and recommend based on content type:

```
Available themes:

  bold    — Dark background, neon accents, high contrast
             Best for: data-heavy, tech analysis, warnings, rankings

  notion  — Clean white, Notion-like, professional
             Best for: knowledge sharing, tutorials, SaaS content

  minimal — Warm stone, ultra-elegant, thin typography
             Best for: premium content, thought leadership, essays

  cute    — Pink, playful, emoji-friendly
             Best for: lifestyle, beauty, personal stories, 种草

  → Recommended: [theme] (based on content type)
```

**Use AskUserQuestion**:

- Show 4 themes with descriptions
- Pre-select recommended theme based on content signals (see Auto Theme Selection table)
- If user has `preferred_style` in EXTEND.md, use that as the recommendation instead

**After response**: Proceed to Step 3 with confirmed theme.

### Step 3: Run Script

Execute the rendering script:

```bash
node ${SKILL_DIR}/scripts/md-to-xhs.mjs <markdown_file> --style <theme> --output <output_dir>
```

Where:
- `${SKILL_DIR}` is the xhs-card skill directory (e.g., `visual-content/skills/xhs-card`)
- `<markdown_file>` is the path to the source markdown
- `<theme>` is the confirmed CSS theme name
- `<output_dir>` is the resolved output directory (pipeline or standalone mode)

**Watermark**: If enabled in EXTEND.md, the script applies the watermark automatically via the `--watermark` flag:

```bash
node ${SKILL_DIR}/scripts/md-to-xhs.mjs <markdown_file> --style <theme> --output <output_dir> --watermark "@username"
```

### Step 4: Completion Report

```
XHS Card Series Complete!

Topic: [topic]
Theme: [theme name]
Pages: N total
Location: [output directory]

Files:
- page-01.png
- page-02.png
- ...
- page-NN.png
```

Open the output folder for the user:

```bash
open <output_dir>
```

## Extension Support

Custom configurations via EXTEND.md. See **Step 0** for paths and supported options.
