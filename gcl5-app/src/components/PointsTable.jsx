import React, { useState, useEffect } from 'react';
import { Trophy, Info } from 'lucide-react';

const PointsTable = ({ compact = false }) => {
  const initialTeams = [
    { team_id: 1275780, team_name: "BENGALURU UNITED", logo: "https://media.cricheroes.in/team_logo/1714397349868_YXnUOHmrKaiB.jpeg", played: 0, won: 0, lost: 0, tied: 0, pts: 0, nrr: "0.000" },
    { team_id: 9699669, team_name: "Malnad Stags", logo: "https://media.cricheroes.in/team_logo/1745581342743_knXgNgexjdJb.jpg", played: 0, won: 0, lost: 0, tied: 0, pts: 0, nrr: "0.000" },
    { team_id: 13098263, team_name: "Mumbai Mavericks", logo: "https://media.cricheroes.in/default/teamintital/MM.png", played: 0, won: 0, lost: 0, tied: 0, pts: 0, nrr: "0.000" },
    { team_id: 13101095, team_name: "Murdeshwar Blasters", logo: "https://media.cricheroes.in/team_logo/1775760343740_3tw8kgzEq0Cd.jpg", played: 0, won: 0, lost: 0, tied: 0, pts: 0, nrr: "0.000" },
    { team_id: 9702214, team_name: "Royal Cricketers Kumta", logo: "https://media.cricheroes.in/team_logo/1745581359101_BUBER9WkP7O4.jpg", played: 0, won: 0, lost: 0, tied: 0, pts: 0, nrr: "0.000" },
    { team_id: 12278111, team_name: "Royal Tigers Bidadi", logo: "https://media.cricheroes.in/team_logo/1769681539362_U27CJWIuMMaY.png", played: 0, won: 0, lost: 0, tied: 0, pts: 0, nrr: "0.000" },
    { team_id: 13178588, team_name: "Rural Challengers Bengaluru", logo: "https://media.cricheroes.in/team_logo/1776250905153_VMRzSeXvXyqi.jpeg", played: 0, won: 0, lost: 0, tied: 0, pts: 0, nrr: "0.000" },
    { team_id: 13114655, team_name: "SONDA WARRIORS", logo: "https://media.cricheroes.in/team_logo/1775847720378_6du8PZk7sz3d.jpg", played: 0, won: 0, lost: 0, tied: 0, pts: 0, nrr: "0.000" },
    { team_id: 1302475, team_name: "UTTARA KANNADA GLADIATORS", logo: "https://media.cricheroes.in/team_logo/1714323465887_DGn41yqY9cUW.jpeg", played: 0, won: 0, lost: 0, tied: 0, pts: 0, nrr: "0.000" },
    { team_id: 13171583, team_name: "Yellapur Super Kings", logo: "https://media.cricheroes.in/team_logo/1776185152943_5T30pZ76wEcd.jpg", played: 0, won: 0, lost: 0, tied: 0, pts: 0, nrr: "0.000" }
  ];

  const [standings, setStandings] = useState(initialTeams);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://cricheroes.com/_next/data/VJCa1OqVcXtUf3QXmrsKn/tournament/1845075/gudigar-cricket-league-season-5/point-table.json?tournamentId=1845075&tournamentName=gudigar-cricket-league-season-5&tabName=point-table', {
          headers: { 'x-nextjs-data': '1' }
        });
        
        if (!response.ok) throw new Error("CORS or Network Error");
        
        const json = await response.json();
        
        if (json.pageProps?.teamStandings?.status === true) {
          setStandings(json.pageProps.teamStandings.data || []);
        } else if (json.pageProps?.teamStandings?.error) {
          setError(json.pageProps.teamStandings.error.message);
        }
      } catch (err) {
        console.warn("API restricted by CORS, displaying local team snapshots.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const displayTeams = compact ? standings.slice(0, 5) : standings;

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      overflow: 'hidden',
      border: '1px solid rgba(139, 90, 43, 0.1)'
    }}>
      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="loader" style={{ 
            width: '30px', 
            height: '30px', 
            border: '2px solid rgba(139, 90, 43, 0.1)',
            borderTopColor: 'var(--gold-primary)',
            borderRadius: '50%',
            margin: '0 auto 1rem auto',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fetching rankings...</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--sandalwood-deep)', color: 'white' }}>
                <th style={{ padding: '0.8rem 1rem', fontSize: '0.75rem', fontWeight: 600 }}>POS</th>
                <th style={{ padding: '0.8rem 1rem', fontSize: '0.75rem', fontWeight: 600 }}>TEAM</th>
                <th style={{ padding: '0.8rem 1rem', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>P</th>
                <th style={{ padding: '0.8rem 1rem', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>W</th>
                <th style={{ padding: '0.8rem 1rem', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>PTS</th>
                {!compact && <th style={{ padding: '0.8rem 1rem', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>NRR</th>}
              </tr>
            </thead>
            <tbody>
              {displayTeams.map((team, index) => (
                <tr key={team.team_id} style={{ 
                  borderBottom: '1px solid rgba(139, 90, 43, 0.05)',
                  backgroundColor: index < 4 ? 'rgba(212, 175, 55, 0.02)' : 'transparent'
                }}>
                  <td style={{ padding: '0.8rem 1rem', fontWeight: 700, fontSize: '0.9rem', color: index < 4 ? 'var(--gold-primary)' : 'var(--text-muted)' }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: '0.8rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <img 
                        src={team.logo} 
                        alt={team.team_name} 
                        style={{ width: '24px', height: '24px', borderRadius: '4px', objectFit: 'cover' }} 
                        onError={(e) => e.target.src = 'https://media.cricheroes.in/default/default-association-logo.jpg'}
                      />
                      <span style={{ fontWeight: 600, color: 'var(--sandalwood-deep)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                        {team.team_name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '0.8rem 1rem', textAlign: 'center', fontSize: '0.85rem' }}>{team.played}</td>
                  <td style={{ padding: '0.8rem 1rem', textAlign: 'center', color: '#27ae60', fontWeight: 600, fontSize: '0.85rem' }}>{team.won}</td>
                  <td style={{ padding: '0.8rem 1rem', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem' }}>{team.pts}</td>
                  {!compact && (
                    <td style={{ padding: '0.8rem 1rem', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.8rem', color: team.nrr?.startsWith('-') ? '#e74c3c' : '#27ae60' }}>
                      {team.nrr}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PointsTable;
