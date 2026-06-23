import { ArrowRight, CheckCircle2, Clapperboard, FileCheck2, Radio, ShieldCheck, UsersRound, Video } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { BrandOperationsPreview } from '@/components/creator/BrandOperationsPreview';
import { Reveal } from '@/components/motion/Reveal';
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
  ['Written scope before work', 'Scope, deliverables, timing, and revisions are confirmed first.'],
  ['Creator acceptance before assignment', 'Creators review the brief before assignment.'],
  ['Usage rights stated clearly', 'Organic, paid, editing, and extended use are written.'],
  ['Payment and payout terms documented', 'Commercial payment terms are recorded before work.']
] as const;

const companyPackageCards = [
  {
    title: 'Campaign strategy',
    description: 'Turn your product, audience, offer, platform, and budget into a clear campaign direction.',
    items: ['Campaign goal', 'Audience fit', 'Content angle', 'Delivery plan'],
    outcome: 'Know what is being created and why.',
    icon: FileCheck2
  },
  {
    title: 'Creator matching',
    description: 'Shortlist the right creators, hosts, models, editors, writers, or production support.',
    items: ['UGC creators', 'Models / hosts', 'Editors / writers', 'Production talent'],
    outcome: 'Get the right talent mix for the campaign.',
    icon: UsersRound
  },
  {
    title: 'Content production',
    description: 'Create campaign assets that make your product easier to understand, trust, and remember.',
    items: ['UGC videos', 'Reels / Shorts', 'Product demos', 'Ad creatives'],
    outcome: 'Receive usable content assets.',
    icon: Clapperboard
  },
  {
    title: 'Platform marketing',
    description: 'Shape content for the platforms where your buyers pay attention.',
    items: ['Instagram', 'YouTube', 'Livestreams', 'Landing / follow-up direction'],
    outcome: 'Avoid copying the same content everywhere.',
    icon: Video
  },
  {
    title: 'Livestream system',
    description: 'Build prepared live sessions for product demos, launches, Q&A, or guided selling.',
    items: ['Host flow', 'Runbook', 'CTA moments', 'Post-live clips'],
    outcome: 'Run lives with structure, not guesswork.',
    icon: Radio
  },
  {
    title: 'Campaign management',
    description: 'Keep the campaign organized from brief to delivery with approvals, rights, and reporting notes.',
    items: ['Approvals', 'Usage rights', 'Creator coordination', 'Reporting notes'],
    outcome: 'Keep execution clean and trackable.',
    icon: ShieldCheck
  }
];

const fullPackageGroups = [
  ['Strategy', ['Campaign objective', 'Audience and offer', 'Platform recommendation', 'Content roadmap']],
  ['Content', ['UGC videos', 'Reels / Shorts', 'Product demos', 'Ad creatives', 'Hooks and scripts']],
  ['Talent', ['Creators', 'Models', 'Presenters', 'Livestream hosts', 'Editors / writers']],
  ['Platforms', ['Instagram', 'YouTube', 'Livestreams', 'Website direction', 'WhatsApp follow-up']],
  ['Delivery', ['Approvals', 'Usage rights', 'Tracking', 'Campaign notes']]
] as const;

