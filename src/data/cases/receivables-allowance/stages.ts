import type { Stage } from '@/lib/types/case';

export const stages: Stage[] = [
  {
    id: 'ar-stage-review',
    title: 'Review the Aging',
    description:
      "Year-end. The AR aging is on your screen: $630,000 outstanding, but a chunk of it is old. The auditors arrive Monday. How should you size the allowance for doubtful accounts?",
    documentIds: ['ar-doc-aging', 'ar-doc-allowance-ledger'],
    choices: [
      {
        id: 'ar-review-correct',
        label: 'Use the aging method — apply each bucket\'s historical loss rate; the 61+ day balances are the real exposure.',
        isCorrect: true,
        feedback: 'Right. Older receivables default more often, so a flat rate understates risk. The aging method ties the estimate to actual experience.',
        scoreImpact: 25,
        nextStageId: 'ar-stage-estimate',
      },
      {
        id: 'ar-review-partial',
        label: 'Apply a single 2% rate to total AR — simpler and close enough.',
        isCorrect: false,
        feedback: 'A flat percentage-of-receivables rate ignores that the old buckets are far riskier. Acceptable in theory, but the aging method is more defensible here.',
        scoreImpact: 10,
        nextStageId: 'ar-stage-estimate',
      },
      {
        id: 'ar-review-wrong',
        label: 'No allowance — just write accounts off directly if and when they actually default.',
        isCorrect: false,
        feedback: 'The direct write-off method is not GAAP for material receivables — it violates the matching principle. You must estimate the allowance now.',
        scoreImpact: 0,
        nextStageId: 'ar-stage-estimate',
      },
    ],
    defaultNextStageId: 'ar-stage-estimate',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant': 'The aging method multiplies each age bucket by its own loss rate, then sums them.',
      'audit-associate': 'GAAP requires estimating expected losses up front (matching), not waiting for specific defaults.',
    },
  },
  {
    id: 'ar-stage-estimate',
    title: 'Compute the Required Allowance',
    description:
      "Run the aging method. Multiply each bucket by its loss rate and add them up. What ending balance should the allowance for doubtful accounts have?",
    documentIds: ['ar-doc-aging'],
    choices: [
      {
        id: 'ar-estimate-correct',
        label: '$31,100',
        isCorrect: true,
        feedback: '$4,000 + $3,600 + $6,000 + $7,500 + $10,000 = $31,100. This is the TARGET ending balance of the allowance.',
        scoreImpact: 25,
        nextStageId: 'ar-stage-adjust',
      },
      {
        id: 'ar-estimate-partial',
        label: '$26,100',
        isCorrect: false,
        feedback: 'Close — that uses 25% on the over-90 bucket. The over-90 rate is 50%, so that bucket is $10,000, giving $31,100.',
        scoreImpact: 10,
        nextStageId: 'ar-stage-adjust',
      },
      {
        id: 'ar-estimate-wrong',
        label: '$12,600 (2% of total AR)',
        isCorrect: false,
        feedback: 'That is the flat-rate shortcut. Using the aging rates by bucket gives $31,100.',
        scoreImpact: 0,
        nextStageId: 'ar-stage-adjust',
      },
    ],
    defaultNextStageId: 'ar-stage-adjust',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant': '400k×1% + 120k×3% + 60k×10% + 30k×25% + 20k×50%.',
      'audit-associate': 'The aging method gives the required ENDING balance of the allowance, not the expense directly.',
    },
  },
  {
    id: 'ar-stage-adjust',
    title: 'Record the Year-End Estimate',
    description:
      "The allowance already carries an $8,400 credit balance from earlier in the year. You need it to end at $31,100. What's the adjusting entry?",
    documentIds: ['ar-doc-allowance-ledger'],
    choices: [
      {
        id: 'ar-adjust-correct',
        label: 'Dr Bad Debt Expense $22,700 / Cr Allowance $22,700 — bring the $8,400 balance up to the $31,100 target.',
        isCorrect: true,
        feedback: 'Correct. $31,100 − $8,400 = $22,700. Under the aging method you adjust TO the target balance, not by the full estimate.',
        scoreImpact: 25,
        nextStageId: 'ar-stage-writeoff',
      },
      {
        id: 'ar-adjust-partial',
        label: 'Dr Bad Debt Expense $31,100 / Cr Allowance $31,100 — record the full estimate.',
        isCorrect: false,
        feedback: 'That ignores the existing $8,400 credit and would leave the allowance at $39,500. Adjust to the target: expense $22,700.',
        scoreImpact: 10,
        nextStageId: 'ar-stage-writeoff',
      },
      {
        id: 'ar-adjust-wrong',
        label: 'No entry — the allowance already has a balance.',
        isCorrect: false,
        feedback: 'The current $8,400 is far below the $31,100 the aging requires. You must record $22,700 of bad debt expense.',
        scoreImpact: 0,
        nextStageId: 'ar-stage-writeoff',
      },
    ],
    defaultNextStageId: 'ar-stage-writeoff',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant': 'Bad debt expense = required ending allowance − existing credit balance.',
      'audit-associate': 'The aging (balance-sheet) method solves for the ending allowance; the expense is the plug to get there.',
    },
  },
  {
    id: 'ar-stage-writeoff',
    title: 'Write Off a Dead Account',
    description:
      "Collections confirms Delta Corp filed Chapter 7 — its $5,200 balance is gone. (Acme's $3,000 dispute is unrelated; they'll pay.) How do you record the Delta write-off?",
    documentIds: ['ar-doc-delta', 'ar-doc-redherring'],
    choices: [
      {
        id: 'ar-writeoff-correct',
        label: 'Dr Allowance for Doubtful Accounts $5,200 / Cr Accounts Receivable $5,200 — no effect on expense or net income.',
        isCorrect: true,
        feedback: 'Exactly. The loss was already expensed via the estimate. A specific write-off just reduces the allowance and AR together. Acme stays on the books.',
        scoreImpact: 25,
      },
      {
        id: 'ar-writeoff-partial',
        label: 'Dr Bad Debt Expense $5,200 / Cr Accounts Receivable $5,200.',
        isCorrect: false,
        feedback: 'That double-counts — the expense was already recorded through the allowance estimate. Write-offs hit the allowance, not expense.',
        scoreImpact: 10,
        triggersEventId: 'ar-event-writeoff',
      },
      {
        id: 'ar-writeoff-wrong',
        label: 'Dr Accounts Receivable $5,200 / Cr Revenue $5,200.',
        isCorrect: false,
        feedback: 'That records a sale, not a write-off. A bad debt removes the receivable against the allowance.',
        scoreImpact: 0,
      },
    ],
    defaultNextStageId: undefined,
    scoringWeight: 0.25,
    hints: {
      'junior-accountant': 'Writing off a specific account never touches the income statement — it nets the allowance against AR.',
      'audit-associate': 'A disputed-but-collectible invoice is not a bad debt — only write off amounts deemed uncollectible.',
    },
  },
];
