import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CreatorLaunchSections } from '@/components/creator/CreatorLaunchSections';
import { PageHero } from '@/components/creator/PageHero';

export const CreatorProgramPage = () => (
  <>
    <PageHero
      eyebrow="For creators"
      title="Join a brand-safe creator network without a joining fee."
      description="Apply to partner with Alina Popova Studio for creator-led campaigns, UGC, YouTube Live, livestream hosting, product demos, and social marketing opportunities when a suitable brief is available."
      actions={<Button href="/apply" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Apply Free</Button>}
    />
    <CreatorLaunchSections />
  </>
);
