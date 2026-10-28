import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  UtensilsCrossed, 
  Layers, 
  Tv, 
  Lamp, 
  Flower2, 
  Briefcase, 
  KeyRound, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

export const ServicesGrid: React.FC = () => {
  // Mapping icons to service slugs
  const serviceIcons: Record<string, React.ReactNode> = {
    'home-interior-design': <Home className="w-6 h-6 text-gold" />,
    'modular-kitchen-design': <UtensilsCrossed className="w-6 h-6 text-gold" />,
    'wardrobes-and-storage': <Layers className="w-6 h-6 text-gold" />,
    'hall-and-tv-unit-design': <Tv className="w-6 h-6 text-gold" />,
    'false-ceiling-and-lighting': <Lamp className="w-6 h-6 text-gold" />,
    'pooja-room-design': <Flower2 className="w-6 h-6 text-gold" />,
    'office-and-commercial-interiors': <Briefcase className="w-6 h-6 text-gold" />,
    'turnkey-interior-solutions': <KeyRound className="w-6 h-6 text-gold" />,
  };

  const previewServices = servicesData.filter((s) => s.id in serviceIcons);

  return (
    <section className="py-20 lg:py-24 bg-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2">
              <span className="w-6 h-px bg-gold"></span>
              <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase font-sans">
                OUR SERVICES
              </span>
              <span className="w-6 h-px bg-gold"></span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-espresso tracking-tight leading-[1.15]">
              Complete Interior Solutions for Your Dream Space
            </h2>

            <p className="text-sm sm:text-base text-muted font-sans font-normal leading-relaxed">
              From concept to completion, we offer end-to-end interior design and in-house modular manufacturing.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-espresso hover:bg-espresso-light text-softwhite px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow group"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Services Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Grid: 8 Compact Aesthetic Service Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {previewServices.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group bg-softwhite hover:bg-ivory-50 rounded-2xl p-5 border border-subtle/70 hover:border-gold/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center justify-between min-h-[160px] relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-ivory flex items-center justify-center group-hover:scale-110 group-hover:bg-sand/30 transition-all duration-300 mb-3 border border-subtle/50">
                  {serviceIcons[service.id]}
                </div>

                <h3 className="font-sans text-xs sm:text-sm font-semibold text-espresso leading-snug group-hover:text-gold-dark transition-colors">
                  {service.title.replace(' Design', '').replace(' Solutions', '')}
                </h3>

                <div className="mt-3 flex items-center justify-center text-gold opacity-60 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Right Feature Card: image copy 8.png set in background as requested in image copy 5 */}
          <div className="lg:col-span-4">
            <Link
              to="/services/custom-furniture-manufacturing"
              className="group relative block w-full h-full min-h-[340px] rounded-2xl overflow-hidden shadow-lg border border-subtle/80"
            >
              <img
                src="/assets/custom-furniture-hd.png"
                alt="Custom Furniture & Modular Manufacturing"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div className="space-y-1.5 max-w-xs">
                  <span className="text-[10px] tracking-widest text-gold font-semibold uppercase">
                    In-House Workshop
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-softwhite font-medium leading-snug">
                    Custom Furniture & Modular Manufacturing
                  </h3>
                  <p className="text-xs text-ivory/80 line-clamp-2">
                    Crafted to exact room dimensions with certified marine ply and premium finishes.
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-gold text-charcoal flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
