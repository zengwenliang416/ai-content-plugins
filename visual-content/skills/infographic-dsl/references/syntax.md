# AntV Infographic DSL Syntax

The Infographic DSL is a human-readable, indentation-sensitive language for describing infographic structure + data + theme. It was designed for AI streaming output.

## Anatomy

```
infographic <template-name>
data
  title <title>
  desc <description>
  <main-data-field>
    ...
theme
  ...
```

## Rules

1. **First line** is always `infographic <template-name>`.
2. **Indentation** is two spaces; tabs are not accepted.
3. **Key/value**: separated by a single space. `key value-with-spaces-allowed`.
4. **Arrays**: each item starts with `- `. Sub-fields of an item use one more indent level.
5. **Main data field**: pick *one* matching the template family (listed below). Never mix `lists` + `items`.

## Main Data Field by Template Family

| Template Family | Main Data Field | Structure |
|---|---|---|
| `list-*` | `lists` | Array of items with `label`, `value?`, `desc?`, `icon?` |
| `sequence-*` | `sequences` | Array of items; optional `order asc\|desc` |
| `compare-*` | `compares` | Array; supports `children` for grouped comparisons |
| `compare-binary-*` / `compare-hierarchy-left-right-*` | `compares` | **Exactly two** root entries, all comparisons under their `children` |
| `hierarchy-*` (tree / mindmap) | `root` | Single root; nested `children` (do not repeat `root`) |
| `hierarchy-structure` | `items` | Array, each item is an independent hierarchy, up to 3 levels |
| `relation-*` | `nodes` + `relations` | Nodes with `id` + `label`; relations as arrows |
| `chart-*` | `values` | Numeric array with `label` + `value` |
| fallback | `items` | Generic, use only when template family is unclear |

## Icons

Icons use keyword syntax:

```
icon document text
icon star fill
icon account multiple
```

Multiple keywords improve match precision. Use `infographic-icon` skill to pre-validate keywords when in doubt.

## Arrow Syntax (relation templates)

Two equivalent forms for edge labels:

```
A - approves -> B        # dash-label-dash-arrow form
A -->|approves| B        # mermaid-style pipe form
```

## Theme Block

```
theme
  stylize rough           # built-in style preset
  palette
    - #3b82f6
    - #8b5cf6
    - #f97316
  base
    text
      font-family Noto Sans CJK SC
```

Built-in stylize presets:

| Preset | Effect |
|---|---|
| `rough` | Hand-drawn sketchy aesthetic |
| `pattern` | Pattern fill (dots, lines) |
| `linear-gradient` | Linear gradient fills |
| `radial-gradient` | Radial gradient fills |

Custom fonts via `theme.base.text.font-family`. Japanese handwritten: `851tegakizatsu`.

## Language Rule

Text fields (`title`, `label`, `desc`) must match the user's input language. If user writes in Chinese, the DSL content is Chinese — only keyword fields (`icon`, `stylize`, `infographic`, template name) stay English.

## Validation Errors and Fixes

| Error | Fix |
|---|---|
| "Template `x` not found" | Check `templates.md` — template names are exact |
| "Unexpected field `items` on sequence template" | Use `sequences`, not `items` |
| "Binary template requires 2 roots" | For `compare-binary-*`, provide exactly 2 top-level `compares` entries |
| "Hierarchy `root` must be single object" | Replace array `root:\n  - ...` with single `root:\n  label ...\n  children` |
| Icon not found | Fall back to broader keywords (e.g., `document` instead of `specific-report-type`) |

## Minimal Examples

**List**:
```
infographic list-grid-badge-card
data
  title Features
  lists
    - label Fast
      icon flash
    - label Secure
      icon shield check
```

**Sequence (timeline)**:
```
infographic sequence-timeline-simple
data
  title Roadmap
  sequences
    - time 2024 Q3
      label Launch
      desc Public beta
    - time 2025 Q1
      label GA
  order asc
```

**Hierarchy (tree)**:
```
infographic hierarchy-tree-curved-line-rounded-rect-node
data
  root
    label Company
    children
      - label Engineering
        children
          - label Frontend
          - label Backend
      - label Product
```

**Compare (SWOT)**:
```
infographic compare-swot
data
  compares
    - label Strengths
      children
        - label Brand power
        - label Loyal users
    - label Weaknesses
      children
        - label High cost
    - label Opportunities
      children
        - label New markets
    - label Threats
      children
        - label Competition
```

**Chart (bar)**:
```
infographic chart-column-simple
data
  title Monthly Visits
  values
    - label Jan
      value 1200
    - label Feb
      value 1450
```

**Relation**:
```
infographic relation-dagre-flow-tb-simple-circle-node
data
  nodes
    - id plan
      label Plan
    - id build
      label Build
    - id ship
      label Ship
  relations
    plan - requires -> build
    build -->|blocks if failed| ship
```
