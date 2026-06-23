import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CreatorLaunchDashboard } from '@/components/creator/CreatorLaunchDashboard';
import { TypingText } from '@/components/creator/TypingText';
import { Reveal } from '@/components/motion/Reveal';

const services = ['UGC', 'Instagram', 'YouTube', 'Livestreams', 'Product Demos', 'Creator Campaigns'];
const heroWords = ['Trust', 'Content', 'Attention', 'Launches', 'Creator Campaigns', 'Sales Support'];
const mobileHeroWords = ['Trust', 'Content', 'Attention', 'Launches', 'Campaigns', 'Sales'];

export const CreatorLaunchHero = () => (
  <>
  <section className="hero-surface hero-surface--home">
    <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-center px-5 pb-[72px] pt-[88px] text-center sm:px-8 sm:pb-[88px] sm:pt-[104px] lg:px-10 lg:pb-24 lg:pt-[120px]">
      <div className="mx-auto w-full max-w-[1180px]">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-neon/25 bg-porcelain px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-primary sm:text-xs">
            <BadgeCheck className="h-4 w-4" aria-hidden /> Creator Marketing Studio
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-8 max-w-[1100px] text-center font-display font-semibold tracking-[-0.055em] text-espresso">
            <span className="sr-only">Creator-Led Growth for Trust</span>
            <span aria-hidden="true">
              <span className="block text-[2.625rem] leading-[0.98] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[5.25rem]">
                Creator-Led Growth
              </span>
              <span className="mt-3 block text-[2.125rem] leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4rem]">
                <span className="hidden sm:inline-block"><TypingText prefix="for" words={heroWords} className="min-w-[12ch] lg:min-w-[14ch]" /></span>
                <span className="inline-block sm:hidden"><TypingText prefix="for" words={mobileHeroWords} className="min-w-[10ch]" /></span>
              </span>
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-4xl text-base leading-7 text-cocoa sm:text-lg sm:leading-8">
            Companies get managed creator campaigns for content, trust, livestreams, and sales support. Creators get a safer path into brand work with clear terms before paid opportunities begin.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="cta-row mt-9">
            <Button href="/companies/start" className="min-h-[52px] px-[26px] text-[15px] sm:min-w-[190px]" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Build My Campaign</Button>
            <Button href="/apply" className="min-h-[52px] px-6 text-[15px] sm:min-w-[154px]" variant="secondary">Apply as Creator</Button>
          </div>
        </Reveal>
        <Reveal delay={0.28}><p className="mt-7 text-sm font-medium tracking-[0.02em] text-cocoa">{services.join('  •  ')}</p></Reveal>
      </div>
    </div>
  </section>
  <section className="hero-surface hero-surface--home border-b border-neon/15 pb-16 sm:pb-20">
    <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10"><Reveal delay={0.16}><CreatorLaunchDashboard /></Reveal></div>
  </section>
  </>
);
