import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  ArrowUp, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../data/siteConfig';
import { servicesData } from '../data/servicesData';
import { scrollToTop } from '../utils';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-ivory/80 pt-16 pb-28 md:pb-12 border-t border-espresso-light relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-espresso-light/60">
          
          {/* Brand Col: Transparent white/gold logo, ZERO white box! */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/assets/logo_white.png"
                alt="Aesthetic Interiors & Modular Factory"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
            </Link>

            <p className="text-xs text-ivory/70 leading-relaxed max-w-sm pt-2">
              Bespoke interior design and precision-crafted modular furniture manufactured directly in our factory. Serving homes and commercial spaces across Telangana with 8+ years of dedicated excellence.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-espresso-light hover:bg-emerald-600 text-ivory hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Instagram SVG */}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Social profiles are configurable in siteConfig.'); }}
                className="w-8 h-8 rounded-full bg-espresso-light hover:bg-gold text-ivory hover:text-charcoal flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook SVG */}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Social profiles are configurable in siteConfig.'); }}
                className="w-8 h-8 rounded-full bg-espresso-light hover:bg-gold text-ivory hover:text-charcoal flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>

              {/* YouTube SVG */}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Social profiles are configurable in siteConfig.'); }}
                className="w-8 h-8 rounded-full bg-espresso-light hover:bg-gold text-ivory hover:text-charcoal flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              {siteConfig.navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-gold transition-colors inline-flex items-center space-x-1"
                  >
                    <span className="text-gold/50">•</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {servicesData.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="hover:text-gold transition-colors inline-flex items-center space-x-1"
                  >
                    <span className="text-gold/50">•</span>
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-gold font-medium hover:underline inline-flex items-center space-x-1 pt-1"
                >
                  <span>View All 14 Services</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Factory Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Contact & Factory
            </h4>
            
            <div className="flex items-start space-x-2.5 text-xs">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-ivory/90 leading-relaxed">
                  {siteConfig.officeAddress}
                </p>
                <a
                  href={siteConfig.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold text-[11px] hover:underline inline-flex items-center space-x-1 mt-1"
                >
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 text-xs pt-1">
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              <div className="flex flex-col">
                <a href={`tel:${siteConfig.primaryPhone}`} className="hover:text-gold font-medium">
                  {siteConfig.primaryPhoneDisplay}
                </a>
                <a href={`tel:${siteConfig.secondaryPhone}`} className="hover:text-gold font-medium">
                  {siteConfig.secondaryPhoneDisplay}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-emerald-700/30 hover:bg-emerald-600/50 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ivory/50 space-y-4 sm:space-y-0">
          <p>
            © {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <span className="text-ivory/60">Serving Hyderabad & Telangana</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-gold hover:text-gold-light transition-colors group cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
