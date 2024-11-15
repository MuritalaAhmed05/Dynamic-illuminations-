import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

function LeaveReview() {
  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the review to Firebase
      await addDoc(collection(db, 'reviews'), {
        name,
        text: reviewText,
        rating,
        timestamp: new Date(),
      });

      // Clear the form after submitting
      setName('');
      setReviewText('');
      setRating(0);

      // Redirect to the home page to see the review
      navigate('/');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />

          {/* Review Input */}
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Your Review"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />

          {/* Rating Input */}
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-2xl ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeaveReview;
