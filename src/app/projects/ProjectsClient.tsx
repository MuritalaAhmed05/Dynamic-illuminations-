'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { getProjectsFromFirestore, ProjectItem } from '../../lib/projectsService';
import { useAuth } from '../../context/AuthContext';
import { FaSolarPanel, FaBuilding, FaAward, FaEye, FaShieldAlt, FaPlus, FaPlay, FaImage } from 'react-icons/fa';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

export default function ProjectsClient() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { isAdmin } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    async function load() {
      setLoading(true);
      const data = await getProjectsFromFirestore();
      setProjects(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16 px-6 sm:px-8 relative overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-20 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <div className="max-w-6xl mx-auto text-center mb-12 relative z-10" data-aos="fade-down">
        <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-md">
          <FaAward />
          <span>Our Portfolio & Installation Case Studies</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Featured Engineering Projects
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto">
          Explore our recent solar power setups, architectural lighting, and smart home automation projects across Nigeria.
        </p>

        {/* Admin Bar Badge */}
        {isAdmin && (
          <div className="mt-6 inline-flex items-center space-x-3 bg-slate-900/90 border border-amber-500/40 px-4 py-2 rounded-2xl">
            <span className="text-xs text-amber-400 font-bold flex items-center space-x-1.5">
              <FaShieldAlt />
              <span>Admin Mode Active</span>
            </span>
            <Link
              href="/admin/dashboard"
              className="bg-amber-500 text-slate-950 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-md hover:bg-amber-400 transition-colors"
            >
              Manage Projects Portal
            </Link>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="max-w-6xl mx-auto mb-12 flex flex-wrap justify-center gap-2 relative z-10">
        {['All', 'Solar Power', 'Architectural Lighting', 'Smart Home', 'Event Lighting', 'Commercial Setup'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto relative z-10">
        {loading ? (
          <div className="text-center py-16 border border-slate-800 rounded-3xl glass-dark">
            <p className="text-slate-400">Loading live project portfolio...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-3xl glass-dark">
            <p className="text-slate-400">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-dark rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group"
                data-aos="fade-up"
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.coverImage || '/images/panel1.jpg'}
                    alt={project.title}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src && !target.src.includes('data:image') && !target.src.includes('panel1.jpg')) {
                        target.src = '/images/panel1.jpg';
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-slate-800 text-amber-400 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {project.category}
                  </div>

                  {/* Media Badges */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {project.videoUrls && project.videoUrls.length > 0 && (
                      <span className="bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                        <FaPlay className="text-[9px]" />
                        <span>{project.videoUrls.length} Video{project.videoUrls.length > 1 ? 's' : ''}</span>
                      </span>
                    )}
                    {project.galleryImages && project.galleryImages.length > 0 && (
                      <span className="bg-slate-950/80 backdrop-blur-md border border-slate-800 text-cyan-400 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                        <FaImage className="text-[9px]" />
                        <span>{project.galleryImages.length} Photos</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">{project.shortDescription}</p>

                    {/* Quick Specs Pill */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 mb-6">
                      <div><strong className="text-amber-400">Inverter:</strong> {project.specs.inverterCapacity}</div>
                      <div><strong className="text-cyan-400">Panels:</strong> {project.specs.solarPanels}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex-1 inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-md text-sm transition-all transform hover:-translate-y-0.5"
                    >
                      <FaEye />
                      <span>View Full Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
