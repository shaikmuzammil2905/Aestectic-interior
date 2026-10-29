import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  MessageCircle, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { servicesData as fallbackServices } from '../data/servicesData';
import { ConsultationForm } from '../components/ConsultationForm';
import { contentService } from '../services/contentService';
import { ServiceItem } from '../types';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [allServices, setAllServices] = useState<ServiceItem[]>(fallbackServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentService.getServices().then((data) => {
      if (data && data.length > 0) setAllServices(data);
      setLoading(false);
    });

    const unsub = contentService.subscribeToTable('services', () => {
      contentService.getServices().then((data) => {
        if (data && data.length > 0) setAllServices(data);
      });
    });

    return () => unsub();
  }, []);

  const service = allServices.find((s) => s.id === id);

  if (!service && !loading) {
    return <Navigate to="/services" replace />;
  }

  if (!service) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center bg-ivory">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const relatedServices = allServices.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="w-full bg-ivory">
      
      {/* Top Breadcrumb & Hero */}
      <section className="relative py-16 sm:py-24 bg-charcoal text-softwhite overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/40"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gold hover:text-softwhite transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>

          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase font-sans">
              SPECIALIZED DISCIPLINE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
              {service.title}
            </h1>
            <p className="text-sm sm:text-lg text-ivory/80 leading-relaxed font-normal">
              {service.shortDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center space-x-2 text-xs text-gold bg-espresso/60 px-4 py-2 rounded-full border border-gold/30">
              <Clock className="w-4 h-4" />
              <span>{service.timeline}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-softwhite bg-espresso/60 px-4 py-2 rounded-full border border-white/20">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>In-House Modular Precision</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content & Consultation Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 7 Columns: Detailed Description, Deliverables, Materials */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Detailed Narrative */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-espresso tracking-tight">
                  Architectural Approach & Philosophy
                </h2>
                <p className="text-sm sm:text-base text-muted leading-relaxed font-normal">
                  {service.fullDesc}
                </p>
              </div>

              {/* Scope & Deliverables */}
              <div className="bg-softwhite rounded-3xl p-6 sm:p-8 border border-subtle/80 shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-espresso flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-gold" />
                  <span>Agreed Scope & Configurations</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.scope.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-espresso">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features & Engineering */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-espresso">
                  What Sets Our Execution Apart
                </h3>
                <div className="space-y-3">
                  {service.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-ivory-50 border border-subtle/70 flex items-start space-x-3.5"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <p className="text-xs sm:text-sm text-espresso/90 font-medium leading-relaxed">
                        {feat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Materials Used */}
              <div className="bg-espresso text-softwhite rounded-3xl p-6 sm:p-8 border border-gold/30 shadow-md space-y-4">
                <h3 className="font-serif text-xl font-bold text-gold">
                  Factory-Selected Materials & Hardware
                </h3>
                <p className="text-xs text-ivory/70">
                  Every fixture is selected for maximum moisture resistance, smooth daily tactile feedback, and structural longevity.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.materials.map((mat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-ivory">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Sticky Consultation Box */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="bg-softwhite rounded-3xl p-6 sm:p-8 border border-subtle/80 shadow-xl space-y-6">
                <div className="space-y-2 border-b border-subtle/60 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-accent">
                    DIRECT INQUIRY
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-espresso">
                    Discuss {service.title}
                  </h3>
                  <p className="text-xs text-muted">
                    Share your floor dimensions or project scope to receive custom concept suggestions and timeline estimate.
                  </p>
                </div>

                <ConsultationForm initialService={service.title} />
              </div>
            </div>

          </div>

          {/* Related Services Navigation */}
          <div className="mt-24 pt-12 border-t border-subtle/60 space-y-6">
            <h3 className="font-serif text-2xl font-medium text-espresso">
              Explore Complementary Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/services/${rel.id}`}
                  className="group bg-softwhite rounded-2xl p-5 border border-subtle hover:border-gold/50 shadow-sm transition-all duration-300 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-espresso group-hover:text-gold transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-muted line-clamp-1 mt-0.5">
                      {rel.shortDesc}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

