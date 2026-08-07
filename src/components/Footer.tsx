'use client';

import Link from 'next/link';

const footerLinks = {
  Photography: [
    { label: 'Wedding Photography', href: '/#portfolio' },
    { label: 'Pre-Wedding Shoots', href: '/#portfolio' },
    { label: 'Portrait Sessions', href: '/#portfolio' },
    { label: 'Fashion & Editorial', href: '/#portfolio' },
    { label: 'Commercial Photography', href: '/#portfolio' },
    { label: 'Event Coverage', href: '/#portfolio' },
  ],
  Services: [
    { label: 'Cinematography', href: '/films' },
    { label: 'Drone Photography', href: '/#services' },
    { label: 'Album Design', href: '/#products' },
    { label: 'Photo Editing', href: '/#services' },
    { label: 'Canvas Prints', href: '/#products' },
    { label: 'Photo Books', href: '/#products' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/about' },
    { label: 'Client Stories', href: '/stories' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '#' },
  ],
  Support: [
    { label: 'Contact Us', href: '/#contact' },
    { label: 'Book a Session', href: '/booking' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Pricing', href: '/#packages' },
    { label: 'Shipping Policy', href: '#' },
    { label: 'Cancellation Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0D0D0D',
        color: '#F5F2EC',
      }}
    >
      {/* Newsletter Row */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: 'clamp(2.5rem, 5vw, 3.5rem) 0',
        }}
      >
        <div
          className="container-wide"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                fontWeight: 600,
                marginBottom: '0.375rem',
              }}
            >
              Stay Inspired
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Subscribe for behind-the-scenes stories, photography tips, and exclusive offers.
            </p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}
            style={{
              display: 'flex',
              gap: '0.75rem',
              maxWidth: '440px',
              width: '100%',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              style={{
                flex: 1,
                padding: '0.75rem 1.25rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1.5px solid rgba(255,255,255,0.1)',
                borderRadius: '999px',
                color: '#F5F2EC',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.75rem',
                background: '#C9A86C',
                color: '#1A1A1A',
                borderRadius: '999px',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '0.8125rem',
                letterSpacing: '0.04em',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links Grid */}
      <div
        className="container-wide"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(1.5rem, 3vw, 3rem)',
          padding: 'clamp(2.5rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 3rem)',
        }}
      >
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h4
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '1.25rem',
              }}
            >
              {section}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8125rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A86C'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '1.5rem 0',
        }}
      >
        <div
          className="container-wide"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#C9A86C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1A1A1A',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              A
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '0.9375rem',
                fontWeight: 600,
              }}
            >
              Ayushman Photography Studio
            </span>
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.35)',
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <span>© {new Date().getFullYear()} All Rights Reserved</span>
            <Link href="#" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="#" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Terms of Service</Link>
          </div>

          {/* Social Icons */}
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
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C9A86C'; e.currentTarget.style.color = '#C9A86C'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={social.path}/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          footer > div:nth-child(2) > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          footer > div:nth-child(2) > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
