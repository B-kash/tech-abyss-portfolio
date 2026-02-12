import PageTransition from '@/Components/shared/PageTransition';
import HeroSection from '@/Components/landing/HeroSection';
import FullStackSection from '@/Components/landing/CustomerSatisfaction';
import ServicesSection from '@/Components/landing/ConsultingService';
import ProjectsSection from '@/Components/landing/ProjectsSection';
import AboutCEO from '@/Components/landing/AboutCEO';
import MarketingSection from '@/Components/landing/PerformanceMarketing';
import IntroSection from '@/Components/landing/Introsection';
import SistersSection from '@/Components/landing/SistersSection';
import CallToAction from '@/Components/landing/CalltoAction';

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col">
        <HeroSection />
        <ServicesSection />
        <FullStackSection />
        <MarketingSection />
        <IntroSection />
        <SistersSection />
        <CallToAction />
      </div>
    </PageTransition>
  );
}
