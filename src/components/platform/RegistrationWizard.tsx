'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';
import clsx from 'clsx';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  FileCheck2,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound
} from 'lucide-react';
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
  labelsFor,
  type IntakeOption
} from '@/lib/intake-options';
import { CREATOR_ROLE_CATALOG } from '@/lib/creator-roles';

type Path = 'creator' | 'company' | 'specialist' | 'invite';
type VerifiedIdentifier = { identifier: string; identifierType: 'email' | 'phone' } | null;

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
  { value: 'company', title: "I'm a company", copy: 'I want creator-led marketing, content, livestreams, product demos, or a campaign package.', icon: Building2 },
  { value: 'creator', title: "I'm a creator / talent", copy: 'I want to apply for brand-safe creator, model, host, editing, writing, design, or campaign roles.', icon: UserRound },
  { value: 'specialist', title: "I'm a specialist", copy: 'I edit, write, design, shoot, coordinate, or support campaigns behind the scenes.', icon: Sparkles },
  { value: 'invite', title: 'I have an invite', copy: 'I was invited to review campaign work or collaborate with Alina Popova Studio.', icon: UsersRound }
] as const;

const companyStepLabels = [
  'Step 1 — Choose your path',
  'Step 2 — Account details',
  'Step 3 — Company details',
  'Step 4 — Review and submit'
] as const;

const creatorStepLabels = [
  'Step 1 — Choose your path',
  'Step 2 — Account details',
  'Step 3 — Roles',
  'Step 4 — Preferences',
  'Step 5 — Portfolio and boundaries',
  'Step 6 — Review and submit'
] as const;

const serviceOptions = COMPANY_SERVICE_GROUPS.flatMap((group) => group.options);

const roleCategorySections = [
  {
    title: 'On-camera roles',
    roles: ['ugc_creator', 'model', 'live_host', 'presenter', 'influencer']
  },
  {
    title: 'Creative production',
    roles: ['video_editor', 'scriptwriter', 'photographer', 'videographer', 'graphic_designer', 'motion_designer', 'voiceover']
  },
  {
    title: 'Campaign support',
    roles: ['social_manager', 'campaign_coordinator', 'makeup_stylist', 'other']
  }
] as const;

const roleDescriptions: Record<string, string> = {
  ugc_creator: 'Product videos, demos, reels, and short-form content.',
  model: 'Brand shoots, product modelling, and lifestyle visuals.',
  live_host: 'Instagram Live, YouTube Live, launches, and product demos.',
  presenter: 'Explainers, interviews, announcements, and brand videos.',
  influencer: 'Social creator content, audience trust, and platform reach.',
  video_editor: 'Reels, Shorts, captions, hooks, and campaign edits.',
  scriptwriter: 'Hooks, UGC scripts, captions, and product angles.',
  photographer: 'Product photos, portraits, events, and visual assets.',
  videographer: 'Creator shoots, reels production, events, and BTS.',
  graphic_designer: 'Thumbnails, carousels, campaign graphics, and ad visuals.',
  motion_designer: 'Motion assets, logo animation, and kinetic typography.',
  voiceover: 'Clean narration for ads, explainers, reels, and YouTube.',
  social_manager: 'Content calendars, captions, scheduling, and reporting.',
  campaign_coordinator: 'Scheduling, communication, tracking, and delivery support.',
  makeup_stylist: 'Makeup, grooming, styling, and shoot preparation.',
  other: 'A creative or campaign support role not listed here.'
};

