import React, { useState, useEffect } from "react";
import { FaLightbulb } from 'react-icons/fa';
const MyCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  // Automatically slide to the next image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      slideRight();
    }, 3000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [current]);

  const slideRight = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const slideLeft = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative flex items-center justify-center w-full  mx-auto mb-8">
      <div className="relative w-full h-[500px] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out transform ${
              index === current
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-[0.8] pointer-events-none"
            }`}
          >
           <img
    src={image.url}
    alt={image.legend}
    className="w-full h-full object-cover transition-opacity duration-300 filter "
  />
  <div className="absolute sm:left-[9rem] top-1/2 transform -translate-y-1/2 text-white p-6 bg-opacity-60 rounded-xl shadow-2xl max-w-xl left-4 sm:max-w-[40rem] sm:p-4 sm:text-base md:left-[5rem] md:text-xl lg:left-[6rem] lg:text-2xl">
  <p className="rounded-md sm:inline-flex items-center bg-gray-400 p-2 hidden">
  <FaLightbulb className="text-blue-500 text-lg mr-2" />
  <span className="text-sm">Improve our customers’ lives by providing effective solutions.</span>
</p>
    <h2 className="font-bold leading-snug text-shadow-md">{image.legend}</h2>
  </div>



          </div>
        ))}
        {/* Left Arrow */}
        <div
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gainsboro flex justify-center items-center cursor-pointer text-3xl w-10 h-10 rounded-full"
          onClick={slideLeft}
        >
          &lsaquo;
        </div>
        {/* Right Arrow */}
        <div
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gainsboro flex justify-center items-center cursor-pointer text-3xl w-10 h-10 rounded-full"
          onClick={slideRight}
        >
          &rsaquo;
        </div>
      </div>
    </div>
  );
};

export default MyCarousel;
