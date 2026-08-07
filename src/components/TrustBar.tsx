'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '500+', label: 'Weddings Captured' },
  { value: 'Since 2001', label: 'Years of Excellence' },
  { value: '4.9★', label: 'Client Rating' },
  { value: '50+', label: 'Awards Won' },
];

export default function TrustBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div
        className="container-wide"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 4vw, 3rem)',
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              textAlign: 'center',
              padding: '0.5rem 0',
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                fontWeight: 700,
                color: 'var(--gold)',
                marginBottom: '0.25rem',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--text-tertiary)',
                fontWeight: 500,
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
