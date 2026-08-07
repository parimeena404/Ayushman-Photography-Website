'use client';

import Link from 'next/link';

const footerColumns = [
  {
    title: 'Let us help',
    links: [
      { label: 'My Account & Bookings', href: '/dashboard' },
      { label: 'Contact Us / Customer Care', href: '/#contact' },
      { label: 'Bulk Event Inquiries', href: '/#contact' },
      { label: 'Frequently Asked Questions', href: '/faq' },
      { label: 'Pricing & Packages', href: '/#packages' },
      { label: 'Track Order Status', href: '/dashboard' },
    ],
  },
  {
    title: 'Our Company',
    links: [
      { label: 'About Ayushman Studio', href: '/about' },
      { label: 'Our Photography Team', href: '/about' },
      { label: 'Careers & Internships', href: '#' },
      { label: 'Press & Media Features', href: '#' },
      { label: 'Sustainability & Ethics', href: '#' },
      { label: 'Annual Client Showcase', href: '/stories' },
    ],
  },
  {
    title: 'Our policies',
    links: [
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Privacy & Cookie Policy', href: '#' },
      { label: 'Copyright & Copyright Matters', href: '#' },
      { label: 'Patents & Trademarks', href: '#' },
      { label: 'Cancellation & Refund Policy', href: '#' },
      { label: 'Delivery & Shipping Terms', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0D0D0D', color: '#F5F2EC', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Vistaprint 1:1 Footer Links Grid */}
      <div
        className="container-wide"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(2rem, 4vw, 4rem)',
          padding: 'clamp(3rem, 6vh, 4.5rem) clamp(1rem, 3vw, 2.5rem)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h3
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 700,
                color: 'var(--gold)',
                marginBottom: '1.25rem',
              }}
            >
              {col.title}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.84375rem',
                      color: 'rgba(255,255,255,0.65)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Bottom Bar */}
      <div style={{ padding: '1.75rem 0', background: '#080808' }}>
        <div
          className="container-wide"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          {/* Brand Logo & Copyright */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1A1A1A',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 800,
                  fontSize: '0.8rem',
                }}
              >
                A
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF' }}>
                Ayushman Photography Studio
              </span>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
              © 2001-{new Date().getFullYear()} Ayushman Photography Studio. All rights reserved.<br />
              Unless stated otherwise, prices are exclusive of delivery and applicable Taxes.
            </div>
          </div>

          {/* Social Icons & Country Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            {/* Country Selector Button */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                color: '#FFFFFF',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              🌐 India (INR ₹)
            </button>

            {/* Social Media Links */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[
                { name: 'Instagram', path: 'M7.8 2h8.4C19 2 22 5 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C5 22 2 19 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z' },
                { name: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={social.path}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
