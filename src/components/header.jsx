import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg">
      {/* Header container */}
      <div
        className="flex justify-between items-center px-8 py-4 will-change-transform"
        data-aos="fade-down"
        data-aos-anchor="body"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/images/dynamicslogo1.jpg"
            alt="logo"
            className="h-12 object-contain"
          />
          <div className="flex flex-col leading-3">
            <span className="text-2xl font-semibold tracking-[2px] text-[#004B84]">
              Dynamic
            </span>
            <span className="tracking-[5px] text-[#004B84]">Illuminations</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-7 items-center font-semibold">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/service" className="hover:text-blue-600">Service</Link>
          <Link to="/projects" className="hover:text-blue-600">Projects</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact Us</Link>
          <Link to="/training" className="hover:text-blue-600">Training</Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-gray-800">
          {isMobileMenuOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} className='text-blue-800' />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-100 flex flex-col items-start p-6 text-white md:hidden"
          data-aos="fade-left"
          data-aos-anchor="body"
        >
          <button onClick={toggleMobileMenu} className="self-end mb-4">
            <AiOutlineClose size={30} />
          </button>
          <Link to="/" onClick={toggleMobileMenu} className="mb-3 text-xl">Home</Link>
          <Link to="/about" onClick={toggleMobileMenu} className="mb-3 text-xl">About</Link>
          <Link to="/service" onClick={toggleMobileMenu} className="mb-3 text-xl">Service</Link>
          <Link to="/projects" onClick={toggleMobileMenu} className="mb-3 text-xl">Projects</Link>
          <Link to="/contact" onClick={toggleMobileMenu} className="mb-3 text-xl">Contact Us</Link>
          <Link to="/training" onClick={toggleMobileMenu} className="mb-3 text-xl">Training</Link>
        </div>
      )}
    </div>
  );
}
