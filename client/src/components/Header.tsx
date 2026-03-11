import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          {/* <h1 className="logo">Cric.It</h1> */}
          <Link to="/" className="logo">Cric.It</Link>
          <p className="tagline">Live Cricket Score & Match Management</p>
        </div>

        <nav className="nav-menu">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/team" className={location.pathname === '/team' ? 'active' : ''}>
            Teams
          </Link>
          <Link to="/player" className={location.pathname === '/player' ? 'active' : ''}>
            Players
          </Link>
          <Link to="/match" className={location.pathname === '/match' ? 'active' : ''}>
            Matches
          </Link>
        </nav>

        <div className="user-section">
          <span className="live-indicator"> LIVE</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
