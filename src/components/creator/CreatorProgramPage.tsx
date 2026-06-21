import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CreatorLaunchSections } from '@/components/creator/CreatorLaunchSections';
import { PageHero } from '@/components/creator/PageHero';

export const CreatorProgramPage = () => (
  <>
    <PageHero
      eyebrow="For creators"
      title="Join a professional creator network without a joining fee."
      description="Apply free to become part of Alina Popova&apos;s creator network for UGC, Instagram, YouTube, livestreams, product demos, and paid brand-safe opportunities if selected."
      actions={<Button href="/apply" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Apply Free</Button>}
    />
    <CreatorLaunchSections creatorFocused />
  </>
);
