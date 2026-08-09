'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from './SectionHeader';
import Link from 'next/link';

const categories = [
  { name: '💍 Royal Wedding Cards', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80', count: '500+ Designs' },
  { name: '✨ Laser Acrylic Cards', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', count: '200+ Acrylic Cards' },
  { name: '📜 Farman Scroll Cards', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&q=80', count: '150+ Scrolls' },
  { name: '📦 Velvet Box Cards', image: '/images/keepsakes/card2.png', count: '300+ Box Cards' },
  { name: '💼 Business Visiting Cards', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80', count: '2,000+ Orders' },
  { name: '🚩 Flex Banners & Star Flex', image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=600&q=80', count: '1,500+ Banners' },
  { name: '📄 Pamphlets & Flyers', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80', count: '3,000+ Flyers' },
  { name: '🧾 Carbonless Bill Books', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80', count: '800+ Bill Books' },
  { name: '📖 HD Wedding Photobooks', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80', count: '400+ Albums' },
  { name: '🎁 Custom Mugs & Gifts', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80', count: '1,200+ Gifts' },
];

export default function CategoryCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-wide">
        <SectionHeader
          eyebrow="Print Collections"
          title="Explore Cards & Print Categories"
          subtitle="Explore royal wedding card boxes, clear acrylic invitations, velvet visiting cards, flex banners, and customized gifts printed in Ujjain."
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
                delay: i * 0.05,
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
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
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
                      fontSize: 'clamp(0.85rem, 1.2vw, 1.0625rem)',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: '0.125rem',
                      lineHeight: 1.25,
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
                      color: '#FFD700',
                      fontWeight: 600,
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
