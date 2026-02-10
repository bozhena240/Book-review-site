const BASE_URL = 'https://www.googleapis.com/books/v1';

const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || '';

export const searchBooks = async (query, maxResults = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}${GOOGLE_BOOKS_API_KEY ? `&key=${GOOGLE_BOOKS_API_KEY}` : ''}`
    );
    const data = await response.json();
    
    return data.items?.map(book => ({
      id: book.id,
      title: book.volumeInfo?.title || 'Unknown Title',
      author: book.volumeInfo?.authors?.join(', ') || 'Unknown Author',
      genre: book.volumeInfo?.categories?.[0] || 'General',
      rating: book.volumeInfo?.averageRating || 0,
      summary: book.volumeInfo?.description || 'No description available',
      imageUrl: book.volumeInfo?.imageLinks?.thumbnail?.replace('http://', 'https://') || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    })) || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const getPopularBooks = async () => searchBooks('subject:fiction', 12);
export const getBooksByGenre = async (genre) => searchBooks(`subject:${genre}`, 20);
export const getBookById = async (id) => {
  const response = await fetch(`${BASE_URL}/volumes/${id}`);
  const book = await response.json();
  return book;
};