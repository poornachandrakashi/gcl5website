import React from 'react';
import { User } from 'lucide-react';
import { organizers } from '../data/organizers';

const Organizers = () => {
  return (
    <section id="organizers" style={{ marginBottom: '6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Organizing Committee</h2>
        <div className="title-underline" style={{ margin: '0 auto' }}></div>
        <p style={{ color: 'var(--text-muted)' }}>The dedicated team behind GCL 5.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {organizers.map((organizer) => (
          <div key={organizer.id} className="carved-section" style={{ 
            padding: '1.5rem', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #FDF5E6 100%)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--sandalwood-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--sandalwood-medium)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              {organizer.image ? (
                <img 
                  src={organizer.image} 
                  alt={organizer.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <User size={40} color="var(--sandalwood-dark)" />
              )}
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--sandalwood-deep)' }}>
                {organizer.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {organizer.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Organizers;
