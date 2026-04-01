'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '@/lib/state/notificationStore';
import { toastSlideIn } from '@/lib/motion/variants';
import type { InboxNotification as INotif } from '@/lib/types/game';

const typeIcon: Record<INotif['type'], string> = {
  document: '📄',
  event: '⚡',
  hint: '💡',
  'stage-complete': '✅',
};

const typeBorder: Record<INotif['type'], string> = {
  document: 'border-blue-300',
  event: 'border-yellow-300',
  hint: 'border-purple-300',
  'stage-complete': 'border-green-300',
};

function Toast({ notification }: { notification: INotif }) {
  const { dismiss, markRead } = useNotificationStore();

  useEffect(() => {
    markRead(notification.id);
    const timer = setTimeout(() => dismiss(notification.id), 4000);
    return () => clearTimeout(timer);
  }, [notification.id, dismiss, markRead]);

  return (
    <motion.div
      key={notification.id}
      variants={toastSlideIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`flex items-start gap-3 bg-white shadow-lg rounded-xl px-4 py-3 border-l-4 max-w-xs w-full ${typeBorder[notification.type]}`}
      onClick={() => dismiss(notification.id)}
    >
      <span className="text-lg">{typeIcon[notification.type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{notification.title}</p>
        {notification.body && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notification.body}</p>
        )}
      </div>
      <button
        onClick={() => dismiss(notification.id)}
        className="text-gray-300 hover:text-gray-500 text-xs ml-1 shrink-0"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </motion.div>
  );
}

export function InboxNotificationStack() {
  const notifications = useNotificationStore((s) => s.notifications);
  const visible = notifications.filter((n) => !n.read || Date.now() - n.timestamp < 4000).slice(0, 4);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end pointer-events-none">
      <AnimatePresence mode="popLayout">
        {visible.map((n) => (
          <div key={n.id} className="pointer-events-auto">
            <Toast notification={n} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
