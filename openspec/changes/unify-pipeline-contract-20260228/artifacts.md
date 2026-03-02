## Artifact Contract

### 1. Contract File

- Location: `openspec/runtime/deep-research/<slug>/pipeline.openspec.json`
- Writer stages: topic-research, content-production, content-utilities, publishing
- Reader stages: content-production, content-utilities, publishing

### 2. Required Fields

```json
{
  "pipeline": "topic-research->content-production->content-utilities->publishing",
  "stage": "topic-research|content-production|content-utilities|publishing",
  "inputs": {},
  "outputs": {
    "research_md": "openspec/runtime/deep-research/<slug>/research.md",
    "data_workbook_md": "openspec/runtime/deep-research/<slug>/data-workbook.md",
    "analysis_md": "openspec/runtime/deep-research/<slug>/analysis.md",
    "article_md": "openspec/runtime/deep-research/<slug>/article.md",
    "article_html": "openspec/runtime/deep-research/<slug>/article.html",
    "wechat_media_id": "optional"
  },
  "next": {
    "command": "/content-production:long-article",
    "input": "openspec/runtime/deep-research/<slug>/pipeline.openspec.json"
  }
}
```

### 3. Backward Compatibility

- Runtime output files keep original names under `openspec/runtime/**`.
- Contract is additive and must not break existing path-based workflows.
