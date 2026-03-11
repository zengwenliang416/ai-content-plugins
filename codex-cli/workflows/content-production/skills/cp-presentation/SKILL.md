---
name: cp-presentation
description: "Create content presentations and slide decks for talks, webinars, pitches, and educational content"
arguments:
  - name: input
    description: "Topic/title, source path, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read it first and prioritize `outputs.analysis_md`, then `outputs.article_md`, then `inputs.topic`.
   - If `$ARGUMENTS` is topic/title or source path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.analysis_md`, `outputs.article_md`, and `inputs.topic`.

3. **Auto-scan legacy presentation inputs**:

```bash
ls -t openspec/runtime/deep-research/*/analysis.md 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/presentation/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下演讲素材，请选择要用于演示文稿生成的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for subject, audience, format, and desired length.

## Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Core Workflow

### Clarify Requirements

- **Topic and thesis**: What is the core message of the presentation?
- **Audience**: Who is in the room and what do they already know?
- **Format**: Conference talk, webinar, pitch, internal briefing, educational module
- **Length**: Number of slides and/or speaking time
- **Template**: Existing brand template, or clean professional format?

### Presentation Structure

Standard structure for a 15-30 minute content presentation:

| Slide | Purpose |
|-------|---------|
| Title slide | Topic, presenter name, date |
| Agenda | 3-5 section overview |
| Problem / Why this matters | Hook the audience, establish stakes |
| Section 1: Context | Background the audience needs |
| Section 2-4: Main content | Core analysis, 1 key point per slide |
| Implications | What the audience should take away |
| What's next | Future outlook or recommended actions |
| Conclusion | Restate thesis, 3 key takeaways |
| Q&A / Contact | Open discussion, follow-up info |

Adjust slide count based on speaking time (1-2 minutes per content slide).

### Slide Design Principles

- **One idea per slide**: If a slide needs a header and sub-header to explain the point, split it
- **Bullets, not paragraphs**: Max 5 bullets per slide, max 10 words per bullet
- **Visuals over text**: Charts, diagrams, or images communicate faster than prose
- **Consistent layout**: Same font, same color scheme, same alignment throughout
- **Readable from the back of the room**: Min 24pt font for body text

### Output

- PowerPoint (.pptx) or Google Slides format
- Speaker notes for each slide (what to say, not what's on the slide)
- Optional: One-page handout summary of key points

## Artifact Handoff

**Output path**:

- `openspec/runtime/presentation/YYYY-MM-DD-<topic>-presentation.pptx` (standalone mode)
- `openspec/runtime/deep-research/<slug>/presentation/presentation.pptx` (pipeline mode)

**OpenSpec contract (MANDATORY)**:

- Standalone: create or update a stage-local `*.openspec.json` contract.
- Pipeline: update `pipeline.openspec.json` in-place with `stage: content-production`, `outputs.presentation_path`.

## Important Notes

- Slides support the speaker — they are not a document to be read independently
- If someone can read the slides without the speaker, the presentation is over-designed
- Start with the structure (outline) before designing any slides
- Always preview the full deck as an audience member before delivery
