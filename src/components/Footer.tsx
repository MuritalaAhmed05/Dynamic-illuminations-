'use client';

import React, { useEffect } from "react";
import {
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaPhone,
  FaLocationDot,
  FaCalculator,
} from "react-icons/fa6";
import { MdWhatsapp } from "react-icons/md";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Footer() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <footer className="bg-slate-950 text-gray-300 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand Info with Dual Logos */}
        <div className="flex flex-col space-y-4" data-aos="fade-up">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/images/dynamic-logo-transparent.png"
              alt="Dynamic Illuminations Emblem"
              className="h-12 w-auto object-contain"
            />
            <img
              src="/images/dynamic-logo-side.png"
              alt="Dynamic Illuminations Side Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Leading provider of innovative architectural lighting, commercial solar systems, smart home automation, and professional electrical engineering solutions across Nigeria.
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href="https://www.instagram.com/dynamic_illuminations/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400/50 hover:shadow-glow-gold transition-all"
              aria-label="Instagram"
            >
              <FaInstagram className="text-lg" />
            </a>
            <a
              href="https://www.instagram.com/dynamic_illuminations/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-glow-cyan transition-all"
              aria-label="Twitter"
            >
              <FaXTwitter className="text-lg" />
            </a>
            <a
              href="https://www.tiktok.com/@dynamic_illuminations1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-rose-400 hover:border-rose-400/50 hover:shadow-glow-pink transition-all"
              aria-label="TikTok"
            >
              <FaTiktok className="text-lg" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-4" data-aos="fade-up" data-aos-delay="150">
          <h3 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2">
            Get In Touch
          </h3>
          <div className="flex items-start space-x-3 text-sm text-gray-400">
            <FaLocationDot className="text-amber-500 mt-1 flex-shrink-0" />
            <span>3C, Complex St, Finbarrs Road, Akoka, Lagos, Nigeria</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <MdWhatsapp className="text-green-500 text-lg flex-shrink-0" />
            <a href="https://wa.me/2348107533654" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              +234 810 753 3654
            </a>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <FaPhone className="text-blue-500 flex-shrink-0" />
            <a href="tel:+2348107533654" className="hover:text-white transition-colors">
              +234 810 753 3654
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-3" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2">
            Quick Links
          </h3>
          <Link href="/calculator" className="text-amber-400 hover:text-amber-300 font-semibold text-sm flex items-center space-x-2 transition-colors">
            <FaCalculator />
            <span>Solar Load Calculator</span>
          </Link>
          <Link href="/service" className="text-gray-400 hover:text-white text-sm transition-colors">
            Our Services
          </Link>
          <Link href="/projects" className="text-gray-400 hover:text-white text-sm transition-colors">
            Recent Projects
          </Link>
          <Link href="/training" className="text-gray-400 hover:text-white text-sm transition-colors">
            Professional Training
          </Link>
          <Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">
            Frequently Asked Questions
          </Link>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col space-y-4" data-aos="fade-up" data-aos-delay="450">
          <h3 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2">
            Subscribe
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed">
            Subscribe to receive expert tips on solar energy, smart lighting trends, and exclusive promotional offers.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-slate-900 border border-slate-800 rounded-lg text-gray-200 text-sm px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors shadow-md"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8 border-t border-slate-900 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Dynamic Illuminations. All rights reserved. Designed for Excellence.</p>
      </div>
    </footer>
  );
}
