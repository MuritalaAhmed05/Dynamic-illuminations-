import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="bg-gray-100 py-16 px-8">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-12">Get in Touch</h1>

        {/* Contact Form and Details Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label htmlFor="name" className="block text-left text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-left text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-left text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>

          {/* Contact Details */}
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center ">
            <div className="mb-6 flex gap-5 items-center">
              <FaPhone className="text-blue-800 text-2xl mb-2" />
              <p className="text-gray-700">+234 810 753 3654</p>
            </div>
            <div className="mb-6 flex gap-5 items-center">
              <FaEnvelope className="text-blue-800 text-2xl mb-2" />
              <p className="text-gray-700">info@dynamicsilluminations.com</p>
            </div>
            <div className='flex gap-5 items-center'>
              <FaMapMarkerAlt className="text-blue-800 text-2xl mb-2" />
              <p className="text-gray-700">3C, Complex st, Finbarrs Road Akoka Lagos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
