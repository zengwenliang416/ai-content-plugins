# Video Platforms Reference

## YouTube

### Upstream Tool: yt-dlp

**Install**: `pip install yt-dlp`

### Search

```bash
# Search YouTube videos
yt-dlp --dump-json --flat-playlist "ytsearch10:AI agents"

# Via search.ts
bun news-search/scripts/search.ts youtube "AI agents" 10
```

### Read (Video Metadata + Subtitles)

```bash
# Get video metadata as JSON
yt-dlp --dump-json "https://youtube.com/watch?v=xxx"

# Download subtitles only
yt-dlp --write-auto-sub --sub-lang en --skip-download -o "subs" "https://youtube.com/watch?v=xxx"

# Via read.ts
bun news-search/scripts/read.ts "https://youtube.com/watch?v=xxx"
```

### Key JSON Fields

- `title`, `description`, `upload_date`
- `view_count`, `like_count`, `comment_count`
- `channel`, `channel_url`
- `subtitles` / `automatic_captions`
- `duration`, `categories`, `tags`

---

## Bilibili

### Upstream Tool: yt-dlp (same)

### Search

```bash
# Search Bilibili videos
yt-dlp --dump-json --flat-playlist "bilisearch10:AI大模型"

# Via search.ts
bun news-search/scripts/search.ts bilibili "AI大模型" 10
```

### Read

```bash
# Get video metadata
yt-dlp --dump-json "https://www.bilibili.com/video/BVxxx"

# Via read.ts
bun news-search/scripts/read.ts "https://www.bilibili.com/video/BVxxx"
```

### Notes

- Bilibili may require cookies for some content — set via yt-dlp `--cookies` flag
- Subtitle extraction works for videos with CC enabled
- Proxy may be needed outside China for some content
