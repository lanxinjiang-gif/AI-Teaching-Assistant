import type { BranchingEvent } from '@/lib/types/case';

export const events: BranchingEvent[] = [
  {
    id: 'event-rev-discount',
    type: 'question',
    title: 'Controller Stops By',
    description:
      'Your controller pauses at your desk: "Before you lock the allocation — did you spread the bundle discount across all three obligations, or just book each one at list price?"',
    trigger: { type: 'on-stage-enter', stageId: 'stage-allocate' },
    choices: [
      {
        id: 'ev-rev-disc-correct',
        label: 'Spread proportionally by SSP — every obligation shares the 20% discount.',
        isCorrect: true,
        feedback: 'The controller nods. "Good. That is the only defensible method."',
        scoreImpact: 5,
      },
      {
        id: 'ev-rev-disc-wrong',
        label: 'Book each obligation at its full list price.',
        isCorrect: false,
        feedback: 'The controller frowns. "Then your lines sum to $150,000 on a $120,000 contract. Re-do it."',
        scoreImpact: -5,
      },
    ],
  },
  {
    id: 'event-rev-audit',
    type: 'finding',
    title: 'Audit Flag: Revenue Pulled Forward',
    description:
      'A revenue analytics report flags a spike: January revenue equals the entire annual contract. The external auditor messages you: "Can you confirm whether all of Northwind was actually delivered in January?"',
    trigger: { type: 'on-choice', choiceId: 'choice-recognize-upfront' },
    choices: [
      {
        id: 'ev-rev-audit-correct',
        label: 'You are right — only $20,000 was earned. I will move the rest to deferred revenue.',
        isCorrect: true,
        feedback: 'Auditor marks it resolved. Some credit recovered, but the miss is noted.',
        scoreImpact: 5,
      },
      {
        id: 'ev-rev-audit-wrong',
        label: 'The contract is signed, so the revenue is earned. No change.',
        isCorrect: false,
        feedback: 'The auditor escalates. Premature revenue recognition is a management-letter item.',
        scoreImpact: -10,
      },
    ],
  },
];