const platformPaths = [
  { id: 'instagram-growth', title: 'Instagram Growth', description: 'For Reels, Stories, creator proof, visual product storytelling, launches, and daily social activity.', items: ['Reels', 'UGC videos', 'Product storytelling', 'Campaign content'], bestFor: 'Beauty, fashion, wellness, local services, lifestyle products, and personal brands.', cta: 'Build Instagram Path', icon: Video },
  { id: 'youtube-growth', title: 'YouTube Growth', description: 'For Shorts, product explainers, useful videos, trust-building content, and searchable education.', items: ['YouTube Shorts', 'Explainers', 'Live planning', 'Clip repurposing'], bestFor: 'Education, apps, services, personal brands, and products that need explanation.', cta: 'Build YouTube Path', icon: Clapperboard },
  { id: 'livestream-sales', title: 'Livestream Sales', description: 'For live attention, product demos, launches, Q&A, community engagement, and guided selling.', items: ['Instagram Live', 'YouTube Live', 'Runbook', 'Host flow'], bestFor: 'Launches, beauty, fashion, wellness, education, and live commerce.', cta: 'Plan Live Campaign', icon: Radio },
  { id: 'ugc-ad-creative', title: 'UGC & Ad Creative', description: 'For human product content used in organic posts, paid tests, landing pages, and social proof.', items: ['UGC videos', 'Demos', 'Hook variations', 'Ad creative angles'], bestFor: 'E-commerce, apps, product brands, service businesses, and offers that need trust.', cta: 'Start UGC Path', icon: Clapperboard },
  { id: 'ecommerce-product-sales', title: 'E-commerce & Product Sales', description: 'For content that helps buyers understand the product, trust it, and take the next step.', items: ['Product demos', 'FAQ-style content', 'Live shopping support', 'Launch assets'], bestFor: 'D2C, jewellery, beauty, wellness, fashion, lifestyle, and premium products.', cta: 'Promote Product', icon: UsersRound },
  { id: 'whatsapp-lead-followup', title: 'WhatsApp & Lead Follow-Up', description: 'For creator-led attention connected to a practical inquiry and follow-up path.', items: ['CTA planning', 'Lead flow direction', 'WhatsApp follow-up ideas', 'Landing page direction'], bestFor: 'Clinics, coaching, local services, real estate, education, and appointment businesses.', cta: 'Build Lead Path', icon: FileCheck2 },
  { id: 'all-platform-campaign', title: 'All-Platform Campaign', description: 'For brands ready to combine Instagram, YouTube, UGC, lives, and follow-up in phases.', items: ['Platform roadmap', 'Content system', 'Live calendar', 'Repurposing plan'], bestFor: 'Companies ready for a recurring creator marketing engine.', cta: 'Build Full Package', icon: ShieldCheck },
  { id: 'not-sure-yet', title: 'Not Sure Yet', description: 'For companies that know the business goal but need help choosing the service, platform, or package.', items: ['Campaign diagnosis', 'Platform recommendation', 'Service mix', 'Package suggestion'], bestFor: 'Early-stage campaign planning.', cta: 'Recommend My Path', icon: FileCheck2 }
] as const;

const businessOutcomes = [
  ['More human content', 'Creator-led content helps your brand feel more real, clear, and relatable.'],
  ['Better product explanation', 'Demos, lives, and walkthroughs help people understand what the product does and why it matters.'],
  ['Stronger social proof', 'UGC, creator videos, and campaign content can help reduce buyer hesitation.'],
  ['More platform activity', 'Reels, Shorts, Lives, and repurposed clips help your brand show up more consistently.'],
  ['Cleaner launch support', 'Campaign planning helps launches feel structured instead of rushed.'],
  ['Clearer campaign decisions', 'Reporting notes help you choose the next step.']
] as const;

