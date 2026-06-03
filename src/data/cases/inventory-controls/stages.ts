import type { Stage } from '@/lib/types/case';

export const stages: Stage[] = [
  {
    id: 'stage-reconcile',
    title: 'Reconcile the Count to the Books',
    description:
      "Year-end. The warehouse team finished the physical count last night and the tally just hit your desk: $298,000 on the floor. Your perpetual system says $310,000. That's a $12,000 hole. The operations manager shrugs — \"just write it off as shrinkage and let's go home.\" Your gut says don't touch the entry yet. What's the right first move?",
    documentIds: ['doc-inv-recon'],
    choices: [
      {
        id: 'choice-reconcile-correct',
        label: 'The books overstate inventory by $12,000 — investigate the variance before recording anything.',
        isCorrect: true,
        feedback:
          'Right call. A count variance can be shrinkage, a cutoff error, or a miscount. Find the cause before you book a write-off.',
        scoreImpact: 20,
        nextStageId: 'stage-cutoff',
      },
      {
        id: 'choice-reconcile-writeoff',
        label: 'Write off the full $12,000 as shrinkage right now.',
        isCorrect: false,
        feedback:
          'Too fast. Part of this variance is a cutoff error, not shrinkage — writing off all $12,000 would overstate the loss. Investigate first.',
        scoreImpact: 8,
        nextStageId: 'stage-cutoff',
      },
      {
        id: 'choice-reconcile-ignore',
        label: '$12,000 on $310,000 is small — call it immaterial and move on.',
        isCorrect: false,
        feedback:
          'A 4% variance with an unknown cause is not something to wave through. It must be explained and corrected.',
        scoreImpact: 0,
        nextStageId: 'stage-cutoff',
      },
    ],
    defaultNextStageId: 'stage-cutoff',
    scoringWeight: 0.2,
    hints: {
      'junior-accountant':
        'A difference between the count and the books is a starting point, not a journal entry. Always find out WHY before adjusting.',
      'audit-associate':
        'Decompose the variance: how much is genuine shrinkage versus a timing/ownership (cutoff) error? Look for goods in transit.',
    },
  },
  {
    id: 'stage-cutoff',
    title: 'Resolve the Cutoff Error',
    description:
      "You pull the late-December receiving log and there it is. A $9,000 pallet was keyed in as \"received Dec 31\" — but the freight terms read FOB destination, and the carrier didn't actually drop it at the dock until January 3. On December 31 those components were still rolling down the interstate. Did you own them at year-end?",
    documentIds: ['doc-inv-receiving'],
    choices: [
      {
        id: 'choice-cutoff-correct',
        label: 'No — FOB destination means title passes on delivery. Reverse the $9,000 receipt (Dr A/P, Cr Inventory).',
        isCorrect: true,
        feedback:
          'Correct. Under FOB destination you owned nothing until Jan 3, so the Dec 31 receipt was premature. Reversing it removes $9,000 of the overstatement.',
        scoreImpact: 25,
        nextStageId: 'stage-shrinkage',
      },
      {
        id: 'choice-cutoff-keep',
        label: 'Keep it — the purchase order was issued in December, so the goods are ours.',
        isCorrect: false,
        feedback:
          'A purchase order does not transfer ownership. With FOB destination, title passes only on delivery (Jan 3). The receipt must be reversed.',
        scoreImpact: 8,
        nextStageId: 'stage-shrinkage',
      },
      {
        id: 'choice-cutoff-ignore',
        label: 'Leave the receiving entry as recorded — it is already in the system.',
        isCorrect: false,
        feedback:
          'Being in the system does not make it correct. The early receipt overstates inventory and payables by $9,000 at year-end.',
        scoreImpact: 0,
        nextStageId: 'stage-shrinkage',
      },
    ],
    defaultNextStageId: 'stage-shrinkage',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant':
        'FOB destination = seller owns the goods until they reach the buyer. FOB shipping point = buyer owns them once they leave the seller. Which applies here?',
      'audit-associate':
        'Cutoff testing: match the receiving date to the freight terms. Goods in transit under FOB destination are not yours yet.',
    },
  },
  {
    id: 'stage-shrinkage',
    title: 'Record the True Shrinkage',
    description:
      "The cutoff fix removed $9,000 of the gap. That leaves $3,000 of the original $12,000 variance with no innocent explanation — no in-transit goods, no miscount the team can find. It's real shrinkage: damage, error, or loss. How do you record it?",
    documentIds: ['doc-inv-recon'],
    choices: [
      {
        id: 'choice-shrinkage-correct',
        label: 'Dr. Inventory Shrinkage (COGS) $3,000 / Cr. Inventory $3,000.',
        isCorrect: true,
        feedback:
          'Correct. After the $9,000 cutoff reversal, the unexplained $3,000 is charged to expense and inventory is reduced to the counted amount.',
        scoreImpact: 25,
        nextStageId: 'stage-nrv',
      },
      {
        id: 'choice-shrinkage-full',
        label: 'Dr. Inventory Shrinkage $12,000 / Cr. Inventory $12,000.',
        isCorrect: false,
        feedback:
          'That double-counts. You already removed $9,000 with the cutoff reversal — only $3,000 is genuine shrinkage.',
        scoreImpact: 8,
        nextStageId: 'stage-nrv',
      },
      {
        id: 'choice-shrinkage-none',
        label: 'No entry — carry the $3,000 as an asset until the cause is found.',
        isCorrect: false,
        feedback:
          'Inventory you do not have is not an asset. The count is the support; the $3,000 must be written off now.',
        scoreImpact: 0,
        nextStageId: 'stage-nrv',
      },
    ],
    defaultNextStageId: 'stage-nrv',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant':
        'Total variance $12,000 − cutoff fix $9,000 = the real shrinkage. Charge that amount to expense and reduce inventory.',
      'audit-associate':
        'Shrinkage is the residual once timing errors are removed. Book it to COGS (or a shrinkage expense account), credit Inventory.',
    },
  },
  {
    id: 'stage-nrv',
    title: 'Apply Lower of Cost or NRV',
    description:
      "Last item before you close. While reviewing the warehouse, you spot 200 units of last season's Model X100 gathering dust. They're on the books at $50 each, but the only buyer interest is a clearance channel that nets about $35 a unit. A next-quarter purchase order is in the pile too, but that's a future commitment — ignore it. What do you do with the X100?",
    documentIds: ['doc-inv-nrv', 'doc-inv-po'],
    choices: [
      {
        id: 'choice-nrv-correct',
        label: 'Write down to NRV: Dr. Loss on Inventory Write-down (COGS) $3,000 / Cr. Inventory $3,000.',
        isCorrect: true,
        feedback:
          'Exactly. Cost $10,000 versus NRV $7,000 — carry it at the lower value and recognize the $3,000 loss now. The PO is a red herring.',
        scoreImpact: 30,
      },
      {
        id: 'choice-nrv-zero',
        label: 'Write the X100 down to $0 — it is last season and not selling at full price.',
        isCorrect: false,
        feedback:
          'NRV is $7,000, not zero — the clearance channel still nets $35/unit. Write down to NRV, not to nothing. The loss is $3,000, not $10,000.',
        scoreImpact: 10,
      },
      {
        id: 'choice-nrv-keep',
        label: 'Keep it at $10,000 — we paid $50 and might still get full price someday.',
        isCorrect: false,
        feedback:
          'Lower of cost or NRV (ASC 330) requires the write-down now. Carrying obsolete goods above realizable value overstates inventory.',
        scoreImpact: 0,
        triggersEventId: 'event-inv-audit',
      },
    ],
    defaultNextStageId: undefined,
    scoringWeight: 0.3,
    hints: {
      'junior-accountant':
        'Compare cost ($50/unit) to net realizable value ($35/unit). Carry inventory at the lower one and book the difference as a loss.',
      'audit-associate':
        'NRV = estimated selling price less costs to complete and sell. When NRV < cost, write down to NRV — never below, never ignore.',
    },
  },
];