const formatValuesByRole: Record<string, string[]> = {
  ugc_creator: ['instagram_reels', 'instagram_stories', 'youtube_shorts', 'ugc_video', 'product_demo', 'brand_shoot'],
  model: ['brand_shoot', 'instagram_reels', 'instagram_stories', 'product_demo', 'event'],
  live_host: ['instagram_live', 'youtube_live', 'live_shopping', 'product_demo', 'webinar'],
  presenter: ['youtube_video', 'product_demo', 'webinar', 'event', 'instagram_reels'],
  influencer: ['instagram_reels', 'instagram_stories', 'youtube_shorts', 'ugc_video', 'brand_shoot'],
  video_editor: ['instagram_reels', 'youtube_shorts', 'youtube_video', 'ugc_video', 'editing_only'],
  scriptwriter: ['writing_only', 'ugc_video', 'product_demo', 'instagram_reels', 'youtube_video'],
  photographer: ['brand_shoot', 'event', 'behind_scenes', 'product_demo'],
  videographer: ['brand_shoot', 'event', 'behind_scenes', 'instagram_reels', 'youtube_shorts'],
  graphic_designer: ['behind_scenes', 'editing_only'],
  motion_designer: ['editing_only', 'youtube_video', 'instagram_reels'],
  voiceover: ['youtube_video', 'ugc_video', 'product_demo'],
  social_manager: ['instagram_reels', 'instagram_stories', 'youtube_shorts', 'behind_scenes'],
  campaign_coordinator: ['behind_scenes', 'event', 'webinar'],
  makeup_stylist: ['brand_shoot', 'event', 'behind_scenes'],
  other: ['behind_scenes']
};

const createEmptyForm = (verifiedIdentifier?: VerifiedIdentifier) => ({
  userType: '' as Path | '',
  name: '',
  email: verifiedIdentifier?.identifierType === 'email' ? verifiedIdentifier.identifier : '',
  phone: verifiedIdentifier?.identifierType === 'phone' ? verifiedIdentifier.identifier : '',
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
  primaryRole: '',
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
});

type RegistrationForm = ReturnType<typeof createEmptyForm>;

const toggle = (items: string[], value: string) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value];

const withVerifiedIdentifier = <T extends { email: string; phone: string }>(form: T, verifiedIdentifier?: VerifiedIdentifier): T => ({
  ...form,
  email: verifiedIdentifier?.identifierType === 'email' ? verifiedIdentifier.identifier : form.email,
  phone: verifiedIdentifier?.identifierType === 'phone' ? verifiedIdentifier.identifier : form.phone
});

const getRelevantFormats = (selectedRoles: string[]) => {
  const selectedValues = new Set(selectedRoles.flatMap((role) => formatValuesByRole[role] ?? []));
  if (selectedValues.size === 0) return CREATOR_FORMATS.filter((option) => ['instagram_reels', 'ugc_video', 'product_demo', 'editing_only', 'writing_only', 'behind_scenes'].includes(option.value));
  return CREATOR_FORMATS.filter((option) => selectedValues.has(option.value));
};

const getRoleMeta = (value: string) => {
  const catalogRole = CREATOR_ROLE_CATALOG.find((role) => role.value === value);
  const option = CREATOR_ROLES.find((role) => role.value === value);
  return {
    title: catalogRole?.title ?? option?.label ?? value.replaceAll('_', ' '),
    description: roleDescriptions[value] ?? catalogRole?.description ?? 'Share relevant experience, tools, links, and availability.'
  };
};

const formatVerifiedIdentifier = (verifiedIdentifier?: VerifiedIdentifier) => {
  if (!verifiedIdentifier) return 'Verified account';
  if (verifiedIdentifier.identifierType === 'phone') {
    const tail = verifiedIdentifier.identifier.slice(-4);
    const prefix = verifiedIdentifier.identifier.startsWith('+') ? verifiedIdentifier.identifier.slice(0, 3) : '';
    return `${prefix} ••••• •${tail}`;
  }
  return verifiedIdentifier.identifier;
};

const Field = ({ label, children, helper }: { label: string; children: ReactNode; helper?: string }) => (
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
          className={clsx(
            'flex min-h-[58px] items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition',
            active ? 'border-primary bg-porcelain text-primary shadow-card' : 'border-[#ECE8EC] bg-white text-espresso hover:border-primary/25 hover:bg-porcelain/70'
          )}
          aria-pressed={active}
        >
          {option.label}
          {active && <Check className="h-4 w-4" aria-hidden />}
        </button>
      );
    })}
  </div>
);

const SummaryCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="rounded-[24px] border border-[#ECE8EC] bg-white p-5">
    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{title}</dt>
    <dd className="mt-3 break-words text-sm leading-6 text-cocoa">{children}</dd>
  </div>
);

