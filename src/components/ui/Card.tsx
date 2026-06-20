import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div
    className={clsx(
      'rounded-lg border border-[#ECECF0] bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-neon/40 hover:shadow-soft sm:p-8',
      className
    )}
  >
    {children}
  </div>
);
