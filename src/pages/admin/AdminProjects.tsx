import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, RefreshCw, X, Search, Briefcase } from 'lucide-react';
import { contentService } from '../../services/contentService';
import { ProjectItem } from '../../types';
import { ImageUploadField } from '../../components/admin/ImageUploadField';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [currentProject, setCurrentProject] = useState<Partial<ProjectItem>>({
    id: '',
    title: '',
    category: 'Residential Interiors',
    categorySlug: 'living',
    location: 'Hyderabad',
    description: '',
    coverImage: '',
    gallery: [],
    highlights: [],
  });

  const [highlightsInput, setHighlightsInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');

  const loadProjects = async () => {
    try {
      const data = await contentService.getProjects();
      setProjects(data);
      setFilteredProjects(data);
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProjects(projects);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredProjects(
        projects.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, projects]);

  const handleOpenAdd = () => {
    setCurrentProject({
      id: '',
      title: '',
      category: 'Residential Interiors',
      categorySlug: 'living',
      location: 'Jubilee Hills, Hyderabad',
      description: '',
      coverImage: '/assets/projects/proj_living_hd.jpg',
      gallery: [],
      highlights: [],
    });
    setHighlightsInput('');
    setGalleryInput('');
    setIsEditing(true);
  };

  const handleOpenEdit = (proj: ProjectItem) => {
    setCurrentProject(proj);
    setHighlightsInput(proj.highlights?.join('\n') || '');
    setGalleryInput(proj.gallery?.join('\n') || '');
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete project "${id}"?`)) return;

    try {
      await contentService.deleteProject(id);
      setMessage({ type: 'success', text: 'Project deleted successfully.' });
      loadProjects();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete project.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const slug =
        currentProject.id?.trim() ||
        currentProject.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
        'project-' + Date.now();

      const galleryImages = galleryInput
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const highlights = highlightsInput
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...currentProject,
        id: slug,
        gallery: galleryImages.length > 0 ? galleryImages : [currentProject.coverImage || ''],
        highlights,
      };

      await contentService.saveProject(payload);
      setMessage({ type: 'success', text: `Project "${payload.title}" saved successfully!` });
      setIsEditing(false);
      loadProjects();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save project.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center space-x-2 text-xs text-muted">
        <RefreshCw className="w-4 h-4 animate-spin text-gold" />
        <span>Loading portfolio projects...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-espresso">
            Portfolio Projects ({projects.length} Showcases)
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage high-definition architectural project galleries, locations, and design highlights.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-espresso hover:bg-espresso-light text-softwhite text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add Project</span>
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
          placeholder="Search projects by title, category, or location..."
          className="w-full bg-white border border-subtle focus:border-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-espresso focus:outline-none"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white border border-subtle/80 rounded-2xl p-5 hover:border-gold/50 transition-all shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start space-x-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-subtle shrink-0 bg-charcoal/10 relative">
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-semibold text-gold uppercase tracking-wider">
                    {proj.category}
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold text-espresso truncate">
                  {proj.title}
                </h3>
                <p className="text-[11px] text-muted">
                  📍 {proj.location}
                </p>
                <p className="text-xs text-muted line-clamp-2">
                  {proj.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-subtle/60 pt-3">
              <span className="text-[11px] text-muted">
                {proj.gallery?.length || 1} Gallery Photos
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="p-2 rounded-lg border border-subtle hover:border-gold text-espresso hover:bg-ivory transition-colors"
                  title="Edit Project"
                >
                  <Edit2 className="w-3.5 h-3.5 text-gold" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 rounded-lg border border-subtle hover:border-red-400 text-espresso hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-subtle pb-4">
              <h2 className="font-serif text-xl font-semibold text-espresso">
                {currentProject.id ? `Edit: ${currentProject.title}` : 'Add Portfolio Project'}
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
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProject.title}
                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                    placeholder="e.g. Modern Living Room"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    URL Identifier (ID)
                  </label>
                  <input
                    type="text"
                    value={currentProject.id}
                    onChange={(e) => setCurrentProject({ ...currentProject, id: e.target.value })}
                    placeholder="e.g. modern-living-room"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Category Label
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProject.category}
                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                    placeholder="e.g. Residential Interiors"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Category Filter Slug
                  </label>
                  <select
                    value={currentProject.categorySlug}
                    onChange={(e) => setCurrentProject({ ...currentProject, categorySlug: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  >
                    <option value="living">Living Rooms</option>
                    <option value="kitchen">Modular Kitchens</option>
                    <option value="bedroom">Bedrooms</option>
                    <option value="wardrobe">Wardrobes</option>
                    <option value="tv-unit">TV Units</option>
                    <option value="commercial">Commercial</option>
                    <option value="furniture">Custom Furniture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Project Location
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProject.location}
                    onChange={(e) => setCurrentProject({ ...currentProject, location: e.target.value })}
                    placeholder="e.g. Jubilee Hills, Hyderabad"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso mb-1">
                  Project Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  placeholder="Details of materials, false ceilings, modular fixtures..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                />
              </div>

              <ImageUploadField
                label="Cover Image (Primary HD Photo)"
                value={currentProject.coverImage || ''}
                onChange={(url) => setCurrentProject({ ...currentProject, coverImage: url })}
                folder="projects"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Key Highlights (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    placeholder="Bespoke Curved L-Sofa&#10;Fluted Charcoal Accents&#10;Integrated Acoustic Wall"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Gallery Image URLs (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    placeholder="https://...&#10;/assets/projects/proj_living_hd.jpg"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none font-mono text-[11px]"
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
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
