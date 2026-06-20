import type { Metadata } from 'next';
import { Check, CircleDollarSign } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Pricing | Alina Popova Studio',
  description: 'Transparent creator fee terms and launch pricing for brand-safe livestreams, product demos, and creator campaigns.'
};

const packages = [
  { name: 'Brand Pilot Stream', price: '₹25,000–₹45,000', description: 'A contained live or product-demo pilot with one trained creator or host.', features: ['One trained creator or host', 'One livestream or product demo', 'Basic script and session structure', 'Usage terms and post-session notes'] },
  { name: 'Creator Campaign Starter', price: '₹35,000–₹75,000', description: 'A focused creator campaign for brands validating an audience, category, or content angle.', features: ['2–3 creators shortlisted', '3–5 content pieces or live appearances', 'Script prompts and campaign direction', 'Basic reporting'] },
  { name: 'Monthly Creator Live Engine', price: '₹85,000–₹1.8L/month', description: 'An ongoing live program with campaign calendar, creator rotation, and structured optimization.', features: ['4–8 livestreams per month', 'Creator rotation and campaign calendar', 'Scripts and run-of-show support', 'Reporting and short-clip recommendations'] }
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
      <PageHero eyebrow="Pricing" title="Brand packages and creator fee transparency, kept separate." description="Creators do not pay to apply or train if selected. Brands receive a clear scope before booking a campaign or live program." />
      <SectionWrapper>
        <div className="flex items-end justify-between gap-6">
          <div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">For brands</p><h2 className="mt-3 font-display text-4xl text-espresso">Launch pricing for a clear first engagement.</h2></div>
          <Button href="/contact" className="hidden sm:inline-flex">Request a Brief Call</Button>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {packages.map((item) => (
            <Card key={item.name} className="flex h-full flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-primary">Best for a focused start</p><h3 className="mt-4 font-display text-3xl text-espresso">{item.name}</h3>
              <p className="mt-3 text-2xl font-semibold text-primary">{item.price}</p>
              <p className="mt-4 text-sm leading-6 text-cocoa">{item.description}</p>
              <ul className="mt-6 space-y-3 border-t border-primary/15 pt-6 text-sm text-cocoa">
                {item.features.map((feature) => <li key={feature} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />{feature}</li>)}
              </ul>
              <Button href="/contact" variant="ghost" className="mt-8 self-start">Start Inquiry</Button>
            </Card>
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <CircleDollarSign className="h-8 w-8 text-primary" aria-hidden />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary">For creators</p>
            <h2 className="mt-3 font-display text-4xl text-espresso">Your upfront cost is ₹0.</h2>
            <p className="mt-4 text-base leading-7 text-cocoa">No joining fee. No hidden deductions. No training debt. Agency fees only apply through transparent brand service fees or agreed marketing and management fees from agency-supported revenue.</p>
            <p className="mt-5 text-sm leading-6 text-cocoa">Training and mock practice may be unpaid and non-commercial. Paid commercial work is confirmed in writing before it begins.</p>
          </div>
          <div className="overflow-x-auto border border-primary/15">
            <table className="w-full min-w-[440px] text-left text-sm">
              <thead className="bg-ink text-ivory"><tr><th className="p-4 font-semibold">Included for selected creators</th><th className="p-4 font-semibold">Upfront cost</th></tr></thead>
              <tbody>{creatorIncluded.map((item) => <tr key={item} className="border-t border-primary/10"><td className="p-4 text-cocoa">{item}</td><td className="p-4 font-semibold text-primary">₹0</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
