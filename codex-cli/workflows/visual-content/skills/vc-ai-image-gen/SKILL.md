---
name: vc-ai-image-gen
description: "AI image generation with OpenAI, Google, DashScope and Replicate APIs"
arguments:
  - name: input
    description: "Prompt text, prompt files, or generation options"
---

# Image Generation (AI SDK)

Official API-based image generation. Supports OpenAI, Google, DashScope and Replicate providers.

## Script Directory

**Agent Execution**:
1. `SKILL_DIR` = this SKILL.md file's directory
2. Script path = `${SKILL_DIR}/scripts/main.ts`

## Preferences (EXTEND.md)

```bash
test -f .content-skills/ai-image-gen/EXTEND.md && echo "project"
test -f "$HOME/.content-skills/ai-image-gen/EXTEND.md" && echo "user"
```

| Path | Location |
|------|----------|
| `.content-skills/ai-image-gen/EXTEND.md` | Project directory |
| `$HOME/.content-skills/ai-image-gen/EXTEND.md` | User home |

| Result | Action |
|--------|--------|
| Found | Read, parse, apply settings |
| Not found | Use defaults |

**EXTEND.md Supports**: Default provider | Default quality | Default aspect ratio | Default image size | Default models

Schema: `references/config/preferences-schema.md`

## Usage

```bash
# Basic
npx -y bun ${SKILL_DIR}/scripts/main.ts --prompt "A cat" --image cat.png

# With aspect ratio
npx -y bun ${SKILL_DIR}/scripts/main.ts --prompt "A landscape" --image out.png --ar 16:9

# High quality
npx -y bun ${SKILL_DIR}/scripts/main.ts --prompt "A cat" --image out.png --quality 2k

# From prompt files
npx -y bun ${SKILL_DIR}/scripts/main.ts --promptfiles system.md content.md --image out.png

# With reference images
npx -y bun ${SKILL_DIR}/scripts/main.ts --prompt "Make blue" --image out.png --ref source.png

# With reference images (explicit provider/model)
npx -y bun ${SKILL_DIR}/scripts/main.ts --prompt "Make blue" --image out.png --provider google --model gemini-3-pro-image-preview --ref source.png

# Specific provider
npx -y bun ${SKILL_DIR}/scripts/main.ts --prompt "A cat" --image out.png --provider openai

# DashScope
npx -y bun ${SKILL_DIR}/scripts/main.ts --prompt "A cat" --image out.png --provider dashscope

# Replicate
npx -y bun ${SKILL_DIR}/scripts/main.ts --prompt "A cat" --image out.png --provider replicate

# Replicate with specific model
npx -y bun ${SKILL_DIR}/scripts/main.ts --prompt "A cat" --image out.png --provider replicate --model google/nano-banana
```

## Options

| Option | Description |
|--------|-------------|
| `--prompt <text>`, `-p` | Prompt text |
| `--promptfiles <files...>` | Read prompt from files (concatenated) |
| `--image <path>` | Output image path (required) |
| `--provider google\|openai\|dashscope\|replicate` | Force provider (default: google) |
| `--model <id>`, `-m` | Model ID |
| `--ar <ratio>` | Aspect ratio (e.g., `16:9`, `1:1`, `4:3`) |
| `--size <WxH>` | Size (e.g., `1024x1024`) |
| `--quality normal\|2k` | Quality preset (default: 2k) |
| `--imageSize 1K\|2K\|4K` | Image size for Google (default: from quality) |
| `--ref <files...>` | Reference images |
| `--n <count>` | Number of images |
| `--json` | JSON output |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key |
| `GOOGLE_API_KEY` | Google API key |
| `DASHSCOPE_API_KEY` | DashScope API key |
| `REPLICATE_API_TOKEN` | Replicate API token |
| `OPENAI_IMAGE_MODEL` | OpenAI model override |
| `GOOGLE_IMAGE_MODEL` | Google model override |
| `DASHSCOPE_IMAGE_MODEL` | DashScope model override (default: z-image-turbo) |
| `REPLICATE_IMAGE_MODEL` | Replicate model override (default: google/nano-banana-pro) |
| `OPENAI_BASE_URL` | Custom OpenAI endpoint |
| `GOOGLE_BASE_URL` | Custom Google endpoint |
| `DASHSCOPE_BASE_URL` | Custom DashScope endpoint |
| `REPLICATE_BASE_URL` | Custom Replicate endpoint |

**Load Priority**: CLI args > EXTEND.md > env vars > `<cwd>/.content-skills/.env` > `~/.content-skills/.env`

## Replicate Model Configuration

Priority: CLI `--model` > EXTEND.md `default_model.replicate` > env `REPLICATE_IMAGE_MODEL` > built-in `google/nano-banana-pro`

Supported formats: `owner/name` (recommended) or `owner/name:version` (community models).

## Provider Selection

1. `--ref` provided + no `--provider` -> auto-select Google first, then OpenAI, then Replicate
2. `--provider` specified -> use it
3. Only one API key available -> use that provider
4. Multiple available -> default to Google

## Quality Presets

| Preset | Google imageSize | OpenAI Size | Use Case |
|--------|------------------|-------------|----------|
| `normal` | 1K | 1024px | Quick previews |
| `2k` (default) | 2K | 2048px | Covers, illustrations, infographics |

## Aspect Ratios

Supported: `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `2.35:1`

## Generation Mode

**Default**: Sequential generation (one image at a time).

**Parallel Generation**: Only use when user explicitly requests parallel/concurrent generation.

| Mode | When to Use |
|------|-------------|
| Sequential (default) | Normal usage, single images, small batches |
| Parallel | User explicitly requests, large batches (10+) |

## Error Handling

- Missing API key -> error with setup instructions
- Generation failure -> auto-retry once
- Invalid aspect ratio -> warning, proceed with default
- Reference images with unsupported provider/model -> error with fix hint

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.
