# AI Content Agents — LLM Documentation Index

Three OpenClaw agents with 56 skills for AI content creators — covering research, writing, and operations.

---

## Overview

| File                                                         | Description                                                                                                                                                                              |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [overview/project-overview.md](overview/project-overview.md) | Project purpose, 3-agent inventory (Researcher 18, Writer 16, Operator 22), workspace-per-agent architecture, technology stack, installation, skill distribution by category, known gaps |

## Architecture

| File                                                                                     | Description                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [architecture/agent-system.md](architecture/agent-system.md)                             | OpenClaw agent registration via `openclaw.json`, workspace-per-agent pattern (identity/soul/instructions/memory/skills layers), install process, agent inter-relationships and shared resources                                     |
| [architecture/skill-system.md](architecture/skill-system.md)                             | SKILL.md format with OpenClaw frontmatter, progressive disclosure via `references/`, EXTEND.md two-level config (blocking vs defaulting), prompt file discipline, partial workflow flags, cross-skill pipelines                     |
| [architecture/news-search-infrastructure.md](architecture/news-search-infrastructure.md) | Shared news-search data layer across all agents, 12+ platforms (3 tiers), CLI interface (search/read/doctor/config), 24h data freshness protocol, MCP server integration (HN, arXiv, RSS)                                           |
| [architecture/content-lifecycle.md](architecture/content-lifecycle.md)                   | Research-Write-Publish pipeline, 7-stage content lifecycle (Plan through Rebalance), cross-agent data flows via implicit file-based handoffs, WRITE/MONITOR/SKIP decision framework, feedback loops                                 |
| [architecture/visual-generation.md](architecture/visual-generation.md)                   | ai-image-gen core engine (4 providers: Google, OpenAI, DashScope, Replicate), 6 specialized visual skills, dimension systems (covers, infographics, comics, slides, cards), reference image chains, script-based PDF/PPTX pipelines |
| [architecture/publishing-system.md](architecture/publishing-system.md)                   | Human-in-the-loop safety model, WeChat (API + Chrome CDP) and X/Twitter (CDP only) platforms, md-to-html format conversion with 3 themes, CJK typography via md-formatter, credential management, pre-publish review gate           |

## Guides

| File                                                                 | Description                                                                                                                                                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [guides/agent-workspace-guide.md](guides/agent-workspace-guide.md)   | Creating agent workspaces with required files, configuring personality (IDENTITY/SOUL/AGENTS/TOOLS), adding skills, install.sh walkthrough, memory system usage                                          |
| [guides/creating-skills.md](guides/creating-skills.md)               | Step-by-step skill creation: directory setup, SKILL.md frontmatter, workflow body, references, scripts, EXTEND.md config, workspace registration, validation checklist                                   |
| [guides/news-search-guide.md](guides/news-search-guide.md)           | Using news-search across 12+ platforms, tool setup by tier, data freshness overrides, configuration management, integration with consuming skills across all agents, troubleshooting                     |
| [guides/content-workflow-guide.md](guides/content-workflow-guide.md) | Four workflow recipes: daily publishing (brief to publish), deep research (brainstorm to field-overview), visual content (covers/infographics/comics/slides/cards), analytics (performance to rebalance) |
| [guides/visual-content-guide.md](guides/visual-content-guide.md)     | Practical recipes for generating covers, infographics, knowledge comics, slide decks, XiaoHongShu cards, and EXTEND.md setup for visual skills                                                           |
| [guides/publishing-guide.md](guides/publishing-guide.md)             | Publishing to WeChat (API and browser methods) and X/Twitter (CDP), standalone markdown-to-HTML conversion, review-checklist usage, credential setup for both platforms                                  |

## Reference

| File                                                               | Description                                                                                                                                                                                          |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [reference/coding-conventions.md](reference/coding-conventions.md) | Agent workspace file formats, SKILL.md frontmatter schema, EXTEND.md config pattern, naming conventions, output format standards, script conventions, reference file pattern, prompt file discipline |
| [reference/git-conventions.md](reference/git-conventions.md)       | Branch strategy (main + feature branches), Conventional Commits format with agent-scoped types, .gitignore patterns, contribution workflow                                                           |

---

## Quick Navigation

| Question                                    | Document                                                                    |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| What is this project?                       | [project-overview.md](overview/project-overview.md)                         |
| How are agents registered and structured?   | [agent-system.md](architecture/agent-system.md)                             |
| How do skills work?                         | [skill-system.md](architecture/skill-system.md)                             |
| How do I create a new skill?                | [creating-skills.md](guides/creating-skills.md)                             |
| How do I set up a new agent workspace?      | [agent-workspace-guide.md](guides/agent-workspace-guide.md)                 |
| How does news-search work?                  | [news-search-infrastructure.md](architecture/news-search-infrastructure.md) |
| How do I use news-search?                   | [news-search-guide.md](guides/news-search-guide.md)                         |
| What is the content lifecycle?              | [content-lifecycle.md](architecture/content-lifecycle.md)                   |
| What daily/research/visual workflows exist? | [content-workflow-guide.md](guides/content-workflow-guide.md)               |
| How does image generation work?             | [visual-generation.md](architecture/visual-generation.md)                   |
| How do I generate covers, comics, or cards? | [visual-content-guide.md](guides/visual-content-guide.md)                   |
| How does publishing work?                   | [publishing-system.md](architecture/publishing-system.md)                   |
| How do I publish to WeChat or X?            | [publishing-guide.md](guides/publishing-guide.md)                           |
| What are the coding conventions?            | [coding-conventions.md](reference/coding-conventions.md)                    |
| What is the commit message format?          | [git-conventions.md](reference/git-conventions.md)                          |
| What are the known gaps/risks?              | [project-overview.md](overview/project-overview.md) (Known Gaps section)    |

---

Generated: 2026-02-28 | Docs: 15 | Categories: 4 (overview, architecture, guides, reference)
