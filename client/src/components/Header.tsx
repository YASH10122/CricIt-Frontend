import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Style/Header.css'

const URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const token = localStorage.getItem('token')

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {

    try {
      await fetch(`${URL}/api/users/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  

  return (
    <header className="header">
  <div className="header-container">
    <div className="logo-section">

      <Link to="/" className="logo">
        <img src="/Cric_It.svg" alt="cric.it" className="logo-icon" />
        Cric<span>.It</span>
        
      </Link>
      <p className="tagline">Live Cricket Score </p>

    </div>

    <nav className="nav-menu">
      <Link to="/">Dashboard</Link>
      <Link to="/team">Teams</Link>
      <Link to="/player">Players</Link>
      <Link to="/match">Matches</Link>
      {/* <Link to="/all">My Matches</Link> */}
    </nav>

    <div className="user-section">
      
      {isLoggedIn ? (
        <button onClick={handleLogout} className="auth-btn">Logout</button>
      ) : (
        <>
          <Link to="/login" className="auth-btn">Login</Link>
          <Link to="/register" className="auth-btn">Register</Link>
        </>
      )}
    </div>
  </div>
</header>
  );
};

export default Header;
