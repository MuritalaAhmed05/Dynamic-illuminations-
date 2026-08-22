'use client';

import React, { useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ContactClient() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16 px-6 sm:px-8 relative overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center mb-16 relative z-10" data-aos="fade-down">
        <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-md">
          <FaWhatsapp className="text-emerald-400" />
          <span>We&apos;re Here To Help</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Contact Our Engineering Team
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Have questions or need a quotation for a solar, lighting, or wiring project? Reach out to us directly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div
            className="glass-dark p-6 rounded-2xl border border-slate-800 text-center flex flex-col items-center shadow-xl hover:border-slate-700 transition-all"
            data-aos="fade-up"
          >
            <FaPhone className="text-amber-400 text-3xl mb-4" />
            <h3 className="font-bold text-lg text-white mb-1">Call Us</h3>
            <a href="tel:+2348107533654" className="text-slate-400 text-sm hover:text-amber-400 transition-colors">+234 810 753 3654</a>
          </div>

          <div
            className="glass-dark p-6 rounded-2xl border border-slate-800 text-center flex flex-col items-center shadow-xl hover:border-slate-700 transition-all"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <FaEnvelope className="text-cyan-400 text-3xl mb-4" />
            <h3 className="font-bold text-lg text-white mb-1">Email Us</h3>
            <a href="mailto:dynamicsilluminations44@gmail.com" className="text-slate-400 text-sm hover:text-cyan-400 transition-colors">
              dynamicsilluminations44@gmail.com
            </a>
          </div>

          <div
            className="glass-dark p-6 rounded-2xl border border-slate-800 text-center flex flex-col items-center shadow-xl hover:border-slate-700 transition-all"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <FaMapMarkerAlt className="text-emerald-400 text-3xl mb-4" />
            <h3 className="font-bold text-lg text-white mb-1">Visit Office</h3>
            <p className="text-slate-400 text-sm">3C, Complex St, Finbarrs Road, Akoka, Lagos</p>
          </div>
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form
            className="glass-dark p-8 rounded-3xl border border-slate-800 shadow-xl"
            data-aos="fade-up"
            data-aos-delay="200"
            action="https://formspree.io/f/xnnqzaqw"
            method="POST"
          >
            <h3 className="text-xl font-bold text-white mb-6">Send Us a Direct Message</h3>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Full Name"
                className="w-full p-3.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email Address"
                className="w-full p-3.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Message</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                placeholder="How can we assist you with your project?"
                className="w-full p-3.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-xl shadow-md transition-all"
            >
              Send Message
            </button>
          </form>

          {/* Map Embed */}
          <div className="glass-dark rounded-3xl border border-slate-800 overflow-hidden shadow-xl min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.97634263081!2d3.3829417738266323!3d6.524671223152128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d020bb422d1%3A0xcd6f6a180ec6098!2s3C%20Complex!5e0!3m2!1sen!2sng!4v1731166428810!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Company Location Map"
              className="w-full h-full min-h-[400px]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
