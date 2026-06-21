'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, FileStack, Handshake, LogOut, Search, ShieldAlert, Sparkles, Star, UsersRound } from 'lucide-react';
import type { ApplicationRecord, ApplicationStatus, CompanyBriefMatchRecord, CompanyBriefRecord, CompanyBriefStatus, ContactInquiryRecord, MatchAcceptanceStatus, MatchDeliveryStatus, MatchPayoutStatus, MatchUsageStatus } from '@/lib/database';
import { getCreatorMatches } from '@/lib/matching';
import { Button } from '@/components/ui/Button';

const creatorStatuses: Array<{ value: ApplicationStatus; label: string }> = [
  { value: 'new', label: 'New application' },
  { value: 'review', label: 'Review' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'call_needed', label: 'Call needed' },
  { value: 'selected', label: 'Selected' },
  { value: 'training', label: 'Training' },
  { value: 'roster_ready', label: 'Roster ready' },
  { value: 'matched', label: 'Matched' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'not_selected', label: 'Not selected' },
  { value: 'rejected_safety', label: 'Rejected / safety' }
];

const companyStatuses: Array<{ value: CompanyBriefStatus; label: string }> = [
  { value: 'new_brief', label: 'New brief' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'needs_call', label: 'Needs call' },
  { value: 'proposal_needed', label: 'Proposal needed' },
  { value: 'proposal_sent', label: 'Proposal sent' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'in_production', label: 'In production' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'completed', label: 'Completed' },
  { value: 'lost', label: 'Lost' },
  { value: 'rejected_unsafe', label: 'Rejected / unsafe' }
];

const tierOptions = ['', 'Applicant Pool', 'Creator Launch Intake', 'Paid Opportunity Roster'];

interface AdminDashboardProps {
  initialAuthenticated: boolean;
  configured: boolean;
}

