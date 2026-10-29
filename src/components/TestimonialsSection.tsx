import React, { useState, useEffect } from 'react';
import { 
  Quote, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { testimonialsData as fallbackTestimonials } from '../data/processData';
import { contentService } from '../services/contentService';
import { TestimonialItem } from '../types';

interface TestimonialsSectionProps {
  onOpenConsultation?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenConsultation }) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(fallbackTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    contentService.getTestimonials().then((data) => {
      if (data && data.length > 0) setTestimonials(data);
    });

    const unsub = contentService.subscribeToTable('testimonials', () => {
      contentService.getTestimonials().then((data) => {
        if (data && data.length > 0) setTestimonials(data);
      });
    });

    return () => unsub();
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex] || testimonials[0] || fallbackTestimonials[0];

  return (
    <section className="py-20 lg:py-24 bg-ivory relative border-t border-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-2">
            <span className="w-6 h-px bg-gold"></span>
            <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase font-sans">
              WHAT OUR CLIENTS SAY
            </span>
            <span className="w-6 h-px bg-gold"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-espresso tracking-tight">
            Trusted by Homeowners Across Telangana
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Testimonial Card */}
          <div className="lg:col-span-7 bg-softwhite rounded-3xl p-6 sm:p-8 border border-subtle/80 shadow-md relative flex flex-col justify-between">
            <div className="flex items-start justify-between mb-6">
              <Quote className="w-10 h-10 text-gold/30" />
              
              <div className="flex items-center space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <p className="font-serif text-lg sm:text-xl text-espresso italic leading-relaxed mb-8">
              "{current.quote}"
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-subtle/50">
              <div className="flex items-center space-x-3">
                <img
                  src={current.avatar || '/assets/client_avatar.png'}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gold/40 shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                  }}
                />
                <div>
                  <h4 className="font-sans text-sm font-bold text-espresso">
                    {current.name}
                  </h4>
                  <p className="text-xs text-muted">
                    {current.location} • {current.projectType}
                  </p>
                </div>
              </div>

              {/* Next/Prev Navigation */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevTestimonial}
                  className="w-8 h-8 rounded-full border border-subtle hover:border-gold hover:bg-gold hover:text-softwhite text-espresso flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-8 h-8 rounded-full border border-subtle hover:border-gold hover:bg-gold hover:text-softwhite text-espresso flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Banner: Let's Create Something Beautiful Together */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-lg border border-subtle/80 flex flex-col justify-end p-8 bg-charcoal text-softwhite min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
              alt="Interior Concept"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent"></div>

            <div className="relative z-10 space-y-4">
              <span className="text-[10px] tracking-widest text-gold uppercase font-semibold">
                Start Your Journey
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-snug">
                Let's Create Something Beautiful Together
              </h3>
              <p className="text-xs text-ivory/80 leading-relaxed max-w-sm">
                Schedule a one-on-one session with our senior interior architects and modular specialists.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenConsultation || (() => window.location.href = '/contact')}
                  className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-light text-charcoal px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer group"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

