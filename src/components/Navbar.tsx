'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

const navLinks = [
  {
    label: 'Photography',
    href: '/#portfolio',
    megaMenu: [
      { title: 'Wedding Photography', desc: 'Timeless wedding stories', href: '/#portfolio' },
      { title: 'Pre-Wedding', desc: 'Romantic couple shoots', href: '/#portfolio' },
      { title: 'Portrait', desc: 'Professional portraits', href: '/#portfolio' },
      { title: 'Fashion', desc: 'Editorial & fashion', href: '/#portfolio' },
      { title: 'Commercial', desc: 'Brand & product shoots', href: '/#portfolio' },
      { title: 'Events', desc: 'Corporate & celebrations', href: '/#portfolio' },
    ],
  },
  {
    label: 'Services',
    href: '/#services',
    megaMenu: [
      { title: 'Cinematography', desc: 'Cinematic wedding films', href: '/films' },
      { title: 'Album Design', desc: 'Handcrafted luxury albums', href: '/#products' },
      { title: 'Drone Photography', desc: 'Stunning aerial views', href: '/#portfolio' },
      { title: 'Photo Editing', desc: 'Professional retouching', href: '/#services' },
    ],
  },
  { label: 'Stories', href: '/stories' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollDirection, isAtTop } = useScrollDirection();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && isAtTop && !menuOpen;
  const isVisible = !isHomePage || scrollDirection === 'up' || isAtTop;

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setActiveMega(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleMegaEnter = (label: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveMega(label);
  };

  const handleMegaLeave = () => {
    megaTimeoutRef.current = setTimeout(() => setActiveMega(null), 150);
  };

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
          zIndex: 1000,
          backgroundColor: isTransparent ? 'transparent' : 'var(--bg-primary)',
          backdropFilter: isTransparent ? 'none' : 'blur(20px)',
          borderBottom: isTransparent ? '1px solid transparent' : '1px solid var(--border-light)',
          transition: 'background-color 0.4s ease, border-bottom 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 clamp(1.25rem, 4vw, 3rem)',
            height: 'var(--nav-height)',
            maxWidth: 'var(--container-xl)',
            margin: '0 auto',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1A1A1A',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              A
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color: isTransparent ? '#fff' : 'var(--text-primary)',
                  transition: 'color 0.4s ease',
                  letterSpacing: '-0.01em',
                }}
              >
                Ayushman
              </div>
              <div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.55rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: isTransparent ? 'rgba(255,255,255,0.7)' : 'var(--text-tertiary)',
                  transition: 'color 0.4s ease',
                  fontWeight: 500,
                }}
              >
                Photography Studio
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <div
                key={link.label}
                onMouseEnter={() => link.megaMenu && handleMegaEnter(link.label)}
                onMouseLeave={() => link.megaMenu && handleMegaLeave()}
                style={{ position: 'relative' }}
              >
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: isTransparent ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    position: 'relative',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isTransparent ? '#fff' : 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isTransparent ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary)';
                  }}
                >
                  {link.label}
                  {link.megaMenu && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginTop: '1px' }}>
                      <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {link.megaMenu && activeMega === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => handleMegaEnter(link.label)}
                      onMouseLeave={handleMegaLeave}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        paddingTop: '0.75rem',
                        zIndex: 100,
                      }}
                    >
                      <div
                        style={{
                          background: 'var(--bg-card)',
                          borderRadius: 'var(--radius-lg)',
                          boxShadow: 'var(--shadow-elevated)',
                          border: '1px solid var(--border-light)',
                          padding: '1.25rem',
                          minWidth: '280px',
                          display: 'grid',
                          gap: '0.25rem',
                        }}
                      >
                        {link.megaMenu.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            style={{
                              display: 'block',
                              padding: '0.75rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              transition: 'background 0.2s ease',
                              textDecoration: 'none',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--bg-secondary)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                marginBottom: '0.125rem',
                              }}
                            >
                              {item.title}
                            </div>
                            <div
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.75rem',
                                color: 'var(--text-tertiary)',
                              }}
                            >
                              {item.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isTransparent ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)',
                transition: 'color 0.3s ease, background 0.3s ease',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--gold-muted)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Book Session CTA - Desktop */}
            <Link
              href="/booking"
              className="btn btn-primary btn-sm desktop-only"
              style={{
                fontSize: '0.8125rem',
                padding: '0.6rem 1.5rem',
              }}
            >
              Book a Session
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="mobile-menu-btn"
              style={{
                width: '40px',
                height: '40px',
                display: 'none',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: menuOpen ? '0' : '5px',
                position: 'relative',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: isTransparent && !menuOpen ? '#fff' : 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  transform: menuOpen ? 'rotate(45deg) translateY(0.5px)' : 'none',
                  position: menuOpen ? 'absolute' : 'relative',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: isTransparent && !menuOpen ? '#fff' : 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: isTransparent && !menuOpen ? '#fff' : 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  transform: menuOpen ? 'rotate(-45deg) translateY(-0.5px)' : 'none',
                  position: menuOpen ? 'absolute' : 'relative',
                }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'var(--bg-primary)',
              paddingTop: 'var(--nav-height)',
              overflow: 'auto',
            }}
          >
            <div style={{ padding: '2rem clamp(1.5rem, 5vw, 3rem)' }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'block',
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.75rem',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        padding: '0.75rem 0',
                        borderBottom: '1px solid var(--border-light)',
                        textDecoration: 'none',
                      }}
                    >
                      {link.label}
                    </Link>
                    {link.megaMenu && (
                      <div style={{ paddingLeft: '1rem', paddingBottom: '0.5rem' }}>
                        {link.megaMenu.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                              display: 'block',
                              fontSize: '0.9375rem',
                              color: 'var(--text-secondary)',
                              padding: '0.4rem 0',
                              textDecoration: 'none',
                            }}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ marginTop: '2rem' }}
              >
                <Link
                  href="/booking"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Book a Session
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for responsive hiding */}
      <style jsx global>{`
        .desktop-nav { display: flex !important; }
        .desktop-only { display: inline-flex !important; }
        .mobile-menu-btn { display: none !important; }

        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
