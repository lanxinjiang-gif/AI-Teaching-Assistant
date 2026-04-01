import type { GameSession } from '@/lib/types/game';

const SESSION_KEY = 'acg-session';

export const storage = {
  saveSession(session: GameSession): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },
  loadSession(): GameSession | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as GameSession) : null;
    } catch {
      return null;
    }
  },
  clearSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_KEY);
  },
};
