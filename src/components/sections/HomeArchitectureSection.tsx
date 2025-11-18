import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { FileInput, LayoutList, Users, Activity } from 'lucide-react';

const architecture = [
  {
    title: 'Brief Intake',
    description: 'We map outcomes, compliance, and tone markers with your team before a single camera is powered on.',
    icon: FileInput
  },
  {
    title: 'Format Blocks',
    description: 'Segments are choreographed in calm minute-by-minute ladders so talent and viewers always know the arc.',
    icon: LayoutList
  },
  {
    title: 'Host Pairing',
    description: 'Talent is paired based on language comfort, category history, and empathy quotient.',
    icon: Users
  },
  {
    title: 'Signal Review',
    description: 'After every stream, we share sentiment clips, retention graphs, and tiered recommendations.',
    icon: Activity
  }
];

export const HomeArchitectureSection = () => (
  <SectionWrapper>
    <div className="space-y-8 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Operational Architecture</p>
      <h2 className="text-3xl font-semibold text-foreground">A boutique process that favours clarity over chaos.</h2>
    </div>
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {architecture.map((item) => (
        <Card key={item.title}>
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <item.icon className="h-5 w-5" aria-hidden />
            </div>
            <div className="text-left">
              <p className="text-lg font-semibold text-foreground">{item.title}</p>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </SectionWrapper>
);
