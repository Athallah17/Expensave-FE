import HeroSection from '@/components/organisms/landing/HeroSection';
import FeatureCards from '@/components/organisms/landing/FeaturesSection';
import BenefitsSection from '@/components/organisms/landing/BenefitsSection';
import CTASection from '@/components/organisms/landing/CTASection';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-white">
      <HeroSection />
      <FeatureCards />
      <BenefitsSection />
      <CTASection />
    </main>
  );
}