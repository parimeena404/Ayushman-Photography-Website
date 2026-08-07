'use client';

import { useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

interface MegaItem {
  label: string;
  href: string;
  badge?: string;
  sublinks?: { title: string; desc: string; href: string }[];
  featuredImages: { title: string; price: string; image: string; href: string }[];
}

const categoriesMenu: MegaItem[] = [
  {
    label: '🪔 Indian Festivals',
    href: '/#festivals',
    badge: 'Festive Season',
    sublinks: [
      { title: 'Diwali Deepotsav', desc: 'Diya lights & family rangoli shoots', href: '/#portfolio' },
      { title: 'Makar Sankranti', desc: 'Kite flying & sweets celebrations', href: '/#portfolio' },
      { title: 'Lohri & Harvest Fest', desc: 'Bonfire nights & Bhangra dance', href: '/#portfolio' },
      { title: 'Navratri & Garba', desc: 'Royal ethnic attire & Garba nights', href: '/#portfolio' },
    ],
    featuredImages: [
      { title: 'Diwali Deepotsav Shoot', price: 'From ₹15,000', image: '/images/festivals/diwali-deepotsav.jpg', href: '/#portfolio' },
      { title: 'Makar Sankranti Kite Fest', price: 'From ₹18,000', image: '/images/festivals/makar-sankranti.png', href: '/#portfolio' },
    ],
  },
  {
    label: 'Wedding Photography',
    href: '/#portfolio',
    badge: 'Royal Weddings',
    sublinks: [
      { title: 'Full Day Coverage', desc: 'Complete wedding ritual documentation', href: '/#portfolio' },
      { title: 'Destination Weddings', desc: 'Palace & beach wedding coverage', href: '/#portfolio' },
      { title: 'Same Day Edits', desc: 'Insta reels & highlight trailers', href: '/#portfolio' },
      { title: 'Traditional Mandap Vows', desc: 'Candid emotional wedding moments', href: '/#portfolio' },
    ],
    featuredImages: [
      { title: 'Royal Palace Wedding', price: 'From ₹45,000', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80', href: '/#portfolio' },
      { title: 'Mandap Ceremony', price: 'From ₹65,000', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', href: '/#portfolio' },
    ],
  },
  {
    label: 'Pre-Wedding Shoots',
    href: '/#portfolio',
    badge: 'Popular',
    sublinks: [
      { title: 'Heritage Fort Shoots', desc: 'Udaipur & Jaipur palace shoots', href: '/#portfolio' },
      { title: 'Sunset Couple Portraits', desc: 'Golden hour romantic sessions', href: '/#portfolio' },
      { title: 'Cinematic Pre-Wedding Teaser', desc: '2-minute music video teaser', href: '/#portfolio' },
    ],
    featuredImages: [
      { title: 'Heritage Palace Pre-Wedding', price: 'From ₹25,000', image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80', href: '/#portfolio' },
      { title: 'Romantic Couple Shoot', price: 'From ₹30,000', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', href: '/#portfolio' },
    ],
  },
  {
    label: 'Cinematography & Films',
    href: '/films',
    badge: '4K Cinema',
    sublinks: [
      { title: '4K Wedding Highlight Film', desc: 'Hollywood grade color grading', href: '/films' },
      { title: 'Aerial Drone Cinema', desc: '4K flight footage of venues', href: '/films' },
      { title: 'Documentary Feature Film', desc: 'Full-length wedding ceremony film', href: '/films' },
    ],
    featuredImages: [
      { title: '4K Cinema Highlight Film', price: 'From ₹35,000', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80', href: '/films' },
      { title: 'Drone Aerial Cinema', price: 'From ₹18,000', image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80', href: '/films' },
    ],
  },
  {
    label: 'Portrait Photography',
    href: '/#portfolio',
    sublinks: [
      { title: 'Studio Ethnic Portraits', desc: 'Traditional festive attire portraits', href: '/#portfolio' },
      { title: 'Corporate Headshots', desc: 'Professional branding portraits', href: '/#portfolio' },
      { title: 'Family Heritage Portraits', desc: 'Multi-generational family portraits', href: '/#portfolio' },
    ],
    featuredImages: [
      { title: 'Studio Ethnic Portrait', price: 'From ₹12,000', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', href: '/#portfolio' },
      { title: 'Professional Headshots', price: 'From ₹8,000', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', href: '/#portfolio' },
    ],
  },
  {
    label: 'Fashion & Lookbooks',
    href: '/#portfolio',
    sublinks: [
      { title: 'Haute Couture Campaigns', desc: 'High fashion brand editorials', href: '/#portfolio' },
      { title: 'Designer Apparel Lookbooks', desc: 'Catalog & eCommerce fashion shoots', href: '/#portfolio' },
    ],
    featuredImages: [
      { title: 'Haute Couture Campaign', price: 'From ₹35,000', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', href: '/#portfolio' },
      { title: 'Editorial Model Shoot', price: 'From ₹28,000', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80', href: '/#portfolio' },
    ],
  },
  {
    label: 'Commercial & Brands',
    href: '/#portfolio',
    sublinks: [
      { title: 'Product Catalog Shoots', desc: 'Amazon & eCommerce product photography', href: '/#portfolio' },
      { title: 'Jewelry & Luxury Goods', desc: 'Macro lighting photography for fine items', href: '/#portfolio' },
    ],
    featuredImages: [
      { title: 'Commercial Product Catalog', price: 'From ₹20,000', image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&q=80', href: '/#portfolio' },
      { title: 'Luxury Goods Photography', price: 'From ₹25,000', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', href: '/#portfolio' },
    ],
  },
  {
    label: 'Festive Cards & Prints',
    href: '/#products',
    badge: 'Printing',
    sublinks: [
      { title: 'Custom Shaadi Cards', desc: 'Gold foil & velvet wedding invitations', href: '/#products' },
      { title: 'Diwali Printed Greeting Cards', desc: 'Festive corporate & family cards', href: '/#products' },
      { title: 'Flush Mount Velvet Albums', desc: 'Italian leatherette handcrafted albums', href: '/#products' },
      { title: 'Canvas Wall Prints', desc: 'Gallery-wrapped fine art canvas prints', href: '/#products' },
    ],
    featuredImages: [
      { title: 'Gold Foil Shaadi Cards', price: 'From ₹45 / card', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80', href: '/#products' },
      { title: 'Flush Mount Photo Album', price: 'From ₹7,500', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80', href: '/#products' },
    ],
  },
  {
    label: 'Drone Shoots',
    href: '/#portfolio',
    sublinks: [
      { title: '4K Aerial Event Flights', desc: 'Overhead venue & barat coverage', href: '/#portfolio' },
      { title: 'Destination Panoramic Vistas', desc: 'Landscape & resort aerial photography', href: '/#portfolio' },
    ],
    featuredImages: [
      { title: '4K Aerial Drone Flight', price: 'From ₹18,000', image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80', href: '/#portfolio' },
      { title: 'Sunset Panoramic Vista', price: 'From ₹22,000', image: '/images/festivals/rainbow-sails.png', href: '/#portfolio' },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [copiedCode, setCopiedCode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FESTIVE20');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleMegaEnter = (label: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveMega(label);
  };

  const handleMegaLeave = () => {
    megaTimeoutRef.current = setTimeout(() => setActiveMega(null), 180);
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

      {/* 2. Main Header Bar */}
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

      {/* 3. Interactive Mega Category Navigation Bar with Visual Image Preview Dropdown */}
      <div
        style={{
          borderBottom: '1px solid var(--border-light)',
          background: 'var(--bg-card)',
          position: 'relative',
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
            <div
              key={item.label}
              onMouseEnter={() => handleMegaEnter(item.label)}
              onMouseLeave={handleMegaLeave}
              style={{ position: 'relative' }}
            >
              <Link
                href={item.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.65rem 0',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: idx === 0 ? 700 : 500,
                  color: idx === 0 ? '#D40000' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  borderBottom: activeMega === item.label ? '2px solid #D40000' : '2px solid transparent',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#D40000';
                }}
                onMouseLeave={(e) => {
                  if (activeMega !== item.label) {
                    e.currentTarget.style.color = idx === 0 ? '#D40000' : 'var(--text-secondary)';
                  }
                }}
              >
                {item.label}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginTop: '1px' }}>
                  <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Full-Width Visual Mega Menu Overlay Panel */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => handleMegaEnter(activeMega)}
              onMouseLeave={handleMegaLeave}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-elevated)',
                borderBottom: '2px solid #D40000',
                zIndex: 100,
              }}
            >
              {(() => {
                const currentItem = categoriesMenu.find((m) => m.label === activeMega);
                if (!currentItem) return null;

                return (
                  <div
                    className="container-wide"
                    style={{
                      padding: '1.75rem clamp(1rem, 3vw, 2.5rem)',
                      display: 'grid',
                      gridTemplateColumns: currentItem.sublinks ? '1fr 1.6fr' : '1fr',
                      gap: '2rem',
                    }}
                  >
                    {/* Sublinks Column */}
                    {currentItem.sublinks && (
                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, color: '#D40000' }}>
                          Specialized Categories
                        </div>
                        {currentItem.sublinks.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            style={{
                              display: 'block',
                              padding: '0.5rem 0.75rem',
                              borderRadius: 'var(--radius-md)',
                              textDecoration: 'none',
                              transition: 'background 0.2s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-secondary)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                          >
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {sub.title}
                            </div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                              {sub.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Pinterest Quality Visual Featured Cards */}
                    <div>
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, color: 'var(--text-tertiary)', marginBottom: '0.75rem' }}>
                        Featured Photography Collections
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${currentItem.featuredImages.length}, 1fr)`, gap: '1rem' }}>
                        {currentItem.featuredImages.map((imgItem) => (
                          <Link
                            key={imgItem.title}
                            href={imgItem.href}
                            style={{
                              display: 'block',
                              borderRadius: 'var(--radius-md)',
                              overflow: 'hidden',
                              background: 'var(--bg-secondary)',
                              border: '1px solid var(--border-light)',
                              textDecoration: 'none',
                            }}
                            className="mega-img-card"
                          >
                            <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                              <div
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  backgroundImage: `url(${imgItem.image})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  transition: 'transform 0.4s ease',
                                }}
                                className="mega-card-img"
                              />
                            </div>
                            <div style={{ padding: '0.75rem' }}>
                              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                                {imgItem.title}
                              </div>
                              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', fontWeight: 700, color: '#D40000' }}>
                                {imgItem.price}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .desktop-search { display: block; }
        .desktop-only { display: flex !important; }
        div::-webkit-scrollbar { display: none; }
        .mega-img-card:hover { transform: translateY(-2px); border-color: #D40000 !important; }
        .mega-img-card:hover .mega-card-img { transform: scale(1.06); }

        @media (max-width: 900px) {
          .desktop-search { display: none; }
          .desktop-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
