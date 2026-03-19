---
name: cp-short-post
description: >
  Draft platform-optimized short-form posts for Twitter/X (tweets, threads),
  LinkedIn, WeChat, Weibo, and XiaoHongShu with fold-aware hooks, character-limit
  compliance, and hashtag strategy. Triggers on "short post", "tweet", "thread",
  "social media post", "微博", "小红书", "LinkedIn post", "写个短帖".
arguments:
  - name: input
    description: "Topic, trend/narrative path, .openspec.json, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.trend_preview_md`, then `outputs.narrative_md`, then `outputs.x_markdown_md`, then `inputs.topic`.
   - If `$ARGUMENTS` is a topic or source path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/narrative/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.trend_preview_md`, `outputs.narrative_md`, and `inputs.topic`.

3. **Auto-scan legacy short-post inputs**:

```bash
ls -t openspec/runtime/trend-preview/*.md 2>/dev/null | head -3
ls -t openspec/runtime/narrative/*.md 2>/dev/null | head -3
ls -t openspec/runtime/x-clips/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下短帖素材，请选择要用于短帖生成的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for topic, target platform, and key message.

## Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Core Workflow

### Gather Inputs

- Topic or key idea to communicate
- Target platform (Twitter/X, LinkedIn, 小红书, WeChat, Weibo)
- Tone (professional, casual, provocative, educational, storytelling)
- Length constraint (single post or thread)
- Any data points, quotes, or specific angles to include

### Post Structure by Platform

**Twitter/X (single post)**

- Hook in first line (question, stat, or bold claim)
- Core insight in 1-2 sentences
- Takeaway or CTA in final line
- Hard limit: 280 characters per tweet

**Twitter/X (thread)**

- Tweet 1: Hook that makes people want to read on
- Tweets 2-N: One idea per tweet, build sequentially
- Final tweet: Summary + CTA or question to drive replies
- Hard limit: 280 characters per tweet, recommended 5-12 tweets per thread

**LinkedIn**

- Line 1: Story opener or surprising statement (shows before "See more")
- Body: Professional insight with specific detail or data
- Closing: Clear CTA (share, comment, connect)
- 3-5 short paragraphs, no walls of text
- Hard limit: 3000 characters; first ~210 characters show before "See more" fold

**小红书**

- Title hard limit: 20 characters (including emoji, punctuation, letters). First 18 characters show on feed — put core hook there
- Title style: emoji optional, keyword-rich, avoid clickbait (platform penalizes 标题党)
- Body: structured with line breaks, emoji headers, and bullet points
- Body hard limit: 1000 characters; recommended 300-800 for engagement
- Closing: tags (#话题 format, 3-8 tags), question to drive comments

**WeChat**

- Title: Curiosity-gap or benefit-driven, recommended <=22 characters (longer titles truncate on subscription list)
- Body: Subheadings every 2-3 paragraphs, bold key phrases
- Conclusion: Summary + soft CTA

**微博**

- Hard limit: 2000 characters for long weibo, 140 characters for short weibo
- Hook in first 2 lines (shows before "展开" fold)
- Hashtag format: #话题# (double hash), 1-3 topics

### Hook Techniques

Choose one based on topic and tone:

- **Question**: "Why do most people get X completely wrong?"
- **Statistic**: "X% of [group] still [surprising behavior]. Here's why."
- **Contrarian take**: "Unpopular opinion: [conventional wisdom] is broken."
- **Analogy**: "[Familiar thing] is like [unexpected comparison]."
- **Personal story**: "Three years ago I [did X]. It changed how I think about Y."

### Output

- Final post text, ready to copy-paste
- Hashtag suggestions (3-5, platform-appropriate)
- Optional: 2 alternative hooks to choose from

## Artifact Handoff

**Output path**:

- `openspec/runtime/short-post/YYYY-MM-DD-<topic>-short-post.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/short-post.md` (pipeline mode)

**OpenSpec contract (MANDATORY)**:

- Standalone: create or update a stage-local `*.openspec.json` contract.
- Pipeline: update `pipeline.openspec.json` in-place with `stage: content-production`, `outputs.short_post_md`, `next.command: /publishing:post-to-x`.

## Important Notes

- One idea per post — do not try to cover everything
- Hook must appear in the first line, before any fold or "See more"
- Use specific numbers over vague claims ("47% open rate" beats "great results")
- Short sentences outperform long ones on every platform
- Read the post aloud — if it sounds stiff, rewrite it