export const RegistrationWizard = ({ verifiedIdentifier = null }: { verifiedIdentifier?: VerifiedIdentifier }) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RegistrationForm>(() => createEmptyForm(verifiedIdentifier));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [draftStatus, setDraftStatus] = useState('');

  const isCreatorPath = form.userType === 'creator' || form.userType === 'specialist';
  const stepLabels = isCreatorPath ? creatorStepLabels : companyStepLabels;
  const reviewStep = stepLabels.length - 1;
  const relevantFormats = useMemo(() => getRelevantFormats(form.selectedRoles), [form.selectedRoles]);
  const selectedRoleCatalog = useMemo(
    () => CREATOR_ROLE_CATALOG.filter((role) => form.selectedRoles.includes(role.value)),
    [form.selectedRoles]
  );
  const draftKey = verifiedIdentifier ? `alina_registration_draft:${verifiedIdentifier.identifierType}:${verifiedIdentifier.identifier}` : '';

  useEffect(() => {
    setForm((current) => withVerifiedIdentifier(current, verifiedIdentifier));
  }, [verifiedIdentifier]);

  useEffect(() => {
    if (!draftKey) return;
    try {
      const saved = window.localStorage.getItem(draftKey);
      if (!saved) return;
      const parsed = JSON.parse(saved) as Partial<RegistrationForm>;
      setForm((current) => withVerifiedIdentifier({ ...current, ...parsed }, verifiedIdentifier));
      setDraftStatus('Draft restored.');
    } catch {
      setDraftStatus('');
    }
  }, [draftKey, verifiedIdentifier]);

  useEffect(() => {
    if (!draftKey) return;
    const timeout = window.setTimeout(() => {
      try {
        window.localStorage.setItem(draftKey, JSON.stringify(form));
        setDraftStatus('Draft saved.');
      } catch {
        setDraftStatus('Could not save changes. Please keep this page open and try again.');
      }
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [draftKey, form]);

  const set = <K extends keyof RegistrationForm>(key: K, value: RegistrationForm[K]) => setForm((current) => ({ ...current, [key]: value }));

  const canContinue = (() => {
    if (step === 0) return Boolean(form.userType) && form.userType !== 'invite';
    if (step === 1) return form.name.trim().length >= 3 && form.city.trim().length >= 2 && form.area.trim().length >= 2 && (form.email || form.phone);
    if (isCreatorPath) {
      if (step === 2) return form.selectedRoles.length > 0 && (form.selectedRoles.length <= 3 || Boolean(form.primaryRole));
      if (step === 3) return form.creatorPlatforms.length > 0 && form.availability.length > 0;
      if (step === 4) return Boolean(form.experienceLevel);
      return true;
    }
    if (step === 2 && form.userType === 'company') {
      return form.companyName.trim().length >= 2 && Boolean(form.companyCategory) && form.goals.length > 0 && form.platforms.length > 0 &&
        form.servicesNeeded.length > 0 && Boolean(form.budgetRange) && Boolean(form.timeline) && Boolean(form.usageRightsNeed);
    }
    return true;
  })();

  const handleUseAnotherIdentifier = async () => {
    const confirmed = window.confirm('Changing your verified account will restart verification. Continue?');
    if (!confirmed) return;
    await fetch('/api/auth/logout', { method: 'POST', headers: { Accept: 'application/json' } }).catch(() => null);
    if (draftKey) window.localStorage.removeItem(draftKey);
    router.push('/login');
  };

  const handleRoleToggle = (value: string) => {
    setError('');
    setForm((current) => {
      const selectedRoles = toggle(current.selectedRoles, value);
      const allowedFormats = new Set(getRelevantFormats(selectedRoles).map((option) => option.value));
      return {
        ...current,
        selectedRoles,
        primaryRole: selectedRoles.includes(current.primaryRole) ? current.primaryRole : '',
        creatorPlatforms: current.creatorPlatforms.filter((format) => allowedFormats.has(format))
      };
    });
  };

  const continueFromStep = () => {
    if (!canContinue) {
      if (step === 0) setError(form.userType === 'invite' ? 'Please open the invite link from Alina Popova Studio. If it has expired, ask the studio to send a new one.' : 'Choose one path to continue.');
      else if (step === 1) setError('Please complete your name, city, and area before continuing.');
      else if (isCreatorPath && step === 2) setError(form.selectedRoles.length > 3 ? 'Choose which role should be treated as your main role.' : 'Choose at least one role to continue.');
      else if (isCreatorPath && step === 3) setError('Choose at least one preferred format and one availability option.');
      else if (isCreatorPath && step === 4) setError('Choose your experience level before review.');
      else setError('Please complete the required details before continuing.');
      return;
    }
    setError('');
    setStep((current) => Math.min(current + 1, reviewStep));
  };

  const submit = async () => {
    setSubmitting(true);
    setError('');
    const roleDetails = Object.fromEntries(
      Object.entries(form.roleNotes)
        .filter(([, value]) => value.trim())
        .map(([key, value]) => [key, { notes: value.trim() }])
    ) as Record<string, unknown>;
    if (form.primaryRole) roleDetails.primaryRole = { value: form.primaryRole };

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
        roleDetails
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
    if (draftKey) window.localStorage.removeItem(draftKey);
    router.push((payload.data?.redirectTo ?? '/dashboard') as Route);
  };

  const stepIntro = (() => {
    if (step === 0) return { title: 'Choose your path', copy: "Next, we'll collect only the details needed for that profile." };
    if (step === 1) return { title: 'Complete your account details', copy: 'Your verified email or phone is carried forward automatically.' };
    if (isCreatorPath && step === 2) return { title: 'What kind of work can you do?', copy: "Choose one or more roles. We'll only ask extra questions for the roles you select." };
    if (isCreatorPath && step === 3) return { title: 'Where do you want to work?', copy: 'Choose the formats, availability, and categories that fit you.' };
    if (isCreatorPath && step === 4) return { title: 'Portfolio, payout, and boundaries', copy: 'Add links if you have them. Share boundaries so we avoid unsuitable matches.' };
    if (step === reviewStep) return { title: isCreatorPath ? 'Review your creator profile' : 'Review your company brief', copy: 'Check your details before submitting. You can update your profile later.' };
    return { title: 'Company profile and campaign need', copy: 'Share the details needed to recommend the practical campaign path.' };
  })();

  return (
    <main className="min-h-screen bg-softwhite">
      <section className="hero-surface px-4 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1180px]">
          <BrandLogo />
          <div className="mt-8 overflow-hidden rounded-[44px] border border-primary/15 bg-white/90 p-5 shadow-soft sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Registration</p>
                <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-espresso sm:text-5xl">What brings you to Alina Popova Studio?</h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-cocoa sm:text-base">Choose the path that fits you. Your answers help us guide you to the correct profile and next step.</p>
              </div>
              <div className="max-w-full rounded-full border border-primary/15 bg-porcelain px-4 py-2 text-center text-sm font-semibold text-primary">{stepLabels[step]}</div>
            </div>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-champagne">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / stepLabels.length) * 100}%` }} />
            </div>
            <div className="mt-6 rounded-[28px] border border-primary/10 bg-porcelain/70 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{stepLabels[step]}</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.025em] text-espresso">{stepIntro.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-cocoa">{stepIntro.copy}</p>
                </div>
                {draftStatus && <p className="rounded-full border border-[#ECE8EC] bg-white px-4 py-2 text-xs font-semibold text-cocoa">{draftStatus}</p>}
              </div>
            </div>

            {step === 0 && (
              <>
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  {pathCards.map((card) => {
                    const Icon = card.icon;
                    const active = form.userType === card.value;
                    return (
                      <button
                        key={card.value}
                        type="button"
                        onClick={() => {
                          setError('');
                          set('userType', card.value);
                        }}
                        className={clsx(
                          'group relative flex h-full min-h-[210px] flex-col rounded-[34px] border p-7 text-left transition hover:-translate-y-1 hover:shadow-soft',
                          active ? 'border-primary bg-porcelain shadow-card' : 'border-[#ECE8EC] bg-white'
                        )}
                        aria-pressed={active}
                      >
                        {active && <span className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"><Check className="h-4 w-4" aria-hidden /></span>}
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-white text-primary"><Icon className="h-6 w-6" aria-hidden /></span>
                        <h3 className="mt-7 font-display text-2xl font-semibold text-espresso">{card.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-cocoa">{card.copy}</p>
                        <span className={clsx('mt-auto pt-6 text-sm font-semibold', active ? 'text-primary' : 'text-cocoa')}>{active ? 'Selected' : 'Select this path'}</span>
                      </button>
                    );
                  })}
                </div>
                {!form.userType && <p className="mt-5 text-sm font-semibold text-cocoa">Choose one path to continue.</p>}
              </>
            )}

            {step === 1 && (
              <div className="mt-10 space-y-6">
                {verifiedIdentifier && (
                  <div className="rounded-[28px] border border-primary/15 bg-porcelain p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary">
                          {verifiedIdentifier.identifierType === 'email' ? <Mail className="h-5 w-5" aria-hidden /> : <Phone className="h-5 w-5" aria-hidden />}
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Verified account</p>
                          <p className="mt-1 break-all text-sm font-semibold text-espresso">{formatVerifiedIdentifier(verifiedIdentifier)}</p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-primary"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Verified</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => void handleUseAnotherIdentifier()} className="self-start rounded-full px-3 py-2 text-xs font-semibold text-primary transition hover:bg-white">
                        Wrong email or phone?
                      </button>
                    </div>
                  </div>
                )}
                <div className="grid gap-5 lg:grid-cols-2">
                  <Field label="Full name"><input className={inputClass} value={form.name} onChange={(event) => set('name', event.target.value)} placeholder="Example: Alina Sharma" /></Field>
                  {verifiedIdentifier?.identifierType !== 'email' && (
                    <Field label="Email address" helper={verifiedIdentifier?.identifierType === 'phone' ? 'Optional for now. You can verify email later if needed.' : undefined}>
                      <input className={inputClass} value={form.email} onChange={(event) => set('email', event.target.value)} placeholder="Example: alina@example.com" />
                    </Field>
                  )}
                  {verifiedIdentifier?.identifierType !== 'phone' && (
                    <Field label="Phone / WhatsApp number" helper={verifiedIdentifier?.identifierType === 'email' ? 'Optional for now. Add it if WhatsApp is your preferred contact method.' : undefined}>
                      <input className={inputClass} value={form.phone} onChange={(event) => set('phone', event.target.value)} placeholder="Example: +91 98765 43210" />
                    </Field>
                  )}
                  <Field label="City"><input className={inputClass} value={form.city} onChange={(event) => set('city', event.target.value)} placeholder="Example: Mumbai, Surat, Ahmedabad, Delhi" /></Field>
                  <Field label="Area / locality" helper="This helps us understand location fit for shoots, events, or studio work."><input className={inputClass} value={form.area} onChange={(event) => set('area', event.target.value)} placeholder="Example: Bandra West, Vesu, Adajan, Andheri West" /></Field>
                  <Field label="Communication preference"><select className={inputClass} value={form.communicationPreference} onChange={(event) => set('communicationPreference', event.target.value)}><option>Email</option><option>WhatsApp</option><option>Phone call</option><option>In-app only</option></select></Field>
                </div>
              </div>
            )}

            {step === 2 && isCreatorPath && (
              <div className="mt-10 space-y-8">
                {roleCategorySections.map((section) => (
                  <section key={section.title}>
                    <h3 className="font-display text-2xl font-semibold text-espresso">{section.title}</h3>
                    <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                      {section.roles.map((roleValue) => {
                        const active = form.selectedRoles.includes(roleValue);
                        const role = getRoleMeta(roleValue);
                        return (
                          <button
                            key={roleValue}
                            type="button"
                            onClick={() => handleRoleToggle(roleValue)}
                            className={clsx(
                              'relative flex min-h-[154px] flex-col rounded-[28px] border p-5 text-left transition hover:-translate-y-1 hover:shadow-card',
                              active ? 'border-primary bg-porcelain shadow-card' : 'border-[#ECE8EC] bg-white hover:border-primary/25'
                            )}
                            aria-pressed={active}
                          >
                            <span className={clsx('flex h-10 w-10 items-center justify-center rounded-2xl border', active ? 'border-primary bg-white text-primary' : 'border-[#ECE8EC] bg-porcelain text-cocoa')}>
                              {active ? <Check className="h-5 w-5" aria-hidden /> : <Sparkles className="h-5 w-5" aria-hidden />}
                            </span>
                            <h4 className="mt-4 text-base font-semibold text-espresso">{role.title}</h4>
                            <p className="mt-2 text-sm leading-6 text-cocoa">{role.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ))}
                {form.selectedRoles.length > 3 && (
                  <section className="rounded-[28px] border border-primary/15 bg-porcelain p-5">
                    <Field label="Which role should we treat as your main role?" helper="You can still keep all selected roles. This helps us match your strongest path first.">
                      <select className={inputClass} value={form.primaryRole} onChange={(event) => set('primaryRole', event.target.value)}>
                        <option value="">Choose main role</option>
                        {form.selectedRoles.map((role) => <option key={role} value={role}>{getRoleMeta(role).title}</option>)}
                      </select>
                    </Field>
                  </section>
                )}
                {form.selectedRoles.length === 0 && <p className="rounded-2xl border border-[#ECE8EC] bg-white p-4 text-sm font-semibold text-cocoa">Choose at least one role to continue.</p>}
              </div>
            )}

            {step === 3 && isCreatorPath && (
              <div className="mt-10 space-y-10">
                <section>
                  <h3 className="font-display text-2xl font-semibold text-espresso">Preferred formats</h3>
                  <p className="mt-2 text-sm leading-6 text-cocoa">Shown based on the roles you selected. Choose the formats you are comfortable with.</p>
                  <div className="mt-5"><ChoiceGrid options={relevantFormats} selected={form.creatorPlatforms} onToggle={(value) => set('creatorPlatforms', toggle(form.creatorPlatforms, value))} /></div>
                </section>
                <section>
                  <h3 className="font-display text-2xl font-semibold text-espresso">Availability</h3>
                  <p className="mt-2 text-sm leading-6 text-cocoa">Select the work situations that usually fit your schedule.</p>
                  <div className="mt-5"><ChoiceGrid options={CREATOR_AVAILABILITY} selected={form.availability} onToggle={(value) => set('availability', toggle(form.availability, value))} /></div>
                </section>
                <section>
                  <h3 className="font-display text-2xl font-semibold text-espresso">Preferred brand categories</h3>
                  <p className="mt-2 text-sm leading-6 text-cocoa">Choose categories you are comfortable with. You can leave this broad.</p>
                  <div className="mt-5"><ChoiceGrid options={CREATOR_CATEGORIES} selected={form.categories} onToggle={(value) => set('categories', toggle(form.categories, value))} columns="sm:grid-cols-2 lg:grid-cols-4" /></div>
                </section>
              </div>
            )}

            {step === 4 && isCreatorPath && (
              <div className="mt-10 space-y-8">
                <div className="grid gap-5 lg:grid-cols-2">
                  <Field label="Experience level" helper="Beginners can apply. Selection depends on fit, reliability, availability, safety, and campaign needs.">
                    <select className={inputClass} value={form.experienceLevel} onChange={(event) => set('experienceLevel', event.target.value)}>
                      <option value="">Choose experience level</option>
                      {CREATOR_EXPERIENCE.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </Field>
                  <Field label="Expected payout for paid work" helper="Optional. Final payout depends on scope, role, usage rights, and written terms.">
                    <input className={inputClass} value={form.expectedPayout} onChange={(event) => set('expectedPayout', event.target.value)} placeholder="Example: Rs 2,000 per reel, Rs 5,000 per shoot, or open to discussion" />
                    <label className="mt-3 flex items-center gap-2 text-xs font-semibold text-cocoa">
                      <input type="checkbox" checked={form.expectedPayout === 'Open to discussion'} onChange={(event) => set('expectedPayout', event.target.checked ? 'Open to discussion' : '')} />
                      Open to discussion
                    </label>
                  </Field>
                  <Field label="Instagram or portfolio link" helper="Optional. Add your strongest public profile or work sample."><input className={inputClass} value={form.instagramPortfolio} onChange={(event) => set('instagramPortfolio', event.target.value)} placeholder="Example: https://instagram.com/yourusername" /></Field>
                  <Field label="Other work sample link" helper="Optional. Editors, designers, photographers, and writers should add a sample if possible."><input className={inputClass} value={form.portfolio} onChange={(event) => set('portfolio', event.target.value)} placeholder="Example: Google Drive, Behance, YouTube, or website link" /></Field>
                </div>
                <div className="rounded-[26px] border border-[#ECE8EC] bg-white p-5 text-sm leading-6 text-cocoa">
                  No portfolio yet? You can still apply. If shortlisted, we may request a small sample or discovery call.
                </div>
                {selectedRoleCatalog.length > 0 && (
                  <details className="rounded-[28px] border border-primary/15 bg-porcelain p-5">
                    <summary className="cursor-pointer text-sm font-semibold text-primary">Add more role details</summary>
                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                      {selectedRoleCatalog.slice(0, 4).map((role) => (
                        <Field key={role.value} label={role.title} helper={role.questions.map((question) => question.label).join(' · ')}>
                          <textarea className={`${inputClass} min-h-[130px] py-4`} value={form.roleNotes[role.value] ?? ''} onChange={(event) => set('roleNotes', { ...form.roleNotes, [role.value]: event.target.value })} placeholder="Optional. Share tools, comfort level, sample links, turnaround, or anything important for this role." />
                        </Field>
                      ))}
                    </div>
                  </details>
                )}
                <Field label="Boundaries or work you are not comfortable doing" helper="This helps us avoid matching you with unsuitable opportunities.">
                  <textarea className={`${inputClass} min-h-[130px] py-4`} value={form.boundaries} onChange={(event) => set('boundaries', event.target.value)} placeholder="Example: No late-night shoots, no travel outside city, no revealing outfits, no alcohol brands." />
                </Field>
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
                <section><h3 className="font-display text-2xl font-semibold text-espresso">Campaign goal</h3><div className="mt-5"><ChoiceGrid options={COMPANY_GOALS} selected={form.goals} onToggle={(value) => set('goals', toggle(form.goals, value))} /></div></section>
                <section><h3 className="font-display text-2xl font-semibold text-espresso">Platforms</h3><div className="mt-5"><ChoiceGrid options={COMPANY_PLATFORMS} selected={form.platforms} onToggle={(value) => set('platforms', toggle(form.platforms, value))} /></div></section>
                <section><h3 className="font-display text-2xl font-semibold text-espresso">Services needed</h3><div className="mt-5"><ChoiceGrid options={serviceOptions} selected={form.servicesNeeded} onToggle={(value) => set('servicesNeeded', toggle(form.servicesNeeded, value))} /></div></section>
                <div className="grid gap-5 lg:grid-cols-3">
                  <Field label="Estimated budget"><select className={inputClass} value={form.budgetRange} onChange={(event) => set('budgetRange', event.target.value)}><option value="">Choose budget range</option>{BUDGET_RANGES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
                  <Field label="When do you want to start?"><select className={inputClass} value={form.timeline} onChange={(event) => set('timeline', event.target.value)}><option value="">Choose timeline</option>{TIMELINES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
                  <Field label="Usage rights need"><select className={inputClass} value={form.usageRightsNeed} onChange={(event) => set('usageRightsNeed', event.target.value)}><option value="">Choose usage rights</option>{USAGE_RIGHTS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
                </div>
                <Field label="Tell us what you want to build, promote, or improve"><textarea className={`${inputClass} min-h-[140px] py-4`} value={form.message} onChange={(event) => set('message', event.target.value)} placeholder="Example: We are launching a skincare product and need UGC videos, Reels, and one Instagram Live with a trained host." /></Field>
              </div>
            )}

            {step === reviewStep && (
              <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="min-w-0 rounded-[30px] border border-primary/15 bg-porcelain p-6">
                  <FileCheck2 className="h-7 w-7 text-primary" aria-hidden />
                  <h3 className="mt-5 font-display text-2xl font-semibold text-espresso">{isCreatorPath ? 'Review your creator profile' : 'Review and agree'}</h3>
                  <p className="mt-3 text-sm leading-7 text-cocoa">
                    {isCreatorPath
                      ? 'Check your roles, preferences, links, and boundaries before submitting. Paid commercial opportunities require written scope, payout, usage rights, and acceptance before work begins.'
                      : 'Your brief will be submitted for review. Campaign pricing, deliverables, timelines, creator availability, usage rights, and outcomes are confirmed only through written proposal or agreement.'}
                  </p>
                </div>
                <div className="min-w-0 rounded-[30px] border border-[#ECE8EC] bg-white p-6">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <SummaryCard title="Verified account">
                      <span className="flex min-w-0 items-start gap-2 font-semibold text-espresso"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /><span className="min-w-0 break-all">{formatVerifiedIdentifier(verifiedIdentifier)}</span></span>
                    </SummaryCard>
                    <SummaryCard title="Basic details">{form.name || 'Not provided'}<br />{[form.area, form.city].filter(Boolean).join(', ') || 'Location not provided'}</SummaryCard>
                    {isCreatorPath ? (
                      <>
                        <SummaryCard title="Selected roles">{labelsFor(form.selectedRoles, CREATOR_ROLES).join(', ') || 'No roles selected'}{form.primaryRole && <><br />Main role: {getRoleMeta(form.primaryRole).title}</>}</SummaryCard>
                        <SummaryCard title="Formats and categories">{labelsFor(form.creatorPlatforms, CREATOR_FORMATS).join(', ') || 'No formats selected'}<br />{labelsFor(form.categories, CREATOR_CATEGORIES).join(', ') || 'Categories can be added later'}</SummaryCard>
                        <SummaryCard title="Availability">{labelsFor(form.availability, CREATOR_AVAILABILITY).join(', ') || 'No availability selected'}</SummaryCard>
                        <SummaryCard title="Portfolio and boundaries">{[form.instagramPortfolio, form.portfolio].filter(Boolean).join(' · ') || 'No portfolio added yet'}<br />{form.boundaries || 'Boundaries can be added later from your profile.'}</SummaryCard>
                      </>
                    ) : (
                      <>
                        <SummaryCard title="Company">{form.companyName || 'Company not provided'}<br />{form.companyCategory ? labelsFor([form.companyCategory], COMPANY_BUSINESS_CATEGORIES).join(', ') : 'Category not selected'}</SummaryCard>
                        <SummaryCard title="Campaign">{labelsFor(form.goals, COMPANY_GOALS).join(', ') || 'No goals selected'}<br />{labelsFor(form.platforms, COMPANY_PLATFORMS).join(', ') || 'No platforms selected'}</SummaryCard>
                      </>
                    )}
                  </dl>
                  {isCreatorPath && <label className="mt-7 flex gap-3 rounded-2xl border border-primary/15 bg-porcelain p-4 text-sm font-semibold text-espresso"><input type="checkbox" checked={form.ageConfirmed} onChange={(event) => set('ageConfirmed', event.target.checked)} />I confirm I am 18 years or older.</label>}
                  <label className="mt-4 flex gap-3 rounded-2xl border border-primary/15 bg-porcelain p-4 text-sm font-semibold text-espresso"><input type="checkbox" checked={form.legalAccepted} onChange={(event) => set('legalAccepted', event.target.checked)} />I agree to the Terms, Privacy Policy, agreement summary, Content Usage Policy, Payment Policy, and Safety Policy.</label>
                  <p className="mt-4 text-xs leading-6 text-cocoa">{isCreatorPath ? 'Applying is free and does not guarantee selection, work, income, training, or opportunities.' : 'Sales, likes, shares, followers, and virality are not guaranteed.'}</p>
                  {error && <p role="alert" className="mt-5 rounded-2xl border border-merlot/25 bg-merlot/10 p-4 text-sm text-merlot">{error}</p>}
                  <Button type="button" size="lg" className="mt-6" fullWidth disabled={submitting || !form.legalAccepted || (isCreatorPath && !form.ageConfirmed)} onClick={() => void submit()}>
                    {submitting ? 'Submitting...' : isCreatorPath ? 'Submit Creator Profile' : 'Submit Company Brief'}
                  </Button>
                </div>
              </div>
            )}

            {error && step !== reviewStep && <p role="alert" className="mt-7 rounded-2xl border border-merlot/25 bg-merlot/10 p-4 text-sm text-merlot">{error}</p>}

            <div className="mt-10 border-t border-[#ECE8EC] pt-7">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {step > 0 && (
                    <Button type="button" variant="secondary" onClick={() => {
                      setError('');
                      setStep((current) => current - 1);
                    }} iconLeft={<ArrowLeft className="h-4 w-4" aria-hidden />}>Back</Button>
                  )}
                </div>
                {step < reviewStep && <Button type="button" disabled={!canContinue} onClick={continueFromStep} iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Continue</Button>}
              </div>
              <div className="mt-5 text-center">
                <button type="button" onClick={() => void handleUseAnotherIdentifier()} className="min-h-10 rounded-full px-4 text-xs font-semibold text-cocoa transition hover:bg-porcelain hover:text-primary">
                  Wrong email or phone? Change verified account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
