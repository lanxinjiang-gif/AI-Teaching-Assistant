import type { Document } from '@/lib/types/case';

export const documents: Document[] = [
  {
    id: 'doc-trial-balance',
    title: 'Unadjusted Trial Balance — Nov 30',
    type: 'trial-balance',
    content: `
| Account | Debit | Credit |
|---|---|---|
| Cash | $142,300 | |
| Accounts Receivable | $87,450 | |
| Prepaid Expenses | $24,000 | |
| Inventory | $310,200 | |
| Accounts Payable | | $91,700 |
| Accrued Liabilities | | $8,500 |
| Deferred Revenue | | $45,000 |
| Revenue | | $528,000 |
| COGS | $390,000 | |
| Operating Expenses | $112,000 | |

> **Note:** Accrued Liabilities balance appears understated per the controller's checklist.
`.trim(),
  },
  {
    id: 'doc-vendor-invoice',
    title: 'Vendor Invoice #4821 — IT Services',
    type: 'memo',
    content: `
**From:** Apex IT Solutions
**To:** Accounting Department
**Invoice Date:** November 28
**Due Date:** December 15
**Amount:** $14,200

Services rendered: Cloud infrastructure maintenance for November.

> **Status:** Invoice received but NOT yet recorded in the general ledger as of Nov 30.
`.trim(),
  },
  {
    id: 'doc-prepaid-schedule',
    title: 'Prepaid Expense Amortization Schedule',
    type: 'report',
    content: `
| Policy | Start | Monthly Amt | Nov Balance (GL) | Should Be |
|---|---|---|---|---|
| D&O Insurance | Jan 1 | $2,000 | $24,000 | $2,000 |
| Rent Deposit | N/A | — | $0 | $0 |

> **Issue:** The D&O Insurance prepaid was not amortized in November. The correct Nov 30 balance should be **$2,000** (one month remaining), not **$24,000**.
`.trim(),
  },
  {
    id: 'doc-deferred-revenue-memo',
    title: 'Deferred Revenue Memo — Annual Contracts',
    type: 'memo',
    content: `
**Prepared by:** Revenue Accounting
**Date:** December 1

Three annual contracts were renewed on November 1. Each is priced at $15,000/year ($1,250/month).

Current GL balance of Deferred Revenue: **$45,000**
Revenue recognized to date: **$0** (error — one month of service has been delivered)

> **Required adjustment:** Recognize $3,750 (3 × $1,250) of revenue for November.
`.trim(),
  },
  {
    id: 'doc-red-herring-memo',
    title: 'Capital Expenditure Approval — Server Rack',
    type: 'memo',
    isRedHerring: true,
    content: `
**Approved By:** CFO
**Date:** October 15
**Amount:** $32,000
**Asset Class:** IT Equipment (5-year useful life)

Server rack was received and placed in service October 20. Depreciation has been recorded correctly through November.

> This capex is fully captured in the fixed asset register. **No month-end adjustment required.**
`.trim(),
  },
];
