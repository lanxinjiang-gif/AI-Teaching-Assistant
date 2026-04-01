'use client';

import { useEffect, useRef } from 'react';
import { useNotificationStore } from '@/lib/state/notificationStore';
import { useGameStore } from '@/lib/state/gameStore';
import { caseById } from '@/data/cases';

/**
 * Fires inbox notifications whenever the current stage changes.
 * Call this once at the stage page level.
 */
export function useStageNotifications(stageId: string) {
  const push = useNotificationStore((s) => s.push);
  const session = useGameStore((s) => s.session);
  const prevStageRef = useRef<string | null>(null);

  useEffect(() => {
    if (!session || stageId === prevStageRef.current) return;
    prevStageRef.current = stageId;

    const caseDef = caseById[session.caseId];
    const stage = caseDef?.stages.find((s) => s.id === stageId);
    if (!stage) return;

    const newDocs = stage.documentIds.filter(
      (docId) =>
        !caseDef.stages
          .slice(0, caseDef.stages.indexOf(stage))
          .flatMap((s) => s.documentIds)
          .includes(docId)
    );

    newDocs.forEach((docId) => {
      const doc = caseDef.documents.find((d) => d.id === docId);
      if (doc) push('document', `New document: ${doc.title}`);
    });
  }, [stageId, session, push]);
}
