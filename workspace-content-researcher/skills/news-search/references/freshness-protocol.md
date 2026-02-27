# Data Freshness Protocol

All search results are subject to a **strict 24-hour freshness window** by default. This is the highest-priority constraint for report timeliness.

## Rules

1. **Primary search**: All `search.ts` calls enforce `--since 24h` by default. Results older than 24 hours are filtered out.
2. **Background research**: Only when a primary result references an older source (paper, blog post, product page), you may use `--no-freshness` to retrieve that specific item.
3. **Labeling**: Never present background-research data as primary findings. Always label older data as `[Background]` or `[Reference]`.

## Per-Platform Filtering

| Platform | Method | Reliability |
|----------|--------|-------------|
| Twitter/X | `since:YYYY-MM-DD` in query | Native — reliable |
| Reddit | `&t=day&sort=new` API param | Native — reliable |
| GitHub | `--updated >=YYYY-MM-DD` flag | Native — reliable |
| Exa/Web | `startPublishedDate` param | Native — reliable |
| YouTube | Post-filter JSON by `upload_date` | Best-effort — some results may lack date |
| Bilibili | Post-filter JSON by `upload_date` | Best-effort — some results may lack date |
| RSS | Post-filter by `published_parsed` timestamp | Best-effort — depends on feed quality |
| XHS | No native filter — stderr warning | Manual review required |
| Douyin | No native filter — stderr warning | Manual review required |
| LinkedIn | No native filter | Manual review required |
| Boss直聘 | No native filter | Manual review required |

## Usage

```bash
# Default: 24h freshness (ALWAYS use this for primary data)
bun search.ts twitter "Claude 4" 20

# Custom window (breaking news — last 2 hours)
bun search.ts twitter "Claude 4" 20 --since 2h

# Background research ONLY (for following up on references in fresh results)
bun search.ts web "transformer architecture paper" --no-freshness
```

## Workflow Decision Tree

```
User query arrives
  │
  ├── Primary data collection
  │   └── search.ts <platform> <query> [count]
  │       └── 24h filter is AUTOMATIC
  │           └── Review results — all from today
  │
  └── Found a reference in primary results that needs context?
      ├── YES → search.ts <platform> <specific-query> --no-freshness
      │         └── Label output as [Background] or [Reference]
      └── NO → Done. All data is fresh.
```

## read.ts

`read.ts` does not enforce freshness — it reads a specific URL. The freshness constraint applies to **which URLs you choose to read**:

- Read URLs discovered from fresh search results → OK
- Read URLs from background research → label as `[Reference]`
- Proactively reading old bookmarks → NOT OK without justification

## Stderr Indicators

The script outputs freshness status to stderr:
- `[freshness] Filtering to results since YYYY-MM-DD` — normal operation
- `[freshness] All results filtered out` — no fresh results found, consider widening window
- `[freshness] XHS: no native date filter` — manual verification needed
