# Skill System Architecture

Skills are the atomic unit of agent capability -- a self-contained directory with a `SKILL.md` defining frontmatter and workflow.

## SKILL.md Format

```yaml
---
name: skill-name # kebab-case, must match directory name
description: > # trigger text + 5-7 trigger phrases
  What the skill does and when to invoke it.
user-invocable: true # whether user can invoke directly
metadata:
  openclaw:
    emoji: "📰"
    requires:
      bins: ["bun"] # required CLI tools
    os: ["darwin", "linux"]
---
```

`name`, `description`, `user-invocable` are required. `metadata.openclaw` is optional (emoji, runtime deps, OS).

The markdown body after frontmatter contains the full agent workflow: usage examples, options tables, step-by-step instructions, quality standards. Target under 500 lines; detailed specs go in `references/`.

## Skill Invocation

Skills are matched by name. The `user-invocable: true` flag marks skills for direct user invocation; `false` means internal-only.

## Progressive Disclosure (Reference File Pattern)

Skills use `references/` subdirectories for supplementary knowledge (e.g., `deep-research/references/` has 5 task files, `news-search/references/` has per-platform guides). Three loading levels:

1. **Frontmatter** (~100 words) -- always loaded for matching
2. **SKILL.md body** (<500 lines) -- loaded on activation
3. **References** (unlimited) -- loaded on demand

## EXTEND.md Configuration

Two-level lookup for user/project config:

```
.content-skills/<skill>/EXTEND.md          # Priority 1: project-level
$HOME/.content-skills/<skill>/EXTEND.md    # Priority 2: user-level
```

Two behavior modes:

- **Defaulting**: Values serve as overridable defaults (most skills)
- **Blocking**: Missing EXTEND.md halts execution until setup (`knowledge-comic`, `xhs-card`, `cover-generator`)

Used by 7+ skills for provider selection, style defaults, language, and output preferences.

## Prompt File Discipline

Image-generating skills follow a strict protocol: save prompt to file **before** calling the generator, back up existing files with timestamps, always update prompt file first when regenerating. Ensures every image is traceable to its exact prompt.

## Reference Image Chain

Used by `xhs-card` and `knowledge-comic` for multi-image visual consistency: generate image 1 without `--ref`, then use image 1 as `--ref` for all subsequent images.

## Partial Workflow Options

Complex visual skills (`slide-generator`, `knowledge-comic`) support partial execution:

| Flag                                   | Effect                           |
| -------------------------------------- | -------------------------------- |
| `--outline-only` / `--storyboard-only` | Generate structure only          |
| `--prompts-only`                       | Structure + prompts, skip images |
| `--images-only`                        | Images from existing prompts     |
| `--regenerate N`                       | Regenerate specific page(s)      |

## Script Execution

Skills with deterministic logic use `scripts/` with TypeScript executed via bun:

```
skills/md-formatter/scripts/main.ts
skills/knowledge-comic/scripts/merge-to-pdf.ts
skills/wechat-publisher/scripts/wechat-api.ts
```

Invoked as `bun {baseDir}/scripts/<name>.ts [args]`. Scripts are executed, not read into context. Dependencies managed per-skill via `scripts/package.json`, installed with `bun install --frozen-lockfile`. Declare `requires.bins: ["bun"]` in frontmatter.

## Shared Skill (Symlink)

Skills shared across agents use filesystem symlinks:

```
workspace-content-researcher/skills/news-search/   # canonical source
workspace-content-writer/skills/news-search         # symlink
workspace-content-operator/skills/news-search       # symlink
```

Currently only `news-search` uses this pattern. `install.sh` manages symlink lifecycle.

## Cross-Skill Pipelines

Skills invoke other skills to form pipelines:

```
wechat-publisher -> md-to-html -> md-formatter
```

Composition is defined within each SKILL.md workflow -- no formal pipeline registry exists.
