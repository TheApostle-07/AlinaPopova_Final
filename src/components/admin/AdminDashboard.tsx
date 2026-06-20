'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, LogOut, Search, ShieldAlert, Star } from 'lucide-react';
import type { ApplicationRecord, ApplicationStatus } from '@/lib/database';
import { Button } from '@/components/ui/Button';

const statuses: Array<{ value: ApplicationStatus; label: string }> = [
  { value: 'new', label: 'New' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'call_scheduled', label: 'Call scheduled' },
  { value: 'selected', label: 'Selected' },
  { value: 'training', label: 'Training' },
  { value: 'roster_ready', label: 'Roster ready' },
  { value: 'rejected', label: 'Rejected' }
];

const tierOptions = ['', 'Applicant Pool', 'Creator Launch Intake', 'Paid Opportunity Roster'];

interface AdminDashboardProps {
  initialAuthenticated: boolean;
  configured: boolean;
}

const statusLabel = (status: ApplicationStatus) => statuses.find((item) => item.value === status)?.label ?? status;

export const AdminDashboard = ({ initialAuthenticated, configured }: AdminDashboardProps) => {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [password, setPassword] = useState('');
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ApplicationStatus>('all');
  const [topTenOnly, setTopTenOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/applications', { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Unable to load applications.');
      setApplications(result.applications as ApplicationRecord[]);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load applications.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (authenticated) void loadApplications(); }, [authenticated, loadApplications]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return applications.filter((item) => {
      const haystack = [item.fullName, item.email, item.whatsapp, item.city, item.languages, item.categories.join(' ')].join(' ').toLowerCase();
      return (!normalized || haystack.includes(normalized)) && (statusFilter === 'all' || item.status === statusFilter) && (!topTenOnly || item.isTop10);
    });
  }, [applications, query, statusFilter, topTenOnly]);

  const selected = applications.find((item) => item.id === selectedId) ?? null;

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Unable to sign in.');
      setPassword('');
      setAuthenticated(true);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setApplications([]);
    setSelectedId(null);
    setAuthenticated(false);
  };

  const saveSelected = async (next: ApplicationRecord) => {
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: next.id, status: next.status, isTop10: next.isTop10, adminNotes: next.adminNotes, creatorTier: next.creatorTier })
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Unable to save changes.');
      setApplications((current) => current.map((item) => item.id === next.id ? next : item));
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save changes.');
    } finally {
      setSaving(false);
    }
  };

  if (!authenticated) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16 sm:px-6">
        <form onSubmit={login} className="w-full border border-emerald-950/10 bg-white p-7 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Private workspace</p>
          <h1 className="mt-3 text-2xl font-semibold text-foreground">Application administration</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Use the administrator password to review creator applications and roster progress.</p>
          {!configured && <p role="alert" className="mt-5 flex gap-2 border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"><ShieldAlert className="h-5 w-5 shrink-0" aria-hidden />Set both ADMIN_PASSWORD and ADMIN_SESSION_SECRET in the deployment environment before using this workspace.</p>}
          <label className="mt-6 block text-sm font-medium text-slate-700">Password<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" disabled={!configured || loading} /></label>
          {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
          <Button type="submit" className="mt-6 w-full" disabled={!configured || loading}>{loading ? 'Signing in…' : 'Sign in'}</Button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-surface min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-7">
          <div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Alina Popova Studio</p><h1 className="mt-2 font-display text-4xl text-espresso">Creator intake</h1><p className="mt-2 text-sm text-cocoa">{applications.length} total applications · {applications.filter((item) => item.isTop10).length} marked top 10</p></div>
          <div className="flex gap-3"><a href="/api/admin/applications?format=csv" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-primary/25 bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-blush/15"><Download className="h-4 w-4" aria-hidden />Export CSV</a><button type="button" onClick={signOut} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-primary/25 bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-blush/15"><LogOut className="h-4 w-4" aria-hidden />Sign out</button></div>
        </div>
        {error && <p role="alert" className="mt-5 border border-red-400/40 bg-red-950/50 p-3 text-sm text-red-100">{error}</p>}
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="border border-white/10 bg-slate-900">
            <div className="flex flex-wrap gap-3 border-b border-white/10 p-4">
              <label className="relative min-w-[220px] flex-1"><Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" aria-hidden /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter city, language, category…" className="min-h-11 w-full rounded-md border border-white/10 bg-slate-950 py-2 pl-10 pr-3 text-sm text-white outline-none focus:border-emerald-300" /></label>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | ApplicationStatus)} className="min-h-11 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none focus:border-emerald-300"><option value="all">All statuses</option>{statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>
              <label className="flex min-h-11 items-center gap-2 rounded-md border border-white/10 px-3 text-sm text-slate-300"><input type="checkbox" checked={topTenOnly} onChange={(event) => setTopTenOnly(event.target.checked)} />Top 10 only</label>
            </div>
            <div className="max-h-[68vh] overflow-auto">
              {loading ? <p className="p-6 text-sm text-slate-400">Loading applications…</p> : filtered.length === 0 ? <p className="p-6 text-sm text-slate-400">No matching applications.</p> : <table className="w-full min-w-[720px] text-left text-sm"><thead className="sticky top-0 bg-slate-950 text-xs uppercase tracking-[0.1em] text-slate-400"><tr><th className="p-4">Applicant</th><th className="p-4">City / language</th><th className="p-4">Interest</th><th className="p-4">Status</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id} onClick={() => setSelectedId(item.id)} className={`cursor-pointer border-t border-white/10 transition hover:bg-white/5 ${selectedId === item.id ? 'bg-emerald-300/10' : ''}`}><td className="p-4"><p className="font-semibold text-white">{item.fullName}{item.isTop10 && <Star className="ml-2 inline h-4 w-4 fill-amber-300 text-amber-300" aria-label="Top 10" />}</p><p className="mt-1 text-xs text-slate-400">{item.email}<br />{item.whatsapp}</p></td><td className="p-4 text-slate-300">{item.city}<br /><span className="text-xs text-slate-500">{item.languages}</span></td><td className="p-4 text-slate-300">{item.categories.join(', ')}</td><td className="p-4"><span className="rounded-md border border-white/10 px-2 py-1 text-xs text-emerald-200">{statusLabel(item.status)}</span>{item.duplicateCount > 1 && <p className="mt-2 text-xs text-amber-300">Possible duplicate</p>}</td></tr>)}</tbody></table>}
            </div>
          </section>
          <section className="min-h-[480px] border border-white/10 bg-slate-900 p-5">
            {selected ? <ApplicationEditor application={selected} saving={saving} onChange={(next) => setApplications((current) => current.map((item) => item.id === next.id ? next : item))} onSave={saveSelected} /> : <div className="flex min-h-[400px] items-center justify-center text-center text-sm text-slate-400">Select an application to review its details, notes, tier, and intake status.</div>}
          </section>
        </div>
      </div>
    </main>
  );
};

