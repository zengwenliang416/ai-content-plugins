---
name: vc-comic
description: "Create a knowledge comic from article content with multiple art styles and tones"
arguments:
  - name: input
    description: "Article file path or pipeline.openspec.json"
---

# Knowledge Comic Creator

Create original knowledge comics with flexible art style x tone combinations.

## Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other steps and BEFORE asking the user for input.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.article_md` (fallback `outputs.analysis_md`).
   - If `$ARGUMENTS` is an article path, use it directly.
   - Then skip to Language Selection.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.article_md` and `outputs.analysis_md`.

3. **Auto-scan legacy article assets**:

```bash
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/analysis.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下文章素材，请选择要生成知识漫画的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for article content or file path.

## Language Selection (MANDATORY — after upstream detection)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Options

### Visual Dimensions

| Option | Values | Description |
|--------|--------|-------------|
| `--art` | ligne-claire (default), manga, realistic, ink-brush, chalk | Art style / rendering technique |
| `--tone` | neutral (default), warm, dramatic, romantic, energetic, vintage, action | Mood / atmosphere |
| `--layout` | standard (default), cinematic, dense, splash, mixed, webtoon | Panel arrangement |
| `--aspect` | 3:4 (default, portrait), 4:3 (landscape), 16:9 (widescreen) | Page aspect ratio |
| `--lang` | auto (default), zh, en, ja, etc. | Output language |

### Partial Workflow Options

| Option | Description |
|--------|-------------|
| `--storyboard-only` | Generate storyboard only, skip prompts and images |
| `--prompts-only` | Generate storyboard + prompts, skip images |
| `--images-only` | Generate images from existing prompts directory |
| `--regenerate N` | Regenerate specific page(s) only (e.g., `3` or `2,5,8`) |

Details: [references/partial-workflows.md](references/partial-workflows.md)

### Art Styles

| Style | Description |
|-------|-------------|
| `ligne-claire` | Uniform lines, flat colors, European comic tradition (Tintin, Logicomix) |
| `manga` | Large eyes, manga conventions, expressive emotions |
| `realistic` | Digital painting, realistic proportions, sophisticated |
| `ink-brush` | Chinese brush strokes, ink wash effects |
| `chalk` | Chalkboard aesthetic, hand-drawn warmth |

### Tones

| Tone | Description |
|------|-------------|
| `neutral` | Balanced, rational, educational |
| `warm` | Nostalgic, personal, comforting |
| `dramatic` | High contrast, intense, powerful |
| `romantic` | Soft, beautiful, decorative elements |
| `energetic` | Bright, dynamic, exciting |
| `vintage` | Historical, aged, period authenticity |
| `action` | Speed lines, impact effects, combat |

### Preset Shortcuts

| Preset | Equivalent | Special Rules |
|--------|-----------|---------------|
| `--style ohmsha` | `--art manga --tone neutral` | Visual metaphors, NO talking heads, gadget reveals |
| `--style wuxia` | `--art ink-brush --tone action` | Qi effects, combat visuals, atmospheric elements |
| `--style shoujo` | `--art manga --tone romantic` | Decorative elements, eye details, romantic beats |

### Compatibility Matrix

| Art Style | Best | Works | Avoid |
|-----------|------|-------|-------|
| ligne-claire | neutral, warm | dramatic, vintage, energetic | romantic, action |
| manga | neutral, romantic, energetic, action | warm, dramatic | vintage |
| realistic | neutral, warm, dramatic, vintage | action | romantic, energetic |
| ink-brush | neutral, dramatic, action, vintage | warm | romantic, energetic |
| chalk | neutral, warm, energetic | vintage | dramatic, action, romantic |

Details: [references/auto-selection.md](references/auto-selection.md)

## Auto Selection

Content signals determine default art + tone + layout (or preset):

