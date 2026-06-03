import type { CaseDefinition } from '@/lib/types/case';
import { monthEndCloseCase } from './month-end-close';
import { revenueRecognitionCase } from './revenue-recognition';
import { inventoryControlsCase } from './inventory-controls';
import { bankReconciliationCase } from './bank-reconciliation';
import { receivablesAllowanceCase } from './receivables-allowance';

export const caseRegistry: CaseDefinition[] = [
  monthEndCloseCase,
  revenueRecognitionCase,
  inventoryControlsCase,
  bankReconciliationCase,
  receivablesAllowanceCase,
];

export const caseById = Object.fromEntries(
  caseRegistry.map((c) => [c.id, c])
) as Record<string, CaseDefinition>;
