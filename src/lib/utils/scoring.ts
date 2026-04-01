import type { GameSession } from '@/lib/types/game';
import type { CaseDefinition } from '@/lib/types/case';
import type { ScoringResult, StageScore } from '@/lib/types/scoring';

export function computeScore(session: GameSession, caseDef: CaseDefinition): ScoringResult {
  const stageBreakdown: StageScore[] = caseDef.stages.map((stage) => {
    const choiceMadeId = session.choicesMade[stage.id] ?? '';
    const choice = stage.choices.find((c) => c.id === choiceMadeId);
    const maxForStage = Math.round(caseDef.maxScore * stage.scoringWeight);
    const earned = choice ? Math.max(0, Math.min(maxForStage, choice.scoreImpact)) : 0;

    return {
      stageId: stage.id,
      stageTitle: stage.title,
      earned,
      max: maxForStage,
      choiceMadeId,
      wasCorrect: choice?.isCorrect ?? false,
    };
  });

  const totalScore = stageBreakdown.reduce((sum, s) => sum + s.earned, 0);
  const percentage = Math.round((totalScore / caseDef.maxScore) * 100);
  const passed = percentage >= caseDef.passingScore;

  const summaryFeedback = passed
    ? 'Great work — the books are closed and your adjustments were accurate.'
    : 'The close had some issues. Review the stage breakdown to see where adjustments were missed.';

  return { totalScore, maxScore: caseDef.maxScore, percentage, passed, stageBreakdown, summaryFeedback };
}
