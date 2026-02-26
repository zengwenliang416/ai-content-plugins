# Guide: Working with MCP Data Sources

## Configuring MCP Connectors

MCP connectors are defined in `.mcp.json` at the plugin root. All connectors use HTTP transport:

```json
{
  "mcpServers": {
    "provider-key": {
      "type": "http",
      "url": "https://endpoint.provider.com/path"
    }
  }
}
```

The core `financial-analysis` plugin defines all 11 marketplace connectors. Add-on plugins inherit these by relying on the core plugin being installed — there is no explicit dependency declaration.

Partner plugins may also embed `mcpServers` in `.claude-plugin/plugin.json` (as S&P Global does), but `.mcp.json` is the standard location.

## Provider-to-Data Mapping

| Data Need | Primary Provider(s) | MCP Key(s) |
|-----------|---------------------|-------------|
| Equity fundamentals/consensus | S&P Global, FactSet, Daloopa | `sp-global`, `factset`, `daloopa` |
| Bond pricing/analytics | LSEG | `lseg` |
| Yield/interest rate curves | LSEG | `lseg` |
| FX spot/forward/vol | LSEG | `lseg` |
| Options pricing/vol surfaces | LSEG | `lseg` |
| Credit ratings/risk | Moody's | `moodys` |
| Fund/equity analytics | Morningstar | `morningstar` |
| PE/VC deal data | PitchBook | `pitchbook` |
| PE portfolio analytics | Chronograph | `chronograph` |
| Earnings call transcripts | Aiera | `aiera` |
| News/market data | MT Newswires | `mtnewswire` |
| Document storage | Egnyte | `egnyte` |

## Data Source Priority Rules

Skills enforce this hierarchy universally:

1. **MCP tools** — always the primary data source
2. **Bloomberg / SEC filings** — fallback when MCP lacks coverage
3. **Web search** — never primary; only for timeliness cross-checks (e.g., confirming a date)

S&P Global skills enforce even stricter rules: data must come exclusively from Kensho MCP tools. The `earnings-preview-beta` skill explicitly prohibits web access.

## Partner-Specific Patterns

### LSEG: Tool Chaining

LSEG skills follow a structured chaining pattern with explicit MCP tool sequences. Commands reference `CONNECTORS.md` for tool details.

**Two-phase calls:** Many LSEG tools require list-then-calculate:
1. Query a listing tool (e.g., `option_template_list`) to get available instruments
2. Pass returned identifiers to the calculation tool (e.g., `option_value`)

**Example chain** (`analyze-bond-rv`):
`bond_price` -> `interest_rate_curve` -> `credit_curve` -> `yieldbook_scenario`

Each step's output feeds the next. Skills document these chains as numbered workflow steps.

### S&P Global: Intermediate Files

S&P Global skills write all MCP response data to local files before processing:

| Skill | Intermediate Path | Files |
|-------|-------------------|-------|
| `tear-sheet` | `/tmp/tear-sheet/` | Per-section data files |
| `earnings-preview-beta` | `/tmp/earnings-preview/` | 11 named files (company-info, financials, segments, etc.) |
| `funding-digest` | `/home/claude/` | Deal data files |

This pattern protects against context window compression losing raw MCP data mid-workflow. The trade-off: paths are hardcoded and assume a specific runtime environment.

### S&P Global: No Commands

S&P Global has no slash commands. Skills activate via description-based trigger matching only. Users must phrase requests naturally rather than using explicit `/plugin:command` syntax.

### LSEG: CONNECTORS.md

LSEG maintains a canonical tool reference (`CONNECTORS.md`) at the plugin root listing all 18 tools with parameters and return values. Commands link to it directly. This provides a single source of truth for available MCP capabilities — a pattern not used by other plugins.

## Common Pitfalls

### Key Collision: `lseg`

Both `financial-analysis/.mcp.json` and `partner-built/lseg/.mcp.json` define an `lseg` MCP key targeting the same endpoint. When both plugins are active, one config may shadow the other. The merge behavior is undocumented. Mitigation: use distinct keys if extending LSEG integration.

### Missing Core Plugin

Add-on plugins (`investment-banking`, `private-equity`, `equity-research`, `wealth-management`) have no MCP connectors of their own. If `financial-analysis` is not installed, these plugins silently lose all MCP data access with no error message. No manifest field enforces this dependency.

### Web Search as Primary Source

Using web search as a primary data source violates the marketplace data hierarchy. Web search is permitted only for timeliness cross-checks (confirming dates, verifying recent events). All quantitative data must come from MCP tools or Bloomberg/SEC filings.

### S&P Global Dual Config Drift

S&P Global defines its MCP server in both `plugin.json` and `.mcp.json`. Changes to one file may not be reflected in the other, leading to config drift. Treat `.mcp.json` as the canonical source.

### Hardcoded Intermediate Paths

S&P Global skills use hardcoded `/tmp/` paths. These may conflict across concurrent executions or fail in environments with different filesystem layouts. No cleanup mechanism is defined for intermediate files.
