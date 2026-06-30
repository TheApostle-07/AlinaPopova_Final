'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';
import { ArrowRight, Building2, Check, FileCheck2, Sparkles, UserRound, UsersRound } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/Button';
import {
  BUDGET_RANGES,
  COMPANY_BUSINESS_CATEGORIES,
  COMPANY_GOALS,
  COMPANY_PLATFORMS,
  COMPANY_SERVICE_GROUPS,
  CREATOR_AVAILABILITY,
  CREATOR_CATEGORIES,
  CREATOR_EXPERIENCE,
  CREATOR_FORMATS,
  CREATOR_ROLES,
  TIMELINES,
  USAGE_RIGHTS,
  type IntakeOption
} from '@/lib/intake-options';
import { CREATOR_ROLE_CATALOG } from '@/lib/creator-roles';

type Path = 'creator' | 'company' | 'specialist';

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

const pathCards = [
  { value: 'company', title: 'I am a company', copy: 'I need creators, content, livestreams, campaigns, or follow-up systems.', icon: Building2 },
  { value: 'creator', title: 'I am a creator / talent', copy: 'I want to apply for brand-safe creator or campaign opportunities.', icon: UserRound },
  { value: 'specialist', title: 'I am a specialist', copy: 'I edit, write, design, shoot, coordinate, or support campaign work.', icon: Sparkles }
] as const;

const serviceOptions = COMPANY_SERVICE_GROUPS.flatMap((group) => group.options);

const emptyForm = {
  userType: '' as Path | '',
  name: '',
  email: '',
  phone: '',
  city: '',
  area: '',
  languagePreference: 'English',
  communicationPreference: 'Email',
  companyName: '',
  companyCategory: '',
  website: '',
  instagram: '',
  youtube: '',
  goals: [] as string[],
  platforms: [] as string[],
  servicesNeeded: [] as string[],
  budgetRange: '',
  timeline: '',
  usageRightsNeed: '',
  message: '',
  ageConfirmed: false,
  selectedRoles: [] as string[],
  creatorPlatforms: [] as string[],
  categories: [] as string[],
  availability: [] as string[],
  experienceLevel: '',
  expectedPayout: '',
  boundaries: '',
  instagramPortfolio: '',
  youtubePortfolio: '',
  portfolio: '',
  roleNotes: {} as Record<string, string>,
  legalAccepted: false
};

const toggle = (items: string[], value: string) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value];

const Field = ({ label, children, helper }: { label: string; children: React.ReactNode; helper?: string }) => (
  <label className="block text-sm font-semibold text-espresso">
    {label}
    {children}
    {helper && <span className="mt-2 block text-xs font-medium leading-5 text-cocoa">{helper}</span>}
  </label>
);

const inputClass = 'mt-2 min-h-[52px] w-full rounded-[20px] border border-[#ECE8EC] bg-white px-4 text-sm text-espresso outline-none transition placeholder:text-cocoa/55 focus:border-primary focus:ring-4 focus:ring-primary/10';

const ChoiceGrid = ({ options, selected, onToggle, columns = 'sm:grid-cols-2 lg:grid-cols-3' }: { options: IntakeOption[]; selected: string[]; onToggle: (value: string) => void; columns?: string }) => (
  <div className={`grid gap-3 ${columns}`}>
    {options.map((option) => {
      const active = selected.includes(option.value);
      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onToggle(option.value)}
          className={`flex min-h-[58px] items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition ${active ? 'border-primary bg-porcelain text-primary shadow-card' : 'border-[#ECE8EC] bg-white text-espresso hover:border-primary/25 hover:bg-porcelain/70'}`}
          aria-pressed={active}
        >
          {option.label}
          {active && <Check className="h-4 w-4" aria-hidden />}
        </button>
      );
    })}
  </div>
);

