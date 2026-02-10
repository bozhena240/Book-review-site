import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const ReviewForm = ({ bookId, bookTitle }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || isSubmitting || !reviewText.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        bookId,
        bookTitle,
        text: reviewText.trim(),
        rating: Number(rating),
        userId: user.uid,
        userName: user.email.split('@')[0],
        createdAt: serverTimestamp()
      });

      setReviewText('');
      setRating(5);
    } catch (err) {
      console.error("Firestore Save Error:", err);
      alert("Archive is locked. Please check your Firebase Security Rules.");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 800);
    }
  };

  if (isSubmitting) return <p className="loading-text">Preserving your analysis in the archives...</p>;

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="section-label">Write Your Analysis</h3>
      <select value={rating} onChange={(e) => setRating(e.target.value)} className="auth-input">
        {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
      </select>
      <textarea
        className="auth-input"
        placeholder="Share your thoughts on this volume..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      />
      <button type="submit" className="btn-auth">Submit to Archives</button>
    </form>
  );
};

export default ReviewForm;