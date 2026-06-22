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

const companyPackageCards = [
  {
    title: 'Campaign strategy',
    description: 'We turn your product, offer, audience, platform, budget, and timeline into a clear campaign direction.',
    items: ['Campaign goal', 'Target audience', 'Platform priority', 'Content angle', 'Deliverable plan'],
    outcome: 'You know what is being created, why it matters, and how it supports the business objective.',
    icon: FileCheck2
  },
  {
    title: 'Creator and talent matching',
    description: 'We shortlist creators, presenters, hosts, models, editors, writers, and production support around the campaign need.',
    items: ['UGC creators', 'Campaign talent', 'Livestream hosts', 'Presenters', 'Editors and writers'],
    outcome: 'Your campaign gets the right talent mix instead of random creator outreach.',
    icon: UsersRound
  },
  {
    title: 'Content production',
    description: 'We create or coordinate human content that makes your product easier to understand, trust, and remember.',
    items: ['UGC videos', 'Instagram Reels', 'YouTube Shorts', 'Product demos', 'Scripts and hooks'],
    outcome: 'Your brand receives usable content assets for organic marketing and agreed usage.',
    icon: Clapperboard
  },
  {
    title: 'Platform marketing',
    description: 'We shape content and campaign formats for the channel where your audience needs to see you.',
    items: ['Instagram Reels and Stories', 'YouTube Shorts', 'Instagram Live', 'YouTube Live', 'Content calendar support'],
    outcome: 'Your campaign is built for the channel, not copied blindly across every platform.',
    icon: Video
  },
  {
    title: 'Livestream and product demos',
    description: 'For products, launches, education, and live selling, we structure sessions with hosts, talking points, demos, and CTA moments.',
    items: ['Live runbook', 'Trained host', 'Product demo flow', 'Q&A planning', 'Post-live clips'],
    outcome: 'Your brand gets a prepared live marketing moment, not an unplanned live session.',
    icon: Video
  },
  {
    title: 'Campaign management and reporting',
    description: 'We manage briefs, approvals, creator communication, usage rights, deliverables, and campaign notes.',
    items: ['Creator coordination', 'Approval flow', 'Usage rights clarity', 'Delivery tracking', 'Campaign notes'],
    outcome: 'You get a cleaner campaign process from brief to delivery.',
    icon: ShieldCheck
  }
];

const fullPackageGroups: Array<[string, string[]]> = [
  ['Strategy', ['Campaign objective', 'Audience and offer clarity', 'Platform recommendation', 'Content angle', 'Campaign roadmap']],
  ['Content', ['UGC videos', 'Reels and Shorts', 'Product demos', 'Ad creatives', 'Scripts and hooks']],
  ['Platforms', ['Instagram', 'YouTube', 'Instagram and YouTube Live', 'Website direction', 'WhatsApp follow-up path']],
  ['Talent', ['UGC creators', 'Models and presenters', 'Livestream hosts', 'Editors and writers', 'Production support']],
  ['Management', ['Creator shortlisting', 'Creator acceptance', 'Approvals', 'Usage rights', 'Delivery tracking and reporting']],
  ['Follow-up', ['CTA planning', 'Lead capture direction', 'WhatsApp follow-up suggestions', 'Campaign message flow', 'Post-campaign next steps']]
];

const platformPaths = [
  { title: 'Instagram Growth', description: 'For visual content, Reels, Stories, creator proof, product education, and community attention.', items: ['Reels', 'UGC videos', 'Product storytelling', 'Campaign content'], bestFor: 'Beauty, fashion, wellness, local services, lifestyle products, and personal brands.', cta: 'Build Instagram Campaign' },
  { title: 'YouTube Growth', description: 'For useful videos, product education, trust-building, Shorts, and searchable content.', items: ['YouTube Shorts', 'Creator-led demos', 'Educational angles', 'Clip repurposing'], bestFor: 'Education, services, apps, personal brands, and trust-heavy businesses.', cta: 'Build YouTube Campaign' },
  { title: 'Livestream Sales', description: 'For live attention, product demos, launch sessions, Q&A, community engagement, and guided selling.', items: ['Instagram Live', 'YouTube Live', 'Live runbook', 'Product demo flow'], bestFor: 'Product launches, beauty, fashion, wellness, education, and live commerce.', cta: 'Plan Live Campaign' },
  { title: 'UGC and Ad Creative', description: 'For human product content for organic posting, paid testing, landing pages, and social proof.', items: ['UGC videos', 'Testimonials-style content', 'Problem-solution videos', 'Hook options'], bestFor: 'E-commerce, apps, service businesses, and offers that need trust.', cta: 'Start UGC Pack' },
  { title: 'E-commerce and Product Sales', description: 'For content that helps buyers understand the product, trust it, and take the next step.', items: ['Product demos', 'Launch content', 'Live shopping support', 'Product FAQ content'], bestFor: 'D2C, premium local products, beauty, fashion, jewellery, wellness, and lifestyle.', cta: 'Promote My Product' },
  { title: 'WhatsApp and Lead Follow-up', description: 'For creator-led attention connected to a practical follow-up path after an inquiry.', items: ['CTA planning', 'Lead capture direction', 'WhatsApp suggestions', 'Landing page direction'], bestFor: 'Clinics, education, coaching, real estate, local services, and appointment businesses.', cta: 'Build Lead Path' },
  { title: 'All-Platform Campaign', description: 'For brands that need Instagram, YouTube, UGC, livestreams, and follow-up phased properly.', items: ['Platform roadmap', 'Monthly content system', 'Creator campaign plan', 'Repurposing plan'], bestFor: 'Brands ready for a recurring creator marketing engine.', cta: 'Build Full Package' },
  { title: 'Not Sure Yet', description: 'For companies that know the business goal but need a practical campaign route.', items: ['Campaign diagnosis', 'Platform recommendation', 'Service recommendation', 'Next-step plan'], bestFor: 'Teams that want a focused starting point before committing to a larger scope.', cta: 'Recommend My Path' }
];

