'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CompanyPanel } from '@/components/immersion/CompanyPanel';
import { useNotificationStore } from '@/lib/state/notificationStore';
import type { Role, CompanyType } from '@/lib/types/game';

interface CaseHeaderProps {
  role: Role;
  company: CompanyType;
  caseTitle: string;
  progressPercent: number;
  score: number;
  maxScore: number;
}

export function CaseHeader({ role, company, caseTitle, progressPercent, score, maxScore }: CaseHeaderProps) {
  const unreadCount = useNotificationStore((s) => s.unreadCount());

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <CompanyPanel company={company} role={role} />

        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide truncate">{caseTitle}</p>
          <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Score */}
          <div className="text-right">
            <p className="text-xs text-gray-400">Score</p>
            <p className="text-sm font-bold text-gray-800">{score}<span className="text-gray-400 font-normal">/{maxScore}</span></p>
          </div>

          {/* Inbox bell */}
          <div className="relative">
            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
              <span className="text-base">📬</span>
            </button>
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1"
                >
                  {unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
