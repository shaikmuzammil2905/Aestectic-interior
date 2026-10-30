export interface CloudinaryUploadResult {
  url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  isFallback?: boolean;
}

const DEFAULT_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'grtnlr4y';
const DEFAULT_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

export const getCloudinaryConfig = () => {
  const localCloudName = typeof window !== 'undefined' ? localStorage.getItem('cloudinary_cloud_name') : null;
  const localPreset = typeof window !== 'undefined' ? localStorage.getItem('cloudinary_upload_preset') : null;

  return {
    cloudName: localCloudName || DEFAULT_CLOUD_NAME,
    uploadPreset: localPreset || DEFAULT_UPLOAD_PRESET,
  };
};

export const setCloudinaryConfig = (cloudName: string, uploadPreset: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cloudinary_cloud_name', cloudName.trim());
    localStorage.setItem('cloudinary_upload_preset', uploadPreset.trim());
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const uploadToCloudinary = async (
  file: File,
  folder: string = 'aesthetic_interiors',
  customSection: string = 'general'
): Promise<CloudinaryUploadResult> => {
  // 1. Validation
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Please select a valid image file (JPG, PNG, WebP, AVIF, or SVG).');
  }

  const maxSizeBytes = 20 * 1024 * 1024; // 20MB
  if (file.size > maxSizeBytes) {
    throw new Error('Image size must be less than 20MB.');
  }

  const { cloudName, uploadPreset } = getCloudinaryConfig();

  // 2. Prepare Cloudinary direct upload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', folder);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (res.ok && (data.secure_url || data.url)) {
      return {
        url: data.secure_url || data.url,
        public_id: data.public_id,
        width: data.width,
        height: data.height,
        format: data.format,
        bytes: data.bytes,
      };
    }

    // Cloudinary rejected with error (e.g. preset is signed or not whitelisted)
    const errorMsg = data?.error?.message || '';
    if (errorMsg.includes('unsigned') || errorMsg.includes('whitelisted') || errorMsg.includes('preset')) {
      // Create local optimized data URL fallback so the user is NEVER blocked from saving
      const base64Url = await fileToBase64(file);
      return {
        url: base64Url,
        public_id: 'local-' + Date.now(),
        width: 1200,
        height: 800,
        format: file.type.split('/')[1] || 'jpg',
        bytes: file.size,
        isFallback: true,
      };
    }

    throw new Error(errorMsg || 'Failed to upload image to Cloudinary.');
  } catch (err: any) {
    // If network or CORS blocked, use data URL so user can continue without data loss
    if (file.size <= 5 * 1024 * 1024) {
      const base64Url = await fileToBase64(file);
      return {
        url: base64Url,
        public_id: 'local-' + Date.now(),
        width: 1200,
        height: 800,
        format: file.type.split('/')[1] || 'jpg',
        bytes: file.size,
        isFallback: true,
      };
    }
    throw err;
  }
};

/**
 * Optimizes a Cloudinary image URL with auto-format, auto-quality, and optional width
 */
export const getOptimizedCloudinaryUrl = (
  url: string,
  options?: { width?: number; height?: number; crop?: string; quality?: string }
): string => {
  if (!url || !url.includes('cloudinary.com')) return url;

  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const transformations: string[] = ['f_auto', 'q_auto'];
  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);

  return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
};

