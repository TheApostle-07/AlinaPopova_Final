import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  highlights?: string[];
  compact?: boolean;
}

export const PageHero = ({ eyebrow, title, description, actions, highlights, compact = false }: PageHeroProps) => (
  <section className={`hero-surface relative isolate overflow-hidden border-b border-neon/15 ${compact ? 'hero-surface--legal' : ''}`}>
    <div className={`mx-auto flex max-w-[1200px] flex-col items-center justify-center px-5 text-center sm:px-8 lg:px-10 ${compact ? 'pb-11 pt-[72px] sm:pb-12 sm:pt-20 lg:pb-16 lg:pt-24' : 'min-h-[46vh] py-20 lg:min-h-[50vh] lg:py-28'}`}>
      <p className="inline-flex rounded-full border border-neon/25 bg-porcelain px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
      <h1 className={`mt-5 max-w-[860px] font-display font-semibold leading-tight tracking-normal text-espresso ${compact ? 'text-[2.15rem] sm:text-5xl' : 'text-4xl sm:text-5xl'}`}>{title}</h1>
      <p className={`mt-5 max-w-3xl text-base leading-7 text-cocoa sm:text-lg sm:leading-8 ${compact ? 'lg:mt-4' : ''}`}>{description}</p>
      {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
      {highlights && <ul className="mt-6 flex max-w-4xl flex-wrap justify-center gap-2 text-sm text-cocoa">{highlights.map((item) => <li key={item} className="rounded-full border border-primary/15 bg-champagne px-3 py-2 font-semibold">{item}</li>)}</ul>}
    </div>
  </section>
);
