'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Route } from 'next';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, LockKeyhole, MailCheck, RefreshCw, ShieldCheck } from 'lucide-react';
import { OtpInput } from '@/components/platform/OtpInput';
import { Button } from '@/components/ui/Button';

type ApiResult<T> = {
  ok: boolean;
  error: string | null;
  data: T | null;
};

const OTP_LENGTH = 6;

const readJson = async <T,>(response: Response): Promise<ApiResult<T>> => {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) as ApiResult<T> : { ok: false, error: 'The server returned an empty response.', data: null };
  } catch {
    return { ok: false, error: 'The server returned an invalid response.', data: null };
  }
};

const isValidIdentifier = (value: string) => {
  const trimmed = value.trim();
  const compactPhone = trimmed.replace(/[\s-]/g, '');
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || /^\+?[0-9]{10,15}$/.test(compactPhone);
};

const maskIdentifier = (value: string) => {
  const trimmed = value.trim();
  if (trimmed.includes('@')) {
    const [name, domain] = trimmed.split('@');
    const first = name[0] ?? '';
    const last = name.length > 1 ? name[name.length - 1] : '';
    return `${first}${'•'.repeat(Math.min(Math.max(name.length - 2, 4), 10))}${last}@${domain}`;
  }
  const compact = trimmed.replace(/[^\d+]/g, '');
  const visible = compact.slice(-4);
  return `${compact.startsWith('+') ? '+' : ''}${'•'.repeat(8)}${visible}`;
};

const safeInternalPath = (value: string | null) => {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('://')) return '';
  if (value.startsWith('/login')) return '';
  return value;
};

const withPreservedIntent = (path: string, intent: string, invite: string, next: string) => {
  const safePath = safeInternalPath(path) || '/dashboard';
  const params = new URLSearchParams();
  if (intent) params.set('intent', intent);
  if (invite) params.set('invite', invite);
  if (next) params.set('next', next);
  const query = params.toString();
  return query ? `${safePath}?${query}` : safePath;
};

const homePathForUserType = (userType: string) => {
  if (userType === 'admin') return '/admin';
  if (userType === 'campaign_manager') return '/workspace';
  if (userType === 'company') return '/dashboard/company';
  if (userType === 'specialist') return '/dashboard/workspace';
  if (userType === 'client') return '/dashboard/client';
  return '/dashboard/creator';
};

const trustCards = [
  { title: 'Secure verification', copy: 'Access is protected with a one-time code.', icon: ShieldCheck },
  { title: 'Right next step', copy: 'After verification, we guide you to the correct profile or dashboard.', icon: ArrowRight },
  { title: 'Privacy first', copy: 'Your details are used only to continue your request or account.', icon: LockKeyhole }
];

