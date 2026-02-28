# AI Content Plugins — LLM Documentation Index

Claude Cowork plugin marketplace for AI content creators: 8 plugins, 55 commands, 56 skills, 2 MCP servers.

---

## Overview

| File | Description |
|------|-------------|
| [overview/project-overview.md](overview/project-overview.md) | Project purpose, 8-plugin inventory, architecture patterns, known gaps |

## Architecture

| File | Description |
|------|-------------|
| [architecture/plugin-system.md](architecture/plugin-system.md) | Plugin directory layout, manifest schema, command system, skill triggers, MCP config, hooks |
| [architecture/content-lifecycle.md](architecture/content-lifecycle.md) | Full content lifecycle pipeline across 8 plugins, cross-plugin data flows, OpenSpec handoff contract, implicit+contracted patterns |
| [architecture/deep-research-pipeline.md](architecture/deep-research-pipeline.md) | 5-task deep research pipeline architecture, MCP integration, WRITE/MONITOR/SKIP framework |

## Guides

| File | Description |
|------|-------------|
| [guides/creating-plugins.md](guides/creating-plugins.md) | Step-by-step plugin creation: directory structure, manifest, commands, skills, MCP, marketplace registration |
| [guides/content-workflow-guide.md](guides/content-workflow-guide.md) | 5 practical workflow patterns for daily content creation using multiple plugins together |
| [guides/deep-research-guide.md](guides/deep-research-guide.md) | How to use the deep research pipeline effectively, task-by-task walkthrough |

## Reference

| File | Description |
|------|-------------|
| [reference/coding-conventions.md](reference/coding-conventions.md) | File formats, naming rules, SKILL.md variants, hooks schema, output conventions, OpenSpec contract conventions |
| [reference/git-conventions.md](reference/git-conventions.md) | Branch strategy, commit messages, contribution workflow |

---

## Quick Navigation

| Question | Start Here |
|----------|------------|
| What is this project? | [overview/project-overview.md](overview/project-overview.md) |
| How do plugins work? | [architecture/plugin-system.md](architecture/plugin-system.md) |
| How do I create a new plugin? | [guides/creating-plugins.md](guides/creating-plugins.md) |
| How does content flow across plugins? | [architecture/content-lifecycle.md](architecture/content-lifecycle.md) |
| How does OpenSpec contract handoff work? | [architecture/content-lifecycle.md](architecture/content-lifecycle.md) |
| How does the deep research pipeline work? | [architecture/deep-research-pipeline.md](architecture/deep-research-pipeline.md) |
| How do I run a deep research project? | [guides/deep-research-guide.md](guides/deep-research-guide.md) |
| What daily workflows can I follow? | [guides/content-workflow-guide.md](guides/content-workflow-guide.md) |
| What coding conventions apply? | [reference/coding-conventions.md](reference/coding-conventions.md) |
| What git conventions should I follow? | [reference/git-conventions.md](reference/git-conventions.md) |
| What are the known gaps/risks? | [overview/project-overview.md](overview/project-overview.md) (Known Gaps section) |

---

Generated: 2026-02-28 | Files: 10 (1 index + 9 docs) | Categories: 4 (overview, architecture, guides, reference)
