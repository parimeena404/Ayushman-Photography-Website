'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section
      style={{
        background: '#FFFFFF',
        padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 3vw, 2.5rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* ─── Left Banner: Visiting Cards Deal ─── */}
        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            minHeight: '380px',
            background: 'linear-gradient(135deg, #0B2545 0%, #134074 100%)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'luminosity',
              opacity: 0.85,
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,37,69,0.9) 0%, rgba(11,37,69,0.3) 60%, transparent 100%)' }} />

          <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#B2E4F7',
                color: '#0B2545',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
              }}
            >
              BEST SELLER DEAL
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '0.5rem',
                lineHeight: 1.15,
              }}
            >
              Standard Visiting Cards
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
              href="/products?category=Business Cards"
              style={{
                display: 'inline-block',
                padding: '0.6rem 1.5rem',
                background: '#FFFFFF',
                color: '#0B2545',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                borderRadius: '999px',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
              }}
            >
              Explore Products
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
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)' }} />

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
                href="/products?category=Wedding Cards"
                style={{
                  display: 'inline-block',
                  padding: '0.6rem 1.5rem',
                  background: '#FFFFFF',
                  color: '#1E1E1E',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                }}
              >
                Wedding Cards
              </Link>
              <Link
                href="/products?category=Flex Banners"
                style={{
                  display: 'inline-block',
                  padding: '0.6rem 1.5rem',
                  background: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              >
                Flex Banners
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
