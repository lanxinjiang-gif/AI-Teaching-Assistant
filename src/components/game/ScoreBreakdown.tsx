'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerChildren } from '@/lib/motion/variants';
import type { ScoringResult } from '@/lib/types/scoring';

interface ScoreBreakdownProps {
  result: ScoringResult;
}

export function ScoreBreakdown({ result }: ScoreBreakdownProps) {
  return (
    <motion.div variants={staggerChildren} initial="initial" animate="animate" className="space-y-6">
      {/* Summary */}
      <motion.div
        variants={fadeUp}
        className={`rounded-2xl px-6 py-5 text-center ${result.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
      >
        <p className="text-5xl font-black mb-1" style={{ color: result.passed ? '#16a34a' : '#dc2626' }}>
          {result.percentage}%
        </p>
        <p className={`text-sm font-semibold ${result.passed ? 'text-green-700' : 'text-red-700'}`}>
          {result.passed ? '✅ Case Closed' : '❌ Needs Review'}
        </p>
        <p className="text-xs text-gray-500 mt-2">{result.summaryFeedback}</p>
      </motion.div>

      {/* Stage breakdown */}
      <motion.div variants={fadeUp} className="space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Stage Breakdown</p>
        {result.stageBreakdown.map((s) => (
          <div
            key={s.stageId}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm ${
              s.wasCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{s.wasCorrect ? '✅' : '❌'}</span>
              <span className="font-medium text-gray-800">{s.stageTitle}</span>
            </div>
            <span className={`font-bold tabular-nums ${s.wasCorrect ? 'text-green-700' : 'text-red-600'}`}>
              {s.earned}/{s.max}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Total */}
      <motion.div variants={fadeUp} className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
        <span className="text-sm font-semibold text-gray-600">Total Score</span>
        <span className="text-lg font-black text-gray-900 tabular-nums">
          {result.totalScore}<span className="text-gray-400 font-normal text-sm">/{result.maxScore}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
