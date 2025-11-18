import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Accordion } from '@/components/ui/Accordion';

const faqItems = [
  {
    id: 'safe',
    question: 'Is this work safe?',
    answer:
      'Yes. All sessions follow studio guidelines and are monitored. There is no adult content or unsafe demands. Professional conduct is strictly maintained.'
  },
  {
    id: 'experience',
    question: 'Do I need prior experience as a host or model?',
    answer:
      'No. Tier 1 is designed for beginners. If you already have experience, you may be placed in Tier 2 or Tier 3 after the introductory interaction.'
  },
  {
    id: 'payments',
    question: 'How and when are payments made?',
    answer:
      'Earnings are tracked per session/day and cleared on a weekly payout cycle to your bank account or preferred digital method, as discussed during onboarding.'
  },
  {
    id: 'face',
    question: 'Do I have to show my face?',
    answer:
      'Most roles involve on-camera hosting with visible presence. Any specific format (like AI overlays or partial-face formats) will be clearly explained in advance. You can choose only what you’re comfortable with.'
  },
  {
    id: 'commitment',
    question: 'What is the minimum time commitment?',
    answer:
      'We usually work in defined shifts. Even part-time hosts can participate as long as they are consistent in the slots they choose.'
  },
  {
    id: 'exit',
    question: 'Can I leave if I’m not comfortable?',
    answer:
      'Yes. You can discontinue after clearing any scheduled commitments and pending payouts. Your comfort and consent matter.'
  }
];

export const FAQSection = () => (
  <SectionWrapper id="faqs">
    <div className="space-y-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Frequently Asked Questions</p>
      <div className="text-left">
        <Accordion items={faqItems} />
      </div>
    </div>
  </SectionWrapper>
);
