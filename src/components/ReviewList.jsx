import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, onSnapshot, doc, deleteDoc, orderBy } from 'firebase/firestore';

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      where('bookId', '==', bookId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Archive access denied:", error);
    });

    return () => unsubscribe();
  }, [bookId]);
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate(); 
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

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
              <div className="meta-info">
                <p className="review-meta"><strong>{review.userName}</strong></p>
                <span className="review-date">{formatDate(review.createdAt)}</span>
              </div>
              <div className="review-rating-display">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < review.rating ? 'filled' : ''}`}></i>
                ))}
              </div>
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