'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChoiceOption } from '@/lib/types/case';

const LETTERS = ['A', 'B', 'C', 'D'];

interface ActionChoicesProps {
  choices: ChoiceOption[];
  onChoice: (choiceId: string) => void;
  disabled?: boolean;
}

export function ActionChoices({ choices, onChoice, disabled = false }: ActionChoicesProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = selected ? choices.find((c) => c.id === selected) : null;

  function handleSelect(choiceId: string) {
    if (disabled || selected) return;
    setSelected(choiceId);
    onChoice(choiceId);
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        What do you do?
      </p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }}
        className="space-y-2"
      >
        {choices.map((choice, i) => {
          const isChosen = selected === choice.id;
          const isOther = !!selected && !isChosen;

          return (
            <motion.button
              key={choice.id}
              variants={{ hidden: { x: 24, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
              onClick={() => handleSelect(choice.id)}
              disabled={!!selected || disabled}
              whileHover={!selected ? { scale: 1.01, x: 2 } : {}}
              whileTap={!selected ? { scale: 0.98 } : {}}
              className={[
                'w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors duration-150',
                !selected
                  ? 'border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer'
                  : '',
                isChosen && choice.isCorrect
                  ? 'border-green-400 bg-green-50'
                  : '',
                isChosen && !choice.isCorrect
                  ? 'border-red-400 bg-red-50'
                  : '',
                isOther ? 'border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {/* Letter badge */}
              <span
                className={[
                  'shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5',
                  !selected ? 'bg-gray-100 text-gray-500' : '',
                  isChosen && choice.isCorrect ? 'bg-green-500 text-white' : '',
                  isChosen && !choice.isCorrect ? 'bg-red-400 text-white' : '',
                  isOther ? 'bg-gray-200 text-gray-400' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {isChosen ? (choice.isCorrect ? '✓' : '✗') : LETTERS[i]}
              </span>

              {/* Choice text */}
              <span
                className={
                  isChosen && choice.isCorrect
                    ? 'text-green-800'
                    : isChosen
                    ? 'text-red-800'
                    : isOther
                    ? 'text-gray-400'
                    : 'text-gray-800'
                }
              >
                {choice.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Feedback */}
      <AnimatePresence>
        {chosen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`flex gap-3 rounded-xl px-4 py-3 border-l-4 text-sm ${
              chosen.isCorrect
                ? 'bg-green-50 border-green-400'
                : 'bg-amber-50 border-amber-400'
            }`}
          >
            <span className="text-xl shrink-0">{chosen.isCorrect ? '✅' : '💭'}</span>
            <div>
              <p
                className={`font-bold mb-0.5 ${
                  chosen.isCorrect ? 'text-green-800' : 'text-amber-800'
                }`}
              >
                {chosen.isCorrect ? 'Good call.' : 'Not quite.'}
              </p>
              <p
                className={
                  chosen.isCorrect ? 'text-green-700 text-sm' : 'text-amber-700 text-sm'
                }
              >
                {chosen.feedback}
              </p>
              {chosen.scoreImpact !== 0 && (
                <p className="mt-1.5 text-xs font-bold text-gray-400 tabular-nums">
                  {chosen.scoreImpact > 0 ? `+${chosen.scoreImpact}` : chosen.scoreImpact} pts
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
