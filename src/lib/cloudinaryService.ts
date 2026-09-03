/**
 * Cloudinary Direct Client-Side Upload Service
 * Allows free image and 80MB+ video uploads without any Firebase billing account.
 */

const DEFAULT_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
const DEFAULT_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset';

const STORAGE_KEY_CLOUD_NAME = 'dynamic_illuminations_cloudinary_cloud_name';
const STORAGE_KEY_UPLOAD_PRESET = 'dynamic_illuminations_cloudinary_preset';

export function getCloudinaryConfig(): { cloudName: string; uploadPreset: string } {
  if (typeof window === 'undefined') {
    return { cloudName: DEFAULT_CLOUD_NAME, uploadPreset: DEFAULT_UPLOAD_PRESET };
  }

  const savedCloudName = localStorage.getItem(STORAGE_KEY_CLOUD_NAME);
  const savedPreset = localStorage.getItem(STORAGE_KEY_UPLOAD_PRESET);

  return {
    cloudName: savedCloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: savedPreset || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
  };
}

export function saveCloudinaryConfig(cloudName: string, uploadPreset: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_CLOUD_NAME, cloudName.trim());
    localStorage.setItem(STORAGE_KEY_UPLOAD_PRESET, uploadPreset.trim());
  }
}

export function uploadToCloudinary(
  file: File | Blob,
  isVideo = false,
  fileName?: string,
  onProgress?: (pct: number, transferredMb: string, totalMb: string) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const { cloudName, uploadPreset } = getCloudinaryConfig();

    if (!cloudName || !uploadPreset) {
      reject(new Error('Cloudinary Cloud Name and Upload Preset are required. Please configure them in Admin Settings.'));
      return;
    }

    const resourceType = isVideo ? 'video' : 'image';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append('file', file, fileName || (file as File).name || `upload_${Date.now()}`);
    formData.append('upload_preset', uploadPreset);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        const transferredMb = (e.loaded / (1024 * 1024)).toFixed(1);
        const totalMb = (e.total / (1024 * 1024)).toFixed(1);
        if (onProgress) onProgress(pct, transferredMb, totalMb);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.secure_url) {
            resolve(response.secure_url);
          } else {
            reject(new Error('Cloudinary response missing secure_url.'));
          }
        } catch {
          reject(new Error('Failed to parse Cloudinary response.'));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          const msg = errRes.error?.message || `Cloudinary upload failed with status ${xhr.status}`;
          reject(new Error(msg));
        } catch {
          reject(new Error(`Cloudinary upload error (${xhr.status}). Check Cloud Name and Upload Preset.`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error uploading file to Cloudinary. Check connection.'));
    };

    xhr.ontimeout = () => {
      reject(new Error('Cloudinary upload timed out.'));
    };

    xhr.send(formData);
  });
}
