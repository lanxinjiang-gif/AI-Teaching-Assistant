import type { BranchingEvent } from '@/lib/types/case';

export const events: BranchingEvent[] = [
  {
    id: 'ar-event-cfo',
    type: 'question',
    title: 'The CFO Has a Suggestion',
    description:
      'The CFO catches you before you post: "Our debt covenant needs higher net income this quarter. Can you just use 0.5% across the board? That drops the allowance to about $3,000 — much friendlier number."',
    trigger: { type: 'on-stage-enter', stageId: 'ar-stage-adjust' },
    choices: [
      {
        id: 'ar-ev-cfo-correct',
        label: 'The aging reflects our actual collection history — I can\'t lower it to hit a covenant.',
        isCorrect: true,
        feedback: 'Professional skepticism intact. Estimates follow evidence, not earnings targets — this is exactly what auditors probe.',
        scoreImpact: 5,
      },
      {
        id: 'ar-ev-cfo-wrong',
        label: 'Sure — 0.5% it is.',
        isCorrect: false,
        feedback: 'Under-reserving to manage earnings is a misstatement. The aging evidence does not support $3,000.',
        scoreImpact: -10,
      },
    ],
  },
  {
    id: 'ar-event-writeoff',
    type: 'finding',
    title: 'Review Note: Double-Counted Loss',
    description:
      'A reviewer flags your Delta entry: "You hit Bad Debt Expense again — but that loss was already in this year\'s estimate. Net income is now understated."',
    trigger: { type: 'on-choice', choiceId: 'ar-writeoff-partial' },
    choices: [
      {
        id: 'ar-ev-wo-correct',
        label: 'Right — re-do it against the allowance: Dr Allowance / Cr AR.',
        isCorrect: true,
        feedback: 'Fixed. Specific write-offs reduce the allowance, never expense.',
        scoreImpact: 5,
      },
      {
        id: 'ar-ev-wo-wrong',
        label: 'Leave it — every bad debt should hit expense.',
        isCorrect: false,
        feedback: 'No — the expense was recognized when you estimated the allowance. Charging it again double-counts the loss.',
        scoreImpact: -10,
      },
    ],
  },
];
