---
name: content-repurposer
description: Transform content across platforms and formats. Use when user asks to "repurpose", "reformat", "cross-post", "convert article to tweets", or adapt content for different platforms.
---

# Content Repurposer

Core engine for cross-platform content transformation.

## Preferences (EXTEND.md)

Use Bash to check EXTEND.md existence (priority order):

```bash
# Check project-level first
test -f .content-skills/content-repurposer/EXTEND.md && echo "project"

# Then user-level (cross-platform: $HOME works on macOS/Linux/WSL)
test -f "$HOME/.content-skills/content-repurposer/EXTEND.md" && echo "user"
```

┌────────────────────────────────────────────────────────────┬───────────────────┐
│                            Path                            │     Location      │
├────────────────────────────────────────────────────────────┼───────────────────┤
│ .content-skills/content-repurposer/EXTEND.md              │ Project directory │
├────────────────────────────────────────────────────────────┼───────────────────┤
│ $HOME/.content-skills/content-repurposer/EXTEND.md        │ User home         │
└────────────────────────────────────────────────────────────┴───────────────────┘

┌───────────┬───────────────────────────────────────────────────────────────────────────┐
│  Result   │                                  Action                                   │
├───────────┼───────────────────────────────────────────────────────────────────────────┤
│ Found     │ Read, parse, apply settings                                               │
├───────────┼───────────────────────────────────────────────────────────────────────────┤
│ Not found │ Use defaults                                                              │
└───────────┴───────────────────────────────────────────────────────────────────────────┘

**EXTEND.md Supports**: Default target formats | Brand voice | Platform accounts | Hashtag preferences

## Input Processing

1. Read source content (file or URL — if URL, use WebFetch)
2. Extract: title, key points, data/stats, quotes, CTAs
3. Assess content type: tutorial, opinion, news, analysis, case study

## Transform Rules by Target Format

### Tweet Thread

- Max 8 tweets per thread
- First tweet: strongest hook + core insight
- Each tweet: one idea, under 260 chars (leave room for threading)
- Last tweet: CTA + relevant hashtags (max 3)
- Use line breaks for readability
- Numbered format: 1/N, 2/N...

### XHS Note

- Title: 20 chars max, emoji bookends, curiosity-driven
- Opening: relatable pain point or surprising fact
- Body: bullet points with emojis, casual tone
- Include 3-5 topic tags at the end
- Tone: personal, warm, conversational
- Length: 300-800 chars

### WeChat Summary

- Professional structured format
- Bold key takeaways
- Pull quotes for emphasis
- Clean paragraph structure
- Include CTA at the end
- Length: 500-1500 chars

### LinkedIn Post

- Professional insight-driven opening
- Storytelling structure: hook → context → insight → takeaway
- End with engagement question
- 3-5 relevant hashtags
- Length: 500-1300 chars

### Short Video Script

- Duration: 60-90 seconds
- Format: `[VISUAL] | [NARRATION] | [TEXT OVERLAY]` table
- Hook in first 3 seconds
- 3-5 key scenes
- End with CTA

## Output Format

For each target format, output a markdown file:

```markdown
# [Format Name] — [Source Title]

## Metadata
- Source: [original file/URL]
- Generated: [date]
- Platform: [target platform]
- Estimated engagement: [high/medium/low based on content type fit]

## Content

[transformed content here]

## Platform Tips

[2-3 specific tips for posting this content on the target platform]
```

## Quality Checks

- No content should exceed platform limits
- Key message preserved across all formats
- Each format has distinct voice (not just length adjustment)
- Facts and data remain accurate
- Links and references adapted per platform

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.
