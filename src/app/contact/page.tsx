import type { Metadata } from 'next';
import { Mail, MessageCircle } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact | Alina Popova Studio',
  description: 'Contact Alina Popova Studio about creator applications or brand-safe creator campaigns.'
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to the right team for your next step." description="Creators can apply free through the application. Brands can share a campaign brief and preferred contact method." />
      <SectionWrapper>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <Mail className="h-7 w-7 text-primary" aria-hidden />
            <h2 className="mt-6 text-xl font-semibold text-foreground">Email the studio</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">For brand briefs, legal questions, or application support.</p>
            <a href={`mailto:${siteConfig.contactEmail}`} className="mt-6 inline-flex min-h-11 items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90">Email Us</a>
          </Card>
          <Card>
            <MessageCircle className="h-7 w-7 text-coral" aria-hidden />
            <h2 className="mt-6 text-xl font-semibold text-foreground">WhatsApp contact</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">For a short, non-sensitive first message. Do not share IDs or private documents in chat.</p>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center rounded-md bg-coral px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-coral/90">Open WhatsApp</a>
          </Card>
        </div>
      </SectionWrapper>
    </>
  );
}
