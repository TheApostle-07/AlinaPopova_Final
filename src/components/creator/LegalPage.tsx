import Link from 'next/link';
import { FileText } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  sections: LegalSection[];
  lastUpdated?: string;
}

const relatedPolicies = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Refunds', href: '/refunds' },
  { label: 'Safety', href: '/safety' },
  { label: 'Creator summary', href: '/creator-agreement-summary' },
  { label: 'Company summary', href: '/brand-agreement-summary' },
  { label: 'Content usage', href: '/content-usage-policy' },
  { label: 'Payments', href: '/payment-policy' },
  { label: 'Complaints', href: '/complaints' }
] as const;

export const LegalPage = ({ eyebrow, title, description, summary, sections, lastUpdated = '21 June 2026' }: LegalPageProps) => (
  <>
    <PageHero compact eyebrow={eyebrow} title={title} description={description} />
    <SectionWrapper className="bg-softwhite">
      <div className="mx-auto max-w-[1120px]">
        <div className="rounded-[34px] border border-primary/15 bg-white p-6 shadow-card sm:p-8"><div className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-porcelain text-primary"><FileText className="h-5 w-5" aria-hidden /></span><div><p className="text-xs font-semibold uppercase text-primary">Plain English summary</p><p className="mt-1 text-sm text-cocoa">Last updated: {lastUpdated}</p></div></div><p className="text-xs text-cocoa">Legal review recommended before commercial use.</p></div><p className="mt-5 max-w-4xl text-base leading-7 text-espresso">{summary}</p></div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block"><nav className="sticky top-28 rounded-[28px] border border-[#ECE8EC] bg-white p-5 shadow-card"><p className="text-xs font-semibold text-primary">On this page</p><ol className="mt-4 space-y-2 text-sm text-cocoa">{sections.map((section, index) => <li key={section.title}><a href={`#legal-${index + 1}`} className="transition hover:text-primary">{index + 1}. {section.title}</a></li>)}</ol></nav></aside>
          <article className="space-y-4 lg:hidden">{sections.map((section, index) => <details key={section.title} id={`legal-mobile-${index + 1}`} className="rounded-[30px] border border-[#ECE8EC] bg-white shadow-card" open={index === 0}><summary className="cursor-pointer list-none p-6 font-display text-xl text-espresso marker:hidden">{index + 1}. {section.title}</summary><div className="border-t border-[#ECE8EC] px-6 pb-6">{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-sm leading-7 text-cocoa">{paragraph}</p>)}</div></details>)}</article>
          <article className="hidden space-y-4 lg:block">{sections.map((section, index) => <section key={section.title} id={`legal-${index + 1}`} className="rounded-[30px] border border-[#ECE8EC] bg-white p-6 shadow-card sm:p-8"><h2 className="font-display text-2xl text-espresso">{index + 1}. {section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-sm leading-7 text-cocoa">{paragraph}</p>)}</section>)}</article>
        </div>
        <div className="mt-8 rounded-[30px] border border-primary/15 bg-porcelain p-6"><p className="text-sm font-semibold text-espresso">Related policies</p><div className="mt-4 flex flex-wrap gap-3">{relatedPolicies.map((policy) => <Link key={policy.href} href={policy.href} className="rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-champagne">{policy.label}</Link>)}</div><p className="mt-5 text-sm leading-6 text-cocoa">Questions, rights requests, or grievances can be sent to support@alinapopova.com.</p></div>
      </div>
    </SectionWrapper>
  </>
);
