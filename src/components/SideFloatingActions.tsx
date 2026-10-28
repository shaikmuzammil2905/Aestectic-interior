import React, { useState } from 'react';
import { 
  Phone, 
  X, 
  Calendar, 
  ExternalLink, 
  Clock, 
  MapPin, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../data/siteConfig';

interface SideFloatingActionsProps {
  onOpenConsultation: (service?: string) => void;
}

export const SideFloatingActions: React.FC<SideFloatingActionsProps> = ({ onOpenConsultation }) => {
  const [activePopup, setActivePopup] = useState<'whatsapp' | 'call' | null>(null);

  const quickWhatsAppInquiries = [
    { label: 'Book Free Home Consultation', msg: 'Hello Aesthetic Interiors, I would like to book a free home consultation for my property in Telangana.' },
    { label: 'Modular Kitchen Estimate', msg: 'Hello, I want to get an estimate for a custom modular kitchen layout.' },
    { label: 'Wardrobes & Storage Design', msg: 'Hello, I am interested in walk-in wardrobes and custom bedroom storage.' },
    { label: 'Turnkey Villa Interiors', msg: 'Hello, I have a new villa/apartment and want end-to-end turnkey interior execution.' },
  ];

  return (
    <>
      {/* Floating Side Action Pill Container */}
      <div className="fixed right-3 sm:right-5 bottom-16 sm:bottom-24 z-40 flex flex-col items-end space-y-2.5">
        
        {/* 1. Quick Consultation Button */}
        <button
          onClick={() => {
            setActivePopup(null);
            onOpenConsultation();
          }}
          className="group flex items-center bg-espresso hover:bg-espresso-light text-softwhite pl-3.5 pr-2.5 py-2.5 rounded-full shadow-2xl border border-gold/40 hover:border-gold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Instant Consultation"
        >
          <span className="text-[11px] font-semibold tracking-wider uppercase pr-2 text-gold hidden sm:inline-block">
            Book Consult
          </span>
          <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
        </button>

        {/* 2. Direct Call Side Button */}
        <div className="relative">
          <button
            onClick={() => setActivePopup(activePopup === 'call' ? null : 'call')}
            className="w-12 h-12 rounded-full bg-charcoal hover:bg-espresso text-gold flex items-center justify-center shadow-2xl border-2 border-gold/50 hover:border-gold transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            title="Call Us Directly"
            aria-label="Call Hotlines"
          >
            <Phone className="w-5 h-5" />
          </button>

          {/* Quick Call Popup */}
          {activePopup === 'call' && (
            <div className="absolute right-0 bottom-14 w-72 sm:w-80 bg-softwhite rounded-2xl shadow-2xl border border-gold/40 p-5 space-y-4 animate-fade-up z-50 text-espresso">
              <div className="flex items-center justify-between border-b border-subtle/60 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-gold/20 text-gold flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-espresso leading-tight">
                      Direct Hotlines
                    </h4>
                    <span className="text-[10px] text-muted">Mallapur, Hyderabad</span>
                  </div>
                </div>
                <button
                  onClick={() => setActivePopup(null)}
                  className="p-1 rounded-full text-muted hover:text-espresso transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <a
                  href={`tel:${siteConfig.primaryPhone}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-ivory hover:bg-sand/30 border border-subtle transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gold tracking-wider">
                      Primary Line
                    </span>
                    <span className="text-sm font-bold text-espresso font-serif">
                      +91 8712376914
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-espresso text-softwhite flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-3.5 h-3.5 text-gold" />
                  </div>
                </a>

                <a
                  href={`tel:${siteConfig.secondaryPhone}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-ivory hover:bg-sand/30 border border-subtle transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gold tracking-wider">
                      Secondary Line
                    </span>
                    <span className="text-sm font-bold text-espresso font-serif">
                      +91 9703297187
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-espresso text-softwhite flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-3.5 h-3.5 text-gold" />
                  </div>
                </a>
              </div>

              <div className="text-[10px] text-muted leading-tight pt-1 flex items-center space-x-1.5 border-t border-subtle/50">
                <Clock className="w-3 h-3 text-gold flex-shrink-0" />
                <span>Mon – Sun: 9:30 AM – 8:30 PM (Direct Response)</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. WhatsApp Side Button */}
        <div className="relative">
          <button
            onClick={() => setActivePopup(activePopup === 'whatsapp' ? null : 'whatsapp')}
            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl border-2 border-white/90 hover:scale-110 active:scale-95 transition-all duration-300 relative cursor-pointer"
            title="Chat on WhatsApp"
            aria-label="WhatsApp Popup"
          >
            <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-60 animate-ping pointer-events-none"></span>
            <svg className="w-6 h-6 fill-white relative z-10" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.133-.062-.271-.086-.62-.206-1.077-.404-1.942-.843-3.21-2.822-3.308-2.951-.097-.13-.787-1.047-.787-1.996 0-.948.497-1.414.673-1.609.176-.195.385-.244.513-.244.129 0 .257.002.37.008.12.006.28-.046.438.334.163.39.559 1.365.608 1.463.049.098.082.213.016.342-.066.13-.099.21-.197.324-.098.114-.207.255-.296.342-.099.097-.202.203-.087.401.115.197.511.844 1.096 1.366.753.672 1.388.88 1.585.979.197.098.312.082.427-.049.115-.13.492-.573.623-.769.131-.197.262-.164.442-.098.18.066 1.147.541 1.344.64.197.098.328.148.377.23.049.082.049.475-.095.88z"/>
            </svg>
          </button>

          {/* Quick WhatsApp Popup */}
          {activePopup === 'whatsapp' && (
            <div className="absolute right-0 bottom-14 w-72 sm:w-80 bg-softwhite rounded-2xl shadow-2xl border border-emerald-500/40 p-5 space-y-4 animate-fade-up z-50 text-espresso">
              <div className="flex items-center justify-between border-b border-subtle/60 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <svg className="w-4 h-4 fill-emerald-600" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.133-.062-.271-.086-.62-.206-1.077-.404-1.942-.843-3.21-2.822-3.308-2.951-.097-.13-.787-1.047-.787-1.996 0-.948.497-1.414.673-1.609.176-.195.385-.244.513-.244.129 0 .257.002.37.008.12.006.28-.046.438.334.163.39.559 1.365.608 1.463.049.098.082.213.016.342-.066.13-.099.21-.197.324-.098.114-.207.255-.296.342-.099.097-.202.203-.087.401.115.197.511.844 1.096 1.366.753.672 1.388.88 1.585.979.197.098.312.082.427-.049.115-.13.492-.573.623-.769.131-.197.262-.164.442-.098.18.066 1.147.541 1.344.64.197.098.328.148.377.23.049.082.049.475-.095.88z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-espresso leading-tight">
                      WhatsApp Studio Chat
                    </h4>
                    <span className="text-[10px] text-emerald-600 font-semibold">Online • Free Estimate</span>
                  </div>
                </div>
                <button
                  onClick={() => setActivePopup(null)}
                  className="p-1 rounded-full text-muted hover:text-espresso transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Direct Number Links */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getWhatsAppLink(undefined, siteConfig.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors"
                >
                  Hotline 1
                </a>
                <a
                  href={getWhatsAppLink(undefined, siteConfig.whatsappSecondary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors"
                >
                  Hotline 2
                </a>
              </div>

              {/* 1-Click Quick Inquiries */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                  Quick Enquiry Prompts:
                </span>
                {quickWhatsAppInquiries.map((q, idx) => (
                  <a
                    key={idx}
                    href={getWhatsAppLink(q.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg bg-ivory hover:bg-emerald-50 border border-subtle/80 hover:border-emerald-300 text-xs font-medium text-espresso transition-colors group"
                  >
                    <span className="line-clamp-1">{q.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gold group-hover:text-emerald-600 flex-shrink-0 ml-1" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

