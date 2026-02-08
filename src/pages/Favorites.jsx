import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, query, onSnapshot } from 'firebase/firestore';
import BookCard from '../components/BookCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'users', auth.currentUser.uid, 'favorites'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const books = [];
      querySnapshot.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      setFavorites(books);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!auth.currentUser) {
    return <div className="favorites-empty">Please log in to view your library.</div>;
  }

  return (
    <div className="favorites-page">
      <h2 className="section-title">Your Private Library</h2>
      {favorites.length === 0 ? (
        <p className="empty-msg">Your collection is currently empty. Visit the Home page to add books.</p>
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