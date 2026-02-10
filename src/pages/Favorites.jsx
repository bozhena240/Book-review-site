import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext'; 
import { collection, query, onSnapshot } from 'firebase/firestore';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';

const Favorites = () => {
  const { user } = useAuth(); 
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'users', user.uid, 'favorites'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const books = [];
      querySnapshot.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      setFavorites(books);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) return <Loading />;

  if (!user) {
    return (
      <div className="auth-required-msg">
        <h2 className="hero-title">Access Denied</h2>
        <p>You must enter the archives (log in) to view your private collection.</p>
      </div>
    );
  }

  // Personalize 
  const displayName = user.email ? user.email.split('@')[0] : 'Scholar';

  return (
    <div className="favorites-container">
      <header className="page-header">
        <h1 className="hero-title">The Private Library of {displayName}</h1>
        <p className="hero-subtitle">A curated collection of your most cherished volumes.</p>
      </header>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p className="empty-msg">Your shelves are currently empty, seeker.</p>
          <p className="empty-sub">Visit the Great Hall to discover new texts.</p>
        </div>
      ) : (
        <div className="books-grid">
          {favorites.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;