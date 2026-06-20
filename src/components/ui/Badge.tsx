import clsx from 'clsx';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export const Badge = ({ children, className }: BadgeProps) => (
  <span className={clsx('inline-flex rounded-full border border-neon/20 bg-porcelain px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary', className)}>
    {children}
  </span>
);
