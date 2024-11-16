import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const trainingPrograms = [
  {
    id: 1,
    title: "Advanced Lighting Design",
    description:
      "Learn how to create dynamic lighting systems for commercial and residential spaces, covering the latest technologies and trends.",
    image: "/images/traing3.jpg",
  },
  {
    id: 2,
    title: "Smart Automation in Lighting",
    description:
      "Master the integration of smart lighting solutions, including IoT, voice control, and energy efficiency techniques.",
    image: "/images/traing5.jpg",
  },
  {
    id: 3,
    title: "Event Lighting Techniques",
    description:
      "Gain hands-on experience in designing and executing lighting setups for events, from concerts to corporate functions.",
    image: "/images/training.jpg",
  },
];

export default function Training() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // You can customize the duration and delay
  }, []);

  return (
    <div className="bg-gray-100 py-16 px-8">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto text-center">
        <h1
          className="text-4xl font-bold text-blue-800 mb-12"
          data-aos="fade-up"
        >
          Our Training Programs
        </h1>

        {/* Training Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {trainingPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={`${program.id * 200}`} // Add staggered delay for animations
            >
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{program.title}</h2>
                <p className="text-gray-700 mb-6">{program.description}</p>
                <button className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12" data-aos="fade-up" data-aos-delay="600">
          <p className="text-xl text-gray-800 mb-4">
            Interested in enrolling? Reach out to us to sign up for one of our
            training programs!
          </p>
          <a
            href="https://wa.me/2348107533654?text=Hello,%20I%20am%20interested%20in%20learning%20more%20about%20your%20training%20programs.%20Could%20you%20please%20provide%20additional%20details?"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors">
              Contact Us
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
