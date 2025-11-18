import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

const marqueeLogos = [
  {
    name: 'Nykaa Beauty Labs',
    vertical: 'Beauty & Rituals',
    since: 'Since 2021',
    logo: '/images/logos/logo-1.png',
    width: 150,
    height: 36,
    accentFrom: '#ff5e8e',
    accentTo: '#ffd1a6'
  },
  {
    name: 'Tata Cliq Luxury',
    vertical: 'Luxury Retail',
    since: 'Since 2020',
    logo: '/images/logos/logo-2.avif',
    width: 120,
    height: 40,
    accentFrom: '#0a0a0a',
    accentTo: '#2f2f2f'
  },
  {
    name: 'Urban Company',
    vertical: 'Wellness & Home',
    since: 'Since 2022',
    logo: '/images/logos/logo-3.webp',
    width: 150,
    height: 32,
    accentFrom: '#0d0d0d',
    accentTo: '#4a4a4a'
  },
  {
    name: 'Man Matters',
    vertical: 'Clinical Wellness',
    since: 'Since 2021',
    logo: '/images/logos/logo-4.png',
    width: 150,
    height: 36,
    accentFrom: '#2b5c8c',
    accentTo: '#6ca0d8'
  },
  {
    name: 'Lenskart Studio',
    vertical: 'Lifestyle & Accessories',
    since: 'Since 2019',
    logo: '/images/logos/logo-7.png',
    width: 150,
    height: 40,
    accentFrom: '#26a17b',
    accentTo: '#74d5e3'
  },
  {
    name: 'boAt Audio Club',
    vertical: 'Consumer Tech',
    since: 'Since 2020',
    logo: '/images/logos/logo-6.png',
    width: 140,
    height: 36,
    accentFrom: '#ff2d55',
    accentTo: '#4b4b4b'
  }
];

export const HomePartnersSection = () => (
  <SectionWrapper className="text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Partners & Vertical Fits</p>
    <h2 className="mt-4 text-3xl font-semibold text-foreground">Brands that trust considered, conversational live rooms.</h2>
    <p className="mt-4 text-base text-slate-600">
      We sit alongside marketing, growth, and CX teams to host sessions that feel like concierge interactions rather than flash
      sales.
    </p>
    <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
      {marqueeLogos.map((brand) => (
        <div
          key={brand.name}
          className="partner-card relative flex min-h-[220px] flex-col rounded-[34px] border border-slate-200 bg-white/95 px-8 py-7 text-center shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl"
          style={
            {
              '--accent-from': brand.accentFrom,
              '--accent-to': brand.accentTo
            } as React.CSSProperties
          }
        >
          <div className="flex items-center justify-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
            {brand.name}
          </div>
          <div className="mt-4 flex flex-1 items-center justify-center">
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              width={brand.width}
              height={brand.height}
              className="max-h-20 w-auto object-contain"
              unoptimized
            />
          </div>
          <div className="mt-4">
            <p className="brand-label mt-2 text-xs uppercase tracking-[0.4em] text-slate-400">{brand.vertical}</p>
          </div>
        </div>
      ))}
    </div>
  </SectionWrapper>
);
