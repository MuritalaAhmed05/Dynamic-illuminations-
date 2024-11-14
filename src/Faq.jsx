import React, { useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const faqs = [
  {
    question: "What is dynamic illumination?",
    answer: "Dynamic Illumination Solutions specializes in cutting-edge solar lighting systems that adapt in real-time by adjusting color, intensity, and patterns. Our systems not only enhance ambiance but also leverage solar technology to provide sustainable and energy-efficient lighting solutions for residential, commercial, and outdoor spaces."
  },
  {
    question: "What services do you offer?",
    answer: "We specialize in designing and installing custom dynamic lighting solutions for residential, commercial, and event spaces. Our services include consultation, design, installation, and maintenance."
  },
  {
    question: "Do you offer training programs?",
    answer: "Yes, we provide specialized training programs on lighting design, smart automation, and event lighting techniques. Our courses are tailored for both beginners and professionals looking to enhance their skills."
  },
  {
    question: "Do you handle commercial installations?",
    answer: "Absolutely! We offer comprehensive lighting design and installation services for commercial spaces, including offices, retail stores, and entertainment venues."
  },
  {
    question: "Is there a warranty on your installations?",
    answer: "Yes, all our installations come with a standard one-year warranty. We ensure that our systems are durable and reliable, and we provide support for any issues that may arise."
  },
  {
    question: "Do you offer maintenance services?",
    answer: "Yes, we offer ongoing maintenance services to keep your lighting systems running optimally. Our team can handle repairs, updates, and system upgrades as needed."
  },
];

export default function Faq() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-20 p-8 bg-gray-100 rounded-xl shadow-xl">
      <h2
        className="text-4xl font-bold text-center mb-12 text-blue-900"
        data-aos="fade-down"
      >
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          aosDelay={index * 100}
        />
      ))}
    </div>
  );
}

function AccordionItem({ question, answer, aosDelay }) {
  return (
    <div
      className="mb-6 border-b border-gray-300"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      <details className="group cursor-pointer bg-white p-5 rounded-lg shadow-md transition-transform hover:shadow-lg">
        <summary className="flex justify-between items-center text-lg font-semibold text-gray-800 select-none">
          {question}
          <FaChevronDown className="transform transition-transform duration-300 group-open:rotate-180 text-gray-600" />
        </summary>
        <div className="mt-3 text-gray-700">
          <p>{answer}</p>
        </div>
      </details>
    </div>
  );
}
