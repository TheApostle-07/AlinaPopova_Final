'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Activity, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const features = [
  { icon: ShieldCheck, title: 'Zero-chaos safety', detail: 'Non-negotiable guardrails & on-ground producers.' },
  { icon: Activity, title: 'Signal-driven cues', detail: 'Runbooks built on retention + sentiment data.' },
  { icon: Users, title: 'Tone-matched hosts', detail: 'Talent profiled for language, EQ, and pace.' }
];

const marqueeBrands = [
  { name: 'Nykaa Beauty Labs', logo: '/images/logos/logo-1.png', width: 160, height: 36, accentFrom: '#ff5e8e', accentTo: '#ffd1a6' },
  { name: 'Tata Cliq Luxury', logo: '/images/logos/logo-2.avif', width: 120, height: 40, accentFrom: '#0a0a0a', accentTo: '#2f2f2f' },
  { name: 'Urban Company', logo: '/images/logos/logo-3.webp', width: 150, height: 32, accentFrom: '#0d0d0d', accentTo: '#4a4a4a' },
  { name: 'Man Matters', logo: '/images/logos/logo-4.png', width: 160, height: 36, accentFrom: '#2b5c8c', accentTo: '#6ca0d8' },
  { name: 'Lenskart Studio', logo: '/images/logos/logo-7.png', width: 160, height: 40, accentFrom: '#26a17b', accentTo: '#74d5e3' },
  { name: 'boAt Audio Club', logo: '/images/logos/logo-6.png', width: 140, height: 36, accentFrom: '#ff2d55', accentTo: '#4b4b4b' }
];

export const HomeHeroSection = () => (
  <section className="relative isolate overflow-hidden bg-white px-4 pb-24 pt-28 text-center sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
        Live Streaming Agency
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-balance text-4xl font-black uppercase tracking-[0.2em] text-foreground sm:text-5xl sm:tracking-[0.28em] lg:text-6xl lg:tracking-[0.32em]"
      >
        <span className="block">Boutique Livestream</span>
        <span className="block text-3xl tracking-[0.28em] text-slate-500 sm:text-4xl sm:tracking-[0.35em] lg:text-5xl lg:tracking-[0.4em]">
          Studios
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-base text-slate-600 sm:text-lg"
      >
        Crafted for brand, growth, and community leads who need consistent poise on camera—our hosts follow measurable
        runbooks, stay human, and protect audience comfort while sustaining curiosity.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      >
        <Button href="/careers" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Explore Careers</Button>
        <Button href="/apply" variant="secondary">
          Apply Directly
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto flex max-w-xl items-center justify-center gap-6 rounded-2xl border border-slate-100 bg-slate-50/60 px-6 py-4 text-left text-sm text-slate-600"
      >
        <span className="rounded-full bg-primary/10 p-2 text-primary">
          <Sparkles className="h-4 w-4" aria-hidden />
        </span>
        <p>
          Studio availability is intentionally limited. Share your intent and we’ll invite you into the next immersive format
          we’re prototyping.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-3"
      >
        {features.map((feature) => (
          <div key={feature.title} className="rounded-2xl border border-slate-100 bg-white/80 px-4 py-3 text-left">
            <div className="flex flex-col items-start gap-1">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <feature.icon className="h-4 w-4" aria-hidden />
                {feature.title}
              </span>
              <p className="text-xs text-slate-500">{feature.detail}</p>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="mx-auto grid max-w-5xl justify-items-center gap-4 sm:grid-cols-3"
      >
        {marqueeBrands.map((brand) => (
          <div
            key={brand.name}
            className="logo-pill relative flex h-28 w-full items-center justify-center rounded-3xl border border-slate-100 bg-white/95 px-6 py-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1"
            style={
              {
                '--accent-from': brand.accentFrom,
                '--accent-to': brand.accentTo
              } as CSSProperties
            }
          >
            <Image
              src={brand.logo}
              width={brand.width}
              height={brand.height}
              alt={`${brand.name} logo`}
              className="max-h-16 w-auto object-contain"
              unoptimized
            />
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);
