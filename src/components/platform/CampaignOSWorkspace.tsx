import Link from 'next/link';
import { Activity, CheckSquare, FileCheck2, FileText, FolderOpen, GitBranch, MessageSquareText, Receipt, ShieldCheck, UploadCloud, UsersRound, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PlatformSignOutButton } from '@/components/platform/PlatformSignOutButton';
import type { PlatformDashboardData } from '@/lib/platform-database';
import { getWorkspacePreview } from '@/lib/platform-database';

const areas = [
  { id: 'projects', title: 'Projects', icon: FolderOpen, copy: 'Campaign container, status, goals, platforms, team, timeline, files, deliverables, usage rights, payments, and report.' },
  { id: 'team', title: 'Team', icon: UsersRound, copy: 'Campaign manager, creators, editors, writers, designers, hosts, production, client contacts, and permissions.' },
  { id: 'tasks', title: 'Tasks', icon: CheckSquare, copy: 'Role-specific work with due dates, priority, checklist, files, comments, approval state, and blockers.' },
  { id: 'files', title: 'Files', icon: UploadCloud, copy: 'Brand materials, raw footage, edits, scripts, captions, usage documents, final exports, and reports.' },
  { id: 'deliverables', title: 'Deliverables', icon: FileText, copy: 'UGC videos, Reels, Shorts, lives, scripts, photos, thumbnails, captions, edits, and campaign reports.' },
  { id: 'approvals', title: 'Approvals', icon: FileCheck2, copy: 'Internal review, client approval, creator usage acceptance, final delivery, and revision decisions.' },
  { id: 'messages', title: 'Messages', icon: MessageSquareText, copy: 'Project team, client review, creator assignment, task comments, and approval comments without chaotic threads.' },
  { id: 'rights', title: 'Usage Rights', icon: ShieldCheck, copy: 'Organic, paid ads, whitelisting, editing, duration, geography, exclusivity, creator acceptance, and warnings.' },
  { id: 'payments', title: 'Payments', icon: Receipt, copy: 'Company invoices, creator payouts, agency fees, revenue share, due dates, disputes, and paid status.' }
];

const statusLabel = (value: string) => value.replaceAll('_', ' ');

export const CampaignOSWorkspace = ({ data }: { data: PlatformDashboardData }) => {
  const preview = getWorkspacePreview();
  return (
    <main className="admin-surface min-h-screen bg-[#FCFCFD]">
      <header className="sticky top-0 z-40 border-b border-[#ECE8EC] bg-white/95 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Campaign OS</p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-espresso">Project collaboration workspace</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/dashboard" variant="secondary">Dashboard</Button>
            <PlatformSignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:py-10">
        <section className="rounded-[42px] border border-primary/15 bg-white p-6 shadow-soft sm:p-8 lg:p-10">
          <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr] xl:items-center">
            <div>
              <span className="rounded-full border border-primary/15 bg-porcelain px-3 py-1.5 text-xs font-semibold text-primary">One campaign. Many specialists. One clear flow.</span>
              <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-espresso sm:text-5xl">Project to team to tasks to delivery.</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-cocoa">
                This is the operating backbone for creator marketing campaigns: briefs, people, instructions, source files, scripts, edits, approvals, usage rights, payouts, and report notes stay connected.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/companies/start">Create campaign brief</Button>
                <Button href="/dashboard" variant="secondary">View my dashboard</Button>
              </div>
            </div>
            <div className="rounded-[32px] border border-[#ECE8EC] bg-porcelain/70 p-5">
              <p className="text-sm font-semibold text-espresso">Current account</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Info label="User" value={data.user.name} />
                <Info label="Type" value={statusLabel(data.user.userType)} />
                <Info label="Projects" value={String(data.projects.length)} />
                <Info label="Tasks" value={String(data.tasks.length)} />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <article id={area.id} key={area.id} className="group flex min-h-[260px] flex-col rounded-[34px] border border-[#ECE8EC] bg-white p-7 shadow-card transition hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary transition group-hover:-translate-y-0.5"><Icon className="h-6 w-6" aria-hidden /></span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-espresso">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-cocoa">{area.copy}</p>
                <Link href={`#${area.id}`} className="mt-auto pt-6 text-sm font-semibold text-primary">Review {area.title.toLowerCase()}</Link>
              </article>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[34px] border border-[#ECE8EC] bg-white p-7 shadow-card">
            <div className="flex items-center gap-3">
              <Workflow className="h-6 w-6 text-primary" aria-hidden />
              <h2 className="font-display text-2xl font-semibold text-espresso">Campaign flow</h2>
            </div>
            <div className="mt-6 grid gap-3">
              {preview.projectFlow.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#ECE8EC] p-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-porcelain text-sm font-semibold text-primary">{index + 1}</span>
                  <span className="font-semibold text-espresso">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[34px] border border-[#ECE8EC] bg-white p-7 shadow-card">
            <div className="flex items-center gap-3">
              <GitBranch className="h-6 w-6 text-primary" aria-hidden />
              <h2 className="font-display text-2xl font-semibold text-espresso">Operational boards</h2>
            </div>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <Board title="Task Kanban" items={preview.taskColumns} />
              <Board title="Deliverable Flow" items={preview.deliverableColumns} />
              <Board title="File Hub" items={preview.fileFolders.slice(0, 6)} />
              <Board title="Project Templates" items={preview.templates} />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[34px] border border-[#ECE8EC] bg-white p-7 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3"><Activity className="h-6 w-6 text-primary" aria-hidden /><h2 className="font-display text-2xl font-semibold text-espresso">Live records</h2></div>
              <p className="mt-2 text-sm leading-6 text-cocoa">Projects, tasks, deliverables, notifications, usage warnings, and payment alerts from your account.</p>
            </div>
            <span className="rounded-full border border-primary/15 bg-porcelain px-4 py-2 text-sm font-semibold text-primary">{data.metrics.activeProjects} active project(s)</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <LiveMetric label="Pending tasks" value={data.metrics.pendingTasks} />
            <LiveMetric label="Approvals needed" value={data.metrics.approvalsNeeded} />
            <LiveMetric label="Missing usage rights" value={data.metrics.usageRightsMissing} />
            <LiveMetric label="Payment alerts" value={data.metrics.pendingPayouts} />
          </div>
        </section>
      </div>
    </main>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-cocoa/70">{label}</p>
    <p className="mt-1 font-semibold text-espresso">{value}</p>
  </div>
);

const Board = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-2xl border border-[#ECE8EC] p-4">
    <p className="font-semibold text-espresso">{title}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => <span key={item} className="rounded-full border border-primary/15 bg-porcelain px-3 py-1.5 text-xs font-semibold text-cocoa">{item}</span>)}
    </div>
  </div>
);

const LiveMetric = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-2xl border border-[#ECE8EC] bg-porcelain/60 p-5">
    <p className="text-3xl font-semibold text-primary">{value}</p>
    <p className="mt-2 text-sm font-semibold text-espresso">{label}</p>
  </div>
);
