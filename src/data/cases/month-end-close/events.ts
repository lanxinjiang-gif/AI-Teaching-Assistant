import type { BranchingEvent } from '@/lib/types/case';

export const events: BranchingEvent[] = [
  {
    id: 'event-controller-interrupt',
    type: 'question',
    title: 'Controller Stops By',
    description:
      'Your controller leans over your desk: "Before you post those entries — did you check whether the IT invoice made it into November or December accruals?"',
    trigger: { type: 'on-stage-enter', stageId: 'stage-accruals' },
    choices: [
      {
        id: 'ev-choice-checked',
        label: 'Yes, I already pulled the vendor invoice.',
        isCorrect: true,
        feedback: 'Good answer. The controller nods and moves on.',
        scoreImpact: 5,
      },
      {
        id: 'ev-choice-skip',
        label: "I'll get to it after I finish the other adjustments.",
        isCorrect: false,
        feedback: 'The controller raises an eyebrow. "That invoice is $14k — check it first."',
        scoreImpact: -5,
      },
    ],
  },
  {
    id: 'event-audit-flag',
    type: 'finding',
    title: 'Audit Flag: Deferred Revenue',
    description:
      'An automated variance report flags that Deferred Revenue hasn\'t moved in 60 days. Your auditor sends a Slack: "Can you confirm whether any of the deferred balance should have been recognized this month?"',
    trigger: { type: 'on-choice', choiceId: 'choice-skip-deferred' },
    choices: [
      {
        id: 'ev-audit-correct',
        label: 'You\'re right — I missed $3,750. I\'ll post the adjustment now.',
        isCorrect: true,
        feedback: 'Auditor marks it resolved. Score impact reduced but not eliminated.',
        scoreImpact: 5,
      },
      {
        id: 'ev-audit-wrong',
        label: 'The balance is correct — no adjustment needed.',
        isCorrect: false,
        feedback: 'The auditor escalates. This will show up in the management letter.',
        scoreImpact: -10,
      },
    ],
  },
];
