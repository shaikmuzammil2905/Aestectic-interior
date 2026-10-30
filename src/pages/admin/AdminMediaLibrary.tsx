import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  UploadCloud, 
  Search, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Filter,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { contentService, MediaAssetItem } from '../../services/contentService';
import { uploadToCloudinary } from '../../lib/cloudinary';

export const AdminMediaLibrary: React.FC = () => {
  const [assets, setAssets] = useState<MediaAssetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewAsset, setPreviewAsset] = useState<MediaAssetItem | null>(null);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const data = await contentService.getMediaAssets();
      setAssets(data);
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to load media assets: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage(null);

    try {
      const res = await uploadToCloudinary(file, 'aesthetic_interiors', selectedSection !== 'all' ? selectedSection : 'general');
      const saved = await contentService.saveMediaAsset({
        public_id: res.public_id,
        url: res.url,
        original_name: file.name,
        format: res.format || file.type.split('/')[1] || 'jpg',
        width: res.width,
        height: res.height,
        bytes: res.bytes || file.size,
        section: selectedSection !== 'all' ? selectedSection : 'general',
      });
      setMessage({ type: 'success', text: `Image "${file.name}" uploaded and saved to Media Library successfully!` });
      await loadAssets();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Image upload failed' });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id?: string, name?: string) => {
    if (!id) return;
    if (!window.confirm(`Are you sure you want to delete "${name || 'this asset'}" from the Media Library?`)) return;

    try {
      await contentService.deleteMediaAsset(id);
      setMessage({ type: 'success', text: 'Asset removed from library.' });
      setAssets((prev) => prev.filter((a) => a.id !== id));
      if (previewAsset?.id === id) setPreviewAsset(null);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete asset' });
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '—';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const sections = ['all', 'hero', 'services', 'projects', 'transformations', 'branding', 'general'];

  const filtered = assets.filter((asset) => {
    const matchesSearch =
      asset.original_name?.toLowerCase().includes(search.toLowerCase()) ||
      asset.alt_text?.toLowerCase().includes(search.toLowerCase()) ||
      asset.url.toLowerCase().includes(search.toLowerCase());

    if (selectedSection === 'all') return matchesSearch;
    return matchesSearch && asset.section === selectedSection;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-espresso">
            Media & Asset Library
          </h1>
          <p className="text-xs text-muted mt-1">
            Centrally manage, upload, replace, and reuse photography across services, projects, and hero banners.
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center space-x-2 px-4 py-2.5 bg-espresso hover:bg-espresso-light text-softwhite rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer self-start sm:self-auto">
          {isUploading ? (
            <RefreshCw className="w-4 h-4 animate-spin text-gold" />
          ) : (
            <UploadCloud className="w-4 h-4 text-gold" />
          )}
          <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
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

      {/* Filter and Search Bar */}
      <div className="bg-softwhite rounded-2xl p-4 border border-subtle shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by filename or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-ivory border border-subtle rounded-xl text-xs text-espresso focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        {/* Section Filter Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto py-1">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                selectedSection === sec
                  ? 'bg-gold text-charcoal font-bold shadow-xs'
                  : 'bg-ivory text-muted hover:text-espresso border border-subtle/60'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      {loading ? (
        <div className="py-24 flex items-center justify-center space-x-2 text-xs text-muted">
          <RefreshCw className="w-4 h-4 animate-spin text-gold" />
          <span>Loading assets from Supabase...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-softwhite rounded-3xl p-12 text-center border border-subtle space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-ivory border border-subtle mx-auto flex items-center justify-center text-muted">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-lg font-bold text-espresso">No Media Assets Found</h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            Upload new photography using the button above or clear your search filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((asset) => (
            <div
              key={asset.id || asset.url}
              className="group bg-softwhite rounded-2xl border border-subtle overflow-hidden shadow-xs hover:border-gold hover:shadow-md transition-all flex flex-col"
            >
              <div 
                className="aspect-[4/3] bg-charcoal/5 relative overflow-hidden cursor-pointer"
                onClick={() => setPreviewAsset(asset)}
              >
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyUrl(asset.url, asset.id || asset.url);
                    }}
                    className="p-2 rounded-xl bg-softwhite text-espresso hover:bg-gold hover:text-charcoal transition-colors shadow-md"
                    title="Copy Image URL"
                  >
                    {copiedId === (asset.id || asset.url) ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {asset.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(asset.id, asset.original_name);
                      }}
                      className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-3 flex flex-col justify-between flex-1 space-y-2">
                <div>
                  <p className="text-xs font-semibold text-espresso truncate" title={asset.original_name}>
                    {asset.original_name || 'Asset'}
                  </p>
                  <span className="text-[10px] text-gold uppercase tracking-wider font-medium">
                    {asset.section || 'General'}
                  </span>
                </div>

                <div className="pt-1 border-t border-subtle/50 flex items-center justify-between text-[10px] text-muted font-mono">
                  <span>{formatFileSize(asset.bytes)}</span>
                  <span className="uppercase">{asset.format || 'jpg'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-3xl w-full bg-softwhite rounded-3xl overflow-hidden shadow-2xl border border-gold/40 flex flex-col">
            <div className="bg-espresso text-softwhite px-6 py-4 flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base font-bold">{previewAsset.original_name}</h4>
                <p className="text-[11px] text-ivory/70">{formatFileSize(previewAsset.bytes)} • Section: {previewAsset.section || 'general'}</p>
              </div>
              <button
                onClick={() => setPreviewAsset(null)}
                className="p-1 rounded-full text-ivory/70 hover:text-softwhite transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 max-h-[70vh] flex items-center justify-center bg-black/10 overflow-hidden">
              <img
                src={previewAsset.url}
                alt={previewAsset.original_name}
                className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-md"
              />
            </div>

            <div className="p-4 bg-ivory-50 border-t border-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
              <div className="font-mono text-[11px] text-muted truncate flex-1" title={previewAsset.url}>
                {previewAsset.url}
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => copyUrl(previewAsset.url, previewAsset.id || '')}
                  className="px-3.5 py-1.5 rounded-lg bg-gold text-charcoal font-semibold text-xs flex items-center space-x-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === previewAsset.id ? 'Copied!' : 'Copy URL'}</span>
                </button>
                <a
                  href={previewAsset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-espresso text-softwhite font-medium text-xs flex items-center space-x-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open URL</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
