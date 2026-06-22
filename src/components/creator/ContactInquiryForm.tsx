'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { COMPANY_INQUIRY_CONSENT, CONTACT_CONSENT, companyAgreementLinks } from '@/lib/legal';
import { safeJsonFetch } from '@/lib/safe-json-fetch';

type InquiryType = 'creator_support' | 'brand_inquiry' | 'safety_concern' | 'general';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  inquiryType: 'brand_inquiry' as InquiryType,
  message: '',
  companyName: '',
  companyCategory: '',
  packageInterest: '',
  budgetRange: '',
  timeline: '',
  campaignGoal: '',
  consent: false
};

interface ContactInquiryFormProps {
  initialInquiryType?: InquiryType;
}

export const ContactInquiryForm = ({ initialInquiryType = 'brand_inquiry' }: ContactInquiryFormProps) => {
  const [form, setForm] = useState({ ...initialForm, inquiryType: initialInquiryType });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const update = <K extends keyof typeof initialForm>(key: K, value: typeof initialForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setStatus('idle');
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setMessage('');
    try {
      const isCompanyInquiry = form.inquiryType === 'brand_inquiry';
      const result = await safeJsonFetch<{ id: string }>('/api/contact-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          inquiryType: form.inquiryType,
          message: form.message,
          consent: form.consent,
          details: isCompanyInquiry ? {
            companyName: form.companyName,
            companyCategory: form.companyCategory,
            packageInterest: form.packageInterest,
            budgetRange: form.budgetRange,
            timeline: form.timeline,
            campaignGoal: form.campaignGoal
          } : {}
        })
      });
      if (!result.ok) throw new Error(result.error ?? 'Something went wrong while submitting. Please try again.');
      setForm({ ...initialForm, inquiryType: initialInquiryType });
      setStatus('success');
      setMessage(isCompanyInquiry ? 'Your campaign brief has been received. We will respond using the contact details you provided.' : 'Your message has been received. The relevant team will respond using the contact details you provided.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong while submitting. Please try again.');
    }
  };

  const isCompanyInquiry = form.inquiryType === 'brand_inquiry';
  const consentCopy = isCompanyInquiry ? COMPANY_INQUIRY_CONSENT : CONTACT_CONSENT;
  const consentLabel = isCompanyInquiry
    ? 'I have read and agree to the Terms, Privacy Policy, Company Agreement Summary, Refund Policy, Content Usage Policy, Payment Policy, and Safety Policy.'
    : 'I agree to be contacted about this request.';

  return (
    <form onSubmit={submit} className="rounded-[40px] border border-[#ECECF0] bg-white p-6 shadow-soft sm:p-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Send a message</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-espresso">We&apos;ll route it to the right team.</h2>
        <p className="mt-3 text-sm leading-6 text-cocoa">For safety concerns, share only the information needed to explain the issue. Do not attach identity documents or private media.</p>
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-cocoa">Full name<input value={form.fullName} onChange={(event) => update('fullName', event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#ECECF0] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-neon focus:ring-4 focus:ring-neon/10" autoComplete="name" placeholder="Example: Priya Shah" required /></label>
        <label className="text-sm font-semibold text-cocoa">Email address<input value={form.email} onChange={(event) => update('email', event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#ECECF0] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-neon focus:ring-4 focus:ring-neon/10" type="email" autoComplete="email" placeholder="Example: priya@company.com" required /></label>
        <label className="text-sm font-semibold text-cocoa">Phone / WhatsApp <span className="font-normal text-cocoa/70">(optional)</span><input value={form.phone} onChange={(event) => update('phone', event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#ECECF0] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-neon focus:ring-4 focus:ring-neon/10" inputMode="tel" autoComplete="tel" placeholder="Example: +91 98765 43210" /></label>
        <label className="text-sm font-semibold text-cocoa">Inquiry type<select value={form.inquiryType} onChange={(event) => update('inquiryType', event.target.value as InquiryType)} className="mt-2 min-h-12 w-full rounded-xl border border-[#ECECF0] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-neon focus:ring-4 focus:ring-neon/10"><option value="brand_inquiry">Company marketing inquiry</option><option value="creator_support">Creator support</option><option value="safety_concern">Safety concern</option><option value="general">General inquiry</option></select></label>
      </div>
      {isCompanyInquiry && <div className="mt-5 rounded-2xl border border-primary/15 bg-porcelain/45 p-5"><p className="text-xs font-semibold uppercase tracking-[0.13em] text-primary">Campaign brief</p><p className="mt-2 text-sm leading-6 text-cocoa">These details help us route the request to the right service and prepare a relevant response.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-cocoa">Company / brand name<input value={form.companyName} onChange={(event) => update('companyName', event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#ECECF0] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-neon focus:ring-4 focus:ring-neon/10" autoComplete="organization" placeholder="Example: GlowSkin Studio" required /></label><label className="text-sm font-semibold text-cocoa">Company category<input value={form.companyCategory} onChange={(event) => update('companyCategory', event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#ECECF0] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-neon focus:ring-4 focus:ring-neon/10" placeholder="Example: Beauty, wellness, e-commerce, or SaaS" required /></label><label className="text-sm font-semibold text-cocoa">Package interest<select value={form.packageInterest} onChange={(event) => update('packageInterest', event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#ECECF0] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-neon focus:ring-4 focus:ring-neon/10" required><option value="">Choose the closest package</option><option>UGC Starter Pack</option><option>Creator Launch Campaign</option><option>Livestream Sales Sprint</option><option>Monthly Creator Marketing Engine</option><option>Not sure yet</option></select></label><label className="text-sm font-semibold text-cocoa">Budget range<select value={form.budgetRange} onChange={(event) => update('budgetRange', event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#ECECF0] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-neon focus:ring-4 focus:ring-neon/10" required><option value="">Choose a range</option><option>Under ₹50,000</option><option>₹50,000–₹1.2L</option><option>₹1.2L–₹2L</option><option>₹2L–₹4L</option><option>₹4L+</option><option>Need guidance</option></select></label><label className="text-sm font-semibold text-cocoa">Timeline<select value={form.timeline} onChange={(event) => update('timeline', event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#ECECF0] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-neon focus:ring-4 focus:ring-neon/10" required><option value="">Choose a timeline</option><option>Within 2 weeks</option><option>Within 1 month</option><option>1–3 months</option><option>Planning ahead</option></select></label></div><label className="mt-5 block text-sm font-semibold text-cocoa">Tell us what you want to promote, launch, or improve<textarea value={form.campaignGoal} onChange={(event) => update('campaignGoal', event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-[#ECECF0] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-neon focus:ring-4 focus:ring-neon/10" placeholder="Example: We are launching a skincare product and need UGC videos, Reels, and one Instagram Live with a trained host." required /></label></div>}
      <label className="mt-5 block text-sm font-semibold text-cocoa">{isCompanyInquiry ? 'Anything else? (optional)' : 'Message'}<textarea value={form.message} onChange={(event) => update('message', event.target.value)} className="mt-2 min-h-36 w-full rounded-xl border border-[#ECECF0] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-neon focus:ring-4 focus:ring-neon/10" placeholder={isCompanyInquiry ? 'Add useful context, links, product details, or requirements.' : 'Tell us what you need help with and the best way to respond.'} required={!isCompanyInquiry} /></label>
      <div className="mt-5 rounded-[22px] border border-primary/15 bg-porcelain p-4"><label className="flex gap-3 text-sm leading-6 text-cocoa"><input checked={form.consent} onChange={(event) => update('consent', event.target.checked)} type="checkbox" className="mt-1 h-4 w-4 shrink-0" required />{consentLabel}</label>{isCompanyInquiry && <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-primary">{companyAgreementLinks.map((item) => <Link key={item.href} href={item.href} className="underline underline-offset-4">{item.label}</Link>)}</p>}</div>
      {status === 'success' && <p role="status" className="mt-5 flex gap-2 rounded-2xl border border-sage/25 bg-sage/10 p-4 text-sm text-[#42674D]"><CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />{message}</p>}
      {status === 'error' && <p role="alert" className="mt-5 rounded-2xl border border-merlot/25 bg-merlot/10 p-4 text-sm text-merlot">{message}</p>}
      <div className="mt-6 flex justify-center"><Button type="submit" disabled={status === 'sending'} iconRight={status === 'sending' ? undefined : <Send className="h-4 w-4" aria-hidden />}>{status === 'sending' ? 'Sending…' : isCompanyInquiry ? 'Submit Inquiry' : 'Send Message'}</Button></div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-5 text-cocoa">{consentCopy}</p>
    </form>
  );
};
