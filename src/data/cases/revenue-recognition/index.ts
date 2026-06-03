import type { CaseDefinition } from '@/lib/types/case';
import { stages } from './stages';
import { documents } from './documents';
import { events } from './events';

export const revenueRecognitionCase: CaseDefinition = {
  id: 'revenue-recognition',
  title: 'Revenue Recognition: The Multi-Element Deal',
  topic: 'revenue-recognition',
  companyTypes: ['saas', 'high-tech'],
  availableRoles: ['junior-accountant', 'audit-associate', 'controller'],
  difficulty: 3,
  description:
    'A $120,000 SaaS contract bundles a subscription, implementation, and support into one price. Walk the ASC 606 five-step model: separate the promises, allocate the price, recognize revenue as it is earned, and handle a mid-term change order — without pulling revenue forward.',
  estimatedMinutes: 25,
  stages,
  documents,
  events,
  maxScore: 100,
  passingScore: 70,
};