const ServiceGrid = () => (
  <div className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-2">
    {servicePillars.map((service) => {
      const Icon = service.icon;
      return <Card key={service.title} className="flex min-h-[440px] flex-col p-8 sm:p-10"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><Icon className="h-6 w-6" aria-hidden /></span><h3 className="mt-7 font-display text-3xl leading-tight text-espresso">{service.title}</h3><p className="mt-4 max-w-xl text-base leading-7 text-cocoa">{service.description}</p><ul className="mt-7 grid gap-3 text-sm leading-6 text-cocoa sm:grid-cols-2">{service.items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul><p className="mt-auto border-t border-[#ECE8EC] pt-5 text-sm font-semibold leading-6 text-espresso">{service.outcome}</p><Button href="/companies/start" variant="ghost" className="mt-5 self-start">{service.cta}</Button></Card>;
    })}
  </div>
);

interface CompanySectionIntroProps {
  eyebrow: string;
  title: string;
  copy: string;
}

const CompanySectionIntro = ({ eyebrow, title, copy }: CompanySectionIntroProps) => (
  <div className="mx-auto max-w-3xl text-center">
    <p className="text-sm font-semibold text-primary">{eyebrow}</p>
    <h2 className="mt-4 font-display text-3xl leading-tight text-espresso sm:text-4xl lg:text-[3rem]">{title}</h2>
    <p className="mt-5 text-base leading-7 text-cocoa sm:text-lg sm:leading-8">{copy}</p>
  </div>
);

const CompanyIconTile = ({ icon: Icon }: { icon: LucideIcon }) => (
  <span className="card-icon flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary">
    <Icon className="h-6 w-6" aria-hidden />
  </span>
);

const CompanyBulletList = ({ items, compact = false }: { items: readonly string[]; compact?: boolean }) => (
  <ul className={`grid text-sm leading-6 text-cocoa ${compact ? 'mt-5 gap-2.5' : 'mt-7 gap-3 sm:grid-cols-2'}`}>
    {items.map((item) => (
      <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>
    ))}
  </ul>
);

const CompanyCta = ({ label = 'Build My Campaign' }: { label?: string }) => (
  <Button href="/companies/start" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>{label}</Button>
);

export const CompanyMarketingPage = () => (
  <>
    <PageHero
      eyebrow="For Companies"
      title={<>Creator-led marketing for brands that need <span className="hero-gradient-text">trust, content, and sales support.</span></>}
      description="Plan UGC, Instagram, YouTube, livestreams, product demos, creator campaigns, and follow-up paths through one managed studio system."
      actions={<><CompanyCta label="Build My Campaign" /><Button href="/pricing" variant="secondary">View Packages</Button><p className="basis-full pt-2 text-center text-sm font-semibold text-cocoa">UGC <span aria-hidden>·</span> Instagram <span aria-hidden>·</span> YouTube <span aria-hidden>·</span> Livestreams <span aria-hidden>·</span> Product Demos <span aria-hidden>·</span> Creator Campaigns <span aria-hidden>·</span> Follow-Up Paths</p></>}
    />

    <SectionWrapper>
      <Reveal>
        <CompanySectionIntro
          eyebrow="What companies get"
          title="A complete creator-led marketing system around your business goal."
          copy="Instead of managing scattered creators, editors, writers, and platforms yourself, you get one structured path from campaign idea to delivery."
        />
        <div className="mt-12 grid auto-rows-fr gap-7 md:grid-cols-2 xl:grid-cols-3">
          {companyPackageCards.map((card) => (
            <Card key={card.title} className="flex h-full min-h-[400px] flex-col p-8 sm:p-10">
              <CompanyIconTile icon={card.icon} />
              <h3 className="mt-7 font-display text-2xl leading-tight text-espresso">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-cocoa">{card.description}</p>
              <CompanyBulletList items={card.items} />
              <p className="mt-auto border-t border-[#ECE8EC] pt-5 text-sm font-semibold leading-6 text-espresso">{card.outcome}</p>
            </Card>
          ))}
        </div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper className="bg-porcelain/45">
      <Reveal>
        <CompanySectionIntro
          eyebrow="Full package"
          title="One managed path for content, creators, platforms, and campaign delivery."
          copy="Build a focused campaign or a recurring marketing engine across UGC, Instagram, YouTube, livestreams, product demos, editing, and follow-up."
        />
        <div className="panel-gradient mt-12 rounded-[44px] border border-primary/15 p-7 shadow-card sm:p-10 lg:p-12">
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-5 xl:gap-0">
            {fullPackageGroups.map(([title, items], index) => (
              <div key={title} className={`xl:px-7 ${index > 0 ? 'xl:border-l xl:border-[#ECE8EC]' : 'xl:pl-0'}`}>
                <h3 className="text-xl font-semibold text-espresso">{title}</h3>
                <CompanyBulletList items={items} compact />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center"><CompanyCta label="Build Full Package" /></div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper>
      <CompanySectionIntro
        eyebrow="Platform paths"
        title="Choose the platform path that matches your next objective."
        copy="Every platform has a different job. Start focused, then expand once the campaign direction is clear."
      />
      <div className="mx-auto mt-12 grid max-w-[1120px] auto-rows-fr gap-7 lg:grid-cols-2">
        {platformPaths.map((path, index) => (
          <Reveal key={path.id} delay={Math.min(index * 0.04, 0.2)} className="h-full">
            <Card className="flex h-full min-h-[400px] flex-col p-8 sm:p-10">
              <CompanyIconTile icon={path.icon} />
              <h3 className="mt-7 font-display text-2xl leading-tight text-espresso">{path.title}</h3>
              <p className="mt-4 text-sm leading-7 text-cocoa">{path.description}</p>
              <CompanyBulletList items={path.items} />
              <p className="mt-7 border-t border-[#ECE8EC] pt-5 text-sm leading-6 text-cocoa"><span className="font-semibold text-espresso">Best for: </span>{path.bestFor}</p>
              <Button href="/companies/start" variant="ghost" className="mt-auto self-start pt-6">{path.cta}</Button>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-porcelain/45">
      <Reveal>
        <CompanySectionIntro
          eyebrow="Business outcomes"
          title="Built to support attention, trust, content volume, and buyer confidence."
          copy="The goal is not random posting. The goal is to give your audience more reasons to notice, understand, trust, and act."
        />
        <div className="mt-12 grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
          {businessOutcomes.map(([title, description]) => (
            <Card key={title} className="flex min-h-[220px] flex-col p-8">
              <CheckCircle2 className="card-icon h-6 w-6 text-primary" aria-hidden />
              <h3 className="mt-6 text-xl font-semibold text-espresso">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-cocoa">{description}</p>
            </Card>
          ))}
        </div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper>
      <Reveal>
        <CompanySectionIntro
          eyebrow="Clear expectations"
          title="Serious marketing, not fake guarantees."
          copy="We create content systems designed to improve attention, trust, and engagement quality. Platform outcomes depend on offer strength, content quality, audience, consistency, budget, platform algorithms, and market response."
        />
        <div className="mx-auto mt-12 grid max-w-[1120px] auto-rows-fr gap-7 lg:grid-cols-2">
          <Card className="flex min-h-[380px] flex-col p-8 sm:p-10">
            <CompanyIconTile icon={CheckCircle2} />
            <p className="mt-7 text-sm font-semibold text-primary">We support</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-espresso">A managed creator marketing system.</h3>
            <CompanyBulletList items={['Creator-led content', 'Platform-native campaigns', 'Product demos', 'Livestream planning', 'Social proof assets', 'Campaign structure', 'Usage clarity', 'Reporting notes']} />
          </Card>
          <Card className="flex min-h-[380px] flex-col border-primary/20 p-8 sm:p-10">
            <CompanyIconTile icon={ShieldCheck} />
            <p className="mt-7 text-sm font-semibold text-primary">We do not promise</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-espresso">Artificial engagement or guaranteed outcomes.</h3>
            <CompanyBulletList items={['Guaranteed sales', 'Guaranteed followers', 'Guaranteed likes or shares', 'Guaranteed virality', 'Fake engagement', 'Platform algorithm control', 'Results without strong offer and follow-up']} />
          </Card>
        </div>
        <div className="mt-10 text-center"><Button href="/terms" variant="secondary">Read Terms</Button></div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper className="bg-porcelain/45">
      <Reveal>
        <CompanySectionIntro
          eyebrow="Campaign protection"
          title="Clear campaign terms from brief to delivery."
          copy="Written scope, creator acceptance, usage rights, and payment terms protect the company, the creators, and the campaign work."
        />
        <div className="mt-12 grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-4">
          {campaignProtections.map(([title, description], index) => (
            <Card key={title} className="flex min-h-[260px] flex-col p-8">
              <span className="font-mono text-xs text-primary">0{index + 1}</span>
              <CheckCircle2 className="card-icon mt-7 h-6 w-6 text-primary" aria-hidden />
              <h3 className="mt-5 text-lg font-semibold text-espresso">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-cocoa">{description}</p>
            </Card>
          ))}
        </div>
      </Reveal>
    </SectionWrapper>

    <SectionWrapper>
      <Reveal>
        <div className="cta-surface mx-auto max-w-4xl rounded-[52px] border border-primary/15 px-7 py-14 text-center shadow-card sm:px-12 lg:px-16 lg:py-16">
          <p className="text-sm font-semibold text-primary">Next step for companies</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-espresso sm:text-4xl">Ready to build a creator-led marketing package?</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-cocoa">Share your product, platform, goal, budget range, and timeline. We will recommend a practical campaign path before you commit to a larger scope.</p>
          <div className="cta-row mt-9"><CompanyCta label="Submit Company Brief" /><Button href="/pricing" variant="secondary">View Packages</Button></div>
          <p className="mt-5 text-sm font-semibold text-cocoa">No pressure. No fake guarantees. Just a clear campaign recommendation.</p>
        </div>
      </Reveal>
    </SectionWrapper>
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
