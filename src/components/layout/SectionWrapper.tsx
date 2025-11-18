'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
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

export const SectionWrapper = ({ id, children, className }: SectionWrapperProps) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    variants={variants}
    className={clsx('mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8', className)}
  >
    {children}
  </motion.section>
);
