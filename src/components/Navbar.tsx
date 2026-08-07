'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

const categoriesMenu = [
  { label: 'View All', href: '/#portfolio' },
  { label: '🪔 Indian Festivals', href: '/#festivals' },
  { label: 'Wedding Photography', href: '/#portfolio' },
  { label: 'Pre-Wedding Shoots', href: '/#portfolio' },
  { label: 'Cinematography & Films', href: '/films' },
  { label: 'Portrait Photography', href: '/#portfolio' },
  { label: 'Fashion & Lookbooks', href: '/#portfolio' },
  { label: 'Commercial & Brands', href: '/#portfolio' },
  { label: 'Festive Cards & Prints', href: '/#products' },
  { label: 'Drone Shoots', href: '/#portfolio' },
  { label: 'Pricing Packages', href: '/#packages' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [copiedCode, setCopiedCode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FESTIVE20');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'var(--bg-card)', boxShadow: 'var(--shadow-subtle)' }}>
      {/* 1. Sitewide Festive Announcement Bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #990000 0%, #D40000 50%, #990000 100%)',
          color: '#FFFFFF',
          padding: '0.45rem 1rem',
          fontSize: '0.78125rem',
          fontFamily: "'Manrope', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <span>
          🪔 <strong>Indian Festive Season Special!</strong> Flat 20% OFF on Festive Family Shoots & Custom Invitation Cards | Code: <strong style={{ color: '#FFD700' }}>FESTIVE20</strong>
        </span>
        <button
          onClick={handleCopyCode}
          style={{
            background: '#FFD700',
            color: '#800000',
            border: 'none',
            borderRadius: '4px',
            padding: '0.18rem 0.65rem',
            fontSize: '0.7rem',
            fontWeight: 800,
            cursor: 'pointer',
            fontFamily: "'Manrope', sans-serif",
            transition: 'all 0.2s ease',
          }}
        >
          {copiedCode ? 'Copied!' : 'Copy Code'}
        </button>
      </div>

      {/* 2. Main Header Bar (Logo, Search, Support, Favorites, Sign In, Cart) */}
      <div
        style={{
          padding: '0.75rem clamp(1rem, 3vw, 2.5rem)',
          borderBottom: '1px solid var(--border-light)',
          maxWidth: 'var(--container-xl)',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* Official Ayushman Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Ayushman Cards n Graphics Official Logo"
            style={{
              height: '42px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </Link>

        {/* Centered Search Bar */}
        <div style={{ flex: '1 1 480px', maxWidth: '520px', position: 'relative' }} className="desktop-search">
          <form
            onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/#portfolio`; }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <input
              type="text"
              placeholder="Search Diwali shoots, wedding cards, portraits, photo albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 3rem 0.65rem 1.15rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                background: 'var(--bg-secondary)',
                border: '1.5px solid var(--border-medium)',
                borderRadius: '999px',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
            />
            <button
              type="submit"
              aria-label="Search"
              style={{
                position: 'absolute',
                right: '0.35rem',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#D40000',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </form>
        </div>

        {/* Right Header Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 1.5vw, 1.5rem)', flexShrink: 0 }}>
          {/* Official Contact Phone Lines */}
          <a
            href="tel:9479784979"
            className="desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8125rem',
              fontFamily: "'Inter', sans-serif",
              color: 'var(--text-secondary)',
              textDecoration: 'none',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <div>
              <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700 }}>Helpline Ujjain</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.8125rem' }}>9479784979 | 9893022451</div>
            </div>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Sign In */}
          <Link
            href="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              textDecoration: 'none',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <span className="desktop-only">Sign In</span>
          </Link>

          {/* Cart / Bookings */}
          <Link
            href="/booking"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'linear-gradient(135deg, #D40000 0%, #990000 100%)',
              color: '#FFFFFF',
              padding: '0.5rem 1.15rem',
              borderRadius: '999px',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(212, 0, 0, 0.25)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span>Book Session</span>
          </Link>
        </div>
      </div>

      {/* 3. Mega Category Navigation Bar */}
      <div
        style={{
          borderBottom: '1px solid var(--border-light)',
          background: 'var(--bg-card)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
        className="desktop-only"
      >
        <div
          style={{
            maxWidth: 'var(--container-xl)',
            margin: '0 auto',
            padding: '0 clamp(1rem, 3vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.6rem',
            whiteSpace: 'nowrap',
          }}
        >
          {categoriesMenu.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'inline-block',
                padding: '0.65rem 0',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: idx === 1 ? 700 : 500,
                color: idx === 1 ? '#D40000' : 'var(--text-secondary)',
                textDecoration: 'none',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#D40000';
                e.currentTarget.style.borderBottomColor = '#D40000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = idx === 1 ? '#D40000' : 'var(--text-secondary)';
                e.currentTarget.style.borderBottomColor = 'transparent';
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .desktop-search { display: block; }
        .desktop-only { display: flex !important; }
        div::-webkit-scrollbar { display: none; }

        @media (max-width: 900px) {
          .desktop-search { display: none; }
          .desktop-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
