import { ArrowRight, BadgeCheck, Building2, Camera, CircleDollarSign, HeartHandshake, Instagram, MonitorPlay, ShieldCheck, Video } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const included = [
  'Free application',
  'Discovery call if shortlisted',
  'Instagram presence guidance',
  'YouTube Live confidence training',
  'Livestream hosting practice',
  'Product demo training',
  'Mock live practice',
  'Creator tier placement',
  'Paid opportunity shortlisting'
];

const paths = [
  { title: 'Instagram Presence', description: 'Clarify your profile, confidence, and brand-readiness.', icon: Instagram },
  { title: 'YouTube Live Hosting', description: 'Learn a clear, calm approach to a live audience.', icon: MonitorPlay },
  { title: 'Brand Livestreams', description: 'Train for product demos, launches, Q&A sessions, and community lives.', icon: Video },
  { title: 'Product Demos', description: 'Explain products with warmth, structure, and appropriate claims.', icon: Camera },
  { title: 'Creator Campaigns', description: 'Become eligible for brand-safe campaign and creator work.', icon: BadgeCheck },
  { title: 'Creator Partnerships', description: 'Be shortlisted where reliability and communication matter.', icon: HeartHandshake }
];

const promise = [
  'No joining fee, hidden deductions, or training debt',
  'No adult, obscene, illegal, exploitative, or unsafe content',
  'No unpaid commercial work',
  'No forced outfits, scripts, poses, or campaigns',
  'No unsafe private client requests',
  'No false income guarantees',
  'Written scope and payout before paid work',
  'Creators can accept or decline opportunities',
  'Content usage only with written consent'
];

export const CreatorLaunchSections = () => (
  <>
    <SectionWrapper className="!pt-0 bg-porcelain/45 sm:!pt-16 lg:!pt-0">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-primary/25 bg-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-champagne text-primary"><HeartHandshake className="h-5 w-5" aria-hidden /></div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.13em] text-primary">For creators</p>
          <h2 className="mt-3 font-display text-3xl text-espresso">A career path that begins with trust.</h2>
          <p className="mt-3 text-sm leading-6 text-cocoa">Apply free, train if selected, build camera confidence, and become eligible for brand-safe paid opportunities without giving up your independence.</p>
          <Button href="/creators" className="mt-7" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Explore Creator Program</Button>
        </Card>
        <Card className="border-gold/35 bg-champagne/45">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-card"><Building2 className="h-5 w-5" aria-hidden /></div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.13em] text-primary">For brands</p>
          <h2 className="mt-3 font-display text-3xl text-espresso">Campaign talent with a clearer process.</h2>
          <p className="mt-3 text-sm leading-6 text-cocoa">Book trained creators for livestreams, product demos, creator campaigns, and live shopping with scope, usage, and safety clarity.</p>
          <Button href="/brands" variant="secondary" className="mt-7">Book Brand Call</Button>
        </Card>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-white">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Included for selected creators</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Everything you need to become camera-ready and brand-ready.</h2>
          <p className="mt-4 text-base leading-7 text-cocoa">The program is free to apply for and selection-based. We do not use inflated value claims or hide charges behind training language.</p>
          <p className="mt-6 inline-flex rounded-full border border-primary/15 bg-porcelain px-4 py-3 text-sm font-semibold text-espresso">Total upfront cost: ₹0</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-primary/15 bg-primary/10 shadow-card sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item, index) => (
            <div key={item} className="bg-white p-5">
              <span className="font-mono text-xs text-primary">0{index + 1}</span>
              <p className="mt-6 text-sm font-semibold leading-6 text-espresso">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-cocoa">Training and opportunities are selection-based. Income is not guaranteed. Paid commercial work is shared with written scope, payout, usage rights, and fee terms before acceptance.</p>
    </SectionWrapper>

    <SectionWrapper>
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Built for the new creator economy</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso">Build skills that brands can use responsibly.</h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paths.map((path) => (
          <Card key={path.title} className="p-6">
            <path.icon className="h-6 w-6 text-primary" aria-hidden />
            <h3 className="mt-6 text-lg font-semibold text-espresso">{path.title}</h3>
            <p className="mt-2 text-sm leading-6 text-cocoa">{path.description}</p>
          </Card>
        ))}
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-champagne/45">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">How money works</p>
          <h2 className="mt-4 font-display text-4xl text-espresso">You pay nothing upfront.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-cocoa">Alina Popova earns through brand service fees or agreed marketing and management fees from revenue generated through agency-supported opportunities. Paid work is never automatic and never forced.</p>
        </div>
        <div className="rounded-xl border border-primary/15 bg-white px-6 py-6 text-sm leading-7 text-cocoa shadow-card"><CircleDollarSign className="mb-4 h-7 w-7 text-primary" aria-hidden />When a suitable opportunity is available, you receive the scope, payout, usage rights, and fee structure before you decide.</div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-porcelain/65">
      <div className="grid gap-10 rounded-[40px] border border-primary/15 bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Safety promise</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Safety, consent, and clarity are non-negotiable.</h2>
          <p className="mt-4 text-base leading-7 text-cocoa">You stay independent, informed, and in control. We only support lawful, consent-based, brand-safe creator work.</p>
          <Button href="/safety" variant="secondary" className="mt-7">View Safety Promise</Button>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {promise.map((item) => <li key={item} className="flex gap-3 rounded-xl border border-primary/10 bg-porcelain/60 p-4 text-sm leading-6 text-cocoa"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{item}</li>)}
        </ul>
      </div>
    </SectionWrapper>

    <SectionWrapper className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Applications are open</p>
      <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso">Your creator path should feel safe, clear, and professional from day one.</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cocoa">Apply if you are 18+, serious about camera-based work, and interested in Instagram, YouTube Live, livestream hosting, product demos, modelling, or brand-safe creator opportunities.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3"><Button href="/apply" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Apply Free</Button><Button href="/safety" variant="secondary">Read Safety Promise</Button></div>
    </SectionWrapper>
  </>
);
