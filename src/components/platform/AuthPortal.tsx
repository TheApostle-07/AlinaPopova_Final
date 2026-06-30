'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';
import { ArrowRight, LockKeyhole, MailCheck, RefreshCw, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/Button';

type ApiResult<T> = {
  ok: boolean;
  error: string | null;
  data: T | null;
};

const readJson = async <T,>(response: Response): Promise<ApiResult<T>> => {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) as ApiResult<T> : { ok: false, error: 'The server returned an empty response.', data: null };
  } catch {
    return { ok: false, error: 'The server returned an invalid response.', data: null };
  }
};

export const AuthPortal = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'identifier' | 'otp'>('identifier');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [previewCode, setPreviewCode] = useState<string | null>(null);

  const requestOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setNotice('');
    const response = await fetch('/api/auth/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ identifier })
    });
    const payload = await readJson<{ previewCode: string | null; delivery: string }>(response);
    if (!payload.ok) {
      setError(payload.error ?? 'We could not send the code. Please try again shortly.');
      setLoading(false);
      return;
    }
    setPreviewCode(payload.data?.previewCode ?? null);
    setNotice(payload.data?.previewCode ? 'Development code generated. Use the preview code below to continue.' : 'Code sent. Enter it here to continue.');
    setStep('otp');
    setLoading(false);
  };

  const verifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ identifier, otp })
    });
    const payload = await readJson<{ redirectTo: string }>(response);
    if (!payload.ok) {
      setError(payload.error ?? 'That code could not be verified.');
      setLoading(false);
      return;
    }
    router.push((payload.data?.redirectTo ?? '/dashboard') as Route);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-softwhite">
      <section className="hero-surface relative px-5 py-10 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute left-1/2 top-8 h-[300px] w-[min(680px,90vw)] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-3xl" />
        <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1120px] items-center justify-center">
          <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="text-center lg:text-left">
              <BrandLogo className="justify-center lg:justify-start" />
              <p className="mt-10 inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Campaign OS</p>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-espresso sm:text-5xl lg:text-6xl">
                One login for campaigns, creators, tasks, files, and approvals.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-cocoa lg:text-lg">
                Verify once, then complete the right path for your role. Companies submit briefs. Creators set skills and boundaries. Teams work through clear assignments.
              </p>
              <div className="mt-8 grid gap-3 text-left sm:grid-cols-3 lg:max-w-2xl">
                {['OTP protected', 'Role-specific', 'Consent recorded'].map((item) => (
                  <div key={item} className="rounded-2xl border border-primary/10 bg-white/75 p-4 text-sm font-semibold text-espresso shadow-card">
                    <ShieldCheck className="mb-3 h-5 w-5 text-primary" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[40px] border border-primary/15 bg-white/90 p-6 shadow-soft backdrop-blur sm:p-8 lg:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary">
                {step === 'identifier' ? <LockKeyhole className="h-6 w-6" aria-hidden /> : <MailCheck className="h-6 w-6" aria-hidden />}
              </div>
              <h2 className="mt-7 font-display text-3xl font-semibold text-espresso">{step === 'identifier' ? 'Sign in or register' : 'Enter verification code'}</h2>
              <p className="mt-3 text-sm leading-7 text-cocoa">
                {step === 'identifier'
                  ? 'Use your email or phone number. If your account does not exist yet, we will guide you through registration after verification.'
                  : `We sent a 6-digit code to ${identifier}.`}
              </p>

              {step === 'identifier' ? (
                <form onSubmit={requestOtp} className="mt-8 space-y-5">
                  <label className="block text-sm font-semibold text-espresso">
                    Email or phone / WhatsApp
                    <input
                      value={identifier}
                      onChange={(event) => setIdentifier(event.target.value)}
                      placeholder="Example: alina@example.com or +91 98765 43210"
                      className="mt-2 min-h-[54px] w-full rounded-[20px] border border-[#ECE8EC] bg-white px-4 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </label>
                  <Button type="submit" size="lg" fullWidth disabled={loading || !identifier.trim()} iconRight={loading ? <RefreshCw className="h-4 w-4 animate-spin" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}>
                    {loading ? 'Sending code...' : 'Send secure code'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={verifyOtp} className="mt-8 space-y-5">
                  <label className="block text-sm font-semibold text-espresso">
                    6-digit code
                    <input
                      value={otp}
                      onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="Enter code"
                      className="mt-2 min-h-[58px] w-full rounded-[20px] border border-[#ECE8EC] bg-white px-4 text-center font-display text-2xl tracking-[0.35em] text-espresso outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </label>
                  {previewCode && <div className="rounded-2xl border border-primary/15 bg-porcelain p-4 text-sm text-cocoa"><span className="font-semibold text-espresso">Development preview code:</span> {previewCode}</div>}
                  <Button type="submit" size="lg" fullWidth disabled={loading || otp.length !== 6} iconRight={loading ? <RefreshCw className="h-4 w-4 animate-spin" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}>
                    {loading ? 'Verifying...' : 'Verify and continue'}
                  </Button>
                  <button type="button" onClick={() => { setStep('identifier'); setOtp(''); setPreviewCode(null); }} className="w-full text-sm font-semibold text-primary hover:text-hotpink">
                    Use another email or phone
                  </button>
                </form>
              )}

              {notice && <p className="mt-5 rounded-2xl border border-sage/20 bg-sage/10 p-4 text-sm text-[#527057]">{notice}</p>}
              {error && <p role="alert" className="mt-5 rounded-2xl border border-merlot/25 bg-merlot/10 p-4 text-sm text-merlot">{error}</p>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
