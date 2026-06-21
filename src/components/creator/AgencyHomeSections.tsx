import { ArrowRight, CheckCircle2, Clapperboard, FileCheck2, ShieldCheck, UsersRound, Video } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const servicePillars = [
  { title: 'UGC & Social Content', icon: Clapperboard, items: ['UGC videos', 'Instagram Reels', 'YouTube Shorts', 'Product demos', 'Ad creatives'] },
  { title: 'Livestream & Live Shopping', icon: Video, items: ['YouTube Live', 'Instagram Live', 'Launch streams', 'Live shopping', 'Product demos'] },
  { title: 'Creator Campaigns', icon: UsersRound, items: ['Creator-led launches', 'Social proof campaigns', 'Brand storytelling', 'Community campaigns', 'Ambassador-style content'] },
  { title: 'Campaign Management', icon: FileCheck2, items: ['Creator shortlisting', 'Scripts and hooks', 'Approvals', 'Usage rights', 'Reporting'] }
];

const process = [
  ['01', 'Brief', 'Goals, product, audience, budget, and timing.'],
  ['02', 'Plan', 'Campaign angle, creator fit, deliverables, and usage rights.'],
  ['03', 'Match', 'Suitable creators review the opportunity before assignment.'],
  ['04', 'Produce', 'Content, livestreams, demos, or campaign assets are delivered.'],
  ['05', 'Report', 'Clear notes, learnings, and next-step recommendations.']
];

const creatorPromise = ['Apply free', 'No joining fee', 'No training debt', 'Training if selected', 'No adult or unsafe work', 'No unpaid commercial work', 'Written payout before paid work', 'Creator can accept or decline'];
const safety = ['Written scope', 'Usage rights', 'Creator consent', 'Clear payout terms', 'Professional conduct', 'No false guarantees'];
const packages = [
  ['UGC Starter Pack', '₹25,000–₹45,000', 'A focused first creator content test.'],
  ['Creator Launch Campaign', '₹60,000–₹1.2L', 'A coordinated product launch or social proof campaign.'],
  ['Livestream Sales Sprint', '₹75,000–₹1.8L', 'A live product launch, demo, or commerce session.'],
  ['Monthly Creator Marketing Engine', '₹1.5L–₹4L/month', 'A recurring creator content and campaign system.']
];

