import type { Metadata } from 'next';
import { Sparkles, ShieldCheck, Clock3, Check } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Pricing & Engagements – Alina Popova Studio',
  description: 'Transparent livestream pricing with dedicated hosts, producers, and calm runbooks tuned for Delhi NCR.'
};

const packages = [
  {
    name: 'Pilot Stream',
    badge: 'First Look',
    price: '₹38k–₹65k',
    cadence: 'Per Stream',
    description:
      'A single 60–90 minute hosted stream to validate tone, runbook, and conversion cues for your category.',
    features: [
      'Dedicated host matched to your script and pace',
      'Producer-led storyboard with CTAs and talking points',
      'Sentiment + retention recap within 24 hours'
    ]
  },
  {
    name: 'Launch Sprint',
    badge: '4-Stream Arc',
    price: '₹1.4L–₹2.2L',
    cadence: 'Per Month',
    description:
      'Weekly cadence for launches or drops with iterative hooks, calm hosting, and measurable adjustments.',
    features: [
      'Show runner + producer pairing every session',
      'Creative sequencing for new drops and bundles',
      'Playbacks with next-episode adjustments baked in'
    ]
  },
  {
    name: 'Signature Residency',
    badge: 'Flagship',
    price: '₹3.2L–₹4.8L',
    cadence: 'Per Month',
    description:
      'Premium twice-weekly residency for brands needing authoritative hosts, multi-camera polish, and VIP moderation.',
    features: [
      'Tier 3 hosts with deep prep and tonal guardrails',
      'Advanced segments: demos, expert guests, live polls',
      'Real-time moderation + compliance coverage included'
    ]
  }
];

const inclusions = [
  'Host rehearsal time and safety briefings',
  'Run-of-show with timestamps and CTA sequencing',
  'Live moderation, sentiment checks, and wrap notes',
  'Studio, lighting, and audio chain tuned for your product',
  'Clear payout schedules and documentation for every session',
  'Back-up internet and power redundancies on every slot',
  'Recording snippets and chat highlights shared post-stream',
  'Compliance-ready scripts with safe language guardrails'
];

const guardrails = [
  {
    icon: ShieldCheck,
    title: 'No surprise add-ons',
    detail: 'Producer time, host prep, and moderation are quoted upfront so teams aren’t chasing last-minute approvals.'
  },
  {
    icon: Clock3,
    title: 'Protected slots',
    detail: 'Once you confirm a slot, it is blocked with buffers so shows start on time and end without rushed handovers.'
  },
  {
    icon: Sparkles,
    title: 'Quality loops',
    detail: 'Every stream ships with notes, highlights, and next steps that tighten scripts and host energy the very next week.'
  }
];

const PricingPage = () => (
  <>
    <SectionWrapper className="pt-28 text-center">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-primary shadow-sm">
          Pricing & Engagements
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Straight-forward Livestream Pricing
        </h1>
        <p className="text-base text-slate-600 sm:text-lg">
          Every engagement includes trained hosts, a show runner, and calm producers who protect tone, pace, and compliance.
          We scope in advance so you never wonder what is and isn’t included.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button href="/apply" className="w-full sm:w-auto">
            Book the Studio
          </Button>
          <Button href="/careers#tiers" variant="secondary" className="w-full sm:w-auto">
            See Host Tiers
          </Button>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="pt-4">
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <Card
              key={pkg.name}
              className="group grid h-full grid-rows-[auto_auto_auto_1fr_auto] gap-4 border-slate-200/80 bg-white/95 px-7 py-8 text-left shadow-sm ring-1 ring-transparent transition-all duration-200"
            >
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                <Badge className="bg-slate-900 px-4 py-1 text-[0.65rem] text-white">{pkg.badge}</Badge>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] text-slate-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">{pkg.name}</h2>
                <p className="text-sm leading-relaxed text-slate-600 min-h-[96px]">{pkg.description}</p>
              </div>
              <div className="flex min-h-[96px] flex-col justify-center gap-1 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-left shadow-inner">
                <p className="text-xl font-black text-emerald-500">{pkg.price}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{pkg.cadence}</p>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">All-inclusive hosting</p>
              </div>
              <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-emerald-500" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <p className="mt-3 text-xs text-slate-500">
                  Pricing flexes with complexity, multi-language hosting, and add-ons like live commerce integrations.
                </p>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500">
          Need a bespoke residency or co-branded stream? Share your format and we will scope within 48 hours.
        </p>
      </div>
    </SectionWrapper>

    <SectionWrapper className="pt-6 pb-24">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex h-full flex-col gap-4 border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-slate-100">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Always Included</p>
            <h3 className="text-2xl font-semibold text-foreground">The calm standards baked into every quote</h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            {inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="flex h-full flex-col gap-4 border-slate-200/80 bg-white/95">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Operating Guardrails</p>
            <h3 className="text-2xl font-semibold text-foreground">How we keep streams poised and predictable</h3>
          </div>
          <div className="space-y-4">
            {guardrails.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="rounded-2xl bg-slate-100 p-2 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-slate-600">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </SectionWrapper>
  </>
);

export default PricingPage;
