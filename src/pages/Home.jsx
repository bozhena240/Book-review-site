import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const { 
    books, 
    searchResults, 
    loading, 
    error, 
    fetchBooksByGenre,
    clearSearch 
  } = useBooks();

  const genres = [
    "Fiction", "Fantasy", "Mystery", "Romance", 
    "Science Fiction", "History", "Philosophy", "Poetry", "Drama"
  ];

  const displayedBooks = searchResults && searchResults.length > 0 ? searchResults : books;

  if (loading) return <Loading />;

  if (error) return (
    <div className="error-container">
      <p className="error-msg">The archives are temporarily unreachable. {error}</p>
    </div>
  );

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Curated Reviews for the Literary Mind</h1>
          <p className="hero-subtitle">Discover profound insights into literature across genres.</p>
          <SearchBar /> 
        </div>
      </section>

      {/* Genre Filter Bar  */}
      <div className="genre-section">
        <h3 className="section-label">Browse by Genre</h3>
        <div className="genre-filters">
          {genres.map(genre => (
            <button 
              key={genre} 
              className="genre-btn"
              onClick={() => {
                clearSearch(); 
                fetchBooksByGenre(genre);
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Main Books Grid */}
      <div className="books-grid">
        {displayedBooks.length > 0 ? (
          displayedBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p className="empty-msg">No volumes found in this section of the library.</p>
        )}
      </div>
    </div>
  );
};

export default Home;