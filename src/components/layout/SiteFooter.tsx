'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, BadgeCheck, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { siteConfig } from '@/lib/config';

const groups = [
  { title: 'Companies', links: [['For Companies', '/companies'], ['Services', '/services'], ['Campaigns', '/campaigns'], ['Live Studio', '/live-studio'], ['Pricing', '/pricing'], ['Book Campaign', '/companies/start']] },
  { title: 'Creators', links: [['Creator Network', '/creators'], ['Apply as Creator', '/apply'], ['Creator Roles', '/creators#roles'], ['How It Works', '/how-it-works'], ['Safety', '/safety'], ['Complaints', '/complaints']] },
  { title: 'Studio', links: [['About', '/about'], ['Contact', '/contact'], ['FAQs', '/faqs'], ['Safety', '/safety'], ['How It Works', '/how-it-works']] },
  { title: 'Legal', links: [['Terms', '/terms'], ['Privacy', '/privacy'], ['Refunds', '/refunds'], ['Content Usage', '/content-usage-policy'], ['Payment Policy', '/payment-policy'], ['Creator Agreement', '/creator-agreement-summary'], ['Company Agreement', '/brand-agreement-summary'], ['Cookie Policy', '/cookie-policy'], ['Complaints', '/complaints']] }
] as const;

const legalPaths = new Set(['/terms', '/privacy', '/refunds', '/safety', '/content-usage-policy', '/payment-policy', '/complaints', '/creator-agreement-summary', '/brand-agreement-summary', '/cookie-policy']);

const FooterLinkGroup = ({ title, links }: typeof groups[number]) => (
  <div>
    <p className="text-sm font-semibold text-white">{title}</p>
    <div className="mt-5 space-y-3.5">
      {links.map(([label, href]) => <Link key={`${label}-${href}`} href={href} className="block text-sm text-white/65 transition-colors hover:text-[#E9A1BF] focus-visible:text-white">{label}</Link>)}
    </div>
  </div>
);

const FooterMobileGroup = ({ title, links }: typeof groups[number]) => (
  <details className="border-b border-white/10 py-5 last:border-b-0">
    <summary className="cursor-pointer list-none text-sm font-semibold text-white">{title}</summary>
    <div className="mt-4 grid gap-3 pl-1">
      {links.map(([label, href]) => <Link key={`${label}-${href}`} href={href} className="text-sm text-white/65 transition-colors hover:text-[#E9A1BF]">{label}</Link>)}
    </div>
  </details>
);

const FooterCtaPanel = () => (
  <section className="bg-softwhite px-5 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pt-32">
    <div className="mx-auto max-w-[1160px] rounded-[52px] border border-primary/15 bg-porcelain px-7 py-14 text-center shadow-card sm:px-12 lg:px-16 lg:py-16">
      <p className="text-sm font-semibold text-primary">Start here</p>
      <h2 className="mt-4 font-display text-3xl leading-tight text-espresso sm:text-4xl">Start with the right path.</h2>
      <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-cocoa">Companies can plan a creator-led campaign. Creators can apply to join a professional network. Both begin with clear terms and no pressure.</p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/companies/start" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-[#A8245C]"><span>Market My Company</span><ArrowRight className="h-4 w-4" aria-hidden /></Link>
        <Link href="/apply" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#ECE8EC] bg-white px-6 py-3 text-sm font-semibold text-espresso shadow-card transition hover:border-primary/25 hover:bg-porcelain">Apply as Creator</Link>
      </div>
    </div>
  </section>
);

const FooterBrand = () => (
  <div>
    <BrandLogo variant="light" />
    <p className="mt-7 max-w-sm text-sm leading-7 text-white/65">Creator-led marketing for companies and professional opportunities for independent creators.</p>
    <p className="mt-4 text-sm font-medium text-white">Clear scope. Creator consent. Brand-safe execution.</p>
    <div className="mt-7 flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/75"><BadgeCheck className="h-3.5 w-3.5 text-[#E9A1BF]" aria-hidden />Company campaigns</span>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/75"><BadgeCheck className="h-3.5 w-3.5 text-[#E9A1BF]" aria-hidden />Creator network</span>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/75"><ShieldCheck className="h-3.5 w-3.5 text-[#E9A1BF]" aria-hidden />Safety-first</span>
    </div>
  </div>
);

export const SiteFooter = () => {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const showCta = pathname !== '/' && !legalPaths.has(pathname);

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      {showCta && <FooterCtaPanel />}
      <footer className="rounded-t-[56px] bg-[#111014] text-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="hidden gap-10 lg:grid lg:grid-cols-[1.7fr_repeat(4,minmax(0,0.8fr))] lg:gap-12">
            <FooterBrand />
            {groups.map((group) => <FooterLinkGroup key={group.title} {...group} />)}
          </div>
          <div className="lg:hidden">
            <FooterBrand />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Link href="/companies/start" className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white">Market My Company</Link>
              <Link href="/apply" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white">Apply as Creator</Link>
            </div>
            <div className="mt-9">{groups.map((group) => <FooterMobileGroup key={group.title} {...group} />)}</div>
          </div>
          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
            <p>© {year} {siteConfig.siteName}. All rights reserved.</p>
            <div className="flex flex-wrap gap-4"><Link href="/privacy" className="transition hover:text-white">Privacy</Link><Link href="/terms" className="transition hover:text-white">Terms</Link><Link href="/safety" className="transition hover:text-white">Safety</Link></div>
          </div>
        </div>
      </footer>
    </>
  );
};
