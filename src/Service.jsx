import React, { useEffect } from 'react';
import {
  FaLightbulb,
  FaTools,
  FaHome,
  FaProjectDiagram,
  FaCalendarCheck,
  FaDesktop,
  FaBuilding,
  FaPeopleCarry,
  FaSolarPanel,
  FaCamera,
  FaBatteryFull,
  FaPlug,
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';
export default function Service() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const services = [
    {
      icon: <FaLightbulb className="text-blue-800 text-4xl mb-4" />,
      title: 'Architectural Lighting',
      description: 'Transforming spaces with creative and energy-efficient lighting designs tailored to your needs.',
    },
    {
      icon: <FaTools className="text-blue-800 text-4xl mb-4" />,
      title: 'Smart Home Automation',
      description: 'Automating your home lighting systems for convenience, control, and energy savings.',
    },
    {
      icon: <FaHome className="text-blue-800 text-4xl mb-4" />,
      title: 'Residential Lighting',
      description: 'Enhancing your home ambiance with customized lighting solutions for every room.',
    },
    {
      icon: <FaProjectDiagram className="text-blue-800 text-4xl mb-4" />,
      title: 'Commercial Projects',
      description: 'Professional lighting solutions for offices, retail stores, and commercial spaces.',
    },
    {
      icon: <FaCalendarCheck className="text-blue-800 text-4xl mb-4" />,
      title: 'Event Lighting',
      description: 'Creating unforgettable experiences with dynamic lighting setups for events and celebrations.',
    },
    {
      icon: <FaDesktop className="text-blue-800 text-4xl mb-4" />,
      title: 'Lighting Design Consulting',
      description: 'Offering expert consulting to create the perfect lighting designs for any space or project.',
    },
    {
      icon: <FaBuilding className="text-blue-800 text-4xl mb-4" />,
      title: 'Outdoor Lighting',
      description: 'Providing sophisticated and durable outdoor lighting solutions for homes and businesses.',
    },
    {
      icon: <FaPeopleCarry className="text-blue-800 text-4xl mb-4" />,
      title: 'Lighting for Public Spaces',
      description: 'Designing safe, functional, and aesthetically pleasing lighting for parks, streets, and more.',
    },
    
    {
      icon: <FaCamera className="text-blue-800 text-4xl mb-4" />,
      title: 'CCTV Installation',
      description: 'Ensuring security with high-quality CCTV systems for homes, offices, and public spaces.',
    },
    {
      icon: <FaSolarPanel className="text-blue-800 text-4xl mb-4" />,
      title: 'Solar Installation',
      description: 'Harnessing solar energy with efficient installations for residential and commercial properties.',
    },
    {
      icon: <FaBatteryFull className="text-blue-800 text-4xl mb-4" />,
      title: 'Sales of Solar Panels & Batteries',
      description: 'Supplying top-tier solar panels and batteries for sustainable energy solutions.',
    },
    {
      icon: <FaPlug className="text-blue-800 text-4xl mb-4" />,
      title: 'Electrical Wiring & Services',
      description: 'Providing professional electrical wiring and maintenance services for all property types.',
    },
  ];

  return (
    <div className="bg-gray-100 py-16 px-8">
     <Helmet>
        <title>Our Services | Dynamic Illuminations</title>
        <meta name="description" content="Explore our range of lighting services, designed to bring elegance and functionality to any space." />
      </Helmet>
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Our Services</h1>

        <p className="text-lg text-gray-700 mb-12">
          We are dedicated to bringing light into every aspect of your life, whether you're enhancing your home,
          business, or event. Our services are designed to provide you with the highest quality lighting solutions
          that are energy-efficient, aesthetically pleasing, and tailored to your specific needs. Explore our
          diverse range of services and find the perfect solution for your needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up" 
              data-aos-delay={index * 100} 
              aria-labelledby={`service-${index}-title`}
            >
              <div aria-label={service.title}>{service.icon}</div>
              <h2 id={`service-${index}-title`} className="text-2xl font-semibold mb-4">
                {service.title}
              </h2>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
