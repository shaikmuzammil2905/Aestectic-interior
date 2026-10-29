import React from 'react';
import { 
  ShieldCheck, 
  Home, 
  Factory, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

export const TrustStrip: React.FC = () => {
  const { settings } = useSiteSettings();

  return (
    <section className="relative -mt-6 sm:-mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-softwhite rounded-2xl shadow-lg border border-subtle/80 p-4 sm:p-6 lg:py-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-4 items-center">
          
          {/* Item 1: Experience */}
          <div className="flex items-center space-x-3 sm:space-x-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-ivory border border-subtle flex items-center justify-center text-gold flex-shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold text-espresso leading-tight">
                {settings.experienceYears ? `${settings.experienceYears} Years` : '8+ Years'}
              </span>
              <span className="text-[11px] sm:text-xs text-muted font-medium">
                of Experience
              </span>
            </div>
          </div>

          {/* Item 2: Solutions */}
          <div className="flex items-center space-x-3 sm:space-x-3.5 border-l border-subtle/40 pl-2 sm:pl-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-ivory border border-subtle flex items-center justify-center text-gold flex-shrink-0 shadow-sm">
              <Home className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold text-espresso leading-tight">
                25+ Interior
              </span>
              <span className="text-[11px] sm:text-xs text-muted font-medium">
                Solutions
              </span>
            </div>
          </div>

          {/* Item 3: In-house Manufacturing */}
          <div className="flex items-center space-x-3 sm:space-x-3.5 border-l border-subtle/40 pl-2 sm:pl-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-ivory border border-subtle flex items-center justify-center text-gold flex-shrink-0 shadow-sm">
              <Factory className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold text-espresso leading-tight">
                In-house Modular
              </span>
              <span className="text-[11px] sm:text-xs text-muted font-medium">
                Manufacturing
              </span>
            </div>
          </div>

          {/* Item 4: Coverage */}
          <div className="flex items-center space-x-3 sm:space-x-3.5 border-l border-subtle/40 pl-2 sm:pl-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-ivory border border-subtle flex items-center justify-center text-gold flex-shrink-0 shadow-sm">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold text-espresso leading-tight">
                Serving Across
              </span>
              <span className="text-[11px] sm:text-xs text-muted font-medium">
                Telangana
              </span>
            </div>
          </div>

          {/* Item 5: Aesthetic Accent (Desktop) */}
          <div className="hidden lg:flex items-center justify-end space-x-3 border-l border-subtle/60 pl-4">
            <div className="text-right">
              <span className="block text-[11px] tracking-widest text-gold uppercase font-semibold">
                Modern Living
              </span>
              <span className="block text-xs font-serif italic text-espresso">
                Simplified.
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-sand/30 flex items-center justify-center text-gold">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

