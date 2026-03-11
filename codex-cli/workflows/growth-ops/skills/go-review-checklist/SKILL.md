---
name: go-review-checklist
description: "Run a pre-publish review checklist for content pieces across accuracy, quality, SEO, formatting, legal, and platform-specific requirements"
arguments:
  - name: input
    description: "Article file path, platform, or pipeline.openspec.json"
---

# Pre-Publish Review Checklist

## Step 1: Upstream Artifact Detection

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.article_md` (fallback `outputs.article_html`).
   - If `$ARGUMENTS` is an article path or content/platform descriptor, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.article_md`, then `outputs.article_html`.

3. **Auto-scan legacy article assets**:

```bash
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/article.html 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.html 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下文章，请选择要执行发布前检查的文章："

4. **No upstream found**: Only in this case, ask the user for content type and target platform (and article path if available).

## Step 2: Language Selection

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Scope the Review

Ask the user for:
- **Content type**: Blog post, social thread, newsletter, video script, short-form post, podcast outline
- **Platform**: Website/blog, Twitter/X, LinkedIn, YouTube, Substack, Instagram, TikTok
- **Topic sensitivity**: Is the topic controversial, health-related, financial, legal, or politically charged?
- **Key concerns**: Any known issues to double-check (facts, quotes, claims)

## Step 4: Generate Review Checklist

Generate a checklist across all major review areas, tailored to the content type and platform:

**Accuracy & Sourcing**
- All factual claims verified with at least one credible source
- Statistics and data points cited with source and date
- Quotes attributed correctly and in context
- No outdated information presented as current
- No exaggerated or misleading claims

**Readability & Quality**
- Clear thesis or main point established in the opening
- Logical flow — each section connects to the next
- No unnecessary jargon (or explained if unavoidable)
- Grammar and spelling checked
- Reading level appropriate for target audience
- Conclusion reinforces key takeaway

**SEO & Discoverability** (for written content)
- Target keyword present in title, first paragraph, and headers
- Meta description written (150-160 characters)
- Headers (H2, H3) used to structure content
- Internal links to related content included
- Image alt-text written for all images
- URL slug is clean and keyword-relevant

**Formatting & Presentation**
- Correct formatting for platform (line breaks, character limits, hashtags)
- Images and media are the right dimensions and quality
- Call-to-action (CTA) is clear and relevant
- Links are working and go to the correct destinations
- Preview looks correct on mobile

**Legal & Copyright**
- No copyrighted images used without license
- Sponsored or affiliate content is disclosed clearly
- No defamatory claims about individuals or companies
- Health, financial, or legal claims include appropriate disclaimers
- Third-party trademarks referenced correctly

**Platform Guidelines**
- Content complies with platform community standards
- Hashtags are relevant and not overused
- Post length is within platform best practices
- No banned or restricted terms for the platform

## Step 5: Status Tracking

For each item, track:

| Item | Category | Status | Notes |
|------|----------|--------|-------|
| Facts verified | Accuracy | Pass / Fail / N/A | |
| Sources cited | Accuracy | | |
| Grammar checked | Quality | | |
| SEO keyword present | SEO | | |
| Links working | Formatting | | |
| Disclosure included | Legal | | |

Status: Pass / Fail / N/A / Needs Fix

## Step 6: Output

- Checklist with pass/fail status for each item
- Summary: Ready to publish / Needs fixes (list what to fix)
- Estimated fix time if items are failing

## Artifact Handoff

**Output**:
- Checklist results MUST be displayed in the conversation.
- Review checklist report saved to:
  - `openspec/runtime/review-checklist/YYYY-MM-DD-<content-slug>-review-checklist.md` (standalone mode)
  - `openspec/runtime/deep-research/<slug>/review-checklist.md` (if contract/deep-research mode)

## Important Notes

- Run the checklist before every publish, even for short-form content
- Accuracy issues are the highest priority — fix before anything else
- Platform-specific rules change frequently — verify current guidelines if unsure
- If a claim is uncertain, add a source or remove it entirely
- Document any deliberate exceptions (e.g., skipping SEO for a social post)
