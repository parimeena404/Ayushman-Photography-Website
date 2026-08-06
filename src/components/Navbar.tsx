'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
  { label: 'Stories', href: '#stories' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isVisible = scrollDirection === 'up' || isAtTop;
  const isTransparent = isAtTop;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: isTransparent ? 'transparent' : 'var(--bg-primary)',
          borderBottom: isTransparent ? 'none' : '1px solid var(--divider)',
          transition: 'background-color 0.4s ease, border-bottom 0.4s ease',
        }}
      >
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem clamp(1.5rem, 5vw, 4rem)',
            maxWidth: '1600px',
            margin: '0 auto',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            className="font-heading"
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: isTransparent ? 'var(--text-light)' : 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'color 0.4s ease',
            }}
          >
            Lumière
          </a>

          {/* Desktop Links */}
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              alignItems: 'center',
            }}
            className="nav-desktop"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  color: isTransparent ? 'var(--text-light)' : 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = isTransparent
                    ? 'var(--text-light)'
                    : 'var(--text-primary)';
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isTransparent ? 'var(--text-light)' : 'var(--text-primary)',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease',
                padding: '0.25rem',
              }}
            >
              {theme === 'light' ? '☾' : '☀'}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="nav-mobile-btn"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                backgroundColor: isTransparent ? 'var(--text-light)' : 'var(--text-primary)',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                backgroundColor: isTransparent ? 'var(--text-light)' : 'var(--text-primary)',
                transition: 'all 0.3s ease',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                backgroundColor: isTransparent ? 'var(--text-light)' : 'var(--text-primary)',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
              }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              backgroundColor: 'var(--bg-primary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => setMobileOpen(false)}
                className="font-heading"
                style={{
                  fontSize: '2rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <button
              onClick={() => {
                toggleTheme();
                setMobileOpen(false);
              }}
              style={{
                background: 'none',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                padding: '0.75rem 2rem',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
