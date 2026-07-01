'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BrandLogo } from '@/components/BrandLogo';

const authLinks: Array<{ href: Route; label: string }> = [
  { href: '/', label: 'Back to site' },
  { href: '/safety', label: 'Safety' },
  { href: '/contact', label: 'Help' },
  { href: '/pricing', label: 'Pricing' }
];

export const AuthHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-5 lg:px-8">
        <Link href="/" aria-label="Back to Alina Popova Studio home" className="rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <BrandLogo compact />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-[#766D78] md:flex">
          {authLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#111014]">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="auth-mobile-menu"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ECE8EC] bg-white/80 text-[#111014] shadow-[0_8px_24px_rgba(17,16,20,0.06)] md:hidden"
        >
          <span className="sr-only">{open ? 'Close auth menu' : 'Open auth menu'}</span>
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>
      {open && (
        <div id="auth-mobile-menu" className="mx-5 rounded-[24px] border border-[#F1D7E3] bg-white/95 p-3 shadow-[0_18px_50px_rgba(17,16,20,0.10)] backdrop-blur-xl md:hidden">
          <nav className="grid gap-1">
            {authLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-semibold text-[#766D78] transition hover:bg-[#FFF8FB] hover:text-[#111014]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
