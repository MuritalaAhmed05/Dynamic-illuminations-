import React from "react";
import MyCarousel from "./components/carousel";
import { places } from "./components/data";
import {
  FaLightbulb,
  FaCalendarAlt,
  FaHome,
  FaCamera,
  FaSolarPanel,
  FaWrench,
  FaTheaterMasks,
  FaLock,
  FaPaintBrush,
  FaLeaf,
  FaPhoneAlt,
  FaEnvelope,
  FaStar,
  FaUsers,
} from "react-icons/fa";

function App() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header Section */}
      <header className="bg-blue-900 text-white py-6 px-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome to Dynamic Illuminations
        </h1>
        <p className="mt-2 text-lg">
          Brightening your world with innovative lighting solutions
        </p>
      </header>

      {/* Carousel Section */}
      <section>
        <MyCarousel images={places} />
      </section>

      {/* Services Section */}
      <section className="py-12 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
          Our Key Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Service Cards */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <FaLightbulb className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Architectural Lighting</h3>
            <p className="mt-4 text-gray-600">
              Transforming spaces with creative architectural lighting designs.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <FaCalendarAlt className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Event Lighting</h3>
            <p className="mt-4 text-gray-600">
              Enhancing your events with customized lighting setups.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <FaHome className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Smart Home Solutions</h3>
            <p className="mt-4 text-gray-600">
              Automating your home with intelligent lighting systems.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <FaCamera className="text-4xl text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Camera Installation</h3>
            <p className="mt-4 text-gray-600">
              Providing expert installation of high-quality surveillance cameras
              for security.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <FaSolarPanel className="text-4xl text-yellow-700 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Solar Solutions</h3>
            <p className="mt-4 text-gray-600">
              Sustainable energy solutions with professional solar panel
              installations.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <FaWrench className="text-4xl text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Electrical Wiring</h3>
            <p className="mt-4 text-gray-600">
              Safe and efficient wiring installations for residential and
              commercial buildings.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <FaTheaterMasks className="text-4xl text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Home Theater Systems</h3>
            <p className="mt-4 text-gray-600">
              Creating immersive home theater experiences with expert
              installations.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <FaLock className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Smart Security Systems</h3>
            <p className="mt-4 text-gray-600">
              Implementing smart security systems that integrate with your home
              automation.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <FaPaintBrush className="text-4xl text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">
              Lighting Design Consulting
            </h3>
            <p className="mt-4 text-gray-600">
              Providing expert consulting for custom lighting design tailored to
              your needs.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <FaLeaf className="text-4xl text-green-700 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">
              Energy Efficient Solutions
            </h3>
            <p className="mt-4 text-gray-600">
              Offering energy-saving lighting solutions and electrical systems
              to reduce costs.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
          What Our Clients Say
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center hover:shadow-xl transition-all">
            <FaStar className="text-yellow-500 text-4xl mb-4 mx-auto" />
            <p>
              "Dynamic Illuminations transformed our event into a spectacular experience with their lighting solutions!"
            </p>
            <span className="text-gray-600 mt-4 block">- Jane Doe, Event Planner</span>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center hover:shadow-xl transition-all">
            <FaUsers className="text-blue-500 text-4xl mb-4 mx-auto" />
            <p>
              "We automated our office lighting with their smart solutions, and the results are incredible!"
            </p>
            <span className="text-gray-600 mt-4 block">- John Smith, Office Manager</span>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center hover:shadow-xl transition-all">
            <FaLightbulb className="text-yellow-500 text-4xl mb-4 mx-auto" />
            <p>
              "The architectural lighting they designed for our building was beyond our expectations."
            </p>
            <span className="text-gray-600 mt-4 block">- Sarah Lee, Architect</span>
          </div>

          {/* Testimonial 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center hover:shadow-xl transition-all">
            <FaHome className="text-green-500 text-4xl mb-4 mx-auto" />
            <p>
              "Their smart home lighting system made our house more energy-efficient and convenient!"
            </p>
            <span className="text-gray-600 mt-4 block">- Michael Brown, Homeowner</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-900 text-white py-12 px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg mb-6">Have a project in mind? Let's light it up!</p>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-2xl" />
            <p className="text-lg">+234 810 753 3654</p>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-2xl" />
            <p className="text-lg">dynamicilluminations44@gmail.com</p>
          </div>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
}

export default App;
