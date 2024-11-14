import React, { useEffect } from "react";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";
import { MdOutlineMailOutline, MdWhatsapp } from "react-icons/md";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Footer() {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="bg-gray-900 text-gray-200">
      {/* Main Container */}
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-9 p-8 text-center sm:text-left">
        {/* Logo & Social Links */}
        <div
          className="flex flex-col items-center sm:items-start"
          data-aos="fade-up"
        >
          <img src="/images/logo2.png" alt="logo" className="w-32 mb-6" />
          <div className="flex flex-col text-center leading-3 mb-4">
            <span className="text-2xl font-semibold tracking-[2px] font-roboto text-[#004B84]">
              Dynamic
            </span>
            <span className="font-roboto tracking-[5px] text-[#004B84]">
              Illuminations
            </span>
          </div>
          <div className="flex gap-4 items-center justify-center sm:justify-start">
            <FaInstagram className="hover:text-pink-500 transition-all text-3xl sm:text-2xl" />
            <FaXTwitter className="hover:text-blue-400 transition-all text-3xl sm:text-2xl" />
            <FaLinkedin className="hover:text-blue-600 transition-all text-3xl sm:text-2xl" />
          </div>
        </div>

        {/* Quick Links */}
        <div
          className="flex flex-col space-y-3 justify-center text-center sm:text-left"
          data-aos="fade-up"
          data-aos-delay="200"
        >
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
        <div
          className="space-y-3 text-sm text-center sm:text-left flex flex-col"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <p className="mb-[2.9rem]"></p>
          <Link to="/" className="font-medium text-gray-300">
            Customer Care
          </Link>
          <Link to="/Faq" className="hover:text-gray-400 cursor-pointer">
            FAQ
          </Link>
          <Link to="/" className="hover:text-gray-400 cursor-pointer">
            Enrollment
          </Link>
          <Link to="/" className="hover:text-gray-400 cursor-pointer">
            Terms of Service
          </Link>
        </div>

        {/* Contact Us */}
        <div
          className="space-y-4 text-center sm:text-left"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <h2 className="text-lg font-semibold text-gray-300">Contact Us</h2>
          <div className="flex items-center justify-center sm:justify-start text-sm sm:gap-2">
            <FaLocationDot className="text-yellow-500 self-start sm:self-center" />
            <span>3C, Complex St, Finbarrs Road, Akoka Lagos</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start text-sm gap-2">
            <MdWhatsapp className="text-green-500" />
            <span>+234 810 753 3654</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start text-sm gap-2">
            <FaPhone className="text-blue-500" />
            <span>+234 810 753 3654</span>
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

      {/* Footer Bottom */}
      <footer
        className="bg-gray-950 text-gray-500 py-4 text-center"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <p>&copy; {new Date().getFullYear()} Dynamic Illuminations. All rights reserved.</p>
      </footer>
    </div>
  );
}