export const RegistrationWizard = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isCreatorPath = form.userType === 'creator' || form.userType === 'specialist';
  const selectedRoleCatalog = useMemo(
    () => CREATOR_ROLE_CATALOG.filter((role) => form.selectedRoles.includes(role.value)),
    [form.selectedRoles]
  );

  const set = <K extends keyof typeof emptyForm>(key: K, value: typeof emptyForm[K]) => setForm((current) => ({ ...current, [key]: value }));
  const canContinue = step === 0
    ? Boolean(form.userType)
    : step === 1
      ? form.name.length >= 3 && form.city.length >= 2 && form.area.length >= 2 && (form.email || form.phone)
      : true;

  const submit = async () => {
    setSubmitting(true);
    setError('');
    const body = {
      userType: form.userType,
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      area: form.area,
      languagePreference: form.languagePreference,
      communicationPreference: form.communicationPreference,
      legalAccepted: form.legalAccepted,
      ...(isCreatorPath ? {
        ageConfirmed: form.ageConfirmed,
        selectedRoles: form.selectedRoles,
        platforms: form.creatorPlatforms,
        categories: form.categories,
        availability: form.availability,
        experienceLevel: form.experienceLevel,
        expectedPayout: form.expectedPayout,
        boundaries: form.boundaries,
        portfolioLinks: {
          instagram: form.instagramPortfolio,
          youtube: form.youtubePortfolio,
          portfolio: form.portfolio
        },
        roleDetails: Object.fromEntries(Object.entries(form.roleNotes).filter(([, value]) => value.trim()).map(([key, value]) => [key, { notes: value.trim() }]))
      } : {
        companyName: form.companyName,
        companyCategory: form.companyCategory,
        website: form.website,
        instagram: form.instagram,
        youtube: form.youtube,
        goals: form.goals,
        platforms: form.platforms,
        servicesNeeded: form.servicesNeeded,
        budgetRange: form.budgetRange,
        timeline: form.timeline,
        usageRightsNeed: form.usageRightsNeed,
        message: form.message
      })
    };
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body)
    });
    const payload = await readJson<{ redirectTo: string }>(response);
    if (!payload.ok) {
      setError(payload.error ?? 'Something went wrong while creating your account. Please try again.');
      setSubmitting(false);
      return;
    }
    router.push((payload.data?.redirectTo ?? '/dashboard') as Route);
  };

  return (
    <main className="min-h-screen bg-softwhite">
      <section className="hero-surface px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1180px]">
          <BrandLogo />
          <div className="mt-8 rounded-[44px] border border-primary/15 bg-white/90 p-6 shadow-soft sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Registration</p>
                <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-espresso sm:text-5xl">Set up your platform profile.</h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-cocoa sm:text-base">Choose the path that fits you. The platform will collect only the details needed for review, matching, project work, consent, and professional collaboration.</p>
              </div>
              <div className="rounded-full border border-primary/15 bg-porcelain px-4 py-2 text-sm font-semibold text-primary">Step {step + 1} of 4</div>
            </div>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-champagne">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / 4) * 100}%` }} />
            </div>

            {step === 0 && (
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {pathCards.map((card) => {
                  const Icon = card.icon;
                  const active = form.userType === card.value;
                  return (
                    <button
                      key={card.value}
                      type="button"
                      onClick={() => set('userType', card.value)}
                      className={`group rounded-[34px] border p-7 text-left transition hover:-translate-y-1 hover:shadow-soft ${active ? 'border-primary bg-porcelain shadow-card' : 'border-[#ECE8EC] bg-white'}`}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-white text-primary"><Icon className="h-6 w-6" aria-hidden /></span>
                      <h2 className="mt-7 font-display text-2xl font-semibold text-espresso">{card.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-cocoa">{card.copy}</p>
                      <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">Use this path <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden /></span>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 1 && (
              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                <Field label="Full name"><input className={inputClass} value={form.name} onChange={(event) => set('name', event.target.value)} placeholder="Example: Alina Sharma" /></Field>
                <Field label="Email address"><input className={inputClass} value={form.email} onChange={(event) => set('email', event.target.value)} placeholder="Example: alina@example.com" /></Field>
                <Field label="Phone / WhatsApp number" helper="Use the same number if you verified by phone."><input className={inputClass} value={form.phone} onChange={(event) => set('phone', event.target.value)} placeholder="Example: +91 98765 43210" /></Field>
                <Field label="City"><input className={inputClass} value={form.city} onChange={(event) => set('city', event.target.value)} placeholder="Example: Mumbai, Surat, Ahmedabad, Delhi" /></Field>
                <Field label="Area / locality" helper="This helps us understand location fit for shoots, events, or studio work."><input className={inputClass} value={form.area} onChange={(event) => set('area', event.target.value)} placeholder="Example: Bandra West, Vesu, Adajan, Andheri West" /></Field>
                <Field label="Communication preference"><select className={inputClass} value={form.communicationPreference} onChange={(event) => set('communicationPreference', event.target.value)}><option>Email</option><option>WhatsApp</option><option>Phone call</option><option>In-app only</option></select></Field>
              </div>
            )}

            {step === 2 && isCreatorPath && (
              <div className="mt-10 space-y-10">
                <section>
                  <h2 className="font-display text-2xl font-semibold text-espresso">Role preferences</h2>
                  <p className="mt-2 text-sm leading-6 text-cocoa">Select every role that fits you. You can apply for on-camera or behind-the-scenes work.</p>
                  <div className="mt-5"><ChoiceGrid options={CREATOR_ROLES} selected={form.selectedRoles} onToggle={(value) => set('selectedRoles', toggle(form.selectedRoles, value))} /></div>
                </section>
                <section>
                  <h2 className="font-display text-2xl font-semibold text-espresso">Formats, availability, and categories</h2>
                  <div className="mt-5 space-y-7">
                    <ChoiceGrid options={CREATOR_FORMATS} selected={form.creatorPlatforms} onToggle={(value) => set('creatorPlatforms', toggle(form.creatorPlatforms, value))} />
                    <ChoiceGrid options={CREATOR_AVAILABILITY} selected={form.availability} onToggle={(value) => set('availability', toggle(form.availability, value))} />
                    <ChoiceGrid options={CREATOR_CATEGORIES} selected={form.categories} onToggle={(value) => set('categories', toggle(form.categories, value))} />
                  </div>
                </section>
                <div className="grid gap-5 lg:grid-cols-2">
                  <Field label="Experience level" helper="Beginners can apply. Selection depends on fit, reliability, availability, safety, and campaign needs."><select className={inputClass} value={form.experienceLevel} onChange={(event) => set('experienceLevel', event.target.value)}><option value="">Choose experience level</option>{CREATOR_EXPERIENCE.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
                  <Field label="Expected payout for paid work" helper="Optional. Final payout depends on scope, role, usage rights, and written terms."><input className={inputClass} value={form.expectedPayout} onChange={(event) => set('expectedPayout', event.target.value)} placeholder="Example: Rs 2,000 per reel, Rs 5,000 per shoot, or open to discussion" /></Field>
                  <Field label="Instagram or portfolio link"><input className={inputClass} value={form.instagramPortfolio} onChange={(event) => set('instagramPortfolio', event.target.value)} placeholder="Example: https://instagram.com/yourusername" /></Field>
                  <Field label="Other work sample link"><input className={inputClass} value={form.portfolio} onChange={(event) => set('portfolio', event.target.value)} placeholder="Example: Google Drive, Behance, YouTube, or website link" /></Field>
                </div>
                {selectedRoleCatalog.length > 0 && (
                  <section>
                    <h2 className="font-display text-2xl font-semibold text-espresso">Role-specific notes</h2>
                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                      {selectedRoleCatalog.slice(0, 4).map((role) => (
                        <Field key={role.value} label={role.title} helper={role.questions.map((question) => question.label).join(' · ')}>
                          <textarea className={`${inputClass} min-h-[130px] py-4`} value={form.roleNotes[role.value] ?? ''} onChange={(event) => set('roleNotes', { ...form.roleNotes, [role.value]: event.target.value })} placeholder="Share tools, comfort level, sample links, turnaround, or anything important for this role." />
                        </Field>
                      ))}
                    </div>
                  </section>
                )}
                <Field label="Boundaries or work you are not comfortable doing" helper="We store this so you are not matched with unsuitable opportunities."><textarea className={`${inputClass} min-h-[130px] py-4`} value={form.boundaries} onChange={(event) => set('boundaries', event.target.value)} placeholder="Example: No late-night shoots, no travel outside city, no revealing outfits, no alcohol brands." /></Field>
              </div>
            )}

            {step === 2 && form.userType === 'company' && (
              <div className="mt-10 space-y-10">
                <div className="grid gap-5 lg:grid-cols-2">
                  <Field label="Company / brand name"><input className={inputClass} value={form.companyName} onChange={(event) => set('companyName', event.target.value)} placeholder="Example: GlowSkin Studio" /></Field>
                  <Field label="Business category"><select className={inputClass} value={form.companyCategory} onChange={(event) => set('companyCategory', event.target.value)}><option value="">Choose the closest category</option>{COMPANY_BUSINESS_CATEGORIES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
                  <Field label="Website"><input className={inputClass} value={form.website} onChange={(event) => set('website', event.target.value)} placeholder="Example: https://yourbrand.com" /></Field>
                  <Field label="Instagram"><input className={inputClass} value={form.instagram} onChange={(event) => set('instagram', event.target.value)} placeholder="Example: https://instagram.com/yourbrand" /></Field>
                </div>
                <section><h2 className="font-display text-2xl font-semibold text-espresso">Campaign goal</h2><div className="mt-5"><ChoiceGrid options={COMPANY_GOALS} selected={form.goals} onToggle={(value) => set('goals', toggle(form.goals, value))} /></div></section>
                <section><h2 className="font-display text-2xl font-semibold text-espresso">Platforms</h2><div className="mt-5"><ChoiceGrid options={COMPANY_PLATFORMS} selected={form.platforms} onToggle={(value) => set('platforms', toggle(form.platforms, value))} /></div></section>
                <section><h2 className="font-display text-2xl font-semibold text-espresso">Services needed</h2><div className="mt-5"><ChoiceGrid options={serviceOptions} selected={form.servicesNeeded} onToggle={(value) => set('servicesNeeded', toggle(form.servicesNeeded, value))} /></div></section>
                <div className="grid gap-5 lg:grid-cols-3">
                  <Field label="Estimated budget"><select className={inputClass} value={form.budgetRange} onChange={(event) => set('budgetRange', event.target.value)}><option value="">Choose budget range</option>{BUDGET_RANGES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
                  <Field label="When do you want to start?"><select className={inputClass} value={form.timeline} onChange={(event) => set('timeline', event.target.value)}><option value="">Choose timeline</option>{TIMELINES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
                  <Field label="Usage rights need"><select className={inputClass} value={form.usageRightsNeed} onChange={(event) => set('usageRightsNeed', event.target.value)}><option value="">Choose usage rights</option>{USAGE_RIGHTS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
                </div>
                <Field label="Tell us what you want to build, promote, or improve"><textarea className={`${inputClass} min-h-[140px] py-4`} value={form.message} onChange={(event) => set('message', event.target.value)} placeholder="Example: We are launching a skincare product and need UGC videos, Reels, and one Instagram Live with a trained host." /></Field>
              </div>
            )}

            {step === 3 && (
              <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[30px] border border-primary/15 bg-porcelain p-6">
                  <FileCheck2 className="h-7 w-7 text-primary" aria-hidden />
                  <h2 className="mt-5 font-display text-2xl font-semibold text-espresso">Review and agree</h2>
                  <p className="mt-3 text-sm leading-7 text-cocoa">
                    Your profile will be submitted for review. Paid commercial opportunities require written scope, payout, usage rights, and acceptance before work begins.
                  </p>
                </div>
                <div className="rounded-[30px] border border-[#ECE8EC] bg-white p-6">
                  <dl className="grid gap-4 text-sm text-cocoa sm:grid-cols-2">
                    <div><dt className="font-semibold text-espresso">Path</dt><dd className="capitalize">{form.userType || 'Not selected'}</dd></div>
                    <div><dt className="font-semibold text-espresso">Name</dt><dd>{form.name || 'Not provided'}</dd></div>
                    <div><dt className="font-semibold text-espresso">Location</dt><dd>{[form.area, form.city].filter(Boolean).join(', ') || 'Not provided'}</dd></div>
                    <div><dt className="font-semibold text-espresso">Primary details</dt><dd>{isCreatorPath ? `${form.selectedRoles.length} role(s) selected` : form.companyName || 'Company not provided'}</dd></div>
                  </dl>
                  {isCreatorPath && <label className="mt-7 flex gap-3 rounded-2xl border border-primary/15 bg-porcelain p-4 text-sm font-semibold text-espresso"><input type="checkbox" checked={form.ageConfirmed} onChange={(event) => set('ageConfirmed', event.target.checked)} />I confirm I am 18 years or older.</label>}
                  <label className="mt-4 flex gap-3 rounded-2xl border border-primary/15 bg-porcelain p-4 text-sm font-semibold text-espresso"><input type="checkbox" checked={form.legalAccepted} onChange={(event) => set('legalAccepted', event.target.checked)} />I agree to the Terms, Privacy Policy, agreement summary, Content Usage Policy, Payment Policy, and Safety Policy.</label>
                  <p className="mt-4 text-xs leading-6 text-cocoa">{isCreatorPath ? 'Applying is free and does not guarantee selection, work, income, training, or opportunities.' : 'Campaign pricing, deliverables, timelines, creator availability, usage rights, and outcomes are confirmed only through written proposal or agreement. Sales, likes, shares, followers, and virality are not guaranteed.'}</p>
                  {error && <p role="alert" className="mt-5 rounded-2xl border border-merlot/25 bg-merlot/10 p-4 text-sm text-merlot">{error}</p>}
                  <Button type="button" size="lg" className="mt-6" fullWidth disabled={submitting || !form.legalAccepted || (isCreatorPath && !form.ageConfirmed)} onClick={() => void submit()}>
                    {submitting ? 'Submitting...' : isCreatorPath ? 'Submit Creator Profile' : 'Submit Company Brief'}
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-[#ECE8EC] pt-7 sm:flex-row sm:justify-between">
              <Button type="button" variant="secondary" onClick={() => step === 0 ? router.push('/login') : setStep((current) => current - 1)}>
                {step === 0 ? 'Back to login' : 'Back'}
              </Button>
              {step < 3 && <Button type="button" disabled={!canContinue} onClick={() => setStep((current) => current + 1)} iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Continue</Button>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
