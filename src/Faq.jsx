import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: "What is your return policy?",
    answer: "You can return any product within 30 days of purchase. Simply contact our support for more details."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 50 countries worldwide. Additional charges may apply for international shipping."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive a tracking link via email to monitor its progress."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, MasterCard, PayPal, and various other online payment options."
  }
];

export default function Faq() {
  return (
    <div className="max-w-xl mx-auto my-12 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <AccordionItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}

function AccordionItem({ question, answer }) {
  return (
    <details className="group mb-4 border border-gray-300 rounded-lg overflow-hidden bg-white">
      <summary className="flex justify-between items-center cursor-pointer p-4 text-lg font-medium text-gray-800 select-none group-open:bg-gray-200">
        {question}
        <FaChevronDown className="transform transition-transform duration-300 group-open:rotate-180 text-gray-600" />
      </summary>
      <div className="px-4 pb-4 text-gray-700">{answer}</div>
    </details>
  );
}
