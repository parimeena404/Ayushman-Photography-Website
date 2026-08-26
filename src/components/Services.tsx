'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from './SectionHeader';
import Link from 'next/link';

const services = [
  {
    title: 'Royal Wedding & Invitation Cards',
    desc: 'Luxury velvet box cards, clear acrylic invitations, Farman scrolls, and animated digital video E-invites.',
    image: '/images/wedding/scroll_royal_blue_velvet.png',
    cta: 'Explore Cards',
  },
  {
    title: 'Business & Visiting Cards',
    desc: '350 GSM Velvet Touch cards with Gold Foil Stamping, 3D Raised Spot UV, and transparent PVC plastic options.',
    image: '/images/visiting_cards/black_gold.jpg',
    cta: 'Get Estimate',
  },
  {
    title: 'Flex Banners & Outdoor Signage',
    desc: 'High-speed heavy duty Star Flex banners, roll-up display standees, vinyl stickers, and glow sign boards.',
    image: '/images/banners/outdoor_flex_banner.jpg',
    cta: 'Calculate Price',
  },
  {
    title: 'Pamphlets, Flyers & Brochures',
    desc: 'Multi-color offset printing on 130 GSM Gloss Art Paper for bulk promotional marketing & grand openings.',
    image: '/images/stationery/letterhead_bond.jpg',
    cta: 'Order Bulk',
  },
  {
    title: 'Bill Books & Letterheads',
    desc: 'Duplicate/triplicate carbonless receipt books, corporate letterheads, and brand identity envelopes.',
    image: '/images/stationery/bill_book_carbonless.jpg',
    cta: 'View Stationery',
  },
  {
    title: 'HD Photobooks & Wedding Albums',
    desc: 'Flush mount non-tearable silk sheet photobooks with acrylic glass and leatherette hardcover presentation boxes.',
    image: '/images/keepsakes/film1.jpg',
    cta: 'See Albums',
  },
  {
    title: 'Custom Gifts & Merchandise',
    desc: 'Customized ceramic photo magic mugs, promotional t-shirts, keychains, and wall canvas framed prints.',
    image: '/images/keepsakes/card2.png',
    cta: 'Browse Gifts',
  },
  {
    title: 'Pre-Press Graphic Layout & Design',
    desc: 'Professional in-house vector artwork creation, wedding card typography, brand logo design, and press prep.',
    image: '/images/commercial/command-key-studio.png',
    cta: 'Hire Designer',
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="services" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-wide">
        <SectionHeader
          eyebrow="What We Print"
          title="Our Printing Press & Graphics Services"
          subtitle="A complete suite of offset printing, luxury invitation cards, flex banners, and custom graphics in Ujjain."
        />

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="card"
              style={{ cursor: 'pointer' }}
            >
              <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  className="service-img"
                />
              </div>

              <div style={{ padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.0625rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                  }}
                >
                  {service.desc}
                </p>
                <Link
                  href="/#portfolio"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--gold)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'gap 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.gap = '0.6rem'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.gap = '0.35rem'; }}
                >
                  {service.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .card:hover .service-img { transform: scale(1.06); }

        @media (max-width: 1024px) {
          #services .container-wide > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          #services .container-wide > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
