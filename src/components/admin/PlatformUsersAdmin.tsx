import Link from 'next/link';
import { AlertTriangle, CheckCircle2, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { PlatformUserAdminRecord } from '@/lib/platform-database';

const statusLabel = (value: string) => value.replaceAll('_', ' ');

export const PlatformUsersAdmin = ({ users }: { users: PlatformUserAdminRecord[] }) => (
  <main className="admin-surface min-h-screen bg-[#FCFCFD]">
    <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-[#ECE8EC] bg-white p-6 shadow-card">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Admin OS</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-espresso">Platform users</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-cocoa">Review OTP-verified creator, specialist, company, campaign-manager, and admin accounts from the new platform registration system.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/admin" variant="secondary">Admin dashboard</Button>
          <Button href="/login">Open platform login</Button>
        </div>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Total users" value={users.length} />
        <Metric label="Creators / specialists" value={users.filter((user) => ['creator', 'specialist'].includes(user.userType)).length} />
        <Metric label="Companies" value={users.filter((user) => user.userType === 'company').length} />
        <Metric label="Under review" value={users.filter((user) => ['under_review', 'brief_submitted', 'submitted'].includes(user.status)).length} />
      </section>

      <section className="mt-6 rounded-[32px] border border-[#ECE8EC] bg-white p-5 shadow-card sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b border-[#ECE8EC] text-xs uppercase tracking-[0.08em] text-cocoa">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Type</th>
                <th className="p-3">Roles / company</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Verification</th>
                <th className="p-3">Projects</th>
                <th className="p-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#ECE8EC] align-top">
                  <td className="p-3">
                    <p className="font-semibold text-espresso">{user.name}</p>
                    <p className="mt-1 text-xs text-cocoa">{user.email || user.phone || 'No contact'}</p>
                  </td>
                  <td className="p-3 capitalize text-cocoa">{statusLabel(user.userType)}</td>
                  <td className="p-3 text-cocoa">
                    {user.companyName || user.selectedRoles.slice(0, 4).map(statusLabel).join(', ') || user.roles.map(statusLabel).join(', ') || 'Not set'}
                    {user.profileCompletion !== null && <p className="mt-1 text-xs font-semibold text-primary">{user.profileCompletion}% profile</p>}
                  </td>
                  <td className="p-3 text-cocoa">{[user.area, user.city].filter(Boolean).join(', ') || 'Not provided'}</td>
                  <td className="p-3"><Badge>{statusLabel(user.status)}</Badge></td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1.5">
                      {user.emailVerified && <Badge tone="green">Email</Badge>}
                      {user.phoneVerified && <Badge tone="green">Phone</Badge>}
                      {!user.emailVerified && !user.phoneVerified && <Badge tone="amber">Pending</Badge>}
                    </div>
                  </td>
                  <td className="p-3 text-cocoa">{user.projectCount}</td>
                  <td className="p-3 text-cocoa">{new Date(user.createdAt).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="rounded-2xl border border-dashed border-primary/20 bg-porcelain/60 p-8 text-center">
            <UsersRound className="mx-auto h-7 w-7 text-primary" aria-hidden />
            <p className="mt-4 font-semibold text-espresso">No platform users yet.</p>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-cocoa">OTP-verified creators, specialists, and companies will appear here after they complete registration.</p>
            <Link href="/login" className="mt-5 inline-flex text-sm font-semibold text-primary">Open registration login</Link>
          </div>
        )}
      </section>

      <section className="mt-6 rounded-[28px] border border-primary/15 bg-porcelain p-5 text-sm leading-6 text-cocoa">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <p><span className="font-semibold text-espresso">Approval rule:</span> treat this as the review queue. Move users through creator/company statuses from the main admin modules until dedicated approval actions are expanded here.</p>
        </div>
      </section>
    </div>
  </main>
);

const Metric = ({ label, value }: { label: string; value: number }) => (
  <article className="rounded-[26px] border border-[#ECE8EC] bg-white p-5 shadow-card">
    <p className="text-3xl font-semibold text-primary">{value}</p>
    <p className="mt-2 text-sm font-semibold text-espresso">{label}</p>
  </article>
);

const Badge = ({ children, tone = 'rose' }: { children: React.ReactNode; tone?: 'rose' | 'green' | 'amber' }) => (
  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${tone === 'green' ? 'border-sage/20 bg-sage/10 text-[#527057]' : tone === 'amber' ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-primary/15 bg-porcelain text-primary'}`}>
    {children}
  </span>
);
