import { ArrowRight, CalendarRange, CircleCheck, Clapperboard, UsersRound } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BrandOperationsPreview } from '@/components/creator/BrandOperationsPreview';

const services = [
  { title: 'Product demos', description: 'Structured product explainers with a suitable creator or host.', icon: Clapperboard },
  { title: 'Creator campaigns', description: 'Shortlisting for Instagram content, appearances, demos, and campaign concepts.', icon: UsersRound },
  { title: 'Live shopping', description: 'Clear product presentation, hosting flow, and audience handling for commerce lives.', icon: CalendarRange },
  { title: 'Beauty and wellness launches', description: 'Brand-safe creator presentation for care, beauty, wellness, and lifestyle categories.', icon: Clapperboard },
  { title: 'Community and founder sessions', description: 'Thoughtful creator or host matching for Q&A, launch, and education formats.', icon: UsersRound },
  { title: 'Live program support', description: 'Format, talent rotation, scripts, run-of-show, and post-session notes.', icon: CalendarRange }
];

export const BrandPage = () => (
  <>
    <PageHero eyebrow="For brands" title="Book trained creators for brand-safe livestreams and campaigns." description="Alina Popova Studio supports India-wide creator-led livestreams, Instagram campaigns, product demos, YouTube Live hosting, and community sessions." actions={<Button href="/companies/start" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Build My Campaign</Button>} />
    <SectionWrapper><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Designed for operational clarity</p><h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Structured enough for your brand team. Respectful enough for your creator roster.</h2><p className="mt-4 text-base leading-7 text-cocoa">Every engagement begins with a brief, a clear creator fit, usage rights, and practical run-of-show support. We keep the campaign understandable for everyone involved.</p></div><BrandOperationsPreview /></div></SectionWrapper>
    <SectionWrapper className="bg-white"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map((service) => <Card key={service.title}><service.icon className="h-7 w-7 text-primary" aria-hidden /><h2 className="mt-6 font-display text-2xl text-espresso">{service.title}</h2><p className="mt-3 text-sm leading-6 text-cocoa">{service.description}</p></Card>)}</div></SectionWrapper>
    <SectionWrapper className="bg-porcelain/65"><div className="grid gap-10 rounded-[40px] border border-primary/15 bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">A clear commercial process</p><h2 className="mt-4 font-display text-4xl text-espresso">Brief first. Match thoughtfully. Confirm every right in writing.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-cocoa">We scope creator fit, deliverables, usage rights, safety boundaries, and payout terms before commercial work starts. Creator availability and campaign suitability are assessed case by case.</p></div><ul className="space-y-3 text-sm text-cocoa">{['Creator and format shortlist', 'Clear usage and payout terms', 'No adult, exploitative, or unsafe work', 'Post-session notes and next-step recommendations'].map((item) => <li key={item} className="flex gap-3 rounded-xl border border-primary/10 bg-porcelain/60 p-4"><CircleCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul></div></SectionWrapper>
    <SectionWrapper className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Brand pilots</p><h2 className="mt-4 font-display text-4xl text-espresso">Start with a clear, contained live pilot.</h2><p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cocoa">A pilot can include a trained creator or host, a livestream or product demo, basic script direction, session structure, usage terms, and post-session notes.</p><Button href="/pricing" className="mt-7" variant="secondary">View Brand Pricing</Button></SectionWrapper>
  </>
);
