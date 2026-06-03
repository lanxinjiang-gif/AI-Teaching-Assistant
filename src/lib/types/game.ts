export type RoleId = 'junior-accountant' | 'audit-associate' | 'controller';
export type CompanyTypeId = 'retail' | 'saas' | 'manufacturing' | 'high-tech';
export type TopicId =
  | 'month-end-close'
  | 'revenue-recognition'
  | 'inventory-controls'
  | 'bank-reconciliation'
  | 'receivables-allowance';

export interface Role {
  id: RoleId;
  label: string;
  description: string;
  seniorityLevel: 1 | 2 | 3;
  avatarId: string;
  colorTheme: string; // Tailwind color name, e.g. 'indigo'
}

export interface CompanyType {
  id: CompanyTypeId;
  label: string;
  description: string;
  sceneId: string;
  accentColor: string; // Tailwind color name, e.g. 'amber'
  contextualModifiers: Partial<Record<TopicId, string>>;
}

export type NotificationType = 'document' | 'event' | 'hint' | 'stage-complete';

export interface InboxNotification {
  id: string;
  type: NotificationType;
  title: string;
  body?: string;
  timestamp: number;
  read: boolean;
}

export interface GameSession {
  sessionId: string;
  caseId: string;
  role: RoleId;
  companyType: CompanyTypeId;
  startedAt: string;
  completedAt?: string;
  currentStageId: string;
  completedStageIds: string[];
  choicesMade: Record<string, string>; // stageId -> choiceId
  eventsTriggered: string[];
  score: number;
  maxScore: number;
}
