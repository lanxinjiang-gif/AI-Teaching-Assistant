import type { Document } from '@/lib/types/case';

export const documents: Document[] = [
  {
    id: 'br-doc-gl-cash',
    title: 'General Ledger — Cash Account (Nov)',
    type: 'trial-balance',
    content: `
| Date | Description | Debit | Credit | Balance |
|---|---|---|---|---|
| Nov 1 | Opening balance | | | $16,900 |
| Nov | Customer deposits | $58,400 | | |
| Nov | Checks written (#1095–#1110) | | $54,000 | |
| Nov 30 | **Ending GL balance** | | | **$21,300** |

> The bank service fee, the interest credited by the bank, and the returned (NSF) customer check have **not** been recorded in the ledger yet.
`.trim(),
  },
  {
    id: 'br-doc-bank-statement',
    title: 'Bank Statement — Nov 30',
    type: 'report',
    content: `
**First National Bank — Business Checking**
**Statement ending balance (Nov 30): $20,650**

Items on the statement that are **not yet in the general ledger**:

| Item | Amount |
|---|---|
| Interest earned (credited by bank) | +$260 |
| Service / account fee | −$60 |
| NSF check returned — customer J. Ruiz | −$1,500 |

> The Nov 30 deposit and several checks written late in the month do **not** appear on this statement (see the outstanding-items schedule).
`.trim(),
  },
  {
    id: 'br-doc-outstanding',
    title: 'Outstanding Items Schedule',
    type: 'report',
    content: `
**Deposit in transit** (recorded in the ledger Nov 30, not yet on the bank statement):

| Deposit | Amount |
|---|---|
| Nov 30 evening deposit | $4,200 |

**Outstanding checks** (written and recorded, not yet cleared the bank):

| Check # | Payee | Amount |
|---|---|---|
| 1102 | Westside Supply | $1,850 |
| 1108 | Pacific Lease Co. | $3,000 |
| **Total outstanding** | | **$4,850** |
`.trim(),
  },
  {
    id: 'br-doc-redherring',
    title: 'Prior-Month Note — Check #1095',
    type: 'memo',
    isRedHerring: true,
    content: `
**Re:** Check #1095, $900

This check was listed as *outstanding* on the October reconciliation. It **cleared the bank on November 3** and appears in this month's statement activity.

> No action required this month — it is already reflected in both records.
`.trim(),
  },
];
