import type { Document } from '@/lib/types/case';

export const documents: Document[] = [
  {
    id: 'doc-inv-recon',
    title: 'Inventory Reconciliation — Dec 31',
    type: 'report',
    content: `
| | Amount |
|---|---|
| Perpetual records (books) | $310,000 |
| Physical count (warehouse) | $298,000 |
| **Variance (books over count)** | **$12,000** |

> The books say there is $12,000 more inventory than the team physically counted. Before writing anything off, the variance needs to be explained — part of it may not be shrinkage at all.
`.trim(),
  },
  {
    id: 'doc-inv-receiving',
    title: 'Receiving Log — Late December',
    type: 'report',
    content: `
| Item | Recorded in perpetual | Shipping terms | Physically arrived |
|---|---|---|---|
| Pallet of components, $9,000 | Received Dec 31 | **FOB destination** | Carrier delivered Jan 3 |

> The $9,000 shipment was keyed into the perpetual system as "received" on Dec 31, but the freight terms are **FOB destination** — title passes only when the goods reach our dock. They were still on the truck at year-end (delivered Jan 3), so we did **not** own them on Dec 31. Recording the receipt early overstated the books.
`.trim(),
  },
  {
    id: 'doc-inv-nrv',
    title: 'Obsolescence Review — Model X100 (last season)',
    type: 'report',
    content: `
| | Per unit | Units | Total |
|---|---|---|---|
| Carrying cost | $50 | 200 | $10,000 |
| Net realizable value (clearance, less selling cost) | $35 | 200 | $7,000 |
| **Required write-down** | **$15** | 200 | **$3,000** |

> Under lower of cost or net realizable value (ASC 330), inventory cannot be carried above what it will actually fetch. The X100 must be written down from $10,000 to $7,000 — a **$3,000** loss.
`.trim(),
  },
  {
    id: 'doc-inv-po',
    title: 'Purchase Order #PO-2025-114',
    type: 'memo',
    isRedHerring: true,
    content: `
**Vendor:** Crestline Supply
**Date:** January 8 (next fiscal year)
**Amount:** $42,000
**For:** Q1 restock of fast-moving SKUs

> A purchase order is only a commitment to buy in the future. No goods have shipped and title has not passed. **It has no effect on the Dec 31 inventory balance** — ignore it for this close.
`.trim(),
  },
];
