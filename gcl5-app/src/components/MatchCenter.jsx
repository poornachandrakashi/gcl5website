import React, { useState, useEffect } from 'react';
import { Radio, Calendar, Trophy, AlertCircle } from 'lucide-react';

const MatchCenter = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://cricheroes.com/_next/data/VJCa1OqVcXtUf3QXmrsKn/tournament/1845075/gudigar-cricket-league-season-5/matches/live-matches.json?tournamentId=1845075&tournamentName=gudigar-cricket-league-season-5&tabName=matches&innerTab=live-matches', {
          headers: { 'x-nextjs-data': '1' }
        });
        const json = await response.json();
        
        // Handle redirect or empty matches
        if (json.pageProps?.matchResponse?.status === true) {
          setLiveMatches(json.pageProps.matchResponse.data || []);
        }
      } catch (err) {
        console.warn("Match API restricted or no live matches.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <section id="match-center" style={{ marginBottom: '6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
           <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e74c3c', animation: 'pulse 1.5s infinite' }} />
           <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#e74c3c', textTransform: 'uppercase', letterSpacing: '2px' }}>Live Match Center</span>
        </div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Match Updates</h2>
        <div className="title-underline" style={{ margin: '0 auto' }}></div>
      </div>

      <div className="carved-section" style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', padding: '3rem' }}>
        {loading ? (
          <div className="loader" />
        ) : liveMatches.length > 0 ? (
          <div style={{ width: '100%' }}>
            {/* Live match cards would go here */}
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            <Radio size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>No Ongoing Matches</p>
            <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0.5rem auto' }}>
              The thrill begins on April 30th. Live scores and ball-by-ball updates will appear here during game time.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn-primary" style={{ fontSize: '0.8rem' }}>View Schedule</button>
              <button className="btn-secondary" style={{ fontSize: '0.8rem' }}>Set Reminders</button>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
};

export default MatchCenter;
