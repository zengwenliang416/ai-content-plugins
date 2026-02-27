---
name: review-checklist
description: Generate and track a comprehensive pre-publish checklist tailored to the content type and platform. Covers accuracy, quality, SEO, formatting, legal, and platform-specific requirements. Use before publishing any piece of content. Triggers on "review checklist", "pre-publish check", "content review", "ready to publish", or "review this before I post".
user-invocable: true
metadata:
  openclaw:
    emoji: "✅"
    requires: {}
    os: ["darwin", "linux"]
---

# Pre-Publish Review Checklist

## Workflow

### Step 1: Scope the Review

Ask the user for:
- **Content type**: Blog post, social thread, newsletter, video script, short-form post, podcast outline
- **Platform**: Website/blog, Twitter/X, LinkedIn, YouTube, Substack, Instagram, TikTok
- **Topic sensitivity**: Is the topic controversial, health-related, financial, legal, or politically charged?
- **Key concerns**: Any known issues to double-check (facts, quotes, claims)

### Step 2: Generate Review Checklist

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

### Step 3: Status Tracking

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

### Step 4: Output

- Checklist with pass/fail status for each item
- Summary: Ready to publish / Needs fixes (list what to fix)
- Estimated fix time if items are failing

## Important Notes

- Run the checklist before every publish, even for short-form content
- Accuracy issues are the highest priority — fix before anything else
- Platform-specific rules change frequently — verify current guidelines if unsure
- If a claim is uncertain, add a source or remove it entirely
- Document any deliberate exceptions (e.g., skipping SEO for a social post)