| Content Signals | Recommended |
|-----------------|-------------|
| Tutorial, how-to, programming, educational | **ohmsha** preset |
| Pre-1950, classical, ancient | realistic + vintage |
| Personal story, mentor | ligne-claire + warm |
| Martial arts, wuxia | **wuxia** preset |
| Romance, school life | **shoujo** preset |
| Biography, balanced | ligne-claire + neutral |

**When preset is recommended**: Load `references/presets/{preset}.md` and apply all special rules.

Details: [references/auto-selection.md](references/auto-selection.md)

## Script Directory

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`
2. Script path = `${SKILL_DIR}/scripts/<script-name>.ts`
3. Replace all `${SKILL_DIR}` in this document with the actual path

| Script | Purpose |
|--------|---------|
| `scripts/merge-to-pdf.ts` | Merge comic pages into PDF |

## File Structure

Output directory: `comic/{topic-slug}/`
- Slug: 2-4 words kebab-case from topic (e.g., `alan-turing-bio`)
- Conflict: append timestamp (e.g., `turing-story-20260118-143052`)

**Contents**:
| File | Description |
|------|-------------|
| `source-{slug}.{ext}` | Source files |
| `analysis.md` | Content analysis |
| `storyboard.md` | Storyboard with panel breakdown |
| `characters/characters.md` | Character definitions |
| `characters/characters.png` | Character reference sheet |
| `prompts/NN-{cover\|page}-[slug].md` | Generation prompts |
| `NN-{cover\|page}-[slug].png` | Generated images |
| `{topic-slug}.pdf` | Final merged PDF |

## Language Handling

**Detection Priority**:
1. `--lang` flag (explicit)
2. EXTEND.md `language` setting
3. User's conversation language
4. Source content language

**Rule**: Use user's input language or saved language preference for ALL interactions.
Technical terms remain in English.

## Workflow

### Progress Checklist

```
Comic Progress:
- [ ] Step 1: Setup & Analyze
  - [ ] 1.1 Preferences (EXTEND.md) BLOCKING
    - [ ] Found -> load preferences -> continue
    - [ ] Not found -> run first-time setup -> MUST complete before other steps
  - [ ] 1.2 Analyze, 1.3 Check existing
- [ ] Step 2: Confirmation - Style & options REQUIRED
- [ ] Step 3: Generate storyboard + characters
- [ ] Step 4: Review outline (conditional)
- [ ] Step 5: Generate prompts
- [ ] Step 6: Review prompts (conditional)
- [ ] Step 7: Generate images CHARACTER REF REQUIRED
  - [ ] 7.1 Generate character sheet FIRST -> characters/characters.png
  - [ ] 7.2 Generate pages WITH --ref characters/characters.png
- [ ] Step 8: Merge to PDF
- [ ] Step 9: Completion report
```

### Flow

```
Input -> [Preferences] -- Found -> Continue
                       |
                       -- Not found -> First-Time Setup BLOCKING
                                       |
                                       -- Complete setup -> Save EXTEND.md -> Continue
                                                                               |
        <--------------------------------------------------------------
        |
Analyze -> [Check Existing?] -> [Confirm: Style + Reviews] -> Storyboard -> [Review?] -> Prompts -> [Review?] -> Images -> PDF -> Complete
```

### EXTEND.md Paths (BLOCKING)

**CRITICAL**: If EXTEND.md not found, MUST complete first-time setup before ANY other questions or steps.

| Path | Location |
|------|----------|
| `.content-skills/knowledge-comic/EXTEND.md` | Project directory |
| `$HOME/.content-skills/knowledge-comic/EXTEND.md` | User home |

| Result | Action |
|--------|--------|
| Found | Read, parse, display summary -> Continue |
| Not found | BLOCKING: Run first-time setup ONLY ([references/config/first-time-setup.md](references/config/first-time-setup.md)) -> Complete and save EXTEND.md -> Then continue |

**EXTEND.md Supports**: Watermark | Preferred art/tone/layout | Custom style definitions | Character presets | Language preference

Schema: [references/config/preferences-schema.md](references/config/preferences-schema.md)

### Step 7: Image Generation (CRITICAL)

**Character reference is MANDATORY for visual consistency.**

**7.1 Generate character sheet first**:
- **Backup rule**: If `characters/characters.png` exists, rename to `characters/characters-backup-YYYYMMDD-HHMMSS.png`
```bash
# Use Reference Sheet Prompt from characters/characters.md
npx -y bun ${SKILL_DIR}/../vc-ai-image-gen/scripts/main.ts \
  --promptfiles characters/characters.md \
  --image characters/characters.png --ar 4:3
