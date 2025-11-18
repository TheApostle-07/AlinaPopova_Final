import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import clsx from 'clsx';
import { siteConfig } from '@/lib/config';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-poppins' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: 'Hiring Female Live Stream Hosts | Alina Popova Studio – Delhi NCR',
  description:
    'We hire calm, confident female livestream hosts across Delhi NCR with guided formats, respectful studio culture, and transparent earnings.',
  openGraph: {
    title: 'Hiring Female Live Stream Hosts | Alina Popova Studio – Delhi NCR',
    description:
      'Explore a calm, professional studio for female livestream hosts with transparent earnings and guided frameworks.',
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
    <html lang="en" className="scroll-smooth">
      <body className={clsx('bg-background text-foreground antialiased', poppins.variable)}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
