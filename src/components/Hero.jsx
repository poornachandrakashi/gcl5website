import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Hero = () => {
  return (
    <section className="hero" style={{
      textAlign: 'center',
      padding: 'clamp(4rem, 15vh, 8rem) 1rem',
      position: 'relative',
      background: 'linear-gradient(rgba(253, 245, 230, 0.8), rgba(253, 245, 230, 0.8)), url("https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={logo} alt="GCL 5 Logo" style={{
          width: 'clamp(140px, 40vw, 240px)',
          height: 'auto',
          marginBottom: '1rem',
          filter: 'drop-shadow(0 15px 30px rgba(62, 39, 18, 0.3))'
        }} />
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 10vw, 4.5rem)', 
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          background: 'linear-gradient(to right, #8B5A2B, #D4AF37, #8B5A2B)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'Cinzel, serif',
          padding: '0 10px'
        }}>
          Gudigar Cricket League 5
        </h1>
        
        <p style={{
          fontSize: 'clamp(1rem, 4vw, 1.4rem)',
          color: 'var(--text-muted)',
          maxWidth: '700px',
          margin: '0 auto 2.5rem auto',
          fontWeight: 400,
          padding: '0 20px'
        }}>
          Celebrating our heritage of Sandalwood Carving through the spirit of sports. 
          Join us on <span style={{ color: 'var(--sandalwood-dark)', fontWeight: 700 }}>May 1st & 2nd, 2026</span>.
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
            View Fixtures
          </button>
          <button style={{ 
            padding: '0.8rem 2rem', 
            fontSize: '1rem',
            background: 'transparent',
            border: '2px solid var(--sandalwood-dark)',
            color: 'var(--sandalwood-dark)',
            borderRadius: '8px',
            fontWeight: 600
          }}>
            About GCL
          </button>
        </div>
      </motion.div>
      
      {/* Intricate Carving Border */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40px',
        background: 'url("https://www.transparenttextures.com/patterns/natural-paper.png"), var(--gold-primary)',
        opacity: 0.3,
        maskImage: 'linear-gradient(to top, black, transparent)'
      }}></div>
    </section>
  );
};

export default Hero;
