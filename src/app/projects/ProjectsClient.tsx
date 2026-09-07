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

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        {loading ? (
          <div className="text-center py-16 border border-slate-800 rounded-2xl glass-dark">
            <p className="text-slate-400">Loading live project portfolio...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl glass-dark">
            <p className="text-slate-400">No projects added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="glass-dark border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group"
                data-aos="fade-up"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
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
                  </div>

                  <div className="p-5">
                    <h2 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">{project.shortDescription}</p>

                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                      <span className="flex items-center space-x-1">
                        <FaImage className="text-cyan-400" />
                        <span>{(project.galleryImages || []).length} Photos</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FaPlay className="text-amber-400 text-[9px]" />
                        <span>{(project.videoUrls || []).length} Videos</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center space-x-2">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex-1 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-semibold py-2.5 rounded-xl text-center border border-slate-800 hover:border-amber-400 flex items-center justify-center space-x-1.5 transition-all shadow-sm"
                  >
                    <FaEye />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
