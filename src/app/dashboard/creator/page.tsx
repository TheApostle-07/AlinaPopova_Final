import type { Metadata } from 'next';
import { DashboardView } from '../DashboardView';

export const metadata: Metadata = {
  title: 'Creator Dashboard | Alina Popova Studio OS',
  description: 'Creator profile, roles, opportunities, tasks, files, usage rights, payouts, and messages.'
};

export default function CreatorDashboardPage() {
  return <DashboardView />;
}
