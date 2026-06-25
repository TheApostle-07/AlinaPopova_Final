import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clapperboard,
  FileCheck2,
  Megaphone,
  Radio,
  ShieldCheck,
  UsersRound,
  Video
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const audienceFit = [
  {
    eyebrow: 'For brands',
    title: 'For brands that need trust and growth.',
    icon: Building2,
    copy: 'Use Alina Popova Studio when your brand needs creator-led content, product explanation, launch momentum, livestream attention, or a managed campaign system.',
    items: ['UGC and product videos', 'Instagram and YouTube campaigns', 'Livestream selling and demos', 'Usage rights and reporting'],
    outcome: 'Best for brands that want creator marketing without scattered freelancers.'
  },
  {
    eyebrow: 'For creators',
    title: 'For creators with professional skills.',
    icon: UsersRound,
    copy: 'Apply as on-camera talent or behind-the-scenes creative support. Selected creators are matched when the role, availability, boundaries, and skill level fit.',
    items: ['UGC creator, model, or host', 'Editor, writer, or designer', 'Photographer or videographer', 'Clear scope before paid work'],
    outcome: 'Best for creators who want safer, structured opportunities.'
  }
] as const;

const servicePillars = [
  {
    label: 'Content',
    title: 'UGC & Social Content',
    icon: Clapperboard,
    copy: 'Creator-led videos that make products easier to trust and understand.',
    items: ['UGC videos', 'Reels and Shorts', 'Product demos', 'Ad creatives'],
    outcome: 'Best for human content and social proof.',
    cta: 'Content Plan'
  },
  {
    label: 'Live',
    title: 'Livestream & Live Shopping',
    icon: Radio,
    copy: 'Structured live sessions for launches, demos, education, and buyer engagement.',
    items: ['YouTube Live', 'Instagram Live', 'Launch streams', 'Product walkthroughs'],
    outcome: 'Best for live attention and guided selling.',
    cta: 'Live Campaign'
  },
  {
    label: 'Campaigns',
    title: 'Creator Campaigns',
    icon: Megaphone,
    copy: 'Campaigns that connect the right creator, message, format, and platform.',
    items: ['Creator launches', 'Social proof', 'Brand storytelling', 'Product awareness'],
    outcome: 'Best for creator reach without chaos.',
    cta: 'Creator Campaign'
  },
  {
    label: 'Operations',
    title: 'Campaign Management',
    icon: FileCheck2,
    copy: 'The operating layer for planning, approvals, usage rights, delivery, and reporting.',
    items: ['Creator shortlisting', 'Hooks and scripts', 'Usage rights', 'Reporting'],
    outcome: 'Best for clean execution.',
    cta: 'Managed Campaign'
  }
] as const;

const process = [
  ['01', 'Brief', 'Goals, product, audience, budget, and timing.'],
  ['02', 'Plan', 'Campaign angle, formats, creator fit, and usage rights.'],
  ['03', 'Match', 'Suitable creators review the opportunity before assignment.'],
  ['04', 'Produce', 'Content, lives, demos, and campaign assets are delivered.'],
  ['05', 'Report', 'Clear notes, learnings, and next-step recommendations.']
] as const;

const creatorPromise = [
  ['Apply free', 'No joining fee to submit your profile.'],
  ['No training debt', 'No hidden recovery terms for selected creators.'],
  ['Multiple roles', 'On-camera and behind-the-scenes paths are welcome.'],
  ['Written scope', 'Paid work starts with a clear written outline.'],
  ['Usage clarity', 'Commercial rights are stated before content is used.'],
  ['Choice first', 'Accept or decline any opportunity.'],
  ['No unsafe work', 'Brand-safe work only.'],
  ['Professional handling', 'Campaigns are reviewed and documented.']
] as const;

const safety = [
  ['Written scope', 'Clear deliverables before work begins.'],
  ['Usage rights', 'Content use agreed in writing.'],
  ['Creator consent', 'Creators review and accept terms.'],
  ['Payout terms', 'Payment clarity before paid work.'],
  ['Conduct rules', 'Professional behaviour required.'],
  ['No false guarantees', 'No fake sales or income promises.']
] as const;

