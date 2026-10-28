import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  Factory, 
  HeartHandshake, 
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface AboutPageProps {
  onOpenConsultation?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation }) => {
  const companyValues = [
    {
      title: 'Thoughtful Design',
      desc: 'We begin with your daily habits, morning routines, and aesthetic dreams, crafting spaces that feel natural and authentic.',
      icon: <Sparkles className="w-5 h-5 text-gold" />,
    },
    {
      title: 'Clear Communication',
      desc: 'Transparent budgets, realistic timelines, and regular progress reports so you are always in complete control.',
      icon: <MessageSquare className="w-5 h-5 text-gold" />,
    },
    {
      title: 'Quality-Focused Execution',
      desc: 'Zero tolerance for substandard hardware. Every panel, screw, and hinge is calibrated to exacting standards.',
      icon: <ShieldCheck className="w-5 h-5 text-gold" />,
    },
    {
      title: 'Personalized Solutions',
      desc: 'No cookie-cutter templates. Every layout, wardrobe drawer, and kitchen carousel is built around your specific lifestyle.',
      icon: <HeartHandshake className="w-5 h-5 text-gold" />,
    },
    {
      title: 'Functional Planning',
      desc: 'Balancing visual grandeur with practical storage, ergonomics, ventilation, and durable surface engineering.',
      icon: <CheckCircle2 className="w-5 h-5 text-gold" />,
    },
    {
      title: 'Customer Satisfaction',
      desc: 'Our work is not complete until every snag is resolved and you step into a spotless, beautifully finished home.',
      icon: <Factory className="w-5 h-5 text-gold" />,
    },
  ];

  return (
    <div className="w-full bg-ivory">
      
      {/* Page Header */}
      <section className="relative py-20 bg-charcoal text-softwhite overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/hero-desktop.png"
            alt="Interior Studio"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-px bg-gold"></span>
            <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase font-sans">
              ABOUT AESTHETIC INTERIORS
            </span>
            <span className="w-6 h-px bg-gold"></span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            Designing Spaces. Creating Experiences.
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            {siteConfig.experienceYears} years of transforming residential and commercial environments across Telangana through thoughtful planning and in-house modular manufacturing.
          </p>
        </div>
      </section>

      {/* Philosophy & Story Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Mosaic */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-subtle">
                <img
                  src="/assets/hero-desktop.png"
                  alt="Aesthetic Interiors Living Architecture"
                  className="w-full h-[420px] object-cover"
                />
              </div>

              {/* In-House Manufacturing Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-softwhite rounded-2xl p-5 shadow-xl border border-gold/40 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center flex-shrink-0">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-espresso leading-tight">
                      In-House Modular Factory
                    </h4>
                    <p className="text-[11px] text-muted mt-0.5">
                      Direct quality control & precision CNC joinery at Mallapur, Hyderabad.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2">
                <span className="w-6 h-px bg-gold"></span>
                <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase font-sans">
                  OUR PHILOSOPHY
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-espresso tracking-tight leading-snug">
                Balancing Beauty, Functionality, and Everyday Comfort
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed font-normal">
                <p>
                  <strong>Aesthetic Interiors & Modular Factory</strong> brings together interior design and modular solutions to create spaces that balance beauty, functionality, and everyday comfort.
                </p>
                <p>
                  With 8 years of industry experience, our approach begins with understanding your requirements, planning carefully, communicating clearly, and maintaining quality throughout the project.
                </p>
                <p>
                  From residential interiors to modular kitchens and custom furniture, we aim to make the design journey organized, transparent, and stress-free.
                </p>
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={onOpenConsultation || (() => window.location.href = '/contact')}
                  className="inline-flex items-center space-x-2 bg-espresso hover:bg-espresso-light text-softwhite px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer group"
                >
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  to="/process"
                  className="text-xs font-semibold uppercase tracking-wider text-espresso hover:text-gold transition-colors"
                >
                  Explore Our Process →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Company Values Grid */}
      <section className="py-20 bg-ivory-50 border-t border-subtle/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase font-sans">
              STANDARDS WE LIVE BY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-espresso tracking-tight">
              Our Core Commitments
            </h2>
            <p className="text-sm text-muted">
              Built on honesty, structural integrity, and dedicated craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-softwhite rounded-2xl p-6 border border-subtle/80 shadow-sm hover:shadow-md hover:border-gold/50 transition-all duration-300 space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-ivory flex items-center justify-center border border-subtle">
                  {val.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-espresso">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Office & Workshop Presence */}
      <section className="py-16 bg-charcoal text-softwhite border-t border-espresso-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-gold uppercase">
              FACILITY & REGISTERED ADDRESS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium">
              Sultanpur, Mallapur, Hyderabad
            </h3>
            <p className="text-xs text-ivory/70 max-w-xl">
              Telangana – 500005, India. Complete modular manufacturing line with German hardware calibration and finish testing.
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href={siteConfig.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-charcoal text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions on Map</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
