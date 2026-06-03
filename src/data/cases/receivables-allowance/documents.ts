import type { Document } from '@/lib/types/case';

export const documents: Document[] = [
  {
    id: 'ar-doc-aging',
    title: 'Accounts Receivable Aging — Dec 31',
    type: 'report',
    content: `
| Age bucket | Balance | Est. loss rate |
|---|---|---|
| Current (0 days) | $400,000 | 1% |
| 1–30 days | $120,000 | 3% |
| 31–60 days | $60,000 | 10% |
| 61–90 days | $30,000 | 25% |
| Over 90 days | $20,000 | 50% |
| **Total AR** | **$630,000** | |

> Loss rates are derived from the company's own historical collection experience by bucket. Multiply each balance by its rate and sum to get the **required ending allowance**.
`.trim(),
  },
  {
    id: 'ar-doc-allowance-ledger',
    title: 'Allowance for Doubtful Accounts — Ledger',
    type: 'trial-balance',
    content: `
| Date | Description | Debit | Credit | Balance (Cr) |
|---|---|---|---|---|
| Jan 1 | Opening balance | | | $15,000 |
| During year | Accounts written off | $6,600 | | $8,400 |
| Dec 31 | **Current balance (before year-end estimate)** | | | **$8,400 credit** |

> The allowance is a contra-asset with a normal **credit** balance. The year-end entry adjusts it to the required ending balance — it does not start from zero.
`.trim(),
  },
  {
    id: 'ar-doc-delta',
    title: 'Memo — Delta Corp Bankruptcy',
    type: 'memo',
    content: `
**From:** Collections
**Date:** December 31

Delta Corp filed for **Chapter 7 liquidation**. Counsel advises that our **$5,200** trade receivable is **not collectible**.

> This specific account should be written off against the allowance.
`.trim(),
  },
  {
    id: 'ar-doc-redherring',
    title: 'Memo — Acme Invoice Dispute',
    type: 'memo',
    isRedHerring: true,
    content: `
**From:** Sales
**Date:** December 28

Acme is **disputing a $3,000 invoice** over a delivery shortage. They have confirmed in writing they will **pay once the credit is issued**.

> Collectible — a billing dispute, not a bad debt. **Do not write this off.**
`.trim(),
  },
];
