import React, { useState, useRef } from 'react';
import { UploadCloud, Link as LinkIcon, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { uploadToCloudinary } from '../../lib/cloudinary';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  folder?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  folder = 'aesthetic_interiors',
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage(null);

    try {
      const result = await uploadToCloudinary(file, folder);
      onChange(result.url);
      setUrlInput(result.url);
    } catch (err: any) {
      setErrorMessage(err.message || 'Image upload failed. You can switch to Image URL tab.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setErrorMessage(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-espresso-dark uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center space-x-1 bg-ivory border border-subtle/80 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
              activeTab === 'upload'
                ? 'bg-espresso text-softwhite shadow-xs'
                : 'text-muted hover:text-espresso'
            }`}
          >
            Cloudinary Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
              activeTab === 'url'
                ? 'bg-espresso text-softwhite shadow-xs'
                : 'text-muted hover:text-espresso'
            }`}
          >
            Image URL / Path
          </button>
        </div>
      </div>

      {/* Preview if image is present */}
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-subtle bg-charcoal/5 h-44 flex items-center justify-center">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
            <button
              type="button"
              onClick={() => {
                onChange('');
                setUrlInput('');
              }}
              className="px-3 py-1.5 rounded-lg bg-red-600/90 text-white text-xs font-medium hover:bg-red-700 flex items-center space-x-1 shadow-md"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/90 text-espresso text-xs font-medium hover:bg-white flex items-center space-x-1 shadow-md"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>View Full</span>
            </a>
          </div>
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-charcoal/70 text-[10px] text-white/90 backdrop-blur-xs font-mono truncate max-w-[85%]">
            {value}
          </div>
        </div>
      ) : null}

      {/* Active Tab Panel */}
      {!value && (
        <>
          {activeTab === 'upload' ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-subtle hover:border-gold/80 rounded-xl p-6 text-center cursor-pointer transition-colors bg-white/50 hover:bg-white flex flex-col items-center justify-center space-y-2 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-gold/10 group-hover:bg-gold/20 flex items-center justify-center text-gold transition-colors">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-gold" />
                ) : (
                  <UploadCloud className="w-6 h-6" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-espresso">
                  {isUploading ? 'Uploading to Cloudinary...' : 'Click to upload image'}
                </p>
                <p className="text-[11px] text-muted mt-0.5">
                  JPG, PNG, WebP up to 15MB • Optimized via Cloudinary
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
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-subtle bg-white text-xs text-espresso focus:outline-none focus:border-gold"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-4 py-2.5 rounded-xl bg-espresso hover:bg-espresso-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{errorMessage}</div>
        </div>
      )}

      {helperText && <p className="text-[11px] text-muted">{helperText}</p>}
    </div>
  );
};
