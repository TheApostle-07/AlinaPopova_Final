import {
  ArrowRight,
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
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const audienceFit = [
  {
    title: 'For brands that need content, trust, and growth.',
    icon: Building2,
    copy: 'Use Alina Popova Studio when your brand needs creator-led content, better product explanation, launch momentum, social proof, livestream attention, or a managed campaign system.',
    items: ['UGC and product videos', 'Instagram and YouTube campaigns', 'Livestream selling and demos', 'Creator-led launch support', 'Usage rights and reporting'],
    outcome: 'Best for companies that want creator marketing without managing scattered freelancers.'
  },
  {
    title: 'For creators and talent with professional skills.',
    icon: UsersRound,
    copy: 'Apply as on-camera talent or behind-the-scenes creative support. Selected creators are matched only when an opportunity fits their role, availability, boundaries, and skill level.',
    items: ['UGC creator, model, or host', 'Editor, writer, or designer', 'Photographer or videographer', 'Social media or campaign support', 'Clear scope before paid work'],
    outcome: 'Best for creators who want safer, structured, brand-safe opportunities.'
  }
];

const servicePillars = [
  {
    label: 'Content',
    title: 'UGC & Social Content',
    icon: Clapperboard,
    copy: 'Creator-led videos that make products easier to trust, understand, and remember.',
    items: ['UGC product videos', 'Instagram Reels', 'YouTube Shorts', 'Product demos', 'Ad creatives'],
    outcome: 'Best for brands that need more human content and social proof.',
    cta: 'Explore Content'
  },
  {
    label: 'Live',
    title: 'Livestream & Live Shopping',
    icon: Radio,
    copy: 'Structured live sessions for launches, product demos, education, and real-time buyer engagement.',
    items: ['YouTube Live', 'Instagram Live', 'Launch streams', 'Live shopping', 'Product walkthroughs'],
    outcome: 'Best for brands that need live attention and guided selling.',
    cta: 'Plan a Live Campaign'
  },
  {
    label: 'Campaigns',
    title: 'Creator Campaigns',
    icon: Megaphone,
    copy: 'Managed campaigns that connect the right creators, message, format, and platform.',
    items: ['Creator-led launches', 'Social proof campaigns', 'Brand storytelling', 'Product awareness', 'Ambassador-style content'],
    outcome: 'Best for companies that need creator reach without creator-management chaos.',
    cta: 'Build Campaign'
  },
  {
    label: 'Operations',
    title: 'Campaign Management',
    icon: FileCheck2,
    copy: 'A complete operating layer for planning, approvals, usage rights, delivery, and reporting.',
    items: ['Creator shortlisting', 'Scripts and hooks', 'Approvals', 'Content usage rights', 'Reporting'],
    outcome: 'Best for teams that want clean execution from brief to delivery.',
    cta: 'Manage My Campaign'
  }
];

const process = [
  ['01', 'Brief', 'We understand the product, audience, offer, budget, timeline, and business goal.'],
  ['02', 'Plan', 'We shape the campaign angle, content formats, creator needs, usage rights, and delivery structure.'],
  ['03', 'Match', 'Creators are shortlisted around role, platform, category, availability, boundaries, and fit.'],
  ['04', 'Produce', 'Content, livestreams, product demos, scripts, edits, or campaign assets move through a managed flow.'],
  ['05', 'Report', 'The campaign closes with deliverables, status, usage clarity, and next-step recommendations.']
];

const creatorPromise = [
  ['Apply free', 'No joining fee to submit your profile.'],
  ['No training debt', 'No hidden recovery trap for selected creators.'],
  ['Multiple roles', 'Apply as on-camera talent or behind-the-scenes support.'],
  ['Written scope', 'Paid work begins only after the scope is clear.'],
  ['Usage clarity', 'Commercial content rights are stated before use.'],
  ['Choice first', 'Creators can accept or decline opportunities.'],
  ['No unsafe work', 'No adult, obscene, exploitative, or coercive work.'],
  ['Professional handling', 'Campaigns are reviewed, documented, and managed.']
];

const safety = [
  ['Written scope', 'Work starts with clear deliverables.'],
  ['Usage rights', 'Content use is agreed in writing.'],
  ['Creator consent', 'Creators review and accept terms.'],
  ['Payout terms', 'Payment clarity comes before paid work.'],
  ['Conduct rules', 'Professional behaviour is required.'],
  ['No false guarantees', 'No fake sales or income promises.']
];

const packages = [
  {
    name: 'UGC Starter Pack',
    price: '₹25,000–₹45,000',
    icon: Clapperboard,
    bestFor: 'Brands testing creator-led product content.',
    includes: ['1 creator', '3–5 UGC videos', 'Hooks and scripts', 'Organic usage terms'],
    cta: 'Start UGC Pack'
  },
  {
    name: 'Creator Launch Campaign',
    price: '₹60,000–₹1.2L',
    icon: Megaphone,
    bestFor: 'Product launches and social proof campaigns.',
    includes: ['2–4 creators', '8–12 content assets', 'Campaign concept', 'Usage clarity'],
    cta: 'Plan Launch'
  },
  {
    name: 'Livestream Sales Sprint',
    price: '₹75,000–₹1.8L',
    icon: Video,
    bestFor: 'Live demos, launches, and real-time buyer engagement.',
    includes: ['Live host', 'Runbook', 'Product demo flow', 'Post-live notes'],
    cta: 'Book Live Sprint'
  },
  {
    name: 'Monthly Creator Marketing Engine',
    price: '₹1.5L–₹4L/month',
    icon: CalendarDays,
    bestFor: 'Brands that need recurring content and campaign execution.',
    includes: ['Content calendar', 'Creator coordination', 'Scripts and hooks', 'Reporting'],
    cta: 'Build Monthly Engine'
  }
];

const SectionIntro = ({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) => (
  <div className="mx-auto max-w-4xl text-center">
    <p className="text-sm font-semibold text-primary">{eyebrow}</p>
    <h2 className="mt-4 font-display text-3xl leading-tight text-espresso sm:text-4xl lg:text-[3rem]">{title}</h2>
    <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-cocoa sm:text-lg sm:leading-8">{copy}</p>
  </div>
);

export const AgencyHomeSections = () => (
  <>
    <SectionWrapper className="bg-softwhite">
      <SectionIntro
        eyebrow="Built for both sides"
        title="Built for the two sides of creator growth."
        copy="Whether you need creators for your brand or opportunities for your skills, the path should be clear from the first click."
      />
      <div className="mt-12 grid gap-7 lg:grid-cols-2 lg:gap-8">
        {audienceFit.map((audience) => {
          const Icon = audience.icon;
          return (
            <Card key={audience.title} className="flex min-h-[450px] flex-col p-8 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-7 font-display text-3xl leading-tight text-espresso">{audience.title}</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-cocoa">{audience.copy}</p>
              <ul className="mt-7 grid gap-3 text-sm leading-6 text-cocoa sm:grid-cols-2">
                {audience.items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}
              </ul>
              <p className="mt-auto border-t border-[#ECE8EC] pt-5 text-sm font-semibold leading-6 text-espresso">{audience.outcome}</p>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <SectionIntro
        eyebrow="Two fronts. One managed studio."
        title="A growth channel for brands. A clearer path for talent."
        copy="Companies come for managed creator marketing. Creators come for professional, brand-safe opportunities with clear terms."
      />
      <div className="mt-12 grid gap-7 lg:grid-cols-2 lg:gap-8">
        <Card className="flex min-h-[430px] flex-col border-primary/20 p-8 sm:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><Building2 className="h-6 w-6" aria-hidden /></span>
          <p className="mt-7 text-sm font-semibold text-primary">For Companies</p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-espresso">Turn creators into a managed growth channel.</h3>
          <p className="mt-5 text-base leading-7 text-cocoa">We handle campaign strategy, creator selection, scripts, content formats, livestream structure, usage rights, approvals, and delivery, so your brand gets a real campaign instead of endless coordination.</p>
          <ul className="mt-7 grid gap-3 text-sm leading-6 text-cocoa sm:grid-cols-2">{['Clear campaign brief', 'Creator matching', 'Content and live formats', 'Usage rights clarity', 'Delivery and reporting'].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul>
          <Button href="/companies/start" className="mt-auto self-start" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Build My Campaign</Button>
        </Card>
        <Card className="flex min-h-[430px] flex-col border-primary/20 p-8 sm:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><UsersRound className="h-6 w-6" aria-hidden /></span>
          <p className="mt-7 text-sm font-semibold text-primary">For Creators</p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-espresso">Apply for professional creator opportunities.</h3>
          <p className="mt-5 text-base leading-7 text-cocoa">Join as a UGC creator, model, livestream host, presenter, editor, writer, photographer, designer, or campaign support. If selected, paid opportunities are shared with scope, payout, usage rights, and choice before work begins.</p>
          <ul className="mt-7 grid gap-3 text-sm leading-6 text-cocoa sm:grid-cols-2">{['Apply free', 'Multiple creator roles', 'No joining fee', 'Written terms', 'Accept or decline'].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul>
          <Button href="/apply" className="mt-auto self-start" variant="secondary">Apply as Creator</Button>
        </Card>
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-softwhite">
      <SectionIntro
        eyebrow="Services"
        title="Marketing built around creators, content, and live attention."
        copy="One studio for strategy, talent, content production, livestreams, and campaign delivery."
      />
      <div className="mx-auto mt-12 grid max-w-[1080px] gap-8 lg:grid-cols-2">
        {servicePillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Card key={pillar.title} className="flex min-h-[520px] flex-col p-8 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><Icon className="h-6 w-6" aria-hidden /></span>
              <p className="mt-7 text-sm font-semibold text-primary">{pillar.label}</p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-espresso">{pillar.title}</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-cocoa">{pillar.copy}</p>
              <ul className="mt-7 grid gap-3 text-sm leading-6 text-cocoa sm:grid-cols-2">
                {pillar.items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}
              </ul>
              <p className="mt-auto border-t border-[#ECE8EC] pt-5 text-sm font-semibold leading-6 text-espresso">{pillar.outcome}</p>
              <Button href="/companies/start" variant="ghost" className="mt-5 self-start">{pillar.cta}</Button>
            </Card>
          );
        })}
      </div>
      <div className="mt-10 text-center"><Button href="/services" variant="secondary">Explore Services</Button></div>
    </SectionWrapper>

    <SectionWrapper className="bg-champagne">
      <SectionIntro
        eyebrow="Process"
        title="A cleaner way to run creator campaigns."
        copy="No scattered DMs, unclear deliverables, missing usage rights, or last-minute confusion. The process stays structured from brief to delivery."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-5 md:gap-0">
        {process.map(([number, title, description], index) => (
          <article key={number} className="rounded-[28px] border border-primary/15 bg-white p-7 shadow-card md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:bg-transparent md:px-5 md:py-6 md:shadow-none md:first:pl-0 md:last:pr-0">
            <span className="font-display text-3xl text-primary">{number}</span>
            <h3 className="mt-5 text-lg font-semibold text-espresso">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-cocoa">{description}</p>
            {index < process.length - 1 && <span className="mt-7 hidden h-px w-full bg-primary/20 md:block" aria-hidden />}
          </article>
        ))}
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <SectionIntro
        eyebrow="Creator network"
        title="A creator network built on clarity, not pressure."
        copy="Creators should know what the work is, how content may be used, what they may be paid, and whether they want to accept before anything begins."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {creatorPromise.map(([title, copy]) => <div key={title} className="min-h-[150px] rounded-[28px] border border-[#ECE8EC] bg-porcelain p-6"><CheckCircle2 className="h-5 w-5 text-primary" aria-hidden /><h3 className="mt-5 text-base font-semibold text-espresso">{title}</h3><p className="mt-2 text-sm leading-6 text-cocoa">{copy}</p></div>)}
      </div>
      <div className="mt-10 text-center"><Button href="/creators" variant="secondary">Explore Creator Network</Button></div>
    </SectionWrapper>

    <SectionWrapper className="bg-softwhite">
      <div className="rounded-[48px] border border-primary/15 bg-porcelain px-7 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
        <SectionIntro
          eyebrow="Safety and clarity"
          title="Safe for creators. Clear for companies."
          copy="Every campaign must have written scope, creator consent, usage rights, payout terms, and professional conduct. No adult, obscene, illegal, exploitative, coercive, or unsafe content is supported."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {safety.map(([title, copy]) => <div key={title} className="min-h-[142px] rounded-[24px] border border-[#ECE8EC] bg-white p-6"><ShieldCheck className="h-5 w-5 text-primary" aria-hidden /><h3 className="mt-4 text-sm font-semibold text-espresso">{title}</h3><p className="mt-2 text-sm leading-6 text-cocoa">{copy}</p></div>)}
        </div>
        <div className="mt-10 text-center"><Button href="/safety" variant="secondary">Read Safety Policy</Button></div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <SectionIntro
        eyebrow="Pricing"
        title="Start with a campaign package."
        copy="Choose a contained creator-led format first, then expand only when the brief, rights, and campaign fit are clear."
      />
      <div className="mx-auto mt-12 grid max-w-[1080px] gap-8 lg:grid-cols-2">
        {packages.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.name} className="flex min-h-[460px] flex-col p-8 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><Icon className="h-6 w-6" aria-hidden /></span>
              <h3 className="mt-7 font-display text-3xl leading-tight text-espresso">{item.name}</h3>
              <p className="mt-4 text-lg font-semibold text-primary">{item.price}</p>
              <p className="mt-5 text-sm leading-6 text-cocoa"><span className="font-semibold text-espresso">Best for:</span> {item.bestFor}</p>
              <ul className="mt-6 grid gap-3 text-sm leading-6 text-cocoa sm:grid-cols-2">
                {item.includes.map((feature) => <li key={feature} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{feature}</li>)}
              </ul>
              <Button href="/companies/start" variant="ghost" className="mt-auto self-start">{item.cta}</Button>
            </Card>
          );
        })}
      </div>
      <div className="mt-10 text-center"><Button href="/pricing" variant="secondary">View Pricing</Button></div>
    </SectionWrapper>

    <SectionWrapper className="bg-softwhite">
      <div className="mx-auto max-w-5xl rounded-[52px] border border-primary/15 bg-porcelain px-7 py-14 text-center shadow-card sm:px-12 lg:px-16 lg:py-16">
        <p className="text-sm font-semibold text-primary">Start here</p>
        <h2 className="mt-4 font-display text-3xl leading-tight text-espresso sm:text-4xl">Start with the right path.</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-cocoa">Companies can build a campaign brief for content, trust, livestreams, and sales. Creators can apply across on-camera and behind-the-scenes roles with clear terms and no pressure.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3"><Button href="/companies/start" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Build My Campaign</Button><Button href="/apply" variant="secondary">Apply as Creator</Button></div>
      </div>
    </SectionWrapper>
  </>
);
