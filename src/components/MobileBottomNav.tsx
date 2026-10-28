import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutGrid, 
  FolderKanban, 
  Sparkles, 
  User 
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-softwhite border-t border-subtle/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-around backdrop-blur-md bg-softwhite/95">
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
  );
};
