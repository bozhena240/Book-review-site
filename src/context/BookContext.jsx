import { createContext, useState, useContext, useEffect } from 'react';
import { 
  getPopularBooks, 
  searchBooks, 
  getBooksByGenre, 
  getBookById 
} from '../services/booksAPI';

const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch initial books when the app first loads
  useEffect(() => {
    const fetchInitialBooks = async () => {
      setLoading(true);
      try {
        const popular = await getPopularBooks();
        setBooks(popular);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialBooks();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await searchBooks(query);
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooksByGenre = async (genre) => {
    setLoading(true);
    try {
      const genreBooks = await getBooksByGenre(genre);
      setBooks(genreBooks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    books,
    loading,
    error,
    searchResults,
    handleSearch,
    fetchBooksByGenre,
    getBookById
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};