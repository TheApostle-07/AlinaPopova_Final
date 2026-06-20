import type { Metadata } from 'next';
import { TiersPage } from '@/components/creator/TiersPage';

export const metadata: Metadata = {
  title: 'Creator Tiers | Alina Popova Studio',
  description: 'The Applicant Pool, Creator Launch Intake, and Paid Opportunity Roster explained clearly.'
};

export default function TiersRoute() {
  return <TiersPage />;
}
