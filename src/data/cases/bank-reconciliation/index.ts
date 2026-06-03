import type { CaseDefinition } from '@/lib/types/case';
import { stages } from './stages';
import { documents } from './documents';
import { events } from './events';

export const bankReconciliationCase: CaseDefinition = {
  id: 'bank-reconciliation',
  title: 'Bank Reconciliation: The Statement Won\'t Tie',
  topic: 'bank-reconciliation',
  companyTypes: ['retail', 'saas', 'manufacturing', 'high-tech'],
  availableRoles: ['junior-accountant', 'audit-associate', 'controller'],
  difficulty: 2,
  description:
    'The cash ledger says $21,300; the bank says $20,650. Sort the reconciling items onto the right side, prove both balances meet at true cash, and record only the entries that belong on the books.',
  estimatedMinutes: 15,
  stages,
  documents,
  events,
  maxScore: 100,
  passingScore: 70,
};
