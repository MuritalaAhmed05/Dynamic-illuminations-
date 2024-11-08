import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-[#f5f5f5] shadow-lg flex justify-between items-center px-6 md:px-[9rem] py-5 relative">
      <div className="text-lg font-bold">
        {/* <img src='/images/dynamics-L.png' alt='logo'/> */}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-7">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/service">Service</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/trainig">Trainig</Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Side Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-1 flex flex-col items-start p-6 space-y-5 text-white md:hidden">
          <button onClick={toggleMobileMenu} aria-label="Close menu" className="self-end mb-4">
            <AiOutlineClose size={24} />
          </button>
          <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/about" onClick={toggleMobileMenu}>About</Link>
          <Link to="/service" onClick={toggleMobileMenu}>Service</Link>
          <Link to="/projects" onClick={toggleMobileMenu}>Projects</Link>
          <Link to="/contact" onClick={toggleMobileMenu}>Contact Us</Link>
          <Link to="/trainig" onClick={toggleMobileMenu}>Trainig</Link>
        </div>
      )}
    </div>
  );
}
