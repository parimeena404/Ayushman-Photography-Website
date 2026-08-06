'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, lineGrow } from '@/lib/animations';

const footerLinks = [
  { label: 'Stories', href: '#stories' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  return (
    <footer
      ref={footerRef}
      style={{
        backgroundColor: '#0F231B',
        color: '#F8F5EF',
        padding: 'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Divider */}
        <motion.div
          variants={lineGrow}
          className="divider-gold"
          style={{ marginBottom: '3rem', transformOrigin: 'center' }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
          className="footer-content"
        >
          {/* Logo */}
          <motion.div variants={fadeInUp}>
            <a
              href="#"
              className="font-heading"
              style={{
                fontSize: '1.75rem',
                color: '#F8F5EF',
                textDecoration: 'none',
                fontWeight: 300,
                letterSpacing: '0.05em',
              }}
            >
              Lumière
            </a>
          </motion.div>

          {/* Nav links */}
          <motion.div
            variants={fadeInUp}
            style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body"
                style={{
                  color: 'rgba(248, 245, 239, 0.5)',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = 'rgba(248, 245, 239, 0.5)')
                }
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={fadeInUp}
            style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
          >
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              style={{ color: 'rgba(248, 245, 239, 0.5)', transition: 'color 0.3s' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'rgba(248, 245, 239, 0.5)')
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Pinterest */}
            <a
              href="#"
              aria-label="Pinterest"
              style={{ color: 'rgba(248, 245, 239, 0.5)', transition: 'color 0.3s' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'rgba(248, 245, 239, 0.5)')
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.15 9.42 7.6 11.18-.1-.95-.19-2.41.04-3.44.21-.93 1.38-5.84 1.38-5.84s-.35-.71-.35-1.75c0-1.64.95-2.87 2.14-2.87 1.01 0 1.49.76 1.49 1.66 0 1.01-.64 2.52-.97 3.92-.28 1.17.59 2.13 1.74 2.13 2.09 0 3.7-2.21 3.7-5.39 0-2.82-2.03-4.79-4.92-4.79-3.35 0-5.32 2.52-5.32 5.12 0 1.01.39 2.1.88 2.69.1.12.11.22.08.34-.09.37-.29 1.17-.33 1.34-.05.22-.18.27-.41.16-1.52-.71-2.47-2.93-2.47-4.72 0-3.84 2.79-7.37 8.05-7.37 4.23 0 7.51 3.01 7.51 7.03 0 4.2-2.65 7.58-6.32 7.58-1.23 0-2.39-.64-2.79-1.4l-.76 2.89c-.28 1.06-1.03 2.39-1.53 3.2 1.15.35 2.37.55 3.64.55 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              style={{ color: 'rgba(248, 245, 239, 0.5)', transition: 'color 0.3s' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'rgba(248, 245, 239, 0.5)')
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={fadeInUp}
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(191, 164, 111, 0.15)',
          }}
        >
          <p
            className="font-body"
            style={{
              color: 'rgba(248, 245, 239, 0.35)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
            }}
          >
            © 2025 Lumière Studio. All rights reserved. Crafted with love.
          </p>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
