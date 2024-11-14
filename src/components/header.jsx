// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-[#ffffff] shadow-lg flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold flex items-center space-x-3">
          <img src="/images/dynamicslogo1.jpg" alt="logo" className="h-12 object-contain" />
          <div className="flex flex-col leading-3">
            <span className="text-2xl font-semibold tracking-[2px] text-blue-800">Dynamic</span>
            <span className="tracking-[5px] text-blue-800">Illuminations</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-7 items-center font-semibold">
          <Link to="/" className="hover:text-blue-600 transition-all">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition-all">About</Link>
          <Link to="/service" className="hover:text-blue-600 transition-all">Service</Link>
          <Link to="/projects" className="hover:text-blue-600 transition-all">Projects</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-all">Contact Us</Link>
          <Link to="/training" className="hover:text-blue-600 transition-all">Training</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-800">
            {isMobileMenuOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex flex-col items-start p-6 text-white md:hidden">
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
    </div>
  );
}
