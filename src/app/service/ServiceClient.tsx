'use client';

import React, { useEffect } from 'react';
import {
  FaLightbulb,
  FaTools,
  FaHome,
  FaProjectDiagram,
  FaCalendarCheck,
  FaDesktop,
  FaBuilding,
  FaPeopleCarry,
  FaSolarPanel,
  FaCamera,
  FaBatteryFull,
  FaPlug,
  FaBolt
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ServiceClient() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const services = [
    {
      icon: <FaLightbulb className="text-amber-400 text-4xl mb-4" />,
      title: 'Architectural Lighting',
      description: 'Transforming interior and exterior spaces with creative, energy-efficient lighting designs.',
    },
    {
      icon: <FaTools className="text-cyan-400 text-4xl mb-4" />,
      title: 'Smart Home Automation',
      description: 'Automating lighting, inverter power, and climate control for comfort and energy savings.',
    },
    {
      icon: <FaHome className="text-emerald-400 text-4xl mb-4" />,
      title: 'Residential Lighting',
      description: 'Customized ambient, task, and accent lighting solutions for high-end residential homes.',
    },
    {
      icon: <FaProjectDiagram className="text-blue-400 text-4xl mb-4" />,
      title: 'Commercial Projects',
      description: 'Professional lighting and solar engineering for corporate offices, retail malls, and hotels.',
    },
    {
      icon: <FaCalendarCheck className="text-purple-400 text-4xl mb-4" />,
      title: 'Event Lighting',
      description: 'Unforgettable atmospheres with high-impact stage lighting and customized event setups.',
    },
    {
      icon: <FaDesktop className="text-sky-400 text-4xl mb-4" />,
      title: 'Lighting Design Consulting',
      description: 'Expert consulting and CAD layout planning for custom lighting architecture.',
    },
    {
      icon: <FaBuilding className="text-amber-500 text-4xl mb-4" />,
      title: 'Outdoor & Facade Lighting',
      description: 'Weatherproof, high-lumen outdoor lighting for building facades, gardens, and pathways.',
    },
    {
      icon: <FaPeopleCarry className="text-teal-400 text-4xl mb-4" />,
      title: 'Public Space Lighting',
      description: 'Designing safe, functional, and aesthetically pleasing street and park solar lights.',
    },
    {
      icon: <FaCamera className="text-rose-400 text-4xl mb-4" />,
      title: 'CCTV & Security Systems',
      description: 'Securing properties with smart surveillance CCTV cameras and remote IP access.',
    },
    {
      icon: <FaSolarPanel className="text-amber-400 text-4xl mb-4" />,
      title: 'Solar Inverter Systems',
      description: 'Hybrid solar energy systems designed for 24/7 uninterrupted power supply.',
    },
    {
      icon: <FaBatteryFull className="text-emerald-400 text-4xl mb-4" />,
      title: 'Solar Panels & Lithium Batteries',
      description: 'Sales and installation of Tier-1 solar panels, Lithium-ion, and Gel batteries.',
    },
    {
      icon: <FaPlug className="text-cyan-400 text-4xl mb-4" />,
      title: 'Electrical Wiring & Maintenance',
      description: 'Certified electrical wiring, load balancing, and routine system maintenance.',
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16 px-6 sm:px-8 relative overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center mb-16 relative z-10" data-aos="fade-down">
        <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-gold">
          <FaBolt />
          <span>Our Specialized Engineering Services</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Complete Lighting & Energy Solutions
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto">
          We bring light, intelligence, and sustainable solar power to residential, commercial, and industrial developments across Nigeria.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="glass-dark p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 transform hover:-translate-y-2 group flex flex-col justify-between shadow-xl"
            data-aos="fade-up" 
            data-aos-delay={index * 75} 
          >
            <div>
              <div className="transition-transform group-hover:scale-110 duration-300">{service.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                {service.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