const packages = [
  {
    name: 'UGC Starter Pack',
    price: '₹25,000–₹45,000',
    icon: Clapperboard,
    bestFor: 'Best for testing creator-led product content.',
    includes: ['1 creator', '3–5 UGC videos', 'Hooks and scripts', 'Organic usage terms'],
    cta: 'Start UGC Pack'
  },
  {
    name: 'Creator Launch Campaign',
    price: '₹60,000–₹1.2L',
    icon: Megaphone,
    bestFor: 'Best for launches and social proof.',
    includes: ['2–4 creators', '8–12 content assets', 'Campaign concept', 'Usage clarity'],
    cta: 'Plan Launch'
  },
  {
    name: 'Livestream Sales Sprint',
    price: '₹75,000–₹1.8L',
    icon: Video,
    bestFor: 'Best for live demos and launches.',
    includes: ['Live host', 'Runbook', 'Product demo flow', 'Post-live notes'],
    cta: 'Book Live Sprint'
  },
  {
    name: 'Monthly Creator Marketing Engine',
    price: '₹1.5L–₹4L/month',
    icon: CalendarDays,
    bestFor: 'Best for recurring creator marketing.',
    includes: ['Content calendar', 'Creator coordination', 'Scripts and hooks', 'Reporting'],
    cta: 'Build Monthly Engine'
  }
] as const;

interface SectionIntroProps {
  eyebrow: string;
  title: string;
  copy: string;
}

const SectionIntro = ({ eyebrow, title, copy }: SectionIntroProps) => (
  <div className="mx-auto max-w-4xl text-center">
    <p className="text-sm font-semibold text-primary">{eyebrow}</p>
    <h2 className="mt-4 font-display text-3xl leading-tight text-espresso sm:text-4xl lg:text-[3rem]">{title}</h2>
    <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-cocoa sm:text-lg sm:leading-8">{copy}</p>
  </div>
);

const IconTile = ({ children }: { children: ReactNode }) => (
  <span className="card-icon flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary">
    {children}
  </span>
);

const BulletList = ({ items }: { items: readonly string[] }) => (
  <ul className="mt-7 grid gap-x-6 gap-y-3 text-sm leading-6 text-cocoa sm:grid-cols-2">
    {items.map((item) => (
      <li key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden /><span>{item}</span></li>
    ))}
  </ul>
);

const OutcomeLine = ({ children }: { children: ReactNode }) => (
  <div className="mt-6 border-t border-[#ECE8EC] pt-5">
    <p className="text-sm font-semibold leading-6 text-espresso">{children}</p>
  </div>
);

const CardCta = ({ href, children }: { href: string; children: ReactNode }) => (
  <div className="mt-auto pt-8">
    <Button href={href} variant="ghost" className="self-start">
      {children}
    </Button>
  </div>
);

