# Tools

## Required

| Tool                  | Purpose        | Install                            |
| --------------------- | -------------- | ---------------------------------- | ----- |
| [bun](https://bun.sh) | Script runtime | `curl -fsSL https://bun.sh/install | bash` |

## Optional

| Tool                                                              | Purpose                           | Install                  |
| ----------------------------------------------------------------- | --------------------------------- | ------------------------ |
| [news-search](../workspace-content-researcher/skills/news-search) | Data for research-backed articles | Symlinked via install.sh |

## Image Generation Providers

| Provider        | API Key Env Var       | Notes            |
| --------------- | --------------------- | ---------------- |
| Google (Gemini) | `GOOGLE_API_KEY`      | Default provider |
| OpenAI (DALL-E) | `OPENAI_API_KEY`      | Alternative      |
| DashScope       | `DASHSCOPE_API_KEY`   | Chinese market   |
| Replicate       | `REPLICATE_API_TOKEN` | Open models      |
