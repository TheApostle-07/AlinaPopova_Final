'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowRight,
  AudioLines,
  CalendarDays,
  Camera,
  Clapperboard,
  Mic2,
  Palette,
  PenLine,
  Radio,
  Scissors,
  Sparkles,
  Workflow
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CREATOR_ROLE_CATALOG, CREATOR_ROLE_CATEGORIES, type CreatorRoleCategory } from '@/lib/creator-roles';

const icons = {
  ugc_creator: Clapperboard,
  model: Sparkles,
  live_host: Radio,
  presenter: Mic2,
  video_editor: Scissors,
  scriptwriter: PenLine,
  photographer: Camera,
  social_manager: CalendarDays,
  graphic_designer: Palette,
  voiceover: AudioLines,
  makeup_stylist: Sparkles,
  campaign_coordinator: Workflow
};

export const CreatorRoleExplorer = () => {
  const [category, setCategory] = useState<'all' | CreatorRoleCategory>('all');
  const roles = useMemo(
    () => category === 'all' ? CREATOR_ROLE_CATALOG : CREATOR_ROLE_CATALOG.filter((role) => role.category === category),
    [category]
  );

  return (
    <div id="roles" className="scroll-mt-28">
      <div className="flex flex-wrap justify-center gap-2" aria-label="Filter creator roles">
        {CREATOR_ROLE_CATEGORIES.map((filter) => {
          const active = filter.value === category;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setCategory(filter.value)}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-primary/15 ${active ? 'border-primary bg-primary text-white shadow-card' : 'border-primary/15 bg-white text-cocoa hover:border-primary/35 hover:bg-porcelain'}`}
              aria-pressed={active}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => {
          const Icon = icons[role.value as keyof typeof icons] ?? Sparkles;
          return (
            <Card key={role.value} className="group flex min-h-[370px] flex-col rounded-[36px] p-7 transition duration-200 hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-soft sm:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary transition group-hover:bg-champagne"><Icon className="h-6 w-6" aria-hidden /></span>
              <h3 className="mt-7 font-display text-2xl leading-tight text-espresso">{role.title}</h3>
              <p className="mt-3 text-sm leading-7 text-cocoa">{role.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${role.title} specialties`}>
                {role.tags.map((tag) => <li key={tag} className="rounded-full border border-primary/15 bg-porcelain px-3 py-1.5 text-xs font-semibold text-cocoa">{tag}</li>)}
              </ul>
              <Link href={`/apply?role=${role.value}`} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-7 text-sm font-semibold text-primary outline-none transition hover:text-merlot focus-visible:rounded-full focus-visible:ring-4 focus-visible:ring-primary/15">
                {role.applicationLabel}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
