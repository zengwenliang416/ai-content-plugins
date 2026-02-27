# Social Platforms Reference

## Reddit

### Tool: HTTP fetch (no CLI dependency)

### Search

```bash
# Via search.ts
bun news-search/scripts/search.ts reddit "AI agents" 10
```

Internally calls `https://www.reddit.com/search.json?q=<query>&limit=<count>`.

### Read

```bash
# Via read.ts (appends .json to URL)
bun news-search/scripts/read.ts "https://www.reddit.com/r/MachineLearning/comments/xxx"
```

### Proxy Configuration

Reddit blocks many datacenter IPs. If searches fail, configure an ISP residential proxy:

```bash
bun news-search/scripts/config.ts set reddit_proxy "http://user:pass@proxy:port"
```

Recommended proxy providers: Smartproxy, Bright Data, IPRoyal (ISP type, US region, HTTP protocol).

---

## XiaoHongShu (小红书)

### Tool: mcporter + xiaohongshu-mcp (Docker)

### Setup

1. `npm install -g mcporter`
2. `docker run -d --name xiaohongshu-mcp -p 18060:18060 xpzouying/xiaohongshu-mcp`
3. `mcporter config add xiaohongshu http://localhost:18060/mcp`
4. Scan QR code at `http://localhost:18060` to login

### Search

```bash
bun news-search/scripts/search.ts xhs "AI工具推荐"
```

Calls `mcporter call 'xiaohongshu.search_feeds(keyword: "...")'`.

### Read

```bash
bun news-search/scripts/read.ts "https://www.xiaohongshu.com/explore/xxx"
```

Calls `mcporter call 'xiaohongshu.get_note_detail(url: "...")'`, falls back to Jina Reader.

---

## Douyin (抖音)

### Tool: mcporter + douyin MCP

### Search

```bash
bun news-search/scripts/search.ts douyin "AI教程" 10
```

Calls `mcporter call 'douyin.search_videos(keyword: "...", count: N)'`.

### Notes

- Requires douyin MCP Docker service running
- Login via QR code similar to XiaoHongShu
- Video content is metadata-only (no download)
