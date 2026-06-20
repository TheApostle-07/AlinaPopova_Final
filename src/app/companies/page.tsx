import type { Metadata } from 'next';
import { CompanyMarketingPage } from '@/components/creator/MarketingPages';

export const metadata: Metadata = {
  title: 'Creator Marketing for Companies | Alina Popova Studio',
  description: 'Creator-led UGC, social campaigns, livestreams, YouTube Live, product demos, and creator marketing for companies across India.'
};

export default function CompaniesPage() {
  return <CompanyMarketingPage />;
}
