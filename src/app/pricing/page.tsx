import type { Metadata } from 'next';
import { Check, CircleDollarSign } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Pricing | Alina Popova Studio',
  description: 'Transparent pricing for creator-led UGC, campaigns, livestream sales, and managed monthly marketing programs.'
};

const packages = [
  { name: 'UGC Starter Pack', price: '₹25,000–₹45,000', bestFor: 'Small brands testing creator content.', description: 'For a product, offer, or focused creative test.', features: ['1 creator and 3–5 UGC videos', 'Hook and script prompts', 'Basic editing coordination', 'Organic usage terms and campaign notes'], cta: 'Start UGC Pack' },
  { name: 'Creator Launch Campaign', price: '₹60,000–₹1.2L', bestFor: 'Product launches and social proof campaigns.', description: 'For a coordinated product launch or creator-led social campaign.', features: ['2–4 creators and 8–12 short-form videos', 'Product demo angles and hook bank', 'Campaign calendar and usage clarity', 'Basic performance notes'], cta: 'Plan Launch Campaign' },
  { name: 'Livestream Sales Sprint', price: '₹75,000–₹1.8L', bestFor: 'Live selling, product demos, and launch sessions.', description: 'For a focused live product launch, demo, or commerce session.', features: ['Trained live host and runbook', 'Product demo flow and CTA moments', 'Live session coordination', 'Post-live clip recommendations and report'], cta: 'Book Live Sprint' },
  { name: 'Monthly Creator Marketing Engine', price: '₹1.5L–₹4L/month', bestFor: 'Recurring content, creators, lives, and campaign management.', description: 'For brands that need a recurring creator content and live marketing system.', features: ['Monthly content calendar, UGC, Reels, and Shorts', 'Creator coordination and scripts', 'Livestream support and reporting', 'Campaign management and editing'], cta: 'Build Monthly Engine' }
];

const creatorIncluded = [
  'Creator application',
  'Discovery call if shortlisted',
  'Instagram profile guidance',
  'YouTube Live confidence training',
  'Livestream hosting practice',
  'Brand presentation training',
  'Mock livestream practice',
  'Creator tier placement',
  'Paid opportunity shortlisting'
];

const pricingFactors = [
  ['Number of creators', 'The size and specialist mix of the creator roster.'],
  ['Content formats', 'UGC, short-form video, product demos, lives, or campaign assets.'],
  ['Usage rights', 'Organic posting, paid ads, whitelisting, duration, and exclusivity.'],
  ['Livestream complexity', 'Host requirements, runbooks, moderation, and production support.'],
  ['Editing and revisions', 'Approval rounds, production effort, and post-production needs.'],
  ['Timeline urgency', 'Lead time, creator availability, and compressed delivery windows.']
];

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Packages for creator-led content, livestreams, and campaign execution." description="Choose a clear starting package or build a recurring creator marketing engine with UGC, short-form content, livestreams, and campaign management." />
      <SectionWrapper>
        <div className="flex items-end justify-between gap-6">
          <div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">For companies</p><h2 className="mt-3 font-display text-4xl text-espresso">Marketing packages for a clear first engagement.</h2></div>
          <Button href="/companies/start" className="hidden sm:inline-flex">Share a Campaign Brief</Button>
        </div>
        <div className="mt-10 grid auto-rows-fr items-stretch gap-8 lg:grid-cols-2">
          {packages.map((item, index) => (
            <Card key={item.name} className={`flex min-h-[500px] h-full flex-col p-8 sm:p-10 ${index === 1 ? 'border-neon shadow-soft' : ''}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-primary">{index === 1 ? 'Popular for launches' : 'Best for a focused start'}</p>
              <h3 className="mt-4 min-h-[72px] font-display text-3xl leading-tight text-espresso">{item.name}</h3>
              <p className="mt-3 text-2xl font-semibold text-primary">{item.price}</p>
              <p className="mt-4 min-h-[48px] text-sm font-semibold leading-6 text-espresso">Best for: {item.bestFor}</p>
              <p className="mt-4 text-sm leading-6 text-cocoa">{item.description}</p>
              <ul className="mt-7 grid gap-x-6 gap-y-3 text-sm leading-6 text-cocoa sm:grid-cols-2">
                {item.features.map((feature) => <li key={feature} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-primary" aria-hidden /><span>{feature}</span></li>)}
              </ul>
              <div className="mt-auto pt-8">
                <Button href="/companies/start" variant={index === 1 ? 'primary' : 'secondary'} className="self-start">{item.cta}</Button>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper className="bg-porcelain/45">
        <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Campaign scope</p><h2 className="mt-3 font-display text-4xl leading-tight text-espresso">What affects pricing.</h2><p className="mt-4 text-base leading-7 text-cocoa">Every campaign is scoped around the work, rights, timing, and talent needed to deliver it professionally.</p></div>
        <div className="mx-auto mt-10 grid max-w-[1080px] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricingFactors.map(([title, copy]) => <Card key={title} className="min-h-[220px] p-7 sm:p-8"><p className="text-sm font-semibold text-primary">{title}</p><p className="mt-4 text-sm leading-7 text-cocoa">{copy}</p></Card>)}
        </div>
      </SectionWrapper>
      <SectionWrapper className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <CircleDollarSign className="h-8 w-8 text-primary" aria-hidden />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary">Creator transparency</p>
            <h2 className="mt-3 font-display text-4xl text-espresso">For creators, applying is free.</h2>
            <p className="mt-4 text-base leading-7 text-cocoa">Creators do not pay a joining fee. Selected creators do not carry training debt. Alina Popova earns through company service fees or agreed marketing and management fees from agency-supported revenue. Any creator-side fee, commission, or deduction is shared clearly before a paid opportunity is accepted.</p>
            <p className="mt-5 text-sm leading-6 text-cocoa">Prices, creator payouts, deliverables, and timelines depend on campaign scope, usage rights, creator tier, company requirements, and written agreement. Income is not guaranteed for creators. Sales are not guaranteed for companies.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-primary/15 bg-white shadow-card">
            <table className="w-full min-w-[440px] text-left text-sm">
              <thead className="bg-porcelain text-espresso"><tr><th className="p-4 font-semibold">What selected creators may receive</th><th className="p-4 font-semibold">Upfront cost</th></tr></thead>
              <tbody>{creatorIncluded.map((item) => <tr key={item} className="border-t border-primary/10"><td className="p-4 text-cocoa">{item}</td><td className="p-4 font-semibold text-primary">₹0</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <div className="cta-surface mx-auto max-w-4xl rounded-[48px] border border-primary/15 p-8 text-center shadow-card sm:p-12"><p className="text-sm font-semibold text-primary">Usage rights and creator payout clarity</p><h2 className="mt-4 font-display text-3xl leading-tight text-espresso sm:text-4xl">Need help choosing a package?</h2><p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-cocoa">Paid ad usage, whitelisting, long-term usage, exclusivity, creator tier, and production complexity can change pricing and creator payout terms. These are confirmed before campaign work begins.</p><div className="cta-row mt-8"><Button href="/companies/start">Share a Campaign Brief</Button><Button href="/contact" variant="secondary">Contact Studio</Button></div></div>
      </SectionWrapper>
    </>
  );
}