export const AgencyHomeSections = () => (
  <>
    <SectionWrapper className="bg-softwhite">
      <Reveal>
        <SectionIntro
          eyebrow="Built for both sides"
          title="Built for both sides of creator growth."
          copy="Brands need trusted content. Creators need safe opportunities. The path should be clear from the first click."
        />
        <div className="mt-12 grid auto-rows-fr items-stretch gap-7 lg:grid-cols-2 lg:gap-8">
          {audienceFit.map((audience) => {
            const Icon = audience.icon;
            return (
              <Card key={audience.title} className="flex h-full min-h-[430px] flex-col p-8 sm:p-10 lg:p-12">
                <IconTile><Icon className="h-6 w-6" aria-hidden /></IconTile>
                <p className="mt-7 text-sm font-semibold text-primary">{audience.eyebrow}</p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-espresso">{audience.title}</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-cocoa">{audience.copy}</p>
                <BulletList items={audience.items} />
                <div className="mt-auto pt-6"><OutcomeLine>{audience.outcome}</OutcomeLine></div>
              </Card>
            );
          })}
        </div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper>
      <Reveal>
        <SectionIntro
          eyebrow="Two paths"
          title="Two paths. One managed studio."
          copy="Companies build campaigns. Creators apply for opportunities. Both move through clear terms and managed execution."
        />
        <div className="mt-12 grid auto-rows-fr items-stretch gap-7 lg:grid-cols-2 lg:gap-8">
          <Card className="flex h-full min-h-[420px] flex-col border-primary/20 p-8 sm:p-10 lg:p-12">
            <IconTile><Building2 className="h-6 w-6" aria-hidden /></IconTile>
            <p className="mt-7 text-sm font-semibold text-primary">For Companies</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-espresso">Build a creator-led campaign.</h3>
            <p className="mt-5 text-base leading-7 text-cocoa">Get strategy, creator matching, content formats, live structure, usage rights, approvals, and delivery in one managed flow.</p>
            <BulletList items={['Campaign strategy', 'Creator matching', 'Content and live formats', 'Usage rights and delivery']} />
            <div className="mt-auto pt-10">
              <Button href="/companies/start" className="min-h-[52px] px-[26px]">Build My Campaign</Button>
            </div>
          </Card>
          <Card className="flex h-full min-h-[420px] flex-col border-primary/20 p-8 sm:p-10 lg:p-12">
            <IconTile><UsersRound className="h-6 w-6" aria-hidden /></IconTile>
            <p className="mt-7 text-sm font-semibold text-primary">For Creators</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-espresso">Apply for brand-safe work.</h3>
            <p className="mt-5 text-base leading-7 text-cocoa">Join as creator, model, host, editor, writer, designer, or campaign support. Paid work is shared with written scope before acceptance.</p>
            <BulletList items={['Multiple creator roles', 'Clear boundaries', 'Written terms', 'Accept or decline']} />
            <div className="mt-auto pt-10">
              <Button href="/apply" className="min-h-[52px] px-6" variant="secondary">Apply as Creator</Button>
            </div>
          </Card>
        </div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper className="bg-softwhite">
      <Reveal>
        <SectionIntro
          eyebrow="Services"
          title="Marketing built around creators, content, and live attention."
          copy="One studio for strategy, talent, content production, livestreams, and campaign delivery."
        />
        <div className="mx-auto mt-12 grid max-w-[1120px] auto-rows-fr items-stretch gap-8 lg:grid-cols-2">
          {servicePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.title} className="flex h-full min-h-[470px] flex-col p-8 sm:p-10">
                <IconTile><Icon className="h-6 w-6" aria-hidden /></IconTile>
                <p className="mt-7 text-sm font-semibold text-primary">{pillar.label}</p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-espresso">{pillar.title}</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-cocoa">{pillar.copy}</p>
                <BulletList items={pillar.items} />
                <OutcomeLine>{pillar.outcome}</OutcomeLine>
                <CardCta href="/companies/start">{pillar.cta}</CardCta>
              </Card>
            );
          })}
        </div>
        <div className="mt-14 flex justify-center"><Button href="/services" variant="secondary">Explore Services</Button></div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper className="bg-champagne">
      <Reveal>
        <SectionIntro
          eyebrow="Process"
          title="A cleaner way to run creator campaigns."
          copy="No scattered DMs, unclear deliverables, missing usage rights, or last-minute confusion. The process stays structured from brief to delivery."
        />
        <div className="relative mx-auto mt-16 max-w-[1080px]">
          <div className="grid gap-4 md:hidden">
            {process.map(([number, title, description]) => (
              <article key={number} className="rounded-[28px] border border-primary/15 bg-white p-6 shadow-card">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neon bg-white font-display text-sm text-primary">{number}</span>
                  <h3 className="text-lg font-semibold text-espresso">{title}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-cocoa">{description}</p>
              </article>
            ))}
          </div>
          <div className="relative hidden md:block">
            <div className="absolute left-[9%] right-[9%] top-6 h-px bg-gradient-to-r from-transparent via-neon to-transparent" aria-hidden />
            <div className="relative grid gap-8 md:grid-cols-5">
              {process.map(([number, title, description]) => (
                <article key={number} className="relative text-center">
                  <span className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-neon bg-white font-display text-lg text-primary shadow-[0_12px_30px_rgba(199,53,114,0.10)]">{number}</span>
                  <h3 className="mt-8 text-lg font-semibold text-espresso">{title}</h3>
                  <p className="mx-auto mt-3 max-w-[170px] text-sm leading-6 text-cocoa">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper>
      <Reveal>
        <SectionIntro
          eyebrow="Creator network"
          title="A creator network built on clarity, not pressure."
          copy="Creators should know the work, usage, payout, and choice before anything begins."
        />
        <div className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {creatorPromise.map(([title, copy]) => (
            <Card key={title} className="flex min-h-[176px] flex-col p-6 sm:p-7">
              <CheckCircle2 className="card-icon h-5 w-5 text-primary" aria-hidden />
              <h3 className="mt-5 text-base font-semibold text-espresso">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-cocoa">{copy}</p>
            </Card>
          ))}
        </div>
        <div className="mt-14 flex justify-center"><Button href="/creators" variant="secondary">Explore Creator Network</Button></div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper className="bg-softwhite">
      <Reveal>
        <div className="rounded-[48px] border border-primary/15 bg-porcelain px-7 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <SectionIntro
            eyebrow="Safety and clarity"
            title="Safe for creators. Clear for companies."
            copy="Every campaign must have written scope, creator consent, usage rights, payout terms, and professional conduct."
          />
          <div className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {safety.map(([title, copy]) => (
              <Card key={title} className="flex min-h-[142px] flex-col rounded-[24px] p-6">
                <ShieldCheck className="card-icon h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-4 text-sm font-semibold text-espresso">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-cocoa">{copy}</p>
              </Card>
            ))}
          </div>
          <div className="mt-14 flex justify-center"><Button href="/safety" variant="secondary">Read Safety Policy</Button></div>
        </div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper>
      <Reveal>
        <SectionIntro
          eyebrow="Pricing"
          title="Start with a campaign package."
          copy="Choose a contained creator-led format first, then expand when the brief, rights, and campaign fit are clear."
        />
        <div className="mx-auto mt-12 grid max-w-[1120px] auto-rows-fr items-stretch gap-8 lg:grid-cols-2">
          {packages.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.name} className="flex h-full min-h-[440px] flex-col p-8 sm:p-10">
                <IconTile><Icon className="h-6 w-6" aria-hidden /></IconTile>
                <h3 className="mt-8 min-h-[72px] font-display text-3xl leading-tight text-espresso">{item.name}</h3>
                <p className="mt-4 text-lg font-semibold text-primary">{item.price}</p>
                <p className="mt-5 min-h-[48px] text-sm leading-6 text-cocoa">{item.bestFor}</p>
                <BulletList items={item.includes} />
                <CardCta href="/companies/start">{item.cta}</CardCta>
              </Card>
            );
          })}
        </div>
        <div className="mt-14 flex justify-center"><Button href="/pricing" variant="secondary">View Pricing</Button></div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper className="bg-softwhite">
      <Reveal>
        <div className="cta-surface mx-auto max-w-5xl rounded-[52px] border border-primary/15 px-7 py-14 text-center shadow-card sm:px-12 lg:px-16 lg:py-16">
          <p className="text-sm font-semibold text-primary">For brands and talent</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-espresso sm:text-4xl">Two paths. One clear beginning.</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-cocoa">Build a campaign brief or apply as talent. Both start with clear terms and no pressure.</p>
          <div className="cta-row mt-9"><Button href="/companies/start">Build My Campaign</Button><Button href="/apply" variant="secondary">Apply as Creator</Button></div>
        </div>
      </Reveal>
    </SectionWrapper>
  </>
);
