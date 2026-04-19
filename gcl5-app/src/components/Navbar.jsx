import { Link, useLocation } from 'react-router-dom';
import gclLogo from '../assets/logo.png';
import { Calendar, Users, Trophy, Info } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="navbar" style={{
      padding: '0.8rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      backgroundColor: 'rgba(253, 245, 230, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      borderBottom: '2px solid rgba(139, 90, 43, 0.1)',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img 
          src={gclLogo} 
          alt="GCL 5" 
          style={{ 
            height: '45px', 
            width: 'auto',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }} 
        />
        <h2 style={{ 
          fontSize: '1.2rem', 
          letterSpacing: '1px', 
          color: 'var(--sandalwood-deep)', 
          margin: 0,
          fontFamily: 'Cinzel, serif'
        }}>GCL 5</h2>
      </Link>
      
      <div className="nav-links" style={{ 
        display: 'flex', 
        gap: '1.5rem',
        overflowX: 'auto',
        maxWidth: '100%',
        paddingBottom: '5px'
      }}>
        <NavLink icon={<Calendar size={16}/>} text="Schedule" isHome={isHome} />
        <NavLink icon={<Users size={16}/>} text="Teams" isHome={isHome} />
        <NavLink icon={<Trophy size={16}/>} text="Stats" isHome={isHome} />
        <NavLink icon={<Info size={16}/>} text="Heritage" isHome={isHome} />
      </div>

      <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.6rem 1rem' }}>Register</button>
    </nav>
  );
};

const NavLink = ({ icon, text, isHome }) => {
  const target = `#${text.toLowerCase()}`;
  
  // If we're on the home page, use a plain anchor for smooth scroll
  // If we're on another page, use a link to the home page with the hash
  return (
    <a 
      href={isHome ? target : `/${target}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        color: 'var(--text-muted)',
        fontWeight: 600,
        fontSize: '0.95rem',
        transition: 'color 0.3s'
      }} 
      onMouseEnter={(e) => e.target.style.color = 'var(--sandalwood-dark)'}
      onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
};

export default Navbar;
