import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, RefreshCw, X, Search, Layers } from 'lucide-react';
import { contentService } from '../../services/contentService';
import { ServiceItem } from '../../types';
import { ImageUploadField } from '../../components/admin/ImageUploadField';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [currentService, setCurrentService] = useState<Partial<ServiceItem> & { category?: string }>({
    id: '',
    title: '',
    category: 'Interior Design',
    shortDesc: '',
    fullDesc: '',
    icon: 'Home',
    image: '',
    features: [],
    scope: [],
    materials: [],
    timeline: '2 - 4 Weeks',
  });

  const [featuresInput, setFeaturesInput] = useState('');
  const [scopeInput, setScopeInput] = useState('');
  const [materialsInput, setMaterialsInput] = useState('');

  const loadServices = async () => {
    try {
      const data = await contentService.getServices();
      setServices(data);
      setFilteredServices(data);
    } catch (err) {
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredServices(services);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredServices(
        services.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.shortDesc.toLowerCase().includes(q) ||
            s.id.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, services]);

  const handleOpenAdd = () => {
    setCurrentService({
      id: '',
      title: '',
      category: 'Interior Design',
      shortDesc: '',
      fullDesc: '',
      icon: 'Home',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      features: [],
      scope: [],
      materials: [],
      timeline: '2 - 4 Weeks',
    });
    setFeaturesInput('');
    setScopeInput('');
    setMaterialsInput('');
    setIsEditing(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setCurrentService(srv);
    setFeaturesInput(srv.features?.join('\n') || '');
    setScopeInput(srv.scope?.join('\n') || '');
    setMaterialsInput(srv.materials?.join('\n') || '');
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete service "${id}"?`)) return;

    try {
      await contentService.deleteService(id);
      setMessage({ type: 'success', text: 'Service deleted successfully.' });
      loadServices();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete service.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const slug =
        currentService.id?.trim() ||
        currentService.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
        'service-' + Date.now();

      const payload = {
        ...currentService,
        id: slug,
        features: featuresInput.split('\n').map((s) => s.trim()).filter(Boolean),
        scope: scopeInput.split('\n').map((s) => s.trim()).filter(Boolean),
        materials: materialsInput.split('\n').map((s) => s.trim()).filter(Boolean),
      };

      await contentService.saveService(payload);
      setMessage({ type: 'success', text: `Service "${payload.title}" saved successfully!` });
      setIsEditing(false);
      loadServices();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save service.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center space-x-2 text-xs text-muted">
        <RefreshCw className="w-4 h-4 animate-spin text-gold" />
        <span>Loading services catalog...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-espresso">
            Services Catalog ({services.length} Services)
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage comprehensive interior design, modular kitchen, and custom manufacturing offerings.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-espresso hover:bg-espresso-light text-softwhite text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add New Service</span>
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

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services by title or description..."
          className="w-full bg-white border border-subtle focus:border-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-espresso focus:outline-none"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className="bg-white border border-subtle/80 rounded-2xl p-5 hover:border-gold/50 transition-all shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-subtle shrink-0 bg-charcoal/10 relative">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-muted truncate">
                    /{srv.id}
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold text-espresso truncate">
                  {srv.title}
                </h3>
                <p className="text-xs text-muted line-clamp-2">
                  {srv.shortDesc}
                </p>
                <div className="text-[11px] text-gold-dark font-medium">
                  {srv.timeline}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-subtle/60 pt-3">
              <span className="text-[11px] text-muted">
                {srv.features?.length || 0} Key Features Listed
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="p-2 rounded-lg border border-subtle hover:border-gold text-espresso hover:bg-ivory transition-colors"
                  title="Edit Service"
                >
                  <Edit2 className="w-3.5 h-3.5 text-gold" />
                </button>
                <button
                  onClick={() => handleDelete(srv.id)}
                  className="p-2 rounded-lg border border-subtle hover:border-red-400 text-espresso hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete Service"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-subtle pb-4">
              <h2 className="font-serif text-xl font-semibold text-espresso">
                {currentService.id ? `Edit: ${currentService.title}` : 'Add New Interior Service'}
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
                    Service Title
                  </label>
                  <input
                    type="text"
                    required
                    value={currentService.title}
                    onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                    placeholder="e.g. Modular Kitchen Design"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    URL Slug / Identifier
                  </label>
                  <input
                    type="text"
                    value={currentService.id}
                    onChange={(e) => setCurrentService({ ...currentService, id: e.target.value })}
                    placeholder="e.g. modular-kitchen-design"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso mb-1">
                  Short Summary (Shown on Cards)
                </label>
                <input
                  type="text"
                  required
                  value={currentService.shortDesc}
                  onChange={(e) => setCurrentService({ ...currentService, shortDesc: e.target.value })}
                  placeholder="Concise overview of what is offered..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso mb-1">
                  Comprehensive Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={currentService.fullDesc}
                  onChange={(e) => setCurrentService({ ...currentService, fullDesc: e.target.value })}
                  placeholder="Detailed architectural and manufacturing details..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Lucide Icon Name
                  </label>
                  <input
                    type="text"
                    value={currentService.icon}
                    onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
                    placeholder="Home, UtensilsCrossed, Layers, BedDouble, Sofa, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Timeline Estimate
                  </label>
                  <input
                    type="text"
                    value={currentService.timeline}
                    onChange={(e) => setCurrentService({ ...currentService, timeline: e.target.value })}
                    placeholder="e.g. 2 - 4 Weeks Manufacturing"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Primary Service Showcase Image"
                value={currentService.image || ''}
                onChange={(url) => setCurrentService({ ...currentService, image: url })}
                folder="services"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Key Features (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Scope of Work (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={scopeInput}
                    onChange={(e) => setScopeInput(e.target.value)}
                    placeholder="Scope 1&#10;Scope 2"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Materials (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={materialsInput}
                    onChange={(e) => setMaterialsInput(e.target.value)}
                    placeholder="Material 1&#10;Material 2"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>
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
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

