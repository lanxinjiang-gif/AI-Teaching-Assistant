import type { CaseDefinition } from '@/lib/types/case';
import { stages } from './stages';
import { documents } from './documents';
import { events } from './events';

export const inventoryControlsCase: CaseDefinition = {
  id: 'inventory-controls',
  title: 'Inventory Controls: The Missing Count',
  topic: 'inventory-controls',
  companyTypes: ['retail', 'manufacturing'],
  availableRoles: ['junior-accountant', 'audit-associate', 'controller'],
  difficulty: 3,
  description:
    'The year-end physical count is $12,000 short of the books. Decompose the variance: reverse a FOB-destination shipment booked too early, write off the true shrinkage, then apply lower of cost or net realizable value to obsolete stock — and do not get fooled by a next-quarter purchase order.',
  estimatedMinutes: 25,
  stages,
  documents,
  events,
  maxScore: 100,
  passingScore: 70,
};
