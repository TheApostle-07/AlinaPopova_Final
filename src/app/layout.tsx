import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import '@/styles/globals.css';
import clsx from 'clsx';
import { siteConfig } from '@/lib/config';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Analytics } from '@vercel/analytics/next';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: 'Creator Launch Program | Alina Popova Studio',
  description:
    'Apply free to Alina Popova Studio’s Creator Launch Program for brand-safe creator, livestream, product demo, Instagram, and YouTube Live opportunities.',
  openGraph: {
    title: 'Creator Launch Program | Alina Popova Studio',
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
    <html lang="en" className={clsx('scroll-smooth', fraunces.variable, manrope.variable)}>
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
