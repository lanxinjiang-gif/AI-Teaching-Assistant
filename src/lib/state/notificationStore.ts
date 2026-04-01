'use client';

import { create } from 'zustand';
import type { InboxNotification, NotificationType } from '@/lib/types/game';

interface NotificationStore {
  notifications: InboxNotification[];
  push: (type: NotificationType, title: string, body?: string) => void;
  markRead: (id: string) => void;
  dismiss: (id: string) => void;
  clearAll: () => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],

  push: (type, title, body) => {
    const notification: InboxNotification = {
      id: crypto.randomUUID(),
      type,
      title,
      body,
      timestamp: Date.now(),
      read: false,
    };
    set((state) => ({ notifications: [notification, ...state.notifications] }));
  },

  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  dismiss: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearAll: () => set({ notifications: [] }),

  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
