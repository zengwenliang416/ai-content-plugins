# Git Conventions

## Branch Strategy

- **`main`** — single long-lived branch; production-ready at all times.
- **Feature branches** — for multi-commit work. Name as `<topic>` or `<owner>/<topic>`.
- **Direct `main` commits** — acceptable for small, isolated fixes.
- **Worktrees** — `.claude/worktrees/` provides isolated dev environments; gitignored, never committed.

## Commit Message Format

Uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

### Types

| Type       | Usage                                    |
| ---------- | ---------------------------------------- |
| `feat`     | New feature or skill                     |
| `fix`      | Bug fix                                  |
| `docs`     | Documentation only                       |
| `chore`    | Maintenance, cleanup, config             |
| `refactor` | Code restructure without behavior change |

### Scopes

Scopes map to agent workspaces, skill names, or infrastructure:

```
feat(install): remove ~/.openclaw symlinks, make repo self-contained
docs(changelog): add news-search feature entries to CHANGELOG
refactor(topic-research): migrate data fetching to news-search CLI
fix(mcp): remove rss-reader MCP server due to connection failures
chore(config): add MCP config and update marketplace manifest
```

Omit scope for broad changes: `docs: update Chinese README for OpenClaw architecture`

### Guidelines

- Imperative mood, lowercase start, no trailing period.
- Keep under ~72 characters.
- One logical change per commit.

## .gitignore Patterns

| Pattern                                  | Rationale                        |
| ---------------------------------------- | -------------------------------- |
| `TASKS.md`, `MEMORY.md`                  | Agent-local working files        |
| `.claude/worktrees/`                     | Worktree isolation directories   |
| `.brainstorm-runs/`, `backups`           | Generated output and backup dirs |
| `node_modules/`, `venv/`, `__pycache__/` | Runtime dependencies             |
| `.env`, `.env.local`, `*.key`, `*.pem`   | Secrets and credentials          |
| `.DS_Store`, `.vscode/`, `.idea/`        | OS/editor metadata               |

## Contribution Workflow

1. Edit markdown files directly — changes take effect immediately.
2. Skills are defined in `skills/*/SKILL.md` with OpenClaw frontmatter.
3. Commit with scoped conventional messages; one logical change per commit.
4. No CI/CD pipeline — validation is review-based.

## Migration Note

Project migrated from a Claude Code plugin marketplace to OpenClaw 3-agent architecture in commit `dd0bc26`. Commit scopes shifted from plugin directory names (e.g., `content-analysis`, `growth-ops`) to agent workspace and infrastructure scopes (e.g., `install`, `mcp`, `config`).
