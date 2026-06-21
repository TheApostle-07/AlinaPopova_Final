import { ArrowRight, BarChart3, Camera, CheckCircle2, CircleDollarSign, Clapperboard, FileCheck2, Instagram, Megaphone, MonitorPlay, ShieldCheck, Smartphone, UsersRound, Video } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { BrandOperationsPreview } from '@/components/creator/BrandOperationsPreview';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const services = [
  { title: 'UGC Video Campaigns', description: 'Product-led videos for organic social and agreed paid usage.', icon: Smartphone },
  { title: 'Instagram Reels Campaigns', description: 'Creator-led content plans built around a practical campaign objective.', icon: Instagram },
  { title: 'YouTube Shorts Campaigns', description: 'Short-form creator content for reach, product proof, and social momentum.', icon: Clapperboard },
  { title: 'YouTube Live Campaigns', description: 'Hosts, show flow, moderation support, and post-live clips.', icon: MonitorPlay },
  { title: 'Instagram Live Campaigns', description: 'Structured live moments for launches, Q&A, and community.', icon: Video },
  { title: 'Product Demo Campaigns', description: 'Prepared product presentation for launches, education, and commerce.', icon: Camera },
  { title: 'Live Shopping Campaigns', description: 'Live hosts, product flow, and audience-ready session structure.', icon: Video },
  { title: 'Creator-Led Launch Campaigns', description: 'Campaign concepts and creator coordination for high-attention moments.', icon: Megaphone },
  { title: 'Social Proof Campaigns', description: 'Creator stories and product moments that make brand claims more human.', icon: UsersRound },
  { title: 'Paid Ad Creative Campaigns', description: 'Creator-made assets for paid media with agreed platform usage.', icon: CircleDollarSign }
];

const companyStandards = [
  'Campaign goal, timing, budget, and expected deliverables are scoped first.',
  'Creators see the commercial brief and choose whether to accept it.',
  'Usage rights, payout, and agency terms are confirmed in writing.',
  'No adult, exploitative, unsafe, or unpaid commercial work is supported.'
];

const ServiceGrid = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
    {services.map((service) => <Card key={service.title} className="p-5"><service.icon className="h-6 w-6 text-primary" aria-hidden /><h3 className="mt-5 text-base font-semibold leading-6 text-espresso">{service.title}</h3><p className="mt-2 text-sm leading-6 text-cocoa">{service.description}</p></Card>)}
  </div>
);

const CompanyCta = ({ label = 'Market My Company' }: { label?: string }) => <Button href="/contact" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>{label}</Button>;

export const CompanyMarketingPage = () => (
  <>
    <PageHero eyebrow="For companies" title="Creator-Led Marketing for Companies That Need Attention, Trust, and Sales" description="Alina Popova helps companies turn creators into a managed marketing channel through UGC, Instagram, YouTube, livestreams, product demos, and campaign execution." actions={<><CompanyCta /><Button href="/pricing" variant="secondary">View Packages</Button></>} />
    <SectionWrapper>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">How we help</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Bring the business objective. We build the creator-led campaign around it.</h2><p className="mt-4 text-base leading-7 text-cocoa">Whether you need product education, content volume, a live commerce moment, or a focused launch, the work begins with a structured brief. We then define the service mix, production plan, creator fit, deliverables, and usage requirements.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="/campaigns" variant="secondary">See Campaigns</Button><Button href="/live-studio" variant="ghost">Explore Live Studio</Button></div></div><BrandOperationsPreview /></div>
    </SectionWrapper>
    <SectionWrapper className="bg-champagne/45"><div className="grid gap-5 lg:grid-cols-2"><Card className="p-7"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">The problem</p><h2 className="mt-4 font-display text-3xl text-espresso">Creator marketing is hard to run without a system.</h2><p className="mt-4 text-base leading-7 text-cocoa">Generic content, inconsistent social, unclear usage rights, and unmanaged creator relationships can make a promising campaign feel chaotic.</p></Card><Card className="p-7"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">The Alina Popova solution</p><h2 className="mt-4 font-display text-3xl text-espresso">A managed campaign channel built around real human content.</h2><p className="mt-4 text-base leading-7 text-cocoa">We handle campaign strategy, creator shortlisting, hooks and scripts, production, livestream planning, approvals, usage clarity, and reporting.</p></Card></div></SectionWrapper>
    <SectionWrapper className="bg-porcelain/45"><div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">What we can deliver</p><h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso">A focused menu of creator-led marketing services.</h2></div><div className="mt-10"><ServiceGrid /></div></SectionWrapper>
    <SectionWrapper><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{companyStandards.map((standard, index) => <Card key={standard} className="p-6"><span className="font-mono text-xs text-primary">0{index + 1}</span><CheckCircle2 className="mt-7 h-6 w-6 text-primary" aria-hidden /><p className="mt-5 text-sm leading-6 text-cocoa">{standard}</p></Card>)}</div></SectionWrapper>
    <SectionWrapper className="bg-ink text-ivory"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-neon">Start with a campaign brief</p><h2 className="mt-4 font-display text-4xl leading-tight text-white">Get a service recommendation before committing to a large monthly scope.</h2><p className="mt-4 text-base leading-7 text-champagne/75">Share the product, objective, timing, budget range, and audience. We will route the brief to the right campaign format.</p><CompanyCta label="Share a Campaign Brief" /></div></SectionWrapper>
  </>
);

export const ServicesPage = () => (
  <>
    <PageHero eyebrow="Services" title="Modern Marketing Services Powered by Creators, Content, and Livestreams" description="From UGC and Reels to YouTube Live and product demos, Alina Popova builds creator-led marketing systems for companies that need human content at scale." actions={<CompanyCta label="Book Brand Campaign" />} />
    <SectionWrapper><ServiceGrid /></SectionWrapper>
    <SectionWrapper className="bg-champagne/45"><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{[['Content marketing', 'UGC videos, Reels, Shorts, ad creatives, product demos, and organic social content.'], ['Live marketing', 'Instagram Live, YouTube Live, livestream selling, live shopping, demos, and founder sessions.'], ['Campaign management', 'Creator shortlists, hook writing, calendars, production tracking, approvals, usage rights, and reporting.'], ['Creator network', 'Creator fit, language matching, creator acceptance, safety rules, and content usage consent.']].map(([title, description]) => <Card key={title} className="p-7"><FileCheck2 className="h-7 w-7 text-primary" aria-hidden /><h2 className="mt-6 font-display text-2xl text-espresso">{title}</h2><p className="mt-3 text-sm leading-6 text-cocoa">{description}</p></Card>)}</div></SectionWrapper>
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
    <SectionWrapper className="bg-ink text-ivory"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-neon">Our standard</p><h2 className="mt-4 font-display text-4xl leading-tight text-white">Clear work, creator choice, and marketing that brands can stand behind.</h2><p className="mt-4 text-base leading-7 text-champagne/75">We do not support adult, obscene, exploitative, unsafe, or unpaid commercial work. We do not promise guaranteed income, sales, or virality.</p></div></SectionWrapper>
  </>
);
