import type { Role } from '@/lib/types/game';

export const roles: Role[] = [
  {
    id: 'junior-accountant',
    label: 'Junior Accountant',
    description: 'First year in the trenches. You get plenty of hints but every mistake counts.',
    seniorityLevel: 1,
    avatarId: 'junior-accountant',
    colorTheme: 'indigo',
  },
  {
    id: 'audit-associate',
    label: 'Audit Associate',
    description: 'You verify, question, and find what others miss. Moderate hints available.',
    seniorityLevel: 2,
    avatarId: 'audit-associate',
    colorTheme: 'emerald',
  },
  {
    id: 'controller',
    label: 'Controller',
    description: 'You own the books. No hints — just instinct and expertise.',
    seniorityLevel: 3,
    avatarId: 'controller',
    colorTheme: 'violet',
  },
];

export const roleById = Object.fromEntries(roles.map((r) => [r.id, r])) as Record<
  Role['id'],
  Role
>;
