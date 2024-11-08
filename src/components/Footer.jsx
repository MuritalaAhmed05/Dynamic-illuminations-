import React from "react";
import {
  FaInstagram,
  FaSquareFacebook,
  FaXTwitter,
  FaLinkedin,
  FaPhone,
  FaLocationDot  
} from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdWhatsapp } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-gray-800 text-white">
      <div className="grid sm:grid-cols-4 grid-cols-2 gap-9 p-8">
        {/* Logo & Social Links */}
        <div className="flex flex-col">
          <img src="/images/dynamics-L.png" alt="logo" className="w-32 mb-4" />
          <div className="flex gap-4 items-center text-2xl">
            <FaInstagram className="hover:text-pink-600 transition-all" />
            <FaSquareFacebook className="hover:text-blue-600 transition-all" />
            <FaXTwitter className="hover:text-black transition-all" />
            <FaLinkedin className="hover:text-blue-700 transition-all" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <p className="font-bold">Quick Links</p>
          <Link to="/" className="hover:text-blue-500 transition-colors text-[15px]">Home</Link>
          <Link to="/about" className="hover:text-blue-500 transition-colors text-[15px]">About</Link>
          <Link to="/service" className="hover:text-blue-500 transition-colors text-[15px]">Service</Link>
          <Link to="/projects" className="hover:text-blue-500 transition-colors text-[15px]">Projects</Link>
          <Link to="/contact" className="hover:text-blue-500 transition-colors text-[15px]">Contact Us</Link>
        </div>

        {/* Customer Care & Info */}
        <div className="space-y-2 text-sm">
          <p className="font-medium">Customer Care</p>
          <p>FAQ</p>
          <p>Enrollment</p>
          <p>Terms of Service</p>
        </div>

        {/* Contact Us */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <div className="flex items-center text-sm gap-2">
            <FaLocationDot className="text-yellow-400" />
            <span>3C, Complex st, Finbarrs Road Akoka Lagos</span>
          </div>
          <div className="flex items-center text-sm gap-2">
            <MdWhatsapp className="text-green-500" />
            <span>+2349020507509</span>
          </div>
          <div className="flex items-center text-sm gap-2">
            <FaPhone className="text-blue-400" />
            <span>+2349020507509</span>
          </div>

          <div className="text-xs font-medium text-gray-300">
            <p>Email:</p>
            <div className="flex items-center bg-gray-700 border border-gray-600 rounded-lg">
              <MdOutlineMailOutline className="text-gray-400 pl-3" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-gray-800 border-0 rounded-r-lg text-white focus:outline-none px-3 py-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-3 text-center">
        <p>&copy; {new Date().getFullYear()} Dynamics Illuminations. All rights reserved.</p>
      </footer>
    </div>
  );
}
