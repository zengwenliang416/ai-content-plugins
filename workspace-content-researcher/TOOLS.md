# Tools

## Required

| Tool                  | Purpose        | Install                            |
| --------------------- | -------------- | ---------------------------------- | ----- |
| [bun](https://bun.sh) | Script runtime | `curl -fsSL https://bun.sh/install | bash` |

## Optional

| Tool                                                  | Purpose                   | Install               |
| ----------------------------------------------------- | ------------------------- | --------------------- |
| [bird](https://github.com/nicjohnson145/bird)         | Twitter/X search          | See news-search-setup |
| [yt-dlp](https://github.com/yt-dlp/yt-dlp)            | YouTube/Bilibili metadata | `brew install yt-dlp` |
| [gh](https://cli.github.com)                          | GitHub search             | `brew install gh`     |
| [mcporter](https://github.com/nicjohnson145/mcporter) | Multi-platform scraping   | See news-search-setup |

## Health Check

Run `bun news-search/scripts/doctor.ts --json` from the skills directory to verify tool availability.
