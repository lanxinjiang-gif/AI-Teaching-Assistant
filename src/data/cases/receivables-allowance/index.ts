import type { CaseDefinition } from '@/lib/types/case';
import { stages } from './stages';
import { documents } from './documents';
import { events } from './events';

export const receivablesAllowanceCase: CaseDefinition = {
  id: 'receivables-allowance',
  title: 'Receivables: Estimating the Allowance',
  topic: 'receivables-allowance',
  companyTypes: ['retail', 'saas', 'manufacturing', 'high-tech'],
  availableRoles: ['junior-accountant', 'audit-associate', 'controller'],
  difficulty: 3,
  description:
    'Year-end receivables. Size the allowance with the aging method, adjust it to target without double-counting the existing balance, write off a bankrupt customer correctly — and hold the line when the CFO wants a friendlier number.',
  estimatedMinutes: 18,
  stages,
  documents,
  events,
  maxScore: 100,
  passingScore: 70,
};