```

**Compress character sheet** (recommended):
Compress to reduce token usage when used as reference image:
- Use available image compression skill (if any)
- Or system tools: `pngquant`, `optipng`, `sips` (macOS)
- **Keep PNG format**, lossless compression preferred

**7.2 Generate each page WITH character reference**:

| Skill Capability | Strategy |
|------------------|----------|
| Supports `--ref` | Pass `characters/characters.png` with EVERY page |
| No `--ref` support | Prepend character descriptions to EVERY prompt file |

**Backup rules for page generation**:
- If prompt file exists: rename to `prompts/NN-{cover|page}-[slug]-backup-YYYYMMDD-HHMMSS.md`
- If image file exists: rename to `NN-{cover|page}-[slug]-backup-YYYYMMDD-HHMMSS.png`

```bash
# ALWAYS include --ref for consistency
npx -y bun ${SKILL_DIR}/../vc-ai-image-gen/scripts/main.ts \
  --promptfiles prompts/01-page-xxx.md \
  --image 01-page-xxx.png --ar 3:4 \
  --ref characters/characters.png
```

**Full workflow details**: [references/workflow.md](references/workflow.md)

## Page Modification

| Action | Steps |
|--------|-------|
| **Edit** | **Update prompt file FIRST** -> `--regenerate N` -> Regenerate PDF |
| **Add** | Create prompt at position -> Generate with character ref -> Renumber subsequent -> Update storyboard -> Regenerate PDF |
| **Delete** | Remove files -> Renumber subsequent -> Update storyboard -> Regenerate PDF |

## Artifact Handoff

**Output**: Knowledge comic assets saved to:

- `openspec/runtime/deep-research/<slug>/images/comic/` (if contract/deep-research mode)
- `comic/<topic-slug>/` (standalone mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.
- Update with:
  - `stage`: `visual-content`
  - `outputs.comic_dir`: knowledge comic directory path
  - `next.command`: `/content-utilities:markdown-to-html`
  - `next.input`: existing article markdown path

## References

**Core Templates**:
- [analysis-framework.md](references/analysis-framework.md)
- [character-template.md](references/character-template.md)
- [storyboard-template.md](references/storyboard-template.md)
- [ohmsha-guide.md](references/ohmsha-guide.md)

**Style Definitions**:
- `references/art-styles/` - Art styles
- `references/tones/` - Tones
- `references/presets/` - Presets with special rules
- `references/layouts/` - Layouts

**Workflow**:
- [workflow.md](references/workflow.md)
- [auto-selection.md](references/auto-selection.md)
- [partial-workflows.md](references/partial-workflows.md)

**Config**:
- [config/preferences-schema.md](references/config/preferences-schema.md)
- [config/first-time-setup.md](references/config/first-time-setup.md)
- [config/watermark-guide.md](references/config/watermark-guide.md)

## Notes

- Image generation: 10-30 seconds per page
- Auto-retry once on generation failure
- Use stylized alternatives for sensitive public figures
- Maintain style consistency via session ID
- **Step 2 confirmation required** - do not skip
- **Steps 4/6 conditional** - only if user requested in Step 2
- **Step 7.1 character sheet MUST be generated before pages**
- **Step 7.2 EVERY page MUST reference characters** - use `--ref` or embed descriptions
- Watermark/language configured once in EXTEND.md
