'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseHeader } from '@/components/game/CaseHeader';
import { ScenarioCard } from '@/components/game/ScenarioCard';
import { EventOverlay } from '@/components/game/EventOverlay';
import { StageTransition } from '@/components/immersion/StageTransition';
import { useGame } from '@/lib/hooks/useGame';
import { useStageNotifications } from '@/lib/hooks/useNotifications';
import { getProgressPercent, isLastStage } from '@/lib/utils/caseNav';

export default function StagePage() {
  const { caseId, stageId } = useParams<{ caseId: string; stageId: string }>();
  const router = useRouter();
  const { session, caseDef, role, company, currentStage, pendingEvent, makeChoice, resolveEvent, completeCase } = useGame();
  const [choiceMade, setChoiceMade] = useState(false);

  useStageNotifications(stageId);

  useEffect(() => {
    setChoiceMade(false);
  }, [stageId]);

  if (!session || !caseDef || !role || !company || !currentStage) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        <p>Session not found. <a href="/" className="text-indigo-500 underline">Go home</a></p>
      </div>
    );
  }

  const progress = getProgressPercent(caseDef, session.completedStageIds);
  const isLast = isLastStage(caseDef, stageId);

  function handleChoice(choiceId: string) {
    makeChoice(stageId, choiceId);
    setChoiceMade(true);
  }

  function handleAdvance() {
    if (isLast) {
      const result = completeCase();
      if (result) router.push(`/results/${session!.sessionId}`);
    } else {
      router.push(`/game/${caseId}/${session!.currentStageId}`);
    }
  }

  return (
    <>
      <CaseHeader
        role={role}
        company={company}
        caseTitle={caseDef.title}
        progressPercent={progress}
        score={session.score}
        maxScore={session.maxScore}
      />

      <main className="max-w-2xl mx-auto px-4 py-6 pb-12 space-y-5">
        <StageTransition stageId={stageId}>
          <div className="space-y-5">
            {/* Immersive scene + choices, all inside one panel */}
            <ScenarioCard
              stage={currentStage}
              documents={caseDef.documents}
              role={role}
              company={company}
              choices={currentStage.choices}
              onChoice={handleChoice}
              choiceMade={choiceMade}
            />

            {/* Advance button */}
            <AnimatePresence>
              {choiceMade && (
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  onClick={handleAdvance}
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm transition-colors shadow-md"
                >
                  {isLast ? 'Complete Case →' : 'Next Stage →'}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </StageTransition>
      </main>

      <EventOverlay event={pendingEvent ?? null} onResolve={resolveEvent} />
    </>
  );
}
