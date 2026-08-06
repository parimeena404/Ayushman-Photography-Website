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
                fontSize: '1.75rem',
                color: 'var(--text-light)',
                textDecoration: 'none',
                fontWeight: 400,
                letterSpacing: '0.05em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Ayushman <span style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cards n Graphics</span>
            </a>
            <p
              className="font-body"
              style={{
                fontSize: '0.75rem',
                color: 'var(--accent-secondary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              We Are Printers & Creatives By Heart · Since 2001
            </p>
            <p
              className="font-body"
              style={{
                fontSize: '0.85rem',
                color: 'rgba(248,245,239,0.65)',
                lineHeight: 1.8,
                maxWidth: '320px',
              }}
            >
              Complete Printing & Photography Solutions — Luxury Wedding Cards, Fine Art Photography, Corporate Graphics & Banners in Ujjain.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p
              className="font-body"
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent-secondary)',
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
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent-hero)')}
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = 'rgba(248, 245, 239, 0.7)')
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Studio Location */}
          <div>
            <p
              className="font-body"
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent-secondary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Main Studio Address
            </p>
            <p className="font-body" style={{ fontSize: '0.85rem', color: 'rgba(248,245,239,0.7)', lineHeight: 1.8 }}>
              <strong>63, Varruchi Marg, Freeganj,</strong><br />
              Madhav Nagar, Ujjain, (M.P.)
            </p>
          </div>

          {/* Col 4: Contacts */}
          <div>
            <p
              className="font-body"
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent-secondary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Direct Contacts
            </p>
            <p className="font-body" style={{ fontSize: '0.85rem', color: 'rgba(248,245,239,0.7)', lineHeight: 1.8, marginBottom: '0.35rem' }}>
              +91 94797 84979
            </p>
            <p className="font-body" style={{ fontSize: '0.85rem', color: 'rgba(248,245,239,0.7)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              +91 98930 22451
            </p>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {['Instagram', 'WhatsApp', 'Facebook'].map((social) => (
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
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent-hero)')}
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
            © 2025 Ayushman Cards n Graphics. Since 2001. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/faq" className="font-body" style={{ color: 'rgba(248,245,239,0.4)', fontSize: '0.75rem', textDecoration: 'none' }}>
              Privacy Policy
            </a>
            <a href="/faq" className="font-body" style={{ color: 'rgba(248,245,239,0.4)', fontSize: '0.75rem', textDecoration: 'none' }}>
              Terms & Services
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
