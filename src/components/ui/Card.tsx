import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div
    className={clsx(
      'group transform-gpu rounded-[34px] border border-[#ECE8EC] bg-white p-7 shadow-card transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-soft motion-reduce:hover:translate-y-0 sm:p-9 lg:p-10',
      className
    )}
  >
    {children}
  </div>
);
