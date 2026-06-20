import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CreatorLaunchSections } from '@/components/creator/CreatorLaunchSections';
import { PageHero } from '@/components/creator/PageHero';

export const CreatorProgramPage = () => (
  <>
    <PageHero
      eyebrow="For creators"
      title="Become brand-ready without a joining fee."
      description="The Alina Popova Creator Launch Program is for women who want a safer, more structured path into Instagram, YouTube Live, livestream hosting, product demos, modelling, and creator campaigns."
      actions={<Button href="/apply" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Apply Free</Button>}
    />
    <CreatorLaunchSections />
  </>
);
