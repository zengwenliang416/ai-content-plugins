# Platform-Specific Setup

## Tier 0: Zero-Config Platforms

These work out of the box after tool installation:

| Platform | Tool | Install |
|----------|------|---------|
| Web (any URL) | — | Built-in (Jina Reader) |
| YouTube | yt-dlp | `pip install yt-dlp` |
| Bilibili | yt-dlp | `pip install yt-dlp` |
| GitHub | gh | `brew install gh` then `gh auth login` |
| RSS | feedparser | `pip install feedparser` |

## Tier 1: Free Key/Service Platforms

### Twitter/X

See `cookie-guide.md` for detailed steps.

Quick setup:
1. `npm install -g @steipete/bird`
2. Export cookies from browser via Cookie-Editor
3. `bun news-search/scripts/config.ts parse-cookies '<cookies>'`

### Reddit

See `proxy-guide.md` if IP is blocked.

Works without proxy from most residential IPs.

### Exa Search

Auto-configured during install:
```bash
mcporter config add exa https://mcp.exa.ai/mcp
```
Free, no API key needed.

## Tier 2: Requires Docker/Setup

### XiaoHongShu (小红书)

1. Install Docker if not present
2. Start service:
   ```bash
   docker run -d --name xiaohongshu-mcp -p 18060:18060 xpzouying/xiaohongshu-mcp
   ```
3. Register with mcporter:
   ```bash
   mcporter config add xiaohongshu http://localhost:18060/mcp
   ```
4. Open `http://localhost:18060` in browser and scan QR code with XiaoHongShu app
5. Verify: `bun news-search/scripts/doctor.ts --json`

**Persistence**: Mount a Docker volume to persist login:
```bash
docker run -d --name xiaohongshu-mcp -p 18060:18060 \
  -v xhs-data:/app/data xpzouying/xiaohongshu-mcp
```

### Douyin (抖音)

Similar Docker-based setup. Requires douyin MCP service.

1. Start Docker service (check for latest image)
2. `mcporter config add douyin http://localhost:<port>/mcp`
3. QR code login

### LinkedIn

Full MCP integration via linkedin-scraper-mcp. Falls back to Jina Reader without it.

### Boss直聘

Full MCP integration via mcp-bosszp. Falls back to Jina Reader without it.
