import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Award, Shield, Trophy, Activity, Star } from 'lucide-react';
import { teams } from '../data/teams';
import gclLogo from '../assets/logo.png';

const TeamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialTeam = teams.find(t => t.id === parseInt(id));
  const [team, setTeam] = useState(initialTeam);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTeam(initialTeam);
    if (initialTeam && initialTeam.apiId) {
      fetchApiData(initialTeam);
    }
  }, [id, initialTeam]);

  const fetchApiData = async (currentTeam) => {
    setLoading(true);
    try {
      // In a real scenario, this would be a proxy or direct fetch if CORS allows.
      // For this integration, we'll implement the structure to handle the provided JSON format.
      // The user provided the data structure in the request.
      
      const response = await fetch(`https://cricheroes.com/_next/data/VJCa1OqVcXtUf3QXmrsKn/team-profile/${currentTeam.apiId}/bengaluru-united/members.json?teamId=${currentTeam.apiId}&teamName=bengaluru-united&tabName=members`);
      const resData = await response.json();
      
      if (resData && resData.pageProps && resData.pageProps.members && resData.pageProps.members.data) {
        const apiMembers = resData.pageProps.members.data.members;
        const mappedPlayers = apiMembers.map(member => ({
          id: member.player_id,
          name: member.name,
          image: member.profile_photo || "https://media.cricheroes.in/default/user_profile.png",
          role: member.is_captain ? "Captain" : member.is_admin ? "Admin" : "Player",
          specialty: [member.player_skill, member.batter_category, member.bowler_category]
            .filter(Boolean)
            .join(" • ") || "Cricketer",
          skill: member.player_skill,
          isPro: member.is_player_pro
        }));

        setTeam({
          ...currentTeam,
          name: resData.pageProps.members.data.name || currentTeam.name,
          logo: resData.pageProps.members.data.logo || currentTeam.logo,
          players: mappedPlayers
        });
      }
    } catch (err) {
      console.error("Failed to fetch API data:", err);
      // Fallback to static data is already handled by initial state
    } finally {
      setLoading(false);
    }
  };

  if (!team) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Team Not Found</h2>
        <button onClick={() => navigate('/')} className="btn-primary" style={{ marginTop: '2rem' }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="team-page" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Navigation Header */}
      <nav style={{ 
        padding: '1rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid var(--sandalwood-medium)',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'var(--sandalwood-deep)',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}
        >
          <ArrowLeft size={20} /> Back
        </button>
        <img src={gclLogo} alt="GCL 5" style={{ height: '35px' }} />
      </nav>

      {/* Hero Section for Team */}
      <section style={{ 
        background: `linear-gradient(135deg, ${team.color} 0%, ${team.color}dd 100%)`,
        padding: '4rem 2rem',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ 
            position: 'absolute', 
            top: '-100px', 
            right: '-100px', 
            width: '300px', 
            height: '300px', 
            background: 'rgba(255,255,255,0.05)', 
            borderRadius: '40%' 
          }} 
        />

        <div className="premium-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              width: 'clamp(120px, 30vw, 180px)',
              height: 'clamp(120px, 30vw, 180px)',
              borderRadius: '50%',
              background: 'white',
              margin: '0 auto 2rem auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              border: '5px solid var(--gold-primary)',
              overflow: 'hidden'
            }}
          >
            <img 
              src={team.logo} 
              alt={team.name} 
              style={{ width: '80%', height: '80%', objectFit: 'contain' }} 
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
            <div style={{ display: 'none', fontSize: '3rem', color: team.color, fontFamily: 'Cinzel' }}>
              {team.name.charAt(0)}
            </div>
          </motion.div>

          <h1 style={{ 
            color: 'white', 
            marginBottom: '0.5rem', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            fontSize: 'clamp(1.5rem, 8vw, 3rem)'
          }}>
            {team.name}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', opacity: 0.9, fontWeight: 500 }}>
            Representing {team.location} • GCL Season 5
          </p>
        </div>
      </section>

      {/* Players Section */}
      <main className="premium-container" style={{ marginTop: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Team Roster</h2>
          <div className="title-underline" style={{ margin: '0 auto' }}></div>
          <p style={{ color: 'var(--text-muted)' }}>The {team.players.length} warriors ready for battle</p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ display: 'inline-block' }}
            >
              <Activity size={40} color="var(--gold-primary)" />
            </motion.div>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Enlisting real-time data...</p>
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '1.5rem',
          opacity: loading ? 0.6 : 1,
          transition: 'opacity 0.3s'
        }}>
          {team.players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, translateY: -5 }}
              className="carved-section player-card"
              style={{ 
                margin: 0, 
                padding: '1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                background: 'white',
                borderLeft: player.role !== 'Player' ? `6px solid var(--gold-primary)` : '1px solid rgba(0,0,0,0.05)',
                position: 'relative'
              }}
            >
              {player.isPro && (
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: 'var(--gold-primary)',
                  color: 'white',
                  fontSize: '0.6rem',
                  fontWeight: 900,
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  PRO
                </div>
              )}
              <div style={{ 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                background: player.role !== 'Player' ? 'var(--sandalwood-light)' : '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: player.role !== 'Player' ? 'var(--gold-primary)' : 'var(--sandalwood-medium)',
                overflow: 'hidden',
                border: '2px solid var(--sandalwood-medium)',
                flexShrink: 0
              }}>
                <img 
                  src={player.image} 
                  alt={player.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{ 
                  display: 'none',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {player.role === 'Captain' ? <Trophy size={30} /> : player.role === 'Vice-Captain' ? <Award size={30} /> : <User size={30} />}
                </div>
              </div>
              
              <div style={{ overflow: 'hidden' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{player.name}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 700, 
                    color: player.role !== 'Player' ? 'var(--gold-primary)' : 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {player.role}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {player.specialty}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <footer style={{ marginTop: '6rem', textAlign: 'center', padding: '4rem 2rem', background: 'var(--sandalwood-deep)', color: 'white' }}>
        <img src={gclLogo} alt="GCL" style={{ height: '60px', marginBottom: '2rem', filter: 'brightness(0) invert(1)' }} />
        <p>© 2026 Gudigar Cricket League. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TeamPage;
