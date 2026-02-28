# Agent Workspace Guide

## Creating a New Agent Workspace

1. Create the workspace directory and required files:

```
workspace-content-myagent/
├── IDENTITY.md    # Required: name + emoji
├── SOUL.md        # Required: personality definition
├── AGENTS.md      # Required: operating instructions
├── TOOLS.md       # Required: tool inventory
├── USER.md        # Optional: user preferences (add to .gitignore)
├── MEMORY.md      # Optional: persistent memory header
├── memory/        # Optional: detailed memory storage
└── skills/        # Required: at least one skill
```

2. Register in `openclaw.json`:

```json
{
  "name": "content-myagent",
  "workspace": "./workspace-content-myagent",
  "description": "..."
}
```

## Configuring Agent Personality

**IDENTITY.md** -- YAML frontmatter with `name` and `emoji` fields. This is how OpenClaw renders the agent.

**SOUL.md** -- Free-form markdown defining 3-5 personality traits and communication style. Controls tone, not behavior.

**AGENTS.md** -- Operating instructions: language matching, domain protocols (e.g., data freshness), tool usage constraints, output standards (format, directory, metadata).

**TOOLS.md** -- Inventory of required and optional tools with install instructions. Include a health check command if available.

## Adding Skills to an Agent

1. Create `skills/my-skill/SKILL.md` with OpenClaw frontmatter:

```yaml
---
name: my-skill
description: >
  What the skill does and when to invoke it.
user-invocable: true
metadata:
  openclaw:
    emoji: "🔧"
    requires:
      bins: ["bun"]
    os: ["darwin", "linux"]
---
```

The markdown body after frontmatter contains the step-by-step workflow.

2. Optional subdirectories: `scripts/` (executable code), `references/` (detailed criteria), `assets/` (templates).

3. If the skill has scripts, add `scripts/package.json` and run `bun install`.

4. To share a skill across agents, create symlinks from canonical source to consumer workspaces (see `install.sh` for the `news-search` pattern).

## How install.sh Works

Running `bash install.sh` performs four steps:

1. **Validate dependencies** -- checks `bun`; installs Python `feedparser`
2. **Register agents** -- iterates `workspace-*` dirs, derives agent ID from directory name, calls `openclaw agents add`; configures `subagents.allowAgents`; restarts gateway
3. **Create symlinks** -- links shared skills from canonical source to consumer workspaces
4. **Install bun deps** -- runs `bun install --frozen-lockfile` in each `skills/*/scripts/` with a `package.json`

Re-running is safe; it skips already-registered agents and recreates symlinks.

## How Agent Memory Works

**MEMORY.md** is auto-loaded into agent context at session start (truncated at 200 lines). Use it as a concise index linking to detailed topic files in `memory/`.

**memory/ directory** stores detailed notes as `memory/topic-name.md`. Organize by topic, not chronologically. Update or remove entries that become outdated.

**Lifecycle**: Agent accumulates knowledge during sessions. Stable patterns get written to memory files. Session-specific or speculative data should not be persisted.
