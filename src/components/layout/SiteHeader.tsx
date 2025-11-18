'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button';

type NavLink = {
  label: string;
  href: { pathname: Route; hash?: string };
};

const navLinks: NavLink[] = [
  { label: 'Home', href: { pathname: '/' } },
  { label: 'Careers', href: { pathname: '/careers' } },
  { label: 'Why Host', href: { pathname: '/careers', hash: 'why-host' } },
  { label: 'Tiers', href: { pathname: '/careers', hash: 'tiers' } },
  { label: 'FAQs', href: { pathname: '/careers', hash: 'faqs' } }
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={clsx(
        'sticky top-0 z-50 border-b border-slate-100/70 bg-white/95 backdrop-blur-md transition-shadow',
        scrolled ? 'shadow-header' : 'shadow-none'
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-primary">
          <Image
            src="/AP_Logo_2.png"
            alt="Alina Popova Studio logo"
            width={140}
            height={44}
            className="h-10 w-auto sm:h-12"
            priority
            unoptimized
            sizes="140px"
          />
          <div className="leading-tight text-foreground">
            <span className="block text-base font-semibold uppercase tracking-[0.2em]">Alina Popova Studio</span>
            <span className="text-xs text-slate-500 leading-tight">Live Streaming Agency</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link
              key={`${link.href.pathname}-${link.href.hash ?? 'root'}`}
              href={link.href}
              scroll
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button href="/apply" className="ml-4" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>
          Apply
        </Button>
      </div>
    </motion.header>
  );
};
