# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

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

- Ensure plugin Stop hooks create `logs/` before appending failure records (marketplace)
- Fix fenced code block and ruby text examples in markdown formatter/html skill docs
- Fix image insertion workflow: Task 4 now copies images from ~/banana-images/ to article output directory with chart_index.txt manifest
- Fix Task 5 article assembly: add Visual Embedding Protocol with relative ./images/ paths and verification checklist
- Fix article-template.md: replace [Visual: chart_XX] placeholders with concrete markdown image syntax
- Fix wechat-publisher cover image path: check `images/cover.png` (consistent with pipeline) before `imgs/cover.png` fallback
- Fix news-search enforcement: add mandatory CONSTRAINT block to 17 SKILL.md files preventing WebSearch substitution for news-search CLI (skills)
- Fix daily-brief data architecture: restructure into 3-layer model (MCP + news-search + WebSearch supplementary) with Step 0 pre-flight diagnostic (daily-brief)
- Fix upstream artifact auto-detection: add mandatory CONSTRAINT to 7 pipeline skills enforcing auto-scan before asking user for input (skills)
