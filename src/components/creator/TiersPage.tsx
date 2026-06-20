import { Check } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';

const tiers = [
  { name: 'Applicant Pool', description: 'Open to eligible creators who submit a complete application.', points: ['Free application', 'Potential profile review', 'Discovery call if shortlisted', 'Future opportunity consideration'] },
  { name: 'Creator Launch Intake', description: 'For creators selected into the initial training and tiering stage.', points: ['Guided training', 'Mock livestream practice', 'Profile improvement support', 'Roster eligibility assessment'] },
  { name: 'Paid Opportunity Roster', description: 'For creators currently ready for relevant, brand-safe campaign matching.', points: ['Paid campaign shortlisting', 'Livestream and product demo consideration', 'Instagram and YouTube Live opportunities', 'Optional management support by agreement'] }
];

export const TiersPage = () => (
  <>
    <PageHero
      eyebrow="Creator tiers"
      title="Selection is a progression, not a promise that every applicant receives the same outcome."
      description="This selection ladder lets us welcome serious applicants while reserving training and paid campaign matching for the right fit."
    />
    <SectionWrapper>
      <div className="grid gap-4 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <Card key={tier.name} className={index === 1 ? 'border-primary bg-emerald-50' : ''}>
            <p className="font-mono text-xs text-primary">LEVEL 0{index + 1}</p>
            <h2 className="mt-5 text-2xl font-semibold text-foreground">{tier.name}</h2>
            <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600">{tier.description}</p>
            <ul className="mt-6 space-y-3 border-t border-slate-200 pt-6 text-sm text-slate-700">
              {tier.points.map((point) => <li key={point} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />{point}</li>)}
            </ul>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  </>
);
