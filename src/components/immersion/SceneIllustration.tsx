'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { sceneEntrance } from '@/lib/motion/variants';

interface SceneIllustrationProps {
  sceneId: string;
  className?: string;
  dimmed?: boolean;
}

export function SceneIllustration({ sceneId, className = '', dimmed = false }: SceneIllustrationProps) {
  return (
    <motion.div
      variants={sceneEntrance}
      initial="initial"
      animate="animate"
      className={`relative overflow-hidden rounded-xl ${className}`}
    >
      <Image
        src={`/scenes/${sceneId}.svg`}
        alt={sceneId}
        width={800}
        height={400}
        className={`w-full h-full object-cover transition-all duration-500 ${dimmed ? 'brightness-50 blur-sm' : ''}`}
        priority
      />
    </motion.div>
  );
}
