'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2420 50%, #1A1A1A 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        className="container-wide"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '420px',
          alignItems: 'center',
        }}
      >
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '0.4rem 1rem',
              background: 'var(--gold)',
              borderRadius: '999px',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#1A1A1A',
              marginBottom: '1.25rem',
            }}
          >
            Wedding Season Special
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}
          >
            20% Off Pre-Wedding<br />
            Photography Packages
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9375rem',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              marginBottom: '1.75rem',
              maxWidth: '400px',
            }}
          >
            Book your dream pre-wedding shoot this season. Choose from breathtaking locations across Rajasthan, Goa, and Udaipur. Limited slots available.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/booking"
              className="btn btn-primary btn-md"
            >
              Claim Offer
            </Link>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              Valid till March 2026
            </span>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            height: '100%',
            minHeight: '360px',
            backgroundImage: 'url(https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section > div {
            grid-template-columns: 1fr !important;
          }
          section > div > div:last-child {
            min-height: 280px !important;
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
