import { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError("The registry could not accept this soul. Ensure your password is at least 6 characters.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2 className="auth-title">Join the Society</h2>
        {error && <p className="auth-error">{error}</p>}
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Choose Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="auth-input"
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Choose Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="auth-input"
            required 
          />
        </div>
        <button type="submit" className="btn-auth">Sign Up</button>
        <p className="auth-footer">Already a member? <Link to="/login">Enter the Archives</Link></p>
      </form>
    </div>
  );
};

export default Signup;