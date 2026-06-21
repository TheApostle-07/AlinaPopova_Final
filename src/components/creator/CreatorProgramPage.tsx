import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CreatorLaunchSections } from '@/components/creator/CreatorLaunchSections';
import { PageHero } from '@/components/creator/PageHero';

export const CreatorProgramPage = () => (
  <>
    <PageHero
      eyebrow="For creators"
      title="Join a professional creator network without a joining fee."
      description="Apply free for UGC, campaign talent, livestream hosting, editing, writing, production, social support, and other brand-safe opportunities if selected."
      actions={<Button href="/apply" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Apply Free</Button>}
    />
    <CreatorLaunchSections creatorFocused />
  </>
);
