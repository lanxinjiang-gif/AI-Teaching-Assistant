'use client';

import { useGameStore } from '@/lib/state/gameStore';
import { caseById } from '@/data/cases';
import { roleById } from '@/data/roles';
import { companyById } from '@/data/companies';

export function useGame() {
  const store = useGameStore();
  const session = store.session;

  const caseDef = session ? caseById[session.caseId] : null;
  const role = session ? roleById[session.role] : null;
  const company = session ? companyById[session.companyType] : null;

  const currentStage = caseDef && session
    ? caseDef.stages.find((s) => s.id === session.currentStageId) ?? null
    : null;

  const pendingEvent = caseDef && session
    ? caseDef.events.find(
        (e) =>
          !session.eventsTriggered.includes(e.id) &&
          e.trigger.type === 'on-stage-enter' &&
          e.trigger.stageId === session.currentStageId
      ) ?? null
    : null;

  return {
    ...store,
    session,
    caseDef,
    role,
    company,
    currentStage,
    pendingEvent,
  };
}
