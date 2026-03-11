---
name: ca-debug-draft
description: "Diagnose and fix structural, clarity, and persuasion issues in a draft article"
arguments:
  - name: input
    description: "Draft path or pipeline.openspec.json"
---

# Draft Debugger

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `outputs.short_post_md`.
   - If `$ARGUMENTS` is a draft path, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.article_md` and `outputs.short_post_md`.

3. **Auto-scan legacy draft assets**:

```bash
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
ls -t openspec/runtime/short-post/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下草稿，请选择要执行问题诊断的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user to share the draft path/content.

## Step 2: Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Read the Draft

Read the entire draft before diagnosing anything. Do not interrupt with fixes mid-read.

Identify the stated or implied goal: What is this piece trying to accomplish? Who is the intended reader?

## Step 4: Identify Issues

After reading, diagnose problems across these categories:

**Structure issues:**
- Does the opening fail to hook the reader in the first 2-3 sentences?
- Is there a missing or unclear thesis / central argument?
- Are sections in the wrong order for the reader's journey?
- Does the piece end abruptly or without a clear conclusion?

**Clarity issues:**
- Are there sentences or paragraphs that require re-reading to understand?
- Is jargon used without definition for the target audience?
- Are long sentences obscuring the point?
- Are passive constructions making agency unclear?

**Argument / evidence issues:**
- Are claims made without supporting evidence or reasoning?
- Is there internal contradiction between sections?
- Does the evidence actually support the conclusion drawn?
- Are examples generic ("imagine a company that...") instead of specific?

**Engagement issues:**
- Does the piece lose energy at any section? Where?
- Are there sections that could be cut without losing essential content?
- Is the voice consistent throughout?
- Does the middle sag — is there a clear throughline?

**Transition issues:**
- Do sections feel disconnected or abruptly joined?
- Are there missing bridge sentences between ideas?

## Step 5: Provide Fix Suggestions

For each issue identified:
1. Quote the specific passage with the problem
2. Name the issue type (one of the categories above)
3. Explain why it's a problem for the reader
4. Provide a specific rewrite or concrete fix suggestion

Format:
```
### Issue [N]: [Issue Type]

**Original:**
> [Quoted passage]

**Problem:** [Why this doesn't work for the reader]

**Fix:** [Specific rewrite or actionable instruction]
```

Prioritize issues: label each as Critical (fix before publish), Important (should fix), or Minor (nice to fix).

## Output

Annotated feedback document with:
1. **Diagnosis summary**: 3-5 bullet list of the main issues found
2. **Issue-by-issue breakdown**: Each issue with original quote, problem explanation, and fix
3. **Priority order**: Which fixes to address first
4. **What's working**: 2-3 things in the draft that are effective and should be preserved

## Important Notes

- Always quote the exact passage — never say "the introduction is weak" without citing it
- Separate structural/argument problems (harder to fix) from surface-level clarity issues (easier to fix)
- Preserve the author's voice; don't rewrite in a generic style
- If the draft has fundamental structural problems, recommend a rewrite of the outline before line-level editing
- Do not fix everything at once — prioritize the 3 issues with the highest impact on reader experience

## Artifact Handoff

**Output**:
- Debug findings displayed in conversation.
- Debug report saved to:
  - `openspec/runtime/debug-draft/YYYY-MM-DD-<draft-slug>-debug.md` (standalone mode)
  - `openspec/runtime/deep-research/<slug>/debug-draft.md` (if contract/deep-research mode)

**Next step**: Suggest revising the draft, then rerun quality check.
