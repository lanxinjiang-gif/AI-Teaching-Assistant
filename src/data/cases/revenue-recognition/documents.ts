import type { Document } from '@/lib/types/case';

export const documents: Document[] = [
  {
    id: 'doc-rev-contract',
    title: 'Master Subscription Agreement — Northwind Corp',
    type: 'contract',
    content: `
**Customer:** Northwind Corp
**Effective date:** January 1
**Total fixed fee:** $120,000 (non-refundable, billed annually in advance)

The Company will provide the following under a single signed contract:

1. **Cloud platform subscription** — 12-month access to the SaaS platform.
2. **Implementation services** — one-time data migration and configuration, delivered over the first two months.
3. **Premium support** — 12 months of priority support and a dedicated success manager.

> Each component is also sold separately to other customers. Implementation can be performed by third parties. None of the three depends on the others to function.
`.trim(),
  },
  {
    id: 'doc-ssp-schedule',
    title: 'Standalone Selling Price (SSP) Schedule',
    type: 'report',
    content: `
| Performance obligation | Standalone selling price |
|---|---|
| Cloud platform subscription (12 mo) | $100,000 |
| Implementation services | $30,000 |
| Premium support (12 mo) | $20,000 |
| **Sum of SSPs** | **$150,000** |

> The customer pays a bundled price of **$120,000** versus $150,000 of standalone value — a **20% discount** that ASC 606 requires be allocated across **all** performance obligations in proportion to their SSP.
`.trim(),
  },
  {
    id: 'doc-rev-timeline',
    title: 'Delivery Timeline & Allocated Amounts',
    type: 'report',
    content: `
| Obligation | Allocated price | Pattern | Recognized in January |
|---|---|---|---|
| Subscription | $80,000 | Ratably over 12 months | $80,000 ÷ 12 = $6,666.67 |
| Support | $16,000 | Ratably over 12 months | $16,000 ÷ 12 = $1,333.33 |
| Implementation | $24,000 | As delivered (even over Jan–Feb) | 50% = $12,000 |

> Implementation is **50% complete** at January 31 (one of two months of even effort). The subscription and support clocks both started January 1.
`.trim(),
  },
  {
    id: 'doc-rev-modification',
    title: 'Contract Change Order #1 — Seat Expansion',
    type: 'memo',
    content: `
**Date:** July 1 (6 months into the term)
**Change:** Customer adds **50 additional user seats** for the remaining 6 months.
**Price:** $24,000, billed separately.

The 50 incremental seats are priced at the Company's current **standalone selling price** for additional seats. The added seats are a distinct service the customer can benefit from on its own.

> Question for accounting: is this a **separate contract**, or a **modification** of the existing one?
`.trim(),
  },
  {
    id: 'doc-rev-commission',
    title: 'Sales Commission Payout — Northwind Deal',
    type: 'memo',
    isRedHerring: true,
    content: `
**Paid to:** Account Executive
**Amount:** $9,000 (7.5% of contract value)
**Date:** January 5

Commission earned on closing the Northwind subscription contract.

> Incremental costs to **obtain** a contract are addressed by ASC 340-40 (capitalize and amortize). This is a **cost** question, not part of measuring or timing the **revenue** — no impact on the revenue entries in this case.
`.trim(),
  },
];
