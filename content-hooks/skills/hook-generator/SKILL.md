---
name: hook-generator
description: Generate platform-optimized hooks and opening lines. Use when user asks to "write a hook", "opening line", "attention grabber", "scroll stopper", or wants to improve content openings.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - AskUserQuestion
---

# Hook Generator

Generate high-impact hooks that stop the scroll and drive engagement.

## Preferences (EXTEND.md)

Use Bash to check EXTEND.md existence (priority order):

```bash
# Check project-level first
test -f .content-skills/hook-generator/EXTEND.md && echo "project"

# Then user-level (cross-platform: $HOME works on macOS/Linux/WSL)
test -f "$HOME/.content-skills/hook-generator/EXTEND.md" && echo "user"
```

| Path | Location |
|------|----------|
| `.content-skills/hook-generator/EXTEND.md` | Project directory |
| `$HOME/.content-skills/hook-generator/EXTEND.md` | User home |

| Result | Action |
|--------|--------|
| Found | Read, parse, apply settings |
| Not found | Use defaults |

**EXTEND.md Supports**: Brand voice | Avoid topics | Preferred hook styles | Platform accounts

## Hook Generation Framework

For ANY input (topic, article, or brief), generate **5 hook variants** using these proven formulas:

### Formula Library

| # | Formula | Example (EN) | Example (CN) |
|---|---------|-------------|-------------|
| 1 | **Contrarian** — Challenge a common belief | "Everything you know about X is wrong" | "你对X的认知，可能全是错的" |
| 2 | **Data Shock** — Lead with surprising stat | "97% of developers don't know this about AI" | "97%的开发者不知道AI的这个真相" |
| 3 | **Story Hook** — Personal/micro narrative | "Last Tuesday, I deleted my entire codebase. Here's why." | "上周二，我删掉了全部代码。原因是——" |
| 4 | **Pain Point** — Name the struggle directly | "Tired of writing posts that nobody reads?" | "写了半天没人看？问题出在这里" |
| 5 | **Curiosity Gap** — Promise + withhold | "The one trick that 10x'd my engagement (it's not what you think)" | "让我互动量暴涨10倍的方法（不是你想的那个）" |
| 6 | **Authority** — Expertise + specifics | "After analyzing 1,000 viral posts, here are 3 patterns" | "分析了1000条爆款后，我发现3个规律" |
| 7 | **Urgency** — Time-sensitive framing | "This AI tool is free right now. It won't be for long." | "这个AI工具现在免费，但不会太久" |
| 8 | **Benefit First** — Lead with the outcome | "Save 10 hours a week with this one workflow change" | "一个改变，每周省10小时" |

### Platform-Specific Rules

**Tweet Opener:**
- Max 100 chars for first line (before "Show more")
- No hashtags in hook
- Line break after hook for visual separation

**XHS Title:**
- Max 20 chars
- Emoji bookends (e.g., 🔥...🔥)
- Curiosity > information
- Use trending XHS title patterns: "救命！...", "后悔没早知道...", "X天亲测..."

**Article Opening:**
- 2-3 sentences max
- Set up tension or promise
- Don't give away the punchline

**Video Intro:**
- Must hook in first 3 seconds
- Spoken word format
- Include suggested visual/text overlay
- Pattern: "What if I told you..." / "Stop scrolling if you..."

## Output Format

```markdown
# Hooks — [Topic]

## Generated: [date]
## Source: [input reference]

### [Platform/Type] Hooks

#### Hook 1: [Formula Name]
> [Hook text]

**Why it works**: [1-line explanation of psychological trigger]
**Best for**: [platform/context recommendation]
**Estimated CTR impact**: [1-5 stars]

[Repeat for all 5 variants]

### Recommended Pick
**#[N]** — [reason in 1 sentence]
```

## Quality Criteria

- Each hook must use a DIFFERENT formula (no repeats)
- Hooks must be factually grounded (no fabricated stats unless marked as template)
- Platform limits strictly respected
- Rank hooks by estimated impact
- Always include a "Recommended Pick" with reasoning

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.
