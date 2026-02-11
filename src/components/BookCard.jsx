import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const BookCard = ({ book }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const placeholderImage = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000&auto=format&fit=crop";
  const secureImageUrl = book.imageUrl ? book.imageUrl.replace('http://', 'https://') : placeholderImage;

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        const favoriteRef = doc(db, 'users', user.uid, 'favorites', book.id);
        const favoriteSnap = await getDoc(favoriteRef);
        setIsFavorite(favoriteSnap.exists());
      }
    };
    checkFavoriteStatus();
  }, [book.id, user]);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault(); 
    if (!user) {
      alert('Please log in to save favorites to your archive.');
      return;
    }
    
    setLoading(true);
    try {
      const favoriteRef = doc(db, 'users', user.uid, 'favorites', book.id);
      
      if (isFavorite) {
        await deleteDoc(favoriteRef);
        setIsFavorite(false);
      } else {
        await setDoc(favoriteRef, {
          ...book,
          imageUrl: secureImageUrl, 
          addedAt: new Date().toISOString()
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("The archive resisted your request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-card">
      <div className="book-image-container">
        <img 
          src={secureImageUrl} 
          alt={book.title} 
          className="book-image" 
          onError={(e) => { 
            if (e.target.src !== placeholderImage) {
              e.target.src = placeholderImage; 
            }
          }}
        />
        <div className="book-genre">{book.genre}</div>
        <button 
          onClick={handleFavoriteToggle} 
          className={`fav-icon-btn ${isFavorite ? 'active' : ''}`}
          disabled={loading}
          aria-label="Toggle Favorite"
        >
          <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i>
        </button>
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
        </div>
        
        <p className="book-summary">{book.summary?.substring(0, 80)}...</p>
        
        <div className="book-actions">
          <Link to={`/book/${book.id}`} className="read-more-link">
            Examine Volume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;