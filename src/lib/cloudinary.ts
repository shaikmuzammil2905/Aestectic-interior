export interface CloudinaryUploadResult {
  url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'grtnlr4y';
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

export const uploadToCloudinary = async (
  file: File,
  folder: string = 'aesthetic_interiors'
): Promise<CloudinaryUploadResult> => {
  // 1. Validation
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Please select a valid image file (JPG, PNG, WebP, AVIF, or SVG).');
  }

  const maxSizeBytes = 15 * 1024 * 1024; // 15MB
  if (file.size > maxSizeBytes) {
    throw new Error('Image size must be less than 15MB.');
  }

  // 2. Prepare upload
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

    if (!res.ok) {
      if (data?.error?.message?.includes('unsigned')) {
        throw new Error(
          `Cloudinary preset '${uploadPreset}' must be set to 'Unsigned' in your Cloudinary Dashboard (Settings > Upload > Upload Presets > Edit '${uploadPreset}' > Signing Mode: Unsigned).`
        );
      }
      throw new Error(data?.error?.message || 'Failed to upload image to Cloudinary.');
    }

    return {
      url: data.secure_url || data.url,
      public_id: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      bytes: data.bytes,
    };
  } catch (err: any) {
    console.error('Cloudinary upload error:', err);
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
