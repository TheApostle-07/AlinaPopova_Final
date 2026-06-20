'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';

type FaqCategory = 'Creators' | 'Brands' | 'Payments' | 'Safety';

const items: Array<AccordionItem & { category: FaqCategory }> = [
  { id: 'income', category: 'Payments', question: 'Will I earn for sure?', answer: 'No income is guaranteed. We train and shortlist selected creators for suitable opportunities. Paid work depends on brand requirements, creator readiness, and accepted campaigns.' },
  { id: 'pay', category: 'Payments', question: 'Do I have to pay?', answer: 'No joining fee and no training debt. Agency fees apply only through transparent brand service fees or agreed marketing and management fees from agency-supported revenue.' },
  { id: 'new', category: 'Creators', question: 'What if I am new?', answer: 'Beginners can apply. Selection depends on communication, reliability, comfort, and willingness to learn.' },
  { id: 'modelling', category: 'Creators', question: 'Is this modelling?', answer: 'It can include creator campaigns, livestream hosting, product demos, Instagram content, YouTube Live, and brand-safe presentation work. Specific work is explained before you accept.' },
  { id: 'account', category: 'Creators', question: 'Will you control my Instagram?', answer: 'No. We may guide your profile and content strategy, but your account remains yours unless you separately approve management support.' },
  { id: 'decline', category: 'Safety', question: 'Can I refuse a campaign?', answer: 'Yes. You can accept or decline commercial opportunities before they begin.' },
  { id: 'adult', category: 'Safety', question: 'Is this adult content?', answer: 'No. Alina Popova does not support adult, obscene, illegal, exploitative, or unsafe content.' },
  { id: 'usage', category: 'Safety', question: 'Will you use my photos or videos?', answer: 'Only with written usage consent and agreed campaign terms.' },
  { id: 'brand-scope', category: 'Brands', question: 'How do brand campaigns begin?', answer: 'We start with a written brief, creator or host fit, deliverables, product boundaries, usage rights, timing, and commercial terms.' },
  { id: 'brand-safety', category: 'Brands', question: 'How are creators protected during a campaign?', answer: 'Campaigns are screened against our safety standard. Creators receive the agreed scope and can decline work they are not comfortable accepting.' }
];

const categories: Array<FaqCategory | 'All'> = ['All', 'Creators', 'Brands', 'Payments', 'Safety'];

export const FaqExplorer = () => {
  const [category, setCategory] = useState<FaqCategory | 'All'>('All');
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => (category === 'All' || item.category === category) && (!needle || `${item.question} ${item.answer}`.toLowerCase().includes(needle)));
  }, [category, query]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col gap-4 rounded-xl border border-primary/15 bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="FAQ categories">
          {categories.map((item) => <button key={item} id={`faq-tab-${item.toLowerCase()}`} type="button" role="tab" aria-controls="faq-results" aria-selected={category === item} onClick={() => setCategory(item)} className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${category === item ? 'bg-primary text-white shadow-card' : 'bg-porcelain text-cocoa hover:bg-champagne'}`}>{item}</button>)}
        </div>
        <label className="relative block sm:w-60"><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-cocoa" aria-hidden /><span className="sr-only">Search frequently asked questions</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search answers" className="min-h-10 w-full rounded-xl border border-primary/15 bg-ivory py-2 pl-9 pr-3 text-sm text-espresso outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" /></label>
      </div>
      <div id="faq-results" role="tabpanel" aria-labelledby={`faq-tab-${category.toLowerCase()}`} className="mt-5">{results.length ? <Accordion items={results} /> : <p className="rounded-xl border border-primary/15 bg-white p-6 text-sm text-cocoa">No answer matches that search. Contact the studio for clarification.</p>}</div>
    </div>
  );
};
