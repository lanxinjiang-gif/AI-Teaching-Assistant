'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { slideUp } from '@/lib/motion/variants';
import type { BranchingEvent } from '@/lib/types/case';

const typeIcon: Record<BranchingEvent['type'], string> = {
  finding: '🔍',
  question: '💬',
  'document-drop': '📎',
  'time-pressure': '⏰',
};

interface EventOverlayProps {
  event: BranchingEvent | null;
  onResolve: (eventId: string, choiceId: string) => void;
}

export function EventOverlay({ event, onResolve }: EventOverlayProps) {
  return (
    <AnimatePresence>
      {event && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div
              key="modal"
              variants={slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header stripe */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-5 py-3 flex items-center gap-2">
                <span className="text-xl">{typeIcon[event.type]}</span>
                <span className="text-sm font-bold text-white tracking-wide uppercase">{event.type.replace('-', ' ')}</span>
              </div>

              <div className="px-5 py-4 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{event.description}</p>
                </div>

                <div className="space-y-2">
                  {event.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => onResolve(event.id, choice.id)}
                      className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-sm font-medium text-gray-800 hover:border-orange-300 hover:bg-orange-50 transition-all duration-150"
                    >
                      {choice.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
