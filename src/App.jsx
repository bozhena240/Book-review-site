import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Favorites from './pages/Favorites';
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} /> 
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />   
          <Route path="/signup" element={<Signup />} />
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
  );
}

export default App;