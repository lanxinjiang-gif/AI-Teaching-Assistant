'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { DocumentViewer } from './DocumentViewer';
import { useTypewriter } from '@/lib/hooks/useTypewriter';
import type { Stage, Document, ChoiceOption } from '@/lib/types/case';
import type { Role, CompanyType } from '@/lib/types/game';

const LETTERS = ['A', 'B', 'C', 'D'];

interface ScenarioCardProps {
  stage: Stage;
  documents: Document[];
  role: Role;
  company: CompanyType;
  choices: ChoiceOption[];
  onChoice: (choiceId: string) => void;
  choiceMade: boolean;
}

export function ScenarioCard({ stage, documents, role, company, choices, onChoice, choiceMade }: ScenarioCardProps) {
  const stageDocs = documents.filter((d) => stage.documentIds.includes(d.id));
  const { displayed, done, skip } = useTypewriter(stage.description, 22);
  const hint = stage.hints?.[role.id];
  const showHint = hint && role.seniorityLevel < 3;
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = selected ? choices.find((c) => c.id === selected) : null;

  function handleSelect(choiceId: string) {
    if (selected || choiceMade) return;
    setSelected(choiceId);
    onChoice(choiceId);
  }

  return (
    <div className="space-y-5">
      {/* ── Unified scene panel ──────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden select-none">

        {/* Full-bleed scene background (SVG, no optimizer needed) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/scenes/${company.sceneId}.svg`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient: light at top, very dark towards choices at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-black/90" />

        {/* Content layer */}
        <div className="relative">

          {/* ── Avatar + stage area ─────────────────────── */}
          <div className="relative h-44">
            {/* Stage badge */}
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="absolute top-3 left-4 z-10"
            >
              <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                {stage.title}
              </span>
            </motion.div>

            {/* Role avatar */}
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -4, 0] }}
              transition={{
                x: { delay: 0.25, duration: 0.5, ease: 'easeOut' },
                opacity: { delay: 0.25, duration: 0.4 },
                y: { delay: 1.2, duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute bottom-0 left-5 drop-shadow-2xl"
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
          </div>

          {/* ── Narrative text ───────────────────────────── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.35 }}
            onClick={skip}
            className="w-full text-left bg-black/65 backdrop-blur-sm px-5 py-3 cursor-pointer border-t border-white/10"
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

          {/* ── Choices ──────────────────────────────────── */}
          <div className="bg-black/75 px-4 pt-3 pb-4 space-y-2 border-t border-white/10">
            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-2">
              What do you do?
            </p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              className="space-y-2"
            >
              {choices.map((choice, i) => {
                const isChosen = selected === choice.id;
                const isOther = !!selected && !isChosen;

                return (
                  <motion.button
                    key={choice.id}
                    variants={{ hidden: { x: 20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                    onClick={() => handleSelect(choice.id)}
                    disabled={!!selected}
                    whileHover={!selected ? { x: 3 } : {}}
                    whileTap={!selected ? { scale: 0.98 } : {}}
                    className={[
                      'w-full text-left flex items-start gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150',
                      !selected ? 'border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 cursor-pointer text-white' : '',
                      isChosen && choice.isCorrect ? 'border-green-400/70 bg-green-500/25 text-green-100' : '',
                      isChosen && !choice.isCorrect ? 'border-red-400/70 bg-red-500/20 text-red-100' : '',
                      isOther ? 'border-white/8 bg-white/5 text-white/30 cursor-not-allowed' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <span className={[
                      'shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5',
                      !selected ? 'bg-white/20 text-white' : '',
                      isChosen && choice.isCorrect ? 'bg-green-400 text-white' : '',
                      isChosen && !choice.isCorrect ? 'bg-red-400 text-white' : '',
                      isOther ? 'bg-white/10 text-white/30' : '',
                    ].filter(Boolean).join(' ')}>
                      {isChosen ? (choice.isCorrect ? '✓' : '✗') : LETTERS[i]}
                    </span>
                    <span>{choice.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Inline feedback */}
            <AnimatePresence>
              {chosen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className={`flex gap-3 rounded-xl px-4 py-3 mt-2 border-l-4 text-sm ${
                    chosen.isCorrect
                      ? 'bg-green-900/50 border-green-400'
                      : 'bg-amber-900/40 border-amber-400'
                  }`}
                >
                  <span className="text-xl shrink-0">{chosen.isCorrect ? '✅' : '💭'}</span>
                  <div>
                    <p className={`font-bold mb-0.5 ${chosen.isCorrect ? 'text-green-300' : 'text-amber-300'}`}>
                      {chosen.isCorrect ? 'Good call.' : 'Not quite.'}
                    </p>
                    <p className={chosen.isCorrect ? 'text-green-200 text-sm' : 'text-amber-200 text-sm'}>
                      {chosen.feedback}
                    </p>
                    {chosen.scoreImpact !== 0 && (
                      <p className="mt-1.5 text-xs font-bold text-white/40 tabular-nums">
                        {chosen.scoreImpact > 0 ? `+${chosen.scoreImpact}` : chosen.scoreImpact} pts
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── Hint ─────────────────────────────────────────── */}
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

      {/* ── Documents ────────────────────────────────────── */}
      {stageDocs.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
          className="space-y-2"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
            <span>📋</span> On your desk
          </p>
          {stageDocs.map((doc) => (
            <motion.div
              key={doc.id}
              variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.35 } } }}
            >
              <DocumentViewer document={doc} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
