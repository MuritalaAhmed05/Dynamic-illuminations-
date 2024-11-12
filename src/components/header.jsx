import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='sticky top-0 '>
      <div className="bg-[#f5f5f5] shadow-lg flex justify-between items-center px-8 py-4 relative z-50">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold flex items-center justify-center space-x-3">
          {/* Add a logo if needed */}
          <img src="/images/dynamics-L.png" alt="logo" className="h-12 w-auto object-contain " />
          <div className='flex flex-col text-center leading-3'>
            <span className="text-2xl font-semibold tracking-[2px] font-roboto text-blue-800">Dynamic</span>
            <span className="font-roboto tracking-[5px] text-blue-800 ill">Illuminations</span>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-7 items-center font-semibold">
          <Link to="/" className="hover:text-blue-600 transition-all font-roboto">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition-all font-roboto">About</Link>
          <Link to="/service" className="hover:text-blue-600 transition-all font-roboto">Service</Link>
          <Link to="/projects" className="hover:text-blue-600 transition-all font-roboto">Projects</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-all font-roboto">Contact Us</Link>
          <Link to="/training" className="hover:text-blue-600 transition-all font-roboto">Training</Link>
        </div>
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} aria-label="Toggle menu" className="text-gray-800">
            {isMobileMenuOpen ? (
              <AiOutlineClose size={30} />
            ) : (
              <AiOutlineMenu size={30} />
            )}
          </button>
        </div>
        {/* Mobile Side Navigation */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-1 flex flex-col items-start p-6 space-y-5 text-white md:hidden transition-transform transform duration-300 ease-in-out translate-x-0">
            <button
              onClick={toggleMobileMenu}
              aria-label="Close menu"
              className="self-end mb-4 text-white"
            >
              <AiOutlineClose size={30} />
            </button>
            <Link to="/" onClick={toggleMobileMenu} className="text-xl hover:text-blue-400 transition-all font-roboto">
              Home
            </Link>
            <Link to="/about" onClick={toggleMobileMenu} className="text-xl hover:text-blue-400 transition-all font-roboto">
              About
            </Link>
            <Link to="/service" onClick={toggleMobileMenu} className="text-xl hover:text-blue-400 transition-all font-roboto">
              Service
            </Link>
            <Link to="/projects" onClick={toggleMobileMenu} className="text-xl hover:text-blue-400 transition-all font-roboto">
              Projects
            </Link>
            <Link to="/contact" onClick={toggleMobileMenu} className="text-xl hover:text-blue-400 transition-all font-roboto">
              Contact Us
            </Link>
            <Link to="/training" onClick={toggleMobileMenu} className="text-xl hover:text-blue-400 transition-all font-roboto">
              Trainig
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
