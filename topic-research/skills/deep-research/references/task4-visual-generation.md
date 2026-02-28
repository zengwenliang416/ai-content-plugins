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

## Image File Management

### banana-image Output Handling

The `banana-image` MCP tool saves generated images to `~/banana-images/` by default.
The tool returns a JSON response containing the `output_path` field with the full file path.

**CRITICAL**: After each image generation call:

1. **Capture the output path** from the banana-image response (the `output_path` field)
2. **Record it** in a running list mapping chart ID to actual filename

### Output Directory

All visual assets MUST be placed in the article's output directory:

```
ai-content-output/deep-research/<article-slug>/images/
```

### Post-Generation Steps

After ALL images are generated:

1. **Create the images directory**: `mkdir -p <output-dir>/images/`
2. **Copy each image** from `~/banana-images/<filename>.png` to `<output-dir>/images/<filename>.png`
3. **Verify** all files exist at their new paths using `ls`
4. **Create chart_index.txt** in the images directory with the mapping (see format below)

### ARTICLE EMBEDDING Section in chart_index.txt

The chart_index.txt MUST include a copy-paste ready `ARTICLE EMBEDDING` section with markdown image syntax that Task 5 can use directly:

```
ARTICLE EMBEDDING (copy-paste ready):
![Development Timeline](./images/<filename>.png)
*Figure 1: Development Timeline. Source: [Source].*

![Field Overview](./images/<filename>.png)
*Figure 2: Field Overview. Source: [Source].*
```

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
Output dir: <output-dir>/images/
Total files: [N]

MANDATORY VISUALS:
chart_01 | <actual_filename>.png | Development Timeline | Section 3
chart_05 | <actual_filename>.png | Performance Benchmarks | Section 5
chart_09 | <actual_filename>.png | Adoption Trend | Section 5
chart_14 | <actual_filename>.png | Competitive Positioning Map | Section 4

REQUIRED VISUALS:
[chart_id | actual_filename.png | description | target section]

OPTIONAL VISUALS:
[chart_id | actual_filename.png | description | target section]

ARTICLE EMBEDDING (copy-paste ready for Task 5):
![Development Timeline](./images/<actual_filename>.png)
*Figure 1: Development Timeline. Source: [Source].*

![Performance Benchmarks](./images/<actual_filename>.png)
*Figure 2: Performance Benchmarks. Source: [Source].*

[... one entry per generated image ...]
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
- [ ] All images copied from `~/banana-images/` to `<output-dir>/images/`
- [ ] All copied files verified with `ls <output-dir>/images/`
- [ ] chart_index.txt created with actual filenames, placement suggestions, AND ARTICLE EMBEDDING section
- [ ] All files named correctly (chart\_##\_description.png)
- [ ] Packaged in zip

---

## Deliverable

`[Topic]_Visuals_[Date].zip`

Contains:

- chart_01_description.png through chart_N_description.png (15-25 files)
- chart_index.txt
