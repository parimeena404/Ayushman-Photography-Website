'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        background: 'linear-gradient(180deg, #E8F4FD 0%, #F0F7FC 100%)',
        padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2.5rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}
        className="vp-hero-grid"
      >
        {/* ─── Left Banner: Visiting Cards ─── */}
        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            minHeight: '380px',
            background: 'linear-gradient(135deg, #F5F0EB 0%, #EDE6DC 100%)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {/* Product image background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />

          {/* Text overlay */}
          <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '0.5rem',
                lineHeight: 1.2,
              }}
            >
              Visiting Cards
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '1.25rem',
              }}
            >
              100 Visiting Cards at Rs 200
            </p>
            <Link
              href="/booking?pkg=wedding-cards"
              style={{
                display: 'inline-block',
                padding: '0.6rem 1.5rem',
                background: '#1E1E1E',
                color: '#FFFFFF',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                borderRadius: '999px',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
              }}
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* ─── Right Banner: Wedding / Event Cards ─── */}
        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            minHeight: '380px',
            background: 'linear-gradient(135deg, #FDE7E7 0%, #FCD5D5 100%)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' }} />

          <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '0.5rem',
                lineHeight: 1.2,
              }}
            >
              Royal Wedding &<br />Invitation Cards
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '1.25rem',
              }}
            >
              Starting at Rs 2,500 for 100 Cards
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link
                href="/booking?pkg=royal-wedding"
                style={{
                  display: 'inline-block',
                  padding: '0.6rem 1.5rem',
                  background: '#1E1E1E',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                }}
              >
                Wedding Cards
              </Link>
              <Link
                href="/booking?pkg=flex-banners"
                style={{
                  display: 'inline-block',
                  padding: '0.6rem 1.5rem',
                  background: '#1E1E1E',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                }}
              >
                Flex Banners
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .vp-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
