'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerChildren } from '@/lib/motion/variants';
import { DocumentViewer } from './DocumentViewer';
import type { Stage } from '@/lib/types/case';
import type { Document } from '@/lib/types/case';
import type { RoleId } from '@/lib/types/game';

interface StagePromptProps {
  stage: Stage;
  documents: Document[];
  role: RoleId;
  seniorityLevel: 1 | 2 | 3;
}

export function StagePrompt({ stage, documents, role, seniorityLevel }: StagePromptProps) {
  const hint = stage.hints?.[role];
  const stageDocs = documents.filter((d) => stage.documentIds.includes(d.id));

  return (
    <motion.div variants={staggerChildren} initial="initial" animate="animate" className="space-y-5">
      {/* Stage description */}
      <motion.div variants={fadeUp} className="bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-4">
        <h2 className="text-lg font-bold text-indigo-900 mb-1">{stage.title}</h2>
        <p className="text-sm text-indigo-800 leading-relaxed">{stage.description}</p>
      </motion.div>

      {/* Role hint (junior + audit only) */}
      {hint && seniorityLevel < 3 && (
        <motion.div variants={fadeUp} className="flex gap-3 bg-purple-50 border border-purple-200 rounded-xl px-4 py-3">
          <span className="text-lg shrink-0">💡</span>
          <p className="text-sm text-purple-800">{hint}</p>
        </motion.div>
      )}

      {/* Documents */}
      {stageDocs.length > 0 && (
        <motion.div variants={fadeUp} className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Supporting Documents</p>
          {stageDocs.map((doc) => (
            <DocumentViewer key={doc.id} document={doc} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
