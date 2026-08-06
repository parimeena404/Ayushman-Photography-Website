'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight, lineGrow } from '@/lib/animations';

const milestones = [
  { year: '2014', text: 'Founded the studio with a single camera and a vision' },
  { year: '2017', text: 'First international destination wedding in Tuscany' },
  { year: '2019', text: 'Published in Vogue India & Harper\'s Bazaar' },
  { year: '2021', text: 'Named among Asia\'s Top 50 Wedding Photographers' },
  { year: '2024', text: '500+ love stories captured across 20 countries' },
];

const awards = [
  'Fearless Photographers Award',
  'WPPI Silver',
  'Better Photography — Photographer of the Year',
  'International Wedding Photographer of the Year — Finalist',
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding" ref={sectionRef}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Section heading */}
        <motion.div variants={fadeInUp} style={{ marginBottom: '5rem' }}>
          <p
            className="text-editorial-sm font-body"
            style={{ color: 'var(--accent)', marginBottom: '1rem' }}
          >
            About
          </p>
          <h2
            className="font-heading text-editorial-lg"
            style={{ color: 'var(--text-primary)', fontWeight: 300 }}
          >
            The Artist Behind the Lens
          </h2>
        </motion.div>

        {/* Main content — portrait + story */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'clamp(2rem, 5vw, 6rem)',
            alignItems: 'start',
            marginBottom: '6rem',
          }}
          className="about-grid"
        >
          {/* Portrait */}
          <motion.div variants={fadeInLeft}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
              alt="Photographer portrait"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                display: 'block',
              }}
              loading="lazy"
            />
          </motion.div>

          {/* Story */}
          <motion.div variants={fadeInRight}>
            <p
              className="font-body"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 2,
                marginBottom: '2.5rem',
              }}
            >
              Photography, for me, has never been about perfect compositions or posed smiles. 
              It is about the quiet tremble of a hand reaching for another, the way light 
              catches a tear of joy, the unspoken promises held in a single glance.
            </p>

            <p
              className="font-body"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 2,
                marginBottom: '2.5rem',
              }}
            >
              Every couple carries a universe of stories within them. My role is simply to 
              listen — through the lens — and give those stories a form that will endure 
              long after the flowers have faded and the music has stopped.
            </p>

            {/* Philosophy quote */}
            <div
              style={{
                borderLeft: '2px solid var(--accent)',
                paddingLeft: '2rem',
                marginBottom: '2.5rem',
              }}
            >
              <p
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
                  color: 'var(--text-primary)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                &ldquo;I don&rsquo;t capture moments. I preserve the feeling of being alive 
                within them.&rdquo;
              </p>
            </div>

            <p
              className="font-body"
              style={{
                color: 'var(--accent)',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
              }}
            >
              — Arjun Mehta, Founder & Lead Photographer
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={lineGrow}
          className="divider-gold"
          style={{ marginBottom: '5rem', transformOrigin: 'left' }}
        />

        {/* Timeline */}
        <motion.div variants={fadeInUp} style={{ marginBottom: '5rem' }}>
          <h3
            className="font-heading text-editorial-md"
            style={{
              color: 'var(--text-primary)',
              fontWeight: 300,
              marginBottom: '3rem',
            }}
          >
            Our Journey
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                variants={fadeInUp}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'baseline',
                }}
              >
                <span
                  className="font-heading"
                  style={{
                    fontSize: '1.5rem',
                    color: 'var(--accent)',
                    fontWeight: 300,
                    minWidth: '80px',
                  }}
                >
                  {m.year}
                </span>
                <span
                  className="font-body"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                  }}
                >
                  {m.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={lineGrow}
          className="divider-gold"
          style={{ marginBottom: '5rem', transformOrigin: 'right' }}
        />

        {/* Awards */}
        <motion.div variants={fadeInUp}>
          <h3
            className="font-heading text-editorial-md"
            style={{
              color: 'var(--text-primary)',
              fontWeight: 300,
              marginBottom: '2.5rem',
            }}
          >
            Recognition
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {awards.map((award, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>✦</span>
                <span
                  className="font-body"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                  }}
                >
                  {award}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
