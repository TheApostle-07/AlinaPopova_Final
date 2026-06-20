import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export const PageHero = ({ eyebrow, title, description, actions }: PageHeroProps) => (
  <section className="border-b border-primary/10 bg-porcelain">
    <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-espresso sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-cocoa sm:text-lg sm:leading-8">{description}</p>
      {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
    </div>
  </section>
);
