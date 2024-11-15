import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import MyCarousel from "./components/carousel";
import { places } from "./components/data";
// import ReviewList from "./components/ReviewList";
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
  // FaPhoneAlt,
  // FaEnvelope,
  // FaStar,
  // FaUsers,
} from "react-icons/fa";
import ReviewList from "./components/ReviewList";
// import ReviewModal from "./components/ReviewModal";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: "ease-in-out", // Easing function
      once: true, // Animation happens only once
    });
  }, []);

 
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header Section */}
      <header className="bg-blue-900 text-white py-6 px-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold" data-aos="fade-down">
          Welcome to Dynamic Illuminations
        </h1>
        <p className="mt-2 text-lg" data-aos="fade-up">
          Brightening your world with innovative lighting solutions
        </p>
      </header>

      {/* Carousel Section */}
      <section>
        <MyCarousel images={places} />
      </section>

      {/* Services Section */}
      <section className="py-12 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-900" data-aos="fade-up">
          Our Key Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Service Cards */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all" data-aos="zoom-in">
            <FaLightbulb className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Architectural Lighting</h3>
            <p className="mt-4 text-gray-600">
              Transforming spaces with creative architectural lighting designs.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all" data-aos="zoom-in">
            <FaCalendarAlt className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Event Lighting</h3>
            <p className="mt-4 text-gray-600">
              Enhancing your events with customized lighting setups.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all" data-aos="zoom-in">
            <FaHome className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Smart Home Solutions</h3>
            <p className="mt-4 text-gray-600">
              Automating your home with intelligent lighting systems.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all" data-aos="zoom-in">
            <FaCamera className="text-4xl text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Camera Installation</h3>
            <p className="mt-4 text-gray-600">
              Providing expert installation of high-quality surveillance cameras
              for security.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all" data-aos="zoom-in">
            <FaSolarPanel className="text-4xl text-yellow-700 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Solar Solutions</h3>
            <p className="mt-4 text-gray-600">
              Sustainable energy solutions with professional solar panel
              installations.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all" data-aos="zoom-in">
            <FaWrench className="text-4xl text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Electrical Wiring</h3>
            <p className="mt-4 text-gray-600">
              Safe and efficient wiring installations for residential and
              commercial buildings.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all" data-aos="zoom-in">
            <FaTheaterMasks className="text-4xl text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Home Theater Systems</h3>
            <p className="mt-4 text-gray-600">
              Creating immersive home theater experiences with expert
              installations.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all" data-aos="zoom-in">
            <FaLock className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">Smart Security Systems</h3>
            <p className="mt-4 text-gray-600">
              Implementing smart security systems that integrate with your home
              automation.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all" data-aos="zoom-in">
            <FaPaintBrush className="text-4xl text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold text-blue-900">
              Lighting Design Consulting
            </h3>
            <p className="mt-4 text-gray-600">
              Providing expert consulting for custom lighting design tailored to
              your needs.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all" data-aos="zoom-in">
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
      {/* Testimonials Section */}
      <section className="bg-blue-50 py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-900" data-aos="fade-up">
          What Our Clients Say
        </h2>
       
       <ReviewList />
      </section>
    </div>
  );
}

export default App;
