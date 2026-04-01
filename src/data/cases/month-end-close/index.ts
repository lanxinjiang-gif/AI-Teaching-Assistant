import type { CaseDefinition } from '@/lib/types/case';
import { stages } from './stages';
import { documents } from './documents';
import { events } from './events';

export const monthEndCloseCase: CaseDefinition = {
  id: 'month-end-close',
  title: 'Month-End Close: Missing Accruals',
  topic: 'month-end-close',
  companyTypes: ['retail', 'saas', 'manufacturing', 'high-tech'],
  availableRoles: ['junior-accountant', 'audit-associate', 'controller'],
  difficulty: 2,
  description:
    'It\'s November 30. The books need to close by end of day. Four adjustments are lurking in the trial balance — find them, record them correctly, and close the month without a restatement.',
  estimatedMinutes: 20,
  stages,
  documents,
  events,
  maxScore: 100,
  passingScore: 70,
};
