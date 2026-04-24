import { Medal, Star, Trophy, Target } from 'lucide-react';
import PointsTable from './PointsTable';
import Leaderboard from './Leaderboard';

const Stats = () => {
  return (
    <section id="stats" className="stats-section">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge" style={{ 
          background: 'rgba(139, 90, 43, 0.1)', 
          color: 'var(--sandalwood-dark)',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '1rem',
          display: 'inline-block'
        }}>Tournament Intel</span>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Tournament Statistics</h2>
        <div className="title-underline" style={{ margin: '0 auto' }}></div>
        <p style={{ color: 'var(--text-muted)' }}>Real-time rankings and leaderboard from CricHeroes.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '2.5rem',
        marginBottom: '4rem'
      }}>
        <div className="carved-section" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--sandalwood-deep)' }}>
            <Trophy size={24} color="var(--gold-primary)" />
            Team Standings
          </h3>
          <PointsTable compact={true} />
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <a href="/stats" style={{ 
              fontSize: '0.85rem', 
              color: 'var(--gold-primary)', 
              fontWeight: 700, 
              textDecoration: 'none',
              borderBottom: '1px solid var(--gold-primary)'
            }}>View Full Points Table →</a>
          </div>
        </div>

        <div className="carved-section" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--sandalwood-deep)' }}>
            <Target size={24} color="var(--gold-primary)" />
            Player Leaderboard
          </h3>
          <Leaderboard />
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Top Performers based on official CricHeroes ratings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
