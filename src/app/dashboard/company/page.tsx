import type { Metadata } from 'next';
import { DashboardView } from '../DashboardView';

export const metadata: Metadata = {
  title: 'Company Dashboard | Alina Popova Studio OS',
  description: 'Company campaign briefs, project status, materials, deliverables, approvals, invoices, and messages.'
};

export default function CompanyDashboardPage() {
  return <DashboardView />;
}
