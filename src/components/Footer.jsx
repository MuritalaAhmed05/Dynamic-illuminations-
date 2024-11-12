import React from "react";
import {
  FaInstagram,
  // FaSquareFacebook,
  FaXTwitter,
  FaLinkedin,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";
import { MdOutlineMailOutline, MdWhatsapp } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-gray-900 text-gray-200">
      {/* Main Container */}
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-9 p-8">
        {/* Logo & Social Links */}
        <div className="flex flex-col items-start">
          <img src="/images/dynamics-L.png" alt="logo" className="w-32 mb-6" />
          <div className='flex flex-col text-center leading-3 mb-4'>
          <span className="text-2xl font-semibold tracking-[2px] font-roboto text-blue-800">Dynamic</span>
          <span className="font-roboto tracking-[5px] text-blue-800 ill">Illuminations</span>
        </div>
          <div className="flex gap-4 items-center">
            <FaInstagram className="hover:text-pink-500 transition-all text-3xl sm:text-2xl" />
            {/* <FaSquareFacebook className="hover:text-blue-500 transition-all text-3xl sm:text-2xl" /> */}
            <FaXTwitter className="hover:text-blue-400 transition-all text-3xl sm:text-2xl" />
            <FaLinkedin className="hover:text-blue-600 transition-all text-3xl sm:text-2xl" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-3">
          <p className="font-bold text-gray-300">Quick Links</p>
          <Link to="/" className="hover:text-cyan-400 transition-colors text-sm">
            Home
          </Link>
          <Link to="/about" className="hover:text-cyan-400 transition-colors text-sm">
            About
          </Link>
          <Link to="/service" className="hover:text-cyan-400 transition-colors text-sm">
            Service
          </Link>
          <Link to="/projects" className="hover:text-cyan-400 transition-colors text-sm">
            Projects
          </Link>
          <Link to="/contact" className="hover:text-cyan-400 transition-colors text-sm">
            Contact Us
          </Link>
        </div>

        {/* Customer Care & Info */}
        <div className="space-y-3 text-sm">
          <p className="font-medium text-gray-300">Customer Care</p>
          <p className="hover:text-gray-400 cursor-pointer">FAQ</p>
          <p className="hover:text-gray-400 cursor-pointer">Enrollment</p>
          <p className="hover:text-gray-400 cursor-pointer">Terms of Service</p>
        </div>

        {/* Contact Us */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-300">Contact Us</h2>
          <div className="flex items-center text-sm gap-2">
            <FaLocationDot className="text-yellow-500" />
            <span>3C, Complex St, Finbarrs Road, Akoka Lagos</span>
          </div>
          <div className="flex items-center text-sm gap-2">
            <MdWhatsapp className="text-green-500" />
            <span>+2349020507509</span>
          </div>
          <div className="flex items-center text-sm gap-2">
            <FaPhone className="text-blue-500" />
            <span>+2349020507509</span>
          </div>

          {/* Email Input */}
          <div className="text-xs font-medium text-gray-400">
            <p>Email:</p>
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg mt-2 h-[35px]">
              <MdOutlineMailOutline className="text-gray-500 px-3" size={40} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-gray-900 border-0 rounded-r-lg text-gray-200 focus:outline-none px-3 py-2 h-[33px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Dynamics Illuminations. All rights reserved.</p>
      </footer>
    </div>
  );
}
