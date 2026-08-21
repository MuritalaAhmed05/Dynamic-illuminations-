import type { Metadata } from 'next';
import LeaveReview from '../../components/ReviewModal';

export const metadata: Metadata = {
  title: 'Leave a Review | Dynamic Illuminations',
  description: 'Leave a review and let us know about your experience with Dynamic Illuminations.',
};

export default function LeaveReviewPage() {
  return <LeaveReview />;
}
