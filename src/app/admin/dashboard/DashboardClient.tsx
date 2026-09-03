'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Avatar from 'react-avatar';
import { useAuth } from '../../../context/AuthContext';
import { 
  getProjectsFromFirestore, 
  createProjectInFirestore, 
  updateProjectInFirestore, 
  deleteProjectFromFirestore, 
  ProjectItem 
} from '../../../lib/projectsService';
import { 
  getReviewsFromFirestore, 
  deleteReviewFromFirestore, 
  ReviewItem 
} from '../../../lib/reviewsService';
import { generateProjectTemplate } from '../../../lib/aiGenerator';
import ConfirmModal from '../../../components/ConfirmModal';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSignOutAlt, 
  FaShieldAlt, 
  FaImage, 
  FaVideo, 
  FaEye, 
  FaCheck, 
  FaTimes,
  FaRedo,
  FaUpload,
  FaUsers,
  FaInfoCircle,
  FaKey,
  FaFolderOpen,
  FaStar,
  FaQuoteLeft,
  FaSpinner,
  FaBolt,
  FaSolarPanel,
  FaBatteryFull,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserShield,
  FaMagic
} from 'react-icons/fa';
import { storage } from '../../../firebase';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { uploadToCloudinary, getCloudinaryConfig, saveCloudinaryConfig } from '../../../lib/cloudinaryService';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Helper function to compress images efficiently to a Blob (for Cloud Storage)
function compressImageToBlob(file: File, maxWidth = 1400, quality = 0.82): Promise<Blob> {
  return new Promise((resolve) => {
    if (file.size <= 400 * 1024) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => resolve(file);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => resolve(blob || file),
            'image/jpeg',
            quality
          );
        } else {
          resolve(file);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// Fallback helper: compress image to Data URL if Cloud Storage is unreachable
function compressImageToDataUrl(file: File, maxWidth = 900, quality = 0.72): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve('');
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve(e.target?.result as string);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// Upload file (image or video) via Cloudinary (primary free option) or Firebase/Local fallback
async function uploadMediaFile(
  file: File, 
  isVideo = false, 
  onProgress?: (pct: number, transferredMb: string, totalMb: string) => void
): Promise<string> {
  const { cloudName, uploadPreset } = getCloudinaryConfig();

  // 1. Primary: Use Cloudinary if keys are configured (100% free, no credit card / Firebase billing required)
  if (cloudName && uploadPreset) {
    try {
      let uploadPayload: Blob | File = file;
      if (!isVideo) {
        uploadPayload = await compressImageToBlob(file, 1400, 0.82);
      }
      return await uploadToCloudinary(uploadPayload, isVideo, file.name, onProgress);
    } catch (cloudinaryErr: any) {
      console.warn('Cloudinary upload notice:', cloudinaryErr);
      if (!isVideo) {
        return await compressImageToDataUrl(file, 900, 0.72);
      }
      throw cloudinaryErr;
    }
  }

  // 2. Secondary: Fallback to Firebase Storage if Cloudinary credentials are not set
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `projects/${isVideo ? 'videos' : 'images'}/${Date.now()}_${sanitizedName}`;
  const storageRef = ref(storage, path);

  try {
    let uploadPayload: Blob | File = file;
    if (!isVideo) {
      uploadPayload = await compressImageToBlob(file, 1400, 0.82);
    }

    const mimeType = file.type || (isVideo ? 'video/mp4' : 'image/jpeg');
    const metadata = { contentType: mimeType };

    return await new Promise<string>((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, uploadPayload, metadata);

      const timeoutMs = isVideo ? 300000 : 45000;
      const timeout = setTimeout(() => {
        uploadTask.cancel();
        reject(new Error('Cloud Storage upload timed out.'));
      }, timeoutMs);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const total = snapshot.totalBytes && snapshot.totalBytes > 0 ? snapshot.totalBytes : (uploadPayload.size || 1);
          const transferred = snapshot.bytesTransferred || 0;
          const rawPct = total > 0 ? Math.round((transferred / total) * 100) : 0;
          const pct = isNaN(rawPct) ? 0 : Math.min(100, Math.max(0, rawPct));
          const transferredMb = (transferred / (1024 * 1024)).toFixed(1);
          const totalMb = (total / (1024 * 1024)).toFixed(1);
          if (onProgress) onProgress(pct, transferredMb, totalMb);
        },
        (error: any) => {
          clearTimeout(timeout);
          reject(error);
        },
        async () => {
          clearTimeout(timeout);
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          } catch (err) {
            reject(err);
          }
        }
      );
    });
  } catch (error) {
    console.warn('Storage upload notice, using compressed local fallback:', error);
    if (!isVideo) {
      return await compressImageToDataUrl(file, 900, 0.72);
    }
    throw new Error('Upload failed. Please configure Cloudinary Cloud Name and Upload Preset in Cloud Storage settings or check network.');
  }
}

