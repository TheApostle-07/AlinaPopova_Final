'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Check, CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { ApplicationTrustPanel } from '@/components/creator/ApplicationTrustPanel';
import { Button } from '@/components/ui/Button';
import { CREATOR_APPLICATION_CONSENT, LEGAL_VERSION, creatorAgreementLinks } from '@/lib/legal';

type ConsentKey = 'age18' | 'legalAgreement';

type ApplicationFormData = {
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  instagramUrl: string;
  youtubeUrl: string;
  cameraComfort: string;
  languages: string;
  experience: string;
  categories: string[];
  availability: string;
  workMode: string;
  expectedPayout: string;
  boundaries: string;
  consents: Record<ConsentKey, boolean>;
};

const DRAFT_KEY = 'alina-creator-application-draft-v2';
const steps = ['Basic details', 'Creator fit', 'Availability & boundaries', 'Review & agree'];
const fieldClass = 'mt-2 min-h-12 w-full rounded-[20px] border border-primary/15 bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10';

const categoryOptions = [
  ['ugc', 'UGC videos'],
  ['instagram-reels', 'Instagram Reels'],
  ['youtube-shorts', 'YouTube Shorts'],
  ['youtube-live', 'YouTube Live'],
  ['instagram-live', 'Instagram Live'],
  ['livestreams', 'Livestream hosting'],
  ['product-demos', 'Product demos'],
  ['modelling', 'Modelling / campaigns'],
  ['live-shopping', 'Live shopping'],
  ['brand-campaigns', 'Brand campaigns']
] as const;

const initialFormData: ApplicationFormData = {
  fullName: '', email: '', whatsapp: '', city: '', instagramUrl: '', youtubeUrl: '', cameraComfort: '', languages: '', experience: '',
  categories: [], availability: '', workMode: '', expectedPayout: '', boundaries: '', consents: { age18: false, legalAgreement: false }
};

const isUrlOrEmpty = (value: string) => {
  if (!value.trim()) return true;
  try { const url = new URL(value); return url.protocol === 'https:' || url.protocol === 'http:'; } catch { return false; }
};

