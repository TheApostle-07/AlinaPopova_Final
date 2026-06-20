import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div
    className={clsx(
      'rounded-lg border border-primary/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-soft sm:p-8',
      className
    )}
  >
    {children}
  </div>
);
