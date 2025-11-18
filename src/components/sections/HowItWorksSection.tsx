import { FileInput, PhoneCall, IndianRupee } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

const steps = [
  {
    title: 'Share Your Intent',
    description: 'Complete the application with availability, language notes, and the tiers you feel aligned with.',
    icon: FileInput,
    accent: 'border-emerald-100 bg-gradient-to-br from-white via-emerald-50/40 to-white'
  },
  {
    title: 'Discovery Call & Matching',
    description: 'A 15-minute call to align on comfort levels. Producers match you to the right tier and time blocks.',
    icon: PhoneCall,
    accent: 'border-sky-100 bg-gradient-to-br from-white via-sky-50/40 to-white'
  },
  {
    title: 'Onboard & Host',
    description: 'Receive your playbook, join curated live rooms, and host with producers on standby for payouts and support.',
    icon: IndianRupee,
    accent: 'border-violet-100 bg-gradient-to-br from-white via-lime-50/30 to-white'
  }
];

export const HowItWorksSection = () => (
  <SectionWrapper>
    <div className="space-y-10 text-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">How the Process Works</p>
        <p className="text-base text-slate-500">Thoughtful, transparent steps before you ever go live.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={`group relative flex h-full flex-col rounded-[28px] border bg-white/95 p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${step.accent}`}
          >
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-600 shadow-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="rounded-full bg-slate-50 p-2 text-slate-500">
                  <step.icon className="h-5 w-5" aria-hidden />
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);
