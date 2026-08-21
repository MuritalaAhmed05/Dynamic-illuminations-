'use client';

import React, { useState, useEffect, useCallback } from "react";
import { FaLightbulb, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Place } from './data';

interface CarouselProps {
  images: Place[];
}

const MyCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState<number>(0);

  const slideRight = useCallback(() => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const slideLeft = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      slideRight();
    }, 4000);

    return () => clearInterval(interval);
  }, [slideRight]);

  return (
    <div className="relative flex items-center justify-center w-full mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 group">
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[580px] overflow-hidden bg-slate-950">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === current
                ? "opacity-100 scale-100 pointer-events-auto z-10"
                : "opacity-0 scale-105 pointer-events-none z-0"
            }`}
          >
            {/* Full Image */}
            <img
              src={image.url}
              alt={image.legend}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
            />

            {/* Minimal Subtle Gradient Vignette at Bottom Only */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

            {/* Floating Sleek Glass Legend Tag (Non-Obscuring) */}
            <div className="absolute bottom-6 left-6 right-16 sm:left-8 sm:right-auto max-w-xl bg-slate-900/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700/60 shadow-xl flex items-center space-x-3 text-white">
              <span className="p-2 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-xl flex-shrink-0">
                <FaLightbulb className="text-sm sm:text-base" />
              </span>
              <span className="text-xs sm:text-sm md:text-base font-semibold leading-snug tracking-wide line-clamp-2">
                {image.legend}
              </span>
            </div>
          </div>
        ))}

        {/* Navigation Buttons (Glowing Glass) */}
        <button
          aria-label="Previous Slide"
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-slate-950/70 hover:bg-amber-500 border border-slate-700 text-slate-200 hover:text-slate-950 p-3 sm:p-3.5 rounded-full transition-all duration-300 z-20 backdrop-blur-md shadow-xl hover:scale-110 active:scale-95"
          onClick={slideLeft}
        >
          <FaChevronLeft className="text-sm sm:text-base" />
        </button>
        <button
          aria-label="Next Slide"
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-slate-950/70 hover:bg-amber-500 border border-slate-700 text-slate-200 hover:text-slate-950 p-3 sm:p-3.5 rounded-full transition-all duration-300 z-20 backdrop-blur-md shadow-xl hover:scale-110 active:scale-95"
          onClick={slideRight}
        >
          <FaChevronRight className="text-sm sm:text-base" />
        </button>

        {/* Interactive Progress Indicators (Bottom Right) */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center space-x-2 bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-full border border-slate-800">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current
                  ? 'w-6 bg-amber-400 shadow-glow-gold'
                  : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCarousel;