export const AuthPortal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intent = searchParams.get('intent') ?? '';
  const invite = searchParams.get('invite') ?? '';
  const nextPath = safeInternalPath(searchParams.get('next'));
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'identifier' | 'otp'>('identifier');
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [resendSeconds, setResendSeconds] = useState(0);
  const [previewCode, setPreviewCode] = useState<string | null>(null);
  const [activeHomePath, setActiveHomePath] = useState('');
  const lastSubmittedCode = useRef('');

  const maskedIdentifier = useMemo(() => maskIdentifier(identifier), [identifier]);
  useEffect(() => {
    if (resendSeconds <= 0) return undefined;
    const interval = window.setInterval(() => setResendSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [resendSeconds]);

  useEffect(() => {
    let active = true;
    void (async () => {
      const response = await fetch('/api/auth/status', { headers: { Accept: 'application/json' }, cache: 'no-store' }).catch(() => null);
      if (!response?.ok || !active) return;
      const payload = await readJson<{ authenticated: boolean; userType: string | null }>(response);
      if (payload.ok && payload.data?.authenticated && payload.data.userType) setActiveHomePath(homePathForUserType(payload.data.userType));
    })();
    return () => {
      active = false;
    };
  }, []);

  const sendOtp = async () => {
    const cleanIdentifier = identifier.trim();
    setError('');
    setNotice('');
    if (!cleanIdentifier) {
      setError('Enter your email or phone to continue.');
      return;
    }
    if (!isValidIdentifier(cleanIdentifier)) {
      setError('Enter a valid email address or phone number.');
      return;
    }
    setSending(true);
    const response = await fetch('/api/auth/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ identifier: cleanIdentifier })
    });
    const payload = await readJson<{ previewCode: string | null; delivery: string; resendAfterSeconds?: number }>(response);
    setSending(false);
    if (!payload.ok) {
      setError(payload.error ?? 'We could not send the code. Please try again shortly.');
      return;
    }
    setIdentifier(cleanIdentifier);
    setOtp('');
    lastSubmittedCode.current = '';
    setPreviewCode(payload.data?.previewCode ?? null);
    setResendSeconds(payload.data?.resendAfterSeconds ?? 60);
    setNotice(payload.data?.previewCode ? 'Development code generated. Enter it here to continue.' : 'A new code has been sent.');
    setStep('otp');
  };

  const verifyCode = useCallback(async (code: string, force = false) => {
    if (code.length !== OTP_LENGTH || verifying || verified) return;
    if (!force && lastSubmittedCode.current === code) return;
    lastSubmittedCode.current = code;
    setVerifying(true);
    setError('');
    setNotice('');
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ identifier, otp: code })
    });
    const payload = await readJson<{ redirectTo: string }>(response);
    setVerifying(false);
    if (!payload.ok) {
      setError(payload.error ?? 'That code is not correct. Please check and try again.');
      setOtp('');
      return;
    }
    setVerified(true);
    setNotice('Code verified. Taking you to the next step...');
    const apiTarget = payload.data?.redirectTo ?? '/dashboard';
    const target = nextPath || (apiTarget === '/register' ? '/onboarding/role' : apiTarget);
    router.push(withPreservedIntent(target, intent, invite, nextPath) as Route);
  }, [identifier, intent, invite, nextPath, router, verified, verifying]);

  const resetIdentifierStep = () => {
    setStep('identifier');
    setOtp('');
    setPreviewCode(null);
    setNotice('');
    setError('');
    lastSubmittedCode.current = '';
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (value !== lastSubmittedCode.current) setError('');
  };

  const handleUseAnotherAccount = async () => {
    await fetch('/api/auth/logout', { method: 'POST', headers: { Accept: 'application/json' } }).catch(() => null);
    setActiveHomePath('');
    setIdentifier('');
    resetIdentifierStep();
    setNotice('You can now use another email or phone.');
  };

  return (
    <section
      className="relative overflow-hidden bg-[#FFFBFD] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      style={{
        background:
          'radial-gradient(circle at 50% 0%, rgba(199, 53, 114, 0.10), transparent 34%), radial-gradient(circle at 20% 25%, rgba(233, 161, 191, 0.10), transparent 28%), radial-gradient(circle at 80% 20%, rgba(200, 169, 106, 0.07), transparent 26%), linear-gradient(180deg, #ffffff 0%, #fff8fb 54%, #ffffff 100%)'
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[min(720px,88vw)] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-[1120px] text-center">
        <p className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-[0_10px_30px_rgba(17,16,20,0.04)]">
          Secure Login
        </p>
        <h1 className="mx-auto mt-6 max-w-[760px] font-display text-[38px] font-semibold leading-[1.02] tracking-[-0.05em] text-espresso sm:text-5xl lg:text-6xl">
          Log in or start your profile.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-cocoa">
          Use one secure login to continue your company brief, creator application, or Alina Popova Studio account.
        </p>

        <div className="mx-auto mt-10 max-w-[520px] rounded-[38px] border border-primary/15 bg-white p-6 text-left shadow-[0_28px_90px_rgba(17,16,20,0.08)] sm:p-9 lg:p-11">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary shadow-[0_12px_28px_rgba(199,53,114,0.08)]">
            {activeHomePath ? <CheckCircle2 className="h-6 w-6" aria-hidden /> : step === 'identifier' ? <LockKeyhole className="h-6 w-6" aria-hidden /> : verified ? <CheckCircle2 className="h-6 w-6" aria-hidden /> : <MailCheck className="h-6 w-6" aria-hidden />}
          </div>

          {activeHomePath ? (
            <div className="mt-7 text-center">
              <h2 className="font-display text-3xl font-semibold leading-tight text-espresso">You&apos;re already logged in.</h2>
              <p className="mt-3 text-sm leading-7 text-cocoa">Continue to your account or switch to another email or phone.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Button href={activeHomePath} size="lg" fullWidth>Continue</Button>
                <Button type="button" size="lg" fullWidth variant="secondary" onClick={() => void handleUseAnotherAccount()}>
                  Use another account
                </Button>
              </div>
            </div>
          ) : step === 'identifier' ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendOtp();
              }}
              className="mt-7 space-y-5"
            >
              <div className="text-center">
                <h2 className="font-display text-3xl font-semibold leading-tight text-espresso">Continue securely</h2>
                <p className="mt-3 text-sm leading-7 text-cocoa">Enter your email or phone. We&apos;ll send a 6-digit code to verify it&apos;s you.</p>
              </div>
              <label className="block text-sm font-semibold text-espresso">
                Email or phone
                <input
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder="alina@example.com or +91 98765 43210"
                  autoComplete="email"
                  className="mt-2 min-h-[56px] w-full rounded-[20px] border border-[#ECE8EC] bg-white px-4 text-base outline-none transition placeholder:text-cocoa/55 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <Button type="submit" size="lg" fullWidth disabled={sending} iconRight={sending ? <RefreshCw className="h-4 w-4 animate-spin" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}>
                {sending ? 'Sending code...' : 'Send verification code'}
              </Button>
              <p className="text-center text-sm leading-6 text-cocoa">New here? Use the same email or phone and we&apos;ll guide you to the right next step.</p>
            </form>
          ) : (
            <div className="mt-7">
              <div className="text-center">
                <h2 className="font-display text-3xl font-semibold leading-tight text-espresso">Enter verification code</h2>
                <p className="mt-3 text-sm leading-7 text-cocoa">We sent a 6-digit code to {maskedIdentifier}.</p>
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void verifyCode(otp, true);
                }}
                className="mt-7 space-y-5"
              >
                <div>
                  <p id="otp-help" className="mb-3 text-center text-sm font-semibold text-espresso">6-digit code</p>
                  <OtpInput
                    value={otp}
                    onChange={handleOtpChange}
                    onComplete={(value) => void verifyCode(value)}
                    disabled={verifying || verified}
                    error={Boolean(error)}
                    describedBy="otp-help otp-status"
                  />
                </div>
                {previewCode && <div className="rounded-2xl border border-primary/15 bg-porcelain p-4 text-sm text-cocoa"><span className="font-semibold text-espresso">Development preview code:</span> {previewCode}</div>}
                <Button type="submit" size="lg" fullWidth disabled={otp.length !== OTP_LENGTH || verifying || verified} iconRight={verifying ? <RefreshCw className="h-4 w-4 animate-spin" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}>
                  {verified ? 'Verified. Taking you forward...' : verifying ? 'Verifying...' : error ? 'Try again' : 'Verify and continue'}
                </Button>
              </form>
              <div className="mt-5 flex flex-col items-center justify-center gap-3 text-sm font-semibold sm:flex-row sm:gap-5">
                <button
                  type="button"
                  disabled={sending || resendSeconds > 0}
                  onClick={() => void sendOtp()}
                  className="text-primary transition hover:text-hotpink disabled:cursor-not-allowed disabled:text-cocoa"
                >
                  {resendSeconds > 0 ? `Resend code in ${resendSeconds}s` : 'Resend code'}
                </button>
                <button type="button" onClick={resetIdentifierStep} className="text-primary transition hover:text-hotpink">
                  Use another email or phone
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 min-h-[56px]" aria-live="polite">
            {notice && <p id="otp-status" className="rounded-2xl border border-sage/20 bg-sage/10 p-4 text-center text-sm text-[#527057]">{notice}</p>}
            {error && <p id="otp-status" role="alert" className="rounded-2xl border border-merlot/25 bg-merlot/10 p-4 text-center text-sm text-merlot">{error}</p>}
          </div>
          <div className="mt-6 border-t border-[#ECE8EC] pt-5">
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-cocoa">
              <Link href="/terms" className="hover:text-primary">Terms</Link>
              <Link href="/privacy" className="hover:text-primary">Privacy</Link>
              <Link href="/safety" className="hover:text-primary">Safety</Link>
              <Link href="/contact" className="hover:text-primary">Contact support</Link>
            </div>
            <p className="mt-3 text-center text-xs leading-5 text-cocoa">Having trouble? Contact support and include the email or phone you are using.</p>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-[960px] gap-4 md:grid-cols-3">
          {trustCards.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="flex h-full flex-col rounded-[28px] border border-primary/10 bg-white/82 p-6 text-left shadow-[0_12px_35px_rgba(17,16,20,0.05)]">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
                <h2 className="mt-4 text-base font-semibold text-espresso">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-cocoa">{item.copy}</p>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
