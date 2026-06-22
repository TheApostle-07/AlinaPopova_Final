'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AlertCircle, Check, ChevronLeft, ChevronRight, ClipboardList, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  BUDGET_RANGES,
  COMPANY_BUSINESS_CATEGORIES,
  COMPANY_GOALS,
  COMPANY_PLATFORMS,
  COMPANY_SERVICE_GROUPS,
  COMPANY_TALENT_NEEDS,
  MONETIZATION_TARGETS,
  TIMELINES,
  USAGE_RIGHTS,
  type IntakeOption
} from '@/lib/intake-options';
import { COMPANY_INQUIRY_CONSENT, LEGAL_VERSION, companyAgreementLinks } from '@/lib/legal';

type CompanyBriefData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  businessCategory: string;
  goals: string[];
  platforms: string[];
  monetizationTargets: string[];
  services: string[];
  talentNeeds: string[];
  budgetRange: string;
  timeline: string;
  usageRights: string;
  description: string;
  consent: boolean;
};

const DRAFT_KEY = 'alina-company-brief-draft-v1';
const steps = ['Company basics', 'Goal and platform', 'Services needed', 'Talent, budget and timeline'];
const fieldClass = 'mt-2 min-h-12 w-full rounded-[20px] border border-primary/15 bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10';

const initialData: CompanyBriefData = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  websiteUrl: '',
  businessCategory: '',
  goals: [],
  platforms: [],
  monetizationTargets: [],
  services: [],
  talentNeeds: [],
  budgetRange: '',
  timeline: '',
  usageRights: '',
  description: '',
  consent: false
};

