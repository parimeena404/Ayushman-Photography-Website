'use client';

import Link from 'next/link';

const footerColumns = [
  {
    title: 'Let Us Help You',
    links: [
      { label: 'My Account', href: '/dashboard' },
      { label: 'My Profile', href: '/profile' },
      { label: 'Track My Order', href: '/dashboard' },
      { label: 'Returns & Refunds', href: '/cancellation' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
      { label: '🛡️ Admin Portal', href: '/admin' },
    ],
  },
  {
    title: 'Our Products',
    links: [
      { label: 'Visiting Cards', href: '/booking?pkg=wedding-cards' },
      { label: 'Wedding Cards', href: '/booking?pkg=royal-wedding' },
      { label: 'Stationery & Letterheads', href: '/booking?pkg=wedding-cards' },
      { label: 'Flex Banners & Signage', href: '/booking?pkg=flex-banners' },
      { label: 'Labels & Stickers', href: '/booking?pkg=flex-banners' },
      { label: 'Photo Albums & Mugs', href: '/booking?pkg=sangeet-haldi' },
    ],
  },
  {
    title: 'Our Company',
    links: [
      { label: 'About Ayushman Cards', href: '/about' },
      { label: 'Customer Reviews', href: '/reviews' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/about' },
    ],
  },
  {
    title: 'Our Policies',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cancellation Policy', href: '/cancellation' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Copyright', href: '/copyright' },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#F8F9FA',
        borderTop: '1px solid #E5E7EB',
      }}
    >
      {/* Main Footer Columns */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2.5rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
        }}
        className="vp-footer-grid"
      >
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#1E1E1E',
                marginBottom: '1rem',
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8125rem',
                      color: '#6B7280',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#0B2545'; e.currentTarget.style.textDecoration = 'underline'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.textDecoration = 'none'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Payment Methods & Social */}
      <div
        style={{
          borderTop: '1px solid #E5E7EB',
          padding: '1.5rem clamp(1rem, 3vw, 2.5rem)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Payment badges */}
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#6B7280',
                marginBottom: '0.5rem',
              }}
            >
              We accept
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {['UPI', 'GPay', 'PhonePe', 'Paytm', 'Visa', 'Mastercard', 'Razorpay'].map((m) => (
                <span
                  key={m}
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.6rem',
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '4px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: '#4B5563',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {[
              { label: 'Instagram', href: 'https://instagram.com/ayushmancards' },
              { label: 'Facebook', href: 'https://facebook.com/ayushmancards' },
              { label: 'YouTube', href: 'https://youtube.com/@ayushmancards' },
              { label: 'WhatsApp', href: 'https://wa.me/919479784979' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8125rem',
                  color: '#6B7280',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#0B2545'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div
        style={{
          borderTop: '1px solid #E5E7EB',
          padding: '1rem clamp(1rem, 3vw, 2.5rem)',
          background: '#F3F4F6',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              color: '#9CA3AF',
            }}
          >
            © {new Date().getFullYear()} Ayushman Cards n Graphics. All rights reserved. Freeganj, Ujjain, M.P.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              color: '#9CA3AF',
            }}
          >
            Prop. Parisha Meena · GSTIN: 23XXXXX1234X1ZX
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .vp-footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .vp-footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
