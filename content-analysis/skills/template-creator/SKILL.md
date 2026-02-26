---
name: template-creator
description: Create reusable content templates for specific content types. Use when a user wants a repeatable structure for articles, videos, newsletters, or other content formats. Triggers include requests to create a template, build a content framework, design a repeatable structure for a content type, or develop a format that can be reused across multiple pieces.
---

# Content Template Creator

## Workflow

### Step 1: Identify Content Type

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

### Step 2: Analyze Successful Examples

Use web search or user-provided examples to find 3-5 high-performing pieces of this content type in the relevant niche:
- Note what structure they follow
- Identify what all of them have in common
- Note where they differ (this indicates flexibility points in the template)

### Step 3: Extract Structural Pattern

From the examples, identify:
- **Opening**: How do top performers start? (Hook type: question, stat, story, bold claim)
- **Setup**: What context is established before diving in?
- **Core sections**: What are the 3-6 essential sections? In what order?
- **Evidence pattern**: How are claims typically supported?
- **Transitions**: How are sections connected?
- **Closing**: CTA type, summary style, next-step suggestion?

### Step 4: Create Reusable Template

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
