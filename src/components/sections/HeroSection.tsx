'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

const bullets = [
  {
    icon: ShieldCheck,
    text: 'Safe, respectful and structured work environment'
  },
  {
    icon: Clock,
    text: 'Flexible timings with supportive guidance'
  },
  {
    icon: Sparkles,
    text: 'Transparent payouts with clearly defined tiers'
  }
];

export const HeroSection = () => (
  <SectionWrapper id="hero" className="pt-28">
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Delhi NCR</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Hiring Female Live Stream Hosts – Delhi NCR
          </h1>
          <p className="text-lg text-slate-600">
            A calm, professional studio where you can host live sessions, interact with audiences, and earn fairly for your
            time.
          </p>
        </div>
        <ul className="space-y-4 text-left">
          {bullets.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm text-slate-600">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-1 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href="/apply">Apply Now</Button>
          <Button
            href="#why-host"
            variant="secondary"
            onClick={(event) => {
              event.preventDefault();
              const anchor = document.querySelector('#why-host');
              if (anchor) {
                anchor.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Learn More
          </Button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-slate-100 p-8 shadow-lg"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/careers-hero.jpg"
            alt="Calm livestream studio in session"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
        <div className="relative space-y-6 text-left text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-primary shadow">
            Calm Studio Energy
          </div>
          <p className="text-2xl font-semibold md:text-3xl">
            Structured conversations. Mindful pacing. Supportive producers.
          </p>
          <p className="text-sm text-white/90">
            You show up as yourself; we take care of the rest—formats, tech, guidelines and payouts.
          </p>
        </div>
      </motion.div>
    </div>
  </SectionWrapper>
);
