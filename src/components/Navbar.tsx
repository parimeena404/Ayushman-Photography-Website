'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
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
    href: '/',
    columns: [
      {
        heading: 'All Print Categories',
        items: [
          { label: 'Visiting Cards', href: '/#products' },
          { label: 'Wedding Invitations', href: '/#wedding' },
          { label: 'Stationery & Letterheads', href: '/#stationery' },
          { label: 'Signs, Banners & Standees', href: '/#banners' },
          { label: 'Labels, Stickers & Packaging', href: '/#stickers' },
          { label: 'Mugs, Albums & Gifts', href: '/#gifts' },
          { label: 'Custom Polo T-Shirts', href: '/#tshirts' },
          { label: 'Deals & Bulk Offers', href: '/#deals' },
        ],
      },
    ],
  },
  {
    label: 'Visiting Cards',
    href: '/#products',
    columns: [
      {
        heading: 'Shop by Shape',
        items: [
          { label: 'Standard Visiting Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Classic Visiting Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Rounded Corner Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Square Visiting Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Leaf Visiting Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Oval Visiting Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Custom Shape Cards', href: '/booking?pkg=wedding-cards', isNew: true },
        ],
      },
      {
        heading: 'Shop by Paper & Finish',
        items: [
          { label: 'Matte Finish (350 GSM)', href: '/booking?pkg=wedding-cards' },
          { label: 'Glossy Laminated Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Velvet Touch Cards', href: '/booking?pkg=wedding-cards', isNew: true },
          { label: 'Spot UV Coating Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Gold Foil Stamping Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Transparent Acrylic Cards', href: '/booking?pkg=royal-wedding' },
          { label: 'Metallic Silver Foil Cards', href: '/booking?pkg=wedding-cards', isNew: true },
        ],
      },
      {
        heading: 'Specialty Cards',
        items: [
          { label: 'Premium Plus Glossy', href: '/booking?pkg=wedding-cards' },
          { label: 'Non-Tearable Silk Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Magnet Visiting Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Kraft Paper Cards', href: '/booking?pkg=wedding-cards' },
        ],
      },
      {
        heading: 'Visiting Card Accessories',
        items: [
          { label: 'Metal Card Holder', href: '/booking?pkg=wedding-cards' },
          { label: 'Executive Desktop Card Stand', href: '/booking?pkg=wedding-cards' },
          { label: 'Leatherette Pocket Case', href: '/booking?pkg=wedding-cards' },
        ],
      },
    ],
  },
  {
    label: 'Wedding Invitations',
    href: '/#wedding',
    columns: [
      {
        heading: 'Royal Invitations',
        items: [
          { label: 'Royal Velvet & Gold Box Cards', href: '/booking?pkg=royal-wedding' },
          { label: 'Clear Acrylic Invitations', href: '/booking?pkg=royal-wedding' },
          { label: 'Royal Farman Scroll Invitations', href: '/booking?pkg=royal-wedding' },
          { label: 'Traditional Ganesh Cards', href: '/booking?pkg=royal-wedding' },
          { label: '"The Shaadi Times" Newspaper Card', href: '/booking?pkg=royal-wedding', isNew: true },
        ],
      },
      {
        heading: 'Ceremony & Event Cards',
        items: [
          { label: 'Haldi & Sangeet Cards', href: '/booking?pkg=sangeet-haldi' },
          { label: 'Wedding Menu Cards', href: '/booking?pkg=royal-wedding' },
          { label: 'Wedding Program Folders', href: '/booking?pkg=royal-wedding' },
          { label: 'Save The Date Cards', href: '/booking?pkg=royal-wedding' },
          { label: 'Thank You Cards', href: '/booking?pkg=wedding-cards' },
        ],
      },
      {
        heading: 'Envelopes & Seals',
        items: [
          { label: 'Wax Seal Stamps', href: '/booking?pkg=royal-wedding' },
          { label: 'Custom Envelope Seals', href: '/booking?pkg=royal-wedding' },
          { label: 'Foil Embossed Envelopes', href: '/booking?pkg=royal-wedding' },
          { label: 'Velvet Outer Boxes', href: '/booking?pkg=royal-wedding' },
        ],
      },
    ],
  },
  {
    label: 'Stationery, Letterheads & Notebooks',
    href: '/#stationery',
    columns: [
      {
        heading: 'Custom Stationery',
        items: [
          { label: 'Letterheads', href: '/booking?pkg=wedding-cards' },
          { label: 'Custom Letterhead Pads', href: '/booking?pkg=wedding-cards' },
          { label: 'Bill Books', href: '/booking?pkg=wedding-cards' },
          { label: 'Envelopes', href: '/booking?pkg=wedding-cards' },
          { label: 'Custom Mouse Pads', href: '/booking?pkg=wedding-cards' },
          { label: 'Envelope Seals', href: '/booking?pkg=wedding-cards' },
          { label: 'Custom Pen Drive', href: '/booking?pkg=wedding-cards' },
          { label: 'Laptop Skins', href: '/booking?pkg=wedding-cards' },
          { label: 'Bulk Letterheads', href: '/booking?pkg=wedding-cards' },
          { label: 'Custom Pens', href: '/booking?pkg=wedding-cards' },
        ],
      },
      {
        heading: 'Office Supplies',
        items: [
          { label: 'Lanyards', href: '/booking?pkg=wedding-cards' },
          { label: 'ID Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Invoice Books', href: '/booking?pkg=wedding-cards' },
          { label: 'Note Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Custom Certificates', href: '/booking?pkg=wedding-cards' },
          { label: 'Awards', href: '/booking?pkg=wedding-cards' },
          { label: 'Coasters', href: '/booking?pkg=wedding-cards' },
          { label: 'Employee Welcome Kit', href: '/booking?pkg=wedding-cards' },
          { label: 'Cash Vouchers', href: '/booking?pkg=wedding-cards' },
          { label: 'Paper Identity Cards', href: '/booking?pkg=wedding-cards' },
        ],
      },
      {
        heading: 'Custom Notebooks & Diaries',
        items: [
          { label: 'Personalised Notebooks', href: '/booking?pkg=wedding-cards' },
          { label: 'Diary with Pen Holder', href: '/booking?pkg=wedding-cards' },
          { label: 'Personalised A5 Diary', href: '/booking?pkg=wedding-cards' },
          { label: 'Personalised Diary with Magnetic Lock', href: '/booking?pkg=wedding-cards' },
          { label: 'Notebook A4 Size', href: '/booking?pkg=wedding-cards' },
        ],
      },
      {
        heading: 'Wedding Stationery',
        items: [
          { label: 'Wedding Invitations', href: '/booking?pkg=royal-wedding' },
          { label: 'Save The Date Cards', href: '/booking?pkg=royal-wedding' },
          { label: 'Wedding Menu', href: '/booking?pkg=royal-wedding' },
          { label: 'Wedding Programmes', href: '/booking?pkg=royal-wedding' },
          { label: 'Shop all Wedding Stationery', href: '/booking?pkg=royal-wedding' },
        ],
      },
      {
        heading: 'Invitations & Announcements',
        items: [
          { label: 'Thank You Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Birthday Invitations', href: '/booking?pkg=royal-wedding' },
          { label: 'Party invitations', href: '/booking?pkg=royal-wedding' },
          { label: 'Moving Announcements', href: '/booking?pkg=wedding-cards' },
          { label: 'Gift Tags', href: '/booking?pkg=wedding-cards' },
          { label: 'Shop all Invitations and Announcements', href: '/booking?pkg=royal-wedding' },
        ],
      },
      {
        heading: 'Explore More.',
        items: [
          { label: 'Gift Wrapping Paper', href: '/booking?pkg=flex-banners' },
          { label: 'Custom Paper Wrist Bands', href: '/booking?pkg=flex-banners' },
          { label: 'USB Flash Drive', href: '/booking?pkg=wedding-cards' },
          { label: 'Perfect Binding Booklets', href: '/booking?pkg=wedding-cards' },
          { label: 'Customised Mementos', href: '/booking?pkg=wedding-cards', isNew: true },
          { label: 'Recognition Plaques', href: '/booking?pkg=wedding-cards', isNew: true },
          { label: 'Star Performer Awards', href: '/booking?pkg=wedding-cards', isNew: true },
        ],
      },
    ],
  },
  {
    label: 'Signs, Posters & Marketing Materials',
    href: '/#banners',
    columns: [
      {
        heading: 'Banners & Displays',
        items: [
          { label: 'Star Flex Outdoor Banners (₹18/sqft)', href: '/booking?pkg=flex-banners' },
          { label: 'Roll-up Display Standees (6x3 ft)', href: '/booking?pkg=flex-banners' },
          { label: 'Heavy Duty Vinyl Banners', href: '/booking?pkg=flex-banners' },
          { label: 'Glow Sign Boards', href: '/booking?pkg=flex-banners' },
          { label: 'Promotional Canopy Tents', href: '/booking?pkg=flex-banners', isNew: true },
        ],
      },
      {
        heading: 'Marketing Prints',
        items: [
          { label: 'Pamphlets & Flyers (A4/A5)', href: '/booking?pkg=flex-banners' },
          { label: 'Corporate Postcards', href: '/booking?pkg=wedding-cards' },
          { label: 'Restaurant Menu Cards', href: '/booking?pkg=wedding-cards' },
          { label: 'Product Catalogs', href: '/booking?pkg=wedding-cards' },
          { label: 'Tri-Fold Brochures', href: '/booking?pkg=flex-banners' },
        ],
      },
    ],
  },
  {
    label: 'Labels, Stickers & Packaging',
    href: '/#stickers',
    columns: [
      {
        heading: 'Stickers & Labels',
        items: [
          { label: 'Custom Die-Cut Stickers', href: '/booking?pkg=flex-banners' },
          { label: 'Product Packaging Labels', href: '/booking?pkg=flex-banners' },
          { label: 'Roll Labels', href: '/booking?pkg=flex-banners' },
          { label: 'Sheet Stickers', href: '/booking?pkg=flex-banners' },
          { label: 'Transparent Waterproof Stickers', href: '/booking?pkg=flex-banners', isNew: true },
        ],
      },
      {
        heading: 'Packaging Solutions',
        items: [
          { label: 'Printed Envelopes', href: '/booking?pkg=wedding-cards' },
          { label: 'Custom Shipping Boxes', href: '/booking?pkg=flex-banners' },
          { label: 'Branded Carry Bags', href: '/booking?pkg=flex-banners' },
          { label: 'Custom Gift Wrapping Paper', href: '/booking?pkg=flex-banners' },
        ],
      },
    ],
  },
  {
    label: 'Mugs, Albums & Gifts',
    href: '/#gifts',
    columns: [
      {
        heading: 'Custom Gifts & Merchandise',
        items: [
          { label: 'Custom Ceramic Photo Mugs', href: '/booking?pkg=sangeet-haldi' },
          { label: 'Magic Color Changing Photo Mugs', href: '/booking?pkg=sangeet-haldi' },
          { label: 'HD Photobooks & Wedding Albums', href: '/booking?pkg=sangeet-haldi' },
          { label: 'Custom Printed Keychains', href: '/booking?pkg=wedding-cards' },
          { label: 'Custom Magic Photo Cushions', href: '/booking?pkg=sangeet-haldi', isNew: true },
          { label: 'Custom Printed Polo T-shirts', href: '/booking?pkg=flex-banners' },
        ],
      },
    ],
  },
  {
    label: 'Custom Polo T-shirts',
    href: '/#tshirts',
    columns: [
      {
        heading: 'Men\'s Polo T-Shirts',
        items: [
          { label: 'Classic Cotton Polo T-Shirt', href: '/booking?pkg=flex-banners' },
          { label: 'Dry-Fit Sports Polo', href: '/booking?pkg=flex-banners' },
          { label: 'Embroidered Corporate Polo', href: '/booking?pkg=flex-banners' },
          { label: 'Premium Heavyweight Polo', href: '/booking?pkg=flex-banners', isNew: true },
        ],
      },
      {
        heading: 'Women\'s Polo T-Shirts',
        items: [
          { label: 'Fitted Cotton Polo', href: '/booking?pkg=flex-banners' },
          { label: 'Dry-Fit Workwear Polo', href: '/booking?pkg=flex-banners' },
          { label: 'V-Neck Custom T-Shirt', href: '/booking?pkg=flex-banners' },
        ],
      },
      {
        heading: 'Caps & Wearables',
        items: [
          { label: 'Custom Printed Caps & Visors', href: '/booking?pkg=flex-banners' },
          { label: 'Promotional Jackets & Vests', href: '/booking?pkg=flex-banners' },
          { label: 'Printed Team Hoodies', href: '/booking?pkg=flex-banners', isNew: true },
        ],
      },
    ],
  },
  {
    label: 'Deals & Offers',
    href: '/#deals',
    columns: [
      {
        heading: 'Festive Deals & Discounts',
        items: [
          { label: 'Flat 20% OFF 1,000+ Visiting Cards (BULK20)', href: '/booking?pkg=wedding-cards', isNew: true },
          { label: '15% OFF Royal Wedding Cards (WEDDING15)', href: '/booking?pkg=royal-wedding' },
          { label: '10% OFF Flex Banners (BANNER10)', href: '/booking?pkg=flex-banners' },
          { label: 'Flat 5% OFF Orders ₹10,000+ (SAVE5)', href: '/booking?pkg=wedding-cards' },
        ],
      },
      {
        heading: 'Combo Value Bundles',
        items: [
          { label: 'Corporate Starter Pack (Cards + Letterhead + Stamp)', href: '/booking?pkg=wedding-cards' },
          { label: 'Wedding Royal Pack (Box Cards + Acrylic + Scroll)', href: '/booking?pkg=royal-wedding' },
          { label: 'Shop Promotion Kit (Flex + Standee + Pamphlets)', href: '/booking?pkg=flex-banners' },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItemCount } = useCart();
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
              }}
            >
              <input
                type="text"
                placeholder="Search"
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

            <Link
              href="/dashboard"
              className="vp-desktop-only"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span style={{ fontSize: '0.6875rem', color: '#1E1E1E', fontFamily: "'Inter', sans-serif" }}>My Favourites</span>
            </Link>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link
                  href="/dashboard"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span style={{ fontSize: '0.6875rem', color: '#1E1E1E', fontFamily: "'Inter', sans-serif" }}>{user.name?.split(' ')[0]}</span>
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

      {/* ═══ 3. Perfectly Spaced Category Navigation Ribbon ═══ */}
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

        {/* ═══ 4. Mega Menu Dropdown Overlay for ALL Tabs ═══ */}
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