export const AgencyHomeSections = () => (
  <>
    <SectionWrapper className="bg-softwhite">
      <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold text-primary">Two fronts. One managed studio.</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Companies come for campaigns. Creators come for professional opportunity.</h2><p className="mt-4 text-base leading-7 text-cocoa">The studio connects managed creator marketing for companies with a clearer, brand-safe network for independent creators.</p></div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2"><Card className="flex min-h-[340px] flex-col p-8"><p className="text-sm font-semibold text-primary">I’m a Company</p><h3 className="mt-5 font-display text-3xl text-espresso">Creator-led marketing with a clear campaign path.</h3><p className="mt-4 text-base leading-7 text-cocoa">I want creator-led marketing, content, livestreams, UGC, ads, social growth, or a monetisation plan shaped around the right platform and talent mix.</p><Button href="/companies/start" className="mt-auto self-start" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Build My Campaign</Button></Card><Card className="flex min-h-[340px] flex-col border-primary/20 p-8"><p className="text-sm font-semibold text-primary">I’m a Creator</p><h3 className="mt-5 font-display text-3xl text-espresso">A professional path for talent on camera and behind the scenes.</h3><p className="mt-4 text-base leading-7 text-cocoa">I want to apply for brand-safe creator, content, campaign, editing, production, or presenting opportunities that fit my skills and boundaries.</p><Button href="/apply" className="mt-auto self-start" variant="secondary">Apply as Creator</Button></Card></div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold text-primary">Services</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Marketing built around creators, content, and live attention.</h2><p className="mt-4 text-base leading-7 text-cocoa">One studio for strategy, talent, content production, livestreams, and campaign delivery.</p></div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{servicePillars.map((pillar) => <Card key={pillar.title} className="min-h-[320px] p-7"><pillar.icon className="h-6 w-6 text-primary" aria-hidden /><h3 className="mt-6 font-display text-2xl text-espresso">{pillar.title}</h3><ul className="mt-5 space-y-3 text-sm leading-6 text-cocoa">{pillar.items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul></Card>)}</div>
      <div className="mt-8 text-center"><Button href="/services" variant="secondary">Explore Services</Button></div>
    </SectionWrapper>

    <SectionWrapper className="bg-champagne">
      <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold text-primary">Process</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">A cleaner way to run creator campaigns.</h2><p className="mt-4 text-base leading-7 text-cocoa">No scattered DMs, unclear deliverables, or usage confusion. We keep the campaign structured from brief to delivery.</p></div>
      <div className="mt-10 grid gap-4 md:grid-cols-5">{process.map(([number, title, description]) => <article key={number} className="relative border-t border-primary/20 pt-5 md:pt-6"><span className="font-display text-3xl text-primary">{number}</span><h3 className="mt-5 text-lg font-semibold text-espresso">{title}</h3><p className="mt-3 text-sm leading-6 text-cocoa">{description}</p></article>)}</div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="text-sm font-semibold text-primary">Creator network</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">A creator network built on clarity.</h2><p className="mt-4 text-base leading-7 text-cocoa">Creators should never have to guess whether an opportunity is safe, paid, or professional.</p><Button href="/creators" className="mt-7" variant="secondary">Explore Creator Network</Button></div><div className="grid gap-3 sm:grid-cols-2">{creatorPromise.map((item) => <div key={item} className="flex gap-3 rounded-[24px] border border-[#ECE8EC] bg-porcelain p-4 text-sm leading-6 text-cocoa"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{item}</div>)}</div></div>
    </SectionWrapper>

    <SectionWrapper className="bg-softwhite">
      <div className="rounded-[44px] border border-primary/15 bg-porcelain p-7 sm:p-10"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold text-primary">Safety and clarity</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Safe for creators. Clear for companies.</h2><p className="mt-4 text-base leading-7 text-cocoa">Every campaign is built around written scope, usage rights, creator consent, and professional conduct. We do not support adult, obscene, illegal, exploitative, coercive, or unsafe content.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{safety.map((item) => <div key={item} className="flex gap-3 rounded-[24px] border border-[#ECE8EC] bg-white p-4 text-sm font-semibold text-espresso"><ShieldCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden />{item}</div>)}</div><div className="mt-8 text-center"><Button href="/safety" variant="secondary">Read Safety Promise</Button></div></div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold text-primary">Pricing</p><h2 className="mt-4 font-display text-4xl text-espresso">Start with a campaign package.</h2></div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{packages.map(([name, price, description]) => <Card key={name} className="flex min-h-[240px] flex-col p-6"><h3 className="font-display text-2xl text-espresso">{name}</h3><p className="mt-4 text-lg font-semibold text-primary">{price}</p><p className="mt-4 text-sm leading-6 text-cocoa">{description}</p></Card>)}</div>
      <div className="mt-8 text-center"><Button href="/pricing" variant="secondary">View Pricing</Button></div>
    </SectionWrapper>

    <SectionWrapper className="bg-softwhite"><div className="mx-auto max-w-4xl rounded-[48px] border border-primary/15 bg-porcelain px-6 py-12 text-center shadow-card sm:px-10"><p className="text-sm font-semibold text-primary">Start here</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Start with the right path.</h2><p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cocoa">Companies can build a campaign brief. Creators can apply across on-camera and behind-the-scenes roles. Both begin with clear terms and no pressure.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="/companies/start" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Build My Campaign</Button><Button href="/apply" variant="secondary">Apply as Creator</Button></div></div></SectionWrapper>
  </>
);
