import React, { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Avatar from 'react-avatar';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const scrollRef = useRef(null);

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
      const scrollAmount = direction === 'left' ? -300 : 300;
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
        <div className="relative">
          {/* Left Arrow */}
          <div
            className="absolute left-[-35px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600 transition-all"
            onClick={() => scrollContent('left')}
          >
            <FaChevronLeft className="text-xl" />
          </div>

          {/* Right Arrow */}
          <div
            className="absolute right-[-35px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600 transition-all"
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
              >
                {/* Avatar using react-avatar */}
                <Avatar
                  name={review.name}
                  round
                  size="60"
                  className="mb-1"
                  color="#f0f0f0"
                  fgColor="#000"
                />

                {/* Client Name */}
                <span className="text-gray-600 text-md mb-1 font-medium">
                  {review.name}
                </span>

                {/* Rating */}
                <div className="text-yellow-500 mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <div className="overflow-y-auto max-h-24 text-gray-800 text-sm leading-relaxed flex-grow scrollbar-hidden text-wrap pl-4 break-words">
                  {review.text}
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
