---
name: repo-analysis
description: >
  Analyze a GitHub repository combining repo data with multi-platform community
  sentiment. Use when user asks to "analyze repo", "review this GitHub project",
  "what do people think about [repo]", or wants to create content about a GitHub project.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - WebFetch
  - AskUserQuestion
---

# Repo Analysis

Comprehensive GitHub repository analysis combining project data with community voice for content creation.

## Preferences (EXTEND.md)

Override defaults by creating `.content-skills/repo-analysis/EXTEND.md` (project level) or `~/.content-skills/repo-analysis/EXTEND.md` (user level).

Supports: Preferred platforms | Analysis language | Competitor repos | Content angle bias

## Workflow

### Phase 1: Repository Data Collection

Use `gh` CLI to gather structured repo data:

```bash
# Basic repo info (JSON)
gh repo view <owner/repo> --json name,description,url,homepageUrl,stargazerCount,forkCount,watchers,issues,pullRequests,licenseInfo,primaryLanguage,languages,repositoryTopics,createdAt,updatedAt,pushedAt,diskUsage,isArchived,isFork

# Recent release info
gh release list -R <owner/repo> --limit 5

# Recent activity (last 20 commits)
gh api repos/<owner>/<repo>/commits --jq '.[0:20] | .[] | {date: .commit.author.date, message: .commit.message}' 2>/dev/null

# Contributors count
gh api repos/<owner>/<repo>/contributors --jq 'length' 2>/dev/null

# README content
gh repo view <owner/repo> --json readme --jq '.readme'
```

Extract and structure:
- **Identity**: Name, description, URL, homepage
- **Popularity**: Stars, forks, watchers, issue count
- **Activity**: Last push, commit frequency, release cadence
- **Tech**: Primary language, all languages, topics/tags
- **Maturity**: Age, license, archive status, fork status

### Phase 2: Community Sentiment Collection

> **CONSTRAINT**: Execute all `news-search` commands via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. Resolve script path from project root: `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

#### Runtime Prerequisite

```bash
if command -v bun &>/dev/null; then
  TS_RUNNER="bun"
elif command -v npx &>/dev/null; then
  TS_RUNNER="npx tsx"
else
  echo "ERROR: No TypeScript runtime found."
  echo "Install bun (recommended): curl -fsSL https://bun.sh/install | bash"
  echo "Or install Node.js >=18: https://nodejs.org/"
  exit 1
fi
```

> If neither runtime is available: STOP execution and instruct the user to install bun.

#### Environment Gate

Run: `${TS_RUNNER} news-search/scripts/doctor.ts --json`

Parse JSON output. If all channels missing, suggest `/topic-research:news-search-setup`.

#### Search Strategy by Depth

**Quick Overview**: Skip this phase entirely.

**Standard Analysis** (3 platforms):

```bash
# Twitter — expert opinions and hot takes
${TS_RUNNER} news-search/scripts/search.ts twitter "<repo-name> OR <owner/repo>" 15

# Reddit — technical discussions and reviews
${TS_RUNNER} news-search/scripts/search.ts reddit "<repo-name>" 10

# Hacker News — deep technical commentary
${TS_RUNNER} news-search/scripts/search.ts web "site:news.ycombinator.com <repo-name>" 10
```

**Deep Analysis** (5+ platforms):

All of the above, plus:

```bash
# GitHub — related/competing repos and issues
${TS_RUNNER} news-search/scripts/search.ts github "<repo-name>" 10

# YouTube — tutorials and reviews
${TS_RUNNER} news-search/scripts/search.ts youtube "<repo-name> tutorial OR review" 5

# Web — blog posts and articles
${TS_RUNNER} news-search/scripts/search.ts web "<repo-name> review OR tutorial OR comparison" 10

