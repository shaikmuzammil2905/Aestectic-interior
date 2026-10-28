import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Layers, 
  Compass,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      eyebrow: 'LUXURY MADE INTO REALITY',
      headingLine1: 'Thoughtfully Designed.',
      headingLine2: 'Beautifully Lived.',
      subtitle: 'We create bespoke interiors and premium modular spaces with in-house modular manufacturing, blending style, functionality and timeless elegance.',
      tags: 'Residential Interiors • Modular Kitchens • Custom Furniture'
    },
    {
      eyebrow: 'IN-HOUSE MODULAR FACTORY',
      headingLine1: 'Precision Engineered.',
      headingLine2: 'Direct From Factory.',
      subtitle: 'German-grade hardware, zero-defect edge banding, and high-density marine ply crafted to perfection in our Hyderabad manufacturing facility.',
      tags: 'Modular Wardrobes • Modular Kitchens • TV Units'
    },
    {
      eyebrow: '8+ YEARS OF EXCELLENCE',
      headingLine1: 'Seamless Execution.',
      headingLine2: 'Zero Stress Journey.',
      subtitle: 'From 3D photorealistic visualization to turnkey civil and carpentry coordination, we bring complete transparency to your home transformation.',
      tags: 'Turnkey Living • Luxury Villas • Commercial Studios'
    }
  ];

  const current = heroSlides[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] xl:min-h-[760px] overflow-hidden flex items-center bg-ivory">
      
      {/* ============================================================
          ANIMATED HERO BACKGROUNDS
          Desktop: image copy 2.png
          Mobile: image copy 3.png
         ============================================================ */}
      
      {/* Desktop Background (hidden on small screens, shown lg+) */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src="/assets/hero-desktop.png"
          alt="Luxury Aesthetic Living Room"
          className="w-full h-full object-cover object-right-center animate-kenburns scale-105 transition-all duration-1000 ease-out will-change-transform"
        />
        {/* Soft Left Gradient Overlay to keep text perfectly legible over marble shadows */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/80 to-transparent w-[58%]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/60 via-transparent to-ivory/30"></div>
      </div>

      {/* Mobile & Tablet Background (shown on small & tablet screens) */}
      <div className="lg:hidden absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src="/assets/hero-mobile.png"
          alt="Luxury Living Room Mobile"
          className="w-full h-full object-cover object-center animate-kenburns scale-105 transition-all duration-1000 ease-out will-change-transform"
        />
        {/* Top-to-bottom warm ivory gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/95 via-ivory/85 to-ivory/30 h-[70%]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/80 via-transparent to-transparent h-full"></div>
      </div>

      {/* Subtle Shimmer & Light Bloom Effects */}
      <div className="absolute top-10 left-1/3 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-sand/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Text & Call to Actions */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Eyebrow with gold fine rules */}
            <div className="inline-flex items-center space-x-3 animate-fade-in">
              <span className="w-8 sm:w-12 h-px bg-gold"></span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase font-sans">
                {current.eyebrow}
              </span>
              <span className="w-8 sm:w-12 h-px bg-gold"></span>
            </div>

            {/* Grand Serif Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium text-espresso tracking-tight leading-[1.12]">
              <span className="block">{current.headingLine1}</span>
              <span className="block font-semibold text-espresso-dark italic">
                {current.headingLine2}
              </span>
            </h1>

            {/* Subtitle / Philosophy */}
            <p className="text-sm sm:text-base text-muted font-sans font-normal leading-relaxed max-w-xl">
              {current.subtitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center space-x-2 bg-espresso hover:bg-espresso-light text-softwhite px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={onOpenConsultation || (() => window.location.href = '/contact')}
                className="inline-flex items-center space-x-2 bg-softwhite/80 hover:bg-softwhite text-espresso border border-subtle hover:border-gold/60 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-gold" />
                <span>Book a Consultation</span>
              </button>
            </div>

            {/* Sub-label & Carousel Controls */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-subtle/60 max-w-lg">
              <span className="text-[11px] sm:text-xs tracking-wider text-muted/80 font-medium uppercase">
                {current.tags}
              </span>

              {/* Slider Dots & Arrow Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevSlide}
                  className="p-1 rounded-full text-espresso/70 hover:text-espresso hover:bg-sand/40 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center space-x-1.5">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeSlide
                          ? 'w-5 bg-gold'
                          : 'w-1.5 bg-subtle hover:bg-gold/50'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-1 rounded-full text-espresso/70 hover:text-espresso hover:bg-sand/40 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Accent Badges & Calligraphy */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col items-end justify-center relative lg:min-h-[440px]">
            
            {/* Desktop Floating Right Luxe Vertical Badge (from image.png) */}
            <div className="hidden lg:flex flex-col space-y-3 bg-charcoal/90 backdrop-blur-md text-softwhite p-3.5 rounded-2xl border border-gold/30 shadow-2xl absolute right-0 top-1/2 -translate-y-1/2 animate-float-slow">
              <div className="flex items-center space-x-2 text-right group">
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-gold tracking-wider uppercase">Modern</span>
                  <span className="text-[9px] text-ivory/70">Designs</span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="w-full h-px bg-white/10"></div>

              <div className="flex items-center space-x-2 text-right group">
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-gold tracking-wider uppercase">Premium</span>
                  <span className="text-[9px] text-ivory/70">Materials</span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                  <Layers className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="w-full h-px bg-white/10"></div>

              <div className="flex items-center space-x-2 text-right group">
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-gold tracking-wider uppercase">Expert</span>
                  <span className="text-[9px] text-ivory/70">Execution</span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                  <Award className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Cursive Calligraphy Signature: "Your Dream Our Design" */}
            <div className="hidden lg:block absolute bottom-4 right-16 text-right select-none pointer-events-none">
              <span className="font-serif italic text-3xl xl:text-4xl text-softwhite drop-shadow-[0_2px_8px_rgba(33,28,25,0.7)] tracking-wide opacity-95">
                Your Dream Our Design
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
