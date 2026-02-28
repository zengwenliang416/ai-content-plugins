## Artifact Contract

### 1. Naming Rules

- **change-id**: `<verb>-<spec-domain>-<scope>[-YYYYMMDD]`
- **spec path**: `specs/ai-content-<domain>/spec.md`
- **task id set**:
  - `T0`: intake/bootstrap
  - `T1`: topic research
  - `T2`: data compilation
  - `T3`: analysis & synthesis
  - `T4`: visual generation
  - `T5`: article assembly

### 2. Intermediate Artifacts Matrix

| task_id | producer | output_name | output_path | consumers |
| --- | --- | --- | --- | --- |
| T1 | topic-research | research.md | ai-content-output/deep-research/<slug>/research.md | T3, T5 |
| T2 | topic-research | data-workbook.md | ai-content-output/deep-research/<slug>/data-workbook.md | T3, T5 |
| T3 | topic-research | analysis.md | ai-content-output/deep-research/<slug>/analysis.md | T4, T5 |
| T4 | visual-content | chart_index.txt (+ images) | ai-content-output/deep-research/<slug>/images/chart_index.txt | T5, publishing |
| T5 | content-production | article.md | ai-content-output/deep-research/<slug>/article.md | quality, html, publishing |

### 3. Runtime Pipeline Contract

The runtime handoff contract MUST be written to:
`ai-content-output/deep-research/<slug>/pipeline.openspec.json`

Required minimal fields:

```json
{
  "pipeline": "topic-research->content-production->content-utilities->publishing",
  "stage": "topic-research",
  "inputs": {},
  "outputs": {
    "research_md": "ai-content-output/deep-research/<slug>/research.md",
    "data_workbook_md": "ai-content-output/deep-research/<slug>/data-workbook.md",
    "analysis_md": "ai-content-output/deep-research/<slug>/analysis.md",
    "article_md": "ai-content-output/deep-research/<slug>/article.md"
  },
  "next": {
    "command": "/content-production:long-article",
    "input": "ai-content-output/deep-research/<slug>/pipeline.openspec.json"
  }
}
```

### 4. tasks.md Required Sections

## 1. Contract Setup
- [ ] 1.1 [T0] Confirm change-id and spec domain
- [ ] 1.2 [T0] Freeze pipeline contract fields

## 2. Task Mapping
- [ ] 2.1 [T1] Research artifact contract aligned
- [ ] 2.2 [T2] Data artifact contract aligned
- [ ] 2.3 [T3] Analysis artifact contract aligned
- [ ] 2.4 [T4] Visual artifact contract aligned
- [ ] 2.5 [T5] Article artifact contract aligned

## 3. Validation & Rollout
- [ ] 3.1 [T0] Validate schema (`openspec schema validate ai-content`)
- [ ] 3.2 [T0] Validate changes (`openspec validate --changes --strict --no-interactive`)
- [ ] 3.3 [T0] Update project documentation using docflow-recorder
