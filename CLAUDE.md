# AI Content Agents

Three OpenClaw agents for AI content creators. Each workspace is an autonomous agent with its own identity, skills, and memory.

## Repository Structure

```
├── workspace-content-researcher/  # Research & analysis (18 skills)
├── workspace-content-writer/      # Writing & visuals (16 skills)
├── workspace-content-operator/    # Ops & publishing (22 skills)
├── openclaw.json                  # Agent registration
└── install.sh                     # Installation script
```

## Agent Workspace Structure

```
workspace-*/
├── IDENTITY.md    # Agent name and emoji
├── SOUL.md        # Personality definition
├── AGENTS.md      # Operating instructions
├── USER.md        # User preferences (gitignored)
├── TOOLS.md       # Tool inventory
├── MEMORY.md      # Persistent memory
├── memory/        # Memory storage
└── skills/        # SKILL.md-based workflows
```

## Key Files

- `openclaw.json`: Registers all 3 agents with workspace paths
- `skills/*/SKILL.md`: Skill definitions with OpenClaw frontmatter (`user-invocable`, `metadata.openclaw`)
- `install.sh`: Symlinks workspaces to `~/.openclaw/` and sets up shared dependencies

## Development

1. Edit markdown files directly — changes take effect immediately
2. Skills are invoked by name; each SKILL.md contains the full workflow
3. `news-search` is shared across agents via symlink (source in content-researcher)
