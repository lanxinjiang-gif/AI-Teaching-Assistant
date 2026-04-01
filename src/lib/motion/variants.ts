import type { Variants } from 'framer-motion';

export const pageSlide: Variants = {
  initial: { x: 60, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { x: -60, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

export const fadeUp: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { y: -10, opacity: 0, transition: { duration: 0.2 } },
};

export const popIn: Variants = {
  initial: { scale: 0.92, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { scale: 0.95, opacity: 0, transition: { duration: 0.15 } },
};

export const slideUp: Variants = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { y: 40, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

export const toastSlideIn: Variants = {
  initial: { x: 80, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { x: 80, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

export const sceneEntrance: Variants = {
  initial: { scale: 1.04, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const staggerChildren = {
  animate: { transition: { staggerChildren: 0.07 } },
};
