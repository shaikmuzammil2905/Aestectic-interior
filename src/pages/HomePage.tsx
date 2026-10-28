import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { TrustStrip } from '../components/TrustStrip';
import { ServicesGrid } from '../components/ServicesGrid';
import { TransformationsSection } from '../components/TransformationsSection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';

interface HomePageProps {
  onOpenConsultation?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="w-full">
      {/* Animated Hero Experience */}
      <HeroSection onOpenConsultation={onOpenConsultation} />

      {/* Trust Strip */}
      <TrustStrip />

      {/* Services Grid with Direct Links */}
      <ServicesGrid />

      {/* Before & After Interactive Slider + Featured Projects */}
      <TransformationsSection />

      {/* Why Choose Us Banner */}
      <WhyChooseUsSection />

      {/* Client Testimonials and Free Consultation Banner */}
      <TestimonialsSection onOpenConsultation={onOpenConsultation} />
    </div>
  );
};

