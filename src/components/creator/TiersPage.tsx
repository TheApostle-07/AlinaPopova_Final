import { Check } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';

const tiers = [
  { level: 'Tier 0', name: 'Trainee Creator', description: 'Learning and mock-practice stage. This stage is not commercial eligibility.', points: ['Camera confidence and mock practice', 'Profile improvement guidance', 'No commercial payout because no commercial work'] },
  { level: 'Tier 1', name: 'Studio Host', description: 'Basic livestream-ready presence for suitable, written-scope opportunities.', points: ['Possible payout: ₹800–₹2,000 per session', 'Product demo and community live consideration', 'Opportunity acceptance remains voluntary'] },
  { level: 'Tier 2', name: 'Growth Host', description: 'Confident and category-ready for broader creator and hosting work.', points: ['Possible payout: ₹2,500–₹5,000 per session', 'Livestream, demo, and campaign shortlisting', 'Usage rights confirmed before acceptance'] },
  { level: 'Tier 3', name: 'Signature Host', description: 'Premium presence and strong communication for high-trust assignments.', points: ['Possible payout: ₹5,000–₹10,000+ by scope', 'Premium brand campaign consideration', 'Optional management support by agreement'] },
  { level: 'Tier 4', name: 'Revenue Partner', description: 'Proven audience handling and campaign performance where appropriate.', points: ['Fixed payout plus bonus or revenue share only by written agreement', 'Recurring opportunity consideration', 'No income or campaign frequency guarantee'] }
];

export const TiersPage = () => (
  <>
    <PageHero
      eyebrow="Creator tiers"
      title="A clear progression from learning to campaign readiness."
      description="Creator tiers help match readiness to the right opportunity. They are not a promise of selection, paid work, fixed payout, or a specific number of campaigns."
    />
    <SectionWrapper>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {tiers.map((tier, index) => (
          <Card key={tier.name} className={index === 2 ? 'border-neon bg-porcelain shadow-soft' : ''}>
            <p className="font-mono text-xs text-primary">{tier.level}</p>
            <h2 className="mt-5 text-2xl font-semibold text-foreground">{tier.name}</h2>
            <p className="mt-3 min-h-16 text-sm leading-6 text-cocoa">{tier.description}</p>
            <ul className="mt-6 space-y-3 border-t border-primary/10 pt-6 text-sm text-cocoa">
              {tier.points.map((point) => <li key={point} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />{point}</li>)}
            </ul>
          </Card>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-neon/20 bg-porcelain px-5 py-4 text-center text-sm leading-6 text-cocoa">Payout examples are illustrative, not guaranteed. Actual payout depends on campaign scope, duration, usage rights, creator tier, brand requirements, and written confirmation.</p>
    </SectionWrapper>
  </>
);
