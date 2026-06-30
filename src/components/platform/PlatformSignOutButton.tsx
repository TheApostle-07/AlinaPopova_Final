'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export const PlatformSignOutButton = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch('/api/auth/logout', { method: 'POST', headers: { Accept: 'application/json' } });
        router.push('/login');
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#ECE8EC] bg-white px-4 text-sm font-semibold text-espresso transition hover:border-primary/25 hover:bg-porcelain"
    >
      <LogOut className="h-4 w-4" aria-hidden />
      Sign out
    </button>
  );
};
