import type { Stage } from '@/lib/types/case';

export const stages: Stage[] = [
  {
    id: 'br-stage-review',
    title: 'Open the Reconciliation',
    description:
      "Month-end. You pull the cash ledger and the bank statement side by side. The ledger says $21,300. The bank says $20,650. They don't match — and the controller wants the reconciliation on her desk before lunch. Where do you start?",
    documentIds: ['br-doc-gl-cash', 'br-doc-bank-statement'],
    choices: [
      {
        id: 'br-review-correct',
        label: 'Reconcile both balances to one true cash figure — neither the book nor the bank balance is final on its own.',
        isCorrect: true,
        feedback: 'Right. Each side is missing items the other knows about. You adjust both toward the true cash balance.',
        scoreImpact: 25,
        nextStageId: 'br-stage-bank',
      },
      {
        id: 'br-review-partial',
        label: 'Adjust the ledger so it equals the bank statement balance.',
        isCorrect: false,
        feedback: "The bank isn't the source of truth either — it hasn't seen your Nov 30 deposit or your outstanding checks. Both sides need adjusting.",
        scoreImpact: 10,
        nextStageId: 'br-stage-bank',
      },
      {
        id: 'br-review-wrong',
        label: 'The bank statement is the official record — change the books to $20,650.',
        isCorrect: false,
        feedback: 'No. Outstanding checks and the deposit in transit are timing differences, not book errors. Reconcile both sides to true cash.',
        scoreImpact: 0,
        nextStageId: 'br-stage-bank',
      },
    ],
    defaultNextStageId: 'br-stage-bank',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant': 'A bank reconciliation adjusts BOTH the bank balance and the book balance until they meet at the true cash figure.',
      'audit-associate': 'Sort each reconciling item by which side it belongs to: bank-side (timing) vs book-side (items the company has not recorded yet).',
    },
  },
  {
    id: 'br-stage-bank',
    title: 'Adjust the Bank Side',
    description:
      "Start with the bank balance of $20,650. The bank hasn't yet seen your Nov 30 deposit of $4,200, and checks #1102 and #1108 ($4,850 total) haven't cleared. What is the adjusted bank balance?",
    documentIds: ['br-doc-outstanding', 'br-doc-redherring'],
    choices: [
      {
        id: 'br-bank-correct',
        label: '$20,000 — add the $4,200 deposit in transit, subtract the $4,850 in outstanding checks.',
        isCorrect: true,
        feedback: '$20,650 + $4,200 − $4,850 = $20,000. Deposits in transit add; outstanding checks subtract. (Check #1095 already cleared — a red herring.)',
        scoreImpact: 25,
        nextStageId: 'br-stage-book',
      },
      {
        id: 'br-bank-partial',
        label: '$24,850 — add the deposit in transit.',
        isCorrect: false,
        feedback: 'You added the deposit in transit but forgot to subtract the $4,850 of outstanding checks the bank has not paid yet.',
        scoreImpact: 10,
        nextStageId: 'br-stage-book',
      },
      {
        id: 'br-bank-wrong',
        label: '$20,650 — the bank balance needs no adjustment.',
        isCorrect: false,
        feedback: 'The bank balance is missing your deposit in transit and still includes funds for checks that have not cleared. Both are bank-side adjustments.',
        scoreImpact: 0,
        nextStageId: 'br-stage-book',
      },
    ],
    defaultNextStageId: 'br-stage-book',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant': 'Deposit in transit → ADD to the bank balance. Outstanding checks → SUBTRACT from the bank balance.',
      'audit-associate': 'Outstanding checks from a prior month that already cleared are not current reconciling items.',
    },
  },
  {
    id: 'br-stage-book',
    title: 'Adjust the Book Side',
    description:
      "Now the ledger balance of $21,300. The statement shows three items you never recorded: $260 of interest earned, a $60 service fee, and a $1,500 NSF check from customer J. Ruiz that bounced. What is the adjusted book balance?",
    documentIds: ['br-doc-bank-statement'],
    choices: [
      {
        id: 'br-book-correct',
        label: '$20,000 — add $260 interest, subtract the $60 fee and the $1,500 NSF check.',
        isCorrect: true,
        feedback: '$21,300 + $260 − $60 − $1,500 = $20,000. Both sides now meet at $20,000 — the books are reconciled.',
        scoreImpact: 25,
        nextStageId: 'br-stage-entry',
      },
      {
        id: 'br-book-partial',
        label: '$19,740 — subtract the fee and the NSF check.',
        isCorrect: false,
        feedback: 'You missed the $260 of interest the bank credited — that increases the book balance. $21,300 + $260 − $60 − $1,500 = $20,000.',
        scoreImpact: 10,
        nextStageId: 'br-stage-entry',
      },
      {
        id: 'br-book-wrong',
        label: '$20,650 — set the books equal to the bank statement.',
        isCorrect: false,
        feedback: 'Both sides should reconcile to $20,000, not to the unadjusted bank balance. Record the interest, fee, and NSF on the book side.',
        scoreImpact: 0,
        nextStageId: 'br-stage-entry',
      },
    ],
    defaultNextStageId: 'br-stage-entry',
    scoringWeight: 0.25,
    hints: {
      'junior-accountant': 'Interest earned increases cash; bank fees and bounced (NSF) checks decrease it.',
      'audit-associate': 'An NSF check reverses a deposit you thought you had — it reduces cash and re-establishes the receivable from that customer.',
    },
  },
  {
    id: 'br-stage-entry',
    title: 'Record the Entries',
    description:
      "Both sides tie at $20,000. Last step: which adjustments actually require a journal entry in the company's books?",
    documentIds: [],
    choices: [
      {
        id: 'br-entry-correct',
        label: 'Only the book-side items: interest (Dr Cash / Cr Interest Revenue $260), fee (Dr Bank Fees / Cr Cash $60), NSF (Dr Accounts Receivable / Cr Cash $1,500). No entry for the deposit in transit or outstanding checks.',
        isCorrect: true,
        feedback: 'Exactly. Only items the company had not yet recorded need entries. Bank-side timing differences clear themselves as the bank catches up.',
        scoreImpact: 25,
      },
      {
        id: 'br-entry-partial',
        label: 'Record interest, fee, and NSF — plus an entry removing the $4,850 outstanding checks from cash.',
        isCorrect: false,
        feedback: 'The outstanding checks were already recorded when written — re-removing them would double-count. No bank-side entry is needed.',
        scoreImpact: 10,
      },
      {
        id: 'br-entry-wrong',
        label: 'Record an entry for every reconciling item, including the deposit in transit and outstanding checks.',
        isCorrect: false,
        feedback: 'Deposits in transit and outstanding checks are already in the books — they are bank timing differences, not new entries.',
        scoreImpact: 0,
        triggersEventId: 'br-event-double-entry',
      },
    ],
    defaultNextStageId: undefined,
    scoringWeight: 0.25,
    hints: {
      'junior-accountant': 'Adjusting entries come ONLY from the book side of the reconciliation.',
      'audit-associate': 'If an item already hit the ledger when it occurred, the reconciliation needs no new entry for it.',
    },
  },
];
