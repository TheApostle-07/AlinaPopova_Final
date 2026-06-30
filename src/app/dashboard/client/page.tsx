import type { Metadata } from 'next';
import { DashboardView } from '../DashboardView';

export const metadata: Metadata = {
  title: 'Client Review Dashboard | Alina Popova Studio OS',
  description: 'Project review, deliverables, approvals, messages, files, and campaign status for invited reviewers.'
};

export default function ClientDashboardPage() {
  return <DashboardView />;
}
