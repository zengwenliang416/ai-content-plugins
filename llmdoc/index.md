# Financial Services Plugins — LLM Documentation Index

Claude Cowork plugin marketplace for financial services: 7 plugins, 47 commands, 52 skills, 13 MCP connectors.

---

## Overview

| File | Description |
|------|-------------|
| [overview/project-overview.md](overview/project-overview.md) | Project purpose, architecture, plugin inventory (7 plugins), key patterns, known gaps |

## Architecture

| File | Description |
|------|-------------|
| [architecture/plugin-system.md](architecture/plugin-system.md) | Plugin directory layout, manifest schema, command system, skill triggers, hooks, MCP config |
| [architecture/mcp-integration.md](architecture/mcp-integration.md) | MCP hub model, 11 connectors, partner patterns (LSEG/S&P Global), tool chaining, CONNECTORS.md |
| [architecture/skill-system.md](architecture/skill-system.md) | Trigger mechanism, SKILL.md format variants, 52-skill inventory, meta-skills, progressive disclosure |
| [architecture/excel-conventions.md](architecture/excel-conventions.md) | 3-color vs 4-color font coding, formula-only rule, number formats, sensitivity tables, sign conventions |
| [architecture/domain-workflows.md](architecture/domain-workflows.md) | IB deal lifecycle, ER research pipeline, PE deal funnel, WM client lifecycle, cross-domain patterns |
| [architecture/compliance-output.md](architecture/compliance-output.md) | 3-tier compliance spectrum (none/advisory/mandatory), disclaimers, source attribution, anonymization |

## Guides

| File | Description |
|------|-------------|
| [guides/creating-plugins.md](guides/creating-plugins.md) | Step-by-step plugin creation: directory structure, manifest, commands, skills, MCP, hooks |
| [guides/mcp-data-sources.md](guides/mcp-data-sources.md) | Provider-to-data mapping, data priority rules, LSEG tool chaining, S&P intermediate files, pitfalls |
| [guides/skill-patterns.md](guides/skill-patterns.md) | SKILL.md anatomy, trigger phrase writing, multi-task pipelines, output conventions, anti-patterns |
| [guides/workflow-catalog.md](guides/workflow-catalog.md) | All 38 workflows by role (IB/ER/PE/WM), command lookup, end-to-end workflow chains |

## Reference

| File | Description |
|------|-------------|
| [reference/coding-conventions.md](reference/coding-conventions.md) | File formats, naming rules, SKILL.md variants, hooks schema, Excel formatting, known inconsistencies |
| [reference/git-conventions.md](reference/git-conventions.md) | Branch strategy (main + feature), commit message style, .gitignore patterns, contribution workflow |
| [reference/financial-formulas.md](reference/financial-formulas.md) | DCF (WACC, CAPM, terminal value), LBO (MOIC, IRR), comps, merger model, 3-statement linkages |
| [reference/output-formats.md](reference/output-formats.md) | Format taxonomy (Markdown/Excel/Word/PPT/HTML/PDF), binary output patterns, intermediate file pipeline |

---

## Quick Navigation

| Question | Start Here |
|----------|------------|
| What is this project? | [overview/project-overview.md](overview/project-overview.md) |
| How do plugins work? | [architecture/plugin-system.md](architecture/plugin-system.md) |
| How do I create a new plugin? | [guides/creating-plugins.md](guides/creating-plugins.md) |
| How do I write a SKILL.md? | [guides/skill-patterns.md](guides/skill-patterns.md) |
| What MCP data sources exist? | [architecture/mcp-integration.md](architecture/mcp-integration.md) + [guides/mcp-data-sources.md](guides/mcp-data-sources.md) |
| Which command does X? | [guides/workflow-catalog.md](guides/workflow-catalog.md) |
| What Excel formatting rules apply? | [architecture/excel-conventions.md](architecture/excel-conventions.md) |
| What financial formulas are used? | [reference/financial-formulas.md](reference/financial-formulas.md) |
| What output formats do skills produce? | [reference/output-formats.md](reference/output-formats.md) |
| What compliance rules exist? | [architecture/compliance-output.md](architecture/compliance-output.md) |
| What are the known gaps/risks? | [overview/project-overview.md](overview/project-overview.md) (Known Gaps section) |
| How do IB/ER/PE/WM workflows chain? | [architecture/domain-workflows.md](architecture/domain-workflows.md) |
| What git conventions should I follow? | [reference/git-conventions.md](reference/git-conventions.md) |
| What naming/coding conventions apply? | [reference/coding-conventions.md](reference/coding-conventions.md) |

---

Generated: 2026-02-25 | Files: 15 (1 index + 14 docs) | Categories: 4 (overview, architecture, guides, reference)
