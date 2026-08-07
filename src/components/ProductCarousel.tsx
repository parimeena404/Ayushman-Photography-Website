'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export interface ProductItem {
  id: string;
  title: string;
  badge: string;
  price: string;
  unit: string;
  image: string;
  category: string;
}

interface ProductCarouselProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: ProductItem[];
}

export default function ProductCarousel({ sectionTitle, sectionSubtitle, items }: ProductCarouselProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -380 : 380, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ padding: 'clamp(2.5rem, 5vh, 4rem) 0', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container-wide">
        {/* Section Header with Navigation Arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {sectionTitle}
            </h2>
            {sectionSubtitle && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                {sectionSubtitle}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => scroll('left')}
              aria-label="Previous"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1.5px solid var(--border-medium)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.2rem',
                transition: 'all 0.2s ease',
              }}
            >
              ‹
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1.5px solid var(--border-medium)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.2rem',
                transition: 'all 0.2s ease',
              }}
            >
              ›
            </button>
          </div>
        </div>

        {/* Vistaprint 1:1 Horizontal Product Card Carousel */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            paddingBottom: '0.75rem',
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              ref={i === 0 ? ref : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                flexShrink: 0,
                width: 'clamp(220px, 22vw, 260px)',
                scrollSnapAlign: 'start',
              }}
            >
              <Link
                href="/booking"
                style={{
                  display: 'block',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-subtle)',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                className="vp-product-card"
              >
                {/* Product Image + Vistaprint Style Badge */}
                <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.5s ease',
                    }}
                    className="vp-card-img"
                  />

                  {/* Vistaprint Style Promo Badge (e.g. BOOK 1 @ ₹45,000) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.6rem',
                      left: '0.6rem',
                      background: 'rgba(26, 26, 26, 0.9)',
                      color: 'var(--gold-light)',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    {item.badge}
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1rem' }}>
                  <div
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--gold)',
                      fontWeight: 700,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.category}
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                      marginBottom: '0.5rem',
                      height: '2.6em',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.title}
                  </h3>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      {item.unit}
                    </span>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {item.price}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .vp-product-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); border-color: var(--gold) !important; }
        .vp-product-card:hover .vp-card-img { transform: scale(1.06); }
      `}</style>
    </section>
  );
}
