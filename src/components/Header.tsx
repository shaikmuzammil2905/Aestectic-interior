import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../data/siteConfig';
import { servicesData } from '../data/servicesData';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Announcement Strip */}
      <div className="bg-espresso text-ivory/90 text-xs py-2 px-4 text-center tracking-widest font-sans uppercase border-b border-gold/20 flex items-center justify-center space-x-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
        <span>Thoughtfully Designed Interiors Across Telangana</span>
        <span className="hidden sm:inline-block text-gold/60">•</span>
        <span className="hidden sm:inline-block text-sand/80 font-normal lowercase tracking-normal">Direct In-House Modular Factory</span>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-subtle/80 py-3'
            : 'bg-ivory/90 backdrop-blur-sm border-b border-subtle/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/assets/logo.png"
              alt="Aesthetic Interiors & Modular Factory"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              onError={(e) => {
                // Fallback to text logo if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.18em] text-espresso uppercase leading-none">
                AESTHETIC
              </span>
              <span className="font-sans text-[10px] sm:text-xs tracking-[0.25em] text-gold font-semibold uppercase leading-tight mt-0.5">
                INTERIORS
              </span>
              <span className="font-sans text-[8px] tracking-[0.18em] text-muted uppercase leading-none mt-0.5">
                & MODULAR FACTORY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                isActive('/') ? 'text-espresso font-semibold' : 'text-espresso/80 hover:text-espresso'
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full"></span>
              )}
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                isActive('/about') ? 'text-espresso font-semibold' : 'text-espresso/80 hover:text-espresso'
              }`}
            >
              About
              {isActive('/about') && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full"></span>
              )}
            </Link>

            {/* Services with Hover Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <Link
                to="/services"
                className={`px-3 py-2 text-sm font-medium flex items-center space-x-1 transition-colors relative ${
                  isActive('/services') ? 'text-espresso font-semibold' : 'text-espresso/80 hover:text-espresso'
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted transition-transform duration-200" />
                {isActive('/services') && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full"></span>
                )}
              </Link>

              {/* Mega-style Services Dropdown */}
              {servicesDropdown && (
                <div className="absolute top-full left-0 w-80 bg-softwhite rounded-xl shadow-xl border border-subtle/80 py-3 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-subtle/50 mb-2">
                    <span className="text-[11px] font-semibold text-muted tracking-wider uppercase">
                      All 14 Interior Solutions
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto px-2 space-y-1">
                    {servicesData.slice(0, 8).map((srv) => (
                      <Link
                        key={srv.id}
                        to={`/services/${srv.id}`}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-espresso/90 hover:bg-ivory hover:text-espresso transition-colors group"
                      >
                        <span>{srv.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                  <div className="px-3 pt-2 mt-2 border-t border-subtle/50 text-center">
                    <Link
                      to="/services"
                      className="text-xs font-semibold text-gold hover:text-gold-dark inline-flex items-center space-x-1"
                    >
                      <span>Explore All Services</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/projects"
              className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                isActive('/projects') ? 'text-espresso font-semibold' : 'text-espresso/80 hover:text-espresso'
              }`}
            >
              Projects
              {isActive('/projects') && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full"></span>
              )}
            </Link>

            <Link
              to="/before-after"
              className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                isActive('/before-after') ? 'text-espresso font-semibold' : 'text-espresso/80 hover:text-espresso'
              }`}
            >
              Before & After
              {isActive('/before-after') && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full"></span>
              )}
            </Link>

            <Link
              to="/process"
              className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                isActive('/process') ? 'text-espresso font-semibold' : 'text-espresso/80 hover:text-espresso'
              }`}
            >
              Process
              {isActive('/process') && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full"></span>
              )}
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                isActive('/contact') ? 'text-espresso font-semibold' : 'text-espresso/80 hover:text-espresso'
              }`}
            >
              Contact
              {isActive('/contact') && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full"></span>
              )}
            </Link>
          </nav>

          {/* Right Action CTA & Phone Contacts */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Consultation Button */}
            <button
              onClick={onOpenConsultation || (() => window.location.href = '/contact')}
              className="bg-espresso hover:bg-espresso-light text-softwhite px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow flex items-center space-x-2 group cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Book a Free Consultation</span>
              <ChevronRight className="w-3.5 h-3.5 text-gold transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Quick Contact Numbers */}
            <div className="flex items-center space-x-2 pl-2 border-l border-subtle text-xs">
              <a
                href={`tel:${siteConfig.primaryPhone}`}
                className="flex items-center text-espresso/90 hover:text-espresso font-medium transition-colors group"
                title="Call 8712376914 / 9703297187"
              >
                <div className="w-7 h-7 rounded-full bg-sand/50 flex items-center justify-center mr-1.5 text-gold group-hover:bg-gold group-hover:text-softwhite transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-[11px]">8712376914</span>
                  <span className="text-[10px] text-muted">9703297187</span>
                </div>
              </a>

              {/* Direct WhatsApp Pill */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors ml-1"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile Right Controls: Consultation button & Hamburger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenConsultation || (() => window.location.href = '/contact')}
              className="bg-espresso text-softwhite px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase flex items-center space-x-1.5 shadow-sm"
            >
              <Calendar className="w-3 h-3 text-gold" />
              <span className="hidden sm:inline">Book Free Consultation</span>
              <span className="sm:hidden">Consult</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-espresso hover:text-gold transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-softwhite border-b border-subtle px-4 pt-4 pb-6 space-y-4 shadow-xl animate-fade-in">
            <div className="space-y-1">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-ivory text-espresso font-semibold border-l-4 border-gold'
                      : 'text-espresso/80 hover:bg-ivory/60 hover:text-espresso'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Direct Quick Actions inside Drawer */}
            <div className="pt-4 border-t border-subtle/80 space-y-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 8712376914)</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${siteConfig.primaryPhone}`}
                  className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-ivory text-espresso border border-subtle text-xs font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>8712376914</span>
                </a>
                <a
                  href={`tel:${siteConfig.secondaryPhone}`}
                  className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-ivory text-espresso border border-subtle text-xs font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>9703297187</span>
                </a>
              </div>

              <div className="text-[11px] text-muted text-center pt-2">
                <MapPin className="w-3 h-3 inline-block mr-1 text-gold" />
                Sultanpur, Mallapur, Hyderabad – 500005
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
