'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/Button';

type NavLink = {
  label: string;
  href: { pathname: Route; hash?: string };
};

const navLinks: NavLink[] = [
  { label: 'Companies', href: { pathname: '/companies' } },
  { label: 'Creators', href: { pathname: '/creators' } },
  { label: 'Services', href: { pathname: '/services' } },
  { label: 'Pricing', href: { pathname: '/pricing' } },
  { label: 'Safety', href: { pathname: '/safety' } }
];

const dashboardLabel = (userType: string | null) => {
  if (userType === 'admin') return 'Admin';
  if (userType === 'campaign_manager') return 'Workspace';
  if (userType === 'company') return 'Company Dashboard';
  if (userType === 'specialist') return 'Workspace';
  if (userType === 'client') return 'Review Dashboard';
  if (userType === 'creator') return 'Creator Dashboard';
  return 'Dashboard';
};

const dashboardPath = (userType: string | null): Route => {
  if (userType === 'admin') return '/admin';
  if (userType === 'campaign_manager') return '/workspace';
  if (userType === 'company') return '/dashboard/company';
  if (userType === 'specialist') return '/dashboard/workspace';
  if (userType === 'client') return '/dashboard/client';
  return '/dashboard/creator';
};

export const SiteHeader = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const loggedIn = Boolean(userType);
  const isLoginPage = pathname.startsWith('/login');

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

  useEffect(() => {
    let active = true;
    void (async () => {
      const response = await fetch('/api/auth/status', { headers: { Accept: 'application/json' }, cache: 'no-store' }).catch(() => null);
      if (!response?.ok || !active) return;
      const payload = await response.json().catch(() => null) as { ok?: boolean; data?: { authenticated?: boolean; userType?: string | null } } | null;
      setUserType(payload?.ok && payload.data?.authenticated ? payload.data.userType ?? null : null);
    })();
    return () => {
      active = false;
    };
  }, [pathname]);

  const signOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST', headers: { Accept: 'application/json' } }).catch(() => null);
    setUserType(null);
    setMenuOpen(false);
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/workspace') || pathname.startsWith('/admin')) window.location.href = '/login';
  };

  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/workspace') || pathname.startsWith('/register') || pathname.startsWith('/onboarding')) return null;

  return (
    <header className={`sticky top-0 z-[60] border-b border-black/[0.06] bg-white/90 backdrop-blur-xl transition-shadow ${scrolled ? 'shadow-header' : 'shadow-none'}`}>
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <Link href="/" className="max-w-[230px] shrink-0" aria-label="Alina Popova Studio home" onClick={() => setMenuOpen(false)}>
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-medium text-cocoa lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href.pathname);
            return <Link
              key={`${link.href.pathname}-${link.href.hash ?? 'root'}`}
              href={link.href}
              scroll
              aria-current={active ? 'page' : undefined}
              className={`whitespace-nowrap rounded-full px-3 py-2.5 no-underline transition-colors hover:bg-porcelain hover:text-espresso hover:no-underline focus-visible:bg-porcelain ${active ? 'bg-porcelain text-espresso' : ''}`}
            >
              {link.label}
            </Link>;
          })}
        </nav>
        <div className="flex items-center gap-3">
          {loggedIn ? (
            <>
              <Button href={dashboardPath(userType)} size="sm" variant="secondary" className="hidden min-h-11 px-4 shadow-none hover:shadow-card lg:inline-flex" iconLeft={<LayoutDashboard className="h-4 w-4" aria-hidden />}>
                {dashboardLabel(userType)}
              </Button>
              <button type="button" onClick={() => void signOut()} className="hidden min-h-11 rounded-full border border-[#E7E1E5] bg-white px-4 text-sm font-semibold text-cocoa transition hover:border-primary/30 hover:bg-porcelain hover:text-espresso lg:inline-flex lg:items-center lg:gap-2">
                <LogOut className="h-4 w-4" aria-hidden />
                Sign out
              </button>
            </>
          ) : (
            <>
              {!isLoginPage && (
                <Button href="/login" size="sm" variant="secondary" className="hidden min-h-11 px-4 shadow-none hover:shadow-card lg:inline-flex">
                  Log in
                </Button>
              )}
              <Button href="/companies/start" size="sm" className="hidden min-h-11 px-[18px] shadow-none hover:shadow-card lg:inline-flex">
                Build My Campaign
              </Button>
            </>
          )}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#ECE8EC] bg-white text-cocoa transition hover:border-primary/25 hover:bg-porcelain hover:text-espresso lg:hidden"
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
            className="fixed inset-0 z-40 cursor-default bg-espresso/10 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="lg:hidden">
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
              <div className="grid gap-3">
                {loggedIn ? (
                  <>
                    <Button href={dashboardPath(userType)} fullWidth iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>
                      {dashboardLabel(userType)}
                    </Button>
                    <Button type="button" fullWidth variant="secondary" onClick={() => void signOut()} iconLeft={<LogOut className="h-4 w-4" aria-hidden />}>
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button href="/companies/start" fullWidth iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>
                      Build My Campaign
                    </Button>
                    <Button href="/apply" fullWidth variant="secondary">
                      Apply as Creator
                    </Button>
                  </>
                )}
              </div>
              <nav className="mt-5 flex flex-col gap-1 border-t border-[#ECE8EC] pt-5 text-base font-semibold text-espresso" aria-label="Mobile navigation">
                {navLinks.map((link) => {
                  const active = pathname.startsWith(link.href.pathname);
                  return <Link
                    key={`mobile-${link.href.pathname}-${link.href.hash ?? 'root'}`}
                    href={link.href}
                    scroll
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-xl px-4 py-3 no-underline transition hover:bg-porcelain hover:text-espresso hover:no-underline ${active ? 'bg-porcelain text-espresso' : ''}`}
                  >
                    {link.label}
                  </Link>;
                })}
                {!loggedIn && !isLoginPage && (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 no-underline transition hover:bg-porcelain hover:text-espresso hover:no-underline"
                  >
                    Log in
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
