import Link from 'next/link';
import { siteConfig } from '@/lib/config';

const columns = [
  { title: 'Companies', links: [['Marketing services', '/companies'], ['Services', '/services'], ['Campaigns', '/campaigns'], ['Pricing', '/pricing']] },
  { title: 'Creators', links: [['Creator network', '/creators'], ['Apply', '/apply'], ['How it works', '/how-it-works'], ['Safety', '/safety']] },
  { title: 'Studio', links: [['About', '/about'], ['Live Studio', '/live-studio'], ['Contact', '/contact'], ['Complaints', '/complaints']] },
  { title: 'Legal', links: [['Terms', '/terms'], ['Privacy', '/privacy'], ['Refunds', '/refunds'], ['Creator agreement', '/creator-agreement-summary'], ['Company agreement', '/brand-agreement-summary'], ['Content usage', '/content-usage-policy'], ['Payments', '/payment-policy'], ['Cookie policy', '/cookie-policy']] }
] as const;

export const SiteFooter = () => {
  const year = new Date().getFullYear();
  return <footer className="mt-8 rounded-t-[44px] bg-ink text-white"><div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_2fr] lg:px-10"><div><p className="text-lg font-semibold">{siteConfig.siteName}</p><p className="mt-4 max-w-sm text-sm leading-7 text-white/65">Creator-led marketing for companies and professional opportunities for independent creators.</p></div><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{columns.map((column) => <div key={column.title}><p className="text-sm font-semibold text-white">{column.title}</p><div className="mt-4 space-y-3">{column.links.map(([label, href]) => <Link key={href} href={href} className="block text-sm text-white/60 transition hover:text-neon">{label}</Link>)}</div></div>)}</div></div><div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45">© {year} {siteConfig.siteName}. <Link href="/admin" className="ml-2 transition hover:text-white">Admin</Link></div></footer>;
};
