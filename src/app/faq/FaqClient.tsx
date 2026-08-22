'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaSolarPanel, 
  FaBolt, 
  FaBatteryFull, 
  FaLightbulb, 
  FaQuestionCircle, 
  FaChevronDown, 
  FaSearch, 
  FaWhatsapp,
  FaShieldAlt,
  FaMoneyBillWave
} from 'react-icons/fa';
import { MdOutlineElectricalServices } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface FaqItem {
  id: string;
  category: 'Solar Power' | 'Architectural Lighting' | 'Batteries & Inverters' | 'Warranties & Pricing';
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Solar Power',
    question: 'How do solar panels convert sunlight into continuous 24/7 power for my home?',
    answer: 'Photovoltaic (PV) solar panels convert sunlight into DC electricity. Our hybrid solar inverters convert this DC power into clean AC electricity for your appliances while simultaneously charging high-capacity Lithium batteries. At night, the batteries automatically supply seamless zero-downtime electricity.',
    icon: <FaSolarPanel className="text-amber-400 text-xl" />,
  },
  {
    id: 'faq-2',
    category: 'Batteries & Inverters',
    question: 'Why are Lithium LiFePO4 batteries superior to older Gel/Tubular batteries?',
    answer: 'Lithium Iron Phosphate (LiFePO4) batteries offer 10–15 years of lifespan (over 4,000+ deep cycles) with 95% depth of discharge and rapid 2-hour charging. Older Gel or Tubular batteries last only 2 years and suffer heavy capacity degradation under Nigerian heat.',
    icon: <FaBatteryFull className="text-emerald-400 text-xl" />,
  },
  {
    id: 'faq-3',
    category: 'Solar Power',
    question: 'How much money can I save on generator diesel fuel by switching to solar?',
    answer: 'With current diesel costs above ₦1,350/Liter, running a 10 kVA generator for 10 hours daily costs over ₦890,000 monthly! A Dynamic Illuminations solar system pays for itself in ~12 to 14 months, saving you tens of Millions of Naira over 5 to 10 years.',
    icon: <FaMoneyBillWave className="text-amber-400 text-xl" />,
  },
  {
    id: 'faq-4',
    category: 'Architectural Lighting',
    question: 'What is dynamic facade and ambient architectural lighting?',
    answer: 'Dynamic architectural illumination involves designing custom LED facade wash lighting, warm interior cove lights, and landscape garden accents with smart sensors and mobile app control to elevate property aesthetics and property market value.',
    icon: <FaLightbulb className="text-cyan-400 text-xl" />,
  },
  {
    id: 'faq-5',
    category: 'Architectural Lighting',
    question: 'Can I control my facade and interior lights remotely from my smartphone?',
    answer: 'Yes! We integrate smart Wi-Fi / Zigbee automation controllers allowing you to change lighting colors, set automated sunset timers, and adjust brightness levels directly from your iOS/Android smartphone or smart home hubs.',
    icon: <FaBolt className="text-amber-300 text-xl" />,
  },
  {
    id: 'faq-6',
    category: 'Warranties & Pricing',
    question: 'What warranties come with Dynamic Illuminations solar installations?',
    answer: 'All installations come with a 1-Year Comprehensive Workmanship & Maintenance Warranty, up to 25-Year Performance Warranties on Tier-1 Solar Panels, and 5-to-10-Year Manufacturer Warranties on Lithium Battery Banks.',
    icon: <FaShieldAlt className="text-blue-400 text-xl" />,
  },
];

