# Task 4: Visual Asset Generation - Detailed Workflow

This document provides step-by-step instructions for executing Task 4 (Visual Asset Generation) of the deep-research skill.

## Task Overview

**Purpose**: Generate 15-25 professional charts, diagrams, and infographics to accompany the article.

**Prerequisites**: Tasks 1, 2, and 3 complete

**Output**: Zip file containing 15-25 PNG/JPG files at 300 DPI + chart_index.txt

---

## Visual Types by Category

### Category A: Timeline & History (from Task 1)

**chart_01: Development Timeline**
- Type: Horizontal timeline diagram
- Data source: Task 1 research document (milestone dates)
- Content: Key milestones from field origins to present
- Format: Clean horizontal flow, group by era, highlight breakthroughs
- MANDATORY

**chart_02: Research Paper Volume**
- Type: Bar chart (annual paper count)
- Data source: arXiv search, Google Scholar trends
- Content: Papers published per year in this field
- Shows: Field growth trajectory

### Category B: Technical (from Task 1 + Task 2)

**chart_03: Architecture Diagram**
- Type: System diagram / flowchart
- Data source: Task 1 technical deep dive
- Content: How the core technology works (high-level architecture)
- Format: Clean boxes and arrows, labeled components

**chart_04: Mechanism Comparison**
- Type: Side-by-side diagram or table
- Data source: Task 1 competing approaches section
- Content: How major approaches differ technically

**chart_05: Performance Benchmarks**
- Type: Grouped bar chart or radar chart
- Data source: Task 2 Technical Benchmarks tab
- Content: Major players' scores on canonical benchmarks
- MANDATORY

### Category C: Players & Ecosystem (from Task 1 + Task 2)

**chart_06: Player Comparison Matrix**
- Type: Heat map or structured table
- Data source: Task 2 Player Comparison tab
- Content: Players rated across key dimensions (capability, access, commercial, research)

**chart_07: Feature Comparison Table**
- Type: Feature matrix (checkmarks/ratings)
- Data source: Task 2 Player Comparison tab
- Content: Which features/capabilities each player supports

**chart_08: Ecosystem Map**
- Type: Network diagram or category diagram
- Data source: Task 1 key players section
- Content: Players organized by type (commercial, open-source, research) with connections

### Category D: Market & Adoption (from Task 2)

**chart_09: Adoption Trend**
- Type: Line or area chart
- Data source: Task 2 Adoption Metrics tab
- Content: Usage/adoption growth over time
- MANDATORY

**chart_10: Market Size**
- Type: Bar chart with trend line
- Data source: Task 2 Market Data tab
- Content: Market size by year (historical + projected)

**chart_11: Geographic Spread**
- Type: World map heat map or regional bar chart
- Data source: Task 2 Adoption Metrics tab (geographic data)
- Content: Where adoption is concentrated

### Category E: Competitive Landscape (from Task 3)

**chart_12: Competitive Landscape Overview**
- Type: Category diagram or bubble chart
- Data source: Task 3 Comparative Analysis tab
- Content: How players are positioned in the overall landscape

**chart_13: Moat Analysis**
- Type: Bar chart (rated 1-5 per dimension per player)
- Data source: Task 3 analysis
- Content: Competitive moat strength by dimension (technology, data, distribution, talent)

**chart_14: Competitive Positioning Map**
- Type: 2×2 matrix or scatter plot
- Data source: Task 3 analysis
- X-axis: e.g., Open vs. Proprietary
- Y-axis: e.g., Research-focused vs. Product-focused
- MANDATORY

### Category F: Forward-Looking (from Task 3)

**chart_15: Scenario Projections**
- Type: Fan chart or 3-line chart (Optimistic/Base/Pessimistic)
- Data source: Task 2 Scenarios tab + Task 3 Trajectory Forecast tab
- Content: Field capability or market size projections under 3 scenarios

**chart_16: Trajectory Summary**
- Type: Arrow diagram or staged roadmap
- Data source: Task 3 Trajectory Forecast tab
- Content: Expected milestones and inflection points

### Optional Visuals (chart_17 through chart_25)

- Use-case application map (industry × capability grid)
- Funding landscape (investment by year by player type)
- Research paper cluster map (topics and sub-fields)
- Talent/hiring trends
- Cost/performance improvement curve
- Benchmark improvement over time (SOTA progression)
- Regulatory landscape map
- Open-source contribution activity
- Compute requirements trend

---

## Technical Specifications

**Resolution**: 300 DPI (print quality)
**Format**: PNG preferred, JPG acceptable
**Dimensions**: Minimum 1200×800px for landscape; 800×1200px for portrait
**Color palette**: Use a consistent palette across all visuals
**Typography**: Clear, readable labels; minimum 10pt equivalent at final size
**Style**: Clean, modern — avoid chartjunk, 3D effects, excessive gridlines

---

## File Naming Convention

```
chart_01_development_timeline.png
chart_02_paper_volume.png
chart_03_architecture_diagram.png
...
chart_16_trajectory_summary.png
```

## chart_index.txt Format

```
VISUAL ASSET INDEX
Topic: [Topic Name]
Date: [Date]
Total files: [N]

MANDATORY VISUALS:
chart_01 - Development Timeline [from Task 1]
chart_05 - Performance Benchmarks [from Task 2 Tab 3]
chart_09 - Adoption Trend [from Task 2 Tab 4]
chart_14 - Competitive Positioning Map [from Task 3]

REQUIRED VISUALS:
[list remaining required charts]

OPTIONAL VISUALS:
[list any optional charts created]

PLACEMENT SUGGESTIONS:
chart_01 → Section 3 (Development History)
chart_03 → Section 2 (Technical Overview)
chart_05 → Section 5 (Data & Benchmarks)
chart_09 → Section 5 (Data & Benchmarks)
chart_14 → Section 4 (Landscape)
...
```

---

## Quality Checklist

Before packaging:
- [ ] Minimum 15 visual files created
- [ ] All 4 mandatory visuals present
- [ ] All files open correctly
- [ ] Resolution at 300 DPI
- [ ] Consistent color palette
- [ ] All labels readable
- [ ] chart_index.txt created with placement suggestions
- [ ] All files named correctly (chart_##_description.png)
- [ ] Packaged in zip

---

## Deliverable

`[Topic]_Visuals_[Date].zip`

Contains:
- chart_01_description.png through chart_N_description.png (15-25 files)
- chart_index.txt
