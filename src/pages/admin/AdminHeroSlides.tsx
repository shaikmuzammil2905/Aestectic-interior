import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, RefreshCw, X, Sliders, Eye } from 'lucide-react';
import { contentService, HeroSlideItem } from '../../services/contentService';
import { ImageUploadField } from '../../components/admin/ImageUploadField';

export const AdminHeroSlides: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlideItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [currentSlide, setCurrentSlide] = useState<Partial<HeroSlideItem>>({
    eyebrow: 'LUXURY MADE INTO REALITY',
    heading_line1: 'Thoughtfully Designed.',
    heading_line2: 'Beautifully Lived.',
    subtitle: 'We create bespoke interiors and premium modular spaces with in-house modular manufacturing, blending style, functionality and timeless elegance.',
    tags: 'Residential Interiors • Modular Kitchens • Custom Furniture',
    desktop_bg: '/assets/hero-desktop.png',
    mobile_bg: '/assets/hero-mobile.png',
    display_order: 0,
    is_published: true,
  });

  const loadSlides = async () => {
    try {
      const data = await contentService.getHeroSlides();
      setSlides(data);
    } catch (err) {
      console.error('Error loading hero slides:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const handleOpenAdd = () => {
    setCurrentSlide({
      eyebrow: 'LUXURY MADE INTO REALITY',
      heading_line1: '',
      heading_line2: '',
      subtitle: '',
      tags: 'Residential Interiors • Modular Kitchens • Custom Furniture',
      desktop_bg: '/assets/hero-desktop.png',
      mobile_bg: '/assets/hero-mobile.png',
      display_order: slides.length,
      is_published: true,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (slide: HeroSlideItem) => {
    setCurrentSlide(slide);
    setIsEditing(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this hero slide?')) return;

    try {
      await contentService.deleteHeroSlide(id);
      setMessage({ type: 'success', text: 'Slide deleted successfully.' });
      loadSlides();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete slide.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await contentService.saveHeroSlide(currentSlide);
      setMessage({ type: 'success', text: 'Hero slide saved successfully!' });
      setIsEditing(false);
      loadSlides();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save slide.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center space-x-2 text-xs text-muted">
        <RefreshCw className="w-4 h-4 animate-spin text-gold" />
        <span>Loading hero slides...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-espresso">
            Hero Section Slides & Visuals
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage carousel headlines, taglines, and animated desktop/mobile background visuals.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-espresso hover:bg-espresso-light text-softwhite text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add Hero Slide</span>
        </button>
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

      {/* Slide Cards */}
      <div className="grid grid-cols-1 gap-4">
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs hover:border-gold/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-start space-x-4 flex-1">
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-subtle shrink-0 bg-charcoal/10 relative">
                <img
                  src={slide.desktop_bg || '/assets/hero-desktop.png'}
                  alt="Desktop BG"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-charcoal/80 text-[9px] text-white px-1 rounded font-mono">
                  Slide {idx + 1}
                </span>
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <span className="text-[10px] font-semibold tracking-widest text-gold uppercase">
                  {slide.eyebrow}
                </span>
                <h3 className="font-serif text-lg font-semibold text-espresso leading-snug">
                  {slide.heading_line1} <span className="italic">{slide.heading_line2}</span>
                </h3>
                <p className="text-xs text-muted line-clamp-2">{slide.subtitle}</p>
                <div className="text-[11px] text-espresso/70 font-medium">
                  {slide.tags}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => handleOpenEdit(slide)}
                className="p-2.5 rounded-xl border border-subtle hover:border-gold/60 text-espresso hover:bg-ivory transition-colors"
                title="Edit Slide"
              >
                <Edit2 className="w-4 h-4 text-gold" />
              </button>
              <button
                onClick={() => handleDelete(slide.id)}
                className="p-2.5 rounded-xl border border-subtle hover:border-red-400 text-espresso hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Delete Slide"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Modal Editor */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-subtle pb-4">
              <h2 className="font-serif text-xl font-semibold text-espresso">
                {currentSlide.id ? 'Edit Hero Slide' : 'Create New Hero Slide'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-muted hover:text-espresso"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-espresso mb-1">
                  Eyebrow Label
                </label>
                <input
                  type="text"
                  required
                  value={currentSlide.eyebrow}
                  onChange={(e) => setCurrentSlide({ ...currentSlide, eyebrow: e.target.value })}
                  placeholder="LUXURY MADE INTO REALITY"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Headline Line 1
                  </label>
                  <input
                    type="text"
                    required
                    value={currentSlide.heading_line1}
                    onChange={(e) => setCurrentSlide({ ...currentSlide, heading_line1: e.target.value })}
                    placeholder="Thoughtfully Designed."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Headline Line 2 (Italic Accent)
                  </label>
                  <input
                    type="text"
                    required
                    value={currentSlide.heading_line2}
                    onChange={(e) => setCurrentSlide({ ...currentSlide, heading_line2: e.target.value })}
                    placeholder="Beautifully Lived."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none italic"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso mb-1">
                  Subtitle Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={currentSlide.subtitle}
                  onChange={(e) => setCurrentSlide({ ...currentSlide, subtitle: e.target.value })}
                  placeholder="We create bespoke interiors and premium modular spaces..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso mb-1">
                  Bullet Tags / Accents
                </label>
                <input
                  type="text"
                  value={currentSlide.tags}
                  onChange={(e) => setCurrentSlide({ ...currentSlide, tags: e.target.value })}
                  placeholder="Residential Interiors • Modular Kitchens • Custom Furniture"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <ImageUploadField
                  label="Desktop Background Image"
                  value={currentSlide.desktop_bg || ''}
                  onChange={(url) => setCurrentSlide({ ...currentSlide, desktop_bg: url })}
                  helperText="Default: /assets/hero-desktop.png"
                  folder="hero"
                />

                <ImageUploadField
                  label="Mobile Background Image"
                  value={currentSlide.mobile_bg || ''}
                  onChange={(url) => setCurrentSlide({ ...currentSlide, mobile_bg: url })}
                  helperText="Default: /assets/hero-mobile.png"
                  folder="hero"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-subtle">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl border border-subtle text-xs font-medium text-espresso hover:bg-ivory"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save Slide'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
