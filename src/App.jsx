import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Header from './components/Header';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
             <Route path="/book/:id" element={<BookDetail />} /> 
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>Dark Academia Book Reviews © {new Date().getFullYear()}</p>
            <p>Powered by Google Books API</p>
            <p className="disclaimer">
              A sanctuary for literature and thoughtful analysis.
            </p>
          </footer>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;