import { ArrowRight, BadgeCheck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CreatorLaunchDashboard } from '@/components/creator/CreatorLaunchDashboard';

const assurances = ['UGC campaigns', 'Instagram & YouTube', 'Livestream hosts', 'Product demos', 'Brand-safe creators', 'No joining fee for creators', 'Written scope before paid work'];

export const CreatorLaunchHero = () => (
  <>
  <section className="bg-white">
    <div className="mx-auto flex min-h-[64vh] max-w-[1200px] flex-col items-center justify-center px-5 pb-0 pt-12 text-center sm:px-8 sm:pb-10 sm:pt-16 lg:min-h-[70vh] lg:px-10 lg:pt-20">
      <div className="mx-auto max-w-[860px]">
        <p className="inline-flex items-center gap-2 rounded-full border border-neon/25 bg-porcelain px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-primary sm:text-xs">
          <BadgeCheck className="h-4 w-4" aria-hidden /> Two-Front Creator Marketing Studio
        </p>
        <h1 className="mt-5 font-display text-[2.5rem] font-semibold leading-[1.08] tracking-normal text-espresso sm:text-5xl lg:text-6xl">
          We Market for Companies. <span className="text-primary">We Hire Creators.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-[0.95rem] leading-6 text-cocoa sm:text-lg sm:leading-8">
          Alina Popova Studio helps companies grow through UGC, Instagram, YouTube, livestreams, product demos, and creator-led campaigns while building a trained creator network for safe, professional paid opportunities.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/companies" className="min-w-[170px]" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Market My Company</Button>
          <Button href="/apply" className="min-w-[154px]" variant="secondary">Apply as Creator</Button>
        </div>
        <ul className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2 text-left text-xs leading-5 text-cocoa sm:mt-7 sm:text-sm">
          {assurances.map((item) => (
            <li key={item} className="flex items-center gap-2 rounded-full border border-[#ECECF0] bg-white px-3 py-2 shadow-card"><ShieldCheck className="h-4 w-4 shrink-0 text-sage" aria-hidden />{item}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
  <section className="border-b border-neon/15 bg-white pb-12 sm:pb-16">
    <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10"><CreatorLaunchDashboard /></div>
  </section>
  </>
);
