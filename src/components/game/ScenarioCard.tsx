'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { DocumentViewer } from './DocumentViewer';
import { useTypewriter } from '@/lib/hooks/useTypewriter';
import type { Stage, Document } from '@/lib/types/case';
import type { Role, CompanyType } from '@/lib/types/game';

interface ScenarioCardProps {
  stage: Stage;
  documents: Document[];
  role: Role;
  company: CompanyType;
}

export function ScenarioCard({ stage, documents, role, company }: ScenarioCardProps) {
  const stageDocs = documents.filter((d) => stage.documentIds.includes(d.id));
  const { displayed, done, skip } = useTypewriter(stage.description, 22);
  const hint = stage.hints?.[role.id];
  const showHint = hint && role.seniorityLevel < 3;

  return (
    <div className="space-y-5">
      {/* ── Scene panel ──────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden select-none" style={{ height: 260 }}>
        {/* Company scene background */}
        <Image
          src={`/scenes/${company.sceneId}.svg`}
          alt={company.label}
          fill
          className="object-cover"
          priority
        />

        {/* Gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* Stage badge top-left */}
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="absolute top-3 left-4"
        >
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
            {stage.title}
          </span>
        </motion.div>

        {/* Role avatar — animated walk-in */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            y: [0, -4, 0],
          }}
          transition={{
            x: { delay: 0.25, duration: 0.5, ease: 'easeOut' },
            opacity: { delay: 0.25, duration: 0.4 },
            y: { delay: 1.2, duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute bottom-[52px] left-5 drop-shadow-2xl"
        >
          <Image
            src={`/avatars/${role.avatarId}.svg`}
            alt={role.label}
            width={80}
            height={90}
            style={{ height: 'auto' }}
            unoptimized
          />
        </motion.div>

        {/* Narrative text box — visual novel style */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.35 }}
          onClick={skip}
          className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-5 py-3 text-left w-full cursor-pointer"
          title={done ? undefined : 'Click to skip'}
        >
          <p className="text-white text-sm leading-relaxed font-medium">
            {displayed}
            {!done && (
              <span className="inline-block w-0.5 h-4 bg-white/80 animate-pulse ml-0.5 align-middle" />
            )}
          </p>
          {!done && (
            <span className="text-white/40 text-[10px] mt-1 block">tap to skip</span>
          )}
        </motion.button>
      </div>

      {/* ── Hint (junior / audit only) ─────────────────── */}
      {showHint && done && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3"
        >
          <span className="text-lg shrink-0">💡</span>
          <p className="text-sm text-amber-800">{hint}</p>
        </motion.div>
      )}

      {/* ── Documents as desk papers ──────────────────── */}
      {stageDocs.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } },
          }}
          className="space-y-2"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
            <span>📋</span> On your desk
          </p>
          {stageDocs.map((doc) => (
            <motion.div
              key={doc.id}
              variants={{
                hidden: { y: 18, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.35 } },
              }}
            >
              <DocumentViewer document={doc} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
