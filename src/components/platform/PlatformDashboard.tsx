import Link from 'next/link';
import { AlertTriangle, Bell, CalendarClock, CheckCircle2, ClipboardList, FileCheck2, FolderOpen, MessageSquareText, PanelLeft, Receipt, ShieldCheck, UploadCloud, UsersRound } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/Button';
import { PlatformSignOutButton } from '@/components/platform/PlatformSignOutButton';
import type { PlatformDashboardData, PlatformTaskRecord } from '@/lib/platform-database';

const sidebar = [
  ['Dashboard', '/dashboard', PanelLeft],
  ['Projects', '/workspace', FolderOpen],
  ['Tasks', '/workspace#tasks', ClipboardList],
  ['Files', '/workspace#files', UploadCloud],
  ['Approvals', '/workspace#approvals', FileCheck2],
  ['Messages', '/workspace#messages', MessageSquareText],
  ['Payments', '/workspace#payments', Receipt],
  ['Usage rights', '/workspace#rights', ShieldCheck]
] as const;

const cardClass = 'rounded-[30px] border border-[#ECE8EC] bg-white p-6 shadow-card';

const statusLabel = (value: string) => value.replaceAll('_', ' ');

const MetricCard = ({ icon: Icon, label, value, copy }: { icon: typeof Bell; label: string; value: number; copy: string }) => (
  <article className={cardClass}>
    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
    <p className="mt-6 text-3xl font-semibold text-espresso">{value}</p>
    <h2 className="mt-1 text-sm font-semibold text-espresso">{label}</h2>
    <p className="mt-2 text-sm leading-6 text-cocoa">{copy}</p>
  </article>
);

const TaskList = ({ tasks }: { tasks: PlatformTaskRecord[] }) => (
  <div className="space-y-3">
    {tasks.slice(0, 5).map((task) => (
      <article key={task.id} className="rounded-2xl border border-[#ECE8EC] bg-white p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-espresso">{task.title}</h3>
            <p className="mt-1 text-sm leading-6 text-cocoa">{task.description || 'Task details will appear here when assigned.'}</p>
          </div>
          <span className="rounded-full border border-primary/15 bg-porcelain px-3 py-1 text-xs font-semibold capitalize text-primary">{statusLabel(task.status)}</span>
        </div>
        <p className="mt-3 text-xs font-semibold text-cocoa">{task.dueDate ? `Due ${new Date(task.dueDate).toLocaleDateString('en-IN')}` : 'No due date yet'} · {task.priority}</p>
      </article>
    ))}
    {tasks.length === 0 && (
      <div className="rounded-2xl border border-dashed border-primary/20 bg-porcelain/70 p-6 text-center">
        <ClipboardList className="mx-auto h-6 w-6 text-primary" aria-hidden />
        <p className="mt-4 font-semibold text-espresso">No tasks assigned yet.</p>
        <p className="mt-2 text-sm leading-6 text-cocoa">When a project starts, scripts, uploads, reviews, approvals, and delivery tasks will appear here.</p>
      </div>
    )}
  </div>
);

