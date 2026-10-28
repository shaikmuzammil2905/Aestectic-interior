import React from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../data/siteConfig';
import { ConsultationForm } from '../components/ConsultationForm';

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full bg-ivory">
      
      {/* Header */}
      <section className="relative py-20 bg-charcoal text-softwhite overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/hero-desktop.png"
            alt="Contact Aesthetic Interiors"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-px bg-gold"></span>
            <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase font-sans">
              GET IN TOUCH
            </span>
            <span className="w-6 h-px bg-gold"></span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            Let's Discuss Your Dream Space
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            Connect directly with our Hyderabad design studio and modular factory team for personalized consultations, 3D project planning, and material samples.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Consultation Form */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 5 Cols: Contact Information & Address */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-accent font-sans">
                  DIRECT CONTACT CHANNELS
                </span>
                <h2 className="font-serif text-3xl font-medium text-espresso tracking-tight">
                  Reach Our Team
                </h2>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Have an architectural query or floorplan to share? We are available via direct phone, WhatsApp, or in-person workshop visits.
                </p>
              </div>

              {/* Phone Cards */}
              <div className="space-y-3">
                <div className="bg-softwhite rounded-2xl p-5 border border-subtle/80 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-ivory text-gold flex items-center justify-center border border-subtle">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                        Primary Hotline
                      </span>
                      <a
                        href={`tel:${siteConfig.primaryPhone}`}
                        className="font-serif text-base font-bold text-espresso hover:text-gold transition-colors"
                      >
                        {siteConfig.primaryPhoneDisplay}
                      </a>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppLink(undefined, siteConfig.whatsappNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                    title="WhatsApp Primary"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

                <div className="bg-softwhite rounded-2xl p-5 border border-subtle/80 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-ivory text-gold flex items-center justify-center border border-subtle">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                        Secondary Hotline
                      </span>
                      <a
                        href={`tel:${siteConfig.secondaryPhone}`}
                        className="font-serif text-base font-bold text-espresso hover:text-gold transition-colors"
                      >
                        {siteConfig.secondaryPhoneDisplay}
                      </a>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppLink(undefined, siteConfig.whatsappSecondary)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                    title="WhatsApp Secondary"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Office & Factory Location */}
              <div className="bg-softwhite rounded-2xl p-6 border border-subtle/80 shadow-sm space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-ivory text-gold flex items-center justify-center border border-subtle flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                      Office & Modular Factory
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-espresso leading-relaxed">
                      {siteConfig.officeAddress}
                    </p>
                    <span className="text-[11px] text-muted block pt-0.5">
                      Service Area: Throughout Telangana
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={siteConfig.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-ivory hover:bg-sand/30 border border-subtle text-xs font-semibold text-espresso transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-gold" />
                    <span>Open in Google Maps Directions</span>
                  </a>
                </div>
              </div>

              {/* Service Assurance */}
              <div className="p-5 rounded-2xl bg-espresso/5 border border-gold/20 flex items-center space-x-3 text-xs text-muted">
                <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" />
                <span>
                  Official direct response from registered studio team. No third-party middlemen or sales commission markups.
                </span>
              </div>

            </div>

            {/* Right 7 Cols: Complete Consultation Booking Form */}
            <div className="lg:col-span-7 bg-softwhite rounded-3xl p-6 sm:p-10 border border-subtle/80 shadow-xl space-y-6">
              <div className="space-y-2 border-b border-subtle/60 pb-4">
                <span className="text-xs font-semibold tracking-wider text-gold-accent uppercase font-sans">
                  BOOK APPOINTMENT
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso">
                  Consultation Request Form
                </h3>
                <p className="text-xs text-muted">
                  Please provide details about your property and scope. All fields marked with * are required.
                </p>
              </div>

              <ConsultationForm />
            </div>

          </div>

          {/* Map Section */}
          <div className="mt-20 rounded-3xl overflow-hidden border border-subtle shadow-md bg-softwhite">
            <div className="p-6 sm:p-8 bg-charcoal text-softwhite flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-widest text-gold uppercase font-semibold">
                  NAVIGATE TO OUR WORKSHOP
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium">
                  Sultanpur, Mallapur, Hyderabad – 500005
                </h3>
              </div>
              <a
                href={siteConfig.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gold hover:bg-gold-light text-charcoal text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>
            </div>

            {/* Google Map Interactive Iframe */}
            <div className="w-full h-80 sm:h-96 relative">
              <iframe
                title="Office Location Map"
                src="https://maps.google.com/maps?q=Sultanpur,%20Mallapur,%20Hyderabad,%20Telangana%20500005&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-[0.85] contrast-[1.05]"
              ></iframe>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

