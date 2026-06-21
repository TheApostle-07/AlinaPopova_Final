import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CreatorLaunchDashboard } from '@/components/creator/CreatorLaunchDashboard';

const services = ['UGC', 'Instagram', 'YouTube', 'Livestreams', 'Product Demos', 'Creator Campaigns'];

export const CreatorLaunchHero = () => (
  <>
  <section className="bg-white">
    <div className="mx-auto flex min-h-[62vh] max-w-[1200px] flex-col items-center justify-center px-5 pb-0 pt-14 text-center sm:px-8 sm:pb-10 sm:pt-20 lg:min-h-[68vh] lg:px-10 lg:pt-24">
      <div className="mx-auto max-w-[860px]">
        <p className="inline-flex items-center gap-2 rounded-full border border-neon/25 bg-porcelain px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-primary sm:text-xs">
          <BadgeCheck className="h-4 w-4" aria-hidden /> Creator Marketing Studio
        </p>
        <h1 className="mt-5 font-display text-[2.5rem] font-semibold leading-[1.08] tracking-normal text-espresso sm:text-5xl lg:text-6xl">
          Creator-Led Growth for Modern Brands
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-[0.95rem] leading-6 text-cocoa sm:text-lg sm:leading-8">
          We help companies plan and execute UGC, social content, livestreams, product demos, and creator-led campaigns, supported by a trusted network of trained creators.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/companies" className="min-w-[170px]" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Market My Company</Button>
          <Button href="/apply" className="min-w-[154px]" variant="secondary">Apply as Creator</Button>
        </div>
        <p className="mt-6 text-sm font-medium text-cocoa">{services.join('  •  ')}</p>
      </div>
    </div>
  </section>
  <section className="border-b border-neon/15 bg-white pb-12 sm:pb-16">
    <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10"><CreatorLaunchDashboard /></div>
  </section>
  </>
);
