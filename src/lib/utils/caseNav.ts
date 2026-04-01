import type { CaseDefinition, Stage } from '@/lib/types/case';

export function getStageById(caseDef: CaseDefinition, stageId: string): Stage | undefined {
  return caseDef.stages.find((s) => s.id === stageId);
}

export function resolveNextStageId(
  caseDef: CaseDefinition,
  stageId: string,
  choiceId: string
): string | undefined {
  const stage = getStageById(caseDef, stageId);
  if (!stage) return undefined;
  const choice = stage.choices.find((c) => c.id === choiceId);
  return choice?.nextStageId ?? stage.defaultNextStageId;
}

export function isLastStage(caseDef: CaseDefinition, stageId: string): boolean {
  const stage = getStageById(caseDef, stageId);
  if (!stage) return false;
  return !stage.defaultNextStageId && stage.choices.every((c) => !c.nextStageId);
}

export function getProgressPercent(caseDef: CaseDefinition, completedStageIds: string[]): number {
  if (caseDef.stages.length === 0) return 0;
  return Math.round((completedStageIds.length / caseDef.stages.length) * 100);
}
