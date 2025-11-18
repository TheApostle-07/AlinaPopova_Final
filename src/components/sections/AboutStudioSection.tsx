import { SectionWrapper } from '@/components/layout/SectionWrapper';

export const AboutStudioSection = () => (
  <SectionWrapper>
    <div className="mx-auto max-w-3xl space-y-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">About Alina Popova Studio</p>
      <p className="text-xl text-slate-600">
        Alina Popova Studio is a Delhi NCR–based livestream content studio. We design and host structured, conversation-led
        live sessions across different platforms. Our focus is on creating a space where hosts feel comfortable, respected,
        and supported while building on-camera confidence and earning consistently.
      </p>
      <p className="text-base text-slate-500">
        We operate with clear boundaries, written guidelines, and a professional approach to every session.
      </p>
    </div>
  </SectionWrapper>
);
