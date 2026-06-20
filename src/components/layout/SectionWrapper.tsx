'use client';

import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

const variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
};

export const SectionWrapper = ({ id, children, className }: SectionWrapperProps) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      variants={variants}
      className={clsx('mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24', className)}
    >
      {children}
    </motion.section>
  );
};
