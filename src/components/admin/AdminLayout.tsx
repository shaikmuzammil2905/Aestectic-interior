import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sliders, 
  Layers, 
  Briefcase, 
  Sparkles, 
  MessageSquare, 
  Settings, 
  Database, 
  ExternalLink, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDbConfigured = isSupabaseConfigured();

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
    { label: 'Hero Slides', path: '/admin/hero', icon: Sliders },
    { label: 'Services (14)', path: '/admin/services', icon: Layers },
    { label: 'Projects Showcase', path: '/admin/projects', icon: Briefcase },
    { label: 'Before & After', path: '/admin/before-after', icon: Sparkles },
    { label: 'Enquiries / Leads', path: '/admin/enquiries', icon: MessageSquare },
    { label: 'Testimonials', path: '/admin/testimonials', icon: ShieldCheck },
    { label: 'Database & SQL', path: '/admin/database', icon: Database },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-sand/30 flex text-espresso font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-charcoal text-softwhite border-r border-charcoal-light shadow-xl shrink-0 select-none">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-charcoal-light flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-serif font-bold text-base">
            AI
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-softwhite">
              Aesthetic Interiors
            </h1>
            <p className="text-[10px] text-gold tracking-widest uppercase font-medium">
              Admin CMS • Studio Panel
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gold text-charcoal font-semibold shadow-md'
                    : 'text-ivory/80 hover:text-softwhite hover:bg-charcoal-light/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-charcoal' : 'text-gold'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Connection Status */}
        <div className="p-4 mx-4 mb-4 rounded-xl bg-charcoal-light/40 border border-charcoal-light/60 text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-muted">
            <span>Database:</span>
            <span className="flex items-center space-x-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Supabase Live</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-muted">
            <span>Media:</span>
            <span className="flex items-center space-x-1 text-gold font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Cloudinary</span>
            </span>
          </div>
        </div>

        {/* User profile & Actions */}
        <div className="p-4 border-t border-charcoal-light flex flex-col space-y-2">
          <div className="text-[11px] text-ivory/60 truncate px-2">
            Logged in: <strong className="text-softwhite">{user?.email || 'Admin'}</strong>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg bg-charcoal-light hover:bg-charcoal-light/80 text-[11px] font-medium text-ivory transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gold" />
              <span>View Site</span>
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-[11px] font-medium text-red-300 border border-red-800/40 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-subtle/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-espresso hover:bg-ivory"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-espresso-dark">
                Aesthetic Interiors CMS
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-subtle hover:border-gold/60 text-xs font-medium text-espresso bg-ivory/50 transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3 text-gold" />
            </a>
          </div>
        </header>

        {/* Dynamic Nested Route Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-charcoal/70 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative w-72 bg-charcoal text-softwhite flex flex-col h-full z-10 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-charcoal-light">
              <div className="text-xs font-bold tracking-widest uppercase text-softwhite">
                Admin Panel
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-ivory/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                      isActive
                        ? 'bg-gold text-charcoal font-semibold'
                        : 'text-ivory/80 hover:bg-charcoal-light'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-gold" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-xl bg-red-900/40 text-red-300 text-xs font-medium flex items-center justify-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
