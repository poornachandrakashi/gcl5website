import { Trophy, Info, Medal, Star } from 'lucide-react';
import PointsTable from '../components/PointsTable';
import Leaderboard from '../components/Leaderboard';

const Stats = () => {
  return (
    <div className="stats-page" style={{ minHeight: '80vh', padding: '4rem 2rem' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge" style={{ 
            background: 'rgba(139, 90, 43, 0.1)', 
            color: 'var(--sandalwood-dark)',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>Season 5 Standings</span>
          <h1 style={{ 
            fontFamily: 'Cinzel, serif', 
            fontSize: '3rem', 
            color: 'var(--sandalwood-deep)',
            marginTop: '1rem'
          }}>Points Table</h1>
          <div className="decorative-line" style={{ 
            width: '80px', 
            height: '4px', 
            background: 'var(--gold-primary)', 
            margin: '1.5rem auto' 
          }} />
        </div>

        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Trophy size={24} color="var(--gold-primary)" />
            <h2 style={{ fontSize: '1.8rem', color: 'var(--sandalwood-deep)', margin: 0 }}>Team Standings</h2>
          </div>
          <PointsTable />
        </section>

        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Medal size={24} color="var(--gold-primary)" />
            <h2 style={{ fontSize: '1.8rem', color: 'var(--sandalwood-deep)', margin: 0 }}>Tournament Leaderboard</h2>
          </div>
          <Leaderboard />
        </section>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px', background: 'rgba(253, 245, 230, 0.5)', padding: '1.5rem', borderRadius: '8px', border: '1px dashed var(--gold-primary)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--sandalwood-deep)', marginBottom: '1rem' }}>
              <Trophy size={18} color="var(--gold-primary)" />
              Qualification Rules
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              <li>Top 4 teams at the end of league stage qualify for Playoffs.</li>
              <li>Points: Win = 2, Tie/NR = 1, Loss = 0.</li>
              <li>In case of equal points, NRR will decide the ranking.</li>
            </ul>
          </div>
          
          <div style={{ flex: 1, minWidth: '300px', padding: '1.5rem' }}>
            <h4 style={{ color: 'var(--sandalwood-deep)', marginBottom: '1rem' }}>Live Updates</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Our points table is synced directly with CricHeroes. Rankings are updated in real-time as match results are recorded.
            </p>
            <a href="https://cricheroes.com/tournament/1845075/gudigar-cricket-league-season-5" target="_blank" rel="noreferrer" style={{ 
              color: 'var(--gold-primary)', 
              fontSize: '0.85rem', 
              fontWeight: 600,
              textDecoration: 'none',
              borderBottom: '1px solid var(--gold-primary)'
            }}>View on CricHeroes →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
