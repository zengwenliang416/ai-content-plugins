---
name: ca-template
description: "Create a reusable content template for a specific content type"
arguments:
  - name: input
    description: "Content type, reference path, or pipeline.openspec.json"
---

# Content Template Creator

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read it first and prioritize `outputs.benchmark_md`, then `outputs.competitor_md`, then `inputs.content_type`.
   - If `$ARGUMENTS` is content type or a reference path, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.benchmark_md`, `outputs.competitor_md`, and `inputs.content_type`.

3. **Auto-scan legacy template inputs**:

```bash
ls -t openspec/runtime/benchmark/*.md 2>/dev/null | head -3
ls -t openspec/runtime/competitor/*.md 2>/dev/null | head -3
ls -t openspec/runtime/templates/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下模板设计素材，请选择要用于模板生成的输入：" with files as options.

4. **No upstream found**: Only in this case, ask what content type needs a template.

## Step 2: Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Identify Content Type

If not specified, ask the user to choose or describe:

| Type | Description |
|------|-------------|
| Tutorial / How-to | Step-by-step instruction for completing a task |
| Explainer | Breaks down a complex concept for a non-expert audience |
| Review | Evaluates a product, tool, model, or paper |
| Comparison | Compares two or more options across defined criteria |
| News analysis | Explains the significance of a recent development |
| Opinion / Take | Argues a point of view on a topic |
| List / Roundup | Curated collection with brief descriptions |
| Case study | Deep-dive into a specific example or project |
| Interview | Q&A with a person or team |
| Research summary | Distills findings from a paper or study |

Also confirm:
- **Platform**: Blog, newsletter, YouTube script, Twitter/X thread, LinkedIn post, podcast outline
- **Target audience**: Technical experts, general public, practitioners, students
- **Typical length**: Short (<500 words), medium (500-1500), long (1500+)

## Step 4: Analyze Successful Examples

Use web search or user-provided examples to find 3-5 high-performing pieces of this content type in the relevant niche:
- Note what structure they follow
- Identify what all of them have in common
- Note where they differ (this indicates flexibility points in the template)

## Step 5: Extract Structural Pattern

From the examples, identify:
- **Opening**: How do top performers start? (Hook type: question, stat, story, bold claim)
- **Setup**: What context is established before diving in?
- **Core sections**: What are the 3-6 essential sections? In what order?
- **Evidence pattern**: How are claims typically supported?
- **Transitions**: How are sections connected?
- **Closing**: CTA type, summary style, next-step suggestion?

## Step 6: Create Reusable Template

Produce a markdown template with:
- `[PLACEHOLDERS]` for content-specific values
- `<!-- NOTES: -->` for guidance on each section
- Optional sections marked `[OPTIONAL]`
- Estimated word/time targets per section

Template format:
```markdown
# [TITLE: Primary keyword + hook element]

<!-- NOTES: Title should contain primary keyword in first 3 words for SEO. Aim for 60 chars or less. -->

## Hook
[OPENING SENTENCE: Start with a statistic, question, or surprising claim that directly relates to what the reader wants to know.]

<!-- NOTES: 1-3 sentences. Goal: make the reader feel this piece is exactly for them. -->

## Setup / Context
[BRIEF CONTEXT: Why this topic matters right now. What changed or what problem exists.]

<!-- NOTES: 2-4 sentences. Don't explain what you're about to explain — just ground the reader. -->

## [SECTION 1: Core topic or first step]
[CONTENT]

<!-- NOTES: [Guidance specific to this section] -->

## [SECTION 2]
...

## Conclusion / Takeaway
[KEY INSIGHT or SUMMARY: One clear takeaway the reader should leave with.]

[CALL TO ACTION: What should the reader do next?]
```

## Output

A markdown template file ready to fill in, including:
- Complete section structure with placeholders
- Section-level notes explaining purpose and guidance
- Estimated length targets
- Optional sections clearly marked
- Example fill-ins for one or two sections to illustrate intent

## Important Notes

- Templates should be flexible enough to reuse but specific enough to be useful — avoid templates so generic they provide no guidance
- If the user has an existing piece that performed well, analyze it and extract the template from that rather than from external examples
- Label every placeholder consistently: `[PLACEHOLDER_DESCRIPTION]`
- Note which sections are mandatory vs. optional clearly

## Artifact Handoff

**Output**: Template saved to:
- `openspec/runtime/templates/YYYY-MM-DD-<content-type>-template.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/template.md` (if contract/deep-research mode)

**Next step**: Suggest running content production using the generated template as structural guidance.
