import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  UploadCloud, 
  Check, 
  Image as ImageIcon, 
  Trash2, 
  RefreshCw, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { contentService, MediaAssetItem } from '../../services/contentService';
import { uploadToCloudinary } from '../../lib/cloudinary';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
  title?: string;
  sectionFilter?: string;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  title = 'Media Library',
  sectionFilter,
}) => {
  const [assets, setAssets] = useState<MediaAssetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const data = await contentService.getMediaAssets();
      setAssets(data);
    } catch (err) {
      console.warn('Failed to load media assets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAssets();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const res = await uploadToCloudinary(file, 'aesthetic_interiors', sectionFilter || 'general');
      const saved = await contentService.saveMediaAsset({
        public_id: res.public_id,
        url: res.url,
        original_name: file.name,
        format: res.format || file.type.split('/')[1],
        width: res.width,
        height: res.height,
        bytes: res.bytes || file.size,
        section: sectionFilter || 'general',
      });
      await loadAssets();
      // Auto select the newly uploaded image
      onSelectImage(res.url);
      onClose();
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteAsset = async (e: React.MouseEvent, id?: string) => {
    e.stopPropagation();
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this asset from the library?')) return;

    try {
      await contentService.deleteMediaAsset(id);
      setAssets((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert('Failed to delete asset: ' + err.message);
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.original_name?.toLowerCase().includes(search.toLowerCase()) ||
      asset.alt_text?.toLowerCase().includes(search.toLowerCase()) ||
      asset.url.toLowerCase().includes(search.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    return matchesSearch && asset.section === activeCategory;
  });

  const categories = ['all', 'hero', 'services', 'projects', 'transformations', 'branding', 'general'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-charcoal/85 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-softwhite rounded-3xl shadow-2xl border border-subtle/80 overflow-hidden my-6 z-10 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="bg-espresso text-softwhite px-6 py-4 flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-tight">{title}</h3>
              <p className="text-[11px] text-ivory/70">
                Browse, search, or upload photography and modular graphics.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ivory/70 hover:text-softwhite hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search, Filters & Upload Button */}
        <div className="p-4 sm:px-6 bg-ivory-50 border-b border-subtle/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-softwhite border border-subtle rounded-xl text-xs text-espresso focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto py-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-lg capitalize text-[11px] font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-espresso text-softwhite font-semibold'
                    : 'text-muted hover:text-espresso bg-softwhite border border-subtle/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Upload Button */}
          <label className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition-colors shrink-0">
            {isUploading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <UploadCloud className="w-3.5 h-3.5" />
            )}
            <span>{isUploading ? 'Uploading...' : 'Upload New'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>

        {uploadError && (
          <div className="mx-6 mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
            {uploadError}
          </div>
        )}

        {/* Assets Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="py-20 flex items-center justify-center space-x-2 text-xs text-muted">
              <RefreshCw className="w-4 h-4 animate-spin text-gold" />
              <span>Loading media library...</span>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-ivory border border-subtle mx-auto flex items-center justify-center text-muted">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-xs text-muted">No media assets found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id || asset.url}
                  onClick={() => {
                    onSelectImage(asset.url);
                    onClose();
                  }}
                  className="group relative bg-ivory rounded-2xl border border-subtle overflow-hidden cursor-pointer hover:border-gold hover:shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-[4/3] bg-charcoal/5 relative overflow-hidden">
                    <img
                      src={asset.url}
                      alt={asset.alt_text || asset.original_name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <span className="px-3 py-1.5 rounded-full bg-gold text-charcoal text-[11px] font-bold shadow-md">
                        Select
                      </span>
                    </div>

                    {asset.id && (
                      <button
                        onClick={(e) => handleDeleteAsset(e, asset.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-charcoal/70 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-all"
                        title="Delete from Library"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="p-2.5 bg-softwhite flex flex-col justify-between flex-1">
                    <p className="text-[11px] font-medium text-espresso truncate">
                      {asset.original_name || 'Image'}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-muted mt-1">
                      <span className="capitalize">{asset.section || 'General'}</span>
                      {asset.format && <span className="uppercase">{asset.format}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-ivory-50 border-t border-subtle/80 flex items-center justify-between text-[11px] text-muted">
          <span>{filteredAssets.length} image{filteredAssets.length !== 1 ? 's' : ''} available</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-espresso text-softwhite hover:bg-espresso-light text-xs font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
