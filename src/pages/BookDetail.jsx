import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/booksAPI';
import ReviewForm from '../components/ReviewForm'; 
import ReviewList from '../components/ReviewList'; 

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        setBook({
          title: data.volumeInfo.title,
          author: data.volumeInfo.authors?.join(', '),
          description: data.volumeInfo.description,
          imageUrl: data.volumeInfo.imageLinks?.thumbnail.replace('http://', 'https://'),
          pageCount: data.volumeInfo.pageCount,
          publishedDate: data.volumeInfo.publishedDate
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <div className="loading">Consulting the archives...</div>;
  if (!book) return <div className="error">Book not found in the library.</div>;

  return (
    <div className="book-detail">
      <div className="detail-container">
        <img src={book.imageUrl} alt={book.title} className="detail-img" />
        <div className="detail-info">
          <h1 className="detail-title">{book.title}</h1>
          <p className="detail-author">By {book.author}</p>
          <div className="detail-meta">
            <span>{book.pageCount} Pages</span> | <span>Published: {book.publishedDate}</span>
          </div>
          <div className="detail-description" dangerouslySetInnerHTML={{ __html: book.description }} />
        </div>
      </div>

      <section className="discussion-section">
        <ReviewForm bookId={id} bookTitle={book.title} />
        <ReviewList bookId={id} />
      </section>
    </div>
  );
};

export default BookDetail;