export const adminModules = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'companies', label: 'Company Briefs' },
  { id: 'creators', label: 'Creators' },
  { id: 'matching', label: 'Matching Board' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'payments', label: 'Payments' },
  { id: 'inbox', label: 'Inbox' },
  { id: 'complaints', label: 'Complaints' },
  { id: 'legal', label: 'Legal & Consent' },
  { id: 'settings', label: 'Settings' }
] as const;

export type AdminModule = typeof adminModules[number]['id'];

export const isAdminModule = (value: string): value is AdminModule => adminModules.some((module) => module.id === value);
