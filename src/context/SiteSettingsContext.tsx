import React, { createContext, useContext, useEffect, useState } from 'react';
import { siteConfig as defaultSiteConfig } from '../data/siteConfig';
import { contentService } from '../services/contentService';

export type SiteSettingsType = typeof defaultSiteConfig & {
  heroScriptText?: string;
  heroBadges?: Array<{ label: string; sub: string; icon: string }>;
};

interface SiteSettingsContextValue {
  settings: SiteSettingsType;
  loading: boolean;
  getWhatsAppUrl: (message?: string, number?: string) => string;
  refreshSettings: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  settings: defaultSiteConfig,
  loading: true,
  getWhatsAppUrl: () => '',
  refreshSettings: async () => {},
});

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettingsType>(defaultSiteConfig);
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    try {
      const data = await contentService.getSiteSettings();
      if (data) {
        setSettings((prev) => ({
          ...prev,
          ...data,
        }));
      }
    } catch (err) {
      console.warn('Failed to fetch dynamic site settings, falling back to local config:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();

    // Subscribe to Supabase Realtime changes for site_settings
    const unsubscribe = contentService.subscribeToTable('site_settings', () => {
      loadSettings();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getWhatsAppUrl = (message?: string, customNumber?: string) => {
    const rawNumber = customNumber || settings.whatsappNumber || defaultSiteConfig.whatsappNumber;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const defaultMsg =
      'Hello Aesthetic Interiors & Modular Factory, I would like to discuss an interior design project. Please contact me to arrange a consultation.';
    const text = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        loading,
        getWhatsAppUrl,
        refreshSettings: loadSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
