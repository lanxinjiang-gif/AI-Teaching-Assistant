import type { CaseDefinition } from '@/lib/types/case';
import { monthEndCloseCase } from './month-end-close';
import { revenueRecognitionCase } from './revenue-recognition';
import { inventoryControlsCase } from './inventory-controls';

export const caseRegistry: CaseDefinition[] = [
  monthEndCloseCase,
  revenueRecognitionCase,
  inventoryControlsCase,
];

export const caseById = Object.fromEntries(
  caseRegistry.map((c) => [c.id, c])
) as Record<string, CaseDefinition>;
