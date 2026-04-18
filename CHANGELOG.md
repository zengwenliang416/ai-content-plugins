# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **visual-content**: `lib/puppeteer-helper.mjs` — shared browser bootstrapping with three-tier resolution (`puppeteer` bundled → `puppeteer-core` + system Chrome → explicit `VIS_CHROME_PATH`). Auto-detects Chrome/Chromium/Edge/Brave on macOS/Linux/Windows. Provides `InstallHintError` with copy-paste repair commands.
- **visual-content**: `scripts/preflight.mjs` — one-shot readiness check (Node ≥ 18, Puppeteer runtime, AntV API / CDN reachability). Exits 0 all-green / 1 required-failed / 2 optional-warnings. Supports `--json` and `--verbose`.
- **visual-content**: `TROUBLESHOOTING.md` — dedicated guide for Puppeteer setup, network fallbacks, chart type support matrix, and common errors.
- **visual-content/chart-visualization**: Local fallback expanded from 11/26 to 24/26 chart types via three renderers — G2 (17 statistical), G6 (5 graph/tree), custom HTML/SVG (2). No upstream API needed for any mapped type. New `--html-only` flag emits HTML without launching a browser.
- **visual-content**: Four new AntV-powered data visualization skills migrated from `antvis/chart-visualization-skills` (MIT):
  - `chart-visualization` — 26+ chart types (bar/line/pie/sankey/radar/mind-map/...) via AntV GPT-Vis API with a local Puppeteer+G2 fallback. Survives API outages.
  - `icon-retrieval` — SVG icon search via WeaveFox API with 30-day content-addressed local cache.
  - `infographic-dsl` — 58 structured-data templates (SWOT, quadrants, timelines, tree, mind maps, DAG) via AntV Infographic DSL, rendered HTML + PNG + SVG. Uses jsDelivr → unpkg CDN fallback.
  - `narrative-text-viz` — T8 Syntax narrative reports with inline mini charts + semantic entity annotations (HTML/React/Vue).
- **visual-content**: Four new slash commands — `/visual-content:chart`, `:icon`, `:infographic-dsl`, `:narrative-viz` — each with upstream artifact auto-detection and pipeline-mode output routing.
- **topic-research/deep-research**: Task 4 now prefers the AntV data-viz skills for structured charts (timelines, benchmarks, positioning maps) and reserves AI image generation for conceptual visuals.
- **topic-research/daily-brief**: Optional chart uplift hook for numeric daily signals.
- **content-analysis/trend-analysis**: Step 4 now offers rendered chart images (beyond ASCII art) via `/visual-content:chart` and `/visual-content:infographic-dsl`.

### Changed

- **visual-content**: Bumped plugin to `0.2.0`; added upstream credits (`antvis/chart-visualization-skills`, MIT) to `plugin.json`.
- **visual-content/visual-generator agent**: Extended service list and added a skill-selection decision tree (structured data → chart/narrative-viz/infographic-dsl; prose → cards/slides/illustrations).
- Clarify that `xhs-images` source markdown should strip hashtag lines before rendering cards (visual-content)
- Rework `xhs-card` from outline planning into a Markdown-to-image rendering workflow with explicit runtime requirements
- Add `allowed-tools` metadata across marketplace skills and wire `Stop` hooks for plugin-level failure logging
- Expand visual style counts, compatibility matrices, and recommendation rules to cover `claymorphic-ui`
- Add anti-AI writing guardrails and humanizer handoff guidance across writing, planning, and research skills
- Align OpenSpec governance artifacts and active changes to the `openspec/runtime/` contract root
- Enforce single-route `next.command` semantics in OpenSpec change artifacts and templates
- Standardize visual pipeline outputs under `openspec/runtime/deep-research/<slug>/visuals/` and standalone `openspec/runtime/visuals/`

### Added

- Sync Codex CLI bundle registration, newly mirrored workflow skills, and Xiaohongshu rendering assets (codex-cli)
- Add script-backed Xiaohongshu card rendering assets with CSS themes and auto-sliced PNG output
- Add dedicated agent profile docs across audience-management, research, production, utility, publishing, and visual plugins
- Add `claymorphic-ui` style references for article illustration, infographic, and Xiaohongshu visual workflows
- Add `humanizer` skill and `/content-utilities:humanize` command for rewriting drafts that still read like AI-generated text
- Add cross-skill artifact handoff for full content pipeline: daily-brief → brainstorm → deep-research → long-article → cover-image → markdown-to-html → check-quality → post-to-wechat
- Add unified output directory convention: all generated artifacts saved to `openspec/runtime/` at project root
- Add Output Persistence to daily-brief and topic-brainstorm skills with YAML frontmatter
- Add Input Handling to brainstorm (reads daily-brief), deep-research (reads brainstorm), article-builder (reads deep-research), and 4 downstream skills
- Add Output Directory Convention to deep-research: standardized filenames (research.md, data-workbook.md, analysis.md, article.md) in shared `<slug>/` directory
- Add Pipeline Context to cover-generator for auto-detection of articles in openspec/runtime/
- Add Artifact Handoff sections to all 8 pipeline commands with upstream auto-detection, AskUserQuestion multi-choice, and next-step suggestions
- Add platform-specific hard limits to short-post skill: 小红书 title 20 chars, 微博 section, LinkedIn/WeChat constraints (content-production)
- Add news-search multi-platform search skill and commands supporting 12+ platforms (topic-research)
- Integrate news-search platform sources into all plugin skills with 24h freshness protocol (skills)
- Add AskUserQuestion bilingual language selection to all content-analysis commands (content-analysis)
- Add AskUserQuestion bilingual language selection to all content-production commands (content-production)
- Add AskUserQuestion bilingual language selection to all topic-research commands (topic-research)
- Add AskUserQuestion bilingual language selection to all growth-ops commands (growth-ops)
- Add AskUserQuestion bilingual language selection to all audience-management commands (audience-management)
- add Codex CLI workflow bundle and installer

### Fixed

- Fix `md-to-html` to fall back from `bun` to `npx bun` and preserve usable local image paths in generated HTML (codex-cli)
- Ensure plugin Stop hooks create `logs/` before appending failure records (marketplace)
- Fix fenced code block and ruby text examples in markdown formatter/html skill docs
- Fix image insertion workflow: Task 4 now copies images from ~/banana-images/ to article output directory with chart_index.txt manifest
- Fix Task 5 article assembly: add Visual Embedding Protocol with relative ./images/ paths and verification checklist
- Fix article-template.md: replace [Visual: chart_XX] placeholders with concrete markdown image syntax
- Fix wechat-publisher cover image path: check `images/cover.png` (consistent with pipeline) before `imgs/cover.png` fallback
- Fix news-search enforcement: add mandatory CONSTRAINT block to 17 SKILL.md files preventing WebSearch substitution for news-search CLI (skills)
- Fix daily-brief data architecture: restructure into 3-layer model (MCP + news-search + WebSearch supplementary) with Step 0 pre-flight diagnostic (daily-brief)
- Fix upstream artifact auto-detection: add mandatory CONSTRAINT to 7 pipeline skills enforcing auto-scan before asking user for input (skills)