# Chinese platforms (if relevant)
${TS_RUNNER} news-search/scripts/search.ts xhs "<repo-name>" 5
```

Use `--no-freshness` for all repo-analysis searches — repo sentiment is not time-critical like news.

### Phase 3: Sentiment Analysis

From collected community data, extract:

**Praise patterns** — What do people consistently love?
- List top 3-5 praised features with source quotes

**Criticism patterns** — What are the common complaints?
- List top 3-5 criticisms with source quotes

**Use cases mentioned** — How are people actually using it?
- List real-world use cases found in discussions

**Comparison mentions** — What alternatives do people mention?
- List competitor repos/tools people compare it to

**Sentiment summary**:

| Platform | Sentiment | Volume | Key Theme |
|----------|-----------|--------|-----------|
| Twitter  | Positive/Mixed/Negative | High/Med/Low | [1-line theme] |
| Reddit   | ... | ... | ... |
| HN       | ... | ... | ... |

### Phase 4: Content Angle Synthesis

Based on repo data + community sentiment, generate 3-5 ranked content angles.

For each angle, specify:
- **Angle**: One-sentence description
- **Hook potential**: High/Medium/Low (based on controversy, novelty, utility)
- **Target audience**: Who cares most
- **Best format**: Tweet / Thread / Article / Video
- **Supporting evidence**: Which community quotes/data support this angle
- **Sample hook**: Draft hook line ready for `/content-hooks:hook`

---

## Output Format

```markdown
# Repo Analysis: [owner/repo]

**Analyzed**: [date]
**Depth**: Quick / Standard / Deep

---

## Repository Overview

| Metric | Value |
|--------|-------|
| Stars | [N] |
| Forks | [N] |
| Language | [primary] |
| License | [license] |
| Created | [date] |
| Last Push | [date] |
| Open Issues | [N] |

**What it is**: [2-3 sentence description based on README]

**Tech Stack**: [languages and key dependencies]

**Key Features**:
- [Feature 1]
- [Feature 2]
- [Feature 3]

---

## Activity & Health

- **Commit frequency**: [X commits/week avg]
- **Release cadence**: [latest release + pattern]
- **Maintenance status**: Active / Maintained / Slow / Stale
- **Community size**: [contributors count, discussion activity]

---

## Community Sentiment

### What People Love
1. > "[quote]" — [@source, platform]
   **Theme**: [tagged theme]

2. > "[quote]" — [@source, platform]
   **Theme**: [tagged theme]

### What People Criticize
1. > "[quote]" — [@source, platform]
   **Theme**: [tagged theme]

### Real-World Use Cases
- [Use case 1] (source: [platform])
- [Use case 2] (source: [platform])

### Competitor Mentions
| Compared To | Context | Verdict |
|-------------|---------|---------|
| [repo/tool] | [what was compared] | [community preference] |

### Sentiment Summary
| Platform | Sentiment | Volume | Key Theme |
|----------|-----------|--------|-----------|
| Twitter  | [+/-/~]   | [H/M/L] | [theme]  |
| Reddit   | [+/-/~]   | [H/M/L] | [theme]  |
| HN       | [+/-/~]   | [H/M/L] | [theme]  |

---

## Content Angles (Ranked)

### 1. [Angle Title]
- **Hook potential**: [stars]
- **Target audience**: [who]
- **Best format**: [format]
- **Why**: [1-2 sentences with evidence]
- **Sample hook**: "[draft hook line]"

### 2. [Angle Title]
...

---

## Sources

[All URLs with platform labels and dates]
```

---

## Quality Standards

- **Anti-AI writing rules** — load `content-utilities/skills/humanizer/references/writing-rules.md` during writing. Avoid AI vocabulary, significance inflation, filler phrases, generic conclusions. Write like a person.
- Repo metrics must come from `gh` CLI, not guessed
- Community quotes must be real (from news-search results), not fabricated
- If a platform search returns no results, note it honestly — do not fill with generic content
- Content angles must be grounded in actual sentiment data
- Each angle must include a sample hook line ready for `/content-hooks:hook`
