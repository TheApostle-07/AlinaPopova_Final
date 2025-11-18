import Image from 'next/image';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';

const testimonials = [
  {
    quote:
      'They treat every livestream like a boardroom presentation—our founder felt held, the community stayed engaged, and compliance never felt heavy.',
    author: 'Priya Talwar',
    role: 'VP Brand, Aravalli Botanica',
    avatar: '/images/Priya.jpeg'
  },
  {
    quote:
      'Alina’s team scripted the entire luxury drop like a theatre piece. The result? A calm, sold-out waitlist and zero frantic moments on camera.',
    author: 'Judith Fernandes',
    role: 'Director CRM, Vara Atelier',
    avatar: '/images/Judith.jpeg'
  },
  {
    quote:
      'Post-stream reports were gold—audience cues, tonal notes, and retention graphs we actually use for our next playbook.',
    author: 'Aliyah Mehta',
    role: 'Head of Growth, Kinetic Clinics',
    avatar: '/images/aliyah.jpeg'
  }
];

export const HomeTestimonialsSection = () => (
  <SectionWrapper className="text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Partner Voices</p>
    <h2 className="mt-4 text-3xl font-semibold text-foreground">Trusted by premium brands across wellness, luxury, and education.</h2>
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.author} className="h-full text-left">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-slate-100">
              <Image
                src={testimonial.avatar}
                alt={testimonial.author}
                width={64}
                height={64}
                className="h-full w-full rounded-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{testimonial.role}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-700">“{testimonial.quote}”</p>
        </Card>
      ))}
    </div>
  </SectionWrapper>
);
