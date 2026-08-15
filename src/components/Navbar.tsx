'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const categoryTabs = [
  { label: 'View All', href: '/' },
  { label: 'Visiting Cards', href: '/#products' },
  { label: 'Wedding Invitations', href: '/#wedding' },
  { label: 'Stationery, Letterheads & Notebooks', href: '/#stationery' },
  { label: 'Signs, Posters & Marketing Materials', href: '/#banners' },
  { label: 'Labels, Stickers & Packaging', href: '/#stickers' },
  { label: 'Mugs, Albums & Gifts', href: '/#gifts' },
  { label: 'Custom Polo T-shirts', href: '/#tshirts' },
  { label: 'Deals & Offers', href: '/#deals' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('SAVE5');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* ═══ 1. Top Promo Announcement Bar (Vistaprint Blue) ═══ */}
      <div
        style={{
          background: '#0B2545',
          color: '#FFFFFF',
          padding: '0.5rem 1rem',
          fontSize: '0.8125rem',
          fontFamily: "'Inter', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          textAlign: 'center',
        }}
      >
        <span>
          Buy More, Save More! <strong>Flat 5% OFF</strong> on Orders ₹10,000+ | Code:{' '}
          <strong style={{ color: '#60B5FF' }}>SAVE5</strong>
        </span>
        <button
          onClick={handleCopyCode}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '4px',
            padding: '0.1rem 0.5rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#FFFFFF',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {copiedCode ? '✓ Copied' : '📋'}
        </button>
      </div>

      {/* ═══ 2. Main Header Bar (White bg, Vistaprint layout) ═══ */}
      <div
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          padding: '0.65rem clamp(1rem, 3vw, 2.5rem)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {/* ─── Logo (Vistaprint style) ─── */}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Ayushman Cards n Graphics"
              style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* ─── Search Bar (Vistaprint rounded rect) ─── */}
          <div style={{ flex: '1 1 520px', maxWidth: '600px' }} className="vp-desktop-only">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid #CBD5E1',
                borderRadius: '6px',
                overflow: 'hidden',
                background: '#FFFFFF',
                transition: 'border-color 0.2s ease',
              }}
            >
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.6rem 1rem',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  color: '#1E1E1E',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                }}
              />
              <button
                type="submit"
                aria-label="Search"
                style={{
                  padding: '0.6rem 0.85rem',
                  background: 'transparent',
                  border: 'none',
                  borderLeft: '1px solid #E5E7EB',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6B7280',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </form>
          </div>

          {/* ─── Right side utility links ─── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1.5vw, 1.5rem)', flexShrink: 0, marginLeft: 'auto' }}>

            {/* Help / Phone */}
            <a
              href="tel:9479784979"
              className="vp-desktop-only"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                gap: '0.1rem',
              }}
            >
              <span style={{ fontSize: '0.6875rem', color: '#6B7280', fontFamily: "'Inter', sans-serif" }}>Help is here</span>
              <span style={{ fontSize: '0.8125rem', color: '#1E1E1E', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>9479784979</span>
            </a>

            {/* My Favourites */}
            <Link
              href="/dashboard"
              className="vp-desktop-only"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                gap: '0.1rem',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span style={{ fontSize: '0.6875rem', color: '#1E1E1E', fontFamily: "'Inter', sans-serif" }}>My Favourites</span>
            </Link>

            {/* Sign In / User */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link
                  href="/dashboard"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textDecoration: 'none',
                    gap: '0.1rem',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span style={{ fontSize: '0.6875rem', color: '#1E1E1E', fontFamily: "'Inter', sans-serif" }}>{user.name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={() => logout()}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#6B7280',
                    fontSize: '0.65rem',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    textDecoration: 'underline',
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem 1.35rem',
                  border: '1.5px solid #1E1E1E',
                  borderRadius: '999px',
                  background: 'transparent',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: '#1E1E1E',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                Sign In
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                gap: '0.1rem',
                position: 'relative',
              }}
              aria-label="Cart"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="1.8">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span style={{ fontSize: '0.6875rem', color: '#1E1E1E', fontFamily: "'Inter', sans-serif" }}>Cart</span>
              {totalItemCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    background: '#D40000',
                    color: '#FFFFFF',
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    width: '17px',
                    height: '17px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {totalItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ 3. Category Navigation Ribbon (Vistaprint style) ═══ */}
      <div
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
        className="vp-desktop-only"
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 clamp(1rem, 3vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            whiteSpace: 'nowrap',
          }}
        >
          {categoryTabs.map((tab, idx) => (
            <Link
              key={tab.label}
              href={tab.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 400,
                color: idx === 0 ? '#0B2545' : '#4B5563',
                textDecoration: idx === 0 ? 'underline' : 'none',
                textUnderlineOffset: '4px',
                transition: 'color 0.2s ease',
                borderBottom: '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0B2545';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = idx === 0 ? '#0B2545' : '#4B5563';
                e.currentTarget.style.textDecoration = idx === 0 ? 'underline' : 'none';
              }}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .vp-desktop-only { display: flex !important; }
        header div::-webkit-scrollbar { display: none; }

        @media (max-width: 900px) {
          .vp-desktop-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
