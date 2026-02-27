# Web & RSS Reference

## Web (Any URL) — Jina Reader

### Tool: HTTP fetch to Jina Reader API (no CLI dependency)

Jina Reader converts any web page to clean markdown.

### Read Any URL

```bash
# Via read.ts (auto-fallback for unrecognized URLs)
bun news-search/scripts/read.ts "https://example.com/article"
```

Internally calls `https://r.jina.ai/<url>` with `Accept: text/markdown`.

### Direct Usage

```bash
curl -H "Accept: text/markdown" "https://r.jina.ai/https://example.com/article"
```

---

## Exa Search

### Tool: mcporter + Exa MCP

Exa provides semantic web search — finds content by meaning, not just keywords.

**Setup**: `mcporter config add exa https://mcp.exa.ai/mcp` (free, no API key needed)

### Search

```bash
bun news-search/scripts/search.ts exa "latest breakthroughs in multimodal AI" 10
```

Calls `mcporter call 'exa.web_search_exa(query: "...", numResults: N)'`.

### When to Use Exa vs Regular Web

- **Exa**: semantic search, finds topically relevant content even without exact keyword matches
- **Web/Jina**: reading specific URLs or simple keyword-based discovery

---

## RSS Feeds

### Tool: Python feedparser

**Install**: `pip install feedparser`

### Search (Parse Feed)

```bash
# Parse an RSS feed URL
bun news-search/scripts/search.ts rss "https://feeds.feedburner.com/example" 10
```

Returns JSON array of `{ title, link, published }`.

### Recommended AI Feeds

- Import AI (Jack Clark): `https://importai.substack.com/feed`
- The Batch (Andrew Ng): `https://www.deeplearning.ai/the-batch/feed`
- MIT Technology Review AI: `https://www.technologyreview.com/feed`
- VentureBeat AI: `https://venturebeat.com/category/ai/feed/`

### Notes

- RSS parsing is local — no API key or proxy needed
- Feed URL is passed as the "query" argument to search.ts
- Count parameter limits number of entries returned
