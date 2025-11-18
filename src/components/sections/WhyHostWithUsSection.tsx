import { ShieldCheck, Wallet, Sparkles, Clock, Users, Compass } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';

const reasons = [
  {
    title: 'Safe & Professional',
    description:
      'All sessions follow clear studio guidelines. No harassment, no unstructured demands, no adult content. Your comfort is the priority.',
    icon: ShieldCheck
  },
  {
    title: 'Transparent Earnings',
    description:
      'You always know what you’ll earn for your time. Categories and payouts are defined in advance and discussed before you start.',
    icon: Wallet
  },
  {
    title: 'Guided Experience',
    description: 'New to hosting? We offer guidance and simple frameworks so you’re never left confused on camera.',
    icon: Sparkles
  },
  {
    title: 'Flexible Timings',
    description: 'Choose from available shifts that fit around college, work or personal commitments.',
    icon: Clock
  },
  {
    title: 'Respectful Environment',
    description: 'We believe in focused, quiet work—no chaos, no crowd, no unnecessary drama.',
    icon: Users
  },
  {
    title: 'Clear Playbooks',
    description: 'Written frameworks, safety cues, and creative briefs so every session feels thoughtful and predictable.',
    icon: Compass
  }
];

export const WhyHostWithUsSection = () => (
  <SectionWrapper id="why-host">
    <div className="space-y-10 text-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Why Host With Us</p>
        <p className="text-base text-slate-500">A steady, structured space to experiment, grow and earn.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {reasons.map((reason) => (
          <Card key={reason.title}>
            <div className="flex items-start gap-4">
              <span className="rounded-2xl bg-primary/10 p-3 text-primary">
                <reason.icon className="h-6 w-6" aria-hidden />
              </span>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">{reason.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{reason.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </SectionWrapper>
);
