---
name: publishing-post-to-x
description: "Post content and articles to X (Twitter). Supports regular posts with images/videos, quote tweets, and X Articles (long-form Markdown). Uses real Chrome with CDP to bypass anti-automation."
arguments:
  - name: input
    description: "Text, article file path, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other interaction. Do NOT skip.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.short_post_md`, then `outputs.article_md`, then `outputs.article_html`.
   - If argument is text or an article file, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.short_post_md`, `outputs.article_md`, and `outputs.article_html`.

3. **Auto-scan legacy publish assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.html 2>/dev/null | head -3
ls -t openspec/runtime/short-post/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下待发布内容，请选择要发布到 X 的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for content text or article path.

## Language Selection (MANDATORY — after Step 1)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Post to X

Posts text, images, videos, and long-form articles to X via real Chrome browser (bypasses anti-bot detection).

### Script Directory

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`
2. Script path = `${SKILL_DIR}/scripts/<script-name>.ts`
3. Replace all `${SKILL_DIR}` in this document with the actual path

**Script Reference**:
| Script | Purpose |
|--------|---------|
| `scripts/x-browser.ts` | Regular posts (text + images) |
| `scripts/x-video.ts` | Video posts (text + video) |
| `scripts/x-quote.ts` | Quote tweet with comment |
| `scripts/x-article.ts` | Long-form article publishing (Markdown) |
| `scripts/md-to-html.ts` | Markdown to HTML conversion |
| `scripts/copy-to-clipboard.ts` | Copy content to clipboard |
| `scripts/paste-from-clipboard.ts` | Send real paste keystroke |
| `scripts/check-paste-permissions.ts` | Verify environment & permissions |

### Preferences (EXTEND.md)

Use Bash to check EXTEND.md existence (priority order):

```bash
# Check project-level first
test -f .content-skills/x-publisher/EXTEND.md && echo "project"

# Then user-level (cross-platform: $HOME works on macOS/Linux/WSL)
test -f "$HOME/.content-skills/x-publisher/EXTEND.md" && echo "user"
```

| Path | Location |
|------|----------|
| `.content-skills/x-publisher/EXTEND.md` | Project directory |
| `$HOME/.content-skills/x-publisher/EXTEND.md` | User home |

| Result | Action |
|--------|--------|
| Found | Read, parse, apply settings |
| Not found | Use defaults |

**EXTEND.md Supports**: Default Chrome profile

### Prerequisites

- Google Chrome or Chromium
- `bun` runtime
- First run: log in to X manually (session saved)

### Pre-flight Check (Optional)

Before first use, suggest running the environment check. User can skip if they prefer.

```bash
npx -y bun ${SKILL_DIR}/scripts/check-paste-permissions.ts
```

Checks: Chrome, profile isolation, Bun, Accessibility, clipboard, paste keystroke, Chrome conflicts.

**If any check fails**, provide fix guidance per item:

| Check | Fix |
|-------|-----|
| Chrome | Install Chrome or set `X_BROWSER_CHROME_PATH` env var |
| Profile dir | Ensure `~/.local/share/x-browser-profile` is writable |
| Bun runtime | `curl -fsSL https://bun.sh/install \| bash` |
| Accessibility (macOS) | System Settings → Privacy & Security → Accessibility → enable terminal app |
| Clipboard copy | Ensure Swift/AppKit available (macOS Xcode CLI tools: `xcode-select --install`) |
| Paste keystroke (macOS) | Same as Accessibility fix above |
| Paste keystroke (Linux) | Install `xdotool` (X11) or `ydotool` (Wayland) |

### References

- **Regular Posts**: See `references/regular-posts.md` for manual workflow, troubleshooting, and technical details
- **X Articles**: See `references/articles.md` for long-form article publishing guide

---

### Regular Posts

Text + up to 4 images.

```bash
npx -y bun ${SKILL_DIR}/scripts/x-browser.ts "Hello!" --image ./photo.png
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<text>` | Post content (positional) |
| `--image <path>` | Image file (repeatable, max 4) |
| `--profile <dir>` | Custom Chrome profile |

**Note**: Script opens browser with content filled in. User reviews and publishes manually.

---

### Video Posts

Text + video file.

```bash
npx -y bun ${SKILL_DIR}/scripts/x-video.ts "Check this out!" --video ./clip.mp4
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<text>` | Post content (positional) |
| `--video <path>` | Video file (MP4, MOV, WebM) |
| `--profile <dir>` | Custom Chrome profile |

**Note**: Script opens browser with content filled in. User reviews and publishes manually.

**Limits**: Regular 140s max, Premium 60min. Processing: 30-60s.

---

### Quote Tweets

Quote an existing tweet with comment.

```bash
npx -y bun ${SKILL_DIR}/scripts/x-quote.ts https://x.com/user/status/123 "Great insight!"
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<tweet-url>` | URL to quote (positional) |
| `<comment>` | Comment text (positional, optional) |
| `--profile <dir>` | Custom Chrome profile |

**Note**: Script opens browser with content filled in. User reviews and publishes manually.

---

### X Articles

Long-form Markdown articles (requires X Premium).

```bash
npx -y bun ${SKILL_DIR}/scripts/x-article.ts article.md
npx -y bun ${SKILL_DIR}/scripts/x-article.ts article.md --cover ./cover.jpg
```

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| `<markdown>` | Markdown file (positional) |
| `--cover <path>` | Cover image |
| `--title <text>` | Override title |

**Frontmatter**: `title`, `cover_image` supported in YAML front matter.

**Note**: Script opens browser with article filled in. User reviews and publishes manually.

---

### Troubleshooting

#### Chrome debug port not ready

If a script fails with `Chrome debug port not ready` or `Unable to connect`, kill existing Chrome CDP instances first, then retry:

```bash
pkill -f "Chrome.*remote-debugging-port" 2>/dev/null; pkill -f "Chromium.*remote-debugging-port" 2>/dev/null; sleep 2
```

**Important**: This should be done automatically — when encountering this error, kill Chrome CDP instances and retry the command without asking the user.

### Notes

- First run: manual login required (session persists)
- All scripts only fill content into the browser, user must review and publish manually
- Cross-platform: macOS, Linux, Windows

### Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.

## Artifact Handoff

**Output**:

- Post result MUST be shown in conversation.
- Publish record SHOULD be saved to `openspec/runtime/publishing/x/YYYY-MM-DD-<slug>.md`.

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `publishing`
  - `outputs.x_post_id`: published post id (if available)
  - `outputs.x_post_url`: published post URL (if available)
  - `next.command`: `none`
  - `next.input`: `none`

**Next step**: Suggest reviewing engagement later with `/growth-ops:performance`.
