'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getReviewsFromFirestore, deleteReviewFromFirestore, ReviewItem } from '../lib/reviewsService';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from './ConfirmModal';
import { FaChevronLeft, FaChevronRight, FaStar, FaTrash, FaPen } from 'react-icons/fa';
import Avatar from 'react-avatar';

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useAuth();

  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    reviewId: string;
    clientName: string;
  }>({
    isOpen: false,
    reviewId: '',
    clientName: '',
  });

  const fetchReviews = async () => {
    const data = await getReviewsFromFirestore();
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDeleteReview = (id: string, name: string) => {
    setDeleteModalState({
      isOpen: true,
      reviewId: id,
      clientName: name,
    });
  };

  const confirmDelete = async () => {
    if (deleteModalState.reviewId) {
      await deleteReviewFromFirestore(deleteModalState.reviewId);
      fetchReviews();
    }
  };

  const scrollContent = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative py-4 px-2">
      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Client Review"
        message={`Are you sure you want to delete the review by "${deleteModalState.clientName}"?`}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalState((prev) => ({ ...prev, isOpen: false }))}
      />

      {reviews.length === 0 ? (
        <div className="max-w-md mx-auto text-center glass-dark p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto text-xl border border-amber-500/30">
            <FaStar />
          </div>
          <h3 className="text-lg font-bold text-white">No Client Reviews Yet</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Be the first to share your experience with our solar & lighting engineering services!
          </p>
          <Link
            href="/leave-review"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs shadow-glow-gold transition-all"
          >
            <FaPen />
            <span>Leave a Review</span>
          </Link>
        </div>
      ) : (
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            aria-label="Scroll left"
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 bg-slate-900/90 border border-slate-700 text-amber-400 p-3 rounded-full hover:bg-amber-500 hover:text-slate-950 transition-all shadow-lg hidden sm:flex items-center justify-center"
            onClick={() => scrollContent('left')}
          >
            <FaChevronLeft className="text-base" />
          </button>

          {/* Scroll Right Button */}
          <button
            aria-label="Scroll right"
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 bg-slate-900/90 border border-slate-700 text-amber-400 p-3 rounded-full hover:bg-amber-500 hover:text-slate-950 transition-all shadow-lg hidden sm:flex items-center justify-center"
            onClick={() => scrollContent('right')}
          >
            <FaChevronRight className="text-base" />
          </button>

          {/* Horizontal Cards Scroll Region */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hidden flex space-x-6 py-4 px-2"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="glass-dark p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between w-72 h-64 flex-shrink-0 hover:border-slate-700 transition-all duration-300 transform hover:-translate-y-1 relative group/card"
              >
                {/* Admin Quick Delete Icon */}
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteReview(review.id, review.name)}
                    title="Delete Review (Admin)"
                    className="absolute top-3 right-3 p-2 bg-rose-950/80 hover:bg-rose-900 text-rose-400 rounded-full border border-rose-800/60 opacity-0 group-hover/card:opacity-100 transition-opacity z-10"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                )}

                <div className="flex items-center space-x-3 mb-3">
                  <Avatar
                    name={review.name}
                    round
                    size="48"
                    color="#0F172A"
                    fgColor="#F59E0B"
                    className="border border-amber-500/30 flex-shrink-0"
                  />
                  <div className="truncate">
                    <h4 className="text-sm font-bold text-white truncate">{review.name}</h4>
                    <div className="flex text-amber-400 text-xs mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < (review.rating || 5) ? 'text-amber-400' : 'text-slate-700'}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-32 text-slate-300 text-xs leading-relaxed scrollbar-hidden italic pr-1">
                  &ldquo;{review.text}&rdquo;
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
