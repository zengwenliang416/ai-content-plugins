# Financial Formulas and Calculation Standards

## DCF Formulas

### Unlevered Free Cash Flow
```
EBIT
x (1 - Tax Rate)
= NOPAT (Net Operating Profit After Tax)
+ D&A
- CapEx
- Change in Net Working Capital
= Unlevered Free Cash Flow
```

### WACC (Weighted Average Cost of Capital)
```
WACC = (E/V x Cost of Equity) + (D/V x Cost of Debt x (1 - Tax Rate))

Where:
  E/V = Market Cap / Enterprise Value
  D/V = Net Debt / Enterprise Value
  Enterprise Value = Market Cap + Net Debt
```

### Cost of Equity (CAPM)
```
Cost of Equity = Risk-Free Rate + Beta x Equity Risk Premium

Where:
  Risk-Free Rate = 10-Year Treasury Yield
  Beta = 5-year monthly stock beta vs. market index
  Equity Risk Premium = 5.0-6.0% (market standard)
```

### Cost of Debt
```
After-Tax Cost of Debt = Pre-Tax Cost of Debt x (1 - Tax Rate)

Pre-Tax Cost of Debt derived from:
  - Credit rating spread
  - Current bond yield
  - Interest Expense / Total Debt
```

### Terminal Value (Perpetuity Growth)
```
Terminal FCF = Final Year FCF x (1 + Terminal Growth Rate)
Terminal Value = Terminal FCF / (WACC - Terminal Growth Rate)

Constraint: Terminal Growth Rate < WACC
Typical range: 2.0-3.5% (should not exceed long-term GDP growth)
```

### Terminal Value (Exit Multiple)
```
Terminal Value = Final Year EBITDA x Exit Multiple

Exit Multiple sourced from:
  - Industry comparable trading multiples
  - Precedent transaction multiples
  - Typical range: 8-15x EBITDA
```

### Discount Factor (Mid-Year Convention)
```
Discount Period: 0.5, 1.5, 2.5, 3.5, 4.5, ...
Discount Factor = 1 / (1 + WACC)^Period
PV of FCF = Unlevered FCF x Discount Factor
PV of Terminal Value = Terminal Value / (1 + WACC)^Final Period
```

### Enterprise to Equity Bridge
```
Sum of PV of Projected FCFs
+ PV of Terminal Value
= Enterprise Value
- Net Debt (or + Net Cash)
= Equity Value
/ Diluted Shares Outstanding
= Implied Price per Share
```

### Terminal Value Sanity Check
- TV should represent 50-70% of Enterprise Value
- If >75%: over-reliant on terminal assumptions
- If <40%: terminal assumptions may be too conservative

## LBO Formulas

### MOIC (Multiple of Invested Capital)
```
MOIC = Total Proceeds / Total Investment
```

### IRR
```
IRR: rate that makes NPV of cash flows = 0
Cash flow signs: Investment = negative, Proceeds = positive
Use XIRR with dates for non-annual periods; IRR for consecutive annual periods
```

### Returns Attribution Decomposition
```
Total Return = Growth Component + Multiple Component + Leverage Component

Growth: EBITDA growth from entry to exit
Multiple: change in EV/EBITDA from entry to exit
Leverage: debt paydown increasing equity share of EV
```

### Sources & Uses Balance
```
Sources                    Uses
  New Debt                   Equity Purchase Price
  Cash on Hand               Refinance Target Debt
  New Equity Issued          Transaction Fees
                             Financing Fees
  Total Sources = Total Uses (one item is the plug)
```

### Debt Paydown / Cash Sweep
- Respect priority waterfall across tranches
- Balances cannot go negative: use MAX(0, ...) or MIN functions
- Interest on beginning balance to break circularity

## Comps Formulas

### Enterprise Value
```
Enterprise Value = Market Cap + Net Debt
Market Cap = Share Price x Shares Outstanding
Net Debt = Total Debt - Cash & Equivalents
```

### Core Multiples
```
EV/Revenue = Enterprise Value / LTM Revenue
EV/EBITDA = Enterprise Value / LTM EBITDA
P/E Ratio = Market Cap / Net Income  (or Share Price / EPS)
```

### Optional Multiples
```
FCF Yield = LTM FCF / Market Cap
PEG Ratio = P/E / Growth Rate %
Price/Book = Market Cap / Book Value of Equity
EV/EBIT = Enterprise Value / EBIT
```

