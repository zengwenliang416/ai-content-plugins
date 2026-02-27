# Professional Platforms Reference

## GitHub

### Tool: gh CLI

**Install**: `brew install gh` (macOS) / `apt install gh` (Linux)

### Search

```bash
# Search repos
gh search repos "AI agents" --sort stars --limit 10

# Search code
gh search code "transformer architecture" --limit 10

# Search issues
gh search issues "bug in model loading" --limit 10

# Via search.ts
bun news-search/scripts/search.ts github "AI agents" 10
```

### Read

```bash
# View repo details
gh repo view owner/repo

# Via read.ts
bun news-search/scripts/read.ts "https://github.com/owner/repo"
```

### Auth

```bash
gh auth login    # interactive login
gh auth status   # check auth state
```

---

## LinkedIn

### Tool: mcporter + linkedin-scraper-mcp (full) / Jina Reader (fallback)

### Search

```bash
bun news-search/scripts/search.ts linkedin "AI researcher"
```

With MCP: calls `mcporter call 'linkedin.search_people(query: "...")'`.
Without MCP: falls back to Jina Reader for basic scraping.

### Read

```bash
bun news-search/scripts/read.ts "https://www.linkedin.com/in/username/"
```

Falls back to Jina Reader if MCP unavailable.

---

## Boss直聘

### Tool: mcporter + mcp-bosszp (full) / Jina Reader (fallback)

### Search

```bash
bun news-search/scripts/search.ts bosszhipin "AI工程师"
```

With MCP: calls `mcporter call 'bosszp.search_jobs(query: "...")'`.
Without MCP: falls back to Jina Reader.

### Notes

- Full MCP integration enables job search and detailed position info
- Jina Reader fallback provides basic page content only
