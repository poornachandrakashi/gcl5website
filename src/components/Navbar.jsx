import { Link, useLocation } from 'react-router-dom';
import gclLogo from '../assets/logo.png';
import { Calendar, Users, Trophy, Info, Handshake, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="navbar" style={{
      padding: '0.8rem 1rem',
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
      gap: '0.8rem'
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <img 
          src={gclLogo} 
          alt="GCL 5" 
          style={{ 
            height: '40px', 
            width: 'auto',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }} 
        />
        <h2 style={{ 
          fontSize: '1.1rem', 
          letterSpacing: '1px', 
          color: 'var(--sandalwood-deep)', 
          margin: 0,
          fontFamily: 'Cinzel, serif'
        }}>GCL 5</h2>
      </Link>
      
      <div className="nav-links" style={{ 
        display: 'flex', 
        gap: '1.2rem',
        overflowX: 'auto',
        paddingBottom: '2px',
        flexGrow: 1,
        justifyContent: 'flex-end',
        minWidth: '280px'
      }}>
        <NavLink icon={<Calendar size={16}/>} text="Schedule" isHome={isHome} />
        <NavLink icon={<Users size={16}/>} text="Teams" isHome={isHome} />
        <NavLink icon={<Trophy size={16}/>} text="Stats" isHome={isHome} to="/stats" sectionId="#stats" />
        <NavLink icon={<Handshake size={16}/>} text="Sponsors" isHome={isHome} to="/sponsors" />
        <NavLink icon={<MessageCircle size={16}/>} text="Fan Wall" isHome={isHome} to="/fan-wall" />
        <NavLink icon={<Info size={16}/>} text="Heritage" isHome={isHome} />
      </div>
    </nav>
  );
};

const NavLink = ({ icon, text, isHome, to, sectionId }) => {
  const target = sectionId || `#${text.toLowerCase()}`;
  const isDedicatedPage = !!to;
  
  if (isHome && !isDedicatedPage) {
    return (
      <a 
        href={target}
        style={navLinkStyle} 
        className="nav-link-item"
      >
        {icon}
        <span>{text}</span>
      </a>
    );
  }

  return (
    <Link 
      to={to || `/${target}`}
      style={navLinkStyle}
      className="nav-link-item"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

const navLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  textDecoration: 'none',
  color: 'var(--text-muted)',
  fontWeight: 600,
  fontSize: '0.9rem',
  transition: 'color 0.3s',
  whiteSpace: 'nowrap'
};

export default Navbar;
