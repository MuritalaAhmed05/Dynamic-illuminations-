import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';

export interface ReviewItem {
  id: string;
  name: string;
  text: string;
  rating: number;
  timestamp?: any;
}

const REVIEWS_STORAGE_KEY = 'di_reviews_local_store_v1';

function getLocalReviews(): ReviewItem[] | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return null;
  }
}

function saveLocalReviews(items: ReviewItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(items));
}

export async function getReviewsFromFirestore(): Promise<ReviewItem[]> {
  try {
    const q = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const firestoreItems: ReviewItem[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data.name || 'Anonymous Client',
          text: data.text || '',
          rating: data.rating || 5,
          timestamp: data.timestamp,
        };
      });

      saveLocalReviews(firestoreItems);
      return firestoreItems;
    } else {
      // If Firestore is empty (e.g. all reviews deleted by admin), clear local storage so visitor browsers don't hold deleted reviews!
      saveLocalReviews([]);
      return [];
    }
  } catch (error) {
    console.warn('Firestore fetch reviews fallback:', error);
  }

  const localList = getLocalReviews();
  return localList || [];
}

export async function deleteReviewFromFirestore(id: string): Promise<void> {
  // 1. Delete from Firestore
  try {
    const docRef = doc(db, 'reviews', id);
    await deleteDoc(docRef);
  } catch (e) {
    console.warn('Firestore delete review warning:', e);
  }

  // 2. Update Local Storage Sync
  const current = getLocalReviews() || [];
  const updated = current.filter((item) => item.id !== id);
  saveLocalReviews(updated);
}
