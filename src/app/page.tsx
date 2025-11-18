import { HomeHeroSection } from '@/components/sections/HomeHeroSection';
import { HomeAboutSection } from '@/components/sections/HomeAboutSection';
import { HomePartnersSection } from '@/components/sections/HomePartnersSection';
import { HomeArchitectureSection } from '@/components/sections/HomeArchitectureSection';
import { HomeTestimonialsSection } from '@/components/sections/HomeTestimonialsSection';
import { HomeCTASection } from '@/components/sections/HomeCTASection';

const HomePage = () => (
  <>
    <HomeHeroSection />
    <HomeAboutSection />
    <HomePartnersSection />
    <HomeArchitectureSection />
    <HomeTestimonialsSection />
    <HomeCTASection />
  </>
);

export default HomePage;
