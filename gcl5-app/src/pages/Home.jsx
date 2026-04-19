import React from 'react';
import Hero from '../components/Hero';
import TeamCard from '../components/TeamCard';
import Stats from '../components/Stats';
import Organizers from '../components/Organizers';
import { teams } from '../data/teams';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <>
      <Hero />
      
      <main className="premium-container" style={{ padding: '4rem 2rem' }}>
        <section id="teams" style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Tournament Teams</h2>
            <div className="title-underline" style={{ margin: '0 auto' }}></div>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Distinct teams from across the region competing for the prestigious GCL 5 Trophy.
              Representing our heritage and community pride.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2.5rem' 
          }}>
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TeamCard team={team} />
              </motion.div>
            ))}
          </div>
        </section>

        <Stats />

        <section id="schedule" style={{ marginBottom: '6rem' }}>
          <div className="carved-section" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Tournament Schedule</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
              Save the dates! May 1st and 2nd, 2026. Fixtures will be announced soon.
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <DayCard day="1" date="May 01" title="Group Stages" />
              <DayCard day="2" date="May 02" title="Finals & Awarding" />
            </div>
          </div>
        </section>

        <Organizers />
      </main>
    </>
  );
};

const DayCard = ({ day, date, title }) => (
  <div style={{
    background: 'var(--sandalwood-light)',
    padding: '2rem',
    borderRadius: '12px',
    minWidth: '200px',
    border: '1px solid var(--sandalwood-medium)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  }}>
    <h4 style={{ color: 'var(--gold-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>DAY {day}</h4>
    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{date}</h3>
    <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{title}</p>
  </div>
);

export default Home;