### Statistical Summary (Applied to Ratio Columns Only)
```
=MAX(range)
=QUARTILE(range, 3)     -- 75th percentile
=MEDIAN(range)
=QUARTILE(range, 1)     -- 25th percentile
=MIN(range)
```

Never apply statistics to absolute size metrics (Revenue, EBITDA, Market Cap, EV).

### Margin Hierarchy Check
```
Gross Margin > EBITDA Margin > Net Margin  (always true by definition)
```

## Merger Model Formulas

### Accretion / Dilution
```
Pro Forma Net Income:
  Acquirer Net Income
+ Target Net Income
+ Synergies (after tax)
- Foregone Interest on Cash (after tax)
- New Debt Interest (after tax)
- Intangible Amortization (after tax)
= Pro Forma Net Income

Pro Forma EPS = Pro Forma Net Income / Pro Forma Shares Outstanding
Accretion/(Dilution) % = (Pro Forma EPS - Standalone EPS) / Standalone EPS
```

### Breakeven Synergies
Minimum synergies (after tax) to make Pro Forma EPS >= Standalone EPS in Year 1.

### Purchase Price Analysis
```
Equity Value = Offer Price per Share x Target Shares Outstanding
Enterprise Value = Equity Value + Net Debt Assumed
Premium = (Offer Price - Unaffected Price) / Unaffected Price
Implied EV/EBITDA = Enterprise Value / Target LTM EBITDA
```

### Exchange Ratio (Stock Deals)
```
Exchange Ratio = Offer Price / Acquirer Share Price
New Shares Issued = Target Shares x Exchange Ratio
Pro Forma Shares = Acquirer Shares + New Shares Issued
```

## 3-Statement Linkages

### Core Linkage Checks (Must Equal Zero)
```
Balance Sheet:       Assets - Liabilities - Equity = 0
Cash Tie-Out:        CF Ending Cash - BS Cash = 0
Net Income Link:     IS Net Income - CF Starting Net Income = 0
Retained Earnings:   Prior RE + NI + SBC - Dividends - BS Ending RE = 0
Equity Raise:        Delta Common Stock/APIC (BS) - Equity Issuance (CFF) = 0
Year 0 Equity:       Equity Raised (Year 0) - Beginning Equity (Year 1) = 0
```

### Income Statement Structure
```
Net Revenue
- Cost of Revenue
= Gross Profit          (Gross Margin % = GP / Net Revenue)
- S&M, G&A, R&D, D&A, SBC
= EBIT                  (EBIT Margin % = EBIT / Net Revenue)
  EBITDA = EBIT + D&A   (EBITDA Margin % = EBITDA / Net Revenue)
- Interest Expense
= EBT
- NOL Utilization
= Taxable Income
- Taxes (Taxable Income x Tax Rate)
= Net Income            (Net Income Margin % = NI / Net Revenue)
```

### Gross Profit Calculation
```
Gross Profit = Net Revenue - Cost of Revenue
(Use Net Revenue, not Gross Revenue)
Net Revenue = Gross Revenue - Returns - Allowances - Discounts
```

### Balance Sheet Structure
```
ASSETS: Cash + AR + Inventory + ... = Total Current Assets
        PP&E Net + DTA + ... = Total Non-Current Assets
        Total Assets = Current + Non-Current

LIABILITIES: AP + Current Debt + ... = Total Current Liabilities
             Long-Term Debt + ... = Total Non-Current Liabilities
             Total Liabilities

EQUITY: Common Stock + Retained Earnings = Total Equity

CHECK: Total Assets = Total Liabilities + Total Equity
```

### Cash Flow Statement Structure
```
CFO: Net Income + D&A + SBC - Delta DTA - Delta AR - Delta Inventory + Delta AP
CFI: - CapEx
CFF: + Debt Issuance - Debt Repayment + Equity Issuance - Dividends

Net Change in Cash = CFO + CFI + CFF
Ending Cash = Beginning Cash + Net Change in Cash
(Ending Cash must equal BS Cash)
```

### Retained Earnings Roll-Forward
```
Beginning RE + Net Income + SBC - Dividends = Ending RE
```

### Working Capital Formulas
```
DSO = (AR / Revenue) x 365
DIO = (Inventory / COGS) x 365
DPO = (AP / COGS) x 365
NWC = AR + Inventory - AP
Delta WC = Current NWC - Prior NWC
```

### D&A Schedule
```
Beginning PP&E (Gross) + CapEx = Ending PP&E (Gross)
Beginning Accum Depr + Depr Expense = Ending Accum Depr
PP&E Net = Gross PP&E - Accumulated Depreciation
```

