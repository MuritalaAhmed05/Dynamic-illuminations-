import React, { useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from 'react-helmet';
export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div>
   <Helmet>
        <title>Contact Us | Dynamic Illuminations</title>
        <meta name="description" content="Get in touch with us for all your lighting needs and inquiries." />
      </Helmet>
      <div className="relative w-full h-[500px] overflow-hidden">
        <img
          src="/images/panel7.jpg"
          alt="panel"
          className="w-full h-full object-cover shadow-lg filter brightness-50 blur-sm"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 bg-opacity-70 rounded-xl shadow-2xl max-w-3xl mx-auto">
          <h2
            className="font-bold text-4xl leading-tight mb-4 text-shadow-lg"
            data-aos="fade-up"
          >
            Contact Us
          </h2>
          <p
            className="text-lg sm:text-xl md:text-2xl font-medium max-w-md"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            "We're here to help! Reach out and we'll get back to you shortly."
          </p>
        </div>
      </div>

      <div className="bg-gray-100 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div
              className="shadow-lg flex flex-col items-center p-6 bg-white rounded-lg"
              data-aos="fade-up"
            >
              <FaPhone className="text-blue-800 text-3xl mb-4" />
              <h1 className="font-bold text-[18px]">Call Us</h1>
              <p className="text-gray-700">+234 810 753 3654</p>
            </div>
            <div
              className="shadow-lg flex flex-col items-center p-6 bg-white rounded-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <FaEnvelope className="text-blue-800 text-3xl mb-4" />
              <h1 className="font-bold text-[18px]">Email</h1>
              <p className="text-gray-700 text-sm">
                dynamicsilluminations44@gmail.com
              </p>
            </div>
            <div
              className="shadow-lg flex flex-col items-center p-6 bg-white rounded-lg"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <FaMapMarkerAlt className="text-blue-800 text-3xl mb-4" />
              <h1 className="font-bold text-[18px]">Address</h1>
              <p className="text-gray-700">
                3C, Complex St, Finbarrs Road Akoka Lagos
              </p>
            </div>
          </div>

          <h1
            className="text-4xl font-bold text-blue-800 mb-12"
            data-aos="fade-up"
          >
            Get in Touch
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
<form
  className="bg-white p-8 rounded-lg shadow-lg"
  data-aos="fade-up"
  data-aos-delay="200"
  action="https://formspree.io/f/xnnqzaqw"
  method="POST"
>
  <p className="text-gray-700 text-center font-semibold mb-6">
    "We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, send us a message and we'll get back to you as soon as possible."
  </p>
  <div className="mb-6">
    <label
      htmlFor="name"
      className="block text-left text-gray-700 font-semibold mb-2"
    >
      Name
    </label>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Your Name"
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      required
    />
  </div>
  <div className="mb-6">
    <label
      htmlFor="email"
      className="block text-left text-gray-700 font-semibold mb-2"
    >
      Email
    </label>
    <input
      type="email"
      name="email"
      id="email"
      placeholder="Your Email"
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      required
    />
  </div>
  <div className="mb-6">
    <label
      htmlFor="message"
      className="block text-left text-gray-700 font-semibold mb-2"
    >
      Message
    </label>
    <textarea
      name="message"
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


            <div className="flex flex-col items-center justify-center w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.97634263081!2d3.3829417738266323!3d6.524671223152128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d020bb422d1%3A0xcd6f6a180ec6098!2s3C%20Complex!5e0!3m2!1sen!2sng!4v1731166428810!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Company Location Map"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex w-full h-auto md:h-[150px] bg-blue-700">
        <div
          className="w-full md:w-1/3 h-auto md:h-full overflow-hidden relative"
          style={{ clipPath: "polygon(0 0, 100% 0%, 80% 100%, 0% 100%)" }}
        >
          <img
            src="/images/panel2.jpg"
            alt="panel"
            className="w-full h-full object-cover shadow-lg"
          />
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-white flex flex-col items-start justify-center pl-6 md:pl-8 pr-4 py-6 md:py-8 h-full relative rounded-lg">
            <p className="text-sm md:text-base font-medium mb-2">
              We're here for you!
            </p>
            <h1 className="font-bold text-xl md:text-2xl lg:text-3xl leading-tight">
              Need a Quick Service?
            </h1>
          </div>

          <div className="flex items-center justify-start p-2 md:p-4">
            <a
              href="https://wa.me/2348107533654?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20services%20at%20Dynamic%20Illuminations.%20Could%20you%20please%20provide%20more%20details?"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="text-sm md:text-lg font-semibold bg-gray-500 py-2 px-6 rounded-md cursor-pointer hover:bg-gray-600 transition-colors">
                Click Here
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
