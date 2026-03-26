---
name: cr-content-repurposer
description: >
  Transform long-form content (articles, research reports, posts) into
  platform-optimized formats: tweet threads, XHS notes, WeChat summaries,
  LinkedIn posts, and short video scripts. Use after content production or
  deep research to maximize content reach across platforms. Triggers on
  "repurpose", "cross-post", "adapt for [platform]", "turn this into
  tweets", "make XHS version", "内容分发", "跨平台改写".
arguments:
  - name: input
    description: "source file/URL, .openspec.json, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `outputs.short_post_md`, then `inputs.topic`.
   - If argument is `.openspec.json`, read and extract source content path.
   - If argument is a URL, use it directly (will be fetched via WebFetch in the skill).
   - If argument is a file path, use it directly.
   - Then skip to Language Selection.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/short-post/*.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`, `outputs.short_post_md`, and `inputs.topic`.

3. **Auto-scan legacy content**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/*.md 2>/dev/null | head -5
ls -t openspec/runtime/short-post/*.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下内容素材，请选择要改编的输入：" with files as options (plus "自定义输入" option).

4. **No upstream found**: Only in this case, ask for source file path or URL.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Target Format Selection

After getting the source content, use AskUserQuestion to ask the user:

"请选择目标格式 / Select target format(s):

1. 🐦 推文串 / Tweet Thread (280-char segments, hooks, hashtags)
2. 📕 小红书笔记 / XHS Note (emoji-rich, casual, list-style)
3. 💬 微信公众号摘要 / WeChat Summary (structured, professional)
4. 📝 LinkedIn Post (professional, insight-driven)
5. 🎬 短视频脚本 / Short Video Script (visual + narration)
6. 🔄 全部 / All of the above"

## Step 3: Load Skill and Execute

Load the `content-repurposer` skill and generate the repurposed content for each selected target format.

## Artifact Handoff

**Output**: Repurposed content saved to:

- `openspec/runtime/repurpose/<slug>/` (standalone mode)
- `openspec/runtime/deep-research/<slug>/repurpose/` (if contract/deep-research mode)

Files per format:
- `tweet-thread.md`
- `xhs-note.md`
- `wechat-summary.md`
- `linkedin-post.md`
- `video-script.md`

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.

- Update contract with:
  - `stage`: `content-repurpose`
  - `outputs.repurpose_dir`: repurpose output directory path
  - `next.command`: `/publishing:post-to-x` or `/publishing:post-to-wechat`
  - `next.input`: repurpose directory path or contract path

**Next step**: Suggest running `/publishing:post-to-x` or `/publishing:post-to-wechat` for publication.

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
