import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const tiers = [
  {
    id: 'tier-1',
    badge: 'Tier 1',
    title: 'Intro Sessions',
    description:
      'Gentle, guided hosting with flexible interactions. Ideal for beginners or those exploring livestreaming for the first time.',
    honorarium: { min: 800, max: 2000 }
  },
  {
    id: 'tier-2',
    badge: 'Tier 2',
    title: 'Enhanced Sessions',
    description:
      'Dynamic, higher-engagement segments with more creative hosting and audience interaction.',
    honorarium: { min: 2500, max: 4000 }
  },
  {
    id: 'tier-3',
    badge: 'Tier 3',
    title: 'Signature Sessions',
    description:
      'Exclusive, premium sessions designed for standout on-camera talent with strong presence and energy.',
    honorarium: { min: 4500, max: 7000 }
  }
];

export const EngagementTiersSection = () => (
  <SectionWrapper id="tiers">
    <div className="space-y-10 text-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Three Engagement Tiers</p>
        <p className="text-base text-slate-500">
          We offer three engagement paths, thoughtfully curated around your comfort, confidence and natural on-camera charm.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((tier, index) => (
          <Card key={tier.id} className="flex h-full flex-col border-slate-200/80 bg-white/95 px-8 py-8 text-left shadow-sm ring-1 ring-transparent transition-all duration-200">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.5em] text-slate-400">
            <Badge className="bg-slate-900 px-4 py-1 text-xs text-white">{tier.badge}</Badge>
            <span className="text-slate-300">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-foreground">{tier.title}</h3>
          <p className="mt-3 text-sm text-slate-600">{tier.description}</p>
          <div className="mt-auto border-t border-slate-100 pt-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Honorarium</p>
            <p className="mt-2 text-3xl font-black text-emerald-500">
              ₹{tier.honorarium.min.toLocaleString('en-IN')} – ₹{tier.honorarium.max.toLocaleString('en-IN')}
            </p>
            <span className="text-sm font-semibold text-emerald-400 tracking-wide">per day</span>
          </div>
        </Card>
      ))}
    </div>
      <p className="text-sm text-slate-500">
        Every applicant naturally aligns with a tier — your strengths and comfort reveal it during the initial interaction.
      </p>
    </div>
  </SectionWrapper>
);
