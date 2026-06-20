import { ArrowRight, BadgeCheck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CreatorLaunchDashboard } from '@/components/creator/CreatorLaunchDashboard';

const assurances = ['₹0 joining fee', 'Free training if selected', 'No unsafe work', 'Written terms before paid work'];

export const CreatorLaunchHero = () => (
  <section className="border-b border-primary/10 bg-ivory">
    <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-4 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-12">
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          <BadgeCheck className="h-4 w-4" aria-hidden /> Applications open for Creator Launch Intake
        </p>
        <h1 className="mt-5 font-display text-[2.55rem] leading-[1.06] text-espresso sm:text-5xl lg:text-6xl">
          Launch Your Creator Career Safely, Professionally, and Without a Joining Fee
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-cocoa sm:text-lg sm:leading-8">
          Apply to Alina Popova Studio&apos;s Creator Launch Program and train for Instagram presence, YouTube Live confidence,
          livestream hosting, product demos, and brand-safe paid opportunities if selected.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="/apply" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Apply Free</Button>
          <Button href="/how-it-works" variant="secondary">See How It Works</Button>
        </div>
        <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-3 text-xs leading-5 text-cocoa sm:text-sm">
          {assurances.map((item) => (
            <li key={item} className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden />{item}</li>
          ))}
        </ul>
      </div>
      <div className="hidden lg:block"><CreatorLaunchDashboard /></div>
    </div>
  </section>
);
