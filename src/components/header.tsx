'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaCalculator, FaWhatsapp } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/service' },
    { name: 'Projects', href: '/projects' },
    { name: 'Energy Calculator', href: '/calculator', isHighlight: true },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Training', href: '/training' },
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/95 backdrop-blur-xl shadow-xl border-b border-slate-800 py-2.5' 
          : 'bg-slate-950/85 backdrop-blur-md py-3 border-b border-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8">
          {/* Dual Logos Side-by-Side Flex Container */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group py-1">
            <img
              src="/images/dynamic-logo-transparent.png"
              alt="Dynamic Illuminations Emblem"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
            />
            <img
              src="/images/dynamic-logo-side.png"
              alt="Dynamic Illuminations Typography"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 font-medium text-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.isHighlight) {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-full transition-all duration-300 font-semibold text-xs uppercase tracking-wider ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                        : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                    }`}
                  >
                    <FaCalculator className="text-xs" />
                    <span>{link.name}</span>
                  </Link>
                );
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors duration-200 text-sm tracking-wide ${
                    isActive
                      ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-1'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Quick CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/2348107533654?text=Hello%20Dynamic%20Illuminations!%20I%20would%20like%20to%20get%20a%20free%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md transform hover:-translate-y-0.5"
            >
              <FaWhatsapp className="text-emerald-400 text-lg" />
              <span>Get Free Quote</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-slate-200 p-2 focus:outline-none z-50"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose size={28} className="text-white" />
            ) : (
              <AiOutlineMenu size={28} className="text-amber-400" />
            )}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-950 w-screen h-screen flex flex-col justify-between p-6 sm:p-8 text-white lg:hidden overflow-y-auto top-0 left-0 right-0 bottom-0">
          <div className="flex justify-between items-center pb-6 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <img
                src="/images/dynamic-logo-transparent.png"
                alt="Dynamic Illuminations Emblem"
                className="h-9 w-auto object-contain"
              />
              <img
                src="/images/dynamic-logo-side.png"
                alt="Dynamic Illuminations Logo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-slate-300 hover:text-white p-2"
              aria-label="Close Menu"
            >
              <AiOutlineClose size={28} />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 my-auto py-6 text-lg font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 py-3 px-4 rounded-xl transition-colors ${
                  pathname === link.href
                    ? 'bg-blue-900/60 text-amber-400 font-bold border border-blue-700/50'
                    : 'text-slate-200 hover:bg-slate-900'
                }`}
              >
                {link.isHighlight && <FaCalculator className="text-amber-400" />}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-slate-800 space-y-3">
            <a
              href="https://wa.me/2348107533654?text=Hello%20Dynamic%20Illuminations!%20I%20would%20like%20to%20get%20a%20free%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl shadow-md"
            >
              <FaWhatsapp className="text-xl" />
              <span>Request Quote on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
