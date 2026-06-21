import { ArrowRight, BadgeCheck, BarChart3, Camera, CircleDollarSign, Clapperboard, Instagram, Megaphone, MonitorPlay, ShieldCheck, Smartphone, UsersRound, Video } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const services = [
  { title: 'UGC Video Production', description: 'Product-led videos for organic social and agreed paid usage.', icon: Smartphone },
  { title: 'Instagram Reels Campaigns', description: 'Creator-first social concepts built around clear campaign goals.', icon: Instagram },
  { title: 'YouTube Shorts Campaigns', description: 'Fast, useful creator content for product discovery and reach.', icon: Clapperboard },
  { title: 'YouTube Live Sessions', description: 'Prepared hosts, runbooks, and moderated live formats.', icon: MonitorPlay },
  { title: 'Instagram Live Campaigns', description: 'Structured live moments for launches, Q&A, and community.', icon: Video },
  { title: 'Product Demo Videos', description: 'Clear, product-led presentation that answers buyer questions.', icon: Camera },
  { title: 'Live Shopping Campaigns', description: 'Hosts, scripts, product flow, and post-live learning.', icon: Video },
  { title: 'Creator-Led Launches', description: 'Launch content, live moments, and creator coordination.', icon: Megaphone },
  { title: 'Paid Ad Creative Production', description: 'Creator-made performance assets with agreed usage rights.', icon: BadgeCheck },
  { title: 'Social Media Content Engine', description: 'Campaign calendars and ongoing social execution.', icon: BarChart3 },
  { title: 'Campaign Management', description: 'Planning, approvals, production tracking, and reporting.', icon: BadgeCheck },
  { title: 'Creator Coordination', description: 'Clear creator matching, communication, and delivery support.', icon: UsersRound }
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
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Two connected systems</p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">One studio. Two connected systems.</h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-primary/25 bg-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-champagne text-primary"><Megaphone className="h-5 w-5" aria-hidden /></div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.13em] text-primary">For companies</p>
          <h2 className="mt-3 font-display text-3xl text-espresso">Creator-led marketing without the creator-management chaos.</h2>
          <p className="mt-3 text-sm leading-6 text-cocoa">We plan and execute UGC videos, Instagram campaigns, YouTube content, livestreams, product demos, live shopping, and creator-led launches with clear deliverables and managed execution.</p>
          <Button href="/companies" className="mt-7" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Market My Company</Button>
        </Card>
        <Card className="border-primary/15 bg-champagne/45">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-card"><UsersRound className="h-5 w-5" aria-hidden /></div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.13em] text-primary">For creators</p>
          <h2 className="mt-3 font-display text-3xl text-espresso">A safer path into professional creator work.</h2>
          <p className="mt-3 text-sm leading-6 text-cocoa">Apply free to join the Alina Popova Creator Network. If selected, you may receive guidance, training, and access to brand-safe paid opportunities with written scope and payout terms.</p>
          <Button href="/apply" variant="secondary" className="mt-7">Apply as Creator</Button>
        </Card>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-white">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Marketing services</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Marketing built for the creator economy.</h2></div>
        <Button href="/services" variant="secondary">Explore Services</Button>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        <div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-neon">Safety promise</p><h2 className="mt-4 font-display text-4xl leading-tight text-white">Brand-safe. Creator-safe. Clear before anything goes live.</h2><p className="mt-4 text-base leading-7 text-champagne/75">We do not support adult, obscene, illegal, exploitative, coercive, or unsafe content. Creator content is used only with written scope, usage terms, and consent.</p><Button href="/safety" variant="secondary" className="mt-7 border-white/35 bg-white text-espresso hover:bg-champagne">Read Safety Promise</Button></div>
        <ul className="grid gap-3 sm:grid-cols-2">{standards.map((standard) => <li key={standard} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-champagne/85"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-neon" aria-hidden />{standard}</li>)}</ul>
      </div>
    </SectionWrapper>

    <SectionWrapper className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Start with the right route</p>
      <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso">Choose your front. We&apos;ll build the system around it.</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cocoa">Choose the route that matches why you are here. Both start with a clear, no-pressure conversation.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3"><Button href="/companies" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Market My Company</Button><Button href="/apply" variant="secondary">Apply as Creator</Button></div>
    </SectionWrapper>
  </>
);
