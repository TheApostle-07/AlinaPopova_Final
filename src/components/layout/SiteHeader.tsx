'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button';

type NavLink = {
  label: string;
  href: { pathname: Route; hash?: string };
};

const navLinks: NavLink[] = [
  { label: 'Home', href: { pathname: '/' } },
  { label: 'For Companies', href: { pathname: '/companies' } },
  { label: 'For Creators', href: { pathname: '/creators' } },
  { label: 'Services', href: { pathname: '/services' } },
  { label: 'Pricing', href: { pathname: '/pricing' } },
  { label: 'Safety', href: { pathname: '/safety' } },
  { label: 'FAQs', href: { pathname: '/faqs' } }
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={clsx(
        'sticky top-0 z-[60] border-b border-primary/10 backdrop-blur-xl transition-shadow',
        menuOpen ? 'bg-white/95' : 'bg-white/90',
        scrolled ? 'shadow-header' : 'shadow-none'
      )}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
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
            <span className="block text-base font-semibold uppercase tracking-[0.13em]">Alina Popova Studio</span>
            <span className="text-xs text-cocoa leading-tight">Creator-Led Marketing</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-primary/10 bg-porcelain/55 p-1.5 text-sm font-semibold text-cocoa xl:flex">
          {navLinks.map((link) => (
            <Link
              key={`${link.href.pathname}-${link.href.hash ?? 'root'}`}
              href={link.href}
              scroll
              className="rounded-full px-3 py-2 transition-colors hover:bg-white hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button href="/companies" className="hidden md:inline-flex" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Market My Company
          </Button>
          <Button
            href="/companies"
            className="px-4 py-2 text-xs md:hidden"
            variant="secondary"
            iconRight={<ArrowRight className="h-3.5 w-3.5" aria-hidden />}
          >
            For Companies
          </Button>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-white text-cocoa shadow-card transition hover:border-primary hover:text-primary md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-espresso/20 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="fixed inset-x-4 top-20 z-50 rounded-[32px] border border-primary/15 bg-white p-6 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cocoa">Menu</p>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 text-cocoa transition hover:border-primary hover:text-primary"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <nav className="flex flex-col gap-2 text-base font-semibold text-espresso">
                {navLinks.map((link) => (
                  <Link
                    key={`mobile-${link.href.pathname}-${link.href.hash ?? 'root'}`}
                    href={link.href}
                    scroll
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-3 transition hover:bg-porcelain hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 grid gap-3">
                <Button href="/companies" variant="ghost" className="w-full">
                  Market My Company
                </Button>
                <Button href="/apply" className="w-full" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>
                  Apply Free
                </Button>
              </div>
              <p className="mt-6 text-center text-xs uppercase tracking-[0.13em] text-cocoa">Gujarat Based · India Wide</p>
            </div>
          </motion.div>
        </>
      )}
    </motion.header>
  );
};
