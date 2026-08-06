'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, lineGrow } from '@/lib/animations';

const footerNavLinks = [
  { label: 'Stories', href: '/stories' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Films', href: '/films' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Booking', href: '/booking' },
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
        padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Col 1: Studio Brand */}
          <div>
            <a
              href="/"
              className="font-heading"
              style={{
                fontSize: '2.25rem',
                color: '#F8F5EF',
                textDecoration: 'none',
                fontWeight: 300,
                letterSpacing: '0.05em',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Lumière
            </a>
            <p
              className="font-body"
              style={{
                fontSize: '0.9rem',
                color: 'rgba(248,245,239,0.6)',
                lineHeight: 1.8,
                maxWidth: '300px',
              }}
            >
              An award-winning international photography studio preserving timeless moments across Italy, Greece, India, France, and worldwide.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p
              className="font-body"
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Navigation
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
              }}
            >
              {footerNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body"
                  style={{
                    color: 'rgba(248, 245, 239, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = 'rgba(248, 245, 239, 0.7)')
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Studios */}
          <div>
            <p
              className="font-body"
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Studios
            </p>
            <p className="font-body" style={{ fontSize: '0.85rem', color: 'rgba(248,245,239,0.7)', lineHeight: 1.8, marginBottom: '1rem' }}>
              <strong>Mumbai Studio:</strong><br />
              42 Artisan Lane, Bandra West, Mumbai
            </p>
            <p className="font-body" style={{ fontSize: '0.85rem', color: 'rgba(248,245,239,0.7)', lineHeight: 1.8 }}>
              <strong>Florence Office:</strong><br />
              Via dei Serragli 18, Firenze, Italy
            </p>
          </div>

          {/* Col 4: Contact & Social */}
          <div>
            <p
              className="font-body"
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Direct Contact
            </p>
            <p className="font-body" style={{ fontSize: '0.85rem', color: 'rgba(248,245,239,0.7)', marginBottom: '0.5rem' }}>
              hello@lumiere.studio
            </p>
            <p className="font-body" style={{ fontSize: '0.85rem', color: 'rgba(248,245,239,0.7)', marginBottom: '1.5rem' }}>
              +91 98765 43210
            </p>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {['Instagram', 'Pinterest', 'Vimeo', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-body"
                  style={{
                    color: 'rgba(248,245,239,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = 'rgba(248,245,239,0.7)')
                  }
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          variants={lineGrow}
          className="divider-gold"
          style={{ marginBottom: '2.5rem', transformOrigin: 'center' }}
        />

        {/* Copyright */}
        <motion.div
          variants={fadeInUp}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            className="font-body"
            style={{
              color: 'rgba(248, 245, 239, 0.4)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
            }}
          >
            © 2025 Lumière Studio. All rights reserved. Crafted with timeless intention.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/faq" className="font-body" style={{ color: 'rgba(248,245,239,0.4)', fontSize: '0.75rem', textDecoration: 'none' }}>
              Privacy Policy
            </a>
            <a href="/faq" className="font-body" style={{ color: 'rgba(248,245,239,0.4)', fontSize: '0.75rem', textDecoration: 'none' }}>
              Terms of Service
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
