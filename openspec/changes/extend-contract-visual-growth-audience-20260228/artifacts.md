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
| T1 | topic-research | research.md | openspec/runtime/deep-research/<slug>/research.md | T3, T5 |
| T2 | topic-research | data-workbook.md | openspec/runtime/deep-research/<slug>/data-workbook.md | T3, T5 |
| T3 | topic-research | analysis.md | openspec/runtime/deep-research/<slug>/analysis.md | T4, T5 |
| T4 | visual-content | chart_index.txt (+ images) | openspec/runtime/deep-research/<slug>/images/chart_index.txt | T5, publishing |
| T5 | content-production | article.md | openspec/runtime/deep-research/<slug>/article.md | quality, html, publishing |

### 3. Runtime Pipeline Contract

Workflow-level lifecycle governance remains change-centric (`openspec/changes/<change_id>/`),
while runtime handoff remains contract-compatible and uses:
`openspec/runtime/deep-research/<slug>/pipeline.openspec.json`

Required minimal fields:

```json
{
  "pipeline": "topic-research->content-production->content-utilities->publishing",
  "stage": "topic-research|content-production|content-utilities|publishing",
  "inputs": {},
  "outputs": {
    "research_md": "openspec/runtime/deep-research/<slug>/research.md",
    "data_workbook_md": "openspec/runtime/deep-research/<slug>/data-workbook.md",
    "analysis_md": "openspec/runtime/deep-research/<slug>/analysis.md",
    "article_md": "openspec/runtime/deep-research/<slug>/article.md"
  },
  "next": {
    "command": "/content-production:long-article",
    "input": "openspec/runtime/deep-research/<slug>/pipeline.openspec.json"
  }
}
```

### 4. tasks.md Required Sections

## 1. Contract Setup
- [x] 1.1 [T0] Confirm change-id and spec domain
- [x] 1.2 [T0] Freeze pipeline contract fields

## 2. Task Mapping
- [x] 2.1 [T1] Align contract-aware command intake
- [x] 2.2 [T2] Align data/analysis contract references
- [x] 2.3 [T3] Align quality and publishing route semantics
- [x] 2.4 [T4] Align visual output contract references
- [x] 2.5 [T5] Align article and handoff contract references

## 3. Validation & Rollout
- [x] 3.1 [T0] Validate schema (`openspec schema validate ai-content`)
- [x] 3.2 [T0] Validate changes (`openspec validate --changes --strict --no-interactive`)
- [x] 3.3 [T0] Update project documentation using docflow-recorder
