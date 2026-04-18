# Infographic Template Catalog (58 templates)

Grouped by family. Picking the right template is the single most important choice.

## chart-* (6) — Data + minimal prose

| Template | Best For |
|---|---|
| `chart-bar-plain-text` | Simple ranked bar chart |
| `chart-column-simple` | Monthly / categorical counts |
| `chart-line-plain-text` | Trend sketch |
| `chart-pie-compact-card` | Proportion with labels |
| `chart-pie-donut-pill-badge` | Proportion + highlighted segment |
| `chart-pie-donut-plain-text` | Minimal donut |
| `chart-pie-plain-text` | Plain pie |
| `chart-wordcloud` | Text frequency |

## compare-* (7) — Side-by-side

| Template | Best For |
|---|---|
| `compare-binary-horizontal-badge-card-arrow` | Pros vs Cons with arrows |
| `compare-binary-horizontal-simple-fold` | Simple A vs B |
| `compare-binary-horizontal-underline-text-vs` | Text-heavy vs |
| `compare-hierarchy-left-right-circle-node-pill-badge` | Hierarchical two-sided |
| `compare-quadrant-quarter-circular` | 2×2 matrix (circular) |
| `compare-quadrant-quarter-simple-card` | 2×2 matrix (clean cards) |
| `compare-swot` | SWOT analysis |

## hierarchy-* (5) — Tree / nested

| Template | Best For |
|---|---|
| `hierarchy-mindmap-branch-gradient-capsule-item` | Mind map with gradient branches |
| `hierarchy-mindmap-level-gradient-compact-card` | Tight mind map with cards |
| `hierarchy-structure` | Independent hierarchies (multiple roots OK) |
| `hierarchy-tree-curved-line-rounded-rect-node` | Soft org chart |
| `hierarchy-tree-tech-style-badge-card` | Tech-y hierarchy |
| `hierarchy-tree-tech-style-capsule-item` | Tech-y hierarchy, pill style |

## list-* (10) — Itemized

| Template | Best For |
|---|---|
| `list-column-done-list` | Checked todo-style list |
| `list-column-simple-vertical-arrow` | Steps down |
| `list-column-vertical-icon-arrow` | Steps with icons |
| `list-grid-badge-card` | Feature grid with badges |
| `list-grid-candy-card-lite` | Colorful feature grid |
| `list-grid-ribbon-card` | Feature grid with ribbons |
| `list-row-horizontal-icon-arrow` | Horizontal timeline-like row |
| `list-sector-plain-text` | Pie-sector layout |
| `list-zigzag-down-compact-card` | Zigzag flow down (compact) |
| `list-zigzag-down-simple` | Zigzag flow down (simple) |
| `list-zigzag-up-compact-card` | Zigzag flow up (compact) |
| `list-zigzag-up-simple` | Zigzag flow up (simple) |

## relation-* (4) — Graph

| Template | Best For |
|---|---|
| `relation-dagre-flow-tb-animated-badge-card` | Animated top-bottom flow with cards |
| `relation-dagre-flow-tb-animated-simple-circle-node` | Animated top-bottom flow (minimal) |
| `relation-dagre-flow-tb-badge-card` | Static flow with cards |
| `relation-dagre-flow-tb-simple-circle-node` | Static flow (minimal) |

## sequence-* (17) — Process / steps

| Template | Best For |
|---|---|
| `sequence-ascending-stairs-3d-underline-text` | 3D ascending stairs |
| `sequence-ascending-steps` | Flat ascending steps |
| `sequence-circular-simple` | Circular progress |
| `sequence-color-snake-steps-horizontal-icon-line` | Colorful snake with icons |
| `sequence-cylinders-3d-simple` | 3D cylinder stack |
| `sequence-filter-mesh-simple` | Filter / funnel mesh |
| `sequence-funnel-simple` | Classic funnel |
| `sequence-horizontal-zigzag-underline-text` | Horizontal zigzag |
| `sequence-mountain-underline-text` | Mountain peak progression |
| `sequence-pyramid-simple` | Pyramid stack |
| `sequence-roadmap-vertical-plain-text` | Roadmap (text-heavy) |
| `sequence-roadmap-vertical-simple` | Roadmap (minimal) |
| `sequence-snake-steps-compact-card` | Snake with cards |
| `sequence-snake-steps-simple` | Snake (minimal) |
| `sequence-snake-steps-underline-text` | Snake with underlined text |
| `sequence-stairs-front-compact-card` | Front-view stairs with cards |
| `sequence-stairs-front-pill-badge` | Front-view stairs with pills |
| `sequence-timeline-rounded-rect-node` | Timeline with rounded nodes |
| `sequence-timeline-simple` | Clean timeline |
| `sequence-zigzag-pucks-3d-simple` | 3D zigzag pucks |
| `sequence-zigzag-steps-underline-text` | Zigzag steps with underlined text |

## Selection Heuristics

| Intent | First Choice | Backup |
|---|---|---|
| Chronological events | `sequence-timeline-simple` | `sequence-roadmap-vertical-simple` |
| Product roadmap | `sequence-roadmap-vertical-plain-text` | `sequence-timeline-rounded-rect-node` |
| Growth / ascending steps | `sequence-ascending-stairs-3d-underline-text` | `sequence-ascending-steps` |
| Funnel (conversion) | `sequence-funnel-simple` | `sequence-filter-mesh-simple` |
| Pros vs Cons | `compare-binary-horizontal-simple-fold` | `compare-binary-horizontal-badge-card-arrow` |
| SWOT | `compare-swot` | — |
| Priority matrix | `compare-quadrant-quarter-simple-card` | `compare-quadrant-quarter-circular` |
| Org structure | `hierarchy-tree-curved-line-rounded-rect-node` | `hierarchy-tree-tech-style-badge-card` |
| Mind map | `hierarchy-mindmap-level-gradient-compact-card` | `hierarchy-mindmap-branch-gradient-capsule-item` |
| Independent categories | `hierarchy-structure` | — |
| Feature grid | `list-grid-badge-card` | `list-grid-ribbon-card` |
| Todo / checklist | `list-column-done-list` | — |
| Pipeline / DAG | `relation-dagre-flow-tb-badge-card` | `relation-dagre-flow-tb-simple-circle-node` |
| Word cloud | `chart-wordcloud` | — |
| Donut stat | `chart-pie-donut-pill-badge` | `chart-pie-donut-plain-text` |
