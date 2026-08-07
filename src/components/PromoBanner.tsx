'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} style={{ padding: 'clamp(2rem, 5vh, 3.5rem) 0', background: 'var(--bg-secondary)' }}>
      <div className="container-wide">
        {/* Vistaprint-Style Side-by-Side Split Banners */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(1rem, 2.5vw, 2rem)',
          }}
        >
          {/* Left Banner: Photo Albums & Gifts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%), url(https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--gold-light)',
                  fontWeight: 700,
                  marginBottom: '0.4rem',
                }}
              >
                Handcrafted Keepsakes · Starting at ₹2,500
              </div>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}
              >
                Preserve Your Cherished Moments in Custom Albums
              </h3>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Photo Albums', 'Canvas Prints', 'Framed Portraits'].map((label) => (
                  <Link
                    key={label}
                    href="/#products"
                    style={{
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255,255,255,0.3)',
                      padding: '0.4rem 1rem',
                      borderRadius: '999px',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.78125rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label} →
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Banner: Commercial & Fashion Shoots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%), url(https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--gold-light)',
                  fontWeight: 700,
                  marginBottom: '0.4rem',
                }}
              >
                Brand Visuals · Starting at ₹20,000
              </div>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}
              >
                Elevate Your Brand With Commercial & Fashion Shoots
              </h3>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Brand Campaigns', 'Product Shoots', 'Lookbooks'].map((label) => (
                  <Link
                    key={label}
                    href="/#services"
                    style={{
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255,255,255,0.3)',
                      padding: '0.4rem 1rem',
                      borderRadius: '999px',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.78125rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label} →
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
