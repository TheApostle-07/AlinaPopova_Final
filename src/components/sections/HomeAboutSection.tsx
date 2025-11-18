import { Compass, PenSquare, SignalHigh } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

const focusAreas = [
  {
    title: 'Format Architecture',
    copy: 'Conversation ladders, curiosity beats, and camera cues are written in-house for every partner brief.',
    icon: Compass
  },
  {
    title: 'Host Development',
    copy: 'Talent receives measured rehearsal scripts, tonal notes, and safety non-negotiables before stepping on set.',
    icon: PenSquare
  },
  {
    title: 'Signal Intelligence',
    copy: 'Post-stream recaps capture watch-time, drop-off signals, and audience sentiment to refine the next session.',
    icon: SignalHigh
  }
];

export const HomeAboutSection = () => (
  <SectionWrapper>
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Studio Ethos</p>
      <h2 className="mt-4 text-3xl font-semibold text-foreground">We are a calm livestream lab for detail-first brands.</h2>
      <p className="mt-4 text-base text-slate-600">
        Each engagement is architected in Delhi NCR with a small team of producers, culture writers, and signal analysts. We
        design formats that feel like boutique talk sessions, backed by measurable runbooks.
      </p>
    </div>
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {focusAreas.map((item) => (
        <div key={item.title} className="rounded-3xl border border-slate-200 bg-white/70 p-6 text-left shadow-sm">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <item.icon className="h-4 w-4" aria-hidden />
            {item.title}
          </div>
          <p className="mt-3 text-sm text-slate-600">{item.copy}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);
