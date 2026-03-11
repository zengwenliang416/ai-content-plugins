---
name: vc-slide-deck
description: "Generate a slide deck with professional visual styles from content"
arguments:
  - name: input
    description: "Content file path or pipeline.openspec.json"
---

# Slide Deck Generator

Transform content into professional slide deck images.

## Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other steps and BEFORE asking the user for input.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.analysis_md`, then `outputs.article_md`.
   - If `$ARGUMENTS` is a content path, use it directly.
   - Then skip to Language Selection.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.analysis_md` and `outputs.article_md`.

3. **Auto-scan legacy presentation assets**:

```bash
ls -t openspec/runtime/deep-research/*/analysis.md 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下演示素材，请选择要用于生成幻灯片的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for content or topic for the slide deck.

## Language Selection (MANDATORY — after upstream detection)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Script Directory

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`
2. Script path = `${SKILL_DIR}/scripts/<script-name>.ts`

| Script | Purpose |
|--------|---------|
| `scripts/merge-to-pptx.ts` | Merge slides into PowerPoint |
| `scripts/merge-to-pdf.ts` | Merge slides into PDF |

## Options

| Option | Description |
|--------|-------------|
| `--style <name>` | Visual style: preset name, `custom`, or custom style name |
| `--audience <type>` | Target: beginners, intermediate, experts, executives, general |
| `--lang <code>` | Output language (en, zh, ja, etc.) |
| `--slides <number>` | Target slide count (8-25 recommended, max 30) |
| `--outline-only` | Generate outline only, skip image generation |
| `--prompts-only` | Generate outline + prompts, skip images |
| `--images-only` | Generate images from existing prompts directory |
| `--regenerate <N>` | Regenerate specific slide(s): `--regenerate 3` or `--regenerate 2,5,8` |

**Slide Count by Content Length**:
| Content | Slides |
|---------|--------|
| < 1000 words | 5-10 |
| 1000-3000 words | 10-18 |
| 3000-5000 words | 15-25 |
| > 5000 words | 20-30 (consider splitting) |

## Style System

### Presets

| Preset | Dimensions | Best For |
|--------|------------|----------|
| `blueprint` (Default) | grid + cool + technical + balanced | Architecture, system design |
| `chalkboard` | organic + warm + handwritten + balanced | Education, tutorials |
| `corporate` | clean + professional + geometric + balanced | Investor decks, proposals |
| `minimal` | clean + neutral + geometric + minimal | Executive briefings |
| `sketch-notes` | organic + warm + handwritten + balanced | Educational, tutorials |
| `watercolor` | organic + warm + humanist + minimal | Lifestyle, wellness |
| `dark-atmospheric` | clean + dark + editorial + balanced | Entertainment, gaming |
| `notion` | clean + neutral + geometric + dense | Product demos, SaaS |
| `bold-editorial` | clean + vibrant + editorial + balanced | Product launches, keynotes |
| `editorial-infographic` | clean + cool + editorial + dense | Tech explainers, research |
| `fantasy-animation` | organic + vibrant + handwritten + minimal | Educational storytelling |
| `intuition-machine` | clean + cool + technical + dense | Technical docs, academic |
| `pixel-art` | pixel + vibrant + technical + balanced | Gaming, developer talks |
| `scientific` | clean + cool + technical + dense | Biology, chemistry, medical |
| `vector-illustration` | clean + vibrant + humanist + balanced | Creative, children's content |
| `vintage` | paper + warm + editorial + balanced | Historical, heritage |

### Style Dimensions

| Dimension | Options | Description |
|-----------|---------|-------------|
| **Texture** | clean, grid, organic, pixel, paper | Visual texture and background treatment |
| **Mood** | professional, warm, cool, vibrant, dark, neutral | Color temperature and palette style |
| **Typography** | geometric, humanist, handwritten, editorial, technical | Headline and body text styling |
| **Density** | minimal, balanced, dense | Information density per slide |

Full specs: `references/dimensions/*.md`

### Auto Style Selection

| Content Signals | Preset |
|-----------------|--------|
| tutorial, learn, education, guide, beginner | `sketch-notes` |
| classroom, teaching, school, chalkboard | `chalkboard` |
| architecture, system, data, analysis, technical | `blueprint` |
| creative, children, kids, cute | `vector-illustration` |
| briefing, academic, research, bilingual | `intuition-machine` |
| executive, minimal, clean, simple | `minimal` |
| saas, product, dashboard, metrics | `notion` |
| investor, quarterly, business, corporate | `corporate` |
| launch, marketing, keynote, magazine | `bold-editorial` |
| entertainment, music, gaming, atmospheric | `dark-atmospheric` |
| explainer, journalism, science communication | `editorial-infographic` |
| story, fantasy, animation, magical | `fantasy-animation` |
| gaming, retro, pixel, developer | `pixel-art` |
| biology, chemistry, medical, scientific | `scientific` |
| history, heritage, vintage, expedition | `vintage` |
| lifestyle, wellness, travel, artistic | `watercolor` |
| Default | `blueprint` |

## Design Philosophy

Decks designed for **reading and sharing**, not live presentation:
- Each slide self-explanatory without verbal commentary
- Logical flow when scrolling
- All necessary context within each slide
- Optimized for social media sharing

See `references/design-guidelines.md` and `references/layouts.md` for details.

## File Structure

```
slide-deck/{topic-slug}/
├── source-{slug}.{ext}
├── outline.md
├── prompts/
│   └── 01-slide-cover.md, 02-slide-{slug}.md, ...
├── 01-slide-cover.png, 02-slide-{slug}.png, ...
├── {topic-slug}.pptx
└── {topic-slug}.pdf
```

**Slug**: 2-4 words, kebab-case. **Conflict**: See Step 1.3 for existing content detection.

## Language Handling

**Detection Priority**:
1. `--lang` flag (explicit)
2. EXTEND.md `language` setting
3. User's conversation language
4. Source content language

**Rule**: ALL responses use user's preferred language. Technical terms remain in English.

## Workflow

### Progress Checklist

```
Slide Deck Progress:
- [ ] Step 1: Setup & Analyze
  - [ ] 1.1 Load preferences
  - [ ] 1.2 Analyze content
  - [ ] 1.3 Check existing REQUIRED
- [ ] Step 2: Confirmation REQUIRED (Round 1, optional Round 2)
- [ ] Step 3: Generate outline
- [ ] Step 4: Review outline (conditional)
- [ ] Step 5: Generate prompts
- [ ] Step 6: Review prompts (conditional)
- [ ] Step 7: Generate images
- [ ] Step 8: Merge to PPTX/PDF
- [ ] Step 9: Output summary
```

### Flow

```
Input -> Preferences -> Analyze -> [Check Existing?] -> Confirm (1-2 rounds) -> Outline -> [Review Outline?] -> Prompts -> [Review Prompts?] -> Images -> Merge -> Complete
```

### Step 1: Setup & Analyze

**1.1 Load Preferences (EXTEND.md)**

```bash
test -f .content-skills/slide-generator/EXTEND.md && echo "project"
test -f "$HOME/.content-skills/slide-generator/EXTEND.md" && echo "user"
```

| Result | Action |
|--------|--------|
| Found | Read, parse, output summary to user |
| Not found | First-time setup or proceed with defaults |

**EXTEND.md Supports**: Preferred style | Custom dimensions | Default audience | Language preference | Review preference

Schema: `references/config/preferences-schema.md`

**1.2 Analyze Content**

1. Save source content (if pasted, save as `source.md`)
   - **Backup rule**: If `source.md` exists, rename to `source-backup-YYYYMMDD-HHMMSS.md`
2. Follow `references/analysis-framework.md` for content analysis
3. Analyze content signals for style recommendations
4. Detect source language
5. Determine recommended slide count
6. Generate topic slug from content

**1.3 Check Existing Content (REQUIRED)**

```bash
test -d "slide-deck/{topic-slug}" && echo "exists"
```

If directory exists, ask the user:
- Regenerate outline
- Regenerate images
- Backup and regenerate
- Exit

**Save to `analysis.md`** with: topic, audience, content signals, recommended style, slide count, language.

### Step 2: Confirmation (REQUIRED)

**Two-round confirmation**: Round 1 always, Round 2 only if "Custom dimensions" selected.

**Round 1** - 5 questions:
1. **Style**: Recommended preset, alternative, or Custom dimensions
2. **Audience**: General readers, beginners, experts, executives
3. **Slide Count**: Recommended, fewer, or more
4. **Review Outline**: Yes or skip
5. **Review Prompts**: Yes or skip

**Round 2** (only if "Custom dimensions" selected) - 4 dimension questions:
1. Texture: clean, grid, organic, pixel
2. Mood: professional, warm, cool, vibrant
3. Typography: geometric, humanist, handwritten, editorial
4. Density: minimal, balanced, dense

### Step 3: Generate Outline

**Style Resolution**:
- If preset selected -> Read `references/styles/{preset}.md`
- If custom dimensions -> Read dimension files from `references/dimensions/` and combine

1. Follow `references/outline-template.md` for structure
2. Build STYLE_INSTRUCTIONS from style or dimensions
3. Apply confirmed audience, language, slide count
4. Save as `outline.md`

### Step 4: Review Outline (Conditional)

**Skip** if user selected "No, skip outline review" in Step 2.

Display slide-by-slide summary table and ask: proceed, edit, or regenerate.

### Step 5: Generate Prompts

1. Read `references/base-prompt.md`
2. For each slide: extract STYLE_INSTRUCTIONS, add slide-specific content, include layout guidance
3. Save to `prompts/`
   - **Backup rule**: If prompt file exists, rename with backup timestamp

### Step 6: Review Prompts (Conditional)

**Skip** if user selected "No, skip prompt review" in Step 2.

Display prompt list and ask: proceed, edit, or regenerate.

### Step 7: Generate Images

1. Select available image generation skill
2. Generate session ID: `slides-{topic-slug}-{timestamp}`
3. For each slide:
   - **Backup rule**: If image file exists, rename with backup timestamp
   - Generate image sequentially with same session ID
4. Report progress
5. Auto-retry once on failure

### Step 8: Merge to PPTX and PDF

```bash
npx -y bun ${SKILL_DIR}/scripts/merge-to-pptx.ts <slide-deck-dir>
npx -y bun ${SKILL_DIR}/scripts/merge-to-pdf.ts <slide-deck-dir>
```

### Step 9: Output Summary

Report: topic, style, location, slide count, files created.

## Partial Workflows

| Option | Workflow |
|--------|----------|
| `--outline-only` | Steps 1-3 only |
| `--prompts-only` | Steps 1-5 |
| `--images-only` | Skip to Step 7 (requires existing prompts/) |
| `--regenerate N` | Regenerate specific slide(s) only |

## Slide Modification

| Action | Steps |
|--------|-------|
| **Edit** | **Update prompt file FIRST** -> Regenerate image -> Regenerate PDF |
| **Add** | Create prompt -> Generate image -> Renumber subsequent -> Update outline -> Regenerate PDF |
| **Delete** | Remove files -> Renumber subsequent -> Update outline -> Regenerate PDF |

**File Naming**: `NN-slide-[slug].png` — only NN changes during renumbering, slugs remain unchanged.

## Artifact Handoff

**Output**: Slide deck saved to:

- `openspec/runtime/deep-research/<slug>/slides/slide-deck.pptx` (if contract/deep-research mode)
- `slide-deck/<topic-slug>/slide-deck.pptx` (standalone mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.
- Update with:
  - `stage`: `visual-content`
  - `outputs.slide_deck_path`: slide deck path
  - `next.command`: `none`
  - `next.input`: `none`

## References

| File | Content |
|------|---------|
| `references/analysis-framework.md` | Content analysis for presentations |
| `references/outline-template.md` | Outline structure and format |
| `references/modification-guide.md` | Edit, add, delete slide workflows |
| `references/content-rules.md` | Content and style guidelines |
| `references/design-guidelines.md` | Audience, typography, colors, visual elements |
| `references/layouts.md` | Layout options and selection tips |
| `references/base-prompt.md` | Base prompt for image generation |
| `references/dimensions/*.md` | Dimension specifications |
| `references/styles/<style>.md` | Full style specifications |
| `references/config/preferences-schema.md` | EXTEND.md structure |

## Notes

- Image generation: 10-30 seconds per slide
- Auto-retry once on generation failure
- Use stylized alternatives for sensitive public figures
- Maintain style consistency via session ID
- **Step 2 confirmation required** - do not skip
- **Step 4 conditional** - only if user requested outline review
- **Step 6 conditional** - only if user requested prompt review
