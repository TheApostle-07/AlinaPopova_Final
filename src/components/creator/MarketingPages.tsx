import { ArrowRight, CheckCircle2, Clapperboard, FileCheck2, ShieldCheck, UsersRound, Video } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { BrandOperationsPreview } from '@/components/creator/BrandOperationsPreview';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const servicePillars = [
  {
    title: 'UGC & Social Content',
    description: 'Creator-led videos that make products easier to trust, understand, and remember.',
    icon: Clapperboard,
    items: ['UGC product videos', 'Instagram Reels and YouTube Shorts', 'Product demos and ad creatives'],
    outcome: 'Best for brands that need more human content and social proof.',
    cta: 'Explore Content'
  },
  {
    title: 'Livestream & Live Shopping',
    description: 'Structured live sessions for launches, demos, education, and real-time buyer engagement.',
    icon: Video,
    items: ['YouTube and Instagram Live', 'Launch streams and live shopping', 'Product walkthroughs and Q&A'],
    outcome: 'Best for brands that need attention, explanation, and guided selling.',
    cta: 'Plan a Live Campaign'
  },
  {
    title: 'Creator Campaigns',
    description: 'Managed campaigns that connect the right creator, message, format, and platform.',
    icon: UsersRound,
    items: ['Creator-led launches', 'Social proof and brand storytelling', 'Awareness and ambassador content'],
    outcome: 'Best for companies that want creator reach without management chaos.',
    cta: 'Build Campaign'
  },
  {
    title: 'Campaign Management',
    description: 'A complete operating layer for planning, approvals, usage rights, delivery, and reporting.',
    icon: FileCheck2,
    items: ['Creator shortlisting and scripts', 'Approvals and usage rights', 'Delivery tracking and reporting'],
    outcome: 'Best for teams that want clean execution from brief to delivery.',
    cta: 'Manage My Campaign'
  }
];

const companyStandards = [
  'Campaign goal, timing, budget, and expected deliverables are scoped first.',
  'Creators see the commercial brief and choose whether to accept it.',
  'Usage rights, payout, and agency terms are confirmed in writing.',
  'No adult, exploitative, unsafe, or unpaid commercial work is supported.'
];

const campaignProtections = [
  ['Written scope before work', 'Goals, deliverables, timings, and revision boundaries are confirmed before production starts.'],
  ['Creator acceptance before assignment', 'Creators review the brief and choose whether the opportunity is a fit before they are assigned.'],
  ['Usage rights stated clearly', 'Organic, paid, editing, whitelisting, and extended use are agreed in writing.'],
  ['Payment and payout terms documented', 'Company payment and creator payout terms are recorded before commercial work begins.']
];

