# Git Conventions

## Branch Strategy

- **`main`** — single long-lived branch; all PRs merge here.
- **Feature branches** — short-lived, named `<owner>/<topic>` (e.g. `cxl/partner-built-folder`). Claude-automated branches may use `claude/<topic>-<hash>`.
- **Worktrees** — `.claude/worktrees/` provides isolated development environments; the directory is gitignored and never committed.

## Commit Messages

Style observed in this repository:

- Imperative mood, single sentence, no period.
- Prefix with action verb: `Add`, `Remove`, `Move`, `Update`, `Fix`.
- Keep under ~72 characters.
- Merge commits use GitHub's default `Merge pull request #N from org/branch`.

Examples from history:

```
Add SRI integrity hashes to CDN script tags in S&P Global report template
Move partner-built plugins (LSEG, S&P Global) into partner-built/ folder
Remove worktree from tracking, update gitignore
```

## .gitignore Patterns

| Pattern | Rationale |
|---|---|
| `.DS_Store`, `Thumbs.db` | OS metadata |
| `.vscode/`, `.idea/`, `*.swp` | Editor/IDE state |
| `node_modules/`, `venv/`, `__pycache__/` | Runtime dependencies |
| `.env`, `.env.local`, `*.key`, `*.pem` | Secrets and credentials |
| `dist/`, `build/`, `coverage/` | Build/test artifacts |
| `TASKS.md`, `MEMORY.md` | Agent-local working files |
| `.claude/worktrees/` | Worktree isolation directories |

## File Sensitivity

- **`*.local.md`** — firm-specific configuration (API keys, org names, internal URLs). Always gitignored via plugin-level `.gitignore`. An `.example` variant may be committed as a template.
- **`.env*`** — environment secrets. Never committed.
- **`*.key`, `*.pem`** — cryptographic material. Never committed.

## Plugin Contribution Workflow

1. Create a feature branch from `main`.
2. Add or modify plugin files following the standard plugin structure (`commands/`, `skills/`, `mcp/`, etc.).
3. Commit with imperative-mood messages.
4. Open a PR to `main`; merge after review.
5. No CI/CD pipeline — validation is manual/review-based.
