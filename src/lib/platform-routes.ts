import type { PlatformUserType } from '@/lib/platform-database';

export const getPlatformHomePath = (userType: PlatformUserType | string) => {
  if (userType === 'admin') return '/admin';
  if (userType === 'campaign_manager') return '/workspace';
  if (userType === 'company') return '/dashboard/company';
  if (userType === 'specialist') return '/dashboard/workspace';
  if (userType === 'client') return '/dashboard/client';
  return '/dashboard/creator';
};
