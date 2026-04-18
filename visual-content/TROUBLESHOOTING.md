# visual-content Troubleshooting

Covers the four AntV-powered skills (`chart-visualization`, `icon-retrieval`, `infographic-dsl`, `narrative-text-viz`) and the shared Puppeteer runtime.

## First — Run Preflight

Always start here:

```bash
node visual-content/scripts/preflight.mjs
```

Exit codes:

| Code | Meaning | Action |
|---|---|---|
| 0 | All green | Proceed |
| 1 | Required check failed | Fix before using skills |
| 2 | Optional check failed | OK to proceed — skills will fall back |

Use `--json` for machine-readable output, `--verbose` for details on every check.

## Puppeteer / Chrome Setup

The skills need a headless browser for local rendering (PNG / SVG export). Three options, pick one:

### Option A — bundled Chromium (easiest)

```bash
npm install puppeteer
```

Downloads ~150MB of Chromium. Best if you don't have Chrome installed.

### Option B — use system Chrome (no extra download)

If you already have Chrome / Chromium / Edge / Brave installed:

```bash
npm install puppeteer-core
```

The shared helper auto-detects system browsers at standard paths on macOS / Linux / Windows. Works out of the box.

If auto-detection misses your browser, set the path explicitly:

```bash
export VIS_CHROME_PATH="/absolute/path/to/chrome"
```

Supported env vars (in priority order): `VIS_CHROME_PATH`, `XHS_CARD_CHROME_PATH`, `PUPPETEER_EXECUTABLE_PATH`.

### Option C — skip rendering, get HTML only

For `chart-visualization`:

```bash
node visual-content/skills/chart-visualization/scripts/gen-chart.mjs \
  --spec spec.json --output out.png --html-only
```

Writes the `.html` template; open it in any browser to view or save manually.

`infographic-dsl` and `narrative-text-viz` automatically produce HTML even when Puppeteer fails; only the PNG/SVG export is skipped.

## Network Issues

### Remote chart API (`antv-studio.alipay.com`) unreachable

Expected and handled. `gen-chart.mjs` will automatically switch to local rendering. Use `--offline` to skip the remote attempt entirely and avoid the 20s timeout.

### CDN blocked (jsDelivr + unpkg both fail)

The skills use `jsDelivr` primary → `unpkg` fallback. If both are blocked (rare outside restrictive networks):

**For `infographic-dsl` and `narrative-text-viz`**: install the AntV packages locally and serve from disk. Vendoring is a manual step — file an issue if you need documented setup.

**For `chart-visualization`**: the G2/G6 CDN load is needed; the custom-tier types (`venn`, `spreadsheet`) work without any CDN.

### Icon API (`lab.weavefox.cn`) unreachable

After first successful fetch, results are cached at `openspec/runtime/visuals/icons/_cache/` for 30 days. Subsequent queries are offline-safe.

To force refresh: `--no-cache` on the skill invocation, or `rm -rf openspec/runtime/visuals/icons/_cache`.

## Chart Type Support Matrix

Local fallback coverage (24 of 26 upstream types):

| Tier | Types |
|---|---|
| G2 | `line`, `area`, `bar`, `column`, `pie`, `scatter`, `histogram`, `radar`, `funnel`, `treemap`, `word-cloud`, `dual-axes`, `waterfall`, `boxplot`, `violin`, `liquid`, `sankey` |
| G6 | `mind-map`, `organization-chart`, `network-graph`, `flow-diagram`, `fishbone-diagram` |
| Custom HTML/SVG | `venn`, `spreadsheet` |
| Remote only | None as of this writing — all 26 have local paths |

If a new type appears in the upstream API and is not yet mapped locally, `gen-chart.mjs` returns a placeholder explaining the situation. File an issue to add the mapping.

## Common Errors

### `InstallHintError: Puppeteer runtime not available`

Run `node visual-content/scripts/preflight.mjs` — the output includes copy-paste install commands.

### `local render error: Unknown palette: 'xyz'`

You passed a color palette name that G2 doesn't support. Use a hex color range instead: `range: ['#5B8FF9', '#E8684A']`. Valid built-in palettes: `blues`, `greens`, `reds`, `viridis`, `plasma`, `turbo`, `rdBu`, `rdYlGn`, `spectral`.

### `api returned failure: {success: false, ...}`

Remote API rejected the spec. Check: `data` format matches the type (see `references/chart-types.md`), `source: "chart-visualization-skills"` is set, `type` is a valid name. `gen-chart.mjs` will auto-fall-back to local — if that also fails, read `remoteError` and `localError` in the JSON output.

### Output PNG is blank / white

Usually: the chart element rendered off-screen. Check the `width` / `height` in the spec; they default to 600 / 400. For large data sets, increase the canvas. For G6 graphs, the viewport might need adjustment — try `width: 1200, height: 800`.

## Upstream References

- AntV: https://antv.antgroup.com
- G2 (statistical charts): https://g2.antv.antgroup.com
- G6 (graph / network): https://g6.antv.antgroup.com
- Infographic: https://infographic.antv.vision
- Original skills repo: https://github.com/antvis/chart-visualization-skills (MIT)
