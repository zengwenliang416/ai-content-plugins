# Compliance & Output Format Architecture

## Compliance Spectrum

Three tiers exist across the plugin ecosystem, ranging from no enforcement to mandatory machine-readable rules.

### Tier 0 — None

**Plugin:** LSEG

No disclaimers, no data integrity rules, no compliance prose. Skills produce investment recommendations (bond relative-value verdicts, equity research theses, trade recommendations) with zero compliance guardrails. Output is markdown text delivered directly to the user.

### Tier 1 — Advisory Prose

**Plugins:** Private Equity, Wealth Management, Investment Banking, Equity Research, Financial Analysis

Pattern: every skill ends with an `## Important Notes` section containing behavioral guidelines. These are natural-language reminders, not enforced rules. Examples from the codebase:

- WM `financial-plan`: "ensure recommendations align with suitability/fiduciary standards"
- WM `client-report`: "Always include appropriate disclaimers and disclosures (past performance, risk factors)" / "Review for compliance approval before first distribution of a new template"
- WM `portfolio-rebalance`: "Document rationale for every trade for compliance records"
- WM `investment-proposal`: "Always include disclaimers (projections are hypothetical, past performance, etc.)"
- IB `cim-builder`: "Work with legal on the confidentiality disclaimer and any regulatory disclosures"
- IB `teaser`: "Always have the client and legal review before distribution"

Enforcement: none. The LLM receives these as instructions but no structural mechanism validates compliance in the output.

### Tier 2 — Mandatory Enforced

**Plugin:** S&P Global (Kensho)

Three enforcement mechanisms:

**1. AI Disclaimer — required in multiple locations per document**

| Skill | Format | Placement |
|-------|--------|-----------|
| `earnings-preview-beta` | HTML | Header banner, footer banner, appendix first line |
| `funding-digest` | PPTX | Slide footer (yellow banner) |
| `tear-sheet` | DOCX | Document footer on every page (2-line centered footer) |

Disclaimer text: "Analysis is AI-generated -- please confirm all outputs"

Tear-sheet footer is more specific: Line 1 = "Data: S&P Capital IQ via Kensho | Analysis: AI-generated | [date]", Line 2 = "For informational purposes only. Not investment advice."

**2. Data Integrity Rules — 10 numbered rules (tear-sheet)**

1. S&P Global tools are the only source for financial data
2. Label what you cannot find ("N/A" / "Not disclosed")
3. Dates matter (fiscal year end, "as of" date for market data)
4. Do not mix reporting periods
5. Prefer MCP-returned fields over manual computation
6. Ensure consistency across tear sheet types for same company
7. Never downgrade known transaction values
8. Use consolidated revenue as segment percentage denominator
9. Always include forward (NTM) multiples when available
10. No management data from training knowledge (tools return none)

These are phrased as overrides: "These override everything else."

**3. Content Quality Rules — 4 additional rules (tear-sheet, numbered 11-14)**

11. Rewrite narrative sections per audience type
12. Differentiate earnings highlights by audience
13. Synthesis sections require analytical reasoning, not listing
14. Flag pending divestitures in segment tables

Arithmetic validation is enforced in a dedicated calculation pass (Step 3b) before document generation.

## Anonymization Requirements

**IB `teaser` skill** enforces anonymization for pre-LOI deal marketing:

- No company name, brand names, or product names
- No specific city (region only: "Southeast US", "Midwest")
- No named customers or partners
- No employee count if distinctive
- Revenue ranges instead of exact figures in small sectors
- No logos, screenshots, or identifiable imagery

**IB `cim-builder`** requires conditional anonymization: customer data anonymized if pre-LOI; confidentiality disclaimer page mandatory.

## Source Attribution Patterns

### S&P Global `earnings-preview-beta` — hyperlinked appendix

Every claim (numeric and qualitative) in the report body must be an `<a class="data-ref" href="#ref-N">` hyperlink to an appendix row. The appendix table has columns: Ref #, Fact, Value, Source & Derivation.

Three source derivation formats:
- **MCP-sourced**: function call signature + raw return value
- **Calculated**: full formula with hyperlinked components back to appendix rows
- **Transcript-sourced**: verbatim quote + speaker + transcript reference + `key_dev_id`
- **Kensho search**: excerpt + mandatory clickable source URL from search results

Completeness check: before finalizing, scan every number in the report body; any number not wrapped in `<a href="#ref-N">` is a defect.

### S&P Global `tear-sheet` — footer attribution

Every page carries a standardized footer: "Data: S&P Capital IQ via Kensho | Analysis: AI-generated | [date]". No per-claim attribution required.

### S&P Global `funding-digest` — deal deep links

Each deal row links to Capital IQ via `capitaliq.spglobal.com` using `transaction_id`. Implemented via pptxgenjs `options.hyperlink` on table cells.

### First-party ER `earnings-preview`

Advisory only: "always note the source and date of estimates". No structural enforcement.

## Verbatim Quote Rules

S&P Global `earnings-preview-beta` requires exact copy-paste from transcripts:
- Intermediate file `transcript-extracts.txt` stores quotes with `=== VERBATIM QUOTES (copy-paste exactly -- do NOT paraphrase) ===` header
- QA pass validates quotes are exact copy-pastes, not paraphrases
- In the HTML report, quotes are formatted as indented blockquotes woven into narrative (no separate heading)

## Ratio Nomenclature

S&P Global enforces LTM/NTM terminology. "Trailing" and "forward" are not used. This applies to all three S&P Global skills.

## Gap Analysis

| Issue | Severity | Detail |
|-------|----------|--------|
| LSEG has zero compliance | High | Produces investment recommendations with no disclaimers |
| PE/WM compliance is prose-only | Medium | Important Notes sections are suggestions, not enforced |
| No cross-plugin compliance standard | Medium | Each plugin defines its own approach; no shared compliance framework |
| Disclaimer text varies by S&P skill | Low | earnings-preview uses generic text; tear-sheet adds "Not investment advice" |
| First-party ER has no source attribution | Medium | S&P Global enforces hyperlinked appendix; first-party ER is advisory only |
