import type { Stage } from '@/lib/types/case';

export const stages: Stage[] = [
  {
    id: 'stage-obligations',
    title: 'Identify the Performance Obligations',
    description:
      "9:10 AM, January close. A fresh signed contract from Northwind Corp landed in your queue overnight — $120,000, all-in. Subscription, implementation, premium support, one price. Sales already told the customer \"it's one package.\" Before a single dollar of revenue moves, ASC 606 asks you the first question: what exactly did you promise to deliver?",
    documentIds: ['doc-rev-contract'],
    choices: [
      {
        id: 'choice-obligations-correct',
        label: 'Three distinct performance obligations: subscription, implementation, and support.',
        isCorrect: true,
        feedback:
          'Correct. Each is capable of being distinct and is distinct within the contract (separately sold, not interdependent). Three obligations.',
        scoreImpact: 20,
        nextStageId: 'stage-allocate',
      },
      {
        id: 'choice-obligations-two',
        label: 'Two: bundle the subscription and support together, with implementation separate.',
        isCorrect: false,
        feedback:
          'Support is sold separately and the customer can benefit from it on its own — it is its own obligation. There are three, not two.',
        scoreImpact: 8,
        nextStageId: 'stage-allocate',
      },
      {
        id: 'choice-obligations-one',
        label: 'One combined obligation — it was sold as a single package for a single price.',
        isCorrect: false,
        feedback:
          'A single price does not make a single obligation. Because each promise is distinct, you must separate them. There are three.',
        scoreImpact: 0,
        nextStageId: 'stage-allocate',
      },
    ],
    defaultNextStageId: 'stage-allocate',
    scoringWeight: 0.2,
    hints: {
      'junior-accountant':
        'A promise is a separate performance obligation if it is (a) capable of being distinct and (b) distinct within the contract. Check whether each item is sold separately.',
      'audit-associate':
        'Read the contract note: each component is sold separately and none depends on the others. That is the textbook test for "distinct."',
    },
  },
  {
    id: 'stage-allocate',
    title: 'Allocate the Transaction Price',
    description:
      "Three obligations identified. Now the money. The customer pays $120,000, but the three pieces are worth $150,000 at their standalone prices. That gap is a 20% bundle discount — and ASC 606 won't let you dump it on whichever line is convenient. How do you split the $120,000?",
    documentIds: ['doc-ssp-schedule'],
    choices: [
      {
        id: 'choice-allocate-correct',
        label: 'Subscription $80,000 / Implementation $24,000 / Support $16,000 (proportional to SSP).',
        isCorrect: true,
        feedback:
          'Exactly. Each obligation takes its SSP ÷ $150,000 × $120,000. The 20% discount is spread proportionally across all three.',
        scoreImpact: 25,
        nextStageId: 'stage-recognize',
      },
      {
        id: 'choice-allocate-ssp',
        label: 'Subscription $100,000 / Implementation $30,000 / Support $20,000 (at list price).',
        isCorrect: false,
        feedback:
          'That totals $150,000 — you ignored the $30,000 bundle discount. The contract price is $120,000; allocate that, not the list prices.',
        scoreImpact: 8,
        nextStageId: 'stage-recognize',
      },
      {
        id: 'choice-allocate-even',
        label: 'Split it evenly — $40,000 to each obligation.',
        isCorrect: false,
        feedback:
          'Allocation must be in proportion to standalone selling prices, not split evenly. The pieces are worth very different amounts.',
        scoreImpact: 0,
        nextStageId: 'stage-recognize',
      },
    ],
    defaultNextStageId: 'stage-recognize',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant':
        'Allocate by relative SSP: each obligation gets (its SSP ÷ total SSP) × contract price. Total SSP is $150,000; contract price is $120,000.',
      'audit-associate':
        'The discount belongs to the whole bundle, so it is allocated to every obligation in proportion to SSP — never to a single line.',
    },
  },
  {
    id: 'stage-recognize',
    title: 'Recognize January Revenue',
    description:
      "The allocation is locked. It's January 31 and the controller wants the revenue number for the month. The subscription and support meters have run for one month; implementation is half done. Sales is whispering that you should \"just book the whole $120,000 — the contract is signed.\" What goes on the income statement for January?",
    documentIds: ['doc-rev-timeline'],
    choices: [
      {
        id: 'choice-recognize-correct',
        label: 'Recognize $20,000 ($6,666.67 subscription + $1,333.33 support + $12,000 implementation).',
        isCorrect: true,
        feedback:
          'Right. One month of subscription and support, plus 50% of implementation delivered. $20,000 earned; the rest stays in deferred revenue.',
        scoreImpact: 25,
        nextStageId: 'stage-modification',
      },
      {
        id: 'choice-recognize-partial',
        label: 'Recognize $8,000 — just the subscription and support for the month.',
        isCorrect: false,
        feedback:
          'You forgot implementation. It is 50% delivered in January, so $12,000 of it is earned. The January total is $20,000.',
        scoreImpact: 10,
        nextStageId: 'stage-modification',
      },
      {
        id: 'choice-recognize-upfront',
        label: 'Recognize the full $120,000 now — the contract is signed and billed.',
        isCorrect: false,
        feedback:
          'Signing and billing are not delivery. Revenue is recognized as obligations are satisfied. Recognizing it all up front overstates January massively.',
        scoreImpact: 0,
        nextStageId: 'stage-modification',
        triggersEventId: 'event-rev-audit',
      },
    ],
    defaultNextStageId: 'stage-modification',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant':
        'Subscription and support are recognized ratably (annual amount ÷ 12). Implementation is recognized as delivered — it is 50% done. Add the three.',
      'audit-associate':
        'Tie each line to its delivery pattern in the timeline document. Deferred revenue holds everything not yet earned.',
    },
  },
  {
    id: 'stage-modification',
    title: 'Handle the Mid-Term Change Order',
    description:
      "July 1. Northwind is happy and wants 50 more seats for the back half of the year — $24,000, priced at your normal per-seat rate. The CFO asks whether this forces you to reopen and re-spread the original deal. A sales commission memo is also in the pile, but that's a cost question, not yours today. How do you account for the add-on?",
    documentIds: ['doc-rev-modification', 'doc-rev-commission'],
    choices: [
      {
        id: 'choice-modification-correct',
        label: 'Treat it as a separate contract — distinct seats at SSP — and recognize $4,000/month going forward.',
        isCorrect: true,
        feedback:
          'Correct. Added goods that are distinct and priced at their standalone selling price are a separate contract. No catch-up; $24,000 ÷ 6 = $4,000/month prospectively.',
        scoreImpact: 30,
      },
      {
        id: 'choice-modification-blend',
        label: 'Treat it as a modification — blend $24,000 into the remaining term and re-spread prospectively.',
        isCorrect: false,
        feedback:
          'Because the seats are distinct AND priced at SSP, ASC 606 says it is a separate contract, not a blended modification. No re-spreading needed.',
        scoreImpact: 12,
      },
      {
        id: 'choice-modification-catchup',
        label: 'Record a cumulative catch-up adjustment to revenue already recognized.',
        isCorrect: false,
        feedback:
          'A cumulative catch-up is only for modifications that are not distinct. This add-on is distinct and at SSP — it is purely forward-looking.',
        scoreImpact: 0,
      },
    ],
    defaultNextStageId: undefined,
    scoringWeight: 0.3,
    hints: {
      'junior-accountant':
        'Ask two questions: are the added goods distinct, and are they priced at standalone selling price? If yes to both, it is a brand-new contract.',
      'audit-associate':
        'Distinct + SSP = separate contract (prospective). Not distinct, or off-SSP = modification (re-allocate or catch-up). This one is the clean case.',
    },
  },
];
