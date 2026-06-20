import type { Metadata } from 'next';
import { CampaignsPage } from '@/components/creator/MarketingPages';

export const metadata: Metadata = {
  title: 'Creator Marketing Campaigns | Alina Popova Studio',
  description: 'UGC packs, creator launch campaigns, and managed creator marketing programs for product brands.'
};

export default function CampaignsRoutePage() {
  return <CampaignsPage />;
}