interface ApplicationEditorProps {
  application: ApplicationRecord;
  saving: boolean;
  onChange: (next: ApplicationRecord) => void;
  onSave: (next: ApplicationRecord) => void;
}

const ApplicationEditor = ({ application, saving, onChange, onSave }: ApplicationEditorProps) => (
  <div>
    <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs text-emerald-300">#{application.id}</p><h2 className="mt-2 text-2xl font-semibold text-white">{application.fullName}</h2><p className="mt-2 text-sm text-slate-400">Submitted {new Date(application.submittedAt).toLocaleString('en-IN')}</p></div><label className="flex items-center gap-2 rounded-md border border-amber-300/40 bg-amber-300/10 px-3 py-2 text-sm text-amber-100"><input checked={application.isTop10} onChange={(event) => onChange({ ...application, isTop10: event.target.checked })} type="checkbox" />Top 10</label></div>
    {application.duplicateCount > 1 && <p className="mt-5 border border-amber-300/30 bg-amber-300/10 p-3 text-sm text-amber-100">Potential duplicate: {application.duplicateCount} records share the same contact fingerprint.</p>}
    <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><Info label="Email" value={application.email} /><Info label="WhatsApp" value={application.whatsapp} /><Info label="City" value={application.city} /><Info label="Languages" value={application.languages} /><Info label="Camera comfort" value={application.cameraComfort} /><Info label="Availability" value={application.availability} /></div>
    <div className="mt-5 border-y border-white/10 py-5 text-sm"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Categories</p><p className="mt-2 text-slate-200">{application.categories.join(', ')}</p><p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Boundaries / concerns</p><p className="mt-2 whitespace-pre-wrap leading-6 text-slate-300">{application.boundaries || 'None recorded'}</p></div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm text-slate-300">Status<select value={application.status} onChange={(event) => onChange({ ...application, status: event.target.value as ApplicationStatus })} className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-slate-950 px-3 text-white outline-none focus:border-emerald-300">{statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><label className="text-sm text-slate-300">Creator tier<select value={application.creatorTier ?? ''} onChange={(event) => onChange({ ...application, creatorTier: event.target.value || null })} className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-slate-950 px-3 text-white outline-none focus:border-emerald-300">{tierOptions.map((item) => <option key={item} value={item}>{item || 'Not assigned'}</option>)}</select></label></div>
    <label className="mt-5 block text-sm text-slate-300">Internal notes<textarea value={application.adminNotes ?? ''} onChange={(event) => onChange({ ...application, adminNotes: event.target.value })} className="mt-2 min-h-32 w-full rounded-md border border-white/10 bg-slate-950 p-3 text-sm text-white outline-none focus:border-emerald-300" placeholder="Private notes for the operations team" /></label>
    <div className="mt-5 flex flex-wrap gap-3"><Button type="button" onClick={() => onSave(application)} disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button>{application.instagramUrl && <a href={application.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-md border border-white/15 px-4 text-sm font-semibold text-white hover:bg-white/10">Instagram</a>}{application.youtubeUrl && <a href={application.youtubeUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-md border border-white/15 px-4 text-sm font-semibold text-white hover:bg-white/10">YouTube</a>}</div>
  </div>
);

const Info = ({ label, value }: { label: string; value: string }) => <div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-1 break-words text-slate-200">{value || 'Not provided'}</p></div>;
