import type { BranchingEvent } from '@/lib/types/case';

export const events: BranchingEvent[] = [
  {
    id: 'event-inv-manager',
    type: 'question',
    title: 'Warehouse Manager Catches You',
    description:
      'The warehouse manager leans in: "That big pallet the system says we got on the 31st — it wasn\'t on the floor when we counted. Did you check the freight terms before you trust that receipt?"',
    trigger: { type: 'on-stage-enter', stageId: 'stage-cutoff' },
    choices: [
      {
        id: 'ev-inv-mgr-correct',
        label: 'Already on it — the terms are FOB destination, so it was not ours at year-end.',
        isCorrect: true,
        feedback: 'The manager nods. "Good. We never touched it — it was still on the truck."',
        scoreImpact: 5,
      },
      {
        id: 'ev-inv-mgr-wrong',
        label: 'If the system shows it received, it must be ours.',
        isCorrect: false,
        feedback: 'The manager shakes his head. "We never put it away. Check the freight terms before you believe the system."',
        scoreImpact: -5,
      },
    ],
  },
  {
    id: 'event-inv-audit',
    type: 'finding',
    title: 'Audit Flag: Obsolete Inventory',
    description:
      'The auditor reviews the aged-inventory report and stops on the Model X100: "This line has not moved in a year and the market price is below cost. Have you tested it for lower of cost or NRV?"',
    trigger: { type: 'on-choice', choiceId: 'choice-nrv-keep' },
    choices: [
      {
        id: 'ev-inv-audit-correct',
        label: 'You are right — NRV is below cost. I will write it down $3,000.',
        isCorrect: true,
        feedback: 'Auditor marks it resolved. Partial credit recovered, but the miss is on record.',
        scoreImpact: 5,
      },
      {
        id: 'ev-inv-audit-wrong',
        label: 'We paid $50 a unit, so $50 is the right carrying value.',
        isCorrect: false,
        feedback: 'The auditor escalates. Overstated inventory at year-end is a management-letter item.',
        scoreImpact: -10,
      },
    ],
  },
];