export const PlatformDashboard = ({ data }: { data: PlatformDashboardData }) => {
  const isCreator = data.user.userType === 'creator' || data.user.userType === 'specialist';
  const isCompany = data.user.userType === 'company';
  const nextAction = isCreator
    ? 'Keep your role preferences, boundaries, portfolio links, and availability current so matching stays clean.'
    : isCompany
      ? 'Upload brand materials and watch your campaign brief status while the studio recommends a practical path.'
      : 'Review users, briefs, project risks, missing usage rights, and payout gaps from the admin workspace.';

  return (
    <main className="admin-surface min-h-screen bg-[#FCFCFD]">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#ECE8EC] bg-white p-5 lg:flex lg:flex-col">
          <Link href="/" className="px-3 py-3"><BrandLogo /></Link>
          <nav className="mt-8 space-y-1">
            {sidebar.map(([label, href, Icon]) => (
              <Link key={label} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-cocoa transition hover:bg-porcelain hover:text-espresso">
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl border border-primary/15 bg-porcelain p-4 text-xs leading-5 text-cocoa">
            <p className="font-semibold text-espresso">Work rule</p>
            <p className="mt-2">No paid commercial work begins without written scope, payout terms, usage rights, and acceptance.</p>
          </div>
        </aside>
        <section className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-[#ECE8EC] bg-white/95 px-5 py-4 backdrop-blur sm:px-8">
            <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Alina Popova Studio OS</p>
                <h1 className="mt-1 font-display text-2xl font-semibold text-espresso">Welcome, {data.user.name}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button href="/workspace" variant="secondary">Open workspace</Button>
                <PlatformSignOutButton />
              </div>
            </div>
            <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {sidebar.map(([label, href]) => <Link key={label} href={href} className="whitespace-nowrap rounded-full border border-[#ECE8EC] px-3 py-2 text-xs font-semibold text-cocoa">{label}</Link>)}
            </nav>
          </header>

          <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:py-9">
            <section className="rounded-[36px] border border-primary/15 bg-white p-6 shadow-soft sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <span className="rounded-full border border-primary/15 bg-porcelain px-3 py-1.5 text-xs font-semibold capitalize text-primary">{statusLabel(data.user.status)}</span>
                  <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.035em] text-espresso sm:text-4xl">{isCreator ? 'Creator workspace under review.' : isCompany ? 'Company campaign workspace.' : 'Internal operating dashboard.'}</h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-cocoa">{nextAction}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    {isCreator && <Button href="/creators#roles">Update role path</Button>}
                    {isCompany && <Button href="/companies/start">Submit another brief</Button>}
                    <Button href="/safety" variant="secondary">Read safety policy</Button>
                  </div>
                </div>
                <div className="grid gap-3 rounded-[28px] border border-[#ECE8EC] bg-porcelain/70 p-5">
                  <ProfileLine label="Account type" value={statusLabel(data.user.userType)} />
                  <ProfileLine label="Location" value={[data.user.area, data.user.city].filter(Boolean).join(', ') || 'Not provided'} />
                  <ProfileLine label="Communication" value={data.user.communicationPreference} />
                  <ProfileLine label="Verified" value={[data.user.emailVerified ? 'Email' : '', data.user.phoneVerified ? 'Phone' : ''].filter(Boolean).join(' and ') || 'Pending'} />
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <MetricCard icon={FolderOpen} label="Active projects" value={data.metrics.activeProjects} copy="Campaigns you can access." />
              <MetricCard icon={ClipboardList} label="Pending tasks" value={data.metrics.pendingTasks} copy="Assignments still moving." />
              <MetricCard icon={CheckCircle2} label="Approvals needed" value={data.metrics.approvalsNeeded} copy="Items waiting on review." />
              <MetricCard icon={AlertTriangle} label="Usage gaps" value={data.metrics.usageRightsMissing} copy="Assets missing rights records." />
              <MetricCard icon={Receipt} label="Payout alerts" value={data.metrics.pendingPayouts} copy="Terms or payments to review." />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className={cardClass}>
                <h2 className="font-display text-2xl font-semibold text-espresso">Next tasks</h2>
                <p className="mt-2 text-sm leading-6 text-cocoa">Every assignment should show what to do, deadline, files, comments, and submission state.</p>
                <div className="mt-6"><TaskList tasks={data.tasks} /></div>
              </div>
              <div className={cardClass}>
                <h2 className="font-display text-2xl font-semibold text-espresso">{isCompany ? 'Campaign briefs' : 'Role profile'}</h2>
                <p className="mt-2 text-sm leading-6 text-cocoa">{isCompany ? 'Submitted briefs and recommended packages.' : 'Selected roles, categories, boundaries, and profile readiness.'}</p>
                {isCompany ? (
                  <div className="mt-6 space-y-3">
                    {data.companyBriefs.map((brief) => (
                      <article key={brief.id} className="rounded-2xl border border-[#ECE8EC] p-4">
                        <div className="flex flex-wrap justify-between gap-3"><p className="font-semibold text-espresso">{brief.recommendedPackage}</p><span className="rounded-full bg-porcelain px-3 py-1 text-xs font-semibold capitalize text-primary">{statusLabel(brief.status)}</span></div>
                        <p className="mt-2 text-sm leading-6 text-cocoa">{brief.message || 'Campaign message will appear here.'}</p>
                      </article>
                    ))}
                    {data.companyBriefs.length === 0 && <EmptyState title="No campaign brief yet." copy="Submit a brief to get a recommended creator-marketing path." />}
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    <ProfileLine label="Selected roles" value={data.creatorProfile?.selectedRoles.map(statusLabel).join(', ') || 'No roles selected yet'} />
                    <ProfileLine label="Profile completion" value={`${data.creatorProfile?.profileCompletion ?? 0}%`} />
                    <ProfileLine label="Boundaries" value={data.creatorProfile?.boundaries || 'No boundaries recorded yet'} />
                    <ProfileLine label="Experience" value={statusLabel(data.creatorProfile?.experienceLevel || 'Not provided')} />
                  </div>
                )}
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-3">
              <div className={cardClass}>
                <h2 className="font-display text-xl font-semibold text-espresso">Notifications</h2>
                <div className="mt-5 space-y-3">
                  {data.notifications.slice(0, 4).map((notification) => (
                    <article key={notification.id} className="rounded-2xl bg-porcelain p-4 text-sm leading-6 text-cocoa">
                      <p className="font-semibold text-espresso">{notification.title}</p>
                      <p className="mt-1">{notification.message}</p>
                    </article>
                  ))}
                  {data.notifications.length === 0 && <EmptyState title="No notifications yet." copy="Project invites, task updates, approvals, and payout messages will appear here." />}
                </div>
              </div>
              <div className={cardClass}>
                <h2 className="font-display text-xl font-semibold text-espresso">Project access</h2>
                <div className="mt-5 space-y-3">
                  {data.projects.slice(0, 4).map((project) => (
                    <Link key={project.id} href="/workspace" className="block rounded-2xl border border-[#ECE8EC] p-4 transition hover:border-primary/25 hover:bg-porcelain">
                      <p className="font-semibold text-espresso">{project.title}</p>
                      <p className="mt-1 text-sm capitalize text-cocoa">{statusLabel(project.status)} · {project.packageType}</p>
                    </Link>
                  ))}
                  {data.projects.length === 0 && <EmptyState title="No assigned projects yet." copy="Projects appear after the studio creates a campaign and assigns the right team." />}
                </div>
              </div>
              <div className={cardClass}>
                <h2 className="font-display text-xl font-semibold text-espresso">Deadline view</h2>
                <div className="mt-5 space-y-3">
                  {data.tasks.filter((task) => task.dueDate).slice(0, 4).map((task) => (
                    <div key={task.id} className="flex items-center justify-between gap-3 rounded-2xl bg-porcelain p-4 text-sm">
                      <span className="font-semibold text-espresso">{task.title}</span>
                      <span className="inline-flex items-center gap-1 text-cocoa"><CalendarClock className="h-4 w-4" aria-hidden />{task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-IN') : ''}</span>
                    </div>
                  ))}
                  {data.tasks.filter((task) => task.dueDate).length === 0 && <EmptyState title="No deadlines yet." copy="Shoot dates, edit deadlines, reviews, and payment dates will be shown here." />}
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

const ProfileLine = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-cocoa/70">{label}</p>
    <p className="mt-1 text-sm font-semibold leading-6 text-espresso">{value}</p>
  </div>
);

const EmptyState = ({ title, copy }: { title: string; copy: string }) => (
  <div className="rounded-2xl border border-dashed border-primary/20 bg-porcelain/60 p-5 text-center">
    <UsersRound className="mx-auto h-5 w-5 text-primary" aria-hidden />
    <p className="mt-3 font-semibold text-espresso">{title}</p>
    <p className="mt-2 text-sm leading-6 text-cocoa">{copy}</p>
  </div>
);
