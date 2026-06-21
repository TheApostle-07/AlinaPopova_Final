import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div
    className={clsx(
      'rounded-lg border border-[#ECE8EC] bg-white p-6 shadow-card transition-all duration-300 hover:border-primary/25 hover:shadow-soft sm:p-8',
      className
    )}
  >
    {children}
  </div>
);
