'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { 
  FaSolarPanel, 
  FaLightbulb, 
  FaHome, 
  FaGraduationCap, 
  FaCalculator, 
  FaWhatsapp, 
  FaArrowRight, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaAward, 
  FaBolt,
  FaPiggyBank,
  FaGasPump
} from 'react-icons/fa';
import { MdOutlineElectricalServices } from 'react-icons/md';
import MyCarousel from '../components/carousel';
import { places } from '../components/data';
import ReviewList from '../components/ReviewList';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HomeClient() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const services = [
    {
      title: 'Solar Power Systems',
      desc: 'Clean, continuous, zero-downtime hybrid inverter solar solutions for residential duplexes, estates, and commercial facilities.',
      icon: <FaSolarPanel className="text-amber-400 text-3xl mb-4" />,
    },
    {
      title: 'Architectural Lighting',
      desc: 'Stunning facade lighting, LED neon accenting, landscape garden illumination, and luxury indoor ambient chandeliers.',
      icon: <FaLightbulb className="text-cyan-400 text-3xl mb-4" />,
    },
    {
      title: 'Smart Home Automation',
      desc: 'Centralized mobile app light control, automated ambient scene switching, and integrated security CCTV surveillance.',
      icon: <FaHome className="text-emerald-400 text-3xl mb-4" />,
    },
    {
      title: 'Technical Training Academy',
      desc: 'Hands-on practical training programs in solar installation, inverter maintenance, and professional electrical engineering.',
      icon: <FaGraduationCap className="text-blue-400 text-3xl mb-4" />,
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-16 pb-24 md:pt-28 md:pb-36 overflow-hidden">
        {/* Background Ambient Lights */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full filter blur-[140px] pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <div data-aos="fade-down" className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 text-amber-400 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6 shadow-glow-gold">
            <FaAward className="text-amber-400" />
            <span>Nigeria&apos;s Premier Solar & Architectural Lighting Engineers</span>
          </div>

          <h1 data-aos="fade-up" className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 max-w-5xl mx-auto">
            Powering Your Space with <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">Solar Energy</span> & Dynamic Lighting
          </h1>

          <p data-aos="fade-up" data-aos-delay="100" className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            We design high-performance hybrid solar power systems, smart home automation, and luxury architectural lighting that reduce fuel costs by over 80%.
          </p>

          <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-glow-gold text-base transition-all transform hover:scale-105"
            >
              <FaCalculator className="text-xl" />
              <span>Solar & ROI Savings Calculator</span>
            </Link>

            <a
              href="https://wa.me/2348107533654?text=Hello%20Dynamic%20Illuminations!%20I%20would%20like%20to%20request%20a%20free%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all transform hover:scale-105"
            >
              <FaWhatsapp className="text-emerald-400 text-2xl" />
              <span>Get Free Quote</span>
            </a>
          </div>

          {/* Quick Highlights Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 text-left" data-aos="fade-up" data-aos-delay="300">
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80">
              <div className="text-amber-400 font-extrabold text-2xl">24/7</div>
              <div className="text-slate-400 text-xs mt-0.5">Uninterrupted Backup</div>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80">
              <div className="text-cyan-400 font-extrabold text-2xl">80%+</div>
              <div className="text-slate-400 text-xs mt-0.5">Generator Fuel Saved</div>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80">
              <div className="text-emerald-400 font-extrabold text-2xl">Tier-1</div>
              <div className="text-slate-400 text-xs mt-0.5">Panels & Lithium Tech</div>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80">
              <div className="text-blue-400 font-extrabold text-2xl">100%</div>
              <div className="text-slate-400 text-xs mt-0.5">Certified Engineers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Installation Carousel Section */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-8" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Featured Lighting & Solar Installations
            </h2>
            <p className="text-sm text-slate-400 mt-2">Take a look at some of our recent high-profile installations across Nigeria.</p>
          </div>
          <MyCarousel images={places} />
        </div>
      </section>

      {/* Solar & Diesel ROI Calculator Highlight Banner */}
      <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/60 border border-amber-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8" data-aos="zoom-in">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <FaGasPump className="text-base" />
              <span>Generator Fuel vs Solar Savings Calculator</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Tired of High Diesel Generator Fuel Costs?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Use our interactive **Solar ROI Calculator** to select your generator size (5-50 kVA) and daily running hours to see how fast solar pays for itself and how many **Millions of Naira** you save over 5 to 10 years!
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-8 py-4 rounded-2xl shadow-glow-gold text-base transition-all transform hover:scale-105"
            >
              <FaPiggyBank className="text-xl" />
              <span>Calculate My Diesel Savings</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Services Grid */}
      <section className="py-20 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Our Core Services
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Comprehensive electrical engineering, solar power, and architectural lighting solutions tailored for homes, businesses, and commercial industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-dark p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:shadow-glow-blue transition-all duration-300 transform hover:-translate-y-2 group flex flex-col justify-between"
              data-aos="fade-up"
              data-aos-delay={index * 75}
            >
              <div>
                <div className="transition-transform group-hover:scale-110 duration-300">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <Link href="/service" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center space-x-1">
                  <span>Learn more</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-slate-400 text-sm mt-2">Feedback from satisfied home owners, corporations, and event planners.</p>
          </div>
          <ReviewList />
        </div>
      </section>
    </div>
  );
}
