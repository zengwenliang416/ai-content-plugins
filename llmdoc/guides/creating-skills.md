# Guide: Creating Skills

A skill is a self-contained directory inside a workspace's `skills/` folder. The only required file is `SKILL.md`.

## Step 1: Create the Skill Directory

```bash
mkdir -p workspace-content-<agent>/skills/my-skill
# Optional subdirectories:
mkdir -p workspace-content-<agent>/skills/my-skill/{references,scripts,assets}
```

| Directory     | Purpose                     | Loading             |
| ------------- | --------------------------- | ------------------- |
| `references/` | Criteria, schemas, examples | On demand by agent  |
| `scripts/`    | TypeScript via bun          | Executed, not read  |
| `assets/`     | Templates, images           | Used in output only |

## Step 2: Write SKILL.md Frontmatter

```yaml
---
name: my-skill
description: >
  What the skill does and when to invoke it.
  Include 5-7 trigger phrases covering synonyms.
user-invocable: true
metadata:
  openclaw:
    emoji: "🔧"
    requires:
      bins: ["bun"] # omit if no scripts
    os: ["darwin", "linux"]
---
```

**Required**: `name` (kebab-case, matches directory), `description`, `user-invocable`. **Optional**: `metadata.openclaw`.

## Step 3: Write the Workflow Body

After frontmatter, write step-by-step workflow in markdown. Guidelines:

- Lead with actionable steps, not background theory
- Keep under 500 lines; move detailed specs to `references/`
- Reference bundled files explicitly: "See `references/criteria.md`"
- Include a Quality Standards section

## Step 4: Add References

For detailed criteria or per-platform guides, add `references/*.md` files. Reference from SKILL.md with relative paths. This implements progressive disclosure -- references load only when the agent determines relevance.

## Step 5: Add Scripts

For deterministic logic, add TypeScript in `scripts/`:

```bash
cd skills/my-skill/scripts && bun init && bun install
```

Invoke as `bun {baseDir}/scripts/main.ts [args]`. Declare `requires.bins: ["bun"]` in frontmatter.

## Step 6: Set Up EXTEND.md

For user-configurable skills, document two-level EXTEND.md lookup:

```
.content-skills/my-skill/EXTEND.md          # Priority 1: project-level
$HOME/.content-skills/my-skill/EXTEND.md    # Priority 2: user-level
```

Choose **defaulting** (values as overridable defaults) or **blocking** (require setup before first use).

## Step 7: Register in Workspace

Place the directory in the target agent's `skills/` folder. Discovery is automatic. For shared skills, symlink from consuming workspaces and update `install.sh`:

```bash
ln -s ../../workspace-content-researcher/skills/my-skill skills/my-skill
```

## Checklist

- [ ] `name` in frontmatter matches directory name
- [ ] `description` includes 5-7 trigger phrases
- [ ] All referenced files exist
- [ ] SKILL.md body under 500 lines
- [ ] No duplicate content between SKILL.md and references
- [ ] No README.md or CHANGELOG.md (prohibited)
- [ ] Scripts tested with `bun run` before commit
