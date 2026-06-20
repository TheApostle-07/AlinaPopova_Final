import { ArrowRight, CalendarRange, CircleCheck, Clapperboard, UsersRound } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BrandOperationsPreview } from '@/components/creator/BrandOperationsPreview';

const services = [
  { title: 'Creator-led livestreams', description: 'Structured product, community, and launch lives with a suitable presenter.', icon: Clapperboard },
  { title: 'Creator campaigns', description: 'Shortlisting for Instagram content, appearances, demos, and campaign concepts.', icon: UsersRound },
  { title: 'Live program support', description: 'Format, talent rotation, simple scripts, run-of-show, and post-session notes.', icon: CalendarRange }
];

export const BrandPage = () => (
  <>
    <PageHero eyebrow="For brands" title="Book trained creators for brand-safe livestreams and campaigns." description="Alina Popova Studio supports India-wide creator-led livestreams, Instagram campaigns, product demos, YouTube Live hosting, and community sessions." actions={<Button href="/contact" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Book Brand Call</Button>} />
    <SectionWrapper><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Designed for operational clarity</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Structured enough for your brand team. Respectful enough for your creator roster.</h2><p className="mt-4 text-base leading-7 text-cocoa">Every engagement begins with a brief, a clear creator fit, usage rights, and practical run-of-show support. We keep the campaign understandable for everyone involved.</p></div><BrandOperationsPreview /></div></SectionWrapper>
    <SectionWrapper className="bg-white"><div className="grid gap-4 md:grid-cols-3">{services.map((service) => <Card key={service.title}><service.icon className="h-7 w-7 text-primary" aria-hidden /><h2 className="mt-6 font-display text-2xl text-espresso">{service.title}</h2><p className="mt-3 text-sm leading-6 text-cocoa">{service.description}</p></Card>)}</div></SectionWrapper>
    <SectionWrapper className="bg-ink text-ivory"><div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-gold">A clear commercial process</p><h2 className="mt-4 font-display text-4xl">Brief first. Match thoughtfully. Confirm every right in writing.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-champagne/80">We scope creator fit, deliverables, usage rights, safety boundaries, and payout terms before commercial work starts. Creator availability and campaign suitability are assessed case by case.</p></div><ul className="space-y-4 text-sm text-champagne">{['Creator and format shortlist', 'Clear usage and payout terms', 'No adult, exploitative, or unsafe work', 'Post-session notes and next-step recommendations'].map((item) => <li key={item} className="flex gap-3 border-b border-white/10 pb-4"><CircleCheck className="h-5 w-5 shrink-0 text-gold" aria-hidden />{item}</li>)}</ul></div></SectionWrapper>
    <SectionWrapper className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Brand pilots</p><h2 className="mt-4 font-display text-4xl text-espresso">Start with a clear, contained live pilot.</h2><p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cocoa">A pilot can include a trained creator or host, a livestream or product demo, basic script direction, session structure, usage terms, and post-session notes.</p><Button href="/pricing" className="mt-7" variant="secondary">View Brand Pricing</Button></SectionWrapper>
  </>
);
