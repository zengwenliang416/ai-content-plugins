---
name: infographic
description: Create visual summary cards and infographic layouts for social media, presentations, and editorial content. Triggers on "infographic", "visual summary", "one-pager", "card", "图片总结", "visual card".
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - AskUserQuestion
---

# Infographic

## Workflow

### Step 1: Gather Info

- Topic or subject of the infographic
- Key data points, statistics, or comparisons to include
- Items to compare (if comparison layout)
- Target platform (Instagram, Twitter/X, LinkedIn, presentation slide, print)
- Brand colors or style preferences (if any)

### Step 2: Choose Layout

Select the layout that best fits the content:

| Layout | Best For |
|--------|----------|
| **Comparison card** | Side-by-side comparison of 2-3 options |
| **Timeline** | Historical progression or process steps |
| **Flowchart** | Decision trees or process flows |
| **Stats overview** | 4-6 key numbers with context |
| **Checklist** | Actionable steps or feature list |
| **Ranked list** | Top N items with brief descriptions |

### Step 3: Structure Content for Visual Format

Apply these rules to strip content down to visual density:

- **Limit text**: Max 10 words per label, max 3 lines per section
- **Lead with numbers**: "47%" is stronger than "nearly half"
- **Use bullet points**: Never full sentences in visual cells
- **Hierarchy**: Title → Section headers → Data points → Source
- **One insight per visual element**: Don't crowd multiple ideas into one box

**Layout Reference — Stats Overview (most common):**
```
┌─────────────────────────────────────┐
│  [TITLE — 6-8 words max]            │
├──────────┬──────────┬───────────────┤
│  STAT 1  │  STAT 2  │    STAT 3     │
│  [#] [%] │  [#] [%] │   [#] [%]    │
│  [label] │  [label] │   [label]    │
├──────────┴──────────┴───────────────┤
│  KEY TAKEAWAY (1 sentence)          │
│  Source: [citation]                 │
└─────────────────────────────────────┘
```

**Layout Reference — Comparison Card:**
```
┌──────────────────────────────────────┐
│     [TOPIC] — A vs B                 │
├─────────────────┬────────────────────┤
│   OPTION A      │   OPTION B         │
│   • Point 1     │   • Point 1        │
│   • Point 2     │   • Point 2        │
│   • Point 3     │   • Point 3        │
│   [Pro/Con]     │   [Pro/Con]        │
└─────────────────┴────────────────────┘
```

### Step 4: Create the Infographic

Produce using one of:
- **PowerPoint / Keynote**: Single slide, 1:1 or 4:5 ratio for social
- **Image generation prompt**: Detailed text prompt for AI image tools
- **Markdown table**: For text-based summary when visual tools not available

When creating via PowerPoint:
- Use 1080×1080px (Instagram) or 1200×628px (LinkedIn/Twitter) canvas
- Font: 2-3 sizes max (title, headers, body)
- Colors: 2-3 brand colors + white/black
- Padding: Minimum 40px on all edges

### Quality Checklist

Before delivering:
- [ ] All data is accurate — verify every number
- [ ] No text overflow — every label fits its container
- [ ] Clean design — remove anything that doesn't add information
- [ ] Readable at phone size — test at 375px width
- [ ] Source cited at bottom
- [ ] Title communicates the key insight, not just the topic

## Important Notes

- The best infographics make one point extremely clearly — not ten points vaguely
- If the content doesn't fit the visual format, suggest an article instead
- Color and layout should reinforce hierarchy, not decorate
- Always include a source line — credibility matters
