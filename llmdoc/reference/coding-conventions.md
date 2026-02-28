# Coding Conventions

File-structure, schema, and formatting conventions for the OpenClaw 3-agent architecture.

## 1. Agent Workspace Files

Each `workspace-*/` directory contains these standard files:

| File          | Format             | Purpose                                                  |
| ------------- | ------------------ | -------------------------------------------------------- |
| `IDENTITY.md` | YAML frontmatter   | Agent name and emoji (`name`, `emoji` fields)            |
| `SOUL.md`     | Free-form markdown | Personality traits and communication style               |
| `AGENTS.md`   | Free-form markdown | Operating instructions, language policy, protocols       |
| `USER.md`     | Free-form markdown | User preferences (gitignored)                            |
| `TOOLS.md`    | Free-form markdown | Required/optional tool inventory with install info       |
| `MEMORY.md`   | Free-form markdown | Persistent cross-session memory (truncated at 200 lines) |
| `memory/`     | Directory of `.md` | Detailed topic memory files, linked from MEMORY.md       |

## 2. SKILL.md Frontmatter Schema

```yaml
---
name: skill-name # Required. Kebab-case identifier.
description: > # Required. What it does + trigger phrases.
  One to multi-line description.
user-invocable: true # Required. Whether user can invoke directly.
metadata: # Optional block.
  openclaw:
    emoji: "📰" #   Display emoji.
    requires:
      bins: ["bun"] #   CLI tool dependencies.
    os: ["darwin", "linux"] #   Supported operating systems.
---
```

Body is a full markdown workflow the agent follows step-by-step. Keep under 500 lines; offload detail to `references/`.

## 3. EXTEND.md Configuration Pattern

User/project-level config for skills that support customization (image generation, formatting, publishing).

**Two-level lookup** (first match wins):

1. Project: `.content-skills/<skill>/EXTEND.md`
2. User: `$HOME/.content-skills/<skill>/EXTEND.md`

**Blocking vs defaulting**:

- **Blocking**: Skills like `knowledge-comic`, `xhs-card`, `cover-generator` halt and require first-time EXTEND.md setup before proceeding.
- **Defaulting**: Other skills apply built-in defaults when EXTEND.md is absent.

## 4. Naming Conventions

| Element               | Convention           | Examples                                       |
| --------------------- | -------------------- | ---------------------------------------------- |
| Workspace directories | `workspace-*` prefix | `workspace-content-researcher`                 |
| Skill directories     | Lowercase kebab-case | `deep-research`, `news-search`, `md-formatter` |
| Script files          | `*.ts` (TypeScript)  | `search.ts`, `main.ts`, `merge-to-pdf.ts`      |
| Reference files       | Kebab-case `.md`     | `evaluation-framework.md`, `cookie-guide.md`   |

## 5. Output Conventions

- **Format**: Markdown with YAML frontmatter
- **Location**: User's working directory
- **Timestamps**: Include data retrieval timestamps and source attribution
- **Source citation**: All data claims require source URLs; missing data marked `N/A - not publicly disclosed`
- **Staleness**: Data older than 7 days flagged as potentially stale

## 6. Script Conventions

- **Runtime**: `bun` (required dependency for all agents)
- **Location**: `skills/<skill-name>/scripts/` subdirectory
- **Language**: TypeScript (`.ts` files)
- **Dependencies**: Each `scripts/` dir with external deps has its own `package.json`; install via `bun install --frozen-lockfile`

## 7. Reference File Pattern

Skills use `references/` subdirectories for supplementary knowledge (progressive disclosure):

```
skill-name/
  SKILL.md              # Workflow (loaded first)
  references/           # Detailed domain knowledge (loaded on demand)
  scripts/              # Executable TypeScript (if applicable)
```

Examples: `deep-research/references/` (5 task files), `news-search/references/` (per-platform guides), `competitor-analysis/references/` (frameworks, schemas).

## 8. Prompt File Discipline

All image-generating skills follow this protocol:

1. Save the prompt to a file **before** generating the image
2. Back up existing files with a timestamp before overwriting
3. Always update the prompt file **first** before regenerating

This ensures reproducibility and auditability of generated visual assets.
