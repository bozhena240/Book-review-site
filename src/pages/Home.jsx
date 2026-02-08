import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { useBooks } from '../context/BookContext';
import './Home.css';

const genres = [
  'Fiction', 'Fantasy', 'Mystery', 'Romance', 'Science Fiction', 
  'Biography', 'History', 'Philosophy', 'Poetry', 'Drama'
];

const Home = () => {
  const { books, loading, error, fetchBooksByGenre } = useBooks();
  const [selectedGenre, setSelectedGenre] = useState('Fiction');

  useEffect(() => {
    fetchBooksByGenre(selectedGenre);
  }, [selectedGenre, fetchBooksByGenre]);

  if (loading && books.length === 0) {
    return <div className="loading-container"><div className="loading-spinner"></div></div>;
  }

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">Curated Reviews for the Literary Mind</h1>
        <p className="hero-subtitle">Discover profound insights into literature across genres.</p>
      </div>
      
      <div className="genre-filter">
        <h2 className="section-title">Browse by Genre</h2>
        <div className="genre-buttons">
          {genres.map(genre => (
            <button
              key={genre}
              className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
      
      <div className="books-grid">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;