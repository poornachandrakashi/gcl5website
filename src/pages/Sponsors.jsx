import React from 'react';
import { sponsors } from '../data/sponsors';
import { Award, Star, ShieldCheck } from 'lucide-react';

const SponsorCard = ({ sponsor, tier }) => {
  const isPlatinum = tier === 'platinum';
  const isGold = tier === 'gold';
  
  return (
    <div className="carved-section" style={{
      padding: isPlatinum ? '3rem' : '2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #FDF5E6 100%)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{
        padding: '1rem',
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
        marginBottom: '1rem',
        width: isPlatinum ? '200px' : '150px',
        height: isPlatinum ? '100px' : '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src={sponsor.logo} 
          alt={sponsor.name} 
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
        />
      </div>
      <h3 style={{ 
        color: 'var(--sandalwood-deep)', 
        fontSize: isPlatinum ? '1.5rem' : '1.2rem',
        margin: 0 
      }}>
        {sponsor.name}
      </h3>
      <p style={{ 
        color: 'var(--text-muted)', 
        fontSize: '0.9rem',
        maxWidth: '250px' 
      }}>
        {sponsor.description}
      </p>
    </div>
  );
};

const SponsorTier = ({ title, data, tier, icon: Icon, color }) => {
  if (!data || data.length === 0) return null;
  
  return (
    <div style={{ marginBottom: '6rem' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '1rem',
        marginBottom: '3rem' 
      }}>
        <div style={{ height: '2px', flex: 1, background: `linear-gradient(to right, transparent, ${color})` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 2rem' }}>
          <Icon size={32} color={color} />
          <h2 style={{ 
            fontSize: '2.2rem', 
            margin: 0, 
            color: color,
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            {title} Sponsors
          </h2>
        </div>
        <div style={{ height: '2px', flex: 1, background: `linear-gradient(to left, transparent, ${color})` }} />
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2.5rem',
        maxWidth: tier === 'platinum' ? '800px' : '1200px',
        margin: '0 auto'
      }}>
        {data.map(sponsor => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} tier={tier} />
        ))}
      </div>
    </div>
  );
};

const Sponsors = () => {
  return (
    <div style={{ 
      paddingTop: '100px', 
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '120px 2rem 6rem 2rem'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Our Partners</h1>
        <div className="title-underline" style={{ margin: '0 auto' }}></div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '1.5rem' }}>
          Special thanks to the organizations supporting Gudigar Cricket League 5 and preserving our heritage.
        </p>
      </div>

      <SponsorTier 
        title="Platinum" 
        data={sponsors.platinum} 
        tier="platinum" 
        icon={Award} 
        color="var(--gold-primary)" 
      />
      
      <SponsorTier 
        title="Gold" 
        data={sponsors.gold} 
        tier="gold" 
        icon={Star} 
        color="#D4AF37" 
      />
      
      <SponsorTier 
        title="Silver" 
        data={sponsors.silver} 
        tier="silver" 
        icon={ShieldCheck} 
        color="#A8A8A8" 
      />

      <div className="carved-section" style={{ 
        marginTop: '8rem', 
        padding: '4rem', 
        textAlign: 'center',
        background: 'var(--sandalwood-deep)',
        color: '#fff'
      }}>
        <h2 style={{ color: 'var(--gold-primary)', marginBottom: '1rem' }}>Become a Sponsor</h2>
        <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Partner with us to support local talent and be part of the most prestigious community cricket league.
        </p>
        <button className="gold-button" style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}>
          Download Prospectus
        </button>
      </div>
    </div>
  );
};

export default Sponsors;
