import type { Metadata } from 'next';
import { ShieldOff, Clock3, ShieldCheck, Mail } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Refunds & Rescheduling – Alina Popova Studio',
  description: 'Clear no-refund policy with rescheduling guidelines for studio bookings and livestream engagements.'
};

const RefundsPage = () => (
  <SectionWrapper className="pt-20 md:pt-24">
    <div className="mx-auto max-w-4xl space-y-10 text-left">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-primary shadow-sm">
            Refund Policy
          </div>
        </div>
        <h1 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">No refunds once a slot is confirmed</h1>
        <p className="text-sm text-slate-600 text-center">
          We reserve hosts, producers, and the studio the moment you confirm a stream. That prep, rehearsal time, and blocked calendar
          cannot be reallocated at short notice, so payments are non-refundable after confirmation.
        </p>
      </div>

      <Card className="border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="rounded-2xl bg-slate-100 p-2 text-primary">
            <ShieldOff className="h-5 w-5" aria-hidden />
          </span>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge className="bg-slate-900 px-4 py-1 text-[0.65rem] text-white">No Refunds</Badge>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Applied to all bookings</span>
            </div>
            <p className="text-sm text-slate-700">
              Once a booking is accepted and invoiced, we do not issue refunds. Hosts are reserved, producers align runbooks,
              and the studio is blocked exclusively for your slot.
            </p>
            <p className="text-xs text-slate-500">
              If you are unsure about a format, start with a single Pilot Stream on our Pricing page before committing to a sprint or residency.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid justify-items-center gap-6 md:grid-cols-2 md:justify-items-stretch">
        <Card className="w-full border-slate-200/80 bg-white/95 p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="rounded-2xl bg-slate-100 p-2 text-primary">
              <Clock3 className="h-5 w-5" aria-hidden />
            </span>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">Rescheduling</h2>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>One reschedule permitted with at least 12 hours’ notice.</li>
                <li>New slots are subject to studio availability and host fit.</li>
                <li>Less than 12 hours’ notice is treated as a completed session.</li>
              </ul>
            </div>
          </div>
        </Card>
        <Card className="w-full border-slate-200/80 bg-white/95 p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="rounded-2xl bg-slate-100 p-2 text-primary">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </span>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">If we need to move a stream</h2>
              <p className="text-sm text-slate-600">
                In rare cases (force majeure, safety concerns, or technical outages), we will reschedule at the earliest slot that works for your team
                with the same host or an approved alternate. If we cannot deliver within a mutually agreed window, a full credit is issued for a future booking.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mx-auto max-w-3xl flex items-start gap-4 border-slate-200/80 bg-white/95 p-6 sm:p-7">
        <span className="rounded-2xl bg-slate-100 p-2 text-primary">
          <Mail className="h-5 w-5" aria-hidden />
        </span>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">Need help before you book?</h2>
          <p className="text-sm text-slate-600">
            We are happy to clarify scope, timelines, and host availability before you lock a slot. This keeps expectations aligned and avoids surprises later.
          </p>
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-sm font-semibold text-primary underline underline-offset-4">
            {siteConfig.contactEmail}
          </a>
        </div>
      </Card>
    </div>
  </SectionWrapper>
);

export default RefundsPage;
