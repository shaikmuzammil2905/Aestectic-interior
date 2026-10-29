import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, RefreshCw, X, Star } from 'lucide-react';
import { contentService } from '../../services/contentService';
import { TestimonialItem } from '../../types';
import { ImageUploadField } from '../../components/admin/ImageUploadField';

export const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<TestimonialItem>>({
    name: '',
    location: 'Hyderabad',
    quote: '',
    rating: 5,
    projectType: 'Turnkey Residential Interior',
    avatar: '',
  });

  const loadTestimonials = async () => {
    try {
      const data = await contentService.getTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error('Error loading testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setCurrentTestimonial({
      name: '',
      location: 'Jubilee Hills, Hyderabad',
      quote: '',
      rating: 5,
      projectType: 'Turnkey Residential Interior',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (t: TestimonialItem) => {
    setCurrentTestimonial(t);
    setIsEditing(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm('Delete this client testimonial?')) return;

    try {
      await contentService.deleteTestimonial(id);
      setMessage({ type: 'success', text: 'Testimonial deleted successfully.' });
      loadTestimonials();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await contentService.saveTestimonial(currentTestimonial);
      setMessage({ type: 'success', text: 'Testimonial saved successfully!' });
      setIsEditing(false);
      loadTestimonials();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save testimonial.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center space-x-2 text-xs text-muted">
        <RefreshCw className="w-4 h-4 animate-spin text-gold" />
        <span>Loading testimonials...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-espresso">
            Client Testimonials ({testimonials.length})
          </h1>
          <p className="text-xs text-muted mt-1">
            Verified client reviews and feedback displayed on the home page trust section.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-espresso hover:bg-espresso-light text-softwhite text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add Testimonial</span>
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs hover:border-gold/50 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-1 text-gold">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-xs text-espresso/90 italic leading-relaxed">
                "{t.quote}"
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-subtle/60 pt-4">
              <div className="flex items-center space-x-3">
                {t.avatar && (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-subtle"
                  />
                )}
                <div>
                  <h4 className="text-xs font-semibold text-espresso">{t.name}</h4>
                  <p className="text-[10px] text-muted">{t.location} • {t.projectType}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-2 rounded-lg border border-subtle hover:border-gold text-espresso hover:bg-ivory transition-colors"
                  title="Edit Testimonial"
                >
                  <Edit2 className="w-3.5 h-3.5 text-gold" />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 rounded-lg border border-subtle hover:border-red-400 text-espresso hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete Testimonial"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-subtle pb-4">
              <h2 className="font-serif text-xl font-semibold text-espresso">
                {currentTestimonial.id ? 'Edit Testimonial' : 'Add Client Review'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-muted hover:text-espresso"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={currentTestimonial.name}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })}
                    placeholder="e.g. Dr. S. K. Reddy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={currentTestimonial.location}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, location: e.target.value })}
                    placeholder="e.g. Jubilee Hills, Hyderabad"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Project Type
                  </label>
                  <input
                    type="text"
                    value={currentTestimonial.projectType}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, projectType: e.target.value })}
                    placeholder="e.g. 4BHK Villa Turnkey Interior"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={currentTestimonial.rating || 5}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso mb-1">
                  Client Quote / Review
                </label>
                <textarea
                  required
                  rows={3}
                  value={currentTestimonial.quote}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, quote: e.target.value })}
                  placeholder="Review statement..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                />
              </div>

              <ImageUploadField
                label="Client Avatar Photo (Optional)"
                value={currentTestimonial.avatar || ''}
                onChange={(url) => setCurrentTestimonial({ ...currentTestimonial, avatar: url })}
                folder="avatars"
              />

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
                  {saving ? 'Saving...' : 'Save Review'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

