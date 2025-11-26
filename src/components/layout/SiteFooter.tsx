import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const SiteFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>© {year} {siteConfig.siteName}. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/pricing" className="hover:text-primary">
            Pricing
          </Link>
          <Link href="/refunds" className="hover:text-primary">
            Refunds
          </Link>
          <Link href="/privacy" className="hover:text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};
