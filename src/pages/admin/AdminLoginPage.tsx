import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (isSignUpMode) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user && !data.session) {
          setSuccessMessage('Admin account created! If email confirmation is enabled, check your inbox to confirm.');
        } else {
          setSuccessMessage('Admin account created and logged in!');
          navigate('/admin');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          navigate('/admin');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/20 border border-gold/40 text-gold mb-2 shadow-lg shadow-black/40">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-softwhite tracking-tight">
            AESTHETIC INTERIORS
          </h1>
          <p className="text-[11px] font-sans font-medium tracking-[0.25em] text-gold uppercase">
            Administrative Portal & CMS
          </p>
        </div>

        {/* Card */}
        <div className="bg-charcoal-light/70 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-softwhite">
              {isSignUpMode ? 'Register Studio Admin' : 'Admin Sign In'}
            </h2>
            <span className="text-[11px] text-ivory/60">
              Supabase Auth
            </span>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-semibold text-ivory/80 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aestheticinteriors.com"
                  className="w-full bg-charcoal border border-white/15 focus:border-gold rounded-xl pl-10 pr-4 py-3 text-xs text-softwhite placeholder:text-ivory/30 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[11px] font-semibold text-ivory/80 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-charcoal border border-white/15 focus:border-gold rounded-xl pl-10 pr-4 py-3 text-xs text-softwhite placeholder:text-ivory/30 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
            >
              <span>{isLoading ? 'Processing...' : isSignUpMode ? 'Create Admin Account' : 'Authenticate & Enter'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Toggle Register / Login */}
          <div className="pt-2 text-center border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setIsSignUpMode(!isSignUpMode);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className="text-xs text-gold/90 hover:text-gold transition-colors font-medium"
            >
              {isSignUpMode
                ? 'Already have an admin account? Sign In'
                : 'First time setup? Create initial admin account'}
            </button>
          </div>

        </div>

        {/* Back to website */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-ivory/60 hover:text-softwhite transition-colors"
          >
            ← Back to Public Website
          </a>
        </div>

      </div>

    </div>
  );
};