const isUrlOrEmpty = (value: string) => {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

const ChoiceGrid = ({
  options,
  selected,
  onToggle,
  columns = 'sm:grid-cols-2'
}: {
  options: IntakeOption[];
  selected: string[];
  onToggle: (value: string) => void;
  columns?: string;
}) => (
  <div className={`grid gap-3 ${columns}`}>
    {options.map((option) => {
      const checked = selected.includes(option.value);
      return (
        <label key={option.value} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-[20px] border px-4 py-3 text-sm transition ${checked ? 'border-primary bg-porcelain text-espresso shadow-card' : 'border-[#ECE8EC] bg-white text-cocoa hover:border-primary/30 hover:bg-porcelain/60'}`}>
          <input className="h-4 w-4 shrink-0 accent-primary" type="checkbox" checked={checked} onChange={() => onToggle(option.value)} />
          <span>{option.label}</span>
        </label>
      );
    })}
  </div>
);

export const CompanyBriefForm = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CompanyBriefData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [readyToStore, setReadyToStore] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(DRAFT_KEY);
    if (stored) {
      try {
        const draft = JSON.parse(stored) as Partial<CompanyBriefData>;
        setData({
          ...initialData,
          ...draft,
          goals: Array.isArray(draft.goals) ? draft.goals : [],
          platforms: Array.isArray(draft.platforms) ? draft.platforms : [],
          monetizationTargets: Array.isArray(draft.monetizationTargets) ? draft.monetizationTargets : [],
          services: Array.isArray(draft.services) ? draft.services : [],
          talentNeeds: Array.isArray(draft.talentNeeds) ? draft.talentNeeds : []
        });
      } catch {
        window.localStorage.removeItem(DRAFT_KEY);
      }
    }
    setReadyToStore(true);
  }, []);

  useEffect(() => {
    if (readyToStore) window.localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  }, [data, readyToStore]);

  const setValue = <K extends Exclude<keyof CompanyBriefData, 'goals' | 'platforms' | 'monetizationTargets' | 'services' | 'talentNeeds'>>(key: K, value: CompanyBriefData[K]) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const toggle = (key: 'goals' | 'platforms' | 'monetizationTargets' | 'services' | 'talentNeeds', value: string) => {
    setData((current) => ({
      ...current,
      [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value]
    }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const validate = (currentStep: number) => {
    const nextErrors: Record<string, string> = {};
    const check = (condition: boolean, key: string, text: string) => {
      if (!condition) nextErrors[key] = text;
    };

    if (currentStep === 0 || currentStep === 3) {
      check(data.companyName.trim().length >= 2, 'companyName', 'Please enter your company or brand name.');
      check(data.contactName.trim().length >= 3, 'contactName', 'Please enter the contact person’s full name.');
      check(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()), 'email', 'Please enter a valid work email address.');
      check(/^\+?[0-9\s-]{10,18}$/.test(data.phone.trim()), 'phone', 'Please enter a valid phone or WhatsApp number.');
      check(isUrlOrEmpty(data.websiteUrl), 'websiteUrl', 'Use a complete http(s) link, or leave this blank.');
      check(Boolean(data.businessCategory), 'businessCategory', 'Please choose the closest business category.');
    }
    if (currentStep === 1 || currentStep === 3) {
      check(data.goals.length > 0, 'goals', 'Please choose at least one campaign goal.');
      check(data.platforms.length > 0, 'platforms', 'Please choose at least one platform.');
    }
    if (currentStep === 2 || currentStep === 3) check(data.services.length > 0, 'services', 'Please choose at least one service.');
    if (currentStep === 3) {
      check(data.talentNeeds.length > 0, 'talentNeeds', 'Please choose a talent need or ask us to recommend one.');
      check(Boolean(data.budgetRange), 'budgetRange', 'Please choose an estimated budget.');
      check(Boolean(data.timeline), 'timeline', 'Please choose a timeline.');
      check(Boolean(data.usageRights), 'usageRights', 'Please choose how you want to use the content.');
      check(data.description.trim().length >= 10, 'description', 'Please tell us what you want to build, promote, or improve.');
      check(data.consent, 'consent', 'Please agree before submitting the brief.');
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(3)) return;
    setStatus('submitting');
    setMessage('');
    try {
      const response = await fetch('/api/company-briefs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, legalVersion: LEGAL_VERSION })
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Unable to submit the company brief right now.');
      window.localStorage.removeItem(DRAFT_KEY);
      window.location.assign('/company-brief-success');
    } catch (submissionError) {
      setStatus('error');
      setMessage(submissionError instanceof Error ? submissionError.message : 'Unable to submit the company brief right now.');
    }
  };

  const error = (key: string) => errors[key] ? <p className="mt-2 text-xs text-merlot">{errors[key]}</p> : null;
  const progress = ((step + 1) / steps.length) * 100;
  const showMonetization = data.goals.includes('monetization') || data.goals.includes('sales') || data.goals.includes('leads');

  return (
    <form onSubmit={submit} className="rounded-[40px] border border-primary/15 bg-white p-5 shadow-soft sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><ClipboardList className="h-5 w-5" aria-hidden /></div>
          <h2 className="mt-4 font-display text-3xl text-espresso">Build your campaign brief.</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-cocoa">Tell us what you want to grow. We will route the brief to the campaign path that fits.</p>
        </div>
        <p className="rounded-full border border-primary/15 bg-porcelain px-3 py-2 text-sm font-semibold text-primary">Step {step + 1} of {steps.length}</p>
      </div>

      <div className="mt-7 h-1.5 rounded-full bg-champagne" aria-hidden><div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} /></div>
      <ol className="mt-5 hidden grid-cols-4 gap-2 text-center text-xs font-semibold text-cocoa md:grid">{steps.map((label, index) => <li key={label} className={index === step ? 'text-primary' : index < step ? 'text-espresso' : ''}>{label}</li>)}</ol>

      <div className="mt-8">
        {step === 0 && <section className="space-y-5">
          <div><h3 className="text-xl font-semibold text-espresso">Company basics</h3><p className="mt-1 text-sm text-cocoa">A few details so we can understand the business and reply to the right person.</p></div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-cocoa">Company / brand name<input value={data.companyName} onChange={(event) => setValue('companyName', event.target.value)} autoComplete="organization" className={fieldClass} placeholder="Example: GlowSkin Studio" />{error('companyName')}</label>
            <label className="text-sm font-medium text-cocoa">Contact person<input value={data.contactName} onChange={(event) => setValue('contactName', event.target.value)} autoComplete="name" className={fieldClass} placeholder="Example: Priya Shah" />{error('contactName')}</label>
            <label className="text-sm font-medium text-cocoa">Work email<input value={data.email} onChange={(event) => setValue('email', event.target.value)} type="email" autoComplete="email" className={fieldClass} placeholder="Example: priya@company.com" />{error('email')}</label>
            <label className="text-sm font-medium text-cocoa">Phone / WhatsApp<input value={data.phone} onChange={(event) => setValue('phone', event.target.value)} inputMode="tel" autoComplete="tel" placeholder="Example: +91 98765 43210" className={fieldClass} />{error('phone')}</label>
            <label className="text-sm font-medium text-cocoa md:col-span-2">Website, Instagram, or YouTube link <span className="font-normal text-cocoa/70">(optional)</span><input value={data.websiteUrl} onChange={(event) => setValue('websiteUrl', event.target.value)} placeholder="Example: https://instagram.com/yourbrand" className={fieldClass} /><span className="mt-2 block text-xs font-normal leading-5 text-cocoa/75">Add the main place where we can understand your brand.</span>{error('websiteUrl')}</label>
            <label className="text-sm font-medium text-cocoa md:col-span-2">Business category<select value={data.businessCategory} onChange={(event) => setValue('businessCategory', event.target.value)} className={fieldClass}><option value="">Choose the closest category</option>{COMPANY_BUSINESS_CATEGORIES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{error('businessCategory')}</label>
          </div>
        </section>}

        {step === 1 && <section className="space-y-7"><div><h3 className="text-xl font-semibold text-espresso">Goal and platform</h3><p className="mt-1 text-sm text-cocoa">Choose every goal and channel that matters. You can choose more than one.</p></div><div><p className="mb-1 text-sm font-semibold text-espresso">What do you want to achieve?</p><p className="mb-3 text-sm text-cocoa">Select all that apply.</p><ChoiceGrid options={COMPANY_GOALS} selected={data.goals} onToggle={(value) => toggle('goals', value)} />{error('goals')}</div><div><p className="mb-1 text-sm font-semibold text-espresso">Which platforms matter most?</p><p className="mb-3 text-sm text-cocoa">Choose where you want the campaign to work.</p><ChoiceGrid options={COMPANY_PLATFORMS} selected={data.platforms} onToggle={(value) => toggle('platforms', value)} />{error('platforms')}</div>{showMonetization && <div><p className="mb-1 text-sm font-semibold text-espresso">What do you want to monetize or promote? <span className="font-normal text-cocoa/70">(optional)</span></p><p className="mb-3 text-sm text-cocoa">For example: skincare products, clinic services, a coaching programme, or an app subscription.</p><ChoiceGrid options={MONETIZATION_TARGETS} selected={data.monetizationTargets} onToggle={(value) => toggle('monetizationTargets', value)} /></div>}</section>}

        {step === 2 && <section className="space-y-7"><div><h3 className="text-xl font-semibold text-espresso">Services needed</h3><p className="mt-1 text-sm text-cocoa">Select the support you want from the studio. We will shape this into a focused scope rather than sell every service at once.</p></div>{COMPANY_SERVICE_GROUPS.map((group) => <div key={group.title}><p className="mb-3 text-sm font-semibold text-espresso">{group.title}</p><ChoiceGrid options={group.options} selected={data.services} onToggle={(value) => toggle('services', value)} /></div>)}{error('services')}</section>}

        {step === 3 && <section className="space-y-7"><div><h3 className="text-xl font-semibold text-espresso">Talent, budget and timeline</h3><p className="mt-1 text-sm text-cocoa">These details guide recommendations. Final scope, availability, rights, and pricing are always confirmed in writing.</p></div><div><p className="mb-1 text-sm font-semibold text-espresso">What kind of talent do you need?</p><p className="mb-3 text-sm text-cocoa">Select all relevant roles. Choose “not sure” if you want us to recommend the mix.</p><ChoiceGrid options={COMPANY_TALENT_NEEDS} selected={data.talentNeeds} onToggle={(value) => toggle('talentNeeds', value)} />{error('talentNeeds')}</div><div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-medium text-cocoa">Estimated campaign budget<select value={data.budgetRange} onChange={(event) => setValue('budgetRange', event.target.value)} className={fieldClass}><option value="">Choose a range</option>{BUDGET_RANGES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><span className="mt-2 block text-xs font-normal leading-5 text-cocoa/75">This helps us suggest the right campaign path.</span>{error('budgetRange')}</label><label className="text-sm font-medium text-cocoa">When do you want to start?<select value={data.timeline} onChange={(event) => setValue('timeline', event.target.value)} className={fieldClass}><option value="">Choose a timeline</option>{TIMELINES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{error('timeline')}</label><label className="text-sm font-medium text-cocoa md:col-span-2">How do you want to use the content?<select value={data.usageRights} onChange={(event) => setValue('usageRights', event.target.value)} className={fieldClass}><option value="">Choose an option</option>{USAGE_RIGHTS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><span className="mt-2 block text-xs font-normal leading-5 text-cocoa/75">Usage rights affect creator payout, pricing, and written campaign terms.</span>{error('usageRights')}</label></div><label className="block text-sm font-medium text-cocoa">Tell us what you want to build, promote, or improve<textarea value={data.description} onChange={(event) => setValue('description', event.target.value)} className={`${fieldClass} min-h-36`} placeholder="Example: We are launching a skincare product and need UGC videos, Reels, and maybe one Instagram Live with a trained host." />{error('description')}</label><div className="rounded-[28px] border border-primary/15 bg-porcelain p-5"><label className="flex gap-3 text-sm leading-6 text-cocoa"><input checked={data.consent} onChange={(event) => setValue('consent', event.target.checked)} type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary" />I agree to the Terms, Privacy Policy, Company Agreement Summary, Refund Policy, Content Usage Policy, Payment Policy, and Safety Policy.</label>{error('consent')}<p className="mt-4 text-xs leading-5 text-cocoa">{COMPANY_INQUIRY_CONSENT}</p><p className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold text-primary">{companyAgreementLinks.map((item) => <Link key={item.href} href={item.href} className="underline underline-offset-4">{item.label}</Link>)}</p></div></section>}
      </div>

      {status === 'error' && <p role="alert" className="mt-6 flex gap-2 rounded-[22px] border border-merlot/30 bg-merlot/10 p-4 text-sm text-merlot"><AlertCircle className="h-5 w-5 shrink-0" aria-hidden />{message}</p>}
      <div className="sticky bottom-0 z-10 mt-8 flex items-center justify-between gap-3 border-t border-primary/10 bg-white/95 py-4 backdrop-blur lg:static lg:bg-transparent"><Button type="button" variant="ghost" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} iconLeft={<ChevronLeft className="h-4 w-4" aria-hidden />}>Back</Button>{step < steps.length - 1 ? <Button type="button" onClick={() => validate(step) && setStep((current) => Math.min(current + 1, steps.length - 1))} iconRight={<ChevronRight className="h-4 w-4" aria-hidden />}>Continue</Button> : <Button type="submit" disabled={status === 'submitting'} iconRight={status === 'submitting' ? undefined : <Check className="h-4 w-4" aria-hidden />}>{status === 'submitting' ? 'Submitting...' : 'Submit Company Brief'}</Button>}</div>
      <p className="mt-5 flex gap-2 text-xs leading-5 text-cocoa"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />Your draft stays on this device until you submit or clear your browser data.</p>
    </form>
  );
};
