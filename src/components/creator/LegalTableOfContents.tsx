'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface LegalNavigationItem {
  id: string;
  title: string;
}

interface LegalTableOfContentsProps {
  items: LegalNavigationItem[];
}

const LinkList = ({ items, activeId, onNavigate }: LegalTableOfContentsProps & { activeId: string; onNavigate: (id: string) => void }) => (
  <ol className="space-y-2 text-sm leading-6">
    {items.map((item, index) => {
      const active = item.id === activeId;
      return (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active ? 'location' : undefined}
            onClick={() => onNavigate(item.id)}
            className={clsx(
              'block rounded-xl px-3 py-2.5 transition-colors',
              active ? 'bg-porcelain font-semibold text-primary' : 'text-cocoa hover:bg-porcelain hover:text-espresso'
            )}
          >
            <span className="mr-2 text-xs text-primary/70">{String(index + 1).padStart(2, '0')}</span>
            {item.title}
          </a>
        </li>
      );
    })}
  </ol>
);

export const LegalTableOfContents = ({ items }: LegalTableOfContentsProps) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (!items.length) return;

    const nodes = items.map(({ id }) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    const updateActiveFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (items.some((item) => item.id === hash)) setActiveId(hash);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.12, 0.5] }
    );

    nodes.forEach((node) => observer.observe(node));
    updateActiveFromHash();
    window.addEventListener('hashchange', updateActiveFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', updateActiveFromHash);
    };
  }, [items]);

  const navigate = (id: string) => setActiveId(id);

  return (
    <>
      <nav className="sticky top-28 hidden rounded-[30px] border border-[#ECE8EC] bg-white p-5 shadow-card lg:block" aria-label="Legal page sections">
        <p className="px-3 text-sm font-semibold text-espresso">On this page</p>
        <div className="mt-4 border-l-2 border-primary/10 pl-2"><LinkList items={items} activeId={activeId} onNavigate={navigate} /></div>
      </nav>
      <details className="rounded-[28px] border border-[#ECE8EC] bg-white p-5 shadow-card lg:hidden">
        <summary className="cursor-pointer list-none font-semibold text-espresso">On this page</summary>
        <div className="mt-4 border-l-2 border-primary/10 pl-2"><LinkList items={items} activeId={activeId} onNavigate={navigate} /></div>
      </details>
    </>
  );
};
