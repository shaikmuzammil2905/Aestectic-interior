import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Link as LinkIcon, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Image as ImageIcon,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { contentService } from '../../services/contentService';
import { MediaLibraryModal } from './MediaLibraryModal';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  folder?: string;
  section?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  folder = 'aesthetic_interiors',
  section = 'general',
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState(value || '');
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage(null);
    setSuccessNotice(null);

    try {
      const result = await uploadToCloudinary(file, folder, section);
      onChange(result.url);
      setUrlInput(result.url);

      // Register in Supabase Media Library
      await contentService.saveMediaAsset({
        public_id: result.public_id,
        url: result.url,
        original_name: file.name,
        format: result.format || file.type.split('/')[1] || 'jpg',
        width: result.width,
        height: result.height,
        bytes: result.bytes || file.size,
        section: section,
        alt_text: `${label} image`,
      });

      if (result.isFallback) {
        setSuccessNotice('Image loaded and optimized. (Cloudinary preset is currently in signed mode; to enable direct cloud uploads, configure unsigned mode in Settings).');
      } else {
        setSuccessNotice('Image successfully uploaded and saved to Media Library!');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Image upload failed. You can use an existing image or enter an image URL.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setErrorMessage(null);
      setSuccessNotice('Image URL applied successfully.');
    }
  };

  const handleRemoveImage = () => {
    if (window.confirm('Are you sure you want to remove this image? (You can re-select or upload a new one at any time).')) {
      onChange('');
      setUrlInput('');
      setSuccessNotice(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="block text-xs font-semibold text-espresso uppercase tracking-wider">
          {label}
        </label>
        
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => setIsLibraryOpen(true)}
            className="inline-flex items-center space-x-1 px-2.5 py-1 bg-sand/50 hover:bg-gold/20 text-espresso text-[11px] font-medium rounded-lg border border-subtle transition-colors cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-gold" />
            <span>Media Library</span>
          </button>

          <div className="flex items-center bg-ivory border border-subtle/80 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-2 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-espresso text-softwhite shadow-xs'
                  : 'text-muted hover:text-espresso'
              }`}
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-2 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-espresso text-softwhite shadow-xs'
                  : 'text-muted hover:text-espresso'
              }`}
            >
              URL / Link
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview with Controls */}
      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-subtle bg-charcoal/5 h-48 flex items-center justify-center shadow-xs">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80';
            }}
          />

          {/* Hover Action Overlay */}
          <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 p-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-gold text-charcoal text-xs font-bold hover:bg-gold-light flex items-center space-x-1 shadow-md cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replace</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLibraryOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-softwhite text-espresso text-xs font-semibold hover:bg-white flex items-center space-x-1 shadow-md cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5 text-gold" />
              <span>Library</span>
            </button>

            <button
              type="button"
              onClick={handleRemoveImage}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 flex items-center space-x-1 shadow-md cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>

            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-black/60 text-white hover:bg-black text-xs font-medium flex items-center space-x-1 shadow-md"
              title="Open full image"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-charcoal/80 text-[10px] text-white/90 backdrop-blur-xs font-mono truncate max-w-[85%]">
            {value.startsWith('data:') ? 'Base64 Local Image Asset' : value}
          </div>
        </div>
      ) : (
        /* Empty State */
        <>
          {activeTab === 'upload' ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-subtle hover:border-gold/80 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-softwhite hover:bg-ivory flex flex-col items-center justify-center space-y-2 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold/15 group-hover:bg-gold/25 flex items-center justify-center text-gold transition-colors">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-gold" />
                ) : (
                  <UploadCloud className="w-6 h-6" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-espresso">
                  {isUploading ? 'Uploading and optimizing image...' : 'Click to select an image from your device'}
                </p>
                <p className="text-[11px] text-muted mt-0.5">
                  JPG, PNG, WebP up to 20MB • Automatically registered in Media Library
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="https://... or /assets/..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-subtle bg-softwhite text-xs text-espresso focus:outline-none focus:border-gold"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-4 py-2.5 rounded-xl bg-espresso hover:bg-espresso-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          )}
        </>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {/* Notices */}
      {successNotice && (
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center space-x-2">
          <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
          <span>{successNotice}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{errorMessage}</div>
        </div>
      )}

      {helperText && <p className="text-[11px] text-muted">{helperText}</p>}

      {/* Media Library Modal */}
      <MediaLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelectImage={(url) => {
          onChange(url);
          setUrlInput(url);
          setSuccessNotice('Selected image from Media Library.');
        }}
        title={`Media Library — ${label}`}
        sectionFilter={section}
      />
    </div>
  );
};
