# MCP Data Integration Architecture

## Hub Model

`financial-analysis` is the sole MCP data hub for the marketplace. All 11 HTTP connectors are defined in `financial-analysis/.mcp.json`. Add-on plugins (`investment-banking`, `private-equity`, `equity-research`, `wealth-management`) have empty or no `.mcp.json` files and depend on the core plugin for data access.

**Implicit dependency:** Add-on plugins silently lose all MCP data access if `financial-analysis` is not installed. No manifest field declares this dependency.

## Connector Inventory

| Key | Provider | Endpoint | Data Domain |
|-----|----------|----------|-------------|
| `daloopa` | Daloopa | `mcp.daloopa.com` | Financial data extraction |
| `morningstar` | Morningstar | `mcp.morningstar.com` | Fund/equity analytics |
| `sp-global` | S&P Global (Kensho) | `kfinance.kensho.com` | Broad financial data |
| `factset` | FactSet | `mcp.factset.com` | Financial data/analytics |
| `moodys` | Moody's | `api.moodys.com` | Credit ratings/risk |
| `mtnewswire` | MT Newswires | `vast-mcp.blueskyapi.com` | News/market data |
| `aiera` | Aiera | `mcp-pub.aiera.com` | Earnings call analytics |
| `lseg` | LSEG (Refinitiv) | `api.analytics.lseg.com` | Pricing, curves, analytics |
| `pitchbook` | PitchBook | `premium.mcp.pitchbook.com` | PE/VC deal data |
| `chronograph` | Chronograph | `ai.chronograph.pe` | PE portfolio data |
| `egnyte` | Egnyte | `mcp-server.egnyte.com` | Document storage |

All connectors use `type: http` (remote MCP servers).

## Partner MCP Patterns

### LSEG

- Standalone `.mcp.json` with a single `lseg` key pointing to `api.analytics.lseg.com/lfa/mcp/server-cl`
- No MCP config in `plugin.json`
- Provides `CONNECTORS.md`: canonical reference for 18 tools across 11 categories
- Commands and skills reference `CONNECTORS.md` via relative path `../CONNECTORS.md`

### S&P Global (Kensho)

- Dual MCP config: both `plugin.json` (embedded `mcpServers` block) and `.mcp.json` define the same server
- URL: `kfinance.kensho.com/integrations/mcp`
- Risk: two sources of truth can drift on future updates
- No `CONNECTORS.md`; tools are described inline within each skill's SKILL.md

## LSEG Key Collision

Both `financial-analysis/.mcp.json` and `partner-built/lseg/.mcp.json` define an `lseg` key targeting the same LSEG endpoint. If both plugins are active simultaneously, the key collision may cause one config to shadow the other. Resolution behavior depends on the plugin loader's merge strategy, which is currently undocumented.

## Data Source Hierarchy

All core skills enforce a strict priority:

1. **MCP data** (S&P Kensho, FactSet, Daloopa, LSEG, etc.) — always primary
2. **Bloomberg terminal / SEC filings** — fallback when MCP lacks coverage
3. **Web search** — never primary; used only for timeliness cross-checks

Equity-research skills use web search for recency validation (e.g., confirming an event date), but never as a primary data source. This is consistent with the hierarchy, not a violation.

## Data Sourcing Models

| Model | Plugins | Description |
|-------|---------|-------------|
| MCP-sourced | LSEG, S&P Global, core `comps`/`dcf` | Data fetched entirely via MCP tool calls |
| User-provided | Private Equity, Wealth Management | User supplies data (fund docs, portfolio files); no MCP calls |
| Hybrid | Core `3-statements`, `competitive-analysis` | MCP for market data, user-provided templates/files for structure |

## Tool Chaining Patterns

### Two-Phase Calls (LSEG)

Several LSEG tools require a list-then-calculate sequence:

1. Call a listing tool to discover available instruments/templates (e.g., `option_template_list`)
2. Use the returned identifiers to call the calculation tool (e.g., `option_value`)

This pattern is documented in `CONNECTORS.md` and enforced in all LSEG skills.

### Sequential MCP Chains

Both LSEG and S&P Global skills chain multiple MCP calls in sequence. Example from LSEG `analyze-bond-rv`:
`bond_price` -> `interest_rate_curve` -> `credit_curve` -> `yieldbook_scenario`

### Intermediate File Pipeline (S&P Global)

S&P Global skills write MCP response data to `/tmp/` before processing:

- `tear-sheet` -> `/tmp/tear-sheet/` (multiple data files)
- `earnings-preview-beta` -> `/tmp/earnings-preview/` (11 intermediate files)
- `funding-digest` -> `/home/claude/` (deal data files)

This guards against context window compression losing raw data mid-workflow. Hardcoded paths assume a specific runtime environment.

## CONNECTORS.md Pattern

LSEG maintains a `CONNECTORS.md` at the plugin root: a canonical reference listing all 18 MCP tools with parameters and return values across 11 categories:

- Bond Pricing (`bond_price`, `bond_future_price`)
- FX Pricing (`fx_spot_price`, `fx_forward_price`)
- Curves (`interest_rate_curve`, `credit_curve`, `inflation_curve`, `fx_forward_curve`)
- Swaps (`ir_swap`)
- Options (`option_value`, `option_template_list`)
- Volatility (`fx_vol_surface`, `equity_vol_surface`)
- Quantitative Analytics (`qa_ibes_consensus`, `qa_company_fundamentals`, `qa_historical_equity_price`, `qa_macroeconomic`)
- Time Series (`tscc_historical_pricing_summaries`)
- YieldBook (`yieldbook_bond_reference`, `yieldbook_cashflow`, `yieldbook_scenario`, `fixed_income_risk_analytics`)

First-party plugins do not use this pattern; tool references are embedded directly in skill files.
