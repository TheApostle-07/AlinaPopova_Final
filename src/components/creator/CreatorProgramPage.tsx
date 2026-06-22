import { ArrowRight, BadgeCheck, CheckCircle2, FileCheck2, ShieldCheck } from 'lucide-react';
import { CreatorRoleExplorer } from '@/components/creator/CreatorRoleExplorer';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const applicationSteps = [
  ['01', 'Choose your role', 'Select the creator or talent path that fits your skills.'],
  ['02', 'Share your details', 'Add your contact, city, links, experience, availability, and boundaries.'],
  ['03', 'Review and agree', 'Confirm the terms, safety policy, and consent before submitting.'],
  ['04', 'Shortlisting review', 'If there is a fit, the next step may be a discovery call or matching review.'],
  ['05', 'Written opportunity', 'Paid work, if available, comes with scope, payout, usage rights, and acceptance first.']
];

const selectedCreatorSupport = [
  'Discovery call if shortlisted',
  'Profile or portfolio guidance',
  'Camera or presentation practice',
  'Product demo guidance',
  'Livestream practice',
  'Role-based shortlisting',
  'Creator tier placement',
  'Paid opportunity matching if available'
];

const creatorSafeguards = [
  'No joining fee',
  'No hidden training debt',
  'No unpaid commercial work',
  'No adult or unsafe work',
  'Written payout before paid work',
  'Creator can accept or decline',
  'Content usage only with written terms',
  'No income guarantee'
];

export const CreatorProgramPage = () => (
  <>
    <PageHero
      eyebrow="Creator Network"
      title={<>Apply for creator work that <span className="hero-gradient-text">fits your skills.</span></>}
      description="Join a brand-safe talent network for UGC, modelling, livestreams, editing, writing, production, design, and campaign support - with clear terms before paid work begins."
      actions={<><Button href="#roles" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Choose Your Role</Button><Button href="/safety" variant="secondary">Read Safety Policy</Button><p className="basis-full pt-2 text-center text-sm font-semibold text-cocoa">Free to apply <span aria-hidden>·</span> No joining fee <span aria-hidden>·</span> No training debt <span aria-hidden>·</span> Written terms before paid work</p></>}
    />

    <SectionWrapper className="bg-porcelain/45">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Creator roles</p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Choose the role that fits you.</h2>
        <p className="mt-4 text-base leading-7 text-cocoa">Apply as one role or several. Each path opens a faster form with the details needed to review that kind of work.</p>
      </div>
      <div className="mt-10"><CreatorRoleExplorer /></div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">How it works</p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">A clear path from application to opportunity.</h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-[1180px] gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {applicationSteps.map(([number, title, copy]) => <Card key={number} className="min-h-[245px] rounded-[30px] p-7"><span className="font-mono text-sm text-primary">{number}</span><h3 className="mt-7 text-xl font-semibold leading-tight text-espresso">{title}</h3><p className="mt-4 text-sm leading-6 text-cocoa">{copy}</p></Card>)}
      </div>
    </SectionWrapper>

    <SectionWrapper className="bg-porcelain/45">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">What selected creators may receive</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Support that matches the role, not a generic promise.</h2>
          <p className="mt-4 text-base leading-7 text-cocoa">Support depends on role, fit, campaign needs, and availability. Applying is free and selection-based.</p>
          <p className="mt-6 inline-flex rounded-full border border-primary/15 bg-white px-4 py-3 text-sm font-semibold text-espresso">Training and opportunities are selection-based. Income is not guaranteed.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {selectedCreatorSupport.map((item) => <Card key={item} className="min-h-[145px] rounded-[28px] p-6"><BadgeCheck className="h-5 w-5 text-primary" aria-hidden /><p className="mt-5 text-base font-semibold leading-6 text-espresso">{item}</p></Card>)}
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <div className="panel-gradient rounded-[44px] border border-primary/15 p-7 shadow-soft sm:p-10 lg:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Money and safety</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">Free to apply. Clear before paid work.</h2>
          <p className="mt-4 text-base leading-7 text-cocoa">Creators do not pay a joining fee and do not carry training debt. When a suitable opportunity exists, its scope, payout, usage rights, and agency terms are shared before you decide.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {creatorSafeguards.map((item) => <div key={item} className="flex min-h-[94px] items-center gap-3 rounded-[24px] border border-primary/10 bg-white/90 p-5 text-sm font-semibold leading-6 text-espresso"><ShieldCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden />{item}</div>)}
        </div>
        <div className="mt-8 flex justify-center"><Button href="/safety" variant="secondary" iconRight={<FileCheck2 className="h-4 w-4" aria-hidden />}>Read Safety Policy</Button></div>
      </div>
    </SectionWrapper>

    <SectionWrapper className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Your next step</p>
      <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso">Ready to apply for the role that fits you?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cocoa">Start with one role. You can add more roles inside the application.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="#roles" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Choose Your Role</Button><Button href="/safety" variant="secondary">Read Safety Policy</Button></div>
      <p className="mt-5 flex justify-center gap-2 text-sm text-cocoa"><CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />Brand-safe work, clear consent, and written commercial terms.</p>
    </SectionWrapper>
  </>
);
