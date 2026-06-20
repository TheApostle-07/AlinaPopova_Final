import type { Metadata } from 'next';
import { LiveStudioPage } from '@/components/creator/MarketingPages';

export const metadata: Metadata = {
  title: 'Live Marketing Studio | Alina Popova Studio',
  description: 'Creator-hosted livestreams, YouTube Live, product demos, founder sessions, and live shopping campaigns.'
};

export default function LiveStudioRoutePage() {
  return <LiveStudioPage />;
}
