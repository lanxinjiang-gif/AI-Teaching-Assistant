'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { caseRegistry } from '@/data/cases';
import { useGameStore } from '@/lib/state/gameStore';
import { fadeUp, staggerChildren } from '@/lib/motion/variants';

const difficultyLabel = ['', '★', '★★', '★★★', '★★★★', '★★★★★'];
const difficultyColor = ['', 'text-green-500', 'text-green-600', 'text-yellow-500', 'text-orange-500', 'text-red-500'];

const topicBadge: Record<string, string> = {
  'month-end-close': 'bg-blue-100 text-blue-700',
  'revenue-recognition': 'bg-violet-100 text-violet-700',
  'inventory-controls': 'bg-orange-100 text-orange-700',
};

export function CasePicker() {
  const router = useRouter();
  const { selectedRole, selectedCompanyType, startCase } = useGameStore();
  const canPlay = !!selectedRole && !!selectedCompanyType;

  function handlePick(caseId: string) {
    if (!canPlay) return;
    startCase(caseId);
    router.push(`/game/${caseId}`);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Select a case</p>
      {!canPlay && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Choose a role and company above to unlock cases.
        </p>
      )}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {caseRegistry.map((c) => {
          const locked = !canPlay || c.stages.length === 0;
          return (
            <motion.button
              key={c.id}
              variants={fadeUp}
              onClick={() => handlePick(c.id)}
              disabled={locked}
              className={[
                'text-left p-4 rounded-2xl border-2 transition-all duration-200 space-y-2',
                locked ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed' : 'bg-white border-gray-200 hover:border-indigo-400 hover:bg-indigo-50',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-sm text-gray-900 leading-tight">{c.title}</p>
                {c.stages.length === 0 && (
                  <span className="text-xs bg-gray-200 text-gray-500 rounded-full px-2 py-0.5 shrink-0">Soon</span>
                )}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{c.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold ${difficultyColor[c.difficulty]}`}>
                  {difficultyLabel[c.difficulty]}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${topicBadge[c.topic] ?? 'bg-gray-100 text-gray-600'}`}>
                  {c.topic.replace(/-/g, ' ')}
                </span>
                <span className="text-xs text-gray-400">~{c.estimatedMinutes} min</span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
