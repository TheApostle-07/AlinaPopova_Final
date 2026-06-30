import type { Metadata } from 'next';
import { DashboardView } from '../DashboardView';

export const metadata: Metadata = {
  title: 'Specialist Workspace | Alina Popova Studio OS',
  description: 'Assigned projects, tasks, files, deliverables, messages, and payments for specialist collaborators.'
};

export default function SpecialistWorkspacePage() {
  return <DashboardView />;
}
