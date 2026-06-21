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

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Creator Marketing Packages for Companies That Need Content, Lives, and Campaigns" description="Choose a starting package or build a recurring creator marketing engine with UGC, Reels, Shorts, livestreams, and campaign management." />
      <SectionWrapper>
        <div className="flex items-end justify-between gap-6">
          <div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">For companies</p><h2 className="mt-3 font-display text-4xl text-espresso">Marketing packages for a clear first engagement.</h2></div>
          <Button href="/contact" className="hidden sm:inline-flex">Share a Campaign Brief</Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((item, index) => (
            <Card key={item.name} className={`flex h-full flex-col ${index === 1 ? 'border-neon shadow-soft' : ''}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-primary">{index === 1 ? 'Popular for launches' : 'Best for a focused start'}</p><h3 className="mt-4 font-display text-3xl text-espresso">{item.name}</h3>
              <p className="mt-3 text-2xl font-semibold text-primary">{item.price}</p><p className="mt-3 text-sm font-semibold leading-6 text-espresso">Best for: {item.bestFor}</p>
              <p className="mt-4 text-sm leading-6 text-cocoa">{item.description}</p>
              <ul className="mt-6 space-y-3 border-t border-primary/15 pt-6 text-sm text-cocoa">
                {item.features.map((feature) => <li key={feature} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />{feature}</li>)}
              </ul>
              <Button href="/contact" variant={index === 1 ? 'primary' : 'secondary'} className="mt-8 self-start">{item.cta}</Button>
            </Card>
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <CircleDollarSign className="h-8 w-8 text-primary" aria-hidden />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary">For creators</p>
            <h2 className="mt-3 font-display text-4xl text-espresso">For creators, applying is free.</h2>
            <p className="mt-4 text-base leading-7 text-cocoa">Creators do not pay a joining fee. Selected creators do not carry training debt. Alina Popova earns through company service fees or agreed marketing and management fees from agency-supported revenue. Any creator-side fee, commission, or deduction is shared clearly before a paid opportunity is accepted.</p>
            <p className="mt-5 text-sm leading-6 text-cocoa">Prices, creator payouts, deliverables, and timelines depend on campaign scope, usage rights, creator tier, company requirements, and written agreement. Income is not guaranteed for creators. Sales are not guaranteed for companies.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-primary/15 bg-white shadow-card">
            <table className="w-full min-w-[440px] text-left text-sm">
              <thead className="bg-porcelain text-espresso"><tr><th className="p-4 font-semibold">Included for selected creators</th><th className="p-4 font-semibold">Upfront cost</th></tr></thead>
              <tbody>{creatorIncluded.map((item) => <tr key={item} className="border-t border-primary/10"><td className="p-4 text-cocoa">{item}</td><td className="p-4 font-semibold text-primary">₹0</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
