'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';

interface MegaColumn {
  heading: string;
  items: { label: string; href: string; isNew?: boolean }[];
}

interface NavTab {
  label: string;
  href: string;
  columns?: MegaColumn[];
}

const megaNavTabs: NavTab[] = [
  {
    label: 'View All',
    href: '/products',
    columns: [
      {
        heading: 'All Print Categories',
        items: [
          { label: 'Visiting Cards', href: '/products?category=Business Cards' },
          { label: 'Wedding Invitations', href: '/products?category=Wedding Cards' },
          { label: 'Stationery & Letterheads', href: '/products?category=Business Cards' },
          { label: 'Signs, Banners & Standees', href: '/products?category=Flex Banners' },
          { label: 'Labels, Stickers & Packaging', href: '/products?category=Flex Banners' },
          { label: 'Mugs, Albums & Gifts', href: '/products?category=Custom Gifts' },
          { label: 'Custom Polo T-Shirts', href: '/products?category=Custom Gifts' },
          { label: 'Deals & Bulk Offers', href: '/products' },
        ],
      },
    ],
  },
  {
    label: 'Visiting Cards',
    href: '/products?category=Business Cards',
    columns: [
      {
        heading: 'Shop by Shape',
        items: [
          { label: 'Standard Visiting Cards', href: '/products?category=Business Cards' },
          { label: 'Classic Visiting Cards', href: '/products?category=Business Cards' },
          { label: 'Rounded Corner Cards', href: '/products?category=Business Cards' },
          { label: 'Square Visiting Cards', href: '/products?category=Business Cards' },
          { label: 'Leaf Visiting Cards', href: '/products?category=Business Cards' },
          { label: 'Oval Visiting Cards', href: '/products?category=Business Cards' },
          { label: 'Custom Shape Cards', href: '/products?category=Business Cards', isNew: true },
        ],
      },
      {
        heading: 'Shop by Paper & Finish',
        items: [
          { label: 'Matte Finish (350 GSM)', href: '/products?category=Business Cards' },
          { label: 'Glossy Laminated Cards', href: '/products?category=Business Cards' },
          { label: 'Velvet Touch Cards', href: '/products?category=Business Cards', isNew: true },
          { label: 'Spot UV Coating Cards', href: '/products?category=Business Cards' },
          { label: 'Gold Foil Stamping Cards', href: '/products?category=Business Cards' },
          { label: 'Transparent Acrylic Cards', href: '/products?category=Wedding Cards' },
          { label: 'Metallic Silver Foil Cards', href: '/products?category=Business Cards', isNew: true },
        ],
      },
      {
        heading: 'Specialty Cards',
        items: [
          { label: 'Premium Plus Glossy', href: '/products?category=Business Cards' },
          { label: 'Non-Tearable Silk Cards', href: '/products?category=Business Cards' },
          { label: 'Magnet Visiting Cards', href: '/products?category=Business Cards' },
          { label: 'Kraft Paper Cards', href: '/products?category=Business Cards' },
        ],
      },
      {
        heading: 'Visiting Card Accessories',
        items: [
          { label: 'Metal Card Holder', href: '/products?category=Business Cards' },
          { label: 'Executive Desktop Card Stand', href: '/products?category=Business Cards' },
          { label: 'Leatherette Pocket Case', href: '/products?category=Business Cards' },
        ],
      },
    ],
  },
  {
    label: 'Wedding Invitations',
    href: '/products?category=Wedding Cards',
    columns: [
      {
        heading: 'Royal Invitations',
        items: [
          { label: 'Royal Velvet & Gold Box Cards', href: '/products?category=Wedding Cards' },
          { label: 'Clear Acrylic Invitations', href: '/products?category=Wedding Cards' },
          { label: 'Royal Farman Scroll Invitations', href: '/products?category=Wedding Cards' },
          { label: 'Traditional Ganesh Cards', href: '/products?category=Wedding Cards' },
          { label: '"The Shaadi Times" Newspaper Card', href: '/products?category=Wedding Cards', isNew: true },
        ],
      },
      {
        heading: 'Ceremony & Event Cards',
        items: [
          { label: 'Haldi & Sangeet Cards', href: '/products?category=Wedding Cards' },
          { label: 'Wedding Menu Cards', href: '/products?category=Wedding Cards' },
          { label: 'Wedding Program Folders', href: '/products?category=Wedding Cards' },
          { label: 'Save The Date Cards', href: '/products?category=Wedding Cards' },
          { label: 'Thank You Cards', href: '/products?category=Business Cards' },
        ],
      },
      {
        heading: 'Envelopes & Seals',
        items: [
          { label: 'Wax Seal Stamps', href: '/products?category=Wedding Cards' },
          { label: 'Custom Envelope Seals', href: '/products?category=Wedding Cards' },
          { label: 'Foil Embossed Envelopes', href: '/products?category=Wedding Cards' },
          { label: 'Velvet Outer Boxes', href: '/products?category=Wedding Cards' },
        ],
      },
    ],
  },
  {
    label: 'Stationery, Letterheads & Notebooks',
    href: '/products?category=Office Stationery',
    columns: [
      {
        heading: 'Custom Stationery',
        items: [
          { label: 'Letterheads', href: '/products?category=Office Stationery' },
          { label: 'Custom Letterhead Pads', href: '/products?category=Office Stationery' },
          { label: 'Bill Books', href: '/products?category=Office Stationery' },
          { label: 'Envelopes', href: '/products?category=Office Stationery' },
          { label: 'Rubber Stamps & Seals', href: '/products?category=Office Stationery' },
          { label: 'Invoice Books', href: '/products?category=Office Stationery' },
          { label: 'Custom Certificates', href: '/products?category=Office Stationery' },
          { label: 'Presentation Folders', href: '/products?category=Office Stationery' },
        ],
      },
      {
        heading: 'Invitations & Announcements',
        items: [
          { label: 'Kids Birthday Invitations', href: '/products?category=Birthday & Event Cards' },
          { label: 'Anniversary Party Cards', href: '/products?category=Birthday & Event Cards' },
          { label: 'Griha Pravesh Cards', href: '/products?category=Birthday & Event Cards' },
          { label: 'Retirement Invitations', href: '/products?category=Birthday & Event Cards' },
          { label: 'Shop all Party Cards', href: '/products?category=Birthday & Event Cards' },
        ],
      },
      {
        heading: 'Wedding Stationery',
        items: [
          { label: 'Wedding Invitations', href: '/products?category=Wedding Cards' },
          { label: 'Save The Date Cards', href: '/products?category=Wedding Cards' },
          { label: 'Haldi & Sangeet Cards', href: '/products?category=Wedding Cards' },
          { label: 'Wedding Program Folders', href: '/products?category=Wedding Cards' },
        ],
      },
    ],
  },
  {
    label: 'Signs, Posters & Marketing Materials',
    href: '/products?category=Flex Banners',
    columns: [
      {
        heading: 'Banners & Displays',
        items: [
          { label: 'Star Flex Outdoor Banners', href: '/products?category=Flex Banners' },
          { label: 'Roll-up Display Standees (6x3 ft)', href: '/products?category=Flex Banners' },
          { label: 'Heavy Duty Vinyl Banners', href: '/products?category=Flex Banners' },
          { label: 'Acrylic LED Glow Sign Boards', href: '/products?category=Flex Banners' },
          { label: 'Promotional Canopy Tents', href: '/products?category=Flex Banners', isNew: true },
        ],
      },
      {
        heading: 'Marketing Prints',
        items: [
          { label: 'Pamphlets & Flyers (A4/A5)', href: '/products?category=Flex Banners' },
          { label: 'Corporate Postcards', href: '/products?category=Office Stationery' },
          { label: 'Restaurant Menu Cards', href: '/products?category=Office Stationery' },
          { label: 'Tri-Fold Brochures', href: '/products?category=Flex Banners' },
        ],
      },
    ],
  },
  {
    label: 'Labels, Stickers & Packaging',
    href: '/products?category=Stickers & Labels',
    columns: [
      {
        heading: 'Stickers & Labels',
        items: [
          { label: 'Custom Die-Cut Vinyl Stickers', href: '/products?category=Stickers & Labels' },
          { label: 'Product Packaging Roll Labels', href: '/products?category=Stickers & Labels' },
          { label: 'Holographic Warranty Seals', href: '/products?category=Stickers & Labels' },
          { label: 'Transparent Waterproof Labels', href: '/products?category=Stickers & Labels', isNew: true },
        ],
      },
      {
        heading: 'Packaging Solutions',
        items: [
          { label: 'Printed Envelopes', href: '/products?category=Office Stationery' },
          { label: 'Custom Shipping Boxes', href: '/products?category=Stickers & Labels' },
          { label: 'Branded Carry Bags', href: '/products?category=Stickers & Labels' },
        ],
      },
    ],
  },
  {
    label: 'Mugs, Albums & Gifts',
    href: '/products?category=Custom Gifts',
    columns: [
      {
        heading: 'Custom Gifts & Merchandise',
        items: [
          { label: 'Magic Color Changing Photo Mugs', href: '/products?category=Custom Gifts' },
          { label: 'HD Lay-Flat Wedding Photobooks', href: '/products?category=Photobooks' },
          { label: 'Baby Milestone Memory Albums', href: '/products?category=Photobooks' },
          { label: 'Laser Engraved Wooden Photo Plaques', href: '/products?category=Custom Gifts' },
          { label: 'Embroidered Corporate Polo T-Shirts', href: '/products?category=Custom Gifts' },
        ],
      },
    ],
  },
  {
    label: 'Custom Polo T-shirts',
    href: '/products?category=Custom Gifts',
    columns: [
      {
        heading: 'Apparel & Wearables',
        items: [
          { label: 'Corporate Embroidered Polo T-Shirt', href: '/products?category=Custom Gifts' },
          { label: 'Dry-Fit Sports Polo', href: '/products?category=Custom Gifts' },
          { label: 'Printed Team Hoodies', href: '/products?category=Custom Gifts', isNew: true },
          { label: 'Custom Printed Caps & Visors', href: '/products?category=Custom Gifts' },
        ],
      },
    ],
  },
  {
    label: 'Deals & Offers',
    href: '/products',
    columns: [
      {
        heading: 'Festive Deals & Discounts',
        items: [
          { label: 'Flat 20% OFF 1,000+ Visiting Cards (BULK20)', href: '/products?category=Business Cards', isNew: true },
          { label: '15% OFF Royal Wedding Cards (WEDDING15)', href: '/products?category=Wedding Cards' },
          { label: '10% OFF Flex Banners (BANNER10)', href: '/products?category=Flex Banners' },
          { label: 'Flat 5% OFF Orders ₹10,000+ (SAVE5)', href: '/products' },
        ],
      },
      {
        heading: 'Combo Value Bundles',
        items: [
          { label: 'Corporate Starter Pack (Cards + Letterhead + Stamp)', href: '/products?category=Business Cards' },
          { label: 'Wedding Royal Pack (Box Cards + Acrylic + Scroll)', href: '/products?category=Wedding Cards' },
          { label: 'Shop Promotion Kit (Flex + Standee + Pamphlets)', href: '/products?category=Flex Banners' },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<NavTab | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('SAVE5');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <header
      style={{ position: 'sticky', top: 0, zIndex: 1000 }}
      onMouseLeave={() => setHoveredTab(null)}
    >
      {/* ═══ 1. Top Promo Announcement Bar ═══ */}
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

      {/* ═══ 2. Main Header Bar ═══ */}
      <div
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          padding: '0.65rem clamp(1rem, 2vw, 2.5rem)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Ayushman Cards n Graphics"
              style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Search Bar */}
          <div style={{ flex: '1 1 480px', maxWidth: '560px' }} className="vp-desktop-only">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid #CBD5E1',
                borderRadius: '6px',
                overflow: 'hidden',
                background: '#FFFFFF',
              }}
            >
              <input
                type="text"
                placeholder="Search business cards, wedding cards, letterheads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.55rem 0.9rem',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
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
                  padding: '0.55rem 0.8rem',
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

          {/* Right Header Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1.2vw, 1.25rem)', flexShrink: 0, marginLeft: 'auto' }}>
            <a
              href="tel:9479784979"
              className="vp-desktop-only"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
            >
              <span style={{ fontSize: '0.6875rem', color: '#6B7280', fontFamily: "'Inter', sans-serif" }}>Help is here</span>
              <span style={{ fontSize: '0.8125rem', color: '#1E1E1E', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>9479784979</span>
            </a>

            {/* Admin Portal Shortcut for Admins */}
            {user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  background: '#0B2545',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(11,37,69,0.25)',
                }}
              >
                <span>🛡️</span> Admin Portal
              </Link>
            )}

            {/* My Favourites with live counter */}
            <Link
              href="/dashboard"
              className="vp-desktop-only"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', position: 'relative' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlistCount > 0 ? '#D40000' : 'none'} stroke={wishlistCount > 0 ? '#D40000' : '#1E1E1E'} strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span style={{ fontSize: '0.6875rem', color: '#1E1E1E', fontFamily: "'Inter', sans-serif" }}>
                My Favourites {wishlistCount > 0 ? `(${wishlistCount})` : ''}
              </span>
            </Link>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Link
                  href="/profile"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
                  title="View & Edit Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span style={{ fontSize: '0.6875rem', color: '#1E1E1E', fontFamily: "'Inter', sans-serif" }}>
                    {user.name?.split(' ')[0]} (Profile)
                  </span>
                </Link>
                <button
                  onClick={() => logout()}
                  style={{ background: 'transparent', border: 'none', color: '#6B7280', fontSize: '0.65rem', cursor: 'pointer', fontFamily: "'Inter', sans-serif", textDecoration: 'underline' }}
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
                  padding: '0.45rem 1.25rem',
                  border: '1.5px solid #1E1E1E',
                  borderRadius: '999px',
                  background: 'transparent',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: '#1E1E1E',
                  textDecoration: 'none',
                }}
              >
                Sign In
              </Link>
            )}

            {/* Cart with distinct items count */}
            <Link
              href="/cart"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', position: 'relative' }}
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

      {/* ═══ 3. Category Navigation Ribbon ═══ */}
      <div
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          position: 'relative',
        }}
        className="vp-desktop-only"
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 clamp(0.75rem, 1.5vw, 1.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {megaNavTabs.map((tab, idx) => {
            const isHovered = hoveredTab?.label === tab.label;
            return (
              <div
                key={tab.label}
                onMouseEnter={() => setHoveredTab(tab)}
                style={{ position: 'relative' }}
              >
                <Link
                  href={tab.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.75rem 0.4rem',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.78125rem',
                    fontWeight: isHovered || idx === 0 ? 600 : 400,
                    color: isHovered || idx === 0 ? '#0B2545' : '#374151',
                    textDecoration: 'none',
                    borderBottom: isHovered || idx === 0 ? '2px solid #0B2545' : '2px solid transparent',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </Link>
              </div>
            );
          })}
        </div>

        {/* ═══ 4. Mega Menu Dropdown Overlay ═══ */}
        {hoveredTab && hoveredTab.columns && hoveredTab.columns.length > 0 && (
          <div
            onMouseEnter={() => setHoveredTab(hoveredTab)}
            onMouseLeave={() => setHoveredTab(null)}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#FFFFFF',
              borderTop: '1px solid #E5E7EB',
              borderBottom: '2px solid #CBD5E1',
              boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
              zIndex: 9999,
              padding: '2rem clamp(1rem, 3vw, 2.5rem)',
              animation: 'fadeInDown 0.15s ease-out',
            }}
          >
            <div
              style={{
                maxWidth: '1440px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(hoveredTab.columns.length, 6)}, 1fr)`,
                gap: '1.75rem',
                alignItems: 'start',
              }}
            >
              {hoveredTab.columns.map((col) => (
                <div key={col.heading}>
                  <h4
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: '#1E1E1E',
                      marginBottom: '0.75rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {col.heading}
                  </h4>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.45rem',
                    }}
                  >
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setHoveredTab(null)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.8125rem',
                            color: '#4B5563',
                            textDecoration: 'none',
                            transition: 'color 0.15s ease',
                            lineHeight: 1.4,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#0B2545';
                            e.currentTarget.style.textDecoration = 'underline';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#4B5563';
                            e.currentTarget.style.textDecoration = 'none';
                          }}
                        >
                          <span>{item.label}</span>
                          {item.isNew && (
                            <span
                              style={{
                                background: '#60B5FF',
                                color: '#002B52',
                                fontSize: '0.625rem',
                                fontWeight: 800,
                                padding: '0.05rem 0.35rem',
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em',
                              }}
                            >
                              NEW
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .vp-desktop-only { display: flex !important; }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .vp-desktop-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
