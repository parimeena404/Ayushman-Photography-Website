'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
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

export default function Navbar() {
  const pathname = usePathname();
  const { scrollDirection, isAtTop } = useScrollDirection();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && isAtTop && !menuOpen;
  // Always keep visible on inner pages or when scrolling up/top
  const isVisible = !isHomePage || scrollDirection === 'up' || isAtTop;

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
          backdropFilter: isTransparent ? 'none' : 'blur(16px)',
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
            href="/"
            className="font-heading"
            style={{
              fontSize: '1.35rem',
              fontWeight: 600,
              color: isTransparent ? 'var(--text-light)' : 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'color 0.4s ease',
            }}
          >
            Ayushman <span style={{ fontSize: '0.85rem', fontWeight: 400, opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cards n Graphics</span>
          </a>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
            }}
            className="nav-desktop"
          >
            {navLinks.slice(0, 5).map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  color: isTransparent ? 'var(--text-light)' : 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--accent-hero)';
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

            <a
              href="/booking"
              className="btn-premium"
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.7rem',
                color: isTransparent ? '#FCF7F6' : 'var(--text-primary)',
                borderColor: isTransparent ? 'var(--accent-secondary)' : 'var(--accent)',
              }}
            >
              Inquire
            </a>

            {/* Menu Trigger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open full menu"
              style={{
                background: 'none',
                border: 'none',
                color: isTransparent ? 'var(--text-light)' : 'var(--text-primary)',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                paddingLeft: '0.5rem',
              }}
            >
              {menuOpen ? 'Close ✕' : 'Menu ☰'}
            </button>

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
                padding: '0.25rem',
              }}
            >
              {theme === 'light' ? '☾' : '☀'}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            className="nav-mobile-btn"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isTransparent ? 'var(--text-light)' : 'var(--text-primary)',
              fontSize: '1.25rem',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </nav>
      </motion.header>

      {/* Fullscreen Animated Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              backgroundColor: 'var(--bg-dark)',
              color: '#F8F5EF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem 4rem',
                maxWidth: '900px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    color: '#F8F5EF',
                    textDecoration: 'none',
                    fontWeight: 300,
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#F8F5EF')}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <button
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
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
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 868px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
