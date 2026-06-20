'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Check, CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ApplicationTrustPanel } from '@/components/creator/ApplicationTrustPanel';

type ConsentKey =
  | 'age18'
  | 'noSelectionGuarantee'
  | 'noIncomeGuarantee'
  | 'trainingMayBeUnpaid'
  | 'paidWorkInWriting'
  | 'safeContentOnly'
  | 'canRejectOpportunities'
  | 'contactConsent';

type ApplicationFormData = {
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  instagramUrl: string;
  youtubeUrl: string;
  cameraComfort: string;
  languages: string;
  categories: string[];
  availability: string;
  boundaries: string;
  consents: Record<ConsentKey, boolean>;
};

const DRAFT_KEY = 'alina-creator-application-draft-v1';

const consentItems: Array<{ key: ConsentKey; label: string }> = [
  { key: 'age18', label: 'I confirm that I am 18 or older.' },
  { key: 'noSelectionGuarantee', label: 'I understand that an application does not guarantee selection.' },
  { key: 'noIncomeGuarantee', label: 'I understand that income is not guaranteed.' },
  { key: 'trainingMayBeUnpaid', label: 'I understand that training and mock practice may be unpaid and non-commercial.' },
  { key: 'paidWorkInWriting', label: 'I understand that paid commercial work is confirmed in writing before it begins.' },
  { key: 'safeContentOnly', label: 'I understand that Alina Popova does not support adult, obscene, illegal, exploitative, or unsafe content.' },
  { key: 'canRejectOpportunities', label: 'I understand that I can reject opportunities I am uncomfortable with.' },
  { key: 'contactConsent', label: 'I consent to be contacted for application purposes.' }
];

const categoryOptions = [
  ['instagram', 'Instagram creator'],
  ['youtube-live', 'YouTube Live'],
  ['livestreams', 'Livestream hosting'],
  ['modelling', 'Modelling'],
  ['product-demos', 'Product demos'],
  ['brand-campaigns', 'Brand campaigns']
] as const;

const initialFormData: ApplicationFormData = {
  fullName: '',
  email: '',
  whatsapp: '',
  city: '',
  instagramUrl: '',
  youtubeUrl: '',
  cameraComfort: '',
  languages: '',
  categories: [],
  availability: '',
  boundaries: '',
  consents: {
    age18: false,
    noSelectionGuarantee: false,
    noIncomeGuarantee: false,
    trainingMayBeUnpaid: false,
    paidWorkInWriting: false,
    safeContentOnly: false,
    canRejectOpportunities: false,
    contactConsent: false
  }
};

const steps = ['Basic details', 'Social presence', 'Camera comfort', 'Interests', 'Availability', 'Boundaries & consent', 'Review'];
const fieldClass = 'mt-2 min-h-12 w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10';

