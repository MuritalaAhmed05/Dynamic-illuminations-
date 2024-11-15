import React, { useEffect } from "react";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";
import { MdWhatsapp } from "react-icons/md";
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
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 px-8 py-7  mx-auto">
        {/* Logo & Social Links */}
        <div
          className="flex flex-col items-center sm:items-start"
          data-aos="fade-up"
        >
          <img src="/images/logo2.png" alt="logo" className="w-32 mb-1" />
          <div className="flex flex-col text-center leading-3 mb-4">
            <span className="text-2xl font-semibold tracking-[2px] font-roboto text-[#004B84]">
              Dynamic
            </span>
            <span className="font-roboto tracking-[5px] text-[#004B84]">
              Illuminations
            </span>
          </div>
          <div className="flex gap-4 items-center justify-center sm:justify-start mt-4">
            <FaInstagram className="hover:text-pink-500 transition-all text-3xl sm:text-2xl" />
            <FaXTwitter className="hover:text-blue-400 transition-all text-3xl sm:text-2xl" />
            <FaLinkedin className="hover:text-blue-600 transition-all text-3xl sm:text-2xl" />
          </div>
        </div>

        {/* Quick Links */}
        <div
          className="flex flex-col space-y-3 justify-start text-center sm:text-left"
          data-aos="fade-up"
          data-aos-delay="200"
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
        </div>

        {/* Customer Care & Info */}
        <div
          className="space-y-3 text-sm text-center sm:text-left flex flex-col justify-start"
          data-aos="fade-up"
          data-aos-delay="400"
        >
        
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

        {/* Newsletter Subscription */}
        <div
          className="space-y-4 text-center sm:text-left"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <p className="text-gray-300 text-sm mb-2">
            <strong>Subscribe to our Newsletter</strong>
          </p>
          <p className="text-gray-400 text-xs mb-4">
            Stay updated with our latest news, promotions, and events. Don't
            miss out on exciting offers!
          </p>
          <div className="flex flex-col items-center sm:items-start">
            <div className="relative w-full max-w-xs">
              <input
                type="email"
                placeholder="Enter your email to subscribe"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none px-4 py-2 h-[40px] mb-4 text-xs sm:text-sm"
              />
              <button className="absolute right-0 top-0 bg-blue-500 text-white py-2 px-3 rounded-r-lg h-[40px] hover:bg-blue-600 transition-all text-sm">
                Subscribe
              </button>
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
