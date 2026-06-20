import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const SiteFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 rounded-t-[40px] border-t border-primary/20 bg-ink text-ivory">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_2fr] lg:px-10">
        <div>
          <p className="text-base font-semibold uppercase tracking-[0.14em]">{siteConfig.siteName}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-champagne/75">
            Creator-led marketing for companies and brand-safe opportunities for independent creators, from Gujarat and across India.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="space-y-3 text-sm">
            <p className="font-semibold text-white">For Creators</p>
            <Link href="/creators" className="block text-champagne/75 hover:text-white">Creator Network</Link>
            <Link href="/creator-launch-program" className="block text-champagne/75 hover:text-white">Creator Launch</Link>
            <Link href="/how-it-works" className="block text-champagne/75 hover:text-white">How It Works</Link>
            <Link href="/tiers" className="block text-champagne/75 hover:text-white">Tiers</Link>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-semibold text-white">For Companies</p>
            <Link href="/companies" className="block text-champagne/75 hover:text-white">Marketing Services</Link>
            <Link href="/services" className="block text-champagne/75 hover:text-white">All Services</Link>
            <Link href="/campaigns" className="block text-champagne/75 hover:text-white">Campaigns</Link>
            <Link href="/live-studio" className="block text-champagne/75 hover:text-white">Live Studio</Link>
            <Link href="/pricing" className="block text-champagne/75 hover:text-white">Pricing</Link>
            <Link href="/about" className="block text-champagne/75 hover:text-white">About</Link>
            <Link href="/safety" className="block text-champagne/75 hover:text-white">Safety</Link>
            <Link href="/contact" className="block text-champagne/75 hover:text-white">Contact</Link>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-semibold text-white">Legal</p>
            <Link href="/privacy" className="block text-champagne/75 hover:text-white">Privacy</Link>
            <Link href="/terms" className="block text-champagne/75 hover:text-white">Terms</Link>
            <Link href="/refunds" className="block text-champagne/75 hover:text-white">Refunds</Link>
            <Link href="/creator-agreement" className="block text-champagne/75 hover:text-neon">Creator Agreement Summary</Link>
            <Link href="/brand-agreement" className="block text-champagne/75 hover:text-neon">Brand Agreement Summary</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-champagne/60">
        © {year} {siteConfig.siteName}. All rights reserved. <Link href="/admin" className="ml-2 hover:text-white">Admin</Link>
      </div>
    </footer>
  );
};
