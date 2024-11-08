import React from 'react';
import { FaLightbulb, FaTools, FaHome, FaProjectDiagram, FaCalendarCheck } from 'react-icons/fa';

export default function Service() {
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
  ];

  return (
    <div className="bg-gray-100 py-16 px-8">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-12">Our Services</h1>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {service.icon}
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
