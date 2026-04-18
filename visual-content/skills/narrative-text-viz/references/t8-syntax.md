# T8 Syntax Specification

T8 = **T**ext + **8** (byte metaphor for "deeper insight"). A Markdown-like language that wraps numeric / qualitative data points in semantic tags so the renderer can style them consistently and enable downstream tooling (search, filtering, export).

## Document Structure

Standard Markdown for skeleton:

- Headings: `#` … `######` (H1–H6), one heading per line, one space after `#`.
- Paragraphs: blank-line separated.
- Lists: `-` or `1.` prefix with space.
- Emphasis: `*italic*`, `**bold**`.
- Code spans: backticks.
- Blockquotes: `> `.

## Entity Tags — The Core Concept

Wrap every meaningful data point in `{kind:value|attr=val|...}`. The renderer turns these into styled spans with tooltip, color, and optional sparklines.

### Entity Kinds

| Kind | Used For |
|---|---|
| `metric` | A named measurable quantity (e.g., `Active Users`, `CAC`) |
| `value` | A numeric reading of a metric |
| `trend` | Direction over time (`up`, `down`, `stable`) |
| `dimension` | A slicing field (time period, region, segment) |
| `delta` | A change amount (`+12%`, `-3K`) |
| `ratio` | A proportion (`65%`, `0.42`) |

### Attributes

| Attribute | Purpose | Example |
|---|---|---|
| `origin` | Source / provenance | `origin=analytics` |
| `assessment` | Positive / negative / neutral | `assessment=positive` |
| `trend` | Co-annotate direction on a value | `trend=up` |
| `baseline` | What the value is compared against | `baseline=Q2 2025` |
| `unit` | Display unit | `unit=USD` |

Attributes are `|`-separated. Values containing `|` or `}` must be escaped with `\`.

## Syntax Examples

**Metric + value + trend**:
```
{metric:Active Users|origin=analytics} reached {value:1.2M|assessment=positive|trend=up}
in {dimension:Q3 2025}, a {delta:+23%|baseline=Q2 2025} increase.
```

**Ratio with assessment**:
```
{metric:Gross Margin}: {ratio:38%|assessment=positive} (target: {value:35%}).
```

**Inline trend marker**:
```
Revenue is {trend:up|assessment=positive} for the fifth consecutive quarter.
```

## Inline Mini Charts

Embed small charts inline:

```
<pie data='[{"label":"Chrome","value":65},{"label":"Safari","value":25},{"label":"Other","value":10}]' />

<line data='[{"x":"Jan","y":100},{"x":"Feb","y":120},{"x":"Mar","y":150}]' />

<bar data='[{"label":"A","value":40},{"label":"B","value":60}]' />
```

**Rules**:
- `data` attribute must be valid JSON (single-quoted outer, double-quoted inner).
- Supported: `<pie>`, `<line>`, `<bar>`.
- Sizing is auto (fills inline context); override with `width="400" height="200"`.
- For larger charts → use the separate `chart-visualization` skill and reference the image.

## Authoring Rules

1. **Every number worth highlighting** → wrap in `{value:...}` or `{ratio:...}`. Raw numbers in prose dilute the narrative density.
2. **Every metric name** → wrap in `{metric:...}` on first mention. Subsequent mentions can be plain.
3. **Every time period / segment** → wrap in `{dimension:...}` for filterable narratives.
4. **Sources are required**: every metric gets `origin=` on first mention.
5. **Minimum density**: aim for 1 entity per 30 words (standard length).
6. **Minimum length**: 800 words (standard) unless user overrides.

## Assessment Guidance

Use `assessment=positive|negative|neutral` for values where a direction is meaningful. Leave it off for neutral facts.

| Example | Assessment |
|---|---|
| Revenue grew 20% | positive |
| Churn rose 5% | negative |
| Team headcount 120 | (no assessment) |

The renderer uses this to pick green / red / neutral accents.

## Structure Template

```
# <Topic> <Period> Analysis

## Summary

<2–3 sentence executive summary with 3–5 entity tags>

## Key Metrics

- {metric:X|origin=...}: {value:...|assessment=...}
- {metric:Y|origin=...}: {value:...}

<pie data='...' />

## Trends

<3–5 paragraphs with dense entity tags and inline <line> charts>

## Drivers

<What moved the metrics — root cause analysis with {dimension:...} slicing>

## Outlook

<1–2 paragraphs on forward-looking signals>
```

## Validation Checklist

Before rendering, verify:

- [ ] ≥ 5 distinct metrics wrapped as `{metric:...}`
- [ ] All metrics have `origin=` on first mention
- [ ] Total word count meets target
- [ ] ≥ 1 inline chart per major section
- [ ] No raw numeric strings outside entity wraps (search: `/\d+/` and audit)
- [ ] All `data='...'` attributes parse as JSON
- [ ] Heading hierarchy is logical (one H1, 2–6 H2s)

## Rendering Frameworks

| Framework | Import | Usage |
|---|---|---|
| HTML | `https://cdn.jsdelivr.net/npm/@antv/t8@latest/dist/t8.min.js` | `T8.render(element, content)` |
| React | `import { T8 } from '@antv/t8'` | `<T8 content={content} />` |
| Vue | `import { T8 } from '@antv/t8'` | `<T8 :content="content" />` |

All frameworks respect the same T8 syntax.
