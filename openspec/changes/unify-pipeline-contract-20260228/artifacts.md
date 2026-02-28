## Artifact Contract

### 1. Contract File

- Location: `ai-content-output/deep-research/<slug>/pipeline.openspec.json`
- Writer stages: topic-research, content-production, content-utilities, publishing
- Reader stages: content-production, content-utilities, publishing

### 2. Required Fields

```json
{
  "pipeline": "topic-research->content-production->content-utilities->publishing",
  "stage": "topic-research|content-production|content-utilities|publishing",
  "inputs": {},
  "outputs": {
    "research_md": ".../research.md",
    "data_workbook_md": ".../data-workbook.md",
    "analysis_md": ".../analysis.md",
    "article_md": ".../article.md",
    "article_html": ".../article.html",
    "wechat_media_id": "optional"
  },
  "next": {
    "command": "/content-production:long-article|/content-utilities:markdown-to-html|/publishing:post-to-wechat|none",
    "input": "path|none"
  }
}
```

### 3. Backward Compatibility

- Runtime output files keep original names and paths.
- Contract is additive and must not break existing path-based workflows.
