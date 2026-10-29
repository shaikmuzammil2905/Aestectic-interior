import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Layers, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { contentService, HeroSlideItem } from '../services/contentService';

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState<HeroSlideItem[]>([
    {
      eyebrow: 'LUXURY MADE INTO REALITY',
      heading_line1: 'Thoughtfully Designed.',
      heading_line2: 'Beautifully Lived.',
      subtitle: 'We create bespoke interiors and premium modular spaces with in-house modular manufacturing, blending style, functionality and timeless elegance.',
      tags: 'Residential Interiors • Modular Kitchens • Custom Furniture',
      desktop_bg: '/assets/hero-desktop.png',
      mobile_bg: '/assets/hero-mobile.png',
    },
    {
      eyebrow: 'IN-HOUSE MODULAR FACTORY',
      heading_line1: 'Precision Engineered.',
      heading_line2: 'Direct From Factory.',
      subtitle: 'German-grade hardware, zero-defect edge banding, and high-density marine ply crafted to perfection in our Hyderabad manufacturing facility.',
      tags: 'Modular Wardrobes • Modular Kitchens • TV Units',
      desktop_bg: '/assets/hero-desktop.png',
      mobile_bg: '/assets/hero-mobile.png',
    },
    {
      eyebrow: '8+ YEARS OF EXCELLENCE',
      heading_line1: 'Seamless Execution.',
      heading_line2: 'Zero Stress Journey.',
      subtitle: 'From 3D photorealistic visualization to turnkey civil and carpentry coordination, we bring complete transparency to your home transformation.',
      tags: 'Turnkey Living • Luxury Villas • Commercial Studios',
      desktop_bg: '/assets/hero-desktop.png',
      mobile_bg: '/assets/hero-mobile.png',
    }
  ]);
  const [scriptText, setScriptText] = useState('Your Dream Our Design');

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const [slidesData, settings] = await Promise.all([
          contentService.getHeroSlides(),
          contentService.getSiteSettings(),
        ]);
        if (slidesData && slidesData.length > 0) {
          setHeroSlides(slidesData);
        }
        if (settings && (settings as any).heroScriptText) {
          setScriptText((settings as any).heroScriptText);
        }
      } catch (err) {
        console.error('Failed to fetch hero content:', err);
      }
    };

    fetchHeroData();

    // Subscribe to realtime updates for hero slides
    const unsubSlides = contentService.subscribeToTable('hero_slides', () => {
      contentService.getHeroSlides().then((res) => {
        if (res && res.length > 0) setHeroSlides(res);
      });
    });

    const unsubSettings = contentService.subscribeToTable('site_settings', () => {
      contentService.getSiteSettings().then((s) => {
        if (s && (s as any).heroScriptText) setScriptText((s as any).heroScriptText);
      });
    });

    return () => {
      unsubSlides();
      unsubSettings();
    };
  }, []);

  const current = heroSlides[activeSlide] || heroSlides[0];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] xl:min-h-[760px] overflow-hidden flex items-center bg-ivory">
      
      {/* ============================================================
          DESKTOP BACKGROUND: image copy 2.png
         ============================================================ */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src={current.desktop_bg || '/assets/hero-desktop.png'}
          alt="Luxury Aesthetic Living Room"
          className="w-full h-full object-cover object-right-center animate-kenburns scale-105 transition-all duration-1000 ease-out will-change-transform"
        />
        {/* Subtle gradient to keep left text crisp while letting right luxury room shine in full HD */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/80 to-transparent w-[55%]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/50 via-transparent to-ivory/20"></div>
      </div>

      {/* ============================================================
          MOBILE BACKGROUND: image copy 3.png AS IT IS IN HD!
          (Heavy opaque ivory wash removed as requested in image copy 11)
         ============================================================ */}
      <div className="lg:hidden absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src={current.mobile_bg || '/assets/hero-mobile.png'}
          alt="Luxury Living Room Mobile"
          className="w-full h-full object-cover object-center animate-kenburns scale-105 transition-all duration-1000 ease-out will-change-transform"
        />
        {/* Soft, minimal backdrop gradient so HD photo is completely visible as it is */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/40 to-charcoal/70"></div>
      </div>

      {/* Subtle Ambient Shimmer */}
      <div className="absolute top-10 left-1/3 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Text & Call to Actions */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-3">
              <span className="w-8 sm:w-12 h-px bg-gold"></span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase font-sans">
                {current.eyebrow}
              </span>
              <span className="w-8 sm:w-12 h-px bg-gold"></span>
            </div>

            {/* Grand Serif Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium text-espresso tracking-tight leading-[1.12] drop-shadow-sm">
              <span className="block">{current.heading_line1 || (current as any).headingLine1}</span>
              <span className="block font-semibold text-espresso-dark italic">
                {current.heading_line2 || (current as any).headingLine2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-espresso/80 sm:text-muted font-sans font-normal leading-relaxed max-w-xl">
              {current.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center space-x-2 bg-espresso hover:bg-espresso-light text-softwhite px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={onOpenConsultation || (() => window.location.href = '/contact')}
                className="inline-flex items-center space-x-2 bg-softwhite/90 hover:bg-softwhite text-espresso border border-subtle hover:border-gold/60 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-gold" />
                <span>Book a Consultation</span>
              </button>
            </div>

            {/* Desktop Only: Sub-label & Carousel Controls (hidden on mobile as requested in image copy 11) */}
            <div className="hidden sm:flex sm:items-center justify-between gap-4 border-t border-subtle/60 pt-4 max-w-lg">
              <span className="text-[11px] sm:text-xs tracking-wider text-muted font-medium uppercase">
                {current.tags}
              </span>

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

          {/* Right Column: Floating Dark Luxe Badge & Calligraphy (media_1793162007601_12c0721f.png) */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col items-end justify-center relative lg:min-h-[440px]">
            
            {/* Stitched Grand Luxe Floating Badge */}
            <div className="hidden lg:flex flex-col space-y-3 bg-charcoal/95 backdrop-blur-md text-softwhite p-4 rounded-3xl border border-gold/40 shadow-2xl absolute right-0 top-1/2 -translate-y-1/2 animate-float-slow hover:border-gold transition-colors">
              <div className="flex items-center space-x-3 text-right">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gold tracking-widest uppercase">MODERN</span>
                  <span className="text-[10px] text-ivory/80">Designs</span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-gold/20 flex items-center justify-center text-gold border border-gold/30">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <div className="w-full h-px bg-white/10"></div>

              <div className="flex items-center space-x-3 text-right">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gold tracking-widest uppercase">PREMIUM</span>
                  <span className="text-[10px] text-ivory/80">Materials</span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-gold/20 flex items-center justify-center text-gold border border-gold/30">
                  <Layers className="w-4 h-4" />
                </div>
              </div>

              <div className="w-full h-px bg-white/10"></div>

              <div className="flex items-center space-x-3 text-right">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gold tracking-widest uppercase">EXPERT</span>
                  <span className="text-[10px] text-ivory/80">Execution</span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-gold/20 flex items-center justify-center text-gold border border-gold/30">
                  <Award className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Cursive Calligraphy: "Your Dream Our Design" */}
            <div className="hidden lg:block absolute bottom-4 right-16 text-right select-none pointer-events-none">
              <span className="font-serif italic text-3xl xl:text-4xl text-softwhite drop-shadow-[0_2px_10px_rgba(33,28,25,0.85)] tracking-wide">
                {scriptText || 'Your Dream Our Design'}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
