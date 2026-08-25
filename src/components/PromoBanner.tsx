'use client';

import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section
      style={{
        background: '#0B2545',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 2.5rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'center',
        }}
        className="vp-promo-grid"
      >
        {/* Left text content */}
        <div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#60B5FF',
              marginBottom: '0.75rem',
            }}
          >
            Featured Collection
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Premium Wedding<br />Invitation Cards
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
              maxWidth: '480px',
            }}
          >
            Make your special day unforgettable with our handcrafted Gold Foil, Laser Cut Box, Acrylic & Royal Scroll wedding invitation cards. Starting from just ₹25 per card.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link
              href="/booking?pkg=royal-wedding"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.7rem 1.75rem',
                background: '#FFFFFF',
                color: '#0B2545',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                borderRadius: '999px',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
              }}
            >
              Explore Wedding Cards
            </Link>
            <Link
              href="/booking"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.7rem 1.75rem',
                background: 'transparent',
                color: '#FFFFFF',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                borderRadius: '999px',
                textDecoration: 'none',
                border: '1.5px solid rgba(255,255,255,0.3)',
              }}
            >
              Get a Free Quote →
            </Link>
          </div>
        </div>

        {/* Right image collage */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{ borderRadius: '10px', overflow: 'hidden', aspectRatio: '3/4' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/wedding/scroll_royal_blue_velvet.png"
              alt="Royal Scroll Wedding Cards"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ borderRadius: '10px', overflow: 'hidden', flex: 1 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/wedding/acrylic_navy_gold.png"
                alt="Acrylic Wedding Cards"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ borderRadius: '10px', overflow: 'hidden', flex: 1 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/wedding/royal_blue_wax_seal.jpg"
                alt="Botanical Wax Seal Invitations"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .vp-promo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
