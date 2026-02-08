import { NavLink } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const Header = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="header">
      <div className="nav-container">
        <NavLink to="/" className="logo">
          <i className="fas fa-book-open"></i>
          Dark Academia Reviews
        </NavLink>
        
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                My Favorites
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-secondary">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;