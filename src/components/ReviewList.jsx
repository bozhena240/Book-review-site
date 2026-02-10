import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      where('bookId', '==', bookId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      console.log("Archive update received:", reviewData); 
      setReviews(reviewData);
    }, (error) => {
      console.error("Archive access denied:", error);
    });

    return () => unsubscribe();
  }, [bookId]);

  const handleDelete = async (reviewId) => {
    if (window.confirm("Strike this from the archives?")) {
      try {
        await deleteDoc(doc(db, 'reviews', reviewId));
      } catch (err) {
        console.error("Deletion failed:", err);
      }
    }
  };

  return (
    <div className="reviews-section">
      <h3 className="section-label">Scholarly Discussions</h3>
      {reviews.length === 0 ? (
        <p className="empty-msg">No scholarly analysis found for this volume yet.</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <p className="review-meta"><strong>{review.userName}</strong> gave it {review.rating} stars</p>
              {user && user.uid === review.userId && (
                <button onClick={() => handleDelete(review.id)} className="btn-delete-review">
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </div>
            <p className="review-text">"{review.text}"</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;