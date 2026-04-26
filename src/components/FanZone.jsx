import React, { useState, useEffect } from 'react';
import { Heart, Trophy, MessageSquare, Zap } from 'lucide-react';
import { teams } from '../data/teams';
import { supabase } from '../lib/supabaseClient';

const FanZone = () => {
  const [pollVotes, setPollVotes] = useState({
    'Royal Tigers Bidadi': 0,
    'Sonda Warriors': 0,
    'Murdeshwar Blasters': 0,
    'Sirsi Royals': 0,
    'Udupi Smashers': 0,
    'Rural Challengers Bengaluru': 0,
    'Others': 0
  });
  const [teamCheers, setTeamCheers] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check local storage for voting status
    const savedVotes = localStorage.getItem('gcl5_poll_voted');
    if (savedVotes) setHasVoted(true);

    // 2. Fetch initial data from Supabase
    fetchStats();

    // 3. Set up real-time subscription
    const channel = supabase
      .channel('fanzone_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'fanzone_stats' }, 
        (payload) => {
          updateStateFromPayload(payload.new || payload.old);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('fanzone_stats').select('*');
      if (data) {
        const newPollVotes = { ...pollVotes };
        const newCheers = {};
        data.forEach(item => {
          if (item.category === 'poll') {
            newPollVotes[item.label] = item.count;
          } else if (item.category === 'cheer') {
            newCheers[item.label] = item.count;
          }
        });
        setPollVotes(newPollVotes);
        setTeamCheers(newCheers);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStateFromPayload = (item) => {
    if (item.category === 'poll') {
      setPollVotes(prev => ({ ...prev, [item.label]: item.count }));
    } else if (item.category === 'cheer') {
      setTeamCheers(prev => ({ ...prev, [item.label]: item.count }));
    }
  };

  const handleVote = async (team) => {
    if (hasVoted) {
      alert("Device has already voted.");
      return;
    }

    try {
      const { error } = await supabase.rpc('increment_fanzone_stat', { 
        row_label: team, 
        row_category: 'poll' 
      });

      if (error) throw error;
    } catch (error) {
      console.error("RPC Error, attempting fallback:", error);
      const currentCount = pollVotes[team] || 0;
      await supabase.from('fanzone_stats')
        .upsert({ label: team, category: 'poll', count: currentCount + 1 }, { onConflict: 'label,category' });
    }
    
    setHasVoted(true);
    localStorage.setItem('gcl5_poll_voted', 'true');
  };

  const handleCheer = async (teamId) => {
    setTeamCheers(prev => ({ ...prev, [teamId]: (prev[teamId] || 0) + 1 }));
    await supabase.rpc('increment_fanzone_stat', { 
      row_label: teamId.toString(), 
      row_category: 'cheer' 
    });
  };

  const resetLocalVote = () => {
    localStorage.removeItem('gcl5_poll_voted');
    setHasVoted(false);
    alert("Test Mode: Vote Reset!");
  };

  const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  return (
    <section id="fanzone" style={{ marginBottom: '8rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Fan Engagement Hub</h2>
        <div className="title-underline" style={{ margin: '0 auto' }}></div>
        <p style={{ color: 'var(--text-muted)' }}>Join the live community pulse!</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '2.5rem' 
      }}>
        {/* Poll Section */}
        <div className="carved-section" style={{ height: '100%', padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Trophy color="var(--gold-primary)" size={28} />
            <h3 style={{ margin: 0 }}>Championship Poll</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Who will lift the GCL 5 trophy this year?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {Object.entries(pollVotes).map(([team, votes]) => {
              const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
              return (
                <div key={team} style={{ position: 'relative' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '0.4rem',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>
                    <span>{team}</span>
                    <span>{hasVoted ? `${percentage}%` : (loading ? '...' : '')}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleVote(team)}
                    disabled={hasVoted}
                    className="poll-option-bar"
                    style={{ 
                      width: '100%',
                      height: '45px', 
                      background: 'var(--sandalwood-light)', 
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: hasVoted ? 'default' : 'pointer',
                      border: '1px solid rgba(139, 90, 43, 0.1)',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 1rem',
                      fontFamily: 'inherit',
                      color: 'inherit'
                    }}
                  >
                    <div style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: hasVoted ? `${percentage}%` : '0%',
                      background: 'linear-gradient(90deg, var(--sandalwood-medium), var(--gold-primary))',
                      opacity: 0.3,
                      transition: 'width 1s ease-out',
                      pointerEvents: 'none'
                    }} />
                    {!hasVoted && (
                      <span style={{ 
                        fontSize: '0.8rem', 
                        color: 'var(--text-muted)', 
                        fontWeight: 700, 
                        zIndex: 1, 
                        width: '100%', 
                        textAlign: 'left' 
                      }}>
                        {loading ? 'LOADING...' : 'CAST VOTE'}
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
          {hasVoted && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                marginTop: '1.5rem', 
                fontSize: '0.8rem', 
                color: 'var(--gold-primary)', 
                fontWeight: 700
              }}>
                Device Vote Recorded. Total global votes: {totalVotes}
              </p>
              <button 
                onClick={resetLocalVote}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--text-muted)', 
                  fontSize: '0.7rem', 
                  textDecoration: 'underline', 
                  cursor: 'pointer',
                  opacity: 0.5 
                }}
              >
                Reset my local vote (Test only)
              </button>
            </div>
          )}
        </div>

        {/* Cheer Section */}
        <div className="carved-section" style={{ height: '100%', padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Zap color="var(--gold-primary)" size={28} />
            <h3 style={{ margin: 0 }}>Team Cheer Meter</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Click the heart to boost your favorite team's morale!
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '1rem',
            maxHeight: '350px',
            overflowY: 'auto',
            paddingRight: '0.5rem'
          }}>
            {teams.map(team => (
              <div 
                key={team.id}
                onClick={() => handleCheer(team.id)}
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'var(--sandalwood-light)',
                  border: '1px solid rgba(139, 90, 43, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                className="cheer-card"
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ 
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  overflow: 'hidden',
                  background: '#fff'
                }}>
                  <img src={team.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textAlign: 'center' }}>
                  {team.name.split(' ').slice(-1)}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Heart size={14} fill={teamCheers[team.id] ? '#e74c3c' : 'none'} color={teamCheers[team.id] ? '#e74c3c' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{teamCheers[team.id] || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="carved-section" style={{ 
        marginTop: '3rem', 
        padding: '2rem', 
        background: 'linear-gradient(135deg, var(--sandalwood-deep) 0%, #3d2610 100%)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
          <MessageSquare size={32} color="var(--gold-primary)" />
          <div>
            <h4 style={{ color: 'var(--gold-primary)', margin: 0 }}>Fan Message Wall</h4>
            <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>Post your own cheers and read what the community is saying!</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="/fan-wall" className="gold-button" style={{ 
            padding: '0.6rem 2rem', 
            fontSize: '0.9rem',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            GO TO FAN WALL
          </a>
        </div>
      </div>
    </section>
  );
};

export default FanZone;
