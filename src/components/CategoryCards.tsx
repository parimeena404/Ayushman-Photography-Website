'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from './SectionHeader';
import Link from 'next/link';

const categories = [
  { name: 'Wedding Photography', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80', count: '200+ Stories' },
  { name: 'Pre-Wedding', image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80', count: '150+ Shoots' },
  { name: 'Portrait', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', count: '300+ Sessions' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', count: '80+ Projects' },
  { name: 'Commercial', image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&q=80', count: '120+ Brands' },
  { name: 'Events', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', count: '250+ Events' },
  { name: 'Drone', image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80', count: '60+ Flights' },
  { name: 'Travel', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80', count: '40+ Destinations' },
  { name: 'Product', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', count: '100+ Catalogs' },
  { name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', count: '90+ Stories' },
];

export default function CategoryCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-wide">
        <SectionHeader
          eyebrow="Our Expertise"
          title="Explore Our Photography"
          subtitle="From intimate portraits to grand celebrations, we specialize in capturing every genre with artistic precision."
        />

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
          }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Link
                href="/#portfolio"
                style={{
                  display: 'block',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '3/4',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${cat.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  className="category-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                    transition: 'background 0.3s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 'clamp(0.75rem, 1.5vw, 1.25rem)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.8rem, 1.2vw, 1.0625rem)',
                      fontWeight: 600,
                      color: '#fff',
                      marginBottom: '0.125rem',
                    }}
                  >
                    {cat.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--gold-light)',
                      fontWeight: 500,
                    }}
                  >
                    {cat.count}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .category-img { transform: scale(1); }
        a:hover .category-img { transform: scale(1.06); }

        @media (max-width: 1024px) {
          .section-padding > .container-wide > div:last-child {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .section-padding > .container-wide > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
