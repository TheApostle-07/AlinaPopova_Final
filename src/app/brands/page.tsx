import type { Metadata } from 'next';
import { CompanyMarketingPage } from '@/components/creator/MarketingPages';

export const metadata: Metadata = {
  title: 'Book Creators for Brand | Alina Popova Studio',
  description: 'Book brand-safe creators for livestreams, product demos, Instagram campaigns, YouTube Live, and community sessions.'
};

export default function BrandsPage() {
  return <CompanyMarketingPage />;
}
