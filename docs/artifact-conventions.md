# Artifact Conventions

Standard directory structure and cross-plugin discovery rules for all content pipeline artifacts.

## Output Directory: `openspec/runtime/`

All plugin artifacts MUST be stored under `openspec/runtime/` at the project root. This enables cross-plugin discovery and reuse.

```
openspec/runtime/
├── daily-brief/                        # topic-research/daily-brief
│   └── YYYY-MM-DD-ai-daily-brief.md
├── brainstorm/                         # topic-research/topic-brainstorm
│   └── YYYY-MM-DD-topic-brainstorm.md
├── deep-research/<slug>/               # topic-research/deep-research
│   ├── research.md
│   ├── data-workbook.md
│   ├── analysis.md
│   ├── images/
│   │   ├── chart_*.png
│   │   ├── chart_index.txt
│   │   └── cover.png                  # visual-content/cover-generator (pipeline)
│   ├── article.md                     # deep-research Task 5 or article-builder
│   ├── article.html                   # content-utilities/md-to-html
│   └── visuals/                       # visual-content skills (pipeline mode)
│       ├── xhs/                       # xhs-card
│       ├── illustrations/             # article-illustrator
│       ├── infographic/               # infographic-gen (aesthetic)
│       ├── infographic-dsl/           # infographic-dsl (structured data, AntV)
│       ├── charts/                    # chart-visualization (AntV)
│       ├── narrative/                 # narrative-text-viz (AntV T8)
│       ├── slides/                    # slide-generator
│       └── comic/                     # knowledge-comic
├── articles/                          # content-production/article-builder (standalone)
│   └── YYYY-MM-DD-<slug>.md
└── visuals/                           # visual-content skills (standalone mode)
    ├── xhs/<slug>/
    ├── illustrations/<slug>/
    ├── infographic/<slug>/
    ├── infographic-dsl/<slug>/
    ├── charts/<slug>/
    ├── narrative/<slug>/
    ├── icons/_cache/                  # icon-retrieval (shared cache, 30-day TTL)
    ├── slides/<slug>/
    ├── comic/<slug>/
    └── cover/<slug>/
```

## Two Modes for Visual Skills

Visual content skills operate in one of two modes based on input source:

### Pipeline Mode

When the source article is inside `openspec/runtime/` (typically from deep-research):

- **Detection**: Input path matches `openspec/runtime/deep-research/<slug>/article.md`
- **Output**: `openspec/runtime/deep-research/<slug>/visuals/<skill-type>/`
- **Benefit**: All artifacts for one topic stay together, downstream skills (md-to-html, publisher) can find them

### Standalone Mode

When the source is from any other location (user-provided file, pasted content):

- **Output**: `openspec/runtime/visuals/<skill-type>/<topic-slug>/`
- **Benefit**: Still under `openspec/runtime/` for discoverability

### Mode Resolution

```
Input path contains "openspec/runtime/deep-research/" ?
  → YES: Pipeline mode → save to <research-dir>/visuals/<skill-type>/
  → NO:  Standalone mode → save to openspec/runtime/visuals/<skill-type>/<slug>/
```

## Upstream Artifact Auto-Detection

### CONSTRAINT Block (Required Template)

Every skill that can consume upstream artifacts MUST include this CONSTRAINT block:

```markdown
> **CONSTRAINT — Upstream Artifact Auto-Detection is MANDATORY**:
> Before asking the user for input, you MUST first scan for existing upstream artifacts.
> If exactly one recent artifact is found, load it automatically and inform the user.
> Only ask the user when NO upstream artifact is found or when multiple candidates exist.
```

### Scan Implementation

```bash
# Scan for recent articles (within 3 days)
find openspec/runtime/deep-research/ -name "article.md" -mtime -3 2>/dev/null
find openspec/runtime/articles/ -name "*.md" -mtime -3 2>/dev/null
```

### Decision Matrix

| Found       | Action                                      |
| ----------- | ------------------------------------------- |
| 0 articles  | Ask user for input / accept pasted content  |
| 1 article   | Auto-load, inform user, proceed             |
| 2+ articles | List candidates (max 5), ask user to choose |

## Skill-Type Directory Names

| Skill               | Directory Key                               |
| ------------------- | ------------------------------------------- |
| xhs-card            | `xhs`                                       |
| cover-generator     | `cover` (or `images/cover.png` in pipeline) |
| article-illustrator | `illustrations`                             |
| infographic-gen     | `infographic`                               |
| slide-generator     | `slides`                                    |
| knowledge-comic     | `comic`                                     |

## Cross-Plugin Discovery

Any skill can discover artifacts from other skills by scanning `openspec/runtime/`:

```bash
# Find all research topics with articles
ls openspec/runtime/deep-research/*/article.md 2>/dev/null

# Find all visual outputs for a topic
ls openspec/runtime/deep-research/<slug>/visuals/ 2>/dev/null

# Find standalone visual outputs
ls openspec/runtime/visuals/xhs/ 2>/dev/null
```
