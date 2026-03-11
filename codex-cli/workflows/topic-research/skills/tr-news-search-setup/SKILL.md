---
name: tr-news-search-setup
description: "Install and configure upstream tools (bird, yt-dlp, mcporter, gh) for multi-platform news search"
arguments:
  - name: input
    description: "Platform name to configure, .openspec.json, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other interaction and BEFORE asking the user for setup scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.platform`.
   - If argument is a platform name, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/news-search/setup/*.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `inputs.platform`.

3. **No upstream found**: Ask the user which platform(s) to configure first.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Execute News Search Setup

Install, configure, and verify upstream tools for multi-platform news search.

**Runtime**: [Bun](https://bun.sh) — install via `curl -fsSL https://bun.sh/install | bash`

### Step 2.1: Install Missing Tools

Run: `bun news-search-setup/scripts/install.ts`

This checks and installs:
- bird CLI (Twitter/X)
- yt-dlp (YouTube/Bilibili)
- gh CLI (GitHub)
- mcporter (MCP bridge for Exa, XiaoHongShu, Douyin, LinkedIn, Boss直聘)
- feedparser (RSS)

Output: JSON status per tool on stdout, progress on stderr.

### Step 2.2: Diagnose Channels

Run: `${TS_RUNNER} news-search/scripts/doctor.ts`

Review output and decide per channel:

- **ok** -> Skip, no action needed
- **missing** -> Step 2.1 should have installed it. If still missing, show manual install command.
- **unconfigured** -> Guide user through configuration (Step 2.3)
- **error** -> Troubleshoot (expired cookies, connectivity, etc.)

### Step 2.3: Configure Channels (Decision Tree)

For each unconfigured channel:

**Twitter/X** (needs cookies):
1. Ask user to install [Cookie-Editor](https://cookie-editor.cgagnier.ca/) browser extension
2. User exports cookies as "Header String" from Twitter/X
3. Run: `${TS_RUNNER} news-search/scripts/config.ts parse-cookies '<cookie-string>'`
4. Verify: `${TS_RUNNER} news-search/scripts/doctor.ts --json` -> twitter should be "ok"
5. See `references/cookie-guide.md` for detailed steps

**Reddit** (optional proxy):
1. Ask if user needs Reddit access from a blocked IP
2. If yes, guide proxy setup — see `references/proxy-guide.md`
3. Run: `${TS_RUNNER} news-search/scripts/config.ts set reddit_proxy "http://user:pass@host:port"`

**Exa** (auto-configured):
1. Run: `mcporter config add exa https://mcp.exa.ai/mcp`
2. Free, no API key needed

**XiaoHongShu** (Docker + QR login):
1. `docker run -d --name xiaohongshu-mcp -p 18060:18060 xpzouying/xiaohongshu-mcp`
2. `mcporter config add xiaohongshu http://localhost:18060/mcp`
3. User scans QR code at `http://localhost:18060`
4. See `references/platform-setup.md`

**Douyin** (Docker + QR login):
1. Similar to XiaoHongShu — see `references/platform-setup.md`

**GitHub** (gh auth):
1. Run: `gh auth login` -> follow interactive prompts
2. Verify: `gh auth status`

### Step 2.4: Verify

Run: `bun news-search-setup/scripts/verify.ts`

Confirms all configured channels are working. Reports any remaining issues.

## Quick Setup (All-in-One)

For users who want everything set up at once:

```bash
# 1. Install tools
bun news-search-setup/scripts/install.ts

# 2. Check status
${TS_RUNNER} news-search/scripts/doctor.ts

# 3. Verify
bun news-search-setup/scripts/verify.ts
```

Then configure individual channels as needed per Step 2.3.

## Artifact Handoff

**Output**: Setup record saved to `openspec/runtime/news-search/setup/YYYY-MM-DD-<platform>-setup.md`

**OpenSpec contract (MANDATORY)**:

- Create or update `openspec/runtime/news-search/setup/YYYY-MM-DD-<platform>-setup.openspec.json`.
- Minimum fields:
  - `pipeline`: `news-search-setup->news-search`
  - `stage`: `news-search-setup`
  - `outputs.setup_record_md`: setup record path
  - `next.command`: `tr-news-search`
  - `next.input`: configured platform name or contract path

**Next step**: Suggest running `tr-news-search` to validate the platform setup with a real query.