const labelFor = (value: string, options: Array<{ value: string; label: string }>) => options.find((option) => option.value === value)?.label ?? value.replaceAll('_', ' ');
const TagList = ({ items }: { items: string[] }) => items.length > 0 ? <div className="mt-3 flex flex-wrap gap-1.5">{items.slice(0, 6).map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">{item.replaceAll('_', ' ')}</span>)}</div> : <p className="mt-3 text-xs text-slate-500">No tags recorded</p>;

export const AdminDashboard = ({ initialAuthenticated, configured }: AdminDashboardProps) => {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [password, setPassword] = useState('');
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [briefs, setBriefs] = useState<CompanyBriefRecord[]>([]);
  const [campaignMatches, setCampaignMatches] = useState<CompanyBriefMatchRecord[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiryRecord[]>([]);
  const [query, setQuery] = useState('');
  const [creatorStatusFilter, setCreatorStatusFilter] = useState<'all' | ApplicationStatus>('all');
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [manualCreatorId, setManualCreatorId] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadWorkspace = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [applicationsResponse, briefsResponse, matchesResponse, inquiriesResponse] = await Promise.all([
        fetch('/api/admin/applications', { cache: 'no-store' }),
        fetch('/api/admin/company-briefs', { cache: 'no-store' }),
        fetch('/api/admin/company-brief-matches', { cache: 'no-store' }),
        fetch('/api/admin/contact-inquiries', { cache: 'no-store' })
      ]);
      const [applicationsResult, briefsResult, matchesResult, inquiriesResult] = await Promise.all([applicationsResponse.json(), briefsResponse.json(), matchesResponse.json(), inquiriesResponse.json()]);
      if (!applicationsResponse.ok || !applicationsResult.ok) throw new Error(applicationsResult.error ?? 'Unable to load creator applications.');
      if (!briefsResponse.ok || !briefsResult.ok) throw new Error(briefsResult.error ?? 'Unable to load company briefs.');
      if (!matchesResponse.ok || !matchesResult.ok) throw new Error(matchesResult.error ?? 'Unable to load campaign matches.');
      if (!inquiriesResponse.ok || !inquiriesResult.ok) throw new Error(inquiriesResult.error ?? 'Unable to load contact inquiries.');
      setApplications(applicationsResult.applications as ApplicationRecord[]);
      setBriefs(briefsResult.briefs as CompanyBriefRecord[]);
      setCampaignMatches(matchesResult.matches as CompanyBriefMatchRecord[]);
      setInquiries(inquiriesResult.inquiries as ContactInquiryRecord[]);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load the studio workspace.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) void loadWorkspace();
  }, [authenticated, loadWorkspace]);

  const filteredCreators = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return applications.filter((creator) => {
      const haystack = [creator.fullName, creator.email, creator.whatsapp, creator.city, creator.area, creator.languages, ...creator.roleTags, ...creator.formatTags, ...creator.categoryTags].join(' ').toLowerCase();
      return (!normalized || haystack.includes(normalized)) && (creatorStatusFilter === 'all' || creator.status === creatorStatusFilter);
    });
  }, [applications, creatorStatusFilter, query]);

  const selectedCreator = applications.find((creator) => creator.id === selectedCreatorId) ?? null;
  const selectedBrief = briefs.find((brief) => brief.id === selectedBriefId) ?? briefs[0] ?? null;
  const suggestedMatches = useMemo(() => selectedBrief ? getCreatorMatches(selectedBrief, applications) : [], [applications, selectedBrief]);
  const selectedCampaignMatches = selectedBrief ? campaignMatches.filter((match) => match.briefId === selectedBrief.id) : [];
  const selectedCampaignCreatorIds = new Set(selectedCampaignMatches.map((match) => match.creatorId));
  const manualCreators = applications.filter((creator) => !selectedCampaignCreatorIds.has(creator.id) && !['rejected', 'rejected_safety', 'not_selected'].includes(creator.status));

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
    setBriefs([]);
    setCampaignMatches([]);
    setInquiries([]);
    setSelectedCreatorId(null);
    setSelectedBriefId(null);
    setAuthenticated(false);
  };

  const saveCreator = async (creator: ApplicationRecord) => {
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: creator.id, status: creator.status, isTop10: creator.isTop10, adminNotes: creator.adminNotes, creatorTier: creator.creatorTier })
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Unable to save creator changes.');
      setApplications((current) => current.map((item) => item.id === creator.id ? creator : item));
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save creator changes.');
    } finally {
      setSaving(false);
    }
  };

  const saveBrief = async (brief: CompanyBriefRecord) => {
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin/company-briefs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: brief.id, status: brief.status, adminNotes: brief.adminNotes })
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Unable to save company brief changes.');
      setBriefs((current) => current.map((item) => item.id === brief.id ? brief : item));
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save company brief changes.');
    } finally {
      setSaving(false);
    }
  };

  const addCreatorToCampaign = async (creatorId: string) => {
    if (!selectedBrief || !creatorId) return;
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin/company-brief-matches', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ briefId: selectedBrief.id, creatorId }) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Unable to add the creator to this campaign.');
      await loadWorkspace();
      setManualCreatorId('');
    } catch (matchError) {
      setError(matchError instanceof Error ? matchError.message : 'Unable to add the creator to this campaign.');
    } finally {
      setSaving(false);
    }
  };

  const saveCampaignMatch = async (match: CompanyBriefMatchRecord) => {
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin/company-brief-matches', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(match) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Unable to save campaign match status.');
      setCampaignMatches((current) => current.map((item) => item.id === match.id ? match : item));
    } catch (matchError) {
      setError(matchError instanceof Error ? matchError.message : 'Unable to save campaign match status.');
    } finally {
      setSaving(false);
    }
  };

  if (!authenticated) {
    return <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16 sm:px-6"><form onSubmit={login} className="w-full rounded-[36px] border border-primary/15 bg-white p-7 shadow-soft"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Private workspace</p><h1 className="mt-3 text-2xl font-semibold text-foreground">Studio administration</h1><p className="mt-3 text-sm leading-6 text-slate-600">Review company briefs, creator applications, and campaign-match signals in one place.</p>{!configured && <p role="alert" className="mt-5 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"><ShieldAlert className="h-5 w-5 shrink-0" aria-hidden />Set both ADMIN_PASSWORD and ADMIN_SESSION_SECRET in the deployment environment before using this workspace.</p>}<label className="mt-6 block text-sm font-medium text-cocoa">Password<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-primary/20 bg-white px-3 py-2.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" disabled={!configured || loading} /></label>{error && <p role="alert" className="mt-3 rounded-xl bg-merlot/10 px-3 py-2 text-sm text-merlot">{error}</p>}<Button type="submit" className="mt-6 w-full" disabled={!configured || loading}>{loading ? 'Signing in...' : 'Sign in'}</Button></form></main>;
  }

  return (
    <main className="admin-surface min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-7"><div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Alina Popova Studio</p><h1 className="mt-2 font-display text-4xl text-espresso">Studio operations</h1><p className="mt-2 text-sm text-cocoa">{briefs.length} company briefs · {applications.length} creator applications · {inquiries.length} inbox messages</p></div><div className="flex flex-wrap gap-3"><a href="/api/admin/applications?format=csv" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/25 bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-card transition hover:bg-porcelain"><Download className="h-4 w-4" aria-hidden />Export creators</a><button type="button" onClick={signOut} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/25 bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-card transition hover:bg-porcelain"><LogOut className="h-4 w-4" aria-hidden />Sign out</button></div></header>
        {error && <p role="alert" className="mt-5 rounded-xl border border-merlot/30 bg-merlot/10 p-3 text-sm text-merlot">{error}</p>}

        <section className="mt-6 grid gap-4 md:grid-cols-3"><Metric icon={FileStack} label="Company briefs" value={briefs.length} detail="Briefs ready to qualify" /><Metric icon={UsersRound} label="Creator pipeline" value={applications.length} detail={`${applications.filter((creator) => creator.status === 'roster_ready' || creator.status === 'active').length} roster-ready or active`} /><Metric icon={Sparkles} label="Matching board" value={suggestedMatches.length} detail={selectedBrief ? `Suggestions for ${selectedBrief.companyName}` : 'Select a company brief'} /></section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]"><div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-card"><div className="flex flex-wrap gap-3 border-b border-white/10 p-4"><label className="relative min-w-[220px] flex-1"><Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" aria-hidden /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter creator city, role, format..." className="min-h-11 w-full rounded-xl border border-white/10 bg-slate-950 py-2 pl-10 pr-3 text-sm text-white outline-none focus:border-primary" /></label><select value={creatorStatusFilter} onChange={(event) => setCreatorStatusFilter(event.target.value as 'all' | ApplicationStatus)} className="min-h-11 rounded-xl border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none focus:border-primary"><option value="all">All statuses</option>{creatorStatuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div><div className="max-h-[620px] overflow-auto">{loading ? <p className="p-6 text-sm text-slate-400">Loading creators...</p> : filteredCreators.length === 0 ? <p className="p-6 text-sm text-slate-400">No matching creator applications.</p> : <table className="w-full min-w-[720px] text-left text-sm"><thead className="sticky top-0 bg-slate-950 text-xs uppercase tracking-[0.1em] text-slate-400"><tr><th className="p-4">Creator</th><th className="p-4">Location</th><th className="p-4">Roles</th><th className="p-4">Status</th></tr></thead><tbody>{filteredCreators.map((creator) => <tr key={creator.id} onClick={() => setSelectedCreatorId(creator.id)} className={`cursor-pointer border-t border-white/10 transition hover:bg-white/5 ${selectedCreatorId === creator.id ? 'bg-primary/10' : ''}`}><td className="p-4"><p className="font-semibold text-white">{creator.fullName}{creator.isTop10 && <Star className="ml-2 inline h-4 w-4 fill-amber-300 text-amber-300" aria-label="Priority creator" />}</p><p className="mt-1 text-xs text-slate-400">{creator.email}<br />{creator.whatsapp}</p></td><td className="p-4 text-slate-300">{creator.city}<br /><span className="text-xs text-slate-500">{creator.experienceLevel.replaceAll('_', ' ') || 'Experience not set'}</span></td><td className="p-4 text-slate-300">{creator.roleTags.slice(0, 3).map((role) => role.replaceAll('_', ' ')).join(', ') || creator.categories.join(', ')}</td><td className="p-4"><span className="rounded-md border border-white/10 px-2 py-1 text-xs text-primary">{labelFor(creator.status, creatorStatuses)}</span>{creator.duplicateCount > 1 && <p className="mt-2 text-xs text-amber-300">Possible duplicate</p>}</td></tr>)}</tbody></table>}</div></div><section className="min-h-[480px] rounded-[32px] border border-white/10 bg-slate-900 p-5 shadow-card">{selectedCreator ? <CreatorEditor creator={selectedCreator} saving={saving} onChange={(next) => setApplications((current) => current.map((item) => item.id === next.id ? next : item))} onSave={saveCreator} /> : <div className="flex min-h-[400px] items-center justify-center text-center text-sm text-slate-400">Select a creator to review roles, formats, availability, boundaries, notes, and status.</div>}</section></section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]"><div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-card"><div className="border-b border-white/10 px-5 py-4"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Company brief pipeline</p></div>{briefs.length === 0 ? <p className="p-6 text-sm text-slate-400">Company briefs submitted through the guided campaign path will appear here.</p> : <div className="max-h-[560px] overflow-auto">{briefs.map((brief) => <button key={brief.id} type="button" onClick={() => setSelectedBriefId(brief.id)} className={`w-full border-b border-white/10 p-5 text-left transition hover:bg-white/5 ${selectedBrief?.id === brief.id ? 'bg-primary/10' : ''}`}><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{brief.businessCategory.replaceAll('_', ' ')}</p><h2 className="mt-2 text-lg font-semibold text-white">{brief.companyName}</h2><p className="mt-1 text-sm text-slate-400">{brief.contactName} · {brief.budgetRange.replaceAll('_', ' ')}</p></div><span className="rounded-md border border-white/10 px-2 py-1 text-xs text-primary">{labelFor(brief.status, companyStatuses)}</span></div><p className="mt-3 text-sm font-medium text-slate-200">Recommended: {brief.recommendedPackage}</p><TagList items={[...brief.goals, ...brief.platforms, ...brief.talentNeeds]} /></button>)}</div>}</div><section className="min-h-[480px] rounded-[32px] border border-white/10 bg-slate-900 p-5 shadow-card">{selectedBrief ? <CompanyBriefEditor brief={selectedBrief} saving={saving} onChange={(next) => setBriefs((current) => current.map((item) => item.id === next.id ? next : item))} onSave={saveBrief} /> : <div className="flex min-h-[400px] items-center justify-center text-center text-sm text-slate-400">Select a company brief to review its campaign needs and route it through the pipeline.</div>}</section></section>

        <section className="mt-6 overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
            <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Campaign matching board</p><p className="mt-1 text-sm text-slate-400">Suggestions use requested talent, platforms, services, and business-category tags. Admin approval and written terms remain required.</p></div>
            {selectedBrief && <span className="rounded-full border border-primary/30 px-3 py-1 text-xs font-semibold text-primary">{selectedBrief.companyName}</span>}
          </div>
          {!selectedBrief ? <p className="p-6 text-sm text-slate-400">Select a company brief above to see matching signals.</p> : <>
            <div className="grid gap-4 border-b border-white/10 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Campaign requirements</p><TagList items={[...selectedBrief.talentNeeds, ...selectedBrief.platforms, ...selectedBrief.services]} /><p className="mt-3 text-xs text-slate-500">{selectedBrief.businessCategory.replaceAll('_', ' ')} · {selectedBrief.budgetRange.replaceAll('_', ' ')} · {selectedBrief.timeline.replaceAll('_', ' ')}</p></div>
              <div className="flex flex-wrap gap-2"><label className="sr-only" htmlFor="manual-creator">Add a creator manually</label><select id="manual-creator" value={manualCreatorId} onChange={(event) => setManualCreatorId(event.target.value)} className="min-h-10 min-w-[220px] rounded-xl border border-white/15 bg-slate-950 px-3 text-sm text-white outline-none focus:border-primary"><option value="">Add a creator manually</option>{manualCreators.map((creator) => <option key={creator.id} value={creator.id}>{creator.fullName} · {creator.city}</option>)}</select><Button type="button" onClick={() => void addCreatorToCampaign(manualCreatorId)} disabled={!manualCreatorId || saving}>Add</Button></div>
            </div>
            {selectedCampaignMatches.length > 0 && <div className="border-b border-white/10 p-5"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Assigned creators</p><div className="mt-4 grid gap-4 xl:grid-cols-2">{selectedCampaignMatches.map((match) => { const creator = applications.find((item) => item.id === match.creatorId); return creator ? <CampaignMatchEditor key={match.id} match={match} creator={creator} saving={saving} onChange={(next) => setCampaignMatches((current) => current.map((item) => item.id === next.id ? next : item))} onSave={saveCampaignMatch} /> : null; })}</div></div>}
            <div className="p-5"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Suggested creators</p>{suggestedMatches.filter((match) => !selectedCampaignCreatorIds.has(match.creator.id)).length === 0 ? <p className="mt-4 text-sm text-slate-400">No additional suitable creator suggestions yet. Continue building the roster or add a creator manually.</p> : <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{suggestedMatches.filter((match) => !selectedCampaignCreatorIds.has(match.creator.id)).map((match) => <article key={match.creator.id} className="rounded-[22px] border border-white/10 bg-slate-950 p-5"><p className="text-xs font-semibold text-primary">Match score {match.score}</p><h2 className="mt-2 text-lg font-semibold text-white">{match.creator.fullName}</h2><p className="mt-1 text-sm text-slate-400">{match.creator.city} · {match.creator.experienceLevel.replaceAll('_', ' ')}</p><TagList items={match.creator.roleTags} /><p className="mt-4 text-xs leading-5 text-slate-400">{match.reasons.join(' · ')}</p><div className="mt-5 flex flex-wrap gap-4"><button type="button" onClick={() => setSelectedCreatorId(match.creator.id)} className="text-sm font-semibold text-primary hover:text-white">Review</button><button type="button" onClick={() => void addCreatorToCampaign(match.creator.id)} className="text-sm font-semibold text-primary hover:text-white">Add to campaign</button></div></article>)}</div>}</div>
          </>}
        </section>

        <section className="mt-6 overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-card"><div className="border-b border-white/10 px-5 py-4"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Inbox</p></div>{inquiries.length === 0 ? <p className="p-6 text-sm text-slate-400">No contact, support, or safety messages have been received.</p> : <div className="grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-4">{inquiries.slice(0, 8).map((inquiry) => <article key={inquiry.id} className="bg-slate-900 p-5"><p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-primary">{inquiry.inquiryType.replaceAll('_', ' ')}</p><h2 className="mt-4 text-base font-semibold text-white">{inquiry.details.companyName || inquiry.fullName}</h2><p className="mt-1 text-sm text-slate-400">{inquiry.email}{inquiry.phone ? ` · ${inquiry.phone}` : ''}</p><p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-300">{inquiry.message || inquiry.details.campaignGoal}</p></article>)}</div>}</section>
      </div>
    </main>
  );
};

