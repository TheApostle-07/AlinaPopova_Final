import type { Metadata } from 'next';
import { Manrope, Sora } from 'next/font/google';
import '@/styles/globals.css';
import clsx from 'clsx';
import { siteConfig } from '@/lib/config';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Analytics } from '@vercel/analytics/next';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: 'Creator-Led Marketing Agency | Alina Popova Studio',
  description:
    'Creator-led UGC, social campaigns, livestreams, product demos, and brand-safe creator opportunities across India.',
  openGraph: {
    title: 'Creator-Led Marketing Agency | Alina Popova Studio',
    description:
      'Apply free. Train free if selected. Become eligible for paid brand-safe creator opportunities.',
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.siteName} – ${siteConfig.siteTagline}`
      }
    ],
    locale: 'en_IN',
    type: 'website'
  },
  icons: {
    icon: '/favicon.svg'
  }
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={clsx('scroll-smooth', sora.variable, manrope.variable)}>
      <body className="bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
