---
name: news-search-setup
description: >
  Installs and configures upstream tools (bird, yt-dlp, mcporter, gh) for
  multi-platform news search. Use when setting up platform access for the
  first time, checking availability, or configuring cookies/proxy. Never for
  searching or reading content — use news-search instead.
---

# News Search Setup

Install, configure, and verify upstream tools for multi-platform news search.

**Runtime**: [Bun](https://bun.sh) — install via `curl -fsSL https://bun.sh/install | bash`

---

## Workflow

### Step 1: Install Missing Tools

Run: `bun news-search-setup/scripts/install.ts`

This checks and installs:
- bird CLI (Twitter/X)
- yt-dlp (YouTube/Bilibili)
- gh CLI (GitHub)
- mcporter (MCP bridge for Exa, XiaoHongShu, Douyin, LinkedIn, Boss直聘)
- feedparser (RSS)

Output: JSON status per tool on stdout, progress on stderr.

### Step 2: Diagnose Channels

Run: `${TS_RUNNER} news-search/scripts/doctor.ts`

Review output and decide per channel:

- **ok** → Skip, no action needed
- **missing** → Step 1 should have installed it. If still missing, show manual install command.
- **unconfigured** → Guide user through configuration (Step 3)
- **error** → Troubleshoot (expired cookies, connectivity, etc.)

### Step 3: Configure Channels (Decision Tree)

For each unconfigured channel:

**Twitter/X** (needs cookies):
1. Ask user to install [Cookie-Editor](https://cookie-editor.cgagnier.ca/) browser extension
2. User exports cookies as "Header String" from Twitter/X
3. Run: `${TS_RUNNER} news-search/scripts/config.ts parse-cookies '<cookie-string>'`
4. Verify: `${TS_RUNNER} news-search/scripts/doctor.ts --json` → twitter should be "ok"
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
1. Run: `gh auth login` → follow interactive prompts
2. Verify: `gh auth status`

### Step 4: Verify

Run: `bun news-search-setup/scripts/verify.ts`

Confirms all configured channels are working. Reports any remaining issues.

---

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

Then configure individual channels as needed per Step 3.
