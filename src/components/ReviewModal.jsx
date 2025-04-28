import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Helmet } from 'react-helmet';
function LeaveReview() {
  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [nameError, setNameError] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // To track submission status
  const navigate = useNavigate();

  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for name and review text
    if (name.trim() === '') {
      setNameError('Name is required.');
    } else {
      setNameError('');
    }

    if (reviewText.trim() === '') {
      setReviewError('Review text is required.');
    } else {
      setReviewError('');
    }

    if (name.trim() && reviewText.trim()) {
      setIsSubmitting(true); // Set submitting to true when submitting the form

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

        // Display overall success message
        setStatus({ type: 'success', message: 'Review submitted successfully!' });

        // Clear success messages after 3 seconds and navigate
        setTimeout(() => {
          setStatus({ type: '', message: '' });
          navigate('/');
        }, 3000);
      } catch (error) {
        console.error('Error adding review:', error);
        setStatus({ type: 'error', message: 'Failed to submit review. Please try again.' });
      } finally {
        setIsSubmitting(false); // Set submitting to false after submission (either success or error)
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center">
         <Helmet>
        <title>Leave a Review | Dynamic Illuminations</title>
        <meta name="description" content="Leave a review and let us know how we did with your lighting project." />
      </Helmet>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

        {/* Display Success/Error Message */}
        {status.message && (
          <div
            className={`p-3 mb-4 rounded ${
              status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className={`w-full p-2 border ${nameError ? 'border-red-500' : 'border-gray-300'} rounded`}
             
            />
            {nameError && <p className="text-red-600 text-sm mt-1">{nameError}</p>}
          </div>

          {/* Review Input */}
          <div className="mb-4">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Your Review"
              className={`w-full p-2 border ${reviewError ? 'border-red-500' : 'border-gray-300'} rounded`}
             
            />
            {reviewError && <p className="text-red-600 text-sm mt-1">{reviewError}</p>}
          </div>

          {/* Rating Input */}
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-2xl cursor-pointer ${
                  i < rating ? 'text-yellow-500' : 'text-gray-300'
                }`}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeaveReview;
