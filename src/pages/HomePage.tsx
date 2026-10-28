import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { TrustStrip } from '../components/TrustStrip';
import { ServicesGrid } from '../components/ServicesGrid';
import { TransformationsSection } from '../components/TransformationsSection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ScrollReveal } from '../components/ScrollReveal';

interface HomePageProps {
  onOpenConsultation?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="w-full overflow-hidden">
      {/* Animated Hero Experience */}
      <HeroSection onOpenConsultation={onOpenConsultation} />

      {/* Trust Strip with Smooth Scroll Entry */}
      <ScrollReveal direction="up" delay={100}>
        <TrustStrip />
      </ScrollReveal>

      {/* Services Grid with Direct Links & Scroll Animation */}
      <ScrollReveal direction="up" delay={150}>
        <ServicesGrid />
      </ScrollReveal>

      {/* Before & After Interactive Slider + Featured Projects */}
      <ScrollReveal direction="up" delay={150}>
        <TransformationsSection />
      </ScrollReveal>

      {/* Why Choose Us Dark Luxe Banner */}
      <ScrollReveal direction="up" delay={150}>
        <WhyChooseUsSection />
      </ScrollReveal>

      {/* Client Testimonials and Free Consultation Banner */}
      <ScrollReveal direction="up" delay={150}>
        <TestimonialsSection onOpenConsultation={onOpenConsultation} />
      </ScrollReveal>
    </div>
  );
};
