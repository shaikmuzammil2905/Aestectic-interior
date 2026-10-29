import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, RefreshCw, X, Sparkles } from 'lucide-react';
import { contentService } from '../../services/contentService';
import { BeforeAfterItem } from '../../types';
import { ImageUploadField } from '../../components/admin/ImageUploadField';

export const AdminBeforeAfter: React.FC = () => {
  const [items, setItems] = useState<BeforeAfterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [currentItem, setCurrentItem] = useState<Partial<BeforeAfterItem>>({
    id: '',
    title: '',
    category: 'Living Room',
    description: '',
    beforeImage: '/assets/transformation_before_hd.jpg',
    afterImage: '/assets/transformation_after_hd.jpg',
    details: [],
  });

  const [detailsInput, setDetailsInput] = useState('');

  const loadItems = async () => {
    try {
      const data = await contentService.getBeforeAfter();
      setItems(data);
    } catch (err) {
      console.error('Error loading before/after items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleOpenAdd = () => {
    setCurrentItem({
      id: '',
      title: '',
      category: 'Living Room',
      description: '',
      beforeImage: '/assets/transformation_before_hd.jpg',
      afterImage: '/assets/transformation_after_hd.jpg',
      details: [],
    });
    setDetailsInput('');
    setIsEditing(true);
  };

  const handleOpenEdit = (item: BeforeAfterItem) => {
    setCurrentItem(item);
    setDetailsInput(item.details?.join('\n') || '');
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete "${id}"?`)) return;

    try {
      await contentService.deleteBeforeAfter(id);
      setMessage({ type: 'success', text: 'Item deleted successfully.' });
      loadItems();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete transformation.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const slug =
        currentItem.id?.trim() ||
        currentItem.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
        'transformation-' + Date.now();

      const details = detailsInput
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...currentItem,
        id: slug,
        details,
      };

      await contentService.saveBeforeAfter(payload);
      setMessage({ type: 'success', text: `Transformation "${payload.title}" saved successfully!` });
      setIsEditing(false);
      loadItems();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save transformation.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center space-x-2 text-xs text-muted">
        <RefreshCw className="w-4 h-4 animate-spin text-gold" />
        <span>Loading before & after transformations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-espresso">
            Before & After Transformations ({items.length})
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage interactive split-slider comparisons with custom before/after photographs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-espresso hover:bg-espresso-light text-softwhite text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add Transformation</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-subtle/80 rounded-2xl p-5 hover:border-gold/50 transition-all shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Before
                  </span>
                  <div className="h-32 rounded-xl overflow-hidden border border-subtle bg-charcoal/10">
                    <img
                      src={item.beforeImage}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                    After
                  </span>
                  <div className="h-32 rounded-xl overflow-hidden border border-gold/40 bg-charcoal/10">
                    <img
                      src={item.afterImage}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-semibold text-gold uppercase tracking-wider">
                {item.category}
              </span>
              <h3 className="font-serif text-base font-semibold text-espresso">
                {item.title}
              </h3>
              <p className="text-xs text-muted mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-subtle/60 pt-3">
              <span className="text-[11px] text-muted">
                {item.details?.length || 0} Transformation Steps
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-lg border border-subtle hover:border-gold text-espresso hover:bg-ivory transition-colors"
                  title="Edit Transformation"
                >
                  <Edit2 className="w-3.5 h-3.5 text-gold" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg border border-subtle hover:border-red-400 text-espresso hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete Transformation"
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
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-subtle pb-4">
              <h2 className="font-serif text-xl font-semibold text-espresso">
                {currentItem.id ? `Edit: ${currentItem.title}` : 'Add Transformation Comparison'}
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
                    Transformation Title
                  </label>
                  <input
                    type="text"
                    required
                    value={currentItem.title}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    placeholder="e.g. Modern Living Room Transformation"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={currentItem.category}
                    onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                    placeholder="e.g. Living Room, Modular Kitchen, Master Bedroom"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={2}
                  value={currentItem.description}
                  onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                  placeholder="Transforming an unadorned, flat room into an opulent living lounge..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageUploadField
                  label="Before Image"
                  value={currentItem.beforeImage || ''}
                  onChange={(url) => setCurrentItem({ ...currentItem, beforeImage: url })}
                  folder="before_after"
                />

                <ImageUploadField
                  label="After Image"
                  value={currentItem.afterImage || ''}
                  onChange={(url) => setCurrentItem({ ...currentItem, afterImage: url })}
                  folder="before_after"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso mb-1">
                  Key Transformation Details (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={detailsInput}
                  onChange={(e) => setDetailsInput(e.target.value)}
                  placeholder="Installed tiered false ceiling with warm indirect 3000K cove LEDs&#10;Engineered acoustic wall panels with brushed gold trims"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
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
                  {saving ? 'Saving...' : 'Save Transformation'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