const Metric = ({ icon: Icon, label, value, detail }: { icon: typeof FileStack; label: string; value: number; detail: string }) => <article className="rounded-[26px] border border-white/10 bg-slate-900 p-5 shadow-card"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" aria-hidden /></div><p className="mt-5 text-3xl font-semibold text-white">{value}</p><p className="mt-1 text-sm font-semibold text-slate-200">{label}</p><p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p></article>;

const CreatorEditor = ({ creator, saving, onChange, onSave }: { creator: ApplicationRecord; saving: boolean; onChange: (creator: ApplicationRecord) => void; onSave: (creator: ApplicationRecord) => void }) => <div><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs text-primary">#{creator.id}</p><h2 className="mt-2 text-2xl font-semibold text-white">{creator.fullName}</h2><p className="mt-2 text-sm text-slate-400">Submitted {new Date(creator.submittedAt).toLocaleString('en-IN')}</p></div><label className="flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-2 text-sm text-amber-100"><input checked={creator.isTop10} onChange={(event) => onChange({ ...creator, isTop10: event.target.checked })} type="checkbox" />Priority</label></div>{creator.duplicateCount > 1 && <p className="mt-5 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3 text-sm text-amber-100">Potential duplicate: {creator.duplicateCount} records share the same contact fingerprint.</p>}<div className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><Info label="Email" value={creator.email} /><Info label="WhatsApp" value={creator.whatsapp} /><Info label="Location" value={[creator.area, creator.city].filter(Boolean).join(', ')} /><Info label="Experience" value={creator.experienceLevel.replaceAll('_', ' ') || 'Not set'} /></div><EditorTags label="Roles" items={creator.roleTags} /><EditorTags label="Formats" items={creator.formatTags} /><EditorTags label="Category preferences" items={creator.categoryTags} /><EditorTags label="Availability" items={creator.availabilityTags} /><div className="mt-5 border-y border-white/10 py-5 text-sm"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Boundaries / concerns</p><p className="mt-2 whitespace-pre-wrap leading-6 text-slate-300">{creator.boundaries || 'None recorded'}</p></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm text-slate-300">Status<select value={creator.status} onChange={(event) => onChange({ ...creator, status: event.target.value as ApplicationStatus })} className="mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-slate-950 px-3 text-sm text-white outline-none focus:border-primary">{creatorStatuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select></label><label className="text-sm text-slate-300">Creator tier<select value={creator.creatorTier ?? ''} onChange={(event) => onChange({ ...creator, creatorTier: event.target.value || null })} className="mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-slate-950 px-3 text-sm text-white outline-none focus:border-primary">{tierOptions.map((tier) => <option key={tier || 'blank'} value={tier}>{tier || 'No tier assigned'}</option>)}</select></label></div><label className="mt-5 block text-sm text-slate-300">Internal notes<textarea value={creator.adminNotes ?? ''} onChange={(event) => onChange({ ...creator, adminNotes: event.target.value })} className="mt-2 min-h-28 w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-primary" placeholder="Shortlisting notes, safety follow-up, or match context." /></label><Button type="button" onClick={() => onSave(creator)} disabled={saving} className="mt-5">{saving ? 'Saving...' : 'Save creator record'}</Button></div>;

const CompanyBriefEditor = ({ brief, saving, onChange, onSave }: { brief: CompanyBriefRecord; saving: boolean; onChange: (brief: CompanyBriefRecord) => void; onSave: (brief: CompanyBriefRecord) => void }) => <div><p className="font-mono text-xs text-primary">#{brief.id}</p><h2 className="mt-2 text-2xl font-semibold text-white">{brief.companyName}</h2><p className="mt-2 text-sm text-slate-400">{brief.contactName} · {brief.email}<br />{brief.phone}</p>{brief.duplicateCount > 1 && <p className="mt-5 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3 text-sm text-amber-100">Potential duplicate: {brief.duplicateCount} brief records share the same company and email.</p>}<p className="mt-5 rounded-xl border border-primary/20 bg-primary/10 p-3 text-sm text-primary">Recommended package: {brief.recommendedPackage}</p><EditorTags label="Goals" items={brief.goals} /><EditorTags label="Platforms" items={brief.platforms} /><EditorTags label="Services" items={brief.services} /><EditorTags label="Talent requested" items={brief.talentNeeds} /><div className="mt-5 grid gap-4 text-sm sm:grid-cols-2"><Info label="Budget" value={brief.budgetRange.replaceAll('_', ' ')} /><Info label="Timeline" value={brief.timeline.replaceAll('_', ' ')} /><Info label="Usage rights" value={brief.usageRights.replaceAll('_', ' ')} /><Info label="Category" value={brief.businessCategory.replaceAll('_', ' ')} /></div><div className="mt-5 border-y border-white/10 py-5"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Campaign context</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">{brief.description}</p></div><label className="mt-5 block text-sm text-slate-300">Pipeline status<select value={brief.status} onChange={(event) => onChange({ ...brief, status: event.target.value as CompanyBriefStatus })} className="mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-slate-950 px-3 text-sm text-white outline-none focus:border-primary">{companyStatuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select></label><label className="mt-5 block text-sm text-slate-300">Internal notes<textarea value={brief.adminNotes ?? ''} onChange={(event) => onChange({ ...brief, adminNotes: event.target.value })} className="mt-2 min-h-28 w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-primary" placeholder="Qualification, call, proposal, or matching notes." /></label><Button type="button" onClick={() => onSave(brief)} disabled={saving} className="mt-5">{saving ? 'Saving...' : 'Save company brief'}</Button></div>;

const CampaignMatchEditor = ({ match, creator, saving, onChange, onSave }: { match: CompanyBriefMatchRecord; creator: ApplicationRecord; saving: boolean; onChange: (match: CompanyBriefMatchRecord) => void; onSave: (match: CompanyBriefMatchRecord) => void }) => <article className="rounded-[22px] border border-white/10 bg-slate-950 p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-lg font-semibold text-white">{creator.fullName}</p><p className="mt-1 text-sm text-slate-400">{creator.city} · {creator.roleTags.map((role) => role.replaceAll('_', ' ')).join(', ')}</p></div><button type="button" onClick={() => onSave(match)} disabled={saving} className="text-sm font-semibold text-primary hover:text-white">{saving ? 'Saving...' : 'Save'}</button></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><label className="text-xs font-semibold text-slate-400">Creator acceptance<select value={match.acceptanceStatus} onChange={(event) => onChange({ ...match, acceptanceStatus: event.target.value as MatchAcceptanceStatus })} className="mt-2 min-h-10 w-full rounded-lg border border-white/15 bg-slate-900 px-3 text-sm text-white outline-none focus:border-primary"><option value="not_contacted">Not contacted</option><option value="pending">Pending response</option><option value="accepted">Accepted</option><option value="declined">Declined</option></select></label><label className="text-xs font-semibold text-slate-400">Payout terms<select value={match.payoutStatus} onChange={(event) => onChange({ ...match, payoutStatus: event.target.value as MatchPayoutStatus })} className="mt-2 min-h-10 w-full rounded-lg border border-white/15 bg-slate-900 px-3 text-sm text-white outline-none focus:border-primary"><option value="pending">Pending</option><option value="agreed">Agreed in writing</option><option value="paid">Paid</option></select></label><label className="text-xs font-semibold text-slate-400">Usage rights<select value={match.usageStatus} onChange={(event) => onChange({ ...match, usageStatus: event.target.value as MatchUsageStatus })} className="mt-2 min-h-10 w-full rounded-lg border border-white/15 bg-slate-900 px-3 text-sm text-white outline-none focus:border-primary"><option value="pending">Pending</option><option value="agreed">Agreed in writing</option></select></label><label className="text-xs font-semibold text-slate-400">Delivery<select value={match.deliveryStatus} onChange={(event) => onChange({ ...match, deliveryStatus: event.target.value as MatchDeliveryStatus })} className="mt-2 min-h-10 w-full rounded-lg border border-white/15 bg-slate-900 px-3 text-sm text-white outline-none focus:border-primary"><option value="not_started">Not started</option><option value="in_progress">In progress</option><option value="delivered">Delivered</option></select></label></div><label className="mt-4 block text-xs font-semibold text-slate-400">Match notes<textarea value={match.notes ?? ''} onChange={(event) => onChange({ ...match, notes: event.target.value })} className="mt-2 min-h-20 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-primary" placeholder="Brief, acceptance, or production notes." /></label></article>;

const Info = ({ label, value }: { label: string; value: string }) => <div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-1 break-words text-slate-200">{value || 'Not provided'}</p></div>;
const EditorTags = ({ label, items }: { label: string; items: string[] }) => <div className="mt-5"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><TagList items={items} /></div>;
