import type { Metadata } from 'next';
import { Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { ContactInquiryForm } from '@/components/creator/ContactInquiryForm';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact | Alina Popova Studio',
  description: 'Contact Alina Popova Studio about creator marketing campaigns, creator applications, or studio safety.'
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Start with the right brief or application." description="Companies can share a creator marketing brief. Creators can apply free. Safety concerns are handled through a clear, documented route." />
      <SectionWrapper>
        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <Mail className="h-7 w-7 text-primary" aria-hidden />
            <h2 className="mt-6 text-xl font-semibold text-foreground">Email the studio</h2>
            <p className="mt-3 text-sm leading-6 text-cocoa">For campaign briefs, legal questions, or creator application support.</p>
            <a href={`mailto:${siteConfig.contactEmail}`} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-neon transition hover:bg-[#B8005D] hover:shadow-soft">Email Us</a>
          </Card>
          <Card>
            <MessageCircle className="h-7 w-7 text-coral" aria-hidden />
            <h2 className="mt-6 text-xl font-semibold text-foreground">WhatsApp contact</h2>
            <p className="mt-3 text-sm leading-6 text-cocoa">For a short, non-sensitive first message. Do not share IDs or private documents in chat.</p>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-coral px-6 py-2.5 text-sm font-semibold text-white shadow-neon transition hover:bg-[#B8005D] hover:shadow-soft">Open WhatsApp</a>
          </Card>
          <Card>
            <ShieldCheck className="h-7 w-7 text-primary" aria-hidden />
            <h2 className="mt-6 text-xl font-semibold text-foreground">Safety support</h2>
            <p className="mt-3 text-sm leading-6 text-cocoa">Use the form below to report a concern. We review safety issues before moving a related campaign forward.</p>
            <p className="mt-6 text-sm font-semibold text-primary">Response target: 2 business days</p>
          </Card>
        </div>
        <div className="mx-auto mt-10 max-w-4xl"><ContactInquiryForm /></div>
      </SectionWrapper>
    </>
  );
}
