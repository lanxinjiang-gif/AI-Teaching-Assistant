export interface StageScore {
  stageId: string;
  stageTitle: string;
  earned: number;
  max: number;
  choiceMadeId: string;
  wasCorrect: boolean;
}

export interface ScoringResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  stageBreakdown: StageScore[];
  summaryFeedback: string;
}