const businessOutcomes = [
  ['More human content', 'Creator-led content helps your brand feel more real, clear, and relatable.'],
  ['Better product explanation', 'Demos, lives, and walkthroughs help people understand what the product does and why it matters.'],
  ['Stronger social proof', 'UGC, creator videos, and campaign content can help reduce buyer hesitation.'],
  ['More platform activity', 'Reels, Shorts, Lives, and repurposed clips help your brand show up more consistently.'],
  ['Cleaner launch support', 'Campaign planning helps launches feel structured instead of rushed.'],
  ['Better campaign clarity', 'Written scope, deliverables, and usage rights reduce confusion before production begins.']
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
    <PageHero
      eyebrow="For Companies"
      title={<>Creator-led marketing for brands that need <span className="hero-gradient-text">content, trust, and attention.</span></>}
      description="Alina Popova Studio helps companies plan and execute UGC, Instagram, YouTube, livestreams, product demos, creator campaigns, and follow-up systems - with clear scope, creator consent, usage rights, and campaign delivery."
      actions={<><CompanyCta label="Build My Campaign" /><Button href="/pricing" variant="secondary">View Packages</Button><p className="basis-full pt-2 text-center text-sm font-semibold text-cocoa">UGC <span aria-hidden>·</span> Instagram <span aria-hidden>·</span> YouTube <span aria-hidden>·</span> Livestreams <span aria-hidden>·</span> Product Demos <span aria-hidden>·</span> Creator Campaigns <span aria-hidden>·</span> Follow-up Systems</p></>}
    />

    <SectionWrapper>
      <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">What companies get</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">A complete creator-led marketing package, built around your business goal.</h2><p className="mt-4 text-base leading-7 text-cocoa">Instead of hiring creators, editors, writers, and managers separately, we plan the campaign, choose the platform path, manage the people, and deliver usable marketing assets.</p></div>
      <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">{companyPackageCards.map((card) => { const Icon = card.icon; return <Card key={card.title} className="flex min-h-[410px] flex-col rounded-[34px] p-8 sm:p-9"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><Icon className="h-6 w-6" aria-hidden /></span><h3 className="mt-7 font-display text-2xl leading-tight text-espresso">{card.title}</h3><p className="mt-4 text-sm leading-7 text-cocoa">{card.description}</p><ul className="mt-6 space-y-3 text-sm leading-6 text-cocoa">{card.items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul><p className="mt-auto border-t border-[#ECE8EC] pt-5 text-sm font-semibold leading-6 text-espresso">{card.outcome}</p></Card>; })}</div>
    </SectionWrapper>

    <SectionWrapper className="bg-porcelain/45">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Full package</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">One managed path for content, creators, platforms, and campaign delivery.</h2><p className="mt-4 text-base leading-7 text-cocoa">Choose a focused campaign or build a recurring marketing engine. The full package can combine strategy, creators, content, Instagram, YouTube, livestreams, product demos, editing, and reporting.</p><div className="mt-7"><CompanyCta label="Build Full Package" /></div></div><BrandOperationsPreview /></div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{fullPackageGroups.map(([title, items]) => <Card key={title} className="min-h-[265px] rounded-[30px] p-7"><h3 className="text-xl font-semibold text-espresso">{title}</h3><ul className="mt-5 space-y-2.5 text-sm leading-6 text-cocoa">{items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul></Card>)}</div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Platform paths</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Choose the platform path that matches your business goal.</h2><p className="mt-4 text-base leading-7 text-cocoa">Every platform has a different job. We help you choose the practical route instead of trying to do everything randomly.</p></div>
      <div className="mx-auto mt-12 grid max-w-[1120px] gap-7 lg:grid-cols-2">{platformPaths.map((path) => <Card key={path.title} className="flex min-h-[390px] flex-col rounded-[34px] p-8 sm:p-9"><h3 className="font-display text-2xl leading-tight text-espresso">{path.title}</h3><p className="mt-4 text-sm leading-7 text-cocoa">{path.description}</p><ul className="mt-6 grid gap-2 text-sm leading-6 text-cocoa sm:grid-cols-2">{path.items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul><p className="mt-6 border-t border-[#ECE8EC] pt-5 text-sm leading-6 text-cocoa"><span className="font-semibold text-espresso">Best for: </span>{path.bestFor}</p><Button href="/companies/start" variant="ghost" className="mt-auto self-start pt-6">{path.cta}</Button></Card>)}</div>
    </SectionWrapper>

    <SectionWrapper className="bg-porcelain/45">
      <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Business outcomes</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Built to support attention, trust, content volume, and buyer confidence.</h2><p className="mt-4 text-base leading-7 text-cocoa">The goal is not random posting. It is a campaign system that gives your audience more reasons to notice, understand, trust, and act.</p></div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{businessOutcomes.map(([title, description]) => <Card key={title} className="min-h-[225px] rounded-[30px] p-8"><CheckCircle2 className="h-6 w-6 text-primary" aria-hidden /><h3 className="mt-6 text-xl font-semibold text-espresso">{title}</h3><p className="mt-3 text-sm leading-7 text-cocoa">{description}</p></Card>)}</div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Services we can deliver</p><h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso">Focused services for the campaign you actually need.</h2></div><div className="mt-12"><ServiceGrid /></div>
    </SectionWrapper>

    <SectionWrapper className="bg-porcelain/45">
      <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Clear expectations</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">What we do - and what we do not promise.</h2><p className="mt-4 text-base leading-7 text-cocoa">We build the campaign system and content assets; market response depends on the offer, audience, platform, budget, consistency, and market conditions.</p></div>
      <div className="mx-auto mt-10 grid max-w-[1080px] gap-7 lg:grid-cols-2"><Card className="min-h-[360px] rounded-[34px] p-8 sm:p-10"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">We do</p><h3 className="mt-4 font-display text-3xl text-espresso">Build a managed creator marketing system.</h3><ul className="mt-7 space-y-3 text-sm leading-6 text-cocoa">{['Plan creator-led campaigns', 'Produce or coordinate content', 'Match creators and talent', 'Structure live sessions', 'Manage deliverables and usage rights', 'Provide campaign notes and recommendations'].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul></Card><Card className="min-h-[360px] rounded-[34px] border-primary/20 p-8 sm:p-10"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">We do not promise</p><h3 className="mt-4 font-display text-3xl text-espresso">Artificial engagement or guaranteed platform outcomes.</h3><ul className="mt-7 space-y-3 text-sm leading-6 text-cocoa">{['Guaranteed sales', 'Guaranteed followers', 'Guaranteed likes or shares', 'Guaranteed virality', 'Fake engagement or purchased followers', 'Control over platform algorithms'].map((item) => <li key={item} className="flex gap-3"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul></Card></div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Terms that protect both sides</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Clear campaign terms from first brief to delivery.</h2><p className="mt-4 text-base leading-7 text-cocoa">Written commitments protect the brand, the creators, and the work itself.</p></div><div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{campaignProtections.map(([title, description], index) => <Card key={title} className="min-h-[290px] rounded-[30px] p-8"><span className="font-mono text-xs text-primary">0{index + 1}</span><CheckCircle2 className="mt-7 h-6 w-6 text-primary" aria-hidden /><h3 className="mt-5 text-lg font-semibold text-espresso">{title}</h3><p className="mt-3 text-sm leading-6 text-cocoa">{description}</p></Card>)}</div>
    </SectionWrapper>

    <SectionWrapper><div className="cta-surface mx-auto max-w-3xl rounded-[48px] border border-primary/15 p-8 text-center shadow-card sm:p-12"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Next step for companies</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Ready to build a creator-led marketing package?</h2><p className="mt-4 text-base leading-7 text-cocoa">Share your product, platform, goal, budget range, and timeline. We will recommend a practical campaign path before you commit to a larger scope.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><CompanyCta label="Submit Company Brief" /><Button href="/pricing" variant="secondary">View Packages</Button></div><p className="mt-5 text-sm font-semibold text-cocoa">No pressure. No fake guarantees. Just a clear campaign recommendation.</p></div></SectionWrapper>
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
