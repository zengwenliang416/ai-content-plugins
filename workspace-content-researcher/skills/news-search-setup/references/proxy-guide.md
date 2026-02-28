# Proxy Configuration Guide

## When You Need a Proxy

- **Reddit**: Blocks many datacenter/VPN IPs. ISP residential proxy recommended.
- **General**: If accessing platforms from restricted networks.

## Reddit Proxy Setup

### Recommended Proxy Type

**ISP Residential Proxy** — appears as a real home internet connection.
- Cost: $3-10/month
- Providers: Smartproxy, Bright Data, IPRoyal, ProxyEmpire

### Configuration Steps

1. Purchase ISP proxy from a provider
   - Select: **ISP proxy** type
   - Region: **US** (Reddit's primary market)
   - Protocol: **HTTP/HTTPS**

2. Get your proxy credentials (typically `http://user:pass@host:port`)

3. Test connectivity:
   ```bash
   curl --proxy "http://user:pass@host:port" https://www.reddit.com/r/MachineLearning.json
   ```

4. Configure:
   ```bash
   bun skills/news-search/scripts/config.ts set reddit_proxy "http://user:pass@host:port"
   ```

5. Verify:
   ```bash
   bun skills/news-search/scripts/doctor.ts --json
   # reddit should show "ok"
   ```

## Alternative: Use Exa for Reddit Content

If proxy setup is not desired, Exa semantic search can find Reddit content:

```bash
bun skills/news-search/scripts/search.ts exa "site:reddit.com AI agents"
```

This doesn't require a proxy but returns results via Exa's index (may not be real-time).
