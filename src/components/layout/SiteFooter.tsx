'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, BadgeCheck, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/Button';
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
      {links.map(([label, href]) => <Link key={`${label}-${href}`} href={href} className="block text-sm text-white/65 no-underline transition-colors hover:text-[#E9A1BF] hover:no-underline focus-visible:text-white">{label}</Link>)}
    </div>
  </div>
);

const FooterMobileGroup = ({ title, links }: typeof groups[number]) => (
  <details className="border-b border-white/10 py-5 last:border-b-0">
    <summary className="cursor-pointer list-none text-sm font-semibold text-white">{title}</summary>
    <div className="mt-4 grid gap-3 pl-1">
      {links.map(([label, href]) => <Link key={`${label}-${href}`} href={href} className="text-sm text-white/65 no-underline transition-colors hover:text-[#E9A1BF] hover:no-underline">{label}</Link>)}
    </div>
  </details>
);

const FooterCtaPanel = ({ eyebrow, title, copy, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: { eyebrow: string; title: string; copy: string; primaryLabel: string; primaryHref: '/companies/start' | '/apply'; secondaryLabel: string; secondaryHref: '/pricing' | '/safety' | '/contact' | '/apply' }) => (
  <section className="bg-softwhite px-5 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pt-32">
    <div className="cta-surface mx-auto max-w-[1160px] rounded-[52px] border border-primary/15 px-7 py-14 text-center shadow-card sm:px-12 lg:px-16 lg:py-16">
      <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl leading-tight text-espresso sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-cocoa">{copy}</p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href={primaryHref} size="lg" className="sm:min-w-[210px]" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>{primaryLabel}</Button>
        <Button href={secondaryHref} size="lg" className="sm:min-w-[180px]" variant="secondary">{secondaryLabel}</Button>
      </div>
    </div>
  </section>
);

const getFooterCta = (pathname: string) => {
  if (pathname.startsWith('/companies')) return { eyebrow: 'For companies', title: 'Ready to plan a creator-led campaign?', copy: 'Share your product, objective, platform, budget range, and timeline. We will route the brief to the right campaign format.', primaryLabel: 'Share a Campaign Brief', primaryHref: '/companies/start' as const, secondaryLabel: 'View Pricing', secondaryHref: '/pricing' as const };
  if (pathname.startsWith('/creators') || pathname.startsWith('/creator-launch-program')) return { eyebrow: 'For creators', title: 'Ready to apply as a creator or talent partner?', copy: 'Submit your role, skills, availability, and boundaries. If shortlisted, the next step is a discovery call or matching review.', primaryLabel: 'Apply Free', primaryHref: '/apply' as const, secondaryLabel: 'Read Safety Policy', secondaryHref: '/safety' as const };
  if (pathname === '/services') return { eyebrow: 'Find the right service path', title: 'Not sure which service fits?', copy: 'Start with your business goal. We will recommend the practical campaign path before you commit to a larger scope.', primaryLabel: 'Build My Campaign', primaryHref: '/companies/start' as const, secondaryLabel: 'View Pricing', secondaryHref: '/pricing' as const };
  if (pathname === '/pricing') return { eyebrow: 'Package guidance', title: 'Need help choosing a package?', copy: 'Share a brief and we will suggest the best starting point based on your goal, platform, content need, and budget range.', primaryLabel: 'Share a Campaign Brief', primaryHref: '/companies/start' as const, secondaryLabel: 'Contact Studio', secondaryHref: '/contact' as const };
  return { eyebrow: 'Next step', title: 'Plan the right creator-led path.', copy: 'Companies can share a campaign goal. Creators can apply to join a professional network with clear terms and no pressure.', primaryLabel: 'Build My Campaign', primaryHref: '/companies/start' as const, secondaryLabel: 'Apply as Creator', secondaryHref: '/apply' as const };
};

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
  const showCta = pathname !== '/' && pathname !== '/companies' && !legalPaths.has(pathname);

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      {showCta && <FooterCtaPanel {...getFooterCta(pathname)} />}
      <footer className="footer-surface rounded-t-[56px] text-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="hidden gap-10 lg:grid lg:grid-cols-[1.7fr_repeat(4,minmax(0,0.8fr))] lg:gap-12">
            <FooterBrand />
            {groups.map((group) => <FooterLinkGroup key={group.title} {...group} />)}
          </div>
          <div className="lg:hidden">
            <FooterBrand />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Button href="/companies/start" fullWidth>Build My Campaign</Button>
              <Button href="/apply" fullWidth variant="secondary" className="border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10 hover:text-white">Apply as Creator</Button>
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
