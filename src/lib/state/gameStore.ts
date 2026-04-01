'use client';

import { create } from 'zustand';
import type { RoleId, CompanyTypeId, GameSession } from '@/lib/types/game';
import type { ScoringResult } from '@/lib/types/scoring';
import { caseById } from '@/data/cases';
import { computeScore } from '@/lib/utils/scoring';
import { storage } from '@/lib/utils/storage';

interface GameStore {
  selectedRole: RoleId | null;
  selectedCompanyType: CompanyTypeId | null;
  session: GameSession | null;

  setRole: (role: RoleId) => void;
  setCompanyType: (type: CompanyTypeId) => void;
  startCase: (caseId: string) => void;
  makeChoice: (stageId: string, choiceId: string) => void;
  resolveEvent: (eventId: string, choiceId: string) => void;
  completeCase: () => ScoringResult | null;
  resetSession: () => void;
  hydrate: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  selectedRole: null,
  selectedCompanyType: null,
  session: null,

  setRole: (role) => set({ selectedRole: role }),
  setCompanyType: (type) => set({ selectedCompanyType: type }),

  startCase: (caseId) => {
    const { selectedRole, selectedCompanyType } = get();
    if (!selectedRole || !selectedCompanyType) return;

    const caseDef = caseById[caseId];
    if (!caseDef || caseDef.stages.length === 0) return;

    const session: GameSession = {
      sessionId: crypto.randomUUID(),
      caseId,
      role: selectedRole,
      companyType: selectedCompanyType,
      startedAt: new Date().toISOString(),
      currentStageId: caseDef.stages[0].id,
      completedStageIds: [],
      choicesMade: {},
      eventsTriggered: [],
      score: 0,
      maxScore: caseDef.maxScore,
    };

    storage.saveSession(session);
    set({ session });
  },

  makeChoice: (stageId, choiceId) => {
    const { session } = get();
    if (!session) return;

    const caseDef = caseById[session.caseId];
    const stage = caseDef?.stages.find((s) => s.id === stageId);
    const choice = stage?.choices.find((c) => c.id === choiceId);
    if (!stage || !choice) return;

    const nextStageId = choice.nextStageId ?? stage.defaultNextStageId;
    const updatedSession: GameSession = {
      ...session,
      choicesMade: { ...session.choicesMade, [stageId]: choiceId },
      completedStageIds: [...session.completedStageIds, stageId],
      currentStageId: nextStageId ?? session.currentStageId,
      score: session.score + Math.max(0, choice.scoreImpact),
    };

    storage.saveSession(updatedSession);
    set({ session: updatedSession });
  },

  resolveEvent: (eventId, choiceId) => {
    const { session } = get();
    if (!session) return;

    const caseDef = caseById[session.caseId];
    const event = caseDef?.events.find((e) => e.id === eventId);
    const choice = event?.choices.find((c) => c.id === choiceId);
    if (!event || !choice) return;

    const updatedSession: GameSession = {
      ...session,
      eventsTriggered: [...session.eventsTriggered, eventId],
      score: Math.max(0, session.score + choice.scoreImpact),
    };

    storage.saveSession(updatedSession);
    set({ session: updatedSession });
  },

  completeCase: () => {
    const { session } = get();
    if (!session) return null;

    const caseDef = caseById[session.caseId];
    if (!caseDef) return null;

    const result = computeScore(session, caseDef);
    const updatedSession: GameSession = {
      ...session,
      completedAt: new Date().toISOString(),
    };

    storage.saveSession(updatedSession);
    set({ session: updatedSession });
    return result;
  },

  resetSession: () => {
    storage.clearSession();
    set({ session: null });
  },

  hydrate: () => {
    const saved = storage.loadSession();
    if (saved) set({ session: saved });
  },
}));
