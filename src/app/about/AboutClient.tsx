'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaShieldAlt, FaAward, FaUsers, FaSun } from 'react-icons/fa';

export default function AboutClient() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const sections = [
    {
      title: "Industrial Solar Installations",
      text: "At Dynamic Illuminations, we pride ourselves on our capability to handle large-scale industrial lighting and solar installations. Whether it's a manufacturing plant, warehouse, or commercial complex, our team is equipped to manage high-volume projects efficiently. We specialize in robust, energy-efficient power solutions that meet demanding industrial requirements.",
      img: "/images/image11.jpg",
      alt: "Industrial Solar Installations"
    },
    {
      title: "Energy-Efficient Solutions Across Nigeria",
      text: "Sustainability is at the core of our engineering. We focus on providing clean solar power and LED lighting solutions that drastically reduce energy overhead. Nationwide delivery and installation ensure every location in Nigeria benefits from our commitment to green energy.",
      img: "/images/panel3.jpg",
      alt: "Energy-Efficient Lighting Across Nigeria"
    },
    {
      title: "Smart Installations with Precise Craftsmanship",
      text: "With smart home technology evolving, we offer remote-controlled lighting and inverter integration for ultimate convenience. We take immense pride in delivering clean, organized, and aesthetic wiring and mounting.",
      img: "/images/battery1.jpg",
      alt: "Smart Home Integration"
    },
    {
      title: "Event Lighting Services with a Guarantee",
      text: "From luxury weddings to major corporate functions, we engineer dynamic lighting atmospheres that elevate special occasions. All our projects carry a standard quality guarantee for total peace of mind.",
      img: "/images/inverters.jpg",
      alt: "Event Lighting Setup"
    },
    {
      title: "Solar Farming & Commercial Systems",
      text: "Beyond residential setups, we design and build commercial solar farms. Harnessing renewable energy for businesses reduces operational expenses while building a sustainable future.",
      img: "/images/farm1.jpeg",
      alt: "Commercial Solar Farming"
    },
    {
      title: "Training & Educational Empowerment",
      text: "We believe in raising skilled engineers. We offer hands-on training sessions for individuals looking to master solar installation, inverter maintenance, and smart lighting automation.",
      img: "/images/traing3.jpg",
      alt: "Training Program"
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16 px-6 sm:px-8 relative overflow-hidden">
      {/* Glow Lights */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <div className="max-w-6xl mx-auto text-center mb-16 relative z-10" data-aos="fade-down">
        <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-gold">
          <FaSun />
          <span>About Dynamic Illuminations</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Pioneering Clean Power & Modern Illumination
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto">
          We combine cutting-edge solar technology, intelligent lighting engineering, and exceptional craftsmanship to power homes, commercial spaces, and industrial projects.
        </p>
      </div>

      {/* Grid of Sections */}
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className={`glass-dark p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col ${
              idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
            } items-center gap-8 shadow-xl hover:border-slate-700 transition-all`}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <div className="w-full md:w-1/2 overflow-hidden rounded-2xl border border-slate-800">
              <img
                src={sec.img}
                alt={sec.alt}
                className="w-full h-[260px] sm:h-[300px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              <h2 className="text-2xl font-bold text-white leading-snug hover:text-amber-400 transition-colors">
                {sec.title}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {sec.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
