import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/siteConfig';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <div className="hidden lg:block fixed bottom-8 right-8 z-40 group">
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-charcoal text-softwhite text-xs py-1.5 px-3 rounded-xl shadow-lg border border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <span>Chat with us on WhatsApp</span>
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-charcoal"></div>
      </div>

      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative border-2 border-white/80"
        aria-label="Direct WhatsApp Enquiry"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-75 animate-ping pointer-events-none"></span>
        <MessageCircle className="w-7 h-7 fill-white relative z-10" />
      </a>
    </div>
  );
};

