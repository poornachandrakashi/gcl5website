import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { teams } from '../data/teams';
import { MessageCircle, Send, User, Shield, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FanWall = () => {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    team: teams[0].name,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();

    // Real-time subscription for new messages
    const channel = supabase
      .channel('fan_messages_changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'fan_messages' }, 
        (payload) => {
          setMessages(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('fan_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (data) setMessages(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);
    const { error } = await supabase
      .from('fan_messages')
      .insert([
        { 
          fan_name: formData.name, 
          team_name: formData.team, 
          message: formData.message 
        }
      ]);

    if (!error) {
      setFormData({ ...formData, message: '' });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fan-wall-page" style={{ padding: '2rem 1rem', minHeight: '100vh' }}>
      <div className="premium-container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>GCL 5 Fan Wall</h1>
          <div className="title-underline" style={{ margin: '0 auto' }}></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            Leave a message for your favorite team and show your community pride!
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Post a Cheer Form */}
          <div className="carved-section" style={{ position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <MessageCircle color="var(--gold-primary)" size={24} />
              <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Send a Cheer</h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Your Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '0.8rem 1rem 0.8rem 2.5rem', 
                      borderRadius: '8px', 
                      border: '1px solid rgba(139, 90, 43, 0.2)',
                      background: 'var(--sandalwood-light)',
                      fontFamily: 'inherit'
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Cheer For Team</label>
                <div style={{ position: 'relative' }}>
                  <Shield size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                  <select 
                    value={formData.team}
                    onChange={(e) => setFormData({...formData, team: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '0.8rem 1rem 0.8rem 2.5rem', 
                      borderRadius: '8px', 
                      border: '1px solid rgba(139, 90, 43, 0.2)',
                      background: 'var(--sandalwood-light)',
                      fontFamily: 'inherit',
                      appearance: 'none'
                    }}
                  >
                    {teams.map(team => (
                      <option key={team.id} value={team.name}>{team.name}</option>
                    ))}
                    <option value="General Support">General Support (GCL 5)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Message</label>
                <textarea 
                  placeholder="Type your cheer message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="4"
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    border: '1px solid rgba(139, 90, 43, 0.2)',
                    background: 'var(--sandalwood-light)',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="gold-button" 
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}
              >
                {isSubmitting ? 'SENDING...' : (<><Send size={18} /> POST CHEER</>)}
              </button>
            </form>
          </div>

          {/* Messages Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p>Loading community cheers...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="carved-section" style={{ textAlign: 'center', opacity: 0.6 }}>
                <p>No cheers yet. Be the first to shoutout!</p>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="carved-section" 
                    style={{ 
                      padding: '1.5rem', 
                      margin: 0, 
                      borderLeft: '5px solid var(--gold-primary)',
                      background: 'white'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{msg.fan_name}</h4>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          color: 'var(--gold-primary)', 
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          FOR {msg.team_name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.4 }}>
                        <Clock size={12} />
                        <span style={{ fontSize: '0.7rem' }}>
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '1rem', 
                      lineHeight: '1.5',
                      fontStyle: 'italic',
                      color: 'var(--text-main)'
                    }}>
                      "{msg.message}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanWall;
