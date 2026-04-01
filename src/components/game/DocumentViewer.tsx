'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { fadeUp } from '@/lib/motion/variants';
import type { Document } from '@/lib/types/case';

const typeLabel: Record<Document['type'], string> = {
  'journal-entry': 'Journal Entry',
  'trial-balance': 'Trial Balance',
  policy: 'Policy',
  memo: 'Memo',
  contract: 'Contract',
  report: 'Report',
};

const typeBadge: Record<Document['type'], string> = {
  'journal-entry': 'bg-blue-100 text-blue-700',
  'trial-balance': 'bg-slate-100 text-slate-700',
  policy: 'bg-orange-100 text-orange-700',
  memo: 'bg-yellow-100 text-yellow-800',
  contract: 'bg-green-100 text-green-700',
  report: 'bg-purple-100 text-purple-700',
};

interface DocumentViewerProps {
  document: Document;
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">📄</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">{document.title}</p>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeBadge[document.type]}`}>
              {typeLabel[document.type]}
            </span>
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 text-sm"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="px-4 pb-4 prose prose-sm max-w-none text-gray-700 border-t border-gray-100"
          >
            <ReactMarkdown>{document.content}</ReactMarkdown>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
