'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AlertCircle, Check, CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { ApplicationTrustPanel } from '@/components/creator/ApplicationTrustPanel';
import { Button } from '@/components/ui/Button';
import { CREATOR_AVAILABILITY, CREATOR_CATEGORIES, CREATOR_EXPERIENCE, CREATOR_FORMATS, CREATOR_ROLES, type IntakeOption } from '@/lib/intake-options';
import { CREATOR_APPLICATION_CONSENT, LEGAL_VERSION, creatorAgreementLinks } from '@/lib/legal';

type ConsentKey = 'age18' | 'legalAgreement';

type ApplicationFormData = {
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  area: string;
  instagramUrl: string;
  youtubeUrl: string;
  languages: string;
  cameraComfort: string;
  roleTags: string[];
  formatTags: string[];
  experienceLevel: string;
  availabilityTags: string[];
  categoryTags: string[];
  expectedPayout: string;
  boundaries: string;
  consents: Record<ConsentKey, boolean>;
};

const DRAFT_KEY = 'alina-creator-application-draft-v3';
const steps = ['Basic details', 'Role and skills', 'Availability and boundaries', 'Review and agree'];
const fieldClass = 'mt-2 min-h-12 w-full rounded-[20px] border border-primary/15 bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10';

const initialFormData: ApplicationFormData = {
  fullName: '',
  email: '',
  whatsapp: '',
  city: '',
  area: '',
  instagramUrl: '',
  youtubeUrl: '',
  languages: '',
  cameraComfort: '',
  roleTags: [],
  formatTags: [],
  experienceLevel: '',
  availabilityTags: [],
  categoryTags: [],
  expectedPayout: '',
  boundaries: '',
  consents: { age18: false, legalAgreement: false }
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

const ChoiceGrid = ({ options, selected, onToggle, columns = 'sm:grid-cols-2' }: { options: IntakeOption[]; selected: string[]; onToggle: (value: string) => void; columns?: string }) => (
  <div className={`grid gap-3 ${columns}`}>
    {options.map((option) => {
      const checked = selected.includes(option.value);
      return <label key={option.value} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-[20px] border px-4 py-3 text-sm transition ${checked ? 'border-primary bg-porcelain text-espresso shadow-card' : 'border-[#ECE8EC] bg-white text-cocoa hover:border-primary/30 hover:bg-porcelain/60'}`}><input className="h-4 w-4 shrink-0 accent-primary" type="checkbox" checked={checked} onChange={() => onToggle(option.value)} /><span>{option.label}</span></label>;
    })}
  </div>
);

export const CreatorApplicationForm = () => {
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
        setFormData({
          ...initialFormData,
          ...draft,
          roleTags: Array.isArray(draft.roleTags) ? draft.roleTags : [],
          formatTags: Array.isArray(draft.formatTags) ? draft.formatTags : [],
          availabilityTags: Array.isArray(draft.availabilityTags) ? draft.availabilityTags : [],
          categoryTags: Array.isArray(draft.categoryTags) ? draft.categoryTags : [],
          consents: { ...initialFormData.consents, ...(draft.consents ?? {}) }
        });
      } catch {
        window.localStorage.removeItem(DRAFT_KEY);
      }
    }
    setReadyToStore(true);
  }, []);

  useEffect(() => {
    if (readyToStore) window.localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  }, [formData, readyToStore]);

  const setValue = <K extends Exclude<keyof ApplicationFormData, 'roleTags' | 'formatTags' | 'availabilityTags' | 'categoryTags' | 'consents'>>(key: K, value: ApplicationFormData[K]) => {
    setFormData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const toggle = (key: 'roleTags' | 'formatTags' | 'availabilityTags' | 'categoryTags', value: string) => {
    setFormData((current) => ({
      ...current,
      [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value]
    }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const validate = (currentStep: number) => {
    const nextErrors: Record<string, string> = {};
    const check = (condition: boolean, key: string, value: string) => {
      if (!condition) nextErrors[key] = value;
    };
    if (currentStep === 0 || currentStep === 3) {
      check(formData.fullName.trim().length >= 3, 'fullName', 'Please enter your full name.');
      check(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()), 'email', 'Please enter a valid email address.');
      check(/^\+?[0-9\s-]{10,18}$/.test(formData.whatsapp.trim()), 'whatsapp', 'Please enter a valid phone or WhatsApp number.');
      check(formData.city.trim().length >= 2, 'city', 'Please enter your city.');
      check(isUrlOrEmpty(formData.instagramUrl), 'instagramUrl', 'Use a complete http(s) link, or leave it blank.');
      check(isUrlOrEmpty(formData.youtubeUrl), 'youtubeUrl', 'Use a complete http(s) link, or leave it blank.');
      check(formData.consents.age18, 'age18', 'Creator applications are only open to people who are 18 or older.');
    }
    if (currentStep === 1 || currentStep === 3) {
      check(formData.roleTags.length > 0, 'roleTags', 'Select at least one role that fits you.');
      check(formData.formatTags.length > 0, 'formatTags', 'Select at least one format or platform.');
      check(Boolean(formData.experienceLevel), 'experienceLevel', 'Select your experience level.');
    }
    if (currentStep === 2 || currentStep === 3) check(formData.availabilityTags.length > 0, 'availabilityTags', 'Select at least one availability preference.');
    if (currentStep === 3) check(formData.consents.legalAgreement, 'legalAgreement', 'Please confirm the application agreement.');
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(3)) return;
    setStatus('submitting');
    setMessage('');
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, legalVersion: LEGAL_VERSION, submittedAt: new Date().toISOString() })
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Unable to submit your application right now.');
      window.localStorage.removeItem(DRAFT_KEY);
      window.location.assign('/application-success');
    } catch (submissionError) {
      setStatus('error');
      setMessage(submissionError instanceof Error ? submissionError.message : 'Unable to submit your application right now.');
    }
  };

  const error = (key: string) => errors[key] ? <p className="mt-2 text-xs text-merlot">{errors[key]}</p> : null;
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="grid gap-7 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
      <aside className="hidden lg:block"><ApplicationTrustPanel /></aside>
      <form onSubmit={submit} className="rounded-[40px] border border-primary/15 bg-white p-5 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold text-primary">Creator network</p><h2 className="mt-2 font-display text-3xl text-espresso">Apply in four clear steps.</h2><p className="mt-2 text-sm leading-6 text-cocoa">Choose one or several roles. On-camera and behind-the-scenes talent are equally welcome.</p></div><p className="shrink-0 rounded-full border border-primary/15 bg-porcelain px-3 py-2 text-sm font-semibold text-primary">Step {step + 1} of {steps.length}</p></div>
        <div className="mt-6 h-1.5 rounded-full bg-champagne" aria-hidden><div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} /></div>
        <ol className="mt-5 hidden grid-cols-4 gap-2 text-center text-xs font-semibold text-cocoa md:grid">{steps.map((label, index) => <li key={label} className={index === step ? 'text-primary' : index < step ? 'text-espresso' : ''}>{label}</li>)}</ol>

        <div className="mt-8">
          {step === 0 && <section className="space-y-5">
            <div><h3 className="text-xl font-semibold text-espresso">Basic details</h3><p className="mt-1 text-sm text-cocoa">We use these details only to review your application and contact you if shortlisted.</p></div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium text-cocoa">Full name<input value={formData.fullName} onChange={(event) => setValue('fullName', event.target.value)} className={fieldClass} autoComplete="name" placeholder="Example: Alina Sharma" />{error('fullName')}</label>
              <label className="text-sm font-medium text-cocoa">City<input value={formData.city} onChange={(event) => setValue('city', event.target.value)} className={fieldClass} autoComplete="address-level2" placeholder="Example: Mumbai, Surat, Ahmedabad, Delhi" />{error('city')}</label>
              <label className="text-sm font-medium text-cocoa">Area / locality <span className="font-normal text-cocoa/70">(optional)</span><input value={formData.area} onChange={(event) => setValue('area', event.target.value)} className={fieldClass} placeholder="Example: Bandra West, Vesu, Adajan, Andheri West" /><span className="mt-2 block text-xs font-normal leading-5 text-cocoa/75">This helps us understand location fit for shoots, events, or studio work.</span></label>
              <label className="text-sm font-medium text-cocoa">Phone / WhatsApp number<input value={formData.whatsapp} onChange={(event) => setValue('whatsapp', event.target.value)} className={fieldClass} inputMode="tel" autoComplete="tel" placeholder="Example: +91 98765 43210" /><span className="mt-2 block text-xs font-normal leading-5 text-cocoa/75">We use this only to contact you about your application.</span>{error('whatsapp')}</label>
              <label className="text-sm font-medium text-cocoa md:col-span-2">Email address<input value={formData.email} onChange={(event) => setValue('email', event.target.value)} className={fieldClass} type="email" autoComplete="email" placeholder="Example: alina@example.com" />{error('email')}</label>
              <label className="text-sm font-medium text-cocoa">Instagram or portfolio link <span className="font-normal text-cocoa/70">(optional)</span><input value={formData.instagramUrl} onChange={(event) => setValue('instagramUrl', event.target.value)} className={fieldClass} placeholder="Example: https://instagram.com/yourusername" /><span className="mt-2 block text-xs font-normal leading-5 text-cocoa/75">You can also share YouTube, Drive, Behance, or any work sample link.</span>{error('instagramUrl')}</label>
              <label className="text-sm font-medium text-cocoa">YouTube or other profile link <span className="font-normal text-cocoa/70">(optional)</span><input value={formData.youtubeUrl} onChange={(event) => setValue('youtubeUrl', event.target.value)} className={fieldClass} placeholder="Example: https://youtube.com/@yourchannel" /><span className="mt-2 block text-xs font-normal leading-5 text-cocoa/75">Add any link that helps us understand your work.</span>{error('youtubeUrl')}</label>
              <label className="text-sm font-medium text-cocoa md:col-span-2">Languages you can work in <span className="font-normal text-cocoa/70">(optional)</span><input value={formData.languages} onChange={(event) => setValue('languages', event.target.value)} className={fieldClass} placeholder="Example: Hindi, English, Gujarati" /></label>
            </div>
            <div><p className="mb-3 text-sm font-semibold text-espresso">Age confirmation</p><label className="flex gap-3 rounded-[22px] border border-primary/15 bg-porcelain p-4 text-sm leading-6 text-cocoa"><input checked={formData.consents.age18} onChange={() => setFormData((current) => ({ ...current, consents: { ...current.consents, age18: !current.consents.age18 } }))} type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary" />I confirm I am 18 years or older.</label>{error('age18')}</div>
          </section>}

          {step === 1 && <section className="space-y-7"><div><h3 className="text-xl font-semibold text-espresso">Role and skills</h3><p className="mt-1 text-sm text-cocoa">Choose the roles and formats that fit you. Selecting more than one helps us make better matches.</p></div><div><p className="mb-1 text-sm font-semibold text-espresso">What do you want to apply as?</p><p className="mb-3 text-sm text-cocoa">Select all roles that fit you. You can apply for on-camera or behind-the-scenes work.</p><ChoiceGrid options={CREATOR_ROLES} selected={formData.roleTags} onToggle={(value) => toggle('roleTags', value)} />{error('roleTags')}</div><div><p className="mb-3 text-sm font-semibold text-espresso">What platforms or formats are you comfortable with?</p><ChoiceGrid options={CREATOR_FORMATS} selected={formData.formatTags} onToggle={(value) => toggle('formatTags', value)} />{error('formatTags')}</div><div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-medium text-cocoa">Experience level<select value={formData.experienceLevel} onChange={(event) => setValue('experienceLevel', event.target.value)} className={fieldClass}><option value="">Choose your experience level</option>{CREATOR_EXPERIENCE.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><span className="mt-2 block text-xs font-normal leading-5 text-cocoa/75">Beginners can apply. Selection depends on fit, availability, safety, and campaign needs.</span>{error('experienceLevel')}</label><label className="text-sm font-medium text-cocoa">On-camera comfort <span className="font-normal text-cocoa/70">(optional)</span><select value={formData.cameraComfort} onChange={(event) => setValue('cameraComfort', event.target.value)} className={fieldClass}><option value="">Not applicable or choose an option</option><option value="new">New to camera work</option><option value="learning">Comfortable learning with guidance</option><option value="experienced">Comfortable on camera</option><option value="professional">Professional host or presenter</option></select></label></div></section>}

          {step === 2 && <section className="space-y-7"><div><h3 className="text-xl font-semibold text-espresso">Availability and boundaries</h3><p className="mt-1 text-sm text-cocoa">Your preferences and boundaries help us only suggest suitable opportunities.</p></div><div><p className="mb-1 text-sm font-semibold text-espresso">Availability</p><p className="mb-3 text-sm text-cocoa">Share when you are usually available for calls, shoots, edits, or campaign work.</p><ChoiceGrid options={CREATOR_AVAILABILITY} selected={formData.availabilityTags} onToggle={(value) => toggle('availabilityTags', value)} />{error('availabilityTags')}</div><div><p className="mb-3 text-sm font-semibold text-espresso">Preferred categories <span className="font-normal text-cocoa/70">(optional)</span></p><ChoiceGrid options={CREATOR_CATEGORIES} selected={formData.categoryTags} onToggle={(value) => toggle('categoryTags', value)} /></div><div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-medium text-cocoa">Expected payout for paid work <span className="font-normal text-cocoa/70">(optional)</span><input value={formData.expectedPayout} onChange={(event) => setValue('expectedPayout', event.target.value)} className={fieldClass} placeholder="Example: ₹2,000 per reel, ₹5,000 per shoot, or open to discussion" /><span className="mt-2 block text-xs font-normal leading-5 text-cocoa/75">Final payout depends on campaign scope, role, usage rights, and written terms.</span></label><div className="rounded-[22px] border border-primary/15 bg-porcelain p-4 text-sm leading-6 text-cocoa"><ShieldCheck className="mb-2 h-5 w-5 text-primary" aria-hidden />Alina Popova does not support adult, obscene, illegal, exploitative, coercive, unsafe, or unpaid commercial creator work. You can accept or decline opportunities before they begin.</div></div><label className="block text-sm font-medium text-cocoa">Boundaries or work you are not comfortable doing <span className="font-normal text-cocoa/70">(optional)</span><textarea value={formData.boundaries} onChange={(event) => setValue('boundaries', event.target.value)} className={`${fieldClass} min-h-32`} placeholder="Example: No revealing outfits, no late-night shoots, no alcohol brands, no travel outside city" /><span className="mt-2 block text-xs font-normal leading-5 text-cocoa/75">We store this so you are not matched with unsuitable opportunities.</span></label></section>}

          {step === 3 && <section className="space-y-6"><div><h3 className="text-xl font-semibold text-espresso">Review and agree</h3><p className="mt-1 text-sm text-cocoa">Check the essentials before submitting. You can go back to edit anything.</p></div><div className="grid gap-4 rounded-[28px] border border-primary/15 bg-porcelain p-5 text-sm text-cocoa sm:grid-cols-2"><p><span className="block text-xs font-semibold text-cocoa/70">NAME</span>{formData.fullName}</p><p><span className="block text-xs font-semibold text-cocoa/70">CITY</span>{[formData.area, formData.city].filter(Boolean).join(', ')}</p><p><span className="block text-xs font-semibold text-cocoa/70">CONTACT</span>{formData.email}<br />{formData.whatsapp}</p><p><span className="block text-xs font-semibold text-cocoa/70">ROLES</span>{formData.roleTags.join(', ') || 'None selected'}</p><p className="sm:col-span-2"><span className="block text-xs font-semibold text-cocoa/70">FORMATS</span>{formData.formatTags.join(', ') || 'None selected'}</p></div><div className="rounded-[28px] border border-primary/15 bg-white p-5"><label className="flex gap-3 text-sm leading-6 text-cocoa"><input checked={formData.consents.legalAgreement} onChange={() => setFormData((current) => ({ ...current, consents: { ...current.consents, legalAgreement: !current.consents.legalAgreement } }))} type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary" />I agree to the Terms, Privacy Policy, Creator Agreement Summary, Content Usage Policy, Payment Policy, and Safety Policy.</label>{error('legalAgreement')}<p className="mt-4 text-xs leading-5 text-cocoa">{CREATOR_APPLICATION_CONSENT}</p><p className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold text-primary">{creatorAgreementLinks.map((item) => <Link key={item.href} href={item.href} className="underline underline-offset-4">{item.label}</Link>)}</p></div></section>}
        </div>

        {status === 'error' && <p role="alert" className="mt-6 flex gap-2 rounded-[22px] border border-merlot/30 bg-merlot/10 p-4 text-sm text-merlot"><AlertCircle className="h-5 w-5 shrink-0" aria-hidden />{message}</p>}
        <div className="sticky bottom-0 z-10 mt-8 flex items-center justify-between gap-3 border-t border-primary/10 bg-white/95 py-4 backdrop-blur lg:static lg:bg-transparent"><Button type="button" variant="ghost" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} iconLeft={<ChevronLeft className="h-4 w-4" aria-hidden />}>Back</Button>{step < steps.length - 1 ? <Button type="button" onClick={() => validate(step) && setStep((current) => Math.min(current + 1, steps.length - 1))} iconRight={<ChevronRight className="h-4 w-4" aria-hidden />}>Continue</Button> : <Button type="submit" disabled={status === 'submitting'} iconRight={status === 'submitting' ? undefined : <Check className="h-4 w-4" aria-hidden />}>{status === 'submitting' ? 'Submitting...' : 'Submit Creator Application'}</Button>}</div>
        <p className="mt-5 flex gap-2 text-xs leading-5 text-cocoa"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden />Your draft stays on this device until you submit or clear your browser data.</p>
      </form>
    </div>
  );
};
