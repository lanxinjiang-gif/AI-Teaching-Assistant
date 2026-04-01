'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ScoreBreakdown } from '@/components/game/ScoreBreakdown';
import { RoleAvatar } from '@/components/immersion/RoleAvatar';
import { useGameStore } from '@/lib/state/gameStore';
import { caseById } from '@/data/cases';
import { roleById } from '@/data/roles';
import { companyById } from '@/data/companies';
import { computeScore } from '@/lib/utils/scoring';
import { fadeUp } from '@/lib/motion/variants';

export default function ResultsPage() {
  const router = useRouter();
  const { session, resetSession } = useGameStore();

  const caseDef = session ? caseById[session.caseId] : null;
  const role = session ? roleById[session.role] : null;
  const company = session ? companyById[session.companyType] : null;

  const result = useMemo(() => {
    if (!session || !caseDef) return null;
    return computeScore(session, caseDef);
  }, [session, caseDef]);

  if (!session || !caseDef || !role || !company || !result) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        <p>No results found. <a href="/" className="text-indigo-500 underline">Go home</a></p>
      </div>
    );
  }

  function handleRetry() {
    resetSession();
    router.push('/');
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="flex items-center gap-3">
        <RoleAvatar roleId={role.id} size={52} className="rounded-full shadow" />
        <div>
          <p className="text-xs text-gray-400">{role.label} · {company.label}</p>
          <h1 className="text-xl font-black text-gray-900">{caseDef.title}</h1>
          <p className="text-xs text-gray-400">Results</p>
        </div>
      </motion.div>

      <ScoreBreakdown result={result} />

      <motion.div variants={fadeUp} initial="initial" animate="animate" className="flex gap-3">
        <button
          onClick={handleRetry}
          className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors"
        >
          Play Again
        </button>
        <button
          onClick={() => router.push('/')}
          className="flex-1 py-3 rounded-2xl border-2 border-gray-200 hover:border-gray-300 bg-white text-gray-700 font-bold text-sm transition-colors"
        >
          Home
        </button>
      </motion.div>
    </main>
  );
}
