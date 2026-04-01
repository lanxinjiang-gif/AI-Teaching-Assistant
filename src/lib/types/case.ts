import type { RoleId, CompanyTypeId, TopicId } from './game';

export type DocumentType =
  | 'journal-entry'
  | 'trial-balance'
  | 'policy'
  | 'memo'
  | 'contract'
  | 'report';

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  content: string; // markdown
  isRedHerring?: boolean;
  revealedByStageIds?: string[];
}

export interface ChoiceOption {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
  scoreImpact: number;
  nextStageId?: string;
  triggersEventId?: string;
}

export type EventTriggerCondition =
  | { type: 'on-stage-enter'; stageId: string }
  | { type: 'on-choice'; choiceId: string }
  | { type: 'on-score-below'; threshold: number };

export type BranchingEventType = 'finding' | 'question' | 'document-drop' | 'time-pressure';

export interface BranchingEvent {
  id: string;
  type: BranchingEventType;
  title: string;
  description: string;
  choices: ChoiceOption[];
  trigger: EventTriggerCondition;
}

export interface Stage {
  id: string;
  title: string;
  description: string;
  documentIds: string[];
  choices: ChoiceOption[];
  defaultNextStageId?: string;
  scoringWeight: number; // 0–1; all weights in a case must sum to 1
  hints?: Partial<Record<RoleId, string>>;
  roleRestriction?: RoleId;
}

export interface CaseDefinition {
  id: string;
  title: string;
  topic: TopicId;
  companyTypes: CompanyTypeId[];
  availableRoles: RoleId[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  description: string;
  estimatedMinutes: number;
  stages: Stage[];
  documents: Document[];
  events: BranchingEvent[];
  maxScore: number;
  passingScore: number; // percentage, e.g. 70
}
