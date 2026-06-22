'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/Button';

type NavLink = {
  label: string;
  href: { pathname: Route; hash?: string };
};

const navLinks: NavLink[] = [
  { label: 'Home', href: { pathname: '/' } },
  { label: 'Companies', href: { pathname: '/companies' } },
  { label: 'Creators', href: { pathname: '/creators' } },
  { label: 'Services', href: { pathname: '/services' } },
  { label: 'Pricing', href: { pathname: '/pricing' } },
  { label: 'Safety', href: { pathname: '/safety' } },
  { label: 'FAQs', href: { pathname: '/faqs' } }
];

const desktopNavLinks = navLinks.slice(0, -1);

const headerButtonClass = 'h-11 min-h-0 whitespace-nowrap px-5 py-0 text-sm shadow-none hover:shadow-none';

export const SiteHeader = () => {
  const pathname = usePathname();
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

  if (pathname.startsWith('/admin')) return null;

  return (
    <header className={`sticky top-0 z-[60] border-b border-black/[0.06] bg-white/90 backdrop-blur-xl transition-shadow ${scrolled ? 'shadow-header' : 'shadow-none'}`}>
      <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-5 sm:px-8 xl:grid xl:h-20 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)] xl:px-10">
        <Link href="/" className="shrink-0" aria-label="Alina Popova Studio home" onClick={() => setMenuOpen(false)}>
          <BrandLogo />
        </Link>
        <nav className="hidden items-center justify-self-center gap-0 text-sm font-medium text-cocoa xl:flex" aria-label="Primary navigation">
          {desktopNavLinks.map((link) => (
            <Link
              key={`${link.href.pathname}-${link.href.hash ?? 'root'}`}
              href={link.href}
              scroll
              className="whitespace-nowrap rounded-full px-3 py-2.5 transition-colors hover:bg-porcelain hover:text-espresso focus-visible:bg-porcelain"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-self-end gap-2.5">
          <Button href="/apply" className={`hidden xl:inline-flex ${headerButtonClass}`} variant="secondary">
            Apply as Creator
          </Button>
          <Button href="/companies/start" className={`hidden xl:inline-flex ${headerButtonClass}`}>
            Market My Company
          </Button>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#ECE8EC] bg-white text-cocoa transition hover:border-primary/25 hover:bg-porcelain hover:text-espresso xl:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close navigation menu"
            className="fixed inset-0 z-40 cursor-default bg-espresso/10 backdrop-blur-sm xl:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="xl:hidden">
            <div id="mobile-navigation" className="fixed inset-x-3 top-[76px] z-50 rounded-[28px] border border-[#ECE8EC] bg-white p-5 shadow-soft sm:inset-x-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-espresso">Menu</p>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#ECE8EC] text-cocoa transition hover:border-primary/25 hover:bg-porcelain hover:text-espresso"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <nav className="flex flex-col gap-1 text-base font-semibold text-espresso" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={`mobile-${link.href.pathname}-${link.href.hash ?? 'root'}`}
                    href={link.href}
                    scroll
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 transition hover:bg-porcelain hover:text-espresso"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-5 grid gap-3 border-t border-[#ECE8EC] pt-5">
                <Button href="/companies/start" className="w-full" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>
                  Market My Company
                </Button>
                <Button href="/apply" className="w-full" variant="secondary">
                  Apply as Creator
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