export const CreatorApplicationForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [readyToStore, setReadyToStore] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(DRAFT_KEY);
    if (stored) {
      try {
        const draft = JSON.parse(stored) as Partial<ApplicationFormData>;
        setFormData({ ...initialFormData, ...draft, categories: Array.isArray(draft.categories) ? draft.categories : [], consents: { ...initialFormData.consents, ...(draft.consents ?? {}) } });
      } catch { window.localStorage.removeItem(DRAFT_KEY); }
    }
    setReadyToStore(true);
  }, []);

  useEffect(() => { if (readyToStore) window.localStorage.setItem(DRAFT_KEY, JSON.stringify(formData)); }, [formData, readyToStore]);

  const progress = ((step + 1) / steps.length) * 100;

  const setValue = <K extends Exclude<keyof ApplicationFormData, 'categories' | 'consents'>>(key: K, value: ApplicationFormData[K]) => {
    setFormData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const validate = (currentStep: number) => {
    const nextErrors: Record<string, string> = {};
    const check = (condition: boolean, key: string, value: string) => { if (!condition) nextErrors[key] = value; };
    const validateBasic = () => {
      check(formData.fullName.trim().length >= 3, 'fullName', 'Enter your full name.');
      check(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()), 'email', 'Enter a valid email address.');
      check(/^\+?[0-9\s-]{10,18}$/.test(formData.whatsapp.trim()), 'whatsapp', 'Enter a valid WhatsApp number.');
      check(formData.city.trim().length >= 2, 'city', 'Enter your city.');
      check(isUrlOrEmpty(formData.instagramUrl), 'instagramUrl', 'Use a complete http(s) profile link, or leave it blank.');
      check(formData.consents.age18, 'age18', 'You must confirm that you are 18 or older.');
    };
    const validateFit = () => {
      check(formData.categories.length > 0, 'categories', 'Choose at least one interest.');
      check(Boolean(formData.cameraComfort), 'cameraComfort', 'Select the option that fits you best.');
      check(formData.languages.trim().length >= 2, 'languages', 'List the languages you can use on camera.');
      check(isUrlOrEmpty(formData.youtubeUrl), 'youtubeUrl', 'Use a complete http(s) link, or leave it blank.');
    };
    const validateAvailability = () => check(Boolean(formData.availability), 'availability', 'Choose your general availability.');
    if (currentStep === 0 || currentStep === 3) validateBasic();
    if (currentStep === 1 || currentStep === 3) validateFit();
    if (currentStep === 2 || currentStep === 3) validateAvailability();
    if (currentStep === 3) check(formData.consents.legalAgreement, 'legalAgreement', 'Please confirm the application agreement.');
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const toggleCategory = (category: string) => {
    setFormData((current) => ({ ...current, categories: current.categories.includes(category) ? current.categories.filter((item) => item !== category) : [...current.categories, category] }));
    setErrors((current) => ({ ...current, categories: '' }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(3)) return;
    setStatus('submitting');
    setMessage('');
    try {
      const response = await fetch('/api/applications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, legalVersion: LEGAL_VERSION, submittedAt: new Date().toISOString() }) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Unable to submit your application right now.');
      window.localStorage.removeItem(DRAFT_KEY);
      router.push('/application-success');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to submit your application right now.');
    }
  };

  const error = (key: string) => errors[key] ? <p className="mt-2 text-xs text-merlot">{errors[key]}</p> : null;

  return (
    <div className="grid gap-7 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
      <aside className="hidden lg:block"><ApplicationTrustPanel /></aside>
      <form onSubmit={submit} className="rounded-[40px] border border-primary/15 bg-white p-5 shadow-soft sm:p-8">
        <div className="flex items-start justify-between gap-5"><div><p className="text-xs font-semibold text-primary">Creator network</p><h2 className="mt-2 font-display text-3xl text-espresso">Apply in four clear steps.</h2></div><p className="shrink-0 text-sm font-medium text-cocoa">{step + 1} / {steps.length}</p></div>
        <div className="mt-6 h-1.5 rounded-full bg-champagne" aria-hidden><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div>
        <ol className="mt-5 hidden grid-cols-4 gap-2 text-center text-xs font-semibold text-cocoa md:grid">{steps.map((label, index) => <li key={label} className={index === step ? 'text-primary' : index < step ? 'text-espresso' : ''}>{label}</li>)}</ol>

        <div className="mt-8">
          {step === 0 && <section className="space-y-5"><div><h2 className="text-xl font-semibold text-foreground">Basic details</h2><p className="mt-1 text-sm text-cocoa">We use these details only to review your application and contact you if shortlisted.</p></div><div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-medium text-cocoa">Full name<input value={formData.fullName} onChange={(event) => setValue('fullName', event.target.value)} className={fieldClass} autoComplete="name" />{error('fullName')}</label><label className="text-sm font-medium text-cocoa">City<input value={formData.city} onChange={(event) => setValue('city', event.target.value)} className={fieldClass} autoComplete="address-level2" placeholder="e.g. Ahmedabad" />{error('city')}</label><label className="text-sm font-medium text-cocoa">Email<input value={formData.email} onChange={(event) => setValue('email', event.target.value)} className={fieldClass} type="email" autoComplete="email" />{error('email')}</label><label className="text-sm font-medium text-cocoa">WhatsApp number<input value={formData.whatsapp} onChange={(event) => setValue('whatsapp', event.target.value)} className={fieldClass} inputMode="tel" autoComplete="tel" placeholder="+91 98..." />{error('whatsapp')}</label><label className="text-sm font-medium text-cocoa md:col-span-2">Instagram or profile link <span className="font-normal text-cocoa/70">(optional)</span><input value={formData.instagramUrl} onChange={(event) => setValue('instagramUrl', event.target.value)} className={fieldClass} placeholder="https://instagram.com/..." />{error('instagramUrl')}</label></div><label className="flex gap-3 rounded-[22px] border border-primary/15 bg-champagne p-4 text-sm leading-6 text-cocoa"><input checked={formData.consents.age18} onChange={() => setFormData((current) => ({ ...current, consents: { ...current.consents, age18: !current.consents.age18 } }))} type="checkbox" className="mt-1 h-4 w-4 shrink-0" />I confirm that I am 18 or older.</label>{error('age18')}</section>}
          {step === 1 && <section className="space-y-5"><div><h2 className="text-xl font-semibold text-foreground">Creator fit</h2><p className="mt-1 text-sm text-cocoa">Choose the work you are interested in. This is not a commitment to any work.</p></div><div className="grid gap-3 sm:grid-cols-2">{categoryOptions.map(([value, label]) => <label key={value} className={`flex cursor-pointer gap-3 rounded-[22px] border p-4 text-sm transition ${formData.categories.includes(value) ? 'border-primary bg-champagne shadow-card' : 'border-primary/15 bg-white hover:bg-champagne/50'}`}><input type="checkbox" checked={formData.categories.includes(value)} onChange={() => toggleCategory(value)} />{label}</label>)}</div>{error('categories')}<div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-medium text-cocoa">Camera comfort<select value={formData.cameraComfort} onChange={(event) => setValue('cameraComfort', event.target.value)} className={fieldClass}><option value="">Choose an option</option><option value="new">New to camera work</option><option value="learning">Comfortable learning with guidance</option><option value="experienced">Already comfortable on camera</option><option value="professional">Experienced creator, presenter, or host</option></select>{error('cameraComfort')}</label><label className="text-sm font-medium text-cocoa">Languages you can use on camera<input value={formData.languages} onChange={(event) => setValue('languages', event.target.value)} className={fieldClass} placeholder="Hindi, English, Gujarati..." />{error('languages')}</label><label className="text-sm font-medium text-cocoa">YouTube or portfolio link <span className="font-normal text-cocoa/70">(optional)</span><input value={formData.youtubeUrl} onChange={(event) => setValue('youtubeUrl', event.target.value)} className={fieldClass} placeholder="https://youtube.com/..." />{error('youtubeUrl')}</label><label className="text-sm font-medium text-cocoa">Prior experience <span className="font-normal text-cocoa/70">(optional)</span><input value={formData.experience} onChange={(event) => setValue('experience', event.target.value)} className={fieldClass} placeholder="Tell us briefly" /></label></div></section>}
          {step === 2 && <section className="space-y-5"><div><h2 className="text-xl font-semibold text-foreground">Availability & boundaries</h2><p className="mt-1 text-sm text-cocoa">Your preferences help us match only suitable opportunities.</p></div><div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-medium text-cocoa">General availability<select value={formData.availability} onChange={(event) => setValue('availability', event.target.value)} className={fieldClass}><option value="">Choose availability</option><option value="weekday-mornings">Weekday mornings</option><option value="weekday-afternoons">Weekday afternoons</option><option value="weekday-evenings">Weekday evenings</option><option value="weekends">Weekends</option><option value="flexible">Flexible / to discuss</option></select>{error('availability')}</label><label className="text-sm font-medium text-cocoa">Remote, studio, or travel comfort<select value={formData.workMode} onChange={(event) => setValue('workMode', event.target.value)} className={fieldClass}><option value="">Choose a preference</option><option value="remote">Remote only</option><option value="studio">Studio or local shoots</option><option value="travel">Comfortable with reasonable travel</option><option value="discuss">Discuss per campaign</option></select></label><label className="text-sm font-medium text-cocoa md:col-span-2">Expected payout for paid work <span className="font-normal text-cocoa/70">(optional)</span><input value={formData.expectedPayout} onChange={(event) => setValue('expectedPayout', event.target.value)} className={fieldClass} placeholder="A range or ‘to discuss’" /></label></div><label className="block text-sm font-medium text-cocoa">Boundaries or concerns <span className="font-normal text-cocoa/70">(optional)</span><textarea value={formData.boundaries} onChange={(event) => setValue('boundaries', event.target.value)} className={`${fieldClass} min-h-32`} placeholder="Share anything that helps us understand your work preferences." /></label></section>}
          {step === 3 && <section className="space-y-6"><div><h2 className="text-xl font-semibold text-foreground">Review & agree</h2><p className="mt-1 text-sm text-cocoa">Check the essentials before submitting. You can go back to edit anything.</p></div><div className="grid gap-4 rounded-[28px] border border-primary/15 bg-champagne p-5 text-sm text-cocoa sm:grid-cols-2"><p><span className="block text-xs font-semibold text-cocoa/70">NAME</span>{formData.fullName}</p><p><span className="block text-xs font-semibold text-cocoa/70">CITY</span>{formData.city}</p><p><span className="block text-xs font-semibold text-cocoa/70">CONTACT</span>{formData.email}<br />{formData.whatsapp}</p><p><span className="block text-xs font-semibold text-cocoa/70">INTERESTS</span>{formData.categories.join(', ') || 'None selected'}</p></div><div className="rounded-[28px] border border-primary/15 bg-white p-5"><label className="flex gap-3 text-sm leading-6 text-cocoa"><input checked={formData.consents.legalAgreement} onChange={() => setFormData((current) => ({ ...current, consents: { ...current.consents, legalAgreement: !current.consents.legalAgreement } }))} type="checkbox" className="mt-1 h-4 w-4 shrink-0" />I have read and agree to the Terms, Privacy Policy, Creator Agreement Summary, and Safety Policy.</label>{error('legalAgreement')}<p className="mt-4 text-xs leading-5 text-cocoa">{CREATOR_APPLICATION_CONSENT}</p><p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-primary">{creatorAgreementLinks.map((item) => <Link key={item.href} href={item.href} className="underline underline-offset-4">{item.label}</Link>)}</p></div></section>}
        </div>

        {status === 'error' && <p role="alert" className="mt-6 flex gap-2 rounded-[22px] border border-merlot/30 bg-merlot/10 p-4 text-sm text-merlot"><AlertCircle className="h-5 w-5 shrink-0" aria-hidden />{message}</p>}
        <div className="sticky bottom-0 z-10 mt-8 flex items-center justify-between gap-3 border-t border-primary/10 bg-white/95 py-4 backdrop-blur lg:static lg:bg-transparent"><Button type="button" variant="ghost" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} iconLeft={<ChevronLeft className="h-4 w-4" aria-hidden />}>Back</Button>{step < steps.length - 1 ? <Button type="button" onClick={() => validate(step) && setStep((current) => Math.min(current + 1, steps.length - 1))} iconRight={<ChevronRight className="h-4 w-4" aria-hidden />}>Continue</Button> : <Button type="submit" disabled={status === 'submitting'} iconRight={status === 'submitting' ? undefined : <Check className="h-4 w-4" aria-hidden />}>{status === 'submitting' ? 'Submitting…' : 'Submit Application'}</Button>}</div>
        <p className="mt-5 flex gap-2 text-xs leading-5 text-cocoa"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden />Your draft stays on this device until you submit or clear your browser data.</p>
      </form>
    </div>
  );
};