### Debt Schedule
```
Beginning Debt + New Borrowings - Repayments = Ending Debt
Interest Expense = Beginning Debt Balance x Interest Rate
(Use beginning balance to avoid circularity)
```

### NOL Schedule
```
Beginning NOL + NOL Generated (if EBT < 0: ABS(EBT)) - NOL Utilized = Ending NOL
NOL Utilization Limit = EBT x 80% (post-2017 federal cap)
NOL Utilized = MIN(Available NOL, Utilization Limit)
Taxable Income = EBT - NOL Utilized
Taxes = MAX(0, Taxable Income x Tax Rate)
DTA for NOL = Ending NOL Balance x Tax Rate
```

## Credit Metrics
```
Total Debt = Current Portion + Long-Term Debt
Net Debt = Total Debt - Cash
Total Debt / EBITDA = Total Debt / EBITDA
Net Debt / EBITDA = Net Debt / EBITDA
Interest Coverage = EBITDA / Interest Expense
Debt / Total Cap = Total Debt / (Total Debt + Total Equity)
Debt / Equity = Total Debt / Total Equity
Current Ratio = Total Current Assets / Total Current Liabilities
Quick Ratio = (Total Current Assets - Inventory) / Total Current Liabilities
```

### Credit Metric Thresholds
| Metric | Green | Yellow | Red |
|--------|-------|--------|-----|
| Total Debt / EBITDA | < 2.5x | 2.5-4.0x | > 4.0x |
| Net Debt / EBITDA | < 2.0x | 2.0-3.5x | > 3.5x |
| Interest Coverage | > 4.0x | 2.5-4.0x | < 2.5x |
| Debt / Total Cap | < 40% | 40-60% | > 60% |
| Current Ratio | > 1.5x | 1.0-1.5x | < 1.0x |
| Quick Ratio | > 1.0x | 0.75-1.0x | < 0.75x |

## Unit Economics (SaaS / Technology)

### ARR Bridge
```
Beginning ARR
+ New ARR (new customer wins)
+ Expansion ARR (upsell/cross-sell from existing)
- Churned ARR (lost customers)
- Contraction ARR (downsells from existing)
= Ending ARR
```

### Key SaaS Metrics
```
LTV = ARPU / Monthly Churn Rate  (or ARPU x Gross Margin / Churn)
CAC = Total S&M Spend / New Customers Acquired
LTV/CAC Ratio: healthy > 3x

NDR (Net Dollar Retention) = (Beginning ARR + Expansion - Contraction - Churn) / Beginning ARR
Target: >110% for best-in-class SaaS

Rule of 40 = Revenue Growth % + EBITDA Margin %  (or FCF Margin %)
Target: >= 40 for healthy SaaS

Magic Number = Net New ARR (Quarter) / S&M Spend (Prior Quarter)
Target: >0.75 efficient, >1.0 excellent
```

## Forecast Driver Formulas
```
Cost of Revenue = Net Revenue x CoR % Assumption
S&M = Net Revenue x S&M % Assumption
G&A = Net Revenue x G&A % Assumption
R&D = Net Revenue x R&D % Assumption
SBC = Net Revenue x SBC % Assumption
CapEx = Net Revenue x CapEx % Assumption
D&A = Net Revenue x D&A % Assumption
```

## Verification Formulas

### CAGR
```
CAGR = (End Value / Start Value)^(1/n) - 1
Future Value = Present Value x (1 + CAGR)^n
```

### YoY Growth
```
YoY Growth = (Current - Prior) / Prior
```

### Market Share
```
Market Share = Segment Size / Total Market Size
```

### Valuation Multiple Verification
```
EV/Revenue = Enterprise Value / Revenue
EV/EBITDA = Enterprise Value / EBITDA
(Verify by back-calculating: Implied EV = Metric x Multiple)
```

## Sensitivity Table Structure

All sensitivity tables are 2-way grids with formulas in each cell (not Excel Data Tables):

### DCF: 3 Tables x 25 Cells = 75 Total
1. WACC (rows) vs. Terminal Growth Rate (columns) -> Implied Share Price
2. Revenue Growth (rows) vs. EBIT Margin (columns) -> Implied Share Price
3. Beta (rows) vs. Risk-Free Rate (columns) -> Implied Share Price

### LBO: Entry x Exit Multiple Grid -> MOIC and IRR

### Merger: Synergies (rows) vs. Premium (columns) -> Accretion/Dilution %
