---
name: ch-hook-generator
description: "Generate attention-grabbing hooks and opening lines"
arguments:
  - name: input
    description: "topic, article file, .openspec.json, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `inputs.topic`.
   - If argument is a topic string or file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`, then `inputs.topic`.

3. **Auto-scan legacy content inputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/*.md 2>/dev/null | head -3
ls -t openspec/runtime/short-post/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下内容素材，请选择要用于 Hook 生成的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for the topic.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Hook Configuration

Use AskUserQuestion to ask the user:

"请选择 Hook 类型 / Select hook type:

1. 🎯 开篇金句 / Opening Hook (article/post first line)
2. 🧵 推文开头 / Tweet Opener (scroll-stopping first tweet)
3. 📕 小红书标题 / XHS Title (curiosity-driven, emoji-rich)
4. 🎬 视频开场白 / Video Intro (3-second attention grab)
5. 🔄 全平台套装 / All-Platform Pack"

## Step 3: Load Skill and Execute

Load the `hook-generator` skill and generate hooks for the specified topic/content using the selected type.

## Artifact Handoff

**Output**: Hook variants saved to:

- `openspec/runtime/hooks/<slug>/hooks.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/hooks.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-hooks`
  - `outputs.hooks_md`: hooks file path
  - `next.command`: `/content-production:short-post` or `/content-production:long-article`
  - `next.input`: hooks file path or contract path

**Next step**: Suggest running `/content-production:short-post` or `/content-production:long-article` to apply hooks.

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
