# Git Conventions

## Branch Strategy

- **`main`** — single long-lived branch; production-ready at all times.
- **Feature branches** — use for new plugins or cross-plugin changes. Name as `<topic>` or `<owner>/<topic>`. Claude-automated branches may use `claude/<topic>-<hash>`.
- **Direct `main` commits** — acceptable for small, single-plugin fixes (typo corrections, minor wording changes).
- **Worktrees** — `.claude/worktrees/` provides isolated development environments; gitignored, never committed.

## Commit Messages

Format: imperative mood, single sentence, no trailing period.

For plugin-scoped changes, prefix with the plugin directory name:

```
content-analysis: add competitor benchmarking command
topic-research: fix trend scoring formula in skill
growth-ops: update channel-mix output format
```

For cross-cutting or repo-level changes, use a descriptive prefix:

```
marketplace: register new audience-management plugin
llmdoc: add git conventions reference
docs: update root README
```

Guidelines:
- Keep under ~72 characters.
- One plugin per commit — don't mix changes across plugin directories.
- Use action verbs: `add`, `fix`, `update`, `remove`, `refactor`.

## .gitignore Patterns

| Pattern | Rationale |
|---|---|
| `.DS_Store`, `Thumbs.db` | OS metadata |
| `.vscode/`, `.idea/`, `*.swp` | Editor/IDE state |
| `node_modules/`, `venv/`, `__pycache__/` | Runtime dependencies (if any plugin adds scripts) |
| `.env`, `.env.local`, `*.key`, `*.pem` | Secrets and credentials |
| `dist/`, `build/`, `coverage/` | Build/test artifacts |
| `TASKS.md`, `MEMORY.md` | Agent-local working files |
| `.claude/worktrees/` | Worktree isolation directories |

## File Sensitivity

- **`*.local.md`** — user-specific plugin configuration (API keys, account handles, platform credentials). Always gitignored. Provide an `.example` variant as a template when needed.
- **`.env*`** — environment secrets. Never committed.
- **`*.key`, `*.pem`** — cryptographic material. Never committed.

## Plugin Contribution Workflow

1. Create a feature branch from `main`.
2. Add or modify plugin files following the standard structure (`commands/`, `skills/`, `hooks/`, `.claude-plugin/plugin.json`).
3. Register the plugin in root `marketplace.json` if new.
4. Commit with plugin-prefixed messages; one plugin per commit.
5. Open a PR to `main`; merge after review.
6. No CI/CD pipeline — validation is review-based.
