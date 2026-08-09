'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';
import Link from 'next/link';

const packages = [
  {
    name: 'Business Starter Print Suite',
    price: '₹3,500',
    period: 'Popular Corporate Pack',
    desc: 'Essential marketing & stationery printing for new businesses & shops.',
    features: [
      '500 Velvet Touch Visiting Cards',
      '500 Executive Letterheads',
      '500 Printed Brand Envelopes',
      '50 Sq. Ft. Frontlit Flex Banner',
      'Free Graphic Design Setup',
      'Express Studio Pickup / Delivery',
    ],
    popular: false,
  },
  {
    name: 'Grand Royal Shaadi Card Suite',
    price: '₹18,500',
    period: 'Best-Selling Wedding Pack',
    desc: 'Complete royal wedding invitation set for 500 families.',
    features: [
      '500 Royal Velvet Box / Acrylic Cards',
      'Hot Foil Stamping & Laser Cut Finish',
      '500 Matching Designer Envelopes',
      'Free Animated WhatsApp Video E-Invite',
      '1 Custom "Shaadi Times" Newspaper',
      'Custom Calligraphy & Hindi Layout',
      'Safe Pan-India Express Delivery',
    ],
    popular: true,
  },
  {
    name: 'Retail Mega Advertising Suite',
    price: '₹35,000',
    period: 'Bulk Commercial Pack',
    desc: 'Comprehensive outdoor flex, flyers & stationery bundle for grand openings.',
    features: [
      '10,000 Copies A5 Gloss Art Pamphlets',
      '2,000 Gold Foil Spot UV Visiting Cards',
      '200 Sq. Ft. Heavy Duty Star Flex Banners',
      '2 Roll-up Standees with Frames',
      '10 Carbonless Duplicate Bill Books',
      'Dedicated Pre-Press Graphic Artist',
      'Priority Printing Queue Slot',
    ],
    popular: false,
  },
];

export default function Packages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="packages" className="section-padding" style={{ background: 'var(--bg-dark)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Bulk Offers"
          title="Featured Bulk Printing Packages"
          subtitle="Transparent pricing for wedding card collections, business starter kits, and commercial press bundles."
          light
        />

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            alignItems: 'start',
          }}
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                background: pkg.popular ? 'linear-gradient(135deg, #2A2520 0%, #1E1A16 100%)' : 'rgba(255,255,255,0.04)',
                borderRadius: 'var(--radius-lg)',
                border: pkg.popular ? '1.5px solid var(--gold)' : '1px solid rgba(255,255,255,0.08)',
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {pkg.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '-2rem',
                    background: 'var(--gold)',
                    color: '#1A1A1A',
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '0.3rem 2.5rem',
                    transform: 'rotate(45deg)',
                  }}
                >
                  Popular
                </div>
              )}

              <div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: pkg.popular ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                {pkg.period}
              </div>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '0.25rem',
                }}
              >
                {pkg.name}
              </h3>

              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  color: pkg.popular ? 'var(--gold)' : '#FFFFFF',
                  marginBottom: '0.5rem',
                }}
              >
                {pkg.price}
              </div>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}
              >
                {pkg.desc}
              </p>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                {pkg.features.map((feat) => (
                  <div
                    key={feat}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={pkg.popular ? '#C9A86C' : 'rgba(255,255,255,0.4)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.8125rem',
                        color: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/booking"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '0.875rem',
                  borderRadius: '999px',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  background: pkg.popular ? 'var(--gold)' : 'transparent',
                  color: pkg.popular ? '#1A1A1A' : '#FFFFFF',
                  border: pkg.popular ? '2px solid var(--gold)' : '2px solid rgba(255,255,255,0.2)',
                }}
              >
                Order Print Package
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
            max-width: 480px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
}
