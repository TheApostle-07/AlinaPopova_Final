import Link from 'next/link';
import { ArrowUp, Building2, CheckCircle2, FileText, UsersRound } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { LEGAL_POLICY_VERSION } from '@/lib/legal';

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalMeaning {
  companies: string[];
  creators: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  sections: LegalSection[];
  meaning?: LegalMeaning;
  lastUpdated?: string;
  version?: string;
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
  { label: 'Complaints', href: '/complaints' },
  { label: 'Cookie policy', href: '/cookie-policy' }
] as const;

const defaultMeaning: LegalMeaning = {
  companies: [
    'Confirm campaign scope, usage rights, payments, and timelines in writing before work begins.',
    'Use this page alongside the proposal or agreement that applies to your campaign.'
  ],
  creators: [
    'You can ask questions, set boundaries, and review written terms before accepting paid work.',
    'Use this page alongside the campaign-specific terms shared for any opportunity.'
  ]
};

const PolicyVersionBadge = ({ lastUpdated, version }: { lastUpdated: string; version: string }) => (
  <div className="flex flex-wrap items-center gap-3 text-sm text-cocoa">
    <span>Last updated: {lastUpdated}</span>
    <span className="rounded-full border border-primary/15 bg-porcelain px-3 py-1 font-semibold text-primary">Version {version}</span>
  </div>
);

const LegalSummaryCard = ({ summary, lastUpdated, version }: { summary: string; lastUpdated: string; version: string }) => (
  <section className="rounded-[36px] border border-primary/15 bg-white p-7 shadow-card sm:p-10">
    <div className="flex flex-wrap items-start justify-between gap-5">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-porcelain text-primary"><FileText className="h-6 w-6" aria-hidden /></span>
        <div>
          <p className="font-semibold text-espresso">Plain-English summary</p>
          <p className="mt-1 text-sm leading-6 text-cocoa">The key points before you read the full policy.</p>
        </div>
      </div>
      <PolicyVersionBadge lastUpdated={lastUpdated} version={version} />
    </div>
    <p className="mt-7 max-w-4xl text-base leading-8 text-espresso sm:text-lg">{summary}</p>
  </section>
);

const LegalMeaningGrid = ({ meaning }: { meaning: LegalMeaning }) => (
  <section className="mt-8">
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold text-primary">What this means for you</p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-espresso sm:text-4xl">Clear expectations on both sides of the work.</h2>
    </div>
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <section className="rounded-[34px] border border-[#ECE8EC] bg-white p-7 shadow-card sm:p-9">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><Building2 className="h-5 w-5" aria-hidden /></span>
        <h3 className="mt-6 font-display text-2xl text-espresso">For companies</h3>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-cocoa">
          {meaning.companies.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}
        </ul>
      </section>
      <section className="rounded-[34px] border border-[#ECE8EC] bg-white p-7 shadow-card sm:p-9">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><UsersRound className="h-5 w-5" aria-hidden /></span>
        <h3 className="mt-6 font-display text-2xl text-espresso">For creators</h3>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-cocoa">
          {meaning.creators.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}
        </ul>
      </section>
    </div>
  </section>
);

const LegalTableOfContents = ({ sections }: { sections: LegalSection[] }) => (
  <>
    <nav className="sticky top-28 hidden rounded-[30px] border border-[#ECE8EC] bg-white p-6 shadow-card lg:block" aria-label="Legal page sections">
      <p className="text-sm font-semibold text-espresso">On this page</p>
      <ol className="mt-5 space-y-3 text-sm leading-6 text-cocoa">
        {sections.map((section, index) => <li key={section.title}><a href={`#legal-${index + 1}`} className="transition hover:text-primary">{index + 1}. {section.title}</a></li>)}
      </ol>
    </nav>
    <details className="rounded-[28px] border border-[#ECE8EC] bg-white p-6 shadow-card lg:hidden">
      <summary className="cursor-pointer font-semibold text-espresso">On this page</summary>
      <ol className="mt-5 space-y-3 text-sm leading-6 text-cocoa">
        {sections.map((section, index) => <li key={section.title}><a href={`#legal-${index + 1}`}>{index + 1}. {section.title}</a></li>)}
      </ol>
    </details>
  </>
);

const LegalSectionCard = ({ section, index }: { section: LegalSection; index: number }) => (
  <section id={`legal-${index + 1}`} className="scroll-mt-28 rounded-[34px] border border-[#ECE8EC] bg-white p-7 shadow-card sm:p-9">
    <p className="text-sm font-semibold text-primary">Section {index + 1}</p>
    <h2 className="mt-3 font-display text-2xl leading-tight text-espresso sm:text-3xl">{section.title}</h2>
    {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-base leading-8 text-cocoa">{paragraph}</p>)}
  </section>
);

const RelatedPolicies = () => (
  <section className="rounded-[34px] border border-primary/15 bg-porcelain p-7 sm:p-9">
    <p className="text-sm font-semibold text-espresso">Related policies</p>
    <p className="mt-2 text-sm leading-6 text-cocoa">Policies work together. Read the one that matches the question you need to resolve.</p>
    <div className="mt-5 flex flex-wrap gap-3">
      {relatedPolicies.map((policy) => <Link key={policy.href} href={policy.href} className="rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-champagne">{policy.label}</Link>)}
    </div>
  </section>
);

const LegalContactCard = () => (
  <section className="rounded-[34px] border border-[#ECE8EC] bg-white p-7 shadow-card sm:p-9">
    <p className="text-sm font-semibold text-espresso">Questions, rights requests, or a concern</p>
    <p className="mt-3 text-sm leading-7 text-cocoa">For privacy, safety, payment, or policy questions, contact support@alinapopova.com. Do not send identity documents or private media through ordinary email.</p>
    <Link href="/complaints" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">Report a concern <ArrowUp className="h-4 w-4 rotate-45" aria-hidden /></Link>
  </section>
);

export const LegalPage = ({
  eyebrow,
  title,
  description,
  summary,
  sections,
  meaning = defaultMeaning,
  lastUpdated = '22 June 2026',
  version = LEGAL_POLICY_VERSION
}: LegalPageProps) => (
  <>
    <PageHero compact eyebrow={eyebrow} title={title} description={description} />
    <SectionWrapper className="bg-softwhite">
      <div id="legal-top" className="mx-auto max-w-[1120px]">
        <LegalSummaryCard summary={summary} lastUpdated={lastUpdated} version={version} />
        <LegalMeaningGrid meaning={meaning} />
        <div className="mt-10 grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside><LegalTableOfContents sections={sections} /></aside>
          <article className="space-y-6">
            {sections.map((section, index) => <LegalSectionCard key={section.title} section={section} index={index} />)}
          </article>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <RelatedPolicies />
          <LegalContactCard />
        </div>
        <div className="mt-8 text-center"><a href="#legal-top" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">Back to top <ArrowUp className="h-4 w-4" aria-hidden /></a></div>
      </div>
    </SectionWrapper>
  </>
);
