'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight, lineGrow } from '@/lib/animations';

const milestones = [
  { year: '2001', text: 'Established Ayushman Cards n Graphics in Ujjain as complete printing pioneers' },
  { year: '2008', text: 'Expanded into luxury Indian wedding cards & custom typography design' },
  { year: '2015', text: 'Launched fine art wedding photography, royal event & press graphics' },
  { year: '2020', text: 'State-of-the-art digital printing, banners, flex & high-definition media production' },
  { year: '2025', text: '24+ years of creative excellence serving thousands of families & events across India' },
];

const awards = [
  'Complete Printing Solutions — Excellence Award',
  'Premier Indian Wedding Card Designer — MP Choice',
  'Heritage Event & Fine Art Photography Studio',
  'Trusted Business Icon — Ujjain',
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
            About Studio
          </p>
          <h2
            className="font-heading text-editorial-lg"
            style={{ color: 'var(--text-primary)', fontWeight: 300 }}
          >
            We Are Printers & Creatives By Heart
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
              src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=85&auto=format"
              alt="Ayushman Cards n Graphics Craftsmanship"
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
              Since 2001, <strong>Ayushman Cards n Graphics</strong> has been Ujjain&rsquo;s premier destination for complete printing solutions, fine art wedding invitations, visiting cards, posters, flex, banners, and royal event photography.
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
              Founded with passion and dedicated craftsmanship, we blend traditional Indian aesthetics with modern digital graphics and cinematic photography to make every celebration unforgettable.
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
                &ldquo;We don&rsquo;t just print paper or take photos. We craft memories that families cherish for generations.&rdquo;
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
              — Ayushman Cards n Graphics Studio Team
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
