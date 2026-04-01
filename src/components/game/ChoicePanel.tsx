'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { popIn, staggerChildren, fadeUp } from '@/lib/motion/variants';
import type { ChoiceOption } from '@/lib/types/case';

interface ChoicePanelProps {
  choices: ChoiceOption[];
  onChoice: (choiceId: string) => void;
  disabled?: boolean;
}

export function ChoicePanel({ choices, onChoice, disabled = false }: ChoicePanelProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = selected ? choices.find((c) => c.id === selected) : null;

  function handleSelect(choiceId: string) {
    if (disabled || selected) return;
    setSelected(choiceId);
    onChoice(choiceId);
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Your Decision</p>

      <motion.div variants={staggerChildren} initial="initial" animate="animate" className="space-y-3">
        {choices.map((choice) => {
          const isChosen = selected === choice.id;
          const isOther = selected && !isChosen;

          return (
            <motion.button
              key={choice.id}
              variants={fadeUp}
              onClick={() => handleSelect(choice.id)}
              disabled={!!selected || disabled}
              className={[
                'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200',
                !selected && 'hover:border-indigo-400 hover:bg-indigo-50 border-gray-200 bg-white',
                isChosen && choice.isCorrect && 'border-green-400 bg-green-50 text-green-800',
                isChosen && !choice.isCorrect && 'border-red-400 bg-red-50 text-red-800',
                isOther && 'border-gray-100 bg-gray-50 text-gray-400 opacity-50',
                !selected && 'border-gray-200 bg-white text-gray-800',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="mr-2">{isChosen ? (choice.isCorrect ? '✅' : '❌') : '○'}</span>
              {choice.label}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Feedback card */}
      <AnimatePresence>
        {chosen && (
          <motion.div
            variants={popIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`rounded-xl px-4 py-3 border-l-4 text-sm ${
              chosen.isCorrect
                ? 'bg-green-50 border-green-400 text-green-800'
                : 'bg-red-50 border-red-400 text-red-800'
            }`}
          >
            <p className="font-semibold mb-0.5">{chosen.isCorrect ? 'Correct!' : 'Not quite.'}</p>
            <p>{chosen.feedback}</p>
            {chosen.scoreImpact !== 0 && (
              <p className="mt-1 text-xs font-bold">
                {chosen.scoreImpact > 0 ? `+${chosen.scoreImpact}` : chosen.scoreImpact} pts
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
