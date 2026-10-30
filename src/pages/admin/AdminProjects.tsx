import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  X, 
  Search, 
  Briefcase, 
  Image as ImageIcon,
  Eye,
  EyeOff,
  Star,
  FolderOpen
} from 'lucide-react';
import { contentService } from '../../services/contentService';
import { ProjectItem } from '../../types';
import { ImageUploadField } from '../../components/admin/ImageUploadField';
import { MediaLibraryModal } from '../../components/admin/MediaLibraryModal';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [currentProject, setCurrentProject] = useState<Partial<ProjectItem> & { is_published?: boolean; is_featured?: boolean; display_order?: number }>({
    id: '',
    title: '',
    category: 'Residential Interiors',
    categorySlug: 'living',
    location: 'Hyderabad',
    description: '',
    coverImage: '',
    gallery: [],
    highlights: [],
    is_featured: true,
    is_published: true,
    display_order: 0,
  });

  const [highlightsInput, setHighlightsInput] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isGalleryLibraryOpen, setIsGalleryLibraryOpen] = useState(false);
  const [replacingGalleryIndex, setReplacingGalleryIndex] = useState<number | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await contentService.getProjects(true); // include drafts for admin
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
      gallery: ['/assets/projects/proj_living_hd.jpg'],
      highlights: [],
      is_featured: true,
      is_published: true,
      display_order: projects.length,
    });
    setHighlightsInput('');
    setGalleryImages(['/assets/projects/proj_living_hd.jpg']);
    setIsEditing(true);
  };

  const handleOpenEdit = (proj: ProjectItem) => {
    setCurrentProject(proj);
    setHighlightsInput(proj.highlights?.join('\n') || '');
    setGalleryImages(proj.gallery && proj.gallery.length > 0 ? proj.gallery : [proj.coverImage]);
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

  const handleTogglePublish = async (proj: ProjectItem) => {
    try {
      const newStatus = !(proj.is_published ?? true);
      await contentService.saveProject({
        ...proj,
        is_published: newStatus,
      });
      setMessage({
        type: 'success',
        text: `Project "${proj.title}" is now ${newStatus ? 'Published Live' : 'Saved as Draft'}.`,
      });
      loadProjects();
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to update publication status: ' + err.message });
    }
  };

  const handleToggleFeatured = async (proj: ProjectItem) => {
    try {
      const newFeatured = !(proj.is_featured ?? false);
      await contentService.saveProject({
        ...proj,
        is_featured: newFeatured,
      });
      setMessage({
        type: 'success',
        text: `Project "${proj.title}" ${newFeatured ? 'marked as Featured Showcase' : 'unmarked from Featured'}.`,
      });
      loadProjects();
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to update featured flag: ' + err.message });
    }
  };

  const handleAddGalleryImage = (url: string) => {
    if (replacingGalleryIndex !== null) {
      setGalleryImages((prev) => {
        const copy = [...prev];
        copy[replacingGalleryIndex] = url;
        return copy;
      });
      setReplacingGalleryIndex(null);
    } else {
      setGalleryImages((prev) => [...prev, url]);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    if (galleryImages.length <= 1) {
      alert('A project must have at least one image in its gallery.');
      return;
    }
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
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

      const highlights = highlightsInput
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...currentProject,
        id: slug,
        gallery: galleryImages.length > 0 ? galleryImages : [currentProject.coverImage || ''],
        highlights,
        is_published: currentProject.is_published ?? true,
        is_featured: currentProject.is_featured ?? true,
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
        <span>Loading projects catalog...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-espresso">
            Portfolio & Projects Management ({projects.length})
          </h1>
          <p className="text-xs text-muted mt-1">
            Publish completed luxury villas, modular kitchens, wardrobes, and commercial fit-outs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
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

      {/* Search Bar */}
      <div className="bg-softwhite rounded-2xl p-4 border border-subtle flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title, category, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-ivory border border-subtle rounded-xl text-xs text-espresso focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((proj) => {
          const isPub = proj.is_published ?? true;
          const isFeat = proj.is_featured ?? false;

          return (
            <div
              key={proj.id}
              className="bg-softwhite border border-subtle/80 rounded-2xl p-5 hover:border-gold/50 transition-all shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start space-x-4">
                <div className="w-28 h-24 rounded-2xl overflow-hidden border border-subtle shrink-0 bg-charcoal/10 relative">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  {isFeat && (
                    <span className="absolute top-1.5 left-1.5 p-1 rounded-md bg-gold text-charcoal shadow-xs" title="Featured Project">
                      <Star className="w-3 h-3 fill-current" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
                      {proj.category}
                    </span>

                    {/* Publish / Draft status toggle */}
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                        isPub
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                      title="Click to toggle publish status"
                    >
                      {isPub ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3 text-amber-600" />}
                      <span>{isPub ? 'Published' : 'Draft'}</span>
                    </button>
                  </div>

                  <h3 className="font-serif text-base font-bold text-espresso truncate">
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

              <div className="flex items-center justify-between border-t border-subtle/60 pt-3 text-xs">
                <div className="flex items-center space-x-2 text-[11px] text-muted">
                  <span>{proj.gallery?.length || 1} Photo{(proj.gallery?.length || 1) !== 1 ? 's' : ''}</span>
                  <span>•</span>
                  <button
                    onClick={() => handleToggleFeatured(proj)}
                    className={`hover:underline cursor-pointer ${isFeat ? 'text-gold font-bold' : 'text-muted'}`}
                  >
                    {isFeat ? '★ Featured on Home' : '☆ Make Featured'}
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    className="p-2 rounded-xl border border-subtle hover:border-gold text-espresso hover:bg-ivory transition-colors cursor-pointer"
                    title="Edit Project Details & Gallery"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-gold" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="p-2 rounded-xl border border-subtle hover:border-red-400 text-espresso hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-softwhite rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto border border-subtle">
            
            <div className="flex items-center justify-between border-b border-subtle pb-4">
              <h2 className="font-serif text-xl font-bold text-espresso">
                {currentProject.id ? `Edit: ${currentProject.title}` : 'Add New Portfolio Project'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-full text-muted hover:text-espresso hover:bg-ivory cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              
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
                    Slug / URL Identifier
                  </label>
                  <input
                    type="text"
                    value={currentProject.id}
                    onChange={(e) => setCurrentProject({ ...currentProject, id: e.target.value })}
                    placeholder="e.g. modern-living-room"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-espresso mb-1">
                    Category Name
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
                    Filter Category
                  </label>
                  <select
                    value={currentProject.categorySlug}
                    onChange={(e) => setCurrentProject({ ...currentProject, categorySlug: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none cursor-pointer"
                  >
                    <option value="living">Living Rooms</option>
                    <option value="kitchen">Modular Kitchens</option>
                    <option value="bedroom">Bedrooms</option>
                    <option value="wardrobe">Wardrobes & Storage</option>
                    <option value="tv-unit">TV Units & Consoles</option>
                    <option value="commercial">Commercial Workspaces</option>
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
                  Design Narrative & Project Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  placeholder="Details of materials, acoustic panels, modular joinery, lighting..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                />
              </div>

              {/* Cover Image Upload */}
              <ImageUploadField
                label="Primary Cover Image (Hero Showcase)"
                value={currentProject.coverImage || ''}
                onChange={(url) => {
                  setCurrentProject({ ...currentProject, coverImage: url });
                  // also add to gallery if not present
                  if (!galleryImages.includes(url)) {
                    setGalleryImages((prev) => [url, ...prev]);
                  }
                }}
                folder="projects"
                section="projects"
                helperText="This image is displayed on the main portfolio grid and as the project hero header."
              />

              {/* Interactive Multi-Image Gallery Manager */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-semibold text-espresso uppercase tracking-wider">
                      Project Photo Gallery ({galleryImages.length} Photos)
                    </label>
                    <p className="text-[11px] text-muted">
                      Add, replace, or remove individual angle shots and architectural closeups.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setReplacingGalleryIndex(null);
                      setIsGalleryLibraryOpen(true);
                    }}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-espresso hover:bg-espresso-light text-softwhite text-xs font-medium cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-gold" />
                    <span>Add Photo</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-ivory-50 p-4 rounded-2xl border border-subtle">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-charcoal/10 border border-subtle">
                      <img
                        src={img}
                        alt={`Gallery photo ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setReplacingGalleryIndex(idx);
                            setIsGalleryLibraryOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-gold text-charcoal hover:bg-gold-light text-xs font-bold"
                          title="Replace Photo"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 text-xs"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-charcoal/80 text-[10px] text-white font-mono">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-xs font-semibold text-espresso mb-1">
                  Key Specifications & Highlights (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  placeholder="Bespoke Curved L-Sofa&#10;Fluted Charcoal Accents&#10;Integrated Acoustic Wall&#10;Concealed Kick Lights"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:border-gold focus:outline-none"
                />
              </div>

              {/* Publishing Options */}
              <div className="p-4 rounded-2xl bg-ivory border border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentProject.is_published ?? true}
                      onChange={(e) => setCurrentProject({ ...currentProject, is_published: e.target.checked })}
                      className="w-4 h-4 text-gold rounded border-subtle focus:ring-gold"
                    />
                    <span className="text-xs font-semibold text-espresso">
                      Publish to Live Website
                    </span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentProject.is_featured ?? true}
                      onChange={(e) => setCurrentProject({ ...currentProject, is_featured: e.target.checked })}
                      className="w-4 h-4 text-gold rounded border-subtle focus:ring-gold"
                    />
                    <span className="text-xs font-semibold text-espresso">
                      Feature on Homepage
                    </span>
                  </label>
                </div>

                <div className="text-[11px] text-muted">
                  Status: <strong>{currentProject.is_published ? 'Published' : 'Draft Only'}</strong>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-subtle">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl border border-subtle text-xs font-medium text-espresso hover:bg-ivory cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save & Publish Project'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Gallery Media Library Modal */}
      <MediaLibraryModal
        isOpen={isGalleryLibraryOpen}
        onClose={() => {
          setIsGalleryLibraryOpen(false);
          setReplacingGalleryIndex(null);
        }}
        onSelectImage={handleAddGalleryImage}
        title={replacingGalleryIndex !== null ? 'Replace Gallery Photo' : 'Add Photo to Project Gallery'}
        sectionFilter="projects"
      />
    </div>
  );
};
