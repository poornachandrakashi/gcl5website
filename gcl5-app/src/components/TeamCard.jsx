import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamCard = ({ team }) => {
  return (
    <Link to={`/team/${team.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        className="carved-section"
        style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: '#fff',
          cursor: 'pointer',
          margin: '0'
        }}
      >
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: '#F3E5AB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          boxShadow: 'inset 0 4px 8px rgba(139, 90, 43, 0.2), 0 8px 16px rgba(0,0,0,0.05)',
          border: '3px solid var(--sandalwood-medium)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <img 
            src={team.logo} 
            alt={team.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{
            display: 'none',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontFamily: 'Cinzel, serif',
            color: 'var(--sandalwood-dark)',
            background: 'linear-gradient(135deg, #F3E5AB 0%, #E2CF8E 100%)'
          }}>
            {team.name.charAt(0)}
          </div>
        </div>
        
        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--sandalwood-deep)' }}>
          {team.name}
        </h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          <MapPin size={16} color="var(--gold-primary)" />
          {team.location}
        </div>

        <div style={{
          padding: '0.3rem 1rem',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          backgroundColor: team.color + '20',
          color: team.color,
          border: `1px solid ${team.color}40`
        }}>
          GCL 5 Competitor
        </div>
      </motion.div>
    </Link>
  );
};

export default TeamCard;