const ServiceGrid = () => (
  <div className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-2">
    {servicePillars.map((service) => {
      const Icon = service.icon;
      return <Card key={service.title} className="flex min-h-[440px] flex-col p-8 sm:p-10"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><Icon className="h-6 w-6" aria-hidden /></span><h3 className="mt-7 font-display text-3xl leading-tight text-espresso">{service.title}</h3><p className="mt-4 max-w-xl text-base leading-7 text-cocoa">{service.description}</p><ul className="mt-7 grid gap-3 text-sm leading-6 text-cocoa sm:grid-cols-2">{service.items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul><p className="mt-auto border-t border-[#ECE8EC] pt-5 text-sm font-semibold leading-6 text-espresso">{service.outcome}</p><Button href="/companies/start" variant="ghost" className="mt-5 self-start">{service.cta}</Button></Card>;
    })}
  </div>
);

const CompanyCta = ({ label = 'Market My Company' }: { label?: string }) => <Button href="/companies/start" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>{label}</Button>;

export const CompanyMarketingPage = () => (
  <>
    <PageHero eyebrow="For companies" title="Creator-led marketing without the creator-management chaos." description="Alina Popova Studio plans and executes UGC, social content, livestreams, product demos, and creator campaigns with clear ownership from brief to reporting." actions={<><CompanyCta /><Button href="/pricing" variant="secondary">View Packages</Button></>} />
    <SectionWrapper>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">How we help</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Bring the business objective. We build the creator-led campaign around it.</h2><p className="mt-4 text-base leading-7 text-cocoa">Whether you need product education, content volume, a live commerce moment, or a focused launch, the work begins with a structured brief. We then define the service mix, production plan, creator fit, deliverables, and usage requirements.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="/campaigns" variant="secondary">See Campaigns</Button><Button href="/live-studio" variant="ghost">Explore Live Studio</Button></div></div><BrandOperationsPreview /></div>
    </SectionWrapper>
    <SectionWrapper className="bg-champagne/45"><div className="grid gap-5 lg:grid-cols-2"><Card className="p-7"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">The problem</p><h2 className="mt-4 font-display text-3xl text-espresso">Creator marketing is hard to run without a system.</h2><p className="mt-4 text-base leading-7 text-cocoa">Generic content, inconsistent social, unclear usage rights, and unmanaged creator relationships can make a promising campaign feel chaotic.</p></Card><Card className="p-7"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">The Alina Popova solution</p><h2 className="mt-4 font-display text-3xl text-espresso">A managed campaign channel built around real human content.</h2><p className="mt-4 text-base leading-7 text-cocoa">We handle campaign strategy, creator shortlisting, hooks and scripts, production, livestream planning, approvals, usage clarity, and reporting.</p></Card></div></SectionWrapper>
    <SectionWrapper className="bg-porcelain/45"><div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">What we can deliver</p><h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso">A focused menu of creator-led marketing services.</h2></div><div className="mt-10"><ServiceGrid /></div></SectionWrapper>
    <SectionWrapper><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Find the right platform path</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Different goals need different channels.</h2><p className="mt-4 text-base leading-7 text-cocoa">Use these paths to understand where a campaign may start. If you are not sure, share a brief and we will recommend the practical route.</p></div><div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{[['Instagram Growth', 'Reels, UGC, product storytelling, and campaign content.'], ['YouTube Growth', 'Shorts, long-form support, and useful creator content.'], ['YouTube and Instagram Live', 'Live selling, launches, product demos, and Q&A sessions.'], ['UGC and Ad Creatives', 'Human product content for organic use and paid testing.'], ['E-commerce and Product Sales', 'Content that helps people understand and choose the product.'], ['WhatsApp Lead Funnel', 'Creator-led awareness paired with a practical follow-up path.'], ['All-Platform Campaign', 'A phased, focused campaign rather than doing everything at once.'], ['Not Sure Yet', 'Share the business context and get a campaign diagnosis.']].map(([title, description]) => <Card key={title} className="min-h-[210px] p-7"><h3 className="text-xl font-semibold text-espresso">{title}</h3><p className="mt-4 text-sm leading-7 text-cocoa">{description}</p></Card>)}</div></SectionWrapper>
    <SectionWrapper className="bg-porcelain/45"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Terms that protect both sides</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">How campaign terms are protected.</h2><p className="mt-4 text-base leading-7 text-cocoa">Clear commitments protect the brand, the creators, and the work itself from the first brief through delivery.</p></div><div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{campaignProtections.map(([title, description], index) => <Card key={title} className="min-h-[275px] p-8"><span className="font-mono text-xs text-primary">0{index + 1}</span><CheckCircle2 className="mt-7 h-6 w-6 text-primary" aria-hidden /><h3 className="mt-5 text-lg font-semibold text-espresso">{title}</h3><p className="mt-3 text-sm leading-6 text-cocoa">{description}</p></Card>)}</div></SectionWrapper>
    <SectionWrapper><div className="cta-surface mx-auto max-w-3xl rounded-[44px] border border-primary/15 p-8 text-center shadow-card sm:p-12"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Next step for companies</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Ready to plan a creator-led campaign?</h2><p className="mt-4 text-base leading-7 text-cocoa">Share your product, objective, platform, budget range, and timeline. We will route the brief to the right campaign format.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><CompanyCta label="Share a Campaign Brief" /><Button href="/pricing" variant="secondary">View Pricing</Button></div></div></SectionWrapper>
  </>
);

export const ServicesPage = () => (
  <>
    <PageHero eyebrow="Services" title="Content, livestreams, and campaigns built around creators." description="From UGC and short-form social content to product demos and live shopping, each service is scoped around a practical campaign objective." actions={<CompanyCta label="Book Brand Campaign" />} />
    <SectionWrapper><ServiceGrid /></SectionWrapper>
    <SectionWrapper className="bg-champagne/45"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold text-primary">Find the right service path</p><h2 className="mt-3 font-display text-3xl leading-tight text-espresso sm:text-4xl">Start with the business result you need next.</h2><p className="mt-4 text-base leading-7 text-cocoa">The right campaign is not always the biggest one. Start with the outcome, then shape the creator, content, and delivery plan around it.</p></div><div className="mx-auto mt-10 grid max-w-[1080px] gap-6 md:grid-cols-2">{[['I need content', 'UGC, Reels, Shorts, product demos, and ad creative tests.'], ['I need live attention', 'Live selling, product demos, launches, founder sessions, and Q&A.'], ['I need growth', 'A clearer content path for Instagram, YouTube, lead flow, and social proof.'], ['I need talent', 'The right creators, hosts, editors, writers, and production support.']].map(([title, description]) => <Card key={title} className="min-h-[260px] p-8"><FileCheck2 className="h-7 w-7 text-primary" aria-hidden /><h2 className="mt-6 font-display text-2xl text-espresso">{title}</h2><p className="mt-4 text-sm leading-7 text-cocoa">{description}</p></Card>)}</div></SectionWrapper>
    <SectionWrapper><div className="mx-auto max-w-4xl rounded-[48px] border border-primary/15 bg-porcelain p-8 text-center shadow-card sm:p-12"><p className="text-sm font-semibold text-primary">Not sure where to start?</p><h2 className="mt-4 font-display text-3xl leading-tight text-espresso sm:text-4xl">Share the business goal. We will recommend the practical campaign path.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-cocoa">A good brief covers the product, audience, platform, budget, timeline, and what success should look like. It does not lock you into a campaign.</p><div className="mt-8"><CompanyCta label="Build My Campaign" /></div></div></SectionWrapper>
  </>
);

export const CampaignsPage = () => (
  <>
    <PageHero eyebrow="Campaigns" title="Campaign formats built for clear creator deliverables." description="From a contained UGC pack to a multi-creator product launch, every campaign starts with the business goal and ends with agreed deliverables, rights, and reporting." actions={<><CompanyCta label="Plan a Campaign" /><Button href="/pricing" variant="secondary">View Pricing</Button></>} />
    <SectionWrapper><div className="grid gap-5 lg:grid-cols-3">{[
      ['UGC Starter Pack', 'A focused creator content package for a product, offer, or paid-social testing.', '3–5 UGC videos', 'Hooks, scripts, editing, and organic usage terms'],
      ['Creator Launch Campaign', 'A more coordinated campaign for launches, awareness, and product education.', '2–4 creators and 8–12 short videos', 'Product demos, calendar, and basic reporting'],
      ['Monthly Creator Marketing Engine', 'A recurring creator-led system for brands that need consistent output and learning.', 'Content calendar, UGC, creator reels, and lives', 'Campaign management, editing, reporting, and coordination']
    ].map(([title, description, featureOne, featureTwo]) => <Card key={title} className="flex min-h-[300px] flex-col p-7"><p className="text-xs font-semibold uppercase tracking-[0.13em] text-primary">Campaign format</p><h2 className="mt-4 font-display text-3xl text-espresso">{title}</h2><p className="mt-3 text-sm leading-6 text-cocoa">{description}</p><ul className="mt-6 space-y-3 text-sm leading-6 text-cocoa"><li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{featureOne}</li><li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{featureTwo}</li></ul></Card>)}</div></SectionWrapper>
    <SectionWrapper className="bg-porcelain/45"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Campaign rules</p><h2 className="mt-4 font-display text-4xl text-espresso">No unclear briefs. No retroactive usage surprises.</h2><p className="mt-4 text-base leading-7 text-cocoa">We confirm the campaign scope, delivery schedule, product claims, usage period, approval route, and payout before commercial production begins.</p></div><ul className="space-y-3">{companyStandards.map((standard) => <li key={standard} className="flex gap-3 rounded-2xl border border-primary/15 bg-white p-4 text-sm leading-6 text-cocoa"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{standard}</li>)}</ul></div></SectionWrapper>
  </>
);

export const LiveStudioPage = () => (
  <>
    <PageHero eyebrow="Alina Popova Live Studio" title="Live marketing that helps people understand the product in real time." description="We plan creator-hosted livestreams, YouTube Live, product demos, founder sessions, and live shopping experiences with the preparation needed to keep the session useful and brand-safe." actions={<><CompanyCta label="Plan a Live Campaign" /><Button href="/contact" variant="secondary">Book a Live Consultation</Button></>} />
    <SectionWrapper><div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Live studio formats</p><h2 className="mt-4 font-display text-4xl text-espresso">For launches, product discovery, community, and social commerce.</h2><div className="mt-7 grid gap-3 sm:grid-cols-2">{['Product demos', 'YouTube Live', 'Instagram Live', 'Live shopping', 'Founder sessions', 'Community Q&A'].map((format) => <div key={format} className="rounded-2xl border border-primary/15 bg-porcelain/55 px-4 py-4 text-sm font-semibold text-espresso"><Video className="mr-2 inline h-4 w-4 text-primary" aria-hidden />{format}</div>)}</div></div><BrandOperationsPreview /></div></SectionWrapper>
    <SectionWrapper className="bg-champagne/45"><div className="grid gap-5 md:grid-cols-4">{[['01', 'Brief', 'Audience, product, platform, objective, and requirements.'], ['02', 'Runbook', 'Host format, talk track, moderation, product claims, and approvals.'], ['03', 'Go live', 'Creator-hosted session with the agreed support and boundaries.'], ['04', 'Learn', 'Clips, notes, and an outcome review based on the agreed objective.']].map(([number, title, description]) => <Card key={number} className="p-6"><span className="font-mono text-xs text-primary">{number}</span><h2 className="mt-6 text-xl font-semibold text-espresso">{title}</h2><p className="mt-3 text-sm leading-6 text-cocoa">{description}</p></Card>)}</div></SectionWrapper>
  </>
);

export const AboutPage = () => (
  <>
    <PageHero eyebrow="About Alina Popova Studio" title="A marketing studio designed around better creator partnerships." description="Alina Popova Studio is based in Gujarat and works across India. We help companies run creator-led marketing while giving independent creators a clearer, safer route into brand campaigns." actions={<><CompanyCta /><Button href="/creators" variant="secondary">Join Creator Network</Button></>} />
    <SectionWrapper><div className="grid gap-5 lg:grid-cols-2"><Card className="p-8"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">We market for companies</p><h2 className="mt-4 font-display text-3xl text-espresso">Creator-led content and live experiences that have a commercial purpose.</h2><p className="mt-4 text-base leading-7 text-cocoa">The company-facing studio sells services: campaign planning, UGC, live marketing, creator campaigns, content production, and operational support.</p></Card><Card className="p-8"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">We partner with creators</p><h2 className="mt-4 font-display text-3xl text-espresso">A protected network, not a recruitment funnel.</h2><p className="mt-4 text-base leading-7 text-cocoa">Creators remain independent adults. They can apply free, receive relevant support if selected, and choose every commercial opportunity before they take it.</p></Card></div></SectionWrapper>
    <SectionWrapper><div className="mx-auto max-w-3xl rounded-[44px] border border-primary/15 bg-porcelain p-8 text-center shadow-card sm:p-12"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Our standard</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Clear work, creator choice, and marketing that brands can stand behind.</h2><p className="mt-4 text-base leading-7 text-cocoa">We do not support adult, obscene, exploitative, unsafe, or unpaid commercial work. We do not promise guaranteed income, sales, or virality.</p></div></SectionWrapper>
  </>
);
