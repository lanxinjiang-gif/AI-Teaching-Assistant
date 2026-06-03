'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SceneIllustration } from '@/components/immersion/SceneIllustration';
import { RoleAvatar } from '@/components/immersion/RoleAvatar';
import { useGameStore } from '@/lib/state/gameStore';
import { caseById } from '@/data/cases';
import { roleById } from '@/data/roles';
import { companyById } from '@/data/companies';
import { fadeUp } from '@/lib/motion/variants';
import { asset } from '@/lib/basePath';

const difficultyLabel = ['', '★', '★★', '★★★', '★★★★', '★★★★★'];

export default function CaseIntroClient() {
  const { caseId } = useParams<{ caseId: string }>();
  const router = useRouter();
  const session = useGameStore((s) => s.session);

  const caseDef = caseById[caseId];
  const role = session ? roleById[session.role] : null;
  const company = session ? companyById[session.companyType] : null;

  if (!caseDef || !session || !role || !company) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        <p>Session not found. <a href={asset('/')} className="text-indigo-500 underline">Go home</a></p>
      </div>
    );
  }

  function handleStart() {
    router.push(`/game/${caseId}/${caseDef.stages[0].id}`);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <SceneIllustration sceneId={company.sceneId} className="w-full h-48" />

      <motion.div variants={fadeUp} initial="initial" animate="animate" className="space-y-4">
        <div className="flex items-center gap-3">
          <RoleAvatar roleId={role.id} size={48} className="rounded-full shadow" />
          <div>
            <p className="text-xs text-gray-400">{role.label} at {company.label}</p>
            <h1 className="text-xl font-black text-gray-900">{caseDef.title}</h1>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">{caseDef.description}</p>

        <div className="flex flex-wrap gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
            {difficultyLabel[caseDef.difficulty]} Difficulty {caseDef.difficulty}/5
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
            ~{caseDef.estimatedMinutes} min
          </span>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
            Pass at {caseDef.passingScore}%
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">
            {caseDef.stages.length} stages
          </span>
        </div>

        <button
          onClick={handleStart}
          className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors shadow-md"
        >
          Start Case →
        </button>
      </motion.div>
    </main>
  );
}
