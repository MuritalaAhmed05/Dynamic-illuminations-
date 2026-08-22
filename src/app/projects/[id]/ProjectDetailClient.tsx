'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getProjectByIdFromFirestore, ProjectItem } from '../../../lib/projectsService';
import { 
  FaSolarPanel, 
  FaBolt, 
  FaBatteryFull, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaWhatsapp, 
  FaArrowLeft, 
  FaPlay, 
  FaImage, 
  FaUserShield,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaExpand
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProjectDetailClient({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMedia, setSelectedMedia] = useState<string>('');
  const [isVideo, setIsVideo] = useState<boolean>(false);

  // Fullscreen Image Lightbox Modal State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    async function load() {
      setLoading(true);
      const data = await getProjectByIdFromFirestore(projectId);
      if (data) {
        setProject(data);
        if (data.videoUrls && data.videoUrls.length > 0) {
          setSelectedMedia(data.videoUrls[0]);
          setIsVideo(true);
        } else {
          setSelectedMedia(data.coverImage);
          setIsVideo(false);
        }
      }
      setLoading(false);
    }
    load();
  }, [projectId]);

  // Combine cover image and gallery images for lightbox slider
  const allImages = project
    ? Array.from(new Set([project.coverImage, ...(project.galleryImages || [])]))
    : [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handleLightboxPrev = useCallback(() => {
    if (lightboxIndex === null || allImages.length === 0) return;
    setLightboxIndex((prev) => (prev! === 0 ? allImages.length - 1 : prev! - 1));
  }, [lightboxIndex, allImages.length]);

  const handleLightboxNext = useCallback(() => {
    if (lightboxIndex === null || allImages.length === 0) return;
    setLightboxIndex((prev) => (prev! === allImages.length - 1 ? 0 : prev! + 1));
  }, [lightboxIndex, allImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') handleLightboxPrev();
      if (e.key === 'ArrowRight') handleLightboxNext();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleLightboxPrev, handleLightboxNext]);

  if (loading) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center">
        <p className="text-slate-400 font-medium">Loading project specifications...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-extrabold text-white mb-2">Project Not Found</h1>
        <p className="text-slate-400 text-sm mb-6">The project you are looking for does not exist or was removed.</p>
        <Link href="/projects" className="bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm">
          Return to Projects Portfolio
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Hello Dynamic Illuminations! I am looking at your project "${project.title}" (${project.specs.location}) and would like to get a quotation for a similar installation.`;
  const whatsappUrl = `https://wa.me/2348107533654?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-8 relative z-10">
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 transition-all"
        >
          <FaArrowLeft />
          <span>Back to All Projects</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        {/* Left Column: Media Showcase (7 Columns) */}
        <div className="lg:col-span-7 space-y-6" data-aos="fade-right">
          {/* Main Media Player / Image Display */}
          <div className="glass-dark border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative bg-slate-900 min-h-[350px] sm:min-h-[480px] flex items-center justify-center group">
            {isVideo ? (
              <video
                src={selectedMedia}
                controls
                autoPlay
                className="w-full h-full object-contain max-h-[550px] rounded-3xl"
              />
            ) : (
              <div
                onClick={() => {
                  const idx = allImages.indexOf(selectedMedia || project.coverImage);
                  openLightbox(idx !== -1 ? idx : 0);
                }}
                className="w-full h-full cursor-pointer relative group"
              >
                <img
                  src={selectedMedia || project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover max-h-[550px] rounded-3xl transition-transform duration-300 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 text-white font-bold text-xs">
                  <FaExpand className="text-xl text-amber-400" />
                  <span>Click for Fullscreen Gallery</span>
                </div>
              </div>
            )}
          </div>

          {/* Media Switcher Thumbnails (Photos & Videos) */}
          <div className="glass-dark p-4 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <FaImage className="text-amber-400" />
              <span>Project Media Gallery & Installation Videos</span>
            </h3>

            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hidden">
              {/* Videos */}
              {project.videoUrls.map((vid, idx) => (
                <button
                  key={`vid-${idx}`}
                  onClick={() => {
                    setSelectedMedia(vid);
                    setIsVideo(true);
                  }}
                  className={`relative flex-shrink-0 w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 transition-all bg-slate-900 flex items-center justify-center ${
                    selectedMedia === vid && isVideo
                      ? 'border-amber-400 shadow-md scale-105'
                      : 'border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center">
                    <FaPlay className="text-amber-400 text-lg" />
                  </div>
                  <span className="absolute bottom-1 text-[10px] text-white font-semibold">Video {idx + 1}</span>
                </button>
              ))}

              {/* Photos */}
              {project.galleryImages.map((img, idx) => {
                const imgIndexInAll = allImages.indexOf(img);
                return (
                  <button
                    key={`img-${idx}`}
                    onClick={() => {
                      setSelectedMedia(img);
                      setIsVideo(false);
                      openLightbox(imgIndexInAll !== -1 ? imgIndexInAll : idx);
                    }}
                    className={`relative flex-shrink-0 w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedMedia === img && !isVideo
                        ? 'border-amber-400 shadow-md scale-105'
                        : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Project Technical Details & Specs (5 Columns) */}
        <div className="lg:col-span-5 space-y-6" data-aos="fade-left">
          {/* Header Info */}
          <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="inline-block bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
              {project.category}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
              <FaBolt className="text-amber-400" />
              <span>Installed System Specifications</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center space-x-3">
                <FaBolt className="text-amber-400 text-xl flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Inverter Capacity</div>
                  <div className="font-bold text-white text-sm">{project.specs.inverterCapacity}</div>
                </div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center space-x-3">
                <FaSolarPanel className="text-cyan-400 text-xl flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Solar Panels</div>
                  <div className="font-bold text-white text-sm">{project.specs.solarPanels}</div>
                </div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center space-x-3">
                <FaBatteryFull className="text-emerald-400 text-xl flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Battery Bank</div>
                  <div className="font-bold text-white text-sm">{project.specs.batteryBank}</div>
                </div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center space-x-3">
                <FaMapMarkerAlt className="text-rose-400 text-xl flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Location</div>
                  <div className="font-bold text-white text-sm">{project.specs.location}</div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Inquiry Button */}
            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 px-6 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <FaWhatsapp className="text-2xl" />
                <span className="text-base tracking-wide">Inquire About Similar Project</span>
              </a>
            </div>
          </div>

          {/* Full Technical Description */}
          <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">
              Engineering Breakdown & Results
            </h3>
            <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
              {project.fullDescription}
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      {lightboxIndex !== null && allImages.length > 0 && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 z-50 text-white hover:text-amber-400 p-3 bg-slate-900/80 border border-slate-700 rounded-full transition-all shadow-xl"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Photo Index Counter */}
          <div className="absolute top-6 left-6 z-50 text-xs font-bold text-slate-200 bg-slate-900/80 border border-slate-700 px-4 py-2 rounded-full shadow-xl">
            Photo {lightboxIndex + 1} of {allImages.length}
          </div>

          {/* Scroll Left Button */}
          <button
            onClick={handleLightboxPrev}
            aria-label="Previous Image"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 text-amber-400 hover:text-slate-950 bg-slate-900/90 hover:bg-amber-500 border border-slate-700 p-4 rounded-full transition-all shadow-2xl"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          {/* Scroll Right Button */}
          <button
            onClick={handleLightboxNext}
            aria-label="Next Image"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 text-amber-400 hover:text-slate-950 bg-slate-900/90 hover:bg-amber-500 border border-slate-700 p-4 rounded-full transition-all shadow-2xl"
          >
            <FaChevronRight className="text-xl" />
          </button>

          {/* Main Fullscreen Image View */}
          <div className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center p-2">
            <img
              src={allImages[lightboxIndex]}
              alt={`Fullscreen ${project.title}`}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200"
            />
          </div>
        </div>
      )}
    </div>
  );
}
