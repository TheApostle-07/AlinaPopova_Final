'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion = ({ items }: AccordionProps) => {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = activeId === item.id;
        return (
          <div key={item.id} className="overflow-hidden rounded-md border border-primary/15 bg-white">
            <button
              type="button"
              onClick={() => setActiveId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-content`}
              className="flex min-h-14 w-full items-center justify-between px-5 py-4 text-left text-base font-semibold text-foreground sm:px-6"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180 text-primary' : 'text-slate-400'}`}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <div id={`${item.id}-content`} role="region" className="px-5 pb-6 text-sm leading-6 text-cocoa sm:px-6">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
