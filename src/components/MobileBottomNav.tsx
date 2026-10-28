import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutGrid, 
  FolderKanban, 
  Sparkles, 
  User, 
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
      {/* Quick Action Floating Bar (WhatsApp + Call) as shown in image copy.png & image copy 11 */}
      <div className="bg-charcoal text-softwhite px-4 py-2 border-t border-espresso-light shadow-2xl flex items-center justify-between">
        
        {/* WhatsApp Button with explicit crisp SVG */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.133-.062-.271-.086-.62-.206-1.077-.404-1.942-.843-3.21-2.822-3.308-2.951-.097-.13-.787-1.047-.787-1.996 0-.948.497-1.414.673-1.609.176-.195.385-.244.513-.244.129 0 .257.002.37.008.12.006.28-.046.438.334.163.39.559 1.365.608 1.463.049.098.082.213.016.342-.066.13-.099.21-.197.324-.098.114-.207.255-.296.342-.099.097-.202.203-.087.401.115.197.511.844 1.096 1.366.753.672 1.388.88 1.585.979.197.098.312.082.427-.049.115-.13.492-.573.623-.769.131-.197.262-.164.442-.098.18.066 1.147.541 1.344.64.197.098.328.148.377.23.049.082.049.475-.095.88z"/>
            </svg>
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
          className="flex items-center space-x-2.5 text-right group pl-2 border-l border-white/10"
        >
          <div className="flex flex-col leading-tight items-end">
            <span className="text-xs font-semibold text-softwhite group-hover:text-gold transition-colors">
              Call Us
            </span>
            <span className="text-[9px] text-ivory/60">8712376914 / 9703297187</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gold text-charcoal flex items-center justify-center shadow-md flex-shrink-0">
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
