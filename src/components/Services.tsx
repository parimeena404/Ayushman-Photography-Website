'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from './SectionHeader';
import Link from 'next/link';

const services = [
  {
    title: 'Wedding Photography',
    desc: 'Complete coverage of your special day with a team of seasoned professionals capturing every emotion.',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&q=80',
    cta: 'Learn More',
  },
  {
    title: 'Cinematography',
    desc: 'Cinematic wedding films with drone coverage, same-day edits, and Hollywood-grade color grading.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80',
    cta: 'Watch Films',
  },
  {
    title: 'Pre-Wedding Shoots',
    desc: 'Romantic couple sessions at stunning locations. From palaces to beaches, we create magic.',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=500&q=80',
    cta: 'View Gallery',
  },
  {
    title: 'Portrait Sessions',
    desc: 'Professional headshots, family portraits, and personal branding photography in studio or on-location.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80',
    cta: 'Book Now',
  },
  {
    title: 'Fashion & Editorial',
    desc: 'High-fashion photography for lookbooks, campaigns, and magazine editorials with creative direction.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80',
    cta: 'See Portfolio',
  },
  {
    title: 'Commercial Photography',
    desc: 'Product, food, architecture, and corporate photography for brands that demand excellence.',
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=500&q=80',
    cta: 'Get Quote',
  },
  {
    title: 'Event Coverage',
    desc: 'Corporate events, concerts, conferences, and celebrations documented with professional finesse.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80',
    cta: 'Learn More',
  },
  {
    title: 'Album Design',
    desc: 'Handcrafted luxury albums with premium papers, custom layouts, and museum-quality printing.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
    cta: 'View Samples',
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="services" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-wide">
        <SectionHeader
          eyebrow="What We Offer"
          title="Our Services"
          subtitle="A complete suite of premium photography and videography services tailored to your vision."
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
