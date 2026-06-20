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
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      variants={variants}
      className={clsx('w-full py-16 sm:py-20 lg:py-28', className)}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">{children}</div>
    </motion.section>
  );
};
