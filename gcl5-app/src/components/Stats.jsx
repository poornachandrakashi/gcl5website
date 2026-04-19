import React from 'react';
import { playerStats, teamStandings } from '../data/stats';
import { Trophy, Medal, Star } from 'lucide-react';

const Stats = () => {
  return (
    <section id="stats" className="stats-section">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Tournament Statistics</h2>
        <div className="title-underline" style={{ margin: '0 auto' }}></div>
        <p style={{ color: 'var(--text-muted)' }}>Live updates from the GCL 5 grounds.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '2.5rem',
        marginBottom: '4rem'
      }}>
        <StatTable 
          title="Top Run Scorers" 
          icon={<Star size={20} color="var(--gold-primary)" />}
          data={playerStats.topScorers}
          columns={['Player', 'Team', 'Runs', 'SR']}
          dataKeys={['name', 'team', 'runs', 'sr']}
        />
        <StatTable 
          title="Top Wicket Takers" 
          icon={<Medal size={20} color="var(--gold-primary)" />}
          data={playerStats.topWicketTakers}
          columns={['Player', 'Team', 'Wickets', 'Econ']}
          dataKeys={['name', 'team', 'wickets', 'econ']}
        />
      </div>

      <div className="carved-section">
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Trophy size={24} color="var(--gold-primary)" />
          Team Standings
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--sandalwood-light)', background: 'var(--sandalwood-light)' }}>
                <th style={{ padding: '1rem' }}>POS</th>
                <th style={{ padding: '1rem' }}>TEAM</th>
                <th style={{ padding: '1rem' }}>P</th>
                <th style={{ padding: '1rem' }}>W</th>
                <th style={{ padding: '1rem' }}>L</th>
                <th style={{ padding: '1rem' }}>PTS</th>
                <th style={{ padding: '1rem' }}>NRR</th>
              </tr>
            </thead>
            <tbody>
              {teamStandings.map((team, idx) => (
                <tr key={team.id} style={{ borderBottom: '1px solid rgba(139, 90, 43, 0.1)' }}>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>{idx + 1}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{team.team}</td>
                  <td style={{ padding: '1rem' }}>{team.played}</td>
                  <td style={{ padding: '1rem' }}>{team.won}</td>
                  <td style={{ padding: '1rem' }}>{team.lost}</td>
                  <td style={{ padding: '1rem', color: 'var(--gold-primary)', fontWeight: 800 }}>{team.pts}</td>
                  <td style={{ padding: '1rem', opacity: 0.7 }}>{team.nrr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const StatTable = ({ title, icon, data, columns, dataKeys }) => (
  <div className="carved-section" style={{ padding: '1.5rem', overflowX: 'auto' }}>
    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
      {icon}
      {title}
    </h3>
    <div style={{ minWidth: '300px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--sandalwood-light)' }}>
            {columns.map(col => <th key={col} style={{ paddingBottom: '0.8rem' }}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid rgba(139, 90, 43, 0.05)' }}>
              {dataKeys.map(key => (
                <td key={key} style={{ padding: '0.8rem 0', fontWeight: key === 'name' ? 600 : 400 }}>
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Stats;
