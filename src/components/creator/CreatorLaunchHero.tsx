import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CreatorLaunchDashboard } from '@/components/creator/CreatorLaunchDashboard';
import { TypingText } from '@/components/creator/TypingText';

const services = ['UGC', 'Instagram', 'YouTube', 'Livestreams', 'Product Demos', 'Creator Campaigns'];
const desktopHeroWords = ['Brands That Need Trust', 'Products That Need Attention', 'Campaigns That Need Creators', 'Businesses Ready to Scale', 'Creators Ready for Opportunity'];
const mobileHeroWords = ['Trust', 'Attention', 'Campaigns', 'Sales', 'Opportunity'];

export const CreatorLaunchHero = () => (
  <>
  <section className="hero-surface hero-surface--home">
    <div className="mx-auto flex min-h-[66vh] max-w-[1240px] flex-col items-center justify-center px-5 pb-4 pt-20 text-center sm:px-8 sm:pb-12 sm:pt-24 lg:min-h-[72vh] lg:px-10 lg:pt-28">
      <div className="mx-auto w-full max-w-[1180px]">
        <p className="inline-flex items-center gap-2 rounded-full border border-neon/25 bg-porcelain px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-primary sm:text-xs">
          <BadgeCheck className="h-4 w-4" aria-hidden /> Creator Marketing Studio
        </p>
        <h1 className="mx-auto mt-6 max-w-[1180px] font-display text-[2.625rem] font-semibold leading-[0.98] tracking-[-0.045em] text-espresso sm:text-6xl xl:text-[5.25rem]">
          <span className="sr-only">Creator-Led Growth for Brands That Need Trust, Content, and Sales</span>
          <span aria-hidden="true">
            <span className="block">Creator-Led Growth</span>
            <span className="mt-2 block text-[0.72em] tracking-[-0.035em] xl:mt-3 xl:text-[0.6em]">
              <span className="hidden xl:inline-block"><TypingText prefix="for" words={desktopHeroWords} className="hero-gradient-text w-[900px] text-center" /></span>
              <span className="inline-block xl:hidden"><TypingText prefix="for" words={mobileHeroWords} className="hero-gradient-text min-w-[10ch] text-center" /></span>
            </span>
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-4xl text-base leading-7 text-cocoa sm:text-lg sm:leading-8">
          Companies get managed creator campaigns for content, trust, livestreams, and sales. Creators get a safer professional network for brand-safe opportunities, clear terms, and paid work if selected.
        </p>
        <div className="cta-row mt-8">
          <Button href="/companies/start" size="lg" className="sm:min-w-[190px]" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Build My Campaign</Button>
          <Button href="/apply" className="sm:min-w-[154px]" variant="secondary">Apply as Creator</Button>
        </div>
        <p className="mt-7 text-sm font-medium tracking-[0.02em] text-cocoa">{services.join('  •  ')}</p>
      </div>
    </div>
  </section>
  <section className="hero-surface hero-surface--home border-b border-neon/15 pb-16 sm:pb-20">
    <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10"><CreatorLaunchDashboard /></div>
  </section>
  </>
);
