import { Link } from 'react-router-dom';
import { db, auth } from '../firebase/config';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const BookCard = ({ book }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if book already in favorites when card loads
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (auth.currentUser) {
        const favoriteRef = doc(db, 'users', auth.currentUser.uid, 'favorites', book.id);
        const favoriteSnap = await getDoc(favoriteRef);
        setIsFavorite(favoriteSnap.exists());
      }
    };
    checkFavoriteStatus();
  }, [book.id]);

  const handleFavoriteToggle = async () => {
    if (!auth.currentUser) {
      alert('Please log in to save favorites');
      return;
    }
    
    setLoading(true);
    try {
      const favoriteRef = doc(db, 'users', auth.currentUser.uid, 'favorites', book.id);
      
      if (isFavorite) {
        await deleteDoc(favoriteRef);
        setIsFavorite(false);
      } else {
        await setDoc(favoriteRef, {
          ...book,
          addedAt: new Date().toISOString()
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-card">
      <div className="book-image-container">
        <img src={book.imageUrl} alt={book.title} className="book-image" />
        <div className="book-genre">{book.genre}</div>
      </div>
      
      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <div className="book-rating">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`fas fa-star ${i < Math.floor(book.rating) ? 'filled' : ''}`}
            ></i>
          ))}
          <span className="rating-text">{book.rating}/5</span>
        </div>
        
        <p className="book-summary">{book.summary?.substring(0, 100)}...</p>
        
        <div className="book-actions">
          <Link to={`/book/${book.id}`} className="btn btn-primary">
            Read Review
          </Link>
          
          <button 
            onClick={handleFavoriteToggle} 
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            disabled={loading}
          >
            <i className={`fas fa-heart ${isFavorite ? 'filled' : ''}`}></i>
            {isFavorite ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;