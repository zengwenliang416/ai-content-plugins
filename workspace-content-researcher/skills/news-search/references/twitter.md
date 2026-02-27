# Twitter/X Reference

## Upstream Tool: bird CLI

bird is a CLI for Twitter/X that supports search, read, and profile lookup.

**Install**: `npm install -g @steipete/bird`

## Authentication

Requires Twitter cookies (`auth_token` and `ct0`):

1. Install [Cookie-Editor](https://cookie-editor.cgagnier.ca/) browser extension
2. Log into Twitter/X in browser
3. Click Cookie-Editor → Export → "Header String"
4. Configure: `bun news-search/scripts/config.ts parse-cookies '<cookie-string>'`

## Search Commands

```bash
# Basic search
AUTH_TOKEN=xxx CT0=yyy bird search "AI agents" -n 20

# Via search.ts (reads config automatically)
bun news-search/scripts/search.ts twitter "AI agents" 20
```

**Search options**:
- `-n <count>`: number of results (default 10)
- `--type latest`: sort by latest (default: top)
- `--type media`: media only

## Read Commands

```bash
# Read a tweet thread
AUTH_TOKEN=xxx CT0=yyy bird read https://x.com/user/status/123 --json

# Via read.ts
bun news-search/scripts/read.ts "https://x.com/user/status/123"
```

## Profile Lookup

```bash
bird whoami         # check auth status
bird user @handle   # get user profile
```

## Troubleshooting

- **"auth_token expired"**: Re-export cookies from browser, cookies expire periodically
- **"rate limited"**: Wait 15 minutes, Twitter enforces rate limits per auth token
- **bird not found**: `npm install -g @steipete/bird`
