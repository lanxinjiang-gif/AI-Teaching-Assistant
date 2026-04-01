'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { pageSlide } from '@/lib/motion/variants';

interface StageTransitionProps {
  stageId: string;
  children: React.ReactNode;
}

export function StageTransition({ stageId, children }: StageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stageId}
        variants={pageSlide}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
