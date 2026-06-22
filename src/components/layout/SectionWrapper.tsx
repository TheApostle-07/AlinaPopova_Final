import clsx from 'clsx';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export const SectionWrapper = ({ id, children, className }: SectionWrapperProps) => {
  return (
    <section
      id={id}
      className={clsx('w-full py-[84px] sm:py-28 lg:py-[120px]', className)}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">{children}</div>
    </section>
  );
};