export default function DashboardClient() {
  const { isAdmin, logout, loading: authLoading, adminTeamUsers, addAdminTeamUser, removeAdminTeamUser } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'team' | 'reviews' | 'storage'>('projects');

  // Cloudinary Settings State
  const [cloudinaryCloudName, setCloudinaryCloudName] = useState<string>('');
  const [cloudinaryPreset, setCloudinaryPreset] = useState<string>('');
  const [cloudinarySaveMsg, setCloudinarySaveMsg] = useState<string>('');

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form Modal & Saving Loading State
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isSavingProject, setIsSavingProject] = useState<boolean>(false);

  // Form Fields
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<ProjectItem['category']>('Solar Power');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [fullDescription, setFullDescription] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('/images/panel1.jpg');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [clientName, setClientName] = useState<string>('');

  // Specs
  const [inverterCapacity, setInverterCapacity] = useState<string>('');
  const [solarPanels, setSolarPanels] = useState<string>('');
  const [batteryBank, setBatteryBank] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [completionDate, setCompletionDate] = useState<string>('');

  // Spec Generator Prompt State
  const [specPrompt, setSpecPrompt] = useState<string>('');
  const [isGeneratingSpec, setIsGeneratingSpec] = useState<boolean>(false);

  // Admin Team Form State
  const [newTeamEmail, setNewTeamEmail] = useState<string>('');
  const [teamSuccessMsg, setTeamSuccessMsg] = useState<string>('');

  // Media Uploading Progress State
  const [isUploadingMedia, setIsUploadingMedia] = useState<boolean>(false);
  const [uploadStatusText, setUploadStatusText] = useState<string>('');
  const [manualVideoInput, setManualVideoInput] = useState<string>('');

  // Confirm Modal State
  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });

  // Auto-dismiss status toast after 4 seconds
  useEffect(() => {
    if (statusMsg.text) {
      const timer = setTimeout(() => {
        setStatusMsg({ type: '', text: '' });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [statusMsg]);

  useEffect(() => {
    setMounted(true);
    AOS.init({ duration: 800, once: true });
    const conf = getCloudinaryConfig();
    setCloudinaryCloudName(conf.cloudName);
    setCloudinaryPreset(conf.uploadPreset);
  }, []);

  useEffect(() => {
    if (mounted && !authLoading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [mounted, isAdmin, authLoading, router]);

  const loadData = async () => {
    setLoading(true);
    const [projData, revData] = await Promise.all([
      getProjectsFromFirestore(),
      getReviewsFromFirestore(),
    ]);
    setProjects(projData);
    setReviews(revData);
    setLoading(false);
  };

  useEffect(() => {
    if (mounted && isAdmin) {
      loadData();
    }
  }, [mounted, isAdmin]);

  const openCreateForm = () => {
    setEditingProject(null);
    setTitle('');
    setCategory('Solar Power');
    setShortDescription('');
    setFullDescription('');
    setCoverImage('');
    setGalleryImages([]);
    setVideoUrls([]);
    setClientName('');
    setInverterCapacity('');
    setSolarPanels('');
    setBatteryBank('');
    setLocation('');
    setCompletionDate('');
    setSpecPrompt('');
    setManualVideoInput('');
    setIsFormOpen(true);
  };

  const openEditForm = (proj: ProjectItem) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setCategory(proj.category);
    setShortDescription(proj.shortDescription);
    setFullDescription(proj.fullDescription);
    setCoverImage(proj.coverImage);
    setGalleryImages(proj.galleryImages || []);
    setVideoUrls(proj.videoUrls || []);
    setClientName(proj.clientName);
    setInverterCapacity(proj.specs?.inverterCapacity || '');
    setSolarPanels(proj.specs?.solarPanels || '');
    setBatteryBank(proj.specs?.batteryBank || '');
    setLocation(proj.specs?.location || '');
    setCompletionDate(proj.specs?.completionDate || '');
    setManualVideoInput('');
    setIsFormOpen(true);
  };

  // File Upload Handlers (Cover, Gallery, Video) with Cloud Storage & Progress
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    setUploadStatusText(`Preparing cover file "${file.name}"...`);

    try {
      const url = await uploadMediaFile(file, false, (pct, transferredMb, totalMb) => {
        setUploadStatusText(`Uploading cover image ("${file.name}"): ${pct}% (${transferredMb} MB / ${totalMb} MB)...`);
      });
      setCoverImage(url);
      setStatusMsg({ type: 'success', text: 'Cover image uploaded successfully!' });
    } catch (err: any) {
      console.error('Cover upload error:', err);
      setStatusMsg({ type: 'error', text: err?.message || 'Failed to upload cover file from device.' });
    } finally {
      setIsUploadingMedia(false);
      setUploadStatusText('');
      e.target.value = '';
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingMedia(true);
    const fileList = Array.from(files);

    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        setUploadStatusText(`Preparing photo ${i + 1} of ${fileList.length} ("${file.name}")...`);
        const url = await uploadMediaFile(file, false, (pct, transferredMb, totalMb) => {
          setUploadStatusText(`Uploading photo ${i + 1} of ${fileList.length} ("${file.name}"): ${pct}% (${transferredMb} MB / ${totalMb} MB)...`);
        });
        setGalleryImages((prev) => [...prev, url]);
      }
      setStatusMsg({ type: 'success', text: `Uploaded ${fileList.length} photo(s) successfully!` });
    } catch (err: any) {
      console.error('Gallery upload error:', err);
      setStatusMsg({ type: 'error', text: err?.message || 'Failed to upload gallery photos from device.' });
    } finally {
      setIsUploadingMedia(false);
      setUploadStatusText('');
      e.target.value = '';
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingMedia(true);
    const fileList = Array.from(files);

    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const initialSizeMb = (file.size / (1024 * 1024)).toFixed(1);
        setUploadStatusText(`Preparing video ${i + 1} of ${fileList.length} ("${file.name}" - ${initialSizeMb} MB)...`);

        const url = await uploadMediaFile(file, true, (pct, transferredMb, totalMb) => {
          setUploadStatusText(`Uploading video ${i + 1} of ${fileList.length} ("${file.name}"): ${pct}% (${transferredMb} MB / ${totalMb} MB)...`);
        });

        setVideoUrls((prev) => [...prev, url]);
      }
      setStatusMsg({ type: 'success', text: 'Video uploaded successfully to Cloud Storage!' });
    } catch (err: any) {
      console.error('Video upload error:', err);
      const msg = err?.message || 'Video upload failed. Check network or storage rules.';
      setStatusMsg({ type: 'error', text: msg });
    } finally {
      setIsUploadingMedia(false);
      setUploadStatusText('');
      e.target.value = '';
    }
  };

  const addManualVideoUrl = () => {
    if (!manualVideoInput.trim()) return;
    setVideoUrls((prev) => [...prev, manualVideoInput.trim()]);
    setManualVideoInput('');
  };

  const generateShortCardPreview = () => {
    const inv = inverterCapacity.trim() || 'High-capacity hybrid solar inverter';
    const pan = solarPanels.trim() || 'Tier-1 monocrystalline solar panels';
    const bat = batteryBank.trim() || 'lithium-ion battery bank';
    const loc = location.trim() || 'Lagos, Nigeria';

    const generatedText = `High-efficiency ${inv} system with ${pan} and ${bat} delivering 24/7 zero-downtime uninterrupted power in ${loc}.`;
    setShortDescription(generatedText);
    setStatusMsg({ type: 'success', text: 'Short Card Preview generated from specs!' });
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideoUrl = (index: number) => {
    setVideoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerateSpec = (e: React.FormEvent) => {
    e.preventDefault();
    if (!specPrompt.trim()) return;

    setIsGeneratingSpec(true);
    setTimeout(() => {
      const generated = generateProjectTemplate(specPrompt);
      setTitle(generated.title);
      setCategory(generated.category);
      setShortDescription(generated.shortDescription);
      setFullDescription(generated.fullDescription);
      setInverterCapacity(generated.specs.inverterCapacity);
      setSolarPanels(generated.specs.solarPanels);
      setBatteryBank(generated.specs.batteryBank);
      setLocation(generated.specs.location);
      setCompletionDate(generated.specs.completionDate);
      setIsGeneratingSpec(false);
      setStatusMsg({ type: 'success', text: 'Formatted project specifications generated!' });
    }, 200);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !coverImage.trim()) {
      setStatusMsg({ type: 'error', text: 'Title and Cover Preview Image are required.' });
      return;
    }

    setIsSavingProject(true);

    const payload: Omit<ProjectItem, 'id'> = {
      title,
      category,
      shortDescription,
      fullDescription,
      coverImage,
      galleryImages: galleryImages.length > 0 ? galleryImages : [coverImage],
      videoUrls: videoUrls,
      clientName: clientName || 'Private Client',
      specs: {
        inverterCapacity: inverterCapacity || '10 kVA',
        solarPanels: solarPanels || '12x 550W',
        batteryBank: batteryBank || 'Lithium Battery',
        location: location || 'Nigeria',
        completionDate: completionDate || 'Recent',
      },
    };

    try {
      if (editingProject) {
        await updateProjectInFirestore(editingProject.id, payload);
        setStatusMsg({ type: 'success', text: 'Project updated successfully across all users!' });
      } else {
        await createProjectInFirestore(payload);
        setStatusMsg({ type: 'success', text: 'New project published successfully across all users!' });
      }
      setIsFormOpen(false);
      await loadData();
    } catch (err: any) {
      console.error('Error saving project:', err);
      setStatusMsg({ type: 'error', text: 'Saved project.' });
    } finally {
      setIsSavingProject(false);
    }
  };

  const confirmDeleteProject = (id: string, projTitle: string) => {
    setConfirmModalState({
      isOpen: true,
      title: 'Delete Project',
      message: `Are you sure you want to permanently delete "${projTitle}"? This action cannot be undone.`,
      onConfirm: async () => {
        await deleteProjectFromFirestore(id);
        setStatusMsg({ type: 'success', text: `Project "${projTitle}" deleted successfully.` });
        loadData();
      },
    });
  };

  const confirmDeleteReview = (id: string, reviewerName: string) => {
    setConfirmModalState({
      isOpen: true,
      title: 'Delete Client Review',
      message: `Are you sure you want to delete the review submitted by "${reviewerName}"?`,
      onConfirm: async () => {
        await deleteReviewFromFirestore(id);
        setStatusMsg({ type: 'success', text: `Review by "${reviewerName}" deleted successfully.` });
        loadData();
      },
    });
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamEmail.trim()) return;

    const result = addAdminTeamUser(newTeamEmail);
    setTeamSuccessMsg(`Admin member added! Default passcode: ${result.passcode}`);
    setNewTeamEmail('');

    setTimeout(() => {
      setTeamSuccessMsg('');
    }, 6000);
  };

  const confirmRemoveTeamUser = (userEmail: string) => {
    setConfirmModalState({
      isOpen: true,
      title: 'Revoke Admin Access',
      message: `Are you sure you want to revoke admin access for ${userEmail}?`,
      onConfirm: () => {
        removeAdminTeamUser(userEmail);
        setStatusMsg({ type: 'success', text: `Revoked access for ${userEmail}.` });
      },
    });
  };

  const handleSaveCloudinaryConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveCloudinaryConfig(cloudinaryCloudName, cloudinaryPreset);
    setCloudinarySaveMsg('Cloudinary Storage credentials saved! Unlimited free video and image uploads enabled.');
    setTimeout(() => setCloudinarySaveMsg(''), 5000);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  if (!mounted || authLoading || !isAdmin) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center">
        <p className="text-slate-400 font-medium">Verifying admin authorization...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModalState.isOpen}
        title={confirmModalState.title}
        message={confirmModalState.message}
        onConfirm={confirmModalState.onConfirm}
        onClose={() => setConfirmModalState((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Top Bar Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 text-amber-400 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <FaShieldAlt />
            <span>Authorized Management Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Projects & Admin Management</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={openCreateForm}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-md text-sm flex items-center space-x-2 transition-all"
          >
            <FaPlus />
            <span>Add New Project</span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-slate-900 hover:bg-rose-950/80 border border-slate-800 text-rose-400 hover:text-rose-300 px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs: Projects vs Admin Team vs Reviews */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition-all ${
            activeTab === 'projects'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FaFolderOpen />
          <span>Projects Portfolio ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition-all ${
            activeTab === 'reviews'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FaStar />
          <span>Client Reviews ({reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition-all ${
            activeTab === 'team'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FaUsers />
          <span>Admin Team Management ({adminTeamUsers.length})</span>
        </button>
      </div>

      {statusMsg.text && (
        <div className="max-w-7xl mx-auto mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`p-4 rounded-xl text-sm font-semibold flex justify-between items-center shadow-lg ${
              statusMsg.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}
          >
            <span>{statusMsg.text}</span>
            <button onClick={() => setStatusMsg({ type: '', text: '' })} className="text-xs hover:opacity-80">Dismiss</button>
          </div>
        </div>
      )}

      {/* TAB 1: PROJECTS GRID */}
      {activeTab === 'projects' && (
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Project List</h2>
            <button onClick={loadData} className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1">
              <FaRedo className="text-[10px]" />
              <span>Refresh Data</span>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-16 border border-slate-800 rounded-2xl glass-dark">
              <p className="text-slate-400">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl glass-dark">
              <p className="text-slate-400 mb-4">No projects added yet.</p>
              <button onClick={openCreateForm} className="bg-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm">
                Create First Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="glass-dark border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group">
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={proj.coverImage || '/images/panel1.jpg'}
                        alt={proj.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/panel1.jpg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/85 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-full border border-slate-800">
                        {proj.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{proj.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4">{proj.shortDescription}</p>

                      <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                        <span className="flex items-center space-x-1"><FaImage className="text-cyan-400" /> <span>{(proj.galleryImages || []).length} Photos</span></span>
                        <span className="flex items-center space-x-1"><FaVideo className="text-amber-400" /> <span>{(proj.videoUrls || []).length} Videos</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center space-x-2">
                    <Link href={`/projects/${proj.id}`} target="_blank" className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold py-2.5 rounded-xl text-center border border-slate-800 flex items-center justify-center space-x-1">
                      <FaEye /> <span>View Details</span>
                    </Link>
                    <button onClick={() => openEditForm(proj)} className="p-2.5 bg-blue-900/60 hover:bg-blue-800 text-cyan-300 rounded-xl border border-blue-700/50">
                      <FaEdit />
                    </button>
                    <button onClick={() => confirmDeleteProject(proj.id, proj.title)} className="p-2.5 bg-rose-950/60 hover:bg-rose-900 text-rose-400 rounded-xl border border-rose-800/50">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: REVIEWS MANAGEMENT */}
      {activeTab === 'reviews' && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <FaStar className="text-amber-400" />
                <span>Submitted Client Reviews ({reviews.length})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Review and manage feedback submitted by website visitors.</p>
            </div>
            <button onClick={loadData} className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1">
              <FaRedo className="text-[10px]" />
              <span>Refresh Reviews</span>
            </button>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl glass-dark">
              <p className="text-slate-400">No client reviews submitted yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="glass-dark p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between relative">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar name={rev.name} round size="42" color="#0F172A" fgColor="#F59E0B" className="border border-amber-500/30 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                          <div className="flex text-amber-400 text-xs mt-0.5">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={i < (rev.rating || 5) ? 'text-amber-400' : 'text-slate-700'} />
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => confirmDeleteReview(rev.id, rev.name)}
                        className="text-xs text-rose-400 hover:text-rose-300 p-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 rounded-xl flex items-center space-x-1"
                      >
                        <FaTrash className="text-xs" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADMIN TEAM MANAGEMENT */}
      {activeTab === 'team' && (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
              <FaUsers className="text-amber-400" />
              <span>Add Authorized Admin Team Member</span>
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Add a new team member&apos;s email address. The default passcode is automatically generated from the <strong>first 4 letters of their email + 2026</strong>.
            </p>

            {teamSuccessMsg && (
              <div className="mb-4 p-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-bold">
                {teamSuccessMsg}
              </div>
            )}

            <form onSubmit={handleAddTeamMember} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="e.g. ahmed@dynamicilluminations.com"
                value={newTeamEmail}
                onChange={(e) => setNewTeamEmail(e.target.value)}
                className="flex-grow text-xs p-3.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-xs shadow-md flex items-center justify-center space-x-2"
              >
                <FaPlus />
                <span>Add Admin Member</span>
              </button>
            </form>
          </div>

          <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Authorized Admin Team Members ({adminTeamUsers.length})</h3>

            <div className="divide-y divide-slate-800">
              {adminTeamUsers.map((member) => (
                <div key={member.email} className="py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{member.email}</div>
                    <div className="text-xs text-amber-400 font-mono mt-0.5 flex items-center space-x-1">
                      <FaKey className="text-[10px]" />
                      <span>Passcode: <strong>{member.passcode}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => confirmRemoveTeamUser(member.email)}
                    className="text-xs text-rose-400 hover:text-rose-300 p-2 bg-rose-950/40 border border-rose-800/40 rounded-xl"
                  >
                    Revoke Access
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CRUD & SPEC GENERATOR MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-dark border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-8">
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} disabled={isSavingProject} className="text-slate-400 hover:text-white p-2">
                <FaTimes size={20} />
              </button>
            </div>

            {/* Quick Project Specification Generator Box */}
            {isUploadingMedia && (
              <div className="mb-6 p-4 bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-2xl text-xs font-bold flex items-center space-x-3 animate-pulse shadow-lg">
                <FaSpinner className="animate-spin text-amber-400 text-lg flex-shrink-0" />
                <span>{uploadStatusText || 'Uploading media file from device to cloud storage...'}</span>
              </div>
            )}

            <div className="mb-8 p-5 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                <FaBolt className="text-sm" />
                <span>Quick Project Specification Generator</span>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Type basic project parameters (e.g. &ldquo;15kVA solar setup in Lekki with 16 panels & lithium battery&rdquo;) and click generate to auto-fill title, descriptions, and specs in clean formatted Markdown!
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 15kVA hybrid solar system in Ikoyi with 16 panels"
                  value={specPrompt}
                  onChange={(e) => setSpecPrompt(e.target.value)}
                  className="flex-grow text-xs p-3 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
                <button
                  onClick={handleGenerateSpec}
                  disabled={isGeneratingSpec || !specPrompt.trim()}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex-shrink-0 flex items-center space-x-1 shadow-md disabled:opacity-50"
                >
                  <FaBolt />
                  <span>{isGeneratingSpec ? 'Generating...' : 'Auto-Fill Specs'}</span>
                </button>
              </div>
            </div>

            {/* Engineering Media Advice Banner */}
            <div className="mb-6 p-4 bg-slate-900/90 border border-cyan-500/30 rounded-2xl text-xs text-slate-300 flex items-start space-x-3">
              <FaInfoCircle className="text-cyan-400 text-lg flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-400 uppercase font-bold tracking-wider block mb-1">Recommended Media Guidelines per Project</strong>
                <p className="leading-relaxed">
                  • <strong>1 Main Cover Photo</strong> (Upload photo from device or paste image URL)<br />
                  • <strong>3 to 6 Gallery Photos</strong> (Roof solar panels, Inverter, Lithium battery, Night lighting effect)<br />
                  • <strong>1 to 2 Short Videos</strong> (Upload video file from device or paste video URL)
                </p>
              </div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmitForm} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Project Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 15 kVA Hybrid Solar & Smart Lighting Setup"
                    className="w-full text-xs p-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-xs p-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Solar Power">Solar Power</option>
                    <option value="Architectural Lighting">Architectural Lighting</option>
                    <option value="Smart Home">Smart Home</option>
                    <option value="Event Lighting">Event Lighting</option>
                    <option value="Commercial Setup">Commercial Setup</option>
                  </select>
                </div>
              </div>

              {/* COVER IMAGE FILE UPLOAD */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Main Cover Preview Image (Upload from Device or Paste URL)
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 px-4 py-3 rounded-xl cursor-pointer flex items-center space-x-2 flex-shrink-0">
                    <FaUpload className="text-amber-400" />
                    <span>Upload Cover File</span>
                    <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" disabled={isUploadingMedia} />
                  </label>

                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Image URL or uploaded file preview link"
                    className="w-full text-xs p-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                {coverImage && (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-400">Cover Image Square Preview:</div>
                    <div className="relative aspect-square w-28 sm:w-32 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-md">
                      <img
                        src={coverImage || '/images/panel1.jpg'}
                        alt="Cover Preview"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/panel1.jpg';
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* GALLERY PHOTOS MULTI-FILE UPLOAD */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Gallery Photos ({galleryImages.length})
                  </label>
                  <label className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 px-3 py-1.5 rounded-xl cursor-pointer flex items-center space-x-1.5">
                    <FaUpload className="text-cyan-400 text-xs" />
                    <span>+ Add Device Photos</span>
                    <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" disabled={isUploadingMedia} />
                  </label>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 group shadow-md">
                      <img
                        src={img}
                        alt={`Gallery ${idx}`}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/panel1.jpg';
                        }}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-1.5 right-1.5 bg-rose-600/90 hover:bg-rose-600 text-white rounded-full p-1.5 text-[10px] shadow-lg opacity-90 group-hover:opacity-100 transition-opacity"
                        title="Remove Photo"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* VIDEO FILES UPLOAD & URL LINK */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-rose-400 uppercase tracking-wider">
                    Installation Videos ({videoUrls.length})
                  </label>
                  <label className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 px-3 py-1.5 rounded-xl cursor-pointer flex items-center space-x-1.5">
                    <FaVideo className="text-rose-400 text-xs" />
                    <span>+ Upload Video File</span>
                    <input type="file" accept="video/*" multiple onChange={handleVideoUpload} className="hidden" disabled={isUploadingMedia} />
                  </label>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Or paste video URL (e.g. https://... or video link)"
                    value={manualVideoInput}
                    onChange={(e) => setManualVideoInput(e.target.value)}
                    className="flex-grow text-xs p-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addManualVideoUrl}
                    disabled={!manualVideoInput.trim()}
                    className="bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 text-rose-300 font-bold px-3 py-2 rounded-xl text-xs flex-shrink-0 disabled:opacity-50"
                  >
                    + Add Link
                  </button>
                </div>

                {videoUrls.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-400">Video Square Previews:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {videoUrls.map((vid, idx) => (
                        <div key={idx} className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group shadow-md flex flex-col justify-between p-1.5">
                          <video
                            src={vid}
                            controls
                            preload="metadata"
                            className="w-full h-full object-cover rounded-xl bg-black"
                          />
                          <button
                            type="button"
                            onClick={() => removeVideoUrl(idx)}
                            className="absolute top-2 right-2 z-10 bg-rose-600/90 hover:bg-rose-600 text-white rounded-full p-1.5 text-[10px] shadow-lg transition-transform hover:scale-110"
                            title="Remove Video"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Technical Specs */}
              <div className="space-y-4 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                    <FaBolt className="text-amber-400" />
                    <span>Technical Specifications & Quick Select Presets</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Inverter Capacity */}
                  <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    <label className="text-[11px] font-bold text-slate-300 flex items-center space-x-1.5">
                      <FaBolt className="text-amber-400 text-xs" />
                      <span>Inverter kVA Size</span>
                    </label>
                    <input
                      type="text"
                      value={inverterCapacity}
                      onChange={(e) => setInverterCapacity(e.target.value)}
                      placeholder="e.g. 15 kVA Hybrid System"
                      className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-1 pt-1">
                      {['1.5 kVA', '2 kVA', '3.5 kVA', '5 kVA Hybrid', '7.5 kVA', '8 kVA Hybrid', '10 kVA Hybrid', '15 kVA Hybrid', '20 kVA', '30 kVA Solar'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setInverterCapacity(preset)}
                          className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all ${
                            inverterCapacity === preset
                              ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                              : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Solar Panels */}
                  <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    <label className="text-[11px] font-bold text-slate-300 flex items-center space-x-1.5">
                      <FaSolarPanel className="text-cyan-400 text-xs" />
                      <span>Solar Panels & Watts</span>
                    </label>
                    <input
                      type="text"
                      value={solarPanels}
                      onChange={(e) => setSolarPanels(e.target.value)}
                      placeholder="e.g. 16x 550W Panels (8.8 kW)"
                      className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-1 pt-1">
                      {['1x 450W Panel', '1x 550W Panel', '1x 600W Panel', '4x 550W (2.2 kW)', '8x 550W (4.4 kW)', '12x 550W (6.6 kW)', '16x 550W (8.8 kW)', '24x 600W (14.4 kW)'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setSolarPanels(preset)}
                          className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all ${
                            solarPanels === preset
                              ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                              : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Battery Bank */}
                  <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    <label className="text-[11px] font-bold text-slate-300 flex items-center space-x-1.5">
                      <FaBatteryFull className="text-emerald-400 text-xs" />
                      <span>Battery Storage Capacity</span>
                    </label>
                    <input
                      type="text"
                      value={batteryBank}
                      onChange={(e) => setBatteryBank(e.target.value)}
                      placeholder="e.g. 2x 48V 200Ah Lithium (20 kWh)"
                      className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-1 pt-1">
                      {['12V 200Ah Gel', '24V 200Ah Lithium', '48V 100Ah (5 kWh)', '48V 200Ah (10 kWh)', '15 kWh Lithium', '20 kWh LiFePO4', '30 kWh Industrial'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setBatteryBank(preset)}
                          className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all ${
                            batteryBank === preset
                              ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                              : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    <label className="text-[11px] font-bold text-slate-300 flex items-center space-x-1.5">
                      <FaMapMarkerAlt className="text-rose-400 text-xs" />
                      <span>Location</span>
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Lekki Phase 1, Lagos"
                      className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-1 pt-1">
                      {['Lekki, Lagos', 'Ikoyi, Lagos', 'Victoria Island, Lagos', 'Ikeja, Lagos', 'Abuja, FCT'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setLocation(preset)}
                          className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all ${
                            location === preset
                              ? 'bg-rose-500 text-slate-950 font-bold border-rose-400'
                              : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Completion Date */}
                  <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    <label className="text-[11px] font-bold text-slate-300 flex items-center space-x-1.5">
                      <FaCalendarAlt className="text-blue-400 text-xs" />
                      <span>Completion Date</span>
                    </label>
                    <input
                      type="text"
                      value={completionDate}
                      onChange={(e) => setCompletionDate(e.target.value)}
                      placeholder="e.g. Oct 2024"
                      className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Client Name */}
                  <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    <label className="text-[11px] font-bold text-slate-300 flex items-center space-x-1.5">
                      <FaUserShield className="text-amber-300 text-xs" />
                      <span>Client Name / Estate</span>
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Luxury Estate Villa"
                      className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions & Auto Generator */}
              <div className="space-y-4 pt-2 border-t border-slate-800/80">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Short Card Preview Description
                    </label>
                    <button
                      type="button"
                      onClick={generateShortCardPreview}
                      className="text-[11px] font-extrabold text-amber-400 hover:text-amber-300 bg-slate-900 px-3 py-1 rounded-xl border border-amber-500/30 flex items-center space-x-1 shadow-sm transition-all"
                    >
                      <FaMagic className="text-xs" />
                      <span>+ Auto-Generate Preview from Specs</span>
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Brief 1-2 sentence summary..."
                    className="w-full text-xs p-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">In-Depth Technical Description (Markdown Formatted)</label>
                  <textarea
                    rows={6}
                    value={fullDescription}
                    onChange={(e) => setFullDescription(e.target.value)}
                    placeholder="Technical description in Markdown..."
                    className="w-full text-xs p-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={isSavingProject || isUploadingMedia}
                  className="px-5 py-3 bg-slate-900 text-slate-400 hover:text-white rounded-xl text-xs font-bold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject || isUploadingMedia}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md flex items-center space-x-2 disabled:opacity-50"
                >
                  {isUploadingMedia ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      <span>Uploading Media from Device...</span>
                    </>
                  ) : isSavingProject ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      <span>Saving Project Updates...</span>
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      <span>{editingProject ? 'Save Project Changes' : 'Publish Project'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
