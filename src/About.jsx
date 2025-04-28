import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Helmet } from 'react-helmet';

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);

  return (
    <div className="bg-gray-100 py-16 px-8">
      <Helmet>
        <title>About Us | Dynamic Illuminations</title>
        <meta name="description" content="Learn more about Dynamic Illuminations, a company providing expert lighting solutions." />
      </Helmet>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
        
        <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row text-center sm:text-left md:text-left lg:text-left" data-aos="fade-up">
          <img
            src="/images/image11.jpg"
            alt="Industrial Solar Installations in a factory or large-scale setting"
            className="rounded-lg shadow-lg object-cover w-full h-[250px] sm:w-[45%] sm:mr-8 mb-4 sm:mb-0"
          />
          <div className="sm:w-[50%]">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Industrial Solar Installations</h2>
            <p className="text-gray-700">
              At Dynamic Illuminations, we pride ourselves on our capability to handle large-scale industrial lighting installations. Whether it's a manufacturing plant, warehouse, or commercial complex, our team is equipped to manage high-volume projects efficiently. We specialize in providing robust, energy-efficient lighting solutions that meet the demanding requirements of industrial spaces, ensuring enhanced visibility, safety, and operational efficiency.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row text-center sm:text-left md:text-left lg:text-left" data-aos="fade-up" data-aos-delay="100">
          <img
            src="/images/panel3.jpg"
            alt="Energy-efficient lighting installation for a large space"
            className="rounded-lg shadow-lg object-cover w-full h-[250px] sm:w-[45%] sm:mr-8 mb-4 sm:mb-0"
          />
          <div className="sm:w-[50%]">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Energy-Efficient Lighting Across Nigeria</h2>
            <p className="text-gray-700">
              Sustainability is at the core of our services. We focus on providing energy-efficient lighting solutions that not only reduce your energy consumption but also contribute to a greener planet. No matter where you are in Nigeria, we deliver and install our high-quality lighting solutions nationwide, ensuring every space benefits from our commitment to sustainability and efficiency.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row text-center sm:text-left md:text-left lg:text-left" data-aos="fade-up" data-aos-delay="200">
          <img
            src="/images/battery1.jpg"
            alt="Smart home integration with lighting system"
            className="rounded-lg shadow-lg object-cover w-full h-[250px] sm:w-[45%] sm:mr-8 mb-4 sm:mb-0"
          />
          <div className="sm:w-[50%]">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Smart Installations with Clear, Neat Work</h2>
            <p className="text-gray-700">
              With the rise of smart home technology, we offer seamless integration of lighting systems that can be controlled remotely, allowing for ultimate convenience and energy management. We take pride in delivering clean, organized, and precise installations, ensuring that every system functions perfectly while maintaining the aesthetics of your space.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row text-center sm:text-left md:text-left lg:text-left" data-aos="fade-up" data-aos-delay="300">
          <img
            src="/images/inverters.jpg"
            alt="Event lighting setup for a large wedding or corporate event"
            className="rounded-lg shadow-lg object-cover w-full h-[250px] sm:w-[45%] sm:mr-8 mb-4 sm:mb-0"
          />
          <div className="sm:w-[50%]">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Event Lighting Services with a Guarantee</h2>
            <p className="text-gray-700">
              From weddings to corporate events, we provide lighting solutions that elevate the atmosphere and create unforgettable experiences for your special occasions. We back all of our projects with a guarantee, ensuring that you receive the highest quality service and lighting results that meet your expectations.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row text-center sm:text-left md:text-left lg:text-left" data-aos="fade-up" data-aos-delay="400">
          <img
            src="/images/simple.jpg"
            alt="Architectural lighting design focusing on building aesthetics"
            className="rounded-lg shadow-lg object-cover w-full h-[250px] sm:w-[45%] sm:mr-8 mb-4 sm:mb-0"
          />
          <div className="sm:w-[50%]">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Home Installations</h2>
            <p className="text-gray-700">
              Our architectural lighting designs focus on highlighting the beauty and structure of buildings, creating striking visual effects that transform any space into a work of art. In addition, we also offer home installations for smaller quantities, providing personalized lighting solutions tailored to your residential needs.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row text-center sm:text-left md:text-left lg:text-left" data-aos="fade-up" data-aos-delay="500">
          <img
            src="/images/panel7.jpg"
            alt="Architectural lighting illuminating the exterior of a building"
            className="rounded-lg shadow-lg object-cover w-full h-[250px] sm:w-[45%] sm:mr-8 mb-4 sm:mb-0"
          />
          <div className="sm:w-[50%]">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Architectural Lighting</h2>
            <p className="text-gray-700">
              Our architectural lighting designs focus on highlighting the beauty and structure of buildings, creating striking visual effects that transform any space into a work of art.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row text-center sm:text-left md:text-left lg:text-left" data-aos="fade-up" data-aos-delay="600">
          <img
            src="/images/farm1.jpeg"
            alt="Solar panels used for commercial solar farming"
            className="rounded-lg shadow-lg object-cover w-full h-[250px] sm:w-[45%] sm:mr-8 mb-4 sm:mb-0"
          />
          <div className="sm:w-[50%]">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Solar Farming and Commercial Installations</h2>
            <p className="text-gray-700">
              Beyond lighting, we specialize in solar farming and commercial solar installations. Our projects range from small commercial solar systems to large-scale solar farms designed to harness clean, renewable energy for businesses and communities. By adopting solar energy, we help you lower operational costs while contributing to a more sustainable environment.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row text-center sm:text-left md:text-left lg:text-left" data-aos="fade-up" data-aos-delay="700">
          <img
            src="/images/traing3.jpg"
            alt="Training for lighting system installation"
            className="rounded-lg shadow-lg object-cover w-full h-[250px] sm:w-[45%] sm:mr-8 mb-4 sm:mb-0"
          />
          <div className="sm:w-[50%]">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Training and Education</h2>
            <p className="text-gray-700">
              At Dynamic Illuminations, we believe in empowering the next generation of lighting professionals. We offer hands-on training sessions for individuals interested in learning the skills required for installation and maintenance of both traditional and solar-powered lighting systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
