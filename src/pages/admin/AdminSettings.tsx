import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Building2, Phone, MapPin } from 'lucide-react';
import { contentService } from '../../services/contentService';

export const AdminSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    businessName: 'Aesthetic Interiors & Modular Factory',
    brandWordmark: 'AESTHETIC INTERIORS',
    brandDescriptor: '& MODULAR FACTORY',
    tagline: 'Luxury Made Into Reality',
    experienceYears: 8,
    officeAddress: 'Sultanpur, Mallapur, Hyderabad, Telangana – 500005, India',
    serviceArea: 'Telangana',
    primaryPhone: '+918712376914',
    primaryPhoneDisplay: '+91 8712376914',
    secondaryPhone: '+919703297187',
    secondaryPhoneDisplay: '+91 9703297187',
    whatsappNumber: '918712376914',
    whatsappSecondary: '919703297187',
    brandPhilosophy: 'Clear communication, thoughtful planning, customized designs, consistent quality, and a smooth, stress-free customer experience.',
    heroScriptText: 'Your Dream Our Design',
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await contentService.getSiteSettings();
        if (data) {
          setFormData((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await contentService.updateSiteSettings(formData);
      setMessage({ type: 'success', text: 'Site settings updated successfully in Supabase and live across the website!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center space-x-2 text-xs text-muted">
        <RefreshCw className="w-4 h-4 animate-spin text-gold" />
        <span>Loading studio settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-espresso">
            Brand & Contact Settings
          </h1>
          <p className="text-xs text-muted mt-1">
            Configure core identity, phone numbers, Hyderabad address, and hero badges.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center space-x-2.5 ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Business Identity */}
        <div className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-subtle pb-3">
            <Building2 className="w-4 h-4 text-gold" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-espresso">
              1. Business Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Full Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Logo Wordmark
              </label>
              <input
                type="text"
                name="brandWordmark"
                value={formData.brandWordmark}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Logo Descriptor
              </label>
              <input
                type="text"
                name="brandDescriptor"
                value={formData.brandDescriptor}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Service Area
              </label>
              <input
                type="text"
                name="serviceArea"
                value={formData.serviceArea}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-espresso mb-1">
              Brand Philosophy & Statement
            </label>
            <textarea
              name="brandPhilosophy"
              rows={2}
              value={formData.brandPhilosophy}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        {/* Section 2: Contact Numbers & WhatsApp */}
        <div className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-subtle pb-3">
            <Phone className="w-4 h-4 text-gold" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-espresso">
              2. Phone & WhatsApp Coordination
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Primary Phone (Display)
              </label>
              <input
                type="text"
                name="primaryPhoneDisplay"
                value={formData.primaryPhoneDisplay}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Secondary Phone (Display)
              </label>
              <input
                type="text"
                name="secondaryPhoneDisplay"
                value={formData.secondaryPhoneDisplay}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Primary WhatsApp Number (No spaces or '+', e.g. 918712376914)
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Secondary WhatsApp Number
              </label>
              <input
                type="text"
                name="whatsappSecondary"
                value={formData.whatsappSecondary}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Physical Address */}
        <div className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-subtle pb-3">
            <MapPin className="w-4 h-4 text-gold" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-espresso">
              3. Studio Office Address
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-espresso mb-1">
              Registered Office Address
            </label>
            <input
              type="text"
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        {/* Section 4: Hero Aesthetic Accents */}
        <div className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-subtle pb-3">
            <Sparkles className="w-4 h-4 text-gold" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-espresso">
              4. Hero Aesthetic Accents (Cursive Calligraphy & Badges)
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-espresso mb-1">
              Hero Section Cursive Text (Shown on Hero Background)
            </label>
            <input
              type="text"
              name="heroScriptText"
              value={formData.heroScriptText}
              onChange={handleChange}
              placeholder="Your Dream Our Design"
              className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso font-serif italic text-base focus:border-gold focus:outline-none"
            />
            <p className="text-[11px] text-muted mt-1">
              Displays as the elegant cursive signature overlay over the hero coffee table.
            </p>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 bg-charcoal/90 backdrop-blur-md text-softwhite p-4 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between">
          <span className="text-xs text-ivory/80 font-medium">
            Changes are saved to Supabase and update the website live.
          </span>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