const isUrlOrEmpty = (value: string) => {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

export const CreatorApplicationForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [readyToStore, setReadyToStore] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [pinActions, setPinActions] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(DRAFT_KEY);
    if (stored) {
      try {
        const draft = JSON.parse(stored) as Partial<ApplicationFormData>;
        setFormData({
          ...initialFormData,
          ...draft,
          categories: Array.isArray(draft.categories) ? draft.categories : [],
          consents: { ...initialFormData.consents, ...(draft.consents ?? {}) }
        });
      } catch {
        window.sessionStorage.removeItem(DRAFT_KEY);
      }
    }
    setReadyToStore(true);
  }, []);

  useEffect(() => {
    if (readyToStore) window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  }, [formData, readyToStore]);

  useEffect(() => {
    const updatePinnedActions = () => setPinActions(window.scrollY > 320);
    window.addEventListener('scroll', updatePinnedActions, { passive: true });
    return () => window.removeEventListener('scroll', updatePinnedActions);
  }, []);

  useEffect(() => {
    setPinActions(false);
  }, [step]);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const setValue = <K extends Exclude<keyof ApplicationFormData, 'categories' | 'consents'>>(key: K, value: ApplicationFormData[K]) => {
    setFormData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const validate = (currentStep: number) => {
    const nextErrors: Record<string, string> = {};
    const check = (condition: boolean, key: string, value: string) => { if (!condition) nextErrors[key] = value; };

    if (currentStep === 0 || currentStep === 6) {
      check(formData.fullName.trim().length >= 3, 'fullName', 'Enter your full name.');
      check(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()), 'email', 'Enter a valid email address.');
      check(/^\+?[0-9\s-]{10,18}$/.test(formData.whatsapp.trim()), 'whatsapp', 'Enter a valid WhatsApp number.');
      check(formData.city.trim().length >= 2, 'city', 'Enter your city.');
      check(formData.consents.age18, 'age18', 'You must confirm that you are 18 or older.');
    }
    if (currentStep === 1 || currentStep === 6) {
      check(isUrlOrEmpty(formData.instagramUrl), 'instagramUrl', 'Use a complete http(s) Instagram link, or leave it blank.');
      check(isUrlOrEmpty(formData.youtubeUrl), 'youtubeUrl', 'Use a complete http(s) YouTube link, or leave it blank.');
    }
    if (currentStep === 2 || currentStep === 6) {
      check(Boolean(formData.cameraComfort), 'cameraComfort', 'Select the option that fits you best.');
      check(formData.languages.trim().length >= 2, 'languages', 'List the languages you can use on camera.');
    }
    if (currentStep === 3 || currentStep === 6) check(formData.categories.length > 0, 'categories', 'Choose at least one interest.');
    if (currentStep === 4 || currentStep === 6) check(Boolean(formData.availability), 'availability', 'Choose your general availability.');
    if (currentStep === 5 || currentStep === 6) {
      check(formData.boundaries.trim().length >= 3, 'boundaries', 'Tell us about any preferences or boundaries.');
      consentItems.filter((item) => item.key !== 'age18').forEach((item) => check(formData.consents[item.key], item.key, 'This consent is required.'));
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const continueToNext = () => {
    if (validate(step)) setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const toggleCategory = (category: string) => {
    setFormData((current) => ({
      ...current,
      categories: current.categories.includes(category) ? current.categories.filter((item) => item !== category) : [...current.categories, category]
    }));
    setErrors((current) => ({ ...current, categories: '' }));
  };

  const toggleConsent = (key: ConsentKey) => {
    setFormData((current) => ({ ...current, consents: { ...current.consents, [key]: !current.consents[key] } }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(6)) return;
    setStatus('submitting');
    setMessage('');
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, submittedAt: new Date().toISOString() })
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Unable to submit your application right now.');
      window.sessionStorage.removeItem(DRAFT_KEY);
      router.push('/application-success');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to submit your application right now.');
    }
  };

  const error = (key: string) => errors[key] ? <p className="mt-2 rounded-xl bg-merlot/10 px-3 py-2 text-xs text-merlot">{errors[key]}</p> : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
      <div className="lg:hidden"><ApplicationTrustPanel /></div>
      <div className="hidden lg:block"><ApplicationTrustPanel /></div>
      <form onSubmit={submit} className="rounded-[36px] border border-primary/15 bg-white p-5 shadow-soft sm:p-8">
      <div className="flex items-start justify-between gap-5">
        <div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Creator Launch Intake</p><h1 className="mt-2 font-display text-3xl text-espresso">Apply free in seven clear steps.</h1></div>
        <p className="shrink-0 font-mono text-xs text-cocoa">Step {step + 1} of {steps.length}</p>
      </div>
      <div className="mt-6 h-2 rounded-full bg-champagne" aria-hidden><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div>
      <ol className="mt-5 hidden grid-cols-7 gap-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-cocoa lg:grid">
        {steps.map((label, index) => <li key={label} className={index === step ? 'text-primary' : index < step ? 'text-espresso' : ''}>{label}</li>)}
      </ol>

      <div className="mt-8">
        {step === 0 && <section className="space-y-5"><div><h2 className="text-xl font-semibold text-foreground">Basic details</h2><p className="mt-1 text-sm text-cocoa">We use these details to review your application and contact you if shortlisted.</p></div><div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-medium text-cocoa">Full name<input value={formData.fullName} onChange={(event) => setValue('fullName', event.target.value)} className={fieldClass} autoComplete="name" />{error('fullName')}</label><label className="text-sm font-medium text-cocoa">City<input value={formData.city} onChange={(event) => setValue('city', event.target.value)} className={fieldClass} autoComplete="address-level2" placeholder="e.g. Ahmedabad" />{error('city')}</label><label className="text-sm font-medium text-cocoa">Email<input value={formData.email} onChange={(event) => setValue('email', event.target.value)} className={fieldClass} type="email" autoComplete="email" />{error('email')}</label><label className="text-sm font-medium text-cocoa">WhatsApp number<input value={formData.whatsapp} onChange={(event) => setValue('whatsapp', event.target.value)} className={fieldClass} inputMode="tel" autoComplete="tel" placeholder="+91 98..." />{error('whatsapp')}</label></div><label className="flex gap-3 rounded-xl border border-primary/15 bg-porcelain/55 p-4 text-sm leading-6 text-cocoa"><input checked={formData.consents.age18} onChange={() => toggleConsent('age18')} type="checkbox" className="mt-1 h-4 w-4 shrink-0" />I confirm that I am 18 or older.</label>{error('age18')}</section>}
        {step === 1 && <section className="space-y-5"><div><h2 className="text-xl font-semibold text-foreground">Social presence</h2><p className="mt-1 text-sm text-cocoa">Links are optional. A large following is not required to apply.</p></div><div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-medium text-cocoa">Instagram link or handle <span className="font-normal text-cocoa/70">(optional)</span><input value={formData.instagramUrl} onChange={(event) => setValue('instagramUrl', event.target.value)} className={fieldClass} placeholder="https://instagram.com/..." />{error('instagramUrl')}</label><label className="text-sm font-medium text-cocoa">YouTube link <span className="font-normal text-cocoa/70">(optional)</span><input value={formData.youtubeUrl} onChange={(event) => setValue('youtubeUrl', event.target.value)} className={fieldClass} placeholder="https://youtube.com/..." />{error('youtubeUrl')}</label></div><div className="rounded-xl border border-primary/15 bg-porcelain/55 px-4 py-3 text-sm leading-6 text-cocoa">Your account remains yours. Profile or content support is only provided if you separately approve it.</div></section>}
        {step === 2 && <section className="space-y-5"><div><h2 className="text-xl font-semibold text-foreground">Camera comfort</h2><p className="mt-1 text-sm text-cocoa">Beginners are welcome. Choose the answer that is most accurate today.</p></div><div className="grid gap-3 md:grid-cols-2">{[['new', 'New to camera work'], ['learning', 'Comfortable learning with guidance'], ['experienced', 'Already comfortable on camera'], ['professional', 'Experienced creator, presenter, or host']].map(([value, label]) => <label key={value} className={`flex cursor-pointer gap-3 rounded-xl border p-4 text-sm transition ${formData.cameraComfort === value ? 'border-primary bg-porcelain shadow-card' : 'border-primary/15 bg-white hover:bg-porcelain/40'}`}><input type="radio" name="cameraComfort" value={value} checked={formData.cameraComfort === value} onChange={() => setValue('cameraComfort', value)} />{label}</label>)}</div>{error('cameraComfort')}<label className="block text-sm font-medium text-cocoa">Languages you can use on camera<input value={formData.languages} onChange={(event) => setValue('languages', event.target.value)} className={fieldClass} placeholder="e.g. Hindi, English, Gujarati" />{error('languages')}</label></section>}
        {step === 3 && <section className="space-y-5"><div><h2 className="text-xl font-semibold text-foreground">Interests and categories</h2><p className="mt-1 text-sm text-cocoa">Choose all areas you would like to explore. This is not a commitment to any work.</p></div><div className="grid gap-3 sm:grid-cols-2">{categoryOptions.map(([value, label]) => <label key={value} className={`flex cursor-pointer gap-3 rounded-xl border p-4 text-sm transition ${formData.categories.includes(value) ? 'border-primary bg-porcelain shadow-card' : 'border-primary/15 bg-white hover:bg-porcelain/40'}`}><input type="checkbox" checked={formData.categories.includes(value)} onChange={() => toggleCategory(value)} />{label}</label>)}</div>{error('categories')}</section>}
        {step === 4 && <section className="space-y-5"><div><h2 className="text-xl font-semibold text-foreground">Availability</h2><p className="mt-1 text-sm text-cocoa">Select the schedule that is most realistic for you. Specific campaign timings are always agreed separately.</p></div><label className="block text-sm font-medium text-cocoa">General availability<select value={formData.availability} onChange={(event) => setValue('availability', event.target.value)} className={fieldClass}><option value="">Choose availability</option><option value="weekday-mornings">Weekday mornings</option><option value="weekday-afternoons">Weekday afternoons</option><option value="weekday-evenings">Weekday evenings</option><option value="weekends">Weekends</option><option value="flexible">Flexible / to discuss</option></select>{error('availability')}</label></section>}
        {step === 5 && <section className="space-y-5"><div><h2 className="text-xl font-semibold text-foreground">Boundaries and consent</h2><p className="mt-1 text-sm text-cocoa">Your safety, comfort, and informed choice are part of the application.</p></div><label className="block text-sm font-medium text-cocoa">Preferences, concerns, or boundaries<textarea value={formData.boundaries} onChange={(event) => setValue('boundaries', event.target.value)} className={`${fieldClass} min-h-32`} placeholder="Tell us anything that would help us understand your preferred work boundaries." />{error('boundaries')}</label><div className="space-y-3 rounded-xl border border-primary/15 bg-porcelain/55 p-4">{consentItems.filter((item) => item.key !== 'age18').map((item) => <label key={item.key} className="flex gap-3 text-sm leading-6 text-cocoa"><input checked={formData.consents[item.key]} onChange={() => toggleConsent(item.key)} type="checkbox" className="mt-1 h-4 w-4 shrink-0" />{item.label}</label>)}</div>{consentItems.filter((item) => item.key !== 'age18' && errors[item.key]).length > 0 && <p className="rounded-xl bg-merlot/10 px-3 py-2 text-xs text-merlot">Please confirm every consent to continue.</p>}</section>}
        {step === 6 && <section className="space-y-6"><div><h2 className="text-xl font-semibold text-foreground">Review your application</h2><p className="mt-1 text-sm text-cocoa">Check the essentials below before submitting. You can go back to edit anything.</p></div><div className="grid gap-4 rounded-xl border border-primary/15 bg-porcelain/55 p-5 text-sm text-cocoa sm:grid-cols-2"><p><span className="block text-xs font-semibold uppercase tracking-[0.1em] text-cocoa/70">Name</span>{formData.fullName}</p><p><span className="block text-xs font-semibold uppercase tracking-[0.1em] text-cocoa/70">City</span>{formData.city}</p><p><span className="block text-xs font-semibold uppercase tracking-[0.1em] text-cocoa/70">Contact</span>{formData.email}<br />{formData.whatsapp}</p><p><span className="block text-xs font-semibold uppercase tracking-[0.1em] text-cocoa/70">Interests</span>{formData.categories.join(', ') || 'None selected'}</p><p><span className="block text-xs font-semibold uppercase tracking-[0.1em] text-cocoa/70">Availability</span>{formData.availability || 'Not selected'}</p><p><span className="block text-xs font-semibold uppercase tracking-[0.1em] text-cocoa/70">Languages</span>{formData.languages}</p></div><div className="flex gap-3 rounded-xl border border-primary/15 bg-porcelain/55 px-4 py-3 text-sm leading-6 text-cocoa"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />Submitting does not guarantee selection, earnings, or paid work. The team will contact shortlisted applicants about a possible next step.</div></section>}
      </div>

      {status === 'error' && <p role="alert" className="mt-6 flex gap-2 rounded-xl border border-merlot/30 bg-merlot/10 p-4 text-sm text-merlot"><AlertCircle className="h-5 w-5 shrink-0" aria-hidden />{message}</p>}
      <div className={`${pinActions ? 'sticky bottom-0 z-10 -mx-5 bg-white/95 px-5 backdrop-blur sm:-mx-8 sm:px-8' : ''} mt-8 flex items-center justify-between gap-3 border-t border-primary/10 py-4 lg:static lg:mx-0 lg:border-primary/15 lg:bg-transparent lg:px-0 lg:pt-6`}>
        <Button type="button" variant="ghost" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} iconLeft={<ChevronLeft className="h-4 w-4" aria-hidden />}>Back</Button>
        {step < steps.length - 1 ? <Button key="continue" type="button" onClick={continueToNext} iconRight={<ChevronRight className="h-4 w-4" aria-hidden />}>Continue</Button> : <Button key="submit" type="submit" disabled={status === 'submitting'} iconRight={status === 'submitting' ? undefined : <Check className="h-4 w-4" aria-hidden />}>{status === 'submitting' ? 'Submitting…' : 'Submit Application'}</Button>}
      </div>
      <p className="mt-5 flex gap-2 text-xs leading-5 text-cocoa"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden />Your progress is stored only in this browser session until you submit or close the browser.</p>
      </form>
    </div>
  );
};
