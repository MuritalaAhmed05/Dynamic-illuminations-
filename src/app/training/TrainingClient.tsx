'use client';

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGraduationCap, FaWhatsapp } from "react-icons/fa";

interface TrainingProgram {
  id: number;
  title: string;
  description: string;
  image: string;
}

const trainingPrograms: TrainingProgram[] = [
  {
    id: 1,
    title: "Advanced Lighting Design",
    description:
      "Learn how to engineer dynamic lighting systems for commercial and luxury residential spaces, covering fixtures, photometric calculations, and trends.",
    image: "/images/traing3.jpg",
  },
  {
    id: 2,
    title: "Smart Automation & IoT",
    description:
      "Master the integration of smart home systems, wireless controllers, mobile automation, and energy efficiency techniques.",
    image: "/images/traing5.jpg",
  },
  {
    id: 3,
    title: "Solar & Inverter Installation",
    description:
      "Gain hands-on practical experience in sizing, installing, and servicing solar panels, hybrid inverters, and Lithium battery storage systems.",
    image: "/images/training.jpg",
  },
];

export default function TrainingClient() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16 px-6 sm:px-8 relative overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center mb-16 relative z-10" data-aos="fade-down">
        <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-gold">
          <FaGraduationCap className="text-base" />
          <span>Professional Academy & Empowerment</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Hands-On Engineering Training
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto">
          Empowering the next generation of lighting technicians and certified solar installation engineers.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {trainingPrograms.map((program) => (
          <div
            key={program.id}
            className="glass-dark rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group"
            data-aos="fade-up"
            data-aos-delay={`${program.id * 150}`}
          >
            <div className="h-52 overflow-hidden">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {program.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{program.description}</p>
              </div>
              <a
                href="https://wa.me/2348107533654?text=Hello%20Dynamic%20Illuminations!%20I%20am%20interested%20in%20enrolling%20in%20your%20training%20program."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 font-bold py-3 px-6 rounded-xl transition-all"
              >
                Enroll Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
