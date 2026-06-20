import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
}

export const LegalPage = ({ eyebrow, title, description, sections }: LegalPageProps) => (
  <>
    <PageHero eyebrow={eyebrow} title={title} description={description} />
    <SectionWrapper>
      <article className="mx-auto max-w-3xl space-y-10 text-sm leading-7 text-slate-700">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3">{paragraph}</p>)}
          </section>
        ))}
      </article>
    </SectionWrapper>
  </>
);
