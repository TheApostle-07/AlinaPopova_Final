'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { COMPLAINT_CONSENT } from '@/lib/legal';
import { safeJsonFetch } from '@/lib/safe-json-fetch';

const fieldClass = 'mt-2 min-h-12 w-full rounded-[20px] border border-[#ECE8EC] bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10';

export const ComplaintForm = () => {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', reporterRole: '', issueType: '', relatedEntity: '', description: '', urgency: 'medium', evidenceUrl: '', consent: false });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const update = (key: keyof typeof form, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setMessage('');
    const result = await safeJsonFetch<{ id: string }>('/api/complaints', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (!result.ok) {
      setStatus('error');
      setMessage(result.error ?? 'Something went wrong while submitting. Please try again.');
      return;
    }
    setForm({ fullName: '', email: '', phone: '', reporterRole: '', issueType: '', relatedEntity: '', description: '', urgency: 'medium', evidenceUrl: '', consent: false });
    setStatus('success');
    setMessage('Your concern has been received. We will review it and respond using the contact details you provided. If there is immediate danger, contact local authorities.');
  };

  return (
    <form onSubmit={submit} className="rounded-[40px] border border-[#ECE8EC] bg-white p-6 shadow-soft sm:p-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Questions or concerns</p>
        <h2 className="mt-3 font-display text-3xl text-espresso">Report a concern safely and clearly.</h2>
        <p className="mt-3 text-sm leading-6 text-cocoa">Share only what is needed to explain the concern. Do not include identity documents, intimate media, passwords, or anything unnecessary for an initial review.</p>
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-cocoa">Full name<input required value={form.fullName} onChange={(event) => update('fullName', event.target.value)} className={fieldClass} autoComplete="name" placeholder="Example: Alina Sharma" /></label>
        <label className="text-sm font-semibold text-cocoa">Email address<input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} className={fieldClass} autoComplete="email" placeholder="Example: alina@example.com" /></label>
        <label className="text-sm font-semibold text-cocoa">Phone / WhatsApp <span className="font-normal text-cocoa/70">(optional)</span><input value={form.phone} onChange={(event) => update('phone', event.target.value)} className={fieldClass} inputMode="tel" autoComplete="tel" placeholder="Example: +91 98765 43210" /></label>
        <label className="text-sm font-semibold text-cocoa">Your role<select required value={form.reporterRole} onChange={(event) => update('reporterRole', event.target.value)} className={fieldClass}><option value="">Choose your role</option><option value="creator">Creator</option><option value="company">Company</option><option value="visitor">Visitor</option><option value="other">Other</option></select></label>
        <label className="text-sm font-semibold text-cocoa">What is this about?<select required value={form.issueType} onChange={(event) => update('issueType', event.target.value)} className={fieldClass}><option value="">Choose an issue type</option><option value="safety_concern">Safety concern</option><option value="harassment">Harassment / inappropriate conduct</option><option value="content_misuse">Content misuse</option><option value="payment_issue">Payment issue</option><option value="privacy_request">Privacy request</option><option value="company_conduct">Company conduct issue</option><option value="creator_conduct">Creator conduct issue</option><option value="other">Other</option></select></label>
        <label className="text-sm font-semibold text-cocoa">Urgency<select value={form.urgency} onChange={(event) => update('urgency', event.target.value)} className={fieldClass}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select></label>
        <label className="text-sm font-semibold text-cocoa sm:col-span-2">Related campaign or person <span className="font-normal text-cocoa/70">(optional)</span><input value={form.relatedEntity} onChange={(event) => update('relatedEntity', event.target.value)} className={fieldClass} placeholder="Example: campaign name, company, creator, or contact person" /></label>
        <label className="text-sm font-semibold text-cocoa sm:col-span-2">Evidence link or file <span className="font-normal text-cocoa/70">(optional)</span><input value={form.evidenceUrl} onChange={(event) => update('evidenceUrl', event.target.value)} className={fieldClass} placeholder="Example: Google Drive link, screenshot link, or campaign reference" /><span className="mt-2 block text-xs font-normal leading-5 text-cocoa/75">Only share information you are comfortable providing.</span></label>
      </div>
      <label className="mt-5 block text-sm font-semibold text-cocoa">Describe the concern<textarea required minLength={10} value={form.description} onChange={(event) => update('description', event.target.value)} className={`${fieldClass} min-h-40`} placeholder="Share what happened, who was involved, when it happened, and what support you need." /></label>
      <div className="mt-5 rounded-[22px] border border-primary/15 bg-porcelain p-4"><label className="flex gap-3 text-sm leading-6 text-cocoa"><input required checked={form.consent} onChange={(event) => update('consent', event.target.checked)} type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary" />I agree that Alina Popova Studio may use the information provided to review and respond to this complaint according to the Privacy Policy.</label><p className="mt-3 text-xs leading-5 text-cocoa">{COMPLAINT_CONSENT}</p><div className="mt-3 flex gap-3 text-xs font-semibold text-primary"><Link href="/privacy" className="underline underline-offset-4">Privacy</Link><Link href="/safety" className="underline underline-offset-4">Safety</Link></div></div>
      {status === 'success' && <p role="status" className="mt-5 flex gap-2 rounded-2xl border border-sage/25 bg-sage/10 p-4 text-sm text-[#42674D]"><CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />{message}</p>}
      {status === 'error' && <p role="alert" className="mt-5 flex gap-2 rounded-2xl border border-merlot/25 bg-merlot/10 p-4 text-sm text-merlot"><AlertCircle className="h-5 w-5 shrink-0" aria-hidden />{message}</p>}
      <div className="mt-6 flex justify-center"><Button type="submit" disabled={status === 'sending'} iconRight={status === 'sending' ? undefined : <Send className="h-4 w-4" aria-hidden />}>{status === 'sending' ? 'Submitting...' : 'Submit Complaint'}</Button></div>
    </form>
  );
};
