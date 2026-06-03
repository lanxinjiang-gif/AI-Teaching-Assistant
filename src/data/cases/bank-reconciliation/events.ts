import type { BranchingEvent } from '@/lib/types/case';

export const events: BranchingEvent[] = [
  {
    id: 'br-event-controller',
    type: 'question',
    title: 'Controller Stops By',
    description:
      'The controller pauses at your desk: "Before you post anything — you\'re not making a journal entry for those two outstanding checks, right?"',
    trigger: { type: 'on-stage-enter', stageId: 'br-stage-entry' },
    choices: [
      {
        id: 'br-ev-checks-correct',
        label: 'Correct — they were recorded when written. The bank just hasn\'t paid them yet.',
        isCorrect: true,
        feedback: 'She nods. "Good. People always want to re-book those."',
        scoreImpact: 5,
      },
      {
        id: 'br-ev-checks-wrong',
        label: 'I was going to remove them from cash, yes.',
        isCorrect: false,
        feedback: '"Don\'t — that double-counts. Outstanding checks are a bank timing difference, not a book entry."',
        scoreImpact: -5,
      },
    ],
  },
  {
    id: 'br-event-double-entry',
    type: 'finding',
    title: 'Review Note: Double-Counted Cash',
    description:
      'A reviewer catches it: "You booked entries for the deposit in transit and the outstanding checks, but those were already in the ledger. Cash is now misstated."',
    trigger: { type: 'on-choice', choiceId: 'br-entry-wrong' },
    choices: [
      {
        id: 'br-ev-fix-correct',
        label: 'You\'re right — reverse those two entries. Only book-side items get recorded.',
        isCorrect: true,
        feedback: 'Reversed and resolved. Net cash effect of the real entries: +$260 − $60 − $1,500 = −$1,300.',
        scoreImpact: 5,
      },
      {
        id: 'br-ev-fix-wrong',
        label: 'Leave them — every reconciling item should be journalized.',
        isCorrect: false,
        feedback: 'No. The ledger already reflected them. This overstates the adjustments and misstates cash.',
        scoreImpact: -10,
      },
    ],
  },
];
