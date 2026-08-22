'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

interface StatusState {
  type: 'success' | 'error' | '';
  message: string;
}

function LeaveReview() {
  const [name, setName] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [status, setStatus] = useState<StatusState>({ type: '', message: '' });
  const [nameError, setNameError] = useState<string>('');
  const [reviewError, setReviewError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      setIsSubmitting(true);

      try {
        await addDoc(collection(db, 'reviews'), {
          name,
          text: reviewText,
          rating,
          timestamp: new Date(),
        });

        setName('');
        setReviewText('');
        setRating(5);

        setStatus({ type: 'success', message: 'Thank you! Your review was submitted successfully.' });

        setTimeout(() => {
          setStatus({ type: '', message: '' });
          router.push('/');
        }, 3000);
      } catch (error) {
        console.error('Error adding review:', error);
        setStatus({ type: 'error', message: 'Failed to submit review. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-slate-950 min-h-[70vh] flex items-center justify-center py-16 px-4 relative overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="glass-dark p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-lg relative z-10">
        <h2 className="text-3xl font-extrabold mb-2 text-white text-center">Share Your Feedback</h2>
        <p className="text-xs text-slate-400 text-center mb-6">Let us know about your experience with our solar or lighting installation.</p>

        {status.message && (
          <div
            className={`p-3.5 mb-6 rounded-xl text-sm font-semibold text-center ${
              status.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Chief John Doe"
              className={`w-full p-3.5 bg-slate-900 border ${nameError ? 'border-rose-500' : 'border-slate-800'} text-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500 text-sm`}
            />
            {nameError && <p className="text-rose-400 text-xs mt-1">{nameError}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Your Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Describe our service, installation quality, or support..."
              rows={4}
              className={`w-full p-3.5 bg-slate-900 border ${reviewError ? 'border-rose-500' : 'border-slate-800'} text-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500 text-sm`}
            />
            {reviewError && <p className="text-rose-400 text-xs mt-1">{reviewError}</p>}
          </div>

          <div className="mb-6 text-center">
            <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Rating</label>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-3xl cursor-pointer transition-colors ${
                    i < rating ? 'text-amber-400' : 'text-slate-700 hover:text-amber-300'
                  }`}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-4 rounded-xl shadow-md transition-all disabled:opacity-50 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting Review...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeaveReview;