export default function FaqClient() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [activeCircuitNode, setActiveCircuitNode] = useState<number>(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    // Circuit animation pulse loop
    const interval = setInterval(() => {
      setActiveCircuitNode((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesTab = activeTab === 'All' || faq.category === activeTab;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Header with Live Animated Energy Flow Diagram */}
        <div className="text-center space-y-4" data-aos="fade-down">
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
            <FaBolt className="text-amber-400 animate-pulse" />
            <span>Interactive Knowledge & Power Center</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            How <span className="text-amber-400">Dynamic Illuminations</span> Works
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore how solar power generation, lithium energy storage, and architectural lighting integrate into a continuous 24/7 smart system!
          </p>

          {/* DYNAMIC ANIMATED ENERGY FLOW DIAGRAM */}
          <div className="pt-6">
            <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden bg-slate-900">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-center space-x-2">
                <MdOutlineElectricalServices className="text-amber-400 text-lg" />
                <span>Live Solar & Lighting Power Circuit Diagram</span>
              </div>

              {/* Interactive Node Flow Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                {/* Node 1: Sun & Solar Panels */}
                <div
                  className={`p-4 rounded-2xl border transition-all duration-500 flex flex-col items-center text-center space-y-2 relative ${
                    activeCircuitNode === 0
                      ? 'bg-amber-500/20 border-amber-500 shadow-md scale-105'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-400 text-2xl">
                    <FaSolarPanel className={activeCircuitNode === 0 ? 'animate-bounce' : ''} />
                  </div>
                  <div className="text-xs font-extrabold text-white">1. Solar Panel Array</div>
                  <div className="text-[10px] text-slate-400">Captures Sunlight (DC)</div>
                </div>

                {/* Node 2: Hybrid Inverter */}
                <div
                  className={`p-4 rounded-2xl border transition-all duration-500 flex flex-col items-center text-center space-y-2 relative ${
                    activeCircuitNode === 1
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-md scale-105'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-cyan-400 text-2xl">
                    <FaBolt className={activeCircuitNode === 1 ? 'animate-pulse' : ''} />
                  </div>
                  <div className="text-xs font-extrabold text-white">2. Hybrid Inverter</div>
                  <div className="text-[10px] text-slate-400">Converts to Pure AC</div>
                </div>

                {/* Node 3: Lithium Battery Bank */}
                <div
                  className={`p-4 rounded-2xl border transition-all duration-500 flex flex-col items-center text-center space-y-2 relative ${
                    activeCircuitNode === 2
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-md scale-105'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-400 text-2xl">
                    <FaBatteryFull className={activeCircuitNode === 2 ? 'animate-pulse' : ''} />
                  </div>
                  <div className="text-xs font-extrabold text-white">3. Lithium Storage</div>
                  <div className="text-[10px] text-slate-400">Stores Night Backup</div>
                </div>

                {/* Node 4: Architectural Lighting & Home */}
                <div
                  className={`p-4 rounded-2xl border transition-all duration-500 flex flex-col items-center text-center space-y-2 relative ${
                    activeCircuitNode === 3
                      ? 'bg-amber-400/20 border-amber-300 shadow-md scale-105'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-300 text-2xl">
                    <FaLightbulb className={activeCircuitNode === 3 ? 'animate-bounce' : ''} />
                  </div>
                  <div className="text-xs font-extrabold text-white">4. Smart Lighting & Home</div>
                  <div className="text-[10px] text-slate-400">24/7 Continuous Power</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Navigation */}
        <div className="space-y-6" data-aos="fade-up">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search any question (e.g. warranty, lithium, inverter size, diesel cost...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 bg-slate-900/90 border border-slate-800 text-slate-100 rounded-2xl text-xs sm:text-sm shadow-2xl focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-slate-500"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 text-base" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'Solar Power', 'Batteries & Inverters', 'Architectural Lighting', 'Warranties & Pricing'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-102'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Cards List */}
        <div className="space-y-4" data-aos="fade-up">
          {filteredFaqs.length === 0 ? (
            <div className="glass-dark p-10 rounded-3xl border border-slate-800 text-center space-y-3">
              <FaQuestionCircle className="text-amber-400 text-3xl mx-auto" />
              <h3 className="text-lg font-bold text-white">No Matching Questions Found</h3>
              <p className="text-xs text-slate-400">
                Try typing another keyword or chat directly with an engineer on WhatsApp!
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`glass-dark border rounded-3xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-amber-500/50 shadow-md bg-slate-900/90' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex-shrink-0">
                        {faq.icon}
                      </div>
                      <div>
                        <span className="inline-block bg-slate-900 border border-slate-800 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1">
                          {faq.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-amber-500 text-slate-950' : ''
                      }`}
                    >
                      <FaChevronDown className="text-xs" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Ask Engineer WhatsApp Banner */}
        <div className="bg-slate-900 p-8 rounded-3xl border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left" data-aos="zoom-in">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-white">
              Have a Specific Technical Question?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Chat directly with our senior solar & lighting engineers for a free site consultation!
            </p>
          </div>

          <a
            href="https://wa.me/2348107533654?text=Hello%20Dynamic%20Illuminations!%20I%20have%20a%20technical%20question%20about%20your%20solar%20and%20lighting%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center space-x-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 text-xs sm:text-sm"
          >
            <FaWhatsapp className="text-xl sm:text-2xl" />
            <span>Chat 24/7 on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
