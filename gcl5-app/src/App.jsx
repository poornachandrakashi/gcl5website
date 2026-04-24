import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TeamPage from './pages/TeamPage';
import Stats from './pages/Stats';

function App() {
  return (
    <div className="App">
      <div className="wood-texture" />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team/:id" element={<TeamPage />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>

      <footer style={{
        background: 'var(--sandalwood-deep)',
        color: 'var(--sandalwood-light)',
        padding: '4rem 2rem',
        textAlign: 'center',
        borderTop: '4px solid var(--gold-primary)'
      }}>
        <h3 style={{ color: 'var(--gold-primary)', marginBottom: '1rem' }}>Gudigar Cricket League 5</h3>
        <p style={{ opacity: 0.7, maxWidth: '500px', margin: '0 auto 2rem auto' }}>
          Preserving the legacy of sandalwood carving through community connection and sportsmanship.
        </p>
        <div style={{ fontSize: '0.9rem', opacity: 0.5 }}>
          © 2026 Gudigar Community. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
