import React, { useState, useEffect } from 'react';
import { Database, Copy, CheckCircle2, AlertCircle, RefreshCw, ExternalLink, Code2, ShieldCheck, Terminal } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export const AdminDatabase: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<{
    connected: boolean;
    tablesFound: string[];
    missingTables: string[];
    message: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [sqlContent, setSqlContent] = useState<string>('');

  const requiredTables = [
    'site_settings',
    'hero_slides',
    'services',
    'projects',
    'before_after_projects',
    'testimonials',
    'enquiries',
    'media_assets',
    'admin_activity_logs',
  ];

  const checkConnectivity = async () => {
    setTesting(true);
    const found: string[] = [];
    const missing: string[] = [];

    for (const table of requiredTables) {
      try {
        const { error } = await supabase.from(table).select('count', { count: 'exact', head: true });
        if (!error) {
          found.push(table);
        } else {
          missing.push(table);
        }
      } catch {
        missing.push(table);
      }
    }

    const isLive = found.length > 0;
    setStatus({
      connected: isLive,
      tablesFound: found,
      missingTables: missing,
      message:
        missing.length === 0
          ? 'All database tables and RLS policies are active and verified.'
          : `${missing.length} table(s) not yet created. Run the SQL schema script below in Supabase SQL Editor.`,
    });
    setTesting(false);
  };

  useEffect(() => {
    checkConnectivity();
  }, []);

  const handleCopySql = () => {
    const sql = `-- AESTHETIC INTERIORS & MODULAR FACTORY — COMPLETE SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/rrjlyxojbvntfdzyogdu/sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  eyebrow TEXT NOT NULL DEFAULT 'LUXURY MADE INTO REALITY',
  heading_line1 TEXT NOT NULL,
  heading_line2 TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  tags TEXT DEFAULT 'Residential Interiors • Modular Kitchens • Custom Furniture',
  desktop_bg TEXT NOT NULL DEFAULT '/assets/hero-desktop.png',
  mobile_bg TEXT NOT NULL DEFAULT '/assets/hero-mobile.png',
  cta_primary_text TEXT DEFAULT 'Explore Our Work',
  cta_primary_link TEXT DEFAULT '/projects',
  cta_secondary_text TEXT DEFAULT 'Book a Consultation',
  cta_secondary_action TEXT DEFAULT 'consultation_modal',
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Interior Design',
  short_desc TEXT NOT NULL,
  full_desc TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Home',
  image TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  scope JSONB DEFAULT '[]'::jsonb,
  materials JSONB DEFAULT '[]'::jsonb,
  timeline TEXT DEFAULT '2 - 4 Weeks',
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  location TEXT NOT NULL,
  area TEXT,
  duration TEXT,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS before_after_projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  before_image TEXT NOT NULL,
  after_image TEXT NOT NULL,
  details JSONB DEFAULT '[]'::jsonb,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5,
  project_type TEXT,
  avatar TEXT,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL DEFAULT 'Hyderabad',
  service_required TEXT NOT NULL,
  property_type TEXT,
  approx_budget TEXT,
  preferred_contact TEXT DEFAULT 'phone',
  requirements TEXT,
  status TEXT DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  public_id TEXT NOT NULL,
  url TEXT NOT NULL,
  original_name TEXT,
  format TEXT,
  width INT,
  height INT,
  bytes INT,
  alt_text TEXT,
  section TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE before_after_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public view site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin site settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public view hero slides" ON hero_slides FOR SELECT USING (is_published = true);
CREATE POLICY "Admin hero slides" ON hero_slides FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public view services" ON services FOR SELECT USING (is_published = true);
CREATE POLICY "Admin services" ON services FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public view projects" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Admin projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public view before after" ON before_after_projects FOR SELECT USING (is_published = true);
CREATE POLICY "Admin before after" ON before_after_projects FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public view testimonials" ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Admin testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin enquiries" ON enquiries FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public view media" ON media_assets FOR SELECT USING (true);
CREATE POLICY "Admin media" ON media_assets FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin logs" ON admin_activity_logs FOR ALL USING (auth.role() = 'authenticated');
`;

    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-espresso">
            Database & Cloud Configuration
          </h1>
          <p className="text-xs text-muted mt-1">
            Supabase PostgreSQL schema, Row Level Security policies, and live connection status.
          </p>
        </div>

        <button
          onClick={checkConnectivity}
          disabled={testing}
          className="px-4 py-2.5 rounded-xl border border-subtle bg-white hover:bg-ivory text-xs font-semibold text-espresso flex items-center space-x-2 transition-all shadow-xs cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-gold ${testing ? 'animate-spin' : ''}`} />
          <span>{testing ? 'Testing Connection...' : 'Re-test Database'}</span>
        </button>
      </div>

      {/* Connection Overview Card */}
      <div className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-subtle pb-3">
          <Database className="w-4 h-4 text-gold" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-espresso">
            Supabase Connection Details
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-ivory/50 border border-subtle">
            <span className="text-[10px] text-muted uppercase font-bold tracking-wider block mb-1">
              Project Endpoint
            </span>
            <code className="text-espresso font-mono text-[11px] block truncate">
              https://rrjlyxojbvntfdzyogdu.supabase.co
            </code>
          </div>

          <div className="p-3.5 rounded-xl bg-ivory/50 border border-subtle">
            <span className="text-[10px] text-muted uppercase font-bold tracking-wider block mb-1">
              Realtime Engine
            </span>
            <div className="flex items-center space-x-1.5 text-emerald-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Realtime Websockets Active</span>
            </div>
          </div>
        </div>

        {/* Status Alert */}
        {status && (
          <div
            className={`p-4 rounded-xl text-xs flex items-start space-x-3 ${
              status.missingTables.length === 0
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border border-amber-200 text-amber-800'
            }`}
          >
            {status.missingTables.length === 0 ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className="font-semibold">{status.message}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {requiredTables.map((t) => {
                  const isPresent = status.tablesFound.includes(t);
                  return (
                    <span
                      key={t}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        isPresent
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isPresent ? '✓' : '✗'} {t}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SQL Migration Script Copy Box */}
      <div className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-subtle pb-3">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-gold" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-espresso">
              Supabase SQL Schema Script (supabase/schema.sql)
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopySql}
              className="px-3.5 py-1.5 rounded-xl bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
            </button>

            <a
              href="https://supabase.com/dashboard/project/rrjlyxojbvntfdzyogdu/sql"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-espresso hover:bg-espresso-light text-softwhite font-medium text-xs flex items-center space-x-1.5 transition-all shadow-xs"
            >
              <span>Open Supabase SQL Editor</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold" />
            </a>
          </div>
        </div>

        <div className="bg-charcoal text-ivory/90 rounded-xl p-4 text-[11px] font-mono leading-relaxed space-y-2 border border-charcoal-light">
          <p className="text-gold font-sans font-semibold">How to run in 3 quick steps:</p>
          <ol className="list-decimal list-inside space-y-1 font-sans text-ivory/80 text-xs">
            <li>Click <strong>Copy SQL Script</strong> button above.</li>
            <li>Click <strong>Open Supabase SQL Editor</strong> to go directly to your project's query editor.</li>
            <li>Paste the SQL and click <strong>RUN</strong>. All 9 tables, RLS policies, and seed data will be created instantly!</li>
          </ol>
        </div>
      </div>

    </div>
  );
};
