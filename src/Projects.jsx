import React, { useEffect } from 'react';
import 'aos/dist/aos.css'; 
import AOS from 'aos'; 
import { Helmet } from 'react-helmet';
const projects = [
  {
    id: 1,
    title: 'Luxury Villa Lighting',
    description: 'Designed and implemented a modern lighting system for a luxury villa, enhancing ambiance and energy efficiency.',
    image: '/images/panel1.jpg',
  },
  {
    id: 2,
    title: 'Smart Office Automation',
    description: 'Integrated smart lighting solutions to optimize productivity and reduce energy consumption in a corporate office.',
    image: '/images/panel6.jpg',
  },
  {
    id: 3,
    title: 'Event Lighting Setup',
    description: 'Provided dynamic lighting for a major event, creating a memorable experience for attendees.',
    image: '/images/panel4.jpg',
  },
  {
    id: 4,
    title: 'Retail Store Lighting',
    description: 'Enhanced the customer shopping experience with vibrant and energy-efficient lighting for a popular retail brand.',
    image: '/images/inverter.jpg',
  },
];

export default function Projects() {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
    });
  }, []);

  return (
    <div className="bg-gray-100 py-16 px-8">
  <Helmet>
        <title>Our Projects | Dynamic Illuminations</title>
        <meta name="description" content="Check out some of our amazing lighting projects that have transformed spaces." />
      </Helmet>
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-12">Our Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              data-aos="fade-up" 
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
                onError={(e) => e.target.src = '/path/to/fallback-image.jpg'} 
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
                <p className="text-gray-700 mb-6">{project.description}</p>
                <button className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
