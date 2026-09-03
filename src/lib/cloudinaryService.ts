/**
 * Cloudinary Direct Client-Side Upload Service
 * Allows free image and 80MB+ video uploads without any Firebase billing account.
 */

const DEFAULT_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dn7plghfy';
const DEFAULT_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'dynamic illuminations';

const STORAGE_KEY_CLOUD_NAME = 'dynamic_illuminations_cloudinary_cloud_name';
const STORAGE_KEY_UPLOAD_PRESET = 'dynamic_illuminations_cloudinary_preset';

export function getCloudinaryConfig(): { cloudName: string; uploadPreset: string } {
  if (typeof window === 'undefined') {
    return { cloudName: DEFAULT_CLOUD_NAME, uploadPreset: DEFAULT_UPLOAD_PRESET };
  }

  const savedCloudName = localStorage.getItem(STORAGE_KEY_CLOUD_NAME);
  const savedPreset = localStorage.getItem(STORAGE_KEY_UPLOAD_PRESET);

  return {
    cloudName: savedCloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUD_NAME,
    uploadPreset: savedPreset || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || DEFAULT_UPLOAD_PRESET,
  };
}

export function saveCloudinaryConfig(cloudName: string, uploadPreset: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_CLOUD_NAME, cloudName.trim());
    localStorage.setItem(STORAGE_KEY_UPLOAD_PRESET, uploadPreset.trim());
  }
}

async function attemptCloudinaryPost(
  cloudName: string,
  preset: string,
  file: File | Blob,
  isVideo: boolean,
  fileName?: string,
  onProgress?: (pct: number, transferredMb: string, totalMb: string) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const resourceType = isVideo ? 'video' : 'image';
    const url = `https://api.cloudinary.com/v1_1/${cloudName.trim()}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append('file', file, fileName || (file as File).name || `upload_${Date.now()}`);
    formData.append('upload_preset', preset.trim());

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
          const msg = errRes.error?.message || `Cloudinary upload failed (${xhr.status})`;
          reject(new Error(msg));
        } catch {
          reject(new Error(`Cloudinary upload error (${xhr.status})`));
        }
      }
    };

    xhr.onerror = () => reject(new Error('Network error uploading file to Cloudinary.'));
    xhr.ontimeout = () => reject(new Error('Cloudinary upload timed out.'));

    xhr.send(formData);
  });
}

export async function uploadToCloudinary(
  file: File | Blob,
  isVideo = false,
  fileName?: string,
  onProgress?: (pct: number, transferredMb: string, totalMb: string) => void
): Promise<string> {
  const { cloudName, uploadPreset } = getCloudinaryConfig();
  const cName = cloudName || DEFAULT_CLOUD_NAME;
  const cPreset = uploadPreset || DEFAULT_UPLOAD_PRESET;

  try {
    return await attemptCloudinaryPost(cName, cPreset, file, isVideo, fileName, onProgress);
  } catch (err: any) {
    // If preset contains space or underscore, attempt auto-conversion retry
    const altPreset = cPreset.includes(' ')
      ? cPreset.replace(/\s+/g, '_')
      : cPreset.replace(/_/g, ' ');

    if (altPreset !== cPreset) {
      try {
        return await attemptCloudinaryPost(cName, altPreset, file, isVideo, fileName, onProgress);
      } catch {
        throw err;
      }
    }
    throw err;
  }
}
