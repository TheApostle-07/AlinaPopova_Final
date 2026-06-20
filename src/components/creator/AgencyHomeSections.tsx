import { ArrowRight, BadgeCheck, BarChart3, Camera, CircleDollarSign, Clapperboard, Instagram, Megaphone, MonitorPlay, ShieldCheck, Smartphone, UsersRound, Video } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const services = [
  { title: 'Instagram growth campaigns', description: 'Creator-first social concepts built around clear campaign goals.', icon: Instagram },
  { title: 'UGC content creation', description: 'Authentic product-led videos for organic and paid social use.', icon: Smartphone },
  { title: 'YouTube Live hosting', description: 'Prepared hosts, runbooks, and moderated live formats.', icon: MonitorPlay },
  { title: 'Livestream product demos', description: 'Structured product presentations with audience engagement.', icon: Video },
  { title: 'Creator-led product launches', description: 'Launch content, live moments, and creator coordination.', icon: Megaphone },
  { title: 'Short-form reels production', description: 'Hooks, creator performance, editing, and delivery planning.', icon: Clapperboard },
  { title: 'Brand ambassador campaigns', description: 'Longer-term creator partnerships with usage clarity.', icon: UsersRound },
  { title: 'Live shopping campaigns', description: 'Hosts, scripts, product flow, and post-live learning.', icon: Camera },
  { title: 'Social media management', description: 'Campaign calendars and social execution where it adds value.', icon: BarChart3 },
  { title: 'Paid ad creatives', description: 'Creator-made performance assets with agreed usage rights.', icon: BadgeCheck }
];

const standards = [
  'No joining fee or training debt for creators',
  'No adult, exploitative, or unsafe work',
  'No unpaid commercial work',
  'Clear scope, usage rights, payout, and agency terms',
  'Creators accept or decline every opportunity',
  'No false guarantees of sales, income, or virality'
];

export const AgencyHomeSections = () => (
  <>
    <SectionWrapper className="!pt-0 bg-porcelain/45 sm:!pt-16 lg:!pt-0">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-primary/25 bg-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-champagne text-primary"><Megaphone className="h-5 w-5" aria-hidden /></div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.13em] text-primary">For companies</p>
          <h2 className="mt-3 font-display text-3xl text-espresso">Creator-led marketing built around the work that needs doing.</h2>
          <p className="mt-3 text-sm leading-6 text-cocoa">Bring us a launch, product, social goal, or live commerce brief. We shape the service, talent, deliverables, and rights around it.</p>
          <Button href="/companies" className="mt-7" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Market My Company</Button>
        </Card>
        <Card className="border-primary/15 bg-champagne/45">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-card"><UsersRound className="h-5 w-5" aria-hidden /></div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.13em] text-primary">For creators</p>
          <h2 className="mt-3 font-display text-3xl text-espresso">A creator network with clear standards and no joining fee.</h2>
          <p className="mt-3 text-sm leading-6 text-cocoa">Independent creators can apply free, develop relevant skills if selected, and receive only opportunities they are free to accept or decline.</p>
          <Button href="/creators" variant="secondary" className="mt-7">Join Creator Network</Button>
        </Card>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-white">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Marketing services</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Built to make products easier to notice, understand, and choose.</h2></div>
        <Button href="/services" variant="secondary">Explore Services</Button>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {services.map((service) => <Card key={service.title} className="p-5"><service.icon className="h-6 w-6 text-primary" aria-hidden /><h3 className="mt-5 text-base font-semibold leading-6 text-espresso">{service.title}</h3><p className="mt-2 text-sm leading-6 text-cocoa">{service.description}</p></Card>)}
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-champagne/45">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">How engagements work</p><h2 className="mt-4 font-display text-4xl text-espresso">A practical campaign process for brands and creators.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-cocoa">Companies begin with a brief and package fit. Creators are shortlisted only when a relevant campaign exists. Both sides see the terms before commercial work begins.</p><Button href="/how-it-works" variant="secondary" className="mt-7">See the Process</Button></div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[['01', 'Company brief', 'Goals, product, budget, timing, and formats.'], ['02', 'Campaign plan', 'Scope, deliverables, talent, and rights.'], ['03', 'Creator matching', 'Suitable independent creators review the brief.'], ['04', 'Delivery + reporting', 'Execute, document, and measure what was agreed.']].map(([number, title, description]) => <div key={number} className="rounded-2xl border border-primary/15 bg-white p-5 shadow-card"><span className="font-mono text-xs text-primary">{number}</span><h3 className="mt-6 text-lg font-semibold text-espresso">{title}</h3><p className="mt-2 text-sm leading-6 text-cocoa">{description}</p></div>)}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-ink text-ivory">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-neon">Our operating standard</p><h2 className="mt-4 font-display text-4xl leading-tight text-white">Marketing performance should never depend on unclear or unsafe creator work.</h2><p className="mt-4 text-base leading-7 text-champagne/75">We make campaign expectations understandable before they begin. That protects brand quality, creator choice, and the people who see the work.</p><Button href="/safety" variant="secondary" className="mt-7 border-white/35 bg-white text-espresso hover:bg-champagne">View Safety Standards</Button></div>
        <ul className="grid gap-3 sm:grid-cols-2">{standards.map((standard) => <li key={standard} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-champagne/85"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-neon" aria-hidden />{standard}</li>)}</ul>
      </div>
    </SectionWrapper>

    <SectionWrapper className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Start with the right route</p>
      <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso">Campaign help for companies. Brand-safe opportunities for creators.</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cocoa">Choose the path that matches why you are here. Both start with a clear, no-pressure conversation.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3"><Button href="/companies" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Market My Company</Button><Button href="/apply" variant="secondary">Apply as Creator</Button></div>
    </SectionWrapper>
  </>
);
