import type { Stage } from '@/lib/types/case';

export const stages: Stage[] = [
  {
    id: 'stage-review',
    title: 'Review the Trial Balance',
    description:
      "It's 4:47 PM on November 30. The office is quiet — most of the team left early. You pull up the unadjusted trial balance on your monitor. The controller's sticky note is on your keyboard: \"Close by EOD. Don't miss anything.\" You scan the numbers. Something feels off.",
    documentIds: ['doc-trial-balance'],
    choices: [
      {
        id: 'choice-review-correct',
        label: 'The Accrued Liabilities balance looks low and Prepaid Expenses may be overstated.',
        isCorrect: true,
        feedback: 'Sharp eye. Both items will need investigation. You advance to the accruals stage.',
        scoreImpact: 15,
        nextStageId: 'stage-accruals',
      },
      {
        id: 'choice-review-partial',
        label: 'Only the Accrued Liabilities balance looks off.',
        isCorrect: false,
        feedback: 'You caught one issue but missed the Prepaid overage. Review the prepaid schedule too.',
        scoreImpact: 5,
        nextStageId: 'stage-accruals',
      },
      {
        id: 'choice-review-wrong',
        label: 'Everything looks fine — the trial balance is clean.',
        isCorrect: false,
        feedback: "Not quite. The Accrued Liabilities are understated and Prepaids aren't amortized. Let's dig in.",
        scoreImpact: 0,
        nextStageId: 'stage-accruals',
      },
    ],
    defaultNextStageId: 'stage-accruals',
    scoringWeight: 0.2,
    hints: {
      'junior-accountant': 'Compare the Accrued Liabilities balance to prior months. Does anything seem unusually low?',
      'audit-associate': 'Check the prepaid balance against the amortization schedule — does it tie?',
    },
  },
  {
    id: 'stage-accruals',
    title: 'Record the Missing Accrual',
    description:
      "You dig into the AP inbox and find it — Invoice #4821 from Apex IT Solutions, $14,200 for cloud infrastructure. Received November 28. Not in the GL. The service happened in November, so the expense belongs here. Your fingers hover over the keyboard. What's the entry?",
    documentIds: ['doc-vendor-invoice'],
    choices: [
      {
        id: 'choice-accrual-correct',
        label: 'Dr. IT Services Expense $14,200 / Cr. Accrued Liabilities $14,200',
        isCorrect: true,
        feedback: 'Correct. The expense belongs in November (period of service). Accrued Liabilities increases.',
        scoreImpact: 20,
        nextStageId: 'stage-prepaid',
      },
      {
        id: 'choice-accrual-ap',
        label: 'Dr. IT Services Expense $14,200 / Cr. Accounts Payable $14,200',
        isCorrect: false,
        feedback: "Close — but since the invoice isn't approved for payment yet, Accrued Liabilities is the correct credit, not AP.",
        scoreImpact: 8,
        nextStageId: 'stage-prepaid',
      },
      {
        id: 'choice-accrual-skip',
        label: 'Record it in December when the invoice is paid.',
        isCorrect: false,
        feedback: 'Matching principle: the service was received in November, so the expense is recognized in November.',
        scoreImpact: 0,
        nextStageId: 'stage-prepaid',
      },
    ],
    defaultNextStageId: 'stage-prepaid',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant': 'Remember the matching principle: record expenses in the period the service was received.',
    },
  },
  {
    id: 'stage-prepaid',
    title: 'Amortize the Prepaid Expense',
    description:
      "You open the prepaid schedule and your stomach drops. The D&O Insurance hasn't been amortized all year. The GL still shows $24,000 — but only one month of coverage is left. The server rack memo is also in the pile, but a quick check shows that capex is already handled. Focus. What do you adjust?",
    documentIds: ['doc-prepaid-schedule', 'doc-red-herring-memo'],
    choices: [
      {
        id: 'choice-prepaid-correct',
        label: 'Dr. Insurance Expense $22,000 / Cr. Prepaid Insurance $22,000',
        isCorrect: true,
        feedback: "Exactly right. $24,000 - $2,000 = $22,000 to recognize. The server rack memo was a red herring — that's already handled.",
        scoreImpact: 20,
        nextStageId: 'stage-deferred',
      },
      {
        id: 'choice-prepaid-monthly',
        label: 'Dr. Insurance Expense $2,000 / Cr. Prepaid Insurance $2,000',
        isCorrect: false,
        feedback: "That's only one month's amortization. The schedule shows no amortization was recorded all year — you need to catch up $22,000.",
        scoreImpact: 5,
        nextStageId: 'stage-deferred',
      },
      {
        id: 'choice-prepaid-nothing',
        label: 'No adjustment needed — prepaids look fine.',
        isCorrect: false,
        feedback: 'The GL balance of $24,000 vs. a correct balance of $2,000 means $22,000 was never expensed.',
        scoreImpact: 0,
        nextStageId: 'stage-deferred',
      },
    ],
    defaultNextStageId: 'stage-deferred',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant': 'The amortization schedule shows what the balance SHOULD be. Subtract from the GL balance to get your adjustment.',
      'audit-associate': 'Always reconcile GL balances to supporting schedules — the difference is your adjustment.',
    },
  },
  {
    id: 'stage-deferred',
    title: 'Recognize Deferred Revenue',
    description:
      "One last item. The deferred revenue memo is sitting in your inbox — three annual contracts renewed November 1, $15,000 each. The full $45,000 is still parked in Deferred Revenue. But November is over. One month of service has been delivered. The auditor's already flagging this account. What do you do?",
    documentIds: ['doc-deferred-revenue-memo'],
    choices: [
      {
        id: 'choice-deferred-correct',
        label: 'Dr. Deferred Revenue $3,750 / Cr. Revenue $3,750',
        isCorrect: true,
        feedback: '3 contracts x ($15,000 / 12) = $3,750 for one month of service delivered. Perfect.',
        scoreImpact: 20,
        triggersEventId: undefined,
      },
      {
        id: 'choice-deferred-full',
        label: 'Dr. Deferred Revenue $45,000 / Cr. Revenue $45,000',
        isCorrect: false,
        feedback: 'Only one month of service has been delivered. Recognizing the full amount violates the revenue recognition principle.',
        scoreImpact: 0,
        triggersEventId: undefined,
      },
      {
        id: 'choice-skip-deferred',
        label: 'Leave Deferred Revenue as-is — it will unwind automatically.',
        isCorrect: false,
        feedback: 'Deferred revenue requires a manual entry each period. Skipping it understates November revenue.',
        scoreImpact: 0,
        triggersEventId: 'event-audit-flag',
      },
    ],
    defaultNextStageId: undefined,
    scoringWeight: 0.3,
    hints: {
      'junior-accountant': 'Each contract is $15,000/year. How much revenue is earned in a single month?',
      'audit-associate': 'Check the memo: three contracts x monthly rate. Only service delivered to date can be recognized.',
    },
  },
];
