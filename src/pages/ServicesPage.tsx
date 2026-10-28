import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  Check, 
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { getWhatsAppLink } from '../data/siteConfig';

interface ServicesPageProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenConsultation }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'residential' | 'modular' | 'commercial'>('all');

  const filterCategory = (serviceId: string) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'modular') {
      return ['modular-kitchen-design', 'wardrobes-and-storage', 'modular-furniture-manufacturing', 'custom-furniture-manufacturing'].includes(serviceId);
    }
    if (selectedFilter === 'commercial') {
      return ['office-and-commercial-interiors', 'turnkey-interior-solutions'].includes(serviceId);
    }
    if (selectedFilter === 'residential') {
      return !['office-and-commercial-interiors'].includes(serviceId);
    }
    return true;
  };

  const filteredServices = servicesData.filter((s) => filterCategory(s.id));

  return (
    <div className="w-full bg-ivory">
      
      {/* Header */}
      <section className="relative py-20 bg-charcoal text-softwhite overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/hero-desktop.png"
            alt="Interior Solutions"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-px bg-gold"></span>
            <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase font-sans">
              ARCHITECTURAL EXCELLENCE
            </span>
            <span className="w-6 h-px bg-gold"></span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            Complete Interior Solutions
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            14 specialized design and factory-direct modular disciplines crafted to perfection for homes and commercial workspaces across Telangana.
          </p>

          {/* Filter Pills */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { label: 'All 14 Services', value: 'all' },
              { label: 'Residential Interiors', value: 'residential' },
              { label: 'Modular & Cabinetry', value: 'modular' },
              { label: 'Commercial & Turnkey', value: 'commercial' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedFilter === tab.value
                    ? 'bg-gold text-charcoal shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-softwhite'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className="bg-softwhite rounded-3xl overflow-hidden border border-subtle/80 shadow-md hover:shadow-xl hover:border-gold/50 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-sm text-gold px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    Service 0{index + 1}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-serif text-xl sm:text-2xl text-softwhite font-medium drop-shadow-md">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 border-t border-subtle/50 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-accent block">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-espresso/90">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-subtle/60 flex items-center justify-between gap-3">
                    <Link
                      to={`/services/${service.id}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-espresso hover:text-gold transition-colors"
                    >
                      <span>Full Details</span>
                      <ChevronRight className="w-4 h-4 text-gold" />
                    </Link>

                    <button
                      onClick={() => {
                        if (onOpenConsultation) {
                          onOpenConsultation(service.title);
                        } else {
                          window.location.href = `/contact?service=${encodeURIComponent(service.title)}`;
                        }
                      }}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-espresso hover:bg-espresso-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      <Calendar className="w-3 h-3 text-gold" />
                      <span>Discuss</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

