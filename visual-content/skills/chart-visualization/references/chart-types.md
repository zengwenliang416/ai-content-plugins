# Chart Types Reference

Full spec for all 26+ chart types supported by the AntV GPT-Vis API. Each entry shows required/optional fields and a minimal example.

## Base Fields (all types)

```jsonc
{
  "type": "<chart-type>",
  "source": "chart-visualization-skills",  // always required
  "data": <type-specific>,
  "title": "string",                        // optional
  "theme": "default|academy|dark",          // optional
  "width": 600,                             // optional, default 600
  "height": 400,                            // optional, default 400
  "style": { "texture": "default|rough" }   // optional, rough = hand-drawn
}
```

Charts with Cartesian axes additionally accept `axisXTitle`, `axisYTitle`.

## Trend & Time Series

### `line` — Line chart
```json
{"type":"line","data":[{"time":"2025-01","value":100},{"time":"2025-02","value":120}],"title":"..."}
```
Data: `{ time: string, value: number, group?: string }[]`.

### `area` — Area chart
Data: same as `line`. Optional `stack: boolean`.

### `dual-axes` — Two y-axis metrics
```json
{"type":"dual-axes","categories":["Q1","Q2","Q3"],"series":[
  {"type":"column","data":[100,120,140],"axisYTitle":"Revenue"},
  {"type":"line","data":[0.1,0.12,0.15],"axisYTitle":"Margin"}
]}
```

### `scatter` — Correlation
Data: `{ x: number, y: number, group?: string }[]`.

## Comparison

### `bar` — Horizontal bar
Data: `{ category: string, value: number, group?: string }[]`. Default `stack: true`.

### `column` — Vertical bar
Data: same as `bar`. Default `group: true`.

### `waterfall` — Running total
Data: `{ category: string, value?: number, isTotal?: boolean, isIntermediateTotal?: boolean }[]`.

### `histogram` — Numeric distribution
Data: `number[]`. Optional `binNumber: number`.

## Proportion

### `pie` — Pie
Data: `{ category: string, value: number }[]`. Optional `innerRadius: 0..1`.

### `treemap` — Hierarchical proportion
Data: `{ name: string, value: number, children?: ... }[]` (up to 3 levels).

### `word-cloud`
Data: `{ text: string, value: number }[]`.

### `liquid` — Percent gauge
```json
{"type":"liquid","percent":0.68,"shape":"circle"}
```
`shape`: `circle | rect | pin | triangle`.

## Statistical

### `boxplot` / `violin`
Data: `{ category: string, value: number, group?: string }[]`.

### `radar` — Multi-dimensional
Data: `{ name: string, value: number, group?: string }[]`.

### `funnel` — Stage conversion
Data: `{ category: string, value: number }[]`.

## Relation & Flow

### `sankey` — Flow between nodes
Data: `{ source: string, target: string, value: number }[]`. Optional `nodeAlign`.

### `venn` — Set overlap
Data: `{ sets: string[], value: number, label?: string }[]`.

### `network-graph` / `flow-diagram`
```json
{"type":"network-graph","data":{
  "nodes":[{"name":"A"},{"name":"B"}],
  "edges":[{"source":"A","target":"B","name":"edge-label"}]
}}
```

### `fishbone-diagram` — Cause & effect
### `mind-map` — Radiating branches
Both share: `{ name: string, children?: ... }` (up to 3 levels).

### `organization-chart`
```json
{"type":"organization-chart","data":{
  "name":"CEO","description":"...",
  "children":[{"name":"CTO"},{"name":"CFO"}]
},"orient":"vertical"}
```

## Tabular

### `spreadsheet` — Table / pivot
```json
{"type":"spreadsheet","data":[
  {"region":"CN","product":"A","sales":100},
  {"region":"US","product":"B","sales":200}
],"rows":["region"],"columns":["product"],"values":["sales"]}
```

## Local Fallback Coverage

The Puppeteer+G2 fallback supports a subset — cleanest mappings:

| Supported locally | Delegated to remote only |
|---|---|
| line, area, bar, column, pie, scatter, histogram, radar, funnel, treemap, word-cloud | dual-axes, waterfall, sankey, venn, network-graph, flow-diagram, fishbone, mind-map, organization-chart, spreadsheet, boxplot, violin, liquid |

For the unsupported-locally types, `--offline` mode will emit a placeholder PNG; either use the remote API or export from a live HTML preview.
