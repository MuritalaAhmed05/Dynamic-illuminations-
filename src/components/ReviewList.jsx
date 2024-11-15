import React, { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // For rating stars and arrows

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const scrollRef = useRef(null); // Reference to scroll container

  // Fetch reviews from Firebase
  const fetchReviews = async () => {
    const q = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const reviewsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReviews(reviewsData);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Function to render stars based on the rating
  const renderStars = (num) => '★'.repeat(num) + '☆'.repeat(5 - num);

  // Scroll content left or right
  const scrollContent = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300; // Scroll by 300px
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="p-6">
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        // Scrollable container with arrows
        <div className="relative">
          {/* Left Arrow */}
          <div
            className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600 transition-all"
            onClick={() => scrollContent('left')}
          >
            <FaChevronLeft className="text-xl" />
          </div>
          
          {/* Right Arrow */}
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600 transition-all"
            onClick={() => scrollContent('right')}
          >
            <FaChevronRight className="text-xl" />
          </div>

          {/* Scrollable Reviews */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hidden flex space-x-6 pt-4 pb-4"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-4 flex flex-col justify-between items-center w-60 h-60 aspect-square border-2 border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                data-aos="fade-up"
              >
                {/* Client Name and Rating */}
                <span className="text-gray-600 text-lg mb-4 block font-medium">
                  Client: <span className="font-semibold text-black/90">{review.name}</span>
                </span>
                <div className="text-yellow-500 mb-4 mx-auto">
                  Rate: {renderStars(review.rating)}
                </div>
                {/* Review Text - Make it scrollable if it overflows */}
                <div className="overflow-y-auto max-h-24 text-gray-800 mb-4 text-sm leading-relaxed flex-grow scrollbar-hidden px-5">
                  Review: {review.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
