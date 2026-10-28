import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutGrid, 
  FolderKanban, 
  Sparkles, 
  User, 
  MessageCircle, 
  Phone 
} from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../data/siteConfig';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
      {/* Quick Action Floating Bar (WhatsApp + Call) as shown in image copy.png */}
      <div className="bg-charcoal text-softwhite px-4 py-2 border-t border-espresso-light shadow-2xl flex items-center justify-between">
        {/* WhatsApp Button */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-left group"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
            <MessageCircle className="w-4 h-4 fill-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold text-softwhite group-hover:text-emerald-400 transition-colors">
              Chat on WhatsApp
            </span>
            <span className="text-[9px] text-ivory/60">Quick response • Free consultation</span>
          </div>
        </a>

        {/* Call Us Button */}
        <a
          href={`tel:${siteConfig.primaryPhone}`}
          className="flex items-center space-x-2 text-right group pl-2 border-l border-white/10"
        >
          <div className="flex flex-col leading-tight items-end">
            <span className="text-xs font-semibold text-softwhite group-hover:text-gold transition-colors">
              Call Us
            </span>
            <span className="text-[9px] text-ivory/60">8712376914 / 9703297187</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gold text-charcoal flex items-center justify-center shadow-md">
            <Phone className="w-4 h-4" />
          </div>
        </a>
      </div>

      {/* 5-Item Navigation Tabs as in image copy.png */}
      <div className="bg-softwhite border-t border-subtle/80 px-2 py-1.5 shadow-lg flex items-center justify-around">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] transition-colors ${
            isActive('/') ? 'text-espresso font-semibold' : 'text-muted hover:text-espresso'
          }`}
        >
          <Home className={`w-4 h-4 ${isActive('/') ? 'text-gold' : ''}`} />
          <span className="text-[10px] mt-0.5">Home</span>
          {isActive('/') && <span className="w-1 h-1 rounded-full bg-gold mt-0.5"></span>}
        </Link>

        <Link
          to="/services"
          className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] transition-colors ${
            isActive('/services') ? 'text-espresso font-semibold' : 'text-muted hover:text-espresso'
          }`}
        >
          <LayoutGrid className={`w-4 h-4 ${isActive('/services') ? 'text-gold' : ''}`} />
          <span className="text-[10px] mt-0.5">Services</span>
          {isActive('/services') && <span className="w-1 h-1 rounded-full bg-gold mt-0.5"></span>}
        </Link>

        <Link
          to="/projects"
          className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] transition-colors ${
            isActive('/projects') ? 'text-espresso font-semibold' : 'text-muted hover:text-espresso'
          }`}
        >
          <FolderKanban className={`w-4 h-4 ${isActive('/projects') ? 'text-gold' : ''}`} />
          <span className="text-[10px] mt-0.5">Projects</span>
          {isActive('/projects') && <span className="w-1 h-1 rounded-full bg-gold mt-0.5"></span>}
        </Link>

        <Link
          to="/before-after"
          className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] transition-colors ${
            isActive('/before-after') ? 'text-espresso font-semibold' : 'text-muted hover:text-espresso'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${isActive('/before-after') ? 'text-gold' : ''}`} />
          <span className="text-[10px] mt-0.5">Before & After</span>
          {isActive('/before-after') && <span className="w-1 h-1 rounded-full bg-gold mt-0.5"></span>}
        </Link>

        <Link
          to="/contact"
          className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] transition-colors ${
            isActive('/contact') ? 'text-espresso font-semibold' : 'text-muted hover:text-espresso'
          }`}
        >
          <User className={`w-4 h-4 ${isActive('/contact') ? 'text-gold' : ''}`} />
          <span className="text-[10px] mt-0.5">Contact</span>
          {isActive('/contact') && <span className="w-1 h-1 rounded-full bg-gold mt-0.5"></span>}
        </Link>
      </div>
    </div>
  );
};
